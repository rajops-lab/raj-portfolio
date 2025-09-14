/**
 * Performance Monitoring and Optimization Utilities
 * Provides tools for measuring, analyzing, and optimizing React application performance
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  category: 'timing' | 'counter' | 'gauge' | 'histogram';
  unit?: string;
  tags?: Record<string, string>;
}

export interface ComponentRenderInfo {
  componentName: string;
  renderTime: number;
  renderCount: number;
  propsChanged: string[];
  timestamp: number;
}

/**
 * Performance monitoring class with metrics collection
 */
class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private renderMetrics: Map<string, ComponentRenderInfo[]> = new Map();
  private readonly maxMetrics = 1000;
  private observer?: PerformanceObserver;

  constructor() {
    this.setupPerformanceObserver();
    this.measureWebVitals();
  }

  /**
   * Set up Performance Observer for automatic metrics collection
   */
  private setupPerformanceObserver() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      this.observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        entries.forEach((entry) => {
          this.recordMetric({
            name: entry.name,
            value: entry.duration || entry.startTime,
            timestamp: Date.now(),
            category: 'timing',
            unit: 'ms',
            tags: {
              type: entry.entryType,
              initiatorType: (entry as any).initiatorType,
            },
          });
        });
      });

      // Observe different types of performance entries
      const entryTypes = [
        'navigation', 
        'resource', 
        'paint', 
        'largest-contentful-paint',
        'first-input',
        'layout-shift'
      ];

      entryTypes.forEach((type) => {
        try {
          this.observer?.observe({ entryTypes: [type] });
        } catch (error) {
          // Some entry types might not be supported in all browsers
          console.debug(`Performance observer type "${type}" not supported`);
        }
      });
    } catch (error) {
      console.warn('Failed to set up performance observer:', error);
    }
  }

  /**
   * Measure Web Vitals metrics
   */
  private async measureWebVitals() {
    if (typeof window === 'undefined') return;

    try {
      // Dynamic import to avoid bundle size issues
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
      
      const recordVital = (metric: any) => {
        this.recordMetric({
          name: `web-vital-${metric.name}`,
          value: metric.value,
          timestamp: Date.now(),
          category: 'gauge',
          unit: metric.name === 'CLS' ? 'score' : 'ms',
          tags: {
            rating: metric.rating,
            navigationType: metric.navigationType,
          },
        });

        if (process.env.NODE_ENV === 'development') {
          console.log(`📊 Web Vital - ${metric.name}:`, metric.value, metric.rating);
        }
      };

      getCLS(recordVital);
      getFID(recordVital);
      getFCP(recordVital);
      getLCP(recordVital);
      getTTFB(recordVital);
    } catch (error) {
      console.debug('Web Vitals not available:', error);
    }
  }

  /**
   * Record a custom performance metric
   */
  recordMetric(metric: PerformanceMetric): void {
    this.metrics.unshift({ ...metric, timestamp: metric.timestamp || Date.now() });
    
    // Maintain max metrics limit
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(0, this.maxMetrics);
    }

    // Log significant metrics in development
    if (process.env.NODE_ENV === 'development' && metric.value > 100) {
      console.log(`⚡ Performance: ${metric.name} = ${metric.value}${metric.unit || ''}`);
    }
  }

  /**
   * Measure function execution time
   */
  measureFunction<T extends (...args: any[]) => any>(
    fn: T,
    name?: string
  ): T {
    const measureName = name || fn.name || 'anonymous';
    
    return ((...args: any[]) => {
      const startTime = performance.now();
      
      try {
        const result = fn(...args);
        
        // Handle promises
        if (result && typeof result.then === 'function') {
          return result.finally(() => {
            const duration = performance.now() - startTime;
            this.recordMetric({
              name: `function-${measureName}`,
              value: duration,
              timestamp: Date.now(),
              category: 'timing',
              unit: 'ms',
              tags: { type: 'async' },
            });
          });
        }
        
        const duration = performance.now() - startTime;
        this.recordMetric({
          name: `function-${measureName}`,
          value: duration,
          timestamp: Date.now(),
          category: 'timing',
          unit: 'ms',
          tags: { type: 'sync' },
        });
        
        return result;
      } catch (error) {
        const duration = performance.now() - startTime;
        this.recordMetric({
          name: `function-${measureName}-error`,
          value: duration,
          timestamp: Date.now(),
          category: 'timing',
          unit: 'ms',
          tags: { type: 'error' },
        });
        throw error;
      }
    }) as T;
  }

  /**
   * Record component render information
   */
  recordComponentRender(
    componentName: string,
    renderTime: number,
    propsChanged: string[] = []
  ): void {
    const renderInfo: ComponentRenderInfo = {
      componentName,
      renderTime,
      renderCount: 1,
      propsChanged,
      timestamp: Date.now(),
    };

    if (!this.renderMetrics.has(componentName)) {
      this.renderMetrics.set(componentName, []);
    }

    const componentMetrics = this.renderMetrics.get(componentName)!;
    componentMetrics.unshift(renderInfo);

    // Keep only last 50 renders per component
    if (componentMetrics.length > 50) {
      componentMetrics.splice(50);
    }

    // Record as performance metric
    this.recordMetric({
      name: `component-render-${componentName}`,
      value: renderTime,
      timestamp: Date.now(),
      category: 'timing',
      unit: 'ms',
      tags: {
        propsChanged: propsChanged.length.toString(),
        component: componentName,
      },
    });
  }

  /**
   * Get performance statistics
   */
  getStats() {
    const now = Date.now();
    const lastMinute = now - 60000;
    const lastHour = now - 3600000;

    const recentMetrics = this.metrics.filter(m => m.timestamp > lastMinute);
    const hourlyMetrics = this.metrics.filter(m => m.timestamp > lastHour);

    // Calculate averages by category
    const avgByCategory = this.metrics.reduce((acc, metric) => {
      if (!acc[metric.category]) {
        acc[metric.category] = { sum: 0, count: 0 };
      }
      acc[metric.category].sum += metric.value;
      acc[metric.category].count += 1;
      return acc;
    }, {} as Record<string, { sum: number; count: number }>);

    const averages = Object.entries(avgByCategory).reduce((acc, [category, data]) => {
      acc[category] = data.sum / data.count;
      return acc;
    }, {} as Record<string, number>);

    // Get slowest components
    const componentStats = Array.from(this.renderMetrics.entries()).map(([name, renders]) => {
      const totalRenders = renders.length;
      const avgRenderTime = renders.reduce((sum, r) => sum + r.renderTime, 0) / totalRenders;
      const slowestRender = Math.max(...renders.map(r => r.renderTime));
      
      return {
        componentName: name,
        totalRenders,
        avgRenderTime: parseFloat(avgRenderTime.toFixed(2)),
        slowestRender: parseFloat(slowestRender.toFixed(2)),
        lastRender: renders[0]?.timestamp || 0,
      };
    }).sort((a, b) => b.avgRenderTime - a.avgRenderTime);

    return {
      totalMetrics: this.metrics.length,
      recentMetrics: recentMetrics.length,
      hourlyMetrics: hourlyMetrics.length,
      averages,
      componentStats: componentStats.slice(0, 10), // Top 10 slowest
      memoryUsage: this.getMemoryUsage(),
      webVitals: this.getWebVitals(),
    };
  }

  /**
   * Get memory usage information
   */
  private getMemoryUsage() {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return null;
    }

    const memory = (performance as any).memory;
    if (!memory) return null;

    return {
      usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576), // MB
      totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576), // MB
      jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
      usage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100), // %
    };
  }

  /**
   * Get Web Vitals summary
   */
  private getWebVitals() {
    const webVitalMetrics = this.metrics.filter(m => m.name.startsWith('web-vital-'));
    
    return webVitalMetrics.reduce((acc, metric) => {
      const vitalName = metric.name.replace('web-vital-', '');
      acc[vitalName] = {
        value: metric.value,
        rating: metric.tags?.rating || 'unknown',
        timestamp: metric.timestamp,
      };
      return acc;
    }, {} as Record<string, any>);
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics = [];
    this.renderMetrics.clear();
    console.log('🧹 Performance metrics cleared');
  }

  /**
   * Get recent metrics for a specific category
   */
  getMetricsByCategory(category: PerformanceMetric['category'], limit = 10): PerformanceMetric[] {
    return this.metrics
      .filter(m => m.category === category)
      .slice(0, limit);
  }

  /**
   * Export metrics data
   */
  exportMetrics(): string {
    return JSON.stringify({
      timestamp: Date.now(),
      stats: this.getStats(),
      rawMetrics: this.metrics.slice(0, 100), // Last 100 metrics
    }, null, 2);
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.clearMetrics();
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * React hook for performance monitoring in components
 */
export function usePerformanceMonitor(componentName: string) {
  // Import React dynamically to avoid circular dependency issues
  const React = require('react');
  
  const startTime = React.useRef<number>(0);
  const renderCount = React.useRef<number>(0);
  const previousProps = React.useRef<any>(null);

  React.useEffect(() => {
    startTime.current = performance.now();
    renderCount.current += 1;
  });

  React.useLayoutEffect(() => {
    const renderTime = performance.now() - startTime.current;
    
    // Detect changed props (basic implementation)
    const propsChanged: string[] = [];
    // This would need more sophisticated prop comparison logic
    
    performanceMonitor.recordComponentRender(componentName, renderTime, propsChanged);
  });

  const measureOperation = React.useCallback((operation: () => any, operationName?: string) => {
    return performanceMonitor.measureFunction(operation, `${componentName}-${operationName}`);
  }, [componentName]);

  return {
    measureOperation,
    renderCount: renderCount.current,
  };
}

/**
 * HOC for automatic performance monitoring
 */
export function withPerformanceMonitoring<P extends object>(
  Component: any, // React.ComponentType<P>,
  displayName?: string
) {
  const React = require('react');
  
  const WrappedComponent = React.forwardRef<any, P>((props: any, ref: any) => {
    const componentName = displayName || Component.displayName || Component.name || 'Anonymous';
    const startTime = performance.now();

    React.useLayoutEffect(() => {
      const renderTime = performance.now() - startTime;
      performanceMonitor.recordComponentRender(componentName, renderTime);
    });

    return React.createElement(Component, { ...props, ref });
  });

  WrappedComponent.displayName = `withPerformanceMonitoring(${displayName || Component.displayName || Component.name})`;

  return WrappedComponent;
}

/**
 * Performance debugging tools
 */
export class PerformanceDebugger {
  private static isEnabled = process.env.NODE_ENV === 'development';

  /**
   * Log performance warnings for slow operations
   */
  static logSlowOperation(name: string, duration: number, threshold = 16) {
    if (!this.isEnabled) return;

    if (duration > threshold) {
      const severity = duration > threshold * 3 ? '🔴' : duration > threshold * 2 ? '🟡' : '🟠';
      console.warn(
        `${severity} Slow operation detected: ${name} took ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`
      );
    }
  }

  /**
   * Profile a function execution
   */
  static profile<T extends (...args: any[]) => any>(fn: T, name?: string): T {
    if (!this.isEnabled) return fn;

    const profileName = name || fn.name || 'anonymous';
    
    return ((...args: any[]) => {
      console.time(profileName);
      console.profile(profileName);
      
      try {
        const result = fn(...args);
        
        if (result && typeof result.then === 'function') {
          return result.finally(() => {
            console.timeEnd(profileName);
            console.profileEnd(profileName);
          });
        }
        
        console.timeEnd(profileName);
        console.profileEnd(profileName);
        return result;
      } catch (error) {
        console.timeEnd(profileName);
        console.profileEnd(profileName);
        throw error;
      }
    }) as T;
  }

  /**
   * Measure component re-render frequency
   */
  static measureRerenders(componentName: string) {
    if (!this.isEnabled) return { renderCount: 0, lastRender: 0 };

    const key = `rerender-${componentName}`;
    const now = Date.now();
    const data = (window as any).__performanceData || ((window as any).__performanceData = {});
    
    if (!data[key]) {
      data[key] = { count: 0, timestamps: [] };
    }
    
    data[key].count += 1;
    data[key].timestamps.push(now);
    
    // Keep only last 10 timestamps
    if (data[key].timestamps.length > 10) {
      data[key].timestamps = data[key].timestamps.slice(-10);
    }
    
    const recentRerenders = data[key].timestamps.filter((t: number) => now - t < 1000).length;
    
    if (recentRerenders > 5) {
      console.warn(`🔄 Excessive re-renders detected in ${componentName}: ${recentRerenders} in last 1s`);
    }
    
    return {
      renderCount: data[key].count,
      lastRender: now,
      recentRerenders,
    };
  }

  /**
   * Check for memory leaks
   */
  static checkMemoryLeaks() {
    if (!this.isEnabled || typeof window === 'undefined') return;

    const memory = (performance as any).memory;
    if (!memory) return;

    const usage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
    
    if (usage > 0.9) {
      console.error('🚨 High memory usage detected:', {
        used: `${Math.round(memory.usedJSHeapSize / 1048576)}MB`,
        limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)}MB`,
        usage: `${Math.round(usage * 100)}%`,
      });
    } else if (usage > 0.7) {
      console.warn('⚠️ Memory usage is getting high:', {
        used: `${Math.round(memory.usedJSHeapSize / 1048576)}MB`,
        limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)}MB`,
        usage: `${Math.round(usage * 100)}%`,
      });
    }
  }
}

// Global performance debugging tools (development only)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).performanceMonitor = performanceMonitor;
  (window as any).PerformanceDebugger = PerformanceDebugger;
  
  // Auto-check memory usage every 30 seconds
  setInterval(() => {
    PerformanceDebugger.checkMemoryLeaks();
  }, 30000);

  console.info('🔧 Performance debugging tools available:', {
    performanceMonitor: 'window.performanceMonitor',
    PerformanceDebugger: 'window.PerformanceDebugger',
    commands: [
      'performanceMonitor.getStats()',
      'performanceMonitor.exportMetrics()',
      'performanceMonitor.clearMetrics()',
      'PerformanceDebugger.checkMemoryLeaks()',
    ],
  });
}

export default performanceMonitor;

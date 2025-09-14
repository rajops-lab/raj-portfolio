/**
 * Comprehensive Error Handling Utilities
 * Provides centralized error logging, reporting, and recovery mechanisms
 */

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  timestamp?: number;
  userAgent?: string;
  url?: string;
  additionalData?: Record<string, any>;
}

export interface ErrorReport {
  error: Error;
  context: ErrorContext;
  severity: 'low' | 'medium' | 'high' | 'critical';
  stack?: string;
  errorId: string;
}

/**
 * Enhanced error class with additional context
 */
export class PortfolioError extends Error {
  public readonly context: ErrorContext;
  public readonly severity: ErrorReport['severity'];
  public readonly timestamp: number;
  public readonly errorId: string;

  constructor(
    message: string,
    context: ErrorContext = {},
    severity: ErrorReport['severity'] = 'medium'
  ) {
    super(message);
    this.name = 'PortfolioError';
    this.context = {
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      ...context,
    };
    this.severity = severity;
    this.timestamp = Date.now();
    this.errorId = this.generateErrorId();

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PortfolioError);
    }
  }

  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      context: this.context,
      severity: this.severity,
      timestamp: this.timestamp,
      errorId: this.errorId,
    };
  }
}

/**
 * Error severity levels with descriptions
 */
export const ERROR_SEVERITY = {
  low: {
    level: 'low' as const,
    description: 'Minor issues that don\'t affect core functionality',
    color: '#fbbf24', // yellow-400
  },
  medium: {
    level: 'medium' as const,
    description: 'Issues that may impact user experience',
    color: '#f97316', // orange-500
  },
  high: {
    level: 'high' as const,
    description: 'Significant issues affecting functionality',
    color: '#dc2626', // red-600
  },
  critical: {
    level: 'critical' as const,
    description: 'Critical issues that break the application',
    color: '#991b1b', // red-800
  },
} as const;

/**
 * Error logging service with different levels
 */
class ErrorLogger {
  private logs: ErrorReport[] = [];
  private readonly maxLogs = 100;

  /**
   * Log an error with context
   */
  log(error: Error, context: ErrorContext = {}, severity: ErrorReport['severity'] = 'medium'): ErrorReport {
    const errorReport: ErrorReport = {
      error,
      context: {
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        ...context,
      },
      severity,
      stack: error.stack,
      errorId: `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    // Add to internal log
    this.logs.unshift(errorReport);
    
    // Maintain max log size
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // Console logging with appropriate level
    this.consoleLog(errorReport);

    // Report to external service in production
    if (process.env.NODE_ENV === 'production') {
      this.reportToService(errorReport);
    }

    return errorReport;
  }

  /**
   * Console logging with colors and formatting
   */
  private consoleLog(report: ErrorReport): void {
    const { error, context, severity } = report;
    const severityInfo = ERROR_SEVERITY[severity];
    
    const style = `
      color: ${severityInfo.color};
      font-weight: bold;
      background: rgba(0, 0, 0, 0.1);
      padding: 2px 6px;
      border-radius: 3px;
    `;

    console.group(`%c🚨 ${severity.toUpperCase()} ERROR`, style);
    console.error('Message:', error.message);
    console.error('Error ID:', report.errorId);
    console.error('Component:', context.component || 'Unknown');
    console.error('Action:', context.action || 'Unknown');
    console.error('Timestamp:', new Date(context.timestamp || Date.now()).toISOString());
    
    if (context.additionalData) {
      console.error('Additional Data:', context.additionalData);
    }
    
    if (error.stack) {
      console.error('Stack Trace:', error.stack);
    }
    
    console.groupEnd();
  }

  /**
   * Report to external error tracking service
   */
  private async reportToService(report: ErrorReport): Promise<void> {
    try {
      // This is where you'd integrate with services like:
      // - Sentry
      // - Bugsnag
      // - LogRocket
      // - Custom API endpoint
      
      // Example implementation:
      /*
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
      });
      */
      
      // For now, just log that we would report it
      console.info(`📡 Would report error ${report.errorId} to monitoring service`);
    } catch (reportingError) {
      console.warn('Failed to report error to service:', reportingError);
    }
  }

  /**
   * Get recent error logs
   */
  getRecentLogs(limit = 10): ErrorReport[] {
    return this.logs.slice(0, limit);
  }

  /**
   * Get error statistics
   */
  getStats() {
    const now = Date.now();
    const lastHour = now - (60 * 60 * 1000);
    const lastDay = now - (24 * 60 * 60 * 1000);

    const recentErrors = this.logs.filter(log => 
      (log.context.timestamp || 0) > lastHour
    );

    const dailyErrors = this.logs.filter(log => 
      (log.context.timestamp || 0) > lastDay
    );

    const severityCounts = this.logs.reduce((acc, log) => {
      acc[log.severity] = (acc[log.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: this.logs.length,
      lastHour: recentErrors.length,
      lastDay: dailyErrors.length,
      severityCounts,
      mostRecentError: this.logs[0]?.error.message || null,
    };
  }

  /**
   * Clear error logs
   */
  clearLogs(): void {
    this.logs = [];
    console.info('🧹 Error logs cleared');
  }
}

// Singleton instance
export const errorLogger = new ErrorLogger();

/**
 * Higher-order function to wrap functions with error handling
 */
export function withErrorHandling<T extends (...args: any[]) => any>(
  fn: T,
  context: ErrorContext = {},
  onError?: (error: Error) => void
): T {
  return ((...args: any[]) => {
    try {
      const result = fn(...args);
      
      // Handle promises
      if (result && typeof result.catch === 'function') {
        return result.catch((error: Error) => {
          const portfolioError = new PortfolioError(
            error.message || 'Async operation failed',
            { ...context, action: fn.name },
            'medium'
          );
          
          errorLogger.log(portfolioError, context);
          
          if (onError) {
            onError(portfolioError);
          } else {
            throw portfolioError;
          }
        });
      }
      
      return result;
    } catch (error) {
      const portfolioError = new PortfolioError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        { ...context, action: fn.name },
        'medium'
      );
      
      errorLogger.log(portfolioError, context);
      
      if (onError) {
        onError(portfolioError);
      } else {
        throw portfolioError;
      }
    }
  }) as T;
}

/**
 * React hook for error handling in components
 * Note: This will be imported by components that need it
 */
export function useErrorHandler() {
  // Import React dynamically to avoid circular dependency issues
  const React = require('react');
  
  const handleError = React.useCallback((
    error: Error,
    context: ErrorContext = {},
    severity: ErrorReport['severity'] = 'medium'
  ) => {
    const portfolioError = error instanceof PortfolioError 
      ? error 
      : new PortfolioError(error.message, context, severity);
    
    return errorLogger.log(portfolioError, context, severity);
  }, []);

  const clearErrors = React.useCallback(() => {
    errorLogger.clearLogs();
  }, []);

  const getErrorStats = React.useCallback(() => {
    return errorLogger.getStats();
  }, []);

  return {
    handleError,
    clearErrors,
    getErrorStats,
    recentErrors: errorLogger.getRecentLogs(5),
  };
}

/**
 * Async wrapper for error handling
 */
export async function safeAsync<T>(
  promise: Promise<T>,
  context: ErrorContext = {}
): Promise<[T | null, Error | null]> {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    const portfolioError = new PortfolioError(
      error instanceof Error ? error.message : 'Async operation failed',
      context,
      'medium'
    );
    
    errorLogger.log(portfolioError, context);
    return [null, portfolioError];
  }
}

/**
 * Performance monitoring wrapper
 */
export function withPerformanceMonitoring<T extends (...args: any[]) => any>(
  fn: T,
  label?: string
): T {
  return ((...args: any[]) => {
    const startTime = performance.now();
    const measureLabel = label || fn.name || 'anonymous';
    
    try {
      const result = fn(...args);
      
      // Handle promises
      if (result && typeof result.then === 'function') {
        return result.finally(() => {
          const duration = performance.now() - startTime;
          if (process.env.NODE_ENV === 'development') {
            console.log(`⏱️ ${measureLabel}: ${duration.toFixed(2)}ms`);
          }
        });
      }
      
      const duration = performance.now() - startTime;
      if (process.env.NODE_ENV === 'development') {
        console.log(`⏱️ ${measureLabel}: ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      console.error(`❌ ${measureLabel} failed after ${duration.toFixed(2)}ms:`, error);
      throw error;
    }
  }) as T;
}

/**
 * React hook for error handling in components
 * Moved here to fix import issues
 */

// Global error handlers
if (typeof window !== 'undefined') {
  // Expose error logger to window for debugging
  if (process.env.NODE_ENV === 'development') {
    (window as any).errorLogger = errorLogger;
    (window as any).PortfolioError = PortfolioError;
    
    console.info('🔧 Error debugging tools available:', {
      errorLogger: 'window.errorLogger',
      PortfolioError: 'window.PortfolioError',
      commands: [
        'errorLogger.getStats()',
        'errorLogger.getRecentLogs()',
        'errorLogger.clearLogs()',
      ],
    });
  }
}

export default errorLogger;

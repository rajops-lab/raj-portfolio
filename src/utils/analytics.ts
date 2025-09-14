// Simple analytics utility for tracking user interactions
interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Performance monitoring
export const trackPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        
        const metrics = {
          // Core Web Vitals
          TTFB: navigation.responseStart - navigation.requestStart,
          FCP: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
          LCP: 0, // Would need additional setup for LCP
          CLS: 0, // Would need additional setup for CLS
          
          // Additional metrics
          DOMContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          LoadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        };
        
        console.log('Performance Metrics:', metrics);
        
        // You can send these metrics to your analytics service
        // trackEvent({
        //   action: 'page_performance',
        //   category: 'performance',
        //   label: 'core_metrics',
        //   value: Math.round(metrics.FCP)
        // });
      }, 0);
    });
  }
};

// Track user events
export const trackEvent = (event: AnalyticsEvent) => {
  // Google Analytics 4 example
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  }
  
  // Console logging for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', event);
  }
};

// Track page views
export const trackPageView = (path: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
    });
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Page View:', path);
  }
};

// Track terminal usage
export const trackTerminalEvent = (command: string, category: 'help' | 'navigation' | 'easter_egg' | 'error') => {
  trackEvent({
    action: 'terminal_command',
    category: 'terminal_interaction',
    label: `${category}:${command}`,
  });
};

// Track project interactions
export const trackProjectInteraction = (projectName: string, action: 'view_demo' | 'view_code' | 'view_details') => {
  trackEvent({
    action,
    category: 'project_interaction',
    label: projectName,
  });
};

// Track contact form interactions
export const trackContactEvent = (action: 'form_start' | 'form_submit' | 'form_error') => {
  trackEvent({
    action,
    category: 'contact',
    label: 'contact_form',
  });
};

// Initialize analytics
export const initAnalytics = () => {
  trackPerformance();
  
  // Track scroll depth
  let maxScroll = 0;
  const trackScrollDepth = () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
      maxScroll = scrollPercent;
      trackEvent({
        action: 'scroll',
        category: 'engagement',
        label: 'scroll_depth',
        value: scrollPercent,
      });
    }
  };
  
  window.addEventListener('scroll', trackScrollDepth, { passive: true });
};
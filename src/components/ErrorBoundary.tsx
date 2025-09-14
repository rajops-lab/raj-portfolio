import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { errorLogger, PortfolioError, ErrorContext } from '../utils/errorHandling';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showErrorDetails?: boolean;
  allowRetry?: boolean;
  context?: ErrorContext;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
  showDetails: boolean;
  retryCount: number;
}

class ErrorBoundary extends Component<Props, State> {
  private maxRetries = 3;
  private retryTimeouts: NodeJS.Timeout[] = [];

  public state: State = {
    hasError: false,
    showDetails: false,
    retryCount: 0,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Create enhanced error with context
    const portfolioError = new PortfolioError(
      error.message || 'Component error occurred',
      {
        component: 'ErrorBoundary',
        action: 'componentDidCatch',
        ...this.props.context,
        additionalData: {
          componentStack: errorInfo.componentStack,
          errorBoundaryRetryCount: this.state.retryCount,
        },
      },
      'high'
    );

    // Log the error
    const errorReport = errorLogger.log(portfolioError);
    
    // Update state with error details
    this.setState({
      errorInfo,
      errorId: errorReport.errorId,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Report to external services in production
    if (process.env.NODE_ENV === 'production') {
      this.reportErrorToService(portfolioError, errorInfo);
    }
  }

  /**
   * Clean up timeouts on unmount
   */
  public componentWillUnmount() {
    this.retryTimeouts.forEach(timeout => clearTimeout(timeout));
  }

  /**
   * Report error to external monitoring service
   */
  private async reportErrorToService(error: PortfolioError, errorInfo: ErrorInfo) {
    try {
      // This would be replaced with actual service integration
      // Examples: Sentry, LogRocket, Bugsnag, custom API
      console.info('📡 Reporting error to monitoring service:', {
        errorId: error.errorId,
        component: error.context.component,
        message: error.message,
      });
    } catch (reportError) {
      console.warn('Failed to report error to external service:', reportError);
    }
  }

  /**
   * Attempt to retry rendering the component
   */
  private handleRetry = () => {
    if (this.state.retryCount >= this.maxRetries) {
      console.warn('Maximum retry attempts reached');
      return;
    }

    const newRetryCount = this.state.retryCount + 1;
    console.log(`🔄 Attempting retry ${newRetryCount}/${this.maxRetries}`);

    // Clear error state and increment retry count
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      errorId: undefined,
      retryCount: newRetryCount,
      showDetails: false,
    });
  };

  /**
   * Copy error details to clipboard
   */
  private copyErrorDetails = async () => {
    if (!this.state.error || !this.state.errorInfo) return;

    const errorDetails = {
      message: this.state.error.message,
      stack: this.state.error.stack,
      componentStack: this.state.errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2));
      console.log('📋 Error details copied to clipboard');
      
      // Show a brief success message (could be replaced with toast notification)
      this.setState({ showDetails: true });
    } catch (err) {
      console.warn('Failed to copy error details:', err);
    }
  };

  /**
   * Toggle error details visibility
   */
  private toggleDetails = () => {
    this.setState(prev => ({ showDetails: !prev.showDetails }));
  };

  public render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo, errorId, showDetails, retryCount } = this.state;
      const canRetry = this.props.allowRetry !== false && retryCount < this.maxRetries;
      const showDevDetails = this.props.showErrorDetails !== false && process.env.NODE_ENV === 'development';

      return (
        <div className="min-h-screen bg-gradient-to-br from-cyber-black via-red-950/20 to-cyber-black text-white flex items-center justify-center p-4">
          {/* Cyberpunk background effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" />
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <motion.div 
            className="max-w-2xl w-full text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Error Icon with glitch effect */}
            <div className="relative mb-8">
              <motion.div
                animate={{
                  rotate: [0, -2, 2, 0],
                  scale: [1, 1.02, 0.98, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="h-24 w-24 mx-auto text-red-500" />
              </motion.div>
              <div className="absolute inset-0 bg-red-500/20 blur-xl animate-pulse"></div>
              
              {/* Glitch lines */}
              <motion.div 
                className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-px bg-red-400"
                animate={{ opacity: [0, 1, 0], scaleX: [0.5, 1, 0.5] }}
                transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 2 }}
              />
            </div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-red-400 font-mono"
              animate={{ textShadow: ['0 0 10px #ef4444', '0 0 20px #ef4444', '0 0 10px #ef4444'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SYSTEM MALFUNCTION
            </motion.h1>
            
            <motion.p 
              className="text-gray-300 mb-8 leading-relaxed text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              The neural interface has encountered a critical error. 
              {canRetry ? 'We can attempt to restore the connection.' : 'Please reload to restore functionality.'}
            </motion.p>
            
            {/* Error ID display */}
            {errorId && (
              <div className="bg-cyber-dark/50 border border-red-500/30 rounded-lg p-3 mb-6 font-mono text-sm">
                <span className="text-gray-400">ERROR_ID:</span>
                <span className="text-red-400 ml-2">{errorId}</span>
              </div>
            )}
            
            {/* Error details for development */}
            {showDevDetails && error && (
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={this.toggleDetails}
                  className="flex items-center justify-center mx-auto mb-4 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-lg transition-colors text-sm"
                >
                  <Bug className="h-4 w-4 mr-2" />
                  <span>Error Details</span>
                  {showDetails ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                </button>
                
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gray-900/60 border border-red-500/30 rounded-lg p-4 text-left backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-red-400 font-semibold text-sm">DEBUG INFORMATION</span>
                        <button
                          onClick={this.copyErrorDetails}
                          className="flex items-center px-2 py-1 text-xs bg-gray-700/50 hover:bg-gray-600/50 rounded transition-colors"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </button>
                      </div>
                      
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="text-gray-400">Message:</span>
                          <div className="text-red-300 font-mono mt-1 break-all">{error.message}</div>
                        </div>
                        
                        {retryCount > 0 && (
                          <div>
                            <span className="text-gray-400">Retry Attempts:</span>
                            <div className="text-yellow-300 font-mono mt-1">{retryCount}/{this.maxRetries}</div>
                          </div>
                        )}
                        
                        {error.stack && (
                          <details className="mt-3">
                            <summary className="text-gray-400 cursor-pointer hover:text-gray-300">Stack Trace</summary>
                            <pre className="text-red-300 font-mono text-xs mt-2 overflow-x-auto whitespace-pre-wrap break-all">
                              {error.stack}
                            </pre>
                          </details>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
            
            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {canRetry && (
                <motion.button
                  onClick={this.handleRetry}
                  className="group px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white rounded-lg font-mono transition-all transform hover:scale-105 shadow-lg"
                  whileHover={{ boxShadow: '0 0 25px rgba(34, 197, 94, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="h-5 w-5 mr-2 group-hover:animate-spin" />
                  Retry Connection ({this.maxRetries - retryCount} left)
                </motion.button>
              )}
              
              <motion.button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-lg font-mono transition-all transform hover:scale-105 shadow-lg"
                whileHover={{ boxShadow: '0 0 25px rgba(6, 182, 212, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Reload Matrix
              </motion.button>
              
              <motion.button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 border-2 border-cyan-400/50 hover:border-cyan-400 text-cyan-400 hover:text-white rounded-lg font-mono transition-all hover:bg-cyan-400/10 backdrop-blur-sm"
                whileHover={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="h-5 w-5 mr-2" />
                Return Home
              </motion.button>
            </motion.div>
            
            {/* System Status */}
            <motion.div 
              className="mt-8 flex flex-wrap justify-center items-center gap-4 text-sm font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center space-x-2 text-red-400/70">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>SYSTEM_STATUS: ERROR</span>
              </div>
              
              <div className="flex items-center space-x-2 text-yellow-400/70">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span>DIAGNOSTICS: RUNNING</span>
              </div>
              
              {canRetry && (
                <div className="flex items-center space-x-2 text-green-400/70">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>RECOVERY: AVAILABLE</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
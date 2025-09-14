/**
 * Development Tools Component
 * Provides debugging interface for development environment
 * Only rendered in development mode
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bug, 
  Activity, 
  Settings, 
  Database, 
  Zap, 
  Eye,
  RefreshCw,
  Download,
  Trash2,
  ChevronRight,
  ChevronDown,
  X,
  Monitor
} from 'lucide-react';
import { errorLogger, useErrorHandler } from '../utils/errorHandling';
import { performanceMonitor, PerformanceDebugger } from '../utils/performance';

interface DevToolsProps {
  isVisible?: boolean;
  onToggle?: () => void;
}

/**
 * DevTools main component - only renders in development
 */
const DevTools: React.FC<DevToolsProps> = ({ isVisible = false, onToggle }) => {
  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const [activeTab, setActiveTab] = useState<'errors' | 'performance' | 'settings' | 'system'>('errors');
  const [isMinimized, setIsMinimized] = useState(false);
  const { recentErrors, getErrorStats, clearErrors } = useErrorHandler();
  const [performanceStats, setPerformanceStats] = useState<any>({});
  const [systemInfo, setSystemInfo] = useState<any>({});

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceStats(performanceMonitor.getStats());
      updateSystemInfo();
    }, 2000);

    // Initial load
    setPerformanceStats(performanceMonitor.getStats());
    updateSystemInfo();

    return () => clearInterval(interval);
  }, []);

  const updateSystemInfo = () => {
    const memory = (performance as any).memory;
    setSystemInfo({
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      memory: memory ? {
        used: `${Math.round(memory.usedJSHeapSize / 1048576)}MB`,
        total: `${Math.round(memory.totalJSHeapSize / 1048576)}MB`,
        limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)}MB`,
      } : null,
      connection: (navigator as any).connection ? {
        effectiveType: (navigator as any).connection.effectiveType,
        downlink: (navigator as any).connection.downlink,
      } : null,
    });
  };

  const exportDebugData = () => {
    const debugData = {
      timestamp: new Date().toISOString(),
      errors: {
        recent: recentErrors,
        stats: getErrorStats(),
      },
      performance: performanceStats,
      system: systemInfo,
    };

    const blob = new Blob([JSON.stringify(debugData, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    clearErrors();
    performanceMonitor.clearMetrics();
    console.log('🧹 All debug data cleared');
  };

  if (!isVisible) {
    return (
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <motion.button
          onClick={onToggle}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white p-3 rounded-full shadow-lg backdrop-blur-sm border border-purple-400/30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Open DevTools"
        >
          <Bug className="h-6 w-6" />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-4 z-50 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-2xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-800/50">
        <div className="flex items-center space-x-3">
          <Bug className="h-6 w-6 text-purple-400" />
          <h2 className="text-lg font-bold text-white">DevTools</h2>
          <div className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded font-mono">
            DEV
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-gray-700/50 rounded transition-colors"
            title="Minimize"
          >
            <Settings className="h-4 w-4 text-gray-400" />
          </button>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-700/50 rounded transition-colors"
            title="Close"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700/50 bg-gray-800/30">
        {[
          { key: 'errors', label: 'Errors', icon: Bug, count: recentErrors.length },
          { key: 'performance', label: 'Performance', icon: Activity, count: performanceStats.totalMetrics || 0 },
          { key: 'system', label: 'System', icon: Monitor },
          { key: 'settings', label: 'Settings', icon: Settings },
        ].map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === key
                ? 'border-purple-400 text-purple-300 bg-gray-700/30'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-gray-700/20'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
            {count !== undefined && count > 0 && (
              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                {count > 99 ? '99+' : count}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'errors' && (
            <ErrorsTab
              key="errors"
              errors={recentErrors}
              stats={getErrorStats()}
              onClear={clearErrors}
            />
          )}
          {activeTab === 'performance' && (
            <PerformanceTab
              key="performance"
              stats={performanceStats}
              onClear={() => performanceMonitor.clearMetrics()}
            />
          )}
          {activeTab === 'system' && (
            <SystemTab
              key="system"
              systemInfo={systemInfo}
            />
          )}
          {activeTab === 'settings' && (
            <SettingsTab
              key="settings"
              onExportData={exportDebugData}
              onClearAll={clearAllData}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/**
 * Errors Tab Component
 */
const ErrorsTab: React.FC<{
  errors: any[];
  stats: any;
  onClear: () => void;
}> = ({ errors, stats, onClear }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-4"
  >
    {/* Error Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
        <div className="text-2xl font-bold text-red-400">{stats.total || 0}</div>
        <div className="text-sm text-gray-400">Total Errors</div>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
        <div className="text-2xl font-bold text-yellow-400">{stats.lastHour || 0}</div>
        <div className="text-sm text-gray-400">Last Hour</div>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
        <div className="text-2xl font-bold text-orange-400">{stats.lastDay || 0}</div>
        <div className="text-sm text-gray-400">Last Day</div>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
        <button
          onClick={onClear}
          className="flex items-center justify-center w-full h-full text-gray-400 hover:text-white transition-colors"
          title="Clear Errors"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>

    {/* Recent Errors */}
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-white flex items-center">
        <Bug className="h-5 w-5 mr-2 text-red-400" />
        Recent Errors ({errors.length})
      </h3>
      
      {errors.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <Bug className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No errors recorded</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-auto">
          {errors.map((error, index) => (
            <ErrorItem key={index} error={error} />
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

/**
 * Error Item Component
 */
const ErrorItem: React.FC<{ error: any }> = ({ error }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 border-red-400/30';
      case 'high': return 'text-orange-400 border-orange-400/30';
      case 'medium': return 'text-yellow-400 border-yellow-400/30';
      case 'low': return 'text-blue-400 border-blue-400/30';
      default: return 'text-gray-400 border-gray-400/30';
    }
  };

  return (
    <div className={`border rounded-lg p-3 bg-gray-800/30 ${getSeverityColor(error.severity || 'medium')}`}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <div className={`px-2 py-1 text-xs rounded font-mono ${getSeverityColor(error.severity || 'medium')}`}>
            {(error.severity || 'medium').toUpperCase()}
          </div>
          <div className="font-mono text-sm text-white truncate">
            {error.error?.message || error.message || 'Unknown error'}
          </div>
        </div>
        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </div>
      
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3 pt-3 border-t border-gray-600/30 space-y-2 text-sm"
        >
          <div>
            <span className="text-gray-400">Component:</span>
            <span className="ml-2 text-white font-mono">
              {error.context?.component || 'Unknown'}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Timestamp:</span>
            <span className="ml-2 text-white font-mono">
              {error.context?.timestamp ? new Date(error.context.timestamp).toLocaleString() : 'Unknown'}
            </span>
          </div>
          {error.error?.stack && (
            <details>
              <summary className="cursor-pointer text-gray-400 hover:text-white">Stack Trace</summary>
              <pre className="mt-2 p-2 bg-gray-900/50 rounded text-xs font-mono text-red-300 overflow-x-auto">
                {error.error.stack}
              </pre>
            </details>
          )}
        </motion.div>
      )}
    </div>
  );
};

/**
 * Performance Tab Component
 */
const PerformanceTab: React.FC<{
  stats: any;
  onClear: () => void;
}> = ({ stats, onClear }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-4"
  >
    {/* Performance Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
        <div className="text-2xl font-bold text-green-400">{stats.totalMetrics || 0}</div>
        <div className="text-sm text-gray-400">Total Metrics</div>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
        <div className="text-2xl font-bold text-blue-400">{stats.recentMetrics || 0}</div>
        <div className="text-sm text-gray-400">Recent (1m)</div>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
        <div className="text-2xl font-bold text-purple-400">
          {stats.memoryUsage ? `${stats.memoryUsage.usage}%` : 'N/A'}
        </div>
        <div className="text-sm text-gray-400">Memory Usage</div>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
        <button
          onClick={onClear}
          className="flex items-center justify-center w-full h-full text-gray-400 hover:text-white transition-colors"
          title="Clear Metrics"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>
    </div>

    {/* Web Vitals */}
    {stats.webVitals && Object.keys(stats.webVitals).length > 0 && (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Zap className="h-5 w-5 mr-2 text-yellow-400" />
          Web Vitals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.entries(stats.webVitals).map(([name, data]: [string, any]) => (
            <div key={name} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
              <div className="flex items-center justify-between">
                <div className="font-mono text-sm text-white">{name}</div>
                <div className={`px-2 py-1 text-xs rounded ${
                  data.rating === 'good' ? 'bg-green-500/20 text-green-300' :
                  data.rating === 'needs-improvement' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {data.rating}
                </div>
              </div>
              <div className="text-xl font-bold text-white mt-1">
                {typeof data.value === 'number' ? data.value.toFixed(1) : data.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Component Performance */}
    {stats.componentStats && stats.componentStats.length > 0 && (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Activity className="h-5 w-5 mr-2 text-blue-400" />
          Slowest Components
        </h3>
        <div className="space-y-2 max-h-64 overflow-auto">
          {stats.componentStats.map((comp: any, index: number) => (
            <div key={comp.componentName} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
              <div className="flex items-center justify-between">
                <div className="font-mono text-white">{comp.componentName}</div>
                <div className="text-sm text-gray-400">
                  {comp.totalRenders} renders
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <div>
                  <span className="text-gray-400">Avg:</span>
                  <span className="ml-1 text-yellow-300">{comp.avgRenderTime}ms</span>
                </div>
                <div>
                  <span className="text-gray-400">Max:</span>
                  <span className="ml-1 text-red-300">{comp.slowestRender}ms</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </motion.div>
);

/**
 * System Tab Component
 */
const SystemTab: React.FC<{
  systemInfo: any;
}> = ({ systemInfo }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-4"
  >
    <h3 className="text-lg font-semibold text-white flex items-center">
      <Database className="h-5 w-5 mr-2 text-green-400" />
      System Information
    </h3>
    
    <div className="space-y-4">
      {/* Browser Info */}
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
        <h4 className="font-semibold text-white mb-2">Browser</h4>
        <div className="text-sm font-mono text-gray-300 break-all">
          {systemInfo.userAgent || 'Unknown'}
        </div>
      </div>

      {/* Memory Info */}
      {systemInfo.memory && (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
          <h4 className="font-semibold text-white mb-2">Memory Usage</h4>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <div className="text-sm text-gray-400">Used</div>
              <div className="text-lg font-mono text-white">{systemInfo.memory.used}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Total</div>
              <div className="text-lg font-mono text-white">{systemInfo.memory.total}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Limit</div>
              <div className="text-lg font-mono text-white">{systemInfo.memory.limit}</div>
            </div>
          </div>
        </div>
      )}

      {/* Connection Info */}
      {systemInfo.connection && (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
          <h4 className="font-semibold text-white mb-2">Network</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-sm text-gray-400">Connection</div>
              <div className="text-lg font-mono text-white">{systemInfo.connection.effectiveType}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Downlink</div>
              <div className="text-lg font-mono text-white">{systemInfo.connection.downlink} Mbps</div>
            </div>
          </div>
        </div>
      )}

      {/* Viewport Info */}
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
        <h4 className="font-semibold text-white mb-2">Viewport</h4>
        <div className="text-lg font-mono text-white">{systemInfo.viewport}</div>
      </div>
    </div>
  </motion.div>
);

/**
 * Settings Tab Component
 */
const SettingsTab: React.FC<{
  onExportData: () => void;
  onClearAll: () => void;
}> = ({ onExportData, onClearAll }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-4"
  >
    <h3 className="text-lg font-semibold text-white flex items-center">
      <Settings className="h-5 w-5 mr-2 text-gray-400" />
      Settings & Actions
    </h3>
    
    <div className="space-y-3">
      <button
        onClick={onExportData}
        className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
      >
        <Download className="h-5 w-5" />
        <span>Export Debug Data</span>
      </button>
      
      <button
        onClick={onClearAll}
        className="w-full flex items-center justify-center space-x-2 p-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
      >
        <Trash2 className="h-5 w-5" />
        <span>Clear All Data</span>
      </button>
      
      <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/30 text-sm text-gray-300">
        <p className="mb-2">🔧 Console Commands:</p>
        <ul className="space-y-1 font-mono text-xs">
          <li>• window.errorLogger.getStats()</li>
          <li>• window.performanceMonitor.getStats()</li>
          <li>• window.PerformanceDebugger.checkMemoryLeaks()</li>
        </ul>
      </div>
    </div>
  </motion.div>
);

export default DevTools;
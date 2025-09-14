import React, { useEffect, useState, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoadingScreen from './components/LoadingScreen';
import { AuthProvider } from './components/pkm/AuthProvider';

// Lazy load components for better performance
const PortfolioLanding = React.lazy(() => import('./components/PortfolioLanding'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const DockerBlog = React.lazy(() => import('./pages/blog/docker'));
const KubernetesBlog = React.lazy(() => import('./pages/blog/kubernetes'));

// PKM System components
const PKMLanding = React.lazy(() => import('./components/pkm/PKMLanding'));
const PKMLogin = React.lazy(() => import('./pages/PKMLogin'));
const PKMSignup = React.lazy(() => import('./pages/PKMSignup'));
const PKMDashboard = React.lazy(() => import('./pages/PKMDashboard'));
const PKMPricing = React.lazy(() => import('./pages/PKMPricing'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle loading completion
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen isVisible={isLoading} />}
        </AnimatePresence>

        {!isLoading && (
          <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
            </div>
          }>
            <Routes>
              {/* Portfolio Routes */}
              <Route path="/" element={<PortfolioLanding />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/docker" element={<DockerBlog />} />
              <Route path="/blog/kubernetes" element={<KubernetesBlog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              
              {/* PKM System Routes */}
              <Route path="/pkm" element={<PKMLanding />} />
              <Route path="/login" element={<PKMLogin />} />
              <Route path="/signup" element={<PKMSignup />} />
              <Route path="/notes" element={<PKMDashboard />} />
              <Route path="/pricing" element={<PKMPricing />} />
            </Routes>
          </Suspense>
        )}
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0a0a0a',
              color: '#00ff41',
              border: '1px solid rgba(0, 255, 65, 0.3)',
              fontFamily: 'monospace',
            },
            success: {
              iconTheme: {
                primary: '#00ff41',
                secondary: '#000000',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff0040',
                secondary: '#000000',
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;

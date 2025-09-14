import React, { useEffect, useState, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';

// Lazy load components for better performance
const PortfolioLanding = React.lazy(() => import('./components/PortfolioLanding'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const DockerBlog = React.lazy(() => import('./pages/blog/docker'));
const KubernetesBlog = React.lazy(() => import('./pages/blog/kubernetes'));

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
            <Route path="/" element={<PortfolioLanding />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/docker" element={<DockerBlog />} />
            <Route path="/blog/kubernetes" element={<KubernetesBlog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </Suspense>
      )}
    </Router>
  );
}

export default App;

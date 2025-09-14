import React from 'react';

const SkipNav: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-cyan-400 text-black font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
    >
      Skip to main content
    </a>
  );
};

export default SkipNav;
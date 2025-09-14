import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cyber-black border-t border-neon-green/20 py-12 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-green/5 to-transparent opacity-30"></div>
      
      {/* Neon line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <div className="text-gray-400 mb-2 font-mono">
              © {currentYear} <span className="text-neon-green font-semibold">Rajesh Avhad</span>
            </div>
            <div className="text-gray-500 text-sm font-mono">
              All rights reserved.
            </div>
          </div>
          
          {/* Tech Stack Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center space-x-3 bg-cyber-dark/60 backdrop-blur-sm px-6 py-3 rounded-full border border-neon-green/30 hover:border-neon-green/60 transition-all duration-300 group cursor-pointer">
              <div className="flex space-x-1">
                {['React', 'TypeScript', 'Tailwind'].map((tech, index) => (
                  <div key={tech} className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" style={{animationDelay: `${index * 0.3}s`}} />
                    <span className="text-xs text-gray-400 group-hover:text-neon-green transition-colors duration-300 font-mono mt-1">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Status */}
          <div className="text-center md:text-right">
            <div className="inline-flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              <span className="text-neon-green text-sm font-mono">System Online</span>
            </div>
            <div className="text-gray-500 text-xs font-mono">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
        
        {/* Bottom decoration */}
        <div className="mt-8 pt-6 border-t border-neon-green/10">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-gray-500 text-xs font-mono">
              <span className="text-neon-green">&lt;</span>
              Made with 
              <span className="text-neon-green mx-1">💚</span>
              and lots of coffee
              <span className="text-neon-green">/&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
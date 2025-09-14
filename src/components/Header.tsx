import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'PKM System', href: '/pkm' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cyber-black/95 backdrop-blur-md border-b border-neon-green/20 shadow-cyber">
      {/* Neon glow line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50"></div>
      
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo with neon effect */}
          <div className="group cursor-pointer">
            <div className="text-2xl font-bold text-white group-hover:text-neon-green transition-colors duration-300">
              <span className="font-mono text-neon-green">&lt;</span>
              <span className="group-hover:animate-glow">Rajesh</span>
              <span className="text-neon-green font-mono">/</span>
              <span className="text-gray-400 group-hover:text-neon-bright transition-colors duration-300">Avhad</span>
              <span className="font-mono text-neon-green">&gt;</span>
            </div>
            <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-neon-green to-neon-bright transition-all duration-500 rounded-full"></div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item, index) => {
              const isExternalLink = item.href.startsWith('#');
              const isRouteLink = item.href.startsWith('/');
              
              if (isRouteLink && !isExternalLink) {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="relative group px-4 py-2 text-gray-300 hover:text-neon-green transition-all duration-300 font-medium font-mono"
                  >
                    <span className="relative z-10 group-hover:animate-glow">{item.name}</span>
                    {/* Hover background */}
                    <div className="absolute inset-0 bg-neon-green/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 border border-neon-green/20 group-hover:border-neon-green/40"></div>
                    {/* Bottom glow line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                  </Link>
                );
              }
              
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative group px-4 py-2 text-gray-300 hover:text-neon-green transition-all duration-300 font-medium font-mono"
                >
                  <span className="relative z-10 group-hover:animate-glow">{item.name}</span>
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-neon-green/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 border border-neon-green/20 group-hover:border-neon-green/40"></div>
                  {/* Bottom glow line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                </a>
              );
            })}
            
            {/* CTA Button */}
            <div className="ml-6">
              <button className="bg-gradient-to-r from-neon-green to-neon-bright hover:from-neon-bright hover:to-neon-green text-black px-6 py-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-neon hover:shadow-neon-lg">
                🚀 Hire Me
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative group p-2 text-gray-300 hover:text-neon-green transition-colors duration-300 border border-gray-700 hover:border-neon-green rounded-lg backdrop-blur-sm"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative z-10">
                {isMenuOpen ? (
                  <X className="block h-6 w-6 group-hover:animate-glow" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6 group-hover:animate-glow" aria-hidden="true" />
                )}
              </div>
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-neon-green/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="mx-2 mt-2 bg-cyber-dark/95 backdrop-blur-md rounded-lg border border-neon-green/20 shadow-neon overflow-hidden">
              <div className="px-4 py-3 space-y-2">
                {navigation.map((item, index) => {
                  const isExternalLink = item.href.startsWith('#');
                  const isRouteLink = item.href.startsWith('/');
                  
                  if (isRouteLink && !isExternalLink) {
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="group flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-neon-green hover:bg-neon-green/10 rounded-lg transition-all duration-300 font-mono border border-transparent hover:border-neon-green/30"
                        onClick={() => setIsMenuOpen(false)}
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <span className="w-2 h-2 bg-gray-600 group-hover:bg-neon-green rounded-full transition-colors duration-300"></span>
                        <span className="group-hover:animate-glow">{item.name}</span>
                      </Link>
                    );
                  }
                  
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-neon-green hover:bg-neon-green/10 rounded-lg transition-all duration-300 font-mono border border-transparent hover:border-neon-green/30"
                      onClick={() => setIsMenuOpen(false)}
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <span className="w-2 h-2 bg-gray-600 group-hover:bg-neon-green rounded-full transition-colors duration-300"></span>
                      <span className="group-hover:animate-glow">{item.name}</span>
                    </a>
                  );
                })}
                
                {/* Mobile CTA */}
                <div className="pt-4 border-t border-neon-green/20">
                  <button className="w-full bg-gradient-to-r from-neon-green to-neon-bright text-black py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-neon">
                    🚀 Hire Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveTerminal from './InteractiveTerminal';
import NightCityBackground from './NightCityBackground';
import BlockchainBackground from './BlockchainBackground';
import CyberHero from './CyberHero';
import About from './About';
import TechStack from './TechStack';
import ToolsShowcase from './ToolsShowcase';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import Header from './Header';
import SEO from './SEO';

const PortfolioLanding: React.FC = () => {
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [showTerminalButton, setShowTerminalButton] = useState(false);
  
  useEffect(() => {
    // Show terminal button after initial animation
    const timer = setTimeout(() => {
      setShowTerminalButton(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isTerminalMode) {
    return <InteractiveTerminal />;
  }

  return (
    <>
      <SEO />
    <div className="min-h-screen bg-cyber-black text-neon-electric font-mono relative overflow-hidden">
      {/* <BlockchainBackground /> */}
      {/* Cyberpunk Grid Background - Responsive */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: 'clamp(30px, 5vw, 50px) clamp(30px, 5vw, 50px)'
        }} />
      </div>
      
      {/* Animated scan lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-neon-electric to-transparent animate-pulse" 
             style={{top: '25%', animationDuration: '3s'}} />
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyberpunk-pink to-transparent animate-pulse" 
             style={{top: '50%', animationDuration: '4s', animationDelay: '1s'}} />
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-neon-green to-transparent animate-pulse" 
             style={{top: '75%', animationDuration: '5s', animationDelay: '2s'}} />
      </div>
      {/* Night City Background */}
      <NightCityBackground />

      {/* Header */}
      <Header />
      
      {/* Enhanced Neon Border */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-electric via-cyberpunk-cyan to-transparent animate-pulse shadow-neon" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyberpunk-pink via-cyberpunk-purple to-transparent animate-pulse shadow-neon" />
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-cyberpunk-blue via-neon-green to-transparent animate-pulse shadow-neon" />
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-cyberpunk-yellow via-cyberpunk-red to-transparent animate-pulse shadow-neon" />
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-electric shadow-neon animate-glow" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyberpunk-pink shadow-neon animate-glow" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyberpunk-blue shadow-neon animate-glow" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-green shadow-neon animate-glow" />
      </div>

      {/* Main Content - Responsive padding */}
      <div className="relative z-20 pt-16 sm:pt-20 lg:pt-24">
        <CyberHero />
      </div>

      {/* Portfolio Sections */}
      <div className="relative z-20">
        <div id="portfolio" />
        <About />
        <TechStack />
        <ToolsShowcase />
        <Projects />
        <Contact />
        <Footer />
      </div>

      {/* Enhanced Cyberpunk "Jack In" Terminal Button - Responsive */}
      <motion.button
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 px-3 py-2 sm:px-6 sm:py-4 rounded-lg bg-gradient-to-br from-cyber-black via-cyber-dark to-cyber-black border-2 border-neon-electric text-neon-electric font-bold font-mono shadow-neon backdrop-blur-md overflow-hidden group"
        whileHover={{ 
          scale: 1.05, 
          boxShadow: '0 0 30px rgba(0,255,255,0.6), inset 0 0 20px rgba(0,255,255,0.1)' 
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsTerminalMode(true)}
        style={{ 
          textShadow: '0 0 10px rgba(0,255,255,0.8)',
          filter: 'drop-shadow(0 0 10px rgba(0,255,255,0.5))'
        }}
      >
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-electric/20 via-cyberpunk-cyan/10 to-neon-electric/20 animate-pulse group-hover:animate-bounce-glow" />
        
        {/* Button content - Responsive text */}
        <span className="relative z-10 flex items-center gap-1 sm:gap-2">
          <span className="animate-pulse">●</span>
          <span className="tracking-wider text-sm sm:text-base">JACK_IN</span>
          <span className="text-xs opacity-70 hidden sm:inline">[ENTER]</span>
        </span>
        
        {/* Glitch lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-cyberpunk-pink opacity-50 group-hover:animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-neon-green opacity-50 group-hover:animate-pulse" />
      </motion.button>
      </div>
    </>
  );
};

export default PortfolioLanding;
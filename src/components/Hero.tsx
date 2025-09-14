import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, Play, Download } from 'lucide-react';
import { TerminalHero } from './TerminalInterface';

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section ref={ref} id="home" className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #000011 0%, #000000 50%, #110000 100%)'
    }}>
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-cyber-black">
        <motion.div 
          className="absolute inset-0" 
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px', '0px 0px'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-green rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, -50, 50, -30],
              opacity: [0, 0.7, 0.3, 0],
              scale: [1, 1.5, 0.8, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center">
        <motion.div 
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Terminal Header */}
          <motion.div 
            className="text-center mb-8"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Terminal className="h-8 w-8 text-green-400" />
              <h1 className="text-3xl font-bold text-white font-mono">
                <span className="text-green-400">rajesh@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-cyan-400">~</span>
                <span className="text-white">$</span>
              </h1>
            </div>
            <p className="text-gray-400 text-lg font-mono">
              Welcome to my interactive portfolio terminal
            </p>
          </motion.div>

          {/* Terminal Interface */}
          <motion.div 
            className="flex justify-center"
            variants={itemVariants}
          >
            <TerminalHero />
          </motion.div>


          {/* Terminal Actions */}
          <motion.div 
            className="flex justify-center gap-4 mt-8"
            variants={itemVariants}
          >
            <motion.button 
              className="group bg-green-600 hover:bg-green-500 text-black px-6 py-3 rounded-lg font-mono font-bold transition-all duration-300 flex items-center justify-center"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.6)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="mr-2 h-5 w-5" />
              Execute Project
            </motion.button>
            
            <motion.button 
              className="border-2 border-cyan-400 hover:bg-cyan-400/10 text-cyan-400 px-6 py-3 rounded-lg font-mono font-semibold transition-all duration-300"
              whileHover={{ 
                scale: 1.02,
                borderColor: '#00ffff',
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="mr-2 h-5 w-5 inline" />
              Download Resume
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
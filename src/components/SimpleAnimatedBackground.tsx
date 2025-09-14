import React from 'react';
import { motion } from 'framer-motion';

const SimpleAnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-black via-gray-900 to-black" />
      
      {/* Animated Grid */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-green rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Scanning Lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`scan-${i}`}
          className="absolute h-px w-full bg-neon-green/20"
          style={{
            top: `${20 + i * 15}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
      
      {/* Matrix-style Digital Rain */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`rain-${i}`}
          className="absolute w-px h-4 bg-neon-green/40"
          style={{
            left: `${5 + i * 4.5}%`,
            top: '-10px',
          }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Glowing Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-20 h-20 rounded-full bg-neon-green/10 blur-xl"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 20}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
            x: [-20, 20, -20],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
      
      {/* Pulse Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`pulse-${i}`}
            className="absolute border border-neon-green/20 rounded-full"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.3,
            }}
          />
        ))}
      </div>
      
      {/* Overlay gradients for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-black/20 to-cyber-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-black/40 via-transparent to-cyber-black/40 pointer-events-none" />
    </div>
  );
};

export default SimpleAnimatedBackground;
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Glitch Text Component
export const GlitchText: React.FC<{ 
  children: string; 
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}> = ({ children, className = '', intensity = 'medium' }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    }, 2000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  const glitchIntensity = {
    low: { x: [-1, 1, -1], scale: [1, 1.01, 1] },
    medium: { x: [-2, 2, -1, 1], scale: [1, 1.02, 0.99, 1] },
    high: { x: [-3, 3, -2, 2], scale: [1, 1.05, 0.95, 1] }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.span
        className="relative z-10"
        animate={isGlitching ? glitchIntensity[intensity] : {}}
        transition={{ duration: 0.1, repeat: isGlitching ? 3 : 0 }}
        style={{
          textShadow: isGlitching 
            ? '2px 0 #ff0080, -2px 0 #00ffff, 0 0 20px #00ff41' 
            : '0 0 20px rgba(0, 255, 65, 0.5)'
        }}
      >
        {children}
      </motion.span>
      
      {/* Glitch layers */}
      <AnimatePresence>
        {isGlitching && (
          <>
            <motion.span
              className="absolute top-0 left-0 text-red-500 opacity-70 mix-blend-screen"
              initial={{ opacity: 0, x: -2 }}
              animate={{ opacity: 0.7, x: 2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.05 }}
            >
              {children}
            </motion.span>
            <motion.span
              className="absolute top-0 left-0 text-cyan-400 opacity-70 mix-blend-screen"
              initial={{ opacity: 0, x: 2 }}
              animate={{ opacity: 0.7, x: -2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.05, delay: 0.02 }}
            >
              {children}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Holographic Border Component
export const HoloBorder: React.FC<{ 
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}> = ({ children, className = '', intensity = 1 }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Corner brackets */}
      {[
        'top-0 left-0 border-t-2 border-l-2 w-6 h-6',
        'top-0 right-0 border-t-2 border-r-2 w-6 h-6',
        'bottom-0 left-0 border-b-2 border-l-2 w-6 h-6',
        'bottom-0 right-0 border-b-2 border-r-2 w-6 h-6'
      ].map((position, i) => (
        <motion.div
          key={i}
          className={`absolute ${position} border-cyan-400`}
          animate={{
            opacity: [0.4, 1, 0.4],
            borderColor: [
              '#00ffff',
              '#ff0080',
              '#00ff41',
              '#00ffff'
            ]
          }}
          transition={{
            duration: 2 + i * 0.1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Scanning line */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 2,
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Neon Glow Effect
export const NeonGlow: React.FC<{ 
  children: React.ReactNode;
  color?: 'cyan' | 'pink' | 'green' | 'yellow';
  className?: string;
}> = ({ children, color = 'cyan', className = '' }) => {
  const colors = {
    cyan: { shadow: '0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff', border: '#00ffff' },
    pink: { shadow: '0 0 20px #ff0080, 0 0 40px #ff0080, 0 0 60px #ff0080', border: '#ff0080' },
    green: { shadow: '0 0 20px #00ff41, 0 0 40px #00ff41, 0 0 60px #00ff41', border: '#00ff41' },
    yellow: { shadow: '0 0 20px #ffff00, 0 0 40px #ffff00, 0 0 60px #ffff00', border: '#ffff00' },
  };

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        filter: 'brightness(1.2)',
        scale: 1.02,
      }}
      animate={{
        boxShadow: [
          colors[color].shadow.replace(/60px/g, '30px'),
          colors[color].shadow,
          colors[color].shadow.replace(/60px/g, '30px'),
        ]
      }}
      transition={{
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        hover: {
          duration: 0.2,
        }
      }}
      style={{
        border: `1px solid ${colors[color].border}`,
        boxShadow: colors[color].shadow.replace(/60px/g, '30px'),
      }}
    >
      {children}
    </motion.div>
  );
};

// Matrix Rain Effect (Clean + Slower)
export const MatrixRain: React.FC<{ density?: number }> = ({ density = 12 }) => {
  const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {[...Array(density)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-300 font-mono text-xs opacity-30"
          style={{
            left: `${(i / density) * 100}%`,
            top: '-50px',
          }}
          animate={{
            y: ['0vh', '120vh'],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 6,
          }}
        >
          {[...Array(18)].map((_, j) => (
            <div
              key={j}
              className="block leading-4"
              style={{
                opacity: 1 - (j * 0.06),
                color: j < 4 ? '#e2e8f0' : '#00ff41',
              }}
            >
              {characters[Math.floor(Math.random() * characters.length)]}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// Cyberpunk Panel
export const CyberPanel: React.FC<{ 
  children: React.ReactNode;
  title?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'warning';
}> = ({ children, title, className = '', variant = 'primary' }) => {
  const variants = {
    primary: { 
      border: 'border-cyan-400', 
      bg: 'bg-black/80', 
      accent: 'bg-cyan-400',
      shadow: 'shadow-cyan-400/50'
    },
    secondary: { 
      border: 'border-pink-500', 
      bg: 'bg-black/80', 
      accent: 'bg-pink-500',
      shadow: 'shadow-pink-500/50'
    },
    warning: { 
      border: 'border-yellow-400', 
      bg: 'bg-black/80', 
      accent: 'bg-yellow-400',
      shadow: 'shadow-yellow-400/50'
    },
  };

  const style = variants[variant];

  return (
    <motion.div
      className={`relative ${style.bg} ${style.border} border backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
        borderColor: '#ffffff'
      }}
    >
      {title && (
        <div className={`absolute -top-3 left-4 ${style.accent} text-black px-2 py-1 text-xs font-bold`}>
          {title}
        </div>
      )}
      
      {/* Corner decorations */}
      <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-white/50" />
      <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-white/50" />
      <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-white/50" />
      <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-white/50" />
      
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  );
};

// Data Stream Visualization
export const DataStream: React.FC = () => {
  const [dataLines, setDataLines] = useState<string[]>([]);
  
  useEffect(() => {
    const generateDataLine = () => {
      const prefixes = ['SYS_', 'NET_', 'DATA_', 'PROC_', 'MEM_', 'CPU_'];
      const suffixes = ['INIT', 'PROC', 'DONE', 'ERR', 'OK', 'FAIL'];
      const numbers = Math.random().toString(16).substr(2, 8).toUpperCase();
      
      return `${prefixes[Math.floor(Math.random() * prefixes.length)]}${numbers}_${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
    };
    
    const interval = setInterval(() => {
      setDataLines(prev => {
        const newLines = [...prev, generateDataLine()].slice(-10);
        return newLines;
      });
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="font-mono text-xs text-green-400 h-32 overflow-hidden bg-black/50 p-2 border border-green-400/30">
      <AnimatePresence>
        {dataLines.map((line, index) => (
          <motion.div
            key={`${line}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1 - (index * 0.1), x: 0 }}
            exit={{ opacity: 0 }}
            className="leading-4"
          >
            <span className="text-cyan-400">&gt;</span> {line}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
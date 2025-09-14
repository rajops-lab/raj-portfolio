import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GlitchText, DataStream } from './CyberpunkEffects';

interface LoadingScreenProps {
  isVisible: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible }) => {
  const [loadingText, setLoadingText] = useState('JACK_IN_DETECTED');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const texts = [
      'JACK_IN_DETECTED',
      'NEURAL_INTERFACE_SYNC',
      'WELCOME_TO_NIGHT_CITY'
    ];
    let currentIndex = 0;

    const textInterval = setInterval(() => {
      if (currentIndex < texts.length - 1) {
        currentIndex++;
        setLoadingText(texts[currentIndex]);
      }
    }, 850);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 bg-grid-pattern"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 0, 128, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Central loading content */}
      <div className="relative z-10 text-center">
        {/* Matrix-style border */}
        <motion.div
          className="relative p-8 border border-cyan-400/40 bg-cyber-black/80 backdrop-blur-sm"
          animate={{
            boxShadow: [
              '0 0 20px rgba(0, 255, 65, 0.3)',
              '0 0 30px rgba(0, 255, 65, 0.5)',
              '0 0 20px rgba(0, 255, 65, 0.3)',
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-green" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-green" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-green" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-green" />

          {/* Loading text */}
          <motion.h1
            className="text-3xl font-bold font-mono mb-8 tracking-wider"
            animate={{
              textShadow: [
                '0 0 10px rgba(0, 255, 255, 0.5)',
                '0 0 20px rgba(255, 0, 128, 0.7)',
                '0 0 10px rgba(255, 255, 0, 0.6)',
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <GlitchText intensity="high" className="text-cyan-300">
              {loadingText}
            </GlitchText>
          </motion.h1>

          {/* Progress bar */}
          <div className="w-64 h-2 bg-cyber-gray border border-cyan-400/30 relative overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-300"
              style={{ width: `${progress}%` }}
              initial={{ width: '0%' }}
              animate={{
                boxShadow: [
                  '0 0 10px rgba(0, 255, 65, 0.6)',
                  '0 0 20px rgba(0, 255, 65, 0.8)',
                  '0 0 10px rgba(0, 255, 65, 0.6)',
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
            />
            
            {/* Scanning line effect */}
            <motion.div
              className="absolute top-0 left-0 w-1 h-full bg-cyan-300/80"
              animate={{
                left: ['0%', '100%', '0%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>

          {/* Progress percentage */}
          <motion.div
            className="mt-4 text-cyan-300 font-mono text-lg"
            animate={{
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {progress}%
          </motion.div>

          {/* Animated dots */}
          <motion.div
            className="mt-2 flex justify-center space-x-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-neon-green rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>

      {/* Bottom text */}
      <motion.p
        className="mt-6 text-cyan-300/80 font-mono text-sm"
          animate={{
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
>
          JACKING IN... PLEASE STAND BY
        </motion.p>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-green/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  );
};

export default LoadingScreen;
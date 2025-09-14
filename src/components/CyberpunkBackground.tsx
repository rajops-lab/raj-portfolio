import React from 'react';
import { motion } from 'framer-motion';
import { MatrixRain } from './CyberpunkEffects';

const CyberpunkBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base cyberpunk gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at top, #0a0014 0%, #000000 50%),
            linear-gradient(180deg, #001122 0%, #000000 40%, #220011 100%)
          `
        }}
      />
      
      {/* Neon city skyline silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            background: `
              linear-gradient(to top, 
                #000000 0%, 
                #111111 20%, 
                transparent 100%
              )
            `
          }}
        />
        {/* Building silhouettes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 bg-black/80"
            style={{
              left: `${i * 7}%`,
              width: `${3 + Math.random() * 5}%`,
              height: `${40 + Math.random() * 60}%`,
            }}
            animate={{
              boxShadow: [
                `0 0 20px rgba(0, 255, 255, ${0.1 + Math.random() * 0.2})`,
                `0 0 40px rgba(255, 0, 128, ${0.1 + Math.random() * 0.2})`,
                `0 0 20px rgba(0, 255, 65, ${0.1 + Math.random() * 0.2})`,
                `0 0 20px rgba(0, 255, 255, ${0.1 + Math.random() * 0.2})`,
              ]
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Random windows */}
            {[...Array(Math.floor(3 + Math.random() * 5))].map((_, j) => (
              <motion.div
                key={j}
                className="absolute w-1 h-1 bg-cyan-400"
                style={{
                  left: `${20 + (j % 3) * 30}%`,
                  top: `${10 + Math.floor(j / 3) * 20}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  backgroundColor: [
                    '#00ffff',
                    '#ff0080', 
                    '#00ff41',
                    '#ffff00'
                  ]
                }}
                transition={{
                  duration: 2 + Math.random() * 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>

      {/* Cyberpunk grid */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0px 0px', '80px 80px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 128, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Neon scan lines */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px"
            style={{
              top: `${i * 10 + 5}%`,
              background: 'linear-gradient(90deg, transparent, #00ffff, #ff0080, #00ffff, transparent)',
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Floating neon particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2],
            backgroundColor: [
              '#00ffff',
              '#ff0080',
              '#00ff41',
              '#ffff00',
              '#00ffff'
            ],
            boxShadow: [
              '0 0 10px #00ffff',
              '0 0 20px #ff0080',
              '0 0 15px #00ff41',
              '0 0 25px #ffff00',
              '0 0 10px #00ffff'
            ],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Data streams */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
          style={{
            left: `${15 + i * 15}%`,
            height: '100%',
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleY: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Holographic interference */}
      <motion.div
        className="absolute inset-0 opacity-5 mix-blend-screen"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, #00ffff 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, #ff0080 0%, transparent 50%)',
            'radial-gradient(circle at 50% 10%, #00ff41 0%, transparent 50%)',
            'radial-gradient(circle at 10% 90%, #ffff00 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, #00ffff 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Matrix rain overlay */}
      <MatrixRain density={30} />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, 
              transparent 0%, 
              transparent 40%, 
              rgba(0, 0, 0, 0.3) 80%, 
              rgba(0, 0, 0, 0.8) 100%
            )
          `
        }}
      />

      {/* Cyberpunk overlay gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(0, 255, 255, 0.03) 0%, 
              transparent 25%, 
              transparent 75%, 
              rgba(255, 0, 128, 0.03) 100%
            )
          `
        }}
      />
    </div>
  );
};

export default CyberpunkBackground;
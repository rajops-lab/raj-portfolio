import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const BlockchainBackground: React.FC = () => {
  const columns = 25;
  const rows = 15;

  const blocks = useMemo(() => {
    return Array.from({ length: columns * rows });
  }, [columns, rows]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const blockVariants = {
    hidden: { opacity: 0.1, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        yoyo: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <motion.div
        className="grid h-full w-full"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {blocks.map((_, i) => (
          <motion.div
            key={i}
            className="border border-neon-green/10"
            variants={blockVariants}
            transition={{
              duration: Math.random() * 1.5 + 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{ 
              animationDelay: `${i * 0.02}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
            animate={{ 
                backgroundColor: ['rgba(0, 255, 65, 0)', 'rgba(0, 255, 65, 0.15)', 'rgba(0, 255, 65, 0)'],
                boxShadow: ['none', '0 0 8px rgba(0, 255, 65, 0.3)', 'none']
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default BlockchainBackground;

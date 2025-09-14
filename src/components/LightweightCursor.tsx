import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LightweightCursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment and not on mobile
    if (typeof window === 'undefined') return;
    
    try {
      const isMobile = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      if (isMobile) return;
      
      setIsVisible(true);
    } catch (error) {
      return;
    }

    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', updateCursor, { passive: true });
    return () => document.removeEventListener('mousemove', updateCursor);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] w-6 h-6 border border-neon-green rounded-full mix-blend-difference"
      animate={{
        x: cursorPosition.x - 12,
        y: cursorPosition.y - 12,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.2,
      }}
    >
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-neon-green rounded-full transform -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  );
};

export default LightweightCursor;
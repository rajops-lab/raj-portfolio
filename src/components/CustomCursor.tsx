import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [trailPositions, setTrailPositions] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;
    
    let animationFrameId: number;
    let trailId = 0;

    const updateCursor = (e: MouseEvent) => {
      try {
        setCursorPosition({ x: e.clientX, y: e.clientY });
        
      // Add trail position (reduced frequency)
      if (trailId % 2 === 0) { // Only update trail every other frame
        setTrailPositions(prev => {
          const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ };
          const updatedTrail = [...prev, newTrail].slice(-4); // Reduced to 4 positions
          return updatedTrail;
        });
      }
      trailId++;
      } catch (error) {
        console.warn('Cursor update error:', error);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Handle hover states for interactive elements
    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('a, button, [role="button"], .cursor-pointer')) {
        setCursorVariant('pointer');
      } else if (target.matches('input, textarea, select')) {
        setCursorVariant('text');
      } else if (target.matches('.tech-chip, .project-card')) {
        setCursorVariant('hover');
      } else {
        setCursorVariant('default');
      }
    };

    // Removed unnecessary animation frame loop

    document.addEventListener('mousemove', updateCursor, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Don't render on mobile devices
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      
      const isMobile = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      if (isMobile) {
        setIsVisible(false);
      }
    } catch (error) {
      console.warn('Mobile detection error:', error);
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  const cursorVariants = {
    default: {
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      scale: 1,
      opacity: 1,
      mixBlendMode: 'difference' as any,
    },
    pointer: {
      x: cursorPosition.x - 24,
      y: cursorPosition.y - 24,
      scale: 1.5,
      opacity: 0.8,
      mixBlendMode: 'difference' as any,
    },
    text: {
      x: cursorPosition.x - 8,
      y: cursorPosition.y - 16,
      scale: 0.8,
      opacity: 1,
      mixBlendMode: 'difference' as any,
    },
    hover: {
      x: cursorPosition.x - 32,
      y: cursorPosition.y - 32,
      scale: 2,
      opacity: 0.6,
      mixBlendMode: 'difference' as any,
    },
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={cursorVariants[cursorVariant as keyof typeof cursorVariants]}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          mass: 0.3,
        }}
      >
        {/* Outer ring - simplified rotation */}
        <motion.div
          className="w-8 h-8 border-2 border-neon-green rounded-full"
          animate={{
            rotate: cursorVariant === 'hover' ? 180 : 0,
            borderColor: cursorVariant === 'hover' 
              ? '#39ff14' 
              : cursorVariant === 'pointer' 
              ? '#00ffff' 
              : '#00ff41',
          }}
          transition={{
            duration: 0.3,
            ease: 'easeOut'
          }}
        />
        
        {/* Inner dot - simplified animation */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-neon-green rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: cursorVariant === 'text' ? 0.5 : cursorVariant === 'hover' ? 1.5 : 1,
            backgroundColor: cursorVariant === 'hover' 
              ? '#39ff14' 
              : cursorVariant === 'pointer' 
              ? '#00ffff' 
              : '#00ff41',
          }}
          transition={{
            duration: 0.2,
            ease: 'easeOut'
          }}
        />
      </motion.div>

      {/* Simplified cursor trail */}
      {trailPositions.map((position, index) => (
        <motion.div
          key={position.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] w-2 h-2 bg-neon-green/40 rounded-full"
          animate={{
            x: position.x - 4,
            y: position.y - 4,
            scale: 0.8 - index * 0.2,
            opacity: 0.5 - index * 0.12,
          }}
          transition={{
            duration: 0.1,
            ease: 'linear',
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
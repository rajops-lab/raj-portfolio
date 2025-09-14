import React, { createContext, useContext } from 'react';
import { useInView } from 'framer-motion';

interface ScrollAnimationContextType {
  // Animation variants
  fadeInUp: any;
  fadeInLeft: any;
  fadeInRight: any;
  scaleIn: any;
  slideInFromBottom: any;
  staggerContainer: any;
  staggerItem: any;
}

const ScrollAnimationContext = createContext<ScrollAnimationContextType | null>(null);

export const useScrollAnimation = () => {
  const context = useContext(ScrollAnimationContext);
  if (!context) {
    throw new Error('useScrollAnimation must be used within a ScrollAnimationProvider');
  }
  return context;
};

// Animation variants
export const animationVariants = {
  // Fade in from bottom with upward movement
  fadeInUp: {
    hidden: { 
      opacity: 0, 
      y: 60,
      transition: {
        duration: 0.3
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  // Fade in from left
  fadeInLeft: {
    hidden: { 
      opacity: 0, 
      x: -60,
      transition: {
        duration: 0.3
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  // Fade in from right
  fadeInRight: {
    hidden: { 
      opacity: 0, 
      x: 60,
      transition: {
        duration: 0.3
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  // Scale in from center
  scaleIn: {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  // Slide in from bottom
  slideInFromBottom: {
    hidden: { 
      opacity: 0, 
      y: 100,
      transition: {
        duration: 0.3
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  // Container for staggered animations
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  // Items for staggered animations
  staggerItem: {
    hidden: { 
      opacity: 0, 
      y: 30,
      transition: {
        duration: 0.3
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }
};

// Hook for creating intersection observer animations
export const useScrollTrigger = (threshold = 0.1, rootMargin = '0px') => {
  return useInView({
    threshold,
    rootMargin,
    once: true,
  });
};

// Enhanced animation variants with neon effects
export const neonAnimationVariants = {
  // Neon glow fade in
  neonFadeIn: {
    hidden: { 
      opacity: 0,
      textShadow: '0 0 0px rgba(0, 255, 65, 0)',
      boxShadow: '0 0 0px rgba(0, 255, 65, 0)'
    },
    visible: { 
      opacity: 1,
      textShadow: [
        '0 0 10px rgba(0, 255, 65, 0.5)',
        '0 0 20px rgba(0, 255, 65, 0.8)',
        '0 0 10px rgba(0, 255, 65, 0.5)'
      ],
      boxShadow: [
        '0 0 10px rgba(0, 255, 65, 0.3)',
        '0 0 20px rgba(0, 255, 65, 0.6)',
        '0 0 10px rgba(0, 255, 65, 0.3)'
      ],
      transition: {
        duration: 1.5,
        textShadow: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        },
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }
    }
  },

  // Matrix-style data stream
  matrixStream: {
    hidden: { 
      opacity: 0,
      scaleY: 0 
    },
    visible: { 
      opacity: [0, 1, 0],
      scaleY: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.5, 1]
      }
    }
  },

  // Cyber border animation
  cyberBorder: {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 2,
          ease: 'easeInOut'
        },
        opacity: {
          duration: 0.3
        }
      }
    }
  }
};

const ScrollAnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = {
    fadeInUp: animationVariants.fadeInUp,
    fadeInLeft: animationVariants.fadeInLeft,
    fadeInRight: animationVariants.fadeInRight,
    scaleIn: animationVariants.scaleIn,
    slideInFromBottom: animationVariants.slideInFromBottom,
    staggerContainer: animationVariants.staggerContainer,
    staggerItem: animationVariants.staggerItem,
  };

  return (
    <ScrollAnimationContext.Provider value={value}>
      {children}
    </ScrollAnimationContext.Provider>
  );
};

export default ScrollAnimationProvider;
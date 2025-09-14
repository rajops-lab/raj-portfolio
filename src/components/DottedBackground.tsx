import React from 'react';
import { motion } from 'framer-motion';

interface DottedBackgroundProps {
  className?: string;
  opacity?: number;
  dotSize?: 'small' | 'medium' | 'large';
  color?: 'cyan' | 'pink' | 'green' | 'white';
}

const DottedBackground: React.FC<DottedBackgroundProps> = ({
  className = '',
  opacity = 0.1,
  dotSize = 'medium',
  color = 'cyan'
}) => {
  const sizeMap = {
    small: '20px_20px',
    medium: '40px_40px', 
    large: '60px_60px'
  };

  const colorMap = {
    cyan: 'rgba(0,255,255,0.3)',
    pink: 'rgba(255,0,128,0.3)',
    green: 'rgba(0,255,65,0.3)',
    white: 'rgba(255,255,255,0.3)'
  };

  const backgroundStyle = {
    backgroundImage: `radial-gradient(${colorMap[color]}_1px,transparent_1px)`,
    backgroundSize: sizeMap[dotSize],
    backgroundPosition: '0_0'
  };

  return (
    <motion.div
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        ...backgroundStyle,
        opacity
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1 }}
    />
  );
};

export default DottedBackground;
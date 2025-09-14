import React from 'react';
import { motion } from 'framer-motion';
import { MatrixRain } from './CyberpunkEffects';

const NightCityBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Night City Skyline */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.25) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 51, 102, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
              linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)
            `
          }}
        />

        {/* Deterministic Skyline Silhouette (SVG) */}
        <svg className="absolute bottom-0 left-0 w-full" height="45vh" viewBox="0 0 1200 400" preserveAspectRatio="none">
          {/* Silhouette base */}
          <rect x="0" y="350" width="1200" height="50" fill="#000" />
          {/* Buildings - fixed positions */}
          <rect x="20" y="250" width="60" height="100" fill="#0d0d0d" />
          <rect x="90" y="200" width="90" height="150" fill="#0f0f0f" />
          <rect x="200" y="180" width="70" height="170" fill="#0e0e0e" />
          <rect x="280" y="220" width="100" height="130" fill="#0d0d0d" />
          <rect x="400" y="160" width="80" height="190" fill="#0e0e0e" />
          <rect x="500" y="210" width="60" height="140" fill="#0f0f0f" />
          <rect x="580" y="190" width="110" height="160" fill="#0d0d0d" />
          <rect x="710" y="230" width="90" height="120" fill="#0f0f0f" />
          <rect x="820" y="170" width="70" height="180" fill="#0e0e0e" />
          <rect x="900" y="240" width="80" height="110" fill="#0d0d0d" />
          <rect x="1000" y="200" width="100" height="150" fill="#0f0f0f" />
          <rect x="1120" y="220" width="60" height="130" fill="#0e0e0e" />
          
          {/* Subtle neon accents (cyan/pink only) */}
          <rect x="95" y="240" width="80" height="2" fill="#00ffff" opacity="0.15" />
          <rect x="405" y="200" width="70" height="2" fill="#ff0080" opacity="0.15" />
          <rect x="910" y="270" width="60" height="2" fill="#00ffff" opacity="0.15" />
        </svg>
      </div>

      {/* Matrix Rain - reduced density */}
      <MatrixRain density={12} />

      {/* Cyberpunk Grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 128, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Neon Scan Lines - ultra low opacity, slower */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.01) 50%, transparent 100%)'
        }}
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear', repeatDelay: 6 }}
      />

      {/* Horizontal Scan Lines - ultra low opacity, slower */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(255, 0, 128, 0.01) 50%, transparent 100%)'
        }}
        animate={{ y: ['-100%', '200%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear', repeatDelay: 8 }}
      />

      {/* Subtle Vignette for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%)'
        }}
      />

      {/* Ambient Light Effects (minimal) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.03) 0%, transparent 40%)',
            'radial-gradient(circle at 80% 80%, rgba(255, 0, 128, 0.03) 0%, transparent 40%)',
            'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0) 0%, transparent 40%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Matrix Rain */}
      <MatrixRain density={12} />
    </div>
  );
};

export default NightCityBackground;
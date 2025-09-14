import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const NeonDot: React.FC<{ left: number; delay: number }> = ({ left, delay }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full"
    style={{ left: `${left}%`, backgroundColor: '#00ff41', boxShadow: '0 0 8px #00ff41' }}
    animate={{
      y: [-20, 20, -20],
      opacity: [0.1, 0.7, 0.1],
      scale: [1, 1.4, 1],
    }}
    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

const Typewriter: React.FC<{ phrases: string[] }> = ({ phrases }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseDuration = isDeleting ? 500 : 2000;

    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        if (isDeleting) {
          setCurrentIndex((prev) => (prev + 1) % phrases.length);
          setIsDeleting(false);
        } else {
          setIsDeleting(true);
        }
        return;
      }

      if (!isDeleting) {
        // Typing
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          // Finished typing, pause before deleting
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Finished deleting, pause before next phrase
          setIsPaused(true);
        }
      }
    }, isPaused ? pauseDuration : typeSpeed);

    return () => clearTimeout(timeout);
  }, [phrases, currentIndex, displayText, isDeleting, isPaused]);

  return (
    <div className="font-mono text-2xl md:text-4xl lg:text-5xl font-extrabold min-h-[3rem] md:min-h-[4rem] lg:min-h-[5rem]">
      <span className="text-white">I am a </span>
      <span
        className="text-neon-green inline-block min-w-[1ch]"
        style={{ textShadow: '0 0 12px rgba(0,255,65,0.7), 0 0 24px rgba(0,255,65,0.5)' }}
      >
        {displayText}
        <motion.span 
          className="inline-block w-0.5 h-6 md:h-8 lg:h-10 align-middle ml-1 bg-neon-green" 
          style={{ boxShadow: '0 0 10px #00ff41' }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
    </div>
  );
};

const MatrixMini: React.FC = () => {
  const chars = '01';
  const cols = 10;
  const rows = 8;
  const grid = useMemo(
    () => Array.from({ length: rows }, () => Array.from({ length: cols }, () => chars[Math.floor(Math.random() * chars.length)]) ),
    []
  );
  return (
    <div className="absolute inset-2 grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {grid.flatMap((row, r) =>
        row.map((ch, c) => (
          <motion.div
            key={`${r}-${c}`}
            className="text-[9px] leading-3 text-[#00ff41]/60 font-mono text-center"
            animate={{ opacity: [0.1, 1, 0.1] }}
            transition={{ duration: 2 + (r + c) * 0.1, repeat: Infinity }}
          >
            {ch}
          </motion.div>
        ))
      )}
    </div>
  );
};

const NeonProfile: React.FC = () => {
  return (
    <div className="relative w-40 h-40 md:w-52 md:h-52 mx-auto">
      {/* Rotating neon ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: '2px solid transparent',
          background: 'linear-gradient(#000,#000) padding-box, linear-gradient(90deg,#00ffff,#39ff14,#00ffff) border-box',
          boxShadow: '0 0 20px rgba(0,255,255,0.25), 0 0 30px rgba(57,255,20,0.15)'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      {/* Inner circle */}
      <div className="absolute inset-2 rounded-full bg-black/90 overflow-hidden" style={{ backdropFilter: 'blur(2px)' }}>
        {/* Subtle gradient */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(0,255,65,0.08), transparent 60%)'
          }}
        />
        {/* Mini matrix rain */}
        <MatrixMini />
        {/* Initials placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-extrabold text-xl md:text-2xl tracking-widest text-white/90" style={{ textShadow: '0 0 10px rgba(0,255,65,0.6)' }}>
            RA
          </div>
        </div>
      </div>
    </div>
  );
};

const CyberHero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center">
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ['0px 0px', '40px 40px', '0px 0px'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,65,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <NeonDot key={i} left={Math.random() * 100} delay={Math.random() * 3} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div>
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" style={{ boxShadow: '0 0 10px #00ff41' }} />
            <span className="text-[#00ff41] font-mono text-sm tracking-widest" style={{ textShadow: '0 0 10px rgba(0,255,65,0.6)' }}>
              SYSTEM ONLINE
            </span>
          </div>

          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.1)' }}
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Rajesh
            </span>
            <span className="text-neon-electric ml-2">Avhad</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <Typewriter
              phrases={[
                'Solution Developer',
                'DevOps Engineer',
                'Cloud Architect', 
                'Kubernetes Expert',
                'Python Developer',
                'Terraform Developer',
                'Microservices Architect'
              ]}
            />
          </motion.div>

          {/* Professional Description */}
          <motion.div 
            className="mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
              Specialized in building <span className="text-neon-green font-semibold">scalable cloud infrastructure</span> and 
              <span className="text-cyberpunk-cyan font-semibold"> microservices architectures</span>. 
              Expert in Kubernetes, Docker, and modern DevOps practices with 
              <span className="text-neon-bright font-semibold">5+ years</span> of experience delivering 
              enterprise-grade solutions.
            </p>
            
            {/* Key Skills Highlight */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { skill: 'Kubernetes', colorClass: 'text-neon-green border-neon-green/50', hoverShadow: 'rgba(0,255,65,0.5)' },
                { skill: 'Docker', colorClass: 'text-neon-electric border-neon-electric/50', hoverShadow: 'rgba(0,255,255,0.5)' },
                { skill: 'AWS/Azure', colorClass: 'text-cyberpunk-purple border-cyberpunk-purple/50', hoverShadow: 'rgba(128,0,255,0.5)' },
                { skill: 'React/Node.js', colorClass: 'text-neon-bright border-neon-bright/50', hoverShadow: 'rgba(57,255,20,0.5)' },
              ].map((item, index) => (
                <motion.span
                  key={item.skill}
                  className={`px-3 py-1 text-xs font-mono rounded-full border bg-black/50 backdrop-blur-sm ${item.colorClass}`}
                  style={{
                    boxShadow: '0 0 8px rgba(0,255,65,0.2)'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: `0 0 15px ${item.hoverShadow}` 
                  }}
                >
                  {item.skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <motion.button
              className="group px-6 py-3 bg-gradient-to-r from-neon-green to-neon-bright text-black font-bold rounded-lg font-mono transition-all duration-300 shadow-neon overflow-hidden relative"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,255,65,0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>🚀</span>
                <span>Hire Me</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-bright to-neon-green opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.button>
            
            <motion.button
              className="group px-6 py-3 border-2 border-neon-electric text-neon-electric font-bold rounded-lg font-mono transition-all duration-300 hover:bg-neon-electric hover:text-black backdrop-blur-sm"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,255,255,0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                projectsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="flex items-center gap-2">
                <span>💼</span>
                <span>View Projects</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Status Badges */}
          <motion.div 
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.span 
              className="px-3 py-1 rounded-full border text-xs font-mono text-neon-green bg-black/30 backdrop-blur-sm"
              style={{ borderColor: 'rgba(0,255,65,0.5)', boxShadow: '0 0 12px rgba(0,255,65,0.3)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,255,65,0.5)' }}
            >
              <span className="inline-block w-2 h-2 bg-neon-green rounded-full mr-2 animate-pulse"></span>
              Available for Projects
            </motion.span>
            
            <motion.span 
              className="px-3 py-1 rounded-full border text-xs font-mono text-neon-electric bg-black/30 backdrop-blur-sm"
              style={{ borderColor: 'rgba(0,255,255,0.5)', boxShadow: '0 0 12px rgba(0,255,255,0.25)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,255,255,0.4)' }}
            >
              <span className="inline-block w-2 h-2 bg-neon-electric rounded-full mr-2 animate-pulse"></span>
              System Online
            </motion.span>
            
            <motion.span 
              className="px-3 py-1 rounded-full border text-xs font-mono text-cyberpunk-purple bg-black/30 backdrop-blur-sm"
              style={{ borderColor: 'rgba(128,0,255,0.5)', boxShadow: '0 0 12px rgba(128,0,255,0.25)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(128,0,255,0.4)' }}
            >
              <span className="inline-block w-2 h-2 bg-cyberpunk-purple rounded-full mr-2 animate-pulse"></span>
              5+ Years Experience
            </motion.span>
          </motion.div>
        </div>

        {/* Right: Neon Profile */}
        <div className="flex justify-center md:justify-end">
          <NeonProfile />
        </div>
      </div>
    </section>
  );
};

export default CyberHero;

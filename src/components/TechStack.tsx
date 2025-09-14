import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code, Database, Globe, GitBranch, Settings, Cloud, Container, Monitor, Shield, Server, Zap, Cpu 
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// --- Data Definition ---
const techData = {
  categories: [
    { id: 'devops', name: 'DevOps & Cloud' },
    { id: 'backend', name: 'Backend & Databases' },
    { id: 'frontend', name: 'Frontend & UI' },
    { id: 'testing', name: 'Testing & QA' },
  ],
  tools: [
    { name: 'Docker', category: 'devops', icon: Container, href: '/blog/docker', proficiency: 95 },
    { name: 'Kubernetes', category: 'devops', icon: Cpu, href: '/blog/kubernetes', proficiency: 90 },
    { name: 'AWS', category: 'devops', icon: Cloud, proficiency: 85 },
    { name: 'Terraform', category: 'devops', icon: Settings, proficiency: 90 },
    { name: 'Jenkins', category: 'devops', icon: GitBranch, proficiency: 80 },
    { name: 'GitHub Actions', category: 'devops', icon: GitBranch, proficiency: 88 },
    { name: 'Prometheus', category: 'devops', icon: Monitor, proficiency: 85 },
    { name: 'Grafana', category: 'devops', icon: Monitor, proficiency: 87 },
    { name: 'Go', category: 'backend', icon: Code, proficiency: 92 },
    { name: 'Python', category: 'backend', icon: Code, proficiency: 88 },
    { name: 'Node.js', category: 'backend', icon: Code, proficiency: 85 },
    { name: 'PostgreSQL', category: 'backend', icon: Database, proficiency: 80 },
    { name: 'MongoDB', category: 'backend', icon: Database, proficiency: 75 },
    { name: 'Redis', category: 'backend', icon: Zap, proficiency: 82 },
    { name: 'React', category: 'frontend', icon: Code, proficiency: 90 },
    { name: 'TypeScript', category: 'frontend', icon: Code, proficiency: 93 },
    { name: 'TailwindCSS', category: 'frontend', icon: Settings, proficiency: 88 },
    { name: 'Jest', category: 'testing', icon: Shield, proficiency: 80 },
    { name: 'Cypress', category: 'testing', icon: Globe, proficiency: 75 },
  ],
};

// --- Reusable Components ---

const SectionHeader = ({ inView }: { inView: boolean }) => (
  <motion.div 
    className="text-center mb-12 sm:mb-16 px-4"
    initial={{ opacity: 0, y: 50 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-cyber">
      Technology <span className="text-neon-green">Arsenal</span>
    </h2>
    <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
      A curated list of tools and technologies I wield to build next-generation solutions.
    </p>
  </motion.div>
);

const CategoryFilter = ({ categories, selected, setSelected }: any) => (
  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4">
    {categories.map((cat: any) => (
      <motion.button
        key={cat.id}
        onClick={() => setSelected(cat.id === selected ? null : cat.id)}
        className={`px-3 sm:px-4 py-2 rounded-lg font-mono text-xs sm:text-sm border-2 transition-all duration-300 ${
          selected === cat.id
            ? 'bg-neon-green/90 text-cyber-black border-neon-green shadow-neon'
            : 'bg-cyber-dark/50 text-gray-300 border-cyber-light hover:border-neon-green hover:text-neon-green'
        }`}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        {cat.name}
      </motion.button>
    ))}
  </div>
);

const TechChip = ({ tool, index }: { tool: any, index: number }) => {
  const chipVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 12, delay: index * 0.05 },
    },
  };

  const content = (
    <motion.div
      variants={chipVariants}
      className="group relative bg-cyber-gray p-3 sm:p-4 rounded-lg border border-cyber-light overflow-hidden h-full flex flex-col justify-between"
      whileHover={{ y: -5, scale: 1.03, borderColor: '#00ff41' }}
    >
      {/* Corner accents */}
      <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-neon-green/30 group-hover:border-neon-green transition-colors" />
      <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-neon-green/30 group-hover:border-neon-green transition-colors" />
      <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-neon-green/30 group-hover:border-neon-green transition-colors" />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-neon-green/30 group-hover:border-neon-green transition-colors" />

      <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
        <tool.icon className="h-5 w-5 sm:h-6 sm:w-6 text-neon-green transition-all duration-300 group-hover:text-neon-bright" />
        <span className="font-mono font-bold text-white text-sm sm:text-base">{tool.name}</span>
      </div>
      
      <div className="w-full bg-cyber-light rounded-full h-2.5">
        <motion.div 
          className="bg-neon-green h-2.5 rounded-full shadow-neon"
          initial={{ width: 0 }}
          animate={{ width: `${tool.proficiency}%` }}
          transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
        />
      </div>
    </motion.div>
  );

  return tool.href ? <Link to={tool.href}>{content}</Link> : content;
};

// --- Main Component ---

const TechStack: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    if (!selectedCategory) return techData.tools;
    return techData.tools.filter(tool => tool.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section ref={ref} id="tech-stack" className="py-20 bg-cyber-dark relative overflow-hidden">
      <DottedBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader inView={inView} />
        <CategoryFilter 
          categories={techData.categories}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{}}
        >
          {filteredTools.map((tool, index) => (
            <TechChip key={tool.name} tool={tool} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const DottedBackground = () => (
  <div className="absolute inset-0 opacity-10" style={{
    backgroundImage: 'radial-gradient(#00ff41 1px, transparent 1px)',
    backgroundSize: '30px 30px',
  }} />
);

export default TechStack;

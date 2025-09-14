import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers, Loader } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import projectData from '../data/projects.json';

// --- Data Interfaces ---
interface Project {
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
  category: string;
}

// --- Reusable Components ---

const SectionHeader = ({ inView }: { inView: boolean }) => (
  <motion.div
    className="text-center mb-12 sm:mb-16 px-4"
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
  >
    <div className="inline-flex items-center space-x-2 mb-4">
      <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-neon-green" />
      <span className="text-neon-green font-mono text-sm tracking-wide">&lt;PROJECTS /&gt;</span>
    </div>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-cyber">
      Featured <span className="text-neon-green">Creations</span>
    </h2>
    <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
      A selection of projects showcasing my expertise in scalable and reliable solutions.
    </p>
  </motion.div>
);

const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: index * 0.1, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group relative bg-cyber-black/80 backdrop-blur-sm rounded-lg overflow-hidden border border-neon-green/20 hover:border-neon-green/60 transition-all duration-300 hover:shadow-neon-lg"
    >
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-neon-green/50 group-hover:border-neon-green transition-all" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-neon-green/50 group-hover:border-neon-green transition-all" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-neon-green/50 group-hover:border-neon-green transition-all" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-neon-green/50 group-hover:border-neon-green transition-all" />
      
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/50 to-transparent" />
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-neon-green transition-colors duration-300 font-cyber">
          {project.title}
        </h3>
        <p className="text-gray-400 mt-2 mb-4 h-20 sm:h-24 overflow-hidden text-ellipsis text-sm sm:text-base">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map(tech => (
            <span key={tech} className="px-3 py-1 bg-cyber-gray text-neon-green text-xs rounded-full font-mono">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 sm:gap-0 pt-4 border-t border-cyber-light/30">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start space-x-2 text-gray-400 hover:text-neon-green transition-colors py-2 sm:py-0">
            <Github size={16} />
            <span className="font-mono text-sm">Source</span>
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 px-4 py-2 bg-neon-green/20 text-neon-green rounded-lg hover:bg-neon-green hover:text-cyber-black transition-colors">
              <ExternalLink size={16} />
              <span className="font-mono text-sm">Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-cyber-gray/50 rounded-lg p-4 sm:p-6 animate-pulse">
        <div className="h-48 sm:h-56 bg-cyber-light rounded-md mb-4"></div>
        <div className="h-6 bg-cyber-light rounded-md w-3/4 mb-2"></div>
        <div className="h-16 bg-cyber-light rounded-md"></div>
      </div>
    ))}
  </div>
);

// --- Main Component ---

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const loadProjects = () => {
      setLoading(true);
      try {
        // In a real app, this could be an API call.
        // Simulating a delay for loading effect.
        setTimeout(() => {
          setProjects(projectData as Project[]);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Unable to load project data. Please try again later.");
        setLoading(false);
      }
    };

    if (inView) {
      loadProjects();
    }
  }, [inView]);

  return (
    <section id="projects" ref={ref} className="py-20 bg-cyber-dark relative">
      <DottedBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader inView={inView} />
        
        {loading && <LoadingSkeleton />}
        
        {error && (
          <div className="text-center text-red-400 font-mono bg-red-900/20 p-8 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{}}
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

const DottedBackground = () => (
  <div className="absolute inset-0 opacity-10 z-0" style={{
    backgroundImage: 'radial-gradient(#00ff41 1px, transparent 1px)',
    backgroundSize: '40px 40px',
  }} />
);

export default Projects;

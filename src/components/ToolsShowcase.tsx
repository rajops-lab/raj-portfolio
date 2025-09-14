import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  experience: string;
  projects?: number;
  github?: string;
  link?: string;
  featured?: boolean;
}

const tools: Tool[] = [
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'Container Orchestration',
    description: 'Container orchestration and microservices deployment at scale',
    logo: '/logos/kubernetes.svg',
    experience: '5+ years',
    projects: 15,
    featured: true
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Containerization',
    description: 'Containerization expert with advanced Docker techniques',
    logo: '/logos/docker.svg',
    experience: '6+ years',
    projects: 25,
    featured: true
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend Framework',
    description: 'Modern React development with TypeScript and Next.js',
    logo: '/logos/react.svg',
    experience: '4+ years',
    projects: 20,
    github: 'https://github.com/rajeshavhad'
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud Platform',
    description: 'Cloud infrastructure, serverless, and DevOps on AWS',
    logo: '/logos/aws.svg',
    experience: '5+ years',
    projects: 30
  },
  {
    id: 'terraform',
    name: 'Terraform',
    category: 'IaC',
    description: 'Infrastructure as Code with Terraform for multi-cloud',
    logo: '/logos/terraform.svg',
    experience: '3+ years',
    projects: 12
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend Runtime',
    description: 'Backend API development with Node.js and Express',
    logo: '/logos/nodejs.svg',
    experience: '4+ years',
    projects: 18
  }
];

const ToolsShowcase: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-cyber-black">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[radial-gradient(rgba(0,255,255,0.3)_1px,transparent_1px),radial-gradient(rgba(255,0,128,0.15)_1px,transparent_1px)] [background-size:60px_60px,60px_60px] [background-position:0_0,30px_30px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-mono mb-4">
            <span className="text-neon-electric">My</span>{' '}
            <span className="text-cyberpunk-pink">Tech</span>{' '}
            <span className="text-neon-green">Arsenal</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Battle-tested tools and technologies I use to build scalable, 
            production-ready solutions in the digital realm.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              className={`relative group ${tool.featured ? 'md:col-span-1 lg:col-span-1' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-cyber-dark border border-cyan-400/20 rounded-xl overflow-hidden hover:border-cyan-400/60 transition-all duration-300 group-hover:transform group-hover:scale-[1.02]">
                {/* Featured Badge */}
                {tool.featured && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="flex items-center gap-1 px-2 py-1 bg-neon-green/20 border border-neon-green/40 rounded-full">
                      <Star className="w-3 h-3 text-neon-green fill-current" />
                      <span className="text-xs text-neon-green font-medium">Expert</span>
                    </div>
                  </div>
                )}

                {/* Card Header */}
                <div className="flex items-center gap-4 p-6 pb-4">
                  <div className="w-12 h-12 rounded-lg border border-cyan-400/30 bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden group-hover:border-cyan-400/60 transition-colors">
                    <img 
                      src={tool.logo} 
                      alt={`${tool.name} logo`}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling!.style.display = 'block';
                      }}
                    />
                    <div 
                      className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-pink-500 rounded flex items-center justify-center text-white font-bold text-sm" 
                      style={{ display: 'none' }}
                    >
                      {tool.name[0]}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg group-hover:text-cyan-300 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-cyan-400/70 text-sm">{tool.category}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {tool.github && (
                      <a
                        href={tool.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-cyber-gray border border-gray-600 hover:border-cyan-400 text-gray-400 hover:text-cyan-400 transition-all"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {tool.link && (
                      <a
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-cyber-gray border border-gray-600 hover:border-cyan-400 text-gray-400 hover:text-cyan-400 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 pb-4">
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {tool.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="border-t border-gray-700 px-6 py-4 bg-cyber-darker/50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-400">Experience: </span>
                      <span className="text-neon-green font-medium">{tool.experience}</span>
                    </div>
                    {tool.projects && (
                      <div className="text-sm">
                        <span className="text-gray-400">Projects: </span>
                        <span className="text-cyberpunk-pink font-medium">{tool.projects}+</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-6">
            Want to see these tools in action? Check out my projects and experience.
          </p>
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsShowcase;
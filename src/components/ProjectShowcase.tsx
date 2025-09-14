import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github: string;
  demo?: string;
  image: string;
  stats?: {
    stars: number;
    forks: number;
  };
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Kubernetes Multi-Cluster Manager",
    description: "Advanced Kubernetes management platform with multi-cluster support",
    longDescription: "A comprehensive platform for managing multiple Kubernetes clusters with automated deployment, monitoring, and scaling capabilities. Features include real-time cluster health monitoring, automated failover, and cost optimization.",
    tech: ["Go", "Kubernetes", "React", "PostgreSQL", "Prometheus", "Grafana"],
    github: "https://github.com/rajeshavhad/k8s-manager",
    demo: "https://k8s-demo.rajeshavhad.dev",
    image: "/projects/k8s-manager.png",
    stats: { stars: 234, forks: 45 },
    featured: true
  },
  {
    id: 2,
    title: "DevOps Pipeline Orchestrator",
    description: "CI/CD pipeline automation tool with advanced deployment strategies",
    longDescription: "A robust CI/CD orchestration platform supporting blue-green deployments, canary releases, and automated rollbacks. Integrates with major cloud providers and includes comprehensive analytics.",
    tech: ["Python", "Docker", "Jenkins", "Terraform", "AWS", "Azure"],
    github: "https://github.com/rajeshavhad/pipeline-orchestrator",
    image: "/projects/pipeline.png",
    stats: { stars: 156, forks: 28 },
    featured: true
  },
  {
    id: 3,
    title: "Microservices Monitoring Suite",
    description: "Complete observability solution for distributed systems",
    longDescription: "An all-in-one monitoring and observability platform for microservices architectures. Features distributed tracing, metrics collection, log aggregation, and intelligent alerting.",
    tech: ["Node.js", "TypeScript", "Elasticsearch", "Jaeger", "InfluxDB"],
    github: "https://github.com/rajeshavhad/microservices-monitor",
    demo: "https://monitor-demo.rajeshavhad.dev",
    image: "/projects/monitoring.png",
    stats: { stars: 89, forks: 12 },
    featured: false
  }
];

const ProjectShowcase: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="text-cyan-400">Featured</span> Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my expertise in DevOps, 
            cloud infrastructure, and full-stack development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-400/40 transition-all duration-300 ${
                project.featured ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 flex items-center justify-center">
                <div className="text-6xl text-cyan-400/30">🚀</div>
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-400 to-purple-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* Project Title & Stats */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  {project.stats && (
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {project.stats.stars}
                      </div>
                      <div className="flex items-center">
                        <GitFork className="h-4 w-4 mr-1" />
                        {project.stats.forks}
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-4">
                  {project.featured ? project.longDescription : project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-cyan-400 text-sm font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors group/btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                    Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white rounded-lg transition-all group/btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/rajeshavhad"
            className="inline-flex items-center px-6 py-3 border border-cyan-400/50 hover:border-cyan-400 text-cyan-400 hover:text-white rounded-lg transition-all hover:bg-cyan-400/10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5 mr-2" />
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
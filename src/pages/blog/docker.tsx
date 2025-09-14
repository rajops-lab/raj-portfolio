import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Container, Code, Layers, Network } from 'lucide-react';
import SEO from '../../components/SEO';

const DockerBlog = () => {
  return (
    <>
      <SEO 
        title="Mastering Docker: Containerization Made Simple - Rajesh Avhad"
        description="A comprehensive guide to Docker containerization, from basics to advanced deployment strategies. Learn Docker commands, best practices, and production deployment."
        keywords="Docker, Containerization, DevOps, Docker Tutorial, Container Deployment, Docker Commands"
        type="article"
      />
      <div className="min-h-screen bg-cyber-black text-neon-electric font-mono relative overflow-hidden">
        {/* Cyberpunk Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        {/* Animated scan lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-neon-electric to-transparent animate-pulse" 
               style={{top: '20%', animationDuration: '4s'}} />
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyberpunk-pink to-transparent animate-pulse" 
               style={{top: '60%', animationDuration: '5s', animationDelay: '2s'}} />
        </div>
      {/* Cyberpunk Header */}
      <header className="relative bg-cyber-black/90 backdrop-blur-md border-b border-neon-electric/30 py-6 shadow-neon z-10">
        {/* Header glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-electric to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-4">
            <Link 
              to="/blog" 
              className="group inline-flex items-center text-neon-electric hover:text-neon-bright transition-all duration-300 font-mono border border-neon-electric/30 hover:border-neon-electric px-4 py-2 rounded-lg backdrop-blur-sm hover:shadow-neon"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:animate-bounce" />
              <span className="group-hover:animate-glow">[ESC] Back to Blog</span>
            </Link>
            
            <Link 
              to="/" 
              className="group inline-flex items-center text-neon-green/70 hover:text-neon-green transition-all duration-300 font-mono text-sm px-3 py-1 rounded border border-neon-green/20 hover:border-neon-green/50 backdrop-blur-sm"
            >
              <span>Portfolio Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Cyberpunk Blog Content */}
      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
        <article className="prose prose-invert prose-green max-w-none">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-6">
              <Container className="h-10 w-10 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Mastering Docker: Containerization Made Simple
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A comprehensive guide to Docker containerization, from basics to advanced deployment strategies
            </p>
            <div className="flex items-center justify-center space-x-4 mt-6 text-sm text-gray-500">
              <span>By Rajesh Avhad</span>
              <span>•</span>
              <span>15 min read</span>
              <span>•</span>
              <span>DevOps</span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Code className="h-6 w-6 text-green-400 mr-2" />
                What is Docker?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Docker is a containerization platform that allows developers to package applications 
                and their dependencies into lightweight, portable containers. These containers can run 
                consistently across different environments, from development laptops to production servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Layers className="h-6 w-6 text-green-400 mr-2" />
                Key Benefits of Docker
              </h2>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span><strong>Consistency:</strong> Applications run the same way across all environments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span><strong>Portability:</strong> Containers can run on any system that supports Docker</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span><strong>Efficiency:</strong> Lightweight containers use fewer resources than VMs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span><strong>Scalability:</strong> Easy to scale applications up or down</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Getting Started with Docker</h2>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Basic Docker Commands</h3>
                <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Pull an image from Docker Hub
docker pull nginx

# Run a container
docker run -d -p 80:80 nginx

# List running containers
docker ps

# Stop a container
docker stop <container_id>

# Build an image from Dockerfile
docker build -t myapp .`}
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Network className="h-6 w-6 text-green-400 mr-2" />
                Docker in Production
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                When deploying Docker containers in production, consider these best practices:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Security</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Use official base images</li>
                    <li>• Scan images for vulnerabilities</li>
                    <li>• Run containers as non-root users</li>
                    <li>• Keep images updated</li>
                  </ul>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Performance</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Optimize image layers</li>
                    <li>• Use multi-stage builds</li>
                    <li>• Set resource limits</li>
                    <li>• Monitor container metrics</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gray-900 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Conclusion</h2>
              <p className="text-gray-300 leading-relaxed">
                Docker has revolutionized how we develop, deploy, and manage applications. By containerizing 
                your applications, you can achieve greater consistency, portability, and efficiency in your 
                development workflow. Start with simple containers and gradually explore advanced features 
                like Docker Compose, Docker Swarm, or integration with Kubernetes.
              </p>
            </section>
          </div>
        </article>
      </main>
      </div>
    </>
  );
};

export default DockerBlog;
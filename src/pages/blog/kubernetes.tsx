import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Container, Settings, Network, Shield } from 'lucide-react';
import SEO from '../../components/SEO';

const KubernetesBlog = () => {
  return (
    <>
      <SEO 
        title="Kubernetes: Orchestrating Containers at Scale - Rajesh Avhad"
        description="Learn how Kubernetes manages containerized applications across clusters with automated deployment, scaling, and management. Complete guide with kubectl commands and best practices."
        keywords="Kubernetes, Container Orchestration, K8s, kubectl, DevOps, Microservices, Cloud Native"
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
               style={{top: '25%', animationDuration: '4s'}} />
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyberpunk-purple to-transparent animate-pulse" 
               style={{top: '65%', animationDuration: '5s', animationDelay: '2s'}} />
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
              Kubernetes: Orchestrating Containers at Scale
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Learn how Kubernetes manages containerized applications across clusters with automated deployment, scaling, and management
            </p>
            <div className="flex items-center justify-center space-x-4 mt-6 text-sm text-gray-500">
              <span>By Rajesh Avhad</span>
              <span>•</span>
              <span>20 min read</span>
              <span>•</span>
              <span>DevOps</span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Settings className="h-6 w-6 text-green-400 mr-2" />
                What is Kubernetes?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Kubernetes (K8s) is an open-source container orchestration platform that automates the 
                deployment, scaling, and management of containerized applications. Originally developed 
                by Google, it's now maintained by the Cloud Native Computing Foundation (CNCF).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Core Kubernetes Concepts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Pods</h3>
                  <p className="text-gray-300 text-sm">
                    The smallest deployable unit in Kubernetes, containing one or more containers 
                    that share storage and network resources.
                  </p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Services</h3>
                  <p className="text-gray-300 text-sm">
                    Abstractions that define how to access pods, providing stable network endpoints 
                    for dynamic pod environments.
                  </p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Deployments</h3>
                  <p className="text-gray-300 text-sm">
                    Declarative updates for pods and replica sets, managing application rollouts 
                    and rollbacks automatically.
                  </p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">ConfigMaps</h3>
                  <p className="text-gray-300 text-sm">
                    Store configuration data separately from application code, allowing for 
                    environment-specific configurations.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Network className="h-6 w-6 text-green-400 mr-2" />
                Kubernetes Architecture
              </h2>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-green-400 mb-4">Control Plane Components</h3>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span><strong>API Server:</strong> Central management entity that exposes the Kubernetes API</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span><strong>etcd:</strong> Distributed key-value store for cluster data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span><strong>Scheduler:</strong> Assigns pods to nodes based on resource requirements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span><strong>Controller Manager:</strong> Runs controller processes</span>
                  </li>
                </ul>
                
                <h3 className="text-lg font-semibold text-green-400 mb-4">Node Components</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span><strong>kubelet:</strong> Agent that runs on each node and manages pods</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span><strong>kube-proxy:</strong> Network proxy that maintains network rules</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span><strong>Container Runtime:</strong> Software responsible for running containers</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Essential kubectl Commands</h2>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Get cluster information
kubectl cluster-info

# List all pods
kubectl get pods

# Create a deployment
kubectl create deployment nginx --image=nginx

# Scale a deployment
kubectl scale deployment nginx --replicas=3

# Expose a deployment as a service
kubectl expose deployment nginx --port=80 --type=LoadBalancer

# Get detailed information about a resource
kubectl describe pod <pod-name>

# Apply configuration from a file
kubectl apply -f deployment.yaml

# Delete resources
kubectl delete deployment nginx`}
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Shield className="h-6 w-6 text-green-400 mr-2" />
                Production Best Practices
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Security</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Enable RBAC (Role-Based Access Control)</li>
                    <li>• Use Network Policies</li>
                    <li>• Implement Pod Security Standards</li>
                    <li>• Regular security updates</li>
                    <li>• Scan container images</li>
                  </ul>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Monitoring</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Set up Prometheus and Grafana</li>
                    <li>• Configure health checks</li>
                    <li>• Monitor resource usage</li>
                    <li>• Set up alerting rules</li>
                    <li>• Log aggregation with ELK stack</li>
                  </ul>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Resource Management</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Set resource requests and limits</li>
                    <li>• Use Horizontal Pod Autoscaler</li>
                    <li>• Implement Quality of Service classes</li>
                    <li>• Configure node affinity rules</li>
                    <li>• Use persistent volumes wisely</li>
                  </ul>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">CI/CD Integration</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• GitOps with ArgoCD or Flux</li>
                    <li>• Automated testing pipelines</li>
                    <li>• Blue-green deployments</li>
                    <li>• Canary releases</li>
                    <li>• Rollback strategies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gray-900 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Conclusion</h2>
              <p className="text-gray-300 leading-relaxed">
                Kubernetes has become the de facto standard for container orchestration, enabling organizations 
                to run applications at scale with high availability and resilience. While it has a steep learning 
                curve, mastering Kubernetes opens up possibilities for building robust, scalable, and maintainable 
                cloud-native applications. Start with managed Kubernetes services like EKS, GKE, or AKS to focus 
                on application deployment before diving into cluster management.
              </p>
            </section>
          </div>
        </article>
      </main>
      </div>
    </>
  );
};

export default KubernetesBlog;
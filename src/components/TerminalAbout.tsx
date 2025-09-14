import React from 'react';
import { motion } from 'framer-motion';
import TerminalInterface from './TerminalInterface';

const TerminalAbout: React.FC = () => {
  const commands = [
    {
      command: "cat /etc/rajesh/microservices-philosophy.md",
      output: [
        "# Microservices Architecture Philosophy",
        "",
        "## Core Principles:",
        "✓ Single Responsibility: Each service owns one business capability",
        "✓ Decentralized: Services manage their own data and business logic",
        "✓ Failure Isolation: Graceful degradation and circuit breaker patterns",
        "✓ Technology Diversity: Right tool for the right job",
        "✓ DevOps Culture: You build it, you run it",
        "",
        "## Design Patterns I Implement:",
        "• API Gateway Pattern - Centralized entry point",
        "• Service Discovery - Dynamic service registration",
        "• Event Sourcing - Audit trail and replay capabilities", 
        "• CQRS - Command Query Responsibility Segregation",
        "• Saga Pattern - Distributed transaction management",
        "• Circuit Breaker - Fault tolerance and resilience"
      ],
      type: "info" as const
    },
    {
      command: "helm list -A",
      output: [
        "NAME                NAMESPACE    REVISION  UPDATED                   STATUS    CHART                     APP VERSION",
        "api-gateway         portfolio    3         2024-09-10 14:30:22.123  deployed  nginx-ingress-4.2.1       1.8.1",
        "auth-service        portfolio    2         2024-09-10 14:25:15.456  deployed  spring-boot-service-1.0.0 2.7.0",
        "user-service        portfolio    4         2024-09-11 09:15:30.789  deployed  java-microservice-1.2.0   17",
        "notification-svc    portfolio    1         2024-09-11 11:45:22.012  deployed  go-service-1.1.0          1.19",
        "project-service     portfolio    2         2024-09-11 16:20:18.345  deployed  node-service-2.0.0        18.17.0",
        "prometheus-stack    monitoring   5         2024-09-08 10:30:45.678  deployed  kube-prometheus-47.3.0    0.68.0",
        "grafana-dashboard   monitoring   3         2024-09-08 10:35:12.901  deployed  grafana-6.58.9            9.5.6",
        "jaeger-tracing      monitoring   2         2024-09-09 14:20:33.234  deployed  jaeger-0.71.11            1.47.0",
        "elasticsearch       logging      4         2024-09-07 08:15:44.567  deployed  elasticsearch-8.5.1       8.8.2",
        "kafka-cluster       messaging    1         2024-09-12 12:00:15.890  deployed  kafka-23.0.7              3.5.0"
      ],
      type: "success" as const
    },
    {
      command: "istioctl proxy-status",
      output: [
        "NAME                                         CDS    LDS    EDS    RDS    ISTIOD                      VERSION",
        "api-gateway-7f8b9c5d4-xyz12.portfolio       SYNCED SYNCED SYNCED SYNCED istiod-1a2b3c4d5e-fg6h7i8j 1.18.2",
        "auth-service-3a4c5e6f-ijk90.portfolio       SYNCED SYNCED SYNCED SYNCED istiod-1a2b3c4d5e-fg6h7i8j 1.18.2", 
        "user-service-6d7f8g9h2-abc34.portfolio      SYNCED SYNCED SYNCED SYNCED istiod-1a2b3c4d5e-fg6h7i8j 1.18.2",
        "project-service-5c6e7f8g-def56.portfolio    SYNCED SYNCED SYNCED SYNCED istiod-1a2b3c4d5e-fg6h7i8j 1.18.2",
        "notification-service-4b5d6e7f-gh78.portfolio SYNCED SYNCED SYNCED SYNCED istiod-1a2b3c4d5e-fg6h7i8j 1.18.2",
        "",
        "✓ Service mesh operational - mTLS enabled across all services"
      ],
      type: "success" as const
    },
    {
      command: "curl -s http://api-gateway/health | jq",
      output: [
        "{",
        '  "status": "healthy",',
        '  "timestamp": "2024-09-13T18:41:48Z",',
        '  "services": {',
        '    "api-gateway": {',
        '      "status": "UP",',
        '      "latency": "2ms",',
        '      "version": "v2.1.0"',
        '    },',
        '    "auth-service": {',
        '      "status": "UP",',
        '      "latency": "5ms",',
        '      "database_connections": 8',
        '    },',
        '    "user-service": {',
        '      "status": "UP",',
        '      "latency": "3ms",',
        '      "active_sessions": 1247',
        '    },',
        '    "project-service": {',
        '      "status": "UP",',
        '      "latency": "4ms",',
        '      "cache_hit_ratio": "94%"',
        '    }',
        '  },',
        '  "infrastructure": {',
        '    "kubernetes": "healthy",',
        '    "kafka": "3 brokers online",',
        '    "redis": "cluster mode - 6 nodes",',
        '    "postgres": "primary + 2 read replicas"',
        '  }',
        "}"
      ],
      type: "success" as const
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-px w-16 bg-cyan-400"></div>
            <h2 className="text-3xl font-bold text-white font-mono">
              <span className="text-cyan-400">$</span> About --microservices
            </h2>
            <div className="h-px w-16 bg-cyan-400"></div>
          </div>
          <p className="text-gray-400 font-mono">
            Distributed systems architect & microservices specialist
          </p>
        </motion.div>

        {/* Terminal Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <TerminalInterface 
            commands={commands}
            autoplay={true}
            prompt="microservices-architect@k8s:~$"
            className="w-full max-w-6xl"
          />
        </motion.div>

        {/* Architecture Visualization */}
        <motion.div
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Service Architecture */}
          <div className="bg-black/70 border border-cyan-400/30 rounded-lg p-6 font-mono">
            <h3 className="text-cyan-400 font-bold mb-4 flex items-center">
              <span className="mr-2">🏗️</span> architecture.yaml
            </h3>
            <div className="text-sm space-y-1">
              <div className="text-yellow-400">microservices:</div>
              <div className="pl-4 text-white">api-gateway:</div>
              <div className="pl-8 text-gray-300">- nginx + lua scripts</div>
              <div className="pl-8 text-gray-300">- rate limiting & auth</div>
              <div className="pl-4 text-white">business-services:</div>
              <div className="pl-8 text-gray-300">- user-service (Java)</div>
              <div className="pl-8 text-gray-300">- project-service (Node.js)</div>
              <div className="pl-8 text-gray-300">- auth-service (Python)</div>
              <div className="pl-8 text-gray-300">- notification-service (Go)</div>
              <div className="text-yellow-400">data-layer:</div>
              <div className="pl-4 text-white">- postgres (ACID transactions)</div>
              <div className="pl-4 text-white">- mongodb (document store)</div>
              <div className="pl-4 text-white">- redis (cache + sessions)</div>
              <div className="text-yellow-400">messaging:</div>
              <div className="pl-4 text-white">- apache-kafka (event streaming)</div>
            </div>
          </div>

          {/* Monitoring Stack */}
          <div className="bg-black/70 border border-green-400/30 rounded-lg p-6 font-mono">
            <h3 className="text-green-400 font-bold mb-4 flex items-center">
              <span className="mr-2">📊</span> observability.json
            </h3>
            <div className="text-sm space-y-1">
              <div><span className="text-cyan-400">"metrics"</span>: {</div>
              <div className="pl-4"><span className="text-green-400">"prometheus"</span>: <span className="text-white">"scraping 25 endpoints"</span>,</div>
              <div className="pl-4"><span className="text-green-400">"grafana"</span>: <span className="text-white">"15 dashboards"</span></div>
              <div>},</div>
              <div><span className="text-cyan-400">"tracing"</span>: {</div>
              <div className="pl-4"><span className="text-green-400">"jaeger"</span>: <span className="text-white">"distributed tracing"</span>,</div>
              <div className="pl-4"><span className="text-green-400">"spans"</span>: <span className="text-white">"cross-service tracking"</span></div>
              <div>},</div>
              <div><span className="text-cyan-400">"logging"</span>: {</div>
              <div className="pl-4"><span className="text-green-400">"elasticsearch"</span>: <span className="text-white">"centralized logs"</span>,</div>
              <div className="pl-4"><span className="text-green-400">"kibana"</span>: <span className="text-white">"log analytics"</span>,</div>
              <div className="pl-4"><span className="text-green-400">"fluentd"</span>: <span className="text-white">"log aggregation"</span></div>
              <div>},</div>
              <div><span className="text-cyan-400">"alerting"</span>: {</div>
              <div className="pl-4"><span className="text-green-400">"alertmanager"</span>: <span className="text-white">"smart routing"</span></div>
              <div>}</div>
            </div>
          </div>
        </motion.div>

        {/* Expertise Areas */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            {
              title: "🔧 DevOps Pipeline",
              items: [
                "CI/CD with Jenkins/GitLab",
                "Infrastructure as Code", 
                "Blue-Green Deployments",
                "Canary Releases",
                "Automated Testing"
              ]
            },
            {
              title: "☁️ Cloud Native",
              items: [
                "Kubernetes Orchestration",
                "Service Mesh (Istio)",
                "Cloud Provider APIs",
                "Serverless Functions",
                "Container Security"
              ]
            },
            {
              title: "📈 Scalability",
              items: [
                "Horizontal Pod Autoscaling",
                "Load Balancing Strategies",
                "Caching Architectures",
                "Database Sharding",
                "Performance Optimization"
              ]
            }
          ].map((area, index) => (
            <motion.div
              key={area.title}
              className="bg-black/60 border border-purple-400/30 rounded-lg p-6 font-mono"
              whileHover={{
                borderColor: 'rgba(147, 51, 234, 0.6)',
                boxShadow: '0 0 20px rgba(147, 51, 234, 0.2)'
              }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="text-purple-400 font-bold mb-4">{area.title}</h4>
              <ul className="space-y-2 text-sm">
                {area.items.map((item, i) => (
                  <li key={i} className="text-gray-300 flex items-center">
                    <span className="text-green-400 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalAbout;
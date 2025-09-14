import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalCommand {
  command: string;
  output: string[];
  type: 'success' | 'info' | 'warning' | 'error';
}

interface TerminalInterfaceProps {
  commands: TerminalCommand[];
  autoplay?: boolean;
  prompt?: string;
  className?: string;
}

const TerminalInterface: React.FC<TerminalInterfaceProps> = ({ 
  commands, 
  autoplay = true, 
  prompt = "rajesh@portfolio:~$",
  className = ""
}) => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedOutput, setDisplayedOutput] = useState<string[]>([]);

  useEffect(() => {
    if (!autoplay) return;

    const executeCommand = async (index: number) => {
      if (index >= commands.length) return;

      setCurrentCommandIndex(index);
      setIsTyping(true);
      
      // Wait for command typing animation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsTyping(false);
      
      // Display output line by line
      const command = commands[index];
      for (let i = 0; i < command.output.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setDisplayedOutput(prev => [...prev, command.output[i]]);
      }
      
      // Wait before next command
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Execute next command
      executeCommand(index + 1);
    };

    const timer = setTimeout(() => executeCommand(0), 1000);
    return () => clearTimeout(timer);
  }, [commands, autoplay]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-cyan-400';
    }
  };

  return (
    <div className={`bg-black/90 border border-cyan-400/30 rounded-lg p-4 font-mono text-sm ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-cyan-400/20">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <span className="text-cyan-400 ml-4">portfolio-terminal</span>
        </div>
        <div className="text-xs text-gray-500">bash</div>
      </div>

      {/* Terminal Content */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {commands.slice(0, currentCommandIndex + 1).map((cmd, cmdIndex) => (
          <div key={cmdIndex} className="space-y-1">
            {/* Command Line */}
            <div className="flex items-center space-x-2">
              <span className="text-green-400">{prompt}</span>
              <motion.span
                className="text-white"
                initial={{ width: 0 }}
                animate={{ width: cmdIndex <= currentCommandIndex ? 'auto' : 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              >
                {cmdIndex === currentCommandIndex && isTyping ? (
                  <motion.span>
                    {cmd.command}
                    <motion.span
                      className="bg-white text-black ml-1"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      █
                    </motion.span>
                  </motion.span>
                ) : (
                  cmd.command
                )}
              </motion.span>
            </div>

            {/* Command Output */}
            {cmdIndex < currentCommandIndex && (
              <AnimatePresence>
                {cmd.output.map((line, lineIndex) => (
                  <motion.div
                    key={lineIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: lineIndex * 0.1 }}
                    className={`${getTypeColor(cmd.type)} pl-4`}
                  >
                    {line}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {/* Current command output (streaming) */}
            {cmdIndex === currentCommandIndex && !isTyping && (
              <div className="pl-4">
                <AnimatePresence>
                  {displayedOutput.map((line, lineIndex) => (
                    <motion.div
                      key={lineIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className={getTypeColor(cmd.type)}
                    >
                      {line}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        ))}

        {/* Active cursor for next command */}
        {currentCommandIndex < commands.length - 1 && !isTyping && (
          <div className="flex items-center space-x-2">
            <span className="text-green-400">{prompt}</span>
            <motion.span
              className="bg-white text-black"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              █
            </motion.span>
          </div>
        )}
      </div>
    </div>
  );
};

// Terminal Hero Component
export const TerminalHero: React.FC = () => {
  const commands: TerminalCommand[] = [
    {
      command: "whoami",
      output: ["rajesh_avhad"],
      type: "info"
    },
    {
      command: "cat ~/.profile",
      output: [
        "# Microservices Architect Profile",
        "NAME=\"Rajesh Avhad\"",
        "ROLE=\"Microservices Solution Developer\"",
        "SPECIALIZATION=\"Distributed Systems | Container Orchestration | API Gateway\"",
        "EXPERTISE=\"Event-Driven Architecture | Service Mesh | CQRS/Event Sourcing\"",
        "LOCATION=\"India\"",
        "STATUS=\"Available for microservices projects\"",
        "",
        "# Microservices Stack",
        "LANGUAGES=\"Go, Java, Python, Node.js, TypeScript\"",
        "FRAMEWORKS=\"Spring Boot, Express.js, Gin, FastAPI\"",
        "ORCHESTRATION=\"Kubernetes, Docker Swarm, Nomad\"",
        "MESSAGE_BROKERS=\"Apache Kafka, RabbitMQ, Redis Streams\"",
        "DATABASES=\"PostgreSQL, MongoDB, Redis, Elasticsearch\"",
        "MONITORING=\"Prometheus, Grafana, Jaeger, ELK Stack\""
      ],
      type: "success"
    },
    {
      command: "kubectl get pods --all-namespaces | head -10",
      output: [
        "NAMESPACE     NAME                                READY   STATUS    RESTARTS   AGE",
        "portfolio     api-gateway-7f8b9c5d4-xyz12        1/1     Running   0          2d",
        "portfolio     user-service-6d7f8g9h2-abc34       1/1     Running   0          2d",
        "portfolio     project-service-5c6e7f8g-def56     1/1     Running   0          2d",
        "portfolio     notification-service-4b5d6e7f-gh78 1/1     Running   0          2d",
        "portfolio     auth-service-3a4c5e6f-ijk90        1/1     Running   0          2d",
        "monitoring   prometheus-server-2b3d4f5g-lmn12    1/1     Running   0          7d",
        "monitoring   grafana-dashboard-1a2c3e4f-opq34    1/1     Running   0          7d",
        "istio-system istio-proxy-5f6g7h8i-rst56          1/1     Running   0          14d",
        "logging      elasticsearch-cluster-0             1/1     Running   0          14d"
      ],
      type: "success"
    },
    {
      command: "docker-compose -f microservices/docker-compose.yml ps",
      output: [
        "        Name                      Command               State                    Ports",
        "─────────────────────────────────────────────────────────────────────────────────────────",
        "api-gateway              nginx -g daemon off;            Up      0.0.0.0:80->80/tcp",
        "user-service             java -jar app.jar               Up      8001/tcp",
        "project-service          node server.js                  Up      8002/tcp",
        "auth-service             python app.py                   Up      8003/tcp",
        "notification-service     ./main                          Up      8004/tcp",
        "redis-cache              redis-server --appendonly yes   Up      6379/tcp",
        "postgres-db              postgres                         Up      5432/tcp",
        "mongodb                  mongod --auth                   Up      27017/tcp",
        "kafka-broker             start-kafka.sh                  Up      9092/tcp",
        "prometheus               /bin/prometheus                 Up      9090/tcp",
        "",
        "✓ All 10 microservices running healthy"
      ],
      type: "success"
    }
  ];

  return (
    <div className="space-y-6">
      <TerminalInterface 
        commands={commands}
        autoplay={true}
        prompt="rajesh@portfolio:~$"
        className="w-full max-w-4xl"
      />
    </div>
  );
};

export default TerminalInterface;
import React from 'react';
import { motion } from 'framer-motion';
import TerminalInterface from './TerminalInterface';

const TerminalTechStack: React.FC = () => {
  const commands = [
    {
      command: "cat /proc/version",
      output: [
        "Linux rajesh-dev 5.4.0-42-generic #46-Ubuntu SMP Fri Jul 10 00:24:02 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux"
      ],
      type: "info" as const
    },
    {
      command: "which docker kubectl aws terraform ansible",
      output: [
        "/usr/bin/docker",
        "/usr/local/bin/kubectl", 
        "/usr/local/bin/aws",
        "/usr/bin/terraform",
        "/usr/bin/ansible"
      ],
      type: "success" as const
    },
    {
      command: "docker --version && kubectl version --client && terraform --version",
      output: [
        "Docker version 24.0.6, build ed223bc",
        "Client Version: version.Info{Major:\"1\", Minor:\"28\", GitVersion:\"v1.28.2\"}",
        "Terraform v1.5.7",
        "",
        "✓ All DevOps tools are ready"
      ],
      type: "success" as const
    },
    {
      command: "ls -la ~/.aws ~/.kube /etc/docker",
      output: [
        "/home/rajesh/.aws:",
        "total 16",
        "-rw------- 1 rajesh rajesh  126 Sep 13 10:15 credentials",
        "-rw-rw-r-- 1 rajesh rajesh   23 Sep 13 10:15 config",
        "",
        "/home/rajesh/.kube:",
        "total 8", 
        "-rw------- 1 rajesh rajesh 5639 Sep 13 10:16 config",
        "",
        "/etc/docker:",
        "total 4",
        "-rw-r--r-- 1 root root 63 Sep 13 10:10 daemon.json"
      ],
      type: "info" as const
    },
    {
      command: "npm list -g --depth=0 | head -10",
      output: [
        "/usr/local/lib",
        "├── @angular/cli@16.2.0",
        "├── create-react-app@5.0.1", 
        "├── @vue/cli@5.0.8",
        "├── next@13.4.19",
        "├── typescript@5.2.2",
        "├── jest@29.7.0",
        "├── pm2@5.3.0",
        "├── nodemon@3.0.1",
        "└── express-generator@4.16.1"
      ],
      type: "info" as const
    },
    {
      command: "systemctl status nginx docker jenkins --no-pager",
      output: [
        "● nginx.service - A high performance web server",
        "   Active: active (running) since Wed 2024-09-13 09:00:15 IST",
        "",
        "● docker.service - Docker Application Container Engine", 
        "   Active: active (running) since Wed 2024-09-13 08:45:22 IST",
        "",
        "● jenkins.service - LSB: Start Jenkins at boot time",
        "   Active: active (running) since Wed 2024-09-13 08:50:33 IST",
        "",
        "All core services are operational ✓"
      ],
      type: "success" as const
    }
  ];

  return (
    <section className="py-20 relative">
      {/* Terminal-style background */}
      <div className="absolute inset-0 bg-black/50"></div>
      
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
            <div className="h-px w-12 bg-green-400"></div>
            <h2 className="text-3xl font-bold text-white font-mono">
              <span className="text-green-400">$</span> Environment Setup
            </h2>
            <div className="h-px w-12 bg-green-400"></div>
          </div>
          <p className="text-gray-400 font-mono">
            System configuration and installed packages
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
            prompt="rajesh@dev-machine:~$"
            className="w-full max-w-5xl"
          />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Languages */}
          <div className="bg-black/60 border border-green-400/30 rounded-lg p-6 font-mono">
            <h3 className="text-green-400 font-bold mb-4 flex items-center">
              <span className="mr-2">📄</span> languages.json
            </h3>
            <div className="text-sm space-y-1">
              <div><span className="text-cyan-400">"primary"</span>: [</div>
              <div className="pl-4 text-white">"JavaScript", "Python", "TypeScript"</div>
              <div>],</div>
              <div><span className="text-cyan-400">"secondary"</span>: [</div>
              <div className="pl-4 text-white">"Java", "Go", "Bash"</div>
              <div>]</div>
            </div>
          </div>

          {/* Frameworks */}
          <div className="bg-black/60 border border-cyan-400/30 rounded-lg p-6 font-mono">
            <h3 className="text-cyan-400 font-bold mb-4 flex items-center">
              <span className="mr-2">🛠️</span> frameworks.yaml
            </h3>
            <div className="text-sm space-y-1">
              <div className="text-yellow-400">frontend:</div>
              <div className="pl-4 text-white">- React</div>
              <div className="pl-4 text-white">- Next.js</div>
              <div className="pl-4 text-white">- Vue.js</div>
              <div className="text-yellow-400">backend:</div>
              <div className="pl-4 text-white">- Node.js</div>
              <div className="pl-4 text-white">- Express</div>
              <div className="pl-4 text-white">- FastAPI</div>
            </div>
          </div>

          {/* Tools */}
          <div className="bg-black/60 border border-yellow-400/30 rounded-lg p-6 font-mono">
            <h3 className="text-yellow-400 font-bold mb-4 flex items-center">
              <span className="mr-2">⚙️</span> Dockerfile
            </h3>
            <div className="text-sm space-y-1">
              <div><span className="text-purple-400">FROM</span> <span className="text-white">ubuntu:latest</span></div>
              <div><span className="text-purple-400">RUN</span> <span className="text-white">apt-get update</span></div>
              <div><span className="text-purple-400">RUN</span> <span className="text-white">install docker kubectl</span></div>
              <div><span className="text-purple-400">RUN</span> <span className="text-white">install aws-cli terraform</span></div>
              <div><span className="text-purple-400">RUN</span> <span className="text-white">install ansible jenkins</span></div>
              <div><span className="text-purple-400">CMD</span> <span className="text-white">["portfolio", "serve"]</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalTechStack;
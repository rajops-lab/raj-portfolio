import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CommandOutput {
  command: string;
  output: string[];
  type: 'success' | 'error' | 'info' | 'warning';
}

const InteractiveTerminal: React.FC = () => {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'welcome',
      output: [
        '╔═══════════════════════════════════════════════════════════════════════╗',
        '║                                                                       ║',
        '║    ██████╗  █████╗      ██╗███████╗███████╗██╗  ██╗                   ║',
        '║    ██╔══██╗██╔══██╗     ██║██╔════╝██╔════╝██║  ██║                   ║',
        '║    ██████╔╝███████║     ██║█████╗  ███████╗███████║                   ║',
        '║    ██╔══██╗██╔══██║██   ██║██╔══╝  ╚════██║██╔══██║                   ║',
        '║    ██║  ██║██║  ██║╚█████╔╝███████╗███████║██║  ██║                   ║',
        '║    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝ ╚══════╝╚══════╝╚═╝  ╚═╝                   ║',
        '║                                                                       ║',
        '╚═══════════════════════════════════════════════════════════════════════╝',
        '',
        '┏━━━━━━━━━━━━━━━━━━━━ NEURAL INTERFACE ACTIVE ━━━━━━━━━━━━━━━━━━━━━━━━━━┓',
        '┃                                                                       ┃',
        '┃     MICROSERVICES SOLUTION DEVELOPER & CLOUD ARCHITECT                ┃',
        '┃     Building scalable distributed systems with K8s & Docker           ┃',
        '┃                                                                       ┃',
        '┃    🔄 STATUS: Online | 🔋 UPTIME: 99.9% | REGION: Multi-Cloud        ┃',
        '┃                                                                       ┃',
        '┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛',
        '',
        '▶ INITIALIZE COMMANDS:',
        '  📡 help      - Access neural command database',
        '  🚀 portfolio  - Load personal data matrix',
        '  🔮 Tab        - Engage auto-completion protocol',
        '',
        '◆ CYBER-TIP: All interactions are logged in the blockchain. Happy hacking! ◆'
      ],
      type: 'info'
    }
  ]);
  
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [tabSuggestions, setTabSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Focus input on mount and clicks
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Directory structure
  const fileSystem = {
    '~': {
      type: 'directory',
      files: {
        'about': { type: 'directory', description: 'Personal information and philosophy' },
        'projects': { type: 'directory', description: 'Microservices project portfolio' },
        'skills': { type: 'directory', description: 'Technical expertise and tools' },
        'architecture': { type: 'directory', description: 'System design examples' },
        'monitoring': { type: 'directory', description: 'Observability stack details' },
        'docker': { type: 'directory', description: 'Containerization expertise' },
        'kubernetes': { type: 'directory', description: 'K8s orchestration knowledge' },
        'devops': { type: 'directory', description: 'CI/CD and automation practices' },
        'contact': { type: 'directory', description: 'Professional contact information' },
        'README.md': { type: 'file', size: '1.2K', description: 'Portfolio overview', content: [
          '# Rajesh - Microservices Portfolio',
          '',
          'Welcome to my interactive terminal portfolio!',
          '',
          '## About Me',
          'Microservices Solution Developer with 5+ years of experience',
          'in distributed systems, Kubernetes, and cloud-native development.',
          '',
          '## Quick Start',
          '• Type `help` to see all available commands',
          '• Use `cd <directory>` to navigate',
          '• Use `cat <file>` to view file contents',
          '• Press Tab for auto-completion',
          '',
          '## Portfolio Sections',
          '├── about/         - Personal philosophy and background',
          '├── projects/      - Featured microservices projects',
          '├── skills/        - Technical expertise and tools',
          '├── architecture/  - System design examples',
          '├── monitoring/    - Observability and monitoring',
          '├── docker/        - Containerization expertise',
          '├── kubernetes/    - K8s orchestration knowledge',
          '├── devops/        - CI/CD and automation',
          '└── contact/       - Professional links',
          '',
          'Happy exploring! 🚀'
        ] },
        'portfolio.yaml': { type: 'file', size: '567B', description: 'Configuration file', content: [
          'name: "Rajesh"',
          'role: "Microservices Solution Developer"',
          'location: "Remote/Hybrid"',
          'timezone: "UTC+5:30"',
          '',
          'specializations:',
          '  - distributed_systems',
          '  - kubernetes_orchestration',
          '  - microservices_architecture',
          '  - devops_automation',
          '  - observability',
          '',
          'tech_stack:',
          '  containers:',
          '    - docker',
          '    - kubernetes',
          '    - helm',
          '  cloud_platforms:',
          '    - aws',
          '    - gcp',
          '    - azure',
          '  monitoring:',
          '    - prometheus',
          '    - grafana',
          '    - jaeger',
          '  cicd:',
          '    - jenkins',
          '    - gitlab_ci',
          '    - argo_cd',
          '',
          'availability: "Open to new opportunities"',
          'contact: "rajesh@microservices-expert.com"'
        ] }
      }
    },
    '~/about': {
      type: 'directory',
      files: {
        'philosophy.md': { type: 'file', size: '2.1K', description: 'Development philosophy', content: [
          '# My Development Philosophy',
          '',
          '## Core Beliefs',
          '🔧 **Build for Scale**: Every service should be designed with growth in mind',
          '🛡️ **Failure is Expected**: Design systems that gracefully handle failures',
          '🔄 **Automate Everything**: If you\'re doing it twice, automate it',
          '📊 **Measure Everything**: You can\'t improve what you don\'t measure',
          '🔒 **Security First**: Security is not an afterthought, it\'s foundational',
          '',
          '## Microservices Principles',
          '1. **Single Responsibility**: Each service owns one business capability',
          '2. **Decentralized Governance**: Teams own their services end-to-end',
          '3. **Failure Isolation**: Circuit breakers and bulkhead patterns',
          '4. **Data Ownership**: Services own and encapsulate their data',
          '5. **Technology Diversity**: Choose the right tool for each job',
          '',
          '## DevOps Culture',
          '• You build it, you run it, you monitor it',
          '• Shared responsibility across development and operations',
          '• Continuous learning and experimentation',
          '• Infrastructure and configuration as code',
          '• Observability as a first-class citizen'
        ] },
        'principles.yaml': { type: 'file', size: '891B', description: 'Design principles', content: [
          'design_principles:',
          '  architectural:',
          '    - name: "Single Responsibility"',
          '      description: "Each microservice handles one business function"',
          '      implementation: "Domain-driven design boundaries"',
          '    ',
          '    - name: "Loose Coupling"',
          '      description: "Services interact through well-defined APIs"',
          '      implementation: "Event-driven architecture, async messaging"',
          '    ',
          '    - name: "High Cohesion"',
          '      description: "Related functionality grouped together"',
          '      implementation: "Bounded contexts, service boundaries"',
          '  ',
          '  operational:',
          '    - name: "Observability"',
          '      pillars: ["metrics", "logging", "tracing"]',
          '      tools: ["prometheus", "grafana", "jaeger", "elk"]',
          '    ',
          '    - name: "Resilience"',
          '      patterns: ["circuit_breaker", "retry", "timeout", "bulkhead"]',
          '      implementation: "Istio service mesh, custom middleware"',
          '  ',
          '  development:',
          '    - name: "Continuous Deployment"',
          '      practices: ["trunk_based_dev", "feature_flags", "blue_green"]',
          '      tools: ["jenkins", "argo_cd", "helm"]'
        ] },
        'experience.json': { type: 'file', size: '3.4K', description: 'Professional experience', content: [
          '{',
          '  "professional_experience": {',
          '    "total_years": 5,',
          '    "specialization": "Microservices & Cloud Architecture",',
          '    "current_focus": [',
          '      "Kubernetes orchestration",',
          '      "Service mesh implementation",',
          '      "Observability platforms",',
          '      "CI/CD automation"',
          '    ],',
          '    "achievements": {',
          '      "deployment_optimization": {',
          '        "metric": "75% reduction in deployment time",',
          '        "method": "Automated CI/CD pipelines with GitOps"',
          '      },',
          '      "system_reliability": {',
          '        "metric": "99.9% uptime achieved",',
          '        "method": "Circuit breakers, health checks, auto-scaling"',
          '      },',
          '      "architecture_migration": {',
          '        "project": "Monolith to microservices transformation",',
          '        "scale": "15-service distributed system",',
          '        "timeline": "8 months"',
          '      }',
          '    },',
          '    "technical_leadership": [',
          '      "Led team of 6 developers",',
          '      "Architected 3 major platform migrations",',
          '      "Mentored junior developers on microservices patterns",',
          '      "Established DevOps practices and tooling"',
          '    ]',
          '  }',
          '}'
        ] }
      }
    },
    '~/projects': {
      type: 'directory',
      files: {
        'ecommerce-platform/': { type: 'directory', description: '12-service e-commerce system' },
        'banking-system/': { type: 'directory', description: 'CQRS + Event Sourcing banking app' },
        'iot-pipeline/': { type: 'directory', description: 'Serverless IoT data processing' },
        'gaming-backend/': { type: 'directory', description: 'High-throughput gaming platform' },
        'project-index.md': { type: 'file', size: '1.8K', description: 'Project overview' }
      }
    },
    '~/skills': {
      type: 'directory',
      files: {
        'containerization.md': { type: 'file', size: '2.3K', description: 'Docker & K8s expertise' },
        'cloud-platforms.md': { type: 'file', size: '1.9K', description: 'AWS, GCP, Azure knowledge' },
        'microservices.md': { type: 'file', size: '2.7K', description: 'Service architecture patterns' },
        'monitoring.md': { type: 'file', size: '2.1K', description: 'Observability tools' },
        'cicd.md': { type: 'file', size: '1.6K', description: 'DevOps pipeline expertise' }
      }
    },
    '~/architecture': {
      type: 'directory',
      files: {
        'microservices-ref.yaml': { type: 'file', size: '3.2K', description: 'Reference architecture' },
        'event-driven.md': { type: 'file', size: '2.8K', description: 'Event-driven patterns' },
        'observability-stack.yaml': { type: 'file', size: '1.4K', description: 'Monitoring setup' },
        'diagrams/': { type: 'directory', description: 'Architecture diagrams' }
      }
    },
    '~/monitoring': {
      type: 'directory',
      files: {
        'prometheus.yaml': { type: 'file', size: '2.1K', description: 'Metrics configuration' },
        'grafana-dashboards/': { type: 'directory', description: 'Custom dashboards' },
        'alerting-rules.yaml': { type: 'file', size: '1.7K', description: 'Alert definitions' },
        'jaeger-config.yaml': { type: 'file', size: '892B', description: 'Tracing setup' }
      }
    },
    '~/docker': {
      type: 'directory',
      files: {
        'Dockerfile.examples': { type: 'file', size: '3.1K', description: 'Multi-stage build examples' },
        'docker-compose.yaml': { type: 'file', size: '2.4K', description: 'Service orchestration' },
        'security-practices.md': { type: 'file', size: '1.8K', description: 'Container security' },
        'registry-setup.md': { type: 'file', size: '1.3K', description: 'Private registry config' }
      }
    },
    '~/kubernetes': {
      type: 'directory',
      files: {
        'deployments/': { type: 'directory', description: 'K8s deployment manifests' },
        'helm-charts/': { type: 'directory', description: 'Helm chart templates' },
        'networking/': { type: 'directory', description: 'Service mesh configs' },
        'monitoring/': { type: 'directory', description: 'Cluster monitoring setup' },
        'security/': { type: 'directory', description: 'RBAC and security policies' }
      }
    },
    '~/devops': {
      type: 'directory',
      files: {
        'jenkins/': { type: 'directory', description: 'CI/CD pipeline definitions' },
        'gitlab-ci.yaml': { type: 'file', size: '2.8K', description: 'GitLab CI configuration' },
        'terraform/': { type: 'directory', description: 'Infrastructure as Code' },
        'ansible/': { type: 'directory', description: 'Configuration management' },
        'deployment-strategies.md': { type: 'file', size: '2.2K', description: 'Blue-green, canary patterns' }
      }
    },
    '~/contact': {
      type: 'directory',
      files: {
        'linkedin.url': { type: 'file', size: '156B', description: 'LinkedIn profile link' },
        'github.url': { type: 'file', size: '134B', description: 'GitHub profile link' },
        'email.txt': { type: 'file', size: '45B', description: 'Professional email' },
        'availability.md': { type: 'file', size: '724B', description: 'Current availability status' }
      }
    }
  };

  // Get current directory content
  const getCurrentDirectoryContent = () => {
    return fileSystem[currentDirectory as keyof typeof fileSystem] || fileSystem['~'];
  };

  // Get formatted directory path for prompt
  const getPromptPath = () => {
    return currentDirectory === '~' ? '~' : currentDirectory.replace('~/', '');
  };

  // Command definitions
  const commands = {
    help: {
      output: [
        'Available Commands:',
        '',
        '📂 portfolio      - View my complete portfolio overview',
        '👨‍💻 about          - Learn about my background and philosophy',
        '🛠️  projects       - Explore my microservices projects',
        '⚡ skills         - Technical skills and expertise',
        '📧 contact        - Get in touch with me',
        '🏗️  architecture   - View system architecture examples',
        '📊 monitoring     - Observability and monitoring stack',
        '🐳 docker         - Docker and containerization work',
        '☸️  kubernetes     - Kubernetes orchestration examples',
        '🔧 devops         - DevOps and CI/CD pipelines',
        '',
        '🎮 Terminal Commands:',
        '   clear          - Clear terminal screen',
        '   whoami         - Display current user info',
        '   pwd            - Show current directory',
        '   ls [-la]       - List files and directories',
        '   cd <dir>       - Change directory',
        '   cd ..          - Go up one directory',
        '   cd ~           - Go to home directory',
        '   cat <file>     - Display file contents',
        '   find <term>    - Search for files/directories',
        '   history        - Show command history',
        '',
        '🎆 Interactive Features:',
        '   Tab            - Auto-complete commands and file names',
        '   ↑ ↓ arrows      - Navigate command history',
        '   Ctrl+C         - Cancel current command',
        '   Double-click   - Quick complete suggestions',
        '',
        '💡 Try: cat README.md, ls -la, cd projects, find docker'
      ],
      type: 'info' as const
    },
    
    portfolio: {
      output: [
        '🚀 RAJESH - Microservices Solution Developer',
        '═══════════════════════════════════════════════════════',
        '',
        '📋 PROFESSIONAL SUMMARY',
        '┌────────────────────────────────────────────────────┐',
        '│ • 5+ years in distributed systems architecture     │',
        '│ • Expert in Kubernetes, Docker, and cloud-native  │',
        '│ • Specialized in microservices design patterns    │',
        '│ • Strong background in DevOps and observability   │',
        '│ • Experience with multi-cloud deployments         │',
        '└────────────────────────────────────────────────────┘',
        '',
        '🎯 CORE COMPETENCIES',
        '• Container Orchestration (Kubernetes, Docker Swarm)',
        '• Service Mesh Implementation (Istio, Linkerd)',
        '• API Gateway & Load Balancing (NGINX, HAProxy)',
        '• Message Queuing (Apache Kafka, RabbitMQ)',
        '• Database Design (PostgreSQL, MongoDB, Redis)',
        '• Monitoring & Observability (Prometheus, Grafana, Jaeger)',
        '• CI/CD Pipeline (Jenkins, GitLab CI, Argo CD)',
        '• Infrastructure as Code (Terraform, Helm)',
        '',
        '🏆 KEY ACHIEVEMENTS',
        '• Reduced deployment time by 75% with automated pipelines',
        '• Improved system reliability to 99.9% uptime',
        '• Led migration of monolith to microservices architecture',
        '• Implemented zero-downtime deployment strategies',
        '',
        'Type specific commands to explore each area in detail!'
      ],
      type: 'success' as const
    },

    about: {
      output: [
        '👨‍💻 About Rajesh - Microservices Architect',
        '════════════════════════════════════════════',
        '',
        '🎯 PHILOSOPHY',
        'I believe in building resilient, scalable systems that can adapt',
        'to changing business needs. My approach focuses on:',
        '',
        '• 🔧 Microservices that own their domain completely',
        '• 🚀 Automated everything - from testing to deployment',
        '• 📊 Observability as a first-class citizen',
        '• 🔒 Security baked into the architecture',
        '• 💡 Continuous learning and adaptation',
        '',
        '🛠️  DESIGN PRINCIPLES I FOLLOW',
        '┌─────────────────────────────────────────────────┐',
        '│ Single Responsibility    │ Each service = 1 job  │',
        '│ Decentralized Data      │ Service owns its data  │',
        '│ Failure Isolation      │ Graceful degradation   │',
        '│ Technology Diversity   │ Right tool for the job │',
        '│ DevOps Culture         │ You build it, you run  │',
        '└─────────────────────────────────────────────────┘',
        '',
        '📚 CONTINUOUS LEARNING',
        'Always exploring: Cloud Native technologies, emerging patterns,',
        'and industry best practices. Currently focused on:',
        '• Event-driven architectures',
        '• Serverless computing patterns',
        '• Edge computing & CDN strategies',
        '• ML/AI integration in microservices'
      ],
      type: 'info' as const
    },

    projects: {
      output: [
        '🛠️  Featured Microservices Projects',
        '═════════════════════════════════════════',
        '',
        '📦 PROJECT 1: E-Commerce Microservices Platform',
        '├─ Architecture: 12 microservices, event-driven',
        '├─ Tech Stack: Java Spring Boot, Node.js, Python',
        '├─ Infrastructure: Kubernetes, Istio service mesh',
        '├─ Data: PostgreSQL, MongoDB, Redis, Elasticsearch',
        '├─ Messaging: Apache Kafka for async communication',
        '└─ Monitoring: Prometheus + Grafana + Jaeger tracing',
        '',
        '🏦 PROJECT 2: Banking Transaction System',
        '├─ Architecture: CQRS + Event Sourcing pattern',
        '├─ Tech Stack: .NET Core, Go microservices',
        '├─ Infrastructure: AWS EKS, Application Load Balancer',
        '├─ Data: Aurora PostgreSQL cluster, DynamoDB',
        '├─ Security: OAuth2, JWT tokens, mTLS encryption',
        '└─ Compliance: PCI-DSS compliant architecture',
        '',
        '📊 PROJECT 3: IoT Data Processing Pipeline',
        '├─ Architecture: Serverless + microservices hybrid',
        '├─ Tech Stack: AWS Lambda, Kubernetes jobs',
        '├─ Infrastructure: Multi-region deployment',
        '├─ Data: Time-series DB (InfluxDB), data lake (S3)',
        '├─ Stream Processing: Apache Kafka Streams',
        '└─ Analytics: Real-time dashboards, ML predictions',
        '',
        '🎮 PROJECT 4: Gaming Platform Backend',
        '├─ Architecture: High-throughput microservices',
        '├─ Tech Stack: Go, Rust for performance-critical parts',
        '├─ Infrastructure: Google GKE, Cloud CDN',
        '├─ Data: Cloud Spanner, Memorystore Redis',
        '├─ Real-time: WebSocket connections, pub/sub',
        '└─ Scaling: Auto-scaling based on player metrics',
        '',
        'Type "architecture" to see detailed system designs!'
      ],
      type: 'success' as const
    },

    skills: {
      output: [
        '⚡ Technical Skills & Expertise',
        '════════════════════════════════════',
        '',
        '🐳 CONTAINERIZATION & ORCHESTRATION',
        '├─ Docker                    Expert',
        '├─ Kubernetes               Expert', 
        '├─ Helm Charts              Advanced',
        '├─ Docker Compose           Expert',
        '└─ Container Security       Advanced',
        '',
        '☁️  CLOUD PLATFORMS',
        '├─ Amazon Web Services      Expert',
        '├─ Google Cloud Platform    Advanced',
        '├─ Microsoft Azure          Intermediate',
        '└─ Multi-cloud Architecture Advanced',
        '',
        '🔧 MICROSERVICES TOOLS',
        '├─ API Gateway (Kong/NGINX) Expert',
        '├─ Service Mesh (Istio)     Advanced',
        '├─ Load Balancers           Expert',
        '├─ Circuit Breakers         Expert',
        '└─ Service Discovery        Expert',
        '',
        '📊 MONITORING & OBSERVABILITY',
        '├─ Prometheus               Expert',
        '├─ Grafana                  Expert',
        '├─ Jaeger Tracing           Advanced',
        '├─ ELK Stack               Advanced',
        '├─ New Relic               Intermediate',
        '└─ DataDog                 Intermediate',
        '',
        '🚀 CI/CD & DEVOPS',
        '├─ Jenkins                  Expert',
        '├─ GitLab CI               Expert',
        '├─ Argo CD                 Advanced',
        '├─ Terraform               Expert',
        '├─ Ansible                 Intermediate',
        '└─ Infrastructure as Code   Expert'
      ],
      type: 'success' as const
    },

    contact: {
      output: [
        '📧 Get In Touch',
        '═══════════════════',
        '',
        '🔗 Professional Links:',
        '├─ 💼 LinkedIn: linkedin.com/in/rajesh-microservices',
        '├─ 🐙 GitHub: github.com/rajesh-dev',
        '├─ 📧 Email: rajesh@microservices-expert.com',
        '├─ 🐦 Twitter: @rajesh_k8s',
        '└─ 🌐 Website: www.rajesh-portfolio.dev',
        '',
        '💼 Available For:',
        '├─ Microservices architecture consulting',
        '├─ Kubernetes migration projects',
        '├─ DevOps transformation initiatives',
        '├─ Cloud-native application development',
        '├─ System reliability improvements',
        '└─ Technical architecture reviews',
        '',
        '📍 Location: Remote/Hybrid',
        '⏰ Timezone: UTC+5:30 (Indian Standard Time)',
        '💰 Rate: Competitive, based on project scope',
        '',
        '🚀 Ready to build something amazing together?',
        '   Reach out and let\'s discuss your next project!'
      ],
      type: 'info' as const
    },

    architecture: {
      output: [
        '🏗️  System Architecture Examples',
        '════════════════════════════════════',
        '',
        '📐 MICROSERVICES REFERENCE ARCHITECTURE',
        '',
        '┌─────────────────┐    ┌──────────────────┐',
        '│   API Gateway   │────│  Load Balancer   │',
        '└─────────────────┘    └──────────────────┘',
        '         │                       │',
        '    ┌────┴─────┬─────────┬───────┴───┐',
        '    │          │         │           │',
        '┌───▼───┐  ┌───▼───┐ ┌───▼───┐  ┌───▼───┐',
        '│User   │  │Auth   │ │Order  │  │Payment│',
        '│Service│  │Service│ │Service│  │Service│',
        '└───┬───┘  └───┬───┘ └───┬───┘  └───┬───┘',
        '    │          │         │           │',
        '┌───▼───┐  ┌───▼───┐ ┌───▼───┐  ┌───▼───┐',
        '│  DB   │  │  DB   │ │  DB   │  │  DB   │',
        '└───────┘  └───────┘ └───────┘  └───────┘',
        '',
        '🔄 EVENT-DRIVEN COMMUNICATION',
        '',
        '  Service A ──publish──➤ Message Broker ──notify──➤ Service B',
        '      │                      │                           │',
        '   Database            Event Store                  Database',
        '',
        '📊 OBSERVABILITY STACK',
        '',
        '┌─────────────┐  ┌─────────────┐  ┌─────────────┐',
        '│ Prometheus  │  │   Grafana   │  │   Jaeger    │',
        '│  (Metrics)  │  │(Dashboards) │  │ (Tracing)   │',
        '└─────────────┘  └─────────────┘  └─────────────┘',
        '       ▲               ▲               ▲',
        '       └───────────────┼───────────────┘',
        '              ┌────────▼────────┐',
        '              │  Microservices  │',
        '              │    Cluster      │',
        '              └─────────────────┘'
      ],
      type: 'success' as const
    },

    monitoring: {
      output: [
        '📊 Monitoring & Observability Stack',
        '══════════════════════════════════════',
        '',
        '🎯 THE THREE PILLARS OF OBSERVABILITY',
        '',
        '📈 METRICS (Prometheus + Grafana)',
        '├─ Infrastructure metrics (CPU, Memory, Disk)',
        '├─ Application metrics (Response time, Error rate)',
        '├─ Business metrics (Orders/sec, Revenue)',
        '├─ Custom dashboards for different stakeholders',
        '└─ Real-time alerting with AlertManager',
        '',
        '📝 LOGGING (ELK Stack)',
        '├─ Elasticsearch for log storage and indexing',
        '├─ Logstash/Fluentd for log aggregation',
        '├─ Kibana for log analysis and visualization',
        '├─ Structured logging with correlation IDs',
        '└─ Log retention policies and archiving',
        '',
        '🔍 DISTRIBUTED TRACING (Jaeger)',
        '├─ End-to-end request tracking across services',
        '├─ Performance bottleneck identification',
        '├─ Service dependency mapping',
        '├─ Error propagation analysis',
        '└─ Latency optimization insights',
        '',
        '🚨 ALERTING STRATEGY',
        '├─ SLA-based alerts (99.9% uptime target)',
        '├─ Error rate thresholds (>1% triggers alert)',
        '├─ Performance degradation detection',
        '├─ Resource utilization warnings',
        '├─ Business metric anomalies',
        '└─ Multi-channel notifications (Slack, Email, SMS)',
        '',
        '📊 KEY METRICS I MONITOR',
        '• Response Time (P50, P95, P99 percentiles)',
        '• Error Rate (4xx, 5xx responses)',
        '• Throughput (Requests per second)',
        '• Saturation (CPU, Memory, Network usage)',
        '• Apdex Score (Application Performance Index)',
        '• Database Connection Pool utilization'
      ],
      type: 'info' as const
    },

    docker: {
      output: [
        '🐳 Docker & Containerization Expertise',
        '═════════════════════════════════════════',
        '',
        '📦 CONTAINERIZATION APPROACH',
        '├─ Multi-stage builds for optimized images',
        '├─ Distroless/Alpine base images for security',
        '├─ .dockerignore for smaller build contexts',
        '├─ Non-root users for container security',
        '└─ Health checks and proper signal handling',
        '',
        '🔧 DOCKERFILE BEST PRACTICES',
        '├─ Layer caching optimization',
        '├─ Minimal attack surface principle',
        '├─ Proper dependency management',
        '├─ Environment-specific configurations',
        '└─ Container image scanning integration',
        '',
        '🏗️  DOCKER COMPOSE ORCHESTRATION',
        '├─ Local development environments',
        '├─ Service dependency management',
        '├─ Network isolation and service discovery',
        '├─ Volume management for data persistence',
        '└─ Environment variable externalization',
        '',
        '🛡️  CONTAINER SECURITY',
        '├─ Image vulnerability scanning (Trivy, Snyk)',
        '├─ Runtime security monitoring',
        '├─ Secrets management (not in images)',
        '├─ Resource limits and quotas',
        '├─ Read-only root filesystems',
        '└─ Security context configurations',
        '',
        '🚀 CONTAINER REGISTRY MANAGEMENT',
        '├─ Private registry setup and management',
        '├─ Image tagging strategies',
        '├─ Automated image builds and pushes',
        '├─ Image cleanup and retention policies',
        '└─ Multi-architecture image support',
        '',
        '📊 EXAMPLE MICROSERVICE DOCKERFILE',
        '',
        '# Multi-stage build for Go microservice',
        'FROM golang:1.19-alpine AS builder',
        'WORKDIR /app',
        'COPY go.mod go.sum ./',
        'RUN go mod download',
        'COPY . .',
        'RUN CGO_ENABLED=0 go build -o main .',
        '',
        'FROM alpine:3.17',
        'RUN apk --no-cache add ca-certificates',
        'WORKDIR /root/',
        'COPY --from=builder /app/main .',
        'USER 1000:1000',
        'HEALTHCHECK CMD ["/root/main", "health"]',
        'CMD ["./main"]'
      ],
      type: 'success' as const
    },

    kubernetes: {
      output: [
        '☸️  Kubernetes Orchestration Mastery',
        '════════════════════════════════════════',
        '',
        '🎯 CLUSTER ARCHITECTURE EXPERTISE',
        '├─ Multi-master HA cluster setup',
        '├─ Node pool management and auto-scaling',
        '├─ Network policies and CNI configuration',
        '├─ RBAC and security policy implementation',
        '└─ Cluster monitoring and maintenance',
        '',
        '📦 WORKLOAD MANAGEMENT',
        '├─ Deployment strategies (Rolling, Blue-Green, Canary)',
        '├─ StatefulSets for stateful applications',
        '├─ DaemonSets for cluster-wide services',
        '├─ Jobs and CronJobs for batch processing',
        '├─ HorizontalPodAutoscaler configuration',
        '└─ VerticalPodAutoscaler optimization',
        '',
        '🔧 CONFIGURATION MANAGEMENT',
        '├─ ConfigMaps for application configuration',
        '├─ Secrets for sensitive data management',
        '├─ Environment-specific configurations',
        '├─ Configuration hot-reloading strategies',
        '└─ External secret management integration',
        '',
        '🌐 SERVICE MESH & NETWORKING',
        '├─ Istio service mesh implementation',
        '├─ Traffic management and load balancing',
        '├─ Circuit breaker patterns',
        '├─ mTLS encryption between services',
        '├─ Ingress controllers (NGINX, Traefik)',
        '└─ Network security policies',
        '',
        '💾 STORAGE & PERSISTENCE',
        '├─ Persistent Volume management',
        '├─ Storage classes and provisioning',
        '├─ Backup and disaster recovery',
        '├─ Database operator implementations',
        '└─ Stateful application patterns',
        '',
        '📊 SAMPLE MICROSERVICE DEPLOYMENT',
        '',
        'apiVersion: apps/v1',
        'kind: Deployment',
        'metadata:',
        '  name: user-service',
        'spec:',
        '  replicas: 3',
        '  selector:',
        '    matchLabels:',
        '      app: user-service',
        '  template:',
        '    spec:',
        '      containers:',
        '      - name: user-service',
        '        image: registry.io/user-service:v1.2.0',
        '        resources:',
        '          requests:',
        '            memory: "256Mi"',
        '            cpu: "100m"',
        '          limits:',
        '            memory: "512Mi"',
        '            cpu: "500m"'
      ],
      type: 'success' as const
    },

    devops: {
      output: [
        '🔧 DevOps & CI/CD Pipeline Expertise',
        '═══════════════════════════════════════',
        '',
        '🚀 CI/CD PIPELINE ARCHITECTURE',
        '',
        'Developer ──➤ Git Push ──➤ CI Pipeline ──➤ CD Pipeline ──➤ Production',
        '    │              │            │             │              │',
        '   Code         Webhook    Build/Test    Deploy/Monitor    Users',
        '',
        '⚙️  CONTINUOUS INTEGRATION',
        '├─ Git-based workflows (GitFlow, GitHub Flow)',
        '├─ Automated testing (Unit, Integration, E2E)',
        '├─ Code quality gates (SonarQube, CodeClimate)',
        '├─ Security scanning (SAST, DAST, dependency check)',
        '├─ Container image building and scanning',
        '└─ Artifact management and versioning',
        '',
        '🚢 CONTINUOUS DEPLOYMENT',
        '├─ Infrastructure as Code (Terraform, CloudFormation)',
        '├─ Configuration management (Ansible, Chef)',
        '├─ Blue-Green deployments for zero downtime',
        '├─ Canary releases for risk mitigation',
        '├─ Feature flags and gradual rollouts',
        '└─ Automated rollback mechanisms',
        '',
        '🛠️  TOOLS & TECHNOLOGIES',
        '├─ Jenkins (Declarative pipelines, shared libraries)',
        '├─ GitLab CI (Multi-stage pipelines, parallel jobs)',
        '├─ GitHub Actions (Workflow automation)',
        '├─ Argo CD (GitOps continuous deployment)',
        '├─ Tekton (Cloud-native CI/CD)',
        '└─ Azure DevOps (End-to-end ALM)',
        '',
        '📊 DEPLOYMENT STRATEGIES',
        '',
        '🔵 BLUE-GREEN DEPLOYMENT',
        'Blue (Current) ←──── Load Balancer ────→ Green (New)',
        '   v1.0 (100%)        Switch        v1.1 (0%)',
        '                      ↓ ↑',
        '                   v1.1 (100%)',
        '',
        '🐤 CANARY DEPLOYMENT',
        'Production v1.0 (90%) ←── Traffic Split ──→ Canary v1.1 (10%)',
        '        ↓ Gradual shift ↓',
        '     v1.1 (100%)',
        '',
        '🔍 MONITORING & FEEDBACK',
        '├─ Pipeline metrics and success rates',
        '├─ Deployment frequency tracking',
        '├─ Lead time and recovery time metrics',
        '├─ Change failure rate monitoring',
        '└─ MTTR (Mean Time To Recovery) optimization',
        '',
        '🎯 DEVOPS CULTURE PRACTICES',
        '• You build it, you run it philosophy',
        '• Shared responsibility model',
        '• Continuous learning and improvement',
        '• Automation over manual processes',
        '• Infrastructure and security as code'
      ],
      type: 'success' as const
    },

    whoami: {
      output: [
        'rajesh@microservices-terminal:~$ whoami',
        'rajesh',
        '',
        'uid=1000(rajesh) gid=1000(microservices-architect)',
        'groups=1000(microservices-architect),999(docker),998(kubernetes)',
        '',
        'Current role: Microservices Solution Developer',
        'Specialization: Distributed Systems & Cloud Architecture',
        'Location: /home/portfolio/rajesh',
        'Shell: /bin/bash (microservices-enhanced)'
      ],
      type: 'info' as const
    },

    pwd: {
      output: [], // Will be dynamically generated
      type: 'info' as const
    },

    ls: {
      output: [], // Will be dynamically generated
      type: 'success' as const
    }
  };

  const processCommand = (cmd: string): CommandOutput => {
    const trimmedCmd = cmd.trim();
    const cmdParts = trimmedCmd.split(' ');
    const baseCmd = cmdParts[0].toLowerCase();
    const args = cmdParts.slice(1);
    
    if (baseCmd === 'clear') {
      setHistory([history[0]]); // Keep welcome message
      return { command: cmd, output: [], type: 'success' };
    }
    
    if (baseCmd === 'history') {
      return {
        command: cmd,
        output: commandHistory.map((histCmd, index) => `${index + 1}  ${histCmd}`),
        type: 'info'
      };
    }
    
    if (baseCmd === 'cd') {
      return handleCdCommand(args[0] || '', cmd);
    }
    
    if (baseCmd === 'ls') {
      return handleLsCommand(args, cmd);
    }
    
    if (baseCmd === 'pwd') {
      return {
        command: cmd,
        output: [`/home/portfolio/rajesh/microservices-workspace${currentDirectory === '~' ? '' : '/' + currentDirectory.replace('~/', '')}`],
        type: 'info'
      };
    }
    
    if (baseCmd === 'cat') {
      return handleCatCommand(args[0], cmd);
    }
    
    if (baseCmd === 'find') {
      return handleFindCommand(args[0], cmd);
    }
    
    if (baseCmd in commands) {
      const cmdDef = commands[baseCmd as keyof typeof commands];
      return {
        command: cmd,
        output: cmdDef.output,
        type: cmdDef.type
      };
    }
    
    // Handle unknown commands
    return {
      command: cmd,
      output: [
        `Command not found: ${baseCmd}`,
        '',
        'Type "help" to see available commands.',
        'Or try: portfolio, about, projects, skills, contact',
        'Use "ls" to see available directories, "cd <dir>" to navigate'
      ],
      type: 'error'
    };
  };
  
  const handleCdCommand = (target: string, originalCmd: string): CommandOutput => {
    if (!target) {
      // cd with no arguments goes to home
      setCurrentDirectory('~');
      return { command: originalCmd, output: [], type: 'success' };
    }
    
    if (target === '~' || target === '/home/portfolio/rajesh/microservices-workspace') {
      setCurrentDirectory('~');
      return { command: originalCmd, output: [], type: 'success' };
    }
    
    if (target === '..' || target === '../') {
      // Go up one directory
      if (currentDirectory !== '~') {
        setCurrentDirectory('~');
      }
      return { command: originalCmd, output: [], type: 'success' };
    }
    
    // Check if target directory exists
    const currentContent = getCurrentDirectoryContent();
    if (currentContent.files[target] && currentContent.files[target].type === 'directory') {
      const newPath = currentDirectory === '~' ? `~/${target}` : `${currentDirectory}/${target}`;
      if (fileSystem[newPath as keyof typeof fileSystem]) {
        setCurrentDirectory(newPath);
        return { command: originalCmd, output: [], type: 'success' };
      }
    }
    
    // Check absolute path from root
    if (target.startsWith('~/')) {
      if (fileSystem[target as keyof typeof fileSystem]) {
        setCurrentDirectory(target);
        return { command: originalCmd, output: [], type: 'success' };
      }
    }
    
    return {
      command: originalCmd,
      output: [`cd: no such file or directory: ${target}`],
      type: 'error'
    };
  };
  
  const handleLsCommand = (args: string[], originalCmd: string): CommandOutput => {
    const showAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
    const showLong = args.includes('-l') || args.includes('-la') || args.includes('-al');
    
    const currentContent = getCurrentDirectoryContent();
    const entries: string[] = [];
    
    if (showLong) {
      // Long format listing
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', { 
        month: 'short', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      }).replace(',', '');
      
      if (currentDirectory !== '~' && showAll) {
        entries.push('drwxr-xr-x  3 rajesh microservices   96  ' + dateStr + ' .');
        entries.push('drwxr-xr-x  8 rajesh microservices   256 ' + dateStr + ' ..');
      }
      
      Object.entries(currentContent.files).forEach(([name, info]) => {
        const permissions = info.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--';
        const size = info.type === 'directory' ? '96' : (info.size || '1.0K');
        const displayName = info.type === 'directory' ? name + '/' : name;
        entries.push(`${permissions}  1 rajesh microservices ${size.padStart(4)} ${dateStr} ${displayName}`);
      });
    } else {
      // Simple format
      if (currentDirectory !== '~' && showAll) {
        entries.push('.', '..');
      }
      
      Object.entries(currentContent.files).forEach(([name, info]) => {
        const displayName = info.type === 'directory' ? name + '/' : name;
        entries.push(displayName);
      });
    }
    
    return {
      command: originalCmd,
      output: entries,
      type: 'success'
    };
  };
  
  const handleCatCommand = (filename: string, originalCmd: string): CommandOutput => {
    if (!filename) {
      return {
        command: originalCmd,
        output: ['cat: missing file operand', 'Try: cat <filename>'],
        type: 'error'
      };
    }
    
    const currentContent = getCurrentDirectoryContent();
    const file = currentContent.files[filename];
    
    if (!file) {
      return {
        command: originalCmd,
        output: [`cat: ${filename}: No such file or directory`],
        type: 'error'
      };
    }
    
    if (file.type === 'directory') {
      return {
        command: originalCmd,
        output: [`cat: ${filename}: Is a directory`],
        type: 'error'
      };
    }
    
    if (!file.content) {
      return {
        command: originalCmd,
        output: [
          `# ${filename}`,
          '',
          'This file contains portfolio information.',
          'Content is available through the interactive commands.',
          '',
          `Description: ${file.description}`,
          `Size: ${file.size}`,
          '',
          'Try using the main portfolio commands:',
          'portfolio, about, projects, skills, etc.'
        ],
        type: 'info'
      };
    }
    
    return {
      command: originalCmd,
      output: file.content,
      type: 'success'
    };
  };
  
  const handleFindCommand = (searchTerm: string, originalCmd: string): CommandOutput => {
    if (!searchTerm) {
      return {
        command: originalCmd,
        output: ['find: missing search term', 'Usage: find <term>'],
        type: 'error'
      };
    }
    
    const results: string[] = [];
    const searchLower = searchTerm.toLowerCase();
    
    // Search through all directories and files
    Object.entries(fileSystem).forEach(([path, dirInfo]) => {
      Object.entries(dirInfo.files).forEach(([name, fileInfo]) => {
        if (name.toLowerCase().includes(searchLower) || 
            fileInfo.description.toLowerCase().includes(searchLower)) {
          const fullPath = path === '~' ? name : `${path}/${name}`;
          const type = fileInfo.type === 'directory' ? 'd' : 'f';
          results.push(`${type} ${fullPath.replace('~/', './')} - ${fileInfo.description}`);
        }
      });
    });
    
    if (results.length === 0) {
      return {
        command: originalCmd,
        output: [`find: no files or directories matching "${searchTerm}" found`],
        type: 'warning'
      };
    }
    
    return {
      command: originalCmd,
      output: [
        `Found ${results.length} result(s) for "${searchTerm}":`,
        '',
        ...results,
        '',
        'Legend: d=directory, f=file'
      ],
      type: 'success'
    };
  };
  
  // Tab completion logic
  const getTabCompletions = (input: string): string[] => {
    const parts = input.trim().split(' ');
    const command = parts[0].toLowerCase();
    const partial = parts[parts.length - 1];
    
    // Command completion
    if (parts.length === 1) {
      const allCommands = [
        'help', 'portfolio', 'about', 'projects', 'skills', 'contact',
        'architecture', 'monitoring', 'docker', 'kubernetes', 'devops',
        'ls', 'cd', 'cat', 'find', 'pwd', 'whoami', 'clear', 'history'
      ];
      return allCommands.filter(cmd => cmd.startsWith(partial.toLowerCase()));
    }
    
    // File/directory completion for cd, cat, find
    if (['cd', 'cat', 'find'].includes(command)) {
      const currentContent = getCurrentDirectoryContent();
      const items = Object.keys(currentContent.files);
      
      if (command === 'cd') {
        // Only directories for cd
        return items
          .filter(name => currentContent.files[name].type === 'directory')
          .filter(name => name.startsWith(partial))
          .concat(partial === '' ? ['..', '~'] : ['..', '~'].filter(p => p.startsWith(partial)));
      }
      
      return items.filter(name => name.startsWith(partial));
    }
    
    return [];
  };

  const handleCommandSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle tab completion
    if (e.key === 'Tab') {
      e.preventDefault();
      const suggestions = getTabCompletions(currentCommand);
      
      if (suggestions.length === 1) {
        // Auto-complete with single match
        const parts = currentCommand.trim().split(' ');
        if (parts.length === 1) {
          setCurrentCommand(suggestions[0] + ' ');
        } else {
          parts[parts.length - 1] = suggestions[0];
          setCurrentCommand(parts.join(' ') + ' ');
        }
        setShowSuggestions(false);
      } else if (suggestions.length > 1) {
        // Show suggestions
        setTabSuggestions(suggestions);
        setShowSuggestions(true);
        setSelectedSuggestion(0);
      } else {
        setShowSuggestions(false);
      }
      return;
    }
    
    // Handle Ctrl+C
    if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      setCurrentCommand('');
      setShowSuggestions(false);
      setHistory(prev => [...prev, {
        command: currentCommand + '^C',
        output: [],
        type: 'warning'
      }]);
      return;
    }
    
    // Handle suggestion navigation when suggestions are shown
    if (showSuggestions) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev > 0 ? prev - 1 : tabSuggestions.length - 1
        );
        return;
      }
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev < tabSuggestions.length - 1 ? prev + 1 : 0
        );
        return;
      }
      
      if (e.key === 'Enter') {
        e.preventDefault();
        const selected = tabSuggestions[selectedSuggestion];
        const parts = currentCommand.trim().split(' ');
        if (parts.length === 1) {
          setCurrentCommand(selected + ' ');
        } else {
          parts[parts.length - 1] = selected;
          setCurrentCommand(parts.join(' ') + ' ');
        }
        setShowSuggestions(false);
        return;
      }
      
      if (e.key === 'Escape') {
        setShowSuggestions(false);
        return;
      }
    }
    
    // Hide suggestions when typing
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Enter' && e.key !== 'Escape') {
      setShowSuggestions(false);
    }
    
    if (e.key === 'Enter' && currentCommand.trim()) {
      setIsTyping(true);
      setShowSuggestions(false);
      
      // Add to command history
      const newCommandHistory = [...commandHistory, currentCommand];
      setCommandHistory(newCommandHistory);
      setHistoryIndex(-1);
      
      // Process command
      const result = processCommand(currentCommand);
      
      // Don't add to history if it was 'clear'
      if (currentCommand.trim().toLowerCase() !== 'clear') {
        setHistory(prev => [...prev, result]);
      }
      
      setCurrentCommand('');
      setIsTyping(false);
      return;
    }
    
    // Handle command history navigation (only when suggestions are not shown)
    if (!showSuggestions) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex !== -1) {
          const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
          if (newIndex === commandHistory.length - 1 && historyIndex === commandHistory.length - 1) {
            setHistoryIndex(-1);
            setCurrentCommand('');
          } else {
            setHistoryIndex(newIndex);
            setCurrentCommand(commandHistory[newIndex]);
          }
        }
      }
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'info': return 'text-cyan-400';
      default: return 'text-gray-300';
    }
  };
  
  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'success': return {
        textShadow: '0 0 10px rgba(34, 197, 94, 0.5)'
      };
      case 'error': return {
        textShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
      };
      case 'warning': return {
        textShadow: '0 0 10px rgba(234, 179, 8, 0.5)'
      };
      case 'info': return {
        textShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
      };
      default: return {
        textShadow: '0 0 5px rgba(156, 163, 175, 0.3)'
      };
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-cyber-black via-purple-950/20 to-cyber-black text-cyan-400 font-mono text-sm overflow-hidden cursor-text relative"
      onClick={() => inputRef.current?.focus()}
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 51, 102, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
          #000000
        `
      }}
    >
      {/* Cyberpunk Grid Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Animated Neon Border */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-pulse" />
        <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-pulse" />
        <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" />
      </div>
      
      {/* Terminal Header */}
      <div className="bg-gradient-to-r from-gray-900/90 via-purple-900/30 to-gray-900/90 border-b border-cyan-400/30 px-4 py-2 flex items-center justify-between backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse shadow-lg shadow-yellow-500/50" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="text-cyan-300 text-xs font-bold tracking-wider">
          <span className="text-pink-400">CYBER</span>-TERMINAL <span className="text-green-400">v2.0.49</span>
        </div>
        <div className="text-purple-400 text-xs font-mono">
          [NEURAL LINK ACTIVE]
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="h-[calc(100vh-60px)] overflow-y-auto p-4 space-y-1 relative backdrop-blur-sm"
        style={{
          background: 'rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Command History */}
        {history.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {entry.command !== 'welcome' && (
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-pink-400 font-bold tracking-wide shadow-sm">
                  <span className="text-cyan-400">raj</span>
                  <span className="text-purple-400">@</span>
                  <span className="text-green-400">neuro-k8s</span>
                  <span className="text-yellow-400">:</span>
                  <span className="text-blue-400">{getPromptPath()}</span>
                  <span className="text-pink-500">$</span>
                </span>
                <span className="text-white font-medium tracking-wide">{entry.command}</span>
              </div>
            )}
            {entry.output.map((line, lineIndex) => (
              <div 
                key={lineIndex} 
                className={`${getTypeColor(entry.type)} font-medium tracking-wide`}
                style={getTypeStyle(entry.type)}
              >
                {line}
              </div>
            ))}
          </motion.div>
        ))}

        {/* Current Command Line */}
        <div className="flex items-center space-x-2 mt-4 p-2 rounded border border-cyan-400/20 bg-black/30 backdrop-blur-sm">
          <span className="text-pink-400 font-bold tracking-wide shadow-lg">
            <span className="text-cyan-400">raj</span>
            <span className="text-purple-400">@</span>
            <span className="text-green-400">neuro-k8s</span>
            <span className="text-yellow-400">:</span>
            <span className="text-blue-400">{getPromptPath()}</span>
            <span className="text-pink-500">$</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleCommandSubmit}
            className="bg-transparent text-cyan-300 outline-none flex-1 font-medium tracking-wide"
            style={{
              caretColor: '#00ffff',
              textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
            }}
            placeholder="> INITIALIZE NEURAL INTERFACE... press TAB for command completion"
            autoComplete="off"
            spellCheck={false}
          />
          {isTyping && (
            <motion.span
              animate={{ 
                opacity: [1, 0, 1],
                textShadow: [
                  '0 0 5px #00ffff',
                  '0 0 20px #00ffff, 0 0 30px #00ffff',
                  '0 0 5px #00ffff'
                ]
              }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-cyan-400 font-bold"
            >
              █
            </motion.span>
          )}
        </div>
        
        {/* Tab Suggestions - Cyberpunk Style */}
        {showSuggestions && tabSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-2 bg-gradient-to-br from-gray-900/95 via-purple-900/20 to-gray-900/95 border border-cyan-400/50 rounded-lg p-3 max-h-40 overflow-y-auto backdrop-blur-md"
            style={{
              boxShadow: `
                0 0 20px rgba(0, 255, 255, 0.3),
                inset 0 0 20px rgba(0, 0, 0, 0.5)
              `
            }}
          >
            <div className="text-xs text-cyan-300 mb-2 font-bold tracking-wider flex items-center">
              <span className="text-pink-400">▶</span> NEURAL COMPLETION MATRIX:
            </div>
            {tabSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`px-3 py-2 rounded-md text-sm cursor-pointer transition-all duration-200 font-medium tracking-wide ${
                  index === selectedSuggestion
                    ? 'bg-gradient-to-r from-cyan-400/20 to-purple-400/20 text-cyan-300 border border-cyan-400/50 shadow-lg'
                    : 'text-gray-300 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:text-cyan-200'
                }`}
                style={{
                  textShadow: index === selectedSuggestion ? '0 0 10px rgba(0, 255, 255, 0.8)' : 'none'
                }}
                onClick={() => {
                  const parts = currentCommand.trim().split(' ');
                  if (parts.length === 1) {
                    setCurrentCommand(suggestion + ' ');
                  } else {
                    parts[parts.length - 1] = suggestion;
                    setCurrentCommand(parts.join(' ') + ' ');
                  }
                  setShowSuggestions(false);
                  inputRef.current?.focus();
                }}
              >
                <span className="text-green-400">◆</span> {suggestion}
              </motion.div>
            ))}
            <div className="text-xs text-purple-300 mt-2 pt-2 border-t border-purple-500/30 flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <span className="text-cyan-400">↑↓</span>
                <span>Navigate</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="text-green-400">↵</span>
                <span>Select</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="text-pink-400">ESC</span>
                <span>Close</span>
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InteractiveTerminal;
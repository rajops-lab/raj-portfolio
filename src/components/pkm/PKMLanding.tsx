import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Shield, 
  Search, 
  Upload, 
  Zap, 
  Lock, 
  Globe, 
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

export const PKMLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-cyber-black text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              className="inline-flex items-center space-x-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Brain className="h-8 w-8 text-neon-green" />
              <span className="text-neon-green font-mono text-lg">PKM SYSTEM</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-8 font-mono"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Your <span className="text-neon-green">Knowledge</span>
              <br />
              <span className="text-cyberpunk-cyan">Secured Forever</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              The world's first blockchain-powered Personal Knowledge Management system. 
              Create, store, and organize your thoughts with military-grade encryption 
              and tamper-proof blockchain technology.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-neon-green to-neon-bright text-cyber-black font-bold px-8 py-4 rounded-lg hover:from-neon-bright hover:to-neon-green transition-all duration-300 transform hover:scale-105 shadow-neon flex items-center space-x-2"
              >
                <span>Start Building Your Vault</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/login"
                className="border border-neon-green/50 text-neon-green hover:bg-neon-green/10 px-8 py-4 rounded-lg transition-all font-mono"
              >
                Access Existing Vault
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6 font-mono">
              Why Choose <span className="text-neon-green">PKM System</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Blockchain Security',
                description: 'Your notes are stored on an immutable blockchain with client-side encryption, ensuring maximum security and data integrity.',
                color: 'text-neon-green',
              },
              {
                icon: Search,
                title: 'Intelligent Search',
                description: 'Advanced full-text search with AI-powered relevance ranking helps you find exactly what you need, when you need it.',
                color: 'text-cyberpunk-cyan',
              },
              {
                icon: Upload,
                title: 'OCR Technology',
                description: 'Upload images and PDFs to automatically extract text content using advanced OCR technology.',
                color: 'text-cyberpunk-pink',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Optimized for speed with instant search, real-time sync, and responsive design across all devices.',
                color: 'text-neon-bright',
              },
              {
                icon: Lock,
                title: 'Zero-Knowledge',
                description: 'Your data is encrypted before it leaves your device. Even we cannot access your private notes.',
                color: 'text-cyberpunk-purple',
              },
              {
                icon: Globe,
                title: 'Universal Access',
                description: 'Access your knowledge vault from anywhere with our responsive web app and upcoming mobile applications.',
                color: 'text-cyberpunk-blue',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group bg-cyber-dark/60 backdrop-blur-sm border border-neon-green/20 rounded-lg p-6 hover:border-neon-green/60 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                <h3 className="text-xl font-bold text-white mb-3 font-mono">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="bg-cyber-dark/80 backdrop-blur-sm border border-neon-green/30 rounded-lg p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6 font-mono">
              Ready to Secure Your <span className="text-neon-green">Knowledge</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of professionals who trust PKM System to protect and organize their most valuable ideas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-neon-green to-neon-bright text-cyber-black font-bold px-8 py-4 rounded-lg hover:from-neon-bright hover:to-neon-green transition-all duration-300 transform hover:scale-105 shadow-neon"
              >
                Start Free Trial
              </Link>
              <Link
                to="/pricing"
                className="border border-neon-green/50 text-neon-green hover:bg-neon-green/10 px-8 py-4 rounded-lg transition-all font-mono"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neon-green/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-neon-green" />
              <span className="text-white font-mono font-bold">PKM System</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400 font-mono">
              <Link to="/" className="hover:text-neon-green transition-colors">
                Portfolio
              </Link>
              <Link to="/pricing" className="hover:text-neon-green transition-colors">
                Pricing
              </Link>
              <span>© 2024 Rajesh Avhad</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
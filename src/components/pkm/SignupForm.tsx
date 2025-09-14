import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await signUp(formData.email, formData.password, formData.name);
      
      if (error) {
        toast.error(error);
      } else {
        toast.success('Account created successfully!');
        navigate('/notes');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl font-bold text-white mb-2 font-mono"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Join <span className="text-neon-green">PKM</span> System
          </motion.h1>
          <p className="text-gray-400 font-mono">Create your knowledge vault</p>
        </div>

        {/* Signup Form */}
        <motion.div
          className="bg-cyber-dark/80 backdrop-blur-sm border border-neon-green/20 rounded-lg p-8 shadow-neon"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neon-green mb-2 font-mono">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-cyber-black/70 border border-cyber-light rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green transition-all font-mono"
                  placeholder="Your Name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neon-green mb-2 font-mono">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-cyber-black/70 border border-cyber-light rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green transition-all font-mono"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neon-green mb-2 font-mono">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-cyber-black/70 border border-cyber-light rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green transition-all font-mono"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-neon-green transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neon-green mb-2 font-mono">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-cyber-black/70 border border-cyber-light rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green transition-all font-mono"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-neon-green to-neon-bright text-cyber-black font-bold rounded-lg hover:from-neon-bright hover:to-neon-green transition-all duration-300 transform hover:scale-105 shadow-neon disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              whileHover={{ boxShadow: '0 0 30px rgba(0,255,65,0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-cyber-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  <span>Create Account</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm font-mono">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-neon-green hover:text-neon-bright transition-colors underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Back to Portfolio */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-gray-400 hover:text-neon-green transition-colors text-sm font-mono"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
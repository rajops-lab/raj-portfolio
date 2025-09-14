import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Zap, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { subscriptionPlans, stripeService } from '../../lib/stripe';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export const PricingPage: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string, priceId: string) => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      return;
    }

    if (planId === 'free') {
      toast.info('You are already on the free plan');
      return;
    }

    setLoading(planId);
    
    try {
      const { url, error } = await stripeService.createCheckoutSession(priceId, user.id);
      
      if (error) {
        toast.error(error);
      } else if (url) {
        window.location.href = url;
      }
    } catch (err) {
      toast.error('Failed to start checkout process');
    } finally {
      setLoading(null);
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free': return Shield;
      case 'pro': return Zap;
      case 'enterprise': return Crown;
      default: return Shield;
    }
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'free': return 'text-gray-400 border-gray-600';
      case 'pro': return 'text-neon-green border-neon-green';
      case 'enterprise': return 'text-cyberpunk-pink border-cyberpunk-pink';
      default: return 'text-gray-400 border-gray-600';
    }
  };

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

      {/* Header */}
      <header className="relative bg-cyber-black/90 backdrop-blur-md border-b border-neon-green/20 py-6 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={user ? "/notes" : "/"}
            className="inline-flex items-center text-neon-green hover:text-neon-bright transition-colors font-mono"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {user ? 'Back to Dashboard' : 'Back to Portfolio'}
          </Link>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Choose Your <span className="text-neon-green">Knowledge</span> Plan
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Unlock the full potential of your personal knowledge management system
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptionPlans.map((plan, index) => {
            const Icon = getPlanIcon(plan.id);
            const colorClass = getPlanColor(plan.id);
            const isCurrentPlan = user?.subscription_tier === plan.id;
            const isPopular = plan.id === 'pro';

            return (
              <motion.div
                key={plan.id}
                className={`relative bg-cyber-dark/60 backdrop-blur-sm border rounded-lg p-8 ${colorClass} ${
                  isPopular ? 'scale-105 shadow-neon' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: isPopular ? 1.05 : 1.02 }}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-neon-green text-cyber-black px-4 py-1 rounded-full text-sm font-bold font-mono">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Current Plan Badge */}
                {isCurrentPlan && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-neon-green/20 border border-neon-green text-neon-green px-3 py-1 rounded-full text-xs font-mono">
                      CURRENT
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <Icon className={`h-12 w-12 mx-auto mb-4 ${colorClass.split(' ')[0]}`} />
                  <h3 className="text-2xl font-bold text-white mb-2 font-mono">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-2">
                    ${plan.price}
                    <span className="text-lg text-gray-400 font-normal">/{plan.interval}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-neon-green flex-shrink-0" />
                      <span className="text-gray-300 font-mono text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  onClick={() => handleSubscribe(plan.id, plan.stripe_price_id)}
                  disabled={loading === plan.id || isCurrentPlan}
                  className={`w-full py-3 rounded-lg font-bold font-mono transition-all duration-300 ${
                    isCurrentPlan
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : plan.id === 'free'
                      ? 'border border-gray-600 text-gray-400 hover:border-gray-500'
                      : 'bg-gradient-to-r from-neon-green to-neon-bright text-cyber-black hover:from-neon-bright hover:to-neon-green transform hover:scale-105 shadow-neon'
                  }`}
                  whileHover={!isCurrentPlan ? { boxShadow: '0 0 25px rgba(0,255,65,0.4)' } : {}}
                  whileTap={!isCurrentPlan ? { scale: 0.95 } : {}}
                >
                  {loading === plan.id ? (
                    <div className="w-6 h-6 border-2 border-cyber-black border-t-transparent rounded-full animate-spin mx-auto" />
                  ) : isCurrentPlan ? (
                    'Current Plan'
                  ) : plan.id === 'free' ? (
                    'Get Started'
                  ) : (
                    'Upgrade Now'
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-8 font-mono">
            Frequently Asked <span className="text-neon-green">Questions</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-cyber-dark/60 p-6 rounded-lg border border-neon-green/20">
              <h3 className="text-lg font-bold text-neon-green mb-3 font-mono">Is my data secure?</h3>
              <p className="text-gray-400 font-mono text-sm">
                Yes! All your notes are encrypted client-side before being stored on our blockchain infrastructure. 
                Even we cannot access your data without your encryption key.
              </p>
            </div>
            
            <div className="bg-cyber-dark/60 p-6 rounded-lg border border-neon-green/20">
              <h3 className="text-lg font-bold text-neon-green mb-3 font-mono">Can I cancel anytime?</h3>
              <p className="text-gray-400 font-mono text-sm">
                Absolutely! You can cancel your subscription at any time. Your data will remain accessible 
                according to your plan's storage limits.
              </p>
            </div>
            
            <div className="bg-cyber-dark/60 p-6 rounded-lg border border-neon-green/20">
              <h3 className="text-lg font-bold text-neon-green mb-3 font-mono">What is blockchain storage?</h3>
              <p className="text-gray-400 font-mono text-sm">
                Your notes are stored in an immutable blockchain structure, ensuring data integrity 
                and providing a tamper-proof audit trail of all changes.
              </p>
            </div>
            
            <div className="bg-cyber-dark/60 p-6 rounded-lg border border-neon-green/20">
              <h3 className="text-lg font-bold text-neon-green mb-3 font-mono">How does OCR work?</h3>
              <p className="text-gray-400 font-mono text-sm">
                Upload images or PDFs and our OCR technology automatically extracts text content, 
                making it searchable within your knowledge base.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
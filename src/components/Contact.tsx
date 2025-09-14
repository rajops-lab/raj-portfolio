import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Linkedin, Github, Twitter, Send, Loader, CheckCircle, AlertTriangle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import contactData from '../data/contact.json';

// --- Data Interfaces ---
interface ContactInfoData {
  email: string;
  phone: string;
  location: string;
  socials: {
    linkedin: string;
    github: string;
    twitter: string;
  };
}

// --- Reusable Components ---

const SectionHeader = ({ inView }: { inView: boolean }) => (
  <motion.div
    className="text-center mb-12 sm:mb-16 px-4"
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-cyber">
      Let's <span className="text-neon-green">Connect</span>
    </h2>
    <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
      Have a project in mind or just want to say hello? Drop me a line.
    </p>
  </motion.div>
);

const ContactDetails = ({ info }: { info: ContactInfoData }) => (
  <div className="space-y-6">
    <ContactItem icon={Mail} label="Email" value={info.email} href={`mailto:${info.email}`} />
    <ContactItem icon={Phone} label="Phone" value={info.phone} href={`tel:${info.phone}`} />
    <ContactItem icon={MapPin} label="Location" value={info.location} />
  </div>
);

const ContactItem = ({ icon: Icon, label, value, href }: any) => (
  <a href={href} className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-cyber-dark/60 rounded-lg border border-neon-green/20 hover:border-neon-green/60 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-neon">
    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-neon-green/10 rounded-full flex items-center justify-center border-2 border-neon-green/30 group-hover:border-neon-green transition-all">
      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-neon-green" />
    </div>
    <div>
      <div className="text-gray-400 text-xs sm:text-sm font-mono">{label}</div>
      <div className="text-white font-semibold text-base sm:text-lg group-hover:text-neon-green transition-colors break-all sm:break-normal">{value}</div>
    </div>
  </a>
);

const SocialLinks = ({ socials }: { socials: ContactInfoData['socials'] }) => (
  <div className="mt-8 sm:mt-10">
    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-mono">// Find me on</h3>
    <div className="flex space-x-3 sm:space-x-4 justify-center sm:justify-start">
      <SocialLink href={socials.linkedin} icon={Linkedin} label="LinkedIn" />
      <SocialLink href={socials.github} icon={Github} label="GitHub" />
      <SocialLink href={socials.twitter} icon={Twitter} label="Twitter" />
    </div>
  </div>
);

const SocialLink = ({ href, icon: Icon, label }: any) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="group w-12 h-12 sm:w-14 sm:h-14 bg-cyber-dark/60 rounded-lg flex items-center justify-center border border-neon-green/20 hover:border-neon-green hover:bg-neon-green hover:text-cyber-black transition-all duration-300 transform hover:scale-110">
    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-neon-green group-hover:text-inherit" />
  </a>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 bg-cyber-dark/60 p-6 sm:p-8 rounded-lg border border-neon-green/20">
      <FormField name="name" label="Full Name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
      <FormField name="email" type="email" label="Email Address" placeholder="your.email@example.com" value={formData.email} onChange={handleChange} />
      <FormField name="message" type="textarea" label="Message" placeholder="Your project details..." value={formData.message} onChange={handleChange} />
      
      <SubmitButton status={status} />

      {status === 'success' && <FormStatus message="Message sent! I'll get back to you soon." icon={CheckCircle} color="text-green-400" />}
      {status === 'error' && <FormStatus message="An error occurred. Please try again." icon={AlertTriangle} color="text-red-400" />}
    </form>
  );
};

const FormField = ({ name, label, type = 'text', placeholder, value, onChange }: any) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-neon-green/80 mb-2 font-mono">
      {`> ${label}`}
    </label>
    <div className="relative">
      {type === 'textarea' ? (
        <textarea id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} rows={4} className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-cyber-black/70 border-2 border-cyber-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green transition-all text-sm sm:text-base" />
      ) : (
        <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-cyber-black/70 border-2 border-cyber-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green transition-all text-sm sm:text-base" />
      )}
    </div>
  </div>
);

const SubmitButton = ({ status }: { status: string }) => (
  <button type="submit" disabled={status === 'loading'} className="w-full flex justify-center items-center space-x-3 px-6 py-4 bg-gradient-to-r from-neon-green to-neon-bright text-cyber-black font-bold rounded-lg hover:from-neon-bright hover:to-neon-green transition-all transform hover:scale-105 shadow-neon disabled:opacity-50 disabled:cursor-not-allowed">
    {status === 'loading' ? <Loader className="animate-spin" /> : <Send />}
    <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
  </button>
);

const FormStatus = ({ message, icon: Icon, color }: any) => (
  <div className={`flex items-center space-x-3 p-3 rounded-md bg-cyber-gray/50 ${color}`}>
    <Icon />
    <span className="font-mono text-sm">{message}</span>
  </div>
);

// --- Main Component ---

const Contact: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" ref={ref} className="py-20 bg-cyber-black relative overflow-hidden">
      <DottedBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader inView={inView} />
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <ContactDetails info={contactData as ContactInfoData} />
            <SocialLinks socials={contactData.socials} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="mt-8 lg:mt-0">
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DottedBackground = () => (
  <div className="absolute inset-0 opacity-10" style={{
    backgroundImage: 'radial-gradient(#00ff41 1px, transparent 1px)',
    backgroundSize: '30px 30px',
  }} />
);

export default Contact;
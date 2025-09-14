import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Zap } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import aboutData from '../data/about.json';

// --- Data Interfaces ---
interface AboutData {
  title: string;
  tagline: string;
  introduction: string;
  journey: string[];
  stats: { value: string; label: string }[];
  keySkills: { title: string; description: string; icon: string }[];
  competencies: { skill: string; techs: string; level: number }[];
}

// --- Icon Mapping ---
const iconMap: { [key: string]: React.ElementType } = {
  Code,
  Server,
  Zap,
};

// --- Reusable Components ---

const SectionHeader = ({ title, tagline, inView }: { title: string, tagline: string, inView: boolean }) => (
  <motion.div
    className="text-center mb-12 sm:mb-16 px-4"
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-cyber">
      {title.split(' ')[0]} <span className="text-neon-green">{title.split(' ')[1]}</span>
    </h2>
    <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
      {tagline}
    </p>
  </motion.div>
);

const KeySkillCard = ({ skill, index }: { skill: any, index: number }) => {
  const Icon = iconMap[skill.icon];
  return (
    <motion.div
      className="group relative text-center p-6 sm:p-8 bg-cyber-dark/50 backdrop-blur-sm rounded-lg border border-neon-green/20 hover:border-neon-green/60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-neon"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 + index * 0.1 } }}
    >
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-neon-green/10 rounded-full mb-4 sm:mb-6 border-2 border-neon-green/30 group-hover:border-neon-green transition-all">
          <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-neon-green" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 font-mono">{skill.title}</h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{skill.description}</p>
      </div>
    </motion.div>
  );
};

const JourneySection = ({ introduction, journey, stats, competencies }: any) => (
  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono">&gt; My Journey</h3>
      <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{introduction}</p>
      {journey.map((paragraph: string, index: number) => (
        <p key={index} className="text-gray-300 text-base sm:text-lg leading-relaxed">{paragraph}</p>
      ))}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 sm:pt-6">
        {stats.map((stat: any, index: number) => (
          <div key={index} className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neon-green">{stat.value}</div>
            <div className="text-gray-400 text-xs sm:text-sm font-mono mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
    <Competencies competencies={competencies} />
  </div>
);

const Competencies = ({ competencies }: any) => (
  <div className="bg-cyber-dark/70 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-neon-green/20 mt-8 lg:mt-0">
    <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-mono">// Core Competencies</h4>
    <div className="space-y-4">
      {competencies.map((comp: any) => (
        <div key={comp.skill} className="p-3 sm:p-4 rounded-lg border border-cyber-light/50 hover:border-neon-green/40 hover:bg-neon-green/5 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold text-sm sm:text-base">{comp.skill}</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${i < comp.level ? 'bg-neon-green' : 'bg-gray-700'}`} />
              ))}
            </div>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm font-mono">{comp.techs}</p>
        </div>
      ))}
    </div>
  </div>
);

// --- Main Component ---

const About: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const data: AboutData = aboutData as AboutData;

  return (
    <section id="about" ref={ref} className="py-20 bg-cyber-black relative overflow-hidden">
      <DottedBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader title={data.title} tagline={data.tagline} inView={inView} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {data.keySkills.map((skill, index) => (
            <KeySkillCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>

        <JourneySection 
          introduction={data.introduction}
          journey={data.journey}
          stats={data.stats}
          competencies={data.competencies}
        />
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

export default About;

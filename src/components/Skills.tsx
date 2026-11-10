import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { 
  Code, Database, LineChart, Terminal, Globe, GitBranch, 
  Lightbulb, Search, BookOpen, FileText, Smartphone, 
  Cpu, Zap, Shield, Users, Target, Brain, Settings,
  MessageSquare, Clock, Layout, Briefcase
} from 'lucide-react';

const skillCategories = [
  {
    id: 'technical',
    title: 'Technical Skills',
    icon: Code,
    skills: [
      { name: "Python", level: 85, icon: Code, color: "bg-blue-500" },
      { name: "Java", level: 75, icon: Code, color: "bg-orange-500" },
      { name: "MySQL", level: 80, icon: Database, color: "bg-cyan-600" },
      { name: "C", level: 70, icon: Terminal, color: "bg-blue-600" },
      { name: "Machine Learning", level: 70, icon: Brain, color: "bg-purple-500" },
      { name: "Data Analysis", level: 78, icon: Database, color: "bg-cyan-500" },
      { name: "Data Visualization", level: 75, icon: LineChart, color: "bg-emerald-500" },
      { name: "Mobile App Development", level: 65, icon: Smartphone, color: "bg-pink-500" },
      { name: "Web Development", level: 72, icon: Globe, color: "bg-rose-500" },
      { name: "Automation Scripts", level: 74, icon: Zap, color: "bg-amber-500" },
      { name: "DSA", level: 68, icon: Settings, color: "bg-indigo-500" },
      { name: "OOP", level: 80, icon: Cpu, color: "bg-purple-600" },
      { name: "REST APIs", level: 70, icon: Globe, color: "bg-teal-500" },
      { name: "Debugging", level: 82, icon: Shield, color: "bg-red-500" },
      { name: "Deep Learning", level: 65, icon: Brain, color: "bg-violet-500" },
      { name: "NLP", level: 60, icon: MessageSquare, color: "bg-fuchsia-500" },
      { name: "Model Training", level: 68, icon: Target, color: "bg-orange-600" },
    ]
  },
  {
    id: 'toolkit',
    title: 'Toolkit / Core Abilities',
    icon: Settings,
    skills: [
      { name: "Git & Version Control", level: 85, icon: GitBranch, color: "bg-indigo-600" },
      { name: "Problem Solving", level: 88, icon: Lightbulb, color: "bg-amber-500" },
      { name: "Analytical Thinking", level: 85, icon: Search, color: "bg-cyan-400" },
      { name: "Research & Learning", level: 82, icon: BookOpen, color: "bg-purple-400" },
      { name: "Technical Documentation", level: 75, icon: FileText, color: "bg-emerald-400" },
      { name: "Critical Thinking", level: 84, icon: Brain, color: "bg-rose-500" },
      { name: "Logical Reasoning", level: 86, icon: Terminal, color: "bg-blue-500" },
      { name: "Continuous Learning", level: 90, icon: Zap, color: "bg-yellow-400" },
      { name: "Adaptability", level: 88, icon: Globe, color: "bg-teal-400" },
    ]
  },
  {
    id: 'soft',
    title: 'Soft Skills',
    icon: Users,
    skills: [
      { name: "Self-Learning", level: 90, icon: BookOpen, color: "bg-emerald-500" },
      { name: "Ownership & Accountability", level: 85, icon: Shield, color: "bg-blue-600" },
      { name: "Decision Making", level: 80, icon: Target, color: "bg-orange-500" },
      { name: "Creativity", level: 82, icon: Lightbulb, color: "bg-amber-400" },
      { name: "Communication Skills", level: 85, icon: MessageSquare, color: "bg-indigo-400" },
      { name: "Time Management", level: 83, icon: Clock, color: "bg-rose-400" },
      { name: "Organization Skills", level: 80, icon: Layout, color: "bg-cyan-500" },
      { name: "Team Collaboration", level: 86, icon: Users, color: "bg-purple-400" },
    ]
  }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  return (
    <section id="skills" className="py-24 bg-slate-900/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div data-piece
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Professional <span className="gradient-text">Skillset</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A specialized overview of my technical capabilities, core abilities, and interpersonal skills.
          </p>
        </motion.div>

        {/* Category Switcher (Button Type) */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {skillCategories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300 border ${
                activeCategory === category.id
                  ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]'
                  : 'bg-slate-900/50 border-white/5 text-slate-400 hover:border-white/20 hover:bg-slate-800'
              }`}
            >
              <category.icon className={`w-5 h-5 ${activeCategory === category.id ? 'text-white' : 'text-slate-500'}`} />
              {category.title}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {skillCategories
              .find(cat => cat.id === activeCategory)
              ?.skills.map((skill, index) => (
                <motion.div
                  key={`${activeCategory}-${skill.name}`}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="p-6 glass rounded-2xl border-white/5 hover:border-white/10 group transition-all"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-slate-950 group-hover:bg-purple-500/10 transition-colors`}>
                        <skill.icon className={`w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors`} />
                      </div>
                      <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">{skill.name}</h4>
                    </div>
                    <span className="text-xs font-bold font-mono text-purple-400">{skill.level}%</span>
                  </div>
                  
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden p-[2px]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: index * 0.05 }}
                      className={`h-full ${skill.color} rounded-full relative shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA / Highlight */}
        <motion.div data-piece
          className="mt-16 p-8 glass rounded-3xl border-white/5 text-center bg-linear-to-br from-purple-500/5 to-transparent"
        >
          <div className="inline-flex p-3 rounded-2xl bg-purple-500/20 mb-6">
            <Briefcase className="w-6 h-6 text-purple-400" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Ready to apply these skills</h4>
          <p className="text-slate-400 max-w-xl mx-auto">
            My diverse skillset allows me to approach problems from multiple angles, 
            blending technical precision with creative and analytical thinking.
          </p>
        </motion.div>
      </div>
    </section>
  );
}


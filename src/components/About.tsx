import { motion } from 'motion/react';
import { Brain, Cpu, Database, Code, Zap, Rocket } from 'lucide-react';

const interests = [
  { icon: Brain, label: "AI Applications", color: "text-purple-400" },
  { icon: Cpu, label: "Machine Learning", color: "text-blue-400" },
  { icon: Database, label: "Data Analysis", color: "text-emerald-400" },
  { icon: Zap, label: "Intelligent Automation", color: "text-amber-400" },
  { icon: Code, label: "RAG-based Systems", color: "text-cyan-400" },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div data-piece
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
              <p>
                I am a B.Tech engineering student with a strong interest in the intersection of technology, AI, and data. 
                My journey in engineering is fueled by a deep curiosity about how intelligent systems can solve real-world problems.
              </p>
              <p>
                I am continuously learning and working on projects related to <span className="text-purple-400 font-semibold">AI assistants, data analysis, and automation systems</span>. 
                I believe that data-driven solutions are the key to unlocking new possibilities in every industry.
              </p>
              <p>
                Whether it's writing efficient Python scripts to automate mundane tasks or building machine learning models to uncover hidden patterns in data, 
                I am always eager to push the boundaries of my knowledge and skills.
              </p>
            </div>
          </motion.div>

          <motion.div data-piece
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {interests.map((interest, i) => (
              <motion.div
                key={interest.label}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 glass rounded-2xl border-white/10 flex flex-col items-center text-center gap-4 group transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform ${interest.color}`}>
                  <interest.icon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-slate-200">{interest.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

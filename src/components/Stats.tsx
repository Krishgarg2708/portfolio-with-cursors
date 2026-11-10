import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Briefcase, FolderGit2, Trophy, GraduationCap } from 'lucide-react';

const stats = [
  {
    label: 'Internships',
    value: 6,
    suffix: '',
    prefix: '',
    icon: Briefcase,
    color: 'from-purple-500 to-indigo-500',
    glow: 'shadow-purple-500/20',
    description: 'Industry roles completed'
  },
  {
    label: 'Projects Built',
    value: 20,
    suffix: '+',
    prefix: '',
    icon: FolderGit2,
    color: 'from-blue-500 to-cyan-500',
    glow: 'shadow-blue-500/20',
    description: 'AI, ML & full-stack apps'
  },
  {
    label: 'Hackathons',
    value: 14,
    suffix: '+',
    prefix: '',
    icon: Trophy,
    color: 'from-amber-500 to-orange-500',
    glow: 'shadow-amber-500/20',
    description: 'National & institute level'
  },
  {
    label: 'CGPA',
    value: 6.9,
    suffix: '',
    prefix: '',
    icon: GraduationCap,
    color: 'from-emerald-500 to-teal-500',
    glow: 'shadow-emerald-500/20',
    description: 'Manav Rachna University'
  },
];

function AnimatedCounter({ to, suffix, prefix, isFloat }: { to: number; suffix: string; prefix: string; isFloat?: boolean }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<boolean>(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const steps = duration / step;
    const increment = to / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= to) {
        current = to;
        clearInterval(timer);
      }
      setDisplay(isFloat ? current.toFixed(2) : Math.floor(current).toString());
    }, step);
    return () => clearInterval(timer);
  }, [to, isFloat]);

  return <>{prefix}{display}{suffix}</>;
}

export default function Stats() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 relative overflow-hidden">
      {/* Subtle separator line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div data-piece
              key={stat.label}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className={`relative p-6 glass rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg ${stat.glow} group overflow-hidden`}
            >
              {/* Background glow blob */}
              <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} opacity-10 blur-xl group-hover:opacity-20 transition-opacity`} />

              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 mb-4`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>

              <div className={`text-4xl font-display font-black mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {inView ? (
                  <AnimatedCounter
                    to={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    isFloat={stat.value % 1 !== 0}
                  />
                ) : (
                  `${stat.prefix}0${stat.suffix}`
                )}
              </div>

              <p className="text-white font-bold text-sm mb-1">{stat.label}</p>
              <p className="text-slate-500 text-xs">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

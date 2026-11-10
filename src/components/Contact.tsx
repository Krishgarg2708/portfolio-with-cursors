import { motion } from 'motion/react';
import { Mail, Github, Linkedin } from 'lucide-react';

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    display: 'krish.garg2708@gmail.com',
    href: 'mailto:krish.garg2708@gmail.com',
    iconClass: 'text-purple-400',
    bgClass: 'bg-purple-500/20',
    borderHover: 'hover:border-purple-500/40',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    display: 'linkedin.com/in/krish-garg',
    href: 'https://www.linkedin.com/in/krish-garg-047649330/',
    iconClass: 'text-blue-400',
    bgClass: 'bg-blue-500/20',
    borderHover: 'hover:border-blue-500/40',
  },
  {
    icon: Github,
    label: 'GitHub',
    display: 'github.com/Krishgarg2708',
    href: 'https://github.com/Krishgarg2708',
    iconClass: 'text-cyan-400',
    bgClass: 'bg-cyan-500/20',
    borderHover: 'hover:border-cyan-500/40',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div data-piece
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Have a question or want to work together? Feel free to reach out.
          </p>
        </motion.div>

        <motion.div
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4"
        >
          {contacts.map(({ icon: Icon, label, display, href, iconClass, bgClass, borderHover }, i) => (
            <motion.a data-piece
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-5 p-5 glass rounded-2xl border border-white/10 ${borderHover} transition-all group`}
            >
              <div className={`w-12 h-12 rounded-xl ${bgClass} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-5 h-5 ${iconClass}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                <p className="text-base font-semibold text-white group-hover:text-slate-200 transition-colors truncate">
                  {display}
                </p>
              </div>
            </motion.a>
          ))}

          <motion.div data-piece
            transition={{ delay: 0.35 }}
            className="p-7 glass rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/5 to-blue-500/5 mt-2"
          >
            <h4 className="text-lg font-bold mb-2 text-purple-300">Let's Build Something Great</h4>
            <p className="text-slate-400 leading-relaxed text-sm">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

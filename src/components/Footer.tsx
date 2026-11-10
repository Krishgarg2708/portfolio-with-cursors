import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Code2, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Logo & Info */}
          <div className="space-y-4 text-center md:text-left">
            <a href="#" className="flex items-center justify-center md:justify-start gap-2 text-2xl font-display font-bold gradient-text">
              <Code2 className="w-8 h-8 text-purple-400" />
              <span>KG</span>
            </a>
            <p className="text-slate-400 max-w-xs">
              B.Tech Engineering Student passionate about AI, Data Analysis, and building impactful digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-8">
            {['About', 'Skills', 'Projects', 'Journey', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-slate-400 hover:text-purple-400 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-6">
            {[
              { icon: Github, href: "https://github.com/Krishgarg2708", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/krish-garg-047649330/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:krish.garg2708@gmail.com", label: "Email" }
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? "_blank" : undefined}
                rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-purple-400 transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <p>© {currentYear} Krish Garg. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> by Krish Garg
          </p>
        </div>
      </div>
    </footer>
  );
}

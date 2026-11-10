import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Mail, MousePointer2, Download } from 'lucide-react';
import { useEffect, useState } from 'react';

const titles = [
  "B.Tech Engineering Student",
  "Python & AI Enthusiast",
  "Data Analysis Learner",
  "Problem Solver"
];

export default function Hero() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentTitle = titles[currentTitleIndex];
      if (isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayText === currentTitle) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex, typingSpeed]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0)_0%,rgba(2,6,23,1)_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div>
          <motion.div data-piece data-hero data-by="explorer" data-label="Badge" data-from="-260,-60,-7" data-drag
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border-purple-500/20"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
            <span className="text-sm font-medium text-purple-200">Available for Projects</span>
          </motion.div>

          <h1 data-piece data-hero data-by="designer" data-action="marquee" data-label="Heading" data-drag className="text-5xl md:text-7xl font-display font-bold leading-tight mb-4">
            Hi, I'm <span className="gradient-text">Krish Garg</span>
          </h1>

          <div data-piece data-hero data-by="developer" data-label="Typing text" data-from="-300,140,-5" data-drag className="h-12 mb-8">
            <p className="text-xl md:text-2xl text-slate-400 font-medium">
              {displayText}
              <span className="animate-pulse inline-block w-1 h-8 bg-purple-500 ml-1 align-middle" />
            </p>
          </div>

          <p data-piece data-hero data-by="architect" data-label="Intro" data-from="-220,200,4" data-drag className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
            I am a B.Tech engineering student passionate about technology, AI tools, and data-driven solutions. 
            I enjoy building intelligent applications, exploring machine learning concepts, and creating impactful digital solutions.
          </p>

          <div data-piece data-hero data-by="innovator" data-label="Buttons" data-from="260,180,6" className="flex flex-wrap gap-4 mb-12">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-linear-to-r from-purple-600 to-blue-600 font-bold flex items-center gap-2 group"
            >
              View Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full glass font-bold border-white/10 hover:bg-white/10 transition-colors"
            >
              Contact Me
            </motion.a>
            {/* ── RESUME DOWNLOAD BUTTON ── */}
            <motion.a
              href="/Krish_Garg_Resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-bold flex items-center gap-2 hover:bg-emerald-500/20 hover:border-emerald-500/60 transition-all"
            >
              <Download className="w-5 h-5" />
              Resume
            </motion.a>
          </div>

          <div data-piece data-hero data-by="builder" data-label="Socials" data-from="-180,120,-8" className="flex items-center gap-6">
            {[
              { icon: Github, href: "https://github.com/Krishgarg2708", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/krish-garg-047649330/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:krish.garg2708@gmail.com", label: "Email" }
            ].map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? "_blank" : undefined}
                rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                className="text-slate-400 hover:text-purple-400 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div data-piece data-hero data-by="creator" data-label="Photo" data-from="320,-200,12" data-drag
          className="relative hidden md:block"
        >
          <div className="relative z-10 w-full aspect-square rounded-3xl overflow-hidden glass border-white/10 p-4">
            <div className="w-full h-full rounded-2xl bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden group">
              <img 
                src="https://lh3.googleusercontent.com/d/1hTaGITAsWJqBQQyfdCe5r4qAKlU2jxHd" 
                alt="Krish Garg" 
                className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl border-white/10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-sm font-medium text-purple-300 mb-1">Current Focus</p>
                <p className="text-sm font-bold text-white leading-relaxed">
                  AI Applications • Machine Learning • Data Analysis • Intelligent Automation • RAG-based Systems
                </p>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 p-4 glass rounded-2xl border-white/10 shadow-2xl z-20"
          >
            <MousePointer2 className="w-8 h-8 text-cyan-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

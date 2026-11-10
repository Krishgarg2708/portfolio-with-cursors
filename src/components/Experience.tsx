import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Briefcase, Calendar, ChevronDown, CheckCircle2, Building2, HelpCircle, MapPin } from 'lucide-react';

const internships = [
  {
    company: 'Codsoft',
    role: 'Artificial Intelligence Intern',
    period: 'June 2024 – July 2024',
    type: 'AI / ML',
    color: 'from-purple-500 to-indigo-500',
    pills: ['Python', 'OpenCV', 'NLP', 'CNN'],
    points: [
      'Built a fully functional AI Tic-Tac-Toe game using Minimax algorithm with alpha-beta pruning.',
      'Developed a rule-based chatbot with intent classification and pattern matching.',
      'Implemented an Image Captioning system using CNN feature extraction.',
      'Built a real-time Face Detection and Recognition pipeline using OpenCV.',
    ],
  },
  {
    company: 'Bluestock Fintech',
    role: 'Data Analyst Intern',
    period: 'June 2024 – July 2024',
    type: 'Data Analytics',
    color: 'from-sky-500 to-blue-600',
    pills: ['Python', 'Pandas', 'SQL', 'Power BI'],
    points: [
      'Analyzed financial datasets to identify trends in stock market behavior and investor patterns.',
      'Built interactive dashboards in Power BI to visualize key performance indicators for internal stakeholders.',
      'Wrote optimized SQL queries to extract, clean, and transform large volumes of transactional data.',
      'Automated repetitive reporting workflows using Python and Pandas, reducing manual effort by ~40%.',
    ],
  },
  {
    company: 'CodeIt Tech Solution',
    role: 'UI/UX Designer',
    period: 'May 2024 – July 2024',
    type: 'Design',
    color: 'from-blue-500 to-cyan-500',
    pills: ['Figma', 'Prototyping', 'User Flows'],
    points: [
      'Designed end-to-end UI/UX for 2+ client-facing web products with high-fidelity prototypes in Figma.',
      'Collaborated with developers to ensure design-to-code accuracy and responsive implementation.',
    ],
  },
  {
    company: 'Future Interns',
    role: 'UI/UX Designer',
    period: 'May 2024 – July 2024',
    type: 'Design',
    color: 'from-pink-500 to-rose-500',
    pills: ['Figma', 'UX Research', 'Accessibility'],
    points: [
      'Designed user interfaces and interactive prototypes for frontend projects.',
      'Conducted user research and translated findings into intuitive, accessible design solutions.',
    ],
  },
  {
    company: 'Skillcraft Technology',
    role: 'UI/UX Designer',
    period: 'June 2024 – July 2024',
    type: 'Design',
    color: 'from-emerald-500 to-teal-500',
    pills: ['Figma', 'Component Library', 'Design Handoff'],
    points: [
      'Created high-fidelity UI designs and component libraries for web applications.',
      'Delivered pixel-perfect design handoffs with detailed specifications for development teams.',
    ],
  },
  {
    company: 'Oasis Infobyte',
    role: 'UI/UX Designer',
    period: 'April 2024 – May 2024',
    type: 'Design',
    color: 'from-amber-500 to-orange-500',
    pills: ['Figma', 'Wireframing', 'Responsive Design'],
    points: [
      'Designed responsive UI screens and user flows for web-based applications.',
      'Iterated on designs based on feedback to improve usability and visual consistency.',
    ],
  },
  {
    company: 'CodeAlpha',
    role: 'Frontend Developer Intern',
    period: 'Internship',
    type: 'Frontend',
    color: 'from-violet-500 to-purple-500',
    pills: ['React', 'TypeScript', 'REST APIs'],
    points: [
      'Designed and developed interactive, responsive websites with modern frontend technologies.',
      'Implemented clean, reusable React components for scalable web applications.',
      'Integrated backend APIs and improved page loading speed and UX.',
    ],
  },
];

const faqs = [
  {
    q: 'Have you done any on-site internships?',
    a: [
      "Not yet, honestly — all my internships so far have been remote. But I have had on-site offers come my way, from Mumbai, Noida, and Bangalore, plus one here in Delhi. I ended up saying no to all of them, and for a couple of different reasons. The Delhi one, for starters, was unpaid and wanted a 6-day work week in return for just a certificate, which didn't feel like a fair trade for the work I'd be putting in. The other three did offer a stipend that matched my skill level, so I genuinely considered them, but they were all in cities far from home, and around that time things weren't really stable on the personal front for me, so moving out just wasn't practical. So it came down to a mix of fair compensation and timing — if either of those isn't right, I'd rather hold off than rush into something that doesn't make sense for me at that moment.",
    ],
  },
];

export default function Experience() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <section id="experience" className="py-20 bg-slate-900/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div data-piece
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Work Experience</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Internship <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            7 internships across AI/ML engineering, data analytics, UI/UX design, and frontend development.
          </p>
        </motion.div>

        {/* Company pills row */}
        <motion.div data-piece
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {internships.map((intern, i) => (
            <motion.button
              key={intern.company}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200 ${
                activeIdx === i
                  ? `bg-gradient-to-r ${intern.color} text-white border-transparent shadow-lg`
                  : 'border-white/15 text-slate-300 hover:border-white/30 hover:text-white glass'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              {intern.company}
            </motion.button>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="space-y-4">
          {internships.map((intern, i) => (
            <motion.div data-piece
              key={intern.company}
              transition={{ delay: i * 0.07 }}
            >
              <div
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                className={`p-6 glass rounded-2xl border transition-all duration-300 cursor-pointer group ${
                  activeIdx === i ? 'border-white/20 ring-1 ring-white/10' : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${intern.color} bg-opacity-20 shrink-0`}>
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors">
                        {intern.role}
                      </h3>
                      <p className={`text-sm font-semibold bg-gradient-to-r ${intern.color} bg-clip-text text-transparent`}>
                        @ {intern.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                      <Calendar className="w-3 h-3" />{intern.period}
                    </span>
                    <div className="flex flex-wrap gap-1.5 hidden md:flex">
                      {intern.pills.map(p => (
                        <span key={p} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400 text-[10px] font-medium">
                          {p}
                        </span>
                      ))}
                    </div>
                    <motion.div
                      animate={{ rotate: activeIdx === i ? 180 : 0 }}
                      className="p-1.5 rounded-full bg-white/5 text-slate-400 shrink-0"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Expandable detail */}
                <AnimatePresence>
                  {activeIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="mt-5 pt-5 border-t border-white/5">
                        <ul className="space-y-2.5">
                          {intern.points.map((pt, j) => (
                            <li key={j} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                              {pt}
                            </li>
                          ))}
                        </ul>
                        {/* Mobile pills */}
                        <div className="flex flex-wrap gap-2 mt-4 md:hidden">
                          {intern.pills.map(p => (
                            <span key={p} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400 text-xs font-medium">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ section */}
        <motion.div data-piece
          className="mt-16"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">FAQ</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold">
              Questions People <span className="gradient-text">Often Ask</span>
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className={`p-5 glass rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeFaq === i ? 'border-white/20 ring-1 ring-white/10' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 bg-opacity-20 shrink-0">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-white">{faq.q}</h4>
                  </div>
                  <motion.div
                    animate={{ rotate: activeFaq === i ? 180 : 0 }}
                    className="p-1.5 rounded-full bg-white/5 text-slate-400 shrink-0"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                        {faq.a.map((para, j) => (
                          <p key={j} className="text-sm text-slate-300 leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

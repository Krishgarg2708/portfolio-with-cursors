import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import {
  Terminal, Cpu, Brain, Smartphone, Compass, Briefcase,
  Calendar, ArrowRight, Check, Package, Zap, LucideIcon
} from 'lucide-react';

/* ─── types ─────────────────────────────────────────────────────── */
interface ShippedProject {
  icon: LucideIcon;
  name: string;
  desc: string;
}

interface Internship {
  company: string;
  role: string;
  date: string;
  color: string;
  pts: string[];
}

interface Stage {
  stage: string;
  title: string;
  era: string;
  current: boolean;
  takeaway: string;
  learned: string[];
  shipped: ShippedProject[];
  challenge: string;
  fix: string;
  icon: LucideIcon;
  accent: string;
  internships?: Internship[];
}

/* ─── data ───────────────────────────────────────────────────────── */
const stages: Stage[] = [
  {
    stage: '01', title: 'Foundations', era: 'Foundations', current: false,
    accent: '#378ADD', icon: Terminal,
    takeaway: 'Strong foundations make learning any new language significantly easier.',
    learned: ['C Programming', 'Python Basics', 'Recursion', 'Memory Management', 'Logic Building'],
    shipped: [
      { icon: Terminal,  name: 'CLI Calculator',   desc: 'Arithmetic & logic operations in C with full operator precedence' },
      { icon: Package,   name: 'File Organiser',   desc: 'Batch file operations via Python — sorts, renames and archives' },
      { icon: Check,     name: 'Task Manager CLI', desc: 'CRUD task list with file-based persistence and priority flags' },
    ],
    challenge: 'Understanding pointers and manual memory management in C',
    fix: 'Built visual memory diagrams to trace pointer chains step by step.',
  },
  {
    stage: '02', title: 'Problem Solving', era: 'Algorithms', current: false,
    accent: '#7F77DD', icon: Cpu,
    takeaway: 'Working code is good, but efficient code is what scales.',
    learned: ['Data Structures', 'Sorting & Searching', 'Big O Analysis', 'Trees & Graphs', 'Dynamic Programming'],
    shipped: [
      { icon: Cpu,       name: 'Sort Visualiser',  desc: 'Step-by-step animation of 5 sorting algorithms with live comparisons' },
      { icon: Brain,     name: 'BST Explorer',     desc: 'Interactive binary search tree — insert, delete, search with traversal viz' },
      { icon: Compass,   name: 'Pathfinder',       desc: 'Dijkstra and BFS visualised on an interactive grid with obstacle drawing' },
    ],
    challenge: 'Optimising time complexity for large input datasets',
    fix: 'Mastered Big O analysis and applied space-time tradeoffs systematically.',
  },
  {
    stage: '03', title: 'Data & ML', era: 'ML', current: false,
    accent: '#D4537E', icon: Brain,
    takeaway: 'Data tells a beautiful story if you know how to clean and interpret it.',
    learned: ['Pandas & NumPy', 'Supervised Learning', 'EDA', 'Cross-Validation', 'Feature Engineering'],
    shipped: [
      { icon: Brain,     name: 'Wine Quality Predictor', desc: 'Logistic Regression model with 12-graph visual dashboard and calibration curves' },
      { icon: Package,   name: 'EDA Dashboard',          desc: 'Auto-generates insight reports — distributions, correlations and outlier maps' },
      { icon: Cpu,       name: 'Model Tuner',            desc: 'Grid-search CV pipeline for sklearn models with live accuracy comparison' },
    ],
    challenge: 'Model overfitting on small, imbalanced wine datasets',
    fix: 'Applied stratified cross-validation and regularisation tuning to stabilise accuracy.',
  },
  {
    stage: '04', title: 'Android Dev', era: 'Mobile', current: false,
    accent: '#D85A30', icon: Smartphone,
    takeaway: 'The best tech is invisible — the user experience should be the priority.',
    learned: ['Jetpack Compose', 'Kotlin Coroutines', 'State Hoisting', 'MVVM', 'Material You'],
    shipped: [
      { icon: Smartphone, name: 'Dev Portfolio App',    desc: 'Personal portfolio with animated project cards and dark-theme system' },
      { icon: Compass,    name: 'Smart Travel Planner', desc: 'Offline weather simulation + transport suggestions for 15 destinations' },
      { icon: Calendar,   name: 'Schedule Manager',     desc: 'Calendar UI with local notification reminders and recurring event support' },
    ],
    challenge: 'Managing complex, nested UI state across Compose screens',
    fix: 'Adopted unidirectional data flow with ViewModel state hoisting patterns.',
  },
  {
    stage: '05', title: 'AI Integration', era: 'AI Apps', current: false,
    accent: '#1D9E75', icon: Compass,
    takeaway: 'The value of an app lies in its ability to simplify complex tasks for the user.',
    learned: ['Prompt Engineering', 'REST API Integration', 'Geolocation', 'n8n Automation', 'RAG Pipelines'],
    shipped: [
      { icon: Compass,   name: 'AI Travel Planner',  desc: 'LLM-powered personalised itinerary generator with geolocation context' },
      { icon: Brain,     name: 'AI Agent (n8n)',      desc: 'Multi-step automation workflow with dynamic tool calls and error recovery' },
      { icon: Package,   name: 'DocumentMind',        desc: 'RAG-based document Q&A with source citations and chunk-level retrieval' },
    ],
    challenge: 'Handling unpredictable dynamic inputs inside AI prompt templates',
    fix: 'Refined prompt engineering with strict output schemas and robust error handling.',
  },
  {
    stage: '06', title: 'Internships', era: 'Industry', current: true,
    accent: '#BA7517', icon: Briefcase,
    takeaway: 'Bridging AI features with polished interactive design creates high-value products.',
    learned: ['Minimax + Alpha-Beta', 'OpenCV Face Rec', 'Figma High-fi', 'Intent Classification', 'React Components'],
    shipped: [
      { icon: Cpu,       name: 'AI Tic-Tac-Toe',   desc: 'Minimax with alpha-beta pruning — provably unbeatable AI opponent' },
      { icon: Brain,     name: 'Intent Chatbot',    desc: 'Rule-based NLP with pattern matching and structured query handling' },
      { icon: Smartphone, name: 'Image Captioning', desc: 'CNN feature extraction piped into a sequence-to-sequence caption generator' },
    ],
    challenge: 'Adapting academic knowledge to real production timelines',
    fix: 'Used rapid Figma prototyping and documented algorithms for fast, scalable delivery.',
    internships: [
      {
        company: 'Codsoft', role: 'AI Intern', date: 'Jun – Jul 2026', color: '#7F77DD',
        pts: [
          'Built AI Tic-Tac-Toe using Minimax with alpha-beta pruning.',
          'Developed rule-based chatbot with intent classification and pattern matching.',
          'Implemented Image Captioning via CNN feature extraction and seq2seq generation.',
          'Built real-time Face Detection and Recognition pipeline using OpenCV.',
        ],
      },
      {
        company: 'CodeIt Tech', role: 'UI/UX Designer', date: 'May – Jul 2026', color: '#D4537E',
        pts: [
          'Designed end-to-end UI/UX for 2+ web products with high-fidelity Figma prototypes.',
          'Collaborated with developers to ensure design-to-code accuracy and responsive implementation.',
        ],
      },
      {
        company: 'Future Interns', role: 'UI/UX Designer', date: 'May – Jul 2026', color: '#D85A30',
        pts: [
          'Designed interactive prototypes for frontend projects using Figma.',
          'Conducted user research and translated findings into accessible, intuitive design solutions.',
        ],
      },
      {
        company: 'Skillcraft', role: 'UI/UX Designer', date: 'Jun – Jul 2026', color: '#1D9E75',
        pts: [
          'Created high-fidelity UI designs and component libraries for web applications.',
          'Delivered pixel-perfect design handoffs with detailed specifications for dev teams.',
        ],
      },
      {
        company: 'Oasis Infobyte', role: 'UI/UX Designer', date: 'Apr – May 2026', color: '#378ADD',
        pts: [
          'Designed responsive UI screens and user flows for web-based applications.',
          'Iterated on designs based on feedback to improve usability and visual consistency.',
        ],
      },
      {
        company: 'CodeAlpha', role: 'Frontend Dev Intern', date: '2026', color: '#E24B4A',
        pts: [
          'Built responsive, interactive websites with modern React and component architecture.',
          'Implemented clean, reusable React components for scalable web applications.',
          'Integrated backend APIs and debugged frontend issues collaboratively.',
        ],
      },
    ],
  },
];

/* ─── component ──────────────────────────────────────────────────── */
export default function Timeline() {
  const [active, setActive]         = useState(5);
  const [activeIntern, setActiveIntern] = useState(0);

  const s  = stages[active];
  const ac = s.accent;

  function go(i: number) { setActive(i); setActiveIntern(0); }
  function nav(d: number) { const n = active + d; if (n >= 0 && n < stages.length) go(n); }

  return (
    <section id="journey" className="py-24 relative overflow-hidden">

      {/* Ambient tint */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-700"
        style={{ background: `radial-gradient(ellipse 55% 40% at 50% 20%, ${ac}10 0%, transparent 65%)` }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <motion.div data-piece className="text-center mb-16"
        >
          <p className="text-[11px] font-bold tracking-[0.22em] text-slate-500 uppercase mb-3">
            The journey
          </p>
          <h2 className="text-5xl md:text-6xl font-display font-bold leading-none mb-4">
            Learning by{' '}
            <motion.span
              className="relative inline-block transition-colors duration-500"
              style={{ color: ac }}
            >
              Building
              <motion.span
                className="absolute -bottom-1 left-0 h-[2px] w-full origin-left rounded-full"
                style={{ background: ac }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.55, ease: 'circOut' }}
              />
            </motion.span>
          </h2>
          <p className="text-slate-500 text-sm">
            Six stages, six chapters — each one a real product shipped.
          </p>
        </motion.div>

        {/* ── Stage rail ── */}
        <div className="relative flex items-center mb-12">
          {/* Background track */}
          <div className="absolute inset-y-0 top-[17px] left-0 right-0 flex items-center pointer-events-none">
            <div className="w-full h-px bg-slate-800" />
          </div>
          {/* Progress fill */}
          <div
            className="absolute top-[17px] left-0 h-px pointer-events-none transition-all duration-500"
            style={{
              width: active === 0 ? '0%' : `${(active / (stages.length - 1)) * 100}%`,
              background: `linear-gradient(90deg, ${stages[0].accent}, ${ac})`,
            }}
          />

          {stages.map((st, i) => {
            const Icon = st.icon;
            const isActive = i === active;
            const isPast   = i < active;
            return (
              <button
                key={st.stage}
                onClick={() => go(i)}
                className="relative z-10 flex-1 flex flex-col items-center gap-1.5 group"
              >
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  className="flex items-center justify-center rounded-full border-2 transition-all"
                  style={{
                    width:  isActive ? 44 : 34,
                    height: isActive ? 44 : 34,
                    borderColor: isActive || isPast ? st.accent : '#1e293b',
                    background: isActive ? st.accent : isPast ? `${st.accent}20` : '#0f172a',
                    transition: 'all 0.35s cubic-bezier(.34,1.56,.64,1)',
                  }}
                >
                  <Icon
                    style={{
                      width:  isActive ? 20 : 14,
                      height: isActive ? 20 : 14,
                      color: isActive ? '#fff' : isPast ? st.accent : '#475569',
                      transition: 'all .3s',
                    }}
                  />
                  {st.current && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-slate-900 animate-pulse" />
                  )}
                </motion.div>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest hidden sm:block transition-colors duration-300"
                  style={{ color: isActive ? ac : '#475569' }}
                >
                  {st.era}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Main panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={  { opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="rounded-3xl border border-white/[0.07] overflow-hidden"
            style={{ background: 'rgba(2,6,23,0.75)', backdropFilter: 'blur(20px)' }}
          >
            {/* Top accent line */}
            <div className="h-px transition-all duration-500" style={{ background: `linear-gradient(90deg,transparent,${ac},transparent)` }} />

            <div className="p-7 md:p-10">

              {/* Panel header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-8">
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center rounded-2xl shrink-0"
                    style={{ width: 56, height: 56, background: `${ac}16`, border: `1.5px solid ${ac}35` }}
                  >
                    <s.icon style={{ width: 24, height: 24, color: ac }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: ac }}>
                        Stage {s.stage}
                      </span>
                      {s.current && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          <span className="w-1 h-1 rounded-full bg-rose-400 animate-pulse" />
                          Active
                        </span>
                      )}
                    </div>
                    <h3 className="text-3xl font-display font-bold text-white leading-none">
                      {s.title}
                    </h3>
                  </div>
                </div>

                {/* Takeaway quote */}
                <div
                  className="sm:max-w-[260px] p-4 rounded-2xl"
                  style={{ background: `${ac}0a`, border: `1px solid ${ac}1a` }}
                >
                  <p className="text-slate-400 text-[13px] leading-relaxed italic">
                    "{s.takeaway}"
                  </p>
                </div>
              </div>

              {/* ── Internships (Stage 6) ── */}
              {s.internships && s.internships.length > 0 && (
                <div className="mb-8">
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2"
                    style={{ color: ac }}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    Company experience
                  </p>

                  {/* Pill strip */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {s.internships.map((inn, idx) => (
                      <button
                        key={inn.company}
                        onClick={() => setActiveIntern(idx)}
                        className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200"
                        style={
                          activeIntern === idx
                            ? { background: inn.color, color: '#fff', boxShadow: `0 0 14px ${inn.color}40` }
                            : { background: `${inn.color}14`, color: inn.color, border: `1px solid ${inn.color}30` }
                        }
                      >
                        {inn.company}
                      </button>
                    ))}
                  </div>

                  {/* Internship detail */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIntern}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={  { opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-5 rounded-2xl"
                      style={{
                        background: `${s.internships[activeIntern].color}08`,
                        border: `1px solid ${s.internships[activeIntern].color}20`,
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/5">
                        <div>
                          <p className="font-semibold text-white text-[14px]">
                            {s.internships[activeIntern].role}
                          </p>
                          <p className="text-[12px] mt-0.5" style={{ color: s.internships[activeIntern].color }}>
                            @ {s.internships[activeIntern].company}
                          </p>
                        </div>
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-semibold font-mono"
                          style={{
                            background: `${s.internships[activeIntern].color}14`,
                            color: s.internships[activeIntern].color,
                          }}
                        >
                          <Calendar className="w-3 h-3" />
                          {s.internships[activeIntern].date}
                        </span>
                      </div>
                      <ul className="space-y-2.5">
                        {s.internships[activeIntern].pts.map((pt, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: 6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-start gap-2.5 text-[13px] text-slate-300 leading-relaxed"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                              style={{ background: s.internships[activeIntern].color }}
                            />
                            {pt}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 mb-0 h-px bg-white/[0.05]" />
                </div>
              )}

              {/* ── Shipped projects ── */}
              <div className="mb-8 mt-8">
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2"
                  style={{ color: ac }}
                >
                  <Package className="w-3.5 h-3.5" />
                  Shipped
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {s.shipped.map((proj) => (
                    <div
                      key={proj.name}
                      className="p-4 rounded-2xl"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <proj.icon className="mb-3" style={{ width: 20, height: 20, color: ac }} />
                      <p className="text-[13px] font-semibold text-white mb-1">{proj.name}</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Concepts + Obstacle ── */}
              <div className="h-px bg-white/[0.05] mb-8" />
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2"
                    style={{ color: ac }}
                  >
                    <Check className="w-3.5 h-3.5" />
                    Core concepts
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {s.learned.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-lg text-[12px] font-medium"
                        style={{ background: `${ac}12`, color: ac, border: `1px solid ${ac}25` }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2"
                    style={{ color: ac }}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Obstacle → fix
                  </p>
                  <div
                    className="p-4 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <p className="text-slate-500 text-[12px] italic mb-2">"{s.challenge}"</p>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: ac }} />
                      <p className="text-slate-300 text-[12px] leading-relaxed">{s.fix}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Prev / Next nav ── */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => nav(-1)}
            disabled={active === 0}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-20 disabled:cursor-not-allowed text-slate-400 hover:text-white border border-white/5 hover:border-white/10 hover:bg-white/5"
          >
            ← Previous
          </button>
          <button
            onClick={() => nav(1)}
            disabled={active === stages.length - 1}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-20 disabled:cursor-not-allowed border text-white"
            style={{ background: ac, borderColor: ac, opacity: active === stages.length - 1 ? 0.2 : 1 }}
          >
            Next →
          </button>
        </div>

        {/* ── Current focus / next goal ── */}
        <motion.div data-piece
          className="mt-10 grid sm:grid-cols-2 gap-4"
        >
          {[
            { label: 'Current focus', color: '#378ADD', text: 'Designing end-to-end high-fidelity user workflows while optimising complex search algorithms, database structures, and ML integrations.' },
            { label: 'Next goal',     color: '#1D9E75', text: 'Building immersive AI-powered products, publishing professional research, and acquiring roles that advance corporate digital solutions.' },
          ].map(({ label, color, text }) => (
            <div
              key={label}
              className="p-5 rounded-2xl"
              style={{ background: `${color}08`, border: `1px solid ${color}20` }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color }}>
                {label}
              </p>
              <p className="text-slate-400 text-[13px] leading-relaxed">{text}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

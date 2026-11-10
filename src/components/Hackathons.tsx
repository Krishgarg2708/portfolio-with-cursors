import { motion } from 'motion/react';
import { Trophy, MapPin, Building2, Star, Zap } from 'lucide-react';

const hackathons = [
  {
    name: 'Smart India Hackathon 2025',
    org: 'Government of India',
    location: 'National Level',
    result: 'Finalist',
    highlight: true,
    color: 'from-amber-500 to-orange-500',
    badge: '🏆 Finalist',
  },
  {
    name: 'India Innovates 2026',
    org: 'Municipal Corporation of Delhi',
    location: 'National Level',
    result: 'Participant',
    highlight: false,
    color: 'from-blue-500 to-indigo-500',
    badge: '🇮🇳 National',
  },
  {
    name: 'GDG Hacker Cup Hackathon',
    org: 'Kamla Nehru Institute of Technology (KNIT), Sultanpur',
    location: 'Institute Level',
    result: 'Participant',
    highlight: false,
    color: 'from-purple-500 to-pink-500',
    badge: '💡 GDG',
  },
  {
    name: 'Hack Energy 2.0',
    org: 'HackGyanVerse Community',
    location: 'Community Hackathon',
    result: 'Participant',
    highlight: false,
    color: 'from-emerald-500 to-teal-500',
    badge: '⚡ Energy',
  },
  {
    name: 'Neuro Knockout',
    org: 'Delhi Technological University (DTU), New Delhi',
    location: 'Institute Level',
    result: 'Participant',
    highlight: false,
    color: 'from-cyan-500 to-blue-500',
    badge: '🧠 DTU',
  },
  {
    name: 'GitHub Portfolio Analyzer & Enhancer Hackathon',
    org: 'UnsaidTalks Education',
    location: 'Online',
    result: 'Participant',
    highlight: false,
    color: 'from-slate-500 to-indigo-500',
    badge: '🐙 GitHub',
  },
  {
    name: 'Hack4Delhi',
    org: 'Netaji Subhas University of Technology (NSUT), Delhi',
    location: 'Institute Level',
    result: 'Participant',
    highlight: false,
    color: 'from-rose-500 to-pink-500',
    badge: '🏙️ Delhi',
  },
  {
    name: "Opencode'25",
    org: 'Indian Institute of Information Technology (IIIT), Allahabad',
    location: 'IIT Level',
    result: 'Participant',
    highlight: false,
    color: 'from-violet-500 to-purple-500',
    badge: '💻 Open Source',
  },
  {
    name: 'Code Clash',
    org: 'Indian Institute of Technology (IIT), Hyderabad',
    location: 'IIT Level',
    result: 'Participant',
    highlight: false,
    color: 'from-orange-500 to-red-500',
    badge: '⚔️ IIT',
  },
  {
    name: 'Ai-Thon Global Coding Conquest',
    org: 'Birla Institute of Technology & Science (BITS), Pilani',
    location: 'Global Level',
    result: 'Participant',
    highlight: false,
    color: 'from-fuchsia-500 to-purple-500',
    badge: '🌍 Global',
  },
  {
    name: 'Nerds Vibeathon',
    org: 'Vishveshwarya Group of Institutions',
    location: 'Institute Level',
    result: 'Participant',
    highlight: false,
    color: 'from-teal-500 to-cyan-500',
    badge: '🤓 Nerds',
  },
  {
    name: 'NASA Space Apps Challenge',
    org: 'NASA',
    location: 'Global Level',
    result: 'Participant',
    highlight: false,
    color: 'from-blue-600 to-slate-600',
    badge: '🚀 NASA',
  },
  {
    name: 'Hackathon @ IIT Kanpur',
    org: 'Indian Institute of Technology Kanpur',
    location: 'IIT Level',
    result: 'Participant',
    highlight: false,
    color: 'from-indigo-500 to-blue-600',
    badge: '🔬 IIT-K',
  },
];

export default function Hackathons() {
  return (
    <section id="hackathons" className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div data-piece
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">Competitive Arena</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Hackathon <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            13+ hackathons across IITs, NITs, national government platforms, and global stages — building fast, shipping faster.
          </p>
        </motion.div>

        {/* Highlight card — SIH */}
        <motion.div data-piece
          className="mb-8"
        >
          {hackathons.filter(h => h.highlight).map(h => (
            <div
              key={h.name}
              className="relative p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent overflow-hidden group"
            >
              {/* Animated glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  SIH 2025 Finalist
                </span>
              </div>
              <div className="flex items-start gap-5 relative z-10">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30 shrink-0">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{h.name}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Building2 className="w-4 h-4 text-amber-400" />{h.org}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <MapPin className="w-4 h-4 text-amber-400" />{h.location}
                    </span>
                  </div>
                  <p className="text-slate-400 mt-3 text-sm max-w-xl">
                    Reached the national finals of India's largest student hackathon organised by the Government of India — competing against thousands of teams nationwide.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Grid of remaining hackathons */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hackathons.filter(h => !h.highlight).map((h, i) => (
            <motion.div data-piece
              key={h.name}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-5 glass rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${h.color} bg-opacity-20 shrink-0`}>
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md bg-gradient-to-r ${h.color} bg-clip-text text-transparent border border-white/10`}>
                  {h.badge}
                </span>
              </div>
              <h3 className="font-bold text-white text-sm leading-snug mb-2 group-hover:text-purple-300 transition-colors">
                {h.name}
              </h3>
              <p className="text-slate-500 text-xs flex items-center gap-1 mb-1">
                <Building2 className="w-3 h-3 shrink-0" />
                <span className="truncate">{h.org}</span>
              </p>
              <p className="text-slate-600 text-xs flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />{h.location}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom stat pill */}
        <motion.div data-piece
          className="mt-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-white/10 text-sm text-slate-400">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span><span className="text-white font-bold">13+</span> hackathons · IITs · NITs · National · Global</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

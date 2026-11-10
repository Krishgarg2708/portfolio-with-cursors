import { motion } from 'motion/react';
import { Award, ExternalLink, Bot, Database, Code, Cloud, Brain, Globe, Shield, Smartphone, PenTool, Network, Lightbulb } from 'lucide-react';

const certifications = [
  {
    category: "Artificial Intelligence",
    icon: Bot,
    color: "from-purple-500 to-blue-500",
    items: [
      { name: "Google Gemini", link: "https://drive.google.com/file/d/1OAi8xjIuFGIMHvugZPnrBTqjUQw7bGVy/view" },
      { name: "UNESCO", link: "https://drive.google.com/file/d/18NEb2BoEK2tWS58Su3Crf32dSlznhiUL/view" },
      { name: "AI Certificate 1", link: "https://drive.google.com/file/d/1i3rPcIMTIBqwSHHfDrsmOzebqtsYNoc9/view" },
      { name: "AI Certificate 2", link: "https://drive.google.com/file/d/1PT0a64xwxwQhXiTB6LrqVpVSzFtVXmZC/view" },
      { name: "AI Specialist", link: "https://drive.google.com/file/d/1snSI__siFQR-zhahsD50ZMIJMCA67CBU/view" },
      { name: "AI Professional", link: "https://drive.google.com/file/d/1Hm1qVEwXMB3Uoc8ncc8VlfxqdWhpN8Eu/view" },
      { name: "AI Ethics & Tech", link: "https://drive.google.com/file/d/157iiRRmCLNrwElGCsY2yEnKhdSPkwhNR/view" },
      { name: "Advanced AI", link: "https://drive.google.com/file/d/1zQCvdWbiIvRuBw8IIJAFVAkRTTox5VkQ/view" },
      { name: "AI Fundamentals", link: "https://drive.google.com/file/d/1Io8DQ10DFo_IODn8mBhjVjnTe1Rs41wJ/view" },
    ]
  },
  {
    category: "Database Management (DBMS)",
    icon: Database,
    color: "from-blue-500 to-cyan-500",
    items: [
      { name: "DBMS 1", link: "https://drive.google.com/file/d/15z2U9JL2c-5d6IQup3_58LPJVo5BJ3Im/view" },
      { name: "DBMS 2", link: "https://drive.google.com/file/d/12xm1deXw-VTgaf0TpsQ7XO5kP2n9HhQg/view" },
      { name: "SQL Database Management", link: "https://drive.google.com/file/d/1adexKwOuaZzllu8KrzfEpkSfSHiH8ab3/view" },
      { name: "Relational Databases", link: "https://drive.google.com/file/d/1Icl0sFfZIViui9JyiGneLgo8eDgfmapB/view" },
      { name: "Database Administration", link: "https://drive.google.com/file/d/1g3UwsN3JJzmwWL3G3WzugaMYma47pASV/view" },
    ]
  },
  {
    category: "Java Development",
    icon: Code,
    color: "from-orange-500 to-red-500",
    items: [
      { name: "Java Certificate 1", link: "https://drive.google.com/file/d/1e0JoI-N56G1xw0L8-gyv5NpZ-cBPoaoq/view" },
      { name: "Java Certificate 2", link: "https://drive.google.com/file/d/1J92-kfrrng1zD3CQc7UWniyjVLdYI_Pe/view" },
      { name: "Advanced Java Programming", link: "https://drive.google.com/file/d/14GsSBEOSDSCx5_ikakUi9dPbjm9DOQlB/view" },
      { name: "Java Core Concepts", link: "https://drive.google.com/file/d/11ZrW2BHrEbbFnwRaVTcbiLKv78z2IMJc/view" },
      { name: "Java Development Kit", link: "https://drive.google.com/file/d/1wnB6ZfP25FRPYzbAg0R969l9B0UVxIED/view" },
    ]
  },
  {
    category: "Cloud & Tools",
    icon: Cloud,
    color: "from-cyan-500 to-blue-500",
    items: [
      { name: "AWS", link: "https://drive.google.com/file/d/1rkr43MXZgbvff4l6KeyjHlvHun5Var40/view" },
      { name: "Copilot", link: "https://drive.google.com/file/d/1VCLNDoDm8vhKbwB8FzdLZc_mYZv6TqjG/view" },
      { name: "Nvidia Cloud", link: "https://drive.google.com/file/d/1c7-WS_ffsuSd-XBhdOjDSWnOJzFrTEUM/view" },
      { name: "Generative AI", link: "https://drive.google.com/file/d/1AZH5Hl5HCgHP0Vzpwbn0dOTc1j682v-w/view" },
      { name: "GDC Cloud", link: "https://drive.google.com/file/d/1E5V_zz5qrw1G1WEf42id082Ouba058AA/view" },
      { name: "Linux Foundation", link: "https://drive.google.com/file/d/14BPm9Md6DS-QSPOuoj_h0--OAIya4y3y/view" },
      { name: "Git and GitHub", link: "https://drive.google.com/file/d/1Zjk7QMsN15_OJ8iESdCWihv_F4CTWRW/view" },
      { name: "Microsoft Azure 1", link: "https://drive.google.com/file/d/1SM-vZ3ogrg9c3zyAOuKVj4DbzaUnU9tu/view" },
      { name: "Microsoft Azure 2", link: "https://drive.google.com/file/d/12urN9Fe8U0ly0OR6AahVhhXmnF1WucZ_/view" },
      { name: "Oracle Cloud", link: "https://drive.google.com/file/d/1Koqn2hePQ0h8X0yi9ZoZJetiLITxIvvY/view" },
    ]
  },
  {
    category: "Machine Learning",
    icon: Brain,
    color: "from-emerald-500 to-teal-500",
    items: [
      { name: "ML Foundations", link: "https://drive.google.com/file/d/1C4G7-wSLVMbMbqYbwzNXzMyIaP2K2LIR/view" },
      { name: "ML Algorithms", link: "https://drive.google.com/file/d/1925ytZcKX5u3EodigGnWSR9axwMfoebU/view" },
      { name: "ML Advanced", link: "https://drive.google.com/file/d/1PIe3hYwQ1Vy_JqQE7bYEFEzPyMqGEl4d/view" },
    ]
  },
  {
    category: "Web Design",
    icon: Globe,
    color: "from-rose-500 to-orange-500",
    items: [
      { name: "Frontend Web Dev", link: "https://drive.google.com/file/d/1cELwIQP_Mblw64r03stzxgKL4ALF0-xQ/view" },
      { name: "UI/UX Design", link: "https://drive.google.com/file/d/1r8vowxCVRVhJtjrbDst0WzwKOT5OUFqY/view" },
      { name: "Web Architecture", link: "https://drive.google.com/file/d/1l6_Oq2nLLFgmHEMAnN4iL66Xacyl31S1/view" },
      { name: "Responsive Design", link: "https://drive.google.com/file/d/14KhrdY2fgdBm9-25tvA6NGF4wPA4PWLI/view" },
      { name: "Full Stack Web", link: "https://drive.google.com/file/d/1nNfTNKbZbXh_oDctHHgsWnFY0xLBFuWg/view" },
    ]
  },
  {
    category: "ADA",
    icon: Shield,
    color: "from-teal-500 to-indigo-500",
    items: [
      { name: "ADA Certification 1", link: "https://drive.google.com/file/d/107-oJi49PpA7YtNEeetJivmFVdabo4dT/view" },
      { name: "ADA Certification 2", link: "https://drive.google.com/file/d/1nA-fstxF4vsJz3OPJX8-NNpbltpWcwrT/view" },
      { name: "ADA Certification 3", link: "https://drive.google.com/file/d/1xiou6LW65gQmHShA05VKRMEARyip-2mL/view" },
      { name: "ADA Certification 4", link: "https://drive.google.com/file/d/1Hns0WSly9VxPPGfrZFzbPn8hCbgRmWFg/view" },
      { name: "ADA Certification 5", link: "https://drive.google.com/file/d/1dF7WiSTv_zMbgIHSywiCL8wHcQ_y1pUd/view" },
    ]
  },
  {
    category: "App Development",
    icon: Smartphone,
    color: "from-blue-600 to-purple-600",
    items: [
      { name: "App Development 1", link: "https://drive.google.com/file/d/1mLoa9IdknV8oFV1WSjYLguTHmy_220l2/view" },
      { name: "App Development 2", link: "https://drive.google.com/file/d/1OiTKRTEgvNgAescsYZ30CMqeb6spNnmT/view" },
      { name: "App Development 3", link: "https://drive.google.com/file/d/1RU9mYa9RmF51UnSJ-3wpi9N9zwEa2B-X/view" },
      { name: "App Development 4", link: "https://drive.google.com/file/d/1J9gHTnsVPigHLGvoePt8d3v9ddzbecPP/view" },
      { name: "App Development 5", link: "https://drive.google.com/file/d/1Wi48xQNbYeAJnGUdSvViNvMUHjYm7cmG/view" },
    ]
  },
  {
    category: "Software Engineering",
    icon: PenTool,
    color: "from-indigo-500 to-purple-500",
    items: [
      { name: "Software Engineering 1", link: "https://drive.google.com/file/d/1de_KlIvie_gLYQgzbYbyxS6567se-IlQ/view" },
      { name: "Software Engineering 2", link: "https://drive.google.com/file/d/1kso7GCeeeMPa-4ekIx9Z3tW0YrbZIDOK/view" },
      { name: "Software Engineering 3", link: "https://drive.google.com/file/d/126c-Nvd6s4V25a0NsJg3_JJBLCDwLg1j/view" },
      { name: "Software Engineering 4", link: "https://drive.google.com/file/d/1FADIVtSDm7nGoqMJLS20aTkyLTyKOXOG/view" },
      { name: "Software Engineering 5", link: "https://drive.google.com/file/d/1TVcwgMRNZJWMyz6WCLvL5WGng5VNoGMx/view" },
    ]
  },
  {
    category: "Networking",
    icon: Network,
    color: "from-blue-600 to-cyan-400",
    items: [
      { name: "Computer Networks Professional", link: "https://drive.google.com/file/d/1O34n0XgDzZ92p5SCjdmxqJytHxuW17sC/view" },
    ]
  },
  {
    category: "Design Thinking",
    icon: Lightbulb,
    color: "from-amber-400 to-orange-500",
    items: [
      { name: "Design Thinking 1", link: "https://drive.google.com/file/d/14n8Ew1q7iB9zY4igCnxoVsZpq6sVBhL_/view" },
      { name: "Design Thinking 2", link: "https://drive.google.com/file/d/15weiGEDb3_DQZh6R0qXjQq0gwIRkzzys/view" },
      { name: "Design Thinking 3", link: "https://drive.google.com/file/d/1OXpCnsLHfgfBXgatfXEKQe4dbImPmre5/view" },
    ]
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div data-piece
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Award className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Achievements</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
            Professional <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A comprehensive collection of my verified professional credentials and specialized training.
          </p>
        </motion.div>

        <div className="space-y-16">
          {certifications.map((cat, catIdx) => (
            <div key={cat.category} className="space-y-6">
              <motion.div data-piece
                className="flex items-center gap-3"
              >
                <div className={`p-2 rounded-lg bg-linear-to-br ${cat.color} bg-opacity-20`}>
                  <cat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{cat.category}</h3>
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cat.items.map((cert, certIdx) => (
                  <motion.a data-piece
                    key={cert.name}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    transition={{ delay: (catIdx * 0.05) + (certIdx * 0.02) }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group relative p-5 glass rounded-2xl border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                         <Award className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                    </div>
                    
                    <div>
                      <h4 className="text-slate-200 font-semibold group-hover:text-white transition-colors leading-snug line-clamp-2">
                        {cert.name}
                      </h4>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-2 font-bold group-hover:text-slate-400 transition-colors">
                        View Certificate
                      </p>
                    </div>
                    
                    {/* Hover Glow */}
                    <div className={`absolute inset-0 bg-linear-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

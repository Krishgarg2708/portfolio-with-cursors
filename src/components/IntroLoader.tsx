import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const GREETINGS = [
  "Hello",         // English
  "नमस्ते",         // Hindi
  "Hola",          // Spanish
  "Bonjour",       // French
  "Ciao",          // Italian
  "こんにちは",     // Japanese
  "안녕하세요",     // Korean
  "你好",          // Chinese
  "Olá",           // Portuguese
  "Hallo",         // German
  "Привет",        // Russian
  "Merhaba",       // Turkish
  "Salaam",        // Arabic / Urdu
  "Namaskar",      // Sanskrit
  "Vanakkam",      // Tamil
  "Sat Sri Akal"   // Punjabi
];

interface IntroLoaderProps {
  onComplete: () => void;
  key?: string;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set interactive delay for languages
    if (currentIndex < GREETINGS.length - 1) {
      const delay = currentIndex === 0 ? 600 : 380; // First greeting slightly longer, then snap through them organically
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Last greeting (Sat Sri Akal) stays a bit longer before fading out
      const timer = setTimeout(() => {
        onComplete();
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: "blur(15px)",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#03000a] select-none overflow-hidden"
    >
      {/* Cinematic Ambient Pulsing Glow Backgrounds */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 0.9, 1.1, 1],
            x: [0, 40, -40, 20, 0],
            y: [0, -40, 40, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-purple-950/15 blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.9, 1.2, 1, 1.1],
            x: [0, -30, 30, -10, 0],
            y: [0, 30, -30, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-950/15 blur-[110px] pointer-events-none"
        />
        
        {/* Fine Star Dust Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
      </div>

      {/* Main Centered Language Sequence */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Visual Indicator Line (Elegant, premium under header) */}
        <div className="w-12 h-[2px] bg-linear-to-r from-purple-500/10 via-purple-500/60 to-blue-500/10 mb-8 opacity-60" />
        
        <div className="h-28 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentIndex}
              initial={{ 
                opacity: 0, 
                scale: 0.94,
                filter: "blur(12px)"
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                filter: "blur(0px)",
                transition: { 
                  duration: 0.32, 
                  ease: [0.16, 1, 0.3, 1] 
                }
              }}
              exit={{ 
                opacity: 0, 
                scale: 1.05,
                filter: "blur(8px)",
                transition: { 
                  duration: 0.22, 
                  ease: [0.7, 0, 0.84, 0] 
                }
              }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-white select-none pointer-events-none text-center"
            >
              {GREETINGS[currentIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Elegant Minimal Counter / Progress Node */}
        <div className="mt-12 flex items-center gap-1.5 opacity-40">
          {GREETINGS.map((_, idx) => (
            <motion.div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? "w-6 bg-purple-500" 
                  : idx < currentIndex 
                    ? "w-1.5 bg-purple-500/40" 
                    : "w-1.5 bg-slate-800"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

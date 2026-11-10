import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Hackathons from './components/Hackathons';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import IntroLoader from './components/IntroLoader';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import CursorDirector from './cursor/CursorDirector';
import { CursorLayer } from './cursor/CursorLayer';
import { YouTag } from './cursor/YouTag';
import { engine } from './cursor/engine';
export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [isIntroActive, setIsIntroActive] = useState(() => {
    if (typeof window !== 'undefined') {
      const skipped = sessionStorage.getItem('portfolio-intro-played');
      return skipped !== 'true';
    }
    return true;
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('portfolio-intro-played', 'true');
    setIsIntroActive(false);
  };
  return (
    <>
    <AnimatePresence mode="wait">
      {isIntroActive ? (
        <IntroLoader key="loader" onComplete={handleIntroComplete} />
      ) : (
        <motion.div
          key="portfolio"
          initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="relative min-h-screen"
        >
          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-500 via-blue-500 to-cyan-500 z-100 origin-left"
            style={{ scaleX }}
          />

          <Navbar />
          
          <main>
            <Hero />
            <Stats />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Hackathons />
            <Certifications />
            <Timeline />
            <Contact />
          </main>

          <Footer />
          <BackToTop />
          <CursorDirector />
        </motion.div>
      )}
    </AnimatePresence>
    {/* multiplayer cursors live outside the animated wrapper so they use page coordinates */}
    <CursorLayer showCursors={engine.mode === 'full'} />
    <YouTag />
    </>
  );
}

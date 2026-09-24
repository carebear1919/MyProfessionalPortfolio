import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { X, Download, ExternalLink } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutStrip from './components/AboutStrip';
import SelectedWork from './components/SelectedWork';
import Recognition from './components/Recognition';
import Projects from './components/Projects';
import About from './components/About';
import QATesting from './components/QATesting';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TestMode from './components/TestMode';

const RESUME_URL = '/resume/Jian Marie Hilario Resume.pdf';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const resumeCloseRef = useRef<HTMLButtonElement>(null);

  // Resume viewer: move focus in, lock page scroll, return focus to the opener
  useEffect(() => {
    if (!isResumeOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    resumeCloseRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
      opener?.focus?.();
    };
  }, [isResumeOpen]);

  // Keyboard support for closing modal (Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsResumeOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Keep the sidebar in sync with the section currently in view
  const navLockUntil = useRef(0);
  const syncActiveSectionRef = useRef<() => void>(() => {});

  useEffect(() => {
    const ids = ['home', 'projects', 'qa', 'about', 'services', 'contact'];
    let ticking = false;

    const update = () => {
      ticking = false;
      if (Date.now() < navLockUntil.current) return;
      // A section is "current" once its top has passed 35% of the viewport height
      const line = window.innerHeight * 0.35;
      let current = 'home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // Short last section: at the very bottom of the page, highlight it
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.setTimeout(update, 40);
      }
    };

    syncActiveSectionRef.current = update;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      // Leave room for the fixed 64px top bar (the hero sits directly under it)
      const offsetPosition = id === 'home' ? 0 : elementPosition - 64;

      // Hold the clicked item active while the smooth scroll runs, then re-sync
      navLockUntil.current = Date.now() + 1000;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
      setActiveSection(id);
      window.setTimeout(() => syncActiveSectionRef.current(), 1050);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-editorial-cream text-editorial-charcoal overflow-x-clip selection:bg-editorial-charcoal selection:text-editorial-cream font-sans">
      
      {/* Top navigation */}
      <Header
        scrollToSection={scrollToSection}
        activeSection={activeSection}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main flow sits below the fixed top bar */}
      <div className="pt-[calc(4rem+env(safe-area-inset-top))]" id="main-content" tabIndex={-1}>
        <main>
          {/* 1. Hero Banner Section */}
          {/* Opening sequence sits in one framed sheet, inset from the window edge */}
          <div className="px-6 sm:px-10 lg:px-16 pt-3 sm:pt-4 lg:pt-6 pb-12 lg:pb-16">
            <div className="max-w-[1440px] mx-auto border border-neutral-300 overflow-hidden">
              <div id="home">
                <Hero scrollToSection={scrollToSection} onOpenResume={() => setIsResumeOpen(true)} />
              </div>
              <AboutStrip scrollToSection={scrollToSection} />
            </div>
          </div>

          {/* Full-bleed band and recognition strip break the framed rhythm */}
          <SelectedWork scrollToSection={scrollToSection} />
          <Recognition />

          {/* 2. Shipped Projects Section */}
          <Projects />

          {/* 3. Quality: how the work above was tested */}
          <QATesting />

          {/* 4. Journey: experience, story and toolkit */}
          <About onOpenResume={() => setIsResumeOpen(true)} />

          {/* 4. Service Matrix Section */}
          <Services />

          {/* 5. Correspondence Dialogue form */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer scrollToSection={scrollToSection} />
        <TestMode />
      </div>

      {/* RESUME MODAL */}
      <AnimatePresence>
        {isResumeOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Resume">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResumeOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.97, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl h-[92dvh] sm:h-[90dvh] bg-editorial-cream border border-neutral-300 shadow-2xl flex flex-col overflow-hidden z-10"
            >
              <div className="px-4 sm:px-6 py-3 border-b border-neutral-300 flex justify-between items-center gap-3 bg-editorial-panel flex-shrink-0">
                <div className="text-left min-w-0">
                  <h2 className="font-serif font-semibold text-xl text-editorial-charcoal leading-tight">Resume</h2>
                  <p className="font-mono text-xs text-neutral-600 uppercase tracking-wider truncate">Jian Marie Hilario</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-2 min-h-[44px] px-4 border border-neutral-400 font-mono text-xs font-bold uppercase tracking-wider text-editorial-charcoal hover:bg-white transition-colors"
                  >
                    <ExternalLink size={13} aria-hidden="true" />
                    New tab
                  </a>
                  <a
                    href={RESUME_URL}
                    download="Jian Marie Hilario Resume.pdf"
                    className="inline-flex items-center gap-2 min-h-[44px] px-4 bg-editorial-charcoal text-editorial-cream font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                  >
                    <Download size={13} aria-hidden="true" />
                    Download
                  </a>
                  <button
                    ref={resumeCloseRef}
                    onClick={() => setIsResumeOpen(false)}
                    className="w-11 h-11 flex items-center justify-center border border-neutral-400 text-editorial-charcoal hover:bg-white transition-colors cursor-pointer"
                    aria-label="Close resume"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* The frame fills the remaining height: absolutely positioned inside a flex-1 box with a definite size */}
              <div className="flex-1 min-h-0 relative bg-neutral-200">
                <iframe
                  src={`${RESUME_URL}#view=FitH`}
                  className="absolute inset-0 w-full h-full border-0"
                  title="Jian Marie Hilario resume"
                />
                {/* Phones often cannot scroll a PDF inside a frame, so offer the real file */}
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden absolute bottom-3 left-3 right-3 min-h-[44px] inline-flex items-center justify-center gap-2 bg-editorial-charcoal text-editorial-cream font-mono text-xs font-bold uppercase tracking-wider"
                >
                  <ExternalLink size={13} aria-hidden="true" />
                  Open full resume
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}

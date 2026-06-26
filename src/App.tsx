import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('jian-sidebar-collapsed');
    return saved === 'true';
  });

  const toggleSidebar = () => {
    const nextState = !isSidebarCollapsed;
    setIsSidebarCollapsed(nextState);
    localStorage.setItem('jian-sidebar-collapsed', String(nextState));
  };

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('jian-marie-theme') as 'dark' | 'light' | null;
    const initialTheme = savedTheme || 'dark';
    
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Sync state to DOM classlist & LocalStorage
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('jian-marie-theme', nextTheme);
    
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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

  // Set up scroll observer to update active navigation indicators dynamically
  useEffect(() => {
    const sections = ['home', 'projects', 'about', 'services', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Trigger when section occupies center part of screen
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      // Subtract small margin for mobile sticky top bar or padding
      const offsetPosition = elementPosition - (window.innerWidth < 1024 ? 60 : 0);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-editorial-cream dark:bg-editorial-charcoal text-editorial-charcoal dark:text-editorial-cream transition-colors duration-500 overflow-x-hidden selection:bg-editorial-charcoal selection:text-editorial-cream dark:selection:bg-editorial-cream dark:selection:text-editorial-charcoal font-sans">
      
      {/* Editorial Navigation System */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        scrollToSection={scrollToSection}
        activeSection={activeSection}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      {/* Main Flow: Indented on desktop to fit the fixed Left Navbar side navigation */}
      <div className={`transition-all duration-500 pb-28 lg:pb-0 ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`} id="main-content">
        <main>
          {/* 1. Hero Banner Section */}
          <div id="home">
            <Hero scrollToSection={scrollToSection} onOpenResume={() => setIsResumeOpen(true)} />
          </div>

          {/* 2. Shipped Projects Section */}
          <Projects />

          {/* 2.5 Trust Signals / Recognition Bar */}
          <section className="py-16 px-6 sm:px-10 lg:px-16 border-t border-neutral-200 dark:border-neutral-900 bg-editorial-cream dark:bg-editorial-charcoal transition-colors duration-500 text-left">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap items-center justify-center lg:justify-between gap-x-10 gap-y-5">
                {[
                  { label: 'SM Investments Corporation', sub: 'Treasury Automation Intern' },
                  { label: 'DOST Merit Scholar', sub: 'Department of Science & Technology' },
                  { label: 'Executive of the Month', sub: 'CSO — DLSU-D' },
                  { label: 'Best Executive Committee', sub: 'Council of Student Organizations' },
                ].map((item) => (
                  <div key={item.label} className="text-center lg:text-left">
                    <span className="block font-serif font-bold text-sm sm:text-base text-editorial-charcoal dark:text-editorial-cream tracking-tight">{item.label}</span>
                    <span className="block font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mt-0.5">{item.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Consolidated About/Core Architecture Section */}
          <About onOpenResume={() => setIsResumeOpen(true)} />

          {/* 4. Service Matrix Section */}
          <Services />

          {/* 5. Correspondence Dialogue form */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer scrollToSection={scrollToSection} />
      </div>

      {/* RESUME MODAL */}
      <AnimatePresence>
        {isResumeOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl h-[85vh] bg-editorial-cream dark:bg-editorial-charcoal border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xl flex flex-col overflow-hidden z-10"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-900 flex justify-between items-center bg-neutral-50 dark:bg-neutral-950">
                <div className="text-left">
                  <h3 className="font-serif font-bold text-lg text-editorial-charcoal dark:text-editorial-cream">
                    Resume
                  </h3>
                  <p className="font-mono text-[10.5px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-0.5 font-bold">
                    Jian Marie Hilario &bull; Portfolio Core Volume
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <a
                    href="/resume/Jian Marie Hilario Resume.pdf"
                    download="Jian Marie Hilario Resume.pdf"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-editorial-charcoal text-xs font-mono uppercase text-editorial-charcoal dark:text-editorial-cream hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-200 cursor-pointer"
                  >
                    <Download size={12} />
                    Download
                  </a>
                  
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="p-1.5 rounded-sm border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-400 hover:text-editorial-charcoal dark:hover:text-editorial-cream transition-colors duration-200 cursor-pointer focus:outline-none"
                    aria-label="Close modal"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* PDF Container Frame */}
              <div className="flex-grow bg-neutral-200 dark:bg-neutral-900 relative">
                <iframe
                  src="/resume/Jian Marie Hilario Resume.pdf"
                  className="w-full h-full border-none"
                  title="Jian Marie Hilario Resume Document"
                />
              </div>

              {/* Modal Footer Hints */}
              <div className="px-6 py-3 border-t border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 flex justify-between items-center text-[10.5px] font-mono text-neutral-400 dark:text-neutral-600 font-bold">
                <span>Use browser's built-in PDF controls to zoom, search, or print</span>
                <span>Press Esc to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

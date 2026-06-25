import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Github, Linkedin, ArrowUp, Mail, Figma, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  scrollToSection: (id: string) => void;
  activeSection: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Header({ theme, toggleTheme, scrollToSection, activeSection, isCollapsed, onToggleCollapse }: HeaderProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Projects', id: 'projects' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollToSection(id);
    }
  };

  return (
    <>
      {/* Keyboard Accessibility: Skip to Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal font-mono text-xs uppercase tracking-wider rounded border border-neutral-200 dark:border-neutral-800 focus:outline-none"
      >
        Skip to content
      </a>

      {/* 1. DESKTOP LEFT NAVBAR */}
      <aside className={`hidden lg:flex flex-col fixed left-0 top-0 h-screen border-r border-neutral-200 dark:border-neutral-900 bg-editorial-cream/95 dark:bg-editorial-charcoal/95 py-12 justify-between z-50 transition-all duration-500 ${isCollapsed ? 'w-20 px-3 items-center' : 'w-64 px-8'}`}>
        
        {/* Brand / Logo */}
        <div className={`space-y-6 w-full ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
          <button
            onClick={() => handleNavClick('home')}
            className={`group flex items-center gap-3 focus:outline-none cursor-pointer text-left ${isCollapsed ? 'justify-center' : ''}`}
            aria-label="Jian Marie Home"
          >
            <span className="font-serif font-black text-2xl tracking-tighter text-editorial-charcoal dark:text-editorial-cream">
              JM
            </span>
            {!isCollapsed && (
              <span className="font-mono text-[10.5px] px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 font-bold">
                PORTFOLIO
              </span>
            )}
          </button>
          
          {!isCollapsed && (
            <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider leading-relaxed">
              Vol. 04 &bull; Active Core<br />
              DOST Merit Scholar
            </div>
          )}
        </div>

        {/* Navigation List */}
        <nav className={`flex flex-col space-y-6 text-left w-full ${isCollapsed ? 'items-center' : ''}`}>
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.id;
            const formattedIndex = String(idx + 1).padStart(2, '0');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group relative flex items-baseline gap-3 transition-all duration-300 focus:outline-none cursor-pointer text-left ${
                  isCollapsed ? 'justify-center w-full py-1' : ''
                } ${
                  isActive
                    ? 'text-editorial-charcoal dark:text-editorial-cream font-bold'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-editorial-charcoal dark:hover:text-editorial-cream'
                }`}
              >
                <span className={`font-mono tracking-tight opacity-50 group-hover:opacity-100 ${isCollapsed ? 'text-sm font-bold opacity-75' : 'text-[10.5px]'}`}>
                  {formattedIndex}
                </span>
                {!isCollapsed && (
                  <span className="font-sans text-[13px] uppercase tracking-tighter border-b border-transparent group-hover:border-current pb-0.5">
                    {item.label}
                  </span>
                )}

                {/* Collapsed Tooltip */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal text-[10px] font-mono uppercase tracking-wider rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer & Socials */}
        <div className="space-y-6 w-full">
          {!isCollapsed ? (
            /* EXPANDED BOTTOM BLOCK */
            <div className="flex flex-col border-t border-neutral-200 dark:border-neutral-900 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest font-bold">
                  Visual Palette
                </span>
                <button
                  onClick={toggleTheme}
                  className="min-touch rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/[0.05] dark:bg-neutral-900/[0.05] text-editorial-charcoal dark:text-editorial-cream hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300 cursor-pointer focus:outline-none"
                  aria-label="Toggle theme"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                  </div>
                </button>
              </div>

              {/* Social links grid immediately below Visual Palette */}
              <div className="space-y-2 pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-900/65">
                <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block font-bold">
                  Social Correspondence
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  <a
                    href="https://github.com/jianhilario"
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="min-touch rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/20 text-neutral-500 dark:text-neutral-400 hover:text-editorial-charcoal hover:border-neutral-500 dark:hover:text-editorial-cream dark:hover:border-neutral-600 transition-all duration-300"
                    aria-label="GitHub profile"
                    title="GitHub"
                  >
                    <Github size={13} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="min-touch rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/20 text-neutral-500 dark:text-neutral-400 hover:text-editorial-charcoal hover:border-neutral-500 dark:hover:text-editorial-cream dark:hover:border-neutral-600 transition-all duration-300"
                    aria-label="LinkedIn profile"
                    title="LinkedIn"
                  >
                    <Linkedin size={13} />
                  </a>
                  <a
                    href="mailto:jianhilario@gmail.com"
                    className="min-touch rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/20 text-neutral-550 dark:text-neutral-400 hover:text-editorial-charcoal hover:border-neutral-500 dark:hover:text-editorial-cream dark:hover:border-neutral-600 transition-all duration-300"
                    aria-label="Email Address"
                    title="Email"
                  >
                    <Mail size={13} />
                  </a>
                  <a
                    href="https://www.figma.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="min-touch rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/20 text-neutral-500 dark:text-neutral-400 hover:text-editorial-charcoal hover:border-neutral-500 dark:hover:text-editorial-cream dark:hover:border-neutral-600 transition-all duration-300"
                    aria-label="Figma profile"
                    title="Figma"
                  >
                    <Figma size={13} />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* COLLAPSED BOTTOM BLOCK */
            <div className="flex flex-col items-center border-t border-neutral-200 dark:border-neutral-900 pt-6 w-full space-y-4">
              <button
                onClick={toggleTheme}
                className="min-touch rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/[0.05] dark:bg-neutral-900/[0.05] text-editorial-charcoal dark:text-editorial-cream hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300 cursor-pointer focus:outline-none"
                aria-label="Toggle theme"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                </div>
              </button>

              <div className="flex flex-col gap-2 w-full items-center pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-900/65">
                <a
                  href="https://github.com/jianhilario"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="group relative flex items-center justify-center min-touch rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/20 text-neutral-500 dark:text-neutral-400 hover:text-editorial-charcoal hover:border-neutral-500 dark:hover:text-editorial-cream dark:hover:border-neutral-600 transition-all duration-300"
                  aria-label="GitHub profile"
                >
                  <Github size={13} />
                  <div className="absolute left-full ml-4 px-2 py-1 bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal text-[10px] font-mono uppercase tracking-wider rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 whitespace-nowrap">
                    GitHub
                  </div>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                    className="group relative flex items-center justify-center min-touch rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/20 text-neutral-500 dark:text-neutral-400 hover:text-editorial-charcoal hover:border-neutral-500 dark:hover:text-editorial-cream dark:hover:border-neutral-600 transition-all duration-300"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin size={13} />
                    <div className="absolute left-full ml-4 px-2 py-1 bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal text-[10px] font-mono uppercase tracking-wider rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 whitespace-nowrap">
                      LinkedIn
                    </div>
                  </a>
                  <a
                    href="mailto:jianhilario@gmail.com"
                    className="group relative flex items-center justify-center min-touch rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/20 text-neutral-550 dark:text-neutral-400 hover:text-editorial-charcoal hover:border-neutral-500 dark:hover:text-editorial-cream dark:hover:border-neutral-600 transition-all duration-300"
                    aria-label="Email Address"
                  >
                    <Mail size={13} />
                    <div className="absolute left-full ml-4 px-2 py-1 bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal text-[10px] font-mono uppercase tracking-wider rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 whitespace-nowrap">
                      Email
                    </div>
                  </a>
                  <a
                    href="https://www.figma.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="group relative flex items-center justify-center min-touch rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/20 text-neutral-550 dark:text-neutral-400 hover:text-editorial-charcoal hover:border-neutral-500 dark:hover:text-editorial-cream dark:hover:border-neutral-600 transition-all duration-300"
                  aria-label="Figma Profile"
                >
                  <Figma size={13} />
                  <div className="absolute left-full ml-4 px-2 py-1 bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal text-[10px] font-mono uppercase tracking-wider rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 whitespace-nowrap">
                    Figma
                  </div>
                </a>
              </div>
            </div>
          )}

          {/* Sidebar Expand/Collapse Controller Button */}
          <div className="pt-2 w-full border-t border-neutral-200 dark:border-neutral-900/60">
            <button
              onClick={onToggleCollapse}
              className={`w-full flex items-center rounded-sm border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-950 text-neutral-500 dark:text-neutral-400 hover:text-editorial-charcoal dark:hover:text-editorial-cream transition-all duration-200 cursor-pointer focus:outline-none ${
                isCollapsed ? 'p-2 justify-center' : 'px-3 py-2 justify-between text-[11px] font-mono uppercase tracking-wider'
              }`}
              title={isCollapsed ? 'Expand Menu' : 'Collapse Menu'}
              aria-label={isCollapsed ? 'Expand Menu' : 'Collapse Menu'}
            >
              {!isCollapsed && <span>Collapse Menu</span>}
              {isCollapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MOBILE TOP HEADER (Sticky, hidden on desktop) */}
      <header className="lg:hidden sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-900 bg-editorial-cream/90 dark:bg-editorial-charcoal/90 backdrop-blur-md transition-colors duration-500">
        <div className="px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 focus:outline-none cursor-pointer text-left"
          >
            <span className="font-serif font-black text-xl tracking-tighter text-editorial-charcoal dark:text-editorial-cream">
              JM
            </span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 font-bold">
              CORE.04
            </span>
          </button>

          {/* Mobile Palette Toggle */}
          <button
            onClick={toggleTheme}
            className="min-touch rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/[0.05] dark:bg-neutral-900/[0.05] text-editorial-charcoal dark:text-editorial-cream transition-all duration-300 cursor-pointer focus:outline-none"
            aria-label="Toggle theme"
          >
            <div className="w-3.5 h-3.5 flex items-center justify-center">
              {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
            </div>
          </button>
        </div>
      </header>

      {/* 3. MOBILE DOCK NAV (Floating bottom dock, hidden on desktop) */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="flex items-center gap-2 px-4 py-3 rounded-full bg-editorial-cream/90 dark:bg-editorial-charcoal/90 border border-neutral-200/80 dark:border-neutral-800/80 shadow-lg backdrop-blur-md pointer-events-auto transition-colors duration-500">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`min-touch px-4 py-2 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none cursor-pointer ${
                  isActive
                    ? 'bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-editorial-charcoal dark:hover:text-editorial-cream'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 4. FLOATING ACTION BUTTONS */}
      <AnimatePresence>
        {showBackToTop && (
          <>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="min-touch fixed bottom-24 lg:bottom-10 right-6 lg:right-10 z-50 rounded-full bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal shadow-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-300 cursor-pointer focus:outline-none"
              aria-label="Back to Top"
            >
              <ArrowUp size={16} />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="min-touch-wide px-4 py-2.5 fixed bottom-36 lg:bottom-24 right-6 lg:right-10 z-50 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-xl hover:from-blue-500 hover:to-violet-500 transition-all duration-300 cursor-pointer focus:outline-none font-mono text-[10px] font-bold uppercase tracking-widest"
              aria-label="Start a Project"
            >
              <span className="flex items-center gap-1.5"><Mail size={12} /> Start a Project</span>
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

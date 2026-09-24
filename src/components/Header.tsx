import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, ArrowUp, Mail, Palette, Menu, X, FileText } from 'lucide-react';

interface HeaderProps {
  scrollToSection: (id: string) => void;
  activeSection: string;
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { label: 'Work', id: 'projects' },
  { label: 'Quality', id: 'qa' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/jianhilario', icon: Github, external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jian-marie-hilario', icon: Linkedin, external: true },
  { label: 'Email', href: 'mailto:jianhilario@gmail.com', icon: Mail, external: false },
  { label: 'Creative portfolio', href: 'https://canva.link/f6xn3atopprl6rq', icon: Palette, external: true },
];

export default function Header({ scrollToSection, activeSection, onOpenResume }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setShowBackToTop(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu: close on Escape, on outside click, and when the layout grows past the phone breakpoint
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-[100] px-4 py-2 bg-editorial-charcoal text-editorial-cream font-mono text-xs uppercase tracking-wider"
      >
        Skip to content
      </a>

      <header
        ref={headerRef}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
        className={`fixed top-0 inset-x-0 z-40 bg-editorial-cream border-b transition-colors duration-200 ${
          scrolled || menuOpen ? 'border-neutral-300' : 'border-transparent'
        }`}
      >
      <div className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1440px] mx-auto h-16 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <button
            onClick={() => go('home')}
            className="col-start-1 justify-self-start min-h-[44px] flex items-center gap-2 cursor-pointer"
            aria-label="Jian Marie, back to top"
          >
            <span className="font-serif font-semibold text-2xl leading-none tracking-tight text-editorial-charcoal">
              Jian Marie
            </span>
          </button>

          <nav aria-label="Primary" className="hidden md:block col-start-2">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <button
                      onClick={() => go(link.id)}
                      aria-current={active ? 'location' : undefined}
                      className={`relative min-h-[44px] px-3.5 text-sm font-medium transition-colors cursor-pointer ${
                        active ? 'text-editorial-charcoal' : 'text-neutral-600 hover:text-editorial-charcoal'
                      }`}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-x-3.5 bottom-1.5 h-0.5 bg-editorial-accent"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="col-start-3 justify-self-end flex items-center gap-2">
            <button
              onClick={onOpenResume}
              className="hidden md:inline-flex items-center gap-2 min-h-[44px] px-5 bg-editorial-charcoal text-editorial-cream font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <FileText size={14} aria-hidden="true" />
              Resume
            </button>

            <button
              ref={toggleRef}
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden w-11 h-11 -mr-2 flex items-center justify-center text-editorial-charcoal cursor-pointer"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden px-6 sm:px-10 pb-6 border-t border-neutral-300 bg-editorial-cream max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain"
            >
              <nav aria-label="Mobile">
                <ul>
                  {NAV_LINKS.map((link) => {
                    const active = activeSection === link.id;
                    return (
                      <li key={link.id} className="border-b border-neutral-300">
                        <button
                          onClick={() => go(link.id)}
                          aria-current={active ? 'location' : undefined}
                          className={`w-full min-h-[56px] flex items-center justify-between text-left font-serif text-2xl cursor-pointer ${
                            active ? 'text-editorial-charcoal font-semibold' : 'text-neutral-700'
                          }`}
                        >
                          {link.label}
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent" aria-hidden="true" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenResume();
                }}
                className="mt-6 w-full min-h-[48px] inline-flex items-center justify-center gap-2 bg-editorial-charcoal text-editorial-cream font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <FileText size={14} aria-hidden="true" />
                Resume
              </button>

              <ul className="mt-4 flex items-center gap-2">
                {SOCIALS.map(({ label, href, icon: Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      aria-label={label}
                      className="w-11 h-11 flex items-center justify-center border border-neutral-400 text-editorial-charcoal hover:bg-neutral-100"
                    >
                      <Icon size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] lg:bottom-10 lg:right-10 z-40 w-11 h-11 flex items-center justify-center rounded-full bg-editorial-charcoal text-editorial-cream shadow-lg hover:bg-neutral-800 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

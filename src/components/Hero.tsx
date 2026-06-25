import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Github, Linkedin, Instagram, Mail, FileText } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: string) => void;
  onOpenResume?: () => void;
}

export default function Hero({ scrollToSection, onOpenResume }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    'UI/UX Designer',
    'React Web Architect',
    'DOST Merit Scholar',
    'Systems Automation Specialist'
  ];

  // Rotate roles sequentially with a fade transition
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-8 pb-16 px-6 sm:px-10 lg:px-16 overflow-hidden bg-editorial-cream dark:bg-editorial-charcoal transition-colors duration-500 text-left">
      
      {/* 1. BACKGROUND WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden">
        <h2 className="text-[14vw] sm:text-[18vw] font-serif font-black italic text-neutral-200/70 dark:text-neutral-800/40 tracking-widest leading-none uppercase">
          Portfolio
        </h2>
      </div>

      {/* Grid line overlays for editorial feel */}
      <div className="absolute left-6 sm:left-10 lg:left-16 top-0 bottom-0 w-[1px] bg-neutral-100 dark:bg-neutral-900/80 pointer-events-none z-0" />
      <div className="absolute right-6 sm:right-10 lg:right-16 top-0 bottom-0 w-[1px] bg-neutral-100 dark:bg-neutral-900/80 pointer-events-none z-0" />

      {/* 2. TOP BAR */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-100 dark:border-neutral-900 pb-6 relative z-10 gap-4">
        {/* Left Side Info */}
        <div className="font-mono text-[10.5px] sm:text-[11.5px] tracking-wider text-neutral-400 dark:text-neutral-500 space-y-0.5">
          <span className="block font-black text-editorial-charcoal dark:text-editorial-cream uppercase tracking-[0.2em]">
            Issue Vol. 04
          </span>
          <span className="block uppercase">
            Responsive Systems Portfolio
          </span>
        </div>

        {/* Right Side Focus Cycling */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="text-neutral-400 dark:text-neutral-600 uppercase tracking-widest">
            Focus //
          </span>
          <div className="h-5 overflow-hidden relative min-w-[170px] sm:min-w-[210px] text-left sm:text-right">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute left-0 sm:right-0 font-bold text-editorial-charcoal dark:text-editorial-cream uppercase tracking-wider block"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 3. HERO BODY - LARGE TYPOGRAPHY & INTERACTIVE ARTWORK PORTRAIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-grow py-12 md:py-16 relative z-10">
        
        {/* Left Column Stacked Typography: UX UI WEB */}
        <div className="lg:col-span-3 hidden md:flex flex-col justify-center space-y-2 pointer-events-none select-none">
          {['UX', 'UI', 'WEB'].map((text, i) => (
            <h2
              key={i}
              className="text-7xl lg:text-[85px] font-serif font-black tracking-tighter text-neutral-200 dark:text-neutral-800 uppercase leading-[0.85] select-none"
            >
              {text}
            </h2>
          ))}
        </div>

        {/* Center Column: Portrait Artwork & Floating Badges */}
        <div className="lg:col-span-6 flex justify-center relative">
          
          {/* Portrait Framed Canvas */}
          <div className="relative w-full max-w-[340px] aspect-[4/5] bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded p-6 shadow-sm flex flex-col justify-between overflow-hidden group">
            
            {/* Elegant Background SVG Diagram (Portrait representation) */}
            <svg viewBox="0 0 300 380" className="absolute inset-0 w-full h-full p-4 opacity-25 dark:opacity-45 pointer-events-none stroke-current fill-none transition-transform duration-700 group-hover:scale-[1.03]">
              <circle cx="150" cy="130" r="60" className="stroke-neutral-300 dark:stroke-neutral-800" strokeWidth="1" />
              <path d="M150,190 C90,190 60,230 60,330 L240,330 C240,230 210,190 150,190 Z" className="stroke-neutral-300 dark:stroke-neutral-800" strokeWidth="1" />
              <circle cx="150" cy="130" r="4" className="fill-editorial-charcoal dark:fill-editorial-cream stroke-none" />
              {/* Radial measurement guidelines */}
              <line x1="150" y1="20" x2="150" y2="360" className="stroke-neutral-200 dark:stroke-neutral-850" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="20" y1="130" x2="280" y2="130" className="stroke-neutral-200 dark:stroke-neutral-850" strokeWidth="0.5" strokeDasharray="3 3" />
            </svg>

            {/* Top Right Floating Badge */}
            <div className="absolute top-4 right-4 z-20">
              <span className="inline-block font-mono text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-blue-500/10 to-violet-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/15 rounded-full px-2.5 py-0.5 shadow-sm select-none">
                DOST Merit Scholar
              </span>
            </div>

            {/* Bottom Left Floating Badge */}
            <div className="absolute bottom-4 left-4 z-20">
              <span className="inline-block font-mono text-[10px] font-black uppercase tracking-wider bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal rounded-sm px-2.5 py-1 shadow-sm select-none">
                IT Graduating // SM Alumna
              </span>
            </div>

            {/* Internal layout lines */}
            <div className="flex justify-between items-start font-mono text-[10px] text-neutral-400 dark:text-neutral-600 select-none">
              <span>HILARIO.CORE.04</span>
              <span className="invisible">LST // 2026</span>
            </div>

            {/* Minimalist layout outline */}
            <div className="flex justify-between items-end font-mono text-[10px] text-neutral-400 dark:text-neutral-600 select-none">
              <span className="invisible">CORE SYSTEM</span>
              <span>100% RESPONSIVE</span>
            </div>
            
            {/* Alt representation invisible block */}
            <span className="sr-only">Jian Marie - Editorial System Portrait</span>
          </div>

        </div>

        {/* Right Column Stacked Typography: JIAN MARIE DESI GNER */}
        <div className="lg:col-span-3 text-left lg:text-right space-y-1.5 pointer-events-none select-none">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tighter text-editorial-charcoal dark:text-editorial-cream uppercase leading-[0.85] select-none">
            JIAN MARIE
          </h2>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light italic text-editorial-charcoal/80 dark:text-editorial-cream/80 uppercase leading-[0.85] select-none">
            DESI
          </h2>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tighter text-editorial-charcoal dark:text-editorial-cream uppercase leading-[0.85] select-none">
            GNER
          </h2>
        </div>

      </div>

      {/* 4. BOTTOM SECTION - ABSTRACT & ACTION MATRIX */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-neutral-100 dark:border-neutral-900 relative z-10 items-end">
        
        {/* Abstract Column (1/2 width) */}
        <div className="lg:col-span-6 space-y-4">
          <span className="font-mono text-[10.5px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600 block font-bold">
            // Editorial Abstract
          </span>
          <p className="font-sans text-xs sm:text-[13px] leading-relaxed font-light text-neutral-500 dark:text-neutral-400 max-w-xl">
            DOST Merit Scholar and full-stack systems developer. Specializing in financial pipeline automation, process re-engineering, and interactive React user experience suites.
          </p>
        </div>

        {/* Buttons and Social Link Column */}
        <div className="lg:col-span-6 space-y-6 flex flex-col items-start lg:items-end">
          
          {/* Action Row */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-5 py-3 rounded-full bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal hover:bg-gradient-to-r hover:from-blue-600 hover:to-violet-600 hover:text-white dark:hover:from-blue-500 dark:hover:to-violet-500 dark:hover:text-neutral-950 font-mono text-[11px] font-bold tracking-widest uppercase transition-all duration-300 shadow-sm cursor-pointer focus:outline-none"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="px-5 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-mono text-[11px] font-bold tracking-widest uppercase text-editorial-charcoal dark:text-editorial-cream transition-all duration-300 cursor-pointer focus:outline-none"
            >
              My Journey &rarr;
            </button>
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="px-5 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/[0.05] hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-mono text-[11px] font-bold tracking-widest uppercase text-editorial-charcoal dark:text-editorial-cream transition-all duration-300 flex items-center gap-1.5 cursor-pointer focus:outline-none"
              >
                <FileText size={11} />
                Resume
              </button>
            )}
          </div>

          {/* Social Row */}
          <div className="flex items-center gap-5 pt-1">
            <a
              href="https://instagram.com"
              target="_blank"
              referrerPolicy="no-referrer"
              className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-neutral-400 hover:text-editorial-charcoal dark:hover:text-editorial-cream transition-colors duration-300 flex items-center gap-1"
            >
              <Instagram size={10} /> Instagram
            </a>
            <a
              href="https://github.com/jianhilario"
              target="_blank"
              referrerPolicy="no-referrer"
              className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-neutral-400 hover:text-editorial-charcoal dark:hover:text-editorial-cream transition-colors duration-300 flex items-center gap-1"
            >
              <Github size={10} /> GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              referrerPolicy="no-referrer"
              className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-neutral-400 hover:text-editorial-charcoal dark:hover:text-editorial-cream transition-colors duration-300 flex items-center gap-1"
            >
              <Linkedin size={10} /> LinkedIn
            </a>
            <a
              href="mailto:jianhilario@gmail.com"
              className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-neutral-400 hover:text-editorial-charcoal dark:hover:text-editorial-cream transition-colors duration-300 flex items-center gap-1"
            >
              <Mail size={10} /> Email
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}

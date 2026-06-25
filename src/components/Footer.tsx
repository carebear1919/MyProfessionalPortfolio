interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <footer className="py-16 px-6 sm:px-10 lg:px-16 border-t border-neutral-200 dark:border-neutral-900 bg-editorial-cream dark:bg-editorial-charcoal transition-colors duration-500 text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Alignment style: Left panel + Right panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          
          {/* Left Panel */}
          <div className="md:col-span-6 space-y-3">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-editorial-charcoal dark:text-editorial-cream uppercase tracking-tight">
              JIAN MARIE // DESIGNER
            </h3>
            <p className="font-sans text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 font-light max-w-sm leading-relaxed">
              Crafting high-precision responsive layouts and automated workflows.
            </p>
          </div>

          {/* Right Panel */}
          <div className="md:col-span-6 space-y-4 md:text-right">
            <h4 className="font-mono text-[10.5px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold">
              NAVIGATION INDEX
            </h4>
            <div className="flex flex-col md:items-end gap-2.5 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
              <button
                onClick={() => scrollToSection('home')}
                className="hover:text-editorial-charcoal dark:hover:text-editorial-cream transition-colors text-left md:text-right cursor-pointer focus:outline-none font-bold"
              >
                01 // HOME
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="hover:text-editorial-charcoal dark:hover:text-editorial-cream transition-colors text-left md:text-right cursor-pointer focus:outline-none font-bold"
              >
                02 // SHIPPED SYSTEMS
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="hover:text-editorial-charcoal dark:hover:text-editorial-cream transition-colors text-left md:text-right cursor-pointer focus:outline-none font-bold"
              >
                03 // ABOUT MECHANICS
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="hover:text-editorial-charcoal dark:hover:text-editorial-cream transition-colors text-left md:text-right cursor-pointer focus:outline-none font-bold"
              >
                04 // SERVICE MATRIX
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="hover:text-editorial-charcoal dark:hover:text-editorial-cream transition-colors text-left md:text-right cursor-pointer focus:outline-none font-bold"
              >
                05 // INITIALIZE CONNECTION
              </button>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div className="border-t border-neutral-200 dark:border-neutral-900 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
          <div>
            &copy; 2026 Jian Marie &bull; All Cores Reserved.
          </div>
          <div>
            DOST Merit Scholar Portfolio &bull; Built with React &amp; Tailwind CSS
          </div>
        </div>

      </div>
    </footer>
  );
}

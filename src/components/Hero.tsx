

interface HeroProps {
  scrollToSection: (id: string) => void;
  onOpenResume?: () => void;
}

export default function Hero({ scrollToSection, onOpenResume }: HeroProps) {

  return (
    <section className="relative min-h-[92vh] lg:min-h-[88vh] flex flex-col justify-between pt-8 pb-14 px-6 sm:px-10 lg:px-16 overflow-hidden bg-editorial-cream dark:bg-editorial-charcoal transition-colors duration-500 text-left">

      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-l-[1px] border-t-[1px] border-neutral-300 dark:border-neutral-700/80 pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-r-[1px] border-t-[1px] border-neutral-300 dark:border-neutral-700/80 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-l-[1px] border-b-[1px] border-neutral-300 dark:border-neutral-700/80 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-r-[1px] border-b-[1px] border-neutral-300 dark:border-neutral-700/80 pointer-events-none z-0" />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden">
        <span className="text-[16vw] sm:text-[20vw] font-serif font-black italic text-neutral-200/40 dark:text-neutral-800/20 tracking-[0.15em] leading-none uppercase">
          Portfolio
        </span>
      </div>

      {/* Vertical margin rules */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-neutral-300 dark:bg-neutral-700/80 pointer-events-none z-0" />
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-neutral-300 dark:bg-neutral-700/80 pointer-events-none z-0" />

      {/* TOP BAR */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 relative z-10 gap-2">
        <div className="font-mono text-[10.5px] sm:text-[11.5px] tracking-wider text-neutral-400 dark:text-neutral-500 space-y-0.5">
          <span className="block font-black text-editorial-charcoal dark:text-editorial-cream uppercase tracking-[0.2em]">
            Issue Vol. 04
          </span>
          <span className="block uppercase">
            Responsive Systems Portfolio
          </span>
        </div>
        <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
          Design &amp; Development //
        </span>
      </div>

      {/* HERO BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center flex-grow py-6 md:py-10 relative z-10">

        {/* Left Column — Discipline Tags + Quick Stats (Desktop only) */}
        <div className="lg:col-span-3 hidden lg:flex flex-col justify-center gap-10 pointer-events-none select-none lg:border-r lg:border-neutral-300 dark:lg:border-neutral-700 lg:pr-8">
          <div className="space-y-3">
            {(['Graphic Design', 'Front End Dev', 'UI/UX'] as const).map((text) => (
              <span
                key={text}
                className="font-mono text-[11px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 border-l-2 border-neutral-300 dark:border-neutral-700 pl-3 leading-tight block"
              >
                {text}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6 border-t border-neutral-200 dark:border-neutral-800 pt-6">
            {[
              { value: '4+', label: 'Years Building' },
              { value: '12+', label: 'Projects Shipped' },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="block text-2xl font-serif italic font-bold text-editorial-charcoal dark:text-editorial-cream leading-none">
                  {stat.value}
                </span>
                <span className="block mt-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Column — Portrait */}
        <div className="lg:col-span-6 flex justify-center relative">
          <div className="relative w-full max-w-[380px] lg:max-w-[440px] xl:max-w-[480px] aspect-[4/5] bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-sm shadow-sm overflow-hidden group">

            {/* Profile Photo */}
            <img
              src="/Profile.webp"
              alt="Jian Marie Hilario"
              width={380}
              height={475}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5 pointer-events-none z-10" />

            {/* Bottom Left — DOST badge */}
            <div className="absolute bottom-4 left-4 z-20">
              <span className="inline-block font-mono text-[9px] font-black uppercase tracking-wider bg-editorial-charcoal/90 text-editorial-cream dark:bg-editorial-cream/90 dark:text-editorial-charcoal rounded-sm px-2.5 py-1 shadow-sm select-none backdrop-blur-sm">
                DOST Merit Scholar
              </span>
            </div>

            <span className="sr-only">Jian Marie Hilario — Profile Photo</span>
          </div>
        </div>

        {/* Right Column — Name + Value Prop */}
        <div className="lg:col-span-3 text-left lg:text-right space-y-0 pointer-events-none select-none lg:border-l lg:border-neutral-300 dark:lg:border-neutral-700 lg:pl-8">
          <h2 className="text-[clamp(2.2rem,9vw,5rem)] font-serif font-black tracking-tight text-editorial-charcoal dark:text-editorial-cream uppercase leading-[0.75]">
            JIAN
          </h2>
          <h2 className="text-[clamp(1.8rem,7vw,4rem)] font-serif font-light italic tracking-[0.18em] text-editorial-charcoal/50 dark:text-editorial-cream/50 uppercase leading-[0.8] -mt-[0.1em]">
            MARIE
          </h2>
          <span className="flex items-center gap-2 my-4 lg:ml-auto lg:justify-end">
            <span className="w-20 sm:w-28 h-[1px] bg-neutral-300 dark:bg-neutral-700 inline-block" />
            <span className="w-2 h-2 rotate-45 border border-neutral-300 dark:border-neutral-700 inline-block flex-shrink-0" />
          </span>
          <h2 className="text-[clamp(1.1rem,4vw,2.2rem)] font-serif font-semibold text-editorial-charcoal/70 dark:text-editorial-cream/70 uppercase leading-[0.9] tracking-[0.08em]">
            DESIGNER
          </h2>
          <p className="pt-4 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 pointer-events-auto select-auto leading-relaxed">
            Graphic Design &bull; Front End Dev &bull; UI/UX
          </p>
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-5 border-t border-neutral-100 dark:border-neutral-900 relative z-10 items-end">

        {/* Abstract */}
        <div className="lg:col-span-6 space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block font-bold">
            Abstract //
          </span>
          <p className="font-sans text-xs sm:text-[12px] leading-relaxed text-neutral-500 dark:text-neutral-400 max-w-xl">
            DOST Merit Scholar crafting brand identities, front-end architectures, and human-centered interfaces.
          </p>
        </div>

        {/* Actions */}
        <div className="lg:col-span-6 flex flex-col items-start lg:items-end gap-3">

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
                Resume
              </button>
            )}
            <a
              href="/projects/Jian Marie Hilario - Portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/[0.05] hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:border-amber-400 dark:hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 font-mono text-[11px] font-bold tracking-widest uppercase text-editorial-charcoal dark:text-editorial-cream transition-all duration-300 flex items-center gap-1.5 cursor-pointer focus:outline-none"
            >
              Creative Portfolio
            </a>
          </div>

          {/* Social Row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a
              href="https://github.com/jianhilario"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-editorial-charcoal dark:hover:text-editorial-cream transition-colors duration-300"
            >
              GitHub
            </a>
            <span className="text-neutral-200 dark:text-neutral-800 select-none">/</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-editorial-charcoal dark:hover:text-editorial-cream transition-colors duration-300"
            >
              LinkedIn
            </a>
            <span className="text-neutral-200 dark:text-neutral-800 select-none">/</span>
            <a
              href="mailto:jianhilario@gmail.com"
              className="py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-300 hover:text-editorial-charcoal dark:hover:text-editorial-cream transition-colors duration-300"
            >
              Email
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}

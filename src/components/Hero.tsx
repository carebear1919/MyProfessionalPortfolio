import { ArrowRight, ArrowUpRight, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  scrollToSection: (id: string) => void;
  onOpenResume?: () => void;
}

export default function Hero({ scrollToSection, onOpenResume }: HeroProps) {
  return (
    <section className="relative grid grid-cols-1 md:grid-cols-12 md:min-h-[min(66dvh,660px)] bg-editorial-cream text-left overflow-hidden border-b border-neutral-400/60 ">

      {/* Text column */}
      <div className="md:col-span-7 lg:col-span-5 flex flex-col justify-center px-6 sm:px-10 lg:px-12 py-10 lg:py-10 order-1 relative z-10">
        <h1 className="font-serif font-medium text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1.02] tracking-tight text-editorial-charcoal">
          {['I build, test', 'and design'].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.2em] -mb-[0.2em]">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden pb-[0.2em] -mb-[0.2em]">
            <motion.em
              className="block font-normal text-editorial-accent-text"
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.1 + 2 * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              the web.
            </motion.em>
          </span>
        </h1>

        <span className="block w-14 h-px bg-editorial-accent/60 my-6" />

        <p className="font-sans font-normal text-base leading-relaxed text-neutral-600 max-w-sm">
          I&apos;m Jian Marie Hilario, a Summa Cum Laude IT graduate and DOST Merit Scholar. Full-stack developer, quality analyst and UI/UX designer, open to roles in all three.
        </p>

        {/* Actions: two equal-height buttons, then one aligned row of links */}
        <div className="mt-8 flex flex-wrap items-stretch gap-3 max-w-md">
          <button
            onClick={() => scrollToSection('projects')}
            className="group flex-1 basis-40 inline-flex items-center justify-center gap-3 min-h-[48px] px-5 bg-editorial-charcoal text-editorial-cream font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            View my work
            <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="flex-1 basis-40 inline-flex items-center justify-center gap-2 min-h-[48px] px-5 border border-editorial-charcoal text-editorial-charcoal font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-editorial-charcoal hover:text-editorial-cream transition-colors cursor-pointer"
            >
              <FileText size={14} aria-hidden="true" />
              Resume
            </button>
          )}
        </div>

        <ul className="mt-5 flex flex-wrap items-center gap-x-6 font-mono text-xs font-bold uppercase tracking-wider">
          {[
            { label: 'Creative portfolio', href: '/projects/Jian Marie Hilario - Portfolio.pdf', external: true },
            { label: 'GitHub', href: 'https://github.com/jianhilario', external: true },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jian-marie-hilario', external: true },
            { label: 'Email', href: 'mailto:jianhilario@gmail.com', external: false },
          ].map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group inline-flex items-center gap-1 min-h-[44px] text-neutral-600 hover:text-editorial-charcoal transition-colors"
              >
                <span className="border-b border-transparent group-hover:border-current">{link.label}</span>
                {link.external && <ArrowUpRight size={12} aria-hidden="true" />}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Portrait column */}
      <div className="md:col-span-5 lg:col-span-7 relative min-h-[300px] md:min-h-0 order-2 bg-editorial-panel overflow-hidden md:border-l border-neutral-300 ">
        {/* Soft sunlit glow behind the subject */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_45%,rgba(168,135,106,0.45),transparent_62%)] pointer-events-none" />
        <span className="absolute left-[8%] top-[10%] bottom-0 w-px bg-editorial-accent/25 pointer-events-none" />

        <motion.img
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          src="/Profile.webp"
          alt="Jian Marie Hilario"
          width={1200}
          height={1800}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          style={{ height: '100%', maxWidth: 'none' }}
          className="absolute inset-0 w-full h-full object-contain object-bottom lg:object-[70%_100%] drop-shadow-[0_20px_40px_rgba(22,20,17,0.25)]"
        />

        <span className="absolute top-5 right-6 font-mono text-xs font-bold uppercase tracking-[0.25em] text-neutral-600 flex items-center gap-3 select-none">
          Based in Cavite, PH <span className="w-8 h-px bg-neutral-500/70 inline-block" />
        </span>
      </div>
    </section>
  );
}

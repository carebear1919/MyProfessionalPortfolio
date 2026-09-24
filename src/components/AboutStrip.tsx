import { ArrowRight } from 'lucide-react';
import { siteStats } from '../data';

interface AboutStripProps {
  scrollToSection: (id: string) => void;
}

const stats = [
  { value: `${siteStats.yearsBuilding}+`, label: 'Years building' },
  { value: String(siteStats.projectsShipped), label: 'Projects shipped' },
];

export default function AboutStrip({ scrollToSection }: AboutStripProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 bg-editorial-panel border-b border-neutral-400/60 text-left">
      {/* Intro */}
      <div className="md:col-span-7 md:border-r border-neutral-400/60 px-6 sm:px-10 lg:px-12 py-6 flex flex-col justify-center gap-3">
        <p className="font-serif font-medium text-2xl leading-snug text-editorial-charcoal">
          IT graduate and DOST scholar working across{' '}
          <em className="text-editorial-accent-text font-normal">code, testing and design.</em>
        </p>
        <button
          onClick={() => scrollToSection('about')}
          className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-editorial-charcoal cursor-pointer focus:outline-none w-fit"
        >
          More about me
          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Stats */}
      <div className="md:col-span-5 bg-editorial-accent/20 px-6 sm:px-10 lg:px-8 py-6 flex items-center justify-around gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <span className="block font-serif italic text-4xl text-editorial-charcoal leading-none">
              {stat.value}
            </span>
            <span className="block mt-1.5 font-mono text-xs uppercase tracking-wider text-neutral-600">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}

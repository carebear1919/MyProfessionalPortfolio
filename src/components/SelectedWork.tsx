import { ArrowRight } from 'lucide-react';
import { projects } from '../data';

interface SelectedWorkProps {
  scrollToSection: (id: string) => void;
}

// One flagship per discipline: full-stack/QA, full-stack PWA, UI/UX
const FEATURED_IDS = ['s-core-portal', 'renta', 'sample-company'];

export default function SelectedWork({ scrollToSection }: SelectedWorkProps) {
  const preview = FEATURED_IDS
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p && !!p.images && p.images.length > 0);

  // Open the project's detail panel in the Projects section
  const handleOpen = (id: string) => {
    window.dispatchEvent(new CustomEvent('openProject', { detail: id }));
  };

  return (
    <section className="focus-dark bg-editorial-band text-editorial-cream text-left">
      <div className="px-6 sm:px-10 lg:px-16">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12">
      <div className="lg:col-span-3 lg:pr-10 py-14 lg:py-20 flex flex-col justify-center">
        <h2 className="font-serif font-medium text-[clamp(1.7rem,2.6vw,2.6rem)] leading-tight">
          Selected projects across development, testing and design.
        </h2>
        <button
          onClick={() => scrollToSection('projects')}
          className="group mt-9 inline-flex items-center gap-4 font-mono text-xs font-bold uppercase tracking-[0.25em] cursor-pointer focus:outline-none w-fit"
        >
          View all projects
          <span className="w-9 h-9 rounded-full border border-neutral-600 flex items-center justify-center group-hover:bg-editorial-cream group-hover:text-editorial-charcoal transition-all duration-300">
            <ArrowRight size={13} />
          </span>
        </button>
      </div>

      <div className="lg:col-span-9 lg:border-l border-neutral-800 lg:pl-10 pb-14 lg:py-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {preview.map((project, idx) => (
          <button
            key={project.id}
            onClick={() => handleOpen(project.id)}
            className="group text-left cursor-pointer focus:outline-none"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
              <img
                src={project.images![0]}
                alt={project.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                style={{ height: '100%', maxWidth: 'none' }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
            </div>
            <span className="block mt-4 font-serif italic text-sm text-neutral-400">
              0{idx + 1}
            </span>
            <span className="block mt-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-editorial-cream">
              {project.title}
            </span>
            <span className="block mt-1 font-sans text-sm font-normal text-neutral-300">
              {project.subtitle}
            </span>
          </button>
        ))}
      </div>
      </div>
      </div>
    </section>
  );
}

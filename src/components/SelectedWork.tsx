import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data';

interface SelectedWorkProps {
  scrollToSection: (id: string) => void;
}

export default function SelectedWork({ scrollToSection }: SelectedWorkProps) {
  const preview = projects.filter((p) => p.featured && p.images && p.images.length > 0).slice(0, 4);

  const handleOpen = (category: string) => {
    window.dispatchEvent(new CustomEvent('filterProjects', { detail: category }));
    scrollToSection('projects');
  };

  return (
    <section className="py-16 px-6 sm:px-10 lg:px-16 border-t border-neutral-200 dark:border-neutral-900 bg-editorial-cream dark:bg-editorial-charcoal transition-colors duration-500 text-left">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-[10px] tracking-[0.4em] text-neutral-500 dark:text-neutral-400 uppercase block mb-1.5">
              Selected Work
            </span>
            <h2 className="font-serif font-bold tracking-tight text-2xl sm:text-3xl text-editorial-charcoal dark:text-editorial-cream">
              Crafted with purpose.
            </h2>
          </div>
          <button
            onClick={() => scrollToSection('projects')}
            className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-editorial-charcoal dark:hover:text-editorial-cream transition-colors duration-300 flex items-center gap-1.5 cursor-pointer focus:outline-none"
          >
            View All Projects <ArrowUpRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {preview.map((project) => (
            <button
              key={project.id}
              onClick={() => handleOpen(project.category)}
              className="group text-left rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-950/20 overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 cursor-pointer focus:outline-none"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <img
                  src={project.images![0]}
                  alt={project.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-2 right-2 p-1.5 rounded-full bg-editorial-charcoal/90 text-editorial-cream dark:bg-editorial-cream/90 dark:text-editorial-charcoal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight size={12} />
                </span>
              </div>
              <div className="p-3">
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-0.5">
                  {project.category}
                </span>
                <span className="font-serif font-bold text-[13px] text-editorial-charcoal dark:text-editorial-cream leading-tight block truncate">
                  {project.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

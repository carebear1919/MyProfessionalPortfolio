import { ArrowUpRight } from 'lucide-react';
import { services } from '../data';
import type { Service } from '../types';

export default function Services() {
  const openRelated = (service: Service) => {
    if (service.scrollTo) {
      document.getElementById(service.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (service.filter) {
      window.dispatchEvent(new CustomEvent('filterProjects', { detail: service.filter }));
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 px-6 sm:px-10 lg:px-16 border-t border-neutral-300 bg-editorial-cream text-left">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="font-serif font-medium tracking-tight text-4xl sm:text-5xl text-editorial-charcoal mb-3">
          Where I can help
        </h2>
        <p className="text-base text-neutral-600 max-w-xl leading-relaxed mb-12">
          Four areas I work in, each with the projects behind it.
        </p>

        <ul className="border-t border-neutral-300">
          {services.map((service) => (
            <li key={service.id} className="border-b border-neutral-300">
              <button
                onClick={() => openRelated(service)}
                className="group w-full text-left py-8 grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-3 items-baseline cursor-pointer"
              >
                <h3 className="md:col-span-4 font-serif font-semibold text-2xl leading-tight text-editorial-charcoal">
                  {service.title}
                </h3>
                <p className="md:col-span-6 text-base text-neutral-600 leading-relaxed">{service.description}</p>
                <span className="md:col-span-2 md:justify-self-end inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-editorial-charcoal group-hover:text-editorial-accent-text">
                  {service.actionLabel}
                  <ArrowUpRight size={13} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

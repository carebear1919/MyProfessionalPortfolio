import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { services } from '../data';

export default function Services() {
  const [activeId, setActiveId] = useState<string>('web-design-dev');

  // Map service IDs to the portfolio filters for the custom filtering trigger
  const getFilterCategoryForService = (id: string) => {
    switch (id) {
      case 'web-design-dev':
        return 'Web Development';
      case 'ui-ux-design-prototyping':
        return 'UI/UX';
      case 'dashboard-data-vis':
        return 'Web Development';
      case 'mobile-app-dev':
        return 'Web Development';
      case 'ecommerce-dev':
        return 'Web Development';
      case 'graphic-design-materials':
        return 'Branding & Visuals';
      case 'logo-identity-design':
        return 'Branding & Visuals';
      case 'process-doc-writing':
        return 'Web Development';
      default:
        return 'All';
    }
  };

  const handleSeeRelatedWork = (id: string) => {
    const filter = getFilterCategoryForService(id);
    // Dispatch custom event to let Projects component know to update its active filter
    window.dispatchEvent(new CustomEvent('filterProjects', { detail: filter }));

    // Scroll smoothly to projects section
    const el = document.getElementById('projects');
    if (el) {
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - (window.innerWidth < 1024 ? 60 : 0);
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Unique Vector Blueprint Drawings for each of the 8 services
  const renderServiceBlueprintSVG = (id: string) => {
    switch (id) {
      case 'web-design-dev':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full stroke-current fill-none opacity-80">
            <rect x="20" y="20" width="360" height="200" rx="4" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <line x1="20" y1="55" x2="380" y2="55" strokeWidth="1" className="stroke-neutral-200 dark:stroke-neutral-800" />
            <rect x="40" y="75" width="140" height="120" rx="2" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <rect x="200" y="75" width="160" height="50" rx="2" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <rect x="200" y="140" width="160" height="55" rx="2" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <path d="M60 110 L50 120 L60 130" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
            <path d="M80 110 L90 120 L80 130" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
            <line x1="73" y1="108" x2="67" y2="132" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
            <circle cx="35" cy="38" r="2.5" className="fill-neutral-300 dark:fill-neutral-700 stroke-none" />
            <circle cx="47" cy="38" r="2.5" className="fill-neutral-300 dark:fill-neutral-700 stroke-none" />
            <circle cx="59" cy="38" r="2.5" className="fill-neutral-300 dark:fill-neutral-700 stroke-none" />
          </svg>
        );
      case 'ui-ux-design-prototyping':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full stroke-current fill-none opacity-80">
            <rect x="25" y="25" width="350" height="190" rx="2" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <circle cx="200" cy="120" r="45" strokeWidth="1" className="stroke-neutral-200 dark:stroke-neutral-800" strokeDasharray="3,3" />
            <rect x="60" y="55" width="90" height="55" rx="3" strokeWidth="1" className="stroke-neutral-400 dark:stroke-neutral-600" />
            <rect x="250" y="130" width="90" height="55" rx="3" strokeWidth="1" className="stroke-neutral-400 dark:stroke-neutral-600" />
            <path d="M120 160 Q 200 70 280 160" strokeWidth="1.5" className="stroke-violet-500" />
            <circle cx="120" cy="160" r="4" className="fill-white dark:fill-neutral-900 stroke-neutral-400" strokeWidth="1" />
            <circle cx="280" cy="160" r="4" className="fill-white dark:fill-neutral-900 stroke-neutral-400" strokeWidth="1" />
            <circle cx="200" cy="115" r="4" className="fill-violet-500 stroke-none" />
            <path d="M195 110 L207 122 L200 124 L204 133 L199 135 L195 126 L191 128 Z" className="fill-editorial-charcoal dark:fill-editorial-cream stroke-none" />
          </svg>
        );
      case 'dashboard-data-vis':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full stroke-current fill-none opacity-80">
            <rect x="20" y="20" width="360" height="200" rx="4" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <line x1="50" y1="180" x2="350" y2="180" strokeWidth="1" className="stroke-neutral-400 dark:stroke-neutral-600" />
            <line x1="50" y1="60" x2="50" y2="180" strokeWidth="1" className="stroke-neutral-400 dark:stroke-neutral-600" />
            <rect x="80" y="100" width="20" height="80" className="fill-neutral-100 dark:fill-neutral-900/60 stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1" />
            <rect x="120" y="70" width="20" height="110" className="fill-neutral-200 dark:fill-neutral-850 stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="1" />
            <rect x="160" y="120" width="20" height="60" className="fill-neutral-100 dark:fill-neutral-900/60 stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1" />
            <rect x="200" y="50" width="20" height="130" className="fill-blue-500/10 stroke-blue-500" strokeWidth="1" />
            <path d="M90 140 L130 100 L170 135 L210 75 L250 95 L290 60" strokeWidth="2" className="stroke-violet-500" />
            <circle cx="290" cy="60" r="3" className="fill-violet-500 stroke-none" />
          </svg>
        );
      case 'mobile-app-dev':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full stroke-current fill-none opacity-80">
            <rect x="135" y="20" width="130" height="200" rx="16" strokeWidth="1.5" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <rect x="142" y="32" width="116" height="176" rx="8" strokeWidth="1" className="stroke-neutral-200 dark:stroke-neutral-800" />
            <rect x="180" y="24" width="40" height="4" rx="2" className="fill-neutral-200 dark:fill-neutral-800 stroke-none" />
            <rect x="152" y="45" width="96" height="40" rx="3" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <circle cx="170" cy="115" r="14" strokeWidth="1" className="stroke-blue-500 fill-blue-500/10" />
            <line x1="195" y1="110" x2="235" y2="110" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <line x1="195" y1="120" x2="220" y2="120" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <rect x="152" y="145" width="44" height="25" rx="2" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <rect x="204" y="145" width="44" height="25" rx="2" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
          </svg>
        );
      case 'ecommerce-dev':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full stroke-current fill-none opacity-80">
            <rect x="30" y="30" width="140" height="180" rx="4" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <rect x="230" y="30" width="140" height="180" rx="4" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <line x1="250" y1="60" x2="350" y2="60" strokeWidth="1.5" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <line x1="250" y1="85" x2="310" y2="85" strokeWidth="1" className="stroke-neutral-200 dark:stroke-neutral-800" />
            <line x1="250" y1="105" x2="330" y2="105" strokeWidth="1" className="stroke-neutral-200 dark:stroke-neutral-800" />
            <line x1="250" y1="125" x2="300" y2="125" strokeWidth="1" className="stroke-neutral-200 dark:stroke-neutral-800" />
            <line x1="250" y1="150" x2="350" y2="150" strokeWidth="1" strokeDasharray="3 3" className="stroke-neutral-400 dark:stroke-neutral-600" />
            <rect x="250" y="165" width="100" height="25" rx="2" strokeWidth="1" className="stroke-violet-500 fill-violet-500/5" />
            <rect x="50" y="50" width="100" height="70" rx="2" strokeWidth="1" className="stroke-neutral-400 dark:stroke-neutral-600" />
            <circle cx="100" cy="85" r="15" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <line x1="50" y1="140" x2="150" y2="140" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <line x1="50" y1="160" x2="110" y2="160" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
          </svg>
        );
      case 'graphic-design-materials':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full stroke-current fill-none opacity-80">
            <rect x="80" y="20" width="240" height="200" rx="2" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <line x1="80" y1="20" x2="320" y2="220" strokeWidth="0.5" strokeDasharray="2,2" className="stroke-neutral-200 dark:stroke-neutral-800" />
            <line x1="320" y1="20" x2="80" y2="220" strokeWidth="0.5" strokeDasharray="2,2" className="stroke-neutral-200 dark:stroke-neutral-800" />
            <line x1="200" y1="20" x2="200" y2="220" strokeWidth="0.5" className="stroke-neutral-200 dark:stroke-neutral-800" />
            <rect x="110" y="45" width="180" height="50" rx="1" strokeWidth="1" className="stroke-neutral-400 dark:stroke-neutral-600" />
            <circle cx="160" cy="150" r="25" strokeWidth="1" className="stroke-blue-500" />
            <rect x="210" y="125" width="80" height="50" rx="1" strokeWidth="1" className="stroke-neutral-400 dark:stroke-neutral-600" />
            <line x1="110" y1="195" x2="290" y2="195" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
          </svg>
        );
      case 'logo-identity-design':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full stroke-current fill-none opacity-80">
            <circle cx="200" cy="120" r="70" strokeWidth="1" className="stroke-neutral-200 dark:stroke-neutral-800" />
            <circle cx="200" cy="120" r="40" strokeWidth="1" className="stroke-neutral-200 dark:stroke-neutral-800" />
            <line x1="200" y1="30" x2="200" y2="210" strokeWidth="0.5" strokeDasharray="3 3" className="stroke-neutral-400 dark:stroke-neutral-600" />
            <line x1="100" y1="120" x2="300" y2="120" strokeWidth="0.5" strokeDasharray="3 3" className="stroke-neutral-400 dark:stroke-neutral-600" />
            <path d="M160 90 L200 150 L240 90" strokeWidth="2.5" className="stroke-violet-500" />
            <rect x="157" y="87" width="6" height="6" className="fill-white dark:fill-neutral-900 stroke-neutral-400" strokeWidth="1" />
            <rect x="197" y="147" width="6" height="6" className="fill-violet-500 stroke-violet-600" strokeWidth="1" />
            <rect x="237" y="87" width="6" height="6" className="fill-white dark:fill-neutral-900 stroke-neutral-400" strokeWidth="1" />
          </svg>
        );
      case 'process-doc-writing':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full stroke-current fill-none opacity-80">
            <rect x="30" y="100" width="80" height="40" rx="3" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <line x1="110" y1="120" x2="150" y2="120" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <path d="M190 95 L225 120 L190 145 L155 120 Z" strokeWidth="1" className="stroke-blue-500 fill-blue-500/5" />
            <path d="M190 95 L190 55 L280 55" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <path d="M190 145 L190 185 L280 185" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <rect x="280" y="35" width="90" height="40" rx="3" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <rect x="280" y="165" width="90" height="40" rx="3" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <line x1="45" y1="120" x2="95" y2="120" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <line x1="295" y1="55" x2="355" y2="55" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <line x1="295" y1="185" x2="355" y2="185" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
          </svg>
        );
      default:
        return null;
    }
  };

  const selectedService = services.find((s) => s.id === activeId) || services[0];

  return (
    <section id="services" className="relative py-24 px-6 sm:px-10 lg:px-16 border-t border-neutral-200 dark:border-neutral-900 bg-editorial-cream dark:bg-editorial-charcoal transition-colors duration-500 text-left">
      {/* Vertical margin rules */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-neutral-300 dark:bg-neutral-700/80 pointer-events-none z-0" />
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-neutral-300 dark:bg-neutral-700/80 pointer-events-none z-0" />
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-l-[1px] border-t-[1px] border-neutral-300 dark:border-neutral-700/80 pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-r-[1px] border-t-[1px] border-neutral-300 dark:border-neutral-700/80 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-l-[1px] border-b-[1px] border-neutral-300 dark:border-neutral-700/80 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-r-[1px] border-b-[1px] border-neutral-300 dark:border-neutral-700/80 pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="border-b border-neutral-200 dark:border-neutral-900 pb-10 mb-16">
          <span className="font-mono text-[10px] tracking-[0.4em] text-neutral-500 dark:text-neutral-400 uppercase block mb-2">
            OFFERING CATALOG
          </span>
          <h2 className="font-serif font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl text-editorial-charcoal dark:text-editorial-cream mb-3">
            Service Matrix
          </h2>
          <p className="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 font-light max-w-2xl leading-relaxed">
            Professional solutions built at the intersection of code, design, and strategy. Choose any category in the registry to inspect parameters.
          </p>
        </div>

        {/* Reversed Spotlight Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT COLUMN: ACTIVE SERVICES REGISTER SELECTOR (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <span className="font-mono text-[10.5px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block pl-2 mb-3 font-bold">
              Available Service Profiles
            </span>
            
            <div className="flex-1 flex flex-col justify-between gap-2">
              {services.map((service, index) => {
                const isSelected = service.id === activeId;
                const formattedIndex = String(index + 1).padStart(2, '0');
                
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveId(service.id)}
                    className={`min-touch-wide w-full flex-1 px-5 border rounded-sm text-left transition-all duration-300 cursor-pointer relative overflow-hidden flex items-center justify-between focus:outline-none ${
                      isSelected
                        ? 'border-editorial-charcoal dark:border-editorial-cream bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal shadow-sm'
                        : 'border-neutral-200/80 dark:border-neutral-900 bg-white dark:bg-neutral-950/40 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-4 z-10">
                      <span className={`font-mono text-xs font-bold ${isSelected ? 'text-neutral-300 dark:text-neutral-700' : 'text-neutral-500 dark:text-neutral-400'}`}>
                        {service.number}
                      </span>
                      <h4 className={`text-sm sm:text-base font-serif italic font-bold tracking-tight ${isSelected ? 'text-white dark:text-black' : 'text-editorial-charcoal dark:text-editorial-cream'}`}>
                        {service.title}
                      </h4>
                    </div>
                    
                    <div className="z-10 font-mono text-[10.5px] uppercase tracking-wider opacity-75 font-bold">
                      {isSelected ? 'Active' : 'Inspect'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: ACTIVE FEATURED SPOTLIGHT SHOWCASE PANEL (7 columns) */}
          <div className="lg:col-span-7 border border-neutral-200 dark:border-neutral-900 rounded-sm bg-white/60 dark:bg-neutral-950/20 p-6 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div>
                  {/* Spotlight Header */}
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-900 pb-4 mb-6">
                    <span className="font-mono text-[10px] text-indigo-500 font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/5 border border-indigo-500/10">
                      Offering Specs // {selectedService.number}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase font-bold">
                      READY TO DEPLOY
                    </span>
                  </div>

                  {/* SVG Blueprint Canvas */}
                  <div className="relative h-28 sm:h-36 md:h-40 w-full border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-950/40 p-2 rounded-sm flex items-center justify-center mb-5 overflow-hidden">
                    <div className="h-full aspect-[400/240] flex items-center justify-center">
                      {renderServiceBlueprintSVG(selectedService.id)}
                    </div>
                  </div>

                  {/* Spotlight Details */}
                  <div className="space-y-4">
                    <h3 className="font-serif font-bold text-2xl sm:text-3xl text-editorial-charcoal dark:text-editorial-cream tracking-tight leading-none">
                      {selectedService.title}
                    </h3>
                    <p className="font-serif italic text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 leading-relaxed font-bold">
                      &ldquo;{selectedService.positioning}&rdquo;
                    </p>
                    <p className="text-xs sm:text-sm font-sans font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {selectedService.description}
                    </p>
                  </div>
                </div>

                {/* Lower Grid: Includes list & Tool matrix */}
                <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-900 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Left block - what's included */}
                  <div className="md:col-span-7">
                    <h5 className="font-mono text-[10.5px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold mb-3">
                      Deliverables Checklist
                    </h5>
                    <ul className="space-y-1.5">
                      {selectedService.includes.map((inc, i) => (
                        <li key={i} className="text-xs font-sans text-neutral-500 dark:text-neutral-400 flex items-start gap-2 leading-relaxed font-medium">
                          <CheckCircle2 size={11} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right block - tools */}
                  <div className="md:col-span-5">
                    <h5 className="font-mono text-[10.5px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold mb-3">
                      Configured Stack
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {selectedService.tools.map((tool) => (
                        <span
                          key={tool}
                          className="font-mono text-[10.5px] px-2 py-0.5 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 font-bold"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* See related work filter button */}
                    <div className="mt-6">
                      <button
                        onClick={() => handleSeeRelatedWork(selectedService.id)}
                        className="min-touch-wide inline-flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-tighter text-editorial-charcoal dark:text-editorial-cream border-b border-neutral-300 dark:border-neutral-700 hover:border-editorial-charcoal dark:hover:text-editorial-cream transition-all duration-300 cursor-pointer focus:outline-none"
                      >
                        See Related Work <ArrowUpRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

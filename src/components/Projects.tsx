import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, ArrowUpRight, ArrowLeft, ArrowRight, Layers, Terminal, Cpu, CheckCircle } from 'lucide-react';
import { Project } from '../types';
import { projects } from '../data';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'blueprint' | 'screenshots'>('screenshots');
  const [drawerImageIndex, setDrawerImageIndex] = useState<number>(0);
  const [drawerViewMode, setDrawerViewMode] = useState<'blueprint' | 'screenshots'>('screenshots');

  const categories = ['All', 'Web Development', 'UI/UX', 'Branding & Visuals'];

  // Pulse animation trigger for filter cross-nav feedback
  const [pulseFilter, setPulseFilter] = useState<string | null>(null);

  // Listen to custom filtering event from Services
  useEffect(() => {
    const handleFilterEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && categories.includes(customEvent.detail)) {
        setSelectedCategory(customEvent.detail);
        setPulseFilter(customEvent.detail);
        setTimeout(() => setPulseFilter(null), 2000);
        setSpotlightIndex(0);
      }
    };

    window.addEventListener('filterProjects', handleFilterEvent);
    return () => window.removeEventListener('filterProjects', handleFilterEvent);
  }, []);

  // Filter projects dynamically — featured first
  const filteredProjects = useMemo(() => {
    const list = selectedCategory === 'All' ? projects : projects.filter((p) => p.category === selectedCategory);
    return [...list].sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
  }, [selectedCategory]);

  // Start at first featured project
  const initialFeaturedIndex = useMemo(() =>
    filteredProjects.findIndex((p) => p.featured),
  [filteredProjects]);

  // Handle index safety when filter changes — prefer featured
  useEffect(() => {
    if (filteredProjects.length > 0) {
      const safeIdx = initialFeaturedIndex >= 0 ? initialFeaturedIndex : 0;
      if (spotlightIndex >= filteredProjects.length || (spotlightIndex === 0 && safeIdx > 0)) {
        setSpotlightIndex(safeIdx);
      }
    }
  }, [filteredProjects]);

  // Current project highlighted in Spotlight
  const spotlightProject = filteredProjects[spotlightIndex] || null;

  // Automatically reset image index & view mode when spotlight changes
  useEffect(() => {
    setActiveImageIndex(0);
    if (spotlightProject) {
      setViewMode(spotlightProject.images && spotlightProject.images.length > 0 ? 'screenshots' : 'blueprint');
    }
  }, [spotlightProject?.id]);

  // Carousel navigation handlers
  const handlePrev = () => {
    if (filteredProjects.length === 0) return;
    setSpotlightIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (filteredProjects.length === 0) return;
    setSpotlightIndex((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
  };

  // Helper for generating abstract beautiful design blueprint nodes
  const renderBlueprintSVG = (projectId: string) => {
    // Elegant, geometric procedural vector drawings representing system layouts
    switch (projectId) {
      case 'internal-reporting-dashboard':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full stroke-current fill-none opacity-80 transition-opacity group-hover:opacity-100">
            <rect x="20" y="20" width="360" height="200" rx="4" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <line x1="20" y1="60" x2="380" y2="60" strokeWidth="1" className="stroke-neutral-200 dark:stroke-neutral-800" />
            <line x1="120" y1="60" x2="120" y2="220" strokeWidth="1" className="stroke-neutral-200 dark:stroke-neutral-800" />
            {/* Chart grids */}
            <rect x="140" y="80" width="100" height="60" rx="2" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-600" />
            <rect x="260" y="80" width="100" height="60" rx="2" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-600" />
            <rect x="140" y="155" width="220" height="50" rx="2" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-600" />
            {/* Left sidebar item lines */}
            <line x1="35" y1="85" x2="105" y2="85" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <line x1="35" y1="110" x2="90" y2="110" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <line x1="35" y1="135" x2="100" y2="135" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            {/* Decorative circles */}
            <circle cx="340" cy="40" r="4" strokeWidth="1" className="stroke-violet-500 fill-violet-500/20" />
            <circle cx="360" cy="40" r="4" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
          </svg>
        );
      case 's-core-portal':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full stroke-current fill-none opacity-80">
            <rect x="20" y="20" width="360" height="200" rx="4" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <line x1="20" y1="70" x2="380" y2="70" strokeWidth="1" className="stroke-neutral-200 dark:stroke-neutral-800" />
            {/* Submission pipeline steps */}
            <rect x="40" y="100" width="70" height="40" rx="3" strokeWidth="1" className="stroke-neutral-400 dark:stroke-neutral-600" />
            <line x1="110" y1="120" x2="165" y2="120" strokeWidth="1" strokeDasharray="3,3" className="stroke-neutral-400 dark:stroke-neutral-600" />
            <rect x="165" y="100" width="70" height="40" rx="3" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-600" />
            <line x1="235" y1="120" x2="290" y2="120" strokeWidth="1" strokeDasharray="3,3" className="stroke-neutral-400 dark:stroke-neutral-600" />
            <rect x="290" y="100" width="70" height="40" rx="3" strokeWidth="1" className="stroke-neutral-400 dark:stroke-neutral-600" />
            {/* labels */}
            <path d="M75 160 L165 200 L255 160" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
          </svg>
        );
      case 'caresync':
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full stroke-current fill-none opacity-80">
            {/* Dual screens representing caregiver and elder views */}
            <rect x="60" y="30" width="110" height="180" rx="10" strokeWidth="1.5" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <rect x="230" y="30" width="110" height="180" rx="10" strokeWidth="1.5" className="stroke-neutral-300 dark:stroke-neutral-700" />
            {/* Elder connection pulse */}
            <path d="M170 120 C 190 80, 210 160, 230 120" strokeWidth="1" className="stroke-blue-500" />
            {/* Mobile elements */}
            <circle cx="115" cy="195" r="5" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            <circle cx="285" cy="195" r="5" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full stroke-current fill-none opacity-80">
            <rect x="25" y="25" width="350" height="190" rx="2" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            {/* Editorial grids */}
            <line x1="25" y1="120" x2="375" y2="120" strokeWidth="1" className="stroke-neutral-200 dark:stroke-neutral-800" />
            <line x1="200" y1="25" x2="200" y2="215" strokeWidth="1" className="stroke-neutral-200 dark:stroke-neutral-800" />
            <circle cx="200" cy="120" r="30" strokeWidth="1" className="stroke-neutral-300 dark:stroke-neutral-700" />
            {/* Minimal aesthetic code shapes */}
            <path d="M60 60 L100 60" strokeWidth="1.5" className="stroke-neutral-400" />
            <path d="M60 80 L120 80" strokeWidth="1.5" className="stroke-neutral-400" />
            <path d="M240 160 L320 160" strokeWidth="1.5" className="stroke-neutral-400" />
            <path d="M240 180 L290 180" strokeWidth="1.5" className="stroke-neutral-400" />
          </svg>
        );
    }
  };

  return (
    <section id="projects" className="relative py-24 px-6 sm:px-10 lg:px-16 border-t border-neutral-200 dark:border-neutral-900 bg-editorial-cream dark:bg-editorial-charcoal transition-colors duration-500 text-left">
      {/* Vertical margin rules */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-neutral-300 dark:bg-neutral-700/80 pointer-events-none z-0" />
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-neutral-300 dark:bg-neutral-700/80 pointer-events-none z-0" />
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-l-[1px] border-t-[1px] border-neutral-300 dark:border-neutral-700/80 pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-r-[1px] border-t-[1px] border-neutral-300 dark:border-neutral-700/80 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-l-[1px] border-b-[1px] border-neutral-300 dark:border-neutral-700/80 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-r-[1px] border-b-[1px] border-neutral-300 dark:border-neutral-700/80 pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto">
        
        {/* Category Filters Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <span className="font-mono text-[10px] tracking-[0.4em] text-neutral-500 dark:text-neutral-400 uppercase block mb-1.5">
              LIVE DEPLOYMENTS
            </span>
            <h2 className="font-serif font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl text-editorial-charcoal dark:text-editorial-cream">
              Shipped Architectures
            </h2>
            <p className="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 font-light mt-2 max-w-2xl leading-relaxed">
              Production systems built with React, Node.js, Express, and TypeScript — from financial automation dashboards to interactive UX platforms. Click any card to explore.
            </p>
          </div>

          {/* Matrix Filters */}
          <div className="flex flex-wrap gap-1.5 border-b border-neutral-200 dark:border-neutral-900 pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setSpotlightIndex(0);
                        }}
                        className={`min-touch-wide px-5 py-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer focus:outline-none ${
                          selectedCategory === cat
                            ? 'bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal shadow-sm'
                            : 'text-neutral-500 dark:text-neutral-400 hover:text-editorial-charcoal dark:hover:text-editorial-cream hover:bg-neutral-50 dark:hover:bg-neutral-950'
                        } ${pulseFilter === cat ? 'animate-pulse ring-2 ring-indigo-500/50' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Registry Indicators */}
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-900 pb-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] font-bold text-editorial-charcoal dark:text-editorial-cream bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded">
              Project Registry ({filteredProjects.length})
            </span>
            <span className="font-mono text-[10.5px] text-neutral-500 dark:text-neutral-400 font-bold">
              Scroll or use arrows to navigate &bull; Click cards for expanded breakdowns
            </span>
          </div>

          {/* Slider Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              disabled={filteredProjects.length <= 1}
              className="min-touch border border-neutral-200 dark:border-neutral-800 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 dark:text-neutral-400 hover:text-editorial-charcoal dark:hover:text-editorial-cream disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer focus:outline-none"
              aria-label="Previous project"
            >
              <ArrowLeft size={13} />
            </button>
            <button
              onClick={handleNext}
              disabled={filteredProjects.length <= 1}
              className="min-touch border border-neutral-200 dark:border-neutral-800 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 dark:text-neutral-400 hover:text-editorial-charcoal dark:hover:text-editorial-cream disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer focus:outline-none"
              aria-label="Next project"
            >
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Empty state check */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-neutral-200 dark:border-neutral-800 rounded">
            <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
              No registry items matching active matrix filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16">
            
            {/* FEATURED SPOTLIGHT SHOWCASE PANEL */}
            {spotlightProject && (
              <div className="lg:col-span-7 border border-neutral-200 dark:border-neutral-900 rounded-sm bg-white/60 dark:bg-neutral-950/20 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-900 pb-4 mb-6">
                    <span className="font-mono text-[10px] text-indigo-500 font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/5 border border-indigo-500/10">
                      Showcased Project
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase font-bold">
                      [{String(spotlightIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}]
                    </span>
                  </div>

                  {/* Media Canvas: Blueprint or Screenshot Gallery */}
                  <div
                    onClick={() => {
                      setActiveProject(spotlightProject);
                      setDrawerViewMode(spotlightProject.images && spotlightProject.images.length > 0 ? 'screenshots' : 'blueprint');
                      setDrawerImageIndex(0);
                    }}
                    className="relative aspect-[16/10] w-full border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-950/40 p-4 rounded-sm flex items-center justify-center cursor-zoom-in group mb-8 overflow-hidden"
                  >
                    {/* View Mode Toggle Controls */}
                    {spotlightProject.images && spotlightProject.images.length > 0 && (
                      <div className="absolute top-3 left-3 z-20 flex gap-1 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm p-1 rounded-sm border border-neutral-200/40 dark:border-neutral-800/40 shadow-sm">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewMode('screenshots');
                          }}
                          className={`px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                            viewMode === 'screenshots'
                              ? 'bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal'
                              : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                          }`}
                        >
                          Screenshots
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewMode('blueprint');
                          }}
                          className={`px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                            viewMode === 'blueprint'
                              ? 'bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal'
                              : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                          }`}
                        >
                          Blueprint
                        </button>
                      </div>
                    )}

                    {viewMode === 'screenshots' && spotlightProject.images && spotlightProject.images.length > 0 ? (
                      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-sm bg-neutral-50 dark:bg-neutral-950/20 group/img">
                        <img
                          src={spotlightProject.images[activeImageIndex]}
                          alt={`${spotlightProject.title} screenshot ${activeImageIndex + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.03]"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const pNode = e.currentTarget.parentElement;
                            if (pNode) {
                              const fallback = pNode.querySelector('.img-fallback-placeholder') as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }
                          }}
                        />

                        {/* Interactive Image Navigation */}
                        {spotlightProject.images.length > 1 && (
                          <div className="absolute inset-x-3 bottom-3 flex justify-between items-center z-10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveImageIndex((prev) => (prev === 0 ? spotlightProject.images!.length - 1 : prev - 1));
                              }}
                              className="p-1.5 rounded-sm bg-neutral-900/85 text-white hover:bg-neutral-950 cursor-pointer border border-neutral-800/40 backdrop-blur-sm transition-all"
                            >
                              <ArrowLeft size={10} />
                            </button>
                            
                            <span className="font-mono text-[9px] font-bold text-white px-2 py-0.5 rounded-sm bg-neutral-900/85 border border-neutral-800/40 backdrop-blur-sm select-none">
                              {activeImageIndex + 1} / {spotlightProject.images.length}
                            </span>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveImageIndex((prev) => (prev === spotlightProject.images!.length - 1 ? 0 : prev + 1));
                              }}
                              className="p-1.5 rounded-sm bg-neutral-900/85 text-white hover:bg-neutral-950 cursor-pointer border border-neutral-800/40 backdrop-blur-sm transition-all"
                            >
                              <ArrowRight size={10} />
                            </button>
                          </div>
                        )}

                        {/* Drop-in guidance placeholder */}
                        <div className="img-fallback-placeholder hidden absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-neutral-100/95 dark:bg-neutral-900/95 select-none animate-fade-in">
                          <div className="w-10 h-10 rounded-full border border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center mb-2 animate-pulse">
                            <span className="font-mono text-[9px] text-neutral-400 font-bold">WEBP</span>
                          </div>
                          <span className="font-serif italic text-xs font-bold text-neutral-800 dark:text-neutral-200 block">
                            Image Asset Required
                          </span>
                          <p className="text-[10px] font-mono text-neutral-400 max-w-[220px] mt-2 leading-relaxed">
                            Place <code className="bg-neutral-200 dark:bg-neutral-950 px-1 py-0.5 rounded text-neutral-600 dark:text-neutral-300">{spotlightProject.images[activeImageIndex].split('/').pop()}</code> inside <code className="bg-neutral-200 dark:bg-neutral-950 px-1 py-0.5 rounded text-neutral-600 dark:text-neutral-300">/public/projects/</code> to load screenshot.
                          </p>
                        </div>
                      </div>
                    ) : (
                      renderBlueprintSVG(spotlightProject.id)
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 py-2 flex items-center justify-center transition-opacity duration-300 text-white font-mono text-[9px] tracking-widest uppercase select-none pointer-events-none z-10">
                      Click to view detailed specs & gallery
                    </div>
                  </div>

                  {/* Showcase Details */}
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10.5px] font-mono font-bold uppercase text-neutral-500 dark:text-neutral-400">
                        {spotlightProject.category} &bull; {spotlightProject.status || 'finished'}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 font-bold">
                        YEAR: {spotlightProject.year}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-2xl sm:text-3xl text-editorial-charcoal dark:text-editorial-cream tracking-tight leading-none">
                      {spotlightProject.title}
                    </h3>
                    <p className="font-serif italic font-medium text-xs text-neutral-500 dark:text-neutral-400">
                      {spotlightProject.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm font-sans font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {spotlightProject.description}
                    </p>
                  </div>
                </div>

                {/* Technologies List and Links */}
                <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex flex-wrap gap-1.5">
                    {spotlightProject.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10.5px] px-2 py-0.5 border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                    {spotlightProject.tags.length > 4 && (
                      <span className="font-mono text-[10.5px] px-1 text-neutral-500 dark:text-neutral-400 self-center font-bold">
                        +{spotlightProject.tags.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    {spotlightProject.links.live ? (
                      <a
                        href={spotlightProject.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-widest text-editorial-charcoal dark:text-editorial-cream border-b border-current pb-0.5 hover:opacity-80 transition-opacity"
                      >
                        View Project / Demo <ArrowUpRight size={11} />
                      </a>
                    ) : (
                      <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded">
                        Enterprise / Offline Project
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* APPLE STYLE CARD CAROUSEL */}
            <div className="lg:col-span-5 relative min-h-[400px] lg:min-h-0">
              <div className="flex flex-col lg:absolute lg:inset-0 w-full h-full space-y-4">
                <span className="font-mono text-[10.5px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block pl-2 font-bold">
                  Available Architectures Matrix &bull; Scroll to view all ({filteredProjects.length})
                </span>
                
                <div className="flex-1 min-h-0 max-h-[450px] lg:max-h-none space-y-4 overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                  {filteredProjects.map((project, idx) => {
                    const isSpotlighted = spotlightProject?.id === project.id;
                    const formattedIndex = String(idx + 1).padStart(2, '0');
                    
                    return (
                      <div
                        key={project.id}
                        onClick={() => {
                          setSpotlightIndex(idx);
                          setActiveProject(project);
                          setDrawerViewMode(project.images && project.images.length > 0 ? 'screenshots' : 'blueprint');
                          setDrawerImageIndex(0);
                        }}
                        className={`p-6 border rounded-sm text-left transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[140px] ${
                          isSpotlighted
                            ? 'border-editorial-charcoal dark:border-editorial-cream bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal shadow-md'
                            : 'border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-950/40 hover:border-neutral-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        {/* background decoration with low opacity */}
                        <div className="absolute right-2 bottom-0 text-[100px] font-serif italic select-none opacity-[0.03] dark:opacity-[0.02] font-black leading-none pointer-events-none">
                          {formattedIndex}
                        </div>

                          <div className="flex justify-between items-start z-10">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`text-[10.5px] font-mono uppercase tracking-widest font-bold ${isSpotlighted ? 'text-neutral-300 dark:text-neutral-700' : 'text-neutral-500 dark:text-neutral-400'}`}>
                                  {project.category}
                                </span>
                                {project.featured && (
                                  <span className={`font-mono text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${
                                    isSpotlighted
                                      ? 'border-yellow-400/60 text-yellow-300 bg-yellow-500/10'
                                      : 'border-yellow-500/30 text-yellow-600 dark:text-yellow-400 bg-yellow-500/5'
                                  }`}>
                                    ★ Featured
                                  </span>
                                )}
                              </div>
                              <h4 className="text-base font-serif italic font-bold mt-1 tracking-tight">
                                {project.title}
                              </h4>
                            </div>
                          
                          <span className={`font-mono text-[10.5px] px-1.5 py-0.5 rounded border font-bold ${
                            isSpotlighted 
                              ? 'border-neutral-700 dark:border-neutral-300 bg-neutral-800 dark:bg-neutral-100 text-neutral-300 dark:text-neutral-700' 
                              : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400'
                          }`}>
                            {project.tagline || `@${project.id}`}
                          </span>
                        </div>

                        <div className="z-10 mt-4">
                          <p className={`text-[11px] font-sans font-light line-clamp-1 leading-relaxed ${isSpotlighted ? 'text-neutral-300 dark:text-neutral-700' : 'text-neutral-500 dark:text-neutral-400'}`}>
                            {project.description}
                          </p>
                          
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100/10 dark:border-neutral-900/10 font-mono text-[10.5px]">
                            <div className="flex items-center gap-1.5">
                              {project.tags.slice(0, 3).map((t) => (
                                <span key={t} className="opacity-70 font-semibold">{t}</span>
                              ))}
                              {project.tags.length > 3 && <span className="opacity-40">+{project.tags.length - 3}</span>}
                            </div>

                            <span className={`uppercase font-bold tracking-widest ${isSpotlighted ? 'text-white dark:text-black font-black' : 'text-neutral-500 dark:text-neutral-400'}`}>
                              {isSpotlighted ? 'Spotlight Active' : 'Show in spotlight'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* PROJECT DETAILED SYSTEM PANEL / EDITORIAL DRAWERS */}
        <AnimatePresence>
          {activeProject && (
            <div className="fixed inset-0 z-50 overflow-y-auto flex justify-end">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
              />

              {/* Drawer Content */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                className="relative w-full max-w-2xl bg-editorial-cream dark:bg-editorial-charcoal border-l border-neutral-200 dark:border-neutral-800 shadow-2xl z-10 flex flex-col justify-between transition-colors duration-500"
              >
                {/* Panel Scroll Container */}
                <div className="overflow-y-auto p-8 sm:p-12 flex-1 text-left">
                  
                  {/* Top Action Row */}
                  <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-100 dark:border-neutral-900">
                    <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase font-bold tracking-widest">
                      {activeProject.category} // SYSTEM OVERVIEW
                    </span>
                    <button
                      onClick={() => setActiveProject(null)}
                      className="min-touch font-mono text-[10px] font-bold uppercase tracking-widest text-editorial-charcoal dark:text-editorial-cream hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-sm px-5 py-2 cursor-pointer focus:outline-none transition-colors duration-200"
                    >
                      CLOSE (ESC)
                    </button>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif font-bold text-3xl sm:text-4xl text-editorial-charcoal dark:text-editorial-cream tracking-tight mb-2">
                    {activeProject.title}
                  </h3>
                  <p className="font-serif italic font-medium text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                    {activeProject.subtitle}
                  </p>

                  {/* Brief Stats Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4 border-y border-neutral-100 dark:border-neutral-900 py-4 mb-8 font-mono text-[10px]">
                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400 block mb-1">SYSTEM YEAR</span>
                      <span className="font-bold text-editorial-charcoal dark:text-editorial-cream">{activeProject.year}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400 block mb-1">PROJECT ROLE</span>
                      <span className="font-bold text-editorial-charcoal dark:text-editorial-cream uppercase">{activeProject.role}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400 block mb-1">STATUS</span>
                      <span className={`font-bold flex items-center gap-1 ${activeProject.status === 'ongoing' ? 'text-amber-500' : 'text-violet-500 dark:text-violet-400'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${activeProject.status === 'ongoing' ? 'bg-amber-500' : 'bg-violet-500'}`}></span>
                        {activeProject.status === 'ongoing' ? 'ONGOING' : 'FINISHED'}
                      </span>
                    </div>
                  </div>

                  {/* Complete Description */}
                  <div className="space-y-4 mb-8 text-xs sm:text-sm font-sans font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
                    <p className="font-bold text-editorial-charcoal dark:text-editorial-cream font-serif text-sm">
                      Project Description
                    </p>
                    <p className="whitespace-pre-line">
                      {activeProject.longDescription || activeProject.description}
                    </p>
                  </div>

                  {/* Visual Gallery Showcase */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase block font-bold tracking-widest">
                        Visual Gallery
                      </span>
                      {activeProject.images && activeProject.images.length > 0 && (
                        <div className="flex gap-1 bg-neutral-100 dark:bg-neutral-900/60 p-0.5 rounded-sm border border-neutral-200/40 dark:border-neutral-800/40">
                          <button
                            onClick={() => setDrawerViewMode('screenshots')}
                            className={`px-2 py-0.5 font-mono text-[8.5px] font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                              drawerViewMode === 'screenshots'
                                ? 'bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal'
                                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                            }`}
                          >
                            Screenshots
                          </button>
                          <button
                            onClick={() => setDrawerViewMode('blueprint')}
                            className={`px-2 py-0.5 font-mono text-[8.5px] font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                              drawerViewMode === 'blueprint'
                                ? 'bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal'
                                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                            }`}
                          >
                            Blueprint
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="relative aspect-[16/10] w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/40 p-4 rounded-sm flex items-center justify-center overflow-hidden">
                      {drawerViewMode === 'screenshots' && activeProject.images && activeProject.images.length > 0 ? (
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-sm bg-neutral-50 dark:bg-neutral-950/20 group/img">
                          <img
                            src={activeProject.images[drawerImageIndex]}
                            alt={`${activeProject.title} screenshot ${drawerImageIndex + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.03]"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const pNode = e.currentTarget.parentElement;
                              if (pNode) {
                                const fallback = pNode.querySelector('.img-fallback-placeholder') as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }
                            }}
                          />

                          {/* Interactive Image Navigation */}
                          {activeProject.images.length > 1 && (
                            <div className="absolute inset-x-3 bottom-3 flex justify-between items-center z-10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDrawerImageIndex((prev) => (prev === 0 ? activeProject.images!.length - 1 : prev - 1));
                                }}
                                className="p-1.5 rounded-sm bg-neutral-900/85 text-white hover:bg-neutral-950 cursor-pointer border border-neutral-800/40 backdrop-blur-sm transition-all"
                              >
                                <ArrowLeft size={10} />
                              </button>
                              
                              <span className="font-mono text-[9px] font-bold text-white px-2 py-0.5 rounded-sm bg-neutral-900/85 border border-neutral-800/40 backdrop-blur-sm select-none">
                                {drawerImageIndex + 1} / {activeProject.images.length}
                              </span>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDrawerImageIndex((prev) => (prev === activeProject.images!.length - 1 ? 0 : prev + 1));
                                }}
                                className="p-1.5 rounded-sm bg-neutral-900/85 text-white hover:bg-neutral-950 cursor-pointer border border-neutral-800/40 backdrop-blur-sm transition-all"
                              >
                                <ArrowRight size={10} />
                              </button>
                            </div>
                          )}

                          {/* Drop-in guidance placeholder */}
                          <div className="img-fallback-placeholder hidden absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-neutral-100/95 dark:bg-neutral-900/95 select-none animate-fade-in">
                            <div className="w-10 h-10 rounded-full border border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center mb-2 animate-pulse">
                              <span className="font-mono text-[9px] text-neutral-400 font-bold">WEBP</span>
                            </div>
                            <span className="font-serif italic text-xs font-bold text-neutral-800 dark:text-neutral-200 block">
                              Image Asset Required
                            </span>
                            <p className="text-[10px] font-mono text-neutral-400 max-w-[220px] mt-2 leading-relaxed">
                              Place <code className="bg-neutral-200 dark:bg-neutral-950 px-1 py-0.5 rounded text-neutral-600 dark:text-neutral-300">{activeProject.images[drawerImageIndex].split('/').pop()}</code> inside <code className="bg-neutral-200 dark:bg-neutral-950 px-1 py-0.5 rounded text-neutral-600 dark:text-neutral-300">/public/projects/</code> to load screenshot.
                            </p>
                          </div>
                        </div>
                      ) : (
                        renderBlueprintSVG(activeProject.id)
                      )}
                    </div>
                    
                    <span className="font-mono text-[10.5px] text-neutral-500 dark:text-neutral-400 block text-center font-bold">
                      {drawerViewMode === 'screenshots' && activeProject.images && activeProject.images.length > 0
                        ? `Screenshot view ${drawerImageIndex + 1} of ${activeProject.images.length}`
                        : `System blueprint view for ${activeProject.title}`}
                    </span>
                  </div>

                  {/* Tech Stack List */}
                  <div className="space-y-3 mb-8">
                    <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase block font-bold tracking-widest">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-1 rounded text-neutral-500 dark:text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Trigger Action Panel */}
                <div className="p-8 sm:p-12 border-t border-neutral-100 dark:border-neutral-900 bg-neutral-50/40 dark:bg-neutral-950/40 flex items-center gap-4 flex-shrink-0">
                  {activeProject.links.live && (
                    <a
                      href={activeProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-touch-wide flex-1 px-6 rounded-sm bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal hover:bg-neutral-800 dark:hover:bg-neutral-200 font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all duration-300 shadow-sm cursor-pointer"
                    >
                      Launch Live Project <ExternalLink size={13} />
                    </a>
                  )}
                  {activeProject.links.github && (
                    <a
                      href={activeProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-touch-wide px-6 rounded-sm border border-neutral-300 dark:border-neutral-700 hover:border-editorial-charcoal dark:hover:border-editorial-cream text-editorial-charcoal dark:text-editorial-cream font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                    >
                      Repository <Github size={13} />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

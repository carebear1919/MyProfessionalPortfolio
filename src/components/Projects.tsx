import { useState, useMemo, useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ExternalLink, Github, ArrowLeft, ArrowRight, X, ZoomIn, ZoomOut, Pause, Play } from 'lucide-react';
import { Project } from '../types';
import { projects } from '../data';

const CATEGORIES = ['All', 'Web Development', 'UI/UX', 'Branding & Visuals'] as const;
const INITIAL_VISIBLE = 6;
const SLIDE_MS = 5000;

// Wraps a website screenshot in a lightweight browser-window chrome
function BrowserFrame({ url, children }: { url?: string; children: ReactNode }) {
  const domain = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'localhost';
  return (
    <div className="w-full rounded-sm overflow-hidden border border-neutral-300">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 border-b border-neutral-300">
        <div className="flex gap-1.5 flex-shrink-0" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-neutral-300" />
          <span className="w-2 h-2 rounded-full bg-neutral-300" />
          <span className="w-2 h-2 rounded-full bg-neutral-300" />
        </div>
        <div className="flex-1 mx-2 px-3 py-0.5 rounded-full bg-white text-xs font-mono text-neutral-600 truncate text-center">
          {domain}
        </div>
      </div>
      {children}
    </div>
  );
}

// Slideshow used inside the project drawer: crossfade, visible controls, pausable autoplay
function Gallery({ project, onOpen }: { project: Project; onOpen: (images: string[], index: number) => void }) {
  const images = project.images ?? [];
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const onVis = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const autoplay = playing && !hover && pageVisible && !reduceMotion && images.length > 1;

  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % images.length), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [autoplay, index, images.length]);

  const go = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);

  const stage = (
    <div className="relative w-full aspect-[16/10] bg-neutral-100 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`${project.title} screenshot ${index + 1} of ${images.length}`}
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '100%', maxWidth: 'none' }}
          className="absolute inset-0 w-full h-full object-contain"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      </AnimatePresence>
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
          <span className="font-serif italic text-sm text-neutral-600">Screenshot unavailable</span>
        </div>
      )}
      {autoplay && (
        <motion.div
          key={`${project.id}-${index}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
          className="absolute left-0 bottom-0 h-[2px] w-full origin-left bg-editorial-accent"
          aria-hidden="true"
        />
      )}
    </div>
  );

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <button
        type="button"
        onClick={() => onOpen(images, index)}
        className="block w-full text-left cursor-zoom-in"
        aria-label={`Enlarge screenshot ${index + 1} of ${images.length}`}
      >
        {project.category === 'Web Development' ? <BrowserFrame url={project.links.live}>{stage}</BrowserFrame> : stage}
      </button>

      {images.length > 1 && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-neutral-400 text-editorial-charcoal hover:bg-neutral-100 cursor-pointer"
              aria-label="Previous screenshot"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-neutral-400 text-editorial-charcoal hover:bg-neutral-100 cursor-pointer"
              aria-label="Next screenshot"
            >
              <ArrowRight size={16} />
            </button>
          </div>
          <span className="font-mono text-xs text-neutral-600" aria-live="off">
            {index + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="h-11 px-4 inline-flex items-center gap-2 rounded-full border border-neutral-400 font-mono text-xs font-bold uppercase tracking-wider text-editorial-charcoal hover:bg-neutral-100 cursor-pointer"
            aria-pressed={!playing}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxScale, setLightboxScale] = useState(1);
  const [lightboxPosition, setLightboxPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const dragMoved = useRef(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const reduceMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  // Featured projects lead; original order otherwise
  const sorted = useMemo(
    () => [...projects].sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1)),
    []
  );
  const inCategory = useMemo(
    () => (selectedCategory === 'All' ? sorted : sorted.filter((p) => p.category === selectedCategory)),
    [sorted, selectedCategory]
  );
  const visible = showAll ? inCategory : inCategory.slice(0, INITIAL_VISIBLE);
  const counts = useMemo(() => {
    const c: Record<string, number> = { All: projects.length };
    projects.forEach((p) => { c[p.category] = (c[p.category] || 0) + 1; });
    return c;
  }, []);

  // Other sections drive this one: Services filters by category, Selected Work opens a project
  useEffect(() => {
    const onFilter = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if ((CATEGORIES as readonly string[]).includes(detail)) {
        setSelectedCategory(detail as (typeof CATEGORIES)[number]);
        setShowAll(false);
      }
    };
    const onOpen = (e: Event) => {
      const project = projects.find((p) => p.id === (e as CustomEvent<string>).detail);
      if (project) setActiveProject(project);
    };
    window.addEventListener('filterProjects', onFilter);
    window.addEventListener('openProject', onOpen);
    return () => {
      window.removeEventListener('filterProjects', onFilter);
      window.removeEventListener('openProject', onOpen);
    };
  }, []);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxScale(1);
    setLightboxPosition({ x: 0, y: 0 });
    setIsLightboxOpen(true);
  };

  // One place owns the page scroll lock for both overlays
  useEffect(() => {
    document.body.style.overflow = activeProject || isLightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeProject, isLightboxOpen]);

  // Drawer: move focus in, trap Tab, close on Escape, return focus to the card that opened it
  useEffect(() => {
    if (!activeProject) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const drawer = drawerRef.current;
    drawer?.querySelector<HTMLElement>('[data-autofocus]')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (isLightboxOpen || !drawer) return;
      if (e.key === 'Escape') {
        setActiveProject(null);
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lastFocus.current?.focus?.();
    };
  }, [activeProject, isLightboxOpen]);

  // Lightbox: keys and wheel zoom
  useEffect(() => {
    if (!isLightboxOpen) return;
    const step = (delta: number) => {
      setLightboxIndex((i) => (i + delta + lightboxImages.length) % lightboxImages.length);
      setLightboxScale(1);
      setLightboxPosition({ x: 0, y: 0 });
    };
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', handler);
    const img = imgRef.current;
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      setLightboxScale((s) => Math.max(0.5, Math.min(5, s + (e.deltaY > 0 ? -0.3 : 0.3))));
    };
    img?.addEventListener('wheel', wheelHandler, { passive: false });
    return () => {
      window.removeEventListener('keydown', handler);
      img?.removeEventListener('wheel', wheelHandler);
    };
  }, [isLightboxOpen, lightboxImages.length]);

  return (
    <section id="projects" className="py-24 px-6 sm:px-10 lg:px-16 bg-editorial-cream text-left">
      <div className="max-w-[1440px] mx-auto">
        {/* Heading and category tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div>
            <h2 className="font-serif font-medium tracking-tight text-4xl sm:text-5xl text-editorial-charcoal mb-3">
              Projects
            </h2>
            <p className="text-base text-neutral-600 max-w-xl leading-relaxed">
              Systems, dashboards and interfaces I&apos;ve built and designed. S-CORE&apos;s testing is documented in{' '}
              <button
                onClick={() => document.getElementById('qa')?.scrollIntoView({ behavior: 'smooth' })}
                className="underline underline-offset-4 text-editorial-charcoal hover:text-editorial-accent-text cursor-pointer"
              >
                the test report
              </button>
              .
            </p>
          </div>

          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-x-6 gap-y-1 border-b border-neutral-300">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setShowAll(false); }}
                  aria-pressed={active}
                  className={`min-h-[44px] -mb-px border-b-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    active
                      ? 'border-editorial-charcoal text-editorial-charcoal'
                      : 'border-transparent text-neutral-600 hover:text-editorial-charcoal'
                  }`}
                >
                  {cat} <span className="font-normal">({counts[cat] ?? 0})</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} of {inCategory.length} projects
        </p>

        {/* Project grid */}
        {inCategory.length === 0 ? (
          <div className="py-16 border border-dashed border-neutral-400 text-center">
            <p className="text-base text-neutral-600">No projects in this category yet.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-3 underline underline-offset-4 text-editorial-charcoal cursor-pointer"
            >
              Show all projects
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
            <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, cardIndex) => (
              <motion.li
                key={project.id}
                layout={!reduceMotion}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: Math.min(cardIndex % 6, 5) * 0.03 }}
                className="min-w-0"
              >
                <button
                  onClick={() => setActiveProject(project)}
                  className="group block w-full text-left cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border border-neutral-300 bg-editorial-panel">
                    {project.images && project.images.length > 0 ? (
                      <img
                        src={project.images[0]}
                        alt=""
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        style={{ height: '100%', maxWidth: 'none' }}
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                        <span className="font-serif italic text-xl text-neutral-600">
                          {project.pdfUrl ? 'PDF portfolio' : project.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4 font-mono text-xs uppercase tracking-wider text-neutral-600">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="mt-2 font-serif font-semibold text-2xl leading-tight text-editorial-charcoal group-hover:underline underline-offset-4 decoration-1">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-base text-neutral-600 leading-snug">{project.subtitle}</p>
                  <p className="mt-3 font-mono text-xs text-neutral-600 leading-relaxed">
                    {project.tags.slice(0, 3).join(' · ')}
                    {project.tags.length > 3 ? ` · +${project.tags.length - 3}` : ''}
                  </p>
                </button>
              </motion.li>
            ))}
            </AnimatePresence>
          </ul>
        )}

        {inCategory.length > INITIAL_VISIBLE && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              aria-expanded={showAll}
              className="min-h-[44px] px-6 border border-editorial-charcoal font-mono text-xs font-bold uppercase tracking-widest text-editorial-charcoal hover:bg-editorial-charcoal hover:text-editorial-cream transition-colors cursor-pointer"
            >
              {showAll ? 'Show fewer' : `Show all ${inCategory.length} projects`}
            </button>
          </div>
        )}

        {/* Project drawer */}
        <AnimatePresence>
          {activeProject && (
            <div
              className="fixed inset-0 z-50 flex justify-end"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-drawer-title"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setActiveProject(null)}
                className="absolute inset-0 bg-black/60 cursor-pointer"
              />
              <motion.div
                ref={drawerRef}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-2xl h-full bg-editorial-cream border-l border-neutral-300 shadow-2xl flex flex-col"
              >
                <div className="overflow-y-auto p-6 sm:p-10 flex-1">
                  <div className="flex justify-between items-center gap-4 mb-8">
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">{activeProject.category}</span>
                    <button
                      data-autofocus
                      onClick={() => setActiveProject(null)}
                      className="min-h-[44px] inline-flex items-center gap-2 px-4 border border-neutral-400 font-mono text-xs font-bold uppercase tracking-wider text-editorial-charcoal hover:bg-neutral-100 cursor-pointer"
                    >
                      <X size={14} /> Close
                    </button>
                  </div>

                  <h2 id="project-drawer-title" className="font-serif font-medium text-4xl text-editorial-charcoal tracking-tight mb-2">
                    {activeProject.title}
                  </h2>
                  <p className="font-serif italic text-lg text-neutral-600 mb-8">{activeProject.subtitle}</p>

                  <dl className="grid grid-cols-3 gap-4 border-y border-neutral-300 py-4 mb-8">
                    {[
                      ['Year', activeProject.year],
                      ['Role', activeProject.role],
                      ['Status', activeProject.status === 'ongoing' ? 'Ongoing' : 'Finished'],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="font-mono text-xs uppercase tracking-wider text-neutral-600 mb-1">{label}</dt>
                        <dd className="text-base text-editorial-charcoal font-medium leading-snug">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="whitespace-pre-line text-base leading-relaxed text-neutral-700 mb-10 max-w-prose">
                    {activeProject.longDescription || activeProject.description}
                  </p>

                  {activeProject.images && activeProject.images.length > 0 ? (
                    <div className="mb-10">
                      <Gallery key={activeProject.id} project={activeProject} onOpen={openLightbox} />
                    </div>
                  ) : activeProject.pdfUrl ? (
                    <div className="mb-10 border border-neutral-300 bg-white">
                      <object data={activeProject.pdfUrl} type="application/pdf" className="w-full min-h-[50dvh] max-h-[80dvh]">
                        <p className="p-4 text-base text-neutral-600">
                          PDF preview unavailable.{' '}
                          <a href={activeProject.pdfUrl} target="_blank" rel="noopener noreferrer" className="underline text-editorial-charcoal">
                            Open the PDF
                          </a>
                        </p>
                      </object>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-600 mb-3">Built with</h3>
                    <ul className="flex flex-wrap gap-2">
                      {activeProject.tags.map((tag) => (
                        <li key={tag} className="font-mono text-xs border border-neutral-400 px-3 py-1.5 text-neutral-700">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {(activeProject.links.live || activeProject.links.github || activeProject.links.canva) && (
                  <div className="p-6 sm:p-10 border-t border-neutral-300 bg-editorial-panel flex flex-wrap items-center gap-3">
                    {activeProject.links.live && (
                      <a
                        href={activeProject.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] flex-1 px-6 bg-editorial-charcoal text-editorial-cream font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:bg-neutral-800"
                      >
                        Open live project <ExternalLink size={14} />
                      </a>
                    )}
                    {activeProject.links.github && (
                      <a
                        href={activeProject.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] px-6 border border-editorial-charcoal text-editorial-charcoal font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:bg-editorial-charcoal hover:text-editorial-cream"
                      >
                        Repository <Github size={14} />
                      </a>
                    )}
                    {activeProject.links.canva && (
                      <a
                        href={activeProject.links.canva}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] px-6 border border-editorial-charcoal text-editorial-charcoal font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:bg-editorial-charcoal hover:text-editorial-cream"
                      >
                        View on Canva <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Image lightbox */}
        <AnimatePresence>
          {isLightboxOpen && lightboxImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="focus-dark fixed inset-0 z-[100] flex items-center justify-center bg-black/90 select-none"
              role="dialog"
              aria-modal="true"
              aria-label="Enlarged screenshot"
              onClick={() => setIsLightboxOpen(false)}
            >
              <div className="relative flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close image viewer"
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                >
                  <X size={20} />
                </button>

                {lightboxImages.length > 1 && (
                  <span className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 px-3 py-1 rounded-full bg-black/60 text-white font-mono text-xs font-bold">
                    {lightboxIndex + 1} / {lightboxImages.length}
                  </span>
                )}

                {lightboxImages.length > 1 && (
                  <>
                    <button
                      onClick={() => {
                        setLightboxIndex((i) => (i === 0 ? lightboxImages.length - 1 : i - 1));
                        setLightboxScale(1);
                        setLightboxPosition({ x: 0, y: 0 });
                      }}
                      className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setLightboxIndex((i) => (i === lightboxImages.length - 1 ? 0 : i + 1));
                        setLightboxScale(1);
                        setLightboxPosition({ x: 0, y: 0 });
                      }}
                      className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                      aria-label="Next image"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </>
                )}

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-2 rounded-full bg-black/70 text-white">
                  <button
                    onClick={() => setLightboxScale((s) => Math.max(0.5, s - 0.5))}
                    className="w-11 h-11 flex items-center justify-center hover:text-neutral-300 cursor-pointer"
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="font-mono text-xs min-w-[44px] text-center font-bold select-none">{Math.round(lightboxScale * 100)}%</span>
                  <button
                    onClick={() => setLightboxScale((s) => Math.min(5, s + 0.5))}
                    className="w-11 h-11 flex items-center justify-center hover:text-neutral-300 cursor-pointer"
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="flex items-center justify-center w-full h-full p-4 sm:p-8 md:p-16"
                  onPointerDown={(e) => {
                    if (lightboxScale > 1) {
                      setIsDragging(true);
                      dragStart.current = { x: e.clientX, y: e.clientY };
                      posStart.current = { ...lightboxPosition };
                      dragMoved.current = false;
                      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
                    }
                  }}
                  onPointerMove={(e) => {
                    if (isDragging) {
                      const dx = e.clientX - dragStart.current.x;
                      const dy = e.clientY - dragStart.current.y;
                      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragMoved.current = true;
                      setLightboxPosition({ x: posStart.current.x + dx, y: posStart.current.y + dy });
                    }
                  }}
                  onPointerUp={() => setIsDragging(false)}
                  style={{ cursor: lightboxScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'pointer' }}
                >
                  <img
                    ref={imgRef}
                    src={lightboxImages[lightboxIndex]}
                    alt={`Enlarged screenshot ${lightboxIndex + 1}`}
                    style={{
                      transform: `scale(${lightboxScale}) translate(${lightboxPosition.x / lightboxScale}px, ${lightboxPosition.y / lightboxScale}px)`,
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                    className="select-none"
                    draggable={false}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!dragMoved.current) {
                        setLightboxScale(lightboxScale === 1 ? 2 : 1);
                        setLightboxPosition({ x: 0, y: 0 });
                      }
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

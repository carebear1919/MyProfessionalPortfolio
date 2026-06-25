import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  FileText, 
  Download, 
  Layers, 
  Terminal, 
  Cpu,
  Globe,
  Database,
  Smartphone,
  Server,
  Code,
  Flame,
  TrendingUp,
  Workflow,
  Image,
  Palette,
  Brush,
  FileSpreadsheet,
  GitCommit,
  Calendar,
  GitBranch,
  Coffee,
  Grid,
  PenTool,
  Play
} from 'lucide-react';
import { experienceTimeline, skillCategories } from '../data';

interface AboutProps {
  onOpenResume: () => void;
}

export default function About({ onOpenResume }: AboutProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Stats definition matching checklist
  const stats = [
    { value: '2', label: 'dashboards built' },
    { value: '19', label: 'process steps mapped' },
    { value: '4+', label: 'years design & build' },
    { value: '12+', label: 'projects shipped' }
  ];

  // Info Tiles matching checklist
  const infoTiles = [
    { label: 'Education', value: 'Graduating IT Student' },
    { label: 'Scholarship', value: 'DOST Merit Scholar' },
    { label: 'Major Stack', value: 'React & TypeScript' },
    { label: 'Focus Area', value: 'Sys Automation & UX' }
  ];

  // Helper to map skill names to Lucide icons
  const getSkillIcon = (name: string) => {
    const lowercaseName = name.toLowerCase();
    
    if (lowercaseName.includes('react')) return <Globe size={14} />;
    if (lowercaseName.includes('typescript')) return <Code size={14} />;
    if (lowercaseName.includes('javascript')) return <Terminal size={14} />;
    if (lowercaseName.includes('html5') || lowercaseName.includes('css3')) return <Layers size={14} />;
    if (lowercaseName.includes('flutter') || lowercaseName.includes('dart')) return <Smartphone size={14} />;
    if (lowercaseName.includes('node') || lowercaseName.includes('express')) return <Server size={14} />;
    if (lowercaseName.includes('php')) return <Globe size={14} />;
    if (lowercaseName.includes('asp.net') || lowercaseName.includes('c#')) return <Cpu size={14} />;
    if (lowercaseName.includes('java') && !lowercaseName.includes('script')) return <Coffee size={14} />;
    if (lowercaseName.includes('python')) return <Terminal size={14} />;
    if (lowercaseName.includes('bootstrap')) return <Grid size={14} />;
    
    if (lowercaseName.includes('figma')) return <PenTool size={14} />;
    if (lowercaseName.includes('git')) return <GitBranch size={14} />;
    if (lowercaseName.includes('postgres') || lowercaseName.includes('sql') && !lowercaseName.includes('lite')) return <Database size={14} />;
    if (lowercaseName.includes('mongo')) return <Database size={14} />;
    if (lowercaseName.includes('firebase')) return <Flame size={14} />;
    if (lowercaseName.includes('superset')) return <TrendingUp size={14} />;
    if (lowercaseName.includes('power automate')) return <Workflow size={14} />;
    if (lowercaseName.includes('sqlite')) return <Database size={14} />;
    if (lowercaseName.includes('vs code')) return <Code size={14} />;
    
    if (lowercaseName.includes('photoshop')) return <Image size={14} />;
    if (lowercaseName.includes('illustrator')) return <PenTool size={14} />;
    if (lowercaseName.includes('canva')) return <Palette size={14} />;
    if (lowercaseName.includes('animate')) return <Play size={14} />;
    if (lowercaseName.includes('paint')) return <Brush size={14} />;
    if (lowercaseName.includes('excel')) return <FileSpreadsheet size={14} />;
    if (lowercaseName.includes('draw.io')) return <GitCommit size={14} />;
    if (lowercaseName.includes('planner')) return <Calendar size={14} />;

    return <Code size={14} />;
  };

  return (
    <section id="about" className="py-24 px-6 sm:px-10 lg:px-16 border-t border-neutral-200 dark:border-neutral-900 bg-editorial-cream dark:bg-editorial-charcoal transition-colors duration-500 text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading Row */}
        <div className="border-b border-neutral-200 dark:border-neutral-900 pb-10 mb-16">
          <span className="font-mono text-[10px] tracking-[0.4em] text-neutral-500 dark:text-neutral-400 uppercase block mb-2">
            OPERATIONAL HISTORY
          </span>
          <h2 className="font-serif font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl text-editorial-charcoal dark:text-editorial-cream mb-3">
            Core Architecture
          </h2>
          <p className="text-xs sm:text-[13px] font-sans font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            DOST Merit Scholar &bull; 4+ yrs building production systems
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-neutral-200 dark:border-neutral-900 divide-x divide-y lg:divide-y-0 divide-neutral-200 dark:divide-neutral-900 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-8 flex flex-col justify-between min-h-[140px] group hover:bg-neutral-50 dark:hover:bg-neutral-950 transition-colors duration-300">
              <span className="text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-450">
                {stat.label}
              </span>
              <span className="text-3xl sm:text-4xl font-serif italic font-bold text-editorial-charcoal dark:text-editorial-cream group-hover:translate-x-1 transition-transform duration-300">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Operational Narrative and Journey */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          
          {/* Narrative Paragraphs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-900 pb-4 mb-4">
              <span className="text-neutral-500 dark:text-neutral-400 font-serif italic text-sm">01 / Practice</span>
              <h3 className="font-serif font-bold text-xl text-editorial-charcoal dark:text-editorial-cream uppercase tracking-tight">
                Design Logic
              </h3>
            </div>
            
            <p className="font-sans font-light text-sm sm:text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
              I architect and ship interaction-driven UI systems &mdash; from responsive design ecosystems to real-time data interfaces &mdash; using modern React and TypeScript architecture with production-secure foundations.
            </p>
            <p className="font-sans font-light text-sm sm:text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
              My practice is rooted in systems thinking and deliberate interaction design, preferring to write type-safe React components and configure live data pipelines over any drag-and-drop abstraction layer.
            </p>
            <p className="font-sans font-light text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 italic">
              Every interface I ship is built to be responsive, accessible, and automation-ready &mdash; from the first component tree to the final deploy.
            </p>

            <div className="pt-6">
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-editorial-charcoal dark:text-editorial-cream border border-neutral-300 dark:border-neutral-700 px-5 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-950 transition-all cursor-pointer focus:outline-none"
              >
                <FileText size={14} /> Download Resume <Download size={12} />
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-900 pb-4 mb-4">
              <span className="text-neutral-500 dark:text-neutral-400 font-serif italic text-sm">02 / Matrix</span>
              <h3 className="font-serif font-bold text-xl text-editorial-charcoal dark:text-editorial-cream uppercase tracking-tight">
                Career Matrix
              </h3>
            </div>

            <div className="relative pl-6 border-l border-neutral-200 dark:border-neutral-900 space-y-10">
              {experienceTimeline.map((entry, idx) => (
                <div key={entry.id} className="relative group">
                  {/* Decorative timeline bullet */}
                  <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-editorial-cream dark:bg-editorial-charcoal group-hover:bg-editorial-charcoal dark:group-hover:bg-editorial-cream group-hover:scale-110 transition-all duration-300" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <h4 className="font-serif font-bold text-base text-editorial-charcoal dark:text-editorial-cream leading-tight">
                      {entry.role}
                    </h4>
                    <span className="font-mono text-[10.5px] text-neutral-500 dark:text-neutral-400 whitespace-nowrap font-bold">
                      {entry.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-[10.5px] text-neutral-500 dark:text-neutral-400 font-bold mb-3 uppercase">
                    <span>{entry.company}</span>
                    <span>&bull;</span>
                    <span className="px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-500">
                      {entry.tag}
                    </span>
                  </div>

                  <ul className="space-y-1.5">
                    {entry.description.map((bullet, bIdx) => (
                      <li key={bIdx} className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed flex items-start gap-1.5 font-medium">
                        <span className="text-editorial-charcoal dark:text-editorial-cream select-none font-bold">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Tiles Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {infoTiles.map((tile, idx) => (
            <div key={idx} className="p-6 border border-neutral-200/80 dark:border-neutral-800 rounded-sm bg-neutral-100/[0.15] dark:bg-neutral-900/[0.15] flex flex-col justify-between min-h-[110px]">
              <span className="text-[10.5px] font-mono uppercase text-neutral-500 dark:text-neutral-400 tracking-wider font-bold">
                {tile.label}
              </span>
              <span className="text-xs sm:text-[13px] font-serif italic font-bold text-editorial-charcoal dark:text-editorial-cream">
                {tile.value}
              </span>
            </div>
          ))}
        </div>

        {/* Skills Section: Core Technology & Tooling Matrix */}
        <div className="space-y-10">
          <div className="border-b border-neutral-200 dark:border-neutral-900 pb-6">
            <span className="font-mono text-[10px] tracking-[0.4em] text-neutral-500 dark:text-neutral-400 uppercase block mb-2">
              SYSTEM CAPABILITIES
            </span>
            <h3 className="font-serif font-bold text-2xl text-editorial-charcoal dark:text-editorial-cream">
              Core Technology &amp; Tooling Matrix
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-light mt-2 max-w-2xl leading-relaxed">
              An active, continuous cycle of engineering stacks, design software ecosystems, and automation environments. Hover over individual nodes to inspect configurations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {skillCategories.map((category, index) => {
              const formattedIndex = String(index + 1).padStart(2, '0');
              return (
                <div key={category.id} className="p-8 border border-neutral-200 dark:border-neutral-900 rounded-sm bg-white/40 dark:bg-neutral-900/[0.05] space-y-6">
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-900 pb-3">
                    <h4 className="font-serif italic text-sm font-bold text-editorial-charcoal dark:text-editorial-cream flex items-center gap-2">
                      {category.id.includes('languages') ? <Terminal size={14} /> : category.id.includes('tools') ? <Cpu size={14} /> : <Layers size={14} />}
                      {category.title}
                    </h4>
                    <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 font-bold">
                      // {formattedIndex}
                    </span>
                  </div>

                  {/* Monochromatic minimalist tech stack cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.skills.map((skill) => {
                      const isHovered = hoveredSkill === skill.name;
                      return (
                        <div
                          key={skill.name}
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className="group relative cursor-help"
                        >
                          <div className="p-3 border border-neutral-200/80 dark:border-neutral-800 rounded bg-white dark:bg-neutral-950/40 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 flex items-center gap-2.5 min-h-[50px] shadow-sm">
                            <div className="p-1.5 rounded bg-neutral-50 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 group-hover:bg-gradient-to-br group-hover:from-blue-500/10 group-hover:to-violet-500/10 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-all duration-300 flex-shrink-0">
                              {getSkillIcon(skill.name)}
                            </div>
                            <span className="font-sans text-[11px] font-bold text-editorial-charcoal dark:text-editorial-cream leading-tight">
                              {skill.name}
                            </span>
                          </div>

                          {/* Hover tooltip explanation */}
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                transition={{ duration: 0.15 }}
                                className="absolute left-0 right-0 bottom-full mb-2 z-30 p-3 bg-neutral-950 text-white dark:bg-neutral-50 dark:text-neutral-950 text-[10px] font-mono rounded border border-neutral-800 dark:border-neutral-200 shadow-xl leading-relaxed"
                              >
                                {skill.description}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

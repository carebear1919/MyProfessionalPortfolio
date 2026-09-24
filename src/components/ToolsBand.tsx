import { useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import {
  Layers, Terminal, Cpu, Globe, Database, Smartphone, Server, Code, Flame, TrendingUp, Workflow, Image, Palette,
  Brush, FileSpreadsheet, GitCommit, Calendar, GitBranch, Coffee, Grid, PenTool, Play, Pause,
} from 'lucide-react';
import { skillCategories } from '../data';
import { useOnScreen } from './useSeenOnce';

function skillIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes('react')) return Globe;
  if (n.includes('typescript')) return Code;
  if (n.includes('javascript')) return Terminal;
  if (n.includes('html5') || n.includes('css3')) return Layers;
  if (n.includes('flutter') || n.includes('dart')) return Smartphone;
  if (n.includes('node') || n.includes('express')) return Server;
  if (n.includes('php')) return Globe;
  if (n.includes('asp.net') || n.includes('c#')) return Cpu;
  if (n.includes('java') && !n.includes('script')) return Coffee;
  if (n.includes('python')) return Terminal;
  if (n.includes('bootstrap')) return Grid;
  if (n.includes('figma')) return PenTool;
  if (n.includes('git')) return GitBranch;
  if (n.includes('sqlite')) return Database;
  if (n.includes('postgres') || n.includes('sql')) return Database;
  if (n.includes('mongo')) return Database;
  if (n.includes('firebase')) return Flame;
  if (n.includes('superset')) return TrendingUp;
  if (n.includes('power automate')) return Workflow;
  if (n.includes('vs code')) return Code;
  if (n.includes('photoshop')) return Image;
  if (n.includes('illustrator')) return PenTool;
  if (n.includes('canva')) return Palette;
  if (n.includes('animate')) return Play;
  if (n.includes('paint')) return Brush;
  if (n.includes('excel')) return FileSpreadsheet;
  if (n.includes('draw.io')) return GitCommit;
  if (n.includes('planner')) return Calendar;
  return Code;
}

// One ticker row per category. Rows alternate direction; the real list is read once, the loop copy is hidden.
export default function ToolsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const reduceMotion = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const running = playing && onScreen && !reduceMotion;

  return (
    <div ref={ref} data-running={running} className="tools-band space-y-8">
      <div className="flex items-end justify-between gap-4 border-b border-neutral-300 pb-4">
        <h3 className="font-serif font-medium text-3xl sm:text-4xl text-editorial-charcoal">Tools</h3>
        {!reduceMotion && (
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={!playing}
            className="min-h-[44px] inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-editorial-charcoal cursor-pointer"
          >
            {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            {playing ? 'Pause' : 'Play'}
          </button>
        )}
      </div>

      <div className="space-y-10">
        {skillCategories.map((category, rowIndex) => {
          const items = category.skills;
          const renderItems = () =>
            items.map((skill) => {
              const Icon = skillIcon(skill.name);
              return (
                <li key={skill.name} className="inline-flex items-center gap-3 whitespace-nowrap font-serif text-2xl text-editorial-charcoal">
                  <Icon size={20} className="text-neutral-600 flex-shrink-0" aria-hidden="true" />
                  {skill.name}
                </li>
              );
            });
          return (
            <div key={category.id} className="tools-row">
              <h4 className="font-serif italic text-xl font-semibold text-neutral-700 mb-4">{category.title}</h4>
              <div className="overflow-hidden tools-mask">
                <div
                  className="tools-track flex w-max"
                  data-reverse={rowIndex % 2 === 1}
                  style={{ ['--tools-duration' as string]: `${items.length * 3.6}s` }}
                >
                  <ul className="flex flex-shrink-0 items-center gap-x-12 pr-12 tools-list">{renderItems()}</ul>
                  <ul className="flex flex-shrink-0 items-center gap-x-12 pr-12 tools-dup" aria-hidden="true">{renderItems()}</ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

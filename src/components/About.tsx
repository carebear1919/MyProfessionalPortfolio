import { useState } from 'react';
import { FileText, Download, PenTool, Code, ShieldCheck } from 'lucide-react';
import { experienceTimeline } from '../data';
import ToolsBand from './ToolsBand';

interface AboutProps {
  onOpenResume: () => void;
}

export default function About({ onOpenResume }: AboutProps) {
  const [storyOpen, setStoryOpen] = useState(false);
  const [openExp, setOpenExp] = useState<string | null>(null);

  const workModes = [
    { icon: Code, title: 'Build', line: 'Full-stack apps, shipped to production.', tags: ['React', 'Node.js', 'MongoDB'] },
    { icon: ShieldCheck, title: 'Test', line: 'Find the bugs before users do.', tags: ['Functional', 'Data validation', 'RBAC'] },
    { icon: PenTool, title: 'Design', line: 'Interfaces people can actually use.', tags: ['Figma', 'UI/UX', 'Branding'] },
  ];

  const qaStory = "During my internship at SM Investments Corporation, I found that the work I cared about most was making sure what we built actually worked \u2014 executing data validation checkpoints across Scrum sprints, identifying discrepancies between expected and actual data behavior, and ensuring zero integrity issues reached production. That experience, combined with end-to-end functional testing of the RBAC system in my capstone project, solidified my direction: I want to apply my development background to quality assurance. As someone who has written production code in React, Node.js, and MongoDB, I know how bugs get introduced \u2014 and that makes me better at finding them. I'm currently pursuing QA roles where I can bring a developer's intuition to a testing team.";

  // Split 'Label: detail' bullets so the timeline can show scannable labels first
  const splitBullet = (b: string) => {
    const idx = b.indexOf(': ');
    return idx > 0 && idx < 45 ? { label: b.slice(0, idx) as string | null, text: b.slice(idx + 2) } : { label: null as string | null, text: b };
  };

  return (
    <section id="about" className="py-24 px-6 sm:px-10 lg:px-16 border-t border-neutral-300 bg-editorial-cream text-left">
      <div className="max-w-[1440px] mx-auto space-y-24">

        <div className="max-w-2xl">
          <h2 className="font-serif font-medium tracking-tight text-4xl sm:text-5xl text-editorial-charcoal mb-4">
            About
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Developer turned QA. Here is the path that got me testing what I build.
          </p>
        </div>

        {/* Build / Test / Design */}
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 border-t border-neutral-300 pt-10">
            {workModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <div key={mode.title}>
                  <Icon size={22} className="text-editorial-charcoal mb-4" />
                  <h3 className="font-serif font-semibold text-2xl text-editorial-charcoal mb-2">{mode.title}</h3>
                  <p className="text-base text-neutral-600 leading-relaxed mb-3">{mode.line}</p>
                  <p className="font-mono text-xs text-neutral-600">{mode.tags.join(' · ')}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-editorial-accent/15 border border-neutral-300 p-8 sm:p-10">
            <p className="font-serif italic text-2xl sm:text-3xl leading-snug text-editorial-charcoal max-w-3xl">
              &ldquo;I know how bugs get introduced &mdash; so I&apos;m better at finding them.&rdquo;
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-1">
              <button
                onClick={() => setStoryOpen((v) => !v)}
                aria-expanded={storyOpen}
                className="min-h-[44px] font-mono text-xs font-bold uppercase tracking-widest text-editorial-charcoal underline underline-offset-4 cursor-pointer"
              >
                {storyOpen ? 'Hide my story' : 'Read my story'}
              </button>
              <button
                onClick={onOpenResume}
                className="min-h-[44px] inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-editorial-charcoal cursor-pointer"
              >
                <FileText size={14} /> Resume <Download size={12} />
              </button>
            </div>
            {storyOpen && (
              <p className="mt-4 text-base leading-relaxed text-neutral-700 max-w-3xl">{qaStory}</p>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-8">
          <h3 className="font-serif font-medium text-3xl sm:text-4xl text-editorial-charcoal border-b border-neutral-300 pb-4">
            Experience
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-12">
            {experienceTimeline.map((entry) => {
              const open = openExp === entry.id;
              const parsed = entry.description.map(splitBullet);
              return (
                <article key={entry.id} className="flex flex-col">
                  <p className="font-mono text-xs uppercase tracking-wider text-neutral-600 mb-3">
                    {entry.period} &middot; {entry.tag}
                  </p>
                  <h4 className="font-serif font-semibold text-2xl text-editorial-charcoal leading-tight">{entry.role}</h4>
                  <p className="text-base text-neutral-600 mt-1 mb-5">{entry.company}</p>

                  <ul className="space-y-2.5 flex-grow">
                    {parsed.map((b, i) => (
                      <li key={i} className="text-base leading-snug text-neutral-700">
                        {b.label ? <strong className="font-semibold text-editorial-charcoal">{b.label}</strong> : null}
                        {(open || !b.label) && b.text ? (
                          <span className={b.label ? 'block mt-1 text-sm text-neutral-600' : ''}>{b.text}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>

                  {parsed.some((b) => b.label) && (
                    <button
                      onClick={() => setOpenExp(open ? null : entry.id)}
                      aria-expanded={open}
                      className="mt-3 self-start min-h-[44px] font-mono text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-editorial-charcoal underline underline-offset-4 cursor-pointer"
                    >
                      {open ? 'Hide details' : 'Show details'}
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        <ToolsBand />

      </div>
    </section>
  );
}

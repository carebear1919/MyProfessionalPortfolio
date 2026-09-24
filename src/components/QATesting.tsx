import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ShieldCheck, FileText, ExternalLink, X, Check, RotateCcw } from 'lucide-react';
import { useSeenOnce } from './useSeenOnce';

const qaCards = [
  {
    company: 'SCO Capstone',
    period: '2024 – 2026',
    docUrl: 'https://docs.google.com/document/d/1BgrVrLE8VWt0hEwWfkfQ9a7_7kZh2yquthRd0JHezEk/edit?usp=sharing',
    title: 'RBAC Functional Testing',
    type: ['Functional Testing', 'Security Testing', 'Test Case Design'],
    icon: ShieldCheck,
    body: 'Designed and ran 10 test cases for login, role-based access (Admin, Requester, Unit) and request routing, including URL tampering and access to other users\' requests. 9 passed and 1 failed: a wrong-password login showed no error message (BUG-001).',
  },
];

// Turn a Google Docs/Sheets/Drive share link into its embeddable /preview form; other URLs (e.g. hosted PDFs) pass through
function toEmbedUrl(url: string) {
  const m = url.match(/^(https:\/\/docs\.google\.com\/(?:document|spreadsheets)\/d\/[^/]+)/);
  if (m) return `${m[1]}/preview`;
  const d = url.match(/^https:\/\/drive\.google\.com\/file\/d\/([^/]+)/);
  if (d) return `https://drive.google.com/file/d/${d[1]}/preview`;
  return url;
}


// The real S-CORE results from the test report (10 cases; TC-02 failed and became BUG-001)
const TEST_RUN = [
  { id: 'TC-01', name: 'Login with valid Admin credentials', pass: true },
  { id: 'TC-02', name: 'Login with wrong password', pass: false },
  { id: 'TC-03', name: 'Access a protected page while logged out', pass: true },
  { id: 'TC-04', name: 'Admin can access all modules', pass: true },
  { id: 'TC-05', name: 'Requester cannot access Admin panel via URL', pass: true },
  { id: 'TC-06', name: "Requester cannot see other users' requests", pass: true },
  { id: 'TC-07', name: 'Unit cannot delete requests', pass: true },
  { id: 'TC-08', name: 'Requester submits a new request', pass: true },
  { id: 'TC-09', name: 'Request routes to the correct Unit', pass: true },
  { id: 'TC-10', name: 'Status updates reach the Requester', pass: true },
];

// Plays the test run once when it scrolls into view: a cursor steps down the list and each case resolves
function TestRun() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useSeenOnce(ref, 0.45);
  const reduceMotion = useReducedMotion();
  const total = TEST_RUN.length;
  const [done, setDone] = useState(0);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setDone(total);
      return;
    }
    if (!seen) return;
    setDone(0);
    let step = 0;
    let timer = 0;
    const tick = () => {
      step += 1;
      setDone(step);
      if (step < total) timer = window.setTimeout(tick, TEST_RUN[step - 1].pass ? 300 : 850);
    };
    timer = window.setTimeout(tick, 450);
    return () => window.clearTimeout(timer);
  }, [seen, reduceMotion, runId, total]);

  const finished = done >= total;
  const passed = TEST_RUN.filter((t) => t.pass).length;
  const failed = total - passed;

  return (
    <div ref={ref} className="border border-neutral-300 bg-white/60 text-left flex flex-col">
      <div className="px-5 py-4 border-b border-neutral-300 flex items-baseline justify-between gap-4">
        <h3 className="font-serif font-semibold text-xl text-editorial-charcoal">S-CORE test run</h3>
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">{total} cases</span>
      </div>

      <ol className="flex-grow">
        {TEST_RUN.map((t, i) => {
          const state = i < done ? (t.pass ? 'pass' : 'fail') : i === done && !finished ? 'run' : 'wait';
          return (
            <li key={t.id} className="relative grid grid-cols-[3.75rem_1fr_auto] items-center gap-3 px-5 py-2.5 border-b border-neutral-200 last:border-b-0">
              {state === 'run' && (
                <motion.span
                  layoutId="test-run-cursor"
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-editorial-accent/20"
                  aria-hidden="true"
                />
              )}
              <span className="relative font-mono text-xs text-neutral-600">{t.id}</span>
              <span className={`relative text-sm sm:text-[15px] leading-snug ${state === 'wait' ? 'text-neutral-600' : 'text-editorial-charcoal'}`}>
                {t.name}
              </span>
              <span className="relative min-w-[4.5rem] flex justify-end">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={state}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className={`inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider ${
                      state === 'fail' ? 'text-red-800' : state === 'pass' ? 'text-editorial-charcoal' : 'text-neutral-600'
                    }`}
                  >
                    {state === 'pass' && <Check size={13} aria-hidden="true" />}
                    {state === 'fail' && <X size={13} aria-hidden="true" />}
                    {state === 'pass' ? 'Pass' : state === 'fail' ? 'Fail' : state === 'run' ? 'Run' : '\u2014'}
                  </motion.span>
                </AnimatePresence>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="px-5 py-4 border-t border-neutral-300 flex flex-wrap items-center justify-between gap-3 min-h-[68px]" aria-live="polite">
        <p className="text-sm sm:text-[15px] text-editorial-charcoal">
          {finished
            ? `${total} run \u00b7 ${passed} passed \u00b7 ${failed} failed \u00b7 BUG-001 logged`
            : seen
            ? 'Running\u2026'
            : 'Scroll to run'}
        </p>
        {finished && !reduceMotion && (
          <button
            onClick={() => setRunId((r) => r + 1)}
            className="min-h-[44px] inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-editorial-charcoal underline underline-offset-4 cursor-pointer"
          >
            <RotateCcw size={13} aria-hidden="true" /> Replay
          </button>
        )}
      </div>
    </div>
  );
}

export default function QATesting() {
  const [viewer, setViewer] = useState<{ title: string; url: string } | null>(null);

  useEffect(() => {
    if (!viewer) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setViewer(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewer]);

  return (
    <section id="qa" className="py-24 px-6 sm:px-10 lg:px-16 border-t border-neutral-300 bg-editorial-cream text-center">
      <div className="max-w-[1440px] mx-auto">
        <div className="border-b border-neutral-300 pb-10 mb-12">
          <h2 className="font-serif font-medium tracking-tight text-4xl sm:text-5xl text-editorial-charcoal mb-4">
            QA &amp; Testing Work
          </h2>
          <p className="text-base text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Here is how I tested S-CORE, the request-and-approval system from my featured projects: 10 test cases covering login, role-based access and request routing, with the results and the one bug I found.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto gap-6 items-stretch">
          {qaCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group p-8 border border-neutral-300 rounded-sm bg-white/60 hover:border-neutral-400 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-2 rounded bg-neutral-100 text-neutral-600 group-hover:text-editorial-charcoal transition-colors duration-300">
                    <Icon size={18} />
                  </div>
                </div>

                <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-600 block mb-1.5">
                  {card.company} &middot; {card.period}
                </span>
                <h3 className="font-serif font-bold text-xl text-editorial-charcoal mb-4 leading-tight">
                  {card.title}
                </h3>

                <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                  {card.type.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-600 border border-neutral-300 rounded-full px-2.5 py-0.5 bg-neutral-50/60 "
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="font-sans text-[15px] leading-relaxed text-neutral-600 ">
                  {card.body}
                </p>

                {card.docUrl && (
                  <button
                    onClick={() => setViewer({ title: card.title, url: card.docUrl })}
                    className="mt-6 self-center inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-editorial-charcoal border border-neutral-400 hover:bg-editorial-charcoal hover:text-editorial-cream rounded-full px-4 py-2 transition-all cursor-pointer focus:outline-none"
                  >
                    <FileText size={14} /> View test cases
                  </button>
                )}
              </div>
            );
          })}
          <TestRun />
        </div>

        <p className="mt-10 text-base text-neutral-600">
          Want to test the portfolio itself?{' '}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggleTestMode', { detail: true }))}
            className="min-h-[44px] underline underline-offset-4 text-editorial-charcoal hover:text-editorial-accent-text cursor-pointer"
          >
            Run the tab-order check on this page
          </button>
          .
        </p>
      </div>

      {viewer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`${viewer.title} test report`}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setViewer(null)} />
          <div className="relative w-full max-w-4xl h-[88dvh] bg-editorial-cream border border-neutral-300 rounded-lg shadow-2xl flex flex-col overflow-hidden">
            <div className="px-5 py-3 border-b border-neutral-300 flex items-center justify-between gap-3 bg-editorial-panel">
              <div className="min-w-0">
                <h3 className="font-serif font-bold text-lg text-editorial-charcoal truncate">{viewer.title}</h3>
                <p className="font-mono text-xs uppercase tracking-wider text-neutral-600">Test cases &amp; execution report</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={viewer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-neutral-400 font-mono text-xs uppercase text-editorial-charcoal hover:bg-white transition-colors"
                >
                  <ExternalLink size={12} /> Open in new tab
                </a>
                <button
                  onClick={() => setViewer(null)}
                  className="p-1.5 rounded-sm border border-neutral-400 text-neutral-600 hover:bg-white cursor-pointer focus:outline-none"
                  aria-label="Close viewer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <iframe
              src={toEmbedUrl(viewer.url)}
              title={viewer.title}
              className="flex-grow w-full border-none bg-white"
              loading="lazy"
              allow="fullscreen"
            />
          </div>
        </div>
      )}
    </section>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// A tab-order check for the page itself: numbered badges on every keyboard stop, the path between them,
// and dashed outlines around the page's landmarks. Opened from the Quality section or the footer.

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]';

interface Stop {
  n: number;
  x: number;
  y: number;
  fixed: boolean;
  visible: boolean;
  el: Element;
}

interface Landmark {
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  fixed: boolean;
}

function insideFixed(el: Element) {
  for (let e: Element | null = el; e && e !== document.body; e = e.parentElement) {
    if (getComputedStyle(e).position === 'fixed') return true;
  }
  return false;
}

function describe(el: Element) {
  const tag = el.tagName.toLowerCase();
  const name = el.getAttribute('aria-label') || (el.id ? `#${el.id}` : '');
  return name ? `${tag} ${name}` : tag;
}

export default function TestMode() {
  const [active, setActive] = useState(false);
  const [stops, setStops] = useState<Stop[]>([]);
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [counts, setCounts] = useState({ headings: 0 });
  const [activeEl, setActiveEl] = useState<Element | null>(null);
  const [docHeight, setDocHeight] = useState(0);
  const timer = useRef<number>(0);

  useEffect(() => {
    const toggle = (e: Event) => {
      const detail = (e as CustomEvent<boolean | undefined>).detail;
      setActive((a) => (typeof detail === 'boolean' ? detail : !a));
    };
    window.addEventListener('toggleTestMode', toggle);
    return () => window.removeEventListener('toggleTestMode', toggle);
  }, []);

  const scan = useCallback(() => {
    const focusables = [...document.querySelectorAll(FOCUSABLE)].filter((el) => {
      if (el.closest('[data-testmode], [aria-hidden="true"]')) return false;
      if (el.getAttribute('tabindex') === '-1') return false;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return false;
      return getComputedStyle(el).visibility !== 'hidden';
    });

    const next: Stop[] = focusables.map((el, i) => {
      const r = el.getBoundingClientRect();
      const fixed = insideFixed(el);
      return {
        n: i + 1,
        x: r.left + (fixed ? 0 : window.scrollX),
        y: r.top + (fixed ? 0 : window.scrollY),
        fixed,
        visible: r.width > 2 && r.height > 2,
        el,
      };
    });

    const lm: Landmark[] = [...document.querySelectorAll('header, nav, footer, section[id]')]
      .filter((el) => !el.closest('[data-testmode]'))
      .map((el) => {
        const r = el.getBoundingClientRect();
        const fixed = insideFixed(el);
        return {
          label: describe(el),
          x: r.left + (fixed ? 0 : window.scrollX),
          y: r.top + (fixed ? 0 : window.scrollY),
          w: r.width,
          h: r.height,
          fixed,
        };
      })
      .filter((l) => l.w > 0 && l.h > 0);

    setStops(next);
    setLandmarks(lm);
    setCounts({ headings: document.querySelectorAll('h1, h2, h3, h4').length });
    setDocHeight(document.documentElement.scrollHeight);
  }, []);

  // While active: scan now and whenever the layout or scroll position changes
  useEffect(() => {
    if (!active) return;
    const schedule = () => {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(scan, 160);
    };
    scan();
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, { passive: true });
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'hidden', 'aria-expanded'] });
    const ro = new ResizeObserver(schedule);
    ro.observe(document.documentElement);

    const onFocus = (e: FocusEvent) => setActiveEl(e.target as Element);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(false);
    };
    document.addEventListener('focusin', onFocus);
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer.current);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', schedule);
      mo.disconnect();
      ro.disconnect();
      document.removeEventListener('focusin', onFocus);
      window.removeEventListener('keydown', onKey);
      setActiveEl(null);
    };
  }, [active, scan]);

  if (!active) return null;

  const docStops = stops.filter((s) => !s.fixed && s.visible);
  const fixedStops = stops.filter((s) => s.fixed && s.visible);
  const path = docStops.map((s) => `${s.x},${s.y}`).join(' ');
  const docLandmarks = landmarks.filter((l) => !l.fixed);
  const fixedLandmarks = landmarks.filter((l) => l.fixed);

  const Badge = ({ s }: { s: Stop }) => {
    const isCurrent = activeEl === s.el;
    return (
      <span
        className={`absolute -translate-x-1/2 -translate-y-1/2 min-w-6 h-6 px-1.5 rounded-full flex items-center justify-center font-mono text-xs font-bold ring-2 ring-editorial-cream ${
          isCurrent ? 'bg-editorial-accent text-editorial-charcoal scale-125 z-10' : 'bg-editorial-charcoal text-editorial-cream'
        }`}
        style={{ left: s.x, top: s.y }}
      >
        {s.n}
      </span>
    );
  };

  const Outline = ({ l }: { l: Landmark }) => (
    <div className="absolute border border-dashed border-editorial-accent-text" style={{ left: l.x, top: l.y, width: l.w, height: l.h }}>
      <span className="absolute left-2 top-0 -translate-y-1/2 bg-editorial-cream px-1.5 font-mono text-xs font-bold text-editorial-accent-text">
        {l.label}
      </span>
    </div>
  );

  return createPortal(
    <>
      {/* Layer that scrolls with the page */}
      <div data-testmode aria-hidden="true" className="pointer-events-none absolute top-0 left-0 z-30 w-full" style={{ height: docHeight }}>
        {docLandmarks.map((l, i) => <Outline key={`l${i}`} l={l} />)}
        <svg className="absolute top-0 left-0 overflow-visible" width="100%" height={docHeight}>
          <polyline points={path} fill="none" stroke="var(--color-editorial-accent)" strokeWidth="1.5" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" opacity="0.8" />
        </svg>
        {docStops.map((s) => <Badge key={s.n} s={s} />)}
      </div>

      {/* Layer for fixed elements (top bar, back-to-top) */}
      <div data-testmode aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]">
        {fixedLandmarks.map((l, i) => <Outline key={`f${i}`} l={l} />)}
        {fixedStops.map((s) => <Badge key={s.n} s={s} />)}
      </div>

      <div
        data-testmode
        role="status"
        className="fixed bottom-6 left-4 right-[4.75rem] sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-[70] bg-editorial-charcoal text-editorial-cream px-5 py-3 flex items-center gap-x-5 gap-y-2 flex-wrap shadow-2xl"
      >
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-wider">
            Tab-order check &middot; {stops.length} stops &middot; {landmarks.length} landmarks &middot; {counts.headings} headings
          </p>
          <p className="text-sm text-neutral-300">Press Tab to walk the page in order.</p>
        </div>
        <button
          onClick={() => setActive(false)}
          className="min-h-[44px] px-4 border border-neutral-500 font-mono text-xs font-bold uppercase tracking-wider hover:bg-editorial-cream hover:text-editorial-charcoal transition-colors cursor-pointer"
        >
          Exit (Esc)
        </button>
      </div>
    </>,
    document.body
  );
}

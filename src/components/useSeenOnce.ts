import { useEffect, useState, type RefObject } from 'react';

// True once at least `threshold` of the element has been on screen. Scroll-position based so it
// works in every browser and webview, and it never flips back, so an animation plays one time.
export function useSeenOnce(ref: RefObject<HTMLElement | null>, threshold = 0.5) {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (seen) return;
    const check = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.height === 0) return;
      const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
      if (visible / Math.min(r.height, window.innerHeight) >= threshold) setSeen(true);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [seen, ref, threshold]);

  return seen;
}

// True while at least `threshold` of the element is on screen (used to pause looping motion offscreen)
export function useOnScreen(ref: RefObject<HTMLElement | null>, threshold = 0.1) {
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const check = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
      setOnScreen(r.height > 0 && visible / r.height >= threshold);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [ref, threshold]);

  return onScreen;
}

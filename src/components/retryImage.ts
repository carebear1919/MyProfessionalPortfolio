import type { SyntheticEvent } from 'react';

// If an image fails (for example a stale cached response right after a deploy), retry once with a
// fresh URL. If it fails again, hide the broken-image icon and let the container background show.
export function retryImageOnce(e: SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (!img.dataset.retried) {
    img.dataset.retried = '1';
    const url = new URL(img.src, window.location.href);
    url.searchParams.set('r', String(Date.now()));
    img.src = url.toString();
    return;
  }
  img.style.visibility = 'hidden';
}

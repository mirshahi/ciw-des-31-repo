/**
 * Image helpers.
 *
 * Photography is served from Unsplash's CDN so the site ships with consistent,
 * high-end architectural imagery without bundling large binaries. Keeping the
 * URL construction in one place means the image source can be swapped for a
 * self-hosted CDN (or the Base44 file store) by editing this file alone.
 */

const BASE = 'https://images.unsplash.com/photo-';

/** Build a single, appropriately sized image URL. */
export function image(id, { w = 1600, h, q = 78 } = {}) {
  const params = ['auto=format', 'fit=crop', `w=${w}`, `q=${q}`];
  if (h) params.push(`h=${h}`);
  return `${BASE}${id}?${params.join('&')}`;
}

/** Build a responsive `srcSet` from a list of widths. */
export function imageSrcSet(id, widths = [640, 960, 1280, 1920], { h, q = 78 } = {}) {
  return widths.map((w) => `${image(id, { w, h, q })} ${w}w`).join(', ');
}

/** Standard `sizes` value for a full-bleed hero image. */
export const FULL_WIDTH_SIZES = '100vw';

export const CARD_SIZES = '(max-width: 600px) 86vw, (max-width: 1024px) 46vw, 30vw';

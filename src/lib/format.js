/** Formatting and small shared helpers. */

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

/** `$2,350,000` — used on detail pages where precision matters. */
export const formatPrice = (value) => usd.format(value);

/** `$2.35 Million` — the editorial form used on cards and over image overlays. */
export function formatPriceShort(value) {
  const millions = value / 1_000_000;
  const rounded = millions.toFixed(2).replace(/0$/, '');
  return `$${rounded} Million`;
}

export const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value);

/** Turns a display phone number into a dialable `tel:` href. */
export function toTelHref(phone) {
  const digits = String(phone).replace(/[^\d]/g, '');
  if (!digits) return undefined;
  return `tel:${digits.length === 10 ? `+1${digits}` : `+${digits}`}`;
}

/** Builds a query string, dropping empty values so URLs stay clean. */
export function toQueryString(params) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '' || value === false) return;
    search.set(key, value === true ? '1' : String(value));
  });
  const query = search.toString();
  return query ? `?${query}` : '';
}

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Enquiry capture.
 *
 * The site currently has no backend, so submitted enquiries are recorded in
 * localStorage and simultaneously offered to the visitor's mail client. This
 * module is the single seam where a real API call (or a Base44 entity write)
 * belongs — the form components only call `saveEnquiry`.
 */

const STORAGE_KEY = 'horizon:enquiries';

export function saveEnquiry(record) {
  const entry = {
    ...record,
    id: `enq_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    submittedAt: new Date().toISOString()
  };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    const list = Array.isArray(existing) ? existing : [];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...list, entry]));
  } catch {
    /* Storage unavailable — the confirmation flow still completes. */
  }

  return entry;
}

export function listEnquiries() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** A prefilled mail draft, offered alongside the in-page confirmation. */
export function mailtoFor(entry, recipient) {
  const subject = encodeURIComponent(entry.subject ?? 'Property enquiry');
  const body = encodeURIComponent(
    [
      `Name: ${entry.name}`,
      `Email: ${entry.email}`,
      entry.phone ? `Phone: ${entry.phone}` : null,
      entry.propertyTitle ? `Property: ${entry.propertyTitle}` : null,
      '',
      entry.message
    ]
      .filter(Boolean)
      .join('\n')
  );

  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

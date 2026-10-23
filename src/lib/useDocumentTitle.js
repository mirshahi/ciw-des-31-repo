import { useEffect } from 'react';
import { site } from '../data/site';

/** Keeps the document title in step with the active route. */
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`;
  }, [title]);
}

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Saved properties, persisted to localStorage.
 *
 * Kept in one place so the card, the detail page and the shortlist view all
 * read and write the same source of truth. Swapping localStorage for a
 * server-side table later means changing only this module.
 */

const STORAGE_KEY = 'horizon:favorites';
const FavoritesContext = createContext(null);

function readStored() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readStored);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      /* Storage may be unavailable (private mode); the UI still works in-session. */
    }
  }, [favorites]);

  const toggle = useCallback((id) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }, []);

  const remove = useCallback((id) => {
    setFavorites((current) => current.filter((item) => item !== id));
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      count: favorites.length,
      isFavorite: (id) => favorites.includes(id),
      toggle,
      remove
    }),
    [favorites, toggle, remove]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used inside a FavoritesProvider');
  return context;
}

import { useFavorites } from '../../lib/favorites';
import Icon from '../ui/Icon';
import './FavoriteButton.css';

/**
 * Heart toggle for a property. Reads and writes the shared favorites store,
 * so the header counter and the shortlist page stay in sync.
 */
export default function FavoriteButton({ propertyId, propertyTitle, size = 18, className = '' }) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(propertyId);

  return (
    <button
      type="button"
      className={`favorite ${active ? 'is-active' : ''} ${className}`.trim()}
      aria-pressed={active}
      aria-label={active ? `Remove ${propertyTitle} from saved` : `Save ${propertyTitle}`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(propertyId);
      }}
    >
      <Icon name="heart" size={size} strokeWidth={active ? 2 : 1.6} />
    </button>
  );
}

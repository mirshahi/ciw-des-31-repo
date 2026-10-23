import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import PropertyCard from './PropertyCard';
import Reveal from '../ui/Reveal';
import './PropertyGrid.css';

/** Responsive grid of stacked property cards, with an empty state. */
export default function PropertyGrid({ properties, columns = 3, priorityCount = 0, emptyAction }) {
  if (!properties.length) {
    return (
      <div className="property-grid__empty" role="status">
        <span className="property-grid__empty-icon" aria-hidden="true">
          <Icon name="search" size={22} />
        </span>
        <h3>No properties match those filters</h3>
        <p>
          Try widening the price range or clearing the location filter — or browse the full
          portfolio.
        </p>
        {emptyAction ?? (
          <Link className="btn btn--outline" to="/properties">
            <span>View all properties</span>
            <Icon name="arrow-right" size={16} className="btn__icon" />
          </Link>
        )}
      </div>
    );
  }

  return (
    <ul className={`property-grid property-grid--${columns}`}>
      {properties.map((property, index) => (
        <Reveal as="li" key={property.id} delay={Math.min(index, 5) * 60}>
          <PropertyCard
            property={property}
            variant="stacked"
            priority={index < priorityCount}
            sizes="(max-width: 640px) 90vw, (max-width: 1080px) 46vw, 32vw"
          />
        </Reveal>
      ))}
    </ul>
  );
}

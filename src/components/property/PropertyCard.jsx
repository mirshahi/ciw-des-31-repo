import { Link } from 'react-router-dom';
import { formatPrice, formatPriceShort, formatNumber } from '../../lib/format';
import { CARD_SIZES } from '../../lib/images';
import Icon from '../ui/Icon';
import Photo from '../ui/Photo';
import FavoriteButton from './FavoriteButton';
import './PropertyCard.css';

/**
 * Reusable property card.
 *
 * `overlay` — editorial treatment with the details set over the photograph
 *             (used by the homepage carousel, mirroring the reference).
 * `stacked` — photograph above a details block (used by the listings grid,
 *             where more information has to be scannable).
 */
export default function PropertyCard({
  property,
  variant = 'overlay',
  ratio,
  priority = false,
  sizes = CARD_SIZES,
  className = ''
}) {
  const cover = property.images[0];
  const detailPath = `/properties/${property.id}`;

  if (variant === 'stacked') {
    return (
      <article className={`property-card property-card--stacked ${className}`.trim()}>
        <div className="property-card__media">
          <Link to={detailPath} tabIndex={-1} aria-hidden="true">
            <Photo
              id={cover.id}
              alt={cover.alt}
              ratio={ratio ?? '4 / 3'}
              sizes={sizes}
              priority={priority}
            />
          </Link>
          <span className="property-card__status">{property.status}</span>
          <FavoriteButton
            propertyId={property.id}
            propertyTitle={property.title}
            className="property-card__favorite"
          />
        </div>

        <div className="property-card__info">
          <p className="property-card__type">{property.type}</p>
          <h3 className="property-card__title">
            <Link to={detailPath}>{property.title}</Link>
          </h3>
          <p className="property-card__location">
            <Icon name="map-pin" size={15} />
            <span>{`${property.city}, ${property.region}, ${property.country}`}</span>
          </p>

          <ul className="property-card__meta">
            <li>
              <Icon name="bed" size={16} />
              <span>{property.beds} bd</span>
            </li>
            <li>
              <Icon name="bath" size={16} />
              <span>{property.baths} ba</span>
            </li>
            <li>
              <Icon name="ruler" size={16} />
              <span>{formatNumber(property.sqft)} sq ft</span>
            </li>
          </ul>

          <div className="property-card__foot">
            <p className="property-card__price">{formatPrice(property.price)}</p>
            <Link to={detailPath} className="link-arrow">
              <span>View</span>
              <Icon name="arrow-right" size={16} className="link-arrow__icon" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`property-card property-card--overlay ${className}`.trim()}>
      <Link className="property-card__link" to={detailPath}>
        <Photo
          id={cover.id}
          alt={cover.alt}
          ratio={ratio ?? '3 / 4'}
          sizes={sizes}
          priority={priority}
          overlay
          imgClassName="property-card__img"
        />
        <div className="property-card__body">
          <h3 className="property-card__title">{property.title}</h3>
          <p className="property-card__location">
            <Icon name="map-pin" size={15} />
            <span>{`${property.city}, ${property.region}, ${property.country}`}</span>
          </p>
          <p className="property-card__price">{formatPriceShort(property.price)}</p>
        </div>
      </Link>

      <FavoriteButton
        propertyId={property.id}
        propertyTitle={property.title}
        className="property-card__favorite"
      />
    </article>
  );
}

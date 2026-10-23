import { useMemo } from 'react';
import { propertyRegions, propertyTypes } from '../../data/properties';
import { BATH_OPTIONS, BED_OPTIONS, PRICE_BRACKETS, SORTS, countActiveFilters, defaultFilters } from '../../lib/filters';
import Icon from '../ui/Icon';
import './PropertyFilters.css';

/** Search, facets and sort for the property index. Controlled from the URL. */
export default function PropertyFilters({ filters, onChange, resultCount }) {
  const regions = useMemo(() => propertyRegions(), []);
  const types = useMemo(() => propertyTypes(), []);
  const activeCount = countActiveFilters(filters);

  const set = (key) => (event) => onChange({ ...filters, [key]: event.target.value });
  const toggleFeatured = () => onChange({ ...filters, featured: !filters.featured });

  return (
    <form
      className="filters"
      role="search"
      aria-label="Filter properties"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="filters__search">
        <Icon name="search" size={18} />
        <label className="sr-only" htmlFor="filter-q">
          Search properties by name or location
        </label>
        <input
          id="filter-q"
          type="search"
          name="q"
          placeholder="Search by name, city or keyword"
          value={filters.q}
          onChange={set('q')}
        />
      </div>

      <div className="filters__row">
        <div className="filters__field">
          <label htmlFor="filter-location">Location</label>
          <div className="filters__select">
            <select id="filter-location" value={filters.location} onChange={set('location')}>
              <option value="all">All locations</option>
              {regions.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
            <Icon name="chevron-down" size={16} />
          </div>
        </div>

        <div className="filters__field">
          <label htmlFor="filter-type">Property type</label>
          <div className="filters__select">
            <select id="filter-type" value={filters.type} onChange={set('type')}>
              <option value="all">All types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <Icon name="chevron-down" size={16} />
          </div>
        </div>

        <div className="filters__field">
          <label htmlFor="filter-price">Price range</label>
          <div className="filters__select">
            <select id="filter-price" value={filters.price} onChange={set('price')}>
              {PRICE_BRACKETS.map((bracket) => (
                <option key={bracket.value} value={bracket.value}>
                  {bracket.label}
                </option>
              ))}
            </select>
            <Icon name="chevron-down" size={16} />
          </div>
        </div>

        <div className="filters__field">
          <label htmlFor="filter-beds">Bedrooms</label>
          <div className="filters__select">
            <select id="filter-beds" value={filters.beds} onChange={set('beds')}>
              {BED_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon name="chevron-down" size={16} />
          </div>
        </div>

        <div className="filters__field">
          <label htmlFor="filter-baths">Bathrooms</label>
          <div className="filters__select">
            <select id="filter-baths" value={filters.baths} onChange={set('baths')}>
              {BATH_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon name="chevron-down" size={16} />
          </div>
        </div>

        <div className="filters__field">
          <label htmlFor="filter-sort">Sort by</label>
          <div className="filters__select">
            <select id="filter-sort" value={filters.sort} onChange={set('sort')}>
              {SORTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon name="chevron-down" size={16} />
          </div>
        </div>
      </div>

      <div className="filters__foot">
        <button
          type="button"
          className={`filters__chip ${filters.featured ? 'is-active' : ''}`.trim()}
          aria-pressed={filters.featured}
          onClick={toggleFeatured}
        >
          <Icon name="star" size={15} />
          <span>Featured only</span>
        </button>

        <p className="filters__count" role="status">
          {resultCount} {resultCount === 1 ? 'property' : 'properties'}
        </p>

        {activeCount > 0 ? (
          <button
            type="button"
            className="filters__reset"
            onClick={() => onChange({ ...defaultFilters, sort: filters.sort })}
          >
            <Icon name="close" size={14} />
            <span>Clear filters ({activeCount})</span>
          </button>
        ) : null}
      </div>
    </form>
  );
}

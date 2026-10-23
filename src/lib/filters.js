/** Filtering, sorting and URL (de)serialisation for the property search. */

export const PRICE_BRACKETS = [
  { value: 'all', label: 'Any price', min: 0, max: Number.POSITIVE_INFINITY },
  { value: 'under-2', label: 'Under $2M', min: 0, max: 2_000_000 },
  { value: '2-3', label: '$2M – $3M', min: 2_000_000, max: 3_000_000 },
  { value: '3-4.5', label: '$3M – $4.5M', min: 3_000_000, max: 4_500_000 },
  { value: 'over-4.5', label: '$4.5M and above', min: 4_500_000, max: Number.POSITIVE_INFINITY }
];

export const SORTS = [
  { value: 'featured', label: 'Featured first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'size-desc', label: 'Largest first' },
  { value: 'newest', label: 'Newest first' }
];

export const BED_OPTIONS = [
  { value: 'all', label: 'Any' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' }
];

export const BATH_OPTIONS = [
  { value: 'all', label: 'Any' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' }
];

export const defaultFilters = {
  q: '',
  location: 'all',
  type: 'all',
  price: 'all',
  beds: 'all',
  baths: 'all',
  featured: false,
  sort: 'featured'
};

/** Read a filter set out of URL search params (shareable, linkable searches). */
export function filtersFromSearchParams(params) {
  const read = (key, fallback) => {
    const value = params.get(key);
    return value === null || value === '' ? fallback : value;
  };

  return {
    q: read('q', defaultFilters.q),
    location: read('location', defaultFilters.location),
    type: read('type', defaultFilters.type),
    price: read('price', defaultFilters.price),
    beds: read('beds', defaultFilters.beds),
    baths: read('baths', defaultFilters.baths),
    featured: params.get('featured') === '1',
    sort: read('sort', defaultFilters.sort)
  };
}

/** Serialise only the values that differ from the defaults. */
export function searchParamsFromFilters(filters) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    const fallback = defaultFilters[key];
    if (value === fallback || value === '' || value === false) return;
    params.set(key, value === true ? '1' : String(value));
  });
  return params;
}

export function countActiveFilters(filters) {
  return Object.entries(filters).filter(
    ([key, value]) => key !== 'sort' && value !== defaultFilters[key]
  ).length;
}

export function filterProperties(list, filters) {
  const bracket =
    PRICE_BRACKETS.find((entry) => entry.value === filters.price) ?? PRICE_BRACKETS[0];
  const query = filters.q.trim().toLowerCase();

  const matched = list.filter((property) => {
    if (filters.featured && !property.featured) return false;
    if (filters.type !== 'all' && property.type !== filters.type) return false;
    if (filters.location !== 'all' && property.city !== filters.location) return false;
    if (property.price < bracket.min || property.price > bracket.max) return false;
    if (filters.beds !== 'all' && property.beds < Number(filters.beds)) return false;
    if (filters.baths !== 'all' && property.baths < Number(filters.baths)) return false;

    if (query) {
      const haystack = `${property.title} ${property.city} ${property.region} ${property.country} ${property.type} ${property.tags.join(' ')}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });

  return sortProperties(matched, filters.sort);
}

export function sortProperties(list, sort) {
  const sorted = [...list];

  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'size-desc':
      return sorted.sort((a, b) => b.sqft - a.sqft);
    case 'newest':
      return sorted.sort((a, b) => b.year - a.year);
    case 'featured':
    default:
      return sorted.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price
      );
  }
}

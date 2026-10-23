import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import PropertyFilters from '../components/property/PropertyFilters';
import PropertyGrid from '../components/property/PropertyGrid';
import Reveal from '../components/ui/Reveal';
import { properties } from '../data/properties';
import { filterProperties, filtersFromSearchParams, searchParamsFromFilters } from '../lib/filters';
import useDocumentTitle from '../lib/useDocumentTitle';
import './Properties.css';

export default function Properties() {
  useDocumentTitle('Properties');

  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(() => filtersFromSearchParams(searchParams), [searchParams]);
  const results = useMemo(() => filterProperties(properties, filters), [filters]);

  // Filters live in the URL, so a search can be shared or bookmarked.
  const update = (next) => setSearchParams(searchParamsFromFilters(next), { replace: true });

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Find your next address"
        text="Search the full portfolio by location, type, price and layout. Every listing is represented directly by Horizon Properties."
        image="1523217582562-09d0def993a6"
      />

      <section className="section properties" aria-label="Property search results">
        <div className="container">
          <div className="properties__filters">
            <PropertyFilters filters={filters} onChange={update} resultCount={results.length} />
          </div>

          <div className="properties__results">
            <Reveal>
              <PropertyGrid properties={results} columns={3} priorityCount={3} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import PropertyGrid from '../components/property/PropertyGrid';
import Icon from '../components/ui/Icon';
import Reveal from '../components/ui/Reveal';
import { properties } from '../data/properties';
import { useFavorites } from '../lib/favorites';
import useDocumentTitle from '../lib/useDocumentTitle';
import './Saved.css';

export default function Saved() {
  useDocumentTitle('Saved properties');

  const { favorites, count } = useFavorites();
  const saved = properties.filter((property) => favorites.includes(property.id));

  return (
    <>
      <PageHero
        eyebrow="Shortlist"
        title="Saved properties"
        text="Properties you have shortlisted on this device. Send the list to an adviser whenever you are ready."
        image="1494526585095-c41746248156"
      />

      <section className="section" aria-label="Saved properties">
        <div className="container">
          {count ? (
            <>
              <div className="saved__head">
                <p className="saved__count">
                  {count} {count === 1 ? 'property' : 'properties'} saved
                </p>
                <Link className="link-arrow" to="/contact">
                  <span>Discuss this shortlist</span>
                  <Icon name="arrow-right" size={16} className="link-arrow__icon" />
                </Link>
              </div>

              <Reveal>
                <PropertyGrid properties={saved} columns={3} priorityCount={3} />
              </Reveal>
            </>
          ) : (
            <div className="saved__empty">
              <span className="saved__empty-icon" aria-hidden="true">
                <Icon name="heart" size={24} />
              </span>
              <h2>Your shortlist is empty</h2>
              <p>
                Tap the heart on any property to save it here. Your shortlist is kept on this
                device.
              </p>
              <Link className="btn btn--lg" to="/properties">
                <span>Browse properties</span>
                <Icon name="arrow-right" size={17} className="btn__icon" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

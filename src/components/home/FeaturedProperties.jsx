import { Link } from 'react-router-dom';
import { featuredProperties } from '../../data/properties';
import Icon from '../ui/Icon';
import PropertyCarousel from '../property/PropertyCarousel';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import './FeaturedProperties.css';

/** Homepage carousel of the featured listings. */
export default function FeaturedProperties() {
  const featured = featuredProperties();

  return (
    <section className="section section--ivory featured" id="featured" aria-labelledby="featured-title">
      <div className="container">
        <SectionHeading
          eyebrow="Featured"
          title="Featured Properties"
          text="A selection of current listings — architectural homes, private estates and city penthouses in prime locations."
          align="center"
          titleId="featured-title"
          titleClassName="featured__heading"
        />

        <PropertyCarousel properties={featured} label="Featured properties" />

        <Reveal className="featured__more">
          <Link className="btn btn--outline btn--lg" to="/properties">
            <span>View all properties</span>
            <Icon name="arrow-right" size={17} className="btn__icon" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

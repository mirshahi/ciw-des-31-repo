import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb } from '../components/layout/PageHero';
import EnquiryDialog from '../components/contact/EnquiryDialog';
import FavoriteButton from '../components/property/FavoriteButton';
import PropertyGallery from '../components/property/PropertyGallery';
import PropertyGrid from '../components/property/PropertyGrid';
import Icon from '../components/ui/Icon';
import Photo from '../components/ui/Photo';
import Reveal from '../components/ui/Reveal';
import { propertyBySlug, similarProperties } from '../data/properties';
import { getTeamMember } from '../data/team';
import { formatNumber, formatPrice, formatPriceShort, toTelHref } from '../lib/format';
import useDocumentTitle from '../lib/useDocumentTitle';
import './PropertyDetail.css';

function MissingProperty() {
  return (
    <section className="section">
      <div className="container detail-missing">
        <p className="eyebrow">Not found</p>
        <h1 className="h1">We couldn&rsquo;t find that property</h1>
        <p className="lead measure">
          The listing may have been withdrawn or the link may be out of date. The full portfolio is
          a click away.
        </p>
        <Link className="btn btn--lg" to="/properties">
          <span>Browse all properties</span>
          <Icon name="arrow-right" size={17} className="btn__icon" />
        </Link>
      </div>
    </section>
  );
}

export default function PropertyDetail() {
  const { slug } = useParams();
  const property = propertyBySlug(slug);
  const [dialog, setDialog] = useState(null);

  useDocumentTitle(property ? property.title : 'Property not found');

  if (!property) return <MissingProperty />;

  const agent = getTeamMember(property.agentId);
  const similar = similarProperties(property, 3);
  const agentEmail = agent?.social.find((link) => link.icon === 'mail')?.href;
  const agentTel = toTelHref(agent?.phone ?? '');

  const facts = [
    { label: 'Property type', value: property.type, icon: 'building' },
    { label: 'Bedrooms', value: `${property.beds}`, icon: 'bed' },
    { label: 'Bathrooms', value: `${property.baths}`, icon: 'bath' },
    { label: 'Interior', value: `${formatNumber(property.sqft)} sq ft`, icon: 'ruler' },
    { label: 'Land', value: property.lot, icon: 'map-pin' },
    { label: 'Built', value: `${property.year}`, icon: 'calendar' },
    { label: 'Parking', value: `${property.parking} cars`, icon: 'shield' },
    { label: 'Status', value: property.status, icon: 'star' }
  ];

  return (
    <>
      <article className="detail">
        <header className="detail__head">
          <div className="container">
            <Breadcrumb
              items={[
                { label: 'Home', to: '/' },
                { label: 'Properties', to: '/properties' },
                { label: property.title }
              ]}
            />

            <div className="detail__head-grid">
              <div className="detail__head-copy">
                <p className="eyebrow eyebrow--on-dark">
                  {property.type} · {property.status}
                </p>
                <h1 className="detail__title">{property.title}</h1>
                <p className="detail__location">
                  <Icon name="map-pin" size={16} />
                  <span>{`${property.city}, ${property.region}, ${property.country}`}</span>
                </p>
              </div>

              <div className="detail__head-side">
                <p className="detail__price">{formatPrice(property.price)}</p>
                <p className="detail__price-alt">{formatPriceShort(property.price)}</p>
                <FavoriteButton
                  propertyId={property.id}
                  propertyTitle={property.title}
                  className="detail__favorite"
                  size={20}
                />
              </div>
            </div>
          </div>
        </header>

        <div className="container detail__body">
          <Reveal className="detail__gallery">
            <PropertyGallery images={property.images} title={property.title} />
          </Reveal>

          <div className="detail__columns">
            <div className="detail__main">
              <section className="detail__block" aria-labelledby="detail-about">
                <h2 className="detail__heading" id="detail-about">
                  About this property
                </h2>
                {property.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="detail__paragraph">
                    {paragraph}
                  </p>
                ))}
              </section>

              <section className="detail__block" aria-labelledby="detail-facts">
                <h2 className="detail__heading" id="detail-facts">
                  Key details
                </h2>
                <ul className="detail__facts">
                  {facts.map((fact) => (
                    <li key={fact.label}>
                      <Icon name={fact.icon} size={18} />
                      <span className="detail__fact-label">{fact.label}</span>
                      <span className="detail__fact-value">{fact.value}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="detail__split">
                <section className="detail__block" aria-labelledby="detail-features">
                  <h2 className="detail__heading" id="detail-features">
                    Key features
                  </h2>
                  <ul className="detail__list">
                    {property.features.map((feature) => (
                      <li key={feature}>
                        <Icon name="check" size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="detail__block" aria-labelledby="detail-amenities">
                  <h2 className="detail__heading" id="detail-amenities">
                    Amenities
                  </h2>
                  <ul className="detail__chips">
                    {property.amenities.map((amenity) => (
                      <li key={amenity}>{amenity}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            <aside className="detail__aside" aria-label="Contact and enquiry">
              <div className="detail__card">
                <p className="detail__card-label">Listed by</p>

                <div className="detail__agent">
                  <Photo
                    id={agent.image}
                    alt={`Portrait of ${agent.name}`}
                    ratio="1 / 1"
                    sizes="72px"
                    widths={[160, 240]}
                    className="detail__agent-photo"
                  />
                  <div>
                    <p className="detail__agent-name">{agent.name}</p>
                    <p className="detail__agent-role">{agent.role}</p>
                  </div>
                </div>

                <ul className="detail__agent-links">
                  {agentEmail ? (
                    <li>
                      <a href={agentEmail}>
                        <Icon name="mail" size={16} />
                        <span>Email {agent.name.split(' ')[0]}</span>
                      </a>
                    </li>
                  ) : null}
                  {agentTel ? (
                    <li>
                      <a href={agentTel}>
                        <Icon name="phone" size={16} />
                        <span>{agent.phone}</span>
                      </a>
                    </li>
                  ) : null}
                </ul>

                <div className="detail__actions">
                  <button type="button" className="btn btn--lg btn--block" onClick={() => setDialog('viewing')}>
                    <Icon name="calendar" size={17} />
                    <span>Schedule a viewing</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn--outline btn--block"
                    onClick={() => setDialog('contact')}
                  >
                    <span>Contact agent</span>
                    <Icon name="arrow-right" size={17} className="btn__icon" />
                  </button>
                </div>

                <dl className="detail__summary">
                  <div>
                    <dt>Reference</dt>
                    <dd>{property.id.toUpperCase()}</dd>
                  </div>
                  <div>
                    <dt>Price</dt>
                    <dd>{formatPrice(property.price)}</dd>
                  </div>
                  <div>
                    <dt>Availability</dt>
                    <dd>{property.status}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>

        {similar.length ? (
          <section className="section section--ivory detail__similar" aria-labelledby="detail-similar">
            <div className="container">
              <div className="detail__similar-head">
                <div>
                  <p className="eyebrow">You may also like</p>
                  <h2 className="detail__heading" id="detail-similar">
                    Similar properties
                  </h2>
                </div>
                <Link className="link-arrow" to="/properties">
                  <span>View all properties</span>
                  <Icon name="arrow-right" size={16} className="link-arrow__icon" />
                </Link>
              </div>

              <PropertyGrid properties={similar} columns={3} />
            </div>
          </section>
        ) : null}
      </article>

      {/* Mobile-only persistent action bar. */}
      <div className="detail__bar">
        <div className="detail__bar-price">
          <span>{formatPriceShort(property.price)}</span>
          <small>{`${property.beds} bd · ${property.baths} ba`}</small>
        </div>
        <button type="button" className="btn" onClick={() => setDialog('viewing')}>
          <span>Schedule viewing</span>
        </button>
      </div>

      <EnquiryDialog
        open={dialog !== null}
        onClose={() => setDialog(null)}
        intent={dialog === 'viewing' ? 'viewing' : 'general'}
        propertyId={property.id}
        propertyTitle={property.title}
        recipient={agent.email}
        subject={
          dialog === 'viewing'
            ? `Viewing request — ${property.title}`
            : `Enquiry — ${property.title}`
        }
        title={dialog === 'viewing' ? 'Schedule a viewing' : `Contact ${agent.name}`}
        description={
          dialog === 'viewing'
            ? `${property.title} · ${property.city}, ${property.region}`
            : `${agent.name}, ${agent.role} — ${property.title}.`
        }
      />
    </>
  );
}

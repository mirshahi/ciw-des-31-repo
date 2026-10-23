import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import CtaSection from '../components/home/CtaSection';
import Icon from '../components/ui/Icon';
import Photo from '../components/ui/Photo';
import Reveal from '../components/ui/Reveal';
import { services } from '../data/services';
import useDocumentTitle from '../lib/useDocumentTitle';
import './Services.css';

export default function Services() {
  useDocumentTitle('Services');

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="How we represent and advise"
        text="Six services, delivered by the same senior team. Each one is scoped in writing before we start, so you always know what you are getting."
        image="1600607687939-ce8a6c25118c"
      />

      <section className="section" aria-label="Our services">
        <div className="container">
          <ul className="svc">
            {services.map((service, index) => (
              <Reveal
                as="li"
                key={service.id}
                id={service.id}
                className={`svc__row ${index % 2 === 1 ? 'svc__row--flip' : ''}`.trim()}
              >
                <div className="svc__media">
                  <Photo
                    id={service.image}
                    alt={`${service.title} — architectural photography`}
                    ratio="4 / 3"
                    sizes="(max-width: 900px) 100vw, 46vw"
                    widths={[480, 768, 1080]}
                  />
                </div>

                <div className="svc__copy">
                  <span className="svc__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="svc__title">{service.title}</h2>
                  <p className="svc__summary">{service.summary}</p>
                  <p className="svc__detail">{service.detail}</p>

                  <ul className="svc__points">
                    {service.points.map((point) => (
                      <li key={point}>
                        <Icon name="check" size={15} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <Link className="btn btn--outline" to="/contact">
                    <span>Enquire about this service</span>
                    <Icon name="arrow-right" size={16} className="btn__icon" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

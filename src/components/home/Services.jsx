import { Link } from 'react-router-dom';
import { services } from '../../data/services';
import Icon from '../ui/Icon';
import Photo from '../ui/Photo';
import Reveal from '../ui/Reveal';
import './Services.css';

/** Editorial, numbered service list — deliberately not a row of icon boxes. */
export default function Services() {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container services__grid">
        <Reveal className="services__intro">
          <p className="eyebrow">Services</p>
          <h2 className="services__title" id="services-title">
            Advice across the whole property life cycle
          </h2>
          <p className="services__text">
            Whether you are buying a home to live in or building a portfolio, the same senior team
            stays with your file from first brief to completion.
          </p>
          <Link className="btn btn--outline btn--lg" to="/services">
            <span>Explore services</span>
            <Icon name="arrow-right" size={17} className="btn__icon" />
          </Link>
        </Reveal>

        <ul className="services__list">
          {services.map((service, index) => (
            <Reveal as="li" key={service.id} delay={index * 55} className="services__item">
              <Link className="services__link" to={`/services#${service.id}`}>
                <span className="services__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="services__body">
                  <h3 className="services__name">{service.title}</h3>
                  <p className="services__summary">{service.summary}</p>
                </div>

                <div className="services__preview" aria-hidden="true">
                  <Photo
                    id={service.image}
                    alt=""
                    ratio="3 / 2"
                    sizes="220px"
                    widths={[280, 440]}
                  />
                </div>

                <Icon name="arrow-up-right" size={18} className="services__go" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

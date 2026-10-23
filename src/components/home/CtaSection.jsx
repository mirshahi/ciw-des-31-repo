import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import './CtaSection.css';

/** Closing call to action — compact, light panel above the footer. */
export default function CtaSection() {
  return (
    <section className="section section--tight cta" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="cta__box">
          <span className="cta__icon" aria-hidden="true">
            <Icon name="key" size={28} strokeWidth={1.5} />
          </span>

          <div className="cta__copy">
            <h2 className="cta__title" id="cta-title">
              Ready to Find Your Perfect Property?
            </h2>
            <p className="cta__text">
              Let our experts guide you to the right home or investment.
            </p>
          </div>

          <Link className="btn btn--lg cta__action" to="/contact">
            <span>Get in Touch</span>
            <Icon name="arrow-right" size={17} className="btn__icon" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

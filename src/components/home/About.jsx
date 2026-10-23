import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import Photo from '../ui/Photo';
import Reveal from '../ui/Reveal';
import './About.css';

const MAIN_IMAGE = '1512917774080-9991f1c4c750';
const SECONDARY_IMAGE = '1613490493576-7fde63acd811';

/** "Who We Are" — editorial copy beside a paired image composition. */
export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal className="about__copy">
          <p className="eyebrow">About Us</p>
          <h2 className="about__title" id="about-title">
            Who We Are
          </h2>
          <p className="about__text">
            At Horizon Properties, we connect people with extraordinary homes and smart investments.
            Integrity, transparency, and client satisfaction are at the heart of everything we do.
          </p>

          <ul className="about__points">
            <li>
              <Icon name="check" size={16} />
              <span>Architectural and design-led homes</span>
            </li>
            <li>
              <Icon name="check" size={16} />
              <span>Independent advice, documented in writing</span>
            </li>
            <li>
              <Icon name="check" size={16} />
              <span>A named senior adviser on every mandate</span>
            </li>
          </ul>

          <Link className="btn btn--lg about__cta" to="/about">
            <span>Learn More</span>
            <Icon name="arrow-right" size={17} className="btn__icon" />
          </Link>
        </Reveal>

        <Reveal className="about__media" delay={120}>
          <div className="about__frame about__frame--wide">
            <Photo
              id={MAIN_IMAGE}
              alt="Contemporary house with a reflecting pool and full-height glazing"
              ratio="5 / 6"
              sizes="(max-width: 900px) 60vw, 34vw"
              widths={[480, 768, 1080]}
            />
          </div>

          <div className="about__frame about__frame--narrow">
            <Photo
              id={SECONDARY_IMAGE}
              alt="Detail of a modern façade with cantilevered upper storey"
              ratio="3 / 6"
              sizes="(max-width: 900px) 40vw, 20vw"
              widths={[360, 560, 768]}
            />
          </div>

          <Link
            to="/about"
            className="about__arrow"
            aria-label="More about Horizon Properties"
          >
            <Icon name="arrow-up-right" size={20} />
          </Link>

          <div className="about__badge">
            <strong>20+</strong>
            <span>Years advising clients</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Photo from '../ui/Photo';
import './Hero.css';

const HERO_IMAGE = '1600596542815-ffad4c1539a9';

/** Full-bleed opening statement: architectural photography with centred copy. */
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <Photo
          id={HERO_IMAGE}
          alt="Modern lakeside villa at dusk with a lit infinity pool and floor-to-ceiling glazing"
          fill
          priority
          sizes="100vw"
          widths={[768, 1080, 1600, 2000, 2400]}
          quality={80}
          imgClassName="hero__img"
        />
        <span className="hero__scrim" aria-hidden="true" />
      </div>

      <div className="container hero__inner">
        <h1 className="hero__title" id="hero-title">
          Discover Exceptional
          <br className="hero__break" /> Homes &amp; Investments
        </h1>
        <p className="hero__text">
          Premium properties in prime locations. Find your dream home or the perfect investment
          with confidence.
        </p>
      </div>

      <a className="hero__cue" href="#about">
        <span className="hero__cue-line" aria-hidden="true" />
        <span className="hero__cue-label">Explore</span>
      </a>

      <span className="hero__fade" aria-hidden="true" />
    </section>
  );
}

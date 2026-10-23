import Photo from '../ui/Photo';
import useScrollScrubVideo from '../../lib/useScrollScrubVideo';
import './Hero.css';

const HERO_IMAGE = '1600596542815-ffad4c1539a9';
const HERO_VIDEO = '/media/hero-scrub.mp4';
const HERO_VIDEO_MOBILE = '/media/hero-scrub-mobile.mp4';

/**
 * Full-bleed opening statement, with the photograph as its base layer and a
 * scroll-scrubbed clip over it.
 *
 * Scrolling the hero's sticky track moves the camera through the clip rather
 * than playing it: the photograph paints immediately, the clip fades in once it
 * is ready to seek, and the copy fades away as the user takes over the scene.
 * Reduced motion and a failed download both leave the plain photographic hero.
 */
export default function Hero() {
  const { sectionRef, viewportRef, videoRef, status, loaded, active } = useScrollScrubVideo({
    src: HERO_VIDEO,
    mobileSrc: HERO_VIDEO_MOBILE
  });

  const ready = status === 'ready';

  return (
    <section
      ref={sectionRef}
      className={`hero ${active ? 'is-scrub' : ''} ${ready ? 'is-ready' : ''}`.trim()}
      aria-labelledby="hero-title"
    >
      <div className="hero__viewport" ref={viewportRef}>
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

          {/* Paused from first paint to last: only `currentTime` is ever
              written, by the scrub loop, so the clip can never start playing
              or looping on its own. */}
          <video
            ref={videoRef}
            className="hero__video"
            preload="auto"
            muted
            playsInline
            aria-hidden="true"
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

        {/* Kept mounted through the reveal so the hand-off to the clip can
            cross-fade instead of blinking out. */}
        {active ? (
          <div className="hero__loading" aria-hidden="true">
            <span className="hero__loading-label">Preparing the tour</span>
            <span className="hero__loading-track">
              <span className="hero__loading-fill" style={{ '--load': loaded }} />
            </span>
          </div>
        ) : null}

        <a className="hero__cue" href="#about">
          <span className="hero__cue-line" aria-hidden="true" />
          <span className="hero__cue-label">Explore</span>
        </a>

        <span className="hero__fade" aria-hidden="true" />
      </div>
    </section>
  );
}

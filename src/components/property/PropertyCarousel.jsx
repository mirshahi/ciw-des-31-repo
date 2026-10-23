import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon';
import PropertyCard from './PropertyCard';
import './PropertyCarousel.css';

/**
 * Horizontal, snapping property carousel.
 *
 * - native touch swipe (the track is a real scroll container)
 * - pointer drag for desktop mice
 * - previous/next controls that wrap around
 * - arrow-key support when the track has focus
 */
export default function PropertyCarousel({ properties, label = 'Featured properties' }) {
  const trackRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });
  const [progress, setProgress] = useState(0);

  const gapOf = (track) => parseFloat(getComputedStyle(track).columnGap || '0') || 0;

  const step = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const card = track.querySelector('.carousel__item');
    return card ? card.getBoundingClientRect().width + gapOf(track) : track.clientWidth * 0.8;
  }, []);

  const go = useCallback(
    (direction) => {
      const track = trackRef.current;
      if (!track) return;
      const max = track.scrollWidth - track.clientWidth;
      if (direction > 0) {
        if (track.scrollLeft >= max - 8) track.scrollTo({ left: 0, behavior: 'smooth' });
        else track.scrollBy({ left: step(), behavior: 'smooth' });
      } else if (track.scrollLeft <= 8) {
        track.scrollTo({ left: max, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: -step(), behavior: 'smooth' });
      }
    },
    [step]
  );

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? Math.min(track.scrollLeft / max, 1) : 0);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener('resize', onScroll);
    return () => window.removeEventListener('resize', onScroll);
  }, [onScroll]);

  /* --- Pointer drag (mouse / pen only; touch uses native scrolling) ------- */

  const onPointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { active: true, startX: event.clientX, startLeft: track.scrollLeft, moved: 0 };
    track.classList.add('is-dragging');
  };

  const onPointerMove = (event) => {
    const track = trackRef.current;
    if (!track || !drag.current.active) return;
    const delta = event.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(delta));
    track.scrollLeft = drag.current.startLeft - delta;
  };

  const endDrag = () => {
    const track = trackRef.current;
    if (!track || !drag.current.active) return;
    drag.current.active = false;
    track.classList.remove('is-dragging');
  };

  // A drag that moved the track must not also open a property.
  const onClickCapture = (event) => {
    if (drag.current.moved > 6) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = 0;
    }
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    }
  };

  if (!properties?.length) return null;

  return (
    <div className="carousel">
      <div
        ref={trackRef}
        className="carousel__track"
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onScroll={onScroll}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {properties.map((property, index) => (
          <div className="carousel__item" key={property.id}>
            <PropertyCard property={property} priority={index < 2} />
          </div>
        ))}
      </div>

      <div className="carousel__nav">
        <button
          type="button"
          className="carousel__btn"
          onClick={() => go(-1)}
          aria-label="Previous properties"
        >
          <Icon name="chevron-left" size={20} />
        </button>
        <button
          type="button"
          className="carousel__btn"
          onClick={() => go(1)}
          aria-label="Next properties"
        >
          <Icon name="chevron-right" size={20} />
        </button>
      </div>

      <div className="carousel__progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }} />
      </div>
    </div>
  );
}

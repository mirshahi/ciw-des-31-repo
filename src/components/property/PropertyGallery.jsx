import { useCallback, useEffect, useRef, useState } from 'react';
import Photo from '../ui/Photo';
import Icon from '../ui/Icon';
import './PropertyGallery.css';

/**
 * Property image gallery: a large lead image, a thumbnail strip and a
 * full-screen viewer with keyboard support.
 */
export default function PropertyGallery({ images, title }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const lastFocused = useRef(null);

  const total = images.length;

  const step = useCallback(
    (direction) => setIndex((current) => (current + direction + total) % total),
    [total]
  );

  useEffect(() => {
    if (!open) return undefined;

    lastFocused.current = document.activeElement;
    closeRef.current?.focus();
    document.body.classList.add('is-locked');

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('is-locked');
      lastFocused.current?.focus?.();
    };
  }, [open, step]);

  const current = images[index];

  return (
    <div className="gallery">
      <div className="gallery__stage">
        <button
          type="button"
          className="gallery__open"
          onClick={() => setOpen(true)}
          aria-label={`Open full-screen gallery — image ${index + 1} of ${total}`}
        >
          <Photo
            key={current.id}
            id={current.id}
            alt={current.alt}
            ratio="16 / 10"
            priority
            sizes="(max-width: 900px) 100vw, 62vw"
            widths={[720, 1080, 1600, 2000]}
            imgClassName="gallery__img"
          />
          <span className="gallery__hint">
            <Icon name="expand" size={16} />
            <span>View all {total} photos</span>
          </span>
        </button>

        <button
          type="button"
          className="gallery__arrow gallery__arrow--prev"
          onClick={() => step(-1)}
          aria-label="Previous photo"
        >
          <Icon name="chevron-left" size={20} />
        </button>
        <button
          type="button"
          className="gallery__arrow gallery__arrow--next"
          onClick={() => step(1)}
          aria-label="Next photo"
        >
          <Icon name="chevron-right" size={20} />
        </button>

        <p className="gallery__count">
          {index + 1} / {total}
        </p>
      </div>

      <ul className="gallery__thumbs">
        {images.map((image, thumbIndex) => (
          <li key={image.id}>
            <button
              type="button"
              className={`gallery__thumb ${thumbIndex === index ? 'is-active' : ''}`.trim()}
              onClick={() => setIndex(thumbIndex)}
              aria-label={`Show photo ${thumbIndex + 1}`}
              aria-current={thumbIndex === index}
            >
              <Photo id={image.id} alt="" ratio="1 / 1" sizes="120px" widths={[160, 240]} />
            </button>
          </li>
        ))}
      </ul>

      {open ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — photo viewer`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="lightbox__bar">
            <p className="lightbox__counter">
              {index + 1} / {total}
            </p>
            <button ref={closeRef} type="button" className="lightbox__close" onClick={() => setOpen(false)} aria-label="Close photo viewer">
              <Icon name="close" size={20} />
            </button>
          </div>

          <figure className="lightbox__figure">
            <Photo
              key={current.id}
              id={current.id}
              alt={current.alt}
              ratio="3 / 2"
              priority
              sizes="92vw"
              widths={[1080, 1600, 2000]}
              quality={82}
            />
            <figcaption>{current.alt}</figcaption>
          </figure>

          <button type="button" className="lightbox__arrow lightbox__arrow--prev" onClick={() => step(-1)} aria-label="Previous photo">
            <Icon name="chevron-left" size={22} />
          </button>
          <button type="button" className="lightbox__arrow lightbox__arrow--next" onClick={() => step(1)} aria-label="Next photo">
            <Icon name="chevron-right" size={22} />
          </button>
        </div>
      ) : null}
    </div>
  );
}

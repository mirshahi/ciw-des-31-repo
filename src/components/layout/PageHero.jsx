import { Link } from 'react-router-dom';
import Photo from '../ui/Photo';
import './PageHero.css';

/**
 * Header band for interior pages. Keeps the same dark, photographic language
 * as the homepage hero so the fixed header always reads correctly.
 */
export default function PageHero({ eyebrow, title, text, image = '1523217582562-09d0def993a6', children }) {
  return (
    <section className="page-hero" aria-labelledby="page-hero-title">
      <div className="page-hero__media">
        <Photo
          id={image}
          alt=""
          fill
          priority
          sizes="100vw"
          widths={[768, 1080, 1600, 2000]}
          quality={74}
          imgClassName="page-hero__img"
        />
        <span className="page-hero__scrim" aria-hidden="true" />
      </div>

      <div className="container page-hero__inner">
        {eyebrow ? <p className="eyebrow eyebrow--on-dark">{eyebrow}</p> : null}
        <h1 className="page-hero__title" id="page-hero-title">
          {title}
        </h1>
        {text ? <p className="page-hero__text">{text}</p> : null}
        {children}
      </div>
    </section>
  );
}

/** Small breadcrumb trail for interior pages. */
export function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label}>
              {isLast || !item.to ? (
                <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

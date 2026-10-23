import { Link } from 'react-router-dom';
import { site } from '../../data/site';
import './Logo.css';

/**
 * Wordmark: a minimal champagne arch mark beside the company name.
 * `variant` switches it between light-on-dark and dark-on-light use.
 */
export default function Logo({ variant = 'light', withWordmark = true, className = '', to = '/' }) {
  const content = (
    <>
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 34 34" fill="none">
          <path
            d="M6 28.5V14.9L17 5l11 9.9v13.6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.2 28.5v-8.2a4.8 4.8 0 0 1 9.6 0v8.2"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {withWordmark ? (
        <span className="logo__word">
          <span className="logo__name">{site.name}</span>
        </span>
      ) : null}
    </>
  );

  const classes = `logo logo--${variant} ${className}`.trim();

  if (!to) {
    return <span className={classes}>{content}</span>;
  }

  return (
    <Link to={to} className={classes} aria-label={`${site.name} — home`}>
      {content}
    </Link>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import Logo from '../ui/Logo';
import { addressLines, footerLinks, site, social } from '../../data/site';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const subscribe = (event) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setStatus(valid ? 'done' : 'error');
    if (valid) setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Logo />
            <p>{site.description}</p>
            <ul className="site-footer__social">
              {social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                    <Icon name={item.icon} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <nav key={heading} className="site-footer__col" aria-label={heading}>
              <h2 className="site-footer__heading">{heading}</h2>
              <ul>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="site-footer__col">
            <h2 className="site-footer__heading">Contact</h2>
            <ul className="site-footer__contact">
              <li>
                <a href={site.phoneHref}>
                  <Icon name="phone" size={16} />
                  <span>{site.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>
                  <Icon name="mail" size={16} />
                  <span>{site.email}</span>
                </a>
              </li>
              <li>
                <Icon name="map-pin" size={16} />
                <address>
                  {addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </li>
            </ul>
          </div>

          <div className="site-footer__col site-footer__newsletter">
            <h2 className="site-footer__heading">Newsletter</h2>
            <p>New listings and market notes, sent monthly.</p>
            <form onSubmit={subscribe} noValidate>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <div className="site-footer__field">
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  aria-describedby="newsletter-status"
                />
                <button type="submit" className="site-footer__submit" aria-label="Subscribe">
                  <Icon name="arrow-right" size={18} />
                </button>
              </div>
              <p
                id="newsletter-status"
                className={`site-footer__status ${status !== 'idle' ? 'is-visible' : ''}`.trim()}
                role="status"
              >
                {status === 'done' ? 'Thank you — you\u2019re on the list.' : ''}
                {status === 'error' ? 'Please enter a valid email address.' : ''}
              </p>
            </form>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="site-footer__meta">{site.hours}</p>
          <button type="button" className="site-footer__top-link" onClick={scrollToTop}>
            <span>Back to top</span>
            <Icon name="chevron-up" size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from '../ui/Icon';
import Logo from '../ui/Logo';
import { navigation, site, social } from '../../data/site';
import { useFavorites } from '../../lib/favorites';
import './Header.css';

/**
 * Fixed header that sits transparently over the dark hero and resolves into a
 * frosted light bar once the page scrolls. Collapses to a full-screen menu
 * below the desktop breakpoint.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { count } = useFavorites();
  const burgerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Any navigation dismisses the overlay menu.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);

    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => () => document.body.classList.remove('is-locked'), []);

  const linkClass = ({ isActive }) => `site-header__link ${isActive ? 'is-active' : ''}`.trim();

  return (
    <header className={`site-header ${scrolled ? 'is-stuck' : ''} ${open ? 'is-open' : ''}`.trim()}>
      <div className="container site-header__inner">
        <Logo />

        <nav className="site-header__nav" aria-label="Primary">
          <ul className="site-header__list">
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={linkClass} end={item.to === '/'}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <NavLink to="/saved" className="site-header__saved" aria-label={`Saved properties (${count})`}>
            <Icon name="heart" size={19} />
            <span className={`site-header__count ${count ? 'is-visible' : ''}`.trim()}>{count}</span>
          </NavLink>

          <a className="btn btn--champagne-outline btn--sm site-header__phone" href={site.phoneHref}>
            <Icon name="phone" size={16} />
            <span>{site.phone}</span>
          </a>

          <button
            ref={burgerRef}
            type="button"
            className="site-header__burger"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      <div id="site-menu" className={`site-menu ${open ? 'is-open' : ''}`.trim()} aria-hidden={!open}>
        <nav className="site-menu__nav" aria-label="Mobile">
          <ul>
            {navigation.map((item, index) => (
              <li key={item.to} style={{ transitionDelay: open ? `${80 + index * 45}ms` : '0ms' }}>
                <NavLink to={item.to} className={linkClass} end={item.to === '/'}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li style={{ transitionDelay: open ? `${80 + navigation.length * 45}ms` : '0ms' }}>
              <NavLink to="/saved" className={linkClass}>
                Saved{count ? ` (${count})` : ''}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="site-menu__foot">
          <a className="btn btn--light btn--block" href={site.phoneHref}>
            <Icon name="phone" size={16} />
            <span>{site.phone}</span>
          </a>
          <a className="site-menu__mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <ul className="site-menu__social">
            {social.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                  <Icon name={item.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import { navigation } from '../data/site';
import useDocumentTitle from '../lib/useDocumentTitle';
import './NotFound.css';

export default function NotFound() {
  useDocumentTitle('Page not found');

  return (
    <section className="notfound">
      <div className="container notfound__inner">
        <p className="eyebrow eyebrow--on-dark">Error 404</p>
        <h1 className="notfound__title">This page has moved on</h1>
        <p className="notfound__text">
          The address you followed no longer exists. The portfolio, the team and our services are
          all one click away.
        </p>

        <div className="notfound__actions">
          <Link className="btn btn--light btn--lg" to="/">
            <span>Back to home</span>
            <Icon name="arrow-right" size={17} className="btn__icon" />
          </Link>
          <Link className="btn btn--champagne-outline btn--lg" to="/properties">
            <span>Browse properties</span>
          </Link>
        </div>

        <nav className="notfound__nav" aria-label="Site sections">
          <ul>
            {navigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

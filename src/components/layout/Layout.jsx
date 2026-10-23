import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

/** Shared chrome for every route: skip link, header, routed page, footer. */
export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

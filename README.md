# Horizon Properties

A premium real-estate website — architectural homes, private estates and
investment property. Built with React + Vite, hand-written CSS and no UI
framework.

## Running it

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # production bundle into dist/
npm run preview  # serve the built bundle
```

The dev server binds `0.0.0.0:3000` and uses polling for file watching, so it
works from a container with a bind-mounted checkout.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | React 18 + React Router 6 |
| Build | Vite 6 |
| Styling | Plain CSS: design tokens + per-component stylesheets |
| State | React context (`favorites`) + URL search params (`filters`) |
| Imagery | Unsplash CDN, `srcSet`/`sizes`, lazy + fade-in |

No CSS framework, no animation library, no state library — the whole site is
~250 kB of JavaScript (79 kB gzipped).

## Structure

```
src/
  styles/        tokens.css (colour/type/space/motion), base.css (reset + primitives)
  data/          site, properties, services, team — all editable content
  lib/           images, format, filters, favorites, enquiries, useDocumentTitle
  components/
    layout/      Header, Footer, Layout, PageHero (+ Breadcrumb)
    ui/          Photo, Icon, Logo, Reveal, SectionHeading
    property/    PropertyCard, PropertyGrid, PropertyCarousel, PropertyFilters,
                 PropertyGallery, FavoriteButton
    home/        Hero, About, FeaturedProperties, Services, WhyChoose,
                 TeamSection, CtaSection
    team/        TeamGrid / TeamCard
    contact/     EnquiryForm, EnquiryDialog
  pages/         Home, Properties, PropertyDetail, About, Services, Team,
                 Contact, Saved, NotFound
```

## Editing content

Everything a non-developer would want to change lives in `src/data/`:

* `site.js` — brand, phone, email, address, navigation, footer columns, socials
* `properties.js` — the catalogue (10 listings, 5 gallery images each)
* `services.js` — the six services, the "why choose" reasons and the headline stats
* `team.js` — four advisers; each doubles as the listing agent for a property

Property records are deliberately flat and database-friendly (scalar `id`,
filterable `type`/`region`/`price`/`beds`/`baths`, ordered `images[]`). The
selectors at the bottom of `properties.js` (`propertyBySlug`, `featuredProperties`,
`similarProperties`, …) are the seam to replace with an API or entity query.

## Functionality

All interactive elements do something real:

* navigation, mobile menu, and in-page anchors (`/services#property-marketing`)
* carousel — native touch swipe, mouse drag, prev/next that wrap, arrow-key support
* property search across name/city/region/type/tags, plus location, type, price,
  bedrooms, bathrooms and sort facets, held in the URL so a search is shareable
* property detail with a thumbnail gallery and a full-screen viewer
  (Esc / ← / →, focus returned on close)
* shortlist — heart toggle in the header, on cards and on the detail page,
  persisted in `localStorage`, with a `/saved` page and a live counter
* enquiry forms with validation and a confirmation state (see below)
* newsletter signup in the footer, with validation
* "Back to top"

## Known scope boundary

There is no backend. Enquiries are validated, persisted to `localStorage`
(`src/lib/enquiries.js`) and offered to the visitor's mail client via a prefilled
`mailto:` draft. `saveEnquiry` is the single place to add the real API/entity
write. Property data is likewise static — the same module is where a database
read belongs.

Photography is loaded from the Unsplash CDN so the site ships consistent
high-end architectural imagery without bundling binaries; `src/lib/images.js`
is the one place to repoint at a self-hosted CDN or a file store.

## Accessibility & performance

* semantic landmarks, a skip link, visible focus styles on every control
* carousel and gallery are keyboard operable with labelled controls; the gallery
  viewer is a labelled modal that restores focus and locks scroll
* descriptive `alt` text on content images; decorative images are `aria-hidden`
* images reserve their aspect ratio (no layout shift), are `loading="lazy"`
  below the fold, and ship responsive `srcSet`s
* animation is limited to opacity/transform and is fully disabled under
  `prefers-reduced-motion`

/**
 * Property catalogue.
 *
 * The shape here is deliberately database-friendly: a flat record with a
 * scalar id, filterable fields (type, region, price, beds, baths) and an
 * ordered image list. Swapping this module for an API or entity query later
 * means changing only the selectors at the bottom of the file.
 */

/* --- Photography pools ----------------------------------------------------- */

const EXTERIORS = [
  '1600596542815-ffad4c1539a9',
  '1600607687939-ce8a6c25118c',
  '1600585154340-be6161a56a0c',
  '1512917774080-9991f1c4c750',
  '1568605114967-8130f3a36994',
  '1570129477492-45c003edd2be',
  '1580587771525-78b9dba3b914',
  '1613490493576-7fde63acd811',
  '1613977257363-707ba9348227',
  '1600047509807-ba8f99d2cdde',
  '1512918728675-ed5a9ecdebfd',
  '1523217582562-09d0def993a6',
  '1449844908441-8829872d2607',
  '1502005229762-cf1b2da7c5d6',
  '1564013799919-ab600027ffc6',
  '1494526585095-c41746248156',
  '1600047509358-9dc75507daeb',
  '1600585152220-90363fe7e115',
  '1600585154526-990dced4db0d',
  '1605276374104-dee2a0ed3cd6'
];

const INTERIORS = [
  '1600210492486-724fe5c67fb0',
  '1600566753086-00f18fb6b3ea',
  '1600607688969-a5bfcd646154',
  '1600566753190-17f0baa2a6c3',
  '1600121848594-d8644e57abab',
  '1600566752355-35792bedcfea',
  '1583608205776-bfd35f0d9f83',
  '1600573472592-401b489a3cdc',
  '1600566752229-250ed79470f8',
  '1600210491369-e753d80a41f3'
];

/** Five gallery images per property: a lead exterior plus four interiors. */
const gallery = (exteriorIndex, title, leadCaption) => {
  const exterior = EXTERIORS[exteriorIndex % EXTERIORS.length];
  const stills = [
    { id: INTERIORS[exteriorIndex % INTERIORS.length], alt: `Living space of ${title}` },
    { id: INTERIORS[(exteriorIndex + 3) % INTERIORS.length], alt: `Kitchen of ${title}` },
    { id: INTERIORS[(exteriorIndex + 6) % INTERIORS.length], alt: `Principal suite of ${title}` },
    { id: INTERIORS[(exteriorIndex + 8) % INTERIORS.length], alt: `Bathroom of ${title}` }
  ];
  return [{ id: exterior, alt: leadCaption }, ...stills];
};

const AMENITIES = [
  'Infinity pool',
  'Home cinema',
  'Wine cellar',
  'Gym & wellness suite',
  'Smart home automation',
  'Landscaped gardens',
  'Heated terraces',
  'EV charging'
];

/* --- Records --------------------------------------------------------------- */

export const properties = [
  {
    id: 'lakeside-modern-villa',
    title: 'Lakeside Modern Villa',
    type: 'Villa',
    status: 'For Sale',
    price: 2350000,
    city: 'Austin',
    region: 'Texas',
    country: 'USA',
    beds: 5,
    baths: 6,
    sqft: 6420,
    lot: '0.85 acres',
    year: 2022,
    parking: 3,
    featured: true,
    agentId: 'daniel-morgan',
    tags: ['Waterfront', 'New build'],
    summary:
      'A glass-fronted villa on the water, arranged around a courtyard pool and framed by mature cypress.',
    description: [
      'Set on a quiet stretch of Lake Austin, this villa opens almost entirely to the water. The ground floor is a single continuous room — kitchen, dining and living — separated only by level changes and the pool terrace beyond.',
      'The first floor holds a principal suite with a private terrace, three further bedrooms, and a study that looks back up the lake. Materials are restrained throughout: oak, limestone, blackened steel and full-height glazing.'
    ],
    features: [
      'Full-height glazing to the lake',
      'Courtyard pool and sun terrace',
      'Chef\u2019s kitchen with island bench',
      'Principal suite with private terrace',
      'Detached guest studio',
      'Three-car garage with EV charging'
    ],
    amenities: AMENITIES,
    images: gallery(0, 'Lakeside Modern Villa', 'Lakeside Modern Villa at dusk, infinity pool in the foreground')
  },
  {
    id: 'pacific-glass-house',
    title: 'Pacific Glass House',
    type: 'Residence',
    status: 'For Sale',
    price: 4800000,
    city: 'Malibu',
    region: 'California',
    country: 'USA',
    beds: 6,
    baths: 7,
    sqft: 8150,
    lot: '1.2 acres',
    year: 2020,
    parking: 4,
    featured: true,
    agentId: 'olivia-carter',
    tags: ['Oceanfront', 'Architectural'],
    summary:
      'A cantilevered glass pavilion above the Pacific, designed around a single uninterrupted ocean view.',
    description: [
      'The house is organised so that the ocean is always in front of you. Every principal room faces west, and the terrace runs the full width of the elevation.',
      'Below, a guest level opens onto a sheltered garden with a 20-metre pool. A private path descends to the beach at the southern boundary.'
    ],
    features: [
      'Uninterrupted Pacific frontage',
      '20-metre lap pool',
      'Cantilevered principal wing',
      'Guest level with separate access',
      'Private beach path',
      'Motor court for four cars'
    ],
    amenities: AMENITIES,
    images: gallery(3, 'Pacific Glass House', 'Pacific Glass House above the ocean at blue hour')
  },
  {
    id: 'desert-horizon-estate',
    title: 'Desert Horizon Estate',
    type: 'Estate',
    status: 'For Sale',
    price: 3150000,
    city: 'Scottsdale',
    region: 'Arizona',
    country: 'USA',
    beds: 5,
    baths: 5,
    sqft: 7280,
    lot: '2.4 acres',
    year: 2021,
    parking: 3,
    featured: false,
    agentId: 'sophia-bennett',
    tags: ['Desert', 'Mountain views'],
    summary:
      'Low, horizontal volumes in stone and glass, oriented towards the McDowell ridgeline.',
    description: [
      'Built into a gentle rise, the estate presents a long, low elevation of stone and glass. Deep overhangs keep the interior cool and shade the terraces at midday.',
      'The plan wraps a central courtyard with a pool, so every room borrows light from the outside and the mountain view stays framed.'
    ],
    features: [
      'Framed mountain views',
      'Central courtyard and pool',
      'Rammed-earth and stone elevations',
      'Shaded outdoor dining pavilion',
      'Casita with private entry',
      'Desert-adapted landscaping'
    ],
    amenities: AMENITIES,
    images: gallery(4, 'Desert Horizon Estate', 'Desert Horizon Estate at sunset with mountain backdrop')
  },
  {
    id: 'oceanfront-residence',
    title: 'Oceanfront Residence',
    type: 'Residence',
    status: 'For Sale',
    price: 5200000,
    city: 'Miami',
    region: 'Florida',
    country: 'USA',
    beds: 6,
    baths: 8,
    sqft: 9400,
    lot: '0.6 acres',
    year: 2019,
    parking: 4,
    featured: true,
    agentId: 'james-wilson',
    tags: ['Beachfront', 'Investment'],
    summary:
      'Direct beach frontage with a rooftop terrace, a resort-level pool deck and a private dock.',
    description: [
      'The residence sits on a rare stretch of direct beach frontage, with the pool deck stepping down to the sand. A rooftop terrace takes the evening light on three sides.',
      'Inside, the reception rooms run the full depth of the plan, so the bay and the ocean are visible at once from the entrance hall.'
    ],
    features: [
      'Direct beach frontage',
      'Rooftop terrace with summer kitchen',
      'Resort pool deck and spa',
      'Private dock and boat lift',
      'Staff suite with separate access',
      'Storm-rated glazing throughout'
    ],
    amenities: AMENITIES,
    images: gallery(8, 'Oceanfront Residence', 'Oceanfront Residence with pool deck facing the sea')
  },
  {
    id: 'modern-hillside-retreat',
    title: 'Modern Hillside Retreat',
    type: 'Retreat',
    status: 'For Sale',
    price: 3750000,
    city: 'Los Angeles',
    region: 'California',
    country: 'USA',
    beds: 4,
    baths: 5,
    sqft: 5900,
    lot: '0.9 acres',
    year: 2023,
    parking: 2,
    featured: true,
    agentId: 'olivia-carter',
    tags: ['Hillside', 'City views'],
    summary:
      'A stepped hillside house with a glazed lower level opening onto an infinity edge above the city.',
    description: [
      'The house steps down the hillside in three clear volumes, each one opening fully to the terrace and the city beyond. The infinity edge pool reads as part of the horizon from the living room.',
      'The principal suite occupies its own floor, with a dressing room, a stone bathroom and a private deck.'
    ],
    features: [
      'Infinity edge pool',
      'Three stepped volumes',
      'Principal floor with private deck',
      'Glazed lower entertainment level',
      'Motorised shading throughout',
      'Gated approach and motor court'
    ],
    amenities: AMENITIES,
    images: gallery(5, 'Modern Hillside Retreat', 'Modern Hillside Retreat lit at dusk above the city')
  },
  {
    id: 'palm-garden-residence',
    title: 'Palm Garden Residence',
    type: 'Estate',
    status: 'For Sale',
    price: 6400000,
    city: 'Beverly Hills',
    region: 'California',
    country: 'USA',
    beds: 7,
    baths: 9,
    sqft: 11200,
    lot: '1.8 acres',
    year: 2018,
    parking: 5,
    featured: true,
    agentId: 'daniel-morgan',
    tags: ['Garden estate', 'Private'],
    summary:
      'A gated estate in mature gardens, with a north-south tennis court and a guest pavilion.',
    description: [
      'Behind a gated approach and a long palm-lined drive, the house sits low in mature gardens with the tennis court placed to the north.',
      'Reception rooms open on two sides to a loggia, a lawn and a pool terrace, and a separate guest pavilion sits at the far end of the garden.'
    ],
    features: [
      'Gated 1.8-acre grounds',
      'North-south tennis court',
      'Guest pavilion with kitchenette',
      'Loggia and formal lawn',
      'Library and study',
      'Five-car garage'
    ],
    amenities: AMENITIES,
    images: gallery(16, 'Palm Garden Residence', 'Palm Garden Residence at golden hour with gardens in front')
  },
  {
    id: 'contemporary-lake-house',
    title: 'Contemporary Lake House',
    type: 'Villa',
    status: 'For Sale',
    price: 2950000,
    city: 'Lake Tahoe',
    region: 'Nevada',
    country: 'USA',
    beds: 4,
    baths: 4,
    sqft: 4380,
    lot: '0.7 acres',
    year: 2022,
    parking: 2,
    featured: true,
    agentId: 'sophia-bennett',
    tags: ['Lakefront', 'Timber & glass'],
    summary:
      'Timber and glass volumes facing the lake, with a private pier and a sheltered winter garden.',
    description: [
      'The house is arranged as two timber-and-glass volumes joined by a glazed winter garden, so the lake stays in view from the entrance through to the far wall.',
      'A private pier sits at the water\u2019s edge, and a boot room and ski store handle the winter months without cluttering the main plan.'
    ],
    features: [
      'Private pier and boat mooring',
      'Glazed winter garden',
      'Timber and glass elevations',
      'Ski store and boot room',
      'Outdoor fire terrace',
      'Lake-facing principal suite'
    ],
    amenities: AMENITIES,
    images: gallery(9, 'Contemporary Lake House', 'Contemporary Lake House on the water with timber and glass elevations')
  },
  {
    id: 'architectural-downtown-penthouse',
    title: 'Architectural Downtown Penthouse',
    type: 'Penthouse',
    status: 'For Sale',
    price: 1850000,
    city: 'Austin',
    region: 'Texas',
    country: 'USA',
    beds: 3,
    baths: 3,
    sqft: 3120,
    lot: '—',
    year: 2021,
    parking: 2,
    featured: false,
    agentId: 'james-wilson',
    tags: ['City centre', 'Skyline views'],
    summary:
      'A full-floor penthouse with a wrap terrace and skyline views on three sides.',
    description: [
      'Occupying the whole of the top floor, the penthouse is wrapped by a terrace that runs continuously around three elevations.',
      'Interiors are pared back — stone, oak and bronze — so the skyline does the work. A private lift lobby opens directly into the apartment.'
    ],
    features: [
      'Wraparound terrace',
      'Private lift lobby',
      'Skyline views on three sides',
      'Concierge and residents\u2019 gym',
      'Two secure parking spaces',
      'Full-floor plan with no shared walls'
    ],
    amenities: ['Concierge', 'Residents\u2019 gym', 'Rooftop pool', 'Smart home automation', 'Secure parking', 'Storage room', 'Pet friendly', 'EV charging'],
    images: gallery(12, 'Architectural Downtown Penthouse', 'Architectural Downtown Penthouse terrace overlooking the skyline')
  },
  {
    id: 'canyon-ridge-villa',
    title: 'Canyon Ridge Villa',
    type: 'Villa',
    status: 'For Sale',
    price: 2600000,
    city: 'Sedona',
    region: 'Arizona',
    country: 'USA',
    beds: 4,
    baths: 5,
    sqft: 5240,
    lot: '3.1 acres',
    year: 2020,
    parking: 3,
    featured: false,
    agentId: 'olivia-carter',
    tags: ['Canyon views', 'Landscape'],
    summary:
      'A single-storey villa on a ridge, with a long pool aligned to the canyon mouth.',
    description: [
      'The plan is a single storey, arranged so the pool runs parallel to the ridge line and frames the canyon beyond.',
      'Bedrooms are placed in a separate wing behind a planted courtyard, keeping the living spaces quiet and open.'
    ],
    features: [
      'Canyon-facing pool terrace',
      'Single-storey plan',
      'Planted internal courtyard',
      'Outdoor shower and spa',
      'Workshop and studio space',
      'Native landscape restoration'
    ],
    amenities: AMENITIES,
    images: gallery(14, 'Canyon Ridge Villa', 'Canyon Ridge Villa with pool aligned to the canyon view')
  },
  {
    id: 'marina-sky-penthouse',
    title: 'Marina Sky Penthouse',
    type: 'Penthouse',
    status: 'For Sale',
    price: 3400000,
    city: 'Seattle',
    region: 'Washington',
    country: 'USA',
    beds: 3,
    baths: 4,
    sqft: 3860,
    lot: '—',
    year: 2023,
    parking: 2,
    featured: false,
    agentId: 'daniel-morgan',
    tags: ['Water views', 'New build'],
    summary:
      'A duplex penthouse over the marina, with a glazed stair and a double-height living room.',
    description: [
      'Arranged over two floors, the penthouse places its double-height living room at the corner, where the marina and the sound meet.',
      'A glass stair connects the two levels, and the upper floor is given over entirely to the principal suite and a study.'
    ],
    features: [
      'Double-height corner living room',
      'Glazed feature stair',
      'Principal floor with study',
      'Two terraces, east and west',
      'Berth available by separate agreement',
      'Residents\u2019 spa and pool'
    ],
    amenities: ['Concierge', 'Residents\u2019 spa', 'Pool and sauna', 'Berth available', 'Smart home automation', 'Secure parking', 'Storage room', 'Pet friendly'],
    images: gallery(17, 'Marina Sky Penthouse', 'Marina Sky Penthouse with double-height glazing over the marina')
  }
];

/* --- Selectors & derived data ---------------------------------------------- */

export const propertyBySlug = (slug) => properties.find((property) => property.id === slug) ?? null;

export const featuredProperties = () => properties.filter((property) => property.featured);

export const propertyTypes = () => [...new Set(properties.map((property) => property.type))].sort();

/** Distinct cities, used by the location facet. */
export const propertyRegions = () =>
  [...new Set(properties.map((property) => `${property.city}|${property.region}`))]
    .map((entry) => {
      const [city, region] = entry.split('|');
      return { value: city, label: `${city}, ${region}` };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

export const priceBounds = () => {
  const prices = properties.map((property) => property.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
};

/** Properties in the same region or of the same type, most similar first. */
export const similarProperties = (property, limit = 3) => {
  if (!property) return [];
  return properties
    .filter((candidate) => candidate.id !== property.id)
    .map((candidate) => ({
      property: candidate,
      score:
        (candidate.region === property.region ? 2 : 0) +
        (candidate.type === property.type ? 2 : 0) +
        (Math.abs(candidate.price - property.price) < 1500000 ? 1 : 0)
    }))
    .sort((a, b) => b.score - a.score || a.property.price - b.property.price)
    .slice(0, limit)
    .map((entry) => entry.property);
};

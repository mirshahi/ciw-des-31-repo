/** Company-wide content: brand, navigation, contact details and social links. */

export const site = {
  name: 'Horizon Properties',
  tagline: 'Exceptional homes & investments',
  founded: 2004,
  phone: '(555) 246-7890',
  phoneHref: 'tel:+15552467890',
  email: 'hello@horizonproperties.com',
  address: {
    street: '1200 Congress Avenue, Suite 2400',
    city: 'Austin',
    region: 'TX',
    postal: '78701',
    country: 'USA'
  },
  hours: 'Mon – Sat, 9:00 – 18:00 CT',
  description:
    'Horizon Properties curates architectural homes, private estates and investment property across the United States. Founded in 2004, we advise buyers, sellers and investors who value design as much as location.'
};

export const addressLines = [
  site.address.street,
  `${site.address.city}, ${site.address.region} ${site.address.postal}`,
  site.address.country
];

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' }
];

export const social = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'Pinterest', href: 'https://pinterest.com', icon: 'pinterest' }
];

export const footerLinks = {
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Our Team', to: '/team' },
    { label: 'Services', to: '/services' },
    { label: 'Contact', to: '/contact' }
  ],
  Properties: [
    { label: 'All Properties', to: '/properties' },
    { label: 'Featured Homes', to: '/properties?featured=1' },
    { label: 'Villas', to: '/properties?type=Villa' },
    { label: 'Penthouses', to: '/properties?type=Penthouse' }
  ]
};

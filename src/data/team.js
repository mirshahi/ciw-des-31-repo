/**
 * Team members. Each member doubles as the listing agent referenced by
 * `agentId` on a property, so the team data has a single home here.
 */

export const team = [
  {
    id: 'daniel-morgan',
    name: 'Daniel Morgan',
    role: 'Managing Director',
    image: '1560250097-0b93528c311a',
    short:
      'Leads the firm and its architectural sales division, with two decades advising on landmark residential projects.',
    bio: 'Daniel founded Horizon Properties in 2004 after a decade in architectural development. He leads the firm\u2019s $100M+ portfolio and represents landmark residences across Texas and California.',
    phone: '(555) 246-7890',
    email: 'daniel.morgan@horizonproperties.com',
    specialties: ['Architectural homes', 'Portfolio strategy'],
    social: [
      { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
      { label: 'Email Daniel Morgan', href: 'mailto:daniel.morgan@horizonproperties.com', icon: 'mail' }
    ]
  },
  {
    id: 'olivia-carter',
    name: 'Olivia Carter',
    role: 'Luxury Property Advisor',
    image: '1573496359142-b8d87734a5a2',
    short:
      'Guides private clients through the acquisition of design-led homes in coastal and hillside markets.',
    bio: 'Olivia advises private clients on design-led homes and off-market opportunities, with a particular focus on the California coast. She is known for a discreet, detail-obsessed process.',
    phone: '(555) 246-7911',
    email: 'olivia.carter@horizonproperties.com',
    specialties: ['Coastal estates', 'Off-market acquisitions'],
    social: [
      { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
      { label: 'Email Olivia Carter', href: 'mailto:olivia.carter@horizonproperties.com', icon: 'mail' }
    ]
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    role: 'Investment Consultant',
    image: '1507003211169-0a1dd7228f2d',
    short:
      'Models yield, hold periods and portfolio risk for buyers acquiring residential real estate at scale.',
    bio: 'James builds the financial case behind every acquisition — yield modelling, hold periods, and portfolio risk. He works with family offices and first-time investors alike.',
    phone: '(555) 246-7922',
    email: 'james.wilson@horizonproperties.com',
    specialties: ['Yield modelling', 'Portfolio risk'],
    social: [
      { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
      { label: 'Email James Wilson', href: 'mailto:james.wilson@horizonproperties.com', icon: 'mail' }
    ]
  },
  {
    id: 'sophia-bennett',
    name: 'Sophia Bennett',
    role: 'Senior Property Specialist',
    image: '1580489944761-15a19d654956',
    short:
      'Runs valuation, staging and marketing for the firm\u2019s most design-forward listings.',
    bio: 'Sophia runs valuation, staging and campaign strategy for the firm\u2019s most design-forward listings. Her campaigns routinely place properties in front of qualified buyers within weeks.',
    phone: '(555) 246-7933',
    email: 'sophia.bennett@horizonproperties.com',
    specialties: ['Valuation', 'Listing campaigns'],
    social: [
      { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
      { label: 'Email Sophia Bennett', href: 'mailto:sophia.bennett@horizonproperties.com', icon: 'mail' }
    ]
  }
];

export const getTeamMember = (id) => team.find((member) => member.id === id);

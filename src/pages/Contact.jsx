import PageHero from '../components/layout/PageHero';
import EnquiryForm from '../components/contact/EnquiryForm';
import Icon from '../components/ui/Icon';
import Reveal from '../components/ui/Reveal';
import { addressLines, site } from '../data/site';
import { team } from '../data/team';
import { toTelHref } from '../lib/format';
import useDocumentTitle from '../lib/useDocumentTitle';
import './Contact.css';

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postal}`
)}`;

export default function Contact() {
  useDocumentTitle('Contact');

  const channels = [
    {
      icon: 'phone',
      label: 'Call the office',
      value: site.phone,
      href: toTelHref(site.phone),
      note: site.hours
    },
    {
      icon: 'mail',
      label: 'Email us',
      value: site.email,
      href: `mailto:${site.email}`,
      note: 'Replies within one working day'
    },
    {
      icon: 'map-pin',
      label: 'Visit the office',
      value: addressLines.join(', '),
      href: MAPS_URL,
      note: 'Appointments recommended'
    }
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your next move"
        text="Tell us what you are looking for, or what you are thinking of selling. A senior adviser will come back to you within one working day."
        image="1568605114967-8130f3a36994"
      />

      <section className="section" aria-label="Contact details and enquiry form">
        <div className="container contact">
          <Reveal className="contact__info">
            <h2 className="h3">Speak to a person, not a form</h2>
            <p className="contact__lead">
              Every enquiry is read by an adviser. If your question is urgent — a viewing, an offer
              deadline — call the office directly.
            </p>

            <ul className="contact__channels">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <span className="contact__icon" aria-hidden="true">
                    <Icon name={channel.icon} size={18} />
                  </span>
                  <div>
                    <p className="contact__label">{channel.label}</p>
                    {channel.href ? (
                      <a
                        className="contact__value"
                        href={channel.href}
                        target={channel.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <p className="contact__value">{channel.value}</p>
                    )}
                    <p className="contact__note">{channel.note}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="contact__team">
              <p className="contact__label">Or contact an adviser directly</p>
              <ul>
                {team.map((member) => (
                  <li key={member.id}>
                    <a href={member.social.find((link) => link.icon === 'mail')?.href}>
                      <span>{member.name}</span>
                      <small>{member.role}</small>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="contact__form" delay={120}>
            <div className="contact__card">
              <h2 className="contact__card-title">Send an enquiry</h2>
              <p className="contact__card-text">
                Share a few details and we will match you with the right adviser.
              </p>
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

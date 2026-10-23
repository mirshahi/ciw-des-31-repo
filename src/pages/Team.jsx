import PageHero from '../components/layout/PageHero';
import CtaSection from '../components/home/CtaSection';
import Icon from '../components/ui/Icon';
import Photo from '../components/ui/Photo';
import Reveal from '../components/ui/Reveal';
import { team } from '../data/team';
import { toTelHref } from '../lib/format';
import useDocumentTitle from '../lib/useDocumentTitle';
import './Team.css';

export default function Team() {
  useDocumentTitle('Team');

  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Senior advisers, not a call centre"
        text="Four specialists, each with a defined brief. You will work with one of them directly — from the first conversation to the day you get the keys."
        image="1600585154340-be6161a56a0c"
      />

      <section className="section" aria-label="Team members">
        <div className="container">
          <ul className="team-page">
            {team.map((member, index) => {
              const email = member.social.find((link) => link.icon === 'mail')?.href;
              const tel = toTelHref(member.phone);

              return (
                <Reveal as="li" key={member.id} delay={index * 70} className="team-page__row">
                  <div className="team-page__media">
                    <Photo
                      id={member.image}
                      alt={`Portrait of ${member.name}, ${member.role} at Horizon Properties`}
                      ratio="4 / 5"
                      sizes="(max-width: 900px) 64vw, 24vw"
                      widths={[360, 560, 768]}
                    />
                  </div>

                  <div className="team-page__copy">
                    <h2 className="team-page__name">{member.name}</h2>
                    <p className="team-page__role">{member.role}</p>
                    <p className="team-page__bio">{member.bio}</p>

                    <ul className="team-page__specialties">
                      {member.specialties.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    <ul className="team-page__contact">
                      {email ? (
                        <li>
                          <a href={email}>
                            <Icon name="mail" size={16} />
                            <span>{member.email}</span>
                          </a>
                        </li>
                      ) : null}
                      {tel ? (
                        <li>
                          <a href={tel}>
                            <Icon name="phone" size={16} />
                            <span>{member.phone}</span>
                          </a>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

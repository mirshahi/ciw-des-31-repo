import Icon from '../ui/Icon';
import Photo from '../ui/Photo';
import Reveal from '../ui/Reveal';
import './TeamGrid.css';

/** Portrait card for one team member, with hover-revealed contact links. */
export function TeamCard({ member, priority = false }) {
  return (
    <article className="team-card">
      <div className="team-card__media">
        <Photo
          id={member.image}
          alt={`Portrait of ${member.name}, ${member.role} at Horizon Properties`}
          ratio="4 / 5"
          sizes="(max-width: 640px) 84vw, (max-width: 1024px) 44vw, 23vw"
          widths={[360, 560, 768]}
          priority={priority}
          imgClassName="team-card__img"
        />

        <ul className="team-card__social">
          {member.social.map((link) => (
            <li key={link.label}>
              <a href={link.href} aria-label={link.label} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                <Icon name={link.icon} size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="team-card__info">
        <h3 className="team-card__name">{member.name}</h3>
        <p className="team-card__role">{member.role}</p>
      </div>
    </article>
  );
}

/** Responsive grid of team members. */
export default function TeamGrid({ members, className = '' }) {
  return (
    <ul className={`team-grid ${className}`.trim()}>
      {members.map((member, index) => (
        <Reveal as="li" key={member.id} delay={index * 70}>
          <TeamCard member={member} />
        </Reveal>
      ))}
    </ul>
  );
}

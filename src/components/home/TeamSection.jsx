import { Link } from 'react-router-dom';
import { team } from '../../data/team';
import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import TeamGrid from '../team/TeamGrid';
import Reveal from '../ui/Reveal';
import './TeamSection.css';

/** Homepage team block. */
export default function TeamSection() {
  return (
    <section className="section team-section" id="team" aria-labelledby="team-title">
      <div className="container">
        <SectionHeading
          eyebrow="Our Team"
          title="The people you will work with"
          text="A small senior team, each with a defined specialism — and the same names on your file from first call to completion."
          align="center"
          titleId="team-title"
        />

        <TeamGrid members={team} />

        <Reveal className="team-section__more">
          <Link className="link-arrow" to="/team">
            <span>Meet the full team</span>
            <Icon name="arrow-right" size={16} className="link-arrow__icon" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import CtaSection from '../components/home/CtaSection';
import TeamGrid from '../components/team/TeamGrid';
import Icon from '../components/ui/Icon';
import Photo from '../components/ui/Photo';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import { reasons, stats } from '../data/services';
import { site } from '../data/site';
import { team } from '../data/team';
import useDocumentTitle from '../lib/useDocumentTitle';
import './About.css';

const PROCESS = [
  {
    title: 'Brief',
    text: 'We start with the requirement — budget, location, timing, and what the property has to do for you.'
  },
  {
    title: 'Search & shortlist',
    text: 'On-market and off-market options, filtered hard, with the trade-offs written down rather than implied.'
  },
  {
    title: 'View & negotiate',
    text: 'Accompanied viewings, then a documented negotiation and a completion schedule you can rely on.'
  }
];

export default function About() {
  useDocumentTitle('About Us');

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Twenty years of architectural property"
        text={`${site.name} was founded in ${site.founded} to represent design-led homes and investment property properly — with evidence, discretion and a named adviser on every file.`}
        image="1512918728675-ed5a9ecdebfd"
      />

      <section className="section" aria-labelledby="story-title">
        <div className="container about-page__story">
          <Reveal className="about-page__copy">
            <p className="eyebrow">Our story</p>
            <h2 className="h2" id="story-title">
              Built around the client, not the listing
            </h2>
            <p className="lead">
              We began with a single conviction: that architecture deserves representation that
              understands it. Two decades later the firm still works the same way — small, senior,
              and deliberately unhurried.
            </p>
            <p>
              Our advisers handle a limited number of mandates at a time, which means the person who
              takes your brief is the person who negotiates your offer and calls you on completion.
              Where we advise on investment, the numbers are documented: yield, hold period, and the
              assumptions behind them.
            </p>

            <ul className="about-page__stats">
              {stats.map((stat) => (
                <li key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="about-page__media" delay={120}>
            <div className="about-page__frame">
              <Photo
                id="1502005229762-cf1b2da7c5d6"
                alt="Modern hillside residence with cantilevered upper floor"
                ratio="4 / 5"
                sizes="(max-width: 940px) 100vw, 42vw"
                widths={[560, 768, 1080]}
              />
            </div>
            <div className="about-page__frame about-page__frame--offset">
              <Photo
                id="1600585152220-90363fe7e115"
                alt="Rear elevation of a contemporary home with terrace and pool"
                ratio="1 / 1"
                sizes="(max-width: 940px) 60vw, 26vw"
                widths={[480, 768]}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="values-title">
        <div className="container">
          <SectionHeading
            eyebrow="How we work"
            title="Four commitments we hold to"
            text="They are not slogans — each one changes how a mandate is run."
            align="center"
            titleId="values-title"
          />

          <ul className="about-page__values">
            {reasons.map((reason, index) => (
              <Reveal as="li" key={reason.id} delay={index * 70}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container about-page__process">
          <Reveal>
            <p className="eyebrow">The process</p>
            <h2 className="h2" id="process-title">
              From first brief to completion
            </h2>
          </Reveal>

          <ol className="about-page__steps">
            {PROCESS.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 80}>
                <span className="about-page__step-num">{`0${index + 1}`}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="about-team-title">
        <div className="container">
          <SectionHeading
            eyebrow="Our Team"
            title="The people behind the advice"
            align="center"
            titleId="about-team-title"
          />
          <TeamGrid members={team} />
          <div className="about-page__more">
            <Link className="link-arrow" to="/team">
              <span>More about the team</span>
              <Icon name="arrow-right" size={16} className="link-arrow__icon" />
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

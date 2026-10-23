import { reasons, stats } from '../../data/services';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import './WhyChoose.css';

/** Dark, quiet section that carries the firm's evidence and differentiators. */
export default function WhyChoose() {
  return (
    <section className="section why" id="why" aria-labelledby="why-title">
      <div className="container">
        <div className="why__head">
          <Reveal className="why__intro">
            <p className="eyebrow eyebrow--on-dark">Why Choose Horizon</p>
            <h2 className="why__title" id="why-title">
              Represented properly, advised honestly
            </h2>
          </Reveal>
          <Reveal className="why__lede" delay={100}>
            <p>
              Twenty years of architectural sales and investment advisory, run by a small senior
              team who stay on the file. No handovers, no product to sell — just the evidence you
              need to decide well.
            </p>
          </Reveal>
        </div>

        <Reveal className="why__stats" as="ul">
          {stats.map((stat) => (
            <li key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </Reveal>

        <ul className="why__list">
          {reasons.map((reason, index) => (
            <Reveal as="li" key={reason.id} delay={index * 70}>
              <span className="why__num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="why__reason">{reason.title}</h3>
              <p className="why__text">{reason.text}</p>
              <Icon name="arrow-up-right" size={17} className="why__mark" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

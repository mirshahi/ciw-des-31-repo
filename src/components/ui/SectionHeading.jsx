import Reveal from './Reveal';
import './SectionHeading.css';

/**
 * The repeated eyebrow + title + supporting text block.
 * `align="center"` is used by the homepage sections; the default is left.
 */
export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  onDark = false,
  as: Tag = 'h2',
  titleId,
  titleClassName = '',
  className = '',
  children
}) {
  return (
    <Reveal className={`section-head ${align === 'center' ? 'section-head--centered' : ''} ${className}`.trim()}>
      {eyebrow ? (
        <p className={`eyebrow ${onDark ? 'eyebrow--on-dark' : ''} ${align === 'center' ? 'eyebrow--centered' : ''}`.trim()}>
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <Tag id={titleId} className={`section-head__title ${titleClassName}`.trim()}>
          {title}
        </Tag>
      ) : null}
      {text ? <p className="section-head__text">{text}</p> : null}
      {children}
    </Reveal>
  );
}

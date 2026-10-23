/**
 * Single stroke-based icon set.
 *
 * All glyphs share a 24x24 box and inherit `currentColor`, which keeps the
 * visual language consistent and avoids pulling in an icon dependency.
 */

const paths = {
  'arrow-right': ['M5 12h13', 'M12.5 6.5 19 12l-6.5 5.5'],
  'arrow-left': ['M19 12H6', 'M11.5 6.5 5 12l6.5 5.5'],
  'arrow-up-right': ['M7.5 16.5 16.5 7.5', 'M9 7.5h7.5V15'],
  'chevron-down': ['M6 9.5 12 15.5l6-6'],
  'chevron-left': ['M14.5 5.5 8 12l6.5 6.5'],
  'chevron-right': ['M9.5 5.5 16 12l-6.5 6.5'],
  'chevron-up': ['M6 14.5 12 8.5l6 6'],
  phone: [
    'M7 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z'
  ],
  mail: ['M3.5 6.5h17v11h-17z', 'm3.5 7 8.5 6 8.5-6'],
  'map-pin': ['M12 21.5s7-5.8 7-11a7 7 0 1 0-14 0c0 5.2 7 11 7 11z', 'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'],
  bed: ['M3.5 19.5v-8', 'M3.5 15h17v4.5', 'M20.5 15v-1.5a3 3 0 0 0-3-3h-6V15', 'M7.5 12.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'],
  bath: ['M3.5 12.5h17V15a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4z', 'M6.5 12.5V6.8A2.3 2.3 0 0 1 8.8 4.5c1.2 0 2.1.9 2.4 1.9', 'M6.5 19 5.5 21.5', 'M17.5 19l1 2.5'],
  ruler: ['M8 3.5 3.5 8l12.5 12.5L20.5 16z', 'M9.5 7l2 2', 'M12 9.5l2 2', 'M14.5 12l2 2'],
  heart: [
    'M12 20s-7.5-4.6-7.5-9.7A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20z'
  ],
  menu: ['M3.5 7h17', 'M3.5 12h17', 'M3.5 17h17'],
  close: ['M6 6l12 12', 'M18 6 6 18'],
  search: ['M10.8 18a7.2 7.2 0 1 0 0-14.4 7.2 7.2 0 0 0 0 14.4z', 'm16.2 16.2 4.3 4.3'],
  check: ['M20 6.5 9.5 17 4.5 12'],
  plus: ['M12 5v14', 'M5 12h14'],
  minus: ['M5 12h14'],
  sliders: ['M4 7h10', 'M18 7h2', 'M4 17h4', 'M12 17h8', 'M16 4.5v5', 'M8 14.5v5'],
  calendar: ['M4 6.5h16v13H4z', 'M4 11h16', 'M8.5 3.5v4', 'M15.5 3.5v4'],
  expand: ['M9 4.5H4.5V9', 'M15 4.5H19.5V9', 'M9 19.5H4.5V15', 'M15 19.5H19.5V15'],
  key: ['M8.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', 'm11 14 8-8', 'm16 5.5 2.5 2.5', 'm14 9 2.5 2.5'],
  star: ['m12 4 2.4 5.2 5.6.7-4.2 3.8 1.2 5.6L12 16.6l-5 2.7 1.2-5.6L4 9.9l5.6-.7z'],
  building: ['M5 20.5V4.5h9v16', 'M14 10.5h5v10', 'M8 8h3', 'M8 12h3', 'M8 16h3', 'M17 14h.01'],
  shield: ['M12 3.5 5 6.2v5.3c0 4.3 3 7.2 7 9 4-1.8 7-4.7 7-9V6.2z', 'm9 12 2 2 4-4'],
  users: ['M8.5 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', 'M3.5 20a5 5 0 0 1 10 0', 'M16 5.2a3.5 3.5 0 0 1 0 6.6', 'M17 14.6a5 5 0 0 1 3.5 4.8'],
  play: ['M9 6.5 18 12l-9 5.5z'],
  'check-circle': ['M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17z', 'm8.5 12 2.4 2.4 4.6-4.8'],
  logout: ['M15 7V4.5H4.5v15H15V17', 'M10 12h10', 'm17 9 3 3-3 3'],
  instagram: ['M7.5 3.5h9a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4z', 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M17.2 6.9h.01'],
  linkedin: ['M4.5 4.5h15v15h-15z', 'M8 10.5v6', 'M8 7.6v.01', 'M12 16.5v-3.4a2.3 2.3 0 0 1 4.6 0v3.4'],
  facebook: ['M14.5 3.5H12A3.5 3.5 0 0 0 8.5 7v3H6v3h2.5v7.5h3V13H15l.5-3h-4V7.3a.8.8 0 0 1 .8-.8h2.2z'],
  pinterest: ['M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17z', 'M10 21l2.4-8.6', 'M9.4 13.6a3.6 3.6 0 1 1 3.1 4.4']
};

export default function Icon({ name, size = 20, strokeWidth = 1.6, className = '', ...rest }) {
  const glyph = paths[name];
  if (!glyph) return null;

  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

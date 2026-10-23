import { useCallback, useState } from 'react';
import { image, imageSrcSet } from '../../lib/images';
import './Photo.css';

/**
 * Responsive, lazily loaded photograph.
 *
 * - reserves its aspect ratio so nothing shifts while loading
 * - ships a `srcSet` so small viewports never download 1920px files
 * - fades in once decoded
 *
 * `fetchpriority` is written in lower case on purpose: React 18 does not map
 * the camelCase `fetchPriority` prop and warns about it.
 */
export default function Photo({
  id,
  alt,
  ratio = '4 / 3',
  widths = [480, 768, 1080, 1600],
  sizes = '100vw',
  priority = false,
  quality = 78,
  className = '',
  imgClassName = '',
  overlay = false,
  fill = false,
  children
}) {
  const [loaded, setLoaded] = useState(false);

  // `onLoad` can be missed when the image is already in cache by the time
  // React attaches its handler; the ref callback covers that case.
  const captureRef = useCallback((node) => {
    if (node?.complete) setLoaded(true);
  }, []);

  return (
    <div
      className={`photo ${fill ? 'photo--fill' : ''} ${className}`.trim()}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      <img
        ref={captureRef}
        className={`photo__img ${loaded ? 'is-loaded' : ''} ${imgClassName}`.trim()}
        src={image(id, { w: 1080, q: quality })}
        srcSet={imageSrcSet(id, widths, { q: quality })}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : undefined}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
      {overlay ? <span className="photo__scrim" aria-hidden="true" /> : null}
      {children}
    </div>
  );
}

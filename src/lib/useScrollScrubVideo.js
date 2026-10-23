import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-driven video scrubbing for the hero.
 *
 * The scroll position — never playback — drives the timeline. The clip stays
 * paused for its whole life and only `currentTime` is ever written, so the
 * camera inside it answers directly to the scroll wheel in both directions and
 * freezes on the exact frame where the user stops.
 *
 * What this module does to keep that at frame rate:
 *
 * - The scroll listener never touches the video. It only wakes the animation
 *   loop, which reads `scrollY` once per frame.
 * - `currentTime` is written from inside `requestAnimationFrame`, never from a
 *   scroll event, and only when the new position would actually change the
 *   displayed frame (SEEK_EPSILON). A burst of scroll events therefore cannot
 *   flood the decoder with seeks.
 * - The written time approaches the scroll-derived target through a
 *   frame-rate independent exponential, which removes the hard step a raw
 *   `scrollY -> currentTime` mapping shows. The lag is clamped (MAX_LAG) so the
 *   smoothing can never trail far enough behind to feel detached, and it snaps
 *   (SEEK_EPSILON) so the clip always lands on the exact frame of the target.
 * - Progress is written straight onto the section as a custom property instead
 *   of into React state, so scrolling re-renders nothing.
 * - The loop parks itself once the target is settled and the user has stopped,
 *   and the whole clip is downloaded up front, so no seek ever waits on the
 *   network.
 *
 * Encoding is what really decides whether seeking is smooth, and the browser
 * will not forgive a badly encoded source: a clip with a single keyframe and a
 * trailing index re-decodes from frame 0 on every seek. The MP4s this hook
 * loads are encoded for random access — a keyframe every 6 frames (0.25 s), no
 * B-frames, no audio track, `+faststart` — which is what makes writing
 * `currentTime` many times a second viable. A WebM/VP9 source with the same
 * dense-keyframe policy can be added as an extra `<source>`, but every browser
 * that matters takes the MP4, so it only earns its bytes elsewhere.
 */

/** Half a frame at the clip's 24 fps: below this a write cannot change the
 *  displayed frame, so issuing one would be pure decoder work. */
const SEEK_EPSILON = 1 / 48;
/** Time constant of the exponential approach, in seconds. Lower is tighter. */
const SMOOTH_TAU = 0.1;
/** Ceiling on how far the smoothing may trail the scroll, in seconds of video. */
const MAX_LAG = 0.28;
/** While a seek is still in flight, a target this far away wins a new seek. */
const SEEK_OVERRIDE = 0.25;
/** Settled frames before the animation loop parks. */
const IDLE_FRAMES = 5;
/** Phones get the smaller encode and a slightly shorter track. */
const MOBILE_QUERY = '(max-width: 767px)';

const clamp = (value, min, max) => (value < min ? min : value > max ? max : value);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Reads a whole response, reporting progress when the length is known. */
async function readAll(response, total, report) {
  if (!response.body?.getReader) return response.blob();

  const reader = response.body.getReader();
  const chunks = [];
  let received = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    if (total) report(Math.min(1, received / total));
  }

  return new Blob(chunks, { type: 'video/mp4' });
}

/** Resolves once a frame is decoded and painted, rejects if the clip fails. */
function whenFirstFrameReady(video) {
  if (video.readyState >= 2) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const settle = (error) => {
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('error', onError);
      if (error) reject(error);
      else resolve();
    };
    const onReady = () => settle(null);
    const onError = () => settle(new Error('Video failed to decode'));

    video.addEventListener('loadeddata', onReady);
    video.addEventListener('error', onError);
  });
}

export default function useScrollScrubVideo({ src, mobileSrc }) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const videoRef = useRef(null);

  const [status, setStatus] = useState('loading');
  const [loaded, setLoaded] = useState(0);
  const [reduced, setReduced] = useState(prefersReducedMotion);

  // Honour a change to the OS setting without a reload.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  // `active` decides the layout: the pinned scroll track only exists when the
  // clip can genuinely be scrubbed.
  const active = !reduced && status !== 'failed';

  // --- Download the clip completely before anything is scrubbed -------------
  useEffect(() => {
    if (reduced) return undefined;

    // Picked once: swapping mid-session would mean a second download.
    const url = window.matchMedia(MOBILE_QUERY).matches && mobileSrc ? mobileSrc : src;
    const controller = new AbortController();
    let objectUrl = '';

    async function prepare() {
      try {
        const video = videoRef.current;
        if (!video) return;

        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`Video request failed: ${response.status}`);

        const total = Number(response.headers.get('content-length')) || 0;
        let reported = 0;
        const blob = await readAll(response, total, (ratio) => {
          if (ratio < 1 && ratio - reported < 0.01) return;
          reported = ratio;
          setLoaded(ratio);
        });

        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
        video.load();
        await whenFirstFrameReady(video);
        if (!controller.signal.aborted) setStatus('ready');
      } catch {
        // Aborted unmounts are not failures; anything else falls back to the
        // photograph that already sits behind the video.
        if (!controller.signal.aborted) setStatus('failed');
      }
    }

    prepare();

    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [reduced, src, mobileSrc]);

  // --- Scroll to timeline ---------------------------------------------------
  useEffect(() => {
    if (!active || status !== 'ready') return undefined;

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const video = videoRef.current;
    if (!section || !viewport || !video) return undefined;

    const duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) return undefined;

    // Measured on mount and on resize only — never inside the frame loop, so
    // the loop performs no layout reads.
    let from = 0;
    let span = 1;
    const measure = () => {
      from = section.getBoundingClientRect().top + window.scrollY;
      span = Math.max(1, section.offsetHeight - viewport.offsetHeight);
    };
    measure();

    let target = 0;
    let current = 0;
    let written = -1;
    let lastProgress = -1;
    let idle = 0;
    let raf = 0;
    let lastTs = 0;
    let primed = false;

    const write = (value) => {
      video.currentTime = value;
      written = value;
    };

    const tick = (timestamp) => {
      const dt = lastTs ? Math.min((timestamp - lastTs) / 1000, 0.05) : 1 / 60;
      lastTs = timestamp;

      const progress = clamp((window.scrollY - from) / span, 0, 1);
      section.style.setProperty('--hero-p', progress.toFixed(4));
      target = progress * duration;

      // A page that is already scrolled in (a refresh mid-hero, a deep link)
      // starts on the right frame instead of swooping to it.
      if (!primed) {
        primed = true;
        current = target;
      }

      const gap = target - current;
      let settled = false;

      if (Math.abs(gap) < SEEK_EPSILON) {
        current = target;
        settled = true;
      } else {
        current += gap * (1 - Math.exp(-dt / SMOOTH_TAU));
        if (Math.abs(target - current) > MAX_LAG) {
          current = target - Math.sign(gap) * MAX_LAG;
        }
      }

      if (settled) {
        // Landing exactly is what makes the stop feel deliberate.
        if (Math.abs(written - current) > 1e-4) write(current);
      } else if (
        Math.abs(current - written) >= SEEK_EPSILON &&
        // Let an in-flight seek finish rather than queueing behind it, unless
        // the scroll has run far enough ahead that responsiveness wins.
        (!video.seeking || Math.abs(current - written) > SEEK_OVERRIDE)
      ) {
        write(current);
      }

      if (settled && progress === lastProgress) {
        if (++idle > IDLE_FRAMES) {
          raf = 0;
          return;
        }
      } else {
        idle = 0;
      }
      lastProgress = progress;

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf) return;
      lastTs = 0;
      raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      measure();
      start();
    };

    window.addEventListener('scroll', start, { passive: true });
    window.addEventListener('resize', onResize);
    start();

    return () => {
      window.removeEventListener('scroll', start);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
      // Hand the hero back to its static styling unchanged.
      section.style.removeProperty('--hero-p');
    };
  }, [active, status]);

  return { sectionRef, viewportRef, videoRef, status, loaded, active };
}

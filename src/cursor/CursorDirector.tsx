import { useLayoutEffect } from 'react';
import { engine, ScrollTrigger } from './engine';

// decided once, before anything is prepared
engine.mode = engine.detectMode();

const HERO_ORDER = ['designer', 'developer', 'architect', 'innovator', 'builder', 'creator', 'explorer'];

/**
 * Wires the original page to the cursor engine:
 *  - hero elements ([data-hero]) are assembled right after the page appears
 *  - every other [data-piece] is assembled by a collaborator when it scrolls into view
 * Renders nothing.
 */
export default function CursorDirector() {
  useLayoutEffect(() => {
    if (engine.mode === 'off') return;
    const all = [...document.querySelectorAll<HTMLElement>('main [data-piece]')];
    engine.prep(all);

    const hero = all
      .filter(p => p.hasAttribute('data-hero'))
      .sort((a, b) => HERO_ORDER.indexOf(a.dataset.by!) - HERO_ORDER.indexOf(b.dataset.by!));
    const rest = all.filter(p => !p.hasAttribute('data-hero'));

    let handle: { skip: () => void } | null = null;
    let killDrag = () => {};
    // let the page's own fade-in settle before measuring
    const start = setTimeout(() => {
      handle = engine.assembleList(hero, {
        stagger: 0.3,
        onComplete: () => {
          engine.startPresence();
          killDrag = engine.enableDrag(hero.filter(h => h.hasAttribute('data-drag')));
        },
      });
    }, 950);

    // the visitor takes over: scrolling or a key press finishes the intro instantly
    const skip = () => handle?.skip();
    window.addEventListener('wheel', skip, { passive: true, once: true });
    window.addEventListener('touchmove', skip, { passive: true, once: true });
    window.addEventListener('keydown', skip, { once: true });

    const triggers = ScrollTrigger.batch(rest, {
      start: 'top 95%',
      once: true,
      onEnter: els => { engine.assembleList(els as HTMLElement[]); },
    });
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 1000);

    return () => {
      clearTimeout(start); clearTimeout(refresh);
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchmove', skip);
      window.removeEventListener('keydown', skip);
      triggers.forEach(t => t.kill());
      killDrag();
    };
  }, []);
  return null;
}

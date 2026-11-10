import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { CURSORS, CursorId, cursorById } from './cursors';

gsap.registerPlugin(ScrollTrigger, Draggable);

/**
 * Multiplayer cursor engine.
 *
 * Any element marked `data-piece` is hidden at an offset and then dragged into its real
 * position by one of the collaborator cursors when it scrolls into view.
 *
 * Optional attributes (all have automatic defaults):
 *   data-by="designer"        which cursor places it (default: next cursor in rotation)
 *   data-from="x,y,rotation"  start offset (default: picked from a fixed set of offsets)
 *   data-label="heading"      layer name shown in the cursor label (default: first heading inside)
 *   data-action="marquee"     the cursor draws a frame around it and it is revealed inside
 *   data-drag                 visitors can drag it around afterwards
 *
 * Cursors live in a document-space layer (they scroll with the page like on a design canvas)
 * and are moved with GSAP transforms only, so React never re-renders during the choreography.
 */

export type Mode = 'full' | 'touch' | 'off';
type Refs = { root: HTMLElement; label: HTMLElement; action: HTMLElement; bubble: HTMLElement; trails: HTMLElement[] };

const OFFSETS = [
  [-280, 120, -8], [260, 160, 7], [-200, -120, 6], [320, -80, -6],
  [-340, 60, 9], [220, 220, -5], [0, 240, -4], [-160, 200, 5],
];

function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function docRect(el: HTMLElement, ignoreTransform: boolean) {
  const prev = el.style.transform;
  if (ignoreTransform) el.style.transform = 'none';
  const r = el.getBoundingClientRect();
  if (ignoreTransform) el.style.transform = prev;
  return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
}

class CursorEngine {
  mode: Mode = 'full';
  layer: HTMLElement | null = null;
  heroDone = false;

  private refs = new Map<CursorId, Refs>();
  private running = new Map<CursorId, gsap.core.Timeline>();
  private roamTw = new Map<CursorId, gsap.core.Tween>();
  private leaveTw = new Map<CursorId, gsap.core.Tween>();
  private rng = new Map<CursorId, () => number>();
  private hist = new Map<CursorId, { x: number; y: number }[]>();
  private still = new Map<CursorId, number>();
  private waved = new Map<CursorId, number>();
  private visible = new Set<CursorId>();
  private frames = new Map<CursorId, HTMLElement>();
  private pointer = { x: -9999, y: -9999 };
  private ticking = false;
  private nextCursor = 0;
  private nextOffset = 0;

  /* ───────── setup ───────── */
  detectMode(): Mode {
    if (typeof window === 'undefined') return 'off';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'off';
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) return 'touch';
    return 'full';
  }

  setLayer(el: HTMLElement | null) { this.layer = el; }

  register(id: CursorId, refs: Refs) {
    this.refs.set(id, refs);
    this.rng.set(id, mulberry32(CURSORS.findIndex(c => c.id === id) * 977 + 13));
    this.hist.set(id, []);
    gsap.set(refs.root, { x: -200, y: -200, opacity: 0 });
    this.startTicker();
  }

  unregister(id: CursorId) {
    this.roamTw.get(id)?.kill();
    this.roamTw.delete(id);
    this.leaveTw.get(id)?.kill();
    this.running.get(id)?.kill();
    this.visible.delete(id);
    this.refs.delete(id);
    if (!this.refs.size) this.stopTicker();
  }

  private scale() { return window.innerWidth < 640 ? 0.35 : window.innerWidth < 1100 ? 0.6 : 1; }

  /** Fill in automatic cursor / offset / label for a piece (deterministic, in document order). */
  private resolve(p: HTMLElement) {
    if (!p.dataset.by) p.dataset.by = CURSORS[this.nextCursor++ % CURSORS.length].id;
    if (!p.dataset.from) p.dataset.from = OFFSETS[this.nextOffset++ % OFFSETS.length].join(',');
    if (!p.dataset.label) {
      const h = p.querySelector('h1,h2,h3,h4');
      const t = (h?.textContent || p.getAttribute('aria-label') || p.textContent || '').trim().replace(/\s+/g, ' ');
      p.dataset.label = t ? (t.length > 22 ? `${t.slice(0, 22)}…` : t) : 'layer';
    }
  }

  private from(p: HTMLElement) {
    const s = this.scale();
    const [x, y, r] = (p.dataset.from || '0,0,0').split(',').map(Number);
    return { x: x * s, y: y * s, r };
  }

  /** Hide pieces at their starting offset. Call before first paint. */
  prep(pieces: HTMLElement[]) {
    if (this.mode === 'off') return;
    pieces.forEach(p => {
      if (p.dataset.placed || p.dataset.prepped) return;
      p.dataset.prepped = '1';
      this.resolve(p);
      if (p.dataset.action === 'marquee') {
        gsap.set(p, { clipPath: 'inset(0% 100% 0% 0%)' });
        return;
      }
      const f = this.from(p);
      gsap.set(p, { x: f.x, y: f.y, rotation: f.r, opacity: 0 });
    });
  }

  /* ───────── cursor primitives ───────── */
  private pos(id: CursorId) {
    const r = this.refs.get(id)!.root;
    return { x: gsap.getProperty(r, 'x') as number, y: gsap.getProperty(r, 'y') as number };
  }

  /** Bring a cursor on stage near (x, y); if hidden or far away it enters from its home edge. */
  private enter(id: CursorId, x: number, y: number) {
    const c = this.refs.get(id);
    if (!c) return;
    this.leaveTw.get(id)?.kill();
    const p = this.pos(id);
    const far = !this.visible.has(id) || Math.abs(p.y - y) > window.innerHeight * 1.1;
    if (far) {
      const vx = window.scrollX, vy = window.scrollY, W = window.innerWidth, H = window.innerHeight;
      const edge = cursorById[id].edge;
      const clampX = (v: number) => Math.min(Math.max(v, vx + 40), vx + W - 120);
      const clampY = (v: number) => Math.min(Math.max(v, vy + 90), vy + H - 80);
      const ex = edge === 'left' ? vx - 80 : edge === 'right' ? vx + W + 30 : clampX(x + (edge === 'top' ? -140 : 160));
      const ey = edge === 'top' ? vy - 90 : edge === 'bottom' ? vy + H + 30 : clampY(y + 110);
      gsap.set(c.root, { x: ex, y: ey, scale: 1 });
      this.hist.set(id, []);
    }
    this.visible.add(id);
    gsap.to(c.root, { opacity: 1, duration: 0.25, overwrite: 'auto' });
  }

  private hide(id: CursorId) {
    this.visible.delete(id);
    this.refs.get(id)?.trails.forEach(t => (t.style.opacity = '0'));
  }

  private say(id: CursorId, text: string | null) {
    const c = this.refs.get(id);
    if (!c) return;
    c.action.textContent = text ? `· ${text}` : '';
    gsap.fromTo(c.label, { scale: 0.88 }, { scale: 1, duration: 0.4, ease: 'back.out(3)', overwrite: true });
  }

  private ripple(id: CursorId) {
    if (!this.refs.has(id) || !this.layer) return;
    const { x, y } = this.pos(id);
    const r = document.createElement('span');
    r.className = 'mc-ripple';
    r.style.color = cursorById[id].color;
    this.layer.appendChild(r);
    gsap.fromTo(r, { x, y, scale: 0.2, opacity: 0.9 }, { scale: 1.5, opacity: 0, duration: 0.6, ease: 'power2.out', onComplete: () => r.remove() });
  }

  private frame(id: CursorId, label: string) {
    let f = this.frames.get(id);
    const col = cursorById[id].color;
    if (!f || !f.isConnected) {
      f = document.createElement('div');
      f.className = 'mc-frame';
      f.style.borderColor = col;
      f.innerHTML =
        ['-4px,-4px', 'calc(100% - 4px),-4px', '-4px,calc(100% - 4px)', 'calc(100% - 4px),calc(100% - 4px)']
          .map(p => { const [l, t] = p.split(','); return `<i style="left:${l};top:${t};border-color:${col}"></i>`; })
          .join('') + `<b style="background:${col}"></b>`;
      this.layer?.appendChild(f);
      this.frames.set(id, f);
    }
    f.querySelector('b')!.textContent = `Frame · ${label}`;
    return f;
  }

  /* ───────── steps ───────── */
  private dragStep(tl: gsap.core.Timeline, id: CursorId, piece: HTMLElement, n: number) {
    const c = this.refs.get(id)!;
    const f = this.from(piece);
    const t = { gx: 0, gy: 0, sx: 0, sy: 0 };
    const L = `s${n}`;

    tl.addLabel(L);
    tl.call(() => {
      const r = docRect(piece, true);
      // grab near the top-left area, inside the element
      t.gx = r.x + Math.min(r.w * 0.35, 160); t.gy = r.y + Math.min(r.h * 0.35, 60);
      t.sx = t.gx + f.x; t.sy = t.gy + f.y;
      piece.style.setProperty('--sel', cursorById[id].color);
      this.enter(id, t.sx, t.sy);
      this.say(id, `moving ${piece.dataset.label}`);
    }, undefined, L);
    tl.to(c.root, { x: () => t.sx, y: () => t.sy, duration: 0.75, ease: 'power2.inOut' }, L);
    tl.to(piece, { opacity: 1, duration: 0.3 }, `${L}+=0.3`);
    tl.call(() => piece.classList.add('mc-hovered'), undefined, `${L}+=0.55`);
    tl.call(() => { piece.classList.replace('mc-hovered', 'mc-held'); this.ripple(id); }, undefined, `${L}+=0.75`);
    tl.to(c.root, { scale: 0.84, duration: 0.12 }, `${L}+=0.75`);
    tl.to(piece, { x: 0, y: 0, rotation: 0, duration: 0.85, ease: 'power3.inOut' }, `${L}+=0.87`);
    tl.to(c.root, { x: () => t.gx, y: () => t.gy, duration: 0.85, ease: 'power3.inOut' }, `${L}+=0.87`);
    tl.to(c.root, { scale: 1, duration: 0.2, ease: 'back.out(3)' }, `${L}+=1.72`);
    tl.call(() => { piece.classList.remove('mc-held', 'mc-hovered'); this.placed(piece); }, undefined, `${L}+=1.8`);
  }

  /** The cursor draws a frame, then the element is revealed inside it. */
  private marqueeStep(tl: gsap.core.Timeline, id: CursorId, piece: HTMLElement, n: number) {
    const c = this.refs.get(id)!;
    const r = { x: 0, y: 0, w: 0, h: 0 };
    const prog = { v: 0 };
    const L = `s${n}`;
    let f: HTMLElement | null = null;

    tl.addLabel(L);
    tl.call(() => {
      Object.assign(r, docRect(piece, false));
      r.x -= 12; r.y -= 8; r.w += 24; r.h += 16;
      f = this.frame(id, piece.dataset.label || 'Heading');
      gsap.set(f, { left: r.x, top: r.y, width: 0, height: 0, opacity: 1 });
      this.enter(id, r.x, r.y);
      this.say(id, `creating ${piece.dataset.label}`);
    }, undefined, L);
    tl.to(c.root, { x: () => r.x, y: () => r.y, duration: 0.8, ease: 'power2.inOut' }, L);
    tl.call(() => this.ripple(id), undefined, `${L}+=0.8`);
    tl.to(c.root, { scale: 0.84, duration: 0.12 }, `${L}+=0.8`);
    tl.to(prog, { v: 1, duration: 1, ease: 'power2.inOut', onUpdate: () => { if (f) gsap.set(f, { width: r.w * prog.v, height: r.h * prog.v }); } }, `${L}+=0.92`);
    tl.to(c.root, { x: () => r.x + r.w, y: () => r.y + r.h, duration: 1, ease: 'power2.inOut' }, `${L}+=0.92`);
    tl.to(c.root, { scale: 1, duration: 0.2, ease: 'back.out(3)' }, `${L}+=1.92`);
    tl.to(piece, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power3.out' }, `${L}+=1.75`);
    tl.call(() => {
      if (f) gsap.to(f, { opacity: 0, duration: 0.5 });
      gsap.set(piece, { clearProps: 'clipPath' });
      this.placed(piece);
    }, undefined, `${L}+=2.7`);
  }

  private placed(piece: HTMLElement) {
    if (piece.dataset.placed) return;
    piece.dataset.placed = '1';
    piece.dispatchEvent(new CustomEvent('placed'));
  }

  /* ───────── scripts ───────── */
  private script(id: CursorId, pieces: HTMLElement[], delay: number, done: () => void) {
    this.roamTw.get(id)?.kill();
    this.roamTw.delete(id);
    const prev = this.running.get(id);
    if (prev && prev.progress() < 1) prev.progress(1, false);
    const tl = gsap.timeline({ delay, onComplete: () => { this.idle(id); done(); } });
    pieces.forEach((p, n) => (p.dataset.action === 'marquee' ? this.marqueeStep(tl, id, p, n) : this.dragStep(tl, id, p, n)));
    this.running.set(id, tl);
    return tl;
  }

  /** Touch devices: no pointers, just a tap ring and the collaborator's name chip. */
  private touchScript(pieces: HTMLElement[], done: () => void) {
    const tl = gsap.timeline({ onComplete: done });
    pieces.forEach((p, i) => {
      const at = i * 0.12;
      tl.call(() => this.tapChip(p), undefined, at);
      if (p.dataset.action === 'marquee') tl.to(p, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power3.out' }, at);
      else tl.to(p, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.85, ease: 'expo.out' }, at);
      tl.call(() => { if (p.dataset.action === 'marquee') gsap.set(p, { clearProps: 'clipPath' }); this.placed(p); }, undefined, at + 0.9);
    });
    return tl;
  }

  private tapChip(p: HTMLElement) {
    if (!this.layer) return;
    const def = cursorById[(p.dataset.by as CursorId) || 'designer'];
    const r = docRect(p, true);
    const el = document.createElement('div');
    el.className = 'mc-tap';
    el.innerHTML = `<span class="mc-ripple" style="color:${def.color}"></span><span class="mc-label" style="background:${def.color}">${def.name}</span>`;
    this.layer.appendChild(el);
    gsap.set(el, { x: r.x + Math.min(r.w * 0.5, 110), y: r.y + Math.min(r.h * 0.5, 28) });
    gsap.fromTo(el.firstElementChild, { scale: 0.2, opacity: 0.9 }, { scale: 1.4, opacity: 0, duration: 0.7, ease: 'power2.out' });
    gsap.fromTo(el.lastElementChild, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.25 });
    gsap.to(el, { opacity: 0, duration: 0.35, delay: 1, onComplete: () => el.remove() });
  }

  /** Place a set of pieces: each cursor takes its own pieces, cursors work in parallel. */
  assembleList(list: HTMLElement[], opts: { stagger?: number; onComplete?: () => void } = {}) {
    // elements hidden by layout (e.g. desktop-only columns on phones) are simply shown in place
    list.filter(p => !p.getClientRects().length).forEach(p => { gsap.set(p, { x: 0, y: 0, rotation: 0, opacity: 1, clearProps: 'clipPath' }); this.placed(p); });
    const pieces = this.mode === 'off' ? [] : list.filter(p => !p.dataset.placed && !p.dataset.queued);
    if (!pieces.length) { opts.onComplete?.(); return { skip: () => {} }; }
    pieces.forEach(p => { this.resolve(p); p.dataset.queued = '1'; });

    const tls: gsap.core.Timeline[] = [];
    let left = 0;
    const done = () => { if (--left === 0) opts.onComplete?.(); };

    if (this.mode === 'touch' || !this.refs.size) {
      left = 1;
      tls.push(this.touchScript(pieces, done));
    } else {
      const groups = new Map<CursorId, HTMLElement[]>();
      pieces.forEach(p => {
        const id = p.dataset.by as CursorId;
        groups.set(id, [...(groups.get(id) || []), p]);
      });
      left = groups.size;
      [...groups.entries()].forEach(([id, ps], i) => tls.push(this.script(id, ps, i * (opts.stagger ?? 0.18), done)));
    }
    return { skip: () => tls.forEach(t => t.progress(1, false)) };
  }

  /** After a script: roamers keep wandering once the hero is built, the rest step away. */
  private idle(id: CursorId) {
    const c = this.refs.get(id);
    if (!c) return;
    this.say(id, null);
    if (cursorById[id].roams) { if (this.heroDone) this.roam(id); return; }
    const p = this.pos(id);
    this.leaveTw.set(id, gsap.to(c.root, {
      x: p.x + 70, y: p.y + 50, opacity: 0, duration: 0.8, delay: 0.35, ease: 'power2.in',
      onComplete: () => this.hide(id),
    }));
  }

  /* ───────── ambient presence ───────── */
  startPresence() {
    this.heroDone = true;
    if (this.mode !== 'full') return;
    const roamers = CURSORS.filter(c => c.roams).slice(0, window.innerWidth < 1100 ? 2 : 3);
    CURSORS.forEach(c => {
      if (roamers.includes(c)) { if (!this.running.get(c.id)?.isActive()) this.roam(c.id); }
    });
  }

  private roam(id: CursorId) {
    const c = this.refs.get(id);
    if (!c || this.mode !== 'full') return;
    const rnd = this.rng.get(id)!;
    const def = cursorById[id];
    const step = () => {
      const x = window.scrollX + window.innerWidth * (0.05 + rnd() * 0.84);
      const y = window.scrollY + window.innerHeight * (0.16 + rnd() * 0.68);
      this.enter(id, x, y);
      if (rnd() < 0.3) this.chat(id, def.chatter[Math.floor(rnd() * def.chatter.length)]);
      this.roamTw.set(id, gsap.to(c.root, { x, y, duration: 2.2 + rnd() * 1.8, delay: 1 + rnd() * 2.6, ease: 'sine.inOut', onComplete: step }));
    };
    step();
  }

  private chat(id: CursorId, msg: string) {
    const c = this.refs.get(id);
    if (!c) return;
    c.bubble.textContent = msg;
    gsap.timeline()
      .fromTo(c.bubble, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)', overwrite: true })
      .to(c.bubble, { opacity: 0, scale: 0.9, duration: 0.3, delay: 2.2 });
  }

  /* ───────── shared ticker: trails + greeting the visitor ───────── */
  private onPointer = (e: PointerEvent) => { this.pointer.x = e.pageX; this.pointer.y = e.pageY; };

  private startTicker() {
    if (this.ticking) return;
    this.ticking = true;
    gsap.ticker.add(this.tick);
    window.addEventListener('pointermove', this.onPointer, { passive: true });
  }

  private stopTicker() {
    this.ticking = false;
    gsap.ticker.remove(this.tick);
    window.removeEventListener('pointermove', this.onPointer);
  }

  private tick = () => {
    const now = performance.now();
    this.refs.forEach((c, id) => {
      if (!this.visible.has(id)) return;
      const h = this.hist.get(id)!;
      const p = this.pos(id);
      const last = h[h.length - 1];

      if (this.roamTw.has(id) && now - (this.waved.get(id) || 0) > 9000 && Math.hypot(p.x - this.pointer.x, p.y - this.pointer.y) < 80) {
        this.waved.set(id, now);
        this.chat(id, 'hey 👋');
      }

      if (last && last.x === p.x && last.y === p.y) {
        const s = (this.still.get(id) || 0) + 1;
        this.still.set(id, s);
        if (s > 16) return;
      } else this.still.set(id, 0);

      h.push(p);
      if (h.length > 14) h.shift();
      const speed = Math.min(1, Math.hypot(p.x - h[0].x, p.y - h[0].y) / 200);
      c.trails.forEach((t, i) => {
        const q = h[Math.max(0, h.length - 2 - i * 2)];
        t.style.transform = `translate3d(${q.x - 3.5}px, ${q.y - 3.5}px, 0) scale(${1 - i * 0.15})`;
        t.style.opacity = String(speed * (0.6 - i * 0.1));
      });
    });
  };

  /* ───────── visitor drag & drop ───────── */
  enableDrag(els: HTMLElement[]) {
    if (this.mode !== 'full') return () => {};
    const made = els.map(el =>
      Draggable.create(el, {
        type: 'x,y',
        zIndexBoost: true,
        onPress() { gsap.to(el, { scale: 1.03, rotation: -1.2, duration: 0.2, overwrite: 'auto' }); },
        onRelease() { gsap.to(el, { scale: 1, rotation: 0, duration: 0.35, ease: 'back.out(2)', overwrite: 'auto' }); },
      })[0],
    );
    return () => made.forEach(d => d.kill());
  }
}

export const engine = new CursorEngine();
export { gsap, ScrollTrigger };

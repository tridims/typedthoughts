import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

export type MagicBentoItem = {
  title: string;
  description?: string;
  href: string;
  imageSrc?: string;
  dateText?: string;
};

export type MagicBentoProps = {
  items: MagicBentoItem[];
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  particleCount?: number;
  // Accepts either a CSS color (e.g. "var(--color-primary)" or "#aabbcc")
  // or a raw RGB triple string like "132, 0, 255" for backward compatibility.
  glowColor?: string;
  enableSpotlight?: boolean;
  spotlightRadius?: number;
  /**
   * Force a specific number of columns. If omitted, auto-fit responsive grid is used.
   * Set to 1 for a single, wider column layout.
   */
  columns?: number;
  /**
   * Max width for the container. If not provided, defaults to 54rem (auto) or 72rem (when columns === 1).
   */
  maxWidth?: number | string;
};

const DEFAULT_PARTICLE_COUNT = 10;
// Default to Tailwind theme primary so it adapts to light/dark via global.css
const DEFAULT_GLOW_COLOR = "var(--color-primary)";
const MOBILE_BREAKPOINT = 768;
const DEFAULT_SPOTLIGHT_RADIUS = 300;

function calculateSpotlightValues(radius: number) {
  return { proximity: radius * 0.5, fade: radius * 0.9 };
}

function updateCardGlowVars(card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) {
  const rect = card.getBoundingClientRect();
  const relX = ((mouseX - rect.left) / rect.width) * 100;
  const relY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty("--glow-x", `${relX}%`);
  card.style.setProperty("--glow-y", `${relY}%`);
  card.style.setProperty("--glow-intensity", glow.toFixed(3));
  card.style.setProperty("--glow-radius", `${radius}px`);
}

function GlobalSpotlight({ gridRef, enabled = true, radius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR, disabled = false }: {
  gridRef: React.RefObject<HTMLDivElement | null>;
  enabled?: boolean;
  radius?: number;
  glowColor?: string;
  disabled?: boolean;
}) {
  const spotRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    if (disabled || !enabled || !gridRef.current) return;
    const spot = document.createElement("div");
    // Use color-mix so CSS variables (e.g. var(--color-primary)) respect theme
    spot.style.cssText = `position:fixed; width:${radius * 2.4}px; height:${radius * 2.4}px; border-radius:50%; pointer-events:none; transform:translate(-50%,-50%); mix-blend-mode:screen; z-index:30; opacity:0; background: radial-gradient(circle,
      color-mix(in oklch, ${glowColor} 18%, transparent) 0%,
      color-mix(in oklch, ${glowColor} 8%, transparent) 35%,
      color-mix(in oklch, ${glowColor} 3%, transparent) 60%,
      transparent 75%)`;
    document.body.appendChild(spot);
    spotRef.current = spot;

    const onMove = (e: MouseEvent) => {
      const grid = gridRef.current!;
      if (!activeRef.current) {
        // If we're not inside the grid, keep spotlight hidden and glows off
        gsap.to(spot, { opacity: 0, duration: 0.2, ease: "power2.out" });
        return;
      }
      const cards = grid.querySelectorAll<HTMLElement>(".card");
      const { proximity, fade } = calculateSpotlightValues(radius);

      // Guard: if pointer is well outside the grid bounds, hide spotlight and skip work
      const gr = grid.getBoundingClientRect();
      const margin = radius; // allow some leeway for in-between glow near edges
      if (
        e.clientX < gr.left - margin ||
        e.clientX > gr.right + margin ||
        e.clientY < gr.top - margin ||
        e.clientY > gr.bottom + margin
      ) {
        cards.forEach((c) => c.style.setProperty("--glow-intensity", "0"));
        gsap.to(spot, { opacity: 0, duration: 0.2, ease: "power2.out" });
        return;
      }

      let minDist = Infinity;
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2;
        const eff = Math.max(0, dist);
        minDist = Math.min(minDist, eff);
        let glow = 0;
        if (eff <= proximity) glow = 1;
        else if (eff <= fade) glow = (fade - eff) / (fade - proximity);
        updateCardGlowVars(card, e.clientX, e.clientY, glow, radius);
      });

      gsap.to(spot, { left: e.clientX, top: e.clientY, duration: 0.08, ease: "power2.out" });
      const targetOpacity = minDist <= proximity ? 0.8 : minDist <= fade ? ((fade - minDist) / (fade - proximity)) * 0.8 : 0;
      gsap.to(spot, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.4, ease: "power2.out" });
    };

    const onLeaveDoc = () => {
      const grid = gridRef.current!;
      const cards = grid.querySelectorAll<HTMLElement>(".card");
      cards.forEach((c) => c.style.setProperty("--glow-intensity", "0"));
      gsap.to(spot, { opacity: 0, duration: 0.3, ease: "power2.out" });
    };

    const onGridEnter = () => {
      activeRef.current = true;
    };
    const onGridLeave = () => {
      activeRef.current = false;
      const grid = gridRef.current!;
      const cards = grid.querySelectorAll<HTMLElement>(".card");
      cards.forEach((c) => c.style.setProperty("--glow-intensity", "0"));
      gsap.to(spot, { opacity: 0, duration: 0.2, ease: "power2.out" });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeaveDoc);
    const gridEl = gridRef.current;
    gridEl?.addEventListener("mouseenter", onGridEnter);
    gridEl?.addEventListener("mouseleave", onGridLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeaveDoc);
      gridEl?.removeEventListener("mouseenter", onGridEnter);
      gridEl?.removeEventListener("mouseleave", onGridLeave);
      spot.remove();
    };
  }, [disabled, enabled, glowColor, gridRef, radius]);

  return null;
}

const createParticle = (x: number, y: number, colorCss = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "mb-particle";
  el.style.cssText = `
  position: absolute; width: 4px; height: 4px; border-radius: 9999px;
  color: ${colorCss}; background: currentColor; box-shadow: 0 0 6px currentColor;
  pointer-events: none; left: ${x}px; top: ${y}px; z-index: 2;`;
  return el;
};

function useIsMobile() {
  const [isMobile, set] = useState(false);
  useEffect(() => {
    const f = () => set(window.innerWidth <= MOBILE_BREAKPOINT);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return isMobile;
}

function ParticleCard({
  children,
  className,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true,
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const isHover = useRef(false);

  // Normalize to a CSS color string: if input is an RGB triple, wrap with rgb(); otherwise pass through.
  const resolvedColor = useMemo(() => {
    if (!glowColor) return DEFAULT_GLOW_COLOR;
    return /\d+\s*,\s*\d+\s*,\s*\d+/.test(glowColor) ? `rgb(${glowColor})` : glowColor;
  }, [glowColor]);

  const initParticles = useCallback(() => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    const base: HTMLDivElement[] = Array.from({ length: particleCount }, () =>
      createParticle(Math.random() * width, Math.random() * height, resolvedColor)
    );
    base.forEach((p, i) => {
      const t = window.setTimeout(() => {
        if (!isHover.current || !ref.current) return;
        const node = p.cloneNode(true) as HTMLDivElement;
        ref.current!.appendChild(node);
        particlesRef.current.push(node);
        gsap.fromTo(node, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.7)" });
        gsap.to(node, { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 80, duration: 1.6 + Math.random(), ease: "sine.inOut", repeat: -1, yoyo: true });
        gsap.to(node, { opacity: 0.25, duration: 1.2, ease: "power2.inOut", repeat: -1, yoyo: true });
      }, i * 80);
      timeoutsRef.current.push(t);
    });
  }, [particleCount, resolvedColor]);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    timeoutsRef.current = [];
    particlesRef.current.forEach((p) => {
      gsap.to(p, { scale: 0, opacity: 0, duration: 0.2, ease: "back.in(1.7)", onComplete: () => p.remove() });
    });
    particlesRef.current = [];
  }, []);

  useEffect(() => {
    if (!ref.current || disabled) return;
    const el = ref.current;

    const onEnter = () => {
      isHover.current = true;
      initParticles();
      gsap.to(el, { boxShadow: "0 8px 25px rgba(0,0,0,.15)", duration: 0.2 });
    };
    const onLeave = () => {
      isHover.current = false;
      clearParticles();
      gsap.to(el, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.25, ease: "power2.out" });
    };
    const onMove = (e: MouseEvent) => {
      if (disabled) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const cx = r.width / 2;
      const cy = r.height / 2;
  // Update position vars; intensity is managed by GlobalSpotlight
  el.style.setProperty("--glow-x", `${(x / r.width) * 100}%`);
  el.style.setProperty("--glow-y", `${(y / r.height) * 100}%`);
      if (enableTilt) {
        gsap.to(el, { rotateX: ((y - cy) / cy) * -6, rotateY: ((x - cx) / cx) * 6, transformPerspective: 1000, duration: 0.1, ease: "power2.out" });
      }
      if (enableMagnetism) {
        gsap.to(el, { x: (x - cx) * 0.04, y: (y - cy) * 0.04, duration: 0.2, ease: "power2.out" });
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const maxD = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - r.width, y),
        Math.hypot(x, y - r.height),
        Math.hypot(x - r.width, y - r.height)
      );
      const ripple = document.createElement("div");
      ripple.style.cssText = `position:absolute; width:${maxD * 2}px; height:${maxD * 2}px; border-radius:50%; left:${x - maxD}px; top:${y - maxD}px; pointer-events:none; z-index:3; background: radial-gradient(circle,
        color-mix(in oklch, ${resolvedColor} 35%, transparent) 0%,
        color-mix(in oklch, ${resolvedColor} 15%, transparent) 30%,
        transparent 70%)`;
      el.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.6, ease: "power2.out", onComplete: () => ripple.remove() });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("click", onClick);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("click", onClick);
      clearParticles();
    };
  }, [clickEffect, clearParticles, disabled, enableMagnetism, enableTilt, initParticles]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

export default function MagicBento({
  items,
  textAutoHide = true,
  enableStars = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableSpotlight = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  columns,
  maxWidth,
}: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const disabled = isMobile; // disable heavy effects on mobile

  // Normalize glow color to CSS color string
  const glowCssColor = useMemo(() => {
    if (!glowColor) return DEFAULT_GLOW_COLOR;
    return /\d+\s*,\s*\d+\s*,\s*\d+/.test(glowColor) ? `rgb(${glowColor})` : glowColor;
  }, [glowColor]);

  const baseCardClass = "card relative z-0 min-h-56 sm:min-h-64 w-full p-4 rounded-2xl border font-light overflow-hidden transition-all duration-200" +
    " hover:-translate-y-0.5" +
    (enableBorderGlow ? " card--border-glow" : "");

  const cardStyle: React.CSSProperties = useMemo(() => ({
    // Use theme variables from global.css so colors respond to light/dark
    backgroundColor: "var(--color-card)",
    color: "var(--color-card-foreground)",
    position: "relative",
    overflow: "hidden",
    // CSS vars consumed by ::after glow style below
    ["--glow-x" as any]: "50%",
    ["--glow-y" as any]: "50%",
    ["--glow-intensity" as any]: "0",
    ["--glow-radius" as any]: "200px",
  }), []);

  return (
    <>
      <style>{`
        .mb-grid {
          /* The glow color is now provided via inline style var(--mb-glow-color) */
        }
        .card--border-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 6px;
          background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            color-mix(in oklch, var(--mb-glow-color) calc(var(--glow-intensity) * 80%), transparent) 0%,
            color-mix(in oklch, var(--mb-glow-color) calc(var(--glow-intensity) * 40%), transparent) 30%,
            transparent 60%);
          border-radius: inherit;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          pointer-events: none;
          z-index: 1;
        }
        .mb-title { display:block; font-weight:600; }
        .mb-desc { opacity:.9; }
        .text-clamp-1 { display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:1; overflow:hidden; }
        .text-clamp-2 { display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; overflow:hidden; }
      `}</style>

      {enableSpotlight && (
        <GlobalSpotlight gridRef={gridRef} enabled={enableSpotlight} radius={spotlightRadius} glowColor={glowCssColor} disabled={disabled} />
      )}

      <div
        className="mb-grid w-full mx-auto p-2 sm:p-3"
        style={{ ["--mb-glow-color" as any]: glowCssColor, maxWidth: maxWidth ?? (columns === 1 ? "72rem" : "54rem") }}
      >
        <div
          ref={gridRef}
          className="grid gap-3"
          style={{
            gridTemplateColumns: columns && columns > 0 ? (columns === 1 ? "1fr" : `repeat(${columns}, minmax(0, 1fr))`) : "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {items.map((it, i) => {
            const card = (
              <>
                {it.imageSrc && (
                  <img src={it.imageSrc} alt={it.title} className="absolute inset-0 w-full h-full object-cover opacity-20" loading="lazy" />
                )}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="text-xs opacity-80">{it.dateText}</div>
                  <div>
                    <span className={`mb-title text-base sm:text-lg ${textAutoHide ? "text-clamp-1" : ""}`}>{it.title}</span>
                    {it.description && (
                      <p className={`mb-desc text-xs sm:text-sm ${textAutoHide ? "text-clamp-2" : ""}`}>{it.description}</p>
                    )}
                  </div>
                </div>
                <a href={it.href} className="absolute inset-0 z-20" aria-label={it.title}></a>
              </>
            );

            const className = baseCardClass; // keep uniform sizing to avoid overlap / off-screen stacking

            if (enableStars) {
              return (
                <ParticleCard
                  key={i}
                  className={className}
                  style={cardStyle}
                  particleCount={particleCount}
                  glowColor={glowCssColor}
                  enableTilt={enableTilt}
                  enableMagnetism={enableMagnetism}
                  clickEffect={clickEffect}
                  disabled={disabled}
                >
                  {card}
                </ParticleCard>
              );
            }

            return (
              <div key={i} className={className} style={cardStyle}>
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

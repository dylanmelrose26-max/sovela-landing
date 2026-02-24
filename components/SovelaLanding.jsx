import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   SOVELA — Complete Landing Page (Parts 1 + 2 + 3)
   Premium neo-minimalist SaaS for luxury hair salons
   ══════════════════════════════════════════════════════════════ */

/* ─── Design Tokens ─── */
const T = {
  colors: {
    bgPrimary:    "#F9F8F6",
    bgSurface:    "#FFFFFF",
    bgSurfaceAlt: "#F4F2EF",
    textPrimary:  "#222222",
    textSecondary:"#6B6560",
    textTertiary: "#9B9590",
    accent:       "#BFA89E",
    accentHover:  "#A99084",
    accentLight:  "rgba(191,168,158,0.10)",
    border:       "rgba(34,34,34,0.06)",
    borderHover:  "rgba(34,34,34,0.12)",
  },
  fonts: {
    heading: "'Montserrat', sans-serif",
    body:    "'Montserrat', sans-serif",
  },
  spacing: {
    sectionY: "clamp(80px, 12vw, 160px)",
    contentX: "clamp(24px, 5vw, 80px)",
    maxWidth: "1280px",
  },
  radius: { pill: "999px", card: "16px", cardLg: "24px" },
  transitions: {
    smooth: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    fast:   "all 0.2s ease",
  },
};

/* ─── Animation Helpers ─── */
function FadeInUp({ children, delay = 0, className = "", style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
      willChange: "opacity, transform",
      ...style,
    }}>{children}</div>
  );
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transition: `opacity 1s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

/* ─── Decorative ─── */
function SparkleIcon({ size = 16, color = T.colors.accent, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" fill={color} opacity="0.6" />
    </svg>
  );
}

function DiamondDivider({ color = T.colors.accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "8px 0" }}>
      <div style={{ width: 40, height: 1, background: `linear-gradient(to right, transparent, ${color})` }} />
      <svg width="6" height="6" viewBox="0 0 8 8"><rect x="4" y="0" width="5.66" height="5.66" transform="rotate(45 4 0)" fill={color} opacity="0.4" /></svg>
      <div style={{ width: 40, height: 1, background: `linear-gradient(to left, transparent, ${color})` }} />
    </div>
  );
}

/* ─── Pill Button ─── */
function PillButton({ children, variant = "primary", size = "md", onClick, style = {} }) {
  const [hov, setHov] = useState(false);
  const sizes = {
    sm: { padding: "10px 24px", fontSize: 11, letterSpacing: "0.08em" },
    md: { padding: "14px 36px", fontSize: 12, letterSpacing: "0.1em" },
    lg: { padding: "18px 48px", fontSize: 13, letterSpacing: "0.12em" },
  };
  const variants = {
    primary: { background: hov ? T.colors.accentHover : T.colors.accent, color: "#FFFFFF", border: "none" },
    outline: { background: hov ? T.colors.accentLight : "transparent", color: T.colors.textPrimary, border: `1px solid ${hov ? T.colors.accent : "rgba(34,34,34,0.12)"}` },
    ghost:   { background: "transparent", color: hov ? T.colors.accent : T.colors.textSecondary, border: "none" },
    dark:    { background: hov ? "#333333" : T.colors.textPrimary, color: "#FFFFFF", border: "none" },
  };
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        ...sizes[size], ...variants[variant],
        borderRadius: T.radius.pill, fontFamily: T.fonts.body, fontWeight: 500,
        textTransform: "uppercase", cursor: "pointer", transition: T.transitions.smooth,
        display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", ...style,
      }}>{children}</button>
  );
}

/* ─── Integration Logo with hover ─── */
function IntegrationLogo({ children }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: hov ? 0.5 : 0.3,
        transition: "opacity 0.4s ease",
        cursor: "default",
      }}
    >{children}</div>
  );
}

/* ─── Section Divider — thin gradient hairline ─── */
function SectionDivider({ bg = "primary" }) {
  const bgs = { primary: T.colors.bgPrimary, surface: T.colors.bgSurface, alt: T.colors.bgSurfaceAlt };
  return (
    <div style={{ background: bgs[bg] || bg, padding: 0 }}>
      <div style={{
        maxWidth: T.spacing.maxWidth,
        margin: "0 auto",
        padding: `0 ${T.spacing.contentX}`,
      }}>
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(191,168,158,0.2), transparent)",
        }} />
      </div>
    </div>
  );
}

/* ─── Layout Primitives ─── */
function Section({ children, bg = "primary", id = "", style = {} }) {
  const bgs = { primary: T.colors.bgPrimary, surface: T.colors.bgSurface, alt: T.colors.bgSurfaceAlt, dark: T.colors.textPrimary };
  return (
    <section id={id} style={{ background: bgs[bg] || bg, padding: `${T.spacing.sectionY} 0`, ...style }}>
      <div style={{ maxWidth: T.spacing.maxWidth, margin: "0 auto", padding: `0 ${T.spacing.contentX}` }}>{children}</div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, subtitle, align = "center", light = false }) {
  const tc = light ? "#FFFFFF" : T.colors.textPrimary;
  const sc = light ? "rgba(255,255,255,0.6)" : T.colors.textSecondary;
  const ec = light ? "rgba(191,168,158,0.9)" : T.colors.accent;
  return (
    <div style={{ textAlign: align, maxWidth: align === "center" ? 640 : "none", margin: align === "center" ? "0 auto" : 0, marginBottom: 56 }}>
      {eyebrow && <FadeInUp><div style={{ fontFamily: T.fonts.body, fontWeight: 500, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: ec, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: align === "center" ? "center" : "flex-start", gap: 8 }}><SparkleIcon size={12} color={ec} />{eyebrow}</div></FadeInUp>}
      <FadeInUp delay={0.1}><h2 style={{ fontFamily: T.fonts.heading, fontWeight: 300, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.2, letterSpacing: "-0.01em", color: tc, margin: 0, marginBottom: subtitle ? 16 : 0 }}>{title}</h2></FadeInUp>
      {subtitle && <FadeInUp delay={0.2}><p style={{ fontFamily: T.fonts.body, fontWeight: 300, fontSize: "clamp(14px, 1.6vw, 17px)", lineHeight: 1.7, color: sc, margin: 0, maxWidth: 580, marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>{subtitle}</p></FadeInUp>}
    </div>
  );
}

function Card({ children, padding = 32, style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: T.colors.bgSurface, borderRadius: T.radius.cardLg, padding,
        border: `1px solid ${hov ? T.colors.borderHover : T.colors.border}`,
        transition: T.transitions.smooth,
        boxShadow: hov ? "0 8px 40px rgba(34,34,34,0.06)" : "0 2px 16px rgba(34,34,34,0.025)",
        ...style,
      }}>{children}</div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   NAVBAR — Transparent overlay on hero
   ═══════════════════════════════════════════════════════════════ */

function Navbar({ onOpenWaitlist }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuHov, setMenuHov] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "18px 0" : "32px 0",
      background: scrolled ? "rgba(249,248,246,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(24px) saturate(1.3)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.3)" : "none",
      borderBottom: scrolled ? `1px solid ${T.colors.border}` : "1px solid transparent",
      transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    }}>
      <div style={{
        maxWidth: T.spacing.maxWidth, margin: "0 auto",
        padding: `0 ${T.spacing.contentX}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div onClick={scrollToTop} style={{
          fontFamily: T.fonts.heading, fontWeight: 300, fontSize: "1.35rem",
          letterSpacing: "0.25em", color: T.colors.textPrimary, cursor: "pointer", userSelect: "none",
        }}>sovela</div>
        <button onClick={onOpenWaitlist} aria-label="Menu"
          onMouseEnter={() => setMenuHov(true)}
          onMouseLeave={() => setMenuHov(false)}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 8,
            display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end",
          }}>
          <span style={{ display: "block", width: 26, height: 1.5, background: T.colors.textPrimary, borderRadius: 2, transition: T.transitions.smooth }} />
          <span style={{ display: "block", width: menuHov ? 26 : 18, height: 1.5, background: T.colors.textPrimary, borderRadius: 2, transition: T.transitions.smooth }} />
        </button>
      </div>
    </nav>
  );
}


/* ═══════════════════════════════════════════════════════════════
   HERO — Centred Apple Reveal layout
   ═══════════════════════════════════════════════════════════════ */

function HeroSection({ onOpenWaitlist }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section style={{
      position: "relative", width: "100%", overflow: "hidden",
    }}>
      {/* Background gradients */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(135deg, rgba(249,248,246,0.92) 0%, rgba(249,248,246,0.75) 35%, rgba(244,242,239,0.55) 60%, rgba(191,168,158,0.18) 100%)",
      }}>
        <div style={{ position: "absolute", top: "-10%", right: "-8%", width: "60vw", height: "60vw", maxWidth: 800, maxHeight: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(191,168,158,0.12) 0%, transparent 65%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "-15%", left: "10%", width: "45vw", height: "45vw", maxWidth: 600, maxHeight: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(214,200,192,0.10) 0%, transparent 60%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: "30%", right: "15%", width: "20vw", height: "20vw", maxWidth: 300, maxHeight: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(191,168,158,0.08) 0%, transparent 60%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${T.colors.border}, transparent)` }} />
      </div>

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 1, width: "100%",
        maxWidth: T.spacing.maxWidth, margin: "0 auto",
        padding: `clamp(120px, 16vh, 200px) ${T.spacing.contentX} 0`,
      }}>
        {/* ── Centred text block ── */}
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.15s", display: "flex", justifyContent: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 18px", borderRadius: T.radius.pill, border: `1px solid ${T.colors.border}`, background: "rgba(255,255,255,0.45)", backdropFilter: "blur(12px)", marginBottom: 36 }}>
              <SparkleIcon size={11} />
              <span style={{ fontFamily: T.fonts.body, fontWeight: 400, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.colors.textSecondary }}>Private Development</span>
            </div>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(28px)", filter: loaded ? "blur(0px)" : "blur(6px)", transition: "opacity 1s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s, transform 1s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s, filter 1.2s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s" }}>
            <h1 style={{ fontFamily: T.fonts.heading, fontWeight: 200, fontSize: "clamp(38px, 5.5vw, 72px)", lineHeight: 1.08, letterSpacing: "-0.025em", color: T.colors.textPrimary, marginBottom: 28 }}>
              Financial clarity.<br /><span style={{ fontStyle: "italic", fontWeight: 300 }}>Beautifully</span> calculated.
            </h1>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transition: "all 1s cubic-bezier(0.25,0.46,0.45,0.94) 0.5s" }}>
            <p style={{ fontFamily: T.fonts.body, fontWeight: 400, fontSize: "clamp(14px, 1.5vw, 16px)", lineHeight: 1.75, color: T.colors.textSecondary, marginBottom: 6, letterSpacing: "0.06em" }}>
              Margin. Commission. Performance.
            </p>
            <p style={{ fontFamily: T.fonts.body, fontWeight: 300, fontSize: "clamp(14px, 1.5vw, 16px)", lineHeight: 1.75, color: T.colors.textTertiary, marginBottom: 44, fontStyle: "italic" }}>
              Intelligence for premium salons.
            </p>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 1s cubic-bezier(0.25,0.46,0.45,0.94) 0.65s", marginBottom: 24 }}>
            <PillButton variant="primary" size="lg" onClick={onOpenWaitlist}>Request Early Access</PillButton>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.8s", marginBottom: "clamp(48px, 7vh, 80px)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 28, height: 1, background: `linear-gradient(to right, transparent, ${T.colors.accent})` }} />
              <span style={{ fontFamily: T.fonts.body, fontWeight: 400, fontSize: 11, letterSpacing: "0.06em", color: T.colors.textTertiary }}>Built for salons that value precision</span>
              <div style={{ width: 28, height: 1, background: `linear-gradient(to left, transparent, ${T.colors.accent})` }} />
            </div>
          </div>
        </div>

        {/* ── Cinematic video frame ── */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
          transition: "opacity 1.4s cubic-bezier(0.25,0.46,0.45,0.94) 1.1s, transform 1.4s cubic-bezier(0.25,0.46,0.45,0.94) 1.1s",
          maxWidth: 920,
          margin: "0 auto",
          paddingBottom: "clamp(60px, 8vh, 100px)",
        }}>
          <div style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%",
            borderRadius: "clamp(16px, 2vw, 24px)",
            overflow: "hidden",
            border: "1px solid rgba(191,168,158,0.15)",
            boxShadow: "0 4px 16px rgba(45,41,38,0.04), 0 16px 48px rgba(45,41,38,0.06), 0 32px 80px rgba(45,41,38,0.04)",
          }}>
            {/* Ambient fallback — always visible behind video */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 0,
              background: `linear-gradient(135deg, ${T.colors.bgSurfaceAlt} 0%, rgba(191,168,158,0.12) 40%, rgba(214,200,192,0.18) 70%, ${T.colors.bgPrimary} 100%)`,
            }}>
              {/* Subtle animated gradient orbs */}
              <div style={{
                position: "absolute", top: "20%", left: "15%",
                width: "40%", height: "50%", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(191,168,158,0.15) 0%, transparent 65%)",
                filter: "blur(40px)", animation: "softFloat 8s ease-in-out infinite",
              }} />
              <div style={{
                position: "absolute", bottom: "15%", right: "20%",
                width: "35%", height: "45%", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(214,200,192,0.12) 0%, transparent 60%)",
                filter: "blur(50px)", animation: "softFloat 8s ease-in-out infinite 2s",
              }} />
            </div>

            <video
              autoPlay
              muted
              loop
              playsInline
              poster=""
              style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
                display: "block",
                zIndex: 1,
              }}
            >
              <source src="/video/sovela-hero.mp4" type="video/mp4" />
            </video>

            <div className="hero-text-overlay" style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: T.colors.bgPrimary,
              animation: "heroTextCycle 10.25s ease infinite",
              zIndex: 2,
            }}>
              <span style={{
                fontFamily: T.fonts.heading,
                fontWeight: 300,
                fontSize: "clamp(24px, 3vw, 40px)",
                letterSpacing: "0.25em",
                color: T.colors.textPrimary,
              }}>sovela</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════════
   PART 3: FEATURE GRID — 3-column benefit cards
   ═══════════════════════════════════════════════════════════════ */

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.colors.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Commission Intelligence",
    text: "Complex incentives, managed live. Automate every tier and bonus structure with precision. Track your top performers as it happens.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.colors.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
      </svg>
    ),
    title: "True Profitability",
    text: "Total clarity on every service. See what drives your profit and what costs you money, all in one live view.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.colors.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" /><path d="M21 3v6h-6" />
      </svg>
    ),
    title: "Service Performance",
    text: "Not every service earns its place. Track real-time profitability to ensure your time and talent are focused exactly where they pay off most.",
  },
];

function FeatureGrid() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <Section bg="surface" id="features">
      <SectionHeading
        eyebrow="Why Sovela"
        title="Your salon's numbers, finally making sense."
        subtitle="Sovela tracks your commissions, analyses your margins and shows you where every dollar goes. Run your salon on clarity, not guesswork."
      />
      <div style={{ position: "relative" }}>
        <div className="feature-grid">
          {FEATURES.map((feat, i) => (
            <FadeInUp key={feat.title} delay={i * 0.15} style={{
              height: "100%",
              opacity: activeCard !== null && activeCard !== i ? 0.55 : 1,
              transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}>
              <FeatureCardClean
                feat={feat}
                index={i}
                isActive={activeCard === i}
                onHoverStart={() => setActiveCard(i)}
                onHoverEnd={() => setActiveCard(null)}
                onTap={() => setActiveCard(activeCard === i ? null : i)}
              />
            </FadeInUp>
          ))}
        </div>
        <IntelligenceReport activeCard={activeCard} />

        {/* Mobile inline report — shown below cards on tap */}
        <MobileIntelligenceReport activeCard={activeCard} />
      </div>
    </Section>
  );
}

function FeatureCardClean({ feat, index, isActive, onHoverStart, onHoverEnd, onTap }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => { setHov(true); onHoverStart(); }}
      onMouseLeave={() => { setHov(false); onHoverEnd(); }}
      onClick={onTap}
      style={{
        background: T.colors.bgPrimary,
        borderRadius: T.radius.cardLg,
        padding: "40px 36px 44px",
        height: "100%",
        border: `1px solid ${hov || isActive ? "rgba(191,168,158,0.3)" : T.colors.border}`,
        transition: T.transitions.smooth,
        boxShadow: hov || isActive
          ? "0 8px 32px rgba(34,34,34,0.06)"
          : "none",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div style={{
        position: "absolute",
        top: 0, left: 36, right: 36,
        height: 2,
        background: hov
          ? T.colors.accent
          : "rgba(191,168,158,0.25)",
        transition: T.transitions.smooth,
        borderRadius: "0 0 2px 2px",
      }} />

      <div style={{
        fontFamily: T.fonts.body,
        fontWeight: 300,
        fontSize: 11,
        letterSpacing: "0.1em",
        color: hov ? T.colors.accent : T.colors.textTertiary,
        marginBottom: 24,
        transition: T.transitions.smooth,
      }}>
        0{index + 1}
      </div>

      <h3 style={{
        fontFamily: T.fonts.heading, fontWeight: 400,
        fontSize: 20, lineHeight: 1.3,
        letterSpacing: "-0.01em",
        color: T.colors.textPrimary,
        marginBottom: 12,
      }}>
        {feat.title}
      </h3>

      <p style={{
        fontFamily: T.fonts.body, fontWeight: 300,
        fontSize: 14.5, lineHeight: 1.75,
        color: T.colors.textSecondary,
        margin: 0,
      }}>
        {feat.text}
      </p>
    </div>
  );
}


/* ─── Intelligence Report — Glassmorphic Floating Panel ─── */

function IntelligenceReport({ activeCard }) {
  const isVisible = activeCard !== null;
  const sage = "#8BAF8B";
  const paleRed = "#C4946A";
  const amber = "#C9A84C";

  /* ── Commission State: Commission Paid Tracker ── */
  const CommissionContent = () => {
    const minTargetPct = 80;
    const staff = [
      { name: "Aria K.", gp: "$4,820", commission: "$1,205", rate: "25%", progress: 96, hitTarget: true },
      { name: "Sienna M.", gp: "$3,640", commission: "$910", rate: "25%", progress: 91, hitTarget: true },
      { name: "Ruby W.", gp: "$3,180", commission: "$795", rate: "25%", progress: 84, hitTarget: true },
      { name: "Luca H.", gp: "$2,910", commission: "$0", rate: "25%", progress: 73, hitTarget: false },
    ];
    return (
      <div>
        <ReportHeader label="Commission Paid" period="January 2025" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginBottom: 4 }}>Total Paid</div>
            <div style={{ fontSize: 28, fontWeight: 300, color: T.colors.textPrimary, letterSpacing: "-0.02em" }}>$2,910</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            <div style={{ padding: "6px 10px", background: "rgba(34,34,34,0.02)", borderRadius: 8, textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 300, color: T.colors.textPrimary }}>$14,550</div>
              <div style={{ fontSize: 7, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginTop: 1 }}>Total GP</div>
            </div>
            <div style={{ padding: "6px 10px", background: "rgba(34,34,34,0.02)", borderRadius: 8, textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 300, color: T.colors.textPrimary }}>25%</div>
              <div style={{ fontSize: 7, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginTop: 1 }}>Rate</div>
            </div>
          </div>
        </div>
        <div style={{ height: 1, background: "rgba(34,34,34,0.06)", marginBottom: 14 }} />

        {/* Column headers */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary }}>Stylist</span>
          <div style={{ display: "flex", gap: 20 }}>
            <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, width: 62, textAlign: "right" }}>Gross Profit</span>
            <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, width: 58, textAlign: "right" }}>Commission</span>
          </div>
        </div>

        {staff.map((s, i) => (
          <div key={s.name} style={{ marginBottom: i < staff.length - 1 ? 16 : 0 }}>
            {/* Name + values row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
              <span style={{ fontSize: 13, fontWeight: 400, color: T.colors.textPrimary }}>{s.name}</span>
              <div style={{ display: "flex", gap: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 400, color: T.colors.textSecondary, width: 62, textAlign: "right" }}>{s.gp}</span>
                <span style={{
                  fontSize: 13, fontWeight: 500, width: 58, textAlign: "right",
                  color: s.hitTarget ? sage : paleRed,
                }}>{s.commission}</span>
              </div>
            </div>

            {/* Progress bar with minimum target line */}
            <div style={{ position: "relative", height: 3, marginBottom: 4 }}>
              {/* Track */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                borderRadius: 999, background: "rgba(34,34,34,0.04)",
                overflow: "hidden",
              }}>
                {/* Fill */}
                <div style={{
                  height: "100%", borderRadius: 999,
                  width: `${s.progress}%`,
                  background: s.hitTarget ? sage : paleRed,
                  opacity: s.hitTarget ? 1 : 0.5,
                  transition: "width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }} />
              </div>
              {/* Minimum target marker */}
              <div style={{
                position: "absolute",
                left: `${minTargetPct}%`,
                top: -3,
                width: 1.5,
                height: 9,
                background: "rgba(34,34,34,0.18)",
                borderRadius: 1,
              }} />
            </div>

            {/* Status text */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {s.hitTarget ? (
                <span style={{ fontSize: 10, color: T.colors.textTertiary }}>{s.progress}% of target</span>
              ) : (
                <span style={{ fontSize: 10, color: paleRed, fontWeight: 400 }}>Below minimum target</span>
              )}
              <span style={{ fontSize: 10, color: T.colors.textTertiary }}>Min: {minTargetPct}%</span>
            </div>
          </div>
        ))}

        <div style={{ height: 1, background: "rgba(34,34,34,0.06)", margin: "16px 0" }} />
        <div style={{ padding: "10px 12px", borderRadius: 10, borderLeft: `3px solid ${sage}`, background: "rgba(139,175,139,0.04)" }}>
          <div style={{ fontSize: 8, fontWeight: 600, color: sage, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Insight</div>
          <div style={{ fontSize: 10, fontWeight: 300, color: T.colors.textPrimary, lineHeight: 1.5 }}>3 of 4 stylists above minimum target. Team commission efficiency trending upward month-on-month.</div>
        </div>
      </div>
    );
  };

  /* ── Profitability State: Gross Profit by Category ── */
  const ProfitabilityContent = () => {
    const categories = [
      { name: "Services",   gp: 40200, pctOfTotal: 82, margin: 85, color: "#A89080" },
      { name: "Treatments", gp: 1950,  pctOfTotal: 4,  margin: 72, color: "#8BAF8B" },
      { name: "Retail",     gp: 2100,  pctOfTotal: 4,  margin: 48, color: "#B49A9A" },
      { name: "Extensions", gp: 4580,  pctOfTotal: 10, margin: 42, color: "#9BA5A3" },
    ];
    const totalGP = categories.reduce((sum, c) => sum + c.gp, 0);
    const fmtK = (v) => "$" + v.toLocaleString("en-US");

    return (
      <div>
        <ReportHeader label="Gross Profit by Category" period="January 2025" />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {categories.map((c) => (
            <div key={c.name} style={{
              padding: "14px 16px",
              borderRadius: 12,
              background: "rgba(34,34,34,0.02)",
              border: "1px solid rgba(34,34,34,0.04)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.color }} />
                  <span style={{ fontSize: 13, fontWeight: 400, color: T.colors.textPrimary }}>{c.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 400, color: T.colors.textPrimary }}>{fmtK(c.gp)}</span>
                  <span style={{ fontSize: 10, fontWeight: 400, color: sage }}>{c.margin}%</span>
                </div>
              </div>
              <div style={{ height: 3, borderRadius: 999, background: "rgba(34,34,34,0.04)", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 999,
                  width: `${c.margin}%`,
                  background: c.color,
                  opacity: 0.6,
                  transition: "width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }} />
              </div>
              <div style={{ fontSize: 10, color: T.colors.textTertiary, marginTop: 4 }}>
                {c.pctOfTotal}% of total GP
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: "rgba(34,34,34,0.06)", margin: "16px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary }}>Estimated Total GP</span>
          <span style={{ fontSize: 18, fontWeight: 300, color: T.colors.textPrimary, letterSpacing: "-0.02em" }}>{fmtK(totalGP)}</span>
        </div>
        <div style={{ padding: "10px 12px", borderRadius: 10, borderLeft: `3px solid ${amber}`, background: "rgba(201,168,76,0.04)" }}>
          <div style={{ fontSize: 8, fontWeight: 600, color: amber, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Insight</div>
          <div style={{ fontSize: 10, fontWeight: 300, color: T.colors.textPrimary, lineHeight: 1.5 }}>Extensions generate 10% of GP but occupy 22% of floor time. Consider pricing review or shifting bookings to higher-margin services.</div>
        </div>
      </div>
    );
  };

  /* ── Service Performance State: Stars vs Drainers ── */
  const ServiceContent = () => {
    const services = [
      { name: "Full Balayage", revenue: "$285", gp: "$199", margin: "70%", marginVal: 70, tag: "Healthy", tagColor: sage, barColor: sage },
      { name: "Colour & Highlights", revenue: "$195", gp: "$132", margin: "68%", marginVal: 68, tag: "Healthy", tagColor: sage, barColor: sage },
      { name: "Blow-dry & Style", revenue: "$65", gp: "$37", margin: "57%", marginVal: 57, tag: "Review", tagColor: paleRed, barColor: paleRed },
      { name: "Retail Product", revenue: "$40", gp: "$26", margin: "65%", marginVal: 65, tag: "Healthy", tagColor: sage, barColor: sage },
    ];
    return (
      <div>
        <ReportHeader label="Service Profitability" period="January 2025" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 300, color: T.colors.textSecondary, lineHeight: 1.6, maxWidth: "60%" }}>
            Margin comparison across your top and lowest-performing services.
          </div>
          <div style={{ padding: "6px 10px", background: "rgba(139,175,139,0.06)", border: `1px solid rgba(139,175,139,0.15)`, borderRadius: 8, textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 300, color: T.colors.textPrimary }}>66%</div>
            <div style={{ fontSize: 7, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginTop: 1 }}>Avg Margin</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {services.map((s) => (
            <div key={s.name} style={{
              padding: "14px 16px",
              borderRadius: 14,
              background: "rgba(34,34,34,0.02)",
              border: "1px solid rgba(34,34,34,0.04)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 400, color: T.colors.textPrimary }}>{s.name}</span>
                <span style={{
                  fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: s.tagColor,
                  background: s.tag === "Healthy" ? "rgba(139,175,139,0.1)" : "rgba(196,148,106,0.1)",
                  padding: "3px 10px", borderRadius: 999,
                }}>{s.tag}</span>
              </div>
              <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginBottom: 2 }}>Revenue</div>
                  <div style={{ fontSize: 14, fontWeight: 400, color: T.colors.textPrimary }}>{s.revenue}</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginBottom: 2 }}>Gross Profit</div>
                  <div style={{ fontSize: 14, fontWeight: 400, color: T.colors.textSecondary }}>{s.gp}</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginBottom: 2 }}>Margin</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: s.tagColor }}>{s.margin}</div>
                </div>
              </div>
              <div style={{ height: 3, borderRadius: 999, background: "rgba(34,34,34,0.04)", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 999,
                  width: `${s.marginVal}%`,
                  background: s.barColor,
                  opacity: 0.6,
                  transition: "width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: "rgba(34,34,34,0.06)", margin: "16px 0" }} />
        <div style={{ padding: "10px 12px", borderRadius: 10, borderLeft: `3px solid ${paleRed}`, background: "rgba(196,148,106,0.04)" }}>
          <div style={{ fontSize: 8, fontWeight: 600, color: paleRed, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Review</div>
          <div style={{ fontSize: 10, fontWeight: 300, color: T.colors.textPrimary, lineHeight: 1.5 }}>Blow-dry margin at 57% — consider material cost audit or $5 price adjustment to bring above 60% threshold.</div>
        </div>
      </div>
    );
  };

  const contents = [CommissionContent, ProfitabilityContent, ServiceContent];

  const alignment = activeCard === 0 ? "flex-start" : activeCard === 2 ? "flex-end" : "center";

  return (
    <div className="intelligence-report-wrapper" style={{
      display: "flex",
      justifyContent: alignment,
      marginTop: 12,
      perspective: 1000,
      transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 380,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
        transition: "opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        pointerEvents: isVisible ? "auto" : "none",
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 4px 24px rgba(34,34,34,0.04), 0 16px 56px rgba(34,34,34,0.06), inset 0 1px 0 rgba(255,255,255,0.5)",
        padding: "28px 28px 32px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0, left: 28, right: 28,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(191,168,158,0.3), transparent)",
        }} />

        <div style={{ position: "relative" }}>
          {contents.map((Content, i) => (
            <div key={i} style={{
              position: (activeCard === null ? i === 0 : activeCard === i) ? "relative" : "absolute",
              top: 0, left: 0, right: 0,
              opacity: activeCard === i ? 1 : 0,
              transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              pointerEvents: activeCard === i ? "auto" : "none",
            }}>
              <Content />
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 20,
          paddingTop: 14,
          borderTop: "1px solid rgba(34,34,34,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{
            fontFamily: T.fonts.heading,
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: "0.2em",
            color: T.colors.textTertiary,
          }}>sovela</span>
          <span style={{
            fontSize: 9,
            fontWeight: 400,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: T.colors.textTertiary,
            opacity: 0.6,
          }}>Monthly Intelligence</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Report Header Helper ─── */
function ReportHeader({ label, period }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{
          fontSize: 10, fontWeight: 500, letterSpacing: "0.12em",
          textTransform: "uppercase", color: T.colors.accent,
        }}>{label}</span>
        <span style={{ fontSize: 10, fontWeight: 300, color: T.colors.textTertiary }}>{period}</span>
      </div>
    </div>
  );
}


/* ─── Mobile Intelligence Report — Inline panel for touch ─── */
function MobileIntelligenceReport({ activeCard }) {
  const isVisible = activeCard !== null;
  const sage = "#8BAF8B";
  const paleRed = "#C4946A";

  const titles = ["Commission Paid", "Gross Profit by Category", "Service Profitability"];
  const summaries = [
    { items: [
      { label: "Total Paid", value: "$2,910" },
      { label: "Aria K.", sub: "GP $4,820 → $1,205 commission", color: sage },
      { label: "Sienna M.", sub: "GP $3,640 → $910 commission", color: sage },
      { label: "Ruby W.", sub: "GP $3,180 → $795 commission", color: sage },
      { label: "Luca H.", sub: "Below minimum target · 2 months", color: paleRed },
    ]},
    { items: [
      { label: "Services", sub: "$40,200 GP · 85% margin", color: sage },
      { label: "Treatments", sub: "$1,950 GP · 72% margin", color: sage },
      { label: "Retail", sub: "$2,100 GP · 48% margin", color: paleRed },
      { label: "Extensions", sub: "$4,580 GP · 42% margin", color: paleRed },
    ]},
    { items: [
      { label: "Full Balayage", sub: "$199 GP · 70% margin · Healthy", color: sage },
      { label: "Colour & Highlights", sub: "$132 GP · 68% margin · Healthy", color: sage },
      { label: "Blow-dry & Style", sub: "$37 GP · 57% margin · Review", color: paleRed },
      { label: "Retail Product", sub: "$26 GP · 65% margin · Healthy", color: sage },
    ]},
  ];

  return (
    <div className="intelligence-report-mobile" style={{
      overflow: "hidden",
      maxHeight: isVisible ? 520 : 0,
      opacity: isVisible ? 1 : 0,
      transition: "max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease",
      marginTop: isVisible ? 20 : 0,
    }}>
      {activeCard !== null && (
        <div style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 4px 24px rgba(34,34,34,0.04), 0 8px 32px rgba(34,34,34,0.05)",
          padding: "22px 22px 26px",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 16,
          }}>
            <span style={{
              fontSize: 10, fontWeight: 500, letterSpacing: "0.12em",
              textTransform: "uppercase", color: T.colors.accent,
            }}>{titles[activeCard]}</span>
            <span style={{ fontSize: 10, fontWeight: 300, color: T.colors.textTertiary }}>Jan 2025</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {summaries[activeCard].items.map((item) => (
              <div key={item.label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 12px",
                borderRadius: 10,
                background: "rgba(34,34,34,0.02)",
                border: "1px solid rgba(34,34,34,0.04)",
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 400, color: T.colors.textPrimary, marginBottom: 2 }}>{item.label}</div>
                  {item.sub && <div style={{ fontSize: 11, fontWeight: 300, color: item.color || T.colors.textSecondary }}>{item.sub}</div>}
                </div>
                {item.value && <div style={{ fontSize: 16, fontWeight: 300, color: T.colors.textPrimary }}>{item.value}</div>}
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 14, paddingTop: 12,
            borderTop: "1px solid rgba(34,34,34,0.05)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontFamily: T.fonts.heading, fontWeight: 300, fontSize: 10, letterSpacing: "0.2em", color: T.colors.textTertiary }}>sovela</span>
            <span style={{ fontSize: 8, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: T.colors.textTertiary, opacity: 0.6 }}>Monthly Intelligence</span>
          </div>
        </div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   PART 3: DASHBOARD REVEAL — Asymmetric split with soft-fade
   ═══════════════════════════════════════════════════════════════ */

function DashboardMockup({ animate = false }) {
  const sage = "#8BAF8B";
  const sageSoft = "rgba(139,175,139,0.55)";
  const [progress, setProgress] = useState(0);
  const [showDeltas, setShowDeltas] = useState(false);
  const animRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (animate) {
      setShowDeltas(false);
      setProgress(0);
      startRef.current = null;
      const duration = 800;
      const tick = (ts) => {
        if (!startRef.current) startRef.current = ts;
        const elapsed = ts - startRef.current;
        const p = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setProgress(eased);
        if (p < 1) {
          animRef.current = requestAnimationFrame(tick);
        } else {
          setTimeout(() => setShowDeltas(true), 150);
        }
      };
      animRef.current = requestAnimationFrame(tick);
      return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
    } else {
      setProgress(0);
      setShowDeltas(false);
    }
  }, [animate]);

  const dataVisible = progress > 0.05;

  const fmtDollar = (v) => "$" + Math.round(v).toLocaleString("en-US");
  const fmtPct = (v) => v.toFixed(1) + "%";

  const kpiData = [
    { label: "Revenue", target: 68543, format: fmtDollar, change: "+12.4%" },
    { label: "Gross Profit", target: 48830, format: fmtDollar, change: "+8.1%" },
    { label: "Avg. Sale / Stylist", target: 4258, format: fmtDollar, change: "+8.3%" },
  ];

  const barData = [
    { label: "Colour",     h: 52, gp: 36, color: "#C4B49E", gpColor: sage },
    { label: "Cuts",       h: 36, gp: 20, color: "#C4B49E", gpColor: sage },
    { label: "Treatments", h: 42, gp: 30, color: "#C4B49E", gpColor: sage },
    { label: "Extensions", h: 24, gp: 10, color: "#C4B49E", gpColor: sage },
    { label: "Retail",     h: 18, gp: 9,  color: "#C4B49E", gpColor: sage },
  ];

  const stylists = [
    { rank: 1, name: "Aria K.",   revenue: "$15,420", gp: "$4,626", mult: "3.8\u00d7", pct: 85 },
    { rank: 2, name: "Sienna M.", revenue: "$13,740", gp: "$3,847", mult: "3.4\u00d7", pct: 68 },
    { rank: 3, name: "Luca H.",   revenue: "$9,210",  gp: "$2,302", mult: "2.9\u00d7", pct: 44 },
  ];

  const pad = 28;

  return (
    <div style={{
      background: "#FCFBF9",
      borderRadius: 20,
      overflow: "hidden",
      width: "100%",
      boxShadow: "0 12px 48px rgba(34,34,34,0.05), 0 1px 2px rgba(34,34,34,0.03)",
      border: "0.5px solid rgba(191,168,158,0.12)",
    }}>
      <div style={{
        padding: `12px ${pad}px`,
        borderBottom: "0.5px solid rgba(191,168,158,0.10)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(191,168,158,0.3)" }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(191,168,158,0.18)" }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(191,168,158,0.09)" }} />
        </div>
        <span style={{ fontFamily: T.fonts.body, fontWeight: 400, fontSize: 8.5, letterSpacing: "0.14em", textTransform: "uppercase", color: T.colors.textTertiary }}>
          Sovela &middot; Monthly Overview
        </span>
        <div style={{ width: 44 }} />
      </div>

      <div style={{ padding: `${pad}px ${pad}px ${pad + 4}px` }}>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 40 }}>
          {kpiData.map((kpi) => (
            <div key={kpi.label} style={{
              padding: "22px 20px 18px",
              borderRadius: T.radius.card,
              background: "rgba(249,248,246,0.5)",
              border: "0.5px solid rgba(191,168,158,0.10)",
              boxShadow: "0 2px 8px rgba(34,34,34,0.03), 0 8px 24px rgba(34,34,34,0.04)",
            }}>
              <div style={{
                fontFamily: T.fonts.body, fontWeight: 500, fontSize: 9,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: T.colors.textTertiary, marginBottom: 14,
              }}>
                {kpi.label}
              </div>
              <div style={{
                fontFamily: T.fonts.heading, fontWeight: 400,
                fontSize: 24, letterSpacing: "-0.02em", lineHeight: 1,
                marginBottom: 8, minHeight: 24,
                transition: "color 0.3s ease",
                color: progress > 0 ? T.colors.textPrimary : T.colors.textTertiary,
              }}>
                {progress > 0 ? kpi.format(kpi.target * progress) : "\u2014"}
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 3, minHeight: 12,
                opacity: showDeltas ? 1 : 0,
                transform: showDeltas ? "translateY(0)" : "translateY(4px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}>
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9V3M6 3L3.5 5.5M6 3l2.5 2.5" stroke={sage} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: T.fonts.body, fontWeight: 500, fontSize: 8.5, color: sage }}>{kpi.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{
            fontFamily: T.fonts.body, fontWeight: 500, fontSize: 9,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "rgba(107,101,96,0.6)", marginBottom: 28,
            transition: "opacity 0.3s ease",
          }}>
            {dataVisible ? "Revenue vs Gross Profit" : "Service Revenue Breakdown"}
          </div>

          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            height: 68, paddingBottom: 0, position: "relative",
          }}>
            {barData.map((bar) => (
              <div key={bar.label} style={{
                display: "flex", alignItems: "flex-end", justifyContent: "center",
                gap: dataVisible ? 3 : 0,
                flex: 1,
                transition: "gap 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}>
                <div style={{
                  width: dataVisible ? 10 : 14,
                  height: bar.h,
                  borderRadius: "6px 6px 2px 2px",
                  background: `linear-gradient(to top, ${bar.color}, ${bar.color}dd)`,
                  transition: "width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }} />
                <div style={{
                  width: dataVisible ? 10 : 0,
                  height: dataVisible ? bar.gp : 0,
                  borderRadius: "6px 6px 2px 2px",
                  background: bar.gpColor,
                  opacity: dataVisible ? 1 : 0,
                  transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s",
                  overflow: "hidden",
                }} />
              </div>
            ))}
          </div>

          <div style={{ height: 0.5, background: "rgba(34,34,34,0.05)", marginBottom: 10 }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {barData.map((bar) => (
              <div key={`l-${bar.label}`} style={{ flex: 1, textAlign: "center" }}>
                <span style={{
                  fontFamily: T.fonts.body, fontWeight: 400, fontSize: 8,
                  color: T.colors.textSecondary, letterSpacing: "0.02em",
                }}>{bar.label}</span>
              </div>
            ))}
          </div>

          <div style={{
            display: "flex", alignItems: "center", justifyContent: "flex-end",
            gap: 14, marginTop: 10,
            opacity: dataVisible ? 1 : 0,
            transition: "opacity 0.4s ease 0.3s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: "#C4B49E" }} />
              <span style={{ fontFamily: T.fonts.body, fontSize: 7.5, fontWeight: 400, color: T.colors.textTertiary, letterSpacing: "0.04em" }}>Revenue</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: sage }} />
              <span style={{ fontFamily: T.fonts.body, fontSize: 7.5, fontWeight: 400, color: T.colors.textTertiary, letterSpacing: "0.04em" }}>Gross Profit</span>
            </div>
          </div>
        </div>

        <div style={{
          fontFamily: T.fonts.body, fontWeight: 500, fontSize: 9,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "rgba(107,101,96,0.6)", marginBottom: 18,
        }}>
          Stylist Performance
        </div>

        {stylists.map((s) => {
          const isTop = s.rank === 1;
          const opacity = s.rank === 1 ? 1 : s.rank === 2 ? 0.70 : 0.45;
          return (
            <div key={s.name} style={{
              display: "grid",
              gridTemplateColumns: "70px 1fr 54px 44px 30px",
              gap: 10,
              alignItems: "center",
              padding: "12px 0",
              borderBottom: s.rank < 3 ? "0.5px solid rgba(34,34,34,0.04)" : "none",
              opacity,
            }}>
              <span style={{
                fontFamily: T.fonts.body,
                fontWeight: isTop ? 500 : 400,
                fontSize: 11, color: T.colors.textPrimary,
              }}>{s.name}</span>

              <div style={{
                height: 6, borderRadius: 3,
                background: "rgba(191,168,158,0.08)",
                overflow: "hidden",
              }}>
                <div style={{
                  width: `${s.pct}%`, height: "100%", borderRadius: 3,
                  background: s.rank === 1
                    ? "rgba(139,175,139,0.5)"
                    : s.rank === 2
                    ? "rgba(168,144,128,0.4)"
                    : "rgba(155,165,163,0.35)",
                }} />
              </div>

              <span style={{
                fontFamily: T.fonts.body,
                fontWeight: isTop ? 500 : 300,
                fontSize: 10.5,
                color: dataVisible ? (isTop ? T.colors.textPrimary : T.colors.textSecondary) : T.colors.textTertiary,
                textAlign: "right", letterSpacing: "-0.01em",
                transition: "color 0.4s ease, opacity 0.4s ease",
                opacity: dataVisible ? 1 : 0.5,
              }}>{dataVisible ? s.revenue : "\u2014"}</span>

              <span style={{
                fontFamily: T.fonts.body, fontWeight: 300, fontSize: 10,
                color: dataVisible ? T.colors.textTertiary : T.colors.textTertiary,
                textAlign: "right", letterSpacing: "-0.01em",
                transition: "opacity 0.4s ease",
                opacity: dataVisible ? 1 : 0.5,
              }}>{dataVisible ? s.gp : "\u2014"}</span>

              <span style={{
                fontFamily: T.fonts.body, fontWeight: 500, fontSize: 9,
                color: isTop ? sage : sageSoft,
                textAlign: "right",
                transition: "opacity 0.4s ease",
                opacity: dataVisible ? 1 : 0,
              }}>{dataVisible ? s.mult : ""}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DashboardReveal({ onOpenWaitlist }) {
  const [btnHovered, setBtnHovered] = useState(false);
  const [scrollTriggered, setScrollTriggered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 960);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // On mobile: trigger animation when section scrolls into view
  useEffect(() => {
    if (!isMobile || !sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScrollTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  const isActive = isMobile ? scrollTriggered : btnHovered;

  return (
    <Section bg="primary" id="dashboard">
      <div className="dashboard-split" ref={sectionRef}>
        <div className="dashboard-text">
          <FadeInUp>
            <div style={{
              fontFamily: T.fonts.body, fontWeight: 500, fontSize: 11,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: T.colors.accent, marginBottom: 20,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <SparkleIcon size={12} />
              The Dashboard
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <h2 style={{
              fontFamily: T.fonts.heading, fontWeight: 200,
              fontSize: "clamp(30px, 4vw, 48px)",
              lineHeight: 1.15, letterSpacing: "-0.02em",
              color: T.colors.textPrimary,
              marginBottom: 24,
            }}>
              See the business<br />
              <span style={{ fontStyle: "italic", fontWeight: 300 }}>behind the beauty.</span>
            </h2>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p style={{
              fontFamily: T.fonts.body, fontWeight: 300,
              fontSize: "clamp(14px, 1.5vw, 16px)",
              lineHeight: 1.8, color: T.colors.textSecondary,
              marginBottom: 36, maxWidth: 480,
            }}>
              A full column doesn't mean a full bank account.
              Sovela reveals exactly what your salon keeps, where it leaks, and where to grow next.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <div
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{ display: "inline-block" }}
            >
              <PillButton variant="outline" size="md" onClick={onOpenWaitlist}>
                Explore the Dashboard
              </PillButton>
            </div>
          </FadeInUp>
        </div>

        <div className="dashboard-image-wrap" style={{ position: "relative" }}>
          <FadeInUp delay={0.25}>
            <div style={{
              transform: isActive ? "scale(1.03)" : "scale(1)",
              transformOrigin: "center center",
              transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 88%, transparent 100%), linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
              WebkitMaskComposite: "destination-in",
              maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 88%, transparent 100%), linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
              maskComposite: "intersect",
            }}>
              <DashboardMockup animate={isActive} />
            </div>
          </FadeInUp>
        </div>
      </div>
    </Section>
  );
}


/* ═══════════════════════════════════════════════════════════════
   EXECUTIVE SUMMARY — Monthly Intelligence Report section
   ═══════════════════════════════════════════════════════════════ */

function ExecutiveSummary() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [displaySlide, setDisplaySlide] = useState(0);
  const [phase, setPhase] = useState("visible"); // "visible" | "fading-out" | "fading-in"
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const pillars = [
    {
      number: "01",
      label: "GROWTH RADAR",
      title: "Growth Radar",
      hook: "Stop second-guessing your service menu.",
      body: "See exactly which treatments are pulling ahead and which are quietly slipping. Use these insights to reshape your offering, adjust pricing, and build targeted incentives that steer your team toward the high-margin services that need attention.",
    },
    {
      number: "02",
      label: "TEAM COACHING",
      title: "Team Coaching",
      hook: "Go deeper than total sales.",
      body: "Discover who's excelling at rebooking, who's bringing in high-value treatments, and where each stylist could use your guidance to hit their next milestone.",
    },
    {
      number: "03",
      label: "THE BOTTOM LINE",
      title: "The Bottom Line",
      hook: "Know where you stand before you open a spreadsheet.",
      body: "A private, owner-level snapshot of your salon's financial position. Payroll, operating costs, and net take-home laid out clearly every single month.",
    },
  ];

  const goTo = (index) => {
    if (index === activeSlide || phase !== "visible") return;
    setPhase("fading-out");
    setTimeout(() => {
      setActiveSlide(index);
      setDisplaySlide(index);
      setPhase("fading-in");
      setTimeout(() => {
        setPhase("visible");
      }, 750);
    }, 500);
  };

  const goPrev = () => goTo(activeSlide > 0 ? activeSlide - 1 : pillars.length - 1);
  const goNext = () => goTo(activeSlide < pillars.length - 1 ? activeSlide + 1 : 0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) goNext();
      if (dx > 0) goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Animation helpers — staggered delays for cascading feel
  const textStyle = (staggerDelay = 0) => ({
    opacity: phase === "fading-out" ? 0 : phase === "fading-in" ? 1 : 1,
    transform: phase === "fading-out"
      ? "translateY(12px)"
      : phase === "fading-in"
        ? "translateY(0)"
        : "translateY(0)",
    transition: phase === "fading-out"
      ? `opacity 0.5s cubic-bezier(0.4, 0, 0.6, 1) ${staggerDelay * 0.06}s, transform 0.5s cubic-bezier(0.4, 0, 0.6, 1) ${staggerDelay * 0.06}s`
      : `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + staggerDelay * 0.1}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + staggerDelay * 0.1}s`,
  });

  const mockupStyle = {
    opacity: phase === "fading-out" ? 0 : 1,
    transform: phase === "fading-out"
      ? "scale(0.97) translateY(8px)"
      : "scale(1) translateY(0)",
    transition: phase === "fading-out"
      ? "opacity 0.5s cubic-bezier(0.4, 0, 0.6, 1), transform 0.5s cubic-bezier(0.4, 0, 0.6, 1)"
      : "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
  };

  const p = pillars[displaySlide];

  const ArrowButton = ({ direction, onClick }) => {
    const [hov, setHov] = useState(false);
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          width: 48, height: 48,
          borderRadius: "50%",
          border: `1px solid ${hov ? T.colors.textPrimary : "rgba(34,34,34,0.15)"}`,
          background: hov ? "rgba(34,34,34,0.04)" : "transparent",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.3s ease",
          flexShrink: 0,
        }}
        aria-label={direction === "left" ? "Previous" : "Next"}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: direction === "left" ? "rotate(180deg)" : "none" }}>
          <path d="M6 3L11 8L6 13" stroke={T.colors.textPrimary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    );
  };

  return (
    <Section bg="alt" id="executive-summary">
      <div
        className="exec-carousel-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ── Text content (left on desktop, top on mobile) ── */}
        <div className="exec-carousel-text">
          <FadeInUp>
            <div style={{
              fontFamily: T.fonts.body, fontWeight: 500, fontSize: 11,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: T.colors.accent, marginBottom: 28,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <SparkleIcon size={12} />
              Monthly Executive Summary
            </div>
          </FadeInUp>

          {/* Slide counter */}
          <FadeInUp delay={0.05}>
            <div style={{
              display: "flex", alignItems: "center", gap: 12, marginBottom: 28,
              ...textStyle(0),
            }}>
              <div style={{ width: 32, height: 1, background: T.colors.textPrimary }} />
              <span style={{
                fontFamily: T.fonts.body, fontWeight: 300,
                fontSize: 13, letterSpacing: "0.08em",
                color: T.colors.textTertiary,
              }}>
                <span style={{ color: T.colors.textPrimary, fontWeight: 400 }}>{String(displaySlide + 1).padStart(2, "0")}</span>
                {" / "}
                {String(pillars.length).padStart(2, "0")}
              </span>
            </div>
          </FadeInUp>

          {/* Title */}
          <FadeInUp delay={0.1}>
            <h2 style={{
              fontFamily: T.fonts.heading, fontWeight: 200,
              fontSize: "clamp(30px, 4.5vw, 50px)",
              lineHeight: 1.1, letterSpacing: "-0.025em",
              color: T.colors.textPrimary, margin: 0,
              marginBottom: 16,
              ...textStyle(1),
            }}>
              {p.title}
            </h2>
          </FadeInUp>

          {/* Hook */}
          <FadeInUp delay={0.15}>
            <p style={{
              fontFamily: T.fonts.body, fontWeight: 400,
              fontSize: "clamp(13px, 1.4vw, 15px)", lineHeight: 1.6,
              color: T.colors.accent, fontStyle: "italic", margin: 0,
              marginBottom: 20,
              ...textStyle(2),
            }}>
              {p.hook}
            </p>
          </FadeInUp>

          {/* Body */}
          <FadeInUp delay={0.2}>
            <p style={{
              fontFamily: T.fonts.body, fontWeight: 300,
              fontSize: "clamp(14px, 1.5vw, 15.5px)",
              lineHeight: 1.85, color: T.colors.textSecondary, margin: 0,
              marginBottom: 44, maxWidth: 460,
              ...textStyle(3),
            }}>
              {p.body}
            </p>
          </FadeInUp>

          {/* Arrow buttons */}
          <FadeInUp delay={0.25}>
            <div style={{ display: "flex", gap: 12 }}>
              <ArrowButton direction="left" onClick={goPrev} />
              <ArrowButton direction="right" onClick={goNext} />
            </div>
          </FadeInUp>
        </div>

        {/* ── Report mockup (right on desktop, bottom on mobile) ── */}
        <div className="exec-carousel-mockup">
          <FadeInUp delay={0.15}>
            <div style={mockupStyle}>
              <ExecutiveReportMockup activeReport={displaySlide} />
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* ── Bottom tab navigation ── */}
      <FadeInUp delay={0.3}>
        <div className="exec-carousel-tabs">
          {pillars.map((item, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="exec-carousel-tab"
            >
              <div style={{
                height: 2, borderRadius: 1,
                background: i === activeSlide ? T.colors.textPrimary : "rgba(34,34,34,0.08)",
                transition: "background 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                marginBottom: 16,
              }} />
              <span style={{
                fontFamily: T.fonts.body, fontWeight: i === activeSlide ? 500 : 400,
                fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
                color: i === activeSlide ? T.colors.textPrimary : T.colors.textTertiary,
                transition: "all 0.5s ease",
              }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </FadeInUp>
    </Section>
  );
}


/* ─── Executive Report Mockup — Glassmorphic Preview ─── */

function ExecutiveReportMockup({ activeReport = null, isMobileCarousel = false }) {
  const sage = "#8BAF8B";
  const paleRed = "#C4946A";
  const amber = "#C9A84C";

  const glassCard = {
    background: "rgba(255,255,255,0.65)",
    backdropFilter: "blur(32px)",
    WebkitBackdropFilter: "blur(32px)",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.5)",
    boxShadow: "0 4px 24px rgba(34,34,34,0.04), 0 16px 56px rgba(34,34,34,0.06), inset 0 1px 0 rgba(255,255,255,0.4)",
    padding: isMobileCarousel ? "24px 22px 28px" : "28px 28px 32px",
    maxWidth: isMobileCarousel ? "none" : 360,
    width: "100%",
    position: "relative",
    overflow: "hidden",
  };

  const headerBar = (label, sublabel) => (
    <>
      <div style={{
        position: "absolute", top: 0, left: 28, right: 28, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(191,168,158,0.3), transparent)",
      }} />
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: T.colors.accent }}>{label}</span>
          <span style={{ fontSize: 10, fontWeight: 300, color: T.colors.textTertiary }}>{sublabel || "January 2025"}</span>
        </div>
        <div style={{ height: 1, background: "rgba(34,34,34,0.06)" }} />
      </div>
    </>
  );

  const footer = (label) => (
    <div style={{
      paddingTop: 14,
      borderTop: "1px solid rgba(34,34,34,0.05)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span style={{ fontFamily: T.fonts.heading, fontWeight: 300, fontSize: 11, letterSpacing: "0.2em", color: T.colors.textTertiary }}>sovela</span>
      <span style={{ fontSize: 9, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: T.colors.textTertiary, opacity: 0.6 }}>{label}</span>
    </div>
  );

  /* ── Growth Radar ── */
  const GrowthRadarContent = () => (
    <div>
      {headerBar("Growth Radar")}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginBottom: 4 }}>Annual Projection</div>
          <div style={{ fontSize: 22, fontWeight: 300, color: T.colors.textPrimary, letterSpacing: "-0.02em" }}>$822,516</div>
          <div style={{ fontSize: 10, fontWeight: 300, color: paleRed, marginTop: 2 }}>−$27,484 to target</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 28, fontWeight: 200, color: T.colors.textPrimary, letterSpacing: "-0.03em", lineHeight: 1 }}>
            1<span style={{ fontSize: 14, fontWeight: 300, color: T.colors.textTertiary }}>/5</span>
          </div>
          <div style={{ fontSize: 9, fontWeight: 300, color: T.colors.textTertiary, marginTop: 3 }}>targets met</div>
        </div>
      </div>

      {/* Revenue by category */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 1, background: "rgba(34,34,34,0.06)", borderRadius: 10, overflow: "hidden", marginBottom: 14 }}>
        {[
          { label: "Services", value: "$47,171", pct: "73%" },
          { label: "Extensions", value: "$10,458", pct: "16%" },
          { label: "Retail", value: "$4,092", pct: "6%" },
          { label: "Treatments", value: "$2,610", pct: "4%" },
        ].map(c => (
          <div key={c.label} style={{ background: "rgba(255,255,255,0.5)", padding: "8px 6px" }}>
            <div style={{ fontSize: 11, fontWeight: 300, color: T.colors.textPrimary, marginBottom: 2 }}>{c.value}</div>
            <div style={{ fontSize: 7, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginBottom: 1 }}>{c.label}</div>
            <div style={{ fontSize: 9, fontWeight: 400, color: T.colors.textTertiary }}>{c.pct}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: "rgba(34,34,34,0.06)", marginBottom: 14 }} />
      <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginBottom: 10 }}>Performance Gaps</div>
      {[
        { label: "Total Sales", current: "$63,559", target: "$66,000", pct: 96, color: "#C49898" },
        { label: "Retail Sales", current: "$3,807", target: "$5,000", pct: 76, color: "#B09AAA" },
        { label: "Treatments", current: "67", target: "72", pct: 93, color: sage },
        { label: "Avg. Spend", current: "$188", target: "$210", pct: 90, color: "#9AABB0" },
      ].map(g => (
        <div key={g.label} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: 10, fontWeight: 400, color: T.colors.textPrimary }}>{g.label}</span>
            <span style={{ fontSize: 10, fontWeight: 300, color: T.colors.textTertiary }}>{g.current} / {g.target}</span>
          </div>
          <div style={{ height: 3, borderRadius: 99, background: "rgba(34,34,34,0.04)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${g.pct}%`, borderRadius: 99, background: g.color }} />
          </div>
        </div>
      ))}
      <div style={{ height: 1, background: "rgba(34,34,34,0.06)", margin: "14px 0" }} />
      <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginBottom: 8 }}>Recommended Actions</div>
      <div style={{ padding: "10px 12px", borderRadius: 10, borderLeft: `3px solid ${paleRed}`, background: "rgba(196,148,106,0.04)", marginBottom: 8 }}>
        <div style={{ fontSize: 8, fontWeight: 600, color: paleRed, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>High Priority</div>
        <div style={{ fontSize: 10, fontWeight: 300, color: T.colors.textPrimary, lineHeight: 1.5 }}>Ava at 35.7% of treatment target — basin conversation needed to lift attach rate.</div>
      </div>
      <div style={{ padding: "10px 12px", borderRadius: 10, borderLeft: `3px solid ${amber}`, background: "rgba(201,168,76,0.04)" }}>
        <div style={{ fontSize: 8, fontWeight: 600, color: amber, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Medium</div>
        <div style={{ fontSize: 10, fontWeight: 300, color: T.colors.textPrimary, lineHeight: 1.5 }}>Retail sitting at 76% of target. One recommendation per client closes the gap.</div>
      </div>
      <div style={{ marginTop: 16 }}>{footer("Growth Radar")}</div>
    </div>
  );

  /* ── Team Coaching ── */
  const TeamCoachingContent = () => (
    <div>
      {headerBar("Team Coaching")}
      <div style={{ padding: "14px 14px", borderRadius: 12, background: "white", border: "1px solid rgba(191,168,158,0.12)", marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 300, color: T.colors.textPrimary }}>Jade</div>
            <div style={{ fontSize: 9, fontWeight: 400, color: T.colors.textTertiary, marginTop: 2 }}>Senior Stylist</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 15, fontWeight: 300, color: T.colors.textPrimary }}>$15,159</div>
            <div style={{ fontSize: 10, fontWeight: 500, color: sage, marginTop: 2 }}>+$1,655 vs target</div>
          </div>
        </div>
        <div style={{ height: 4, borderRadius: 99, background: "rgba(34,34,34,0.04)", overflow: "hidden", marginBottom: 4 }}>
          <div style={{ height: "100%", width: "100%", borderRadius: 99, background: `linear-gradient(90deg, rgba(139,175,139,0.5), ${sage})` }} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
          <span style={{ fontSize: 9, fontWeight: 400, color: sage }}>↑ 6.2% vs Dec</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
          {[
            { label: "Retail", value: "$693", note: "115.5%", up: true },
            { label: "Treatments", value: "19", note: "135.7%", up: true },
            { label: "Avg. Spend", value: "$199", note: "76 clients", up: null },
            { label: "Retail Attach", value: "26.3%", note: "20 of 76", up: null },
          ].map(s => (
            <div key={s.label} style={{ padding: "7px 6px", background: "rgba(34,34,34,0.02)", borderRadius: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 300, color: T.colors.textPrimary, marginBottom: 2 }}>{s.value}</div>
              <div style={{ fontSize: 7, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 9, fontWeight: 400, color: s.up ? sage : T.colors.textTertiary }}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "10px 12px", borderRadius: 10, borderLeft: `3px solid ${sage}`, background: "rgba(139,175,139,0.04)", marginBottom: 8 }}>
        <div style={{ fontSize: 8, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: sage, marginBottom: 3 }}>Focus Area</div>
        <div style={{ fontSize: 10, fontWeight: 300, color: T.colors.textPrimary, lineHeight: 1.6 }}>
          Retail attach rate at 26.3% vs 32.2% salon average. Room to lift without changing client experience.
        </div>
      </div>
      <div style={{ padding: "10px 12px", borderRadius: 10, borderLeft: `3px solid ${T.colors.accent}`, background: "rgba(191,168,158,0.04)", marginBottom: 8 }}>
        <div style={{ fontSize: 8, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.accent, marginBottom: 3 }}>Summary</div>
        <div style={{ fontSize: 10, fontWeight: 300, color: T.colors.textPrimary, lineHeight: 1.6 }}>
          Tracking above target and leading on treatments. Focus conversation on sustaining momentum and identifying where she can stretch further.
        </div>
      </div>
      <div style={{ padding: "10px 12px", borderRadius: 10, borderLeft: `3px solid ${amber}`, background: "rgba(201,168,76,0.04)", marginBottom: 14 }}>
        <div style={{ fontSize: 8, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: amber, marginBottom: 3 }}>Coaching Notes</div>
        <div style={{ fontSize: 10, fontWeight: 300, color: T.colors.textPrimary, lineHeight: 1.6 }}>
          Strong month. Consider pairing Jade with Ava for treatment mentoring — her conversion approach at the basin could lift the team average.
        </div>
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 16 }}>
        {["Jade", "Sienna", "Ava", "Ruby", "Mia", "Chloe"].map((n, i) => (
          <span key={n} style={{
            fontSize: 8, fontWeight: 500, letterSpacing: "0.06em",
            padding: "3px 8px", borderRadius: 99,
            border: i === 0 ? "1px solid #C49898" : "1px solid rgba(191,168,158,0.2)",
            background: i === 0 ? "rgba(196,152,152,0.1)" : "transparent",
            color: i === 0 ? T.colors.textPrimary : T.colors.textTertiary,
          }}>{n}</span>
        ))}
      </div>
      {footer("Team Coaching")}
    </div>
  );

  /* ── The Bottom Line ── */
  const BottomLineContent = () => (
    <div>
      {headerBar("The Bottom Line")}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginBottom: 4 }}>Business Health</div>
          <div style={{ fontSize: 18, fontWeight: 300, color: sage }}>Healthy</div>
          <div style={{ fontSize: 10, fontWeight: 300, color: T.colors.textTertiary, marginTop: 2 }}>71.2% gross margin</div>
        </div>
        <div style={{ padding: "8px 12px", background: "rgba(139,175,139,0.06)", border: `1px solid rgba(139,175,139,0.15)`, borderRadius: 8 }}>
          <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginBottom: 2 }}>Staff Cost</div>
          <div style={{ fontSize: 14, fontWeight: 300, color: T.colors.textPrimary }}>55.5%</div>
          <div style={{ fontSize: 9, fontWeight: 300, color: sage }}>Within range</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: "rgba(34,34,34,0.06)", borderRadius: 10, overflow: "hidden", marginBottom: 14 }}>
        {[
          { label: "Revenue", value: "$68,543", note: "+6.8%", noteColor: sage },
          { label: "Gross Profit", value: "$48,830", note: "71.2%", noteColor: sage },
          { label: "Net Profit", value: "$4,917", note: "7.2%", noteColor: amber },
        ].map(k => (
          <div key={k.label} style={{ background: "rgba(255,255,255,0.5)", padding: "10px 8px" }}>
            <div style={{ fontSize: 13, fontWeight: 300, color: T.colors.textPrimary, marginBottom: 2 }}>{k.value}</div>
            <div style={{ fontSize: 8, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginBottom: 3 }}>{k.label}</div>
            <div style={{ fontSize: 9, fontWeight: 500, color: k.noteColor }}>{k.note}</div>
          </div>
        ))}
      </div>
      <div style={{ height: 1, background: "rgba(34,34,34,0.06)", marginBottom: 14 }} />
      <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginBottom: 10 }}>Strategic Levers</div>
      {[
        {
          title: "Pricing review due",
          urgency: "Act now",
          urgencyColor: paleRed,
          impact: "+$3,400/mo",
          context: "Last increase was March 2024. A 5% lift on core services resets ahead of inflation without disrupting client relationships.",
        },
        {
          title: "Flash promotion on treatments",
          urgency: "This month",
          urgencyColor: amber,
          impact: "+$1,800",
          context: "Treatments are 72% margin but only 4% of revenue. A targeted promo tied to colour bookings lifts attach rate without discounting.",
        },
        {
          title: "Retail attach rate lift",
          urgency: "This month",
          urgencyColor: amber,
          impact: "+$2,400/mo",
          context: "Current attach rate is 26%. Lifting to 35% across the team adds an estimated $2,400 per month with zero extra chair time.",
        },
      ].map(l => (
        <div key={l.title} style={{
          padding: "10px 12px",
          borderLeft: `3px solid ${l.urgencyColor}`,
          background: `${l.urgencyColor}08`,
          borderRadius: 10,
          marginBottom: 8,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 500, color: T.colors.textPrimary }}>{l.title}</span>
              <span style={{ fontSize: 7, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: l.urgencyColor, background: `${l.urgencyColor}15`, padding: "2px 6px", borderRadius: 99 }}>{l.urgency}</span>
            </div>
            <span style={{ fontSize: 9, fontWeight: 500, color: sage, flexShrink: 0 }}>{l.impact}</span>
          </div>
          <div style={{ fontSize: 9, fontWeight: 300, color: T.colors.textSecondary, lineHeight: 1.55 }}>{l.context}</div>
        </div>
      ))}
      <div style={{ marginTop: 16 }}>{footer("The Bottom Line")}</div>
    </div>
  );

  const contents = [GrowthRadarContent, TeamCoachingContent, BottomLineContent];
  const active = activeReport !== null ? activeReport : 0;

  return (
    <div style={glassCard}>
      <div style={{ position: "relative" }}>
        {isMobileCarousel ? (
          /* Mobile carousel: render only the active report directly */
          (() => { const Content = contents[active]; return <Content />; })()
        ) : (
          /* Desktop: crossfade between reports */
          contents.map((Content, i) => (
            <div key={i} style={{
              position: active === i ? "relative" : "absolute",
              top: 0, left: 0, right: 0,
              opacity: active === i ? 1 : 0,
              transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              pointerEvents: active === i ? "auto" : "none",
            }}>
              <Content />
            </div>
          ))
        )}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   PART 3: STICKY CTA — Floating access button
   ═══════════════════════════════════════════════════════════════ */

function StickyCTA({ onClick }) {
  const [visible, setVisible] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <button
      className="sovela-sticky-cta"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 90,
        padding: "14px 28px",
        borderRadius: T.radius.pill,
        background: hov ? "#333333" : T.colors.textPrimary,
        color: "#FFFFFF",
        border: "none",
        fontFamily: T.fonts.body,
        fontWeight: 500,
        fontSize: 11,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: "pointer",
        boxShadow: hov
          ? "0 8px 32px rgba(34,34,34,0.25)"
          : "0 4px 20px rgba(34,34,34,0.15)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
        transition: "all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
        pointerEvents: visible ? "auto" : "none",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <SparkleIcon size={12} color="rgba(255,255,255,0.6)" />
      Request Early Access
    </button>
  );
}


/* ═══════════════════════════════════════════════════════════════
   WAITLIST SLIDE-OVER MODAL
   ═══════════════════════════════════════════════════════════════ */

function WaitlistInput({ label, type = "text", value, onChange, placeholder = "" }) {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;
  return (
    <div style={{ position: "relative", marginBottom: 36 }}>
      <label style={{
        position: "absolute", left: 0,
        top: (focused || hasValue) ? -8 : 14,
        fontSize: (focused || hasValue) ? 10 : 14,
        fontFamily: T.fonts.body,
        fontWeight: (focused || hasValue) ? 500 : 300,
        letterSpacing: (focused || hasValue) ? "0.1em" : "0.02em",
        textTransform: (focused || hasValue) ? "uppercase" : "none",
        color: focused ? T.colors.accent : T.colors.textTertiary,
        transition: "all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
        pointerEvents: "none",
      }}>{label}</label>
      <input type={type} value={value}
        placeholder={focused ? placeholder : ""}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "14px 0",
          fontFamily: T.fonts.body, fontWeight: 300, fontSize: 15,
          color: T.colors.textPrimary, background: "transparent", border: "none",
          borderBottom: `1.5px solid ${focused ? T.colors.accent : "rgba(34,34,34,0.12)"}`,
          outline: "none", transition: "border-color 0.4s ease", letterSpacing: "0.01em",
        }} />
    </div>
  );
}

function WaitlistSelect({ label, value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;
  return (
    <div style={{ position: "relative", marginBottom: 36 }}>
      <label style={{
        position: "absolute", left: 0,
        top: (focused || hasValue) ? -8 : 14,
        fontSize: (focused || hasValue) ? 10 : 14,
        fontFamily: T.fonts.body,
        fontWeight: (focused || hasValue) ? 500 : 300,
        letterSpacing: (focused || hasValue) ? "0.1em" : "0.02em",
        textTransform: (focused || hasValue) ? "uppercase" : "none",
        color: focused ? T.colors.accent : T.colors.textTertiary,
        transition: "all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
        pointerEvents: "none",
      }}>{label}</label>
      <select value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "14px 0",
          fontFamily: T.fonts.body, fontWeight: 300, fontSize: 15,
          color: hasValue ? T.colors.textPrimary : "transparent",
          background: "transparent", border: "none",
          borderBottom: `1.5px solid ${focused ? T.colors.accent : "rgba(34,34,34,0.12)"}`,
          outline: "none", transition: "border-color 0.4s ease", letterSpacing: "0.01em",
          appearance: "none", WebkitAppearance: "none", cursor: "pointer",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23999' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 4px center",
        }}>
        <option value="" disabled></option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function WaitlistModal({ isOpen, onClose }) {
  const [formState, setFormState] = useState("form");
  const [firstName, setFirstName] = useState("");
  const [salonName, setSalonName] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [bookingSoftware, setBookingSoftware] = useState("");
  const [city, setCity] = useState("");
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => { requestAnimationFrame(() => setAnimateIn(true)); });
    } else {
      setAnimateIn(false);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(() => { onClose(); setTimeout(() => { setFormState("form"); setFirstName(""); setSalonName(""); setEmail(""); setInstagram(""); setBookingSoftware(""); setCity(""); }, 200); }, 400);
  };

  const SUPABASE_URL = "https://gopvykkajhvbgvvehsqn.supabase.co";
  const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcHZ5a2thamh2Ymd2dmVoc3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MzgwNzUsImV4cCI6MjA4NzQxNDA3NX0.pcsVpg3sFmDdjikNcQMwI2GWHtNCObJXgf6Vr5jAdws";

  const handleSubmit = async () => {
    if (!firstName || !salonName || !email) return;
    setFormState("submitting");
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON,
          "Authorization": `Bearer ${SUPABASE_ANON}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({
          name: firstName,
          salon_name: salonName,
          email: email,
          instagram_handle: instagram || null,
          booking_system: bookingSoftware || null,
          city: city || null,
        }),
      });
      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("form");
        alert("Something went wrong — please try again.");
      }
    } catch (err) {
      setFormState("form");
      alert("Connection error — please try again.");
    }
  };

  if (!isOpen) return null;

  const bookingOptions = ["Timely", "Square", "Fresha", "Vagaro", "Mangomint", "Other"];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
      <div onClick={handleClose} style={{
        position: "absolute", inset: 0, background: "rgba(34,34,34,0.25)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        opacity: animateIn ? 1 : 0, transition: "opacity 0.4s ease", cursor: "pointer",
      }} />

      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0,
        width: "min(520px, 92vw)", background: T.colors.bgPrimary,
        boxShadow: "-20px 0 60px rgba(34,34,34,0.08)",
        transform: animateIn ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        display: "flex", flexDirection: "column", overflowY: "auto",
      }}>
        <div style={{ padding: "32px clamp(24px, 5vw, 40px) 0", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={handleClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, minHeight: 44, minWidth: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.colors.textTertiary} strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div style={{ flex: 1, padding: "40px clamp(28px, 6vw, 48px) 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {formState === "success" ? (
            <div style={{ animation: "fadeInUpSmooth 0.6s ease forwards" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: T.colors.accentLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h2 style={{ fontFamily: T.fonts.heading, fontWeight: 200, fontSize: "clamp(28px, 4vw, 38px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: T.colors.textPrimary, marginBottom: 20 }}>You're in.</h2>
              <DiamondDivider />
              <p style={{ fontFamily: T.fonts.body, fontWeight: 300, fontSize: 15, lineHeight: 1.8, color: T.colors.textSecondary, marginTop: 20, maxWidth: 380 }}>
                Check your inbox for your Sovela pricing guide. Founding salons lock in their rate permanently.
              </p>
              <div style={{ marginTop: 32, padding: "20px 24px", borderRadius: T.radius.card, background: "rgba(191,168,158,0.06)", border: "1px solid rgba(191,168,158,0.1)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <SparkleIcon size={12} />
                  <span style={{ fontFamily: T.fonts.body, fontWeight: 500, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: T.colors.accent }}>What happens next</span>
                </div>
                <p style={{ fontFamily: T.fonts.body, fontWeight: 300, fontSize: 13, lineHeight: 1.7, color: T.colors.textTertiary, margin: 0 }}>
                  You'll receive your pricing guide within minutes. I'll follow up personally within 24 hours to walk you through how Sovela works for your salon.
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontFamily: T.fonts.heading, fontWeight: 300, fontSize: "0.85rem", letterSpacing: "0.25em", color: T.colors.textTertiary, marginBottom: 48 }}>sovela</div>
              <h2 style={{ fontFamily: T.fonts.heading, fontWeight: 200, fontSize: "clamp(28px, 4vw, 38px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: T.colors.textPrimary, marginBottom: 16 }}>
                Request <span style={{ fontStyle: "italic", fontWeight: 300 }}>early access.</span>
              </h2>
              <p style={{ fontFamily: T.fonts.body, fontWeight: 300, fontSize: 15, lineHeight: 1.75, color: T.colors.textSecondary, marginBottom: 48, maxWidth: 400 }}>
                We're onboarding a limited number of founding salons. Leave your details and we'll send your pricing guide immediately.
              </p>
              <WaitlistInput label="Full Name" value={firstName} onChange={setFirstName} />
              <WaitlistInput label="Salon Name" value={salonName} onChange={setSalonName} />
              <WaitlistInput label="Email Address" type="email" value={email} onChange={setEmail} />
              <WaitlistInput label="Salon Instagram" value={instagram} onChange={setInstagram} placeholder="@yoursalon" />
              <WaitlistSelect label="Booking Software" value={bookingSoftware} onChange={setBookingSoftware} options={bookingOptions} />
              <WaitlistInput label="City / State" value={city} onChange={setCity} />
              <button onClick={handleSubmit} disabled={formState === "submitting"}
                style={{
                  width: "100%", padding: "18px 36px", borderRadius: T.radius.pill,
                  background: formState === "submitting" ? T.colors.accentLight : T.colors.accent,
                  color: formState === "submitting" ? T.colors.accent : "#FFFFFF",
                  border: "none", cursor: formState === "submitting" ? "wait" : "pointer",
                  fontFamily: T.fonts.body, fontWeight: 500, fontSize: 12,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  transition: T.transitions.smooth, marginTop: 8,
                }}>
                {formState === "submitting" ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <span style={{ width: 14, height: 14, border: `2px solid ${T.colors.accent}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                    Securing your place...
                  </span>
                ) : "Request Early Access"}
              </button>
              <p style={{ fontFamily: T.fonts.body, fontWeight: 300, fontSize: 11, color: T.colors.textTertiary, textAlign: "center", marginTop: 20, letterSpacing: "0.02em" }}>
                We respect your privacy. No spam, ever.
              </p>
            </div>
          )}
        </div>

        <div style={{ padding: "24px clamp(28px, 6vw, 48px)", borderTop: `1px solid ${T.colors.border}`, display: "flex", alignItems: "center", gap: 8 }}>
          <SparkleIcon size={10} color={T.colors.textTertiary} />
          <span style={{ fontFamily: T.fonts.body, fontWeight: 300, fontSize: 10, letterSpacing: "0.06em", color: T.colors.textTertiary }}>Crafted for luxury salons</span>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   THE STANDARD — "Who it's for" persona section
   ═══════════════════════════════════════════════════════════════ */

function TheStandard() {
  const personas = [
    {
      name: "The Midnight Strategist",
      body: "For the owner still reconciling tiered commissions on a Sunday night. Sovela automates the calculations, so you can close the laptop and take your weekend back.",
    },
    {
      name: "The Visionary",
      body: "For the leader who watches revenue climb but can't explain why the bank balance tells a different story. Sovela maps the full financial picture, from service chair to bottom line.",
    },
    {
      name: "The Creative",
      body: "For the owner who'd rather be shaping their brand than buried in formulas after close. Sovela handles the financial detail, so you can step back and lead the business you built.",
    },
  ];

  return (
    <Section bg="surface" id="the-standard">
      <SectionHeading
        eyebrow="The Standard"
        title="This is who we built it for."
      />
      <div className="persona-grid">
        {personas.map((p, i) => (
          <FadeInUp key={p.name} delay={i * 0.15}>
            <PersonaCard persona={p} />
          </FadeInUp>
        ))}
      </div>
    </Section>
  );
}

function PersonaCard({ persona }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "44px 36px 48px",
        borderRadius: T.radius.cardLg,
        background: hov ? T.colors.bgPrimary : "transparent",
        border: `1px solid ${hov ? T.colors.border : "transparent"}`,
        transition: T.transitions.smooth,
        cursor: "default",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h3 style={{
        fontFamily: T.fonts.heading,
        fontWeight: 300,
        fontStyle: "italic",
        fontSize: "clamp(20px, 2.2vw, 26px)",
        lineHeight: 1.3,
        letterSpacing: "-0.01em",
        color: T.colors.textPrimary,
        marginBottom: 20,
        transition: T.transitions.smooth,
      }}>
        {persona.name}
      </h3>

      <div style={{
        width: hov ? 56 : 32,
        height: 1,
        background: hov ? T.colors.accent : "rgba(191,168,158,0.3)",
        margin: "0 auto 20px",
        transition: T.transitions.smooth,
      }} />

      <p style={{
        fontFamily: T.fonts.body,
        fontWeight: 300,
        fontSize: 14.5,
        lineHeight: 1.8,
        color: T.colors.textSecondary,
        margin: 0,
        maxWidth: 320,
        marginLeft: "auto",
        marginRight: "auto",
      }}>
        {persona.body}
      </p>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   CREDIBILITY STRIP — Trust signal above footer
   ═══════════════════════════════════════════════════════════════ */

function CredibilityStrip() {
  return (
    <div style={{
      background: T.colors.bgSurfaceAlt,
      padding: "36px 0",
      borderTop: `1px solid ${T.colors.border}`,
    }}>
      <FadeIn>
        <div style={{
          maxWidth: T.spacing.maxWidth,
          margin: "0 auto",
          padding: `0 ${T.spacing.contentX}`,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
        }}>
          <div style={{ width: 32, height: 1, background: "rgba(191,168,158,0.3)" }} />

          <p style={{
            fontFamily: T.fonts.body,
            fontWeight: 300,
            fontSize: 13,
            letterSpacing: "0.04em",
            color: T.colors.textTertiary,
            margin: 0,
            fontStyle: "italic",
          }}>
            Melbourne born. Industry led. Refined alongside Australian salon owners to ensure every metric matters.
          </p>

          <div style={{ width: 32, height: 1, background: "rgba(191,168,158,0.3)" }} />
        </div>
      </FadeIn>
    </div>
  );
}


function Footer() {
  return (
    <footer style={{ background: T.colors.textPrimary, padding: "60px 0 40px" }}>
      <div style={{ maxWidth: T.spacing.maxWidth, margin: "0 auto", padding: `0 ${T.spacing.contentX}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: T.fonts.heading, fontWeight: 300, fontSize: "1.4rem", letterSpacing: "0.25em", color: "#FFFFFF", marginBottom: 12 }}>sovela</div>
            <p style={{ fontFamily: T.fonts.body, fontWeight: 300, fontSize: 13, color: "rgba(255,255,255,0.45)", maxWidth: 280, lineHeight: 1.7, margin: 0 }}>The premium salon management platform for luxury hair studios.</p>
          </div>
          <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
            {[
              { title: "Product", links: ["Features", "Pricing", "Integrations"] },
              { title: "Company", links: ["About", "Contact", "Careers"] },
              { title: "Legal", links: ["Privacy", "Terms"] },
            ].map((col) => (
              <div key={col.title}>
                <div style={{ fontFamily: T.fonts.body, fontWeight: 500, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>{col.title}</div>
                {col.links.map((link) => (
                  <a key={link} href="#" style={{ display: "block", fontFamily: T.fonts.body, fontWeight: 300, fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none", marginBottom: 10, transition: T.transitions.fast }}
                    onMouseEnter={(e) => e.target.style.color = "rgba(255,255,255,0.9)"}
                    onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.55)"}
                  >{link}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontFamily: T.fonts.body, fontWeight: 300, fontSize: 11, color: "rgba(255,255,255,0.25)", margin: 0 }}>&copy; 2026 Sovela. All rights reserved.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <SparkleIcon size={12} color="rgba(191,168,158,0.5)" />
            <span style={{ fontFamily: T.fonts.body, fontWeight: 300, fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>Crafted for luxury salons</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


/* ═══════════════════════════════════════════════════════════════
   MAIN APP — Complete Page Assembly
   ═══════════════════════════════════════════════════════════════ */

export default function SovelaApp() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <div style={{
      minHeight: "100vh", background: T.colors.bgPrimary,
      fontFamily: T.fonts.body, color: T.colors.textPrimary,
      WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale",
      overflowX: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;1,200;1,300&display=swap" rel="stylesheet" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;1,200;1,300&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${T.colors.bgPrimary}; font-family: 'Montserrat', sans-serif; }
        ::selection { background: rgba(191,168,158,0.25); color: ${T.colors.textPrimary}; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(191,168,158,0.3); border-radius: 999px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(191,168,158,0.5); }

        .sovela-grain::before {
          content: '';
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 9999; opacity: 0.015;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        .feature-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .feature-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 28px;
            align-items: stretch;
          }
        }

        .intelligence-report-wrapper {
          display: none;
        }
        @media (min-width: 768px) {
          .intelligence-report-wrapper {
            display: flex !important;
          }
        }

        /* Mobile intelligence report — shown inline */
        .intelligence-report-mobile {
          display: block;
        }
        @media (min-width: 768px) {
          .intelligence-report-mobile {
            display: none !important;
          }
        }

        .persona-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }
        @media (min-width: 768px) {
          .persona-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
        }

        .dashboard-split {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          overflow: visible;
        }
        @media (min-width: 960px) {
          .dashboard-split {
            grid-template-columns: 1fr 1.25fr;
            gap: 56px;
          }
        }
        .dashboard-text { order: 1; }
        .dashboard-image-wrap { order: 2; overflow: visible; }
        @media (max-width: 959px) {
          .dashboard-text { order: 2; }
          .dashboard-image-wrap { order: 1; }
        }

        /* Executive Summary — Elegant Carousel */
        .exec-carousel-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: start;
        }
        .exec-carousel-text { order: 1; }
        .exec-carousel-mockup {
          order: 2;
          display: flex;
          justify-content: center;
        }
        @media (min-width: 960px) {
          .exec-carousel-wrapper {
            grid-template-columns: 1fr auto;
            gap: 72px;
            align-items: start;
          }
          .exec-carousel-text { order: 1; }
          .exec-carousel-mockup { order: 2; position: sticky; top: 120px; animation: softFloat 6s ease-in-out infinite; }
        }

        .exec-carousel-tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          margin-top: 56px;
          border-top: 1px solid rgba(34,34,34,0.06);
          padding-top: 0;
        }
        .exec-carousel-tab {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          text-align: left;
          padding-top: 0;
        }
        .exec-carousel-tab:hover span {
          color: ${T.colors.textPrimary} !important;
        }
        @media (max-width: 959px) {
          .exec-carousel-tabs { margin-top: 40px; }
          .exec-carousel-tab span { font-size: 9px !important; letter-spacing: 0.1em !important; }
        }

        .hero-video-frame { max-width: 920px; margin: 0 auto; }
        @media (max-width: 600px) { .hero-video-frame { margin: 0 -8px; } }

        /* ── Mobile polish ── */

        /* Dashboard KPIs: 2-col + 1 on mobile */
        @media (max-width: 600px) {
          .dashboard-split { gap: 32px !important; }
          .dashboard-text h2 { font-size: clamp(26px, 7vw, 36px) !important; }
        }

        /* Footer: stack columns on mobile */
        @media (max-width: 600px) {
          .sovela-footer-links { gap: 32px !important; }
        }

        /* Sticky CTA: smaller on mobile */
        @media (max-width: 600px) {
          .sovela-sticky-cta {
            bottom: 20px !important;
            right: 20px !important;
            padding: 12px 22px !important;
            font-size: 10px !important;
          }
        }

        /* Feature cards: larger tap targets on mobile */
        @media (max-width: 767px) {
          .feature-grid { gap: 16px !important; }
        }

        /* Persona grid on mobile */
        @media (max-width: 767px) {
          .persona-grid { gap: 0 !important; }
        }

        /* Integrations strip: tighter on mobile */
        @media (max-width: 500px) {
          .sovela-integrations-wrap { gap: 24px !important; }
        }

        /* Ensure touch elements have min 44px targets */
        @media (pointer: coarse) {
          button, a, [onclick] { min-height: 44px; }
        }

        @keyframes subtlePulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.7; } }
        @keyframes softFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes scrollPulse { 0%, 100% { opacity: 0.3; transform: scaleY(1); } 50% { opacity: 0.8; transform: scaleY(1.3); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeInUpSmooth { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

        @keyframes heroTextCycle {
          0%   { opacity: 1; }
          12%  { opacity: 1; }
          20%  { opacity: 0; }
          73%  { opacity: 0; }
          86%  { opacity: 1; }
          100% { opacity: 1; }
        }
      `}</style>

      <div className="sovela-grain">
        <Navbar onOpenWaitlist={openWaitlist} />
        <HeroSection onOpenWaitlist={openWaitlist} />

        <FeatureGrid />

        <SectionDivider bg="surface" />

        <Section bg="alt" style={{ padding: "56px 0" }}>
          <FadeIn>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: T.fonts.body, fontWeight: 400, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: T.colors.textTertiary, marginBottom: 32 }}>
                Integrates with your favourite tools
              </p>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(36px, 6vw, 72px)", flexWrap: "wrap" }}>
                {[
                  <svg key="xero" width="72" height="28" viewBox="0 0 72 28" fill="none"><text x="0" y="21" fontFamily="'Montserrat', sans-serif" fontWeight="700" fontSize="22" letterSpacing="-0.5" fill={T.colors.textPrimary}>xero</text></svg>,
                  <svg key="timely" width="86" height="28" viewBox="0 0 86 28" fill="none"><text x="0" y="20" fontFamily="'Montserrat', sans-serif" fontWeight="500" fontSize="19" letterSpacing="0.5" fill={T.colors.textPrimary}>timely</text></svg>,
                  <svg key="square" width="96" height="28" viewBox="0 0 96 28" fill="none"><rect x="0" y="4" width="20" height="20" rx="4" stroke={T.colors.textPrimary} strokeWidth="1.8" fill="none" /><rect x="7" y="11" width="6" height="6" rx="1" fill={T.colors.textPrimary} /><text x="26" y="20" fontFamily="'Montserrat', sans-serif" fontWeight="500" fontSize="17" letterSpacing="0" fill={T.colors.textPrimary}>Square</text></svg>,
                  <svg key="stripe" width="68" height="28" viewBox="0 0 68 28" fill="none"><text x="0" y="21" fontFamily="'Montserrat', sans-serif" fontWeight="600" fontSize="21" letterSpacing="-0.3" fill={T.colors.textPrimary}>stripe</text></svg>,
                  <svg key="mailchimp" width="108" height="28" viewBox="0 0 108 28" fill="none"><text x="0" y="20" fontFamily="'Montserrat', sans-serif" fontWeight="500" fontSize="17" letterSpacing="0" fill={T.colors.textPrimary}>Mailchimp</text></svg>,
                ].map((logo) => (
                  <IntegrationLogo key={logo.key}>{logo}</IntegrationLogo>
                ))}
              </div>
            </div>
          </FadeIn>
        </Section>

        <DashboardReveal onOpenWaitlist={openWaitlist} />

        <SectionDivider bg="primary" />

        <TheStandard />

        <SectionDivider bg="surface" />

        <ExecutiveSummary />

        <Section bg="surface">
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto", position: "relative" }}>
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -30%)",
              width: 400, height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(191,168,158,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
              filter: "blur(40px)",
            }} />
            <FadeInUp>
              <SparkleIcon size={20} color={T.colors.accent} style={{ margin: "0 auto 20px", display: "block" }} />
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h2 style={{ fontFamily: T.fonts.heading, fontWeight: 200, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.2, letterSpacing: "-0.015em", color: T.colors.textPrimary, marginBottom: 12 }}>
                Ready to elevate your salon?
              </h2>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 32, height: 1, background: "linear-gradient(to right, transparent, rgba(191,168,158,0.4))" }} />
                <DiamondDivider color={T.colors.accent} />
                <div style={{ width: 32, height: 1, background: "linear-gradient(to left, transparent, rgba(191,168,158,0.4))" }} />
              </div>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p style={{ fontFamily: T.fonts.body, fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: T.colors.textSecondary, maxWidth: 460, margin: "0 auto 36px", position: "relative" }}>
                Join the waitlist for early access to the platform built exclusively for premium salons.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <div style={{ position: "relative" }}>
                <PillButton variant="primary" size="lg" onClick={openWaitlist}>
                  Request Early Access
                </PillButton>
              </div>
            </FadeInUp>
          </div>
        </Section>

        <CredibilityStrip />

        <Footer />
      </div>

      <StickyCTA onClick={openWaitlist} />

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
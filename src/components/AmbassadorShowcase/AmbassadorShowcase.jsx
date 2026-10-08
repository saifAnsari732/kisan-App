import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Award, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import "./AmbassadorShowcase.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AmbassadorShowcase() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  const glowRef = useRef(null);
  const personRef = useRef(null);
  const personImgRef = useRef(null);
  const headingRef = useRef(null);
  const chipsRef = useRef([]);
  const progressRef = useRef(null);
  const statsRef = useRef(null);

  const mainImage = "/BrandEmbesterIMG/image copy 6.png";

  // 1. Image decode & window load handler to recalculate ScrollTrigger height
  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);

    if (personImgRef.current) {
      if (personImgRef.current.complete) {
        ScrollTrigger.refresh();
      } else {
        personImgRef.current
          .decode()
          .then(() => {
            ScrollTrigger.refresh();
          })
          .catch(() => {
            ScrollTrigger.refresh();
          });
      }
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // 2. GSAP ScrollTrigger Animations with useGSAP and matchMedia
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      // -------------------------------------------------------------
      // DESKTOP: PINNED SCRUB TIMELINE (>= 768px)
      // -------------------------------------------------------------
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        // Set initial states programmatically via gsap.set (never in static CSS)
        if (personRef.current) gsap.set(personRef.current, { y: 120, opacity: 0 });
        if (glowRef.current) gsap.set(glowRef.current, { scale: 0.5, opacity: 0.15 });

        const headingLines = headingRef.current?.querySelectorAll(".kc-amb-line");
        if (headingLines) gsap.set(headingLines, { y: 40, opacity: 0 });

        const validChips = chipsRef.current.filter(Boolean);
        if (validChips.length > 0) gsap.set(validChips, { scale: 0.4, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=1600",
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                gsap.set(progressRef.current, { scaleY: self.progress });
              }
            },
          },
        });

        // (d) Big background text moves horizontally
        if (marqueeRef.current) {
          tl.to(
            marqueeRef.current,
            { xPercent: -25, ease: "none", duration: 1 },
            0
          );
        }

        // Gold glow expands
        if (glowRef.current) {
          tl.to(
            glowRef.current,
            { scale: 1.25, opacity: 0.35, ease: "sine.out", duration: 1 },
            0
          );
        }

        // (a) Person image rises from y: 120 and fades in
        if (personRef.current) {
          tl.to(
            personRef.current,
            { y: 0, opacity: 1, ease: "power2.out", duration: 0.7 },
            0.1
          );
        }

        // (b) Heading words stagger in
        if (headingLines && headingLines.length > 0) {
          tl.to(
            headingLines,
            { y: 0, opacity: 1, stagger: 0.15, ease: "power2.out", duration: 0.6 },
            0.2
          );
        }

        // (c) 3 Glass chips pop in
        if (validChips.length > 0) {
          tl.to(
            validChips,
            {
              scale: 1,
              opacity: 1,
              stagger: 0.15,
              ease: "back.out(1.7)",
              duration: 0.5,
            },
            0.35
          );
        }
      });

      // -------------------------------------------------------------
      // MOBILE: UNPINNED ONCE-ONLY FADE UP (< 768px)
      // -------------------------------------------------------------
      mm.add("(max-width: 767px)", () => {
        const headingLines = headingRef.current?.querySelectorAll(".kc-amb-line");
        const validChips = chipsRef.current.filter(Boolean);

        gsap.fromTo(
          [headingLines, personRef.current, ...validChips],
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // -------------------------------------------------------------
      // REDUCED MOTION FALLBACK
      // -------------------------------------------------------------
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const headingLines = headingRef.current?.querySelectorAll(".kc-amb-line");
        const validChips = chipsRef.current.filter(Boolean);

        gsap.set([headingLines, personRef.current, ...validChips], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
      });

      // -------------------------------------------------------------
      // (e) COUNT-UP STATS NUMBERS
      // -------------------------------------------------------------
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll(".kc-amb-stat-val");
        statItems.forEach((item) => {
          const targetValue = parseInt(item.getAttribute("data-target") || "0", 10);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: targetValue,
            duration: 1.8,
            ease: "power1.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              once: true,
            },
            onUpdate: () => {
              item.innerText = Math.floor(obj.val).toLocaleString("en-IN");
            },
          });
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section className="kc-amb-showcase-section" ref={sectionRef}>
      {/* Scroll Progress Bar at Section Left Edge */}
      <div className="kc-amb-progress-track" aria-hidden="true">
        <div className="kc-amb-progress-bar" ref={progressRef} />
      </div>

      {/* Marquee Background Text (z-index 0, pointer-events none, opacity 0.08) */}
      <div className="kc-amb-marquee-container" aria-hidden="true">
        <div className="kc-amb-marquee-track" ref={marqueeRef}>
          <span>KISAN CHOICE • SHUDDHTA KA VAADA • ECOKISANAGRO • KISAN CHOICE • </span>
          <span>KISAN CHOICE • SHUDDHTA KA VAADA • ECOKISANAGRO • KISAN CHOICE • </span>
        </div>
      </div>

      {/* Background Decor Elements */}
      <div className="kc-amb-decor-glow" ref={glowRef} aria-hidden="true" />
      <div className="kc-amb-decor-shape-right" aria-hidden="true" />

      {/* Main Grid Layout (2 columns desktop) */}
      <div className="kc-amb-container">
        {/* LEFT COLUMN: Text, Subtitle, CTA, Stats */}
        <div className="kc-amb-content-left">
          <div className="kc-amb-pill">
            <Sparkles size={14} className="text-amber-500" />
            <span>Kisan Choice Ambassador</span>
          </div>

          <h2 className="kc-amb-heading" ref={headingRef}>
            <span className="kc-amb-line">Shuddhta ka Vaada,</span>
            <span className="kc-amb-line kc-amb-highlight">ab chehre ke saath</span>
          </h2>

          <p className="kc-amb-subtitle">
            100% Shuddh Kachi Ghani Sarson Tel — Har ghar ki pehli pasand. Har boond mein bharosa aur swasthya.
          </p>

          <div className="kc-amb-actions">
            <Link to="/catalog" className="kc-amb-cta-btn">
              <span>Catalog dekhein</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          {/* Count-Up Numbers */}
          <div className="kc-amb-stats" ref={statsRef}>
            <div className="kc-amb-stat-card">
              <span className="kc-amb-stat-val" data-target="25">
                0
              </span>
              <span className="kc-amb-stat-suffix">+</span>
              <span className="kc-amb-stat-label">Years of Trust</span>
            </div>
            <div className="kc-amb-stat-divider" />
            <div className="kc-amb-stat-card">
              <span className="kc-amb-stat-val" data-target="500">
                0
              </span>
              <span className="kc-amb-stat-suffix">+</span>
              <span className="kc-amb-stat-label">Distributors</span>
            </div>
            <div className="kc-amb-stat-divider" />
            <div className="kc-amb-stat-card">
              <span className="kc-amb-stat-val" data-target="10">
                0
              </span>
              <span className="kc-amb-stat-suffix">Lakh+</span>
              <span className="kc-amb-stat-label">Happy Families</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Brand Ambassador Photo & Floating Glass Chips */}
        <div className="kc-amb-visual-right">
          <div className="kc-amb-person-wrapper" ref={personRef}>
            <img
              ref={personImgRef}
              src={mainImage}
              alt="Kisan Choice brand ambassador holding mustard oil"
              className="kc-amb-person-img"
              width="600"
              height="800"
              loading="eager"
            />
          </div>

          {/* Floating Glass Chips (3 Chips positioned around person) */}
          <div
            className="kc-amb-chip kc-amb-chip-1"
            ref={(el) => (chipsRef.current[0] = el)}
          >
            <CheckCircle2 size={18} className="text-green-600" />
            <span>100% Natural</span>
          </div>

          <div
            className="kc-amb-chip kc-amb-chip-2"
            ref={(el) => (chipsRef.current[1] = el)}
          >
            <Award size={18} className="text-amber-500" />
            <span>ISO 9001:2015 Certified</span>
          </div>

          <div
            className="kc-amb-chip kc-amb-chip-3"
            ref={(el) => (chipsRef.current[2] = el)}
          >
            <ShieldCheck size={18} className="text-emerald-600" />
            <span>Kachchi Ghani Pure</span>
          </div>
        </div>
      </div>
    </section>
  );
}

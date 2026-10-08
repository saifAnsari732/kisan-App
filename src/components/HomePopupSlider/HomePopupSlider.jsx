import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ChevronLeft, ChevronRight, Maximize2, Mouse, Sparkles, X } from "lucide-react";
import "./HomePopupSlider.css";

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

const slides = [
  {
    id: "slide-1",
    src: "/BrandEmbesterIMG/bd1.jpeg",
    alt: "Kisan Choice Brand Ambassador 1",
  },
  {
    id: "slide-2",
    src: "/BrandEmbesterIMG/bd2.jpeg",
    alt: "Kisan Choice Pure Edible Oil Showcase",
  },
  {
    id: "slide-3",
    src: "/BrandEmbesterIMG/bd3.jpeg",
    alt: "Kisan Choice Ambassador with Mustard Oil",
  },
  {
    id: "slide-4",
    src: "/BrandEmbesterIMG/bd4.jpeg",
    alt: "Kisan Choice Product Line",
  },
  {
    id: "slide-5",
    src: "/BrandEmbesterIMG/bd5.jpeg",
    alt: "Kisan Choice Brand Quality Assurance",
  },
  {
    id: "slide-6",
    src: "/BrandEmbesterIMG/bd6.jpeg",
    alt: "Kisan Choice Ambassador Showcase",
  },
  {
    id: "slide-7",
    src: "/BrandEmbesterIMG/bd7.jpeg",
    alt: "Kisan Choice Pure Cooking Oil",
  },
  {
    id: "slide-8",
    src: "/BrandEmbesterIMG/bd8.jpeg",
    alt: "Kisan Choice Premium Range",
  },
];

const autoplayDelay = 1400;

// Directional slide variants for full image lightbox preview modal
const expandedModalVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100vw" : "-100vw",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100vw" : "100vw",
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function HomePopupSlider() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [[expandedSlide, expandedDirection], setExpandedState] = useState([null, 1]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const openExpanded = (index) => {
    setExpandedState([index, 1]);
  };

  const closeExpanded = () => {
    setExpandedState([expandedSlide, 1]);
    setExpandedState([null, 1]);
  };

  const paginateExpanded = (newDirection) => {
    if (expandedSlide === null) return;
    const nextIndex = (expandedSlide + newDirection + slides.length) % slides.length;
    setExpandedState([nextIndex, newDirection]);
  };

  const scopeRef = useRef(null);
  const openTimeRef = useRef(Date.now());
  const isClosingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const reducedMotion = useReducedMotion();

  // Pre-loader circular spinning animation timer (2.4s)
  useEffect(() => {
    if (!isOpen) return undefined;

    setIsLoading(true);
    setLoadProgress(0);

    const startTime = Date.now();
    const duration = 2200; // 2.2s progress counter

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));
      setLoadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Scroll lock & Session storage check
  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("kc_popup_seen");
      if (seen === "true" && process.env.NODE_ENV === "production") {
        setIsOpen(false);
        return;
      }
    }

    if (!isOpen && expandedSlide === null) return undefined;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    openTimeRef.current = Date.now();

    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, [isOpen, expandedSlide]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!isOpen || isLoading || isPaused || expandedSlide !== null || isClosingRef.current) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, autoplayDelay);

    return () => window.clearInterval(timer);
  }, [isOpen, isLoading, isPaused, expandedSlide]);

  const changeSlide = (direction) => {
    setActiveIndex((prev) => (prev + direction + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // --------------------------------------------------------------------------
  // GSAP EXIT TIMELINES
  // --------------------------------------------------------------------------
  const finishClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("kc_popup_seen", "true");
      document.body.style.overflow = "";
      window.scrollTo({ top: 0, behavior: "instant" });
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    }
  };

  const scrollProgressRef = useRef(0);
  const exitTlRef = useRef(null);

  // Helper to ensure scrub timeline is initialized
  const getOrCreateExitTimeline = () => {
    if (exitTlRef.current) return exitTlRef.current;
    if (!scopeRef.current) return null;

    const container = scopeRef.current;
    const activeCard = container.querySelector(".kc-popup-card-item.is-center-active");
    const motionTrail = container.querySelector(".kc-popup-motion-trail");
    const leftCard = container.querySelector(".kc-popup-card-item.is-left-card");
    const rightCard = container.querySelector(".kc-popup-card-item.is-right-card");
    const headingBlock = container.querySelector(".kc-popup-header");
    const controlsBlock = container.querySelector(".kc-popup-footer");
    const scrollHint = container.querySelector(".kc-popup-scroll-hint");
    const closeBtn = container.querySelector(".kc-popup-close");
    const backdrop = container.querySelector(".kc-popup-backdrop");

    const tl = gsap.timeline({ paused: true });

    // 0.0 -> 0.35: UI elements & side cards fade away
    if (headingBlock) tl.to(headingBlock, { y: -50, opacity: 0, ease: "none" }, 0);
    if (controlsBlock) tl.to(controlsBlock, { y: 50, opacity: 0, ease: "none" }, 0);
    if (closeBtn) tl.to(closeBtn, { opacity: 0, scale: 0.8, ease: "none" }, 0);
    if (scrollHint) tl.to(scrollHint, { opacity: 0, ease: "none" }, 0);
    if (leftCard) tl.to(leftCard, { x: -450, opacity: 0, ease: "none" }, 0);
    if (rightCard) tl.to(rightCard, { x: 450, opacity: 0, ease: "none" }, 0);

    // 0.0 -> 1.0: Active image card moves down continuously in direct 1-to-1 sync with scroll
    if (activeCard) {
      tl.to(activeCard, { y: "150vh", scale: 1.05, rotateX: -4, ease: "none" }, 0);
    }
    if (motionTrail) {
      tl.to(motionTrail, { y: "150vh", scale: 1.05, opacity: 0.25, ease: "none" }, 0);
    }

    // 0.4 -> 1.0: Backdrop fades out near the end of scroll
    if (backdrop) {
      tl.fromTo(backdrop, { opacity: 1 }, { opacity: 0, ease: "none" }, 0.4);
    }

    exitTlRef.current = tl;
    return tl;
  };

  // Smoothly scrub exit timeline to target progress (0.0 -> 1.0)
  const updateScrollScrub = (deltaProgress) => {
    if (isClosingRef.current) return;
    setIsPaused(true);
    setHasInteracted(true);

    const tl = getOrCreateExitTimeline();
    if (!tl) return;

    // Clamped progress between 0 and 1
    const newProgress = Math.min(1.0, Math.max(0.0, scrollProgressRef.current + deltaProgress));
    scrollProgressRef.current = newProgress;

    gsap.to(tl, {
      progress: newProgress,
      duration: 0.35,
      ease: "power1.out",
      onComplete: () => {
        if (newProgress >= 0.95 && !isClosingRef.current) {
          isClosingRef.current = true;
          finishClose();
        }
      },
    });
  };

  // Quick fallback completion if needed
  const runScrollExit = () => {
    updateScrollScrub(1.0);
  };

  // 0.65s Consistent Quick Exit sliding smoothly to the LEFT (X button, Backdrop click, Escape)
  const runQuickExit = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsPaused(true);

    if (reducedMotion || !scopeRef.current) {
      finishClose();
      return;
    }

    gsap.to(scopeRef.current, {
      x: "-100vw",
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: finishClose,
    });
  };

  // --------------------------------------------------------------------------
  // LISTENERS & DIRECT SCROLL SCRUB DETECTION
  // --------------------------------------------------------------------------
  useGSAP(
    () => {
      if (!isOpen || !scopeRef.current) return undefined;
      const el = scopeRef.current;

      const handleWheel = (e) => {
        if (Date.now() - openTimeRef.current < 400) return;
        // Low sensitivity multiplier so user has to scroll significantly to bring image down
        const deltaProgress = e.deltaY * 0.0003;
        updateScrollScrub(deltaProgress);
      };

      let touchStartY = 0;
      let lastTouchY = 0;
      const handleTouchStart = (e) => {
        touchStartY = e.touches[0].clientY;
        lastTouchY = touchStartY;
      };

      const handleTouchMove = (e) => {
        if (Date.now() - openTimeRef.current < 400) return;
        const currentY = e.touches[0].clientY;
        const deltaY = lastTouchY - currentY;
        lastTouchY = currentY;

        // Controlled touch sensitivity on mobile
        const deltaProgress = deltaY * 0.0007;
        updateScrollScrub(deltaProgress);
      };

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          if (expandedSlide !== null) {
            closeExpanded();
          } else {
            runQuickExit();
          }
        } else if (["ArrowDown", "PageDown", " "].includes(e.key)) {
          if (Date.now() - openTimeRef.current < 400) return;
          e.preventDefault();
          updateScrollScrub(0.08);
        } else if (e.key === "ArrowUp" || e.key === "PageUp") {
          if (Date.now() - openTimeRef.current < 400) return;
          e.preventDefault();
          updateScrollScrub(-0.08);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          if (expandedSlide !== null) {
            paginateExpanded(-1);
          } else {
            changeSlide(-1);
          }
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          if (expandedSlide !== null) {
            paginateExpanded(1);
          } else {
            changeSlide(1);
          }
        }
      };

      el.addEventListener("wheel", handleWheel, { passive: true });
      el.addEventListener("touchstart", handleTouchStart, { passive: true });
      el.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        el.removeEventListener("wheel", handleWheel);
        el.removeEventListener("touchstart", handleTouchStart);
        el.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("keydown", handleKeyDown);
        if (exitTlRef.current) {
          exitTlRef.current.kill();
          exitTlRef.current = null;
        }
      };
    },
    { scope: scopeRef, dependencies: [isOpen, expandedSlide] }
  );

  // Pointer drag on centre card
  const handleCardPointerDown = (e) => {
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    setIsPaused(true);
  };

  const handleCardPointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const diff = e.clientY - dragStartYRef.current;
    if (diff > 0) {
      const deltaProgress = (diff / 500) - scrollProgressRef.current;
      updateScrollScrub(deltaProgress * 0.4);
    }
  };

  const handleCardPointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsPaused(false);
    if (scrollProgressRef.current > 0.35) {
      updateScrollScrub(1.0);
    } else if (scrollProgressRef.current > 0) {
      // Return back up
      updateScrollScrub(-scrollProgressRef.current);
    }
  };

  const isMobile = viewportWidth < 768;
  const cardOffsets = [-1, 0, 1];
  const mounted = typeof document !== "undefined";

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="kc-popup-wrapper" ref={scopeRef}>
      {/* Confetti Sparkles for Exit */}
      <div className="kc-popup-confetti-container" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`confetti-${i}`} className="kc-popup-confetti-dot" />
        ))}
      </div>

      {/* MAIN POPUP BACKDROP */}
      <AnimatePresence>
        <motion.div
          key="kc-popup-backdrop-main"
          className="kc-popup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.15 : 0.35 }}
          onClick={runQuickExit}
        >
          {/* Faint Noise Overlay */}
          <div className="kc-popup-noise" aria-hidden="true" />

          {/* Ambient Center Glow */}
          <div className="kc-popup-glow-center" aria-hidden="true" />

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="kc-popup-circle-loader"
                className="kc-popup-loader-container"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.12, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* 44px Glass Close Button */}
                <button
                  className="kc-popup-close"
                  type="button"
                  aria-label="Close popup"
                  onClick={runQuickExit}
                >
                  <X size={22} aria-hidden="true" />
                </button>

                {/* PURE SPINNING CIRCULAR PHOTO AVATARS ORBIT (NO TEXT) */}
                <div className="kc-popup-loader-stage">
                  {/* Dashed Golden Orbit Track */}
                  <div className="kc-popup-loader-dashed-orbit" aria-hidden="true" />

                  {/* Rotating Orbit Wheel with all 5 Circular Photo Avatars */}
                  <div className="kc-popup-loader-orbit-wheel">
                    {slides.map((slide, idx) => {
                      const angleDeg = (idx * 360) / slides.length - 90;
                      const radius = isMobile ? 110 : (viewportWidth >= 1200 ? 250 : 220);
                      const angleRad = (angleDeg * Math.PI) / 180;
                      const posX = Math.round(radius * Math.cos(angleRad));
                      const posY = Math.round(radius * Math.sin(angleRad));

                      return (
                        <div
                          key={`orbit-node-${slide.id}`}
                          className="kc-popup-loader-orbit-item-pos"
                          style={{
                            top: `calc(50% + ${posY}px)`,
                            left: `calc(50% + ${posX}px)`,
                          }}
                        >
                          <div className="kc-popup-loader-orbit-avatar-counter">
                            <div className="kc-popup-loader-avatar-ring">
                              <div className="kc-popup-loader-avatar-img-box">
                                <img
                                  src={slide.src}
                                  alt={slide.alt}
                                  className="kc-popup-loader-avatar-img"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.section
                key="kc-popup-dialog-content"
                className="kc-popup-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="kc-popup-title"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                transition={{
                  duration: reducedMotion ? 0.15 : 0.45,
                  ease: [0.25, 1, 0.5, 1],
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* 44px Glass Close Button */}
                <button
                  className="kc-popup-close"
                  type="button"
                  aria-label="Close popup"
                  onClick={runQuickExit}
                >
                  <X size={22} aria-hidden="true" />
                </button>

                {/* HEADER SECTION */}
                <header className="kc-popup-header">
                  <h2 className="kc-popup-heading" id="kc-popup-title">
                    Kisan Choice —- <span className="kc-popup-diamond">◆</span>{" "}
                    <span className="kc-popup-gold-highlight">शुद्धता का स्वाद, हर घर के साथ।</span>
                  </h2>
                </header>

                {/* FULLSCREEN CURVED SLIDER STAGE */}
                <div
                  className="kc-popup-slider-stage"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {/* Faint Curved Dashed Arc SVG */}
                  <svg className="kc-popup-arc-svg" viewBox="0 0 1000 300" aria-hidden="true">
                    <path
                      d="M 60 180 Q 500 240 940 180"
                      stroke="rgba(245, 179, 1, 0.25)"
                      strokeDasharray="6 6"
                      fill="none"
                      strokeWidth="2"
                    />
                  </svg>

                  <div className="kc-popup-tilted-container">
                    <div className="kc-popup-tilted-stage">
                      {/* Gold Motion Trail behind active card */}
                      <div className="kc-popup-motion-trail" aria-hidden="true" />

                      {cardOffsets.map((offset) => {
                        const slideIndex =
                          ((activeIndex + offset) % slides.length + slides.length) % slides.length;
                        const slide = slides[slideIndex];
                        const isCenter = offset === 0;
                        const isLeft = offset === -1;
                        const isRight = offset === 1;

                        // Curved arrangement formula with generous clean gaps between cards
                        const isLargeDesktop = viewportWidth >= 1200;
                        const stepSpacing = isMobile
                          ? Math.min(viewportWidth * 0.72, 280)
                          : isLargeDesktop
                          ? 520
                          : 460;
                        const posX = offset * stepSpacing;
                        const posY = (offset * offset * (isMobile ? 14 : 20)) + (isCenter ? dragY : 0);
                        const cardRotate = offset * (isMobile ? 6 : 8);
                        const cardScale = isCenter ? (isMobile ? 1.08 : 1.12) : (isMobile ? 0.85 : 0.90);
                        const cardZIndex = isCenter ? 10 : 5;

                        return (
                          <motion.div
                            key={`slide-card-${slide.id}`}
                            layout
                            className={`kc-popup-card-item ${
                              isCenter
                                ? "is-center-active"
                                : isLeft
                                ? "is-left-card"
                                : isRight
                                ? "is-right-card"
                                : ""
                            }`}
                            style={{ zIndex: cardZIndex }}
                            initial={false}
                            animate={{
                              x: posX,
                              y: posY,
                              scale: cardScale,
                              rotate: cardRotate,
                            }}
                            transition={{
                              duration: isDraggingRef.current ? 0 : (reducedMotion ? 0 : 0.4),
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            onPointerDown={isCenter ? handleCardPointerDown : undefined}
                            onPointerMove={isCenter ? handleCardPointerMove : undefined}
                            onPointerUp={isCenter ? handleCardPointerUp : undefined}
                            onPointerCancel={isCenter ? handleCardPointerUp : undefined}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isCenter) {
                                openExpanded(slideIndex);
                              } else {
                                setActiveIndex(slideIndex);
                              }
                            }}
                          >
                            <div className="kc-popup-card-inner">
                              <img
                                src={slide.src}
                                alt={slide.alt}
                                className="kc-popup-tall-img"
                                draggable="false"
                                loading="eager"
                              />
                              <div
                                className="kc-popup-card-expand-hint"
                                title="Click to view full image"
                              >
                                <Maximize2 size={16} />
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* FOOTER CONTROLS WITH GLASSMORPHISM */}
                <footer className="kc-popup-footer">
                  <div className="kc-popup-controls-wrap">
                    <button
                      type="button"
                      className="kc-popup-nav-btn"
                      aria-label="Previous image"
                      onClick={() => changeSlide(-1)}
                    >
                      <ChevronLeft size={18} aria-hidden="true" />
                    </button>

                    <div className="kc-popup-dots-container">
                      {slides.map((_, idx) => (
                        <button
                          key={`dot-${idx}`}
                          type="button"
                          className={`kc-popup-dot-item ${activeIndex === idx ? "is-active" : ""}`}
                          aria-label={`Go to slide ${idx + 1}`}
                          onClick={() => goToSlide(idx)}
                        >
                          {activeIndex === idx && (
                            <div
                              className="kc-popup-dot-progress"
                              style={{ animationDuration: `${autoplayDelay}ms` }}
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    <span className="kc-popup-slide-number">
                      {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                    </span>

                    <button
                      type="button"
                      className="kc-popup-nav-btn"
                      aria-label="Next image"
                      onClick={() => changeSlide(1)}
                    >
                      <ChevronRight size={18} aria-hidden="true" />
                    </button>
                  </div>
                </footer>

                {/* ANIMATED SCROLL HINT (Hides after first interaction) */}
                {!hasInteracted && (
                  <div className="kc-popup-scroll-hint" onClick={runScrollExit}>
                    {isMobile ? <ChevronDown size={18} /> : <Mouse size={18} />}
                    <span>{isMobile ? "Upar swipe karein" : "Scroll karein"}</span>
                  </div>
                )}
              </motion.section>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* LIGHTBOX PREVIEW MODAL WITH DIRECTIONAL SLIDE TRANSITIONS */}
      <AnimatePresence mode="popLayout" custom={expandedDirection}>
        {expandedSlide !== null && (
          <motion.div
            key="kc-popup-lightbox-backdrop-main"
            className="kc-popup-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeExpanded}
          >
            <AnimatePresence custom={expandedDirection} mode="popLayout">
              <motion.div
                key={`kc-popup-lightbox-content-${slides[expandedSlide].id}`}
                custom={expandedDirection}
                variants={expandedModalVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="kc-popup-lightbox-content"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="kc-popup-lightbox-inner-wrap">
                  <button
                    type="button"
                    className="kc-popup-lightbox-close"
                    aria-label="Close expanded view"
                    onClick={closeExpanded}
                  >
                    <X size={20} />
                  </button>

                  <div className="kc-popup-lightbox-img-frame">
                    <img
                      src={slides[expandedSlide].src}
                      alt={slides[expandedSlide].alt}
                      className="kc-popup-lightbox-img"
                    />
                  </div>

                  <div className="kc-popup-lightbox-bar">
                    <div className="kc-popup-lightbox-nav">
                      <button
                        type="button"
                        className="kc-popup-lightbox-arrow"
                        aria-label="Previous expanded image"
                        onClick={(e) => {
                          e.stopPropagation();
                          paginateExpanded(-1);
                        }}
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <span className="kc-popup-lightbox-counter">
                        {String(expandedSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                      </span>
                      <button
                        type="button"
                        className="kc-popup-lightbox-arrow"
                        aria-label="Next expanded image"
                        onClick={(e) => {
                          e.stopPropagation();
                          paginateExpanded(1);
                        }}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
}

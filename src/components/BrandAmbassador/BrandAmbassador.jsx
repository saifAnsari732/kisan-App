import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Award, Star, CheckCircle2, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import "./BrandAmbassador.css";

const ambassadors = [
  {
    id: 1,
    name: "Vishal Malhotra",
    role: "Official Brand Ambassador",
    tagline: "शुद्धता और स्वाद का अटूट विश्वास",
    img: "/BrandEmbesterIMG/bd1.jpeg",
    badge: "Mustard Oil",
  },
  {
    id: 2,
    name: "Vishal Malhotra",
    role: "Purity Champion",
    tagline: "100% Pure & Cold Pressed Edible Oils",
    img: "/BrandEmbesterIMG/bd2.jpeg",
    badge: "Refined Oil",
  },
  {
    id: 3,
    name: "Vishal Malhotra",
    role: "Brand Face of Purity",
    tagline: "हर भारतीय रसोई की पहली पसंद",
    img: "/BrandEmbesterIMG/bd3.jpeg",
    badge: "Pure Kachi Ghani",
  },
  {
    id: 4,
    name: "Vishal Malhotra",
    role: "Health & Quality Icon",
    tagline: "सेहत और स्वाद का बेहतरीन संगम",
    img: "/BrandEmbesterIMG/bd4.jpeg",
    badge: "Soyabean Oil",
  },
];

// Variants for full modal container slide (Enter/Exit across full screen)
const fullModalContainerVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100vw" : "-100vw",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100vw" : "100vw",
    opacity: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function BrandAmbassador() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [[page, direction], setPage] = useState([0, 1]);

  const openModal = (index) => {
    setSelectedIndex(index);
    setPage([index, 1]);
  };

  const closeModal = () => {
    setPage([selectedIndex, 1]); // Exit to left
    setSelectedIndex(null);
  };

  const paginate = (newDirection) => {
    if (selectedIndex === null) return;
    const nextIndex = (selectedIndex + newDirection + ambassadors.length) % ambassadors.length;
    setSelectedIndex(nextIndex);
    setPage([nextIndex, newDirection]);
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const activeItem = selectedIndex !== null ? ambassadors[selectedIndex] : null;

  return (
    <section className="kc-ambassador-section">
      {/* Background Decorative Glow Elements */}
      <div className="kc-ambassador-bg-glow" aria-hidden="true" />
      <div className="kc-ambassador-bg-pattern" aria-hidden="true" />

      <div className="kc-ambassador-container">
        {/* SECTION HEADER */}
        <div className="kc-ambassador-header">
          <h2 className="kc-ambassador-title">
            Meet The Faces of <span className="kc-ambassador-highlight">Purity & Trust</span>
          </h2>

          <p className="kc-ambassador-subtitle">
            Kisan Choice is proud to be represented by iconic leaders who share our passion for 100% pure, healthy, and unadulterated edible oils across India.
          </p>
        </div>

        {/* AMBASSADOR CIRCULAR CARDS GRID */}
        <div className="kc-ambassador-grid">
          {ambassadors.map((item, index) => (
            <div
              key={item.id}
              className="kc-ambassador-card"
              onClick={() => openModal(index)}
            >
              {/* CIRCULAR FRAME WITH SPINNING MULTI-COLOR GRADIENT BORDER */}
              <div className="kc-ambassador-avatar-wrapper">
                <div className="kc-ambassador-img-box">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="kc-ambassador-img"
                    loading="lazy"
                  />
                  <div className="kc-ambassador-hover-overlay">
                    <Maximize2 className="w-6 h-6 text-amber-300" />
                  </div>
                </div>
              </div>

              {/* CARD DETAILS */}
              <div className="kc-ambassador-info">
                <span className="kc-ambassador-tag">{item.badge}</span>
                <h3 className="kc-ambassador-name">{item.name}</h3>
                <p className="kc-ambassador-tagline">"{item.tagline}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* TRUST BANNER FOOTER */}
        <div className="kc-ambassador-footer-banner">
          <div className="kc-ambassador-stat-item">
            <Award className="w-6 h-6 text-amber-500" />
            <div>
              <span className="kc-stat-val">100% Pure</span>
              <span className="kc-stat-lbl">Quality Assured</span>
            </div>
          </div>
          <div className="kc-stat-divider" />
          <div className="kc-ambassador-stat-item">
            <Star className="w-6 h-6 text-amber-500" />
            <div>
              <span className="kc-stat-val">35 Lakh+</span>
              <span className="kc-stat-lbl">Happy Kitchens</span>
            </div>
          </div>
          <div className="kc-stat-divider" />
          <div className="kc-ambassador-stat-item">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <div>
              <span className="kc-stat-val">Zero Adulteration</span>
              <span className="kc-stat-lbl">Farm Fresh Standard</span>
            </div>
          </div>
        </div>
      </div>

      {/* CENTERED FULL IMAGE MODAL WITH FULL SCREEN SLIDE TRANSITIONS */}
      <AnimatePresence mode="sync">
        {activeItem && (
          <motion.div
            key="kc-ambassador-modal-backdrop-main"
            className="kc-ambassador-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeModal}
          >
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.div
                key={`kc-ambassador-modal-box-${activeItem.id}`}
                custom={direction}
                variants={fullModalContainerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="kc-ambassador-modal-container"
                onClick={(e) => e.stopPropagation()}
              >
                {/* GLASS CLOSE BUTTON */}
                <button
                  type="button"
                  className="kc-ambassador-modal-close"
                  onClick={closeModal}
                  aria-label="Close image modal"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* FULL HIGH-RES IMAGE FRAME */}
                <div className="kc-ambassador-modal-img-wrap">
                  <img
                    src={activeItem.img}
                    alt={activeItem.name}
                    className="kc-ambassador-modal-full-img"
                  />
                </div>

                {/* FLOATING OVERLAY BAR (NAME, BADGE & SLIDER CONTROLS) */}
                <div className="kc-ambassador-modal-bottom-bar">
                  <div className="kc-ambassador-modal-info">
                    <span className="kc-ambassador-modal-tag">{activeItem.badge}</span>
                    <span className="kc-ambassador-modal-name">{activeItem.name}</span>
                  </div>

                  <div className="kc-ambassador-modal-nav">
                    <button
                      type="button"
                      className="kc-ambassador-modal-nav-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        paginate(-1);
                      }}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="kc-ambassador-modal-counter">
                      0{selectedIndex + 1} / 0{ambassadors.length}
                    </span>
                    <button
                      type="button"
                      className="kc-ambassador-modal-nav-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        paginate(1);
                      }}
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

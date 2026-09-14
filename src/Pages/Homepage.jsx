import { useState, useEffect, lazy, Suspense, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SocialSidebar from "../Compnents/SocialmediaIcon";
const CategorySection = lazy(() => import("./CategorySection"));
import mapimg from "../../public/map.webp";
import "../Styles/Home.css";

// 🔥 Lazy Load
const FetureProduct = lazy(() => import("./FetureProduct"));
const Testimonials = lazy(() => import("../Compnents/Testimonials"));
const Reviews = lazy(() => import("./Reviews"));
const FAQ = lazy(() => import("./FreQuestion"));
const StatsAndProcess = lazy(() => import("./StatsAndProcess"));

// ✅ Images
const desktopSlides = [
  { id: 1, img: "/img1.webp" },
  { id: 2, img: "/img2.webp" },
  { id: 3, img: "/img3.webp" },
];

const mobileSlides = [
  { id: 1, img: "/pimg2.webp" },
  { id: 2, img: "/pimg3.webp" },
  { id: 3, img: "/pimg1.webp" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 650 : false
  );

  const [selected, setSelected] = useState("All");

  // 👉 SWIPE STATES
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // 👉 POPUP STATE
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup only once per session so it doesn't annoy the user
    const hasSeenPopup = sessionStorage.getItem("hasSeenTrustedPartnerPopup");
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("hasSeenTrustedPartnerPopup", "true");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const minSwipeDistance = 50;

  // 📱 Responsive detect
  useEffect(() => {
    const media = window.matchMedia("(max-width: 650px)");
    const handleChange = (e) => setIsMobile(e.matches);

    setIsMobile(media.matches);
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  const slides = useMemo(
    () => (isMobile ? mobileSlides : desktopSlides),
    [isMobile]
  );

  useEffect(() => {
    setCurrent(0);
  }, [isMobile]);

  // 👉 Manual Buttons
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // 👉 SWIPE HANDLERS
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) {
      nextSlide(); // swipe left
    }

    if (distance < -minSwipeDistance) {
      prevSlide(); // swipe right
    }
  };

  return (
    <>
      {/* ✅ SEO */}
      <Helmet>
        <title>Kisan Choice - Best Edible Oil Brand in India</title>
        <meta
          name="description"
          content="Kisan Choice delivers premium mustard oil, refined oil, and edible oils across India."
        />
        <meta
          name="keywords"
          content="kisan choice, kisanchoice, kisangroups, kisan groups, kisan choice oil, mustard oil, edible oil, pure oil"
        />
        <link rel="preload" as="image" href="/img1.webp" />
      </Helmet>

      {/* ✅ TRUSTED PARTNER POPUP */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/10 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          >
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 p-2 pointer-events-none flex justify-end">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-[280px] md:w-[400px] lg:w-[450px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto border border-gray-200"
              >
                <button 
                  onClick={() => setShowPopup(false)}
                  className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1.5 shadow-md hover:bg-black/80 transition-colors z-10 backdrop-blur-md"
                >
                  <X size={20} />
                </button>
                <img 
                  src="/clientimg/14.jpg" 
                  alt="Trusted Partner" 
                  className="w-full h-auto max-h-[40vh] md:max-h-[60vh] object-cover bg-gray-100"
                />
                <div className="p-4 bg-white text-center">
                  <h3 className="text-lg md:text-xl font-extrabold text-green-700">Our Trusted Partner</h3>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔥 HERO */}
      <div className="w-full flex justify-center bg-gray-100 pt-0 md:pt-4">
        <div
          className="slider-container relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <img
            src={slides[current].img}
            alt="banner"
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-contain rounded-2xl"
          />

          <SocialSidebar />

          {/* ⬅➡ Desktop Buttons */}
          {slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="nav-btn prev hidden md:flex"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextSlide}
                className="nav-btn next hidden md:flex"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* 🔘 Dots */}
          <div className="dots">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                className={`dot ${current === i ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORY */}
      <h1 className="text-2xl md:text-4xl text-center bg-gray-100 pt-10 font-semibold">
        OUR CATEGORY
      </h1>

      <Suspense fallback={<div>Loading Categories...</div>}>
        <CategorySection />
      </Suspense>

      {/* STATS & PROCESS */}
      <Suspense fallback={<div>Loading Stats...</div>}>
        <StatsAndProcess />
      </Suspense>

      {/* MAP */}
      <div className="w-full bg-gray-100 pt-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 space-y-6 py-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Our Presence <span className="text-green-600">Across India</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Kisan Choice is rapidly expanding its footprint, delivering 100% pure, natural, and unadulterated edible oils to households across the nation. Our robust supply chain ensures purity and trust in every drop.
            </p>
            
            <ul className="space-y-5 mt-6">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1 shadow-sm border border-green-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">Extensive Distribution Network</h4>
                  <p className="text-gray-500 text-sm mt-1">Seamlessly connecting 7,000+ distributors and 35 Lakh+ retailers daily.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1 shadow-sm border border-green-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">Nationwide Reach</h4>
                  <p className="text-gray-500 text-sm mt-1">Present in multiple key states, ensuring timely delivery and constant availability.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1 shadow-sm border border-green-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">Uncompromised Quality</h4>
                  <p className="text-gray-500 text-sm mt-1">From farm to table, we maintain the highest purity levels with zero adulteration.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/2">
            <img
              src={mapimg}
              alt="India map"
              loading="lazy"
              className="w-full rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* OTHER SECTIONS */}
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <FetureProduct selectedCategory={selected} />
        <Reviews />
        <Testimonials />
        <FAQ />
      </Suspense>
    </>
  );
}
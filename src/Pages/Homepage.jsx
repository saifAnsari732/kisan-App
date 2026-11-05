import { useState, useEffect, lazy, Suspense, useMemo } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SocialSidebar from "../Compnents/SocialmediaIcon";
import HomePopupSlider from "../components/HomePopupSlider/HomePopupSlider";
const CategorySection = lazy(() => import("./CategorySection"));
const BrandAmbassador = lazy(() => import("../components/BrandAmbassador/BrandAmbassador"));
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
  { id: 1, img: "/hero_desktop_clean.webp?v=3" },
  { id: 2, img: "/img2.webp" },
  { id: 3, img: "/img3.webp" },
];

const mobileSlides = [
  { id: 1, img: "/hero_mobile_clean.webp?v=3" },
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

  // 👉 Only Manual Swipe / Drag & Click Navigation (Auto slide stopped as requested)

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
        <link rel="preload" as="image" href="/hero_desktop_clean.webp?v=3" />
      </Helmet>

      {/* 🔥 HERO */}
      <div className="w-full flex justify-center bg-gray-100 pt-3 sm:pt-4 md:pt-6 pb-2 px-3 sm:px-5 md:px-8">
        <div
          className="slider-container relative max-w-[1440px] w-full rounded-t-xl sm:rounded-t-2xl rounded-b-[26px] sm:rounded-b-[36px] md:rounded-b-[44px] overflow-hidden shadow-none border-0 ring-0 outline-none bg-transparent select-none"
        >
          {/* 🚀 Horizontal Swipe Track with Spring Physics and Touch/Mouse Drag */}
          <motion.div
            className="flex w-full h-full cursor-grab active:cursor-grabbing"
            animate={{ x: `-${current * 100}%` }}
            transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.8 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (offset.x < -40 || swipe < -150) {
                nextSlide();
              } else if (offset.x > 40 || swipe > 150) {
                prevSlide();
              }
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id || index}
                className="w-full shrink-0 h-full flex items-center justify-center select-none"
              >
                <img
                  src={slide.img}
                  alt={`Kisan Choice Edible Oils Banner ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  className="w-full h-full object-contain rounded-t-xl sm:rounded-t-2xl rounded-b-[26px] sm:rounded-b-[36px] md:rounded-b-[44px] border-0 outline-none block pointer-events-none select-none"
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>

          <SocialSidebar />

          {/* ⬅➡ Desktop Navigation Buttons with glassmorphism */}
          {slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 p-2.5 md:p-3 bg-white/85 hover:bg-white text-gray-800 rounded-full shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 hidden md:flex items-center justify-center border border-gray-100"
                aria-label="Previous slide"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 p-2.5 md:p-3 bg-white/85 hover:bg-white text-gray-800 rounded-full shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 hidden md:flex items-center justify-center border border-gray-100"
                aria-label="Next slide"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* 🔘 Modern Smooth Animated Pill Indicators */}
          <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 md:gap-2 z-20 bg-black/25 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  current === i
                    ? "w-6 md:w-7 h-2 md:h-2.5 bg-white shadow-sm"
                    : "w-2 md:w-2.5 h-2 md:h-2.5 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <HomePopupSlider />

      {/* CATEGORY */}
      <h1 className="text-2xl md:text-4xl text-center bg-gray-100 pt-10 font-semibold">
        OUR CATEGORY
      </h1>

      <Suspense fallback={<div>Loading Categories...</div>}>
        <CategorySection />
      </Suspense>

      {/* BRAND AMBASSADORS */}
      <Suspense fallback={<div className="text-center py-10 bg-slate-900 text-white">Loading Brand Ambassadors...</div>}>
        <BrandAmbassador />
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
import { useState, useEffect, lazy, Suspense, useMemo } from "react";
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
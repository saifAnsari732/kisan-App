import { useState, useEffect, lazy, Suspense, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SocialSidebar from "../Compnents/SocialmediaIcon";
const CategorySection = lazy(() => import("./CategorySection"));
import mapimg from "../../public/map.webp";
import "../Styles/Home.css";

// 🔥 Lazy Load
const FetureProduct = lazy(() => import("./FetureProduct"));
const Testimonials = lazy(() => import("../Compnents/Testimonials"));
const Reviews = lazy(() => import("./Reviews"));
const FAQ = lazy(() => import("./FreQuestion"));

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
        <link rel="preload" as="image" href="/img1.webp" />
      </Helmet>

      {/* 🔥 HERO */}
      <div className="w-full flex justify-center bg-gray-100">
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
            fetchpriority="high"
            className="w-full h-auto object-contain rounded-2xl"
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
      <h1 className="text-3xl md:text-2xl text-center bg-gray-100 py-8 font-semibold">
        OUR CATEGORY
      </h1>

      <Suspense fallback={<div>Loading Categories...</div>}>
        <CategorySection />
      </Suspense>

      {/* MAP */}
      <div className="w-full bg-gray-100 pt-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Our Presence Across India
            </h2>
            <p className="text-gray-600">
              We deliver high-quality edible oils across India with strong
              distribution.
            </p>
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
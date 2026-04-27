import { useState, useEffect, lazy, Suspense, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SocialSidebar from "../Compnents/SocialmediaIcon";
const CategorySection = lazy(() => import("./CategorySection"));
import mapimg from "../../public/map.webp";
import "../Styles/Home.css";

// 🔥 Lazy Load (Performance Boost)
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

const mobileSlides = [{ id: 1, img: "/pimg2.webp" }];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 650 : false
  );

  const [selected, setSelected] = useState("All");

  // 📱 Responsive detect
  useEffect(() => {
    const media = window.matchMedia("(max-width: 650px)");
    const handleChange = (e) => setIsMobile(e.matches);

    setIsMobile(media.matches);
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  // ✅ Memoized slides
  const slides = useMemo(
    () => (isMobile ? mobileSlides : desktopSlides),
    [isMobile]
  );

  useEffect(() => {
    setCurrent(0);
  }, [isMobile]);

  // 👉 Manual Slider
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      {/* ✅ SEO + Preload */}
      <Helmet>
        <title>Kisan Choice - Best Edible Oil Brand in India</title>

        <meta
          name="description"
          content="Kisan Choice delivers premium mustard oil, refined oil, and edible oils across India. Trusted for purity, quality and health."
        />

        <meta
          name="keywords"
          content="mustard oil, refined oil, edible oil, kisan choice, cooking oil india"
        />

        <meta property="og:title" content="Kisan Choice - Edible Oil Brand" />
        <meta
          property="og:description"
          content="High-quality edible oils with purity and trust across India."
        />

        {/* 🔥 LCP Boost */}
        <link rel="preload" as="image" href="/img1.webp" />
      </Helmet>

      {/* 🔥 HERO */}
      <div className="w-full flex justify-center bg-gray-100">
        <div className="slider-container relative">

          <picture>
            <source srcSet={slides[current].img} type="image/webp" />
            <img
              src={slides[current].img}
              alt="Kisan Choice edible oil banner"
              loading="eager"
              fetchpriority="high"
              width="1200"
              height="500"
              className="w-full h-auto object-contain rounded-2xl"
            />
          </picture>

          <SocialSidebar />

          {/* ⬅➡ Buttons */}
          {slides.length > 1 && (
            <>
              <button onClick={prevSlide} className="nav-btn prev">
                <ChevronLeft size={24} />
              </button>

              <button onClick={nextSlide} className="nav-btn next">
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

      {/* MAP SECTION */}
      <div className="w-full bg-gray-100 pt-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">

          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Our Presence Across India
            </h2>

            <p className="text-gray-600">
              We deliver high-quality edible oils across India with a strong
              distribution network ensuring purity and trust.
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src={mapimg}
                alt="India distribution map"
                loading="lazy"
                width="600"
                height="400"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 🔥 LAZY LOADED SECTIONS */}

      <Suspense fallback={<div className="text-center py-10">Loading Products...</div>}>
        <FetureProduct selectedCategory={selected} />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10">Loading Reviews...</div>}>
        <Reviews />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10">Loading Videos...</div>}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10">Loading FAQ...</div>}>
        <FAQ />
      </Suspense>
    </>
  );
}
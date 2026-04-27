import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SocialSidebar from "../Compnents/SocialmediaIcon";
import CategorySection from "./CategorySection";
import mapimg from "../../public/map.png";
import FetureProduct from "./FetureProduct";
import Testimonials from "../Compnents/Testimonials";
import FAQ from "./FreQuestion";
import Reviews from "./Reviews";
import "../Styles/Home.css";

const desktopSlides = [
  { id: 1, img: "/img1.png" },
  { id: 2, img: "/img2.png" },
  { id: 3, img: "/img3.png" },
];

const mobileSlides = [{ id: 1, img: "/pimg2.png" }];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 650 : false
  );

  const [selected, setSelected] = useState("All");

  // 📱 responsive detect
  useEffect(() => {
    const media = window.matchMedia("(max-width: 650px)");
    const handleChange = (e) => setIsMobile(e.matches);

    setIsMobile(media.matches);
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  const slides = isMobile ? mobileSlides : desktopSlides;

  // reset when device changes
  useEffect(() => {
    setCurrent(0);
  }, [isMobile]);

  // 👉 manual navigation only (NO AUTO SLIDE)
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      {/* ✅ SEO */}
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
        <meta property="og:image" content="/img1.png" />
      </Helmet>

      {/* 🔥 HERO SLIDER (NO ANIMATION) */}
      <div className="w-full flex justify-center bg-gray-100">
        <div className="slider-container relative">

          <img
            src={slides[current].img}
            alt="banner"
            className="w-full h-auto object-contain rounded-2xl"
            loading="eager"
          />

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
          {slides.length > 1 && (
            <div className="dots">
              {slides.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`dot ${current === i ? "active" : ""}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CATEGORY */}
      <h1 className="text-3xl md:text-2xl text-center bg-gray-100 py-12 font-semibold">
        OUR CATEGORY
      </h1>

      <CategorySection />

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
                alt="India map"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      {/* OTHER SECTIONS */}
      <FetureProduct selectedCategory={selected} />
      <Reviews />
      <Testimonials />
      <FAQ />
    </>
  );
}
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(() =>
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

  const slides = isMobile ? mobileSlides : desktopSlides;

  // reset slide
  useEffect(() => {
    setCurrent(0);
  }, [isMobile]);

  // 🔁 Auto slide FIXED (5 sec)
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      {/* 🔥 HERO SLIDER */}
      <div className="w-full flex justify-center  bg-gray-100">
        <div className="slider-container">

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={`${isMobile ? "mobile" : "desktop"}-${current}`}
              custom={direction}
              initial={{ x: direction > 0 ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: direction > 0 ? "-100%" : "100%" }}
              transition={{ duration: 0.6 }}
              className="slide"
            >
              <picture className="slide-img rounded-4xl">
                <source
                  media="(max-width: 650px)"
                  srcSet={mobileSlides[current % mobileSlides.length].img}
                />          
                <img
                  src={desktopSlides[current % desktopSlides.length].img}
                  className="img w-full h-auto object-contain"
                  alt="banner"
                />
              </picture>
            </motion.div>
          </AnimatePresence>

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
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
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

   {/* 🔥 MAP SECTION (FIXED - NO SCROLL) */}
<div className="w-full bg-gray-100 pt-10 px-">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">

    {/* TEXT */}
    <div className="w-full md:w-1/2 space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
        Our Presence Across India
      </h2>

      <p className="text-gray-600">
        We deliver high-quality edible oils across multiple states in India. From mustard oil to refined oils, we maintain top quality standards
        Our strong distribution network ensures purity and trust.
      </p>

      <p className="text-gray-600">
        From mustard oil to refined oils, we maintain top quality standards.
      </p>
    </div>

    {/* IMAGE FIXED */}
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
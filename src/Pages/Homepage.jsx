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
    typeof window !== "undefined" ? window.innerWidth <= 650 : false,
  );
  const [selected, setSelected] = useState("All");
  const [viewAll, setViewAll] = useState(false);

  // Detect mobile/desktop breakpoint at 600px
  useEffect(() => {
    const media = window.matchMedia("(max-width: 650px)");
    const handleChange = (e) => setIsMobile(e.matches);

    setIsMobile(media.matches);
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  const slides = isMobile ? mobileSlides : desktopSlides;

  // Reset to first slide when switching between mobile/desktop
  useEffect(() => {
    setCurrent(0);
  }, [isMobile]);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 50000); // Changed to 5 seconds for better UX
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
      <div className="w-full flex justify-center md:py-6 bg-gray-100 mx-0">
        <div className="slider-container">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={`${isMobile ? "mobile" : "desktop"}-${current}`}
              custom={direction}
              initial={{ x: direction > 0 ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: direction > 0 ? "-100%" : "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="slide"
            >
              <picture className="slide-img">
                <source
                  media="(max-width: 650px)"
                  srcSet={mobileSlides[current % mobileSlides.length].img}
                />
                <img
                  src={desktopSlides[current % desktopSlides.length].img}
                  className="img"
                  alt="banner"
                />
              </picture>
            </motion.div>
          </AnimatePresence>

          <SocialSidebar />

          {/* Navigation Buttons - Only show if more than 1 slide */}
          {slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="nav-btn prev"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextSlide}
                className="nav-btn next"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Dots - Only show if more than 1 slide */}
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
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <h1 className="text-3xl md:text-2xl text-center bg-gray-100 pt-12 font-semibold">
        OUR CATEGORY
      </h1>
      <CategorySection />

      {/* MAP SECTION */}
      <div className="w-full bg-gray-100 pt-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* LEFT SIDE TEXT */}
          <div className="w-full md:w-1/2 space-y-4 px-7">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Our Presence Across India
            </h2>

            <p className="text-gray-600 leading-relaxed">
              We are delivering high-quality edible oils across multiple states
              in India. Our strong distribution network ensures that every
              household gets pure, healthy, and affordable products.
            </p>

            <p className="text-gray-600 leading-relaxed">
              From mustard oil to refined oils, we maintain the highest
              standards of quality and authenticity in every drop.
            </p>

            <button className="mt-3 px-5 py-2 bg-green-700 text-white rounded-lg shadow hover:bg-green-800 transition">
              Learn More
            </button>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="w-full md:w-1/2 mt-6">
            <img
              src={mapimg}
              alt="India map showing our presence"
              className="w-full h-auto md:h-[700px] object-cover rounded-[50px]"
            />
          </div>
        </div>
      </div>

      <FetureProduct selectedCategory={selected} />
      <Testimonials />
      <Reviews />
      <FAQ />
    </>
  );
}

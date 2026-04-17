import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SocialSidebar from "../Compnents/SocialmediaIcon";
import CategorySection from "./CategorySection";
import mapimg from '../../public/map.png'
import FetureProduct from "./FetureProduct";



const desktopSlides = [
  { id: 1, img: "/img1.png" },
  { id: 2, img: "/img2.png" },
  { id: 3, img: "/img3.png" },
];

const mobileSlides = [
  { id: 1, img: "/pimg1.png" },
  { id: 2, img: "/pimg2.png" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 👉 NEW (slide direction)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const handleChange = (e) => setIsMobile(e.matches);

    setIsMobile(media.matches);
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  const slides = isMobile ? mobileSlides : desktopSlides;

  useEffect(() => {
    setCurrent(0);
  }, [isMobile]);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
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
    <div className="w-full flex justify-center md:py-6 bg-gray-100">
      <div className="relative w-full md:w-[90%] h-[75vh] md:h-[60vh] overflow-hidden md:rounded-3xl md:shadow-lg bg-white">
        <AnimatePresence custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={slides[current].img}
              alt="hero"
              className=" h-full object-cove md:object-cover object-center"
              
            />
          </motion.div>
          <SocialSidebar/>
        </AnimatePresence>

        {/* Buttons */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow"
        >
          <ChevronRight />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`w-2 md:w-3 h-2 md:h-3 rounded-full cursor-pointer ${
                current === i ? "bg-black" : "bg-black/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
    <CategorySection/>

    {/* map image  */}
   {/* ✅ MAP SECTION */}
<div className="w-full bg-gray-100  px-4">
  
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
    
    {/* 🔹 LEFT SIDE TEXT */}
    <div className="w-full md:w-1/2 space-y-4 px-7">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
        Our Presence Across India
      </h2>

      <p className="text-gray-600 leading-relaxed">
        We are delivering high-quality edible oils across multiple states in India. 
        Our strong distribution network ensures that every household gets pure, 
        healthy, and affordable products.
      </p>

      <p className="text-gray-600 leading-relaxed">
        From mustard oil to refined oils, we maintain the highest standards of 
        quality and authenticity in every drop.
      </p>

      <button className="mt-3 px-5 py-2 bg-green-700 text-white rounded-lg shadow hover:bg-green-800 transition">
        Learn More
      </button>
    </div>

    {/* 🔹 RIGHT SIDE IMAGE */}
    <div className="w-full md:w-1/2 mt-6 ">
      <img
        src={mapimg}
        alt="map"
        className="w-full h-auto md:h-[550px] object-cove  rounded-4xl object-contai"
      />
    </div>

  </div>
</div>
    <FetureProduct/>
    </>
  );
}

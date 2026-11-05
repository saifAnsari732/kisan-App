import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const clientImages = [
  "/clientimg/1.jpg",
  "/clientimg/2.jpg",
  "/clientimg/3.jpg",
  "/clientimg/4.jpg",
  "/clientimg/5.jpg",
  "/clientimg/6.jpg",
  "/clientimg/7.jpg",
  "/clientimg/8.jpg",
  "/clientimg/9.jpg",
  "/clientimg/10.jpg",
  "/clientimg/11.jpg",
  "/clientimg/12.jpg",
  "/clientimg/13.jpg",
  "/clientimg/14.jpg",
  "/clientimg/15.jpg",
  "/clientimg/16.jpg",
  "/clientimg/17.jpg",
];

const marqueeItems = [...clientImages, ...clientImages, ...clientImages];
const marqueeItemsReverse = [...marqueeItems].reverse();

const reviews = [
  {
    tag: "Authentic Purity",
    highlight: "Truly Authentic",
    content: (
      <>
        Kisan Choice's mustard oil feels{" "}
        <span className="text-amber-300 font-bold bg-amber-400/15 px-1.5 py-0.5 rounded border border-amber-300/30 inline-block my-0.5">
          truly authentic
        </span>
        . Every meal tastes better with{" "}
        <span className="text-emerald-300 font-semibold">great natural quality</span>.
      </>
    ),
  },
  {
    tag: "Aroma & Taste",
    highlight: "Smells & Tastes Amazing",
    content: (
      <>
        This oil{" "}
        <span className="text-amber-300 font-bold bg-amber-400/15 px-1.5 py-0.5 rounded border border-amber-300/30 inline-block my-0.5">
          smells and tastes amazing
        </span>
        . Even the packaging is premium and{" "}
        <span className="text-emerald-300 font-semibold">everyone in our home loves it</span>.
      </>
    ),
  },
  {
    tag: "Distributor Trust",
    highlight: "On-Time Supplies",
    content: (
      <>
        Extremely happy with their services as a distributor.{" "}
        <span className="text-amber-300 font-bold bg-amber-400/15 px-1.5 py-0.5 rounded border border-amber-300/30 inline-block my-0.5">
          Supplies always come on time
        </span>{" "}
        with dependable business support.
      </>
    ),
  },
  {
    tag: "Family Health",
    highlight: "100% Pure Oil",
    content: (
      <>
        <span className="text-amber-300 font-bold bg-amber-400/15 px-1.5 py-0.5 rounded border border-amber-300/30 inline-block my-0.5">
          Very pure oil
        </span>
        . Our family{" "}
        <span className="text-emerald-300 font-semibold">
          switched completely to this brand
        </span>{" "}
        for healthy, everyday cooking.
      </>
    ),
  },
  {
    tag: "Premium Standards",
    highlight: "Excellent Packaging",
    content: (
      <>
        <span className="text-emerald-300 font-semibold">Packaging is excellent</span> and{" "}
        <span className="text-amber-300 font-bold bg-amber-400/15 px-1.5 py-0.5 rounded border border-amber-300/30 inline-block my-0.5">
          delivery is always on time
        </span>{" "}
        with factory seal intact.
      </>
    ),
  },
  {
    tag: "Value & Purity",
    highlight: "Highly Recommended",
    content: (
      <>
        <span className="text-amber-300 font-bold bg-amber-400/15 px-1.5 py-0.5 rounded border border-amber-300/30 inline-block my-0.5">
          Affordable and high quality
        </span>
        .{" "}
        <span className="text-emerald-300 font-semibold">
          Highly recommended
        </span>{" "}
        for every kitchen in India.
      </>
    ),
  },
  {
    tag: "Traditional Heritage",
    highlight: "Traditional Homemade Taste",
    content: (
      <>
        Taste reminds me of{" "}
        <span className="text-amber-300 font-bold bg-amber-400/15 px-1.5 py-0.5 rounded border border-amber-300/30 inline-block my-0.5">
          traditional homemade oil
        </span>{" "}
        extracted with{" "}
        <span className="text-emerald-300 font-semibold">pure kachi ghani perfection</span>.
      </>
    ),
  },
  {
    tag: "Partner Network",
    highlight: "Responsive Support",
    content: (
      <>
        <span className="text-emerald-300 font-semibold">Business support is very good</span>. The team is{" "}
        <span className="text-amber-300 font-bold bg-amber-400/15 px-1.5 py-0.5 rounded border border-amber-300/30 inline-block my-0.5">
          responsive, helpful and transparent
        </span>
        .
      </>
    ),
  },
];

export default function Reviews() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality for the 3D Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  // Calculates shortest distance for infinite looping effect
  const getOffset = (index) => {
    let offset = index - currentIndex;
    if (offset > Math.floor(reviews.length / 2)) offset -= reviews.length;
    if (offset < -Math.floor(reviews.length / 2)) offset += reviews.length;
    return offset;
  };

  // Defines the 3D transform based on position
  const getCardAnimation = (offset) => {
    const abs = Math.abs(offset);
    if (abs > 2) return { opacity: 0, scale: 0.5, x: offset > 0 ? "250%" : "-250%", zIndex: 0, display: "none" };
    
    if (offset === 0) {
      return { opacity: 1, scale: 1, x: "0%", rotateY: 0, zIndex: 50, display: "block" };
    } else if (offset === 1) {
      return { opacity: 0.9, scale: 0.85, x: "85%", rotateY: -35, zIndex: 40, display: "block" };
    } else if (offset === -1) {
      return { opacity: 0.9, scale: 0.85, x: "-85%", rotateY: 35, zIndex: 40, display: "block" };
    } else if (offset === 2) {
      return { opacity: 0.5, scale: 0.7, x: "160%", rotateY: -45, zIndex: 30, display: "block" };
    } else if (offset === -2) {
      return { opacity: 0.5, scale: 0.7, x: "-160%", rotateY: 45, zIndex: 30, display: "block" };
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      {/* SEO */}
      <Helmet>
        <title>Customer Reviews | KisanChoice</title>
        <meta
          name="description"
          content="Read real customer reviews of KisanChoice edible oils. Trusted by families and distributors across India."
        />
      </Helmet>

      {/* ============ CLIENT IMAGES MARQUEE SECTION ============ */}
      <section className="py-12 px-4 relative bg-gray-50">
        <div className="w-full mx-auto overflow-hidden relative">
          <h2 className="text-center text-3xl md:text-4xl font-extrabold text-gray-900 mb-10">
            Our Trusted Partners
          </h2>
          
          {/* Soft fading edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none mt-16" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none mt-16" />

          {/* ROW 1 */}
          <div className="relative w-full flex overflow-hidden mb-4 md:mb-6">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 40, repeat: Infinity }}
              className="flex gap-4 md:gap-6 w-max pr-4 md:pr-6"
            >
              {marqueeItems.map((src, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => setSelectedImg(src)}
                  className="w-[160px] md:w-[240px] aspect-[4/5] relative overflow-hidden rounded-[16px] md:rounded-[24px] shadow-lg bg-white shrink-0 cursor-pointer group hover:shadow-2xl hover:shadow-green-500/20"
                >
                  <img 
                    src={src} 
                    alt={`Client ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end justify-center pb-4">
                    <span className="text-white text-xs font-bold tracking-widest uppercase bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View
                    </span>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ROW 2 */}
          <div className="relative w-full flex overflow-hidden">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ ease: "linear", duration: 45, repeat: Infinity }}
              className="flex gap-4 md:gap-6 w-max pr-4 md:pr-6"
            >
              {marqueeItemsReverse.map((src, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => setSelectedImg(src)}
                  className="w-[160px] md:w-[240px] aspect-[4/5] relative overflow-hidden rounded-[16px] md:rounded-[24px] shadow-lg bg-white shrink-0 cursor-pointer group hover:shadow-2xl hover:shadow-green-500/20"
                >
                  <img 
                    src={src} 
                    alt={`Client ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end justify-center pb-4">
                    <span className="text-white text-xs font-bold tracking-widest uppercase bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View
                    </span>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ PROFESSIONAL 3D COVERFLOW TESTIMONIALS ============ */}
      <section className="relative py-20 overflow-hidden flex-1 flex flex-col items-center bg-gradient-to-b from-rose-50 to-pink-100">
        
        {/* Clean Header matching the professional theme */}
        <div className="text-center mb-16 relative z-10 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-[50px] font-extrabold text-gray-900 tracking-tight uppercase mb-4">
            What Our <span className="text-emerald-600 text-8xl">Clients Say</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg font-medium max-w-2xl mx-auto">
            Real feedback from our trusted network and families across India.
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div 
          className="relative w-full max-w-[1200px] mx-auto h-[480px] md:h-[550px] flex justify-center items-center"
          style={{ perspective: "1500px" }}
        >
          {/* Left Arrow */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 md:left-6 lg:left-12 z-[100] p-2 md:p-3 bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-full transition-colors shadow-lg border border-gray-200 hidden sm:flex"
            aria-label="Previous review"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Cards */}
          {reviews.map((review, i) => {
            const offset = getOffset(i);
            const anim = getCardAnimation(offset);
            
            return (
              <motion.div
                key={i}
                initial={false}
                animate={anim}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute w-[280px] md:w-[340px] h-[390px] md:h-[450px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[24px] md:rounded-[32px] overflow-hidden flex flex-col cursor-pointer bg-gradient-to-br from-[#0c4a34] via-[#083827] to-[#042419] border-2 border-amber-400/35 backdrop-blur-md"
                onClick={() => setCurrentIndex(i)}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Ambient Card Background Glow */}
                <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />

                <div className="relative w-full h-full p-6 md:p-8 flex flex-col justify-between items-center text-center z-10">
                  {/* Top Header: Tag Badge & Golden Stars */}
                  <div className="flex flex-col items-center gap-2.5 w-full">
                    <span className="px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 shadow-sm">
                      {review.tag}
                    </span>
                    <div className="flex gap-1.5 mt-1">
                      {[...Array(5)].map((_, idx) => (
                        <FaStar
                          key={idx}
                          className="text-amber-400 drop-shadow-[0_0_8px_rgba(245,179,1,0.5)]"
                          size={18}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Center Quote Area with Highlighted Text */}
                  <div className="my-auto py-2 px-1 relative">
                    <span className="text-4xl text-amber-400/25 font-serif leading-none block mb-1 pointer-events-none select-none">
                      “
                    </span>
                    <p className="text-white/95 text-[15px] md:text-[16px] leading-relaxed font-normal">
                      {review.content}
                    </p>
                    <span className="text-4xl text-amber-400/25 font-serif leading-none block mt-1 pointer-events-none select-none">
                      ”
                    </span>
                  </div>

                  {/* Bottom Verified Feedback Badge */}
                  <div className="mt-2">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-emerald-100 text-xs font-semibold backdrop-blur-sm shadow-inner">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Verified Customer Review
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Right Arrow */}
          <button 
            onClick={nextSlide}
            className="absolute right-2 md:right-6 lg:right-12 z-[100] p-2 md:p-3 bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-full transition-colors shadow-lg border border-gray-200 hidden sm:flex"
            aria-label="Next review"
          >
            <ChevronRight size={32} />
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-4 md:mt-8 z-10 relative">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-emerald-600 w-8' : 'bg-emerald-200 hover:bg-emerald-400 w-2.5'}`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* LIGHTBOX FOR MARQUEE IMAGES */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl" 
            onClick={() => setSelectedImg(null)}
          >
            <motion.button 
              initial={{ opacity: 0, rotate: -180, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              onClick={() => setSelectedImg(null)}
              className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-white/10 hover:bg-red-500/80 text-white rounded-full p-2.5 sm:p-3 transition-colors duration-300 z-20 backdrop-blur-md border border-white/10 hover:border-red-400"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, x: "-50vw", scale: 0.5, rotate: -5 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, x: "50vw", scale: 0.5, rotate: 5 }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
              className="relative max-w-4xl max-h-[90vh] w-full flex justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-green-500/15 rounded-3xl blur-3xl scale-105 -z-10"></div>
              <img 
                src={selectedImg} 
                alt="Full size client" 
                className="max-w-[92vw] sm:max-w-[85vw] md:max-w-full max-h-[75vh] sm:max-h-[85vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl ring-2 ring-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
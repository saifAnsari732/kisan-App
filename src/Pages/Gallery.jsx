import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
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

const galleryModalVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100vw" : "-100vw",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100vw" : "100vw",
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [[page, direction], setPage] = useState([0, 1]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLoadImg, setCurrentLoadImg] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const totalDuration = 2500;
    const interval = totalDuration / galleryImages.length;
    const timer = setInterval(() => {
      setCurrentLoadImg((prev) => {
        const next = prev + 1;
        setLoadProgress(Math.round(((next + 1) / galleryImages.length) * 100));
        if (next >= galleryImages.length - 1) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 400);
          return galleryImages.length - 1;
        }
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [isLoading]);

  const openLightbox = (index) => {
    setSelectedIndex(index);
    setPage([index, 1]);
  };

  const closeLightbox = () => {
    setPage([selectedIndex, 1]);
    setSelectedIndex(null);
  };

  const goNext = (e) => {
    if (e) e.stopPropagation();
    if (selectedIndex === null) return;
    const nextIndex = (selectedIndex + 1) % galleryImages.length;
    setSelectedIndex(nextIndex);
    setPage([nextIndex, 1]);
  };

  const goPrev = (e) => {
    if (e) e.stopPropagation();
    if (selectedIndex === null) return;
    const prevIndex = (selectedIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedIndex(prevIndex);
    setPage([prevIndex, -1]);
  };

  // ========== LOADING SCREEN ==========
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[300] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center justify-center overflow-hidden px-4">

        {/* Main showcase - single large image at a time */}
        <div className="relative z-10 flex flex-col items-center">
          
          {/* Image container */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mb-10">
            
            {/* Soft glow behind active image */}
            <div className="absolute inset-4 bg-green-500/15 rounded-3xl blur-[60px]"></div>
            
            <AnimatePresence mode="wait">
              <motion.img
                key={currentLoadImg}
                src={galleryImages[currentLoadImg]}
                alt="Loading preview"
                initial={{ opacity: 0, x: 120, scale: 0.85 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -120, scale: 0.85 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover rounded-2xl sm:rounded-3xl shadow-2xl ring-1 ring-white/10"
              />
            </AnimatePresence>

            {/* Image count badge */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/50 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full border border-white/10 z-10">
              {currentLoadImg + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-6"
          >
            Loading <span className="text-green-400">Gallery</span>
          </motion.h2>

          {/* Progress bar */}
          <div className="w-48 sm:w-64 md:w-80 h-1 bg-white/10 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
              animate={{ width: `${loadProgress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <p className="text-white/30 text-xs font-mono tracking-widest">{loadProgress}%</p>
        </div>

        {/* Bottom thumbnail strip - shows loaded images */}
        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center gap-1.5 sm:gap-2 px-4 overflow-hidden">
          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: i <= currentLoadImg ? 1 : 0.15,
                y: i <= currentLoadImg ? 0 : 30,
                scale: i === currentLoadImg ? 1.15 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <img
                src={src}
                alt=""
                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover rounded-md sm:rounded-lg transition-all duration-300 ${
                  i === currentLoadImg 
                    ? "ring-2 ring-green-400 brightness-110" 
                    : i <= currentLoadImg 
                      ? "brightness-75" 
                      : "brightness-[0.2]"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // ========== MAIN GALLERY ==========
  return (
    <div className="bg-gradient-to-b from-pink-50 to-rose-100 min-h-screen py-10 sm:py-16 px-3 sm:px-4 md:px-8">
      <Helmet>
        <title>Gallery | KisanChoice</title>
        <meta name="description" content="View our gallery of trusted partners and happy clients." />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-800 mb-3 sm:mb-4"
          >
            Our Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-medium px-2"
          >
            A glimpse into our wide network of trusted partners, distributors, and happy clients across India.
          </motion.p>
          <div className="w-16 sm:w-24 h-1 bg-green-500 mx-auto mt-4 sm:mt-6 rounded-full"></div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {galleryImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 10) * 0.08, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8 }}
              onClick={() => openLightbox(index)}
              className="relative group cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-md hover:shadow-2xl transition-shadow duration-500 aspect-[4/5]"
            >
              <img
                src={src}
                alt={`Client partner ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-4 sm:pb-8">
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-100 scale-75 transition-transform duration-300">
                    <ZoomIn className="text-white w-4 h-4 sm:w-[22px] sm:h-[22px]" />
                  </div>
                  <span className="hidden sm:block text-white text-sm font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    View
                  </span>
                </div>
              </div>
              
              {/* Corner Shine */}
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/30 to-transparent rotate-12 transform translate-x-full group-hover:-translate-x-1/4 transition-transform duration-1000 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence mode="wait">
        {selectedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl" 
            onClick={closeLightbox}
          >
            {/* Close */}
            <motion.button 
              initial={{ opacity: 0, rotate: -180, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              onClick={closeLightbox}
              className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-white/10 hover:bg-red-500/80 text-white rounded-full p-2.5 sm:p-3 transition-colors duration-300 z-20 backdrop-blur-md border border-white/10 hover:border-red-400"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            {/* Prev */}
            <motion.button
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ delay: 0.3 }}
              onClick={goPrev}
              className="absolute left-1.5 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 text-white rounded-full p-2 sm:p-3 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
            </motion.button>

            {/* Next */}
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ delay: 0.3 }}
              onClick={goNext}
              className="absolute right-1.5 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 text-white rounded-full p-2 sm:p-3 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
            </motion.button>

            {/* Image */}
            <div className="relative flex justify-center items-center p-3 sm:p-8 md:p-16" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={selectedIndex}
                  custom={direction}
                  variants={galleryModalVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative"
                >
                  <div className="absolute inset-0 bg-green-500/20 rounded-3xl blur-3xl scale-105 -z-10"></div>
                  <img 
                    src={galleryImages[selectedIndex]} 
                    alt="Full size view" 
                    className="max-w-[92vw] sm:max-w-[85vw] md:max-w-[70vw] max-h-[70vh] sm:max-h-[80vh] object-contain rounded-xl sm:rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] ring-2 ring-white/10"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Counter */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ delay: 0.35 }}
              className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full border border-white/10 text-white/80 text-xs sm:text-sm font-medium tracking-wider"
            >
              {selectedIndex + 1} / {galleryImages.length}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

// Valid YouTube Video IDs for Kisan Choice Testimonials
const videos = [
  { id: "ThTKnrGodBU", name: "Siobhan" },
  { id: "FWWb4bBzsyY", name: "john" },
  { id: "3GsEO3dCTLc", name: "Saif" },
  { id: "J3hOi0C0BgQ", name: "jelly" },
  { id: "IYhRr04xjkI", name: "Siobhan" },
  { id: "L_LUpnjgPso", name: "Katy" },
  { id: "dW4cWWgFqek", name: "Katy" },
  { id: "gqzWQcwNDMQ", name: "Zeeshan" },
  { id: "K4VnPcIcn4k", name: "Aleks" },
  { id: "QBNnM2W9vpk", name: "Rajesh" },
  { id: "-w00Kef-IMg", name: "Vikram" },
];

const fallbackThumbnail = "https://img.youtube.com/vi/ThTKnrGodBU/hqdefault.jpg";

// Duplicate array for seamless infinite scrolling marquee
const marqueeVideos = [...videos, ...videos, ...videos, ...videos];

export default function Testimonials() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="relative bg-[#195b56] py-16 md:py-24 overflow-hidden min-h-[90vh] flex flex-col justify-center">

      {/* SEO */}
      <Helmet>
        <title>KisanChoice Videos & Testimonials</title>
        <meta
          name="description"
          content="Watch KisanChoice product videos, testimonials and brand journey. Discover our premium edible oils."
        />
      </Helmet>

      {/* Header matching reference UI */}
      <div className="relative z-20 max-w-[1400px] mx-auto w-full px-4 md:px-8 lg:px-12 mb-16 md:mb-20">
        <div className="inline-block bg-white/15 px-3 py-1 md:px-5 md:py-2 backdrop-blur-sm mb-1 md:mb-3 shadow-sm border border-white/10">
          <h2 className="text-white font-serif text-3xl sm:text-5xl lg:text-[64px] leading-tight">
            Real stories and testimonials
          </h2>
        </div>
        <br />
        <h3 className="text-white font-black text-5xl sm:text-7xl lg:text-[100px] tracking-tight uppercase leading-none drop-shadow-md">
          FROM OUR CLIENTS
        </h3>
      </div>

      {/* Auto Smooth Sliding Slanted Carousel */}
      <div className="relative z-10 w-[110vw] -ml-[5vw] pt-10 pb-20 md:pb-32">
        <div className="transform -rotate-[6deg] w-full">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            className="flex gap-4 sm:gap-6 md:gap-8 w-max px-4 hover:cursor-grab active:cursor-grabbing"
          >
            {marqueeVideos.map((vid, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                className="shrink-0 flex flex-col group cursor-pointer relative"
                onClick={() => setActiveVideo(vid.id)}
              >
                {/* Card Thumbnail */}
                <div className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] aspect-[3/4] rounded-2xl md:rounded-[32px] overflow-hidden bg-gray-900 border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.4)] relative group-hover:border-white/50 transition-colors duration-300">
                  <img 
                    src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`} 
                    alt={vid.name}
                    onError={(e) => {
                      e.currentTarget.src = fallbackThumbnail;
                    }}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                  />
                  
                  {/* Green Play Button Overlay */}
                  <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5 w-10 h-10 md:w-14 md:h-14 bg-[#14833b] rounded-full flex items-center justify-center shadow-xl group-hover:bg-[#1db954] group-hover:scale-110 transition-all duration-300">
                    <Play className="text-white ml-1 w-4 h-4 md:w-6 md:h-6" fill="currentColor" />
                  </div>
                </div>
                
                {/* Name Label */}
                <p className="text-white/90 font-serif text-base md:text-xl mt-3 md:mt-4 pl-3 md:pl-5 group-hover:text-white transition-colors duration-300 tracking-wide">
                  {vid.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* FULL SCREEN LIGHTBOX MODAL FOR YOUTUBE VIDEO */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors z-50 border border-white/20"
              onClick={() => setActiveVideo(null)}
            >
              <X size={24} />
            </button>

            {/* Video Iframe Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] ring-1 ring-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
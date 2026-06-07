import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const clientImages = [
  "/clientimg/WhatsApp Image 2026-06-06 at 6.13.22 PM (1).webp",
  "/clientimg/WhatsApp Image 2026-06-06 at 6.13.22 PM.webp",
  "/clientimg/WhatsApp Image 2026-06-06 at 6.13.33 PM (1).webp",
  "/clientimg/WhatsApp Image 2026-06-06 at 6.13.33 PM.webp",
];

const marqueeItems = [...clientImages, ...clientImages, ...clientImages, ...clientImages, ...clientImages, ...clientImages];
const marqueeItemsReverse = [...marqueeItems].reverse();

const reviews = [
  {
    text: "Kisan Choice's mustard oil feels truly authentic. Every meal tastes better. Great quality too.",
    name: "Ram Shakal Singh",
    location: "UP",
  },
  {
    text: "This oil smells and tastes amazing. Even the packaging is good. Everyone loves it.",
    name: "Prabhash Yadav",
    location: "Bihar",
  },
  {
    text: "I’m a distributor and happy with their services. Supplies always come on time.",
    name: "Surendra Yadav",
    location: "Jharkhand",
  },
  {
    text: "Very pure oil. My family switched completely to this brand.",
    name: "Amit Verma",
    location: "Delhi",
  },
  {
    text: "Packaging is excellent and delivery is always on time.",
    name: "Rakesh Kumar",
    location: "Punjab",
  },
  {
    text: "Affordable and high quality. Highly recommended.",
    name: "Sanjay Mishra",
    location: "MP",
  },
  {
    text: "Taste reminds me of traditional homemade oil.",
    name: "Deepak Yadav",
    location: "UP",
  },
  {
    text: "Business support is very good. Team is responsive.",
    name: "Vikash Singh",
    location: "Bihar",
  },
];

export default function Reviews() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section className="bg-gray-100 py-12 px-4">

      {/* ✅ SEO */}
      <Helmet>
        <title>Customer Reviews | KisanChoice</title>
        <meta
          name="description"
          content="Read real customer reviews of KisanChoice edible oils. Trusted by families and distributors across India."
        />
      </Helmet>

      {/* CLIENT IMAGES MARQUEE */}
      <div className="w-full mx-auto mb-24 overflow-hidden relative">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-gray-900 mb-10">
        Our Trusted Partners
        </h2>
        
        {/* Soft fading edges for premium look */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none mt-16" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none mt-16" />

        {/* ROW 1: R to L */}
        <div className="relative w-full flex overflow-hidden mb-4 md:mb-6">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            className="flex gap-4 md:gap-6 w-max pr-4 md:pr-6"
          >
            {marqueeItems.map((src, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedImg(src)}
                className="w-[160px] md:w-[240px] aspect-[4/5] relative overflow-hidden rounded-[16px] md:rounded-[24px] shadow-lg bg-white shrink-0 cursor-pointer group"
              >
                <img 
                  src={src} 
                  alt={`Client ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ROW 2: L to R */}
        <div className="relative w-full flex overflow-hidden">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 45, repeat: Infinity }}
            className="flex gap-4 md:gap-6 w-max pr-4 md:pr-6"
          >
            {marqueeItemsReverse.map((src, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedImg(src)}
                className="w-[160px] md:w-[240px] aspect-[4/5] relative overflow-hidden rounded-[16px] md:rounded-[24px] shadow-lg bg-white shrink-0 cursor-pointer group"
              >
                <img 
                  src={src} 
                  alt={`Client ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-center text-3xl md:text-4xl font-bold text-green-700 mb-10">
        Happy Clients
      </h2>

      {/* ✅ MANUAL SCROLL */}
      <div className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-4">
        <div className="relative w-full">
          
                    {/* ⬅ LEFT */}
                    <button
                      onClick={() => scroll("left")}
                      className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full"
                    >
                      <ChevronLeft size={20} />
                    </button>
        
                    {/* ➡ RIGHT */}
                    <button
                      onClick={() => scroll("right")}
                      className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full"
                    >
                      <ChevronRight size={20} />
                    </button>
        </div>
        {reviews.map((review, index) => (
          <div
            key={index}
            className="min-w-[280px] md:min-w-[320px] 
            bg-white rounded-xl shadow-md p-6 flex-shrink-0 
            flex flex-col flex-3 h-[230px] justify-between hover:shadow-xl transition"
          >
            {/* Quote */}
            <div className="text-4xl mb-1 text-yellow-400">❝</div>

            {/* Text */}
            <p className="text-sm text-center text-gray-700 leading-relaxed mb-4">
              {review.text}
            </p>

            {/* Stars */}
            <div className="text-yellow-400 flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={18} />
              ))}
            </div>

            {/* Name */}
            <div className="mt-auto text-center">
              <h4 className="font-semibold">{review.name}</h4>
              <p className="text-sm text-gray-500">{review.location}</p>
            </div>
          </div>
        ))}

      </div>

      {/* FULL SCREEN LIGHTBOX */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedImg(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl max-h-[90vh] w-full flex justify-center items-center"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            >
              <button 
                onClick={() => setSelectedImg(null)}
                className="absolute -top-12 right-0 md:-right-12 md:top-0 bg-white/10 hover:bg-white/30 text-white rounded-full p-2 transition-colors z-10"
              >
                <X size={28} />
              </button>
              <img 
                src={selectedImg} 
                alt="Full size client" 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
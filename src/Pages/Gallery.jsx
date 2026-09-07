import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const galleryImages = [
  "/clientimg/WhatsApp Image 2026-06-06 at 6.13.22 PM (1).webp",
  "/clientimg/WhatsApp Image 2026-06-06 at 6.13.22 PM.webp",
  "/clientimg/WhatsApp Image 2026-06-06 at 6.13.33 PM (1).webp",
  "/clientimg/WhatsApp Image 2026-06-06 at 6.13.33 PM.webp",
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
];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="bg-gradient-to-b from-pink-50 to-rose-100 min-h-screen py-16 px-4 md:px-8">
      <Helmet>
        <title>Gallery | KisanChoice</title>
        <meta
          name="description"
          content="View our gallery of trusted partners and happy clients."
        />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-green-800 mb-4"
          >
            Our Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto font-medium"
          >
            A glimpse into our wide network of trusted partners, distributors, and happy clients across India.
          </motion.p>
          <div className="w-24 h-1 bg-green-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Masonry-style Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 10) * 0.1 }}
              onClick={() => setSelectedImg(src)}
              className="relative group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all aspect-[4/5]"
            >
              <motion.img
                layoutId={`gallery-image-${src}`}
                src={src}
                alt={`Client partner ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white border-2 border-white px-4 py-2 rounded-full text-sm font-semibold tracking-wider backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  View Image
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FULL SCREEN LIGHTBOX POPUP */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" 
            onClick={() => setSelectedImg(null)}
          >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] flex justify-center items-center"
              onClick={(e) => e.stopPropagation()} 
            >
              <motion.button 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ delay: 0.2 }}
                onClick={() => setSelectedImg(null)}
                className="absolute -top-12 right-0 md:-right-12 md:top-0 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors z-10"
              >
                <X size={28} />
              </motion.button>
              
              <motion.img 
                layoutId={`gallery-image-${selectedImg}`}
                src={selectedImg} 
                alt="Full size view" 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl ring-4 ring-white/10"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

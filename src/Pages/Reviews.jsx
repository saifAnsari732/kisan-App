import { ChevronLeft, ChevronRight, X, CheckCircle2 } from "lucide-react";
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
    content: "Kisan Choice's mustard oil feels truly authentic. Every meal tastes better with great natural quality.",
  },
  {
    tag: "असली कच्ची घानी",
    content: "सरसों तेल का तीखापन और खुशबू एकदम गांव की कच्ची घानी जैसी है। खाने में असली देसी स्वाद आ जाता है।",
  },
  {
    tag: "Pure Aroma",
    content: "Kisan Choice tel ka jhaanjh aur aroma bilkul perfect hai. Sabzi me thoda sa daalo to pura ghar mehak jata hai.",
  },
  {
    tag: "शुद्ध पूजा तेल",
    content: "पूजा के लिए हमने किसान चॉइस का पूजा तेल इस्तेमाल किया, दीया बहुत देर तक शांत और बिना काले धुएं के जलता है।",
  },
  {
    tag: "Healthy & Light",
    content: "Refined soyabean aur sunflower oil daily cooking ke liye bahut halka hai. Puri aur pakode bilkul oily nahi lagte.",
  },
  {
    tag: "Distributor Trust",
    content: "Extremely happy with their services as a distributor. Supplies always come on time with dependable business support.",
  },
  {
    tag: "घर का भरोसा",
    content: "हमारे घर में पिछले 2 सालों से सिर्फ किसान चॉइस का ही तेल आता है। बच्चों की सेहत और बड़ों के स्वाद दोनों के लिए बेस्ट है।",
  },
  {
    tag: "Value & Quality",
    content: "Market me bohot saare brands try kiye, lekin purity aur price dono me Kisan Choice sabse best laga.",
  },
  {
    tag: "सेहतमंद रसोई",
    content: "शुद्धता की पूरी गारंटी है। भोजन पचने में आसान रहता है और तेल में किसी तरह की मिलावट या बदबू नहीं आती।",
  },
  {
    tag: "Timely Delivery",
    content: "Retail shop ke liye regular stock chahiye hota hai, aur inki delivery aur packaging hamesha factory-sealed rehti hai.",
  },
  {
    tag: "Traditional Heritage",
    content: "Taste reminds me of traditional homemade oil extracted with pure kachi ghani perfection.",
  },
  {
    tag: "दुकानदारों की पसंद",
    content: "हमारे ग्राहक बार-बार इसी तेल की मांग करते हैं। ब्रांड पर लोगों का भरोसा और बिक्री लगातार बढ़ रही है।",
  },
  {
    tag: "Super Fresh",
    content: "Bottle kholte hi taaza sarson ki natural fragrance aati hai. 100% natural feeling aati hai, taste lajawab hai!",
  },
  {
    tag: "Family Health",
    content: "Very pure oil. Our family switched completely to this brand for healthy, everyday cooking.",
  },
  {
    tag: "भक्ति और पवित्रता",
    content: "मंदिर और घर के अनुष्ठानों में इस पूजा तेल का उपयोग करने से एक अलग ही सात्विक शांति और पवित्रता महसूस होती है।",
  },
  {
    tag: "Budget Friendly",
    content: "Budget me premium quality mil rahi hai. Har parivar ke liye Kisan Choice ekdum safe aur genuine option hai.",
  },
  {
    tag: "स्वाद और सुगंध",
    content: "अचार बनाने के लिए कच्ची घानी सरसों तेल का इस्तेमाल किया, अचार बहुत ही स्वादिष्ट बना और लंबे समय तक सुरक्षित रहा।",
  },
  {
    tag: "Reliable Support",
    content: "Business support is very good. The team is responsive, helpful and transparent.",
  },
];

export default function Reviews() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 40;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

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
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden flex-1 flex flex-col items-center bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-100/70">
        
        {/* Clean Header matching the professional theme */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 relative z-10 px-4 max-w-2xl mx-auto w-full">
          <span className="inline-block px-3 py-1 mb-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-100/90 text-emerald-800 border border-emerald-200">
            Real Customer Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase mb-3">
            What Our <span className="text-emerald-600 block sm:inline">Clients Say</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto">
            Real feedback from our trusted network and families across India.
          </p>
        </div>

        {/* 3D Carousel Container with touch swipe support */}
        <div 
          className="relative w-full max-w-[1200px] mx-auto h-[440px] sm:h-[480px] md:h-[550px] flex justify-center items-center select-none"
          style={{ perspective: "1500px" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Left Arrow (Desktop) */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 md:left-6 lg:left-12 z-[100] p-2 md:p-3 bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-full transition-colors shadow-lg border border-gray-200 hidden sm:flex"
            aria-label="Previous review"
          >
            <ChevronLeft size={30} />
          </button>

          {/* Cards */}
          {reviews.map((review, i) => {
            const offset = getOffset(i);
            const anim = getCardAnimation(offset);
            const isCenter = offset === 0;
            
            return (
              <motion.div
                key={i}
                initial={false}
                animate={anim}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`absolute w-[280px] sm:w-[310px] md:w-[340px] h-[380px] sm:h-[410px] md:h-[450px] rounded-[24px] md:rounded-[32px] overflow-hidden flex flex-col cursor-pointer bg-white border border-slate-200/90 transition-all select-none ${
                  isCenter
                    ? "shadow-[0_25px_60px_-10px_rgba(15,81,50,0.22),0_8px_20px_rgba(0,0,0,0.06)] ring-2 ring-emerald-500/35"
                    : "shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.04)]"
                }`}
                onClick={() => setCurrentIndex(i)}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Decorative Top Accent Stripe */}
                <div className="h-1.5 sm:h-2 w-full bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-500 shrink-0" />

                <div className="relative w-full flex-1 p-5 sm:p-6 md:p-8 flex flex-col justify-between items-center text-center">
                  {/* Top Header: Tag Badge & Golden Stars */}
                  <div className="flex flex-col items-center gap-2 w-full">
                    <span className="px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
                      {review.tag}
                    </span>
                    <div className="flex gap-1 mt-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <FaStar
                          key={idx}
                          className="text-amber-400 drop-shadow-[0_1px_2px_rgba(217,119,6,0.3)]"
                          size={16}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Center Quote Area with Clean Responsive Text */}
                  <div className="my-auto py-2 sm:py-3 px-1 sm:px-2 relative">
                    <span className="text-3xl text-emerald-600/20 font-serif leading-none block mb-1 pointer-events-none select-none">
                      “
                    </span>
                    <p className="text-slate-700 text-[14px] sm:text-[15px] md:text-[16.5px] leading-relaxed font-medium">
                      {review.content}
                    </p>
                    <span className="text-3xl text-emerald-600/20 font-serif leading-none block mt-1 pointer-events-none select-none">
                      ”
                    </span>
                  </div>

                  {/* Bottom Verified Feedback Badge */}
                  <div className="mt-1 sm:mt-2">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-50 border border-slate-200/90 text-slate-600 text-[11px] sm:text-xs font-semibold shadow-xs">
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      Verified Customer Review
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Right Arrow (Desktop) */}
          <button 
            onClick={nextSlide}
            className="absolute right-2 md:right-6 lg:right-12 z-[100] p-2 md:p-3 bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-full transition-colors shadow-lg border border-gray-200 hidden sm:flex"
            aria-label="Next review"
          >
            <ChevronRight size={30} />
          </button>
        </div>
        
        {/* Pagination Dots & Mobile Prev/Next controls */}
        <div className="flex items-center justify-center gap-3 mt-4 md:mt-8 z-10 relative max-w-md mx-auto px-4">
          <button 
            onClick={prevSlide}
            className="p-1.5 bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-full transition-colors shadow-md border border-gray-200 sm:hidden flex items-center justify-center active:scale-95 shrink-0"
            aria-label="Previous review"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex flex-wrap justify-center items-center gap-1.5 max-w-[240px]">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-emerald-600 w-5' : 'bg-emerald-200 hover:bg-emerald-400 w-2'}`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="p-1.5 bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-full transition-colors shadow-md border border-gray-200 sm:hidden flex items-center justify-center active:scale-95 shrink-0"
            aria-label="Next review"
          >
            <ChevronRight size={18} />
          </button>
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
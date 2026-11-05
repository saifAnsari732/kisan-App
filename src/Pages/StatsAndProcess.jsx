import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Truck, 
  Store, 
  UserCheck, 
  Leaf, 
  FlaskConical, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Eye, 
  X 
} from "lucide-react";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = "", label, icon: Icon, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const incrementTime = (duration * 1000) / end;
      const step = Math.ceil(end / 100);

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, incrementTime * step);
      
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative flex flex-col items-center justify-center p-8 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 group transition-all duration-500 overflow-hidden z-10"
    >
      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mb-6 text-green-600 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm border border-green-100">
        <Icon size={36} strokeWidth={1.5} />
      </div>
      
      <h3 className="text-4xl md:text-5xl font-black mb-2 flex items-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
        {count}
        <span className="text-green-500 ml-1">{suffix}</span>
      </h3>
      
      <p className="text-gray-500 font-bold uppercase tracking-widest text-xs md:text-sm">{label}</p>
    </motion.div>
  );
};

export default function StatsAndProcess() {
  const [showPosterModal, setShowPosterModal] = useState(false);

  const processSteps = [
    {
      id: "01",
      title: "Sourced from Farmers",
      desc: "We partner with local farmers to get the finest mustard seeds.",
      img: "/step1_sourced.jpg",
      alt: "Sourced from Farmers - Farmer in mustard field holding seeds"
    },
    {
      id: "02",
      title: "Naturally Cold-Pressed",
      desc: "Using traditional methods to retain natural nutrients.",
      img: "/step2_pressed.jpg",
      alt: "Naturally Cold-Pressed - Traditional wooden kachi ghani extracting pure oil"
    },
    {
      id: "03",
      title: "Purity Tested & Filtered",
      desc: "We ensure highest purity with careful filtration.",
      img: "/step3_filtered.jpg",
      alt: "Purity Tested & Filtered - Stainless steel filtration funnel with golden oil"
    },
    {
      id: "04",
      title: "Packed with Care",
      desc: "Sealed in premium packaging for lasting freshness.",
      img: "/step4_packed.jpg",
      alt: "Packed with Care - Sealed Pure Mustard Oil bottle"
    }
  ];

  const trustBadges = [
    { icon: Leaf, label: "100% Natural" },
    { icon: FlaskConical, label: "No Chemicals" },
    { icon: ShieldCheck, label: "Traditional Cold Pressed" },
    { icon: Award, label: "Pure & Healthy" }
  ];

  return (
    <div className="bg-[#f8fafc] py-24 px-4 md:px-8 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-green-200/20 blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-amber-200/20 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* STATS SECTION */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 font-bold text-sm tracking-wide mb-4"
          >
            OUR IMPACT
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
          >
            Our Growing <span className="text-green-600">Network</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Join millions who trust Kisan Choice for their daily cooking needs. We are expanding rapidly across the nation.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-28">
          <AnimatedCounter end={500} suffix="+" label="Stockists" icon={Truck} delay={0.1} />
          <AnimatedCounter end={7000} suffix="+" label="Distributors" icon={Users} delay={0.2} />
          <AnimatedCounter end={35} suffix="L+" label="Retailers" icon={Store} delay={0.3} />
          <AnimatedCounter end={3.5} suffix="Cr+" label="Happy Users" icon={UserCheck} delay={0.4} />
        </div>

        {/* PROCESS SECTION - REDESIGNED TO MATCH REFERENCE POSTER */}
        <div className="relative rounded-[2.5rem] p-6 sm:p-10 lg:p-14 overflow-hidden border border-emerald-900/10 shadow-[0_20px_50px_rgba(15,81,50,0.06)] bg-gradient-to-b from-[#f3f8ee]/80 via-[#fcfefb]/95 to-[#f6faf1]/90">
          
          {/* Subtle rural farm ambiance backdrop blur */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none mix-blend-multiply"
            style={{ backgroundImage: "url('/process_bg_blur.jpg')" }}
          ></div>

          {/* Section Header */}
          <div className="text-center relative z-10 mb-14 md:mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0B3D2E] text-emerald-200 border border-emerald-500/30 text-xs sm:text-sm font-semibold tracking-wider shadow-md mb-4 uppercase"
            >
              <Leaf size={15} className="text-emerald-400 rotate-[-20deg]" />
              <span>Our Process</span>
              <Leaf size={15} className="text-emerald-400 rotate-[20deg]" />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0B3D2E] tracking-tight leading-tight mb-3"
            >
              From Farm to Your{" "}
              <span className="font-serif italic font-normal text-emerald-700 underline decoration-amber-400 decoration-wavy decoration-2 underline-offset-8">
                Kitchen
              </span>
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 text-emerald-900/80 font-serif italic text-base sm:text-lg md:text-xl font-medium tracking-wide mt-2"
            >
              <span className="w-8 sm:w-14 h-[1.5px] bg-amber-400/80 inline-block"></span>
              <span>Pure Goodness, Every Step</span>
              <span className="w-8 sm:w-14 h-[1.5px] bg-amber-400/80 inline-block"></span>
            </motion.div>
          </div>

          {/* 4 Connected Process Cards */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 items-stretch max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative group bg-white rounded-[2rem] border border-emerald-100/80 shadow-[0_10px_30px_rgba(15,81,50,0.06)] hover:shadow-[0_20px_45px_rgba(15,81,50,0.14)] transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden"
              >
                {/* Horizontal Flow Arrow Connector (Desktop only, between cards) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-[52%] -right-[1.15rem] -translate-y-1/2 w-9 h-9 rounded-full bg-[#0D5C3A] text-white items-center justify-center shadow-lg border-2 border-white ring-2 ring-emerald-300/60 z-30 pointer-events-none group-hover:scale-110 transition-transform">
                    <ArrowRight size={18} className="text-white" strokeWidth={2.5} />
                  </div>
                )}

                {/* Step Number Oval Badge */}
                <div className="pt-5 pb-1 flex justify-center">
                  <span className="px-4 py-1 rounded-full bg-[#0B3D2E] text-white font-extrabold text-xs tracking-wider shadow-sm border border-emerald-400/40">
                    {step.id}
                  </span>
                </div>

                {/* Card Header Content */}
                <div className="px-5 pt-2 pb-5 text-center flex-1 flex flex-col justify-start">
                  <h3 className="text-lg md:text-xl font-extrabold text-[#0B3D2E] leading-snug tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 font-normal leading-relaxed mt-2">
                    {step.desc}
                  </p>
                </div>

                {/* Card Photo (Bottom) */}
                <div className="relative w-full aspect-[4/3] overflow-hidden mt-auto rounded-b-[2rem]">
                  <img 
                    src={step.img} 
                    alt={step.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Trust Ribbon */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative z-10 max-w-4xl mx-auto mt-12 bg-white/95 backdrop-blur-md rounded-2xl md:rounded-full border border-amber-300/80 shadow-[0_8px_30px_rgba(0,0,0,0.05)] px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 items-center text-center"
          >
            {trustBadges.map((badge, idx) => {
              const BadgeIcon = badge.icon;
              return (
                <div 
                  key={badge.label}
                  className={`flex items-center justify-center gap-2.5 py-1 ${
                    idx < trustBadges.length - 1 ? "md:border-r md:border-amber-200/80" : ""
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#0D5C3A] flex items-center justify-center flex-shrink-0 shadow-xs border border-emerald-100">
                    <BadgeIcon size={18} strokeWidth={2} />
                  </div>
                  <span className="font-bold text-gray-800 text-xs sm:text-sm tracking-tight text-left">
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* Rustic Wooden Table & Mustard Grains Bottom Strip */}
          <div className="relative z-10 w-full h-16 sm:h-20 md:h-24 mt-8 rounded-2xl overflow-hidden shadow-inner border border-amber-900/10">
            <img 
              src="/process_bottom_shelf.jpg" 
              alt="Authentic mustard harvest shelf" 
              className="w-full h-full object-cover object-top opacity-95"
            />
          </div>

          {/* Infographic Full View Action Button */}
          <div className="relative z-10 text-center mt-6">
            <button 
              onClick={() => setShowPosterModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B3D2E] hover:bg-[#125841] text-emerald-100 font-semibold text-xs sm:text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 border border-emerald-400/40"
            >
              <Eye size={16} />
              <span>View Full Process Poster</span>
            </button>
          </div>

        </div>

      </div>

      {/* Full Process Poster Modal / Lightbox */}
      <AnimatePresence>
        {showPosterModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPosterModal(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            >
              <button 
                onClick={() => setShowPosterModal(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              <img 
                src="/process_full.jpg" 
                alt="Kisan Choice Mustard Oil Process Infographic" 
                className="w-full h-auto object-contain max-h-[85vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

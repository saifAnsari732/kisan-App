import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";

const categories = [
  { 
    id: "refined", 
    title: "REFINED OILS", 
    color: "bg-gradient-to-br from-lime-500 to-green-700",
    shadow: "shadow-green-600/50",
    glow: "bg-lime-400",
    img: "/37.webp" 
  },
  { 
    id: "mustard", 
    title: "MUSTARD OILS", 
    color: "bg-gradient-to-br from-red-700 to-red-900",
    shadow: "shadow-red-800/50",
    glow: "bg-red-500",
    img: "/35.webp" 
  },
  { 
    id: "vegetable", 
    title: "VEGETABLE OIL", 
    color: "bg-gradient-to-br from-yellow-500 to-amber-600",
    shadow: "shadow-amber-600/50",
    glow: "bg-yellow-400",
    img: "/38.webp" 
  },
  { 
    id: "cold", 
    title: "COLD PRESSED", 
    color: "bg-gradient-to-br from-rose-500 to-red-700",
    shadow: "shadow-rose-600/50",
    glow: "bg-rose-400",
    img: "/39.webp" 
  },
];

const DesktopCard = ({ item, index }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const rotateX = useTransform(mouseY, [-100, 100], [8, -8]);
  const rotateY = useTransform(mouseX, [-100, 100], [-8, 8]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay: index * 0.2, ease: [0.19, 1, 0.22, 1] }}
      onClick={() => navigate(`/category/${item.id}`)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer group flex flex-col items-center w-full transition-z duration-300 ${isHovered ? 'z-50' : 'z-10'}`}
      style={{ perspective: 1000 }}
    >
      {/* CARD BODY */}
      <motion.div 
        className={`w-full relative h-[320px] rounded-[24px] ${item.color} 
          backdrop-blur-xl border border-white/20
          flex items-start justify-center overflow-hidden
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_30px_rgba(0,0,0,0.1)]
        `}
        animate={{ y: isHovered ? -10 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Stronger shadow on hover */}
        <motion.div 
          className={`absolute inset-0 rounded-[24px] shadow-2xl ${item.shadow} pointer-events-none`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Background Blurred Circles */}
        <motion.div 
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30 bg-white mix-blend-overlay pointer-events-none"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        {/* Shine Effect */}
        <motion.div
          className="absolute top-0 -left-[100%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 z-20 pointer-events-none"
          animate={{ x: ['-50%', '200%'] }}
          transition={{ 
            repeat: Infinity, 
            repeatDelay: 6, 
            duration: 1, 
            ease: "easeInOut",
            delay: index * 0.5
          }}
        />

        {/* TITLE */}
        <h2 className="text-white font-semibold tracking-widest rotate-90 text-xl opacity-80 mt-23 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none drop-shadow-md whitespace-nowrap">
          {item.title}
        </h2>
      </motion.div>

      {/* BOTTLE SECTION */}
      <div className="absolute -bottom-34 w-full flex justify-center pointer-events-none z-10">
        
        {/* Hover glow behind bottle */}
        <motion.div 
          className={`absolute bottom-20 w-48 h-48 rounded-full blur-3xl ${item.glow} mix-blend-screen`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 0.8 : 0, scale: isHovered ? 1.2 : 0.8 }}
          transition={{ duration: 0.4 }}
        />

        {/* Entrance Animation Wrapper */}
        <motion.div
          initial={{ x: index < 2 ? -100 : 100, y: 40, scale: 0.5, opacity: 0, rotate: index < 2 ? -8 : 8 }}
          whileInView={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring", 
            stiffness: 150, 
            damping: 12, 
            mass: 1.2,
            delay: index * 0.2 + 0.4 
          }}
        >
          {/* Continuous Floating Wrapper */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            {/* Parallax & Hover Wrapper */}
            <motion.div
              style={{ rotateX, rotateY, willChange: "transform" }}
              animate={{ 
                y: isHovered ? -25 : 0, 
                scale: isHovered ? 1.08 : 1, 
                rotate: isHovered ? 3 : 0 
              }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-[280px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] select-none"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const MobileCard = ({ item, index, isLeft }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay: index * 0.15, ease: "easeOut" }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(`/category/${item.id}`)}
      className={`flex ${isLeft ? "justify-start" : "justify-end"} cursor-pointer w-full mb-14`}
    >
      <div className="relative w-[85%]">
        <div
          className={`
            w-full h-32 rounded-[24px] ${item.color}
            backdrop-blur-xl border border-white/20
            shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_20px_rgba(0,0,0,0.15)]
            flex items-center overflow-hidden relative
          `}
        >
          {/* Shine Effect */}
          <motion.div
            className="absolute top-0 -left-[100%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 z-0 pointer-events-none"
            animate={{ x: ['-50%', '200%'] }}
            transition={{ repeat: Infinity, repeatDelay: 6, duration: 1, ease: "easeInOut", delay: index * 0.5 }}
          />

          <h2 className={`
            text-white font-extrabold text-lg tracking-wider z-20 drop-shadow-md px-6
            ${isLeft ? "pr-24 text-left" : "pl-24 text-right w-full"}
          `}>
            {item.title}
          </h2>
        </div>

        {/* BOTTLE */}
        <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none z-10 ${isLeft ? "-right-8" : "-left-8"}`}>
          {/* Entrance */}
          <motion.div
             initial={{ x: isLeft ? 50 : -50, scale: 0.5, opacity: 0, rotate: isLeft ? 10 : -10 }}
             whileInView={{ x: 0, scale: 1, opacity: 1, rotate: 0 }}
             viewport={{ once: true }}
             transition={{ 
               type: "spring", 
               stiffness: 150, 
               damping: 12, 
               mass: 1.2,
               delay: index * 0.15 + 0.4 
             }}
          >
            {/* Continuous floating */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-44 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)] select-none"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function CategorySection() {
  return (
    <section className="w-full py-10 md:py-16 bg-gray-100 overflow-x-hidden" aria-label="Product Categories">
      {/* ================= MOBILE ================= */}
      <div className="md:hidden px-4 pt-4">
        {categories.map((item, i) => (
          <MobileCard key={item.id} item={item} index={i} isLeft={i % 2 === 0} />
        ))}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 px-6 pb-20 pt-20">
          {categories.map((item, i) => (
            <DesktopCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
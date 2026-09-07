import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Truck, Store, UserCheck, Droplets, Leaf, ShieldCheck, ArrowRight } from "lucide-react";

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
  const processSteps = [
    {
      id: 1,
      title: "Direct from Farmers",
      desc: "We connect directly with trusted local farmers to source the finest mustard seeds, ensuring fair trade and premium quality.",
      icon: <Leaf size={40} className="text-white" strokeWidth={1.5} />,
      gradient: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      shadow: "shadow-emerald-500/30"
    },
    {
      id: 2,
      title: "Pure Cold-Press",
      desc: "Our Kachi Ghani process extracts oil at low temperatures, retaining natural aroma, essential nutrients, and authentic taste.",
      icon: <Droplets size={40} className="text-white" strokeWidth={1.5} />,
      gradient: "bg-gradient-to-br from-amber-400 to-amber-600",
      shadow: "shadow-amber-500/30"
    },
    {
      id: 3,
      title: "100% Purer Than Rest",
      desc: "Unlike other brands, we use zero chemicals or preservatives. Just double-filtered, raw purity delivered straight to you.",
      icon: <ShieldCheck size={40} className="text-white" strokeWidth={1.5} />,
      gradient: "bg-gradient-to-br from-orange-400 to-rose-500",
      shadow: "shadow-orange-500/30"
    }
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-32">
          <AnimatedCounter end={500} suffix="+" label="Stockists" icon={Truck} delay={0.1} />
          <AnimatedCounter end={7000} suffix="+" label="Distributors" icon={Users} delay={0.2} />
          <AnimatedCounter end={35} suffix="L+" label="Retailers" icon={Store} delay={0.3} />
          <AnimatedCounter end={3.5} suffix="Cr+" label="Happy Users" icon={UserCheck} delay={0.4} />
        </div>

        {/* PROCESS SECTION */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 font-bold text-sm tracking-wide mb-4"
          >
            HOW WE DO IT
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
          >
            Our Journey: <span className="text-amber-500">Farm to Kitchen</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Discover how we bring the purest mustard oil from Indian farms straight to your plate, maintaining 100% transparency.
          </motion.p>
        </div>

        <div className="relative">
          {/* Subtle Connecting Dashed Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] border-t-2 border-dashed border-gray-300 -translate-y-1/2 z-0 opacity-60"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
            {processSteps.map((step, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                key={step.id} 
                className="relative group"
              >
                <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-100 transition-all duration-500 overflow-hidden h-full z-10 relative group-hover:-translate-y-2">
                  
                  {/* Top Gradient Border */}
                  <div className={`absolute top-0 left-0 w-full h-2 ${step.gradient} opacity-80`}></div>
                  
                  {/* Faded Background Number */}
                  <div className="absolute -top-6 -right-4 text-[150px] font-black text-gray-50 opacity-50 group-hover:text-gray-100 transition-colors duration-500 pointer-events-none select-none leading-none">
                    {step.id}
                  </div>

                  {/* Icon Container */}
                  <div className={`w-20 h-20 rounded-3xl ${step.gradient} flex items-center justify-center text-white mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-xl ${step.shadow} relative z-20`}>
                    {step.icon}
                  </div>
                  
                  <div className="relative z-20">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{step.desc}</p>
                  </div>

                  {/* Arrow Indicator (Desktop) */}
                  {index !== processSteps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-8 w-16 h-16 bg-white rounded-full items-center justify-center shadow-lg border border-gray-100 z-30 transform -translate-y-1/2">
                      <ArrowRight className="text-gray-400 group-hover:text-gray-800 transition-colors" size={24} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

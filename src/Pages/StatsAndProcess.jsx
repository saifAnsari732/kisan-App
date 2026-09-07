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
      icon: <Leaf size={28} className="text-white" strokeWidth={2} />,
      gradient: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      shadow: "shadow-emerald-500/30",
      img: "/process1.jpg"
    },
    {
      id: 2,
      title: "Pure Cold-Press",
      desc: "Our Kachi Ghani process extracts oil at low temperatures, retaining natural aroma, essential nutrients, and authentic taste.",
      icon: <Droplets size={28} className="text-white" strokeWidth={2} />,
      gradient: "bg-gradient-to-br from-amber-400 to-amber-600",
      shadow: "shadow-amber-500/30",
      img: "/process2.jpg"
    },
    {
      id: 3,
      title: "100% Purer Than Rest",
      desc: "Unlike other brands, we use zero chemicals or preservatives. Just double-filtered, raw purity delivered straight to you.",
      icon: <ShieldCheck size={28} className="text-white" strokeWidth={2} />,
      gradient: "bg-gradient-to-br from-orange-400 to-rose-500",
      shadow: "shadow-orange-500/30",
      img: "/process3.jpg"
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

        <div className="relative mt-16 max-w-6xl mx-auto">
          
          {/* Subtle Vertical Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-100 via-amber-100 to-orange-100 -translate-x-1/2 z-0"></div>

          <div className="flex flex-col gap-24 relative z-10">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  key={step.id} 
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
                >
                  
                  {/* Image Side (Smaller) */}
                  <div className="w-full sm:w-4/5 md:w-2/3 lg:w-5/12 xl:w-1/3 relative group mx-auto">
                    <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] transform transition-transform duration-700 hover:shadow-2xl group-hover:-translate-y-2">
                      <img 
                        src={step.img} 
                        alt={step.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                    
                    {/* Floating Step Number */}
                    <div className={`absolute -bottom-5 ${isEven ? '-right-5' : '-left-5'} w-20 h-20 rounded-full ${step.gradient} text-white flex items-center justify-center font-black text-3xl shadow-xl ring-8 ring-white z-20`}>
                      0{step.id}
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`w-full lg:w-7/12 xl:w-2/3 space-y-5 ${isEven ? 'lg:pl-12' : 'lg:pr-12'} text-center lg:text-left`}>
                    <div className={`inline-flex items-center justify-center p-3.5 rounded-2xl ${step.gradient} text-white shadow-lg mb-2`}>
                      {step.icon}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

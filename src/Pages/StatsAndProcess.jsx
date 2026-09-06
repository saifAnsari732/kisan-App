import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Truck, Store, UserCheck, Droplets, Leaf, ShieldCheck } from "lucide-react";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = "", label, icon: Icon }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const incrementTime = (duration * 1000) / end;
      
      // If end is very large, step in chunks to avoid freezing
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

  // Format large numbers based on Indian system if needed
  const displayCount = count >= 100 ? count : count;

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg border-b-4 border-green-500 hover:-translate-y-2 transition-transform duration-300">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
        <Icon size={32} />
      </div>
      <h3 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center">
        {count}
        {suffix}
      </h3>
      <p className="text-gray-500 font-medium mt-2 text-center uppercase tracking-wider text-sm">{label}</p>
    </div>
  );
};

export default function StatsAndProcess() {
  const processSteps = [
    {
      id: 1,
      title: "Direct from Farmers",
      desc: "We connect directly with trusted local farmers to source the finest mustard seeds, ensuring fair trade and premium quality.",
      icon: <Leaf size={40} className="text-white" />,
      color: "bg-green-500"
    },
    {
      id: 2,
      title: "Pure Cold-Press Process",
      desc: "Our Kachi Ghani process extracts oil at low temperatures, retaining natural aroma, essential nutrients, and authentic taste.",
      icon: <Droplets size={40} className="text-white" />,
      color: "bg-yellow-500"
    },
    {
      id: 3,
      title: "100% Purer Than Rest",
      desc: "Unlike other brands, we use zero chemicals or preservatives. Just double-filtered, raw purity delivered straight to you.",
      icon: <ShieldCheck size={40} className="text-white" />,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* STATS SECTION */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Growing Network</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Join millions who trust Kisan Choice for their daily cooking needs.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <AnimatedCounter end={500} suffix="+" label="Stockists" icon={Truck} />
          <AnimatedCounter end={7000} suffix="+" label="Distributors" icon={Users} />
          <AnimatedCounter end={35} suffix=" Lakh+" label="Retailers" icon={Store} />
          <AnimatedCounter end={3.5} suffix=" Cr+" label="Happy Users" icon={UserCheck} />
        </div>

        {/* PROCESS SECTION (Circle UI) */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Journey: Farm to Kitchen</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover how we bring the purest mustard oil from Indian farms straight to your plate, maintaining 100% transparency and purity.</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-green-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
            {processSteps.map((step, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                key={step.id} 
                className="flex flex-col items-center text-center group"
              >
                {/* Outer Circle */}
                <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center p-2 bg-white shadow-xl mb-6 relative group-hover:scale-105 transition-transform duration-300 border-4 border-transparent hover:border-green-400`}>
                  {/* Inner Circle */}
                  <div className={`w-full h-full rounded-full flex items-center justify-center ${step.color} shadow-inner`}>
                     {step.icon}
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold text-xl border-4 border-white shadow-sm">
                    {step.id}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed px-2">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

import React from "react";
import AvailableOn from "../Pages/AvailableOn";
import FAQ from "../Pages/FreQuestion";
import AllrefiendProduct from "../Pages/RefiendOil/AllrefiendProduct";

export default function Alsi() {
  return (
    <div className="w-full bg-gray-50">

      {/* 🔶 HERO SECTION */}
      <div className="relative w-full md:h-[420px]">

        <img
          src="/bannerKachi.png"
          alt="banner"
          className="w-full h-full object-cover md:absolute md:inset-0"
        />

        <div className="relative md:absolute md:inset-0 flex items-center">
          <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 items-center w-full">

            {/* ✅ TEXT */}
            <div className="text-center md:text-left px-4">
              <h1 className="text-2xl md:text-4xl font-bold text-green-900 mb-4">
                KisanChoice Alsi Oil (Flaxseed Oil)
              </h1>

              <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
                <span className="font-semibold text-lg">
                  KisanChoice Cold Pressed Alsi Oil
                </span>{" "}
                is a premium flaxseed oil extracted using traditional cold-press
                methods to retain its natural nutrients and purity. Known for its
                rich Omega-3 content, this oil supports heart health and overall
                wellness. Ideal for health-conscious consumers, it can be used in
                salads, smoothies, or as a dietary supplement.
              </p>
            </div>

            {/* ✅ IMAGE */}
            <div className="flex justify-center relative mt-6 md:mt-0">

              {/* Glow Effect */}
              <div className="absolute w-40 h-40 md:w-56 md:h-56 bg-yellow-400 rounded-full blur-3xl opacity-30"></div>

              <img
                src="/9.png"
                alt="Alsi Oil"
                className="relative w-72 md:w-96 object-contain drop-shadow-2xl"
              />
            </div>

          </div>
        </div>
      </div>

      {/* 🔶 DETAILS SECTION */}
      <div className="bg-gray-100 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:grid md:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <div className="flex justify-center order-1 md:order-none">
            <img
              src="/alsioil.png"
              alt="groundnut oil"
              className="w-full max-w-sm object-contai"
            />
          </div>

          {/* TEXT */}
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-3xl font-bold text-green-900 mb-4">
              Pure & Healthy Cooking Oil
            </h2>

            <p className="text-gray-600 mb-6 text-sm md:text-lg">
               KisanChoice Alsi Oil is a natural source of essential fatty acids,
              especially Omega-3, which helps maintain a healthy heart and
              improves metabolism. Its mild nutty flavor makes it perfect for
              modern healthy diets. Carefully processed and quality-tested, this
              oil ensures purity, freshness, and long shelf life.
            </p>

            {/* FEATURES */}
            <div className="flex justify-center md:justify-start gap-6 flex-wrap">

              <div className="flex flex-col items-center text-center w-24">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  🥜
                </div>
                <p className="text-xs mt-2">Pure Peanuts</p>
              </div>

              <div className="flex flex-col items-center text-center w-24">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  ❤️
                </div>
                <p className="text-xs mt-2">Heart Friendly</p>
              </div>

              <div className="flex flex-col items-center text-center w-24">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-400 rounded-full flex items-center justify-center text-white shadow-lg">
                  🔥
                </div>
                <p className="text-xs mt-2">High Smoke Point</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 🔶 EXTRA INFO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-r from-yellow-50 to-white rounded-2xl p-6 shadow">

          <h3 className="text-xl font-semibold text-green-800 mb-3">
            Health Benefits
          </h3>

          <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm md:text-base">
            <li>Supports heart health with Omega-3 fatty acids</li>
            <li>Helps improve digestion and metabolism</li>
            <li>Boosts skin and hair health naturally</li>
            <li>Rich in antioxidants and nutrients</li>
          </ul>

        </div>
      </div>

      {/* 🔽 OTHER SECTIONS */}
      <AllrefiendProduct />
      <AvailableOn />
      <FAQ />

    </div>
  );
}
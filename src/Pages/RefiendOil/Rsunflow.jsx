import React from "react";
import AvailableOn from "../../Pages/AvailableOn";
import FAQ from "../../Pages/FreQuestion";
import AllrefiendProduct from "./AllrefiendProduct";

export default function Sunflower() {
  return (
    <div className="w-full bg-gray-50">

      {/* 🔶 SECTION 1 */}
      <div className="relative w-full md:h-[420px]">

        {/* BACKGROUND */}
        <img
          src="/bannerKachi.png"
          alt="banner"
          className="w-full h-full object-cover md:absolute md:inset-0"
        />

        {/* CONTENT */}
        <div className="relative md:absolute md:inset-0 flex items-center">
          <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 items-center w-full">

            {/* ✅ TEXT */}
            <div className="text-center md:text-left -mt-6 md:mt-0">
              <h1 className="text-xl md:text-3xl font-bold text-green-900 mb-3">
                KisanChoice Refined Sunflower Oil
              </h1>

              <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
                <span className="text-lg font-serif font-semibold">
                  KisanChoice Refined Sunflower Oil
                </span>{" "}
                is a premium light cooking oil made from high-quality sunflower seeds. 
                It is rich in Vitamin E and known for its purity and mild taste, 
                making it perfect for healthy everyday cooking.
              </p>
            </div>

            {/* ✅ IMAGE */}
            <div className="flex justify-center relative mt-4 md:mt-0">

              {/* glow */}
              <div className="absolute w-40 h-40 md:w-56 md:h-56 bg-yellow-400 rounded-full blur-2xl opacity-40"></div>

              <img
                src="/109.png"
                alt="Sunflower Oil"
                className="relative w-72 md:w-96 mt-10 object-contain drop-shadow-2xl"
              />
            </div>

          </div>
        </div>
      </div>

      {/* 🔶 SECTION 2 */}
      <div className="bg-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:grid md:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <div className="flex justify-center order-1 md:order-none">
            <img
              src="/gsunflower.png"
              alt="sunflower oil"
              className="w-full max-w-md object-contain"
            />
          </div>

          {/* TEXT */}
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-3xl font-bold text-green-900 mb-4">
              Light & Heart-Friendly Oil
            </h2>

            <p className="text-gray-600 mb-6 text-sm md:text-lg">
              KisanChoice Refined Sunflower Oil is a light and healthy choice 
              for your kitchen. It helps retain the natural taste of food while 
              being easy to digest. Ideal for frying, sautéing, and daily cooking, 
              it supports a balanced and healthy lifestyle.
            </p>

            {/* FEATURES */}
            <div className="flex justify-center md:justify-start gap-6 flex-wrap">

              <div className="flex flex-col items-center text-center w-24">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-400 rounded-full flex items-center justify-center text-white shadow-lg">
                  🌻
                </div>
                <p className="text-xs mt-2">Sunflower Seeds</p>
              </div>

              <div className="flex flex-col items-center text-center w-24">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-cyan-400 rounded-full flex items-center justify-center text-white shadow-lg">
                  ❤️
                </div>
                <p className="text-xs mt-2">Heart Friendly</p>
              </div>

              <div className="flex flex-col items-center text-center w-24">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  🍳
                </div>
                <p className="text-xs mt-2">Light Cooking Oil</p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 🔽 EXTRA */}
      <AllrefiendProduct />
      <AvailableOn />
      <FAQ />
    </div>
  );
}
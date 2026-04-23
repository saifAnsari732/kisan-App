import React from "react";
import AvailableOn from "../../Pages/AvailableOn";
import FAQ from "../../Pages/FreQuestion";
import AllrefiendProduct from "./AllrefiendProduct";

export default function Soyabean() {
  return (
    <div className="w-full bg-gray-50">

      {/* 🔶 SECTION 1 */}
      <div className="relative w-full md:h-[420px]">

        {/* BACKGROUND IMAGE */}
        <img
          src="/bannerKachi.png"
          alt="banner"
          className="w-full h-full object-cover md:absolute md:inset-0"
        />

        {/* CONTENT */}
        <div className="relative md:absolute md:inset-0 flex items-center">
          <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 items-center w-full">

            {/* ✅ TEXT */}
            <div className="px-3 text-center md:text-left -mt-6 md:mt-0">
              <h1 className="text-xl md:text-3xl font-bold text-green-900 mb-3">
                KisanChoice Refined Soyabean Oil
              </h1>

              <p className="text-gray-700 px-3 text-sm md:text-lg leading-relaxed">
                <span className="text-lg font-serif font-semibold">
                  KisanChoice Refined Soyabean Oil
                </span>{" "}
                is a high-quality cooking oil made from premium soybeans. 
                It is light, healthy, and perfect for everyday cooking. 
                With its mild taste and high nutritional value, it enhances 
                the flavor of your food while supporting a balanced lifestyle.
              </p>
            </div>

            {/* ✅ IMAGE */}
            <div className="flex justify-center relative mt-4 md:mt-0">

              {/* glow */}
              <div className="absolute w-40 h-40 md:w-56 md:h-56 bg-yellow-400 rounded-full blur-2xl opacity-40"></div>

              <img
                src="/114.png"
                alt="Soyabean Oil"
                className="relative w-72 md:w-96 mt-10 object-contain drop-shadow-2xl"
              />
            </div>

          </div>
        </div>
      </div>

      {/* 🔶 SECTION 2 */}
      <div className="bg-gray-100 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:grid md:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <div className="flex justify-center order-1 md:order-none">
            <img
              src="/gsoyabean.png"
              alt="soyabean oil"
              className="w-full max-w-md object-contain"
            />
          </div>

          {/* TEXT */}
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-3xl font-bold text-green-900 mb-4">
              Pure & Healthy Soyabean Oil
            </h2>

            <p className="px-3 text-gray-600 mb-6 text-sm md:text-lg">
              KisanChoice Refined Soyabean Oil is known for its light texture 
              and high nutritional value. It is rich in essential fatty acids 
              and vitamins, making it a healthy choice for daily cooking. 
              Ideal for frying, sautéing, and baking, it keeps your meals 
              tasty and nutritious.
            </p>

            {/* FEATURES */}
            <div className="flex justify-center md:justify-start gap-6 flex-wrap">

              <div className="flex flex-col items-center text-center w-24">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-400 rounded-full flex items-center justify-center text-white shadow-lg">
                  🌱
                </div>
                <p className="text-xs mt-2">Premium Soybeans</p>
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

      {/* 🔽 EXTRA SECTIONS */}
      <AllrefiendProduct />
      <AvailableOn />
      <FAQ />
    </div>
  );
}
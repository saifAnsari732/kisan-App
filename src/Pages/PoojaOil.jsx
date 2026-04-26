import React from "react";
import AvailableOn from "../Pages/AvailableOn";
import FAQ from "../Pages/FreQuestion";
import AllrefiendProduct from "../Pages/RefiendOil/AllrefiendProduct";

export default function Pooja() {
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
                KisanChoice Pooja Oil
              </h1>

              <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
                <span className="font-semibold text-lg">
                  KisanChoice Pooja Oil
                </span>{" "}
                is specially crafted for religious rituals, diya lighting, and
                spiritual ceremonies. Made from high-quality refined oil, it
                ensures a clean, long-lasting flame that enhances purity and
                positivity during prayers.
              </p>
            </div>

            {/* ✅ IMAGE */}
            <div className="flex justify-center relative mt-6 md:mt-0">

              {/* Glow */}
              <div className="absolute w-40 h-40 md:w-56 md:h-56 bg-yellow-400 rounded-full blur-3xl opacity-30"></div>

              <img
                src="/10.png"
                alt="Pooja Oil"
                className="relative w-72 md:w-96 object-contain drop-shadow-2xl"
              />
            </div>

          </div>
        </div>
      </div>

      {/* 🔶 DETAILS SECTION */}
      <div className="bg-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:grid md:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <div className="flex justify-center order-1 md:order-none">
            <img
              src="/poojaoii.png"
              alt="pooja oil"
              className="w-full sm:h-[350px] h-[400px] max-w-m object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-4">
              Perfect for Daily Pooja & Rituals
            </h2>

            <p className="text-gray-600 mb-6 text-sm md:text-lg leading-relaxed">
              Designed for spiritual use, KisanChoice Pooja Oil provides a
              steady, smokeless flame ideal for diyas and lamps. Its purity
              ensures a divine atmosphere in temples and homes, making it a
              reliable choice for everyday pooja, festivals, and special rituals.
            </p>

            {/* FEATURES */}
            <div className="flex justify-center md:justify-start gap-6 flex-wrap">

              <div className="flex flex-col items-center w-24 text-center">
                <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-white shadow-lg">
                  🪔
                </div>
                <p className="text-xs mt-2">Bright Flame</p>
              </div>

              <div className="flex flex-col items-center w-24 text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  ✨
                </div>
                <p className="text-xs mt-2">Pure & Clean</p>
              </div>

              <div className="flex flex-col items-center w-24 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  🕉️
                </div>
                <p className="text-xs mt-2">For Rituals</p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 🔶 EXTRA INFO */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-r from-yellow-50 to-white rounded-2xl p-6 shadow">

          <h3 className="text-xl font-semibold text-green-800 mb-3">
            Why Choose Pooja Oil?
          </h3>

          <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm md:text-base">
            <li>Provides long-lasting diya lighting</li>
            <li>Low smoke for clean environment</li>
            <li>Maintains purity during rituals</li>
            <li>Ideal for temples, homes & festivals</li>
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
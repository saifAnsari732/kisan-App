import React from "react";
import AvailableOn from "../Pages/AvailableOn";
import FAQ from "../Pages/FreQuestion";
import AllrefiendProduct from "../Pages/RefiendOil/AllrefiendProduct";

export default function Ground() {
  return (
    <div className="w-full bg-gray-50">

      {/* 🔶 SECTION 1 (HERO) */}
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

            {/* TEXT */}
            <div className="text-center md:text-left -mt-6 md:mt-0 px-4">
              <h1 className="text-xl md:text-3xl font-bold text-green-900 mb-3">
                Kisan Choice Groundnut Oil
              </h1>

              <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
                <span className="text-lg font-semibold">
                  Kisan Choice Pure Groundnut Oil
                </span>{" "}
                is made from carefully selected high-quality peanuts, delivering
                a rich aroma and natural taste. With its high smoke point, it is
                perfect for deep frying, sautéing, and everyday cooking while
                maintaining nutritional value and purity.
              </p>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center relative mt-4 md:mt-20">

              {/* glow */}
              <div className="absolute w-40 h-40 md:w-56 md:h-56 bg-yellow-400 
              rounded-full blur-2xl opacity-40"></div>

              <img
                src="/11.png" // 👈 groundnut oil image
                alt="Groundnut Oil"
                className="rounded-3xl relative w-80 md:w-96 mt-10 object-contain drop-shadow-2xl"
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
              src="/gsoyabean.png"
              alt="groundnut oil"
              className="w-full max-w-md object-contain"
            />
          </div>

          {/* TEXT */}
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-3xl font-bold text-green-900 mb-4">
              Pure & Healthy Cooking Oil
            </h2>

            <p className="text-gray-600 mb-6 text-sm md:text-lg">
              Just a hint of Kisan Choice Groundnut Oil brings a rich nutty aroma
              to your kitchen. Its light texture and natural flavor enhance the
              taste of your dishes, making it ideal for frying, roasting, and
              traditional Indian recipes. Carefully processed for purity, it
              ensures freshness, quality, and consistent performance every time.
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
 <h1>jfks</h1>
        </div>
      </div>

      {/* 🔶 EXTRA SECTION (NEW ADD 🔥) */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-br from-yellow-100 to-white rounded-3xl p-6 shadow-lg">

          <h3 className="text-2xl font-semibold text-green-800 mb-4 text-center">
            Why Choose Groundnut Oil?
          </h3>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
            <li>✔ Rich in healthy fats</li>
            <li>✔ Ideal for deep frying</li>
            <li>✔ Enhances food taste naturally</li>
            <li>✔ Supports heart health</li>
            <li>✔ Free from harmful chemicals</li>
            <li>✔ Trusted quality by Kisan Choice</li>
          </ul>

        </div>
      </div>

      {/* 🔽 OTHER COMPONENTS */}
      <AllrefiendProduct />
      <AvailableOn />
      <FAQ />

    </div>
  );
}
import React from "react";
import AvailableOn from "../../Pages/AvailableOn";
import FAQ from "../../Pages/FreQuestion";
import AllrefiendProduct from "./AllrefiendProduct";

export default function Palmolein() {
    return (
        <div className="w-full bg-gray-50">

            {/* 🔶 SECTION 1 */}
            <div className="relative w-full md:h-[420px]">

                {/* BACKGROUND IMAGE */}
                <img
                    src="/bannerKachi.webp"
                    alt="banner"
                    className="w-full h-full object-cover md:absolute md:inset-0"
                />

                {/* CONTENT */}
                <div className="relative md:absolute md:inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 items-center w-full">

                        {/* ✅ TEXT */}
                        <div className=" px-3 text-center md:text-left -mt-6 md:mt-0">
                            <h1 className="text-xl md:text-3xl font-bold text-green-900 mb-3">
                                KisanChoice Refined Palmolein Oil
                            </h1>

                            <p className="text-gray-700 text-sm md:text-lg leading-relaxed px-3">
                                <span className="text-lg font-serif font-semibold">
                                    Kisan Choice Refined Palmolein Oil
                                </span>{" "}
                                is a high-quality refined cooking oil made from palm fruit. 
                                It is light, versatile, and ideal for deep frying and everyday cooking. 
                                Known for its long shelf life and stable performance at high temperatures.
                            </p>
                        </div>

                        {/* ✅ IMAGE */}
                        <div className="flex justify-center relative mt-4 md:mt-0">

                            {/* glow */}
                            <div className="absolute w-40 h-40 md:w-56 md:h-56 bg-yellow-400 
                              rounded-full blur-2xl opacity-40"></div>

                            <img
                                src="/110.webp"
                                alt="Palmolein Oil"
                                className="relative w-80 md:w-96 mt-10 object-contain drop-shadow-2xl"
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* 🔶 SECTION 2 */}
            <div className="bg-gray-50 py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:grid md:grid-cols-2 gap-10 items-center">

                    {/* IMAGE */}
                    <div className="flex justify-center order-1 md:order-none">
                        <img
                            src="/gpalmolein.webp"
                            alt="Palmolein Oil"
                            className="w-ful object-contain"
                        />
                    </div>

                    {/* TEXT */}
                    <div className="text-center md:text-left">
                        <h2 className="text-xl md:text-3xl font-bold text-green-900 mb-4">
                            Perfect for Everyday Cooking
                        </h2>

                        <p className="text-gray-600 mb-6 px-4 text-sm md:text-lg">
                            KisanChoice Palmolein Oil is widely used for frying and cooking due to its 
                            neutral taste and high stability. It ensures crispy texture, consistent taste, 
                            and longer usability without compromising quality.
                        </p>

                        {/* FEATURES */}
                        <div className="flex justify-center md:justify-start gap-6 flex-wrap">

                            <div className="flex flex-col items-center text-center w-24">
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-400 rounded-full flex items-center justify-center text-white shadow-lg">
                                    🍳
                                </div>
                                <p className="text-xs mt-2">Ideal Frying</p>
                            </div>

                            <div className="flex flex-col items-center text-center w-24">
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-cyan-400 rounded-full flex items-center justify-center text-white shadow-lg">
                                    ⚖️
                                </div>
                                <p className="text-xs mt-2">Light & Neutral</p>
                            </div>

                            <div className="flex flex-col items-center text-center w-24">
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                    ⏱️
                                </div>
                                <p className="text-xs mt-2">Long Shelf Life</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <AllrefiendProduct />
            <AvailableOn />
            <FAQ />
        </div>
    );
}
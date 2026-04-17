import React from "react";
import FetureProduct from "./FetureProduct";
import AvailableOn from "./AvailableOn";
import FAQ from "./FreQuestion";

export default function Kachighani() {
    return (
        <div className="w-full bg-gray-50">

            {/* 🔶 SECTION 1 */}
            <div className="relative w-full md:h-[420px]">

                {/* BACKGROUND IMAGE */}
                <img
                    src="/bannerKachi.png"
                    alt="banner"
                    className="w-full h-full object-cover  md:absolute md:inset-0"
                />

                {/* CONTENT */}
                <div className="relative md:absolute md:inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto  md:py-0 
                          flex flex-col md:grid md:grid-cols-2  items-center w-full">

                        {/* ✅ TEXT */}
                        <div className="text-center md:text-left -mt-6 md:mt-0">
                            <h1 className="text-xl md:text-3xl font-bold text-green-900 mb-3">
                                KisanChoice Kachi Ghani Mustard Oil
                            </h1>

                            <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
                           
                           <span className="text-lg font-serif font-semibold">Kisan Choice Kachi Ghani Wooden & Cold Pressed Mustard Oil</span>Premium is a premium cold-pressed mustard oil extracted traditionally (often using wood or wooden presses), preserving the natural aroma, pungency and flavour of mustard seeds. It’s typically marketed for cooking purposes and as a natural choice compared to highly refined oils.
                            </p>
                        </div>

                        {/* ✅ IMAGE */}
                        <div className="flex justify-center relative mt-4 md:mt-0">

                            {/* glow */}
                            <div className="absolute w-40 h-40 md:w-56 md:h-56 bg-yellow-400 
                              rounded-full blur-2xl opacity-40"></div>

                            <img
                                src="/kachighani.png"
                                alt="product"
                                className="relative w-80 md:w-96 mt-10 object-contain drop-shadow-2xl"
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* 🔶 SECTION 2 */}
            <div className="bg-white py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 
                        flex flex-col md:grid md:grid-cols-2 gap-10 items-center">

                    {/* IMAGE */}
                    <div className="flex justify-center order-1 md:order-none">
                        <img
                            src="/kachicatlok.png"
                            alt="kisan oil"
                            className="w-full max-w-m object-contain"
                        />
                    </div>

                    {/* TEXT */}
                    <div className="text-center md:text-left">
                        <h2 className="text-xl md:text-3xl font-bold text-green-900 mb-4">
                           KisanChoice Kachi Ghani Mustard Oil
                        </h2>

                        <p className="text-gray-600 mb-6 text-sm md:text-lg">
                            Just a hint of KisanChoice Kachi Ghani Mustard Oil fills the kitchen with the bold aroma of real mustard. Its authentic flavour adds depth to your achaars and everyday curries. Made with care and checked for quality, this pure mustard oil stays fresh for longer and delivers taste you can rely on every time.
                        </p>

                        {/* FEATURES */}
                        <div className="flex justify-center md:justify-start gap-6 flex-wrap">

                            <div className="flex flex-col items-center text-center w-24">
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-400 rounded-full flex items-center justify-center text-white shadow-lg">
                                    🌱
                                </div>
                                <p className="text-xs mt-2">Pure Seeds</p>
                            </div>

                            <div className="flex flex-col items-center text-center w-24">
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-cyan-400 rounded-full flex items-center justify-center text-white shadow-lg">
                                    ❤️
                                </div>
                                <p className="text-xs mt-2">Healthy Oil</p>
                            </div>

                            <div className="flex flex-col items-center text-center w-24">
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                    ⏱️
                                </div>
                                <p className="text-xs mt-2">Fresh Longer</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
               <FetureProduct/>
               <AvailableOn/>
               <FAQ/>
        </div>
    );
}
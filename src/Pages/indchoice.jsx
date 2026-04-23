import React, { useState } from "react";
import FetureProduct from "./FetureProduct";
import AvailableOn from "./AvailableOn";
import FAQ from "./FreQuestion";

export default function IndianChoice() {
     const [selected, setSelected] = useState("All");
    return (
        <div className="w-full bg-gray-50">

            {/* 🔶 SECTION 1 */}
            <div className="relative w-full md:h-[420px]">

                {/* BACKGROUND IMAGE */}
                <img
                    src="/web banner bk.png"
                    alt="banner"
                    className="w-full h-full object-cover  md:absolute md:inset-0"
                />

                {/* CONTENT */}
                <div className="relative md:absolute md:inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto  md:py-0 
                          flex flex-col md:grid md:grid-cols-2  items-center justify-center w-full">

                        {/* ✅ TEXT */}
                        <div className="text-center md:text-left -mt-6 justify-center md:mt-0">
                            <h1 className="text-xl md:text-3xl font-bold text-green-900 px-6 mb-3">
                                Indian Choice Kachi Ghani Mustard Oil
                            </h1>

                            <p className="text-gray-700 text-sm md:text-lg leading-relaxed text-center px-6">
                                India Cnhoice Kachi Ghani Mustard Oil is a cold-pressed mustard oil
                                made traditionally by pressing seeds at low temperatures. This method
                                helps retain the{" "}
                                <span className="font-semibold">
                                    natural aroma, pungency and nutrients
                                </span>{" "}
                                for better taste and health.
                            </p>
                        </div>

                        {/* ✅ IMAGE */}
                        <div className="flex justify-center relative mt-4 md:mt-0">

                            {/* glow */}
                            <div className="absolute w-40 h-40 md:w-56 md:h-56 bg-yellow-400 
                              rounded-full blur-2xl opacity-40"></div>

                            <img
                                src="/indchoice.png"
                                alt="product"
                                className="relative w-80 md:w-96 mt-10 object-contain drop-shadow-2xl"
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* 🔶 SECTION 2 */}
            <div className="bg-gray-100 py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 
                        flex flex-col md:grid md:grid-cols-2 gap-10 items-center">

                    {/* IMAGE */}
                    <div className="flex justify-center order-1 md:order-none">
                        <img
                            src="/web1.png"
                            alt="kisan oil"
                            className="w-full max-w-m object-contain"
                        />
                    </div>

                    {/* TEXT */}
                    <div className="text-center md:text-left">
                        <h2 className="text-xl md:text-3xl font-bold text-green-900 mb-4">
                            Bring a rich aromatic sizzle to your dishes
                        </h2>

                        <p className="text-gray-600 mb-6 text-sm md:text-lg px-2">
                            Just a hint of Kachi Ghani Mustard Oil fills your kitchen with
                            authentic aroma and taste. Perfect for cooking and pickles.
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
               <FetureProduct selectedCategory={selected}/>
               <AvailableOn/>
               <FAQ/>
        </div>
    );
}
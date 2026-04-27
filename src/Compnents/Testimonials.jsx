import React from "react";
import { Helmet } from "react-helmet-async";

const videos = [
  "ThTKnrGodBU",
  "rL_B8-WFaMo",
  "gqzWQcwNDMQ",
  "K4VnPcIcn4k",
  "QBNnM2W9vpk",
  "-w00Kef-IMg",
];

export default function Testimonials() {
  return (
    <section className="bg-gray-100 py-10 px-4">

      {/* ✅ SEO */}
      <Helmet>
        <title>KisanChoice Videos & Testimonials</title>
        <meta
          name="description"
          content="Watch KisanChoice product videos, testimonials and brand journey. Discover our premium edible oils."
        />
      </Helmet>

      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">
        Step into the world of{" "}
        <span className="text-green-600">KisanChoice</span>
      </h2>

      {/* ✅ MANUAL SCROLL SLIDER */}
      <div className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-4">

        {videos.map((id, index) => (
          <div
            key={index}
            className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0"
          >
            {/* ✅ Optimized iframe */}
            <iframe
              width="100%"
              height="200"
              loading="lazy"
              src={`https://www.youtube.com/embed/${id}`}
              title={`KisanChoice video ${index}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-t-xl"
            />
          </div>
        ))}

      </div>
    </section>
  );
}
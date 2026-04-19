import React from "react";

// ✅ Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const videos = [
  "https://www.youtube.com/embed/ThTKnrGodBU",
  "https://www.youtube.com/embed/rL_B8-WFaMo",
  "https://www.youtube.com/embed/gqzWQcwNDMQ",
  "https://www.youtube.com/embed/K4VnPcIcn4k",
  "https://www.youtube.com/embed/QBNnM2W9vpk",
  "https://www.youtube.com/embed/-w00Kef-IMg",
  
];

export default function Testimonials() {
  return (
    <div className="bg-gray-100 py-10 px-4">

      <h2 className="text-center text-2xl font-bold mb-8">
        Step into the world of{" "}
        <span className="text-blue-600">KisanChoice</span>
      </h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        autoplay={{ delay: 2500 }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-3 shadow rounded ">

              <iframe
                width="100%"
                height="250"
                src={video}
                title={`video-${index}`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}
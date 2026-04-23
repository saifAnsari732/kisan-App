import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

const reviews = [
  {
    text: "Kisan Choice's mustard oil feels truly authentic. Every meal tastes better. Great quality too.",
    name: "Ram Shakal Singh",
    location: "UP",
  },
  {
    text: "This oil smells and tastes amazing. Even the packaging is good. Everyone loves it.",
    name: "Prabhash Yadav",
    location: "Bihar",
  },
  {
    text: "I’m a distributor and happy with their services. Supplies always come on time.",
    name: "Surendra Yadav",
    location: "Jharkhand",
  },
  {
    text: "Very pure oil. My family switched completely to this brand.",
    name: "Amit Verma",
    location: "Delhi",
  },
  {
    text: "Packaging is excellent and delivery is always on time.",
    name: "Rakesh Kumar",
    location: "Punjab",
  },
  {
    text: "Affordable and high quality. Highly recommended.",
    name: "Sanjay Mishra",
    location: "MP",
  },
  {
    text: "Taste reminds me of traditional homemade oil.",
    name: "Deepak Yadav",
    location: "UP",
  },
  {
    text: "Business support is very good. Team is responsive.",
    name: "Vikash Singh",
    location: "Bihar",
  },
];
export default function Reviews() {
  return (
    <div className="bg-gray-100 py-12 px-4">

      {/* Heading */}
      <h2 className="text-center text-4xl font-bold text-green-700 mb-10">
        Happy Clients
      </h2>

      {/* Slider */}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        autoplay={{ delay: 3000 }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >



 {reviews.map((review, index) => (
  <SwiperSlide key={index}>
    <div className="bg-white text-black p-6 rounded-xl shadow-lg text-center h-full flex flex-col justify-between">

      {/* Quote */}
      <div className="text-5xl mb-3">❝</div>

      {/* Text */}
      <p className="text-sm leading-relaxed mb-4">
        {review.text}
      </p>

      {/* ⭐ Stars (FIXED CENTER) */}
      <div className="text-yellow-400 text-lg mb-4 flex justify-center items-center gap-1">
        <FaStar size={20}/>
        <FaStar size={20}/>
        <FaStar size={20}/>
        <FaStar size={20}/>
        <FaStar size={20}/>
      </div>

      {/* Name */}
      <div className="mt-auto">
        <h4 className="font-semibold">
          {review.name}
        </h4>
        <p className="text-sm text-gray-500">
          {review.location}
        </p>
      </div>

    </div>
  </SwiperSlide>
))}
      </Swiper>

    </div>
  );
}
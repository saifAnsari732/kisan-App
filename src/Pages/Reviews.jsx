import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Helmet } from "react-helmet-async";
import { FaStar } from "react-icons/fa";

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
    <section className="bg-gray-100 py-12 px-4">

      {/* ✅ SEO */}
      <Helmet>
        <title>Customer Reviews | KisanChoice</title>
        <meta
          name="description"
          content="Read real customer reviews of KisanChoice edible oils. Trusted by families and distributors across India."
        />
      </Helmet>

      {/* Heading */}
      <h2 className="text-center text-3xl md:text-4xl font-bold text-green-700 mb-10">
        Happy Clients
      </h2>

      {/* ✅ MANUAL SCROLL */}
      <div className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-4">
        <div className="relative w-full">
          
                    {/* ⬅ LEFT */}
                    <button
                      onClick={() => scroll("left")}
                      className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full"
                    >
                      <ChevronLeft size={20} />
                    </button>
        
                    {/* ➡ RIGHT */}
                    <button
                      onClick={() => scroll("right")}
                      className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full"
                    >
                      <ChevronRight size={20} />
                    </button>
        </div>
        {reviews.map((review, index) => (
          <div
            key={index}
            className="min-w-[280px] md:min-w-[320px] 
            bg-white rounded-xl shadow-md p-6 flex-shrink-0 
            flex flex-col flex-3 h-[280px] justify-between hover:shadow-xl transition"
          >
            {/* Quote */}
            <div className="text-4xl mb-1 text-yellow-400">❝</div>

            {/* Text */}
            <p className="text-sm text-center text-gray-700 leading-relaxed mb-4">
              {review.text}
            </p>

            {/* Stars */}
            <div className="text-yellow-400 flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={18} />
              ))}
            </div>

            {/* Name */}
            <div className="mt-auto text-center">
              <h4 className="font-semibold">{review.name}</h4>
              <p className="text-sm text-gray-500">{review.location}</p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
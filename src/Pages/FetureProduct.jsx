import React from "react";
import CallButton from "../Compnents/Callbtn";
import WhatsAppButton from "../Compnents/Whatsappbtn";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Autoplay } from "swiper/modules";

const FetureProduct = ({ selectedCategory, viewAll }) => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, title:  "IMDIAN CHOICE OILS", img: "/34.png", category: "Mustard Oil" },
    { id: 2, title: "KISAN CHOICE REFINED ", img: "/36.png", category: "Refined Oil" },
    { id: 3, title: "KISAN CHOICE MUSTARD", img: "/35.png", category: "Vegetable Oil" },
    { id: 4, title: "KISAN CHOICE REFINED", img: "/37.png", category: "Cold Pressed" },
    { id: 4, title: "SOYABEAN OILS", img: "/1.png", category: "Vegetable Oil" },
    { id: 3, title: "KACHIGHANI OILS", img: "/2.png", category: "Mustard Oil" },
    { id: 1, title: "INDIAN CHOICE KACHIGHANI MUSTARD", img: "/3.png", category: "Mustard Oil" },
    { id: 8, title: "KISAN KACHIGHANI", img: "/4.png", category: "Mustard Oil" },
    { id: 9, title: "CUSTOMER CHOICE OIL", img: "/5.png", category: "Refined Oil" },
    { id: 10, title: "SUNFLOWER OIL", img: "/6.png", category: "Refined Oil" },
    { id: 11, title: "ALSI OIL", img: "/9.png", category: "Cold Pressed" },
    { id: 12, title: "POOJA OIL", img: "/10.png", category: "Special Oil" },
    { id: 13, title: "GROUNDNUT OIL", img: "/11.png", category: "Vegetable Oil" },
    { id: 14, title: "COCONUT OIL", img: "/coconut.png", category: "Vegetable Oil" }
  ];

  const filteredData =
    selectedCategory === "All"
      ? categories
      : categories.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-10 bg-gray-100" id="products">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Our Products
      </h2>

      <div className="max-w-7xl mx-auto px-4">

        {/* ✅ GRID VIEW */}
        {viewAll ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-yellow-100 via-yellow-50 to-white 
                hover:shadow-xl hover:-translate-y-1 transition rounded-2xl shadow-lg p-4 text-center"
              >

                {/* ✅ CLICKABLE AREA ONLY IMAGE + TITLE */}
                <div
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="cursor-pointer"
                >
                  <div className="h-48 flex items-center justify-center">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-55 object-contain drop-shadow-lg"
                    />
                  </div>

                  <h3 className="mt-3 font-semibold">{item.title}</h3>
                </div>

                {/* ✅ BUTTONS (NO NAVIGATION) */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4 w-full max-w-xs mx-auto cursor-pointer"
                >
                  <CallButton />
                  <WhatsAppButton />
                </div>

              </div>
            ))}
          </div>
        ) : (

          /* ✅ SLIDER VIEW */
          <Swiper
            key={selectedCategory}
            modules={[Autoplay]}
            spaceBetween={12}
            slidesPerView={1}
            autoplay={{ delay: 2000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {filteredData.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  className="bg-gradient-to-br from-yellow-100 via-yellow-50 to-white 
                  hover:shadow-xl hover:-translate-y-1 transition 
                  rounded-2xl shadow-lg overflow-hidden"
                >

                  {/* ✅ CLICKABLE AREA */}
                  <div
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="cursor-pointer"
                  >
                    <div className="h-48 flex items-center justify-center">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-55 object-contain drop-shadow-lg"
                      />
                    </div>

                    <div className="p-4 text-center">
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                  </div>

                  {/* ✅ BUTTONS FIX */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex justify-center gap-3 pb-4"
                  >
                    <CallButton />
                    <WhatsAppButton />
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default FetureProduct;
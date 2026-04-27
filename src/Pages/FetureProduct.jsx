import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";
import CallButton from "../Compnents/Callbtn";
import WhatsAppButton from "../Compnents/Whatsappbtn";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FetureProduct = ({ selectedCategory, viewAll }) => {
  const navigate = useNavigate();
  const scrollRef = useRef();

  // 🔥 SCROLL FUNCTION
  const scroll = (dir) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -width : width,
        behavior: "smooth",
      });
    }
  };

  // ✅ DATA
  const categories = [
    { id: 1, title: "INDIAN CHOICE OILS", img: "/34.webp", category: "Mustard Oil" },
    { id: 2, title: "KISAN CHOICE REFINED", img: "/36.webp", category: "Refined Oil" },
    { id: 3, title: "KISAN CHOICE MUSTARD", img: "/35.webp", category: "Vegetable Oil" },
    { id: 4, title: "KISAN CHOICE REFINED", img: "/37.webp", category: "Cold Pressed" },
    { id: 5, title: "SOYABEAN OILS", img: "/1.webp", category: "Vegetable Oil" },
    { id: 6, title: "KACHIGHANI MUSTARD OILS", img: "/2.webp", category: "Mustard Oil" },
    { id: 7, title: "INDIAN CHOICE KACHIGHANI", img: "/3.webp", category: "Mustard Oil" },
    { id: 8, title: "KISAN CHOICE KACHIGHANI", img: "/4.webp", category: "Mustard Oil" },
    { id: 9, title: "CUSTOMER CHOICE OIL", img: "/5.webp", category: "Refined Oil" },
    { id: 10, title: "SUNFLOWER OIL", img: "/6.webp", category: "Refined Oil" },
    { id: 11, title: "ALSI OIL", img: "/9.webp", category: "Cold Pressed" },
    { id: 12, title: "POOJA OIL", img: "/10.webp", category: "Special Oil" },
    { id: 13, title: "GROUNDNUT OIL", img: "/11.webp", category: "Vegetable Oil" },
    { id: 14, title: "COCONUT OIL", img: "/coconut.webp", category: "Vegetable Oil" },
  ];

  const filteredData =
    selectedCategory === "All"
      ? categories
      : categories.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-10 bg-gray-100" id="products">

      {/* ✅ SEO */}
      <Helmet>
        <title>Our Products | Kisan Choice</title>
        <meta
          name="description"
          content="Explore Kisan Choice edible oils including mustard oil, refined oil, sunflower oil and more. Premium quality products."
        />
      </Helmet>

      {/* HEADING */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Our Products
      </h2>

      <div className="max-w-7xl mx-auto px-4">

        {/* ✅ GRID VIEW */}
        {viewAll ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-200 
                hover:shadow-xl hover:-translate-y-1 transition rounded-2xl shadow-lg p-4 text-center"
              >
                <div
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="cursor-pointer"
                >
                  <div className="h-48 flex items-center justify-center">
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      className="h-44 object-contain"
                    />
                  </div>

                  <h3 className="mt-3 font-semibold text-sm">
                    {item.title}
                  </h3>
                </div>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4"
                >
                  <CallButton />
                  <WhatsAppButton />
                </div>
              </div>
            ))}
          </div>
        ) : (

          /* ✅ MANUAL SLIDER */
          <div className="relative">

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

            {/* SCROLL */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-4 no-scrollbar px-6"
            >
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="min-w-[250px] 
                  bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-200 
                  rounded-2xl shadow-lg p-4 flex-shrink-0"
                >
                  <div
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="cursor-pointer"
                  >
                    <div className="h-44 flex items-center justify-center">
                      <img
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        className="h-44 object-contain"
                      />
                    </div>

                    <h3 className="text-center font-semibold mt-2 text-sm">
                      {item.title}
                    </h3>
                  </div>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex justify-center gap-3 mt-3"
                  >
                    <CallButton />
                    <WhatsAppButton />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FetureProduct;
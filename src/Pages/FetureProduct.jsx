import React from "react";
import CallButton from "../Compnents/Callbtn";
import WhatsAppButton from "../Compnents/Whatsappbtn";

const FetureProduct = () => {
  const categories = [
    { title: "MUSTARD OILS", img: "/34.png" },
    { title: "REFINED OILS", img: "/36.png" },
    { title: "VEGETABLE OILS", img: "/35.png" },
    { title: "COLD PRESSED", img: "/37.png" },
  ];

  return (
    <section className="py-5 pt-8 bg-gray-100" id="products">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Our Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  px-4 max-w-7xl ">
         
        {categories.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition pt-2"
          >
            {/* Image */}
            <div className="h-48 flex items-center justify-center bg-gray-50">
              <img
                src={item.img}
                alt={item.title}
                className="h-60  object-contain transition duration-300 hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-4 text-center">
              <h3 className="font-semibold text-lg">{item.title}</h3>

              <div className="flex justify-center gap-3 mt-4">
                <CallButton />
                <WhatsAppButton />
              </div>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default FetureProduct;
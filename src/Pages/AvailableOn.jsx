import React from "react";

export default function AvailableOn() {
  const platforms = [
    { name: "Trade India", img: "/TradeIndia.png" },
    { name: "Amazon", img: "/amazon.png" },
    { name: "IndiaMart", img: "/indiamrt.png" },
  ];

  return (
    <div className="w-full bg-gray-100 py-10 md:py-16">
      
      {/* Heading */}
      <h2 className="text-center text-lg md:text-3xl font-bold text-black mb-10">
        We are Also Available On
      </h2>

      {/* Logos */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">

        {platforms.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-center w-full md:w-1/3 
                       transition duration-300"
          >
            <img
              src={item.img}
              alt={item.name}
              className="h-22 md:h-30 object-contain  hover:grayscale-0 transition"
            />
          </div>
        ))}

      </div>
    </div>
  );
}
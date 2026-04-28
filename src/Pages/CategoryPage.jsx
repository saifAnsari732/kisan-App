import { useParams, Link } from "react-router-dom";
import categories from "../data/categories";
import { FaLeaf, FaHeart, FaCheckCircle } from "react-icons/fa";
import { FaBottleWater } from "react-icons/fa6";
export default function Categorypage() {
  const { id } = useParams();
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return (
      <h1 className="text-center mt-20 text-xl font-semibold">
        Category Not Found
      </h1>
    );
  }

  return (
    <div className="bg-[#f4f6f8] min-h-screen">

      {/* 🔥 HERO SECTION */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white py-12 px-4 text-center rounded-b-3xl shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
          {category.title}
        </h2>

        <p className="mt-3 max-w-xl mx-auto text-sm opacity-90">
          Pure, healthy and high-quality {category.title.toLowerCase()} 
          crafted for your everyday cooking needs.
        </p>
      </div>

      {/* 🔥 FEATURE ICON ROW */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 mb-10">
        <div className="bg-white rounded-2xl shadow-md p-4 flex justify-around text-center">

          <div>
            <FaLeaf className="mx-auto text-green-600 text-xl" />
            <p className="text-xs mt-1 text-gray-600">100% Pure</p>
          </div>

          <div>
            <FaHeart className="mx-auto text-red-500 text-xl" />
            <p className="text-xs mt-1 text-gray-600">Healthy Choice</p>
          </div>

          <div>
            <FaCheckCircle className="mx-auto text-blue-500 text-xl" />
            <p className="text-xs mt-1 text-gray-600">Quality Assured</p>
          </div>

        </div>
      </div>

      {/* 🔥 PRODUCT GRID */}
   {/* 🔥 PRODUCT GRID */}
<div className="max-w-7xl mx-auto px-4 pb-16">
  <div
    className={`
      grid gap-6
      grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4
      ${category.products.length === 1 ? "place-items-center" : ""}
      ${category.products.length === 2 ? "justify-center" : ""}
    `}
  >

    {category.products.map((item, i) => (
      <Link to={item.path} key={i}>

        <div
          className={`
            bg-white rounded-2xl shadow-md overflow-hidden w-full
            ${category.products.length === 1 ? "max-w-sm" : ""}
          `}
        >

          {/* IMAGE AREA */}
          <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 h-44 flex items-center justify-center">
            <img
              src={item.img}
              alt={item.name}
              loading="lazy"
              className="h-40 object-contain"
            />
          </div>

          {/* CONTENT */}
          <div className="p-4 text-center">

            <h3 className="font-semibold text-gray-800 text-sm">
              {item.name}
            </h3>

            {/* 🔥 CATEGORY TEXT WITH ICON */}
            <div className="flex items-center justify-center gap-1 mt-2 text-xs text-gray-500">
              <FaBottleWater />
              <span>
                Premium {category.title.toLowerCase()} for daily cooking
              </span>
            </div>

            {/* CTA */}
            <div className="mt-3">
              <span className="text-xs bg-green-600 text-white px-3 py-2 rounded-full">
                View Product
              </span>
            </div>

          </div>

        </div>

      </Link>
    ))}

  </div>
</div> 

    </div>
  );
}
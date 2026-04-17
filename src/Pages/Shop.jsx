import FetureProduct from "./FetureProduct";

export default function Shop() {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-14 text-center">
        <h1 className="text-4xl font-bold mb-2">Our Products</h1>
        <p className="text-sm text-gray-200">
          Pure • Healthy • Trusted Oils for Every Home
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-4 justify-between items-center">

        <h2 className="text-xl font-semibold text-green-700">
          Explore Categories
        </h2>

        <div className="flex gap-3 flex-wrap">
          {["All", "Mustard Oil", "Refined Oil", "Vegetable Oil", "Cold Pressed"].map((item, i) => (
            <button
              key={i}
              className="px-4 py-2 bg-white rounded-full shadow text-sm hover:bg-green-600 hover:text-white transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT SECTION */}
      <div className="max-w-8xl mx-auto px-4 pb-12">

        <div className="bg-white rounded-3xl shadow-xl p-4 md:p-6">

          {/* Section Title */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              Featured Products
            </h3>

            <span className="text-sm text-gray-500 cursor-pointer hover:text-green-600">
              View All →
            </span>
          </div>

          {/* Products */}
          <FetureProduct />

        </div>
      </div>

    </div>
  );
}
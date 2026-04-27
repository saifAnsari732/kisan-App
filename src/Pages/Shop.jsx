import { useState ,useEffect} from "react";
import FetureProduct from "./FetureProduct";

export default function Shop() {
  const [selected, setSelected] = useState("All");
  const [viewAll, setViewAll] = useState(false);

  const filters = ["All", "Mustard Oil", "Refined Oil", "Vegetable Oil", "Cold Pressed"];
  useEffect(() => {
    document.title = "Products | KisanChoice";
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO */}
      <div className="bg-linear-to-r from-green-700 to-green-900 text-white py-5 text-center">
        <h1 className="text-4xl font-bold mb-2">Our Products</h1>
        <p className="text-sm text-gray-200">
          Pure • Healthy • Trusted Oils for Every Home
        </p>
      </div>

      {/* FILTER */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-4 justify-between items-center">

        <h2 className="text-xl font-semibold text-green-700">
          Explore Categories
        </h2>

        <div className="flex gap-3 flex-wrap">
          {filters.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(item)}
              className={`px-4 py-2 rounded-full shadow text-sm transition
                ${selected === item 
                  ? "bg-green-600 text-white" 
                  : "bg-white hover:bg-green-600 hover:text-white"}
              `}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-3xl shadow-xl p-4 md:p-6">

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              Featured Products
            </h3>

            {/* ✅ VIEW ALL BUTTON */}
            <button
              onClick={() => setViewAll(!viewAll)}
              className="text-lg border rounded-lg py-2 px-4 text-green-600 hover:underline"
            >
              {viewAll ? "Show Slider" : "View All"}
            </button>
          </div>

          <FetureProduct 
            selectedCategory={selected} 
            viewAll={viewAll}
          />

        </div>
      </div>

    </div>
  );
}
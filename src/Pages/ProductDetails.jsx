import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useState, useEffect } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === Number(id));
  if (!product) return <div className="p-10">Product not found</div>;

  // ✅ FIXED (GLOBAL FOR ALL PRODUCTS)
  const PACKS = "200 ml, 500 ml, 1 Ltr, 2 Ltr, 5 Ltr, 15 Ltr (kg)";
  const BULK = "208 Ltr (190kg) Drum, 25, 35, 42 Ton Tanker";

  // IMAGE STATE
  const [mainImg, setMainImg] = useState(product.img);
  const [zoomStyle, setZoomStyle] = useState({});

  useEffect(() => {
    setMainImg(product.img);
    window.scrollTo(0, 0);
  }, [product]);

  // SUGGESTIONS
  const suggestions = products
    .filter(item => item.id !== product.id)
    .slice(0, 5);

  const rating = 4.5;
  const phoneNumber = "6390059995";

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      {/* 🔙 BACK */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-green-600 font-medium hover:underline"
        >
          ← Back to Products
        </button>
      </div>

      {/* 🔥 MAIN CARD */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg grid md:grid-cols-2 gap-8 p-6 md:p-10">

        {/* LEFT SIDE */}
        <div>

          {/* IMAGE ZOOM */}
          <div
            className="relative rounded-2xl overflow-hidden bg-gray-100"
            onMouseMove={(e) => {
              const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - left) / width) * 100;
              const y = ((e.clientY - top) / height) * 100;

              setZoomStyle({
                backgroundImage: `url(${mainImg})`,
                backgroundPosition: `${x}% ${y}%`,
                backgroundSize: "200%",
              });
            }}
            onMouseLeave={() => setZoomStyle({})}
          >
            <div
              className="h-80 md:h-96 w-full bg-no-repeat transition-all duration-300"
              style={
                zoomStyle.backgroundImage
                  ? zoomStyle
                  : {
                      backgroundImage: `url(${mainImg})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                    }
              }
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4 justify-center flex-wrap">
            {(product.images || [product.img]).map((img, index) => (
              <img
                key={index}
                src={img}
                alt="variant"
                onClick={() => setMainImg(img)}
                className={`w-20 h-20 object-contain border rounded-lg cursor-pointer p-1 transition 
                  ${mainImg === img ? "border-green-600 scale-105" : "border-gray-300"}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-between">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {product.title}
            </h1>

            {/* ⭐ RATING */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className={i < Math.floor(rating) ? "" : "opacity-30"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500">({rating})</span>
            </div>

            <p className="text-gray-600 mb-4 text-lg">
              {product.description}
            </p>

            <p className="text-gray-500 mb-6">
              {product.about}
            </p>

            {/* ✅ PACKING DETAILS (FIXED) */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 p-5 rounded-2xl mb-6 shadow-sm">

              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                 Packaging Details
              </h3>

              <div className="space-y-3 text-sm text-gray-700">

                <div className="flex gap-2 items-start">
                  {/* <span className="text-green-600 text-lg">✔</span> */}
                  <p>
                    <span className="font-semibold text-gray-800">
                      Available Packs:
                    </span>{" "}
                    {PACKS}
                  </p>
                </div>

                <div className="flex gap-2 items-start">
                  {/* <span className="text-blue-600 text-lg"></span> */}
                  <p>
                    <span className="font-semibold text-gray-800">
                      Bulk Availability:
                    </span>{" "}
                    {BULK}
                  </p>
                </div>

              </div>
            </div>

            {/* BENEFITS */}
            {product.benefits && (
              <div className="bg-gray-100 p-4 rounded-xl mb-6">
                <h3 className="font-semibold mb-2">Health Benefits</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  {product.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <button
              onClick={handleCallClick}
              className="flex-1 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
            >
              Call
            </button>
            <button
              onClick={() => navigate('/form')}
              className="flex-1 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600"
            >
              WhatsApp
            </button>
          </div>

        </div>
      </div>

      {/* SUGGESTIONS */}
      <div className="max-w-7xl mx-auto mt-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          You may also like
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {suggestions.map(item => (
            <div
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              className="bg-white rounded-2xl shadow cursor-pointer group"
            >
              <div className="bg-gray-100 rounded-t-2xl p-4 flex justify-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-32 object-contain"
                />
              </div>

              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-700 line-clamp-2">
                  {item.title}
                </h3>

                <div className="text-yellow-400 text-xs mt-1">
                  ★★★★☆
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;
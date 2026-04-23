import aboutImg from "../../public/34.png";
import {
  Leaf,
  Target,
  Eye,
  ShieldCheck,
  Globe,
  Factory,
  BadgeCheck,
  Boxes,
} from "lucide-react";

export default function About() {
  return (
    <div className="bg-gray-100">

      {/* HERO */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About KisanChoice
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-gray-200">
          Delivering purity, authenticity, and trust to every Indian kitchen.
        </p>
      </div>

      {/* 🔥 VISION & MISSION (UPPER) */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-2xl shadow flex items-start gap-4 hover:shadow-lg transition">
          <Eye className="text-green-700 w-8 h-8" />
          <div>
            <h3 className="text-green-700 font-semibold text-lg mb-1">
              Our Vision
            </h3>
            <p className="text-gray-600 text-sm">
              To become India’s most trusted edible oil brand by delivering
              purity and quality in every drop.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow flex items-start gap-4 hover:shadow-lg transition">
          <Target className="text-green-700 w-8 h-8" />
          <div>
            <h3 className="text-green-700 font-semibold text-lg mb-1">
              Our Mission
            </h3>
            <p className="text-gray-600 text-sm">
              Deliver high-quality oils with innovation, sustainability, and
              customer trust.
            </p>
          </div>
        </div>

      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">

        <div className="relative">
          <div className="absolute inset-0 bg-yellow-300 blur-3xl opacity-30 rounded-full"></div>
          <img
            src={aboutImg}
            alt="about"
            className="relative w-full h-[350px] object-contain drop-shadow-2xl"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Who We Are
          </h2>

          <p className="text-gray-600 mb-4">
            <strong>KisanChoice</strong> is a trusted edible oil brand under
            <strong> Kisan India Plus</strong>, based in Lucknow.
          </p>

          <p className="text-gray-600 mb-4">
            We combine traditional <strong>Kachi Ghani</strong> techniques with
            modern hygienic processing to ensure purity and taste.
          </p>

          <p className="text-gray-600">
            Our goal is to deliver healthy, safe, and flavorful cooking oils.
          </p>
        </div>
      </div>

      {/* PRODUCT RANGE */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-8">
          Our Product Range
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 flex flex-col rounded-2xl shadow text-center hover:shadow-lg transition">
            <img src="1.svg" alt="" className="h-16 items-center text-black" />
            <h3 className="text-green-700 font-semibold">
              Mustard Oils
            </h3>
            <p className="text-gray-600 text-sm">
              Premium Kachi Ghani oils with natural aroma.of All section
            </p>
          </div>

          <div className="bg-white flex flex-col p-6 rounded-2xl shadow text-center hover:shadow-lg transition">
             <img src="2.svg" alt="" className="h-16 items-center" />
            <h3 className="text-green-700 font-semibold mb-2">
              Refined Oils
            </h3>
            <p className="text-gray-600 text-sm">
              Soybean, sunflower, and blended oils for daily use.
            </p>
          </div>

          <div className="bg-white flex flex-col p-6 rounded-2xl shadow text-center hover:shadow-lg transition">
        
              <img src="3.svg" alt="" className="h-16 items-center" />
            <h3 className="text-green-700 font-semibold mb-2">
              Vegitable Oils
            </h3>
            <p className="text-gray-600 text-sm">
              Coconut, groundnut, flaxseed, and sesame oils.
            </p>
          </div>

        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="bg-white py-14 px-4">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Why Choose Us?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

          <div className="bg-gray-100 p-6 rounded-2xl shadow flex gap-3">
            <ShieldCheck className="text-green-600" />
            <p className="text-sm text-gray-600">
              Purity-focused manufacturing process.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl shadow flex gap-3">
            <Boxes className="text-green-600" />
            <p className="text-sm text-gray-600">
              Wide variety of edible oils.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl shadow flex gap-3">
            <Globe className="text-green-600" />
            <p className="text-sm text-gray-600">
              Strong PAN India distribution.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl shadow flex gap-3">
            <Factory className="text-green-600" />
            <p className="text-sm text-gray-600">
              Third-party manufacturing support.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl shadow flex gap-3">
            <BadgeCheck className="text-green-600" />
            <p className="text-sm text-gray-600">
              Premium quality at affordable price.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl shadow flex gap-3">
            <Leaf className="text-green-600" />
            <p className="text-sm text-gray-600">
              Natural & healthy oil production.
            </p>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      
    </div>
  );
}
import aboutImg from "../../public/34.png";

export default function About() {
  return (
    <div className="bg-gray-100">

      {/* HERO */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About KisanChoice
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-gray-200">
          Delivering purity, authenticity, and trust to every Indian kitchen with
          a perfect blend of tradition and modern technology.
        </p>
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
            <strong>KisanChoice</strong> is a trusted edible oil brand developed 
            under the guidance of <strong>Kisan India Plus</strong>. Based in 
            Lucknow, Uttar Pradesh, we are deeply connected to India’s agricultural 
            roots while delivering modern, high-quality edible oils.
          </p>

          <p className="text-gray-600 mb-4">
            We combine traditional cold-pressing (Kachi Ghani) techniques with 
            modern hygienic processing to ensure purity, nutrition, and authentic taste.
          </p>

          <p className="text-gray-600">
            Our goal is simple — to bring healthy, safe, and flavorful cooking oils 
            to every home.
          </p>
        </div>
      </div>

      {/* PRODUCT RANGE */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-8">
          Our Product Range
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-green-700 font-semibold mb-2">
              Mustard Oils
            </h3>
            <p className="text-gray-600 text-sm">
              Premium Kachi Ghani oils including wooden and machine cold-pressed variants.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-green-700 font-semibold mb-2">
              Refined Oils
            </h3>
            <p className="text-gray-600 text-sm">
              Soybean, sunflower, palm, and blended oils for balanced nutrition.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-green-700 font-semibold mb-2">
              Specialty Oils
            </h3>
            <p className="text-gray-600 text-sm">
              Groundnut, coconut, flaxseed, and sesame oils for traditional use.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="bg-white py-14 px-4">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Why Choose Kisan Choice?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Choosing KisanChoice means choosing purity, consistency, and trust. 
            We combine agro expertise with modern practices to deliver high-quality oils.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

          <div className="bg-gray-100 p-6 rounded-2xl shadow">
            <h3 className="text-green-700 font-semibold mb-2">
              Purity-Centric Manufacturing
            </h3>
            <p className="text-gray-600 text-sm">
              Cold-pressed and refined processes that retain nutrients and taste.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl shadow">
            <h3 className="text-green-700 font-semibold mb-2">
              Wide Product Portfolio
            </h3>
            <p className="text-gray-600 text-sm">
              Mustard, soybean, sunflower, coconut, sesame, and more.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl shadow">
            <h3 className="text-green-700 font-semibold mb-2">
              PAN India Distribution
            </h3>
            <p className="text-gray-600 text-sm">
              Strong supply chain ensuring timely delivery across India.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl shadow">
            <h3 className="text-green-700 font-semibold mb-2">
              Third-Party Manufacturing
            </h3>
            <p className="text-gray-600 text-sm">
              Custom branding and white-label solutions for businesses.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl shadow">
            <h3 className="text-green-700 font-semibold mb-2">
              Affordable Premium Quality
            </h3>
            <p className="text-gray-600 text-sm">
              High-quality oils at competitive prices for everyday use.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl shadow">
            <h3 className="text-green-700 font-semibold mb-2">
              Ethical & Transparent
            </h3>
            <p className="text-gray-600 text-sm">
              Honest practices, fair pricing, and long-term relationships.
            </p>
          </div>

        </div>
      </div>

      {/* VISION & MISSION */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-green-700 font-semibold mb-2">Our Vision</h3>
          <p className="text-gray-600">
            To become India’s most trusted edible oil brand.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-green-700 font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            Deliver high-quality oils with innovation and sustainability.
          </p>
        </div>

      </div>

      {/* FOOTER PROMISE */}
      <div className="bg-green-700 text-white text-center py-8">
        <h2 className="text-xl font-semibold mb-2">
          Our Promise
        </h2>
        <p>
          "Purity You Can Taste, Trust You Can Feel."
        </p>
      </div>

    </div>
  );
}
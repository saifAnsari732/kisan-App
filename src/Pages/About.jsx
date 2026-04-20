import aboutImg from "../../public/34.png"; // 👈 replace with your image

export default function About() {
  return (
    <div className="bg-gray-100">

      {/* HERO */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-5 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About KisanChoice
        </h1>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-200">
          Delivering purity, health, and trust in every drop of oil across India.
        </p>
      </div>

      {/* MAIN SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT IMAGE */}
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-300 blur-3xl opacity-30 rounded-full"></div>
          <img
            src={aboutImg}
            alt="about"
            className="relative w-full h-[350px] object-contain drop-shadow-2xl"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Kisan Agro is a trusted name in the edible oil industry, committed to
            delivering high-quality, pure, and healthy oil products. With years
            of experience, we ensure that every product meets the highest
            standards of quality and hygiene.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Our dedication to innovation and customer satisfaction makes us a
            reliable choice for households and businesses across India.
          </p>
        </div>
      </div>

      {/* VISION & MISSION */}
      <div className="max-w-6xl mx-auto px-4 pb-16 grid md:grid-cols-2 gap-8">

        {/* Vision Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-green-700 mb-3">
            Our Vision
          </h3>
          <p className="text-gray-600">
            To become a leading brand in edible oils by consistently delivering
            purity, health, and trust to every household.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-green-700 mb-3">
            Our Mission
          </h3>
          <p className="text-gray-600">
            To provide high-quality oil products with a focus on innovation,
            sustainability, and customer satisfaction.
          </p>
        </div>
      </div>

    </div>
  );
}
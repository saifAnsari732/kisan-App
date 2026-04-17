import contactImg from "../../public/35.png"; // 👈 replace with your image

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* LEFT - FORM */}
        <div className="p-6 md:p-10">
          <h1 className="text-3xl font-bold text-green-700 mb-2">
            Contact Us
          </h1>
          <p className="text-gray-500 mb-6">
            Have questions? We’d love to hear from you.
          </p>

          <form className="space-y-4">
            <input
              className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Name"
            />

            <input
              className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Email"
            />

            <textarea
              rows="4"
              className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Message"
            />

            <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] transition">
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT - IMAGE */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-green-600 to-green-800 p-6">
          
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-yellow-300 blur-3xl opacity-30 rounded-full"></div>

            <img
              src={contactImg}
              alt="contact"
              className="relative h-[350px] object-contain drop-shadow-2xl"
            />
          </div>

        </div>

      </div>
    </div>
  );
}
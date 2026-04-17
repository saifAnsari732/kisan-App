import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Contact() {
  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">

        {/* 🔶 LEFT SECTION */}
        <div className="bg-green-50 p-6 rounded-xl">

          <h2 className="text-lg font-semibold text-green-900 mb-2">
            We are always ready to help you and answer your questions
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            We're always happy to assist.
          </p>

          {/* Address */}
          <h3 className="font-semibold text-green-900 mb-2">Address</h3>

          <p className="text-xs text-gray-700 mb-3">
            <span className="font-semibold">REGD. OFFICE:</span><br />
            KH. NO. 137, VILL & POST BIJNAUR SAROJINI NAGAR,
            LUCKNOW - 226002 (U.P.) INDIA
          </p>

          <p className="text-xs text-gray-700 mb-4">
            <span className="font-semibold">CORP. OFFICE:</span><br />
            OFFICE NO. 129 & 122, 4TH FLOOR, J.B. EMPEROR SQUARE,
            NEAR APOLLO HOSPITAL, KANPUR ROAD, LUCKNOW - 226012
          </p>

          {/* Contact */}
          <p className="text-sm text-gray-700 mb-1">📞 6390059995</p>
          <p className="text-sm text-gray-700 mb-4">📞 18008890860</p>

          {/* Email */}
          <h3 className="font-semibold text-green-900 mb-1">Email</h3>
          <p className="text-sm text-gray-700 mb-4">
            info@kisangroups.in
          </p>

          {/* Social */}
          <h3 className="font-semibold text-green-900 mb-2">
            Social Links
          </h3>

          <div className="flex gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full"><FaFacebookF /></div>
            <div className="w-8 h-8 bg-pink-500 text-white flex items-center justify-center rounded-full"><FaInstagram /></div>
            <div className="w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded-full"><FaYoutube /></div>
            <div className="w-8 h-8 bg-blue-700 text-white flex items-center justify-center rounded-full"><FaLinkedinIn /></div>
          </div>

          {/* MAP */}
          <div className="w-full h-[250px] rounded-xl overflow-hidden">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=lucknow&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
            ></iframe>
          </div>

        </div>

        {/* 🔶 RIGHT SECTION (FORM) */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold text-green-900 mb-6 border p-3">
            Get in Touch
          </h2>

          <form className="space-y-4">

            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="First Name"
                className="border p-2 rounded-md w-full"
              />
              <input
                placeholder="Last Name"
                className="border p-2 rounded-md w-full"
              />
            </div>

            {/* Email */}
            <input
              placeholder="Email Address"
              className="border p-2 rounded-md w-full"
            />

            {/* Message */}
            <textarea
              rows="5"
              placeholder="Your Message"
              className="border p-2 rounded-md w-full"
            ></textarea>

            {/* Button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Submit Form
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}
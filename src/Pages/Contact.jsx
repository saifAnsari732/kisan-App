import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  // handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const existingData =
      JSON.parse(localStorage.getItem("contactData")) || [];

    const updatedData = [...existingData, formData];

    localStorage.setItem("contactData", JSON.stringify(updatedData));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="bg-gray-100 py-10 px-4">
      <h1 className="text-4xl text-center py-6 font-semibold">
        Contact Form
      </h1>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 items-stretch">

        {/* LEFT */}
        <div className="bg-green-50 p-6 rounded-xl flex flex-col justify-between h-full">
          <div>
            <h2 className="text-lg font-semibold text-green-900 mb-2">
              We are always ready to help you and answer your questions
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              We're always happy to assist.
            </p>

            {/* PHONE + WHATSAPP */}
            <p
              onClick={() => (window.location.href = "tel:6390059995")}
              className="text-sm text-gray-700 mb-1 flex items-center gap-2 cursor-pointer hover:text-green-600"
            >
              <FaWhatsapp className="text-green-500" /> 6390059995
            </p>

            <p
              onClick={() => (window.location.href = "tel:18008890860")}
              className="text-sm text-gray-700 mb-4 flex items-center gap-2 cursor-pointer hover:text-green-600"
            >
              <FaPhoneAlt /> 18008890860
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-3 mb-6 text-white text-sm">
              <a
                href="https://www.facebook.com/ecokisanchoice/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-full hover:scale-110 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/kisan.choice/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-pink-500 flex items-center justify-center rounded-full hover:scale-110 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.youtube.com/@ecokisanchoice"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-red-500 flex items-center justify-center rounded-full hover:scale-110 transition"
              >
                <FaYoutube />
              </a>

              <a
                href="https://www.linkedin.com/company/ecokisanchoice"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-blue-700 flex items-center justify-center rounded-full hover:scale-110 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* MAP */}
          <div>
            <h2 className="text-xl font-semibold text-center text-green-900 mb-4">
              Our Location
            </h2>

            <div className="w-full h-[300px] md:h-[350px] rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps?q=Lucknow,Uttar%20Pradesh,India&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col h-full">
          <h2 className="text-xl font-semibold text-green-900 mb-6 border p-3">
            Get in Touch
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col h-full"
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="border p-2 rounded-md w-full"
              />

              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="border p-2 rounded-md w-full"
              />
            </div>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="border p-2 rounded-md w-full"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="10"
              placeholder="Your Message"
              className="border p-2 rounded-md w-full"
            />

            {/* BUTTON FIXED BOTTOM */}
            <button className="bg-blue-600 mt-auto text-white px-4 py-2 rounded-md ">
              Submit Form
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
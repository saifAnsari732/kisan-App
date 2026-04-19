import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Contact() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  // input change handle
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 old data lo
    const existingData =
      JSON.parse(localStorage.getItem("contactData")) || [];

    // 🔥 new data add
    const updatedData = [...existingData, formData];

    // 🔥 save
    localStorage.setItem("contactData", JSON.stringify(updatedData));

   

    // reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="bg-gray-100 py-10 px-4">
             <h1 className="text-4xl text-center py-6 font-semibold">Contact Form </h1>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        {/* LEFT SAME */}
        <div className="bg-green-50 p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-green-900 mb-2">
            We are always ready to help you and answer your questions
          </h2>

          <p className="text-sm text-gray-600 mb-6">
            We're always happy to assist.
          </p>

          <p className="text-sm text-gray-700 mb-1">📞 6390059995</p>
          <p className="text-sm text-gray-700 mb-4">📞 18008890860</p>

          <div className="flex gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full"><FaFacebookF /></div>
            <div className="w-8 h-8 bg-pink-500 text-white flex items-center justify-center rounded-full"><FaInstagram /></div>
            <div className="w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded-full"><FaYoutube /></div>
            <div className="w-8 h-8 bg-blue-700 text-white flex items-center justify-center rounded-full"><FaLinkedinIn /></div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold text-green-900 mb-6 border p-3">
            Get in Touch
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

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
              rows="5"
              placeholder="Your Message"
              className="border p-2 rounded-md w-full"
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Submit Form
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}
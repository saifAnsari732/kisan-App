import { useState } from "react";

export default function Career() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("User Data:", formData);

    alert("Application Submitted Successfully ✅");
  };

  return (
    <div className="bg-gray-100">

      {/* HERO */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-5 text-center">
        <h1 className="text-4xl font-bold mb-3">Join Our Team</h1>
        <p className="text-gray-200 text-sm">
          Build your career with Kisan Agro 🚀
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">

        {/* LEFT - JOB LIST */}
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-6">
            Open Positions
          </h2>

          <div className="space-y-4">
            {[
              {
                title: "Sales Executive",
                location: "Lucknow",
                exp: "1+ Years",
              },
              {
                title: "Marketing Manager",
                location: "Lucknow",
                exp: "3+ Years",
              },
            ].map((job, i) => (
              <div
                key={i}
                className="p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-sm text-gray-600">
                  📍 {job.location} | 💼 {job.exp}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - FORM */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Apply Now
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            <select
              name="position"
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Select Position</option>
              <option>Sales Executive</option>
              <option>Marketing Manager</option>
            </select>

            {/* Resume Upload */}
            <div className="border-2 border-dashed p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500 mb-2">
                Upload Resume (PDF / DOC)
              </p>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="w-full text-sm"
                required
              />
            </div>

            <button className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] transition">
              Submit Application
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
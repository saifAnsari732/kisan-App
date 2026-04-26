import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from 'react-toastify';

export default function Career() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0]?.name : value, // ✅ only file name store
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingData =
    JSON.parse(localStorage.getItem("applyData")) || [];
    
    const updatedData = [...existingData, formData];
    
    localStorage.setItem("applyData", JSON.stringify(updatedData));
    toast.success("Form Submitted ✅ Successfull")

    console.log("Form Submitted ✅", formData);

    // reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      resume: "",
    });
  };

  return (
    <div className="bg-gray-100">

      {/* HERO */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Join Our Team</h1>
        <p className="text-gray-200 text-sm">
          Build your career with KisanChoice
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
              { title: "Sales Executive", location: "Lucknow", exp: "1+ Years" },
              { title: "Marketing Manager", location: "Lucknow", exp: "3+ Years" },
              { title: "TeleSales", location: "Lucknow", exp: "1+ Years" },
              { title: "Graphics Designer", location: "Lucknow", exp: "1+ Years" },
              { title: "Office Staff", location: "Lucknow", exp: "1+ Years" },
            ].map((job, i) => (
              <div
                key={i}
                className="p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <FaLocationDot className="text-black" />
                  {job.location} | {job.exp}
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

          {/* ✅ FIXED FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />

            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Select Position</option>
              <option>Sales Executive</option>
              <option>Marketing Manager</option>
              <option>TeleSales (WFH)</option>
              <option>TeleSales (WFO)</option>
              <option>Graphics Designer</option>
              <option>Video Editor</option>
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
              />
              {formData.resume && (
                <p className="text-xs text-green-600 mt-2">
                  Selected: {formData.resume}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] transition"
            >
              Submit Application
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
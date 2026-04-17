import { useState, useEffect, useRef } from "react";
import { Phone, Mail, Menu, X } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Mustard Oil");

  const dropdownRef = useRef();

  // ✅ OUTSIDE CLICK CLOSE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  // ✅ CATEGORY DATA
  const categories = {
    "Mustard Oil": [

      <Link onClick={() => setIsOpen(false)}  to={'/choice'}> Indian Choice Kachi Ghani Mustard Oil</Link>,
      <Link onClick={() => setIsOpen(false)} to={"kachighani"}>Kachi Ghani Wooden & Cold Pressed Mustard Oil Premium</Link>,
      "Kachi Ghani Mustard Oil",
    ],
    "Refined Oil": [
      "Refined Soyabean Oil",
      "Refined Coconut Oil",
      "Refined Palmolein Oil",
      "Refined Sunflower Oil",
    ],
    "Alsi Oil" : "",
    "Pooja Oil":"",
    "Groundnut Oil":"",
  };

  return (
    <>
      {/* ✅ FIXED HEADER */}
      <div className="fixed top-0 left-0 w-full z-50 font-sans">

        {/* 🔹 TOP BAR */}
        <div className="bg-green-700 text-white text-xs md:text-sm h-10 flex items-center px-3">
          <div className="w-full max-w-7xl mx-auto flex justify-between items-center">

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>1800 8890 860</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>6390059995</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Mail size={14} />
                <span>info@kisangroups.in</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <FaFacebook />
              <FaInstagram />
              <FaTwitter />
              <FaLinkedin />
              <FaYoutube />
            </div>
          </div>
        </div>

        {/* 🔹 MAIN NAVBAR */}
        <div className="bg-white shadow-md h-14 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between">

            {/* LOGO */}
            <div className="text-xl font-bold text-green-700">
              KISAN AGRO
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">

              <Link  onClick={() => showDropdown(false)} to="/" className="hover:text-green-600">HOME</Link>
              <Link  onClick={() => showDropdown(false)} to="/about" className="hover:text-green-600">ABOUT US</Link>
              <Link  onClick={() => showDropdown(false)} to="/shop" className="hover:text-green-600">PRODUCT</Link>

              {/* ✅ CLICK DROPDOWN */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1 hover:text-green-600"
                >
                  OUR RANGE
                  <span
                    className={`transition-transform duration-300 ${
                      showDropdown ? "rotate-90" : ""
                    }`}
                  >
                    ›
                  </span>
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="absolute left-0 top-12 w-[650px] bg-white shadow-2xl rounded-xl flex overflow-hidden z-50"
                    >

                      {/* LEFT */}
                      <div className="w-1/2 bg-gray-100 p-4 space-y-2">
                        {Object.keys(categories).map((cat) => (
                          <div
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer transition
                            ${
                              activeCategory === cat
                                ? "bg-white text-orange-500 font-semibold shadow"
                                : "hover:bg-white"
                            }`}
                          >
                            {cat}
                            <span>›</span>
                          </div>
                        ))}
                      </div>

                      {/* RIGHT */}
                      <div className="w-1/2 p-4 space-y-2">
                        {categories[activeCategory].map((item, i) => (
                          <div
                            key={i}
                            className="text-gray-700 hover:text-orange-500 cursor-pointer transition"
                          >
                            {item}
                          </div>
                        ))}
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link  onClick={() => showDropdown(false)} to="/contact" className="hover:text-green-600">CONTACT</Link>
              <Link  onClick={() => showDropdown(false)} to="/career" className="hover:text-green-600">CAREER</Link>
            </div>

            {/* DESKTOP BUTTONS */}
            <div className="hidden md:flex gap-3">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 text-sm rounded-lg shadow">
                Form
              </button>
              <button className="bg-red-400 hover:bg-red-500 text-white px-3 py-2 text-sm rounded-lg shadow">
                Agreement
              </button>
              <button className="bg-green-800 hover:bg-green-900 text-white px-3 py-2 text-sm rounded-lg shadow">
                Catalog
              </button>
            </div>

            {/* MOBILE BUTTON */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ✅ MOBILE MENU */}
   {/* MOBILE MENU */}
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.35 }}
      className="fixed top-0 right-0 w-full max-w-sm h-screen bg-gradient-to-b from-green-800 via-green-700 to-green-600 text-white z-50 px-5 py-6 shadow-2xl overflow-y-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">KISAN AGRO</h2>
        <button onClick={() => setIsOpen(false)}>
          <X size={22} />
        </button>
      </div>

      {/* Links */}
      <div className="space-y-3">

        <Link  onClick={() => setIsOpen(false)} to="/" className="block px-4 py-3 rounded-xl bg-white/10">
          Home
        </Link>

        <Link  onClick={() => setIsOpen(false)} to="/about" className="block px-4 py-3 rounded-xl bg-white/10">
          About
        </Link>

        <Link  onClick={() => setIsOpen(false)} to="/shop" className="block px-4 py-3 rounded-xl bg-white/10">
          Product
        </Link>

        {/* ✅ MOBILE DROPDOWN */}
        <div className="bg-white/10 rounded-xl overflow-hidden">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex justify-between items-center px-4 py-3"
          >
            OUR RANGE
            <span className={`transition ${showDropdown ? "rotate-90" : ""}`}>
              ›
            </span>
          </button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-white text-black"
              >
                {/* Categories */}
                {Object.keys(categories).map((cat, i) => (
                  <div key={i} className="border-b">

                    {/* Category */}
                    <div
                      onClick={() => setActiveCategory(cat)}
                      className="px-4 py-3 font-medium flex justify-between cursor-pointer hover:bg-gray-100"
                    >
                      {cat}
                      <span>›</span>
                    </div>

                    {/* Sub Categories */}
                    {activeCategory === cat && categories[cat] && (
                      <div className="bg-gray-50">
                        {categories[cat].map((item, idx) => (
                          <div
                            key={idx}
                            className="px-6 py-2 text-sm text-gray-600 hover:text-orange-500 cursor-pointer"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link  onClick={() => setIsOpen(false)} to="/contact" className="block px-4 py-3 rounded-xl bg-white/10">
          Contact
        </Link>

        <Link  onClick={() => setIsOpen(false)} to="/career" className="block px-4 py-3 rounded-xl bg-white/10">
          Career
        </Link>

      </div>

      {/* Buttons */}
      <div className="mt-6 space-y-3">
        <button className="w-full py-3 rounded-xl bg-yellow-500">Form</button>
        <button className="w-full py-3 rounded-xl bg-red-400">Agreement</button>
        <button className="w-full py-3 rounded-xl bg-green-900">Catalog</button>
      </div>
    </motion.div>
  )}
</AnimatePresence>
      {/* ✅ PAGE CONTENT GAP */}
      <div className="pt-[104px]"></div>
    </>
  );
}
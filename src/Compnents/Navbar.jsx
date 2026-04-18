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
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Mustard Oil");

  const dropdownRef = useRef();
  const navigate = useNavigate();

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

  // ✅ FIX: Close dropdown + mobile menu, then navigate
  const closeAllAndNavigate = (path) => {
    setShowDropdown(false);
    setIsOpen(false);
    navigate(path);
  };

  // ✅ FIX: Individual named handlers now use closeAllAndNavigate
  const goToAlsi = () => closeAllAndNavigate("/alsi");
  const goToPooja = () => closeAllAndNavigate("/pooja");
  const goToGround = () => closeAllAndNavigate("/ground");

  // ✅ CATEGORY DATA — removed broken onClick={alsi} from <Link> elements
  const categories = {
    "Mustard Oil": [
      { label: "Indian Choice Kachi Ghani Mustard Oil", to: "/choice" },
      { label: "Kachi Ghani Wooden & Cold Pressed Mustard Oil Premium", to: "/kachighani" },
      { label: "Kachi Ghani Mustard Oil", to: "/kachighanimustard" },
    ],
    "Refined Oil": [
      { label: "Refined Soyabean Oil", to: "/soyabean" },
      { label: "Refined Coconut Oil", to: "/coconut" },
      { label: "Refined Sunflower Oil", to: "/sunflower" },
      { label: "Refined Palmlein Oil", to: "/palmleion" },
    ],
  };

let conform="hr1"
const hr = () => {
  const value = window.prompt("Enter Role (HR)");

  if (value === conform) {
    navigation.navigate("/jobdata");
  } else {
    alert("Invalid Role");
  }
};

// CALL ACTION
 const phoneNumber = "9905234866";

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };
  return (
    <>
      {/* ✅ FIXED HEADER */}
      <div className="fixed top-0 left-0 w-full z-50 font-sans bg-gray-100">

        {/* 🔹 TOP BAR */}
        <div className="bg-green-700 text-white text-xs md:text-sm h-10 flex items-center px-3">
          <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>1800 8890 860</span>
              </div>
              <div onClick={handleCallClick} className="flex items-center gap-2 cursor-pointer">
                <Phone size={14} />
                <span>6390059995</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Mail size={14} />
                <span>info@kisangroups.in</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link to={'https://www.facebook.com/ecokisanchoice/'}><FaFacebook /></Link>
              <Link to={'https://www.instagram.com/kisan.choice'}><FaInstagram /></Link>
              <Link to={'https://x.com/ecokisanchoice'}><FaTwitter /></Link>
              <Link to={'https://www.youtube.com/@ecokisanchoice'}><FaYoutube /></Link>
              <Link to={'https://www.linkedin.com/company/ecokisanchoice'}><FaLinkedin /></Link>
          <button onClick={hr} className="bg-green-650 hover:bg-green-500 rounded-xl p-2">Admin / HR</button>
            </div>
          </div>
        </div>

        {/* 🔹 MAIN NAVBAR */}
        <div className="  h-16 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between ">

           {/* LOGO */}
<div className="flex items-center">
  <img
    src="Logo.png"
    alt="Logo"
    className="h-9 w-auto md:h-12 object-contain"
  />
</div>
            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">

              <Link to="/" className="hover:text-green-600">HOME</Link>
              <Link to="/about" className="hover:text-green-600">ABOUT US</Link>
              <Link to="/shop" className="hover:text-green-600">PRODUCT</Link>

              {/* ✅ CLICK DROPDOWN */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1 hover:text-green-600"
                >
                  OUR RANGE
                  <span className={`transition-transform duration-300 ${showDropdown ? "rotate-90" : ""}`}>
                    ›
                  </span>
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-12 w-[650px] bg-white shadow-2xl rounded-xl flex overflow-hidden z-50"
                    >
                      {/* LEFT — Categories */}
                      <div className="w-1/2 bg-gray-100 p-4 space-y-2">
                        {Object.keys(categories).map((cat) => (
                          <div
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer transition
                              ${activeCategory === cat
                                ? "bg-white text-orange-500 font-semibold shadow"
                                : "hover:bg-white"
                              }`}
                          >
                            {cat}
                          </div>
                        ))}

                        {/* ✅ FIX: Use handler functions, not navigate() inline */}
                        <div className="ml-3.5 space-y-2 pt-1">
                          <p onClick={goToAlsi} className="cursor-pointer hover:text-orange-500 transition">Alsi Oil</p>
                          <p onClick={goToPooja} className="cursor-pointer hover:text-orange-500 transition">Pooja Oil</p>
                          <p onClick={goToGround} className="cursor-pointer hover:text-orange-500 transition">Groundnut Oil</p>
                        </div>
                      </div>

                      {/* RIGHT — Sub items */}
                      <div className="w-1/2 p-4 space-y-2">
                        {categories[activeCategory].map((item, i) => (
                          // ✅ FIX: Use Link with onClick to close dropdown on navigate
                          <Link
                            key={i}
                            to={item.to}
                            onClick={() => setShowDropdown(false)}
                            className="block text-gray-700 hover:text-orange-500 cursor-pointer transition"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/contact" className="hover:text-green-600">CONTACT</Link>
              <Link to="/career" className="hover:text-green-600">CAREER</Link>
            </div>

            {/* DESKTOP BUTTONS */}
            <div className="hidden md:flex gap-3">
              <button onClick={()=>navigate('/distributionform')} className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white px-3 py-2 text-sm rounded-lg shadow">
               Distribution Form
              </button>
              <button onClick={()=>navigate('/distagreement')} className="bg-red-400 hover:bg-red-500 cursor-pointer text-white px-3 py-2 text-sm rounded-lg shadow">
               Distribution Agreement
              </button>
              <button onClick={()=>navigate('/catalog')} className="bg-green-800 hover:bg-green-900 cursor-pointer text-white px-3 py-2 text-sm rounded-lg shadow">
                Catalog
              </button>
            </div>
            

            {/* MOBILE HAMBURGER */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ✅ MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed top-0 right-0 w-full max-w-sm h-screen bg-gradient-to-b from-green-800 via-green-700 to-green-600 text-white z-50 px-5 py-4 shadow-2xl overflow-y-auto text-sm"
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

              {/* ✅ FIX: phoneclose replaced with proper close handler */}
              <Link onClick={() => setIsOpen(false)} to="/" className="block px-4 py-2 rounded-xl bg-white/10">
                Home
              </Link>
              <Link onClick={() => setIsOpen(false)} to="/about" className="block px-4 py-2 rounded-xl bg-white/10">
                About
              </Link>
              <Link onClick={() => setIsOpen(false)} to="/shop" className="block px-4 py-2 rounded-xl bg-white/10">
                Product
              </Link>

              {/* ✅ MOBILE DROPDOWN */}
              <div className="bg-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full flex justify-between items-center px-4 py-2"
                >
                  OUR RANGE
                  <span className={`transition ${showDropdown ? "rotate-90" : ""}`}>›</span>
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-white text-black"
                    >
                      {Object.keys(categories).map((cat, i) => (
                        <div key={i} className="border-b">
                          <div
                            onClick={() => setActiveCategory(cat)}
                            className="px-4 py-2 font-medium flex justify-between cursor-pointer hover:bg-gray-100"
                          >
                            {cat}
                            <span>›</span>
                          </div>

                          {activeCategory === cat && categories[cat] && (
                            <div className="bg-gray-50">
                              {categories[cat].map((item, idx) => (
                                // ✅ FIX: Closes both dropdown AND mobile menu on navigate
                                <Link
                                  key={idx}
                                  to={item.to}
                                  onClick={() => { setShowDropdown(false); setIsOpen(false); }}
                                  className="block px-6 py-2 text-sm text-gray-600 hover:text-orange-500 cursor-pointer"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}

                      {/* ✅ FIX: Standalone items use closeAllAndNavigate */}
                      <div className="ml-3.5 py-2 space-y-2">
                        <p onClick={goToAlsi} className="cursor-pointer hover:text-orange-500 py-1">Alsi Oil</p>
                        <p onClick={goToPooja} className="cursor-pointer hover:text-orange-500 py-1">Pooja Oil</p>
                        <p onClick={goToGround} className="cursor-pointer hover:text-orange-500 py-1">Groundnut Oil</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link onClick={() => setIsOpen(false)} to="/contact" className="block px-4 py-2 rounded-xl bg-white/10">
                Contact
              </Link>
              <Link onClick={() => setIsOpen(false)} to="/career" className="block px-4 py-2 rounded-xl bg-white/10">
                Career
              </Link>

            </div>

            {/* Buttons */}
            <div className="mt-6 space-y-3">
              <button className="w-full py-2 rounded-xl bg-yellow-600">Distribution Form</button>
              <button className="w-full py-2 rounded-xl bg-red-400">Distribution Agreement</button>
              <button className="w-full py-2 rounded-xl bg-green-900">Catalog</button>
              <button onClick={hr} className="w-full py-2 rounded-xl bg-green-900 ">Admin / HR</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ PAGE CONTENT GAP */}
      <div className="pt-[104px]"></div>
    </>
  );
}
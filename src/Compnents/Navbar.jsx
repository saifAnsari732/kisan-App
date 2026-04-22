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

  const goToAlsi   = () => closeAllAndNavigate("/alsi");
  const goToPooja  = () => closeAllAndNavigate("/pooja");
  const goToGround = () => closeAllAndNavigate("/ground");

  const categories = {
    "Mustard Oil": [
      { label: "Indian Choice Kachi Ghani Mustard Oil",                        to: "/choice" },
      { label: "Kachi Ghani Wooden & Cold Pressed Mustard Oil Premium",        to: "/kachighani" },
      { label: "Kachi Ghani Mustard Oil",                                      to: "/kachighanimustard" },
    ],
    "Refined Oil": [
      { label: "Refined Soyabean Oil",   to: "/soyabean" },
      { label: "Refined Coconut Oil",    to: "/coconut" },
      { label: "Refined Sunflower Oil",  to: "/sunflower" },
      { label: "Refined Palmlein Oil",   to: "/palmleion" },
    ],
  };

  // ✅ FIX: typo was `navigation.navigate` — corrected to `navigate`
  const conform = "hr1";
  const hr = () => {
    const value = window.prompt("Enter Role (HR)");
    if (value === conform) {
      navigate("/jobdata");
    } else {
      alert("Invalid Role");
    }
  };

  const phoneNumber = "9905234866";
  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <>
      {/* ✅ FIXED HEADER */}
      {/* FIX: Added shadow for visual separation on all screen sizes */}
      <div className="fixed top-0 left-0 w-full z-50 font-sans bg-gray-100 shadow-md">

        {/* 🔹 TOP BAR */}
        <div className="bg-green-700 text-white text-xs h-8 flex items-center px-3 md:px-6">
          <div className="w-full max-w-7xl mx-auto flex justify-between items-center">

            {/* Left: phone + email */}
            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                <Phone size={13} />
                <span>1800 8890 860</span>
              </div>
              <div
                onClick={handleCallClick}
                className="flex items-center gap-1 cursor-pointer"
              >
                <Phone size={13} />
                {/* FIX: Show shorter number on very small screens */}
                <span className="hidden xs:inline">6390059995</span>
                <span className="xs:hidden">6390…</span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <Mail size={13} />
                <span>info@kisangroups.in</span>
              </div>
            </div>

            {/* Right: socials + HR button — hidden on mobile (shown in mobile menu) */}
            <div className="hidden md:flex items-center gap-3 text-sm">
              <Link to="https://www.facebook.com/ecokisanchoice/"    target="_blank"><FaFacebook /></Link>
              <Link to="https://www.instagram.com/kisan.choice"      target="_blank"><FaInstagram /></Link>
              <Link to="https://x.com/ecokisanchoice"                target="_blank"><FaTwitter /></Link>
              <Link to="https://www.youtube.com/@ecokisanchoice"     target="_blank"><FaYoutube /></Link>
              <Link to="https://www.linkedin.com/company/ecokisanchoice" target="_blank"><FaLinkedin /></Link>
              <button
                onClick={hr}
                className="bg-green-600 hover:bg-green-500 rounded-xl px-3 py-0.5 text-xs"
              >
                Admin / HR
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 MAIN NAVBAR */}
        {/* FIX: Added px-4 md:px-6 so content never touches screen edges */}
        <div className="h-16 flex items-center px-4 md:px-6">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">

            {/* LOGO */}
            <div className="flex-shrink-0">
              <img
                onClick={() => navigate("/")}
                src="Logo.png"
                alt="Logo"
                /* FIX: Consistent sizing across breakpoints */
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain cursor-pointer"
              />
            </div>

            {/* DESKTOP MENU — hidden below lg to give room for buttons */}
            {/* FIX: Changed from md: to lg: so it doesn't squish on tablets */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-gray-700 font-medium text-sm xl:text-base">
              <Link to="/"        className="hover:text-green-600 whitespace-nowrap">HOME</Link>
              <Link to="/about"   className="hover:text-green-600 whitespace-nowrap">ABOUT US</Link>
              <Link to="/shop"    className="hover:text-green-600 whitespace-nowrap">PRODUCT</Link>

              {/* ✅ CLICK DROPDOWN */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1 hover:text-green-600 whitespace-nowrap"
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
                      animate={{ opacity: 1, y:  0, scale: 1   }}
                      exit={  { opacity: 0, y: 20, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      /* FIX: Removed fixed w-[650px] — now fluid with max-w so it
                         won't overflow on tablets/small desktops */
                      className="absolute left-0 top-12 w-[min(650px,90vw)] bg-white shadow-2xl rounded-xl flex overflow-hidden z-50"
                    >
                      {/* LEFT — Categories */}
                      <div className="w-1/2 bg-gray-100 p-4 space-y-2">
                        {Object.keys(categories).map((cat) => (
                          <div
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer transition ${
                              activeCategory === cat
                                ? "bg-white text-orange-500 font-semibold shadow"
                                : "hover:bg-white"
                            }`}
                          >
                            {cat}
                          </div>
                        ))}

                        <div className="ml-3.5 space-y-2 pt-1">
                          <p onClick={goToAlsi}   className="cursor-pointer hover:text-orange-500 transition">Alsi Oil</p>
                          <p onClick={goToPooja}  className="cursor-pointer hover:text-orange-500 transition">Pooja Oil</p>
                          <p onClick={goToGround} className="cursor-pointer hover:text-orange-500 transition">Groundnut Oil</p>
                        </div>
                      </div>

                      {/* RIGHT — Sub items */}
                      <div className="w-1/2 p-4 space-y-2">
                        {categories[activeCategory].map((item, i) => (
                          <Link
                            key={i}
                            to={item.to}
                            onClick={() => setShowDropdown(false)}
                            className="block text-gray-700 hover:text-orange-500 cursor-pointer transition text-sm"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/contact" className="hover:text-green-600 whitespace-nowrap">CONTACT</Link>
              <Link to="/career"  className="hover:text-green-600 whitespace-nowrap">CAREER</Link>
            </div>

            {/* DESKTOP BUTTONS */}
            {/* FIX: hidden below lg, text-xs so they fit on 1024px screens */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => navigate("/distributionform")}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 xl:px-3 py-2 text-xs xl:text-sm rounded-lg shadow whitespace-nowrap"
              >
                Distribution Form
              </button>
              <button
                onClick={() => navigate("/distagreement")}
                className="bg-red-400 hover:bg-red-500 text-white px-2 xl:px-3 py-2 text-xs xl:text-sm rounded-lg shadow whitespace-nowrap"
              >
                Distribution Agreement
              </button>
              <button
                onClick={() => navigate("/catalog")}
                className="bg-green-700 hover:bg-green-900 text-white px-2 xl:px-3 py-2 text-xs xl:text-sm rounded-lg shadow whitespace-nowrap"
              >
                Catalog
              </button>
            </div>

            {/* MOBILE / TABLET HAMBURGER — visible below lg */}
            <div className="lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ MOBILE / TABLET MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* FIX: Dark overlay behind the drawer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              /* FIX: w-[280px] is valid (w-70 was not a standard Tailwind class) */
              className="fixed top-0 right-0 w-[280px] sm:w-[320px] h-screen bg-gradient-to-b from-green-300 via-gray-400 to-gray-200 text-black z-50 px-5 py-4 overflow-y-auto text-sm"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <img src="Logo.png" alt="Logo" className="h-10 w-auto object-contain" />
                <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <X size={28} />
                </button>
              </div>

              {/* Nav Links */}
              <div className="space-y-2">
                <Link onClick={() => setIsOpen(false)} to="/"       className="block px-4 py-3 rounded-xl bg-white font-medium">Home</Link>
                <Link onClick={() => setIsOpen(false)} to="/about"  className="block px-4 py-3 rounded-xl bg-white font-medium">About</Link>
                <Link onClick={() => setIsOpen(false)} to="/shop"   className="block px-4 py-3 rounded-xl bg-white font-medium">Product</Link>

                {/* MOBILE DROPDOWN */}
                <div className="bg-white rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full flex justify-between items-center px-4 py-3 font-medium"
                  >
                    OUR RANGE
                    <span className={`transition-transform duration-200 ${showDropdown ? "rotate-90" : ""}`}>›</span>
                  </button>

                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white text-black overflow-hidden"
                      >
                        {Object.keys(categories).map((cat, i) => (
                          <div key={i} className="border-t">
                            <div
                              onClick={() => setActiveCategory(cat)}
                              className="px-4 py-3 font-medium flex justify-between cursor-pointer hover:bg-gray-100"
                            >
                              {cat}
                              <span>›</span>
                            </div>

                            {activeCategory === cat && (
                              <div className="bg-gray-50">
                                {categories[cat].map((item, idx) => (
                                  <Link
                                    key={idx}
                                    to={item.to}
                                    onClick={() => { setShowDropdown(false); setIsOpen(false); }}
                                    className="block px-6 py-2 text-sm text-gray-600 hover:text-orange-500"
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Standalone items */}
                        <div className="border-t px-5 py-3 space-y-2 bg-gray-50">
                          <p onClick={goToAlsi}   className="cursor-pointer hover:text-orange-500 py-1">Alsi Oil</p>
                          <p onClick={goToPooja}  className="cursor-pointer hover:text-orange-500 py-1">Pooja Oil</p>
                          <p onClick={goToGround} className="cursor-pointer hover:text-orange-500 py-1">Groundnut Oil</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link onClick={() => setIsOpen(false)} to="/contact" className="block px-4 py-3 rounded-xl bg-white font-medium">Contact</Link>
                <Link onClick={() => setIsOpen(false)} to="/career"  className="block px-4 py-3 rounded-xl bg-white font-medium">Career</Link>
              </div>

              {/* Action Buttons */}
              {/* FIX: Added navigate() calls that were missing in original */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => closeAllAndNavigate("/distributionform")}
                  className="w-full py-3 rounded-xl bg-yellow-500 text-white font-medium"
                >
                  Distribution Form
                </button>
                <button
                  onClick={() => closeAllAndNavigate("/distagreement")}
                  className="w-full py-3 rounded-xl bg-red-400 text-white font-medium"
                >
                  Distribution Agreement
                </button>
                <button
                  onClick={() => closeAllAndNavigate("/catalog")}
                  className="w-full py-3 rounded-xl bg-green-800 text-white font-medium"
                >
                  Catalog
                </button>
                <button
                  onClick={hr}
                  className="w-full py-3 rounded-xl bg-green-900 text-white font-medium"
                >
                  Admin / HR
                </button>
              </div>

              {/* FIX: Social icons visible in mobile menu (were completely hidden on mobile before) */}
              <div className="mt-6 flex justify-center gap-4 text-gray-700 text-lg">
                <Link to="https://www.facebook.com/ecokisanchoice/"        target="_blank"><FaFacebook /></Link>
                <Link to="https://www.instagram.com/kisan.choice"          target="_blank"><FaInstagram /></Link>
                <Link to="https://x.com/ecokisanchoice"                    target="_blank"><FaTwitter /></Link>
                <Link to="https://www.youtube.com/@ecokisanchoice"         target="_blank"><FaYoutube /></Link>
                <Link to="https://www.linkedin.com/company/ecokisanchoice" target="_blank"><FaLinkedin /></Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ✅ PAGE CONTENT SPACER */}
      {/* FIX: 96px = top bar (32px) + main nav (64px). Responsive for all screens. */}
      <div className="h-24" />
    </>
  );
}
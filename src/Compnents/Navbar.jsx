import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, Mail, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Mustard Oil");
  const [mobileRangeOpen, setMobileRangeOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(null);

  const navigate = useNavigate();
  const dropdownRef = useRef();

  // ✅ SCROLL TOP FIX
  const goTo = (path) => {
    setIsOpen(false);
    setShowDropdown(false);

    navigate(path);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  // ✅ CLICK OUTSIDE CLOSE
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ✅ DATA
  const categories = {
    "Mustard Oil": [
      { label: "Indian Choice Kachi Ghani Mustard Oil", to: "/choice" },
      { label: "Kachi Ghani Premium", to: "/kachighani" },
      { label: "Kachi Ghani Mustard Oil", to: "/kachighanimustard" },
    ],
    "Refined Oil": [
      { label: "Soyabean Oil", to: "/soyabean" },
      { label: "Coconut Oil", to: "/coconut" },
      { label: "Sunflower Oil", to: "/sunflower" },
      { label: "Palmlein Oil", to: "/palmleion" },
    ],
    "Alsi Oil": [{ label: "Alsi Oil", to: "/alsi" }],
    "Pooja Oil": [{ label: "Pooja Oil", to: "/pooja" }],
    "Groundnut Oil": [{ label: "Groundnut Oil", to: "/ground" }],
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="fixed w-full top-0 z-50 bg-white shadow-md">

        {/* TOP BAR */}
        <div className="bg-[#16a34a] text-white text-sm py-2 px-6 flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-2">
              <Phone size={14}/>
              1800 8890 860
            </span>
            <span className="flex items-center gap-2">
              <Phone size={14}/>
              6390059995
            </span>
            <span className="hidden md:flex items-center gap-2">
              <Mail size={14}/> 
              info@kisangroups.in
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <span className="text-sm cursor-pointer hover:opacity-80">Admin / HR</span>
          </div>
        </div>

        {/* MAIN NAV */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-8xl px-8 flex items-center justify-between h-15">

            {/* LOGO */}
            <img
              src="/Logo.webp"
              alt="Kisan Logo"
              className="h-14 cursor-pointer object-contain"
              onClick={() => goTo("/")}
            />

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex items-center gap-3 text-sm font-semibold">

              <span 
                onClick={() => goTo("/")}
                className="text-gray-800  cursor-pointer hover:text-[#16a34a] transition-colors "
              >
                HOME
              </span>

              <span 
                onClick={() => goTo("/about")}
                className="text-gray-800  cursor-pointer hover:text-[#16a34a] transition-colors "
              >
                ABOUT US
              </span>

              <span 
                onClick={() => goTo("/shop")}
                className="text-gray-800  cursor-pointer hover:text-[#16a34a] transition-colors "
              >
                PRODUCT
              </span>

              {/* DROPDOWN */}
              <div ref={dropdownRef} className="relative">

                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-gray-800 e cursor-pointer hover:text-[#16a34a] transition-colors uppercase flex items-center gap-1"
                >
                  OUR RANGE
                  <ChevronRight size={16} className={`transition-transform ${showDropdown ? 'rotate-90' : ''}`}/>
                </button>

                {showDropdown && (
                  <div
                    className="absolute top-12 left-0 bg-white shadow-2xl rounded-lg overflow-hidden flex w-[500px] border border-gray-100 animate-fadeIn"
                  >

                    {/* LEFT - Categories */}
                    <div className="w-2/5 bg-gray-50 border-r border-gray-100">
                      {Object.keys(categories).map((cat) => {
                        const isSingleItem = categories[cat].length === 1;
                        return (
                          <div
                            key={cat}
                            onClick={() => {
                              if (isSingleItem) {
                                goTo(categories[cat][0].to);
                              } else {
                                setActiveCategory(cat);
                              }
                            }}
                            className={`px-4 py-3 cursor-pointer text-sm font-medium transition-all ${
                              activeCategory === cat && !isSingleItem
                                ? "bg-white text-[#f97316] border-r-4 border-[#f97316]"
                                : "text-gray-700 hover:bg-white hover:text-gray-900"
                            }`}
                          >
                            {cat}
                          </div>
                        );
                      })}
                    </div>

                    {/* RIGHT - Subcategories (only show if active category has multiple items) */}
                    {categories[activeCategory].length > 1 && (
                      <div className="w-3/5 p-4">
                        <div className="space-y-1">
                          {categories[activeCategory].map((item, i) => (
                            <div
                              key={i}
                              onClick={() => goTo(item.to)}
                              className="px-3 py-2 cursor-pointer text-sm text-gray-700 hover:text-[#16a34a] hover:bg-gray-50 rounded transition-all"
                            >
                              {item.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>

              <span 
                onClick={() => goTo("/contact")}
                className="text-gray-800 cursor-pointer hover:text-[#16a34a] transition-colors uppercase"
              >
                CONTACT
              </span>

              <span 
                onClick={() => goTo("/career")}
                className="text-gray-800 cursor-pointer hover:text-[#16a34a] transition-colors "
              >
                CAREER
              </span>

            </div>

            {/* DESKTOP BUTTONS */}
            <div className="hidden lg:flex items-center gap-3">
              <button 
                onClick={() => goTo("/distributionform")}
                className=" py-2.5 px-5 bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-900  text-sm rounded-md transition-all shadow-sm hover:shadow-md"
              >
                Distribution Form
              </button>

              <button 
                onClick={() => goTo("/distagreement")}
                className="px-5 py-2.5 bg-[#ff4d6d] hover:bg-[#e63946] text-white font-semibol text-sm rounded-md transition-all shadow-sm hover:shadow-md"
              >
                Distribution Agreement
              </button>

              <button 
                onClick={() => goTo("/catalog")}
                className="px-5 py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibol text-sm rounded-md transition-all shadow-sm hover:shadow-md"
              >
                Catalog
              </button>
            </div>

            {/* MOBILE MENU BTN */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu size={28} className="text-gray-700"/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden animate-fadeIn"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div
            className="fixed right-0 top-0 w-[340px] h-full bg-white z-50 shadow-2xl overflow-y-auto animate-slideInRight"
          >

              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <img src="/Logo.webp" alt="Kisan Logo" className="h-12 object-contain"/>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-700"/>
                </button>
              </div>

              {/* Menu Items */}
              <div className="px-6 py-6 space-y-1">

                <div 
                  onClick={() => goTo("/")}
                  className="px-4 py-3 text-gray-800 font-medium cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Home
                </div>

                <div 
                  onClick={() => goTo("/about")}
                  className="px-4 py-3 text-gray-800 font-medium cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                >
                  About
                </div>

                <div 
                  onClick={() => goTo("/shop")}
                  className="px-4 py-3 text-gray-800 font-medium cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Product
                </div>

                {/* OUR RANGE ACCORDION */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div
                    onClick={() => setMobileRangeOpen(!mobileRangeOpen)}
                    className="px-4 py-3 bg-gray-50 text-gray-800 font-medium cursor-pointer flex justify-between items-center hover:bg-gray-100 transition-colors"
                  >
                    <span>OUR RANGE</span>
                    <ChevronRight size={18} className={`transition-transform ${mobileRangeOpen ? 'rotate-90' : ''}`}/>
                  </div>

                  {mobileRangeOpen && (
                    <div className="overflow-hidden">
                      <div className="bg-white px-2 py-2 space-y-1">

                        {Object.keys(categories).map((cat) => {
                          const isSingleItem = categories[cat].length === 1;
                          return (
                            <div key={cat} className="border-b border-gray-100 last:border-0">
                              <div
                                onClick={() => {
                                  if (isSingleItem) {
                                    goTo(categories[cat][0].to);
                                  } else {
                                    setMobileSubOpen(mobileSubOpen === cat ? null : cat);
                                  }
                                }}
                                className="px-3 py-2.5 font-medium text-gray-700 cursor-pointer hover:text-[#16a34a] flex justify-between items-center"
                              >
                                <span>{cat}</span>
                                {!isSingleItem && (
                                  <ChevronRight size={16} className={`transition-transform ${mobileSubOpen === cat ? 'rotate-90' : ''}`}/>
                                )}
                              </div>

                              {!isSingleItem && mobileSubOpen === cat && (
                                <div className="overflow-hidden">
                                  <div className="pl-6 pr-3 pb-2 space-y-1">
                                    {categories[cat].map((item, i) => (
                                      <div
                                        key={i}
                                        onClick={() => goTo(item.to)}
                                        className="py-2 text-sm text-gray-600 cursor-pointer hover:text-[#16a34a] transition-colors"
                                      >
                                        {item.label}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}

                      </div>
                    </div>
                  )}
                </div>

                <div 
                  onClick={() => goTo("/contact")}
                  className="px-4 py-3 text-gray-800 font-medium cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Contact
                </div>

                <div 
                  onClick={() => goTo("/career")}
                  className="px-4 py-3 text-gray-800 font-medium cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Career
                </div>

              </div>

              {/* MOBILE BUTTONS */}
              <div className="px-6 pb-6 space-y-3 border-t border-gray-200 pt-6">
                <button 
                  onClick={() => goTo("/distributionform")} 
                  className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-900 font-semibold py-3 rounded-lg transition-all shadow-sm"
                >
                  Distribution Form
                </button>

                <button 
                  onClick={() => goTo("/distagreement")} 
                  className="w-full bg-[#ff4d6d] hover:bg-[#e63946] text-white font-semibold py-3 rounded-lg transition-all shadow-sm"
                >
                  Distribution Agreement
                </button>

                <button 
                  onClick={() => goTo("/catalog")} 
                  className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold py-3 rounded-lg transition-all shadow-sm"
                >
                  Catalog
                </button>
              </div>

            </div>
          </>
        )
      }

      {/* SPACER - Adjust based on navbar height */}
      <div className="h-[104px]"></div>
    </>
  );
}
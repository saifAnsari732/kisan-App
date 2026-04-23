import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {

  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-900 to-green-900 text-white mt-6 pt-12 pb-6">
      
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">

        {/* 🔹 Company Info */}
        <div>
          <img
            onClick={() => navigate("/")}
            src="Logo.png"
            alt="Logo"
            className="h-10 sm:h-12 lg:h-14 w-auto object-contain cursor-pointer mb-3"
          />

          <p className="text-sm text-gray-200 leading-relaxed">
            Trusted name in quality edible oils. Delivering purity, health and
            authentic taste across India with years of excellence.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4 text-lg">
            <a href="https://www.facebook.com/ecokisanchoice/" target="_blank" className="hover:text-yellow-400"><FaFacebook /></a>
            <a href="https://www.instagram.com/kisan.choice/" target="_blank" className="hover:text-yellow-400"><FaInstagram /></a>
            <a href="https://x.com/ecokisanchoice" target="_blank" className="hover:text-yellow-400"><FaTwitter /></a>
            <a href="https://www.linkedin.com/company/ecokisanchoice" target="_blank" className="hover:text-yellow-400"><FaLinkedin /></a>
            <a href="https://www.youtube.com/@ecokisanchoice" target="_blank" className="hover:text-yellow-400"><FaYoutube /></a>
          </div>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-yellow-300">
            Quick Links
          </h4>

          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400">About Us</Link></li>
            <li><Link to="/shop" className="hover:text-yellow-400">Products</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
            <li><Link to="/career" className="hover:text-yellow-400">Career</Link></li>
          </ul>
        </div>

        {/* 🔹 Products (NOW CLICKABLE ✅) */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-yellow-300">
            Our Products
          </h4>

          <ul className="space-y-2 text-sm">
            <li onClick={() => navigate("/category/mustard")} className="hover:text-yellow-400 cursor-pointer">Mustard Oil</li>
            <li onClick={() => navigate("/category/refined")} className="hover:text-yellow-400 cursor-pointer">Refined Oil</li>
            <li onClick={() => navigate("/category/vegetable")} className="hover:text-yellow-400 cursor-pointer">Vegetable Oil</li>
            <li onClick={() => navigate("/category/cold")} className="hover:text-yellow-400 cursor-pointer">Cold Pressed Oil</li>
          </ul>
        </div>

        {/* 🔹 Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-yellow-300">
            Contact Us
          </h4>

          <div className="space-y-3 text-sm text-gray-200">
            <p className="flex items-center gap-2">
              <MapPin size={16} /> Lucknow, Uttar Pradesh, India
            </p>

            <p
              onClick={() => window.location.href = "tel:18008890860"}
              className="flex items-center gap-2 cursor-pointer hover:text-yellow-400"
            >
              <Phone size={16} /> 1800 8890 860
            </p>

            <p
              onClick={() => window.location.href = "mailto:info@kisangroups.in"}
              className="flex items-center gap-2 cursor-pointer hover:text-yellow-400"
            >
              <Mail size={16} /> info@kisangroups.in
            </p>
          </div>
        </div>
      </div>

      {/* 🔻 Bottom */}
      <div className="border-t border-white/20 mt-10 pt-5 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Kisan Agro. All Rights Reserved.
      </div>

    </footer>
  );
}
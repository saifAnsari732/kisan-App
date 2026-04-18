import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-900 to-green-900 text-white mt-6 pt-12 pb-6">
      
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">

        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">
            KISAN AGRO
          </h2>
          <p className="text-sm text-gray-200 leading-relaxed">
            Trusted name in quality edible oils. Delivering purity, health and
            authentic taste across India with years of excellence.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4 text-lg">
            <a href="#" className="hover:text-yellow-400 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaLinkedin /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaYoutube /></a>
          </div>
        </div>

        {/* Quick Links */}
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

        {/* Categories */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-yellow-300">
            Our Products
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">Mustard Oil</li>
            <li className="hover:text-yellow-400 cursor-pointer">Refined Oil</li>
            <li className="hover:text-yellow-400 cursor-pointer">Vegetable Oil</li>
            <li className="hover:text-yellow-400 cursor-pointer">Cold Pressed Oil</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-yellow-300">
            Contact Us
          </h4>

          <div className="space-y-3 text-sm text-gray-200">
            <p className="flex items-center gap-2">
              <MapPin size={16} /> Lucknow, Uttar Pradesh, India
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> 1800 8890 860
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> info@kisangroups.in
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 mt-10 pt-5 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Kisan Agro. All Rights Reserved.
      </div>
    </footer>
  );
}
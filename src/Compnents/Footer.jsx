import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SocialSidebar from "./SocialmediaIcon";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-green-900 text-white mt-10 pt-12 pb-6">

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

        {/* 🔹 Company */}
        <div>
          <img
            onClick={() => navigate("/")}
            src="Logo.webp"
            alt="Logo"
            className="h-12 mb-4 cursor-pointer"
          />

          <p className="text-sm text-gray-300">
            Trusted name in quality edible oils. Delivering purity and health
            across India.
          </p>

          <div className="flex gap-3 mt-4 text-lg">
            <a href="https://www.facebook.com/ecokisanchoice"><FaFacebook /></a>
            <a href="https://www.instagram.com/kisan.choice"><FaInstagram /></a>
            <a href="https://x.com/ecokisanchoice"><FaTwitter /></a>
            <a href="https://www.linkedin.com/company/ecokisanchoice"><FaLinkedin /></a>
            <a href="https://www.youtube.com/@ecokisanchoice"><FaYoutube /></a>
            {/* <SocialSidebar/> */}
          </div>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h4 className="text-yellow-400 font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/shop">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/career">Career</Link></li>
          </ul>
        </div>

        {/* 🔹 Products */}
        <div>
          <h4 className="text-yellow-400 font-semibold mb-4">Products</h4>
          <ul className="space-y-2 text-sm">
            <li onClick={() => navigate("/category/mustard")} className="cursor-pointer">Mustard Oil</li>
            <li onClick={() => navigate("/category/refined")} className="cursor-pointer">Refined Oil</li>
            <li onClick={() => navigate("/category/vegetable")} className="cursor-pointer">Vegetable Oil</li>
            <li onClick={() => navigate("/category/cold")} className="cursor-pointer">Cold Pressed Oil</li>
          </ul>
        </div>

        {/* 🔹 Contact */}
        <div>
          <h4 className="text-yellow-400 font-semibold mb-4">Contact</h4>

          <div className="space-y-3 text-sm text-gray-300">
            <p className="flex gap-2 items-center">
              <MapPin size={16}/> Lucknow, UP
            </p>

            <p
              onClick={() => window.location.href = "tel:18008890860"}
              className="flex gap-2 items-center cursor-pointer"
            >
              <Phone size={16}/> 1800 8890 860
            </p>

            <p
              onClick={() => window.location.href = "mailto:info@kisangroups.in"}
              className="flex gap-2 items-center cursor-pointer"
            >
              <Mail size={16}/> info@kisangroups.in
            </p>
          </div>
        </div>

        {/* 🔹 LEGAL (NEW SECTION ✅) */}
        <div>
          <h4 className="text-yellow-400 font-semibold mb-4">Legal</h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/privacy" className="hover:text-yellow-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-yellow-300">
                Terms & Conditions
              </Link>
            </li>
            <li>
            
            </li>
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/20 mt-10 pt-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} KisanChoice. All Rights Reserved.
      </div>

    </footer>
  );
}
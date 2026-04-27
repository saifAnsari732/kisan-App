import aboutImg from "../../public/34.png";
import {
  Leaf,
  Target,
  Eye,
  ShieldCheck,
  Globe,
  Factory,
  BadgeCheck,
  Boxes,
} from "lucide-react";

import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <div className="bg-gray-100">

      {/* ✅ FULL SEO SETUP */}
      <Helmet>
        <title>About Us | KisanChoice</title>

        <meta
          name="description"
          content="Learn about KisanChoice - trusted edible oil brand delivering purity, quality and tradition across India."
        />

        <meta
          name="keywords"
          content="KisanChoice, mustard oil, refined oil, edible oil India, kachi ghani oil"
        />

        {/* ✅ Open Graph (Facebook / WhatsApp preview) */}
        <meta property="og:title" content="About KisanChoice" />
        <meta
          property="og:description"
          content="Trusted edible oil brand delivering purity across India."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kisangroups.co.in/about" />
        <meta property="og:image" content="https://kisangroups.co.in/34.png" />

        {/* ✅ Twitter SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About KisanChoice" />
        <meta
          name="twitter:description"
          content="Trusted edible oil brand delivering purity across India."
        />

        {/* ✅ Canonical URL */}
        <link rel="canonical" href="https://kisangroups.co.in/about" />
      </Helmet>

      {/* HERO */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About KisanChoice
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-gray-200">
          Delivering purity, authenticity, and trust to every Indian kitchen.
        </p>
      </div>

      {/* 🔥 VISION & MISSION */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-2xl shadow flex items-start gap-4 hover:shadow-lg transition">
          <Eye className="text-green-700 w-8 h-8" />
          <div>
            <h3 className="text-green-700 font-semibold text-lg mb-1">
              Our Vision
            </h3>
            <p className="text-gray-600 text-sm">
              To become India’s most trusted edible oil brand by delivering
              purity and quality in every drop.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow flex items-start gap-4 hover:shadow-lg transition">
          <Target className="text-green-700 w-8 h-8" />
          <div>
            <h3 className="text-green-700 font-semibold text-lg mb-1">
              Our Mission
            </h3>
            <p className="text-gray-600 text-sm">
              Deliver high-quality oils with innovation, sustainability, and
              customer trust.
            </p>
          </div>
        </div>

      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">

        <div className="relative">
          <div className="absolute inset-0 bg-yellow-300 blur-3xl opacity-30 rounded-full"></div>
          <img
            src={aboutImg}
            alt="KisanChoice About"
            className="relative w-full h-[350px] object-contain drop-shadow-2xl"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Who We Are
          </h2>

          <p className="text-gray-600 mb-4">
            <strong>KisanChoice</strong> is a trusted edible oil brand under
            <strong> Kisan India Plus</strong>, based in Lucknow.
          </p>

          <p className="text-gray-600 mb-4">
            We combine traditional <strong>Kachi Ghani</strong> techniques with
            modern hygienic processing to ensure purity and taste.
          </p>

          <p className="text-gray-600">
            Our goal is to deliver healthy, safe, and flavorful cooking oils.
          </p>
        </div>
      </div>

    </div>
  );
}
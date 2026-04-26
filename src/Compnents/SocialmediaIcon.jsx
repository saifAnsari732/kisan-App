import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SocialSidebar() {

const socials = [
  {
    icon: <FaFacebookF />,
    name: "Facebook",
    color: "bg-[#1877F2]",
    url: "https://www.facebook.com/ecokisanchoice/",
  },
  {
    icon: <FaInstagram />,
    name: "Instagram",
    color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
    url: "https://www.instagram.com/kisan.choice/",
  },
  {
    icon: <FaTwitter />,
    name: "Twitter",
    color: "bg-[#1DA1F2]",   // ❌ black hatao → ✅ blue
    url: "https://x.com/ecokisanchoice",
  },
  {
    icon: <FaYoutube />,
    name: "YouTube",
    color: "bg-[#FF0000]",
    url: "https://www.youtube.com/@ecokisanchoice",
  },
  {
    icon: <FaLinkedinIn />,
    name: "LinkedIn",
    color: "bg-[#0A66C2]",
    url: "https://www.linkedin.com/company/ecokisanchoice",
  },
  {
    icon: <FaPinterestP />,
    name: "Pinterest",
    color: "bg-[#E60023]",  // proper brand red
    url: "https://www.pinterest.com/kisan_choice/",
  },
];
  return (
    <div className="fixed top-1/2 left-0 -translate-y-1/2 z-50 hidden md:block">
      {socials.map((item, i) => (
        <Link
          key={i}
          to={item.url}
          target="_blank"
          rel="noopener noreferrer"
         className={`
group flex items-center rounded-r-lg shadow-md
${item.color}
cursor-pointer overflow-hidden
transition-all duration-300
hover:w-40 w-12 hover:shadow-xl
`}
        >
          {/* Icon */}
          <div className="p-3 text-white text-lg flex-shrink-0">
            {item.icon}
          </div>

          {/* Text */}
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
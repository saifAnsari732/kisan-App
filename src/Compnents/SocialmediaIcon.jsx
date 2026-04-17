import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";

export default function SocialSidebar() {
  const socials = [
    { icon: <FaFacebookF />, name: "Facebook", color: "bg-[#3b5998]" },
    { icon: <FaTwitter />, name: "Twitter", color: "bg-black" },
    { icon: <FaInstagram />, name: "Instagram", color: "bg-[#C13584]" },
    { icon: <FaYoutube />, name: "YouTube", color: "bg-red-600" },
    { icon: <FaPinterestP />, name: "Pinterest", color: "bg-red-500" },
    { icon: <FaLinkedinIn />, name: "LinkedIn", color: "bg-[#0A66C2]" },
  ];

  return (
    <div className="fixed top-1/2 left-0 -translate-y-1/2 z-50 hidden md:block">
      {socials.map((item, i) => (
        <div
          key={i}
          className={`group flex items-center rounded-md ${item.color} text-white cursor-pointer overflow-hidden transition-all duration-300 hover:w-40 w-12`}
        >
          {/* Icon */}
          <div className="p-3 text-lg flex-shrink-0">
            {item.icon}
          </div>

          {/* Text */}
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}
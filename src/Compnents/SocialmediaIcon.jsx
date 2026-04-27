import { useEffect, useState } from "react";

export default function SocialSidebar() {
  const [show, setShow] = useState(false);

  // 🔥 Delay load (performance boost)
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // ❌ initial render me mat dikhao
  if (!show) return null;

  const socials = [
    {
      name: "Facebook",
      color: "bg-[#1877F2]",
      url: "https://www.facebook.com/ecokisanchoice/",
      icon: "facebook",
    },
    {
      name: "Instagram",
      color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
      url: "https://www.instagram.com/kisan.choice/",
      icon: "instagram",
    },
    {
      name: "Twitter",
      color: "bg-[#1DA1F2]",
      url: "https://x.com/ecokisanchoice",
      icon: "twitter",
    },
    {
      name: "YouTube",
      color: "bg-[#FF0000]",
      url: "https://www.youtube.com/@ecokisanchoice",
      icon: "youtube",
    },
    {
      name: "LinkedIn",
      color: "bg-[#0A66C2]",
      url: "https://www.linkedin.com/company/ecokisanchoice",
      icon: "linkedin",
    },
    {
      name: "Pinterest",
      color: "bg-[#E60023]",
      url: "https://www.pinterest.com/kisan_choice/",
      icon: "pinterest",
    },
  ];

  // ✅ Lightweight SVG Icons
  const icons = {
    facebook: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-4 3.8-4 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.7-1.6 1.5V12H17l-.4 3h-2.7v7A10 10 0 0022 12z"/>
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 
        5-5V7c0-2.8-2.2-5-5-5H7zm5 5a5 5 0 110 10 5 5 0 010-10zm6.5-.9a1.1 
        1.1 0 110 2.2 1.1 1.1 0 010-2.2z"/>
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M22 5.8c-.7.3-1.5.5-2.3.6a4 4 0 001.7-2.2c-.8.5-1.7.8-2.6 
        1a4 4 0 00-6.8 3.6A11.3 11.3 0 013 4.9a4 4 0 001.2 5.3c-.6 0-1.2-.2-1.7-.5v.1a4 
        4 0 003.2 3.9c-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1a4 4 0 003.7 2.8A8 8 0 012 
        18.6a11.3 11.3 0 006.1 1.8c7.3 0 11.3-6 11.3-11.3v-.5A8 8 0 0022 5.8z"/>
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M23 7s-.2-1.5-.8-2.2c-.7-.9-1.5-.9-1.9-1C17.6 3.5 12 
        3.5 12 3.5h0s-5.6 0-8.3.3c-.4.1-1.2.1-1.9 1C1.2 5.5 1 7 1 
        7S1 8.7 1 10.4v1.2C1 13.3 1 15 1 15s.2 1.5.8 2.2c.7.9 1.6.9 
        2 .9 1.5.2 6.2.3 6.2.3s5.6 0 8.3-.3c.4-.1 1.2-.1 1.9-1 .6-.7.8-2.2.8-2.2s0-1.7 
        0-3.4v-1.2C23 8.7 23 7 23 7zM9.8 14.6V8.9l5.2 2.9-5.2 2.8z"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M4.98 3.5C4.98 5 3.8 6.2 2.3 6.2S-.4 5  -.4 3.5 1 1 
        2.3 1 4.98 2.2 4.98 3.5zM.3 8.5h4v12h-4zM8.5 8.5h3.8v1.6h.1c.5-1 
        1.7-2 3.6-2 3.9 0 4.6 2.5 4.6 5.7v6.7h-4v-6c0-1.4 0-3.2-2-3.2s-2.3 
        1.5-2.3 3.1v6.1h-4v-12z"/>
      </svg>
    ),
    pinterest: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M12 2a10 10 0 00-3.6 19.3c-.1-.8-.2-2.1.1-3 
        .2-.8 1.4-5.4 1.4-5.4s-.4-.8-.4-2c0-1.9 1.1-3.3 
        2.5-3.3 1.2 0 1.7.9 1.7 2 0 1.2-.8 3-1.2 4.6-.3 
        1.4.7 2.6 2.1 2.6 2.5 0 4.4-2.6 4.4-6.3 
        0-3.3-2.4-5.6-5.8-5.6-4 0-6.3 3-6.3 6.1 
        0 1.2.5 2.6 1.1 3.3.1.1.1.2.1.3-.1.4-.3 
        1.4-.4 1.6-.1.2-.2.3-.4.2-1.5-.7-2.4-2.9-2.4-4.7 
        0-3.8 2.8-7.3 8-7.3 4.2 0 7.5 3 7.5 7 
        0 4.2-2.6 7.6-6.3 7.6-1.2 0-2.4-.6-2.8-1.3l-.8 
        3c-.3 1.1-1.1 2.4-1.6 3.2.9.3 1.9.5 2.9.5a10 
        10 0 000-20z"/>
      </svg>
    ),
  };

  return (
    <div className="fixed top-1/2 left-0 -translate-y-1/2 z-50 hidden md:flex flex-col gap-1">
      {socials.map((item, i) => (
        <a
          key={i}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item.color} flex items-center rounded-r-lg shadow 
          w-12 hover:w-36 overflow-hidden transition-[width] duration-300`}
        >
          <div className="p-3 flex-shrink-0">
            {icons[item.icon]}
          </div>

          <span className="text-white text-sm ml-2 opacity-0 hove opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {item.name}
          </span>
        </a>
      ))}
    </div>
  );
}
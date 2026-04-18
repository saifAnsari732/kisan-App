import React from "react";
import { Home, Search, Headset, ChartBar, BriefcaseBusiness } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function MobileNavbar() {
  const { pathname } = useLocation();

  const navItems = [
    { to: "/",        icon: <Home size={22} />,             label: "Home"     },
    { to: "/career",  icon: <BriefcaseBusiness size={22} />, label: "Career"   },
    { to: "/shop",    icon: <ChartBar size={22} />,          label: "Products" },
    { to: "/form",    icon: <Headset size={22} />,           label: "Support"  },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-green-200 shadow-xl rounded-t-3xl h-18 flex justify-around items-center md:hidden z-50">
      {navItems.map(({ to, icon, label }) => {
        // ✅ exact match for "/" so it doesn't stay active on all routes
        const isActive = to === "/" ? pathname === "/" : pathname.startsWith(to);

        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center text-black transition-all duration-200
              ${isActive ? "borde border-b-2 px-2 py-1 rounded-xl" : ""}`}
          >
            {icon}
            <span className="text-xs mt-1 font-medium">{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
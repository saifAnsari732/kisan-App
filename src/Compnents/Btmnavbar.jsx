import React from "react";
import { Home, Search, Headset, User, ChartBar,BriefcaseBusiness } from "lucide-react";
import {Link} from 'react-router-dom';

export default function MobileNavbar() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-300 shadow-xl rounded-t-3xl  flex justify-around items-center md:hidden z-50">
      <div className="flex flex-col cursor-pointer items-center text-black">
        <Home size={20} />
        <Link to={"/"} className="text-xs mt-1 font-medium ">Home</Link>
      </div>

      <div className="flex flex-col items-center text-black">
        <BriefcaseBusiness size={20} />
        <Link to={"/career"} className="text-xs mt-1">Career</Link>
      </div>

      <div className="flex flex-col items-center text-black">
        <ChartBar size={20} />
        <Link to={"/shop"} className="text-md mt-1">Products</Link>
      </div>

      <div className="flex flex-col items-center text-black">
        <Headset  size={20} />
        <Link to={'/form'} className="text-xs mt-1">Support</Link>
      </div>
    </div>
  );
}
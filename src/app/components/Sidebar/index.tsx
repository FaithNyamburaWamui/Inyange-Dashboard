import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, ShoppingCart, ClipboardList, LogOut } from "lucide-react";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-6 md:mb-8 mt-[50px] ml-[15px]">
        <Image
          src="/images/bmlogo.png"
          alt="B<uildMart Logo"
          width={200}
          height={200}
          className="ml-[50px] mt-[50px]"
        />
      </div>

      <nav className="flex flex-col space-y-14 mt-[130px] ml-[70px] font-bold">
        <Link
          href="/dashboard"
          className={`flex items-center space-x-4 ${
            activeLink === "/" ? "text-[#F8B612]" : "text-white"
          } hover:text-[#F8B612] transition-all duration-300`}
          onClick={() => handleLinkClick("/dashboard")}
        >
          <Home className="w-8 h-8 md:w-10 md:h-10" />
          <span className="text-[22px]">Dashboard</span>
        </Link>

        <Link
          href="/inventory"
          className={`flex items-center space-x-4 ${
            activeLink === "/inventory" ? "text-[#F8B612]" : "text-white"
          } hover:text-[#F8B612] transition-all duration-300`}
          onClick={() => handleLinkClick("/inventory")}
        >
          <ShoppingCart className="w-8 h-8 md:w-10 md:h-10 mt-[10px]" />
          <span className="text-[22px] mt-[10px]">Inventory</span>
        </Link>

        <Link
          href="/order"
          className={`flex items-center space-x-4 ${
            activeLink === "/order" ? "text-[#F8B612]" : "text-white"
          } hover:text-[#F8B612] transition-all duration-300`}
          onClick={() => handleLinkClick("/order")}
        >
          <ClipboardList className="w-8 h-8 md:w-10 md:h-10 mt-[10px]" />
          <span className="text-[22px] mt-[10px]">Orders</span>
        </Link>

        <Link
          href="/register"
          className={`flex items-center space-x-4 ${
            activeLink === "/logout" ? "text-[#F8B612]" : "text-white"
          } hover:text-[#F8B612] transition-all duration-300`}
          onClick={() => handleLinkClick("/signup")}
        >
          <LogOut className="w-8 h-8 md:w-10 md:h-10 mt-[90%]" />
          <span className="text-[22px] mt-[90%]">Logout</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

'use client'
import Image from "next/image";
import React from "react";
import womenImage from "../../../public/women.png";
import downArrow from "../../../public/down-arrow.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
const Header = () => {
    const router=useRouter();
    const logout=()=>{
        localStorage.removeItem('user');
        router.replace('/login');

    }
  return (
    <div className="h-[60px] shadow-xl flex items-center px-10 justify-between">
      <div className="flex items-center">
        <p className="text-7xl p-0 m-0 mt-3.75 text-[#1746EA] ">*</p>
        <p className=" text-[20px] sm:text-2xl p-0 m-0 font-semibold px-3">Yojna Connect</p>
      </div>
      <div className="flex items-center h-[100%] ">
        <Image src={womenImage} alt="default profile icon" />
        <DropdownMenu>
          <DropdownMenuTrigger className="border-0 p-0 m-0 hover:m-0 focus:outline-none">
            <Image
              src={downArrow}
              className=" ml-4 h-[80%] w-5 object-contain"
              alt="downward arrow for accordian"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;

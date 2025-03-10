import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, PlusCircle } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full h-16 shadow-md shadow-blue-300 flex items-center justify-center gap-8">
      <Link to={"/products"}>
        <HomeIcon />
      </Link>
      <Link to={"/add"}>     
        <PlusCircle />
      </Link>
    </div>
  );
};

export default Navbar;

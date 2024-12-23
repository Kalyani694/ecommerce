import React, { useContext, useState } from "react";
import Search from "./Search";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { AuthContext } from "../pages/context/AuthContext";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const {currentUser} = useContext(AuthContext)
  console.log(currentUser)

  return (
    <nav className="bg-white shadow-md">
      <div className="container flex flex-col mx-8 lg:flex-row items-center justify-between py-4 px-6">
        {/* Brand Name */}
        <Link to='/'>
          <h1 className="text-3xl font-bold text-orange-600 mb-4 lg:mb-0">MytalorzoneBySahiba</h1>
        </Link>

        {/* Search Component */}
        <div className="w-full lg:flex-1 lg:mx-3 mb-2 lg:mb-0">
          <Search />
        </div>

        {/* Icons */}
        <div className="flex items-center justify-center space-x-6 text-gray-600 relative">
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <AccountCircleIcon className="hover:text-gray-800 cursor-pointer text-2xl" />
            {/* Dropdown Menu */}
            {showDropdown && (
              <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg">
                <Link to='/login'>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Login</li>
                </Link>
                <Link to='/register'>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sign Up</li>
                </Link>
                <Link to='/sellerLogin'>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Seller</li>
                </Link>
                <Link to='/findOrder'>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">FindOrder</li>
                </Link>

              </ul>
            )}
          </div>
          <FavoriteBorderIcon className="hover:text-gray-800 cursor-pointer text-2xl" />
         <Link to='/cart'>
            <ShoppingCartOutlinedIcon className="hover:text-gray-800 cursor-pointer text-2xl" />
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

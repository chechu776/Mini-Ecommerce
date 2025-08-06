import React from "react";
import { Link } from "react-router-dom";

const Admindashboard = () => {
  return (
    <div className="fixed top-0 left-0 h-screen bg-gray-900 text-white transition-all duration-500 w-20 hover:w-64 overflow-hidden z-50">
      <div className="h-20 flex items-center justify-center px-4">
        <img src="/ecom.png" alt="Logo" className="w-8" />
      </div>

      <ul className="flex flex-col h-[calc(100%-5rem)] relative px-4">
        <li className="py-6 hover:bg-white/10 rounded-md transition-all">
          <Link to="" className="flex items-center gap-6 text-lg font-semibold">
            <img src="" alt="Show Users" className="w-5" />
            <span className="whitespace-nowrap overflow-hidden">Show Users</span>
          </Link>
        </li>

        <li className="py-6 hover:bg-white/10 rounded-md transition-all">
          <Link to="/addcategory" className="flex items-center gap-6 text-lg font-semibold">
            <img src="" alt="Add Category" className="w-5" />
            <span className="whitespace-nowrap overflow-hidden">Add Category</span>
          </Link>
        </li>

        <li className="py-6 hover:bg-white/10 rounded-md transition-all">
          <Link to="" className="flex items-center gap-6 text-lg font-semibold">
            <img src="" alt="Add Product" className="w-5" />
            <span className="whitespace-nowrap overflow-hidden">Add Product</span>
          </Link>
        </li>

        <li className="py-6 hover:bg-white/10 rounded-md transition-all">
          <Link to="" className="flex items-center gap-6 text-lg font-semibold">
            <img src="" alt="Show Orders" className="w-5" />
            <span className="whitespace-nowrap overflow-hidden">Show Orders</span>
          </Link>
        </li>

        <li className="py-6 hover:bg-white/10 rounded-md transition-all absolute bottom-4 w-[calc(100%-2rem)]">
          <Link to="" className="flex items-center gap-6 text-lg font-semibold">
            <img src="" alt="Logout" className="w-5" />
            <span className="whitespace-nowrap overflow-hidden">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Admindashboard;

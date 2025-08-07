import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen group bg-gray-900 text-white transition-all duration-500 w-18 hover:w-64 overflow-hidden z-50">
      <div className="h-20 flex items-center justify-center px-4">
        <Link to="/admindashboard">
          <img src="/ecom.png" alt="Logo" className="w-8" />
        </Link>
      </div>

      <ul className="flex flex-col h-[calc(100%-5rem)] relative px-4">
        <Link to="/admin/showAllUsers" className="w-full">
          <li className="py-6 hover:bg-white/10 rounded-md transition-all flex items-center gap-6 text-lg font-semibold">
            <img src="/src/assets/users.png" alt="Users" className="w-5 h-5" />
            <span className="whitespace-nowrap overflow-hidden">Manage Users</span>
          </li>
        </Link>
        <Link to="/category/showAllCategory" className="w-full">
          <li className="py-6 hover:bg-white/10 rounded-md transition-all flex items-center gap-6 text-lg font-semibold">
            <img src="/src/assets/menu.png" alt="Categories" className="w-5 h-5" />
            <span className="whitespace-nowrap overflow-hidden">Manage Categories</span>
          </li>
        </Link>
        <Link to="/product/showAllProduct" className="w-full">
          <li className="py-6 hover:bg-white/10 rounded-md transition-all flex items-center gap-6 text-lg font-semibold">
            <img src="/src/assets/in-stock.png" alt="Products" className="w-5 h-5" />
            <span className="whitespace-nowrap overflow-hidden">Manage Products</span>
          </li>
        </Link>
        <Link to="/order/showAllOrders" className="w-full">
          <li className="py-6 hover:bg-white/10 rounded-md transition-all flex items-center gap-6 text-lg font-semibold">
            <img src="/src/assets/checkout.png" alt="Orders" className="w-5 h-5" />
            <span className="whitespace-nowrap overflow-hidden">Manage Orders</span>
          </li>
        </Link>
        <Link to="/admin/logout" className="w-full">
          <li className="py-6 hover:bg-white/10 rounded-md transition-all flex items-center gap-6 text-lg font-semibold absolute bottom-4 w-[calc(100%-2rem)]">
            <img src="/src/assets/logout.png" alt="Logout" className="w-5 h-5" />
            <span className="whitespace-nowrap overflow-hidden">Logout</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;

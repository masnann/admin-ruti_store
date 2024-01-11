// src/components/sidebar/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUsers, FiPackage ,FiCreditCard, FiShoppingBag, FiFileText } from 'react-icons/fi';

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`bg-gray-800 text-white h-screen ${
        isOpen ? "w-64" : "w-16"
      } p-4 transition-all fixed`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`mr-2 ${isOpen ? "block" : "hidden"}`}>
            <img
              src="src\assets\react.svg"
              alt="Logo"
              className="h-8 w-8 rounded-full"
            />
          </div>
          <h2 className={`text-2xl font-bold ${isOpen ? "block" : "hidden"}`}>
            RUTI STORE
          </h2>
        </div>
      </div>
      <ul className={`${isOpen ? "block" : "hidden"}`}>
        <li className="mb-2">
          <Link
            to="/"
            className="flex items-center text-blue-300 hover:text-blue-500 p-2 rounded-md transition-all"
          >
            <div className={`${isOpen ? "block" : "hidden"} w-5 h-5 mr-2`}>
              <FiHome className="h-5 w-5" />
            </div>
            {isOpen && <span className="text-sm">Dashboard</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/customer"
            className="flex items-center text-blue-300 hover:text-blue-500 p-2 rounded-md transition-all"
          >
            <div className={`${isOpen ? "block" : "hidden"} w-5 h-5 mr-2`}>
              <FiUsers className="h-5 w-5" />
            </div>
            {isOpen && <span className="text-sm">Customer</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/product"
            className="flex items-center text-blue-300 hover:text-blue-500 p-2 rounded-md transition-all"
          >
            <div className={`${isOpen ? "block" : "hidden"} w-5 h-5 mr-2`}>
              <FiPackage className="h-5 w-5" />
            </div>
            {isOpen && <span className="text-sm">Product</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/payment"
            className="flex items-center text-blue-300 hover:text-blue-500 p-2 rounded-md transition-all"
          >
            <div className={`${isOpen ? "block" : "hidden"} w-5 h-5 mr-2`}>
              <FiCreditCard className="h-5 w-5" />
            </div>
            {isOpen && <span className="text-sm">Payment</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/order"
            className="flex items-center text-blue-300 hover:text-blue-500 p-2 rounded-md transition-all"
          >
            <div className={`${isOpen ? "block" : "hidden"} w-5 h-5 mr-2`}>
              <FiShoppingBag className="h-5 w-5" />
            </div>
            {isOpen && <span className="text-sm">Order</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/blogpost"
            className="flex items-center text-blue-300 hover:text-blue-500 p-2 rounded-md transition-all"
          >
            <div className={`${isOpen ? "block" : "hidden"} w-5 h-5 mr-2`}>
              <FiFileText className="h-5 w-5" />
            </div>
            {isOpen && <span className="text-sm">Blog Post</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

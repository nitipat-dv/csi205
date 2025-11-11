import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ token, Logout, cartItemsCount }) => {
  function Active({ isActive }) {
    if (isActive) {
      return "px-3 py-1 rounded bg-blue-600 text-white flex items-center";
    } else {
      return "px-3 py-1 rounded bg-blue-100 text-black flex items-center hover:bg-blue-200 transition-colors";
    }
  }

  return (
    <nav className="bg-white p-2 border-y">
      <ul className="flex justify-center items-center space-x-3">
        <li>
          <NavLink to="/" className={Active}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/calculator" className={Active}>
            Calculator
          </NavLink>
        </li>
        <li>
          <NavLink to="/animation" className={Active}>
            Animation
          </NavLink>
        </li>
        <li>
          <NavLink to="/components" className={Active}>
            Components
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={Active}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={Active}>
            <div className="flex items-center gap-2">
              Cart
              {cartItemsCount > 0 && (
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {cartItemsCount}
                </span>
              )}
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/todos" className={Active}>
            Todos
          </NavLink> 
        </li>
        <button
          onClick={Logout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition duration-150 text-sm"
        >
          Logout
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
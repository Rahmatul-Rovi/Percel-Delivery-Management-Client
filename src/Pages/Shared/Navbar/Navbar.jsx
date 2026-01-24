import React from "react";
import { Link, NavLink } from "react-router";
import EdificeLogo from "../EdificeLogo/EdificeLogo";

const Navbar = () => {
  // Common NavItems with updated styling
  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-bold transition-all duration-300 px-4 py-2 rounded-lg ${
              isActive
                ? "bg-orange-600 text-white shadow-md shadow-orange-200"
                : "text-slate-600 hover:text-orange-600 hover:bg-orange-50"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/sendParcel"
          className={({ isActive }) =>
            `font-bold transition-all duration-300 px-4 py-2 rounded-lg ${
              isActive
                ? "bg-orange-600 text-white shadow-md shadow-orange-200"
                : "text-slate-600 hover:text-orange-600 hover:bg-orange-50"
            }`
          }
        >
          Send A Parcel
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            `font-bold transition-all duration-300 px-4 py-2 rounded-lg ${
              isActive
                ? "bg-orange-600 text-white shadow-md shadow-orange-200"
                : "text-slate-600 hover:text-orange-600 hover:bg-orange-50"
            }`
          }
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `font-bold transition-all duration-300 px-4 py-2 rounded-lg ${
              isActive
                ? "bg-orange-600 text-white shadow-md shadow-orange-200"
                : "text-slate-600 hover:text-orange-600 hover:bg-orange-50"
            }`
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    // Glassmorphism effect & Sticky Navbar
    <div className="navbar bg-white/80 backdrop-blur-md sticky top-0 z-[1000] px-4 md:px-8 border-b border-slate-100 shadow-sm">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-slate-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-2xl z-[1] mt-3 w-56 p-4 shadow-2xl border border-slate-100 space-y-2"
          >
            {navItems}
          </ul>
        </div>

        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <EdificeLogo />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navItems}</ul>
      </div>

      {/* Action Button */}
      <div className="navbar-end">
        <Link to="/login">
          <button className="btn bg-slate-900 hover:bg-orange-600 text-white border-none px-8 rounded-xl font-bold shadow-lg shadow-slate-200 transition-all duration-300 transform hover:scale-105 active:scale-95">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

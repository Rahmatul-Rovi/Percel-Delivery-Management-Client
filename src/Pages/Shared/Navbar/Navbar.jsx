import React from "react";
import { Link, NavLink } from "react-router";
import EdificeLogo from "../EdificeLogo/EdificeLogo";
import useAuth from "../../../Hooks/useAuth";


const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((error) => console.error(error));
  };

  // Resusable NavLink Style
  const navLinkStyles = ({ isActive }) =>
    `font-bold transition-all duration-300 px-4 py-2 rounded-xl flex items-center gap-2 ${
      isActive
        ? "bg-my-orange text-white shadow-lg shadow-orange-200 dark:shadow-none"
        : "text-slate-600 dark:text-slate-300 hover:text-my-orange hover:bg-orange-50 dark:hover:bg-slate-800"
    }`;

  const navItems = (
    <>
      <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
      <li><NavLink to="/sendParcel" className={navLinkStyles}>Send Parcel</NavLink></li>
      <li><NavLink to="/coverage" className={navLinkStyles}>Coverage</NavLink></li>
      {user?.email && (
        <li><NavLink to="/dashboard" className={navLinkStyles}>Dashboard</NavLink></li>
      )}
       <li><NavLink to="/beARider" className={navLinkStyles}>Be a Rider</NavLink></li>
      <li><NavLink to="/about" className={navLinkStyles}>About Us</NavLink></li>
         <li><NavLink to="/about" className={navLinkStyles}>Contact Us</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl sticky top-0 z-[1000] px-4 md:px-12 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-slate-700 dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white dark:bg-slate-900 rounded-2xl z-[1] mt-3 w-64 p-4 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-2">
            {navItems}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
          <EdificeLogo />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navItems}
        </ul>
      </div>

      {/* Profile/Login Action */}
      <div className="navbar-end gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
                <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Welcome</p>
                <p className="text-sm font-bold dark:text-white">{user?.displayName?.split(' ')[0]}</p>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar online border-2 border-my-orange rounded-full hover:scale-110 transition-transform">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL || "https://i.ibb.co/mJR9nkv/user.png"} alt="user" />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-4 shadow-2xl menu menu-sm dropdown-content bg-white dark:bg-slate-900 rounded-2xl w-52 border border-slate-100 dark:border-slate-800">
                <li className="mb-2 px-2 py-1 font-black text-slate-500 border-b dark:border-slate-800">{user?.displayName}</li>
                <li><button onClick={handleLogout} className="text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/20">Logout</button></li>
              </ul>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn bg-slate-900 dark:bg-my-orange hover:bg-my-orange dark:hover:bg-my-orange-dark text-white border-none px-8 rounded-xl font-black shadow-lg shadow-slate-200 dark:shadow-none transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase tracking-wider text-xs">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
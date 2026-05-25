import React from "react";
import { Outlet, Link } from "react-router"; // ✅ react-router-dom → react-router
import {
  Menu,
  Home,
  Package,
  Send,
  User,
  History,
  MapPin,
  Users,
  Clock,
  ShieldCheck,
  UserPlus,
  Truck,
  CheckCircle,
  MessageSquareQuote,
  BarChart3,
} from "lucide-react";
import useUserRole from "../Hooks/useUserRole";
import useAuth from "../Hooks/useAuth"; // ✅ useAuth যোগ

const DashBoardLayout = () => {
  const [role, isRoleLoading] = useUserRole();
  const { user } = useAuth(); // ✅ user নেওয়া হয়েছে

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col bg-slate-50">
        {/* --- 📱 Mobile Menu Bar --- */}
        <div className="w-full navbar bg-slate-900 lg:hidden text-white shadow-md">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <Menu size={24} />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-black italic text-orange-500 uppercase tracking-tighter">
            EdificeParcel
          </div>
          <div className="flex-none">
            <div className="avatar">
              <div className="w-8 rounded-full ring ring-orange-500 ring-offset-base-100">
                {/* ✅ placeholder সরিয়ে real user photo */}
                <img
                  src={user?.photoURL || "https://i.ibb.co/mJR9nkv/user.png"}
                  alt={user?.displayName || "profile"}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- 🚀 Main Page Content --- */}
        <div className="p-4 md:p-10 flex-grow">
          <Outlet />
        </div>
      </div>

      {/* --- 📋 Sidebar --- */}
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu p-6 w-80 min-h-full bg-slate-900 text-slate-300">
          {/* Sidebar Header */}
          <div className="mb-10 px-4">
            <h2 className="text-3xl font-black italic text-orange-600 tracking-tighter uppercase">
              Edifice<span className="text-white">Parcel</span>
            </h2>
            <div className="h-1 w-20 bg-orange-600 mt-1 rounded-full"></div>
          </div>

          {/* ✅ Sidebar এ user info যোগ */}
          <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-slate-800 rounded-xl">
            <img
              src={user?.photoURL || "https://i.ibb.co/mJR9nkv/user.png"}
              alt={user?.displayName || "profile"}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-500"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>

          {/* User Panel */}
          <p className="text-xs font-bold text-slate-500 uppercase mb-4 px-4 tracking-widest">
            User Panel
          </p>

          <li className="mb-2">
            <Link
              to="/sendParcel"
              className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
            >
              <Send size={20} /> Send New Parcel
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/myParcels"
              className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
            >
              <Package size={20} /> My Parcels
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/paymentHistory"
              className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
            >
              <History size={20} /> Payment History
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/dashboard/track"
              className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
            >
              <MapPin size={20} /> Track A Package
            </Link>
          </li>

          {/* Rider Links */}
          {!isRoleLoading && role?.toLowerCase() === "rider" && (
            <>
              <p className="text-xs font-bold text-slate-500 uppercase mb-4 px-4 tracking-widest">
                Rider Panel
              </p>
              <li className="mb-2">
                <Link
                  to="/dashboard/pendingDeliveries"
                  className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
                >
                  <Truck size={20} /> Pending Deliveries
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/completedDeliveries"
                  className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
                >
                  <CheckCircle size={20} /> Completed Deliveries
                </Link>
              </li>
              <li className="mb-6">
                <Link
                  to="/dashboard/my-reviews"
                  className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
                >
                  <MessageSquareQuote size={20} /> My Reviews
                </Link>
              </li>
            </>
          )}

          {/* Admin Links */}
          {!isRoleLoading && role?.toLowerCase() === "admin" && (
            <>
              <p className="text-xs font-bold text-slate-500 uppercase mb-4 px-4 tracking-widest">
                Admin Panel
              </p>
              <li className="mb-2">
                <Link
                  to="/dashboard/assignRider"
                  className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
                >
                  <UserPlus size={20} /> Assign Rider
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/activeRiders"
                  className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
                >
                  <Users size={20} /> Active Riders
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/pendingRiders"
                  className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
                >
                  <Clock size={20} /> Pending Riders
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/adminStatistics"
                  className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
                >
                  <BarChart3 size={20} /> Statistics
                </Link>
              </li>
              <li className="mb-6">
                <Link
                  to="/dashboard/makeAdmin"
                  className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
                >
                  <ShieldCheck size={20} /> Make Admin
                </Link>
              </li>
            </>
          )}

          <li className="mb-2">
            <Link
              to="/dashboard/myProfile"
              className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
            >
              <User size={20} /> My Profile
            </Link>
          </li>

          <div className="divider before:bg-slate-700 after:bg-slate-700"></div>

          <li>
            <Link
              to="/"
              className="flex items-center gap-3 py-3 px-4 hover:bg-slate-800 rounded-xl transition-all font-bold"
            >
              <Home size={20} /> Back to Home
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
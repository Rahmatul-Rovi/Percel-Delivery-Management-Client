import React from "react";
import { Outlet, Link } from "react-router-dom";
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
} from "lucide-react";
import useUserRole from "../Hooks/useUserRole";

const DashBoardLayout = () => {
  const [role, isRoleLoading] = useUserRole();
  console.log(role);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col bg-slate-50">
        {/* --- 📱 Mobile Menu Bar Start --- */}
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
            {/* Mobile e navbar e jodi kono choto menu ba profile pic rakhte chao */}
            <div className="avatar">
              <div className="w-8 rounded-full ring ring-orange-500 ring-offset-base-100">
                <img src="https://via.placeholder.com/150" alt="profile" />
              </div>
            </div>
          </div>
        </div>
        {/* --- 📱 Mobile Menu Bar End --- */}

        {/* --- 🚀 Main Page Content --- */}
        <div className="p-4 md:p-10 flex-grow">
          <Outlet />
        </div>
      </div>

      {/* --- 📋 Sidebar Section --- */}
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu p-6 w-80 min-h-full bg-slate-900 text-slate-300">
          {/* Sidebar Header (Logo) */}
          <div className="mb-10 px-4">
            <h2 className="text-3xl font-black italic text-orange-600 tracking-tighter uppercase">
              Edifice<span className="text-white">Parcel</span>
            </h2>
            <div className="h-1 w-20 bg-orange-600 mt-1 rounded-full"></div>
          </div>

          {/* Navigation Items */}
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

          {/* Payment History Link */}
          <li className="mb-6">
            <Link
              to="/dashboard/paymentHistory"
              className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
            >
              <History size={20} /> Payment History
            </Link>
          </li>

          {/* Track A Package Link */}
          <li className="mb-6">
            <Link
              to="/dashboard/track"
              className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
            >
              <MapPin size={20} /> Track A Package
            </Link>
          </li>
          {/* {Riders Links} */}
          {!isRoleLoading && role?.toLowerCase() === "rider" && (
            <>
              {/* My Deliveries Link for Rider */}
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
                  <CheckCircle size={20} /> My Completed Deliveries
                </Link>
              </li>
            </>
          )}

          {/* {Admins Links} */}
          {!isRoleLoading && role?.toLowerCase() === "admin" && (
            <>
              <li className="mb-2">
                <Link
                  to="/dashboard/assignRider"
                  className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
                >
                  <UserPlus size={20} /> Assign Rider
                </Link>
              </li>
              {/* Active Riders Link */}
              <li className="mb-2">
                <Link
                  to="/dashboard/activeRiders"
                  className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
                >
                  <Users size={20} /> Active Riders
                </Link>
              </li>

              {/* Pending Riders Link */}
              <li className="mb-2">
                <Link
                  to="/dashboard/pendingRiders"
                  className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
                >
                  <Clock size={20} /> Pending Riders
                </Link>
              </li>

              {/* Admin Panel Link */}
              <li className="mb-2">
                <Link
                  to="/dashboard/makeAdmin"
                  className="flex items-center gap-3 py-3 px-4 hover:bg-orange-600 hover:text-white rounded-xl transition-all font-bold"
                >
                  <ShieldCheck size={20} /> Make Admin
                </Link>
              </li>
            </>
          )}

          <li className="mb-6">
            <Link
              to="/dashboard/profile"
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

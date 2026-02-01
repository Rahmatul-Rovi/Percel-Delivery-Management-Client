import { useQuery } from "@tanstack/react-query";
import React from "react";


import {
  Eye,
  CreditCard,
  Trash2,
  Calendar,
  Package,
  Loader2,
} from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useAuth from "../../../Hooks/UseAuth";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 1. refetch-ke destructure koro
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  // 2. Delete Handler (Eita ekhon kaj korbe)
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this parcel booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, cancel it!",
      background: "#ffffff",
      color: "#0f172a",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/parcels/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              // Data delete hoye gele table auto-refresh hobe
              refetch();

              Swal.fire({
                title: "Cancelled!",
                text: "Your parcel booking has been deleted.",
                icon: "success",
                confirmButtonColor: "#ea580c",
                background: "#ffffff",
              });
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-orange-600 mb-2" size={40} />
        <p className="text-slate-500 font-bold">Loading your parcels...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-4 pt-6">
        <h2 className="text-3xl font-black text-slate-800 italic uppercase">
          My <span className="text-orange-600">Parcels</span>
        </h2>
        <div className="badge badge-lg bg-slate-900 text-white p-4 font-bold">
          Total: {parcels.length}
        </div>
      </div>

      <div className="w-full bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead className="bg-slate-50">
              <tr className="text-slate-500 uppercase text-xs font-black tracking-widest border-b border-slate-100">
                <th className="py-6 px-6 text-center">#</th>
                <th>Parcel Type</th>
                <th>Created At</th>
                <th>Cost</th>
                <th>Payment</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {parcels.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="text-center font-bold text-slate-400">
                    {index + 1}
                  </td>

                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${parcel.type === "document" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"}`}
                      >
                        <Package size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">
                          {parcel.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                          ID: {parcel.trackingId}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <Calendar size={14} className="text-slate-400" />
                      {parcel.creationDate.split(",")[0]}
                    </div>
                  </td>

                  <td>
                    <span className="font-black text-slate-900">
                      ৳{parcel.deliveryCost}
                    </span>
                  </td>

                  <td>
                    <div
                      className={`badge badge-md font-black border-none py-3 px-4 ${
                        parcel.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {parcel.paymentStatus}
                    </div>
                  </td>

                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="btn btn-square btn-sm bg-slate-100 border-none text-slate-600 hover:bg-slate-200"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>

                      <Link to={`/dashboard/payment/${parcel._id}`}>
                        <button
                          disabled={parcel.paymentStatus === "Paid"}
                          className="btn btn-square btn-sm bg-orange-100 border-none text-orange-600 hover:bg-orange-600 hover:text-white disabled:bg-slate-100 disabled:text-slate-300"
                          title="Pay"
                        >
                          <CreditCard size={16} />
                        </button>
                      </Link>

                      {/* 🚀 Fix: Eikhane onClick add korlam */}
                      <button
                        onClick={() => handleDelete(parcel._id)}
                        className="btn btn-square btn-sm bg-red-50 border-none text-red-500 hover:bg-red-500 hover:text-white"
                        title="Cancel"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyParcels;

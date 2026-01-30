import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { Eye, CheckCircle, XCircle, Loader2 } from "lucide-react";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  // 1. Fetching Pending Riders
  const { data: riders = [], isLoading, refetch } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  // 2. Approve Rider Function
  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This rider will be activated!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/riders/approve/${id}`);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire("Approved!", "Rider is now active.", "success");
        }
      }
    });
  };

  // 3. Reject/Cancel Function
  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Application?",
      text: "You won't be able to revert this!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Reject",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/riders/reject/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Rejected", "Application has been removed.", "info");
        }
      }
    });
  };

  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-600" size={48} /></div>;

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-slate-800 mb-8 uppercase italic tracking-tighter">
          Pending <span className="text-orange-600">Applications</span>
        </h2>

        {/* Table Container */}
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-xs uppercase tracking-widest">
                <th className="p-5">Rider Name</th>
                <th className="p-5">Location</th>
                <th className="p-5">Bike Brand</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {riders.map((rider) => (
                <tr key={rider._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="p-5">
                    <div className="font-bold">{rider.name}</div>
                    <div className="text-xs text-slate-400">{rider.email}</div>
                  </td>
                  <td className="p-5">
                    <div className="text-sm font-semibold">{rider.district}</div>
                    <div className="text-[10px] text-slate-400">{rider.region}</div>
                  </td>
                  <td className="p-5">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-black italic">
                      {rider.bikeBrand}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => setSelectedRider(rider)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => handleApprove(rider._id)} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm">
                        <CheckCircle size={18} />
                      </button>
                      <button onClick={() => handleReject(rider._id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm">
                        <XCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {riders.length === 0 && <p className="p-10 text-center text-slate-400 font-bold">No pending applications found.</p>}
        </div>
      </div>

      {/* --- View Details Modal --- */}
      {selectedRider && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button onClick={() => setSelectedRider(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 font-bold">✕</button>
            
            <h3 className="text-2xl font-black text-slate-800 mb-6 uppercase italic">Rider <span className="text-orange-600">Details</span></h3>
            
            <div className="space-y-4 text-slate-700">
              <div className="flex justify-between border-b pb-2">
                <span className="text-xs font-black text-slate-400 uppercase">Age</span>
                <span className="font-bold">{selectedRider.age} Years</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-xs font-black text-slate-400 uppercase">Phone</span>
                <span className="font-bold">{selectedRider.phone}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-xs font-black text-slate-400 uppercase">NID Number</span>
                <span className="font-bold tracking-widest">{selectedRider.nid}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-xs font-black text-slate-400 uppercase">Bike Reg.</span>
                <span className="font-bold text-orange-600">{selectedRider.bikeReg}</span>
              </div>
              <div className="pt-2">
                <span className="text-xs font-black text-slate-400 uppercase block mb-1">Additional Info</span>
                <p className="bg-slate-50 p-4 rounded-xl text-sm italic">"{selectedRider.extraInfo || 'No info provided'}"</p>
              </div>
            </div>

            <button onClick={() => setSelectedRider(null)} className="w-full mt-8 bg-slate-900 text-white p-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all">
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
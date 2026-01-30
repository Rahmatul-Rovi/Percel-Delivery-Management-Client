import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { Search, UserMinus, ShieldCheck, Loader2, MapPin, Phone } from "lucide-react";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Fetching Active Riders
  const { data: riders = [], isLoading, refetch } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  // 2. Deactivate Rider Function
  const handleDeactivate = (id) => {
    Swal.fire({
      title: "Deactivate Rider?",
      text: "This rider will no longer be able to accept orders!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#475569",
      confirmButtonText: "Yes, Deactivate",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/riders/deactivate/${id}`);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire("Deactivated!", "Rider has been moved to pending/inactive.", "success");
        }
      }
    });
  };

  // 3. Client-side Search Logic
  const filteredRiders = riders.filter(rider =>
    rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rider.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-600" size={48} /></div>;

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter">
              Active <span className="text-orange-600">Riders</span>
            </h2>
            <p className="text-slate-500 text-sm font-medium">Manage your verified delivery fleet</p>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl w-full md:w-80 shadow-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold text-slate-700"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Riders Table */}
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-[10px] uppercase tracking-[0.2em]">
                  <th className="p-6">Rider Identity</th>
                  <th className="p-6">Contact & Area</th>
                  <th className="p-6">Vehicle Info</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {filteredRiders.map((rider) => (
                  <tr key={rider._id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-black">
                          {rider.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-black text-slate-800">{rider.name}</div>
                          <div className="text-xs text-slate-400">{rider.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                        <Phone size={14} className="text-slate-400" /> {rider.phone}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1 font-bold">
                        <MapPin size={12} /> {rider.district}, {rider.region}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="text-xs font-black uppercase tracking-tight text-slate-800">{rider.bikeBrand}</div>
                      <div className="text-[10px] font-bold text-orange-500">{rider.bikeReg}</div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-1.5 text-green-600 font-black text-[10px] uppercase">
                        <ShieldCheck size={14} /> Verified
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDeactivate(rider._id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all font-bold text-xs shadow-sm"
                        >
                          <UserMinus size={16} /> Deactivate
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredRiders.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-slate-400 font-bold italic">No active riders found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveRiders;
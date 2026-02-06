import React, { useState } from "react";
import { useParams } from "react-router";
import { Search, MapPin, Package, Clock, CheckCircle2, Navigation } from "lucide-react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TrackParcel = () => {
  const { id } = useParams();
  const [searchId, setSearchId] = useState(id || "");
  const axiosSecure = useAxiosSecure();

  const { data: trackingDetails, isLoading, refetch, isError } = useQuery({
    queryKey: ["track", searchId],
    enabled: !!searchId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/track-parcel/${searchId}`);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) refetch();
  };

  return (
    <div className="p-4 md:p-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black italic tracking-tighter text-slate-800 uppercase">
            Track Your <span className="text-orange-600">Package</span>
          </h2>
          <p className="text-slate-500 font-medium mt-2">Enter your tracking ID for real-time updates</p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="relative mb-12">
          <input
            type="text"
            placeholder="Enter Tracking ID (e.g. TRK-123456)"
            className="w-full p-6 pl-14 rounded-[2rem] shadow-2xl shadow-slate-200 border-none focus:ring-2 focus:ring-orange-500 text-lg font-bold text-slate-700 outline-none transition-all"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-slate-900 text-white px-8 py-3 rounded-full font-black transition-all uppercase text-sm">
            Track Now
          </button>
        </form>

        {isLoading && <div className="text-center py-10"><span className="loading loading-spinner loading-lg text-orange-600"></span></div>}

        {isError && (
          <div className="bg-red-50 text-red-600 p-6 rounded-3xl text-center font-bold border border-red-100 uppercase tracking-widest">
            Parcel Not Found! Please check the ID.
          </div>
        )}

        {trackingDetails && (
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden p-8 md:p-12">
            
            {/* Summary Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-slate-100 gap-4">
               <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Tracking ID</p>
                  <h3 className="text-2xl font-black text-slate-800">{trackingDetails.trackingId}</h3>
               </div>
               <div className="bg-orange-50 text-orange-600 px-6 py-2 rounded-full font-black text-xs uppercase border border-orange-100 flex items-center gap-2">
                  <Navigation size={14} /> {trackingDetails.deliveryStatus || "Processing"}
               </div>
            </div>

            {/* Timeline View */}
            <div className="relative space-y-12">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-100"></div>

              {/* trackingHistory is mapping */}
              {[...(trackingDetails.trackingHistory || [])].reverse().map((update, index) => (
                <div key={index} className="relative pl-12 animate-in fade-in slide-in-from-left-4 duration-500">
                  {/* Dot */}
                  <div className={`absolute left-0 top-1 w-8 h-8 rounded-full border-4 border-white shadow-md flex items-center justify-center ${index === 0 ? 'bg-orange-600 animate-pulse' : 'bg-green-500'}`}>
                    {index === 0 ? <Package size={14} className="text-white" /> : <CheckCircle2 size={14} className="text-white" />}
                  </div>
                  
                  {/* Content */}
                  <div>
                    <p className={`text-lg font-black ${index === 0 ? 'text-slate-800' : 'text-slate-500'}`}>
                      {update.status}
                    </p>
                    <p className="text-slate-400 text-xs font-bold mt-1 uppercase">
                      {update.time}
                    </p>
                    {update.message && (
                      <p className="mt-2 text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 inline-block text-sm leading-relaxed">
                        {update.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
               <div className="text-sm text-slate-400 font-bold italic">
                 Route: {trackingDetails.senderDistrict} → {trackingDetails.receiverDistrict}
               </div>
               <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-6 py-3 rounded-2xl">
                 <CheckCircle2 size={18} />
                 <span>Verified Delivery System</span>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackParcel;
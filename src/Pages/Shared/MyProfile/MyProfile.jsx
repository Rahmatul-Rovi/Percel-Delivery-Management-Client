import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { Package, Mail, Shield } from "lucide-react";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ডাটাবেস থেকে ইউজারের এক্সট্রা তথ্য আনা
  const { data: stats = {} } = useQuery({
    queryKey: ["user-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats/${user?.email}`);
      return res.data;
    },
  });

  // ফায়ারবেস থেকে ছবি না পাওয়া গেলে এই লিংকটা কাজ করবে
  const defaultImage = "https://i.ibb.co/mJR9nkv/user.png";

  return (
    <div className="p-4 md:p-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
          <div className="h-32 bg-orange-500"></div>
          
          <div className="px-8 pb-8 text-left">
            <div className="relative -mt-16 mb-6 flex flex-col md:flex-row items-end gap-6">
              {/* ইমেজ ট্যাগটি এখানে ফিক্স করা হয়েছে */}
              <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl">
                <img 
                  src={user?.photoURL || defaultImage} 
                  referrerPolicy="no-referrer" // গুগল ইমেজ লোড করার জন্য এটি জরুরি
                  className="w-40 h-40 rounded-[2rem] object-cover"
                  alt="Profile"
                  onError={(e) => { e.target.src = defaultImage }} // ইমেজ এরর দিলে ডিফল্ট শো করবে
                />
              </div>
              
              <div className="pb-4">
                <h2 className="text-4xl font-black text-slate-800">{user?.displayName}</h2>
                <div className="mt-2">
                  <span className="px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase tracking-widest">
                    Verified User
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center gap-5">
                <div className="p-4 bg-orange-500 text-white rounded-2xl shadow-lg">
                  <Package size={28} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Total Parcels Sent</p>
                  <h4 className="text-3xl font-black text-slate-800">{stats.totalBookings || 0}</h4>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col justify-center gap-2">
                <div className="flex items-center gap-3">
                    <Mail size={18} className="text-orange-500" />
                    <p className="text-sm font-bold text-slate-700">{user?.email}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Shield size={18} className="text-orange-500" />
                    <p className="text-sm font-bold text-slate-500">Account Managed by Google</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
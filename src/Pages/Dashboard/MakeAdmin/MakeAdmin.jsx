import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import {
  Search,
  ShieldCheck,
  ShieldAlert,
  User,
  Mail,
  Loader2,
} from "lucide-react";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [searchEmail, setSearchEmail] = useState(""); // Input value
  const [debouncedEmail, setDebouncedEmail] = useState(""); // Delayed value for search
  const [selectedUser, setSelectedUser] = useState(null); // The final user to manage

  // 1. Debouncing Logic: Typing থামালে ৫০০ মিলি-সেকেন্ড পর সার্চ ট্রিগার হবে
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedEmail(searchEmail);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchEmail]);

  // 2. Query to Fetch User Suggestions/Data using queryFn
  const { data: suggestions = [], isLoading } = useQuery({
    queryKey: ["searchUser", debouncedEmail],
    queryFn: async () => {
      if (!debouncedEmail) return [];
      // Partial match er jonno server api call
      const res = await axiosSecure.get(
        `/users/search-suggestions?email=${debouncedEmail}`,
      );
      return res.data;
    },
    enabled: !!debouncedEmail,
  });

  const queryClient = useQueryClient();
  // 3. Mutation for Updating Role
  const roleMutation = useMutation({
    mutationFn: async ({ id, newRole }) => {
      const res = await axiosSecure.patch(`/users/role/${id}`, {
        role: newRole,
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      // Update local state to reflect new role immediately
      setSelectedUser((prev) => ({ ...prev, role: variables.newRole }));
      Swal.fire("Updated!", `User is now an ${variables.newRole}.`, "success");
    },
    onError: () => {
      Swal.fire("Error", "Action failed. Try again.", "error");
    },
  });

  const handleToggleAdmin = (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    Swal.fire({
      title: "Change Role?",
      text: `Are you sure you want to make this user a ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      confirmButtonText: "Yes, Change!",
    }).then((result) => {
      if (result.isConfirmed) {
        roleMutation.mutate({ id, newRole });
      }
    });
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-black text-slate-800 mb-8 uppercase italic tracking-tighter">
          Make <span className="text-orange-600">Admin</span>
        </h2>

        {/* Real-time Search Input */}
        <div className="relative mb-12">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="email"
              placeholder="Start typing email to search"
              className="w-full p-5 pl-12 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-[2rem] font-bold focus:border-orange-500 outline-none shadow-xl transition-all text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
            {isLoading && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                <Loader2 className="animate-spin text-orange-500" size={20} />
              </div>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && !selectedUser && (
            <div className="absolute top-full left-0 w-full bg-white mt-3 rounded-3xl shadow-2xl border border-slate-50 z-50 overflow-hidden">
              {suggestions.map((user) => (
                <div
                  key={user._id}
                  onClick={() => {
                    setSelectedUser(user);
                    setSearchEmail(user.email);
                  }}
                  className="p-5 hover:bg-orange-50 cursor-pointer flex items-center justify-between border-b last:border-0 border-slate-50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-orange-400" />
                    <div>
                      <p className="font-black text-slate-800 text-sm">
                        {user.email}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">
                        {user.name}
                      </p>
                    </div>
                  </div>
                  <span className="text-[9px] bg-slate-100 px-2 py-1 rounded-md font-black text-slate-400 uppercase">
                    {user.role || "user"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected User Management Card */}
        {selectedUser && (
          <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-50 p-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="h-24 w-24 bg-slate-900 text-white rounded-full flex items-center justify-center text-3xl font-black shadow-lg">
                {selectedUser.name?.charAt(0)}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-black text-slate-800 mb-1">
                  {selectedUser.name}
                </h3>
                <p className="text-slate-500 font-bold flex items-center justify-center md:justify-start gap-2">
                  <Mail size={16} /> {selectedUser.email}
                </p>
                <div className="mt-4">
                  <span
                    className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                      selectedUser.role === "admin"
                        ? "bg-orange-600 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {selectedUser.role || "user"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() =>
                    handleToggleAdmin(selectedUser._id, selectedUser.role)
                  }
                  disabled={roleMutation.isPending}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-xs transition-all ${
                    selectedUser.role === "admin"
                      ? "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                      : "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  {roleMutation.isPending ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : selectedUser.role === "admin" ? (
                    <>
                      <ShieldAlert size={18} /> Remove Admin
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} /> Make Admin
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setSelectedUser(null);
                    setSearchEmail("");
                  }}
                  className="text-[10px] font-black uppercase text-slate-400 hover:text-orange-600 transition-colors"
                >
                  Cancel & Search Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MakeAdmin;

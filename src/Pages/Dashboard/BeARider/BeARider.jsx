import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { User, Mail, Phone, CreditCard, Bike, MapPin, Send } from "lucide-react";

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  // 🔹 সার্ভিস সেন্টার ডাটা (আপনার দেওয়া লজিক অনুযায়ী)
  const serviceCenters = [
    { region: "Dhaka", districts: ["Dhaka North", "Dhaka South", "Gazipur", "Narayanganj"] },
    { region: "Chattogram", districts: ["Chattogram City", "Cox's Bazar", "Cumilla", "Noakhali"] },
    { region: "Rajshahi", districts: ["Rajshahi City", "Bogura", "Pabna", "Natore"] },
    { region: "Sylhet", districts: ["Sylhet City", "Moulvibazar", "Habiganj", "Sunamganj"] },
    { region: "Khulna", districts: ["Khulna City", "Jashore", "Kushtia", "Satkhira"] },
  ];

  const selectedRegion = watch("region");
  const availableDistricts = serviceCenters.find(c => c.region === selectedRegion)?.districts || [];

  const onSubmit = async (data) => {
    const riderApplication = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      status: "pending",
      appliedDate: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/rider-applications", riderApplication);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Application Submitted!",
          text: "Your rider application is now pending for review.",
          icon: "success",
          confirmButtonColor: "#ea580c",
        });
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="p-4 md:p-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black italic tracking-tighter text-slate-800 uppercase">
            Become A <span className="text-orange-600">Rider</span>
          </h2>
          <p className="text-slate-500 font-medium mt-2">Join our fleet and start earning today</p>
        </div>

        {/* Fixed White Form Container */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Row 1: Read-only Identity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    type="text"
                    defaultValue={user?.displayName}
                    readOnly
                    className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 font-bold outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    type="email"
                    defaultValue={user?.email}
                    readOnly
                    className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 font-bold outline-none cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Age & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 text-slate-600">Age</label>
                <input
                  type="number"
                  {...register("age", { required: true, min: 18 })}
                  placeholder="Enter your age"
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-800 font-bold focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                />
                {errors.age && <p className="text-red-500 text-xs font-bold ml-1">Minimum age is 18</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 text-slate-600">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="tel"
                    {...register("phone", { required: true })}
                    placeholder="017XXXXXXXX"
                    className="w-full p-4 pl-12 bg-white border border-slate-200 rounded-2xl text-slate-800 font-bold focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Region & District (Connected Fields) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 text-slate-600">Select Region</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select
                    {...register("region", { required: true })}
                    className="w-full p-4 pl-12 bg-white border border-slate-200 rounded-2xl text-slate-800 font-bold focus:ring-2 focus:ring-orange-500 outline-none appearance-none"
                  >
                    <option value="">Select Region</option>
                    {serviceCenters.map(c => <option key={c.region} value={c.region}>{c.region}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 text-slate-600">Select District</label>
                <select
                  {...register("district", { required: true })}
                  disabled={!selectedRegion}
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-800 font-bold focus:ring-2 focus:ring-orange-500 outline-none disabled:bg-slate-50 disabled:text-slate-300"
                >
                  <option value="">Select District</option>
                  {availableDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            {/* Row 4: NID & Bike Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 text-slate-600">NID Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    {...register("nid", { required: true })}
                    placeholder="Enter NID Number"
                    className="w-full p-4 pl-12 bg-white border border-slate-200 rounded-2xl text-slate-800 font-bold focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 text-slate-600">Bike Brand</label>
                <div className="relative">
                  <Bike className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    {...register("bikeBrand", { required: true })}
                    placeholder="e.g. Yamaha, Honda"
                    className="w-full p-4 pl-12 bg-white border border-slate-200 rounded-2xl text-slate-800 font-bold focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Row 5: Bike Reg & Others */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 text-slate-600">Bike Reg Number</label>
                <input
                  type="text"
                  {...register("bikeReg", { required: true })}
                  placeholder="Dhaka Metro-LA-XX-XXXX"
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-800 font-bold focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 text-slate-600">Additional Info</label>
                <input
                  type="text"
                  {...register("extraInfo")}
                  placeholder="Experience or references"
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-800 font-bold focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-orange-600 text-white p-6 rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] shadow-xl shadow-slate-200"
              >
                <Send size={20} />
                Submit Application
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default BeARider;
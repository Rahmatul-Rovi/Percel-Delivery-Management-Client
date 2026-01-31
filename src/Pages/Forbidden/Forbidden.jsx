import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, Home, ArrowLeft, LockKeyhole } from "lucide-react";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Animated Icon Section */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-red-100 blur-3xl rounded-full opacity-50 animate-pulse"></div>
          <div className="relative bg-white p-8 rounded-[3rem] shadow-2xl border border-red-50">
            <ShieldAlert size={80} className="text-red-500" strokeWidth={1.5} />
            <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-3 rounded-2xl shadow-lg">
              <LockKeyhole size={20} />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">
          Access <span className="text-red-600">Denied</span>
        </h1>
        
        <p className="text-slate-500 font-bold mb-10 leading-relaxed">
          Whoops! It looks like you've stumbled into a restricted area. 
          You don't have the <span className="text-slate-900 underline decoration-red-500 decoration-2">required permissions</span> to view this page.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-black uppercase text-xs hover:bg-slate-50 transition-all active:scale-95"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs hover:bg-orange-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            <Home size={18} /> Back to Home
          </button>
        </div>

        {/* Subtle Footer Note */}
        <p className="mt-12 text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">
          Error 403 • Restricted Area
        </p>
      </div>
    </div>
  );
};

export default Forbidden;
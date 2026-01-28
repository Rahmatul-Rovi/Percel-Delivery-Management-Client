import React from "react";
import useAuth from "../../../Hooks/UseAuth";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure"; 
import Swal from "sweetalert2";

const SocilaLogin = () => {
    const { signInWithGoogle } = useAuth();
    const axiosSecure = useAxiosSecure(); 
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = async () => {
        try {
            // ১. গুগল দিয়ে সাইন ইন
            const result = await signInWithGoogle();
            const user = result.user;

            // ২. ডাটাবেসের জন্য ইউজার অবজেক্ট তৈরি
            const userInfo = {
                email: user?.email,
                name: user?.displayName,
                image: user?.photoURL,
                role: 'user', // ডিফল্ট রোল
                lastLogin: new Date().toISOString()
            };

            // ৩. ডাটাবেসে ইউজার সেভ করা (Upsert লজিক ব্যাকএন্ডে হ্যান্ডেল করা ভালো)
            const res = await axiosSecure.post('/users', userInfo);
            
            if (res.data) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Welcome, ${user?.displayName}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                // সাকসেস হলে কাঙ্ক্ষিত পেজে নিয়ে যাবে
                navigate(from, { replace: true });
            }
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.message || "Something went wrong during Google sign-in."
            });
        }
    };

    return (
        <div className="w-full">
            <button 
                onClick={handleGoogleSignIn} 
                className="btn btn-outline w-full flex items-center justify-center gap-3 border-slate-200 hover:bg-slate-900 hover:text-white transition-all duration-300 font-bold rounded-xl py-3"
            >
                <img 
                    className="w-5 h-5" 
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                    alt="google" 
                />
                <span className="tracking-tight">Continue with Google</span>
            </button>
        </div>
    );
};

export default SocilaLogin;
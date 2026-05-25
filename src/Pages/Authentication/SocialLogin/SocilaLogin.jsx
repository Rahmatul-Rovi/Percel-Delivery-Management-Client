import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios"; // ✅ FIX: axiosSecure → useAxios (public)
import Swal from "sweetalert2";

const SocilaLogin = () => {
    const { signInWithGoogle } = useAuth();
    const axiosInstance = useAxios(); // ✅ token নেই এখনো, তাই public axios
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;

            const userInfo = {
                email: user?.email,
                name: user?.displayName,
                image: user?.photoURL,
                role: 'user',
                lastLogin: new Date().toISOString()
            };

            const res = await axiosInstance.post('/users', userInfo);

            if (res.data) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Welcome, ${user?.displayName}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            }
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.message || "Something went wrong."
            });
        }
    };

    return (
        <div className="w-full">
            <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline w-full flex items-center justify-center gap-3 border-slate-200 hover:bg-slate-900 hover:text-white transition-all duration-300 font-bold rounded-xl py-3"
            >
                <img className="w-5 h-5" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="google" />
                <span className="tracking-tight">Continue with Google</span>
            </button>
        </div>
    );
};

export default SocilaLogin;
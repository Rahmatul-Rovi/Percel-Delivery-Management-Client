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

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;

                // User info create kora database er jonno
                const userInfo = {
                    email: user?.email,
                    name: user?.displayName,
                    image: user?.photoURL,
                    role: 'user'
                };

                // Database e user data pathano
                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Welcome, ${user?.displayName}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: error.message
                });
            });
    }

    return (
        <div className="w-full">
            <button 
                onClick={handleGoogleSignIn} 
                className="btn btn-outline w-full flex items-center gap-3 border-slate-200 hover:bg-slate-900 hover:text-white transition-all duration-300 font-bold rounded-xl"
            >
                <img 
  className="w-5 h-5" 
  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
  alt="google" 
/>
                Continue with Google
            </button>
        </div>
    );
};

export default SocilaLogin;
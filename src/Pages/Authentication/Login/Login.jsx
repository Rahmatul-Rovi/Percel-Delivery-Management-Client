import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocilaLogin from "../SocialLogin/SocilaLogin";
import useAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // 🚀 Safe Redirect Path: 
  // Jodi state-er bhitore 'from' object thake, tobe tar 'pathname' e jabe, nahole home-e jabe.
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Welcome back, ${user?.displayName || "User"}!`,
          showConfirmButton: false,
          timer: 1500,
        });

        // ✅ User-ke tar target page-e niye jabe
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl border border-slate-100">
        <div className="card-body">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-black italic text-slate-800 uppercase">
              Welcome <span className="text-orange-600">Back</span>
            </h1>
            <p className="text-slate-400 text-sm mt-2 font-bold uppercase tracking-widest">
              Please enter your details
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label font-bold text-slate-600">Email Address</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered focus:border-orange-500 w-full rounded-xl"
                placeholder="Enter Your Email"
              />
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
            </div>

            <div className="form-control">
              <label className="label font-bold text-slate-600">Password</label>
              <input
                type="password"
                {...register("password", { 
                    required: "Password is required", 
                    minLength: { value: 6, message: "Must be at least 6 characters" } 
                })}
                className="input input-bordered focus:border-orange-500 w-full rounded-xl"
                placeholder="Enter Your Password"
              />
              {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs font-bold text-orange-600 hover:underline">
                Forgot password?
              </button>
            </div>

            <button className="btn bg-slate-900 hover:bg-orange-600 text-white w-full border-none rounded-xl font-bold uppercase tracking-wider mt-4">
              Login
            </button>
          </form>

          <div className="divider text-slate-400 text-xs font-bold uppercase tracking-widest my-6">OR LOGIN WITH</div>
          
          <SocilaLogin />

          <p className="text-center mt-6 text-slate-500 font-medium text-sm">
            Don't have an account?{" "}
            <Link className="text-orange-600 font-black hover:underline" to="/register">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
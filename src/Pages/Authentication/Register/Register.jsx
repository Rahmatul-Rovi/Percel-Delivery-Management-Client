import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import SocilaLogin from '../SocialLogin/SocilaLogin';
import useAxios from '../../../Hooks/useAxios';
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useAuth();
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const result = await createUser(data.email, data.password);
            const firebaseUser = result.user;

            // ✅ FIX 4: displayName Firebase এ save করো
            await updateProfile(firebaseUser, {
                displayName: data.name || data.email.split('@')[0],
            });

            const userInfo = {
                email: data.email,
                name: data.name || data.email.split('@')[0],
                role: 'user',
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString()
            };

            const userRes = await axiosInstance.post('/users', userInfo);

            // ✅ FIX 1: existing user হলেও navigate করো
            if (userRes.data.insertedId || userRes.data.message === 'User already exists') {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registration successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            }
        } catch (error) {
            console.error("Registration error:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-3xl font-bold text-center">Create Account!</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Optional name field */}
                        <div className="form-control">
                            <label className="label">Name</label>
                            <input type="text" {...register('name')} className="input input-bordered" placeholder="Your Name" />
                        </div>

                        <div className="form-control">
                            <label className="label">Email</label>
                            <input type="email" {...register('email', { required: true })} className="input input-bordered" placeholder="Email" />
                            {errors.email && <p className='text-red-500 text-xs mt-1'>Email is required</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">Password</label>
                            <input type="password" {...register('password', { required: true, minLength: 6 })} className="input input-bordered" placeholder="Password" />
                            {errors.password?.type === 'required' && <p className='text-red-500 text-xs mt-1'>Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className='text-red-500 text-xs mt-1'>Must be 6+ characters</p>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary bg-orange-600 border-none hover:bg-orange-700 text-white">Register</button>
                        </div>
                    </form>

                    <p className='text-center mt-4'>
                        <small>Already have an account? <Link className='text-orange-600 font-bold' to="/login">Login</Link></small>
                    </p>

                    <div className="divider">OR</div>
                    <SocilaLogin />
                </div>
            </div>
        </div>
    );
};

export default Register;
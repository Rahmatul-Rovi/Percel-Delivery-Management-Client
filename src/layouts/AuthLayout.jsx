import React from 'react';
import { Outlet } from 'react-router';
import authimg from '../assets/authImage.png';
import EdificeLogo from '../Pages/Shared/EdificeLogo/EdificeLogo';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-base-200 p-8 md:p-12">
            <div className="mb-6">
                <EdificeLogo />
            </div>
            {/* ✅ hero class যোগ করা হয়েছে */}
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                    <div className="flex-1">
                        <img
                            src={authimg}
                            className="max-w-sm rounded-lg shadow-2xl"
                            alt="Authentication illustration" // ✅ alt যোগ
                        />
                    </div>
                    <div className="flex-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
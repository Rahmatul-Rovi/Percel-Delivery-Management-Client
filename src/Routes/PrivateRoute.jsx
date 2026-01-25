import React from 'react';
import useAuth from '../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router'; // useNavigate eikhane dorkar nai

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // 1. Loading thakle spinner dekhabo jate authentication check hobar somoy pay
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-xl text-orange-600"></span>
            </div>
        );
    }

    // 2. User login na thakle login page-e pathabo
    if (!user) {
        // 🚀 Fix: location.pathname na pathiye puro location object pathate hobe
        // jate login page-e 'location.state.from' thikmoto pabe
        return <Navigate state={{ from: location }} to='/login' replace />
    }

    // 3. Login thakle target page (children) dekhabo
    return children;
};

export default PrivateRoute;
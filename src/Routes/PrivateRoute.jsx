import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router'; 

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // 1. If there is loading then showthe spinner
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-xl text-orange-600"></span>
            </div>
        );
    }

    // 2. If user is mot login then through login page
    if (!user) {
        return <Navigate state={{ from: location }} to='/login' replace />
    }

    return children;
};

export default PrivateRoute;
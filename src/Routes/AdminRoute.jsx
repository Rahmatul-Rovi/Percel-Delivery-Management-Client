import React, { Children } from 'react';
import useUserRole from '../Hooks/useUserRole';
import { Navigate } from 'react-router';
import Forbidden from '../Pages/Forbidden/Forbidden';
import useAuth from '../Hooks/useAuth';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [role, isRoleLoading] = useUserRole(); 

    if (loading || isRoleLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-xl text-orange-600"></span>
            </div>
        );
    }

   if (!user || role?.toLowerCase() !== "admin") {
        return <Forbidden />; 
    }

    return children;
};

export default AdminRoute;
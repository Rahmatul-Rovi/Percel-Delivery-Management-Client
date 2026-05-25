// AdminRoute.jsx
import React from 'react';
import useUserRole from '../Hooks/useUserRole';
import useAuth from '../Hooks/useAuth';
import Forbidden from '../Pages/Forbidden/Forbidden';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
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
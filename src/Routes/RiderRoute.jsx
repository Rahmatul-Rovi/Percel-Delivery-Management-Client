import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';

const RiderRoute = ({children}) => {
     const {user, loading} = useAuth();
    const [role, isRoleLoading] = useUserRole(); 

    if (loading || isRoleLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-xl text-orange-600"></span>
            </div>
        );
    }

   if (!user || role?.toLowerCase() !== "rider") {
        return <Forbidden />; 
    }

    return children;
};


export default RiderRoute;
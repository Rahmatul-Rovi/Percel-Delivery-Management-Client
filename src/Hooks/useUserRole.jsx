import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./UseAxiosSecure";

const useUserRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role, isLoading: isRoleLoading, refetch } = useQuery({
        // The queryKey includes the user email so it refetches if the user changes
        queryKey: ["userRole", user?.email],
        
        // This query only runs if the Auth loading is finished and a user exists
        enabled: !loading && !!user?.email,
        
        queryFn: async () => {
            if (!user?.email) return null;
            
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data?.role; // Should return 'admin', 'rider', or 'user'
        },
        
        // Optional: Keep the data fresh
        staleTime: 1000 * 60 * 5, // Cache role for 5 minutes
    });

    return [role, isRoleLoading, refetch];
};

export default useUserRole;
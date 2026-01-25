import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';

const MyParcels = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {} = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res= await axiosSecure.get(``);
            return res.data;
        }
    })
    return (
        <div>
            <h4>My Parcels</h4>
        </div>
    );
};

export default MyParcels;
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { Truck, UserCheck, Package, Loader2, MapPin } from 'lucide-react';

const AssignRider = () => {
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ['assignableParcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/assignable');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="animate-spin text-orange-600" size={40} />
            </div>
        );
    }

    return (
        <div className="p-2 md:p-6 bg-slate-50 min-h-screen">
            <div className="max-w-[100%] mx-auto">
                {/* Header - Compact */}
                <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 rounded-xl text-white">
                            <Truck size={24} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">
                            Assign <span className="text-orange-600">Riders</span>
                        </h2>
                    </div>
                    <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-[10px] font-black uppercase">
                        {parcels.length} Parcels Pending
                    </span>
                </div>

                {parcels.length === 0 ? (
                    <div className="bg-white p-16 rounded-[2rem] text-center border-2 border-dashed border-slate-200">
                        <Package size={40} className="mx-auto text-slate-200 mb-4" />
                        <p className="text-slate-400 font-bold uppercase text-xs">No parcels to assign</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden">
                        <table className="w-full text-left table-auto">
                            <thead className="bg-slate-900 text-white">
                                <tr className="uppercase text-[9px] tracking-widest font-black">
                                    <th className="px-4 py-4">Customer</th>
                                    <th className="px-4 py-4">Destination</th>
                                    <th className="px-4 py-4">Date</th>
                                    <th className="px-4 py-4">Cost</th>
                                    <th className="px-4 py-4">Status</th>
                                    <th className="px-4 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-[13px]">
                                {parcels.map((parcel) => (
                                    <tr key={parcel._id} className="hover:bg-slate-50 transition-all">
                                        {/* Customer Info - Compact */}
                                        <td className="px-4 py-3">
                                            <p className="font-bold text-slate-800 leading-none">{parcel.senderName}</p>
                                            <p className="text-[11px] text-slate-400 mt-1">{parcel.senderEmail}</p>
                                        </td>

                                        {/* Destination - One Line */}
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1 text-slate-600 font-medium">
                                                <MapPin size={12} className="text-orange-500 shrink-0" />
                                                <span className="truncate max-w-[120px]">
                                                    {parcel.receiverCity}, {parcel.receiverDistrict}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Date */}
                                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap font-medium">
                                            {parcel.creationDate?.split(',')[0]}
                                        </td>

                                        {/* Cost */}
                                        <td className="px-4 py-3 font-black text-slate-800">
                                            ${parcel.deliveryCost}
                                        </td>

                                        {/* Status Badge - Smaller */}
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-600 text-[9px] font-black uppercase tracking-tighter">
                                                {parcel.paymentStatus}
                                            </span>
                                        </td>

                                        {/* Action Button - Compact */}
                                        <td className="px-4 py-3 text-center">
                                            <button 
                                                className="bg-slate-900 text-white px-4 py-1.5 rounded-lg font-black uppercase text-[9px] tracking-widest hover:bg-orange-600 transition-all flex items-center gap-1 mx-auto"
                                                onClick={() => console.log("Assign", parcel._id)}
                                            >
                                                <UserCheck size={12} /> Assign
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssignRider;
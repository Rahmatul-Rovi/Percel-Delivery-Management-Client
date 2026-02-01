import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Truck, UserCheck, Package, Loader2, MapPin, X, CalendarDays } from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';


const AssignRider = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    
    // Modal States
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [selectedRider, setSelectedRider] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");

    // ১. Parcel Load
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ['assignableParcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/assignable');
            return res.data;
        }
    });

    // ২. Rider Load (By Parcels receiverDistrict)
   const { data: riders = [], isLoading: isRidersLoading } = useQuery({
        queryKey: ['riders', selectedParcel?.receiverDistrict?.trim()],
        enabled: !!selectedParcel?.receiverDistrict,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/riders/${selectedParcel.receiverDistrict.trim()}`);
            return res.data;
        }
    });

    // ৩. Assigned Logic
    const assignMutation = useMutation({
        mutationFn: async (data) => {
            return await axiosSecure.patch(`/parcels/assign/${selectedParcel._id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['assignableParcels']);
            Swal.fire("Assigned!", "Rider has been assigned successfully.", "success");
            setSelectedParcel(null); // Modal Off
        }
    });

    const handleAssign = (e) => {
        e.preventDefault();
        const rider = riders.find(r => r._id === selectedRider);
        assignMutation.mutate({
            riderId: rider._id,
            riderEmail: rider.email,
            riderName: rider.name,
            approximateDeliveryDate: deliveryDate
        });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-[60vh]"><Loader2 className="animate-spin text-orange-600" size={40} /></div>;
    }

   return (
        <div className="p-2 md:p-6 bg-slate-50 min-h-screen text-slate-800"> {/* There is using base color*/}
            <div className="max-w-[100%] mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 rounded-xl text-white"><Truck size={24} /></div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Assign <span className="text-orange-600">Riders</span></h2>
                    </div>
                    <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-[10px] font-black uppercase">{parcels.length} Pending</span>
                </div>

                {parcels.length === 0 ? (
                    <div className="bg-white p-16 rounded-[2rem] text-center border-2 border-dashed border-slate-300">
                        <Package size={40} className="mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-500 font-bold uppercase text-xs">No parcels to assign</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-200 overflow-x-auto">
                        <table className="w-full text-left table-auto">
                            <thead className="bg-slate-900 text-white uppercase text-[9px] tracking-widest font-black">
                                <tr>
                                    <th className="px-4 py-4">Customer</th>
                                    <th className="px-4 py-4">Destination</th>
                                    <th className="px-4 py-4">Date</th>
                                    <th className="px-4 py-4">Cost</th>
                                    <th className="px-4 py-4">Status</th>
                                    <th className="px-4 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 text-[13px]">
                                {parcels.map((parcel) => (
                                    <tr key={parcel._id} className="hover:bg-slate-50 transition-all">
                                        {/* Text-color State set 600/700 */}
                                        <td className="px-4 py-3"><p className="font-bold text-slate-700 leading-none">{parcel.senderName}</p><p className="text-[11px] text-slate-500 mt-1">{parcel.senderEmail}</p></td>
                                        <td className="px-4 py-3"><div className="flex items-center gap-1 text-slate-600 font-medium"><MapPin size={12} className="text-orange-500 shrink-0" /><span className="truncate max-w-[120px]">{parcel.receiverCity}, {parcel.receiverDistrict}</span></div></td>
                                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap font-medium">{parcel.creationDate?.split(',')[0]}</td>
                                        <td className="px-4 py-3 font-black text-slate-700">${parcel.deliveryCost}</td>
                                        <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-md bg-green-100 text-green-700 text-[9px] font-black uppercase tracking-tighter">{parcel.paymentStatus}</span></td>
                                        <td className="px-4 py-3 text-center">
                                            <button onClick={() => setSelectedParcel(parcel)} className="bg-slate-900 text-white px-4 py-1.5 rounded-lg font-black uppercase text-[9px] tracking-widest hover:bg-orange-600 transition-all flex items-center gap-1 mx-auto">
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

            {/* --- ASSIGN MODAL --- */}
            {selectedParcel && (
                <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden">
                        <div className="bg-slate-900 p-5 text-white flex justify-between items-center">
                            <h3 className="font-black italic uppercase text-lg">Select Rider</h3>
                            <button onClick={() => setSelectedParcel(null)} className="hover:text-orange-500 transition-colors"><X size={20}/></button>
                        </div>
                        <form onSubmit={handleAssign} className="p-6 space-y-4">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">Target District: <span className="text-orange-600">{selectedParcel.receiverDistrict}</span></p>
                            
                            <select required className="w-full bg-slate-100 border-2 border-slate-200 p-3 rounded-xl font-bold text-sm text-slate-700 outline-none focus:border-orange-500 transition-all" onChange={(e) => setSelectedRider(e.target.value)} defaultValue="">
                                <option value="" disabled>Choose a Rider...</option>
                                {riders.map(rider => (
                                    <option key={rider._id} value={rider._id} className="text-slate-700">{rider.name} ({rider.email})</option>
                                ))}
                            </select>

                            {/* Showing Warning without rider */}
                            {riders.length === 0 && !isRidersLoading && (
                                <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                                    <p className="text-red-500 text-[11px] font-bold text-center italic">⚠️ No riders found in {selectedParcel.receiverDistrict}!</p>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Approximate Delivery Date</label>
                                <input required type="date" className="w-full bg-slate-100 border-2 border-slate-200 p-3 rounded-xl font-bold text-sm text-slate-700 outline-none focus:border-orange-500 transition-all" onChange={(e) => setDeliveryDate(e.target.value)} />
                            </div>

                            <button disabled={riders.length === 0 || assignMutation.isPending} className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-orange-600 transition-all disabled:bg-slate-200 disabled:text-slate-400 shadow-lg">
                                {assignMutation.isPending ? "Assigning..." : "Confirm Assignment"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignRider;
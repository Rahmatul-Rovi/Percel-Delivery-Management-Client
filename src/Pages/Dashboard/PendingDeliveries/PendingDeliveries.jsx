import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Truck, CheckCircle, XCircle, MapPin, Phone, Calendar, Loader2, Package } from 'lucide-react';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';

const PendingDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // ১. ডাটা ফেচ করা
    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['rider-tasks', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider-parcels/${user?.email}`);
            return res.data;
        }
    });

    // ২. স্ট্যাটাস আপডেট মিউটেশন (Deliver/Cancel)
    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            return await axiosSecure.patch(`/parcels/status/${id}`, { status });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['rider-tasks']);
            Swal.fire("Success!", "Delivery status updated.", "success");
        }
    });

    const handleAction = (id, status, actionText) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `You want to mark this as ${actionText}!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: status === 'delivered' ? '#16a34a' : '#dc2626',
            confirmButtonText: 'Yes, do it!'
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatusMutation.mutate({ id, status });
            }
        });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-[60vh]"><Loader2 className="animate-spin text-orange-600" size={40} /></div>;
    }

    return (
        <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-600 rounded-2xl text-white shadow-lg shadow-orange-200">
                            <Truck size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">My <span className="text-orange-600">Tasks</span></h2>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Pending Deliveries</p>
                        </div>
                    </div>
                    <div className="bg-slate-900 text-white px-6 py-2 rounded-full text-xs font-black uppercase">
                        {tasks.length} Active Jobs
                    </div>
                </div>

                {tasks.length === 0 ? (
                    <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-slate-200">
                        <Package size={60} className="mx-auto text-slate-200 mb-4" />
                        <p className="text-slate-500 font-black uppercase text-sm">No pending tasks assigned to you</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-widest font-black">
                                    <tr>
                                        <th className="px-6 py-5">Recipient Info</th>
                                        <th className="px-6 py-5">Location</th>
                                        <th className="px-6 py-5">Deadline</th>
                                        <th className="px-6 py-5">Cost</th>
                                        <th className="px-6 py-5 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {tasks.map((task) => (
                                        <tr key={task._id} className="hover:bg-slate-50/80 transition-all">
                                            <td className="px-6 py-5">
                                                <p className="font-bold text-slate-800 text-base">{task.receiverName}</p>
                                                <div className="flex items-center gap-1 text-slate-500 text-xs mt-1 font-medium">
                                                    <Phone size={12} className="text-orange-500" /> {task.receiverContact}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-start gap-1">
                                                    <MapPin size={14} className="text-red-500 shrink-0 mt-1" />
                                                    <div>
                                                        <p className="text-slate-700 font-bold text-sm leading-tight">{task.receiverAddress}</p>
                                                        <p className="text-slate-400 text-[11px] font-medium">{task.receiverDistrict}, {task.receiverCity}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-slate-600 font-bold text-sm bg-slate-100 px-3 py-1 rounded-lg w-fit">
                                                    <Calendar size={14} /> {task.approximateDeliveryDate}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="font-black text-slate-900 text-lg">৳{task.deliveryCost}</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button 
                                                        onClick={() => handleAction(task._id, 'cancelled', 'Cancelled')}
                                                        className="group flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-tighter hover:bg-red-600 hover:text-white transition-all"
                                                    >
                                                        <XCircle size={16} /> Cancel
                                                    </button>
                                                    <button 
                                                        onClick={() => handleAction(task._id, 'delivered', 'Delivered')}
                                                        className="group flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-tighter hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                                    >
                                                        <CheckCircle size={16} /> Deliver
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PendingDeliveries;
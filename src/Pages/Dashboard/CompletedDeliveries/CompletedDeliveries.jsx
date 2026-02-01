import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, DollarSign, MapPin, Calendar, Wallet, Banknote } from 'lucide-react';
import useAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // refetch কে এখান থেকে বের করে নিতে হবে
    const { data: completedTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['completed-tasks', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/completed-parcels/${user?.email}`);
            return res.data;
        }
    });

    // টোটাল আর্নিং ক্যালকুলেশন
    // আপনার কোডে এই অংশটি ঠিক আছে কিনা মিলিয়ে নিন
const totalEarnings = completedTasks.reduce((acc, curr) => acc + (Number(curr.earnings) || 0), 0);

    const handleCashout = async (item) => {
        try {
            const response = await axiosSecure.post('/cashout', {
                parcelId: item._id,
                riderEmail: user?.email,
                amount: item.earnings
            });

            if (response.data.insertedId || response.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cashout Successful!',
                    text: `$${item.earnings.toFixed(2)} added to your wallet.`,
                    confirmButtonColor: '#ea580c'
                });
                refetch(); // এবার ডাটা আপডেট হবে
            }
        } catch (error) {
            Swal.fire('Error', 'Cashout already done or failed!', 'error');
        }
    };

    if (isLoading) return <div className="p-10 text-center font-bold text-orange-600">Loading History...</div>;

    return (
        <div className="p-6 bg-[#F3F4F6] min-h-screen">
            <div className="max-w-6xl mx-auto">
                
                {/* Stats Summary Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-green-500 transition-transform hover:scale-105">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-xl text-green-600"><CheckCircle size={28}/></div>
                            <div>
                                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Delivered</p>
                                <h2 className="text-3xl font-bold text-gray-800">{completedTasks.length}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-orange-500 transition-transform hover:scale-105">
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-100 p-3 rounded-xl text-orange-600"><Wallet size={28}/></div>
                            <div>
                                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Earnings</p>
                                <h2 className="text-3xl font-bold text-gray-800">${totalEarnings.toFixed(2)}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
                    <div className="p-5 border-b bg-gray-50 font-bold text-gray-700 flex flex-col md:flex-row justify-between items-center gap-2">
                        <span className="flex items-center gap-2 text-lg"><Banknote className="text-orange-600" /> Delivery & Earnings History</span>
                        <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full border border-orange-200 uppercase">
                            80% (Same Dist.) | 30% (Cross Dist.)
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-800 text-white text-xs uppercase tracking-wider">
                                    <th className="p-4">Recipient & ID</th>
                                    <th className="p-4">Delivery Route</th>
                                    <th className="p-4">Delivery Status</th>
                                    <th className="p-4">Delivery Fee</th>
                                    <th className="p-4 text-green-400">Your Earnings</th>
                                    <th className="p-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {completedTasks.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-all group">
                                        <td className="p-4">
                                            <p className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">{item.receiverName}</p>
                                            <p className="text-[10px] text-gray-400 font-mono mt-1 uppercase">ID: {item._id.slice(-8)}</p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <MapPin size={14} className="text-red-400 shadow-sm"/>
                                                {item.senderDistrict} <span className="text-gray-300">→</span> {item.receiverDistrict}
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-500 font-medium">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} className="text-blue-400" />
                                                {item.actualDeliveryDate || "Completed"}
                                            </div>
                                        </td>
                                        <td className="p-4 font-semibold text-gray-700 text-sm italic">${item.deliveryFee}</td>
                                        <td className="p-4">
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-bold text-sm shadow-sm">
                                                +${item.earnings.toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            {item.isCashedOut ? (
                                                <span className="text-gray-400 italic text-xs font-semibold flex items-center justify-center gap-1 bg-gray-100 py-1 px-2 rounded-md">
                                                    <CheckCircle size={12} className="text-green-500" /> Paid
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handleCashout(item)}
                                                    className="bg-orange-600 hover:bg-orange-700 text-white text-[11px] uppercase tracking-tighter font-black py-2 px-4 rounded-lg shadow-lg hover:shadow-orange-200 transition-all flex items-center gap-1 mx-auto"
                                                >
                                                    <DollarSign size={14} /> Cashout
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {completedTasks.length === 0 && (
                        <div className="p-10 text-center text-gray-400">No completed deliveries found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompletedDeliveries;
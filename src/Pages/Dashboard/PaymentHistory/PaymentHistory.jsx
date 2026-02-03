import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { CreditCard, Calendar, Hash, Banknote } from "lucide-react";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  // 🔹 Latest payment first
  const sortedPayments = [...payments].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  const totalSpent = sortedPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
            <CreditCard className="text-orange-500" size={32} />
            Payment History
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            Total Transactions: {sortedPayments.length}
          </p>
        </div>
        // UI তে এই কার্ডটি যোগ করো:
        <div className="bg-orange-600 text-white p-6 rounded-[2.5rem] mb-8 flex justify-between items-center  shadow-xl">
          <div>
            <p className="text-orange-200 text-xs font-bold uppercase tracking-widest">
              Lifetime Spend
            </p>
            <h3 className="text-4xl font-black italic">৳{totalSpent}</h3>
          </div>
          <Banknote size={48} className="opacity-30" />
        </div>
        {/* Empty State */}
        {sortedPayments.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-200">
            <Banknote className="mx-auto text-slate-300 mb-4" size={64} />
            <p className="text-xl text-slate-500">No payment records found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {/* Table Header (Desktop) */}
            <div className="hidden md:grid grid-cols-4 px-6 py-4 bg-slate-100 rounded-xl text-slate-700 font-bold mb-2 border border-slate-200">
              <p>Transaction ID</p>
              <p>Amount</p>
              <p>Date</p>
              <p>Status</p>
            </div>

            {/* Payment Rows */}
            {sortedPayments.map((payment) => (
              <div
                key={payment._id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                  {/* Transaction ID */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                      <Hash size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold md:hidden">
                        Transaction ID
                      </p>
                      <p className="font-mono text-sm text-slate-700 break-all">
                        {payment.transactionId}
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold md:hidden">
                      Amount
                    </p>
                    <p className="text-lg font-black text-slate-800">
                      ৳{payment.amount}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold md:hidden">
                        Date
                      </p>
                      <p className="text-sm text-slate-600">
                        {new Date(payment.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest border border-green-200">
                      Paid
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;

import React from "react";
import useAuth from "../../../Hooks/UseAuth";
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

  // 🔹 আপনার লজিক (Latest first sort)
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

  return (
    <div className="p-4 md:p-8 bg-white dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-orange-500 flex items-center gap-3">
            <CreditCard size={32} />
            Payment History
          </h2>
          <p className="text-slate-500 dark:text-slate-300 mt-2 font-medium">
            Total Transactions: {sortedPayments.length}
          </p>
        </div>

        {sortedPayments.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
            <Banknote
              className="mx-auto text-slate-300 dark:text-slate-600 mb-4"
              size={64}
            />
            <p className="text-xl text-slate-500 dark:text-slate-400">
              No payment records found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {/* Table Header - MyParcels style colors */}
            <div className="hidden md:grid grid-cols-4 px-6 py-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-700 dark:text-orange-400 font-bold mb-2 border dark:border-slate-700">
              <p>Transaction ID</p>
              <p>Amount</p>
              <p>Date</p>
              <p>Status</p>
            </div>

            {/* Payment Cards - MyParcels style list items */}
            {sortedPayments.map((payment) => (
              <div
                key={payment._id}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                  {/* Transaction ID */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-slate-700 rounded-lg text-orange-600 dark:text-orange-400">
                      <Hash size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-bold md:hidden">
                        Transaction ID
                      </p>
                      <p className="font-mono text-sm text-slate-700 dark:text-slate-200 break-all">
                        {payment.transactionId}
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold md:hidden">
                      Amount
                    </p>
                    <p className="text-lg font-black text-slate-800 dark:text-white">
                      ৳{payment.amount}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-bold md:hidden">
                        Date
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
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
                    <span
                      className="px-4 py-1.5 rounded-full 
                      bg-green-100 text-green-700 
                      dark:bg-green-500/20 dark:text-green-400
                      text-xs font-bold uppercase tracking-widest border dark:border-green-500/30"
                    >
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
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Eye,
  CreditCard,
  Trash2,
  Calendar,
  Package,
  Loader2,
  Star,
} from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this parcel booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Cancelled!", "Booking deleted.", "success");
          }
        });
      }
    });
  };

  const handleView = (parcel) => {
    Swal.fire({
      title: `<span class="text-orange-600 font-black italic uppercase">Parcel Details</span>`,
      html: `
      <div class="text-left space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm">
        <p><strong>Tracking ID:</strong> <span class="text-blue-600 font-bold">${parcel.trackingId || "N/A"}</span></p>
        <p><strong>Title:</strong> ${parcel.title || "N/A"}</p>
        <p><strong>Type:</strong> ${parcel.type || "N/A"}</p>
        <p><strong>Status:</strong> <span class="badge badge-warning text-xs">${parcel.deliveryStatus || "Pending"}</span></p>
        <hr class="my-2 border-slate-200">
        <p><strong>Receiver Name:</strong> ${parcel.receiverName || "N/A"}</p>
        <p><strong>Receiver Contact:</strong> ${parcel.receiverContact || "N/A"}</p>
        <p><strong>Address:</strong> ${parcel.receiverAddress || "N/A"}, ${parcel.receiverDistrict || ""}</p>
        <hr class="my-2 border-slate-200">
        <p><strong>Weight:</strong> ${parcel.weight || 0} kg</p>
        <p><strong>Cost:</strong> ৳${parcel.deliveryCost || 0}</p>
        <p><strong>Payment:</strong> <span class="uppercase font-bold">${parcel.paymentStatus || "unpaid"}</span></p>
      </div>
    `,
      confirmButtonColor: "#ea580c",
      confirmButtonText: "Close",
      showCloseButton: true,
    });
  };

  const handleReview = async (parcel) => {
    const { value: formValues } = await Swal.fire({
      title: `<span class="text-orange-600">Rate Your Rider</span>`,
      html: `
        <div class="flex flex-col gap-4">
          <input id="swal-rating" type="number" min="1" max="5" placeholder="Rating (1-5)" class="swal2-input !w-full !m-0">
          <textarea id="swal-comment" placeholder="Write your experience..." class="swal2-textarea !w-full !m-0 h-24"></textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Submit Review",
      confirmButtonColor: "#ea580c",
      preConfirm: () => {
        const rating = document.getElementById("swal-rating").value;
        const comment = document.getElementById("swal-comment").value;
        if (!rating || rating < 1 || rating > 5) {
          Swal.showValidationMessage("Please enter a rating between 1 and 5");
        }
        return { rating, comment };
      },
    });

    if (formValues) {
      const reviewData = {
        riderEmail: parcel.riderEmail,
        parcelId: parcel._id,
        rating: Number(formValues.rating),
        comment: formValues.comment,
        userName: user?.displayName,
        userImage: user?.photoURL,
        date: new Date().toLocaleDateString(),
      };

      axiosSecure.post("/reviews", reviewData).then((res) => {
        if (res.data.insertedId) {
          Swal.fire("Success!", "Review submitted.", "success");
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-orange-600 mb-2" size={40} />
        <p className="text-slate-500 font-bold">Loading your parcels...</p>
      </div>
    );
  }

  const totalBookings = parcels.length;

  const totalPaidAmount = parcels
    .filter((p) => p.paymentStatus?.toLowerCase() === "paid")
    .reduce((sum, p) => sum + (Number(p.deliveryCost) || 0), 0);

const pendingParcels = parcels.filter(p => 
  p.paymentStatus?.toLowerCase() === 'unpaid'
).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-4 pt-6">
        <h2 className="text-3xl font-black text-slate-800 italic uppercase">
          My <span className="text-orange-600">Parcels</span>
        </h2>
        <div className="badge badge-lg bg-slate-900 text-white p-4 font-bold">
          Total: {parcels.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 px-4">
        {/* Card:1 Total Booking */}
        <div className="bg-orange-600 p-6 rounded-[2rem] text-white shadow-xl shadow-orange-100 flex items-center justify-between group">
          <div>
            <p className="text-orange-100 text-xs font-bold uppercase tracking-widest">
              Total Bookings
            </p>
            <h3 className="text-4xl font-black italic">{totalBookings}</h3>
          </div>
          <Package
            size={48}
            className="opacity-20 group-hover:scale-110 transition-transform"
          />
        </div>

        {/* Card 2: Paid Amount*/}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              Total Paid
            </p>
            <h3 className="text-2xl font-black text-slate-800 italic">
              ৳{totalPaidAmount}
            </h3>
          </div>
        </div>

       {/* Card 3: Pending Parcel(Unpaid) */}
<div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl flex items-center gap-4">
  <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
    <CreditCard size={24} /> 
  </div>
  <div>
    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Pending Payment</p>
    <h3 className="text-2xl font-black text-slate-800 italic">
      {pendingParcels}
    </h3>
  </div>
</div>
      </div>

      <div className="w-full bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead className="bg-slate-50">
              <tr className="text-slate-500 uppercase text-xs font-black tracking-widest border-b border-slate-100">
                <th className="py-6 px-6 text-center">#</th>
                <th>Parcel Type</th>
                <th>Created At</th>
                <th>Cost</th>
                <th>Payment</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {parcels.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="text-center font-bold text-slate-400">
                    {index + 1}
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${parcel.type === "document" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"}`}
                      >
                        <Package size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">
                          {parcel.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                          ID: {parcel.trackingId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <Calendar size={14} className="text-slate-400" />
                      {parcel.creationDate?.split(",")[0]}
                    </div>
                  </td>
                  <td>
                    <span className="font-black text-slate-900">
                      ৳{parcel.deliveryCost}
                    </span>
                  </td>
                  <td>
                    <div
                      className={`badge badge-md font-black border-none py-3 px-4 ${parcel.paymentStatus === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                    >
                      {parcel.paymentStatus}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      {/* Review Button */}
                      {parcel.deliveryStatus === "delivered" && (
                        <button
                          onClick={() => handleReview(parcel)}
                          className="btn btn-square btn-sm bg-yellow-50 border-none text-yellow-600 hover:bg-yellow-500 hover:text-white"
                          title="Give Review"
                        >
                          <Star size={16} />
                        </button>
                      )}

                      {/* View Button */}
                      <button
                        onClick={() => handleView(parcel)}
                        className="btn btn-square btn-sm bg-slate-100 border-none text-slate-600 hover:bg-slate-200"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>

                      {/* Pay Button */}
                      <Link to={`/dashboard/payment/${parcel._id}`}>
                        <button
                          disabled={parcel.paymentStatus === "Paid"}
                          className="btn btn-square btn-sm bg-orange-100 border-none text-orange-600 hover:bg-orange-600 hover:text-white disabled:bg-slate-100 disabled:text-slate-300"
                          title="Pay"
                        >
                          <CreditCard size={16} />
                        </button>
                      </Link>

                      {/* Cancel/Delete Button */}
                      <button
                        onClick={() => handleDelete(parcel._id)}
                        className="btn btn-square btn-sm bg-red-50 border-none text-red-500 hover:bg-red-500 hover:text-white"
                        title="Cancel"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyParcels;

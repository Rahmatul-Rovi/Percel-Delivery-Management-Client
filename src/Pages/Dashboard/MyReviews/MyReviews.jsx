import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Star, MessageSquare, Calendar, User } from "lucide-react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["rider-reviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      // ব্যাকএন্ডে যে রাউটটি আমরা বানিয়েছিলাম
      const res = await axiosSecure.get(`/reviews/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-orange-600"></span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-slate-800 italic uppercase">
          My <span className="text-orange-600">Reviews</span>
        </h2>
        <p className="text-slate-500 font-medium">What customers say about your service.</p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white p-12 rounded-[2.5rem] shadow-xl text-center border border-slate-100">
          <MessageSquare className="mx-auto text-slate-200 mb-4" size={60} />
          <h3 className="text-xl font-bold text-slate-400">No reviews yet!</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div 
              key={review._id} 
              className="bg-white p-6 rounded-[2rem] shadow-lg border border-slate-50 hover:shadow-xl transition-shadow relative overflow-hidden group"
            >
              {/* Rating Badge */}
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-2 rounded-bl-2xl font-black flex items-center gap-1">
                {review.rating} <Star size={16} fill="white" />
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                  <div className="w-14 rounded-2xl ring ring-orange-100 ring-offset-2">
                    <img src={review.userImage || "https://i.ibb.co/5GzXkwq/user.png"} alt="User" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{review.userName}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <Calendar size={10} /> {review.date}
                  </div>
                </div>
              </div>

              <div className="relative">
                <span className="text-4xl text-orange-100 absolute -top-4 -left-2 font-serif">“</span>
                <p className="text-slate-600 italic leading-relaxed relative z-10 pl-4">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
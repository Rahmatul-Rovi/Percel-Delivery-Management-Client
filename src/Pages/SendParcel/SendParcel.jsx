import React, { useState, useEffect } from 'react';
import { Package, User, Truck, CheckCircle, Calculator } from 'lucide-react';
import Swal from 'sweetalert2'; 
import { Toaster } from 'react-hot-toast';
import useAuth from '../../Hooks/UseAuth';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';



// BeARider এর সাথে ১০০% ম্যাচ করা ডাটা
const coverageData = [
  { region: "Dhaka", districts: ["Dhaka North", "Dhaka South", "Gazipur", "Narayanganj", "Tangail"] },
  { region: "Chattogram", districts: ["Chattogram City", "Cox's Bazar", "Cumilla", "Noakhali"] },
  { region: "Rajshahi", districts: ["Rajshahi City", "Bogura", "Pabna", "Natore", "Naogaon", "Sirajganj"] },
  { region: "Sylhet", districts: ["Sylhet City", "Moulvibazar", "Habiganj", "Sunamganj"] },
  { region: "Khulna", districts: ["Khulna City", "Jashore", "Kushtia", "Satkhira"] },
  { region: "Mymensingh", districts: ["Mymensingh City", "Jamalpur", "Sherpur", "Netrokona", "Modhupur"] },
  { region: "Barishal", districts: ["Barishal City", "Jhalokati", "Barguna", "Pirojpur", "Patuakhali"] },
];



const SendParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    type: 'document',
    title: '',
    weight: 1,

    senderRegion: '',
    senderDistrict: '',
    senderCity: '',      

    receiverRegion: '',
    receiverDistrict: '',
    receiverCity: '',

    senderName: user?.displayName || '',
    senderContact: '',
    receiverName: '',
    receiverContact: '',
    senderAddress: '',
    receiverAddress: '',
  });

  const [deliveryCost, setDeliveryCost] = useState(0);

  const senderDistricts =
    coverageData.find(c => c.region === formData.senderRegion)?.districts || [];

  const receiverDistricts =
    coverageData.find(c => c.region === formData.receiverRegion)?.districts || [];

  useEffect(() => {
    let cost = 0;
    const weight = Number(formData.weight) || 1;

    if (formData.type === 'document') {
      cost = 60;
    } else {
      const isInsideDhaka = formData.receiverRegion === "Dhaka";
      let basePrice = isInsideDhaka ? 150 : 300;
      cost = weight > 10 ? basePrice + ((weight - 10) * 20) : basePrice;
    }

    setDeliveryCost(cost);
  }, [formData.type, formData.weight, formData.receiverRegion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBooking = (e) => {
  e.preventDefault();
  const trackingId = "TRK-" + Math.floor(100000 + Math.random() * 900000);
  const creationDate = new Date().toLocaleString('en-GB');

  Swal.fire({
    title: 'Confirm Booking?',
    text: `Total Bill: ৳${deliveryCost}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#ea580c',
    confirmButtonText: 'Confirm Order'
  }).then((result) => {
    if (result.isConfirmed) {
      // এখানে trackingHistory অ্যারেটি যোগ করা হয়েছে
      const finalBookingData = {
        ...formData,
        senderEmail: user?.email,
        trackingId,
        deliveryCost,
        creationDate,
        pickupStatus: "Pending",
        deliveryStatus: "Processing",
        paymentStatus: "Unpaid",
        serviceCenter: formData.receiverDistrict,
        // প্রথম ট্র্যাকিং স্টেজ
        trackingHistory: [
          {
            status: "Submitted",
            time: new Date().toLocaleString(),
            message: "Parcel details have been submitted and are awaiting confirmation.",
          }
        ]
      };

      axiosSecure.post('/parcels', finalBookingData).then(res => {
        if(res.data.insertedId) {
          Swal.fire({ title: 'Booking Success!', icon: 'success', confirmButtonColor: '#ea580c' });
          // ফর্ম রিসেট বা রিডাইরেক্ট করতে পারেন এখানে
        }
      });
    }
  });
};

  const inputStyle = "w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 font-semibold outline-none transition-all text-slate-800 placeholder:text-slate-400 shadow-sm";
  const labelStyle = "block text-xs font-black text-slate-500 mb-2 uppercase tracking-widest ml-1";
  const cardStyle = "bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-100 border border-slate-100";

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
            Send New <span className="text-orange-600">Parcel</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Premium Delivery Experience</p>
        </div>

        <form onSubmit={handleBooking} className="space-y-10">
          
          <div className={cardStyle}>
            <div className="flex items-center gap-3 mb-8 text-orange-600">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Package size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-800">Parcel Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <label className={labelStyle}>Item Category</label>
                <select name="type" value={formData.type} onChange={handleChange} className={inputStyle}>
                  <option value="document">Document (৳60)</option>
                  <option value="non-document">Non-Document</option>
                </select>
              </div>

              <div>
                <label className={labelStyle}>Weight (KG)</label>
                <input type="number" name="weight" min="1" value={formData.weight} onChange={handleChange} className={inputStyle} disabled={formData.type === 'document'} />
              </div>

              <div>
                <label className={labelStyle}>Parcel Title</label>
                <input type="text" name="title" required onChange={handleChange} className={inputStyle} placeholder="E.g. Laptop, Books" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Sender */}
            <div className={cardStyle}>
              <h2 className="text-2xl font-black text-slate-800 mb-6">Sender Info</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <select name="senderRegion" value={formData.senderRegion} onChange={handleChange} className={inputStyle}>
                  <option value="">Select Region</option>
                  {coverageData.map(c => <option key={c.region} value={c.region}>{c.region}</option>)}
                </select>

                <select name="senderDistrict" value={formData.senderDistrict} onChange={handleChange} disabled={!formData.senderRegion} className={inputStyle}>
                  <option value="">Select District</option>
                  {senderDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <input type="text" name="senderName" value={formData.senderName} readOnly className={`${inputStyle} bg-slate-50`} />
              <input type="tel" name="senderContact" required onChange={handleChange} placeholder="Sender Phone Number" className={inputStyle} />
              <textarea name="senderAddress" required onChange={handleChange} placeholder="Full Pickup Address" className={`${inputStyle} h-28 resize-none`} />
            </div>

            {/* Receiver */}
            <div className={cardStyle}>
              <h2 className="text-2xl font-black text-slate-800 mb-6">Receiver Info</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <select name="receiverRegion" value={formData.receiverRegion} onChange={handleChange} className={inputStyle}>
                  <option value="">Select Region</option>
                  {coverageData.map(c => <option key={c.region} value={c.region}>{c.region}</option>)}
                </select>

                <select name="receiverDistrict" value={formData.receiverDistrict} onChange={handleChange} disabled={!formData.receiverRegion} className={inputStyle}>
                  <option value="">Select District</option>
                  {receiverDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <input type="text" name="receiverName" required onChange={handleChange} placeholder="Receiver Name" className={inputStyle} />
              <input type="tel" name="receiverContact" required onChange={handleChange} placeholder="Receiver Phone Number" className={inputStyle} />
              <textarea name="receiverAddress" required onChange={handleChange} placeholder="Full Delivery Address" className={`${inputStyle} h-28 resize-none`} />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-xs uppercase text-slate-400 font-bold">Calculated Cost</p>
              <p className="text-4xl text-gray-400">৳{deliveryCost}</p>
            </div>

            <button type="submit" className="px-12 py-5 bg-orange-600 text-white font-black rounded-2xl">
              Confirm Order
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SendParcel;

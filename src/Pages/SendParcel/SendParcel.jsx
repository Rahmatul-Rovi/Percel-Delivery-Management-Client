import React, { useState, useEffect, useContext } from 'react';
import { Package, User, MapPin, Truck, CheckCircle } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
// import { AuthContext } from "../../providers/AuthProvider"; 

const SendParcel = () => {
  // const { user } = useContext(AuthContext);
  const user = { displayName: "Abir Hasan", email: "abir@example.com" }; 

  // Mock Warehouse Data (Service Centers with Districts)
  const warehouseData = [
    { id: 1, region: "Dhaka", centerName: "Dhanmondi Hub", district: "Dhaka Metro" },
    { id: 2, region: "Dhaka", centerName: "Uttara Warehouse", district: "Dhaka Metro" },
    { id: 3, region: "Chattogram", centerName: "Agrabad Point", district: "Chattogram" },
    { id: 4, region: "Chattogram", centerName: "Halishahar Hub", district: "Chattogram" },
    { id: 5, region: "Sylhet", centerName: "Zindabazar Express", district: "Sylhet" },
    { id: 6, region: "Rajshahi", centerName: "Shaheb Bazar Hub", district: "Rajshahi" },
  ];

  // Unique Region filter kora
  const availableRegions = [...new Set(warehouseData.map(item => item.region))];

  const [formData, setFormData] = useState({
    type: 'document',
    title: '',
    weight: 1,
    senderName: '',
    senderEmail: '',
    senderContact: '',
    senderRegion: '',
    senderCenter: '',
    senderAddress: '',
    senderInstruction: '',
    receiverName: '',
    receiverContact: '',
    receiverRegion: '',
    receiverCenter: '',
    receiverAddress: '',
    receiverInstruction: ''
  });

  const [deliveryCost, setDeliveryCost] = useState(0);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        senderName: user?.displayName || '',
        senderEmail: user?.email || ''
      }));
    }
  }, [user]);

  useEffect(() => {
    let basePrice = formData.type === 'document' ? 60 : 100;
    let weightCharge = formData.type === 'non-document' ? (formData.weight > 0 ? formData.weight * 20 : 0) : 0;
    setDeliveryCost(basePrice + weightCharge);
  }, [formData.type, formData.weight]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Jodi region change hoy, tobe center reset kore dibo
    if (name === 'senderRegion') setFormData(prev => ({ ...prev, [name]: value, senderCenter: '' }));
    else if (name === 'receiverRegion') setFormData(prev => ({ ...prev, [name]: value, receiverCenter: '' }));
    else setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <span className="font-bold text-slate-900">
          Order Summary: <span className="text-orange-600">৳{deliveryCost}</span>
        </span>
        <div className="flex gap-2">
          <button onClick={() => { saveToDatabase(); toast.dismiss(t.id); }} className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-700">Confirm</button>
          <button onClick={() => toast.dismiss(t.id)} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg text-sm font-bold">Cancel</button>
        </div>
      </div>
    ), { duration: 6000, position: 'top-center' });
  };

  const saveToDatabase = () => {
    const finalData = { ...formData, cost: deliveryCost, status: 'pending', creation_date: new Date().toISOString() };
    console.log("Saving to DB:", finalData);
    toast.success("Parcel booked successfully!", { icon: '🚀' });
  };

  const inputStyle = "w-full p-4 bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 font-semibold";
  const labelStyle = "block text-sm font-black text-slate-700 mb-2 uppercase tracking-wide";

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3">
            Send New <span className="text-orange-600 underline decoration-orange-200">Parcel</span>
          </h1>
          <p className="text-slate-500 font-bold max-w-md mx-auto">Premium door-to-door delivery booking system.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. Parcel Specification */}
          <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-5">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl shadow-inner"><Package size={28}/></div>
              <h2 className="text-2xl font-black text-slate-900">Parcel Info</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-1">
                <label className={labelStyle}>Parcel Type*</label>
                <select name="type" value={formData.type} onChange={handleChange} required className={inputStyle}>
                  <option value="document">Document</option>
                  <option value="non-document">Non-Document (Box/Parcel)</option>
                </select>
              </div>
              <div className="md:col-span-1 space-y-1">
                <label className={labelStyle}>Parcel Title*</label>
                <input type="text" name="title" placeholder="What are you sending?" onChange={handleChange} required className={inputStyle} />
              </div>
              {formData.type === 'non-document' && (
                <div className="space-y-1">
                  <label className={labelStyle}>Approx Weight (KG)</label>
                  <input type="number" name="weight" min="1" value={formData.weight} onChange={handleChange} className={inputStyle} />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 2. Sender Section */}
            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-5">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl shadow-inner"><User size={28}/></div>
                <h2 className="text-2xl font-black text-slate-900">Sender</h2>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className={labelStyle}>Full Name</label>
                    <input type="text" value={formData.senderName} readOnly className="w-full p-4 bg-slate-200 border border-slate-300 rounded-xl text-slate-500 font-bold cursor-not-allowed" />
                  </div>
                  <div className="space-y-1">
                    <label className={labelStyle}>Contact*</label>
                    <input type="tel" name="senderContact" placeholder="Your Phone Number" onChange={handleChange} required className={inputStyle} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className={labelStyle}>Region*</label>
                    <select name="senderRegion" value={formData.senderRegion} onChange={handleChange} required className={inputStyle}>
                      <option value="">Select Region</option>
                      {availableRegions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className={labelStyle}>Service Center*</label>
                    <select name="senderCenter" value={formData.senderCenter} onChange={handleChange} required className={inputStyle} disabled={!formData.senderRegion}>
                      <option value="">Pickup Center</option>
                      {warehouseData.filter(w => w.region === formData.senderRegion).map(s => (
                        <option key={s.id} value={s.centerName}>{s.centerName} ({s.district})</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className={labelStyle}>Pickup Address*</label>
                  <textarea name="senderAddress" placeholder="Street name, House, Flat..." onChange={handleChange} required className={`${inputStyle} h-24 resize-none`} />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle}>Pickup Instruction</label>
                  <textarea name="senderInstruction" placeholder="Note: Call before pickup" onChange={handleChange} className={`${inputStyle} h-20 resize-none`} />
                </div>
              </div>
            </div>

            {/* 3. Receiver Section */}
            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-5">
                <div className="p-3 bg-green-100 text-green-600 rounded-2xl shadow-inner"><Truck size={28}/></div>
                <h2 className="text-2xl font-black text-slate-900">Receiver</h2>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className={labelStyle}>Receiver Name*</label>
                    <input type="text" name="receiverName" placeholder="Full Name" onChange={handleChange} required className={inputStyle} />
                  </div>
                  <div className="space-y-1">
                    <label className={labelStyle}>Contact*</label>
                    <input type="tel" name="receiverContact" placeholder="Phone Number" onChange={handleChange} required className={inputStyle} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className={labelStyle}>Region*</label>
                    <select name="receiverRegion" value={formData.receiverRegion} onChange={handleChange} required className={inputStyle}>
                      <option value="">Select Region</option>
                      {availableRegions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className={labelStyle}>Service Center*</label>
                    <select name="receiverCenter" value={formData.receiverCenter} onChange={handleChange} required className={inputStyle} disabled={!formData.receiverRegion}>
                      <option value="">Delivery Center</option>
                      {warehouseData.filter(w => w.region === formData.receiverRegion).map(s => (
                        <option key={s.id} value={s.centerName}>{s.centerName} ({s.district})</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className={labelStyle}>Delivery Address*</label>
                  <textarea name="receiverAddress" placeholder="Street name, House, Flat..." onChange={handleChange} required className={`${inputStyle} h-24 resize-none`} />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle}>Delivery Instruction</label>
                  <textarea name="receiverInstruction" placeholder="Note: Deliver after 5 PM" onChange={handleChange} className={`${inputStyle} h-20 resize-none`} />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Card */}
          <div className="bg-slate-900 p-8 md:p-10 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-slate-800">
            <div className="text-center md:text-left">
              <span className="text-orange-500 font-black text-xs uppercase tracking-[0.2em] block mb-1">Total Delivery Cost</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-6xl font-black text-white">৳{deliveryCost}</span>
                <span className="text-slate-400 font-bold">/-</span>
              </div>
            </div>
            <button type="submit" className="group w-full md:w-auto px-12 py-6 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-[2rem] transition-all flex items-center justify-center gap-4 text-xl shadow-lg transform hover:-translate-y-1 active:scale-95">
              Order Parcel <CheckCircle className="group-hover:rotate-12 transition-transform" size={28}/>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SendParcel;
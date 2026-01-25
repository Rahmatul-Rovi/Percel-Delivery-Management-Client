import React, { useState, useEffect } from 'react';
import { Package, User, Truck, CheckCircle, Calculator } from 'lucide-react';
import Swal from 'sweetalert2'; 
import { Toaster } from 'react-hot-toast';
import useAuth from '../../Hooks/UseAuth';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';

const coverageData = [
  { "region": "Dhaka", "district": "Dhaka", "covered_area": ["Uttara", "Dhanmondi", "Mirpur", "Mohammadpur", "Gulshan", "Badda", "Motijheel", "Jatrabari", "Savar", "Keraniganj"] },
  { "region": "Dhaka", "district": "Faridpur", "covered_area": ["Faridpur Sadar", "Goalanda", "Boalmari", "Bhanga", "Sadarpur"] },
  { "region": "Dhaka", "district": "Gazipur", "covered_area": ["Gazipur Sadar", "Tongi", "Kaliakair", "Sreepur", "Kapasia"] },
  { "region": "Dhaka", "district": "Gopalganj", "covered_area": ["Gopalganj Sadar", "Tungipara", "Kotalipara", "Kashiani"] },
  { "region": "Dhaka", "district": "Kishoreganj", "covered_area": ["Kishoreganj Sadar", "Bajitpur", "Bhairab", "Kuliarchar", "Pakundia"] },
  { "region": "Dhaka", "district": "Narayanganj", "covered_area": ["Narayanganj Sadar", "Fatullah", "Siddhirganj", "Rupganj", "Araihazar"] },
  { "region": "Chattogram", "district": "Chattogram", "covered_area": ["Pahartali", "Kotwali", "Halishahar", "Agrabad", "Chandgaon", "Panchlaish", "Nasirabad", "Patenga"] },
  { "region": "Chattogram", "district": "Cox's Bazar", "covered_area": ["Cox's Bazar Sadar", "Teknaf", "Ukhia", "Chakaria", "Ramu"] },
  { "region": "Chattogram", "district": "Cumilla", "covered_area": ["Cumilla Sadar", "Laksam", "Debidwar", "Chandina", "Muradnagar"] },
  { "region": "Sylhet", "district": "Sylhet", "covered_area": ["Zindabazar", "Ambarkhana", "Dargah Gate", "South Surma", "Subid Bazar", "Tilagor"] },
  { "region": "Rajshahi", "district": "Bogura", "covered_area": ["Bogura Sadar", "Sariakandi", "Sonatola", "Gabtali", "Sherpur", "Shajahanpur"] },
  { "region": "Khulna", "district": "Kushtia", "covered_area": ["Kushtia Sadar", "Kumarkhali", "Khoksa", "Mirpur", "Bheramara", "Daulatpur"] },
  { "region": "Barisal", "district": "Barisal", "covered_area": ["Band Road", "Kawnia", "Rupatali", "Nathullabad", "Bakerganj"] },
  { "region": "Rangpur", "district": "Rangpur", "covered_area": ["Jahaj Company", "Pairaband", "Mahiganj", "Satmatha", "Lalbagh"] },
  { "region": "Mymensingh", "district": "Mymensingh", "covered_area": ["Mymensingh Sadar", "Trishal", "Muktagachha", "Bhaluka", "Phulpur"] },
];

const SendParcel = () => {
  const allDistricts = [...new Set(coverageData.map(item => item.district))].sort();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    type: 'document',
    title: '',
    weight: 1,
    senderDistrict: '', 
    senderCity: '',     
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

  useEffect(() => {
    let cost = 0;
    const weight = Number(formData.weight) || 1;
    if (formData.type === 'document') {
      cost = 60;
    } else {
      const isInsideDhaka = formData.receiverDistrict === "Dhaka";
      let basePrice = isInsideDhaka ? 150 : 300;
      cost = weight > 10 ? basePrice + ((weight - 10) * 20) : basePrice;
    }
    setDeliveryCost(cost);
  }, [formData.type, formData.weight, formData.receiverDistrict]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('District')) {
      const cityField = name.startsWith('sender') ? 'senderCity' : 'receiverCity';
      setFormData(prev => ({ ...prev, [name]: value, [cityField]: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
        const finalBookingData = {
          ...formData,
          senderEmail: user?.email,
          trackingId: trackingId,
          deliveryCost: deliveryCost,
          creationDate: creationDate,
          pickupStatus: "Pending",
          deliveryStatus: "Processing",
          paymentStatus: "Unpaid",
        };
        axiosSecure.post('/parcels', finalBookingData).then(res => {
          if(res.data.insertedId) {
            Swal.fire({ title: 'Booking Success!', icon: 'success', confirmButtonColor: '#ea580c' });
          }
        });
      }
    });
  };

  // Modern Clean Styles
  const inputStyle = "w-full p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-my-orange font-semibold outline-none transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 shadow-sm";
  const labelStyle = "block text-xs font-black text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest ml-1";
  const cardStyle = "bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800";

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-slate-950 py-16 px-4">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
           <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">
            Send New <span className="text-my-orange">Parcel</span>
           </h1>
           <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Premium Delivery Experience</p>
        </div>

        <form onSubmit={handleBooking} className="space-y-10">
          
          {/* Section 1: Parcel Specs */}
          <div className={cardStyle}>
            <div className="flex items-center gap-3 mb-8 text-my-orange">
              <div className="p-2 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                <Package size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">Parcel Details</h2>
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
                <input type="text" name="title" required onChange={handleChange} className={inputStyle} placeholder="E.g. Official Documents" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Section 2: Sender */}
            <div className={cardStyle}>
              <div className="flex items-center gap-3 mb-8 text-blue-600">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <User size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">Sender Info</h2>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>District</label>
                    <select name="senderDistrict" required value={formData.senderDistrict} onChange={handleChange} className={inputStyle}>
                      <option value="">Select District</option>
                      {allDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelStyle}>City/Area</label>
                    <select name="senderCity" required value={formData.senderCity} onChange={handleChange} className={inputStyle} disabled={!formData.senderDistrict}>
                      <option value="">Select City</option>
                      {coverageData.find(l => l.district === formData.senderDistrict)?.covered_area.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <input type="text" name="senderName" value={formData.senderName} readOnly className={`${inputStyle} bg-slate-50 border-dashed cursor-not-allowed`} />
                <input type="tel" name="senderContact" required onChange={handleChange} placeholder="Sender Phone Number" className={inputStyle} />
                <textarea name="senderAddress" required onChange={handleChange} placeholder="Full Pickup Address" className={`${inputStyle} h-28 resize-none`} />
              </div>
            </div>

            {/* Section 3: Receiver */}
            <div className={cardStyle}>
              <div className="flex items-center gap-3 mb-8 text-emerald-600">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                  <Truck size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">Receiver Info</h2>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>District</label>
                    <select name="receiverDistrict" required value={formData.receiverDistrict} onChange={handleChange} className={inputStyle}>
                      <option value="">Select District</option>
                      {allDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelStyle}>City/Area</label>
                    <select name="receiverCity" required value={formData.receiverCity} onChange={handleChange} className={inputStyle} disabled={!formData.receiverDistrict}>
                      <option value="">Select City</option>
                      {coverageData.find(l => l.district === formData.receiverDistrict)?.covered_area.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <input type="text" name="receiverName" required onChange={handleChange} placeholder="Receiver Name" className={inputStyle} />
                <input type="tel" name="receiverContact" required onChange={handleChange} placeholder="Receiver Phone Number" className={inputStyle} />
                <textarea name="receiverAddress" required onChange={handleChange} placeholder="Full Delivery Address" className={`${inputStyle} h-28 resize-none`} />
              </div>
            </div>
          </div>

          {/* Checkout Footer */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-orange-100 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-my-orange rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
                <Calculator size={32} />
              </div>
              <div>
                <p className="text-slate-400 font-bold text-xs uppercase">Calculated Cost</p>
                <p className="text-4xl font-black text-slate-900 dark:text-white">৳{deliveryCost}<span className="text-lg text-slate-400">.00</span></p>
              </div>
            </div>
            
            <button type="submit" className="w-full md:w-auto px-12 py-5 bg-my-orange hover:bg-my-orange-dark text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-200 dark:shadow-none active:scale-95 group">
              Confirm Order
              <CheckCircle size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
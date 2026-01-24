import React, { useState, useEffect } from 'react';
import { Package, User, Truck, CheckCircle, Calculator, Info } from 'lucide-react';
import Swal from 'sweetalert2'; 
import { Toaster } from 'react-hot-toast';

// Bangladesh 64 Districts and Areas Data
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

  const [formData, setFormData] = useState({
    type: 'document',
    title: '',
    weight: 1,
    senderDistrict: '', 
    senderCity: '',     
    receiverDistrict: '',
    receiverCity: '',
    senderName: '',
    senderContact: '',
    receiverName: '',
    receiverContact: '',
    senderAddress: '',
    receiverAddress: '',
  });

  const [deliveryCost, setDeliveryCost] = useState(0);

  // Pricing Logic
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

  // --- Final Booking & Status Logic ---
  const handleBooking = (e) => {
    e.preventDefault();

    // Generate Dynamic Data
    const trackingId = "TRK-" + Math.floor(100000 + Math.random() * 900000);
    const creationDate = new Date().toLocaleString('en-GB'); // Format: DD/MM/YYYY, HH:MM:SS

    // Validation
    if (!formData.receiverDistrict || !formData.receiverCity || !formData.receiverAddress) {
      return Swal.fire({
        icon: 'warning',
        title: 'Incomplete Info',
        text: 'Please provide full Receiver address and location.',
        confirmButtonColor: '#ea580c'
      });
    }

    // Confirmation Popup
    Swal.fire({
      title: 'Confirm Booking?',
      html: `
        <div style="text-align: left; background: #f8fafc; padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0; font-family: sans-serif;">
          <p style="margin-bottom: 5px;"><b>Tracking ID:</b> <span style="color: #2563eb;">${trackingId}</span></p>
          <p style="margin-bottom: 5px;"><b>To:</b> ${formData.receiverCity}, ${formData.receiverDistrict}</p>
          <p style="margin-bottom: 5px;"><b>Receiver:</b> ${formData.receiverName || 'Guest'}</p>
          <hr style="margin: 10px 0; border: 0; border-top: 1px dashed #cbd5e1;">
          <p style="color: #ea580c; font-size: 20px; font-weight: 800; text-align: center; margin: 0;">Total Bill: ৳${deliveryCost}</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ea580c',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Confirm Order',
      cancelButtonText: 'Review Again'
    }).then((result) => {
      if (result.isConfirmed) {
        
        // Final Status Integrated Object
        const finalBookingData = {
          ...formData,
          trackingId: trackingId,
          deliveryCost: deliveryCost,
          creationDate: creationDate,
          pickupStatus: "Pending",     // Default status
          deliveryStatus: "Processing",// Default status
          paymentStatus: "Unpaid",     // Default status
        };

        // Final Success Message
        Swal.fire({
          title: 'Booking Success!',
          html: `Your Tracking ID: <b style="color:#ea580c">${trackingId}</b><br>Save this for tracking your parcel.`,
          icon: 'success',
          confirmButtonColor: '#ea580c'
        });
        
        console.log("Full Updated Data for Database:", finalBookingData);
      }
    });
  };

  const inputStyle = "w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 font-semibold outline-none transition-all";
  const labelStyle = "block text-xs font-black text-slate-500 mb-2 uppercase tracking-widest";

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 italic uppercase tracking-tighter">
            Send New <span className="text-orange-600 underline decoration-slate-200">Parcel</span>
           </h1>
           <p className="text-slate-500 font-medium">Fast & Reliable Door-to-Door Delivery Service</p>
        </div>

        <form onSubmit={handleBooking} className="space-y-8">
          
          {/* Section 1: Parcel Specs */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6 border-b pb-4 text-orange-600">
              <Package size={24} />
              <h2 className="text-xl font-black uppercase italic tracking-tight text-slate-800">Parcel Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <input type="text" name="title" required onChange={handleChange} className={inputStyle} placeholder="E.g. Gift Box" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Section 2: Sender */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <div className="flex items-center gap-2 mb-2 border-b pb-4 text-blue-500">
                <User size={24} />
                <h2 className="text-xl font-black uppercase italic tracking-tight text-slate-800">Sender Info</h2>
              </div>
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
              <input type="text" name="senderName" required onChange={handleChange} placeholder="Sender Full Name" className={inputStyle} />
              <input type="tel" name="senderContact" required onChange={handleChange} placeholder="Sender Phone Number" className={inputStyle} />
              <textarea name="senderAddress" required onChange={handleChange} placeholder="Pickup Detailed Address" className={`${inputStyle} h-24 resize-none`} />
            </div>

            {/* Section 3: Receiver */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <div className="flex items-center gap-2 mb-2 border-b pb-4 text-green-500">
                <Truck size={24} />
                <h2 className="text-xl font-black uppercase italic tracking-tight text-slate-800">Receiver Info</h2>
              </div>
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
              <input type="text" name="receiverName" required onChange={handleChange} placeholder="Receiver Full Name" className={inputStyle} />
              <input type="tel" name="receiverContact" required onChange={handleChange} placeholder="Receiver Phone Number" className={inputStyle} />
              <textarea name="receiverAddress" required onChange={handleChange} placeholder="Delivery Detailed Address" className={`${inputStyle} h-24 resize-none`} />
            </div>
          </div>

          {/* Checkout Banner */}
          <div className="bg-slate-900 p-8 md:p-12 rounded-[3.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border-4 border-slate-800">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-orange-900/40">
                <Calculator size={40} />
              </div>
              <div>
                <span className="text-orange-500 font-black text-xs uppercase tracking-[0.2em] block mb-1">Total Charge</span>
                <div className="flex items-baseline gap-1">
                   <span className="text-5xl font-black text-white italic">৳{deliveryCost}</span>
                   <span className="text-slate-500 font-bold">.00</span>
                </div>
              </div>
            </div>
            
            <button type="submit" className="w-full md:w-auto px-16 py-7 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-[2rem] transition-all text-2xl flex items-center justify-center gap-3 shadow-xl active:scale-95 group">
              Confirm Booking 
              <CheckCircle size={28} className="group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
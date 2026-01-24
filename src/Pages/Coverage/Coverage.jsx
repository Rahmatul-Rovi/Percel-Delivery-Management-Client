import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search, Globe, ChevronRight, MapPin } from 'lucide-react';

// Marker Icon Fix
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Full Data Array
const coverageData = [
  { "region": "Dhaka", "district": "Dhaka", "city": "Dhaka", "covered_area": ["Uttara", "Dhanmondi", "Mirpur", "Mohammadpur"], "status": "active", "longitude": 90.4125, "latitude": 23.8103 },
  { "region": "Dhaka", "district": "Faridpur", "city": "Faridpur", "covered_area": ["Goalanda", "Boalmari", "Bhanga"], "status": "active", "longitude": 89.8333, "latitude": 23.6 },
  { "region": "Dhaka", "district": "Gazipur", "city": "Gazipur", "covered_area": ["Tongi", "Kaliakair", "Sreepur"], "status": "active", "longitude": 90.4203, "latitude": 23.9999 },
  { "region": "Dhaka", "district": "Gopalganj", "city": "Gopalganj", "covered_area": ["Tungipara", "Kotalipara", "Kashiani"], "status": "active", "longitude": 89.8266, "latitude": 23.0052 },
  { "region": "Dhaka", "district": "Kishoreganj", "city": "Kishoreganj", "covered_area": ["Bajitpur", "Kuliarchar", "Pakundia"], "status": "active", "longitude": 90.7829, "latitude": 24.426 },
  { "region": "Dhaka", "district": "Madaripur", "city": "Madaripur", "covered_area": ["Rajoir", "Kalkini", "Shibchar"], "status": "active", "longitude": 90.2, "latitude": 23.17 },
  { "region": "Dhaka", "district": "Manikganj", "city": "Manikganj", "covered_area": ["Saturia", "Shivalaya", "Ghior"], "status": "active", "longitude": 89.9767, "latitude": 23.8617 },
  { "region": "Dhaka", "district": "Munshiganj", "city": "Munshiganj", "covered_area": ["Sreenagar", "Lohajang", "Sirajdikhan"], "status": "active", "longitude": 90.5305, "latitude": 23.55 },
  { "region": "Dhaka", "district": "Narayanganj", "city": "Narayanganj", "covered_area": ["Fatullah", "Siddhirganj", "Rupganj"], "status": "active", "longitude": 90.5, "latitude": 23.62 },
  { "region": "Dhaka", "district": "Narsingdi", "city": "Narsingdi", "covered_area": ["Palash", "Belabo", "Raipura"], "status": "active", "longitude": 90.7156, "latitude": 23.9226 },
  { "region": "Dhaka", "district": "Rajbari", "city": "Rajbari", "covered_area": ["Pangsha", "Kalukhali", "Baliakandi"], "status": "active", "longitude": 89.65, "latitude": 23.7576 },
  { "region": "Dhaka", "district": "Shariatpur", "city": "Shariatpur", "covered_area": ["Zajira", "Naria", "Gosairhat"], "status": "active", "longitude": 90.4308, "latitude": 23.22 },
  { "region": "Dhaka", "district": "Tangail", "city": "Tangail", "covered_area": ["Delduar", "Ghatail", "Kalihati"], "status": "active", "longitude": 89.92, "latitude": 24.25 },
  { "region": "Chattogram", "district": "Chattogram", "city": "Chattogram", "covered_area": ["Pahartali", "Kotwali", "Halishahar", "Panchlaish", "Agrabad", "Chandgaon"], "status": "active", "longitude": 91.8123, "latitude": 22.3569 },
  { "region": "Chattogram", "district": "Cox's Bazar", "city": "Cox's Bazar", "covered_area": ["Teknaf", "Ukhia", "Chakaria", "Ramu"], "status": "active", "longitude": 92.0165, "latitude": 21.4272 },
  { "region": "Chattogram", "district": "Cumilla", "city": "Cumilla", "covered_area": ["Laksam", "Debidwar", "Chandina", "Muradnagar"], "status": "active", "longitude": 91.1809, "latitude": 23.4573 },
  { "region": "Chattogram", "district": "Brahmanbaria", "city": "Brahmanbaria", "covered_area": ["Nabinagar", "Ashuganj", "Sarail"], "status": "active", "longitude": 91.1116, "latitude": 23.9571 },
  { "region": "Chattogram", "district": "Chandpur", "city": "Chandpur", "covered_area": ["Haimchar", "Matlab", "Shahrasti"], "status": "active", "longitude": 90.85, "latitude": 23.2333 },
  { "region": "Chattogram", "district": "Feni", "city": "Feni", "covered_area": ["Parshuram", "Daganbhuiyan", "Chhagalnaiya"], "status": "active", "longitude": 91.4, "latitude": 23.0167 },
  { "region": "Chattogram", "district": "Khagrachari", "city": "Khagrachari", "covered_area": ["Ramgarh", "Mahalchari", "Dighinala"], "status": "active", "longitude": 91.9667, "latitude": 23.1 },
  { "region": "Chattogram", "district": "Lakshmipur", "city": "Lakshmipur", "covered_area": ["Raipur", "Ramganj", "Kamalnagar"], "status": "active", "longitude": 90.8415, "latitude": 22.9444 },
  { "region": "Chattogram", "district": "Noakhali", "city": "Noakhali", "covered_area": ["Begumganj", "Senbagh", "Chatkhil"], "status": "active", "longitude": 91.0995, "latitude": 22.8245 },
  { "region": "Chattogram", "district": "Rangamati", "city": "Rangamati", "covered_area": ["Baghaichhari", "Kaptai", "Juraichhari"], "status": "active", "longitude": 92.2, "latitude": 22.65 },
  { "region": "Sylhet", "district": "Sylhet", "city": "Sylhet", "covered_area": ["Zindabazar", "Ambarkhana", "Dargah Gate", "South Surma", "Subid Bazar", "Tilagor"], "status": "active", "longitude": 91.8662, "latitude": 24.8949 },
  { "region": "Sylhet", "district": "Moulvibazar", "city": "Moulvibazar", "covered_area": ["Sreemangal", "Kamalganj", "Kulaura", "Barlekha"], "status": "active", "longitude": 91.7832, "latitude": 24.4826 },
  { "region": "Sylhet", "district": "Habiganj", "city": "Habiganj", "covered_area": ["Shaistaganj", "Madhabpur", "Chunarughat", "Nabiganj"], "status": "active", "longitude": 91.4026, "latitude": 24.3745 },
  { "region": "Sylhet", "district": "Sunamganj", "city": "Sunamganj", "covered_area": ["Jagannathpur", "Chhatak", "Tahirpur", "Dowarabazar"], "status": "active", "longitude": 91.395, "latitude": 25.0658 },
  { "region": "Rangpur", "district": "Rangpur", "city": "Rangpur", "covered_area": ["Jahaj Company", "Pairaband", "Mahiganj", "Satmatha", "Lalbagh"], "status": "active", "longitude": 89.2752, "latitude": 25.746 },
  { "region": "Rangpur", "district": "Dinajpur", "city": "Dinajpur", "covered_area": ["Birampur", "Fulbari", "Parbatipur", "Nawabganj"], "status": "active", "longitude": 88.6414, "latitude": 25.6275 },
  { "region": "Rangpur", "district": "Thakurgaon", "city": "Thakurgaon", "covered_area": ["Pirganj", "Ranisankail", "Baliadangi"], "status": "active", "longitude": 88.466, "latitude": 26.0333 },
  { "region": "Rangpur", "district": "Panchagarh", "city": "Panchagarh", "covered_area": ["Tetulia", "Boda", "Atwari"], "status": "active", "longitude": 88.5658, "latitude": 26.3411 },
  { "region": "Rangpur", "district": "Nilphamari", "city": "Nilphamari", "covered_area": ["Saidpur", "Domar", "Jaldhaka"], "status": "active", "longitude": 88.856, "latitude": 25.931 },
  { "region": "Rangpur", "district": "Lalmonirhat", "city": "Lalmonirhat", "covered_area": ["Hatibandha", "Patgram", "Aditmari"], "status": "active", "longitude": 89.1662, "latitude": 25.9167 },
  { "region": "Rangpur", "district": "Kurigram", "city": "Kurigram", "covered_area": ["Nageshwari", "Bhurungamari", "Chilmari", "Ulipur"], "status": "active", "longitude": 89.65, "latitude": 25.8054 },
  { "region": "Rangpur", "district": "Gaibandha", "city": "Gaibandha", "covered_area": ["Gobindaganj", "Sundarganj", "Palashbari", "Phulchhari"], "status": "active", "longitude": 89.5418, "latitude": 25.3288 },
  { "region": "Khulna", "district": "Khulna", "city": "Khulna", "covered_area": ["Sonadanga", "Khalishpur", "Daulatpur", "Shib Bari", "Boyra"], "status": "active", "longitude": 89.5672, "latitude": 22.8456 },
  { "region": "Khulna", "district": "Jessore", "city": "Jessore", "covered_area": ["Chowgachha", "Bagharpara", "Manirampur", "Abhaynagar"], "status": "active", "longitude": 89.2167, "latitude": 23.17 },
  { "region": "Khulna", "district": "Satkhira", "city": "Satkhira", "covered_area": ["Tala", "Assasuni", "Kalaroa", "Debhata"], "status": "active", "longitude": 89.0809, "latitude": 22.7085 },
  { "region": "Khulna", "district": "Bagerhat", "city": "Bagerhat", "covered_area": ["Mongla", "Rampal", "Fakirhat", "Kachua"], "status": "active", "longitude": 89.7926, "latitude": 22.6516 },
  { "region": "Khulna", "district": "Magura", "city": "Magura", "covered_area": ["Sreepur", "Mohammadpur", "Shalikha"], "status": "active", "longitude": 89.4194, "latitude": 23.4853 },
  { "region": "Khulna", "district": "Narail", "city": "Narail", "covered_area": ["Lohagara", "Kalia", "Narail Sadar"], "status": "active", "longitude": 89.5, "latitude": 23.1667 },
  { "region": "Khulna", "district": "Jhenaidah", "city": "Jhenaidah", "covered_area": ["Harinakunda", "Shailkupa", "Kaliganj"], "status": "active", "longitude": 89.1833, "latitude": 23.5333 },
  { "region": "Khulna", "district": "Chuadanga", "city": "Chuadanga", "covered_area": ["Alamdanga", "Damurhuda", "Jibannagar"], "status": "active", "longitude": 88.85, "latitude": 23.64 },
  { "region": "Khulna", "district": "Meherpur", "city": "Meherpur", "covered_area": ["Mujibnagar", "Gangni"], "status": "active", "longitude": 88.6318, "latitude": 23.7623 },
  { "region": "Rajshahi", "district": "Rajshahi", "city": "Rajshahi", "covered_area": ["Boalia", "Rajpara", "Motihar", "Shah Makhdum", "Paba"], "status": "active", "longitude": 88.6087, "latitude": 24.3745 },
  { "region": "Rajshahi", "district": "Natore", "city": "Natore", "covered_area": ["Baraigram", "Bagatipara", "Lalpur", "Singra"], "status": "active", "longitude": 89, "latitude": 24.4167 },
  { "region": "Rajshahi", "district": "Naogaon", "city": "Naogaon", "covered_area": ["Manda", "Sapahar", "Porsha", "Patnitala"], "status": "active", "longitude": 88.93, "latitude": 24.8236 },
  { "region": "Rajshahi", "district": "Chapainawabganj", "city": "Chapainawabganj", "covered_area": ["Shibganj", "Bholahat", "Gomostapur"], "status": "active", "longitude": 88.27, "latitude": 24.5962 },
  { "region": "Rajshahi", "district": "Pabna", "city": "Pabna", "covered_area": ["Ishwardi", "Bera", "Chatmohar", "Atgharia"], "status": "active", "longitude": 89.2331, "latitude": 24.0037 },
  { "region": "Rajshahi", "district": "Sirajganj", "city": "Sirajganj", "covered_area": ["Ullapara", "Kazipur", "Shahjadpur", "Belkuchi"], "status": "active", "longitude": 89.7167, "latitude": 24.45 },
  { "region": "Rajshahi", "district": "Joypurhat", "city": "Joypurhat", "covered_area": ["Akkelpur", "Kalai", "Panchbibi"], "status": "active", "longitude": 89.0412, "latitude": 25.0953 },
  { "region": "Rajshahi", "district": "Bogura", "city": "Bogura", "covered_area": ["Sariakandi", "Sonatola", "Gabtali", "Sherpur", "Shajahanpur"], "status": "active", "longitude": 89.37, "latitude": 24.85 },
  { "region": "Barisal", "district": "Barisal", "city": "Barisal", "covered_area": ["Band Road", "Cox’s Road", "Kawnia", "Rupatali", "Nathullabad"], "status": "active", "longitude": 90.3667, "latitude": 22.7 },
  { "region": "Barisal", "district": "Bhola", "city": "Bhola", "covered_area": ["Borhanuddin", "Tazumuddin", "Daulatkhan", "Char Fasson"], "status": "active", "longitude": 90.6311, "latitude": 22.685 },
  { "region": "Barisal", "district": "Patuakhali", "city": "Patuakhali", "covered_area": ["Kalapara", "Mirzaganj", "Dashmina", "Galachipa"], "status": "active", "longitude": 90.3333, "latitude": 22.35 },
  { "region": "Barisal", "district": "Pirojpur", "city": "Pirojpur", "covered_area": ["Mathbaria", "Bhandaria", "Kawkhali", "Nazirpur"], "status": "active", "longitude": 89.975, "latitude": 22.5833 },
  { "region": "Barisal", "district": "Barguna", "city": "Barguna", "covered_area": ["Amtali", "Patharghata", "Betagi", "Bamna"], "status": "active", "longitude": 90.1167, "latitude": 22.1667 },
  { "region": "Barisal", "district": "Jhalokati", "city": "Jhalokati", "covered_area": ["Nalchity", "Rajapur", "Kathalia"], "status": "active", "longitude": 90.2167, "latitude": 22.6417 },
  { "region": "Mymensingh", "district": "Mymensingh", "city": "Mymensingh", "covered_area": ["Trishal", "Muktagachha", "Bhaluka", "Phulpur", "Haluaghat"], "status": "active", "longitude": 90.3987, "latitude": 24.7539 },
  { "region": "Mymensingh", "district": "Netrokona", "city": "Netrokona", "covered_area": ["Khaliajuri", "Mohanganj", "Durgapur", "Barhatta"], "status": "active", "longitude": 90.7333, "latitude": 24.8833 },
  { "region": "Mymensingh", "district": "Jamalpur", "city": "Jamalpur", "covered_area": ["Madarganj", "Islampur", "Sarishabari", "Baksiganj"], "status": "active", "longitude": 89.9333, "latitude": 24.9167 },
  { "region": "Mymensingh", "district": "Sherpur", "city": "Sherpur", "covered_area": ["Nakla", "Nalitabari", "Jhenaigati", "Sreebardi"], "status": "active", "longitude": 90.0333, "latitude": 25.0333 },
  { "region": "Chattogram", "district": "Bandarban", "city": "Bandarban", "covered_area": ["Bandarban Sadar", "Thanchi", "Lama", "Rowangchhari"], "status": "active", "longitude": 92.2186, "latitude": 22.1958 },
  { "region": "Khulna", "district": "Kushtia", "city": "Kushtia", "covered_area": ["Kushtia Sadar", "Kumarkhali", "Khoksa", "Mirpur", "Bheramara", "Daulatpur"], "status": "active", "longitude": 89.122, "latitude": 23.9013 }
];

// Component to handle auto-zooming when searching
const ZoomHandler = ({ filteredData }) => {
  const map = useMap();
  if (filteredData.length === 1) {
    map.setView([filteredData[0].latitude, filteredData[0].longitude], 10, { animate: true });
  } else if (filteredData.length === 0 || filteredData.length === coverageData.length) {
    map.setView([23.6850, 90.3563], 7, { animate: true });
  }
  return null;
};

const Coverage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = coverageData.filter(item => 
    item.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
              <Globe size={16} /> 64 Districts Nationwide
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Our Delivery <span className="text-orange-600">Network</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            Type your district name to instantly filter the map markers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Search Box & District List */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 h-[650px] flex flex-col">
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
              <input 
                type="text"
                placeholder="Find your district..."
                className="w-full pl-12 pr-4 py-5 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold text-slate-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar space-y-3">
              {filteredData.length > 0 ? (
                filteredData.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setSearchTerm(item.district)}
                    className="group p-5 rounded-2xl bg-slate-50 hover:bg-orange-600 transition-all cursor-pointer border border-slate-100 shadow-sm hover:shadow-orange-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-white transition-colors">{item.district}</h4>
                        <p className="text-xs text-slate-500 group-hover:text-orange-100">
                          {item.region} Division
                        </p>
                      </div>
                      <ChevronRight className="text-slate-300 group-hover:text-white" size={20} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-400 font-medium">No districts found!</p>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Filtered Map */}
          <div className="lg:col-span-2 h-[650px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white relative z-0">
            <MapContainer 
              center={[23.6850, 90.3563]} 
              zoom={7} 
              className="h-full w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              
              {/* This component updates the map zoom/center when searching */}
              <ZoomHandler filteredData={filteredData} />

              {/* Filtering Markers based on search */}
              {filteredData.map((pos, idx) => (
                <Marker 
                  key={idx} 
                  position={[pos.latitude, pos.longitude]} 
                  icon={customIcon}
                >
                  <Popup>
                    <div className="p-3 min-w-[150px]">
                      <h3 className="font-extrabold text-xl text-orange-600 border-b pb-2 mb-2">{pos.district}</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Coverage Hubs:</p>
                      <div className="flex flex-wrap gap-1">
                        {pos.covered_area.map((area, i) => (
                          <span key={i} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[10px] font-bold">
                            {area}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-green-600 bg-green-50 py-1 px-3 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        OPERATIONAL
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Coverage;
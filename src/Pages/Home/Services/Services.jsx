import React from 'react';
import { Truck, ShieldCheck, Clock, Globe, Package, MapPin, CheckCircle } from 'lucide-react';

const Services = () => {
  return (
    <div className="bg-white">
      {/* 1. Features Grid Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-orange-600 font-bold tracking-wide uppercase text-sm">Our Features</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-2">
            World-class Logistics Solutions
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            We provide the fastest and most reliable parcel delivery services tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Truck className="w-10 h-10" />, title: "Fast Delivery", desc: "Same day delivery for all local shipments within the city." },
            { icon: <ShieldCheck className="w-10 h-10" />, title: "Secure Shipping", desc: "Every package is insured and handled with extreme care." },
            { icon: <Clock className="w-10 h-10" />, title: "24/7 Support", desc: "Our customer service team is always online to help you." },
            { icon: <Globe className="w-10 h-10" />, title: "Global Reach", desc: "Shipping to over 200+ countries with full tracking." },
          ].map((feature, index) => (
            <div key={index} className="p-8 border border-gray-100 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-2xl hover:shadow-orange-100 transition-all duration-300 group">
              <div className="text-orange-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. "How It Works" Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">How We Deliver Your Happiness</h2>
            <p className="text-slate-400 mt-4 text-lg">Four simple steps to get your parcel delivered.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Step 1 */}
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-orange-500/20">1</div>
              <h3 className="text-xl font-bold mb-2">Book Parcel</h3>
              <p className="text-slate-400">Enter details and choose your delivery plan.</p>
            </div>
            {/* Step 2 */}
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-orange-500/20">2</div>
              <h3 className="text-xl font-bold mb-2">Pickup</h3>
              <p className="text-slate-400">Our rider collects the parcel from your doorstep.</p>
            </div>
            {/* Step 3 */}
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-orange-500/20">3</div>
              <h3 className="text-xl font-bold mb-2">In Transit</h3>
              <p className="text-slate-400">Your package moves through our safe network.</p>
            </div>
            {/* Step 4 */}
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-orange-500/20">4</div>
              <h3 className="text-xl font-bold mb-2">Delivery</h3>
              <p className="text-slate-400">The recipient receives the parcel securely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Real-time Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-extrabold text-slate-900">95M+</p>
              <p className="text-orange-600 font-semibold uppercase tracking-widest text-xs mt-2">Delivered Goods</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-slate-900">120k</p>
              <p className="text-orange-600 font-semibold uppercase tracking-widest text-xs mt-2">Satisfied Clients</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-slate-900">450+</p>
              <p className="text-orange-600 font-semibold uppercase tracking-widest text-xs mt-2">Delivery Vans</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-slate-900">100%</p>
              <p className="text-orange-600 font-semibold uppercase tracking-widest text-xs mt-2">Safe & Secure</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tracking CTA Section */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-5xl mx-auto px-6 bg-orange-600 rounded-3xl p-10 md:p-16 text-center shadow-xl shadow-orange-200">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Track Your Parcel Instantly</h2>
          <p className="text-orange-100 mb-10 text-lg">Enter your tracking ID to see the real-time location of your package.</p>
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="Enter Tracking ID (e.g. PKG-9982)" 
              className="flex-1 px-6 py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-300 text-lg"
            />
            <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-colors text-lg">
              Track Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
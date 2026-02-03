import React from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, Star, Truck, ShieldCheck, 
  Clock, Globe, Package, CheckCircle 
} from 'lucide-react';

const Services = () => {
  // Animation Variants for reusability
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* 1. Features Grid Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-orange-600 font-extrabold tracking-wide uppercase text-sm">
            Our Features
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-2">
            World-class Logistics Solutions
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            We provide the fastest and most reliable parcel delivery services tailored to your needs.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { icon: <Truck />, title: "Fast Delivery", desc: "Same day delivery for all local shipments within the city." },
            { icon: <ShieldCheck />, title: "Secure Shipping", desc: "Every package is insured and handled with extreme care." },
            { icon: <Clock />, title: "24/7 Support", desc: "Our customer service team is always online to help you." },
            { icon: <Globe />, title: "Global Reach", desc: "Shipping to over 200+ countries with full tracking." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="p-8 border border-gray-100 rounded-2xl bg-gray-50 transition-all duration-500 group hover:bg-orange-600 hover:shadow-2xl cursor-pointer"
            >
              <div className="text-orange-600 mb-4 transition-colors duration-500 group-hover:text-white">
                {React.cloneElement(feature.icon, { size: 40 })}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 transition-colors duration-500 group-hover:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed transition-colors duration-500 group-hover:text-orange-50">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
     
      {/* Strategic Partners Slider */}
      <section className="py-12 bg-white overflow-hidden border-y border-gray-100 relative">
        <div className="container mx-auto px-4 mb-10 text-center">
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-sm">
            Our Strategic Logistics Partners
          </p>
        </div>
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <motion.div
            className="flex whitespace-nowrap gap-12 md:gap-24 items-center"
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          >
            {[
              "https://upload.wikimedia.org/wikipedia/commons/b/b1/FedEx_Corporation_-_Logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/a/ac/DHL_Logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/e/e6/Maersk_Group_Logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/c/c5/Target_Corporation_logo_%28vector%29.svg",
              "https://upload.wikimedia.org/wikipedia/commons/b/b1/FedEx_Corporation_-_Logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/a/ac/DHL_Logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
            ].map((logo, index) => (
              <img key={index} src={logo} alt="Partner" className="h-8 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" />
            ))}
          </motion.div>
          <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </div>
      </section>

      {/* 2. "How It Works" Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold">How We Deliver Your Happiness</h2>
            <p className="text-slate-400 mt-4 text-lg">Four simple steps to get your parcel delivered.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-12"
          >
            {[
              { step: 1, title: "Book Parcel", desc: "Enter details and choose your delivery plan." },
              { step: 2, title: "Pickup", desc: "Our rider collects the parcel from your doorstep." },
              { step: 3, title: "In Transit", desc: "Your package moves through our safe network." },
              { step: 4, title: "Delivery", desc: "The recipient receives the parcel securely." },
            ].map((item, idx) => (
              <motion.div variants={fadeInUp} key={idx} className="text-center group">
                <div className="w-20 h-20 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-8 text-2xl font-bold rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-xl shadow-orange-600/20">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Real-time Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center"
          >
            {[
              { val: "95M+", label: "Delivered Goods" },
              { val: "120k", label: "Satisfied Clients" },
              { val: "450+", label: "Delivery Vans" },
              { val: "100%", label: "Safe & Secure" },
            ].map((stat, i) => (
              <motion.div variants={fadeInUp} key={i}>
                <p className="text-5xl font-black text-slate-900 mb-2">{stat.val}</p>
                <p className="text-orange-600 font-bold uppercase tracking-widest text-[10px]">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Become a Merchant Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center"
          >
            <div className="lg:w-1/2 p-12 md:p-20 space-y-8 text-left">
              <div>
                <h2 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4">Grow Your Business</h2>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1]">Become an Edifice <br /> <span className="text-orange-500">Merchant Partner</span></h3>
                <p className="text-slate-400 mt-6 text-lg leading-relaxed">Join thousands of businesses who trust us to deliver their products.</p>
              </div>
              <div className="space-y-4">
                {["Preferential shipping rates", "Dedicated account manager", "API integration", "Customized tracking"].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-200">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-orange-600 text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-lg shadow-orange-600/30">
                Become a Merchant
              </motion.button>
            </div>

            <div className="lg:w-1/2 w-full min-h-[500px] bg-orange-600 relative flex items-center justify-center p-12 overflow-hidden">
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-4 rounded-2xl"><Package className="w-8 h-8 text-green-600" /></div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">Today's Orders</p>
                    <p className="text-3xl font-black text-slate-900">+1,240</p>
                  </div>
                </div>
                <p className="text-slate-500 italic">"Switching to Edifice increased our delivery speed by 40%."</p>
                <div className="flex items-center gap-2 border-t pt-4"><div className="w-8 h-8 rounded-full bg-slate-200"></div><span className="text-sm font-bold text-slate-800">— CEO, Casio Store</span></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-24 bg-slate-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-orange-600 font-extrabold uppercase tracking-widest text-sm mb-3">Testimonials</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900">What Our <span className="text-orange-600">Clients</span> Say</h3>
          </motion.div>

          <div id="review-container" className="flex gap-8 overflow-x-auto pb-10 no-scrollbar snap-x">
            {[
              { id: 1, name: "Sarah Jenkins", role: "E-store Owner", text: "Edifice has completely changed my business. Their delivery is always on time!", rating: 5 },
              { id: 2, name: "Michael Chen", role: "Individual Sender", text: "The live tracking feature is so accurate. Highly recommended!", rating: 5 },
              { id: 3, name: "David Miller", role: "Merchant", text: "Professional and secure. Their merchant support team is world-class.", rating: 5 },
            ].map((review) => (
              <motion.div key={review.id} whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 50 }} className="min-w-[320px] md:min-w-[450px] bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 snap-center">
                <div className="flex gap-1 mb-6 text-orange-500">{[...Array(review.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
                <p className="text-slate-600 text-xl leading-relaxed mb-8 font-medium">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 font-black text-2xl">{review.name.charAt(0)}</div>
                  <div className="text-left">
                    <h4 className="font-bold text-slate-900 text-lg">{review.name}</h4>
                    <p className="text-orange-600 text-xs font-bold uppercase tracking-widest">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-12">
            <button onClick={() => document.getElementById('review-container').scrollBy({ left: -400, behavior: 'smooth' })} className="p-5 rounded-full border border-slate-200 bg-white hover:bg-orange-600 hover:text-white transition-all shadow-xl shadow-slate-200 active:scale-90"><ChevronLeft size={24} /></button>
            <button onClick={() => document.getElementById('review-container').scrollBy({ left: 400, behavior: 'smooth' })} className="p-5 rounded-full border border-slate-200 bg-white hover:bg-orange-600 hover:text-white transition-all shadow-xl shadow-slate-200 active:scale-90"><ChevronRight size={24} /></button>
          </div>
        </div>
      </section>

      {/* Tracking CTA Section */}
      <section className="py-24 bg-white">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-6 bg-orange-600 rounded-[3rem] p-12 md:p-20 text-center shadow-2xl shadow-orange-200 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-40 h-40 border-4 border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 border-4 border-white rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Track Your Parcel Instantly</h2>
          <p className="text-orange-100 mb-12 text-lg max-w-xl mx-auto">Enter your tracking ID to see the real-time location of your package.</p>
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto relative z-10">
            <input type="text" placeholder="PKG-9982" className="flex-1 px-8 py-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-400 text-lg shadow-inner" />
            <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-black transition-all shadow-lg text-lg">Track Now</button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
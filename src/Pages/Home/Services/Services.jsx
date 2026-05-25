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

    {/* ✅ Section Header */}
    <div className="text-center mb-16">
      <span className="inline-block text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-50 border border-orange-100 px-5 py-2 rounded-full mb-4">
        Our Numbers
      </span>
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
        Trusted by <span className="text-orange-600">Millions</span>
      </h2>
    </div>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {[
        { val: "95M+", label: "Delivered Goods", icon: "📦", desc: "Parcels delivered nationwide" },
        { val: "120K+", label: "Satisfied Clients", icon: "🤝", desc: "Happy customers & counting" },
        { val: "450+", label: "Delivery Vans", icon: "🚚", desc: "Active fleet across regions" },
        { val: "100%", label: "Safe & Secure", icon: "🔒", desc: "Insured & tracked deliveries" },
      ].map((stat, i) => (
        <motion.div
          variants={fadeInUp}
          key={i}
          className="group relative bg-slate-50 hover:bg-slate-900 border border-slate-100 rounded-[2rem] p-8 text-center transition-all duration-300 cursor-default overflow-hidden"
        >
          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-600 opacity-20 rounded-full blur-2xl"></div>
          </div>

          {/* Icon */}
          <div className="relative z-10 w-14 h-14 mx-auto mb-5 bg-white group-hover:bg-orange-600/20 border border-slate-200 group-hover:border-orange-500/30 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 shadow-sm">
            {stat.icon}
          </div>

          {/* Value */}
          <p className="relative z-10 text-5xl font-black text-slate-900 group-hover:text-white mb-1 transition-colors duration-300 tracking-tighter">
            {stat.val}
          </p>

          {/* Label */}
          <p className="relative z-10 text-orange-600 group-hover:text-orange-400 font-black uppercase tracking-widest text-[10px] mb-3 transition-colors duration-300">
            {stat.label}
          </p>

          {/* Divider */}
          <div className="relative z-10 w-8 h-[2px] bg-slate-200 group-hover:bg-orange-600 mx-auto mb-3 transition-colors duration-300 rounded-full"></div>

          {/* Description */}
          <p className="relative z-10 text-slate-400 group-hover:text-slate-400 text-xs font-medium transition-colors duration-300">
            {stat.desc}
          </p>
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
     <section className="py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden relative">
  <div className="max-w-7xl mx-auto px-6">
    
    {/* হেডার পার্ট */}
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
      <span className="text-orange-600 font-bold uppercase tracking-widest text-xs bg-orange-50 px-4 py-1.5 rounded-full mb-3 inline-block">
        Testimonials
      </span>
      <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-2">
        What Our <span className="text-orange-600">Clients</span> Say
      </h3>
    </motion.div>

    {/* রিভিউ কন্টেইনার */}
    <div id="review-container" className="flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x scroll-smooth">
      {[
        { id: 1, name: "Sarah Jenkins", role: "E-store Owner", text: "Edifice has completely changed my business. Their delivery is always on time!", rating: 5 },
        { id: 2, name: "Michael Chen", role: "Individual Sender", text: "The live tracking feature is so accurate. Highly recommended!", rating: 5 },
        { id: 3, name: "David Miller", role: "Merchant", text: "Professional and secure. Their merchant support team is world-class.", rating: 5 },
      ].map((review) => (
        <motion.div 
          key={review.id} 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: review.id * 0.1 }}
          className="min-w-[310px] md:min-w-[430px] bg-white p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-md border border-slate-100 snap-center flex flex-col justify-between transition-shadow duration-300"
        >
          <div>
            {/* স্টার রেটিং */}
            <div className="flex gap-1 mb-5 text-amber-500">
              {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" stroke="none" />)}
            </div>
            {/* টেক্সট */}
            <p className="text-slate-600 text-lg leading-relaxed mb-6 font-normal italic">
              "{review.text}"
            </p>
          </div>

          {/* ইউজার ইনফো */}
          <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-50">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 font-bold text-lg border border-orange-100">
              {review.name.charAt(0)}
            </div>
            <div className="text-left">
              <h4 className="font-bold text-slate-800 text-base">{review.name}</h4>
              <p className="text-orange-600 text-[11px] font-extrabold uppercase tracking-wider mt-0.5">{review.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* নেভিগেশন বাটন */}
    <div className="flex justify-center gap-4 mt-8">
      <button onClick={() => document.getElementById('review-container').scrollBy({ left: -430, behavior: 'smooth' })} className="p-4 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all active:scale-95 shadow-sm"><ChevronLeft size={20} /></button>
      <button onClick={() => document.getElementById('review-container').scrollBy({ left: 430, behavior: 'smooth' })} className="p-4 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all active:scale-95 shadow-sm"><ChevronRight size={20} /></button>
    </div>

  </div>
</section>

      {/* Tracking CTA Section */}
    <section className="py-24 bg-white">
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    className="max-w-5xl mx-auto px-6"
  >
    <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
      
      {/* ✅ Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-orange-600 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-orange-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600 opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* ✅ Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 bg-orange-600/20 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-widest px-5 py-2 rounded-full mb-8">
        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
        Live Tracking
      </div>

      {/* ✅ Heading */}
      <h2 className="relative z-10 text-4xl md:text-6xl font-black text-white mb-4 leading-tight tracking-tighter">
        Track Your Parcel
        <span className="block text-orange-500">Instantly.</span>
      </h2>

      <p className="relative z-10 text-slate-400 mb-12 text-lg max-w-xl mx-auto font-medium">
        Enter your tracking ID to see the real-time status of your package.
      </p>

      {/* ✅ Input Group */}
      <div className="relative z-10 flex flex-col md:flex-row gap-3 max-w-2xl mx-auto bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-sm">
        <input
          type="text"
          placeholder="Enter Tracking ID  e.g. PKG-9982"
          className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-base font-medium transition-all"
        />
        <button className="bg-orange-600 hover:bg-orange-500 active:scale-95 text-white px-10 py-4 rounded-xl font-black transition-all shadow-lg shadow-orange-900/50 text-base uppercase tracking-wider whitespace-nowrap">
          Track Now →
        </button>
      </div>

      {/* ✅ Trust badges */}
      <div className="relative z-10 flex items-center justify-center gap-6 mt-10 flex-wrap">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
          <span className="text-green-500">✓</span> Real-time updates
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
          <span className="text-green-500">✓</span> No login required
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
          <span className="text-green-500">✓</span> Instant results
        </div>
      </div>

    </div>
  </motion.div>
</section>
    </div>
  );
};

export default Services;
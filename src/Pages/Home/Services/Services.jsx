import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import log from '../../../assets/brands/amazon.png';
import log2 from '../../../assets/brands/amazon_vector.png';
import log3 from '../../../assets/brands/casio.png';
import log4 from '../../../assets/brands/moonstar.png';
import log5 from '../../../assets/brands/randstad.png';
import log6 from '../../../assets/brands/star.png';
import log7 from '../../../assets/brands/start_people.png';
import {
  Truck,
  ShieldCheck,
  Clock,
  Globe,
  Package,
  MapPin,
  CheckCircle,
} from "lucide-react";

const Services = () => {
  return (
    <div className="bg-white">
      {/* 1. Features Grid Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-orange-600 font-extrabold tracking-wide uppercase text-3xl">
            Our Features
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-2">
            World-class Logistics Solutions
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            We provide the fastest and most reliable parcel delivery services
            tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Truck className="w-10 h-10" />,
              title: "Fast Delivery",
              desc: "Same day delivery for all local shipments within the city.",
            },
            {
              icon: <ShieldCheck className="w-10 h-10" />,
              title: "Secure Shipping",
              desc: "Every package is insured and handled with extreme care.",
            },
            {
              icon: <Clock className="w-10 h-10" />,
              title: "24/7 Support",
              desc: "Our customer service team is always online to help you.",
            },
            {
              icon: <Globe className="w-10 h-10" />,
              title: "Global Reach",
              desc: "Shipping to over 200+ countries with full tracking.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-8 border border-gray-100 rounded-2xl bg-gray-50 
                 transition-all duration-500 ease-in-out group 
                 hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-300 hover:-translate-y-2 cursor-pointer"
            >
              {/* Icon - Turns white on hover */}
              <div className="text-orange-600 mb-4 transition-colors duration-500 group-hover:text-white">
                {feature.icon}
              </div>

              {/* Title - Turns white on hover */}
              <h3 className="text-xl font-bold text-slate-800 mb-2 transition-colors duration-500 group-hover:text-white">
                {feature.title}
              </h3>

              {/* Description - Turns light-orange/white on hover */}
              <p className="text-gray-600 leading-relaxed transition-colors duration-500 group-hover:text-orange-50">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
     
    {/* For the slide processs */}

   <section className="py-12 bg-white overflow-hidden border-y border-gray-100 relative">
  {/* Section Header */}
  <div className="container mx-auto px-4 mb-10 text-center">
    <p className="text-slate-500 font-extrabold uppercase tracking-[0.2em] text-2xl">
      Our Strategic Logistics Partners
    </p>
  </div>

  {/* Logo Slider Container */}
  <div className="relative flex items-center">
    
    {/* Left Gradient Overlay */}
    <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>

    <motion.div
      className="flex whitespace-nowrap gap-12 md:gap-24 items-center"
      animate={{ x: ["0%", "-50%"] }} 
      transition={{
        duration: 25, 
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {[
        "https://upload.wikimedia.org/wikipedia/commons/b/b1/FedEx_Corporation_-_Logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/DHL_Logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
       // "https://upload.wikimedia.org/wikipedia/commons/1/1b/UPS_Logo_vector.svg",
        "https://upload.wikimedia.org/wikipedia/commons/e/e6/Maersk_Group_Logo.svg",
       // "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/c/c5/Target_Corporation_logo_%28vector%29.svg",
       // "https://upload.wikimedia.org/wikipedia/commons/b/b1/FedEx_Corporation_-_Logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/DHL_Logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/1/1b/UPS_Logo_vector.svg",
        "https://upload.wikimedia.org/wikipedia/commons/e/e6/Maersk_Group_Logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/c/c5/Target_Corporation_logo_%28vector%29.svg",
      ].map((logo, index) => (
        <img
          key={index}
          src={logo}
          alt="Company Partner"
          /* Classes modified for full color and nice hover zoom */
          className="h-8 md:h-12 w-auto transition-transform duration-300 cursor-pointer object-contain hover:scale-110"
        />
      ))}
    </motion.div>

    {/* Right Gradient Overlay */}
    <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
  </div>
</section>

      {/* 2. "How It Works" Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
              How We Deliver Your Happiness
            </h2>
            <p className="text-slate-400 mt-4 text-lg">
              Four simple steps to get your parcel delivered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Step 1 */}
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-orange-500/20">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Book Parcel</h3>
              <p className="text-slate-400">
                Enter details and choose your delivery plan.
              </p>
            </div>
            {/* Step 2 */}
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-orange-500/20">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Pickup</h3>
              <p className="text-slate-400">
                Our rider collects the parcel from your doorstep.
              </p>
            </div>
            {/* Step 3 */}
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-orange-500/20">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">In Transit</h3>
              <p className="text-slate-400">
                Your package moves through our safe network.
              </p>
            </div>
            {/* Step 4 */}
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-orange-500/20">
                4
              </div>
              <h3 className="text-xl font-bold mb-2">Delivery</h3>
              <p className="text-slate-400">
                The recipient receives the parcel securely.
              </p>
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
              <p className="text-orange-600 font-semibold uppercase tracking-widest text-xs mt-2">
                Delivered Goods
              </p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-slate-900">120k</p>
              <p className="text-orange-600 font-semibold uppercase tracking-widest text-xs mt-2">
                Satisfied Clients
              </p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-slate-900">450+</p>
              <p className="text-orange-600 font-semibold uppercase tracking-widest text-xs mt-2">
                Delivery Vans
              </p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-slate-900">100%</p>
              <p className="text-orange-600 font-semibold uppercase tracking-widest text-xs mt-2">
                Safe & Secure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Merchant Section */}
<section data-aos="zoom-in-up" className="py-20 bg-white">
  <div  className="max-w-7xl mx-auto px-6">
    <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center">
      
      {/* Left Side: Content & Benefits */}
      <div className="lg:w-1/2 p-10 md:p-16 space-y-8">
        <div>
          <h2 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-3">
            Grow Your Business
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Become an Edifice <br /> <span className="text-orange-500">Merchant Partner</span>
          </h3>
          <p className="text-slate-400 mt-6 text-lg leading-relaxed">
            Join thousands of businesses who trust us to deliver their products. 
            From local shops to large enterprises, we provide the logistics power you need.
          </p>
        </div>

        {/* Benefit List */}
        <div className="space-y-4">
          {[
            "Preferential shipping rates for high volume",
            "Dedicated account manager for your business",
            "API integration with your e-commerce store",
            "Customized delivery tracking for your customers"
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3 text-slate-200">
              <div className="bg-orange-500/20 p-1 rounded-full">
                <CheckCircle className="w-5 h-5 text-orange-500" />
              </div>
              <span className="font-medium">{benefit}</span>
            </div>
          ))}
        </div>

        <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-orange-600/30">
          Become a Merchant
        </button>
        
      </div>

      {/* Right Side: Decorative Image/Box Area */}
      <div className="lg:w-1/2 w-full h-full min-h-[400px] bg-orange-600 relative flex items-center justify-center p-12">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full -mr-20 -mt-20 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-700 rounded-full -ml-10 -mb-10 opacity-30"></div>
        
        {/* Floating Stats Card for "Real" feel */}
        <div className="relative bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-2xl">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-bold uppercase">Today's Orders</p>
              <p className="text-2xl font-black text-slate-900">+1,240</p>
            </div>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 w-[75%] rounded-full"></div>
          </div>
          <p className="text-slate-500 text-sm italic">
            "Switching to Edifice increased our delivery speed by 40%."
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200"></div>
            <span className="text-sm font-bold text-slate-800">— CEO, Casio Store</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* --- Customer Reviews Section Start --- */}
<section className="py-24 bg-slate-50 overflow-hidden relative">
  <div className="max-w-7xl mx-auto px-6">
    
    {/* Header - Now Centered */}
    <div className="text-center mb-16">
      <h2 className="text-orange-600 font-extrabold uppercase tracking-widest text-lg mb-3">
        Testimonials
      </h2>
      <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
        What Our <span className="text-orange-600">Clients</span> Say
      </h3>
      <p className="text-slate-500 mt-4 max-w-lg mx-auto">
        Discover why thousands of businesses and individuals trust Edifice for their daily deliveries.
      </p>
    </div>

    {/* Scrollable Container */}
    <div 
      id="review-container"
      className="flex gap-8 overflow-x-auto pb-10 snap-x snap-mandatory scrollbar-hide no-scrollbar"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {[
        { id: 1, name: "Sarah Jenkins", role: "E-store Owner", text: "Edifice has completely changed my business. Their delivery is always on time!", rating: 5 },
        { id: 2, name: "Michael Chen", role: "Individual Sender", text: "The live tracking feature is so accurate. Highly recommended for personal parcels!", rating: 5 },
        { id: 3, name: "David Miller", role: "Merchant", text: "Professional and secure. Their merchant support team is always there to help.", rating: 5 },
        { id: 4, name: "Emma Watson", role: "Online Shopper", text: "The riders are polite and the packaging is always handled with extreme care.", rating: 4 },
        { id: 5, name: "Robert Fox", role: "Business Manager", text: "Reliable partner for our corporate logistics. We've seen a 30% reduction in delivery complaints.", rating: 5 }
      ].map((review) => (
        <div 
          key={review.id}
          className="min-w-[320px] md:min-w-[450px] bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 snap-center transition-all duration-300 hover:border-orange-200"
        >
          <div className="flex gap-1 mb-6 text-orange-500">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
          </div>

          <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium italic">
            "{review.text}"
          </p>

          <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-orange-600 font-black text-xl border-b-4 border-orange-600 uppercase">
              {review.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg leading-none mb-1">{review.name}</h4>
              <p className="text-orange-600 text-sm font-bold uppercase tracking-wider">{review.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Centered Navigation Buttons at the Bottom */}
    <div className="flex justify-center gap-6 mt-8">
      <button 
        onClick={() => {
          const container = document.getElementById('review-container');
          container.scrollBy({ left: -400, behavior: 'smooth' });
        }}
        className="group p-5 rounded-full border-2 border-slate-200 bg-white hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all shadow-lg active:scale-90"
        aria-label="Previous review"
      >
        <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      <button 
        onClick={() => {
          const container = document.getElementById('review-container');
          container.scrollBy({ left: 400, behavior: 'smooth' });
        }}
        className="group p-5 rounded-full border-2 border-slate-200 bg-white hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all shadow-lg active:scale-90"
        aria-label="Next review"
      >
        <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
</section>
{/* --- Customer Reviews Section End --- */}

      {/* 4. Tracking CTA Section */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-5xl mx-auto px-6 bg-orange-600 rounded-3xl p-10 md:p-16 text-center shadow-xl shadow-orange-200">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Track Your Parcel Instantly
          </h2>
          <p className="text-orange-100 mb-10 text-lg">
            Enter your tracking ID to see the real-time location of your
            package.
          </p>
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

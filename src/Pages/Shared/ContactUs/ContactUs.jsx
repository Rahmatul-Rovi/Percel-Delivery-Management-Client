import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare,
  Clock
} from "lucide-react";
import Swal from "sweetalert2";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Professional Alert after clicking send
    Swal.fire({
      title: "Message Sent!",
      text: "Our team will get back to you within 24 hours.",
      icon: "success",
      confirmButtonColor: "#f97316",
    });
    e.target.reset();
  };

  const contactInfo = [
    {
      icon: <Phone className="text-orange-600" />,
      title: "Call Us",
      details: "+880 1234-567890",
      subText: "Mon-Fri from 9am to 6pm"
    },
    {
      icon: <Mail className="text-orange-600" />,
      title: "Email Us",
      details: "support@edifice.com",
      subText: "Online support 24/7"
    },
    {
      icon: <MapPin className="text-orange-600" />,
      title: "Visit Us",
      details: "123 Logistics Plaza",
      subText: "Dhaka, Bangladesh"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      {/* 1. Header Section */}
      <section className="py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h2 className="text-orange-600 font-extrabold uppercase tracking-[0.2em] text-sm mb-4">
            Get In Touch
          </h2>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
            We're here to <span className="text-orange-500">help you.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Have a question about your parcel or interested in our business solutions? 
            Drop us a message and we'll respond as soon as possible.
          </p>
        </motion.div>
      </section>

      {/* 2. Contact Grid & Form */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Side: Contact Info Cards */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-start gap-6"
              >
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                  {info.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {info.title}
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 font-bold">{info.details}</p>
                  <p className="text-slate-400 text-sm mt-1">{info.subText}</p>
                </div>
              </motion.div>
            ))}
            
            {/* Simple Map Placeholder */}
            <div className="h-64 rounded-[2.5rem] bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-600 font-bold italic">
                   Interactive Map Coming Soon
                </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-orange-500/20 dark:text-white transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-2">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-orange-500/20 dark:text-white transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-2">Subject</label>
                <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-orange-500/20 dark:text-white transition-all outline-none appearance-none">
                  <option>General Inquiry</option>
                  <option>Business Partnership</option>
                  <option>Rider Support</option>
                  <option>Tracking Issue</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-2">Your Message</label>
                <textarea 
                  required
                  rows="5" 
                  placeholder="How can we help you?" 
                  className="w-full px-6 py-4 rounded-3xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-orange-500/20 dark:text-white transition-all outline-none resize-none"
                ></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white px-12 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-orange-600/20 transition-all"
              >
                <Send size={20} />
                Send Message
              </motion.button>
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default ContactUs;
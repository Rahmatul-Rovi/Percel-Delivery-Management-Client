import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Award, 
  Zap,
  Globe2,
  HeartHandshake
} from "lucide-react";

const AboutUs = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stats = [
    { icon: <Users size={24} />, label: "Team Members", value: "150+" },
    { icon: <Globe2 size={24} />, label: "Cities Covered", value: "45+" },
    { icon: <Zap size={24} />, label: "Daily Deliveries", value: "12k+" },
    { icon: <Award size={24} />, label: "Years Experience", value: "8+" },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* 1. Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-orange-600 font-extrabold uppercase tracking-widest text-sm mb-4">
              Our Story
            </h2>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
              Moving the world, <br /> 
              <span className="text-orange-500">one parcel at a time.</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Founded in 2018, Edifice Parcel started with a simple mission: to make logistics 
              seamless, transparent, and accessible for everyone. Today, we are one of the 
              fastest-growing delivery networks in the region.
            </p>
          </motion.div>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 dark:opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-orange-500 rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800"
            >
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-500/10 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To empower businesses and individuals by providing a reliable, technology-driven 
                logistics ecosystem that ensures every package reaches its destination safely and on time.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800"
            >
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-500/10 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <HeartHandshake size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To become the global standard for modern logistics, recognized for our commitment 
                to innovation, sustainability, and exceptional customer experience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Stats Counter */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-orange-500 dark:text-orange-400 flex justify-center mb-4">
                  {stat.icon}
                </div>
                <h4 className="text-4xl font-black text-slate-900 dark:text-white mb-1">
                  {stat.value}
                </h4>
                <p className="text-slate-500 dark:text-slate-500 font-bold uppercase tracking-tighter text-xs">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Team Culture / CTA */}
      <section className="py-24 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-slate-900 dark:bg-orange-600 rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Want to be part of our journey?
          </h2>
          <p className="text-slate-300 dark:text-orange-50 mb-10 text-lg max-w-2xl mx-auto">
            We are always looking for talented individuals, riders, and partners to join our 
            growing community. Let's build the future of logistics together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold hover:bg-orange-50 transition-colors shadow-xl">
              Join as a Rider
            </button>
            <button className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-bold hover:bg-white/10 transition-colors">
              Contact Sales
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;
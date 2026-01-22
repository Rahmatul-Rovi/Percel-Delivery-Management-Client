import React from "react";
import EdificeLogo from "../EdificeLogo/EdificeLogo";
import { Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Column 1: Brand & Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <EdificeLogo />
            <span className="text-2xl font-bold text-white tracking-tight">Edifice Logistics</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Simplifying logistics for a modern world. We provide fast, secure, and reliable delivery solutions tailored to your business and personal needs since 1992.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-orange-600 hover:text-white transition-all">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-orange-600 hover:text-white transition-all">
              <Youtube size={18} />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-orange-600 hover:text-white transition-all">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Track a Parcel</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Our Services</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Pricing Plans</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Pickup Request</a></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Support</h3>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Refund Policy</a></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-orange-500 shrink-0" />
              <span>123 Delivery Lane, Tech City, TC 54321</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-orange-500 shrink-0" />
              <span>+1 (555) 000-1234</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-orange-500 shrink-0" />
              <span>edifice@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>Copyright © {new Date().getFullYear()} Edifice Logistics. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Powered by ACME Industries</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
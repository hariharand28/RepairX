import React from 'react';
import { Link } from 'react-router-dom'; // Add this import
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Identity */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-[#111827] tracking-tighter">
              REPAIR<span className="text-blue-600">X</span>
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              The gold standard in modern device restoration and home system maintenance. Professional, verified, and premium.
            </p>
          </div>

          {/* Quick Links - Made Clickable */}
          <div className="space-y-6">
            <h4 className="text-sm font-black text-[#111827] uppercase tracking-widest">Services</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li><Link to="/services" className="hover:text-blue-600 transition-colors">Smartphone Repair</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition-colors">Laptop & Mac</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition-colors">Modern Plumbing</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition-colors">Electrical Systems</Link></li>
            </ul>
          </div>

          {/* Support - Made Clickable */}
          <div className="space-y-6">
            <h4 className="text-sm font-black text-[#111827] uppercase tracking-widest">Support</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              {/* Note: This links to a section ID on the homepage */}
              <li><a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Verified Pros</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="text-sm font-black text-[#111827] uppercase tracking-widest">Contact</h4>
            <div className="space-y-4 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-blue-600" />
                <a href="mailto:support@repairx.com" className="hover:text-blue-600">support@repairx.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-blue-600" />
                <a href="tel:1800REPAIRX" className="hover:text-blue-600">1800-REPAIR-X</a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-blue-600" />
                <span>Chennai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">
            © 2026 RepairX Platform. All Rights Reserved.
          </p>
          <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">
            Developed by Hariharan D
          </p>
        </div>
      </div>
    </footer>
  );
}
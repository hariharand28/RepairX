import React from 'react';
import { ShieldCheck, Zap, Award, MapPin, ThumbsUp, Headset, CheckCircle, Wallet } from 'lucide-react';
import trustBg from '../assets/trust-bg.jpg';

const features = [
  { icon: ShieldCheck, title: "100% Genuine Parts", desc: "We never compromise on quality. Only OEM parts are used." },
  { icon: Zap, title: "Same Day Service", desc: "Book before 12 PM for same-day expert doorstep visits." },
  { icon: Award, title: "90-Day Warranty", desc: "Every repair is backed by our comprehensive service guarantee." },
  { icon: MapPin, title: "Real-time Tracking", desc: "Track your technician's arrival and repair progress in real-time." }
];

const floatingBadges = [
  { icon: ThumbsUp, label: "Expert Technicians", position: "top-[10%] left-0" },
  { icon: Headset, label: "24/7 Support", position: "top-[20%] right-[-10%]" },
  { icon: CheckCircle, label: "Trusted & Verified", position: "bottom-[25%] left-[-5%]" },
  { icon: Wallet, label: "Secure Payments", position: "bottom-[15%] right-[-8%]" }
];

export default function TrustSection() {
  return (
    <section 
      className="py-24 relative bg-white bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${trustBg})` }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          
          {/* Left Content: Two-Line Heading Alignment */}
          <div className="w-full lg:w-[55%] space-y-16">
            <div className="space-y-6">
              <div className="h-1.5 w-14 bg-blue-600 rounded-full"></div>
              {/* Heading reformatted into two lines as requested */}
              <h2 className="text-5xl lg:text-6xl font-black text-[#111827] leading-[1.1] tracking-tight">
                The Gold Standard <br /> 
                <span className="text-blue-600">in Modern Repairs.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
              {features.map((item, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xl text-[#111827] mb-2">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content: Grouped Boxes shifted Right */}
          <div className="w-full lg:w-[40%] relative h-[600px] flex items-center justify-end">
            {/* Wrapper to move all boxes together further to the right */}
            <div className="relative w-full h-full translate-x-10 lg:translate-x-20">
              {floatingBadges.map((badge, idx) => (
                <div 
                  key={idx} 
                  className={`absolute ${badge.position} bg-white/95 backdrop-blur-2xl p-6 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.1)] border border-white/60 flex flex-col items-center gap-3 z-20 transition-transform duration-500 hover:-translate-y-2`}
                >
                  <div className="text-blue-600 bg-blue-50 p-3 rounded-xl">
                    <badge.icon size={24} />
                  </div>
                  <span className="text-[10px] font-black text-[#111827] uppercase tracking-[0.2em] text-center whitespace-nowrap">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
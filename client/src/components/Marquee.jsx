import React from 'react';
import { Cpu, ShieldCheck, Map, Clock, Zap, Fingerprint } from 'lucide-react';

const capabilities = [
  { icon: Cpu, label: "AI-Powered Diagnostics" },
  { icon: Map, label: "Live Service Tracking" },
  { icon: ShieldCheck, label: "End-to-End Encryption" },
  { icon: Zap, label: "Instant Part Matching" },
  { icon: Fingerprint, label: "Biometric Verified Pros" },
  { icon: Clock, label: "90-Min Response Time" }
];

export default function Marquee() {
  return (
    <div className="py-24 bg-white overflow-hidden w-full relative">
      {/* Premium Fade Overlays to hide the edges */}
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="flex whitespace-nowrap animate-scroll w-max items-center">
        {[...capabilities, ...capabilities, ...capabilities].map((item, index) => (
          <div key={index} className="flex items-center group">
            
            {/* Floating Element: No Box, No Background */}
            <div className="flex items-center gap-5 px-12 transition-all duration-500">
              {/* Icon - Deep Black with a subtle transition to Primary Blue */}
              <div className="text-[#111827] group-hover:text-primary group-hover:scale-110 transition-all duration-500">
                <item.icon size={28} strokeWidth={2} />
              </div>
              
              {/* Text - Bold Deep Black */}
              <span className="text-lg font-black text-[#111827] uppercase tracking-[0.25em] group-hover:text-primary transition-colors duration-500 select-none">
                {item.label}
              </span>
            </div>
            
            {/* Minimalist Vertical Divider */}
            <div className="h-8 w-px bg-gray-200 mx-4 opacity-50" />
          </div>
        ))}
      </div>
    </div>
  );
}
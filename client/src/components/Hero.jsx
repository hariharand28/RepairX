import React from 'react';
import SearchBar from './SearchBar';
import heroBg from '../assets/hero-bg.png'; 
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Star } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  return (
<section className="relative pt-22 pb-24 lg:pt-25 lg:pb-32 overflow-visible bg-[#f8fafc] font-sans selection:bg-[#2563eb] selection:text-white">
        
      {/* ── CINEMATIC BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Image anchored to right with seamless fade to left */}
        <div 
  className="absolute inset-y-0 right-0 w-full lg:w-[65%] bg-cover bg-center"
  style={{ backgroundImage: `url(${heroBg})` }}
/>
        {/* Complex Gradient Masks */}
<div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/60 to-transparent lg:via-[#f8fafc]/30" />
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f6f8fc]/20" />
        
        {/* Ambient Glowing Orbs (Linear/Stripe Style) */}
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#2563eb]/15 to-[#60a5fa]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-[#06b6d4]/10 to-transparent blur-[100px]" />
      </div>

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center">
        
        <div className="w-full lg:w-[60%] flex flex-col items-start pt-10">
          
          {/* SaaS Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#2563eb]/20 shadow-sm mb-8 animate-fade-in-up">
            <Sparkles size={14} className="text-[#2563eb]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1e3a8a]">
              The New Standard in Device Repair
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl lg:text-[5.5rem] font-black text-[#0f172a] leading-[1.05] tracking-tighter mb-6">
            We Fix. <br />
            You Relax. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#06b6d4]">
              It's That Simple.
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-500 font-medium mb-10 max-w-lg leading-relaxed">
            Book certified professionals for on-demand home, appliance, and electronic repairs. Fast, reliable, and guaranteed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto">
            <Link 
              to="/services" 
              className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-[#0f172a] text-white rounded-full font-bold tracking-wide overflow-hidden shadow-[0_8px_20px_rgba(15,23,42,0.15)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.3)] transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#1e3a8a] opacity-0 group-hover: transition-opacity duration-500" />
              <span className="relative z-10">Book a Service</span>
              <ArrowRight size={18} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link 
              to="/login" 
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white text-[#0f172a] border border-gray-200 rounded-full font-bold tracking-wide hover:border-gray-300 hover:bg-gray-50 shadow-sm transition-all duration-300"
            >
              Become a Partner
            </Link>
          </div>

          {/* Trust Indicators */}
<div className="flex items-center gap-6 text-sm font-semibold text-gray-600 mb-2">
              <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
              </div>
              <span>4.9/5 Rating</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[#2563eb]" />
              <span>90-Day Warranty</span>
            </div>
          </div>

          {/* SearchBar Container (Glassmorphism) */}
          <div className="relative z-[9999] w-full max-w-2xl bg-white/60 backdrop-blur-xl p-2.5 rounded-[2rem] border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <SearchBar />
          </div>
          
        </div>
      </div>
    </section>
  );
}

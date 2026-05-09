import React from 'react';
import { ArrowRight } from "lucide-react";

export default function ServiceCard({ title, desc, img }) {
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '20px', background: 'red', zIndex: 9999 }}>CONNECTION TEST</div>
  return (
    <div className="flex-none w-[300px] md:w-[360px] h-[450px] relative rounded-[2.5rem] overflow-hidden snap-start shadow-xl group transition-transform duration-500 hover:-translate-y-2">
      {/* Background Image */}
      <img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Dark Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-6 line-clamp-2 leading-relaxed">
          {desc}
        </p>
        
        <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-black flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-lg active:scale-95">
          Explore <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
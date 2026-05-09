import React from "react";
import { ArrowRight } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const services = [
  { id: 1, title: "TV & Home Cinema", desc: "Specialized panel repair and wall mounting.", img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Refrigerators", desc: "Advanced cooling and compressor servicing.", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Air Conditioners", desc: "Industrial-grade deep cleaning and gas filling.", img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Electrical Systems", desc: "Complete wiring and main-board solutions.", img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "Modern Plumbing", desc: "Zero-leakage guaranteed pipe & fixture repair.", img: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Laptop & Mac", desc: "Expert hardware upgrades and OS repairs.", img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=800" }
];

export default function ExploreServices() {
  return (
    <section className="w-full bg-[#050505] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
            Explore Our Services
          </h2>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Professional repair solutions with premium precision and care.
          </p>
        </div>

        {/* STABLE GRID: Solves all clipping and scroll bugs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <SpotlightCard key={svc.id} className="h-[450px] group cursor-pointer">
              {/* Background Image */}
              <img
                src={svc.img}
                alt={svc.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end items-start">
                <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">
                  {svc.title}
                </h3>
                <p className="text-gray-300 text-base mb-8 line-clamp-2 leading-relaxed">
                  {svc.desc}
                </p>
                
                <button className="bg-white text-black px-8 py-4 rounded-full text-sm font-black flex items-center gap-3 hover:bg-[#0066FF] hover:text-white transition-all shadow-xl active:scale-95">
                  Explore <ArrowRight size={18} />
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
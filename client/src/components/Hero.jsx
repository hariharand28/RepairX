import React from 'react';
import SearchBar from './SearchBar';
import heroBg from '../assets/hero-bg.png'; 
import { Link, useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/services');
  };
  
  return (
    // 1. FORCED z-[100] and overflow-visible on the main section
    <section 
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 z-[100] overflow-visible bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] -z-10" />

      {/* 2. FORCED z-[100] and overflow-visible on the inner container */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-[100] overflow-visible">
        <div className="w-full lg:w-[55%]">
          <h1 className="text-6xl lg:text-8xl font-black text-[#111827] leading-[1.05] tracking-tighter mb-6">
            We Fix. <br />
            You Relax. <br />
            <span className="text-blue-600">It's That <br/> Simple.</span>
          </h1>
          
          <p className="text-lg text-gray-500 font-medium mb-12 max-w-md leading-relaxed">
            Book trusted professionals for all your home and electronic repair needs.
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
  {/* Link to Services Page */}
  <Link 
    to="/services" 
    className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center"
  >
    Book a Service
  </Link>

  {/* Link to Services Page (or your partner flow) */}
  <Link 
    to="/services" 
    className="bg-white text-[#111827] border border-gray-200 px-8 py-4 rounded-full font-bold hover:border-gray-300 transition-colors flex items-center justify-center"
  >
    Become a Partner
  </Link>
</div>

          {/* 3. FORCED z-[9999] on the SearchBar wrapper */}
          <div className="relative z-[9999] overflow-visible">
            <SearchBar />
          </div>
        </div>

        {/* Right Side: Image Placeholder */}
  

      </div>
    </section>
  );
}
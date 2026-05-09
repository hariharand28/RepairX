import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';


// TRIPLE CHECK THESE PATHS: If one is wrong, the page goes blank
import acImg from '../assets/categories/ac.avif';
import electricalImg from '../assets/categories/electrical.avif';
import fridgeImg from '../assets/categories/fridge.avif';
import furnitureImg from '../assets/categories/furniture.avif';
import laptopImg from '../assets/categories/laptop.avif';
import mobileImg from '../assets/categories/mobile.avif';
import plumbingImg from '../assets/categories/plumbing.avif';
import smarthomeImg from '../assets/categories/smarthome.avif';
import tvImg from '../assets/categories/tv.avif';


const categories = [
  { id: 'm', name: 'Smartphone', img: mobileImg },
  { id: 'l', name: 'Laptop', img: laptopImg },
  { id: 't', name: 'TV', img: tvImg },
  { id: 'r', name: 'Fridge', img: fridgeImg },
  { id: 'a', name: 'AC', img: acImg },
  { id: 'e', name: 'Electrical', img: electricalImg },
  { id: 'p', name: 'Plumbing', img: plumbingImg },
  { id: 'f', name: 'Furniture', img: furnitureImg },
  { id: 's', name: 'Smart Home', img: smarthomeImg },
];

export default function CategoryGrid() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !triggerRef.current || !contentRef.current) return;
      
      const offsetTop = triggerRef.current.offsetTop;
      const contentWidth = sectionRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      
      let scrollY = window.scrollY - offsetTop;
      const maxDelta = contentWidth - windowWidth; 
      const totalScrollHeight = triggerRef.current.offsetHeight - window.innerHeight;
      
      if (scrollY > 0 && scrollY < totalScrollHeight) {
        const progress = scrollY / totalScrollHeight;
        sectionRef.current.style.transform = `translateX(-${progress * maxDelta}px)`;
        
        // Fly-over effect
        if (progress > 0.9) {
          const f = (progress - 0.9) / 0.1;
          contentRef.current.style.opacity = 1 - f;
          contentRef.current.style.transform = `translateY(-${f * 100}px) scale(${1 - (f * 0.05)})`;
        } else {
          contentRef.current.style.opacity = 1;
          contentRef.current.style.transform = `translateY(0px) scale(1)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={triggerRef} className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div ref={contentRef} className="will-change-transform">
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <h2 className="text-5xl font-black text-gray-900">Explore Services</h2>
          </div>

          <div ref={sectionRef} className="flex gap-6 px-[5%]">
            {categories.map((cat) => (
  <div key={cat.id} className="flex-none w-[400px] h-[500px] relative rounded-[3rem] overflow-hidden bg-gray-100">
    <img src={cat.img} className="w-full h-full object-cover" alt={cat.name} />
    
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    
    <div className="absolute bottom-10 left-10 z-20">
      <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">{cat.name}</h3>
      
      {/* PASTE THE LINK HERE */}
      <Link 
        to="/services" 
        className="relative z-30 inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95 cursor-pointer"
      >
        Explore <ArrowRight size={18} />
      </Link>
    </div>
  </div>
))}
            <div className="flex-none w-[20vw]" />
          </div>
        </div>
      </div>
    </div>
  );
}
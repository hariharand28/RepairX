import React, { useState, useEffect, useRef } from 'react';
import { Search, PenTool, CheckCircle, Truck } from 'lucide-react';

const steps = [
  { id: 1, title: 'Search Service', desc: 'Find the exact repair service you need in seconds.', icon: Search },
  { id: 2, title: 'Book Technician', desc: 'Schedule a visit at your preferred time and location.', icon: PenTool },
  { id: 3, title: 'Quality Repair', desc: 'Our experts handle the rest with premium precision.', icon: CheckCircle },
  { id: 4, title: 'Safe Delivery', desc: 'Your device returned in perfect working condition.', icon: Truck },
];

export default function HowItWorks() {
  const [revealProgress, setRevealProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionTop = sectionRef.current.offsetTop;
      
      // triggerPoint adjusted to ensure the section starts revealing earlier 
      // so it doesn't "snap" away if you scroll fast
      const triggerPoint = sectionTop - windowHeight;
      if (scrollPos > triggerPoint) {
        const progress = (scrollPos - triggerPoint) / windowHeight;
        setRevealProgress(Math.min(Math.max(progress, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="py-20 relative bg-white overflow-hidden transition-all duration-700 ease-out"
      style={{
        // Smoother entrance logic
        transform: `translateY(${(1 - revealProgress) * 40}px)`,
        opacity: revealProgress > 0.1 ? 1 : revealProgress * 10,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* REFIX: Reduced margin-bottom from mb-24 to mb-12 to close the gap */}
        <div className={`text-center mb-12 transition-all duration-1000 ${revealProgress > 0.2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tight">How It Works</h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          {/* Connecting Line - Stays visible earlier now */}
          <div className="hidden md:block absolute top-[1.25rem] left-[12.5%] right-[12.5%] h-[2px] -z-10 overflow-hidden">
             <div 
               className="w-full h-full border-t-2 border-dotted border-blue-500 transition-all duration-[1500ms]"
               style={{ transform: `translateX(${(revealProgress - 1) * 100}%)` }}
             ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className="flex flex-col items-center text-center group"
                style={{ 
                  transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${index * 100}ms`,
                  // Fixed visibility threshold so cards appear sooner
                  opacity: revealProgress > 0.3 ? 1 : 0,
                  transform: revealProgress > 0.3 ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                {/* Number Badge */}
                <div className="w-12 h-12 rounded-full border-2 border-blue-600 bg-white text-blue-600 font-black flex items-center justify-center mb-6 shadow-md group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                  {step.id}
                </div>

                {/* Icon Box */}
                <div className="w-28 h-28 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_25px_50px_-12px_rgba(0,102,255,0.2)]">
                  <step.icon size={44} strokeWidth={1.5} className="text-blue-600 group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Text Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed px-2 font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
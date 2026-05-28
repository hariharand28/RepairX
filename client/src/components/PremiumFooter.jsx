import React from 'react';
import { useLocation } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Wrench, Clock, Zap, 
  MapPin, Phone, Mail, ArrowRight, CheckCircle2,
  Globe, Share2, MessageCircle, Layout,
  Apple, Play 
} from 'lucide-react';

export default function PremiumFooter() {
    const location = useLocation(); // 2. Get current URL
  const isServicesPage = location.pathname === '/services';
  return (
    <footer className={`relative bg-[#050505] pb-8 overflow-hidden font-sans text-white ${isServicesPage ? 'pt-16' : 'pt-40'}`}>
      
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-0"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* 5. Wrap the CTA box in a conditional render */}
      {!isServicesPage && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl px-6 z-20">
          <div className="relative rounded-[2rem] bg-[#111]/90 backdrop-blur-2xl border border-white/10 p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-8 group">
            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-shimmer"></div>
            
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                Ready to Repair <span className="text-blue-500">Smarter?</span>
              </h2>
              <p className="text-gray-400 text-lg font-light">Book verified experts for modern home systems.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
  <Link 
    to="/services" 
    className="group bg-blue-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-blue-600 transition-all duration-500 shadow-2xl flex items-center gap-3"
  >
    Book a Service <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
  </Link>

  <Link 
    to="/login" 
    className="bg-transparent border-2 border-white/20 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-gray-900 transition-all duration-500"
  >
    Become a Partner
  </Link>
</div>
          </div>
        </div>
      )}
      
      {/* SECTION 1: TOP CTA BAND - Now with higher z-index */}
     

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-20">
        {/* TRUST STRIP */}
        <div className="flex flex-wrap justify-center gap-4 pb-16 mb-16 border-b border-white/5">
          {[
            { icon: Clock, text: "24/7 Support" },
            { icon: ShieldCheck, text: "Secure Payments" },
            { icon: CheckCircle2, text: "Verified Techs" },
            { icon: MapPin, text: "Live Tracking" },
            { icon: Wrench, text: "OEM Parts" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-blue-900/10 border border-blue-500/20 px-4 py-2 rounded-full text-blue-400 text-xs font-medium">
              <item.icon size={14} /> {item.text}
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Zap size={32} className="text-blue-500 fill-blue-500" />
              <span className="text-2xl font-black tracking-tighter uppercase">REPAIRX</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-light">Pioneering the future of smart repairs with elite technicians and seamless digital integration.</p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold tracking-widest uppercase text-xs text-blue-500 mb-2">Services</h4>
            {["Smartphone Repair", "Laptop & Mac", "AC & Appliances", "Smart Home IoT"].map((link) => (
              <a key={link} href="/services" className="text-gray-400 text-sm hover:text-white transition-all">{link}</a>
            ))}
          </div>

         <div className="flex flex-col gap-4">
  <h4 className="font-bold tracking-widest uppercase text-xs text-blue-500 mb-2">Company</h4>
  
  {[
    { name: "About Us", path: "/#about" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "Careers", path: "/careers" },
    { name: "Privacy Policy", path: "/privacy-policy" }
  ].map((link) => (
    <Link 
      key={link.name} 
      to={link.path} 
      className="text-gray-400 text-sm hover:text-white transition-all"
    >
      {link.name}
    </Link>
  ))}
</div>
          <div className="flex flex-col gap-6">
            <h4 className="font-bold tracking-widest uppercase text-xs text-blue-500">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <span className="flex items-center gap-3"><Mail size={16} className="text-blue-600"/> support@repairx.com</span>
              <span className="flex items-center gap-3"><Phone size={16} className="text-blue-600"/> 1800-REPAIR-NOW</span>
            </div>
            
          </div>
        </div>

        {/* BEAM DIVIDER */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent relative overflow-hidden mb-8">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-beam"></div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] uppercase tracking-[0.2em] text-gray-500">
          <div>© 2026 RepairX Platform</div>
          
          {/* Define the functional links array */}
{(() => {
  const socialLinks = [
    { icon: Globe, label: 'Website', url: 'https://repair-x-gamma.vercel.app', target: '_blank' },
    { icon: Share2, label: 'Share', url: '#', action: () => navigator.share?.({ title: 'RepairX', url: window.location.href }) },
    { icon: MessageCircle, label: 'Support', url: 'mailto:hariharand2888@gmail.com', target: '_self' },
    { icon: Layout, label: 'Dashboard', url: 'https://repair-x-gamma.vercel.app', target: '_self' }
  ];

  return (
    <div className="flex items-center gap-6">
      {socialLinks.map((item, i) => (
        <a 
          key={i} 
          href={item.url}
          target={item.target}
          rel={item.target === '_blank' ? "noopener noreferrer" : ""}
          onClick={item.action}
          aria-label={item.label}
          className="text-gray-500 hover:text-blue-400 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <item.icon size={18} />
        </a>
      ))}
    </div>

  );
})()}

          <div className="font-medium">
            Developed by <span className="text-white font-black">Hariharan D</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

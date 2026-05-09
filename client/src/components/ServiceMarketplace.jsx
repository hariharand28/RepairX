import React, { useState, useEffect } from 'react';
import { 
  MapPin, ChevronDown, Filter, Smartphone, Laptop, Wind, 
  Tv, ShieldCheck, Clock, Star, Info, ShoppingCart, X
} from 'lucide-react';
import useStore from '../store/useStore';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar'; // [cite: 117]

const categories = [
  { id: 'mobile', name: 'Mobile Devices', icon: Smartphone, count: 42 },
  { id: 'laptop', name: 'Mac & PC', icon: Laptop, count: 28 },
  { id: 'appliances', name: 'Appliances', icon: Wind, count: 56 },
  { id: 'electronics', name: 'Smart Home', icon: Tv, count: 14 },
]; // [cite: 118]

const mockServices = [
  // MOBILE DEVICES
  { id: 'SRV-001', category: 'mobile', title: 'iPhone Screen Replacement', desc: 'OLED calibration & water-seal restoration.', price: '₹4,999', rating: '4.9', reviews: 128, eta: '45 mins', warranty: '90-Day', badges: ['Most Booked', 'Same Day'], techsAvailable: 4, bookedToday: 12, image: 'https://placehold.co/150x150/f8fafc/334155?text=iPhone+Screen' },
  { id: 'SRV-004', category: 'mobile', title: 'Original Battery Swap', desc: 'High-capacity OEM battery with health check.', price: '₹1,499', rating: '4.8', reviews: 256, eta: '30 mins', warranty: '6-Month', badges: ['Fast'], techsAvailable: 6, bookedToday: 24, image: 'https://placehold.co/150x150/f8fafc/334155?text=Battery' },
  { id: 'SRV-005', category: 'mobile', title: 'Water Damage Diagnostics', desc: 'Ultrasonic cleaning & motherboard test.', price: '₹999', rating: '4.6', reviews: 89, eta: '24 Hours', warranty: 'N/A', badges: ['Emergency'], techsAvailable: 2, bookedToday: 5, image: 'https://placehold.co/150x150/f8fafc/334155?text=Water+Damage' },
  { id: 'SRV-006', category: 'mobile', title: 'Charging Port Repair', desc: 'Lint removal and flex cable replacement.', price: '₹1,299', rating: '4.9', reviews: 112, eta: '45 mins', warranty: '90-Day', badges: ['Common'], techsAvailable: 5, bookedToday: 18, image: 'https://placehold.co/150x150/f8fafc/334155?text=Charging+Port' },
  { id: 'SRV-007', category: 'mobile', title: 'Laser Back Glass Repair', desc: 'Precision laser removal of shattered back glass.', price: '₹2,499', rating: '4.7', reviews: 64, eta: '2 Hours', warranty: '90-Day', badges: ['Premium'], techsAvailable: 3, bookedToday: 8, image: 'https://placehold.co/150x150/f8fafc/334155?text=Back+Glass' },
  { id: 'SRV-008', category: 'mobile', title: 'Camera Lens & Module Fix', desc: 'OIS calibration and sapphire lens replacement.', price: '₹3,499', rating: '4.8', reviews: 92, eta: '1 Hour', warranty: '6-Month', badges: ['Quality'], techsAvailable: 4, bookedToday: 11, image: 'https://placehold.co/150x150/f8fafc/334155?text=Camera+Repair' },

  // MAC & PC (LAPTOP)
  { id: 'SRV-002', category: 'laptop', title: 'MacBook Logic Board Repair', desc: 'Micro-soldering & chip-level diagnostics.', price: '₹12,499', rating: '5.0', reviews: 84, eta: '3-5 Days', warranty: '6-Month', badges: ['Premium'], techsAvailable: 2, bookedToday: 3, image: 'https://placehold.co/150x150/f8fafc/334155?text=Logic+Board' },
  { id: 'SRV-009', category: 'laptop', title: 'Thermal Paste & Deep Clean', desc: 'Dust removal and premium thermal compound application.', price: '₹1,499', rating: '4.9', reviews: 412, eta: '1 Hour', warranty: '30-Day', badges: ['Most Booked'], techsAvailable: 7, bookedToday: 21, image: 'https://placehold.co/150x150/f8fafc/334155?text=Deep+Clean' },
  { id: 'SRV-010', category: 'laptop', title: 'SSD Storage Upgrade (1TB)', desc: 'NVMe M.2 SSD installation with OS cloning.', price: '₹8,999', rating: '4.8', reviews: 156, eta: '2 Hours', warranty: '1-Year', badges: ['Upgrade'], techsAvailable: 5, bookedToday: 9, image: 'https://placehold.co/150x150/f8fafc/334155?text=SSD+Upgrade' },
  { id: 'SRV-011', category: 'laptop', title: 'Laptop Screen Assembly', desc: 'Dead pixel check and full display panel replacement.', price: '₹7,999', rating: '4.7', reviews: 78, eta: 'Same Day', warranty: '6-Month', badges: ['Guaranteed'], techsAvailable: 3, bookedToday: 4, image: 'https://placehold.co/150x150/f8fafc/334155?text=Laptop+Screen' },
  { id: 'SRV-012', category: 'laptop', title: 'Keyboard & Trackpad Fix', desc: 'Butterfly/Scissor switch replacement and trackpad calibration.', price: '₹4,499', rating: '4.6', reviews: 104, eta: 'Same Day', warranty: '90-Day', badges: ['Common'], techsAvailable: 4, bookedToday: 6, image: 'https://placehold.co/150x150/f8fafc/334155?text=Keyboard' },

  // APPLIANCES
  { id: 'SRV-003', category: 'appliances', title: 'AC Deep Chemical Wash', desc: 'Coil descaling & gas pressure check.', price: '₹999', rating: '4.8', reviews: 342, eta: '2 Hours', warranty: '30-Day', badges: ['Trending'], techsAvailable: 8, bookedToday: 45, image: 'https://placehold.co/150x150/f8fafc/334155?text=AC+Wash' },
  { id: 'SRV-013', category: 'appliances', title: 'Refrigerator Gas Refill', desc: 'Compressor check, leak fixing, and R134a/R600a refill.', price: '₹1,899', rating: '4.7', reviews: 215, eta: '3 Hours', warranty: '90-Day', badges: ['Emergency'], techsAvailable: 6, bookedToday: 14, image: 'https://placehold.co/150x150/f8fafc/334155?text=Fridge+Gas' },
  { id: 'SRV-014', category: 'appliances', title: 'Washing Machine Drum Repair', desc: 'Bearing replacement and spin-cycle calibration.', price: '₹2,999', rating: '4.6', reviews: 145, eta: 'Same Day', warranty: '6-Month', badges: ['Heavy Duty'], techsAvailable: 4, bookedToday: 7, image: 'https://placehold.co/150x150/f8fafc/334155?text=Washer+Repair' },
  { id: 'SRV-015', category: 'appliances', title: 'Microwave Magnetron Swap', desc: 'High-voltage diode test and magnetron replacement.', price: '₹1,299', rating: '4.9', reviews: 88, eta: '1 Hour', warranty: '90-Day', badges: ['Fast'], techsAvailable: 5, bookedToday: 9, image: 'https://placehold.co/150x150/f8fafc/334155?text=Microwave' },
  { id: 'SRV-016', category: 'appliances', title: 'RO Purifier Filter Change', desc: 'Sediment, Carbon, and RO membrane replacement.', price: '₹899', rating: '4.8', reviews: 520, eta: '45 mins', warranty: 'N/A', badges: ['Most Booked'], techsAvailable: 10, bookedToday: 32, image: 'https://placehold.co/150x150/f8fafc/334155?text=RO+Filter' },
  { id: 'SRV-017', category: 'appliances', title: 'AC Inverter PCB Repair', desc: 'Component level repair for Inverter AC boards.', price: '₹2,499', rating: '4.7', reviews: 112, eta: '1-2 Days', warranty: '90-Day', badges: ['Technical'], techsAvailable: 3, bookedToday: 5, image: 'https://placehold.co/150x150/f8fafc/334155?text=AC+PCB' },

  // SMART HOME / ELECTRONICS
  { id: 'SRV-018', category: 'electronics', title: '55" LED TV Backlight Repair', desc: 'Diffuser alignment and LED strip replacement.', price: '₹3,499', rating: '4.8', reviews: 134, eta: 'Same Day', warranty: '6-Month', badges: ['Popular'], techsAvailable: 4, bookedToday: 6, image: 'https://placehold.co/150x150/f8fafc/334155?text=TV+Backlight' },
  { id: 'SRV-019', category: 'electronics', title: 'Smart Lock Calibration', desc: 'Motor torque adjustment and biometric reset.', price: '₹999', rating: '4.9', reviews: 45, eta: '1 Hour', warranty: '30-Day', badges: ['Security'], techsAvailable: 2, bookedToday: 3, image: 'https://placehold.co/150x150/f8fafc/334155?text=Smart+Lock' },
  { id: 'SRV-020', category: 'electronics', title: 'CCTV Network Setup', desc: 'DVR/NVR configuration and IP camera alignment.', price: '₹1,499', rating: '4.7', reviews: 201, eta: '3 Hours', warranty: '90-Day', badges: ['Essential'], techsAvailable: 5, bookedToday: 15, image: 'https://placehold.co/150x150/f8fafc/334155?text=CCTV+Setup' },
  { id: 'SRV-021', category: 'electronics', title: 'Home Theatre Amplifier Fix', desc: 'Audio channel IC replacement and tuning.', price: '₹2,899', rating: '4.6', reviews: 76, eta: '2 Days', warranty: '6-Month', badges: ['Premium'], techsAvailable: 2, bookedToday: 2, image: 'https://placehold.co/150x150/f8fafc/334155?text=Amplifier' },
  { id: 'SRV-022', category: 'electronics', title: 'Smart Thermostat Wiring', desc: 'C-wire installation and hub synchronization.', price: '₹799', rating: '4.8', reviews: 32, eta: '1 Hour', warranty: '30-Day', badges: ['Quick'], techsAvailable: 3, bookedToday: 4, image: 'https://placehold.co/150x150/f8fafc/334155?text=Thermostat' },
  { id: 'SRV-023', category: 'electronics', title: 'TV Mainboard Reflowing', desc: 'BGA rework for HDMI and power issues.', price: '₹4,500', rating: '4.7', reviews: 58, eta: '2-3 Days', warranty: '90-Day', badges: ['Advanced'], techsAvailable: 2, bookedToday: 1, image: 'https://placehold.co/150x150/f8fafc/334155?text=TV+Mainboard' },
  { id: 'SRV-024', category: 'electronics', title: 'Smart Speaker Firmware Flash', desc: 'Unbricking and connectivity troubleshooting.', price: '₹499', rating: '4.9', reviews: 89, eta: '30 mins', warranty: 'N/A', badges: ['Fast'], techsAvailable: 6, bookedToday: 11, image: 'https://placehold.co/150x150/f8fafc/334155?text=Smart+Speaker' }
]; // [cite: 119-128]

export default function ServiceMarketplace() {
  const { search } = useLocation(); // [cite: 129]
  const queryParams = new URLSearchParams(search); // [cite: 129]
  // Fallback checks both 'query' and 'q' to handle logic from both Hero and SearchBar
  const urlQuery = queryParams.get('query') || queryParams.get('q') || ''; // [cite: 130]

  const [activeCat, setActiveCat] = useState('mobile'); // [cite: 130]
  const [isLoading, setIsLoading] = useState(false); // [cite: 131]
  const [selectedService, setSelectedService] = useState(null); // [cite: 131]
  const [searchQuery, setSearchQuery] = useState(urlQuery); // [cite: 131]
  const [sortBy, setSortBy] = useState('Recommended'); 
  const addToCart = useStore((state) => state.addToCart); // [cite: 132]

  useEffect(() => {
    setSearchQuery(urlQuery); // [cite: 132]
  }, [urlQuery]); // [cite: 132]

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeCat, sortBy]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-40 pb-24 font-sans selection:bg-blue-600 selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6 mb-8">
        
        {/* PREMIUM GLASS-MORPHISM SEARCH & SORT BAR */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-6 sticky top-24 z-40 transition-all duration-300">
          
          <div className="flex-1 w-full">
            <SearchBar /> 
          </div>

          {/* FUNCTIONAL SORT DROPDOWN */}
          <div className="flex items-center gap-3 w-full lg:w-auto shrink-0 z-[41]">
            <div className="relative group w-full lg:w-auto">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full pl-6 pr-14 py-4 bg-gray-50 border border-transparent hover:border-blue-600 focus:border-blue-600 rounded-[1.5rem] text-sm font-black tracking-wide text-gray-800 transition-all outline-none cursor-pointer shadow-inner"
              >
                <option value="Recommended">Recommended</option>
                <option value="Rating">Top Rated</option>
                <option value="Reviews">Most Reviewed</option>
                <option value="Price: Low to High">Price: Low to High</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center pointer-events-none">
                <ChevronDown size={14} className="text-gray-900" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row gap-10">
        {/* SIDEBAR CATEGORIES */}
        <aside className="hidden lg:flex flex-col w-72 shrink-0">
          <div className="sticky top-48 flex flex-col gap-8">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 pl-2">Categories</h3>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button 
                     key={cat.id} // [cite: 137]
                    onClick={() => {
                      setActiveCat(cat.id); // [cite: 137]
                      setSearchQuery(''); // [cite: 138]
                    }}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${activeCat === cat.id ? 'bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)]' : 'text-gray-600 hover:bg-gray-100'}`} // [cite: 138-139]
                  >
                    <div className="flex items-center gap-3">
                      <cat.icon size={18} strokeWidth={2.5} />
                      <span className="font-bold text-sm">{cat.name}</span>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${activeCat === cat.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/40 transition-all"></div>
              <ShieldCheck size={28} className="text-blue-500 mb-4" />
              <h4 className="text-lg font-black mb-2">RepairX Protect</h4>
              <p className="text-gray-400 text-xs leading-relaxed mb-6">Get 1-year extended warranty on all repairs.</p>
              <button className="text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-white transition-colors">Learn More →</button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              {searchQuery ? 'Search Results' : `${categories.find(c => c.id === activeCat)?.name} Repairs`}
            </h1>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full md:w-auto pb-2 md:pb-0">
              {['Most Booked', 'Same Day', 'Emergency'].map(badge => (
                <span key={badge} className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-700 whitespace-nowrap cursor-pointer hover:border-blue-600 transition-colors">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading 
              ? Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-[2rem] h-[380px] animate-pulse p-6 flex flex-col">
                    <div className="h-12 w-12 bg-gray-200 rounded-2xl mb-4"></div>
                    <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded mb-8"></div>
                    <div className="mt-auto h-12 w-full bg-gray-200 rounded-xl"></div>
                  </div>
                ))
              : mockServices
                  // 1. Category & Search Filtering
                  .filter(s => searchQuery ? true : s.category === activeCat) // [cite: 149]
                  .filter(s => 
                    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    s.desc.toLowerCase().includes(searchQuery.toLowerCase()) // [cite: 149-150]
                  )
                  // 2. Sorting Logic
                  .sort((a, b) => {
                    if (sortBy === 'Rating') return parseFloat(b.rating) - parseFloat(a.rating);
                    if (sortBy === 'Reviews') return b.reviews - a.reviews;
                    if (sortBy === 'Price: Low to High') {
                      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
                      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
                      return priceA - priceB;
                    }
                    return 0; // Default: Recommended maintains original array order
                  })
                  .map(service => (
                <div key={service.id} className="group bg-white border border-gray-100 rounded-[2rem] p-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-blue-100 transition-all duration-500 flex flex-col relative overflow-hidden">
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="flex gap-2">
                      {service.badges.map(badge => (
                        <span key={badge} className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">
                           {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{service.title}</h3>
                    <p className="text-sm text-gray-500 mb-6 line-clamp-2">{service.desc}</p>
                    
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-700 mb-6 bg-gray-50 p-3 rounded-2xl">
                      <div className="flex items-center gap-1.5"><Clock size={14} className="text-blue-500" /> {service.eta}</div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-blue-500" /> {service.warranty}</div>
                    </div>
                  </div>

                  <div className="relative z-10 border-t border-gray-100 pt-6 mt-auto">
                    <div className="flex justify-between items-end mb-4">
                       <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Starting from</p>
                        <p className="text-2xl font-black text-gray-900">{service.price}</p>
                      </div>
                       <div className="text-right">
                        <div className="flex items-center gap-1 text-sm font-bold text-gray-900"><Star size={14} className="fill-yellow-400 text-yellow-400"/> {service.rating}</div>
                        <p className="text-[10px] text-gray-500">({service.reviews} reviews)</p>
                      </div>
                     </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => addToCart(service)} // [cite: 158]
                        className="flex-1 bg-gray-900 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-md"
                      >
                        Add to Cart <ShoppingCart size={16} />
                      </button>
                      <button 
                         onClick={() => setSelectedService(service)} // [cite: 160]
                        className="p-3.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors border border-gray-100"
                      >
                         <Info size={18} />
                      </button>
                    </div>
                    
                    <p className="text-[10px] text-center font-bold text-green-600 mt-4 bg-green-50 py-1.5 rounded-lg border border-green-100">
                      🔥 {service.bookedToday} booked today in your area
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {selectedService && ( // [cite: 163]
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full relative shadow-2xl border border-gray-100">
            <button 
                onClick={() => setSelectedService(null)} // [cite: 164]
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-black text-gray-900 mb-2">{selectedService.title}</h2>
            <p className="text-gray-500 mb-6">{selectedService.desc}</p>
            
            <div className="space-y-4 mb-8 bg-gray-50 p-6 rounded-[1.5rem] border border-gray-100">
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-sm text-gray-500 font-bold uppercase tracking-widest">Price</span>
                <span className="text-sm font-black text-blue-600">{selectedService.price}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-sm text-gray-500 font-bold uppercase tracking-widest">ETA</span>
                <span className="text-sm font-black text-gray-900">{selectedService.eta}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 font-bold uppercase tracking-widest">Warranty</span>
                <span className="text-sm font-black text-gray-900">{selectedService.warranty}</span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                addToCart(selectedService); // [cite: 168]
                setSelectedService(null); // [cite: 168]
              }} 
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-blue-600/20"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from '../store/useStore'; // [cite: 17]

const mockServices = [
  // MOBILE DEVICES
  { id: 'SRV-001', category: 'mobile', title: 'iPhone Screen Replacement', desc: 'OLED calibration & water-seal restoration.', price: '₹4,999', rating: '4.9', reviews: 128, eta: '45 mins', warranty: '90-Day', badges: ['Most Booked', 'Same Day'], techsAvailable: 4, bookedToday: 12, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-002', category: 'mobile', title: 'Original Battery Swap', desc: 'High-capacity OEM battery replacement.', price: '₹1,499', rating: '4.8', reviews: 256, eta: '30 mins', warranty: '6-Month', badges: ['Fast'], techsAvailable: 6, bookedToday: 24, image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-003', category: 'mobile', title: 'Charging Port Repair', desc: 'Flex cable & charging IC repair.', price: '₹1,299', rating: '4.9', reviews: 112, eta: '45 mins', warranty: '90-Day', badges: ['Common'], techsAvailable: 5, bookedToday: 18, image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-004', category: 'mobile', title: 'Samsung AMOLED Screen Fix', desc: 'OEM AMOLED panel replacement.', price: '₹5,499', rating: '4.8', reviews: 98, eta: '1 Hour', warranty: '90-Day', badges: ['Premium'], techsAvailable: 4, bookedToday: 9, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-005', category: 'mobile', title: 'Water Damage Diagnostics', desc: 'Ultrasonic motherboard cleaning.', price: '₹999', rating: '4.6', reviews: 89, eta: '24 Hours', warranty: 'N/A', badges: ['Emergency'], techsAvailable: 2, bookedToday: 5, image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-006', category: 'mobile', title: 'Camera Lens Replacement', desc: 'Rear camera lens & sensor repair.', price: '₹2,499', rating: '4.7', reviews: 92, eta: '1 Hour', warranty: '90-Day', badges: ['Quality'], techsAvailable: 4, bookedToday: 11, image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-007', category: 'mobile', title: 'Back Glass Repair', desc: 'Laser back glass replacement.', price: '₹2,999', rating: '4.8', reviews: 74, eta: '2 Hours', warranty: '90-Day', badges: ['Trending'], techsAvailable: 3, bookedToday: 8, image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-008', category: 'mobile', title: 'iPad Display Replacement', desc: 'Liquid Retina display replacement.', price: '₹8,999', rating: '4.9', reviews: 63, eta: 'Same Day', warranty: '6-Month', badges: ['Apple Certified'], techsAvailable: 2, bookedToday: 4, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1200&auto=format&fit=crop' },

  // LAPTOPS
  { id: 'SRV-009', category: 'laptop', title: 'MacBook Logic Board Repair', desc: 'Chip-level diagnostics & repair.', price: '₹12,499', rating: '5.0', reviews: 84, eta: '3-5 Days', warranty: '6-Month', badges: ['Premium'], techsAvailable: 2, bookedToday: 3, image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-010', category: 'laptop', title: 'SSD Upgrade 1TB', desc: 'NVMe SSD upgrade with OS cloning.', price: '₹8,999', rating: '4.8', reviews: 156, eta: '2 Hours', warranty: '1-Year', badges: ['Upgrade'], techsAvailable: 5, bookedToday: 9, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-011', category: 'laptop', title: 'Laptop Screen Replacement', desc: 'Full HD/4K panel replacement.', price: '₹7,999', rating: '4.7', reviews: 78, eta: 'Same Day', warranty: '6-Month', badges: ['Guaranteed'], techsAvailable: 3, bookedToday: 4, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-012', category: 'laptop', title: 'Thermal Paste & Cleaning', desc: 'Deep cooling system cleanup.', price: '₹1,499', rating: '4.9', reviews: 412, eta: '1 Hour', warranty: '30-Day', badges: ['Most Booked'], techsAvailable: 7, bookedToday: 21, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-013', category: 'laptop', title: 'Keyboard Replacement', desc: 'Mechanical & membrane keyboard fix.', price: '₹2,499', rating: '4.7', reviews: 134, eta: '2 Hours', warranty: '90-Day', badges: ['Common'], techsAvailable: 4, bookedToday: 7, image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-014', category: 'laptop', title: 'RAM Upgrade', desc: 'DDR4/DDR5 memory installation.', price: '₹5,999', rating: '4.8', reviews: 67, eta: '1 Hour', warranty: '1-Year', badges: ['Upgrade'], techsAvailable: 5, bookedToday: 8, image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1200&auto=format&fit=crop' },

  // APPLIANCES
  { id: 'SRV-015', category: 'appliances', title: 'AC Deep Chemical Wash', desc: 'Coil cleaning & cooling optimization.', price: '₹999', rating: '4.8', reviews: 342, eta: '2 Hours', warranty: '30-Day', badges: ['Trending'], techsAvailable: 8, bookedToday: 45, image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-016', category: 'appliances', title: 'Refrigerator Gas Refill', desc: 'Leak fixing & gas refill.', price: '₹1,899', rating: '4.7', reviews: 215, eta: '3 Hours', warranty: '90-Day', badges: ['Emergency'], techsAvailable: 6, bookedToday: 14, image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-017', category: 'appliances', title: 'Washing Machine Repair', desc: 'Drum & motor repair service.', price: '₹2,999', rating: '4.6', reviews: 145, eta: 'Same Day', warranty: '6-Month', badges: ['Heavy Duty'], techsAvailable: 4, bookedToday: 7, image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-018', category: 'appliances', title: 'Microwave Repair', desc: 'Magnetron & fuse replacement.', price: '₹1,299', rating: '4.9', reviews: 88, eta: '1 Hour', warranty: '90-Day', badges: ['Fast'], techsAvailable: 5, bookedToday: 9, image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-019', category: 'appliances', title: 'Dishwasher Pump Repair', desc: 'Drain pump replacement service.', price: '₹2,499', rating: '4.6', reviews: 56, eta: 'Same Day', warranty: '6-Month', badges: ['Premium'], techsAvailable: 3, bookedToday: 4, image: 'https://images.unsplash.com/photo-1586208958839-06c17cacdf08?q=80&w=1200&auto=format&fit=crop' },

  // ELECTRONICS
  { id: 'SRV-020', category: 'electronics', title: 'Smart TV Repair', desc: 'Backlight & motherboard repair.', price: '₹3,499', rating: '4.8', reviews: 134, eta: 'Same Day', warranty: '6-Month', badges: ['Popular'], techsAvailable: 4, bookedToday: 6, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-021', category: 'electronics', title: 'CCTV Installation', desc: 'Full home security setup.', price: '₹4,999', rating: '4.7', reviews: 201, eta: '4 Hours', warranty: '1-Year', badges: ['Security'], techsAvailable: 5, bookedToday: 15, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-022', category: 'electronics', title: 'WiFi Router Optimization', desc: 'Mesh setup & signal tuning.', price: '₹799', rating: '4.8', reviews: 184, eta: '1 Hour', warranty: '30-Day', badges: ['Home Network'], techsAvailable: 6, bookedToday: 13, image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-023', category: 'electronics', title: 'Home Theatre Setup', desc: 'Dolby Atmos speaker calibration.', price: '₹1,999', rating: '4.8', reviews: 92, eta: '2 Hours', warranty: '30-Day', badges: ['Premium Audio'], techsAvailable: 3, bookedToday: 7, image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1200&auto=format&fit=crop' },

  // GAMING
  { id: 'SRV-024', category: 'gaming', title: 'PS5 HDMI Port Repair', desc: 'HDMI 2.1 micro-soldering fix.', price: '₹5,499', rating: '4.9', reviews: 93, eta: '1 Day', warranty: '6-Month', badges: ['Gaming'], techsAvailable: 2, bookedToday: 4, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-025', category: 'gaming', title: 'Nintendo Switch Repair', desc: 'Joy-Con drift & display repair.', price: '₹899', rating: '4.7', reviews: 211, eta: '45 mins', warranty: '90-Day', badges: ['Fast'], techsAvailable: 4, bookedToday: 14, image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-026', category: 'gaming', title: 'Gaming PC Optimization', desc: 'RGB setup & airflow optimization.', price: '₹1,999', rating: '4.8', reviews: 122, eta: '2 Hours', warranty: '30-Day', badges: ['Trending'], techsAvailable: 5, bookedToday: 8, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop' },

  // HOME SERVICES
  { id: 'SRV-027', category: 'home', title: 'Smart Doorbell Installation', desc: 'WiFi smart bell setup.', price: '₹1,299', rating: '4.9', reviews: 51, eta: '1 Hour', warranty: '90-Day', badges: ['Smart Home'], techsAvailable: 3, bookedToday: 5, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-028', category: 'home', title: 'Ceiling Fan Repair', desc: 'Bearing lubrication & repair.', price: '₹499', rating: '4.7', reviews: 390, eta: '30 mins', warranty: '30-Day', badges: ['Budget'], techsAvailable: 9, bookedToday: 27, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-029', category: 'home', title: 'Smart Lock Installation', desc: 'Biometric lock fitting service.', price: '₹2,199', rating: '4.9', reviews: 63, eta: '1 Hour', warranty: '6-Month', badges: ['Smart Home'], techsAvailable: 4, bookedToday: 8, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200&auto=format&fit=crop' },

  // PREMIUM
  { id: 'SRV-030', category: 'premium', title: 'Enterprise Device Audit', desc: 'Corporate hardware inspection.', price: '₹24,999', rating: '5.0', reviews: 18, eta: 'Custom', warranty: '1-Year', badges: ['Enterprise'], techsAvailable: 2, bookedToday: 1, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-031', category: 'premium', title: 'Data Recovery Service', desc: 'SSD/HDD forensic recovery.', price: '₹14,999', rating: '5.0', reviews: 31, eta: '5-7 Days', warranty: 'Confidential', badges: ['Secure'], techsAvailable: 1, bookedToday: 1, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop' },

  // SUBSCRIPTIONS
  { id: 'SRV-032', category: 'subscription', title: 'Annual Laptop Care Plan', desc: 'Priority diagnostics & cleaning.', price: '₹3,999/yr', rating: '4.9', reviews: 208, eta: 'Subscription', warranty: '1-Year', badges: ['Membership'], techsAvailable: 10, bookedToday: 18, image: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-033', category: 'subscription', title: 'Home Appliance AMC', desc: 'Annual maintenance contract.', price: '₹6,999/yr', rating: '4.8', reviews: 164, eta: 'Subscription', warranty: '1-Year', badges: ['Family Plan'], techsAvailable: 12, bookedToday: 9, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop' },

  // EXTRA SERVICES
  { id: 'SRV-034', category: 'mobile', title: 'Face ID Repair', desc: 'TrueDepth camera restoration.', price: '₹4,499', rating: '4.8', reviews: 88, eta: '2 Hours', warranty: '90-Day', badges: ['Apple'], techsAvailable: 3, bookedToday: 7, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-035', category: 'gaming', title: 'Xbox Controller Repair', desc: 'Stick drift & trigger repair.', price: '₹1,299', rating: '4.7', reviews: 74, eta: '1 Hour', warranty: '90-Day', badges: ['Gaming'], techsAvailable: 4, bookedToday: 9, image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-036', category: 'electronics', title: 'Projector Installation', desc: 'Home theatre projector mounting.', price: '₹3,999', rating: '4.8', reviews: 57, eta: '3 Hours', warranty: '1-Year', badges: ['Premium'], techsAvailable: 2, bookedToday: 3, image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-037', category: 'appliances', title: 'Water Purifier Service', desc: 'RO filter cleaning & replacement.', price: '₹799', rating: '4.8', reviews: 280, eta: '1 Hour', warranty: '30-Day', badges: ['Essential'], techsAvailable: 6, bookedToday: 19, image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=1200&auto=format&fit=crop' },
  { id: 'SRV-038', category: 'home', title: 'LED Strip Lighting Setup', desc: 'Ambient smart lighting setup.', price: '₹1,499', rating: '4.8', reviews: 117, eta: '2 Hours', warranty: '90-Day', badges: ['Trending'], techsAvailable: 5, bookedToday: 14, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop' },

  // CONTINUE SAME PATTERN TILL 50+
];

const CATEGORIES = [
  { id: 'all', label: 'All Services', icon: '⚡', count: mockServices.length },
  { id: 'mobile', label: 'Mobile Devices', icon: '📱', count: mockServices.filter(s => s.category === 'mobile').length },
  { id: 'laptop', label: 'Mac & PC', icon: '💻', count: mockServices.filter(s => s.category === 'laptop').length },
  { id: 'appliances', label: 'Appliances', icon: '🏠', count: mockServices.filter(s => s.category === 'appliances').length },
  { id: 'electronics', label: 'Electronics', icon: '📺', count: mockServices.filter(s => s.category === 'electronics').length },
  { id: 'gaming', label: 'Gaming', icon: '🎮', count: mockServices.filter(s => s.category === 'gaming').length },
  { id: 'home', label: 'Smart Home', icon: '🔧', count: mockServices.filter(s => s.category === 'home').length },
  { id: 'premium', label: 'Premium', icon: '👑', count: mockServices.filter(s => s.category === 'premium').length },
  { id: 'subscription', label: 'Subscriptions', icon: '🔄', count: mockServices.filter(s => s.category === 'subscription').length },
];

const SORT_OPTIONS = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Most Booked'];
const BADGE_QUICK_FILTERS = ['Most Booked', 'Same Day', 'Emergency', 'Fast', 'Premium'];

const BADGE_COLORS = {
  'Most Booked': { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  'Same Day':    { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
  'Emergency':   { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
  'Fast':        { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
  'Premium':     { bg: '#faf5ff', text: '#7c3aed', border: '#e9d5ff' },
  'Trending':    { bg: '#fff1f2', text: '#be123c', border: '#fecdd3' },
  'Upgrade':     { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  'Membership':  { bg: '#faf5ff', text: '#7c3aed', border: '#e9d5ff' },
  'AMC':         { bg: '#faf5ff', text: '#7c3aed', border: '#e9d5ff' },
  'default':     { bg: '#f8fafc', text: '#475569', border: '#e2e8f0' },
};

const getBadgeStyle = (badge) => BADGE_COLORS[badge] || BADGE_COLORS['default'];

const CATEGORY_ICONS = {
  mobile: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>),
  laptop: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M0 21h24"/></svg>),
  appliances: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 9h20"/><circle cx="7" cy="6" r="1"/></svg>),
  electronics: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>),
  gaming: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15" cy="11" r="1"/><circle cx="17" cy="13" r="1"/><path d="M5 8h14a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2z"/></svg>),
  home: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>),
  premium: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
  subscription: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2"/></svg>),
  all: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>),
};

const StarIcon = ({ filled }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

const FireIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#ef4444" stroke="none">
    <path d="M12 2C8.5 6 7 9 9 13c-2.5-1-3-3-3-3C4 14 5 19 12 22c7-3 8-8 6-12-1 1-2 2-4 2 2-3 1-7-2-10z"/>
  </svg>
);

const getRatingStars = (rating) => {
  const r = parseFloat(rating);
  return [1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= Math.round(r)} />);
};

function ServiceCard({ service, onAddToCart }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(service);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff',
        borderRadius: 20,
        border: hovered ? '1.5px solid #2563eb' : '1.5px solid #e8edf5',
        boxShadow: hovered
          ? '0 12px 40px rgba(37,99,235,0.13), 0 2px 8px rgba(0,0,0,0.06)'
          : '0 2px 12px rgba(0,0,0,0.04)',
        transition: 'all 0.25s cubic-bezier(.4,0,.2,1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <div style={{
        height: 3,
        background: hovered ? 'linear-gradient(90deg, #2563eb, #06b6d4)' : '#f1f5f9',
        transition: 'background 0.3s',
      }} />

      <img 
        src={service.image} 
        alt={service.title}
        style={{ 
          width: '100%', 
          height: '160px', 
          objectFit: 'cover', 
          borderBottom: '1px solid #f1f5f9' 
        }} 
      />

      <div style={{ padding: '22px 22px 18px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {service.badges.slice(0, 2).map(badge => {
            const s = getBadgeStyle(badge);
            return (
              <span key={badge} style={{
                background: s.bg, color: s.text, border: `1px solid ${s.border}`,
                borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                padding: '3px 10px', textTransform: 'uppercase',
              }}>{badge}</span>
            );
          })}
        </div>

        <h3 style={{
          fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 6px',
          lineHeight: 1.3, fontFamily: '"Plus Jakarta Sans", "DM Sans", sans-serif',
        }}>{service.title}</h3>

        <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 16px', lineHeight: 1.5 }}>{service.desc}</p>

        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <ClockIcon />
            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{service.eta}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <ShieldIcon />
            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{service.warranty}</span>
          </div>
        </div>

        <div style={{ height: 1, background: '#f1f5f9', margin: '0 0 16px' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Starting from</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', fontFamily: '"Plus Jakarta Sans", sans-serif', letterSpacing: '-0.02em' }}>
              {service.price}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', gap: 2, justifyContent: 'flex-end', marginBottom: 3 }}>
              {getRatingStars(service.rating)}
            </div>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>
              {service.rating} <span style={{ color: '#94a3b8', fontWeight: 400 }}>({service.reviews})</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={handleAdd}
            style={{
              flex: 1, padding: '12px 0',
              background: added ? 'linear-gradient(135deg, #16a34a, #15803d)' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: '#fff', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 700,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 7, transition: 'all 0.2s',
              boxShadow: added ? '0 4px 12px rgba(22,163,74,0.3)' : '0 4px 12px rgba(37,99,235,0.3)',
              letterSpacing: '0.01em',
            }}
          >
            <CartIcon />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
          <button style={{
            width: 42, height: 42, borderRadius: 12, border: '1.5px solid #e2e8f0', background: '#f8fafc',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0,
          }}>
            <InfoIcon />
          </button>
        </div>

        {service.bookedToday > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 12, justifyContent: 'center' }}>
            <FireIcon />
            <span style={{ fontSize: 11, color: '#ef4444', fontWeight: 600 }}>
              {service.bookedToday} booked today in your area
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryItem({ cat, isActive, onClick }) {
  return (
    <button
      onClick={() => onClick(cat.id)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 12, border: 'none',
        background: isActive ? '#2563eb' : 'transparent', color: isActive ? '#fff' : '#374151', cursor: 'pointer',
        textAlign: 'left', transition: 'all 0.18s', marginBottom: 2,
      }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#f0f6ff'; }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
    >
      <span style={{
        width: 36, height: 36, borderRadius: 10, background: isActive ? 'rgba(255,255,255,0.2)' : '#f0f6ff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? '#fff' : '#2563eb', flexShrink: 0,
      }}>
        {CATEGORY_ICONS[cat.id] || CATEGORY_ICONS.all}
      </span>
      <span style={{ flex: 1, fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>{cat.label}</span>
      <span style={{
        fontSize: 11, fontWeight: 700, background: isActive ? 'rgba(255,255,255,0.25)' : '#e8edf5', color: isActive ? '#fff' : '#64748b',
        borderRadius: 20, padding: '2px 8px', minWidth: 24, textAlign: 'center',
      }}>{cat.count}</span>
    </button>
  );
}

export default function ServiceMarketplace() {
  const navigate = useNavigate();
  const addToCart = useStore((state) => state.addToCart); // [cite: 34]
  const cartItems = useStore((state) => state.cart || []); 

  const [activeCategory, setActiveCategory] = useState('all');
const queryParams = new URLSearchParams(location.search);
const urlQuery = queryParams.get('q') || '';

const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [sortBy, setSortBy] = useState('Recommended');
  const [quickFilter, setQuickFilter] = useState(null);
  const [mounted, setMounted] = useState(false);


  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get('q') || '';
  
  setSearchQuery(q);
}, [location.search]);

  const filtered = mockServices.filter(s => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory;
    const matchSearch = !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchQuick = !quickFilter || s.badges.includes(quickFilter);
    return matchCat && matchSearch && matchQuick;
  });

  const sorted = [...filtered].sort((a, b) => {
    const parsePrice = p => parseInt(p.replace(/[^0-9]/g, ''));
    if (sortBy === 'Price: Low to High') return parsePrice(a.price) - parsePrice(b.price);
    if (sortBy === 'Price: High to Low') return parsePrice(b.price) - parsePrice(a.price);
    if (sortBy === 'Top Rated') return parseFloat(b.rating) - parseFloat(a.rating);
    if (sortBy === 'Most Booked') return b.bookedToday - a.bookedToday;
    return 0;
  });

  const categoryLabel = CATEGORIES.find(c => c.id === activeCategory)?.label || 'All Services';

  return (
    <div style={{
      height: '100vh', /* Locks entire page to screen height */
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '80px', /* Ensure this matches your global Header height */
      background: '#f6f8fc',
      fontFamily: '"Plus Jakarta Sans", "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      opacity: mounted ? 1 : 0,
      transition: 'opacity 0.4s',
      overflow: 'hidden' /* Prevents the whole page from scrolling */
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      {/* ── NON-STICKY SEARCH BAR CONTAINER ── */}
      <div style={{ padding: '20px 32px', flexShrink: 0 }}>
        <div style={{ 
          maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'center',
          background: '#fff', padding: '12px 20px', borderRadius: 24,
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #e8edf5'
        }}>
          
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '0 18px', height: 46,
            border: '1.5px solid #e2e8f0', borderRadius: 12, background: '#f8fafc',
            fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            Select Location
          </button>

          <div style={{ flex: 1, position: 'relative' }}>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="What service do you need?"
              style={{
                width: '100%', height: 46, border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '0 50px 0 18px',
                fontSize: 14, color: '#0f172a', outline: 'none', background: '#f8fafc', transition: 'border-color 0.2s', fontFamily: 'inherit',
              }}
              onFocus={e => e.target.style.borderColor = '#2563eb'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
            <div style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', width: 34, height: 34, borderRadius: 8, background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              height: 46, border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '0 16px', fontSize: 13, fontWeight: 600,
              color: '#374151', background: '#f8fafc', cursor: 'pointer', outline: 'none', fontFamily: 'inherit', minWidth: 160,
            }}
          >
            {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>

          {/* CART REDIRECT BUTTON */}
          <button
            onClick={() => navigate('/cart')}
            style={{
              position: 'relative', width: 46, height: 46, borderRadius: 12, border: '1.5px solid #e2e8f0',
              background: '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', flexShrink: 0,
            }}
          >
            <CartIcon />
            {cartItems.length > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -6, width: 20, height: 20, background: '#2563eb', color: '#fff', borderRadius: '50%',
                fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff',
              }}>{cartItems.length}</span>
            )}
          </button>
        </div>
      </div>

      {/* ── FLEXIBLE BODY ROW ── */}
      <div style={{ flex: 1, maxWidth: 1400, margin: '0 auto', width: '100%', display: 'flex', gap: 28, padding: '0 32px 20px', overflow: 'hidden' }}>

        {/* ── STATIC SIDEBAR ── */}
        <aside style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', overflowY: 'auto', paddingBottom: '20px' }}>
          <div style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #e8edf5', padding: '20px 14px', marginBottom: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0 6px 12px' }}>
              CATEGORIES
            </div>
            {CATEGORIES.map(cat => (
              <CategoryItem key={cat.id} cat={cat} isActive={activeCategory === cat.id} onClick={setActiveCategory} />
            ))}
          </div>

          

          {/* ── FOOTER AREA ── */}
       
        </aside>

        {/* ── SCROLLING MAIN CONTENT (THE RED BOX) ── */}
        <main style={{ flex: 1, overflowY: 'auto', paddingRight: '12px', paddingBottom: '60px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.03em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                {categoryLabel}
              </h1>
              <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0', fontWeight: 500 }}>
                {sorted.length} service{sorted.length !== 1 ? 's' : ''} available
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {BADGE_QUICK_FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setQuickFilter(quickFilter === f ? null : f)}
                  style={{
                    padding: '7px 16px', borderRadius: 20, border: quickFilter === f ? '1.5px solid #2563eb' : '1.5px solid #e2e8f0',
                    background: quickFilter === f ? '#eff6ff' : '#fff', color: quickFilter === f ? '#2563eb' : '#64748b',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', letterSpacing: '0.02em',
                  }}
                >{f}</button>
              ))}
            </div>
          </div>

          {sorted.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#374151', marginBottom: 8 }}>No services found</div>
              <div style={{ fontSize: 14 }}>Try a different search or category</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 20 }}>
              {sorted.map(service => (
                <ServiceCard key={service.id} service={service} onAddToCart={addToCart} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
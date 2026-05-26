import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import useStore from '../store/useStore';
import { supabase } from '../supabase';
import SearchBar from './SearchBar';
import HeaderSearchBar from './HeaderSearchBar';
import {
  User,
  Menu,
  X,
  ShoppingCart,
  Star,
  ChevronDown,
  MessageCircle,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';


export default function Header() {
  // --- ORIGINAL STATE & LOGIC ---
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [profileName, setProfileName] = useState('Profile');
  const [role, setRole] = useState(null);
  
  const location = useLocation();
  const cart = useStore((state) => state.cart || []);
  const user = useStore((state) => state.user);
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  // Scroll detection (Hide on scroll down, show on scroll up)
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide
      } else {
        setIsVisible(true);  // Show
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Profile Name Fetching
  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle()
        .then(({ data, error }) => {
          if (data?.full_name) {
            setProfileName(data.full_name.split(' ')[0]);
          } else {
            const googleName = user?.user_metadata?.full_name || user?.user_metadata?.name;
            setProfileName(googleName ? googleName.split(' ')[0] : 'User');
          }
        });
    } else {
      setProfileName('Login / Sign Up');
    }
  }, [user]);

  // Role Fetching
  useEffect(() => {
    if (user) {
      supabase.from('profiles').select('role').eq('id', user.id).single()
        .then(({ data }) => {
          if (data) setRole(data.role);
        });
    } else {
      setRole(null);
    }
  }, [user]);

  // Conditional Navigation
 const navLinks = role === 'partner' 
    ? [
        { name: 'Home', path: '/' },
        { name: 'Partner Dashboard', path: '/dashboard' }
      ]
    : [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Careers', path: '/careers' },
    { name: 'Rate Us', path: '/rate-us', hasStar: true },
  ];

  // --- PREMIUM UI RENDER ---
  return (
    <>
      <header 
        className={`fixed top-6 left-0 right-0 z-[999] px-4 md:px-8 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
          isVisible ? 'translate-y-0' : '-translate-y-[150%]'
        }`}
      >
        <nav 
className={`max-w-[1450px] mx-auto flex items-center justify-between gap-5 px-6 py-2.5 rounded-full transition-all duration-500 ${
              isScrolled 
              ? 'bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-200/50 scale-[0.98]' 
              : 'bg-white/60 backdrop-blur-lg border border-white/40 shadow-sm scale-100'
          }`}
        >
          {/* LOGO & PARTNER BADGE */}
          <div className="flex items-center gap-4 group shrink-0">
            <Link to="/" className="flex items-center gap-2.5 transition-transform duration-300 hover:scale-105">
              <img src={logo} alt="RepairX Logo" className="h-12 w-auto drop-shadow-sm" />
             
            </Link>
            
            {role === 'partner' && (
              <span className="hidden md:flex bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full items-center shadow-sm">
                Partner Portal
              </span>
            )}
          </div>
          

          {/* DESKTOP NAVIGATION */}
         {/* DESKTOP NAVIGATION */}
<div className="hidden xl:flex items-center gap-1 bg-gray-100/50 border border-gray-200/60 rounded-full px-2 py-1.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] shrink-0">

  {/* NORMAL NAV ITEMS */}
  {navLinks.map((link, index) => {
    const isActive = location.pathname === link.path;

    return (
      <Link
        key={index}
        to={link.path}
        className={`whitespace-nowrap flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-all duration-300 ${
          isActive
            ? 'bg-white text-[#0f172a] shadow-sm border border-gray-200/50'
            : 'text-gray-500 hover:text-[#0f172a] hover:bg-white/70'
        }`}
      >
        {link.hasStar && (
          <Star
            size={14}
            className={
              isActive
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-400"
            }
          />
        )}

        <span>{link.name}</span>
      </Link>
    );
  })}

  {/* SUPPORT DROPDOWN */}
  <div
    className="relative"
    onMouseEnter={() => setSupportOpen(true)}
    onMouseLeave={() => setSupportOpen(false)}
  >
    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide text-gray-500 hover:text-[#0f172a] hover:bg-white/70 transition-all duration-300">
      Support
      <ChevronDown
        size={15}
        className={`transition-transform duration-300 ${
          supportOpen ? "rotate-180" : ""
        }`}
      />
    </button>

    {/* DROPDOWN */}
    <div
      className={`absolute top-[120%] left-0 w-64 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-3 transition-all duration-300 z-50 ${
        supportOpen
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-2"
      }`}
    >
      <Link
        to="/faq"
        className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-blue-50 transition-all duration-300 group"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <HelpCircle className="text-blue-600 w-5 h-5" />
        </div>

        <div>
          <p className="font-bold text-[#06142E] text-sm">
            FAQ
          </p>
          <p className="text-xs text-gray-500">
            Common questions
          </p>
        </div>
      </Link>

      <a
        href="https://wa.me/919600949684"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-green-50 transition-all duration-300 group"
      >
        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
          <MessageCircle className="text-green-600 w-5 h-5" />
        </div>

        <div>
          <p className="font-bold text-[#06142E] text-sm">
            Chat With Us
          </p>
          <p className="text-xs text-gray-500">
            WhatsApp support
          </p>
        </div>
      </a>

      <Link
        to="/warranty-policy"
        className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-cyan-50 transition-all duration-300 group"
      >
        <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
          <ShieldCheck className="text-cyan-600 w-5 h-5" />
        </div>

        <div>
          <p className="font-bold text-[#06142E] text-sm">
            Warranty Policy
          </p>
          <p className="text-xs text-gray-500">
            Repair warranty details
          </p>
        </div>
      </Link>
    </div>
  </div>
</div>

          

          
          <HeaderSearchBar />

          {/* ACTIONS */}
          <div className="flex items-center gap-4 shrink-0">
          
            {/* Track Repair Link */}
            {/* Track Repair Link with Live Pulsing Indicator */}
<Link 
  to="/dashboard" 
  className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50/50 border border-blue-200 rounded-full text-[12px] font-bold tracking-wide text-blue-700 hover:bg-blue-100 transition-all duration-300"
>
  {/* The Blinking/Pulsing Dot */}
  <div className="relative flex h-2.5 w-2.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
  </div>
  
  <span className="hidden lg:block whitespace-nowrap">Track Repair</span>
</Link>



              {/* Desktop Cart Icon */}
            {role !== 'partner' && (
              <Link to="/cart" className="relative p-2 text-gray-500 hover:text-[#2563eb] transition-colors duration-300 hidden md:block group">
                <ShoppingCart size={22} strokeWidth={2.2} />
                {cartCount > 0 && (
                  <span className="absolute 0 right-0 flex items-center justify-center w-5 h-5 bg-[#2563eb] text-white text-[10px] font-black rounded-full border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

           

           {/* Desktop Profile/Login Button (Permanent Gradient) */}
            <Link to={user ? "/dashboard" : "/login"} className="hidden md:block group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
              <button className="relative flex items-center gap-2 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white px-6 py-2.5 rounded-full text-[13px] font-bold tracking-wide shadow-md transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg border border-white/10">
                <User size={16} strokeWidth={2.5} /> 
                <span>{profileName}</span>
              </button>
            </Link>
            
            {/* MOBILE CONTROLS */}
            <div className="md:hidden flex items-center gap-3">
              {role !== 'partner' && (
                <Link to="/cart" className="relative p-2 text-gray-700">
                  <ShoppingCart size={22} strokeWidth={2.2} />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 bg-[#2563eb] text-white text-[9px] font-black rounded-full border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-800 p-2 bg-gray-100/80 rounded-full border border-gray-200"
              >
                {mobileMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* MOBILE MENU (Glassmorphism Overlay) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[998] bg-white/80 backdrop-blur-2xl md:hidden flex flex-col pt-32 px-6 animate-in fade-in duration-300">
          <div className="flex flex-col gap-6">
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                to={link.path} 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-2xl font-black text-[#0f172a] tracking-tight border-b border-gray-200/50 pb-4"
              >
                {link.name}
              </Link>
            ))}
            
            <Link to={user ? "/dashboard" : "/login"} onClick={() => setMobileMenuOpen(false)} className="mt-4">
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white px-8 py-4 rounded-2xl text-sm font-bold tracking-wide shadow-lg border border-white/10">
                <User size={18} strokeWidth={2.5} />
                {user ? profileName : 'Login / Sign Up'}
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
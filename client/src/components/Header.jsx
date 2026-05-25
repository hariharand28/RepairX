import React, { useState, useEffect } from 'react';
import { User, Menu, X, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import useStore from '../store/useStore';
import { supabase } from '../supabase';
import SearchBar from './SearchBar';
import HeaderSearchBar from './HeaderSearchBar';

export default function Header() {
  // --- ORIGINAL STATE & LOGIC ---
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        { name: 'How It Works', path: '/#how-it-works' }, 
        { name: 'About Us', path: '/#about' }, 
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
          className={`max-w-[1200px] mx-auto flex items-center justify-between px-6 py-2.5 rounded-full transition-all duration-500 ${
            isScrolled 
              ? 'bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-200/50 scale-[0.98]' 
              : 'bg-white/60 backdrop-blur-lg border border-white/40 shadow-sm scale-100'
          }`}
        >
          {/* LOGO & PARTNER BADGE */}
          <div className="flex items-center gap-4 group">
            <Link to="/" className="flex items-center gap-2.5 transition-transform duration-300 hover:scale-105">
              <img src={logo} alt="RepairX Logo" className="h-12 w-auto drop-shadow-sm" />
             
            </Link>
            
            {role === 'partner' && (
              <span className="hidden md:flex bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full items-center shadow-sm">
                Partner Portal
              </span>
            )}
          </div>
          

          {/* DESKTOP NAVIGATION (Linear/Apple Aesthetic) */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100/50 border border-gray-200/60 rounded-full px-1.5 py-1.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={index} 
                  to={link.path} 
                  className={`px-5 py-2 rounded-full text-[13px] font-bold tracking-wide transition-all duration-300 ${
                    isActive 
                      ? 'bg-white text-[#0f172a] shadow-sm border border-gray-200/50' 
                      : 'text-gray-500 hover:text-[#0f172a] hover:bg-white/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          
          <HeaderSearchBar />

          {/* ACTIONS */}
          <div className="flex items-center gap-5">
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
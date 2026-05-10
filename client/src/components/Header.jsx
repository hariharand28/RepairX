import React, { useState, useEffect } from 'react';
import { User, Menu, X, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import useStore from '../store/useStore';
import { supabase } from '../supabase';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [profileName, setProfileName] = useState('Profile');
  // Get cart and user from global state [cite: 23, 24]
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [role, setRole] = useState(null);

  useEffect(() => {
    
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Hide header on scroll down, show on scroll up [cite: 25, 26]
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  useEffect(() => {
    if (user) {
      // Use .maybeSingle() to prevent the 406 crash for new Google users
      supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle()
        .then(({ data, error }) => {
          if (error) {
            console.error("Header profile fetch error:", error);
          }

          if (data?.full_name) {
            // Profile exists, show first name
            setProfileName(data.full_name.split(' ')[0].toUpperCase());
          } else {
            // Fallback: Read name directly from Google login metadata
            const googleName = user?.user_metadata?.full_name || user?.user_metadata?.name;
            if (googleName) {
              setProfileName(googleName.split(' ')[0].toUpperCase());
            } else {
              setProfileName('USER'); // Final safety fallback
            }
          }
        });
    } else {
      setProfileName('LOGIN / SIGN UP');
    }
  }, [user]);

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

  return (
    <header 
      className={`fixed top-8 left-0 right-0 z-[999] px-4 transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-[150%]'
      }`}
    >
      <nav 
        className={`max-w-5xl mx-auto flex items-center justify-between px-8 py-3 rounded-full transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-lg shadow-2xl border border-white/20 py-2.5 scale-95' 
            : 'bg-white/40 backdrop-blur-md border border-white/10 w-full'
        }`}
      >
        {/* LOGO & PARTNER BADGE */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="RepairX" className="h-9 w-auto" />
          </Link>
          
          {role === 'partner' && (
            <span className="hidden md:flex bg-blue-50 border border-blue-200 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full items-center shadow-sm">
              Partner Portal
            </span>
          )}
        </div>

        {/* DESKTOP NAVIGATION [cite: 29, 30] */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              to={link.path} 
              className="text-xs font-black text-gray-900 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-6">
          {/* Desktop Cart Icon (Hidden for Partners) */}
          {role !== 'partner' && (
            <Link to="/cart" className="relative text-gray-900 hover:text-blue-600 transition-colors hidden md:block">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

        {/* Desktop Profile/Login Button */}
<Link 
  to={user ? "/dashboard" : "/login"} 
  className="hidden md:block"
>
  <button className="flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl">
    <User size={14} strokeWidth={3} /> 
    {user ? profileName : 'LOGIN / SIGN UP'}
  </button>
</Link>
          
         {/* MOBILE CONTROLS */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Cart Icon (Hidden for Partners) */}
            {role !== 'partner' && (
              <Link to="/cart" className="relative text-gray-900">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-900 p-1"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU [cite: 36] */}
      {mobileMenuOpen && (
        <div className="absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl md:hidden flex flex-col gap-8 items-center border border-gray-100 animate-in fade-in zoom-in duration-300">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              to={link.path} 
              onClick={() => setMobileMenuOpen(false)} 
              className="text-xl font-black text-gray-900 uppercase tracking-widest"
            >
              {link.name}
            </Link>
          ))}
<Link to={user ? "/dashboard" : "/login"} onClick={() => setMobileMenuOpen(false)}>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest">
              <User size={16} strokeWidth={3} />
              {user ? profileName : 'LOGIN / SIGN UP'}
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
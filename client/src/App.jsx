import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { supabase } from './supabase'; 
import useStore from './store/useStore';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import HowItWorks from './components/HowItWorks';
import TrustSection from './components/TrustSection';
import PremiumFooter from './components/PremiumFooter';
import ScrollToTop from './components/ScrollToTop';
import Dashboard from './pages/Dashboard';

// Pages
import ServiceMarketplace from './components/ServiceMarketplace';
import Cart from './pages/Cart';
import Auth from './components/Auth';

function AppContent() {
  const location = useLocation();
const isLoginPage = location.pathname === '/login' || location.pathname === '/dashboard';
  const setUser = useStore((state) => state.setUser);

  // AUTHENTICATION LISTENER: Checks if a user is logged in
  useEffect(() => {
    // 1. Get the current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. Listen for login/logout changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    // Dynamically change the background to dark if on the login page to remove white gaps
    <div className={`relative min-h-screen font-sans selection:bg-blue-600 selection:text-white ${isLoginPage ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <Header />

      <main>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <>
              <Hero />
              <CategoryGrid />
              <div id="how-it-works">
                <HowItWorks />
              </div>
              <TrustSection />
            </>
          } />

          {/* Services/Marketplace Route */}
          <Route path="/services" element={<ServiceMarketplace />} />
          
          {/* Cart Route */}
          <Route path="/cart" element={<Cart />} />
          
          {/* Authentication Route */}
          <Route path="/login" element={<Auth />} />

          {/* User Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </main>

      {/* Conditionally hide the Footer section on the login page */}
      {!isLoginPage && (
        <div id="about">
          <PremiumFooter />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop /> 
      <AppContent />
    </Router>
  );
}

export default App;
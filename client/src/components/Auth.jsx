import React, { useState } from 'react';
import { supabase } from '../supabase';
import { Mail, Lock, Phone, Loader2, User, Briefcase, ShieldCheck, Zap, Wrench, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/login-bg.png'; 

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login'); // 'login', 'signup', or 'reset'
  const [role, setRole] = useState('customer');
  
  // Form Data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [specialty, setSpecialty] = useState('');

  const syncProfile = async (userId, userPassword) => {
    await supabase.from('profiles').upsert({ 
      id: userId, 
      full_name: name, 
      email: email,
      mobile: phone,
      password: userPassword,
      role: role,
      ...(role === 'partner' && { experience, specialty })
    });
  };

  const handleGoogleLogin = async () => {
    if (mode === 'signup' && role === 'partner' && (!experience || !specialty)) {
      alert("Please fill in details first.");
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({ 
      provider: 'google', 
      options: { redirectTo: window.location.origin } 
    });
    if (error) alert(error.message);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        
        if (data?.user) {
          await syncProfile(data.user.id, password);
          alert('Registration successful! Please check your email for the confirmation link.');
          setMode('login');
        }
      } else if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/');
      } else if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        alert('Password reset link sent to your email!');
        setMode('login');
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center bg-cover bg-center bg-[#0a0a0a] z-50 pt-20 pb-12" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
        
        {/* Branding Column */}
        <div className="hidden lg:block space-y-12 pr-4 text-white">
          <h1 className="text-6xl font-black leading-tight tracking-tight">Fixing Today,<br /><span className="text-blue-500">Better</span> Tomorrow.</h1>
          <div className="space-y-6 text-gray-300">
            <div className="flex items-center gap-4"><ShieldCheck className="text-blue-500" /> <span>Verified Professionals</span></div>
            <div className="flex items-center gap-4"><Zap className="text-blue-500" /> <span>Quick & Reliable Service</span></div>
          </div>
        </div>

        {/* Auth Form Box */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-[440px] bg-[#0a0a0a]/95 backdrop-blur-xl rounded-[2rem] p-10 border border-gray-800 shadow-2xl">
            
            {mode !== 'login' && (
              <button onClick={() => setMode('login')} className="text-gray-500 hover:text-white mb-4 flex items-center gap-2 text-sm transition-colors">
                <ArrowLeft size={14} /> Back to Login
              </button>
            )}

            <h2 className="text-3xl font-black text-white mb-8">
              {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
            </h2>

            {mode === 'signup' && (
              <div className="flex bg-[#1a1a1a] p-1.5 rounded-2xl mb-6">
                <button type="button" onClick={() => setRole('customer')} className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase transition-all ${role === 'customer' ? 'bg-white text-black' : 'text-gray-500'}`}>Customer</button>
                <button type="button" onClick={() => setRole('partner')} className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase transition-all ${role === 'partner' ? 'bg-white text-black' : 'text-gray-500'}`}>Partner</button>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleAuth}>
              {mode === 'signup' && (
                <>
                  <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} /><input type="text" placeholder="Full Name" required className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] text-white rounded-xl outline-none border border-transparent focus:border-gray-500 transition-all" value={name} onChange={(e) => setName(e.target.value)} /></div>
                  <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} /><input type="tel" placeholder="Mobile Number" required className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] text-white rounded-xl outline-none border border-transparent focus:border-gray-500 transition-all" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
                  {role === 'partner' && (
                    <div className="flex gap-3">
                      <input type="text" placeholder="Specialty" className="w-1/2 p-4 bg-[#1a1a1a] text-white rounded-xl outline-none border border-transparent focus:border-gray-500 transition-all" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
                      <input type="number" placeholder="Exp (Yrs)" className="w-1/2 p-4 bg-[#1a1a1a] text-white rounded-xl outline-none border border-transparent focus:border-gray-500 transition-all" value={experience} onChange={(e) => setExperience(e.target.value)} />
                    </div>
                  )}
                </>
              )}

              <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} /><input type="email" placeholder="Email Address" required className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] text-white rounded-xl outline-none border border-transparent focus:border-gray-500 transition-all" value={email} onChange={(e) => setEmail(e.target.value)} /></div>

              {mode !== 'reset' && (
                <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} /><input type="password" placeholder="Password" required className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] text-white rounded-xl outline-none border border-transparent focus:border-gray-500 transition-all" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
              )}

              <button type="submit" disabled={loading} className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-gray-200 transition-all flex justify-center items-center">
                {loading ? <Loader2 className="animate-spin" size={18} /> : mode === 'login' ? 'Login' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
              </button>
            </form>

            {mode === 'login' && (
              <div className="mt-6 flex justify-between items-center text-xs font-bold">
                <button onClick={() => setMode('reset')} className="text-gray-500 hover:text-white transition-colors">Forgot Password?</button>
                <button onClick={() => setMode('signup')} className="text-blue-500 hover:text-blue-400 transition-colors">Sign Up</button>
              </div>
            )}
            
            <div className="relative my-8"><div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-800"></span></div><div className="relative flex justify-center text-[10px] uppercase font-black text-gray-500 tracking-widest"><span className="bg-[#0a0a0a] px-4">OR</span></div></div>
            <button type="button" onClick={handleGoogleLogin} className="w-full border border-gray-800 text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-white/5 transition-all"><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" alt="Google" /> Continue with Google</button>
          </div>
        </div>
        <div className="hidden lg:block w-full h-full"></div>
      </div>
    </div>
  );
}
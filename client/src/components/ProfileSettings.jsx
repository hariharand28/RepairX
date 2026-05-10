import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import useStore from '../store/useStore';
import { User, Phone, MapPin, CheckCircle, Loader2 } from 'lucide-react';

export default function ProfileSettings() {
  const { user } = useStore();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [address, setAddress] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    mobile: '',
    address: '',
    email: user?.email || '',
  });

  useEffect(() => {
    if (user) {
      supabase.from('profiles').select('*').eq('id', user.id).single()
        .then(({ data }) => {
          if (data) {
            setFormData({
              full_name: data.full_name || '',
              mobile: data.mobile || '',
              address: data.address || '',
              email: user.email,
            });
          }
        });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        full_name: formData.full_name,
        mobile: formData.mobile,
        address: formData.address,
      });
      if (error) throw error;
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Error updating profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 animate-in fade-in zoom-in-95 duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Profile Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your personal information and default service address.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="email" disabled value={formData.email} className="w-full pl-12 pr-4 py-3 bg-gray-50 text-gray-500 rounded-xl outline-none border border-gray-200 cursor-not-allowed" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 rounded-xl outline-none border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all" placeholder="Enter your name" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Mobile Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 rounded-xl outline-none border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all" placeholder="+91" />
          </div>
        </div>

        <div className="relative">
  <input 
    type="text" 
    placeholder="Service Address (e.g., Street, City, ZIP)" 
    className="w-full p-4 bg-[#1a1a1a] text-white rounded-xl outline-none border border-transparent focus:border-blue-500 transition-all" 
    value={address} 
    onChange={(e) => setAddress(e.target.value)} 
  />
</div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Default Address</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-3 text-blue-500" size={18} />
            <textarea name="address" value={formData.address} onChange={handleChange} rows="3" className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 rounded-xl outline-none border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all" placeholder="Enter your full address"></textarea>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-gray-100">
          {saved ? (
            <span className="flex items-center gap-2 text-sm font-bold text-green-600"><CheckCircle size={16} /> Saved Successfully</span>
          ) : <span></span>}
          
          <button onClick={handleSave} disabled={loading} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-md disabled:opacity-50">
            {loading ? <Loader2 size={16} className="animate-spin" /> : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
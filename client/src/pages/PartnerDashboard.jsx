import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Briefcase, CheckCircle, Clock, MapPin, Wrench, LogOut } from 'lucide-react';

export default function PartnerDashboard() {
  const { user } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available'); // 'available', 'active', 'history'
  const [orders, setOrders] = useState([]);
  const [profileName, setProfileName] = useState('Partner');

  useEffect(() => {
    if (!user) return navigate('/login');
    
    supabase.from('profiles').select('full_name').eq('id', user.id).single()
      .then(({ data }) => { if (data?.full_name) setProfileName(data.full_name); });

    fetchOrders();
  }, [user, navigate, activeTab]);

  const fetchOrders = async () => {
    let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
    
    if (activeTab === 'available') {
      query = query.eq('status', 'Pending').is('partner_id', null);
    } else if (activeTab === 'active') {
      query = query.eq('partner_id', user.id).in('status', ['Assigned', 'In Progress']);
    } else {
      query = query.eq('partner_id', user.id).eq('status', 'Completed');
    }

    const { data } = await query;
    setOrders(data || []);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const updates = { status: newStatus };
    if (newStatus === 'Assigned') updates.partner_id = user.id;

    const { error } = await supabase.from('orders').update(updates).eq('id', orderId);
    if (!error) fetchOrders();
    else alert('Error updating order: ' + error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 px-6 font-sans">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* SIDEBAR */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 sticky top-32">
            <div className="w-20 h-20 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-blue-600 mb-6">
              <Briefcase size={32} />
            </div>
            <h2 className="text-xl font-black text-gray-900 mb-1 truncate">{profileName}</h2>
            <p className="text-sm text-gray-500 font-medium mb-8 truncate">Technician Portal</p>

            <div className="space-y-2 mb-8 border-t border-gray-100 pt-8">
              <button onClick={() => setActiveTab('available')} className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'available' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Clock size={18} /> Available Jobs
              </button>
              <button onClick={() => setActiveTab('active')} className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'active' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Wrench size={18} /> My Active Jobs
              </button>
              <button onClick={() => setActiveTab('history')} className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <CheckCircle size={18} /> Completed
              </button>
            </div>

            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors">
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1">
          <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">
            {activeTab === 'available' ? 'Job Marketplace' : activeTab === 'active' ? 'Active Repairs' : 'Work History'}
          </h1>

          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white rounded-[2rem] p-16 text-center border border-gray-100 text-gray-500 font-medium">
                No orders found in this category.
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
                  <div className="flex justify-between items-start mb-6 border-b border-gray-50 pb-6">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order: {order.id.split('-')[0]}</p>
                      <h3 className="text-lg font-black text-gray-900 mb-2">{order.items?.[0]?.title || 'Repair Service'}</h3>
                      <div className="flex items-center gap-4 text-sm font-bold text-gray-600">
                        <span className="flex items-center gap-1 text-blue-600"><Clock size={16}/> {order.scheduled_date} at {order.scheduled_time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-gray-900">₹{order.total_amount}</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="flex items-center gap-2 text-sm text-gray-600 font-medium"><MapPin size={16} className="text-blue-500"/> {order.service_address}</p>
                  </div>

                  <div className="flex gap-4">
                    {activeTab === 'available' && (
                      <button onClick={() => updateOrderStatus(order.id, 'Assigned')} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-black uppercase text-xs hover:bg-blue-700 transition-all shadow-md">
                        Accept Job
                      </button>
                    )}
                    {activeTab === 'active' && order.status === 'Assigned' && (
                      <button onClick={() => updateOrderStatus(order.id, 'In Progress')} className="flex-1 bg-sky-500 text-white py-3 rounded-xl font-black uppercase text-xs hover:bg-sky-600 transition-all shadow-md">
                        Start Repair
                      </button>
                    )}
                    {activeTab === 'active' && order.status === 'In Progress' && (
                      <button onClick={() => updateOrderStatus(order.id, 'Completed')} className="flex-1 bg-green-500 text-white py-3 rounded-xl font-black uppercase text-xs hover:bg-green-600 transition-all shadow-md">
                        Mark Completed
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
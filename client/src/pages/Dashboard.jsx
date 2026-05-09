import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import ProfileSettings from '../components/ProfileSettings';
import { 
  Package, Clock, CheckCircle, ChevronRight, User, Settings, LogOut, Calendar, MapPin
} from 'lucide-react';
import PartnerDashboard from './PartnerDashboard';

export default function Dashboard() {
  const { user } = useStore();
  const [role, setRole] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active'); // 'active', 'history', 'settings'
  const [profileName, setProfileName] = useState('Customer');

  useEffect(() => {
    const initializeDashboard = async () => {
      // Check session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }

      const pendingRole = localStorage.getItem('rx_pending_role');
      if (pendingRole) {
        const exp = localStorage.getItem('rx_pending_exp');
        const spec = localStorage.getItem('rx_pending_spec');
        
        await supabase.from('profiles').upsert({
          id: session.user.id,
          role: pendingRole,
          ...(pendingRole === 'partner' && { experience: exp, specialty: spec })
        });
        
        // Clear it so it only runs once
        localStorage.removeItem('rx_pending_role');
        localStorage.removeItem('rx_pending_exp');
        localStorage.removeItem('rx_pending_spec');
      }
      
      // Fetch role and profile name
      const { data: profile } = await supabase.from('profiles').select('role, full_name').eq('id', session.user.id).single();
      setRole(profile.role?.role || 'customer');
      if (profile?.full_name) setProfileName(profile.full_name);
      
      setAuthChecking(false);

      // Fetch Orders
      const { data: ordersData } = await supabase.from('orders').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });
      setOrders(ordersData || []);
      setIsLoading(false);
    };

    initializeDashboard();
  }, [navigate]);
  

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const filteredOrders = orders.filter(order => {
    const isCompleted = (order.status || '').toLowerCase() === 'completed';
    return activeTab === 'active' ? !isCompleted : isCompleted;
  });

  // Stepper UI Helper
  const getStepperStep = (status) => {
    const s = (status || 'pending').toLowerCase();
    if (s === 'completed') return 4;
    if (s === 'in progress') return 3;
    if (s === 'assigned') return 2;
    return 1; // Pending
  };

  const canCancel = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return false;
  try {
    // Convert "02:00 PM" to 24hr format for JS Date parsing
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
    
    const orderDateTime = new Date(`${dateStr}T${hours.toString().padStart(2, '0')}:${minutes}:00`);
    const timeDifference = orderDateTime.getTime() - new Date().getTime();
    
    return timeDifference > 3600000; // 3600000 ms = 1 hour
  } catch (e) {
    return false;
  }
};

const handleCancelOrder = async (orderId) => {
  if (window.confirm("Are you sure you want to cancel this repair?")) {
    const { error } = await supabase.from('orders').update({ status: 'Cancelled' }).eq('id', orderId);
    
    if (!error) {
      // Instantly update the UI without reloading the page
      setOrders(prevOrders => prevOrders.map(order => 
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      ));
    } else {
      alert("Failed to cancel: " + error.message);
    }
  }
};

if (authChecking) return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">Verifying session...</div>;
  
  // Intercept and load Partner Dashboard if role is partner
  if (role === 'partner') return <PartnerDashboard />;


  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 px-6 font-sans">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* SIDEBAR */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 sticky top-32">
            <div className="w-20 h-20 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-blue-600 mb-6">
              <User size={32} />
            </div>
            <h2 className="text-xl font-black text-gray-900 mb-1 truncate">{profileName}</h2>
            <p className="text-sm text-gray-500 font-medium mb-8 truncate">{user?.email}</p>

            <div className="space-y-2 mb-8 border-t border-gray-100 pt-8">
              <button onClick={() => setActiveTab('active')} className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'active' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <div className="flex items-center gap-3"><Package size={18} /> Active Repairs</div>
                {activeTab === 'active' && <ChevronRight size={16} />}
              </button>
              <button onClick={() => setActiveTab('history')} className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <div className="flex items-center gap-3"><Clock size={18} /> Order History</div>
                {activeTab === 'history' && <ChevronRight size={16} />}
              </button>
              <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <div className="flex items-center gap-3"><Settings size={18} /> Account Settings</div>
                {activeTab === 'settings' && <ChevronRight size={16} />}
              </button>
            </div>

            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors">
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1">
          {activeTab === 'settings' ? (
            <ProfileSettings />
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{activeTab === 'active' ? 'Active Repairs' : 'Repair History'}</h1>
              </div>

              <div className="space-y-6">
                {isLoading ? (
                  <p>Loading...</p>
                ) : filteredOrders.length === 0 ? (
                  <div className="bg-white rounded-[2rem] p-16 text-center border border-gray-100">No {activeTab} orders found.</div>
                ) : (
                  filteredOrders.map((order) => {
                    const step = getStepperStep(order.status);
                    return (
                      <div key={order.id} className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Order: {order.id.split('-')[0]}</p>
                            <div className="flex items-center gap-4 text-sm font-bold text-gray-900">
                              <span className="flex items-center gap-1 text-blue-600"><Calendar size={16}/> {order.scheduled_date || 'TBD'}</span>
                              <span className="flex items-center gap-1 text-blue-600"><Clock size={16}/> {order.scheduled_time || 'TBD'}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-black text-gray-900">₹{order.total_amount}</p>
                            {activeTab === 'active' && canCancel(order.scheduled_date, order.scheduled_time) && (
  <button 
    onClick={() => handleCancelOrder(order.id)}
    className="mt-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
  >
    Cancel Order
  </button>
)}
                            <p className="text-xs font-bold text-green-600">Advance Paid: ₹{order.advance_paid || 0}</p>
                          </div>
                        </div>

                        {/* Horizontal Stepper */}
                        {activeTab === 'active' && (
                          <div className="flex items-center justify-between mb-6 pt-6 border-t border-gray-50">
                            {['Placed', 'Assigned', 'In Progress', 'Completed'].map((lbl, i) => (
                              <div key={i} className={`flex flex-col items-center gap-2 ${step >= i + 1 ? 'text-blue-600' : 'text-gray-300'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= i + 1 ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                                  {step > i + 1 ? <CheckCircle size={14} /> : <span className="text-xs font-bold">{i + 1}</span>}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest">{lbl}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShieldCheck, CreditCard, Loader2, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, clearCart, user } = useStore();
  const navigate = useNavigate();
  const cartTotal = cart.reduce((total, item) => total + (parseFloat(String(item.price).replace(/[^0-9.]/g, '')) * item.quantity), 0);

  const [isCheckout, setIsCheckout] = useState(false);
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [checkoutData, setCheckoutData] = useState({
    name: '', mobile: '', address: '', date: '', time: '', payMode: 'advance'
  });

  const initiateCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (data) {
      setCheckoutData(prev => ({ 
        ...prev, 
        name: data.full_name || '', 
        mobile: data.mobile || '', 
        address: data.address || '' 
      }));
    }
    setIsCheckout(true);
  };

  // Integrated Razorpay Payment Logic
  const handleRazorpayPayment = () => {
    if (!checkoutData.date || !checkoutData.time || !checkoutData.address) {
      alert("Please fill in all details (Address, Date, and Time) first.");
      return;
    }

    const amountToPay = checkoutData.payMode === 'advance' ? 100 : cartTotal;

    const options = {
      key: "rzp_test_SnLJlkyOCuYhoR", 
      amount: amountToPay * 100, // Amount in paise
      currency: "INR",
      name: "RepairConnect",
      description: "Service Booking Payment",
      handler: async function (response) {
        setProcessing(true);
        try {
          const orderRecord = {
            user_id: user.id,
            items: cart,
            total_amount: cartTotal,
            advance_paid: amountToPay,
            status: 'Pending',
            service_address: checkoutData.address,
            scheduled_date: checkoutData.date,
            scheduled_time: checkoutData.time,
            payment_id: response.razorpay_payment_id // Storing transaction ID
          };

          const { data, error } = await supabase.from('orders').insert(orderRecord).select().single();
          if (error) throw error;

          setInvoice({ ...orderRecord, id: data.id });
          clearCart();
        } catch (err) {
          alert("Order recording failed: " + err.message);
        } finally {
          setProcessing(false);
        }
      },
      prefill: {
        name: checkoutData.name,
        email: user.email,
        contact: checkoutData.mobile
      },
      theme: { color: "#2563EB" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (invoice) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 px-6 flex justify-center items-center">
      {/* 1. VISIBLE CONFIRMATION CARD */}
      <div className="bg-white p-10 rounded-[2rem] shadow-sm max-w-md w-full text-center border border-gray-100 animate-in zoom-in duration-300 print:hidden">
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={40}/>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Booking Confirmed</h2>
        <p className="text-gray-500 mb-8">Order #{invoice.id.split('-')[0]}</p>
        
        <div className="bg-gray-50 p-6 rounded-2xl text-left space-y-3 mb-8">
          <p className="flex justify-between text-sm"><span className="text-gray-500">Scheduled:</span> <span className="font-bold text-gray-900">{invoice.scheduled_date} at {invoice.scheduled_time}</span></p>
          <p className="flex justify-between text-sm"><span className="text-gray-500">Advance Paid:</span> <span className="font-bold text-green-600">₹{invoice.advance_paid}</span></p>
          <p className="flex justify-between text-sm border-t border-gray-200 pt-3"><span className="text-gray-500">Balance Due:</span> <span className="font-black text-gray-900">₹{invoice.total_amount - invoice.advance_paid}</span></p>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={() => window.print()} 
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-black uppercase text-xs hover:bg-black transition-all flex items-center justify-center gap-2"
          >
            Download Invoice
          </button>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-black uppercase text-xs hover:bg-blue-700 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>

      {/* 2. HIDDEN INVOICE FOR PRINTING */}
      <div className="hidden print:block print:fixed print:inset-0 print:bg-white p-8 text-black" id="invoice-print">
        <div className="flex justify-between border-b-2 border-gray-100 pb-8 mb-8">
          <div>
            <h1 className="text-2xl font-black text-blue-600">REPAIRCONNECT</h1>
            <p className="text-sm text-gray-500">Official Service Receipt</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Invoice #{invoice.id.split('-')[0]}</p>
            <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-gray-400 uppercase text-xs mb-4 tracking-widest">Service Details</h3>
          <p className="font-bold text-lg">{invoice.items[0]?.title || 'Repair Service'}</p>
          <p className="text-gray-600">{invoice.service_address}</p>
          <p className="text-gray-600">Scheduled: {invoice.scheduled_date} at {invoice.scheduled_time}</p>
        </div>

        <div className="border-t border-b border-gray-100 py-6 my-8 space-y-4">
          <div className="flex justify-between font-medium"><span>Total Amount</span><span>₹{invoice.total_amount}</span></div>
          <div className="flex justify-between text-green-600 font-bold"><span>Amount Paid (Advance)</span><span>-₹{invoice.advance_paid}</span></div>
          <div className="flex justify-between text-xl font-black border-t pt-4"><span>Balance Due</span><span>₹{invoice.total_amount - invoice.advance_paid}</span></div>
        </div>

        <div className="text-center mt-20">
          <p className="text-sm font-bold">Thank you for choosing RepairConnect!</p>
          <p className="text-xs text-gray-400 mt-2">Transaction ID: {invoice.payment_id}</p>
        </div>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 px-6 font-sans">
      <div className="max-w-[1000px] mx-auto flex flex-col lg:flex-row gap-10">
        
        <div className="flex-1">
          <h1 className="text-3xl font-black text-gray-900 mb-8">Your Cart</h1>
          
          {cart.length === 0 ? (
            <div className="bg-white p-16 rounded-[2rem] text-center border border-gray-100 flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-6">
                <ShoppingCart size={40} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-8">Looks like you haven't added any services yet.</p>
              <button onClick={() => navigate('/services')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-md">Browse Services</button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="font-bold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="font-black text-lg text-blue-600">₹{parseFloat(String(item.price).replace(/[^0-9.]/g, '')) * item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:bg-red-50 p-3 rounded-xl transition-colors"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <aside className="w-full lg:w-[400px]">
            {!isCheckout ? (
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 sticky top-32">
                <h3 className="text-xl font-black mb-6">Summary</h3>
                <div className="flex justify-between items-center font-black text-2xl mb-8 border-t border-gray-100 pt-6">
                  <span className="text-gray-500 text-lg">Total</span>
                  <span className="text-blue-600">₹{cartTotal}</span>
                </div>
                <button onClick={initiateCheckout} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 shadow-md transition-all">Proceed to Checkout</button>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-[2rem] shadow-md border border-gray-100 sticky top-32 animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                  <span className={`text-xs font-bold uppercase tracking-widest ${step===1 ? 'text-blue-600' : 'text-gray-400'}`}>1. Details</span>
                  <span className={`text-xs font-bold uppercase tracking-widest ${step===2 ? 'text-blue-600' : 'text-gray-400'}`}>2. Pay</span>
                </div>

                {step === 1 && (
                  <div className="space-y-4">
                    <input type="text" placeholder="Full Name" value={checkoutData.name} onChange={e=>setCheckoutData({...checkoutData, name: e.target.value})} className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50" />
                    <input type="text" placeholder="Mobile Number" value={checkoutData.mobile} onChange={e=>setCheckoutData({...checkoutData, mobile: e.target.value})} className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50" />
                    <textarea placeholder="Service Address" value={checkoutData.address} onChange={e=>setCheckoutData({...checkoutData, address: e.target.value})} className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50" rows="2"></textarea>
                    <div className="flex gap-4">
                      <input type="date" value={checkoutData.date} onChange={e=>setCheckoutData({...checkoutData, date: e.target.value})} className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50" />
                      <select value={checkoutData.time} onChange={e=>setCheckoutData({...checkoutData, time: e.target.value})} className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50">
                        <option value="">Time</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                      </select>
                    </div>
                    <button onClick={() => setStep(2)} className="w-full bg-blue-600 text-white py-4 mt-2 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all">Continue to Payment</button>
                    <button onClick={() => setIsCheckout(false)} className="w-full py-2 text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest">Back to Cart</button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <button onClick={()=>setCheckoutData({...checkoutData, payMode: 'advance'})} className={`p-4 rounded-xl border font-bold text-sm transition-all ${checkoutData.payMode === 'advance' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>₹100 Advance</button>
                      <button onClick={()=>setCheckoutData({...checkoutData, payMode: 'full'})} className={`p-4 rounded-xl border font-bold text-sm transition-all ${checkoutData.payMode === 'full' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>Full: ₹{cartTotal}</button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
                      <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase"><CreditCard size={16} className="text-blue-500"/> Razorpay Secure</div>
                      <p className="text-xs text-gray-400">Clicking pay will open the secure checkout overlay.</p>
                    </div>
                    <button onClick={handleRazorpayPayment} disabled={processing} className="w-full bg-gray-900 text-white py-4 mt-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all flex justify-center items-center gap-2 shadow-lg">
                      {processing ? <Loader2 size={16} className="animate-spin" /> : `Pay ₹${checkoutData.payMode === 'advance' ? 100 : cartTotal}`}
                    </button>
                    <button onClick={()=>setStep(1)} className="w-full py-2 text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest">Back</button>
                  </div>
                )}
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
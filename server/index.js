// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const Razorpay = require('razorpay');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://repair-x-gamma.vercel.app' // Add your live frontend URL
  ], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
})); // Allows your Vite frontend to talk to this server
app.use(express.json());

// Initialize Supabase Client with Service Role Key
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- Basic Test Route ---
app.get('/', (req, res) => {
  res.send('RepairX Backend is running!');
});

// --- Test Database Connection Route ---
app.get('/api/test-db', async (req, res) => {
  try {
    // Attempt to fetch 1 row from the 'profiles' table to test connection
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);

    if (error) throw error;
    
    res.json({ success: true, message: "Connected to Supabase successfully!", sampleData: data });
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// --- Fetch User Orders Route ---
app.get('/api/orders/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId); // Assumes your orders table has a user_id column

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    res.status(500).json({ error: error.message });
  }
});

// --- Cancel Order Route ---
app.patch('/api/orders/:orderId/cancel', async (req, res) => {
  const { orderId } = req.params;

  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'Cancelled' })
      .eq('id', orderId)
      .select(); // Ask Supabase to return the updated row

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Failed to cancel order:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// --- Create Razorpay Order Route ---
// Make sure this line exists somewhere after app.use(express.json());
app.use(express.json()); 

// PASTING THE ROUTE DIRECTLY IN INDEX.JS:
app.post('/api/payments/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentAmount = amount ? amount : 100;

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID, // Must be your real rzp_test_ key
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: paymentAmount * 100, // paise
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    const order = await instance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay Route Error:", error);
    res.status(500).json({ error: error.message });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './supabaseClient.js';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Test Route to verify it works
app.get('/', (req, res) => {
  res.send('RepairConnect Server is Live!');
});
// Sample data - you can later fetch this from Supabase
app.get('/api/services', (req, res) => {
  const services = [
    { id: 1, name: 'iPhone Screen Repair', category: 'Mobile', base_price: 2500 },
    { id: 2, name: 'Laptop Keyboard Fix', category: 'Laptop', base_price: 1800 },
    { id: 3, name: 'Battery Replacement', category: 'Electronics', base_price: 1200 },
  ];
  res.json(services);
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
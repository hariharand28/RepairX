const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// GET /api/orders?user_id=<uuid>
// Fetch all orders for a specific user
router.get('/', async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'user_id query parameter is required.' });
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error.message);
    return res.status(500).json({ error: 'Failed to fetch orders.', details: error.message });
  }

  return res.status(200).json({ orders: data });
});

// POST /api/orders
// Create a new order
// Body: { user_id, total_amount, advance_paid, scheduled_date, scheduled_time }
router.post('/', async (req, res) => {
  const { user_id, total_amount, advance_paid, scheduled_date, scheduled_time } = req.body;

  if (!user_id || total_amount === undefined || advance_paid === undefined) {
    return res.status(400).json({
      error: 'user_id, total_amount, and advance_paid are required fields.',
    });
  }

  const newOrder = {
    user_id,
    status: 'pending',
    total_amount,
    advance_paid,
    scheduled_date: scheduled_date || null,
    scheduled_time: scheduled_time || null,
  };

  const { data, error } = await supabase
    .from('orders')
    .insert([newOrder])
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error.message);
    return res.status(500).json({ error: 'Failed to create order.', details: error.message });
  }

  return res.status(201).json({ message: 'Order created successfully.', order: data });
});

// PUT /api/orders/:id/status
// Update the status of an existing order
// Body: { status }
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const VALID_STATUSES = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];

  if (!status) {
    return res.status(400).json({ error: 'status field is required.' });
  }

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}.`,
    });
  }

  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating order status:', error.message);
    return res.status(500).json({ error: 'Failed to update order status.', details: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: `Order with id ${id} not found.` });
  }

  return res.status(200).json({ message: 'Order status updated successfully.', order: data });
});

module.exports = router;
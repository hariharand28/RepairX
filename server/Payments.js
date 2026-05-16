const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/payments/create-order
// Creates a Razorpay order to initiate a payment session on the frontend
// Body: { amount, currency, receipt, notes }
//   amount   — in the smallest currency unit (paise for INR). E.g. ₹500 → 50000
//   currency — e.g. "INR"
//   receipt  — a unique reference string (e.g. your internal order id)
router.post('/create-order', async (req, res) => {
  const { amount, currency = 'INR', receipt, notes = {} } = req.body;

  if (!amount || !receipt) {
    return res.status(400).json({ error: 'amount and receipt are required fields.' });
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number in paise.' });
  }

  const options = {
    amount,
    currency,
    receipt,
    notes,
  };

  try {
    const order = await razorpay.orders.create(options);
    return res.status(201).json({
      message: 'Razorpay order created successfully.',
      order,
    });
  } catch (err) {
    console.error('Razorpay order creation error:', err);
    return res.status(500).json({
      error: 'Failed to create Razorpay order.',
      details: err.error?.description || err.message,
    });
  }
});

// POST /api/payments/verify
// Verifies the Razorpay payment signature after the frontend checkout completes
// Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      error: 'razorpay_order_id, razorpay_payment_id, and razorpay_signature are all required.',
    });
  }

  // The signature is an HMAC-SHA256 hash of "<order_id>|<payment_id>"
  // signed with the Razorpay Key Secret
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({
      success: false,
      error: 'Payment verification failed. Invalid signature.',
    });
  }

  // Signature is valid — payment is authentic
  return res.status(200).json({
    success: true,
    message: 'Payment verified successfully.',
    payment_id: razorpay_payment_id,
    order_id: razorpay_order_id,
  });
});

module.exports = router;
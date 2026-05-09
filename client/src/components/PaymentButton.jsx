const handlePayment = (serviceAmount, customerName, customerEmail) => {
  const options = {
    key: "rzp_test_SnLJlkyOCuYhoR", // Your Test Key
    amount: serviceAmount * 100, // Amount in paise (e.g., ₹500 = 50000)
    currency: "INR",
    name: "RepairConnect",
    description: "Repair Service Booking",
    image: "https://your-logo-url.com/logo.png", // Optional: your logo
    handler: async function (response) {
      // This runs when payment is successful
      alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      
      // LOGIC: Here you would update your Supabase 'bookings' table
      console.log("Transaction ID:", response.razorpay_payment_id);
    },
    prefill: {
      name: customerName || "Guest User",
      email: customerEmail || "test@example.com",
      contact: "9999999999"
    },
    notes: {
      address: "Repair Service Address"
    },
    theme: {
      color: "#3B82F6" // This matches your blue theme
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
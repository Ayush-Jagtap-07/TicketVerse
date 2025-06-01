// backend/controllers/paymentController.js
require('dotenv').config();
const Razorpay = require('razorpay');


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

module.exports.createOrder = async (req, res) => {
    // console.log("razorpay id :" +process.env.RAZORPAY_KEY_ID);
    
  const { amount } = req.body;
  console.log("amount :" +amount);
  const options = {
    amount: amount * 100, // amount in paise
    currency: "INR",
    receipt: "receipt_event_" + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    // res.json(order);
    console.log(order);
    res.json( order );
  } catch (error) {
    res.status(500).json({ error}); 
  }
};

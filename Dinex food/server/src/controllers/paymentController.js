import razorpay from "../config/razorpay.js";

export const RazorpayGetKey = async (req, res, next) => {
  try {
    res.status(200).json({ key: process.env.RAZORPAY_TEST_API_KEY });
  } catch (error) {
    next(error);
  }
};

export const RazorPayCreateOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      const error = new Error("Invalid Amount");
      error.statusCode = 400;
      return next(error);
    }

    const Total = Number(amount)
    const RazorPayOptions = {
      amount: Math.round(Total * 100),
      currency: "INR",
      receipt: `CravingReciept_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    };

    console.log(RazorPayOptions);

    const order = await razorpay.orders.create(RazorPayOptions);

    console.log("Data from RazorPay", order);

    res.status(200).json({ message: "Redirecting for Payment", data: order });
  } catch (error) {
    next(error);
  }
};

export const RazorPayVerifyPayment = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
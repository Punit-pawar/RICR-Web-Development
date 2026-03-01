import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const verifyRazorPayConnect = async () => {
    const orders = await razorpay.orders.all({count:1});
    return orders.data[0];

}
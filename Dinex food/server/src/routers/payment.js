import express from "express";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("getRazorpaykey" , protect, Razorpaygetkey);

router.post("/create-order", protect, RazorPayCreateOrder);
router.post("/verifyPayment", protect, RazorPayVerifyPayment);

export default router;

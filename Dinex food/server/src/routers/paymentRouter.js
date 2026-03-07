import express from "express";
import { Protect } from "../middlewares/authMiddleware.js";
import {
  RazorPayCreateOrder,
  RazorpayGetKey,
  RazorPayVerifyPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/getRazorpayKey", Protect, RazorpayGetKey);

router.post("/createOrder", RazorPayCreateOrder);
router.post("/verifyPayment", Protect, RazorPayVerifyPayment);

export default router;
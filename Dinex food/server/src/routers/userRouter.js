import express from "express";
import {
  UserUpdate,
  UserChangePhoto,
  UserResetPassword,
  UserPlaceOrder,
  UserAllOrders,
} from "../controllers/userController.js";
import { Protect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const Uploads = multer();

router.put("/update", Protect, UserUpdate);
router.patch("/changePhoto", Protect, Uploads.single("image"), UserChangePhoto);
router.patch("/resetPassword", Protect, UserResetPassword);

router.post("/placeorder", Protect, UserPlaceOrder);

router.get("/placedorders", Protect, UserAllOrders);

export default router;
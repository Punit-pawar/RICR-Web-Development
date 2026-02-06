import express from "express";
import multer from "multer";

import { RestaurantAddMenuItem , GetRestaurantMenuItem} from "../controllers/restaurantController.js";
import { ManagerProtect, Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer();

router.post(
  "/addMenuItem",
  Protect,
  ManagerProtect,
  upload.array("itemImages", 5),
  RestaurantAddMenuItem,
);
router.get(
  "/menuItems",
  Protect,
  ManagerProtect,
  GetRestaurantMenuItem,
);

export default router;
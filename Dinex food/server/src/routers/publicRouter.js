import express from "express";
import {
  NewContact,
  GetAllRestaurants,
  GetRetaurantMenuData,
} from "../controllers/newContact.js";

const router = express.Router();

router.post("/new-contact", NewContact);
router.get("/allRestaurants", GetAllRestaurants);
router.get("/restaurant/menu/:id", GetRetaurantMenuData);
export default router;
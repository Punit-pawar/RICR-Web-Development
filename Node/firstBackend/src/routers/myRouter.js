import express from 'express';
import { UserRegister, Userlogin, Userlogout } from '../controller/myController.js';

const router = express.Router();

router.post("/register" , UserRegister);
router.post("/login" , Userlogin);
router.get("/logout" , Userlogout);


export default router;
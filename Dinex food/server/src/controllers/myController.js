import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const UserRegister = async (req,res,next) =>{
    try {
        const {fullName, email, mobileNumber, password} = req.body;

        if(!fullName || !email || !mobileNumber || !password) {
            const error = new Error("All Felids required");
            error.statusCode = 400;
            return next(error);
        }

        const existingUser = await User.findOne({email});
        
        if(existingUser) {
            const error = new Error("Email already registered");
            error.statusCode = 409;
            return next(error);
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            fullName,
            email,
            mobileNumber,
            password: hashPassword,
        });

        console.log(newUser);
        res.status(201).json({message:"Registration Successfull"})

    } catch (error) {
        next(error);
        
    }
};

export const UserLogin = async (req,res,next) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            const error = new Error("All Felids required");
            error.statusCode = 400;
            return next(error);
        }

        const existingUser = await User.findOne({email});
        if(!existingUser) {
            const error = new Error("Email not registered");
            error.statusCode = 402;
            return next(error);
        }

        const isverified = await (bcrypt.compare, existingUser.password);
        if(!isverified) {
            const error = new Error("Password not match");
            error.statusCode = 402;
            return next(error);
        }

        res.status(200).json({message:"Login Successfully", data: existingUser});

    } catch (error) {
        next(error);
    }
};


export const UserLogout = async (req,res,next) =>{
    try {   

        res.status(200).json({message:"Logout Successfully"});

    } catch (error) {
        next(error);
    }
};
import User from "../models/usermodel.js";

export const UserRegister = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
      res.status(400).json({ Message: "All fields Required" });
      return;
    }

    const newUser = await User.create({
      fullName,
      email,
      phone,
      password,
    });

    console.log(newUser);

    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internet Server Error" });
  }
};



export const Userlogin = async (req, res) => {
  try {
    const {email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ Message: "All fields Required" });
      return;
    }

    const existingUser = await User.find({email});
    if(!existingUser){
        res.status(404).json({ Message: "User Not Found" });
        return;
    }

    const isverified = password === existingUser.password;
    if(!isverified){
        res.status(402).json({ Message: "User Not Authorized" });
        return;
    }

    console.log(existingUser);

    res.status(202).json({ message: "Welcome Back", data:existingUser });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internet Server Error" });
  }
};



export const Userlogout = async (req, res) => {
  try {
    res.status(200).json({message: "Logout successfully"})
  } catch (error) {}
};

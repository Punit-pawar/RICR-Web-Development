import dotenv from "dotenv";
dotenv.config();

import express from "express";


const app = express();

app.get("/",(req,res)=>{
    console.log("Server is running");
    res.json({ Message : "Server is running Sucessfully now"})
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Server Started at PORT", PORT);
});
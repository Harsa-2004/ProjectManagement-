// const router=require("express").Router();
// const { User, validate } = require("../models/User");
// const bcrypt = require("bcrypt");
// router.post("/",async(req,res)=>{
//     try{
//         const{error}=validate(req.body);
//         if(error)
//             return res.status(400).send({message:error.details[0].messaage});
//         const user=await User.findOne({email:req.body.email});
//         if (user)
//             return res.status(409).send({message:"User with given email already exists!"});
//         const salt=await bcrypt.genSalt(Number(process.env.SALT));
//         const hashPassword= await bcrypt.hash(req.body.password,salt);
//         await new User({...req.body, password:hashPassword}).save();
//         res.status(201).send({message:"User created Successfully"});
//     }catch(error){
//         res.status(500).send({message:"Internal Server Error"})
//     }
// })
// module.exports= router;

import express from "express";
import bcrypt from 'bcryptjs';
import { User, validate } from "../models/User.js"; // Fix import

const router = express.Router();

// User registration route
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(409).send({ message: "User already exists!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router; // ✅ Correct default export

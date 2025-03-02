// const router=require("express").Router();
// const{User}=require("../models/User");
// const joi=require("joi");
// const bcrypt=require("bcrypt");
// router.post("/",async(req,res)=>{
//     try{
//         const{error}=validate(req.body);
//         if (error) 
//             return res.status(400).send({message:error.details[0].messaage});
//         const user=await User.findOne({email:req.body.email});
//         if (!user)
//             return res.status(401).send({message:"Invalid email Id or password!"});
//         const validPassword= await bcrypt.compare(
//             req.body.password,user.password
//         );
//         if (!validPassword)
//             return res.status(401).send({message:"Invalid Email or Password"})
//         const token=user.generateAuthToken();
//         res.status(200).send({data:token,message:"Logged in successfully"})   
//     }catch(error){
//        res.status(500).send({message:"Internal Server Error"});
//     }
// })
// const validate=(data)=>{
//     const schema=joi.object({
//         email:joi.string().email().required().label("Email"),
//         password:joi.string().required().label("Password")
//     });
//     return schema.validate(data);
// }

import express from "express";
import { User } from "../models/User.js"; // Fix import (Ensure correct case)
import Joi from "joi";
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Validate request body
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password!" });
    }

    // Validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid email or password!" });
    }

    // Generate JWT token
    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Validation function
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

export default router; // ✅ Correct default export

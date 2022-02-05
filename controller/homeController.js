const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const User=require('../models/userModel')


//this controller is to logIn the user and set the  authorization token 
module.exports.login=async(req,res,next)=>{
     const email=req.body.emailId
     const password=req.body.password
     if (!email){
        res.status(400).json({success:"false",description:"please provide an email"})
     }else{

     const user=await User.find({emailId:email})
     if (!user)  res.status(400).json({success:"false",description:"Email not exist"})
     else{
     const pass=await bcrypt.compare(password,user[0].password)
     if (!pass)  res.status(400).json({success:"false",description:"password is invalid"})
     else{
     const token= await jwt.sign(user[0]._id,process.env.SECRET_KEY)
     res.set("Authorization",token)
     res.status(200).json({success:"true",token:token})
     next()
}}}}

const User=require('../models/userModel')
const jwt=require('jsonwebtoken')

//This controller is to get all the user
module.exports.getAllUser=async(req,res)=>{
    const user=await User.find()
    res.status(200).json({success:"true",Number:user.length,users:user})
}


//This controller is to get one user by id
module.exports.getUser=async(req,res)=>{
    const id=await req.params.id
    const user=await User.find({_id:id})
    if (!user) res.status(404).json({success:"true",description:"user not found"})
    res.status(200).json({success:"true",user:user})
}


//This controller is to add new user
module.exports.addUser=async (req,res)=>{
    const email= await req.body.emailId
    const user=await User.findOne({emailId:email})
    if (user){ 
    res.status(400).json({success:"false",desciption:"Email already exist"})
    }
    else{
    const newUser= new User({
        name:req.body.name,
        emailId:req.body.emailId,
        password:req.body.password,
        confirmPass:req.body.confirmPass,
        role:req.body.role
    })
    newUser.save(async(err,result)=>{
     if (err) res.status(400).json({success:"True",error:err})

     else{
        const token= await jwt.sign(newUser._id,process.env.SECRET_KEY)
        res.set("Authorization",token)
        res.status(200).json({success:"true",user:result})
     }
    })
}}


//This controller is to delete the existing user
module.exports.deleteUser=(req,res)=>{
    const id=req.params.id
    User.findByIdAndDelete(id,function(err,result){
        if (err) res.status(400).json({success:"False",error:err})
        else{
            res.status(400).json({success:"True",description:"User deleted"})
        }
    })
}


//This controller is to update the existing user
module.exports.updateUser=(req,res)=>{
    const id=req.params.id
    User.findByIdAndUpdate(id,req.body,function(err,result){
        if (err) res.status(400).json({success:"False",error:err})
        else{
            res.status(200).json({success:"true",description:"User updated"})
        }
    })
}
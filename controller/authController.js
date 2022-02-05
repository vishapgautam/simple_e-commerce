const jwt=require('jsonwebtoken')
const User=require('../models/userModel')
require('dotenv').config()


// module.exports.sign=async(req,res)=>{
//      const token=await jwt.sign("fdsafd",process.env.SECRET_KEY)
//      res.status(200).send(token)
// }

// module.exports.veryfy=async(token)=>{
//     return await jwt.verify(token,process.env.SECRET_KEY)
// }


//This controller is to verify the token from the authorization header
//If Token is valid then the controll will move to the next middleware/controller
module.exports.authorise=async(req,res,next)=>{
    const token=req.header('Authorization').split(" ")[1]
    if (!token){
        res.status(404).json({success:"false",description:"token not found"})
    }
    else{
       try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        next()

   }catch(e){
    res.status(400).json('Token not valid')
   }
}
    }


//This controller is to veryfy wheather the client is admin or not using the token in authorization header 
//If the the client is admin then only the controll will move to the next middleware/controller
module.exports.verifyAdmin=async(req,res,next)=>{
    let token=req.header('Authorization')
    if (!token) res.status(400).json({success:"false",description:"Token not provided"})
    token=req.header('Authorization').split(" ")[1]||req.cookies.token
    if (!token){
        res.status(404).json({success:"false",description:"token not found please login again"})
    }
    else{
        try{
            const id = jwt.verify(token,process.env.SECRET_KEY);
            const user=await User.findById(id)
            if (!user) res.status(400).json({success:"false",description:"user not found"})
            else{
                if (user.role=="admin"){
                    next()
                }else{
                    res.status(400).json({success:"false",description:"Forbiden route"})
                }
            } 
       }catch(e){
        res.status(400).json('Token not valid')
       }

    }
}
const mongoose=require('mongoose')
const { v4: uuidv4 } = require('uuid');


const productSchema=mongoose.Schema(
    {
      _id:{
          type:String,
          default:()=>uuidv4().replace(/\-/g,"")
      },
      productName:{
          type:String,
          required:true,

      },
     price:{
         type:Number,
         required:true
     }

})

module.exports=mongoose.model("Product",productSchema)


const Product=require('../models/productModel')


//This controller is to get all the product in sorted order according to their price and name
module.exports.getAll=async(req,res)=>{
    const product=await Product.find({},{__v:0}).sort("price").sort("productName")
    res.status(200).json({success:"True",number:product.length,products:product})
}



//This controller is to add new product
module.exports.add=async(req,res)=>{
    const product=new Product({
        productName:req.body.productName,
        price:req.body.price
    })
    product.save(function(error,result){
        if (error){
            res.status(400).json({success:"false",error:error})
        }
        else{
            res.status(200).json({success:"True",product:result})
        }
    })
}



//This controller is to get one product by id
module.exports.getOne=async(req,res)=>{
    const id=req.params.id
    const product=await Product.find({_id:id})
    if (!product) res.status(400).json({success:"false",description:"not found"})
    else{
        res.status(200).json({success:"True",product:product})
    }
}



//This controller is to update the existing product
module.exports.update=async(req,res)=>{
    const id=req.params.id
    Product.findByIdAndUpdate(id,req.body,function(error,result){
        if (error) res.status(400).json({success:"false",error:error})
        else{
            res.status(200).json({success:"True",product:result})
        }
    })

}



//This controller is to delete the produt
module.exports.delete=async(req,res)=>{
    const id=req.params.id
    Product.findByIdAndDelete(id,function(error,result){
        if (error) res.status(400).json({success:"false",error:error})
        else{
            res.status(200).json({success:"True",description:"Product deleted"})
        }
    })
}
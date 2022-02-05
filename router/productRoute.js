const express=require('express')
const router=express.Router()

const productController=require('../controller/productController')
const authController=require('../controller/authController')//This controller is to protect the product route

router
    .get('/getAll',productController.getAll)//This route will get all products
    .post('/add',authController.verifyAdmin,productController.add)//This route is protected and only admin can add new product using this route
    .get('/getOne/:id',productController.getOne)//This route is to get one product using id
    .patch('/update/:id',authController.verifyAdmin,productController.update)//This route is also user proctected and only admin can update the product using this route
    .delete('/delete/:id',authController.verifyAdmin,productController.delete)//This route is also proctected and only admin can use this to delete the product.


module.exports=router
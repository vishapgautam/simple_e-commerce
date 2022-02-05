const express=require('express')
const router=express.Router()

const userController=require('../controller/userController')
const authController=require('../controller/authController')


router
      .get('/getAll',authController.verifyAdmin,userController.getAllUser)//This route is protected and only admin can get all the users using this route.
      .get('/getOne/:id',userController.getUser)//This route is to get one user using id.
      .post('/add',userController.addUser)//This route is to add new user.
      .delete('/delete/:id',userController.deleteUser)//This route is to delete user and any user can delete itself
      .patch('/update/:id',userController.updateUser)//This route is to update user and user can update itself using its id

module.exports=router
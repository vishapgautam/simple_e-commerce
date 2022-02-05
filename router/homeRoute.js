const express = require('express')
const router=express.Router()

const homeController=require('../controller/homeController')
const userController=require('../controller/userController')

router 
      .post('/login',homeController.login)//This route will be used to login the user and set the authorization token 
      .post('/signup',userController.addUser)//This will create the new user and set the authorization token

module.exports=router
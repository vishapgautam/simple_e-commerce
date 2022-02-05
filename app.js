const express=require('express')
const app=express()
require('dotenv').config()
const morgan=require('morgan')

//Middlewares 
app.use(morgan('dev'))
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//routers for third party middleware
const userRoute=require('./router/userRoute')
const productRoute=require('./router/productRoute')
const homeRoute=require("./router/homeRoute")


//routing middleware
app.use('/user',userRoute)
app.use('/product',productRoute)
app.use('/',homeRoute)

module.exports=app

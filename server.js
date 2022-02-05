const app=require('./app')
const dotenv=require('dotenv')

//mongodb connection
const mongodb=require('./utils/mongodb')

//environment variable 
dotenv.config()


app.listen(process.env.PORT,()=>{
    console.log("server is listining on port 3000........")
})
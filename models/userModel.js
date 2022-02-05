const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const validator=require('validator')
const { v4: uuidv4 } = require('uuid');


const userSchema=mongoose.Schema(
    {
      _id:{
          type:String,
          default:()=>uuidv4().replace(/\-/g,"")
      },
      name:{
          type:String,
          required:true,

      },
      emailId:{
          type:String,
          required:true,
          validate: [validator.isEmail, 'Please provide a valid email']
      },
      password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
        //select: false
      },
      confirmPass:{
          type:String,
          required:true,
          validate: {
            // This only works on CREATE and SAVE!!!
            validator: function(el) {
              return el === this.password;
            },
            message: 'Passwords are not the same!'
          }
          //select:false
      },
       token:{type:String
     },
     role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
      }

})

userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
  
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPass=this.password
    // Delete passwordConfirm field
    this.confirmPass = undefined;
    next();
  });

module.exports=mongoose.model("User",userSchema)


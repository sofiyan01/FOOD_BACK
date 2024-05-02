import userModel from "../models/userModeil.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from  "validator";


//login user

const loginUser = async (req,res)=>{

    const {email,password} = req.body

    try {
        
     const user=await userModel.findOne({email})
     
     if (!user) {
            return res.json({
                success: false,
                message:"User doesn't exist"
            })
     }

     const matched=await bcrypt.compare(password,user.password)

     if (!matched) {
        
        return res.json({
            success: false,
            message:"Invalid credentials"  
        })
     }

     const token = createToken(user._id)

     res.json({
        success: true,
        token
     })


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

//jwt token
const createToken=  (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


//Register user

const registerUser = async (req,res)=>{
  
    const {name,email,password} = req.body;

    try {
       
        //checking is user already registered
    
        const exists=await userModel.findOne({email})
    
        if (exists) {
            return res.json({
                success: false,
                Message: "Useralready registered"
            })
        }
    
        // checking user validator
    
            if (!validator.isEmail(email)) {
                return res.json({
                    success:false,
                    message:"Please provide a valid email address"
                })
            }
    
            // fro strong password 
    
                if (password.length<8) {
                       return res.json({
                        success:false,
                        message:"Please provide a strong password"
                       }) 
                }
    
         // Hashing password with bcrypt 
         
         const salt= await bcrypt.genSalt(10)
         const hashedPassword = await bcrypt.hash(password,salt)
    
         const newUser = await userModel.create({
            name:name,
            email:email,
            password:hashedPassword
         })
    
        const user=await newUser.save();
        const token=createToken(user._id)
    
        res.json({
            success:true,
            token
        })
            
    } catch (error) {
console.log(error);        

res.json({
    success:false,
    message:"Error"
})
}


    }


export {loginUser,registerUser}
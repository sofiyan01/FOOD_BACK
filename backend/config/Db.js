import mongoose from "mongoose"


export  const connectDB= async ()=>{


    try {
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log("Database Connected SuccessFully");
        })     
    } catch (error) {
        console.log(error.message);
    }
   
}
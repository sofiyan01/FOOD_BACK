import express from "express"
import cors from "cors"
import morgan from "morgan"
import { connectDB } from "./config/Db.js"
import foodRoter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import "dotenv/config.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

//App config
const app=express()
const port=4000

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("common"))

//DB connection
connectDB()

//API Endpoints

app.use("/api/food",foodRoter)
app.use("/images",express.static("uploads"))
app.use("/api/user/",userRouter)
app.use("/api/cart/",cartRouter)
app.use("/api/order/",orderRouter)

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`);
  
})
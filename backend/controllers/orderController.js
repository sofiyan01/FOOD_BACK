
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModeil.js";
import  Stripe  from "stripe"



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placing user order for frontend

const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173"


    try {


        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })
    
    
        const line_items = req.body.items.map((item) => ({
    price_data: {
        currency: "inr",
        product_data: {
            name: item.name
        },
        // Apply the factor of 80 to the item price
        unit_amount: item.price * 80
    },
    quantity: item.quantity
}));

// Adjusting delivery charge to 20 rupees
const deliveryCharge = 20; // Delivery charge in INR

// Add delivery charge only once
line_items.push({
    price_data: {
        currency: "inr",
        product_data: {
            name: "Delivery Charges"
        },
        // Apply the factor of 80 to the delivery charge
        unit_amount: deliveryCharge * 100
    },
    quantity: 1
});

// Calculate total amount
    
        
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({
            success: true,
            session_url: session.url
        })

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: "Error"
        })
    }
}

const verifyOrder= async(req,res)=>{

    const {orderId,success}=req.body;

    try {
        if (success==="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({
                success: true,
                message: "Paid"
            })
        }else{
            await orderModel.findByIdAndDelete(orderId)
                res.json({
                    success: false,
                    message: "Not Paid"
                })
        }    
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }

}

const userOrder= async (req,res)=>{

    
    try {
        const orders=await orderModel.find({orderId:req.params.orderId})
        res.json({
            success:true,
            data:orders
        })      
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
  
}

// all user order for admin

    const listOrders= async (req,res)  =>{

        try {

            const orders=await orderModel.find({})

            res.json({
                success: true,
                data:orders
            })

        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                message:"Error"
            })

        }

    }


    // Api for updating order status

    const updateStatus=async (req,res)=>{
            try {
                await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
                res.json({
                    success:true,
                    message:"Status updated"
                })
            } catch (error) {
                console.log(error);
                res.json({
                    success:false,
                    message:"Error"
                })
            }
    }

export  { placeOrder,verifyOrder,userOrder,listOrders,updateStatus} 
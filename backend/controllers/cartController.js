
import userModel from "../models/userModeil.js"


//add items to user cart

    
const addToCart= async (req,res)=>{

    try {

        const userData=await userModel.findById(req.body.userId)
        const cartData=await userData.cartData;
        
        if (!cartData[req.body.itemId]) {
    
           cartData[req.body.itemId]=1;
    
        }else{
            cartData[req.body.itemId] +=1 ;
        }
    
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({
            success: true,
            message:"Item Added to cart",
            
        })        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message:"Error"
        })
    }


}


//remove items from user cart

const removeFromCart= async (req,res)=>{

    try {

        const userData= await userModel.findById(req.body.userId);
        const cartData=await userData.cartData;
    
        if (cartData[req.body.itemId]>0) {
            
            cartData[req.body.itemId]-=1 
        }
    
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({
            success: true,
            message:"removed from cart"
        })        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message:"Error"
        })
    }


}

//fetch user cart data

const getCart = async (req,res)=>{

    const userData=await userModel.findById(req.body.userId)
    const cartData=await userData.cartData;

    res.json({
        success: true,
        cartData: cartData
    })


}


export {addToCart,removeFromCart,getCart}
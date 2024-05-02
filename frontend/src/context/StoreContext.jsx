import { createContext, useEffect, useState } from "react";
import { food_list } from "../asset/assets";
import axios from "axios";

export const StoreContext=createContext(null)

const StoreContextProvider=(props)=>{

    const [cartItems,setCartItem]=useState({})
    const url="http://localhost:4000"
    const [token,setToken]=useState("")
    const [food_list,setFoodList]=useState([])

    const addToCart= async (itemId)=>{
        if (!cartItems[itemId]) {
            setCartItem((prev)=>({...prev,[itemId]:1}))    
        }
        else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if (token) {
            await axios.post(url +"/api/cart/add" ,{itemId},{headers:{token}})
        }
    
    }

    const removeFromCart= async (itemId)=>{
            setCartItem((prev)=>({...prev,[itemId] :prev[itemId]-1}))

        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }

        }



    const getTotalcartAmount=()=>{
        let totalamount=0;
    for(const item in cartItems)
    
    {
if (cartItems[item]>0) {
    let itemInfo=food_list.find((product)=>product._id===item)
    totalamount+=itemInfo.price*cartItems[item]

}
}
return totalamount;    
    }

    const fetchFoodList=async()=>{
        const response = await axios.get(url+"/api/food/list")      
        setFoodList(response.data.data)
        
    }


    const loadCartData= async (token)=>{

        const response= await axios.post(url+"/api/cart/get",{},{headers:{token}})
        console.log(response.data);

        setCartItem(response.data.cartData)
    }



useEffect(() =>{

   async function fetchData(){
    fetchFoodList();
    if ( localStorage.getItem("token")) {
    setToken(localStorage.getItem("token"))
    await loadCartData(localStorage.getItem("token"))
}

}
   fetchData();
},[])

    const contextValue={
        food_list,
        cartItems,
        setCartItem,
        addToCart,
        removeFromCart,
    getTotalcartAmount,
    url,
    token,
    setToken
    }

return(

    <StoreContext.Provider value={contextValue}> 
    {props.children} 
    </StoreContext.Provider>
)
}

export default StoreContextProvider;
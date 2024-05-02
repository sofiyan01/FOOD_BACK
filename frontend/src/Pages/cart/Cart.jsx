import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const {cartItems,removeFromCart,food_list,getTotalcartAmount,url}=useContext(StoreContext)
  
  const Navigate=useNavigate()

  return (
    <div className='cart'>

  <div className='cart-items'>
    <div className='cart-items-title'>
      <p>Items</p>
      <p>Title</p>
      <p>Price</p>
      <p>Quantity</p>
      <p>Total</p>
      <p>Remove</p>

    </div>
    <br/>
    <hr/>
<div className='wrap'></div>
{food_list.map((item,index)=>{
      if(cartItems[item._id]>0){
          console.log(cartItems)
        return(
         <div className='wrapper'> 
         <div key={index} className='cart-items-item'>
          <img src={ url+"/images/"+item.image} alt=''/>
<p>{item.name}</p>
<p>₹{item.price}</p>
<p>{cartItems[item._id]}</p>
<p>₹{item.price *cartItems[item._id]}</p>
<p className='x' onClick={()=>removeFromCart(item._id)} >X</p>
          </div>

         </div>
                 )
      }
    })}

  </div>

<div className='cart-bottom' >
<div className='cart-s'>
<div className='cart-total'>
  <h2> Cart Totals</h2>
  <div>
    <div className='cart-total-details'>
      <p>Subtotal</p>
      <p>₹{getTotalcartAmount()}</p>
    </div>
    <hr/>

    <div className='cart-total-details'>
      <p>Delivery Fee</p>
      <p>₹{getTotalcartAmount()===0?0:20}</p>
  
    </div>
    <hr/>

    <div className='cart-total-details'>
      <p style={{fontWeight:"500", color:"black"}} >   Total</p>
      <p>₹{ getTotalcartAmount()===0?0: getTotalcartAmount()+20}</p>
  
    </div>
    

  </div>
  <button onClick={()=>Navigate("/order")} >PROCEED TO CHECKOUT</button>

</div>

</div>
<div></div>
<div className='cart-promocode'>
<div>
  <p> if you have a promo code ,Enter it here</p>
  <div className='cart-promocode-input'>
    <input type='text' placeholder='Enter promocode here'/>
    <button>SUBMIT</button>
  </div>
</div>
</div>
    </div>
    </div>
  )
}

export default Cart
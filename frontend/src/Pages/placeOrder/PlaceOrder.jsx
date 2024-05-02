import React, { useContext, useEffect, useState, } from 'react'
import {useNavigate} from "react-router-dom"
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
// import {toast from "toast"
import { toast } from 'react-toastify'


const PlaceOrder = () => {

  
  const { getTotalcartAmount, token, food_list, cartItems, url } = useContext(StoreContext)


  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const changeHandler = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = []

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let iteminfo = item
        iteminfo["quantity"] = cartItems[item._id]
        orderItems.push(iteminfo)
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalcartAmount() + 20
    }

    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url)
    } else {
      alert("Error")

    }

  }

  const navigate = useNavigate();

useEffect(()=>{
  if (!token) {
    navigate("/cart")
    toast.error("please Login to order")
  }else if (getTotalcartAmount()===0) {
    navigate("/cart")
  }

},[token])

  return (
    <form className='place-order' onSubmit={placeOrder} >
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input type='text' name='firstName' value={data.firstName} onChange={changeHandler} placeholder='First Name' required />
          <input type='text' name='lastName' value={data.lastName} onChange={changeHandler} placeholder='Last Name' required />
        </div>
        <input type='email' name='email' value={data.email} onChange={changeHandler} placeholder='Enter Email' required />
        <input type='text' name='street' value={data.street} onChange={changeHandler} placeholder='Street' required />
        <div className='multi-fields'>
          <input type='text' name='city' value={data.city} onChange={changeHandler} placeholder='city' required />
          <input type='text' name='state' value={data.state} onChange={changeHandler} placeholder='state' required />
        </div>
        <div className='multi-fields'>
          <input type='text' name='zipcode' value={data.zipcode} onChange={changeHandler} placeholder='Zip code' required />
          <input type='text' name='country' value={data.country} onChange={changeHandler} placeholder='Country' required />
        </div>
        <input type='text' name='phone' value={data.phone} onChange={changeHandler} placeholder='phone' required />


      </div>
      <div className='place-order-right'>
        <div className='cart-s'>
          <div className='cart-total'>
            <h2> Cart Totals</h2>
            <div>
              <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>₹{getTotalcartAmount()}</p>
              </div>
              <hr />

              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>₹{getTotalcartAmount() === 0 ? 0 : 20}</p>

              </div>
              <hr />

              <div className='cart-total-details'>
                <p style={{ fontWeight: "500", color: "black" }} >   Total</p>
                <p>₹{getTotalcartAmount() === 0 ? 0 : getTotalcartAmount() + 20}</p>

              </div>


            </div>
            <button type='submit' >PROCEED TO PAYMENT</button>

          </div>

        </div>

      </div>


    </form>

  )
}

export default PlaceOrder
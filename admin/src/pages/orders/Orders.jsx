import React, { useEffect, useState } from 'react'
import "./Orders.css"
import axios from "axios"
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Orders = ({url}) => {
 
 const [orders,setOrders]=useState([])
 
 const fetchData = async ()=>{


  const URL=`${url}/api/order/list`
  const response=await axios.get(URL)
  if (response.data.success) {
      setOrders(response.data.data)
      console.log(response.data.data);
  }else{
    toast.error("Error")
  }
 }

  const statusHandler=async (event,orderId)=>{
    
    const URL=`${url}/api/order/status`
    const response=await axios.post(URL,{
      orderId,
      status:event.target.value
    })
    
    if (response.data.success) {
      await fetchData();
    }
    
  }

 useEffect(()=>{
  fetchData();
 },[])
 
 return (
  <div className='add-order'>
    <h3>Orders Page</h3>
    <div className='order-list'>
      {orders.map((order, index) => (
        <div key={index} className='order-item'>
          <img src={assets.parcel_icon} alt='' />
          <p className='order-item-food'>
            {order.items.map((item, idx) => (
              <span key={idx}>
                {item.name} {idx === order.items.length - 1 ? "x" : "X"} {item.quantity} {idx === order.items.length - 1 ? "" : ","}
              </span>
            ))}
          </p>
          <p className='order-item-name'>{order.address.firstName} {order.address.lastName}</p>
          <div className='order-item-address'>{order.address.street},</div>
          <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
          <p className='phone'>{order.address.phone}</p>
          <p>Items: {order.items.length}</p>
          <p>Rs: {order.amount}</p>

          <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} >
            <option value="Food Processing" >Food Processing</option>
            <option value="Out For Delivery" >Out For Delivery</option>
            <option value="Delivered " > Delivered </option>
           

          </select>
        </div>
      ))}
    </div>
  </div>
);

}

export default Orders
import React, { useState } from 'react'
import "./App.css"
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/home/Home'
import {Router,Routes,Route} from "react-router-dom"
import Cart from './Pages/cart/Cart'
import PlaceOrder from './Pages/placeOrder/PlaceOrder'
import Footer from './Components/footer/Footer'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import Verify from './Pages/Verify/Verify'
import Myorders from './Pages/home/Myorders/Myorders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [showLogin,setShowLogin]=useState(false)

  return (
<>
{showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
<div className='app' >
<ToastContainer/>

<Navbar setShowLogin={setShowLogin} />

<Routes>
    <Route  path='/' element={<Home/>} />
<Route path='/cart' element={<Cart/>} />
<Route path='/order' element={<PlaceOrder/>} />
<Route path='/verify' element={<Verify/>} />
<Route path='/myorders' element={<Myorders/>} />
</Routes>
    </div>
<Footer/>  

</>

)
}

export default App
import React, { useContext, useState } from 'react'
import "./Navbar.css"
import {assets} from "../../asset/assets"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu]=useState("home")
    const {getTotalcartAmount,token,setToken}=useContext(StoreContext)

const Navigate=useNavigate()

    const logout=()=>{
    localStorage.removeItem("token")
    setToken("")
Navigate("/")
    }
    

  return (
    <div className="navbar">

<Link to="/" > <img src={assets.logo} alt=""  className='logo' />
</Link>   
        <ul className="navbar-menu">
   <Link to="/"><li onClick={()=>setMenu("home")}  className={menu==="home"?"active":""}  >home</li> </Link> 
    <a href='#explore-menu' onClick={()=>setMenu("menu")}  className={menu==="menu"?"active":""} >menu</a>
    <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""} >mobile-app</a>
    <a href='#footer' onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""} > contact us</a>
        </ul>

        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
      
        <div className="navbar-search-icon">
           
         <Link to="/cart"><img src={assets.basket_icon} alt="" />
</Link>   
            <div className={getTotalcartAmount()===0?"":"dot"}></div>
        </div>

    {!token?<button onClick={()=>setShowLogin(true)} >sign in</button>
:<div className='nav-profile'>
    <img src={assets.profile_icon} alt=''/>
    <ul className='nav-profile-dropdown'>
        <li onClick={()=>Navigate("/myorders")} > <img src={assets.bag_icon} alt=''/>  <p>Orders</p> </li>
        <hr/>
        <li onClick={logout}> <img src={assets.logout_icon} alt=''/>  <p>Logout</p> </li>
    </ul>
</div>}

        </div>

    </div>
  )
}

export default Navbar
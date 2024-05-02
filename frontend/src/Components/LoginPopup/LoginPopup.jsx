import React, { useContext, useEffect, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../asset/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { toast } from 'react-toastify'


const LoginPopup = ({ setShowLogin }) => {

const {url,setToken}=useContext(StoreContext)
    const [currState, setCurrState] = useState("Login")

    // making contolled inputs using state variables

    const [data,setData]=useState({
        name:"",
        email:"",
        password:"",
    })

    const changeHandler = (event)=>{
        const name=event.target.name
        const value=event.target.value

        setData(data=>({...data,[name]:value}))
    }

    const onLogin= async (event)=>{
        event.preventDefault()
   
        let newUrl=url

        if (currState==="Login") {
              newUrl += "/api/user/login"   
        }
        else{
            newUrl += "/api/user/register"
        }

        const response=await axios.post(newUrl,data)

        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token)
        
            setShowLogin(false)
        }else{
            toast.error(response.data.message)
        }
    }

    return (
        <div className='login-popup'>

            <form className='login-popup-container' onSubmit={onLogin} >

                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
                </div>
                <div className='login-popup-inputs'>
                    {currState === "Sign Up" ? <input type='text' name='name'  onChange={changeHandler} value={data.name} placeholder=' Your Name' required /> : <></>
                    }

                    <input type='email' name='email'  onChange={changeHandler} value={data.email} placeholder=' Your Email' required />
                    <input type='password' name='password'  onChange={changeHandler} value={data.password} placeholder='password' required />

                </div>

                <button type='submit'>{currState === "Sign Up" ? "create account" : "Login"}</button>
                <div className='login-popup-condition'>
                    <input type='checkbox' required />
                    <p>By continueing,i agree to the terms of use & Privacy policy</p>
                </div>
                {currState==="Sign Up"?   <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Click here</span></p>
:               <p>create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
 }
 
            </form>

        </div>
    )
}

export default LoginPopup
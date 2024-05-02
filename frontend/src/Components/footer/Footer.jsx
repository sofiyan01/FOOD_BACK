import React from 'react'
import "./Footer.css"
import { assets } from '../../asset/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>

        <div className='footer-content'>

        <div className='footer-content-left'>
            <img src={assets.logo} alt=''/>
            <p> lorem20Voluptate consectetur consequat reprehenderit nostrud irure consequat sit velit et anim.lorem20Voluptate consectetur consequat reprehenderit nostrud irure consequat sit velit et anim </p>
        <div className='footer-social-icon'>
            <img src={assets.facebook_icon} alt='' />
            <img src={assets.linkedin_icon} alt='' />
            <img src={assets.twitter_icon} alt='' />

        </div>
        </div>

        <div className='footer-content-center'>
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Plicy</li>

            </ul>

        </div>
        <div className='footer-content-right'>
    <h2>GET IN TOUCH</h2>
    <ul>
        <li>+91 9325870089</li>
        <li>contact@tomato.com</li>

    </ul>

        </div>
            
        </div>

<hr/>
<p className='copyright'>copyright 2024 © Tomato.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
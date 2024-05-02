import React from 'react'
import "./AppD.css"
import { assets } from '../../asset/assets'

const AppD = () => {
  return (
    <div className='app-download' id='app-download'>
<p>For Better Experience download <br/> Tomato App </p>

    <div className='app-download-platform'>
        <img src={assets.play_store} alt=''/>
        <img src={assets.app_store} alt=''/>

    </div>

    </div>
  )
}

export default AppD
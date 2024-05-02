import React from 'react'
import  "./ExploreMenu.css"
import { menu_list } from '../../asset/assets'

const ExploreMenu = ({category,setCategory}) => {
  console.log(category);
  return (
    <div className='explore-menu' id='explore-menu' >

<h1>Explore our Menu</h1>
<p className='explore-menu-text'>choose from a diverse menu featuring a delectible array of dishes. Our mission is to satisfy your cravings and elevet your dining experience,one delicious meal at a time </p>
    
    <div className='explore-menu-list'>

    {menu_list.map((item,index)=>{
      return(
        <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='menu-item-list'>
        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=''/>
        <p>{item.menu_name}</p>

        </div>
        
      )
    })}



    </div>
    
<hr />
    </div>

  )
}

export default ExploreMenu
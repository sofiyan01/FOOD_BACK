import React, { useState } from 'react'
import "./Home.css"
import Header from '../../Components/header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Components/foodDisplay/FoodDisplay'
import AppD from '../../Components/AddDownload/AppD'

const Home = () => {
  
  const [category,setCategory]=useState("All")

  return (
    <div>

        <Header/>
        <ExploreMenu  category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
        <AppD/>
    </div>
  )
}

export default Home
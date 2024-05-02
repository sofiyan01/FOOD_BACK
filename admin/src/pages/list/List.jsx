import React, { useEffect, useState } from 'react';
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  // const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeFood= async(foodId) => {

    const response=await axios.post(`${url}/api/food/remove`,{id:foodId})
  await fetchData();

  if (response.data.success) {
      toast.success(response.data.message);
  }
  else{
    toast.error("Error");
  }
}

  return (
    <div className='list-add flex-col'>
      <p>All foods list</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt='' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={()=>removeFood(item._id)} className='cross'>X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

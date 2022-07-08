import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

function ProductList() {
  const[products,setProducts]=useState([]);

  useEffect(()=>{
    getItems();
    
  },[]);
  const getItems=async()=>{
    let result=await fetch('http://localhost:5000/products',{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
 result=await result.json();
 setProducts(result);

  }
  const deleteProduct=async(id)=>{
console.log(id);

    let result=await fetch(`http://localhost:5000/product/${id}`,{
      method:'Delete',
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result=await result.json();
   if(result){
    getItems();
   }
    
  }
  const searchHandle=async(e)=>{
    let key=e.target.value;
    if(key){
      let result=await fetch(`http://localhost:5000/search/${key}`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
       result=await result.json();
       if(result){
        setProducts(result);
       }
    }
    else{
      getItems();
    }
  
  }
    
  return (
    <div className='product_list'>
    <h1>product List</h1>
    <input className='search_product' type="text" onChange={searchHandle} placeholder="Search Product"></input>

    <ul>
      <li>Sr.No</li>
      <li>Name</li>
      <li>Price</li>
      <li>Category</li>
      <li>Company</li>
      <li>Operation</li>
      
    </ul>

   {
    products.length>0 ?
     products.map((item,index)=>
       <ul key={item._id}>
       <li>{index+1}</li>
      <li>{item.name}</li>
      <li>{item.price}</li>
      <li>{item.category}</li>
      <li>{item.company}</li>

     { <li>
      <button onClick={()=>deleteProduct(item._id)}>Delete</button><Link to={`/update/${item._id}`}>Update</Link> 
      </li>
     }
     

       </ul>
     )
      :<h1 style={{color:"red"}}>Invalid Data</h1>
     
   }

    </div>
  )
}

export default ProductList;
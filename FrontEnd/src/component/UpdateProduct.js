import React,{ useEffect, useState} from 'react';
import {useParams,useNavigate} from 'react-router-dom';   //this hook gives parameter in api (like id,params) directly


function UpdateProduct() {
const[name,setName]=useState('');
const[price,setPrice]=useState('');
const[category,setCategory]=useState('');
const[company,setCompany]=useState('');
const params=useParams();
const navigate=useNavigate();

useEffect(()=>{
 getProductDetails();
},[]);

const getProductDetails=async()=>{
    let result=await fetch(`http://localhost:5000/product/${params.id}`,{
      headers:{
        'Content-type':'application/json',
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

    }
    });
    result=await result.json();
    console.log(params);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
}
const Update=async()=>{
let result=await fetch(`http://localhost:5000/product/${params.id}`,{
    method:'put',
    body:JSON.stringify({name,price,category,company}),
    headers:{
        'Content-type':'application/json',
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

    }
});
result=await result.json();
navigate('/')
console.log(result);

}


  return (
    <div className='product'>
    <h1>Update Product</h1>
    <input className='inputBox' type="text" placeholder='Enter Product name' value={name} onChange={(e)=>{setName(e.target.value)}} />

    <input  className='inputBox inputBox1' type="text" placeholder='Enter Price' value={price} onChange={(e)=>{setPrice(e.target.value)}} />

    <input className='inputBox' type="text" placeholder='Enter Category name' value={category} onChange={(e)=>{setCategory(e.target.value)}} />

    <input className='inputBox' type="text" placeholder='Enter Company name' value={company} onChange={(e)=>{setCompany(e.target.value)}} />

<button className='btn' type='button' onClick={Update}>Update Product</button>
    </div>
  )
}

export default UpdateProduct;
import React,{ useState} from 'react';


function AddProduct() {
const[name,setName]=useState('');
const[price,setPrice]=useState('');
const[category,setCategory]=useState('');
const[company,setCompany]=useState('');
const [error,setError]=useState(false);

const addProduct=async()=>{
   
    if(!name || !price || !category ||!company){
        setError(true);
        return false;
    }

    let userId=JSON.parse(localStorage.getItem('user'))._id;
    console.log(name,price,category,company);
    let result=await fetch('http://localhost:5000/add-product',{
        method:'post',
        body:JSON.stringify({name,price,category,company,userId}),
        headers:{
            'Content-Type':'application/json',
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

        }
    });
    result=await result.json();

    console.log(result);
}


  return (
    <div className='product'>
    <h1>add Product</h1>
    <input className='inputBox' type="text" placeholder='Enter Product name' value={name} onChange={(e)=>{setName(e.target.value)}} />
{error && !name && <span className='invalid-input'>Enter valid name</span>}

    <input  className='inputBox inputBox1' type="text" placeholder='Enter Price' value={price} onChange={(e)=>{setPrice(e.target.value)}} />
    {error && !price && <span className='invalid-input'>Enter price</span>}

    <input className='inputBox' type="text" placeholder='Enter Category name' value={category} onChange={(e)=>{setCategory(e.target.value)}} />
    {error && !category && <span className='invalid-input'>Enter category name</span>}

    <input className='inputBox' type="text" placeholder='Enter Company name' value={company} onChange={(e)=>{setCompany(e.target.value)}} />
    {error && !company && <span className='invalid-input'>Enter company name</span>}<br/>

<button className='btn' type='button' onClick={addProduct}>Add Product</button>
    </div>
  )
}

export default AddProduct;
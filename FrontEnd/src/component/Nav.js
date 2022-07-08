import React from "react";
import { Link,useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem('user');
      const navigate=useNavigate();

      
    const logout=()=>{
        localStorage.clear();
        navigate('/signup');

    }

    return (
        <div className="nav">
          <img className="img" alt="logo" src='https://www.digitalguider.com/wp-content/uploads/2020/07/ecommerce-1.png' />
            {
                auth ?
                <ul className="menu">
                <li><Link to='/'>Product</Link></li>
                <li><Link to='/add'>Add Product</Link></li>
                <li><Link to='/update/id'>Update Product</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name})</Link></li> 
                </ul>

                :
                <ul className="menu menu1">

                <li><Link to='/signup'>Sign up</Link></li>
                        <li><Link to='/login'>Login</Link></li>
              
                        </ul>
                }

         
        </div>
    )
}

export default Nav;
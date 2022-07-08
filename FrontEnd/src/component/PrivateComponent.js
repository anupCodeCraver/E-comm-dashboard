import React from "react";
import {Navigate,Outlet} from 'react-router-dom';  /* this hooks are used for check user are logged in or not */

/*Outlet-it shows all routes(product,update,profile) if user is logged-in otherwise Navigate-it show or navigate only signup page */
const PrivateComponent=()=>{
    const auth=localStorage.getItem('user');
    return auth ?<Outlet />  :  <Navigate to='signup' />
}


export default PrivateComponent;
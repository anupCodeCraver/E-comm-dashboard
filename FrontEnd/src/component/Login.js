import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');   
        }

    },[])

    const Login = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if(result.auth){
           localStorage.setItem('user',JSON.stringify(result.user));
           localStorage.setItem('token',JSON.stringify(result.auth));

           navigate('/');   
        }
        else{
         alert("user not found");
        }
    }

    return (
        <div className='login'>
            <h2>Login</h2>
            <input className="inputBox" type='text' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="inputBox" type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={Login} className='btn' type='button'>Login</button>

        </div>
    )
}

export default Login;
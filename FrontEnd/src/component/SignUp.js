import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";/*this hook is use for redirect to another page */

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    },[]);

    const getData = async () => {
        console.log(name, email, password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result);
        /* in cosole application tab local storage is their it is useful for checking user is logged in or not.('user'-key,result   ) */
        localStorage.setItem('user', JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.auth));

        //navigate('/') - Redirect to home
        navigate('/');
    }

    return (
        <div className="register">
            <h2>Register Page</h2>
            <input className="inputBox" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></input>
            <input className="inputBox" type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input className="inputBox" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={getData} className="btn" type="button">Sign Up</button>
        </div>
    )
}

export default SignUp;
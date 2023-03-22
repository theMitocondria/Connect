import React, { useState } from 'react';
import "./login.css"
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {loginUser} from "../../Actions/user";

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    
    function loginHandler(e){
        e.preventDefault();

        dispatch(loginUser(email,password))
    };

  return (
    <div className='login'>
        <form className='loginForm' onSubmit={loginHandler}> 
            <Typography variant='h3' style={{padding:"2vmax"}}>Connect</Typography>
            <input 
            type="email" 
            placeholder='email' 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            required/>
            <input 
            type="password"  
            placeholder='password' 
            value={password}
            onChange={(e)=>setPassword(e.target.value)} 
            required/>
            <Link to="/forgot/password">
                <Typography>Forgot Pasword</Typography>
            </Link>
            <Link to="/register">
                <Typography>New User? Register</Typography>
            </Link>
            <Button type="submit">Login</Button>
        </form>
    </div>
  )
}

export default Login
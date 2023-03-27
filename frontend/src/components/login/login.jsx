import React, { useEffect, useState } from 'react';
import "./login.css"
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../Actions/user";
import { useAlert } from 'react-alert';
const Login = () => {
    const {error}=useSelector((state)=>state.user);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const alert=useAlert();
    
    const loginHandler=async (e)=>{
        e.preventDefault();

        await dispatch(loginUser(email,password))
    };

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch({type:"clearErrors"})
        }
    },[error,dispatch])

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
import React, { useEffect } from 'react'
import "./register.css";
import { useState } from 'react';
import {Typography,Button,Avatar} from "@mui/material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { RegisterUser } from '../../Actions/user';
import {useAlert} from "react-alert";
const Register = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [avatar,setAvatar]=useState("");
    const [password,setPassword]=useState("");
    const {loading,error}=useSelector(
      (state)=>state.user
    );
    const alert=useAlert();
    const dispatch=useDispatch();

    const submitHandler=(e)=>{
      e.preventDefault();
      console.log(name,email,password,avatar);
      dispatch(RegisterUser(name,email,password,avatar))
    }

    const submitImageHandler=(e)=>{
      const file=e.target.files[0];
      const Reader=new FileReader();
      Reader.readAsDataURL(file);
      Reader.onload=()=>{
          if(Reader.readyState===2){
              setAvatar(Reader.result);
          }
        }
    }

    useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch({type:"clearErrrors"})
      }
    })
  
  return (
    <div className='register'>
         <form className='registerForm' onSubmit={submitHandler}> 
            <Typography variant='h3' style={{padding:"2vmax"}}>Connect</Typography>
            <Avatar src={avatar} alt="user" sx={{height:"10vmax", width:"10vmax"}} />
            <input
            type="file"
            accept="image/*"
            onChange={submitImageHandler}
             />
            <input 
            type="text" 
            placeholder='Name' 
            value={name} 
            className="registerInputs"
            onChange={(e)=>setName(e.target.value)
            
          } 
            />
            <input 
            type="email" 
            placeholder='email' 
            value={email} 
            className="registerInputs"
            onChange={(e)=>setEmail(e.target.value)} 
            required/>
            <input 
            type="password"  
            placeholder='password' 
            value={password}
            className="registerInputs"
            onChange={(e)=>setPassword(e.target.value)} 
            required/>
             <Link to="/" >
                <Typography>Already Signed Up ? Login</Typography>
            </Link>
            <Button type="submit">Sign Up</Button>
        </form>
    </div>
  )
}

export default Register
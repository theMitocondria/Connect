import React, { useEffect } from 'react'
import "./Reset.css";
import {useState} from "react";
import {Button ,Typography} from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import { ResetPassword } from '../../Actions/user';
import { useAlert } from 'react-alert';
const Reset = () => {
    const [email,setEmail]=useState("");
    const dispatch=useDispatch();
    const {error,loading,message}=useSelector((state)=>state.like);
    const alert=useAlert();

    const SubmitHandler=(e)=>{
        e.preventDefault();
        dispatch(ResetPassword(email));
    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch({type:"clearErrors"});
        }
        if(message){
            alert.success(message);
            dispatch({type:"clearMessage"})
        }
    },[dispatch,error,alert,message])
  return (
    <div className='reset'>
        <form className='resetForm' onSubmit={SubmitHandler}> 
            <Typography variant='h3' style={{padding:"2vmax"}}>Connect</Typography>
            <input 
            type="email" 
            placeholder='email' 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            required/>
            <Button disabled={loading} type="submit">Send Mail</Button>
        </form>
    </div>
  )
}

export default Reset
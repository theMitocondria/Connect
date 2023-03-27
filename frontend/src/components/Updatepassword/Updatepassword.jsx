import React, { useState,useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import "./up.css";
import { UpdatePasswordUser } from '../../Actions/user';
import { useAlert } from 'react-alert';
const Updatepassword = () => {
    const alert=useAlert();
    const {error,loading,message}=useSelector((state)=>state.like);
    const [oldPassword,setoldPassword]=useState("");
    const [newPassword,setnewpassword]=useState("");
    const dispatch=useDispatch();
    
    function submitHandler(e){
        e.preventDefault();
        dispatch(UpdatePasswordUser(oldPassword,newPassword));
    };

    useEffect(()=>{
        if(error){
          alert.error(error);
          dispatch({type:"clearErrrors"})
        }
        if(message){
          alert.success(message);
          dispatch({type:"clearMessage"})
        }
      },[dispatch,error,alert,message]);

  return (
    <div className='updatePassword'>
        <form className='updatePasswordForm' onSubmit={submitHandler}> 
            <Typography variant='h3' style={{padding:"2vmax"}}>Connect</Typography>

            <input 
            type="password"  
            placeholder='old password' 
            value={oldPassword}
            className="updatePasswordFormInputs"
            onChange={(e)=>setoldPassword(e.target.value)} 
            required/>
            
            <input 
            type="password"  
            placeholder='new password' 
            value={newPassword}
            className="updatePasswordFormInputs"
            onChange={(e)=>setnewpassword(e.target.value)} 
            required/>

            <Button disabled={loading} type="submit">Change Password</Button>
        </form>
    </div>
  )
}


export default Updatepassword
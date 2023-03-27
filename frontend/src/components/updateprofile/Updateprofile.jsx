import React, { useEffect } from 'react'
import "./updateprofile.css";
import { useState } from 'react';
import {Typography,Button,Avatar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {loadUser, UpdateProfileUser } from '../../Actions/user';
import {useAlert} from "react-alert";

const Updateprofile = () => {
    const {error,user}=useSelector(
        (state)=>state.user
      );
    const {error:updateError,message:updateMessage,loading:updateLoading}=useSelector(
        (state)=>state.like
      );
    const [name,setName]=useState(user.name);
    const [email,setEmail]=useState(user.email);
    const [avatarprev,setAvatarprev]=useState(user.avatar.url);
    
    const alert=useAlert();
    const dispatch=useDispatch();

    const submitHandler=(e)=>{
      e.preventDefault();
      console.log(name,email,avatarprev);
      dispatch(UpdateProfileUser(name,email,avatarprev));
      dispatch(loadUser());
    }

    const submitImageHandler=(e)=>{
      const file=e.target.files[0];
      const Reader=new FileReader();
      Reader.readAsDataURL(file);
      Reader.onload=()=>{
          if(Reader.readyState===2){
              setAvatarprev(Reader.result);
          }
        }
    }

    useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch({type:"clearErrrors"})
      }
      if(updateError){
        alert.error(error);
        dispatch({type:"clearErrrors"})
      }
      if(updateMessage){
        alert.success(updateMessage);
        dispatch({type:"clearMessage"})
      }
    })
  
  return (
    <div className='updateProfile'>
         <form className='updateProfileForm' onSubmit={submitHandler}> 
            <Typography variant='h3' style={{padding:"2vmax"}} >Connect</Typography>
            <Avatar className="ava"src={avatarprev} alt="user" sx={{height:"10vmax", width:"10vmax"}  }  />
            
            <input
            type="file"
            accept="image/*"
            onChange={submitImageHandler}
             />
            <input 
            type="text" 
            placeholder='Name' 
            value={name} 
            className="updateProfileFormInputs"
            onChange={(e)=>setName(e.target.value)
            
          } 
            />
            <input 
            type="email" 
            placeholder='email' 
            value={email} 
            className="updateProfileFormInputs"
            onChange={(e)=>setEmail(e.target.value)} 
            required/>
           
             
            <Button disabled={updateLoading}type="submit">Update</Button>
        </form>
    </div>
  )
}

export default Updateprofile;
import { Typography } from '@mui/material'
import React, { useState } from 'react'
import "./Newpost.css";
import {Button} from "@mui/material";
import {useDispatch} from "react-redux"
import { NewPostUpload } from '../../Actions/post';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {useAlert} from "react-alert";
import {loadUser} from "../../Actions/user"
const Newpost = () => {
    const [image,setImage]=useState(null);
    const [caption,setCaption]=useState("");
    const{loading,error,message}=useSelector((state)=>state.like);
    const dispatch =useDispatch();
    const alert=useAlert();

    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        const Reader=new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload=()=>{
            if(Reader.readyState===2){
                setImage(Reader.result);
            }
        }
        
    }
    const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(NewPostUpload(caption,image));
      dispatch(loadUser());
    }

    useEffect(() => {
     if(error){
      alert.error(error);
      dispatch({type:"clearErrors"})
     }
     if(message){
      alert.success(message);
      dispatch({type:"clearMessage"})
     }
    }, [dispatch,error,message,alert])
    
  return (
    <div className='newPost'>
        <form className='newPostForm' onSubmit={submitHandler}>
            <Typography variant='h3'>New Post</Typography>
            {image  &&  <img src={image} alt="post"/>}
            <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            />
            <input
            type="text"
            placeholder='Caption ..'
            value={caption}
            onChange={(e)=>setCaption(e.target.value)}
            />
            <Button disabled={loading} type="submit">
            Post
            </Button>
        </form>
    </div>
  )
}

export default Newpost
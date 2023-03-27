import React from 'react'
import "./account.css";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';
import { GetMyPosts } from '../../Actions/post';
import Loader from "../Loader/Loader"
import { Avatar, Button, Typography } from '@mui/material';
import Post from '../Post/Post';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { DeleteProfileUser, LogoutUser } from '../../Actions/user';
const Account = () => {
  
const dispatch =useDispatch();
const {loading,error,message:posts}=useSelector((state)=>state.myPosts);
const {message,error:LikeError}=useSelector((state)=>state.like);
const alert=useAlert();
const {user}=useSelector((state)=>state.user);

const [followingtoggle,setfollwingtoggle]=useState(false);
const [followertoggle,setfollwertoggle]=useState(false);

const LogoutHandler=async ()=>{
  dispatch(LogoutUser());
  alert.success("Logged Out Successfully")
}

const DeleteProfileHandler=async ()=>{
  await dispatch(DeleteProfileUser());
  dispatch(LogoutUser());
}
useEffect(()=>{
  dispatch(GetMyPosts());
},[dispatch]);

useEffect(()=>{
  if(error){
    alert.error(error);
    dispatch({type:"clearErrors"})
  }
  if(LikeError){
    alert.error(LikeError);
    dispatch({type:"clearErrors"})
  }
  if(message){
    alert.success(message);
    dispatch({type:"clearMessage"});
  }
},[error,LikeError,message,dispatch]);

  return (
    loading?(
      <Loader />
    ):(
      <div className='account'>
        <div className="accountleft">
            {
                posts && posts.length>0  ? (
                  posts.map((post)=>(
                    <Post
                    key={post._id}
                    postid={post._id}
                    caption={post.caption}
                    postImage={post.image.url}
                    likes={post.likes}
                    comments={post.comments}
                    ownerImage={post.owner.avatar.url}
                    ownerName={post.owner.name}
                    ownerId={post.owner._id}
                    isAccount={true}
                    isDelete={true}
                    />
                  ))
                ):<Typography variant='h4'>No Posts Uploaded Yet</Typography>
            }
        </div>
        <div className="accountright">
        <Avatar 
          src={user.avatar.url}
          sx={{height:"8vmax" , width:"8vmax" }}
          />

          <Typography variant='h6'>{user.name}</Typography>

          <div>
            <button onClick={()=>setfollwertoggle(!followertoggle)}>
              <Typography>Followers</Typography>
            </button>
            <Typography>{user.followers.length}</Typography>
          </div>

          <div>
            <button>
              <Typography onClick={()=>setfollwingtoggle(!followingtoggle)}>Following</Typography>
            </button>
            <Typography>{user.following.length}</Typography>
          </div>

          <div>
              <Typography >Posts</Typography>
            <Typography>{user.posts.length}</Typography>
          </div>
          
          <Button variant="contained" onClick={LogoutHandler}>Logout</Button>
          <Link to="/update/profile/">Edit Profile</Link>
          <Link to="/update/password">Update password</Link>


          <Button 
          variant='text'
          style={{color:"red", margin:"2vmax"}}
          onClick={DeleteProfileHandler}
          >Delete your Account</Button> 
          
          {/* <Dialog open={followertoggle} onClose={()=>setfollwertoggle(!followertoggle)}>
            <div className="DialogBox">
              {
               user.followers &&  user.followers.length>0 ?(
                user.followers.map((like)=>(
                  <User 
                key={like._id}
                userId={like._id} 
                name={like.name}

                />
                ))
               ):<Typography>NO follower</Typography>
              }
            </div>
          </Dialog>

          <Dialog open={followingtoggle} onClose={()=>setfollwingtoggle(!followingtoggle)}>
            <div className="DialogBox">
              <Typography variant='h4'>Following</Typography>
              {
                user.following  &&  user.following.length>0 ?(
                  user.following.map((like)=>(
                    <User 
                  key={like._id}
                  userId={like._id} 
                  name={like.name}
                  avatar={like.avatar.url}
                  />
                  ))
                ):<Typography>No following</Typography>
              }
            </div>
          </Dialog> */}
        </div>
    </div>
    )
  )
}

export default Account
import React from 'react'
 
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';
import { GetMyPosts, GetUserPosts, GetUserProfile } from '../../Actions/post';
import Loader from "../Loader/Loader"
import { Avatar, Button, Typography } from '@mui/material';
import Post from '../Post/Post';
import { useAlert } from 'react-alert';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { loadUser } from '../../Actions/user';
 
const UserProfile = () => {
 
const dispatch =useDispatch();
const {error,message:posts}=useSelector((state)=>state.UserPost);
const {message,error:LikeError}=useSelector((state)=>state.like);
const alert=useAlert();
const {UserProfile:user,loading}= useSelector((state)=>{console.log(state);return state.UserProfile});
console.log(user);
const [followingtoggle,setfollwingtoggle]=useState(false);
const [followertoggle,setfollwertoggle]=useState(false);
const [following,setfollowing]=useState(false);
const [myProfile,setmyProfile]=useState(false);
const params=useParams();
const {user:user1}=useSelector((state)=>state.user);
const followhandler=()=>{
    setfollowing(!following);
}
useEffect(()=>{
   dispatch(GetUserProfile(params.id));
   dispatch(GetUserPosts(params.id));
  if(user1._id===params.id){
    setmyProfile(true);
  }else{
    setmyProfile(false);
  }
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
                ):<Typography variant='h4'>User has not made any  Posts Uploaded Yet</Typography>
            }
        </div>
        <div className="accountright">
          <Avatar 
          src={user?user.avatar?.url:""}
          sx={{height:"8vmax" , width:"8vmax" }}
          />
 
          <Typography variant='h6'>{user?user.name:""}</Typography>
 
          <div>
            <button onClick={()=>setfollwertoggle(!followertoggle)}>
              <Typography>Followers</Typography>
            </button>
            <Typography>{user?user.followers?.length:""}</Typography>
          </div>
 
          <div>
            <button>
              <Typography onClick={()=>setfollwingtoggle(!followingtoggle)}>Following</Typography>
            </button>
            <Typography>{user?user.following?.length:""}</Typography>
          </div>
 
          <div>
              <Typography >Posts</Typography>
            <Typography>{user?user.posts?.length:""}</Typography>
          </div>
 
          {
            myProfile?(null):(<Button variant="contained" onClick={followhandler} style={{background:following?"red":"blue"}}>{following?"Unfollow":"Follow"}</Button>)
          } 
 
 
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
                  
                ):<Typography>No following</Typography>
              }
            </div>
            </Dialog>*/}
           </div> 
    </div>
    )
  )
}
 
export default UserProfile
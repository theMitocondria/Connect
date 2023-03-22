import { Avatar, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import "./Post.css";
import { Link } from 'react-router-dom';
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
  Delete
} from "@mui/icons-material"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LikePost } from '../../Actions/post';
import { useAlert } from 'react-alert';

const Post = ({
    postid,
    caption,
    postImage,
    likes=[],
    comments=[],
    ownerImage,
    ownerName,
    ownerId,
    isDelete=false,
    isAccount=false,
}) => {

  const [liked,setLiked]=useState(true);
  
  const dispatch=useDispatch();
  const alert=useAlert();

  const likedHandle=()=>{
    setLiked(!liked);
    
    dispatch(LikePost(postid));
    
  }

  useEffect
  return (
    <div className='post'>
        <div className="postHeader">
           {
            isAccount?<MoreVert/>:null
           }
        </div>
        <img src={postImage} alt="postimage"/>
        <div className="postDetails">
            <Avatar src={ownerImage} alt="user" sx={{
              height:"3vmax",
              width:"3vmax"
              }}/>
            <Link to={`/user/${ownerId}`}>
              <Typography fontWeight={700}>{ownerName}</Typography>
            </Link>
            <Typography fontWeight={100} color="rgba(0,0,0,0.582)" style={{alignSelf:"center"}}>{caption}</Typography>
        </div>
        <button 
            style={{
              border:"none",
              backgroundColor:"white",
              cursor:"pointer",
              mzargin:"1vmax 2vmax"
            }}
          >
            <Typography>5 Likes</Typography>
          </button>
          <div className="postFooter">
            <Button onClick={likedHandle}>
              {
                liked?<Favorite style={{color:"red"}}/>:<FavoriteBorder/>
              }
            </Button>
            <Button>
              <ChatBubbleOutline/>
            </Button>
           {
            isDelete?(
              <Button>
              <Delete/>
            </Button>
            ):null
           }
          </div>
    </div>
  )
}

export default Post
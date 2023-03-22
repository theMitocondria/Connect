import React, { useEffect } from 'react'
import "./Home.css";
import User from "../User/User";
import Post from '../Post/Post';
import { Typography } from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import { GetAllUser, getFollowingPosts } from '../../Actions/user';
import Loader from '../Loader/Loader';

const Home = () => {
  const dispatch=useDispatch();
  
  const {loading,posts,error} =useSelector(
    (state)=>state.PostOfFollowing
  )

  const posts1=useSelector((state)=>state.GetAllUser.posts);

  console.log(posts1);
  useEffect(()=>{
    dispatch(getFollowingPosts());
    dispatch(GetAllUser());
  },[dispatch])

  return (
      loading?<Loader />:(
        <div className='home'>
        <div className='homeleft'>
          {
            posts && posts.length>0 ?( posts.map((post)=>(
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
          />
            ))):<Typography variant='h5'>No posts yet</Typography>
          }
        </div>
        <div className='homeright'>
             {
             
                 posts1 &&  posts1.length>0 ?  posts1.map((user)=>(
                  <User 
                      key={user._id}
                      userId={user._id}
                      name={user.name}
                      avatar={user.avatar.url}
             />
                 )):<Typography variant='h5'>No users yet</Typography>
             }
         </div>
    </div>
    )
  )
}

export default Home
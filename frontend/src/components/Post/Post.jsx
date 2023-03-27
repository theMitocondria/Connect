import { Avatar, Button, Typography ,Dialog} from '@mui/material'
import User from "../User/User"
import "./Post.css";
import { Link } from 'react-router-dom';
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  Delete
} from "@mui/icons-material"
import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { addComment, DeletePost, GetMyPosts, LikePost,UpdatePost } from '../../Actions/post';
import { useEffect } from 'react';
import { getFollowingPosts, loadUser } from '../../Actions/user';
import CommentCard from '../CommentCard/CommentCard';
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

  const [liked,setLiked]=useState(false);
  const [likesUser,setLikesUser]=useState(false);
  const [CommentValue,setCommentValue]=useState("");
  const [CommentToggle,setCommentToggle]=useState(false);
  const [CaptionValue,setCaptionValue]=useState("");
  const [CaptionToggle,setCaptionToggle]=useState(false);
  const {user}=useSelector(state=>state.user);
  
  const dispatch=useDispatch();
  
  const likedHandle=async ()=>{
    setLiked(!liked);
    
    await dispatch(LikePost(postid));
    
    if(isAccount){
      dispatch(GetMyPosts())
    }else{
      dispatch(getFollowingPosts());
    }
    
  }

  const CommentHandle=(e)=>{
    e.preventDefault();
    console.log("Hello ")
    dispatch(addComment(postid,CommentValue));
  }
  
  const updateCaption=(e)=>{
    e.preventDefault();
    dispatch(UpdatePost(CaptionValue,postid));
    dispatch(GetMyPosts())
  }

  const DeletePostHandler=async ()=>{
    await dispatch(DeletePost(postid));
    dispatch(GetMyPosts());
    dispatch(loadUser());
  }
  useEffect(()=>{
    likes.forEach((like)=>{
      if(like._id===user._id){
        setLiked(true);
      }
    });
  
  },[])
  return (
    <div className='post'>
        <div className="postHeader">
           {
            isAccount?(
              <Button onClick={()=>setCaptionToggle(!CaptionToggle)}>
                <MoreVert/>
              </Button>
            ):null
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
            onClick={()=>setLikesUser(!likesUser)}
          >
            <Typography>{likes.length} Likes</Typography>
          </button>
          <div className="postFooter">
            <Button onClick={likedHandle}>
              {
                liked?<Favorite style={{color:"red"}}/>:<FavoriteBorder/>
              }
            </Button>
            <Button onClick={()=>{setCommentToggle(!CommentToggle)}}>
              <ChatBubbleOutline />
            </Button>
           {
            isDelete?(
              <Button onClick={DeletePostHandler}>
              <Delete/>
            </Button>
            ):null
           }
          </div>


      <Dialog open={CommentToggle} onClose={()=>setCommentToggle(!CommentToggle)}>
       <div className="DialogBox">
        <Typography variant='h4'>Comments</Typography>
        <form className="commentForm" onSubmit={CommentHandle}>
          <input
          type="text"
          value={CommentValue}
          onChange={(e)=>setCommentValue(e.target.value)}
          placeholder="Comment Here"
          required
          />

          <Button type="submit" variant="contained" >
           Add
          </Button>
        </form>
       </div>
       {
      comments.length>0?comments.map((item)=>(
        <CommentCard userId={item.user._id}
        name={item.user.name}
        avatar={item.user.avatar.url}
        comment={item.comment}
        commentId={item._id}
        postId />
      )):<Typography>No Comments yet</Typography>
    }
    </Dialog>


    <Dialog open={likesUser} onClose={()=>setLikesUser(!likesUser)}>
       <div className="DialogBox">
        <Typography variant='h4'>Liked by</Typography>
        {
          likes.map((like)=>(
            <User 
          key={like._id}
          userId={like._id} 
          name={like.name}
          avatar={like.avatar.url}
          />
          ))
        }
       </div>
    </Dialog>
    <Dialog open={CaptionToggle} onClose={()=>setCaptionToggle(!CaptionToggle)}>
       <div className="DialogBox">
       <Typography variant='h4'>Update Caption</Typography>
        <form className="commentForm" onSubmit={updateCaption}>
          <input
          type="text"
          value={CaptionValue}
          onChange={(e)=>setCaptionValue(e.target.value)}
          placeholder="Comment Here"
          required
          />

          <Button type="submit" variant="contained" >
           Update
          </Button>
        </form>
       </div>
    </Dialog>
    </div>
  )
}

export default Post
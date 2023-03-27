import React from 'react'
import "./CommentCard.css";
import {Link} from "react-router-dom";
import {Typography} from "@mui/material";

const CommentCard = ({
    userId,
    name,
    avatar,
    comment,
    commentId,
    postId
}) => {
  return (
    <div className='CommentUser'>
        <Link to={`/user/${userId}`}>
            <img src={avatar} alt={name}/>
            <Typography style={{minWidth:"6vmax"}}>
               {name}
            </Typography>
        </Link>
        <Typography>
               {comment}
        </Typography>
    </div>
  )
}

export default CommentCard
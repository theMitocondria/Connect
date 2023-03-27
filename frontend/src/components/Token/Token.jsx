// import React from 'react'
// import "./Token.css";
// import { useState } from 'react';
// import { Typography, Button } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { useAlert } from 'react-alert';
// import { TokenPassword } from '../../Actions/user';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// const Token = () => {
//     const [resetPassword,setresetPassword]=useState("");
//     const dispatch=useDispatch();
//     const alert=useAlert();
//     const params=useParams();
//     const {error,message}=useSelector((state)=>state.like);
    
//     const SubmitHandler=(e)=>{
//         e.preventDefault();
//        dispatch(TokenPassword(params.token,resetPassword));
//     }

//     useEffect(()=>{
//         if(error){
//             alert.error(error);
//             dispatch({type:"clearErrors"});
//         }
//         if(message){
//             alert.success(message);
//             dispatch({type:"clearMessage"})
//         }
//     },[dispatch,error,alert,message])

//   return (
//     <div className='token'>
//     <form className='tokenForm' onSubmit={SubmitHandler}> 
//         <Typography variant='h3' style={{padding:"2vmax"}}>
//             Connect
//         </Typography>

//         <input 
//         type="password" 
//         placeholder='password' 
//         value={resetPassword} 
//         onChange={(e)=>setresetPassword(e.target.value)} 
//         required/>
//         <Button  type="submit">Reset Password</Button>
//     </form>
// </div>
//   )
// }

// export default Token


import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../../Actions/user";
import "./Token.css";
const Token = () => {
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, newPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  return (
    <div className="token">
      <form className="tokenForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Connect
        </Typography>

        <input
          type="password"
          placeholder="New Password"
          required
          className="tokenInputs"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Link to="/">
          <Typography>Login</Typography>
        </Link>
        <Typography>Or</Typography>

        <Link to="/forgot/password">
          <Typography>Request Another Token!</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default Token;
import axios from "axios";


export const loginUser=(email,password)=>async (dispatch)=>{
    try {
        dispatch({
            type:"LoginRequest"
        })

        const {data}=await axios.post("/api/v1/login",
        {email,password},
        {
            headers:{
                "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
            },
        })

        dispatch({
            type:"LoginSuccess",
            payload:data.user,
        })
    } catch (error) {
        dispatch({
            type:"LoginFailure",
            payload:error.response.data.message
        })
    }
}




export const loadUser=()=>async (dispatch)=>{
    try {
        dispatch({
            type:"LoadUserRequest"
        })

        const {data}=await axios.get("/api/v1/me");

        dispatch({
            type:"LoadUserSuccess",
            payload:data.user,
        })
    } catch (error) {
        dispatch({
            type:"LoadUserFailure",
            payload:error.response.data.message
        })
    }
}


export const getFollowingPosts=()=>async (dispatch)=>{
    try {
        
        dispatch({
            type:"PostOfFollowingRequest"
        })

        const {data}= await axios.get("/api/v1/post");
        dispatch({
            type:"PostOfFollowingSuccess",
            payload:data.posts,
        })
    } catch (error) {
        dispatch({
            type:"PostOfFollowingFailure",
            payload:error.response.data.message
        })
    }
}

export const GetAllUser=()=>async (dispatch)=>{
    try {
        
        dispatch({
            type:"GetAllUserRequest"
        })

        const {data}= await axios.get("/api/v1/user");
        dispatch({
            type:"GetAllUserSuccess",
            payload:data.user,
        })
    } catch (error) {
        dispatch({
            type:"GetAllUserFailure",
            payload:error.response.data.message
        })
    }
}


export const LogoutUser=(email,password)=>async (dispatch)=>{
    try {
        dispatch({
            type:"LogoutRequest"
        })

        await axios.get("/api/v1/logout");
        dispatch({
            type:"LogoutSuccess",
        })
    } catch (error) {
        dispatch({
            type:"LogoutFailure",
            payload:error.response.data.message
        })
    }
}


export const RegisterUser=(name,email,password,avatar)=>async (dispatch)=>{
    try {
        dispatch({
            type:"RegisterRequest"
        })

        const {data}=await axios.post("/api/v1/register",
        {name,email,password,avatar},
        {
            headers:{
                "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
            },
        })

        dispatch({
            type:"RegisterSuccess",
            payload:data.user,
        })
    } catch (error) {
        dispatch({
            type:"RegisterFailure",
            payload:error.message.data.message
        })
    }
}


export const UpdateProfileUser=(name,email,password,avatar)=>async (dispatch)=>{
    try {
        dispatch({
            type:"UpdateProfileRequest"
        })

        const {data}=await axios.put("/api/v1/update/profile",
        {name,email,avatar},
        {
            headers:{
                "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
            },
        })

        dispatch({
            type:"UpdateProfileSuccess",
            payload:data.message,
        })
    } catch (error) {
        dispatch({
            type:"UpdateProfileFailure",
            payload:error.message.data.message
        })
    }
}


export const UpdatePasswordUser=(oldPassword,newPassword)=>async (dispatch)=>{
    try {
        dispatch({
            type:"UpdatePasswordRequest"
        })

        const {data}=await axios.put("/api/v1/update/password",
        {oldPassword,newPassword},
        {
            headers:{
                "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
            },
        })

        dispatch({
            type:"UpdatePasswordSuccess",
            payload:data.message,
        })
    } catch (error) {
        dispatch({
            type:"UpdatePasswordFailure",
            payload:error.response.data.message
        })
    }
}



export const DeleteProfileUser=()=>async (dispatch)=>{
    try {
        dispatch({
            type:"DeleteProfileRequest"
        })

        const {data}=await axios.delete("/api/v1/delete");
        dispatch({
            type:"DeleteProfileSuccess",
            payload:data.message,
        })
    } catch (error) {
        dispatch({
            type:"DeleteProfileFailure",
            payload:error.response.data.message
        })
    }
}

export const ResetPassword=(email)=>async (dispatch)=>{
    try {
        dispatch({
            type:"ForgotPasswordRequest"
        })

        const {data}=await axios.post("/api/v1/forgot/password",{
            email,
        },{
            headers:{
                "Content-Type":"application/json"
            },
        });
        dispatch({
            type:"ForgotPasswordSuccess",
            payload:data.message,
        })
    } catch (error) {
        dispatch({
            type:"ForgotPasswordFailure",
            payload:error.response.data.message
        })
    }
}


export const resetPassword = (token, password) => async (dispatch) => {
    try {
      dispatch({
        type: "resetPasswordRequest",
      });
  
      const { data } = await axios.put(
        `/api/v1/reset/password/${token}`,
        {
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({
        type: "resetPasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "resetPasswordFailure",
        payload: error.response.data.message,
      });
    }
  };
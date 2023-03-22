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
            payload:error.message.data.message
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
            payload:error.message.data.message
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
            payload:error.message.data.message
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
            payload:error.message.data.message
        })
    }
}
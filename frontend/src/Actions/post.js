import axios from "axios";


export const LikePost=(id)=>async (dispatch)=>{
    try {
        
        dispatch({
            type:"likeRequest"
        })

        const {data}= await axios.get(`/api/v1/post/${id}`);
        dispatch({
            type:"likeSuccess",
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:"likeFailure",
            payload:error.message.data.message
        })
    }
}



export const addComment=(id,comment)=>async (dispatch)=>{
    try {
        
        dispatch({
            type:"addCommentRequest"
        })

        const {data}= await axios.put(
            `/api/v1/post/comment/${id}`,
        {
            comment
        },
        {
            headers: {
                "Content-Type":"application/json",
            },
        })
        dispatch({
            type:"addCommentSuccess",
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:"addCommentFailure",
            payload:error.response.data.message
        })
    }
}

export const GetMyPosts=(id)=>async (dispatch)=>{
    try {
        
        dispatch({
            type:"myPostRequest"
        })

        const {data}= await axios.get("/api/v1/my/posts");
        dispatch({
            type:"myPostSuccess",
            payload:data.posts
        })
    } catch (error) {
        dispatch({
            type:"myPostFailure",
            payload:error.message.data.message
        })
    }
}

export const NewPostUpload=(caption,image)=>async (dispatch)=>{
    try {
        
        dispatch({
            type:"newPostRequest"
        })

        const {data}= await axios.post("/api/v1/post/upload",
        {
            caption,
            image,
        },{
            headers:{
                "Content-Type":"application/json"
            }
        });
        dispatch({
            type:"newPostSuccess",
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:"newPostFailure",
            payload:error.message.data.message
        })
    }
}


export const UpdatePost=(caption,id)=>async (dispatch)=>{
    try {
        
        dispatch({
            type:"UpdatePostRequest"
        })

        const {data}= await axios.put(`/api/v1/post/${id}`,
        {
            caption,
        },{
            headers:{
                "Content-Type":"application/json"
            }
        });
        dispatch({
            type:"UpdatePostSuccess",
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:"UpdatePostFailure",
            payload:error.message.data.message
        })
    }
}


export const DeletePost=(id)=>async (dispatch)=>{
    try {
        
        dispatch({
            type:"DeletePostRequest"
        })

        const {data}= await axios.delete(`/api/v1/post/${id}`);
        dispatch({
            type:"DeletePostSuccess",
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:"DeletePostFailure",
            payload:error.response.data.message
        })
    }
}



export const GetUserPosts=(id)=>async (dispatch)=>{
    try {
        
        dispatch({
            type:"UserPostRequest"
        })

        const {data}= await axios.get(`/api/v1/userposts/${id}`);
        dispatch({
            type:"UserPostSuccess",
            payload:data.posts
        })
    } catch (error) {
        dispatch({
            type:"UserPostFailure",
            payload:error.response.data.message
        })
    }
}




export const GetUserProfile=(id)=>async (dispatch)=>{
    try {
        
        dispatch({
            type:"UserProfileRequest"
        })

        const {data}= await axios.get(`/api/v1/user/${id}`);
        console.log(data);
        dispatch({
            type:"UserProfileSuccess",
            payload:data.user
            
        })
    } catch (error) {
        dispatch({
            type:"UserProfileFailure",
            payload:error.response.data.message
        })
    }
}
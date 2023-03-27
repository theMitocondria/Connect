import {configureStore} from "@reduxjs/toolkit";
import { GetAllUserReducer, PostOfFollowingReducer, UserProfileReducer, userReducer } from "./Reducers/user";
import {likeReducer, MyPostReducer, UserPostReducer} from "./Reducers/posts";

const store=configureStore({
    reducer:{
        user:userReducer,
        PostOfFollowing:PostOfFollowingReducer,
        GetAllUser:GetAllUserReducer,
        like:likeReducer,
        myPosts:MyPostReducer,
        UserProfile:UserProfileReducer,
        UserPost:UserPostReducer
    }
});

export default store;
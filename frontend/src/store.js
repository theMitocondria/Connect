import {configureStore} from "@reduxjs/toolkit";
import { GetAllUserReducer, PostOfFollowingReducer, userReducer } from "./Reducers/user";
import {likeReducer} from "./Reducers/posts";

const store=configureStore({
    reducer:{
        user:userReducer,
        PostOfFollowing:PostOfFollowingReducer,
        GetAllUser:GetAllUserReducer,
        like:likeReducer,
    }
});

export default store;
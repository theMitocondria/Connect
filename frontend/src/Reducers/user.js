import {createReducer} from "@reduxjs/toolkit"
const initialstate={
    isAuthenticated:false,
};

export const userReducer=createReducer(initialstate,{
    LoginRequest:(state)=>{
        state.loading=true;
    },
    LoginSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload;
        state.isAuthenticated=true;
    },
    LoginFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.isAuthenticated=false;
    },

    RegisterRequest:(state)=>{
        state.loading=true;
    },
    RegisterSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload;
        state.isAuthenticated=true;
    },
    RegisterFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.isAuthenticated=false;
    },

    LoadUserRequest:(state)=>{
        state.loading=true;
    },
    LoadUserSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload;
        state.isAuthenticated=true;
    },
    LoadUserFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.isAuthenticated=false;
    },
    clearErrrors:(state)=>{
        state.error=null
    },

    LogoutRequest:(state)=>{
        state.loading=true;
    },
    LogoutSuccess:(state)=>{
        state.loading=false;
        state.user=null;
        state.isAuthenticated=false;
    },
    LogoutFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.isAuthenticated=true;
    },
    clearErrrors:(state)=>{
        state.error=null
    },
   
});

export const PostOfFollowingReducer=createReducer(initialstate,{
    PostOfFollowingRequest:(state)=>{
        state.loading=true;
    },
    PostOfFollowingSuccess:(state,action)=>{
        state.loading=false;
        state.posts=action.payload;
    },
    PostOfFollowingFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearErrrors:(state)=>{
        state.error=null
    }
})

export const GetAllUserReducer=createReducer(initialstate,{
    GetAllUserRequest:(state)=>{
        state.loading=true;
    },
    GetAllUserSuccess:(state,action)=>{
        state.loading=false;
        state.posts=action.payload;
    },
    GetAllUserFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearErrrors:(state)=>{
        state.error=null
    }
})


export const UserProfileReducer=createReducer(initialstate,{
    UserProfileRequest:(state)=>{
        state.loading=true;
    },
    UserProfileSuccess:(state,action)=>{
        state.loading=false;
        state.posts=action.payload;
    },
    UserProfileFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    UserProfile:(state)=>{
        state.error=null
    }
})
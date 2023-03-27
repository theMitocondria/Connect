import { createReducer } from "@reduxjs/toolkit";

const initialstate={};

export const likeReducer=createReducer(initialstate,{
    likeRequest:(state)=>{
        state.loading=true;
    },
    likeSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    likeFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearErrors:(state)=>{
        state.error=null
    },
    clearMessage:(state)=>{
        state.message=null;
    },

    addCommentRequest:(state)=>{
        state.loading=true;
    },
    addCommentSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    addCommentFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearErrors:(state)=>{
        state.error=null
    },
    clearMessage:(state)=>{
        state.message=null;
    },


    newPostRequest:(state)=>{
        state.loading=true;
    },
    newPostSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    newPostFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearErrors:(state)=>{
        state.error=null;
    },
    clearMessage:(state)=>{
        state.message=null;
    },

    UpdatePostRequest:(state)=>{
        state.loading=true;
    },
    UpdatePostSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    UpdatePostFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearErrors:(state)=>{
        state.error=null;
    },
    clearMessage:(state)=>{
        state.message=null;
    },

    DeletePostRequest:(state)=>{
        state.loading=true;
    },
    DeletePostSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    DeletePostFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearErrors:(state)=>{
        state.error=null;
    },
    clearMessage:(state)=>{
        state.message=null;
    },

    UpdateProfileRequest:(state)=>{
        state.loading=true;
    },
    UpdateProfileSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    UpdateProfileFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearErrors:(state)=>{
        state.error=null;
    },
    clearMessage:(state)=>{
        state.message=null;
    },
    UpdatePasswordRequest:(state)=>{
        state.loading=true;
    },
    UpdatePasswordSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    UpdatePasswordFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearErrors:(state)=>{
        state.error=null;
    },
    clearMessage:(state)=>{
        state.message=null;
    },

    DeleteProfileRequest:(state)=>{
        state.loading=true;
    },
    DeleteProfileSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    DeleteProfileFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearErrors:(state)=>{
        state.error=null;
    },
    clearMessage:(state)=>{
        state.message=null;
    },
    ForgotPasswordRequest:(state)=>{
        state.loading=true;
    },
    ForgotPasswordSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    ForgotPasswordFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearErrors:(state)=>{
        state.error=null;
    },
    clearMessage:(state)=>{
        state.message=null;
    },
    resetPasswordRequest: (state) => {
        state.loading = true;
      },
      resetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      resetPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    
    clearErrors:(state)=>{
        state.error=null;
    },
    clearMessage:(state)=>{
        state.message=null;
    }

})

export const MyPostReducer=createReducer(initialstate,{
    myPostRequest:(state)=>{
        state.loading=true;
    },
    myPostSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    myPostFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearMessage:(state)=>{
        state.message=null;
    },
    clearError:(state)=>{
        state.error=null
    }
})

export const UserPostReducer=createReducer(initialstate,{
    UserPostRequest:(state)=>{
        state.loading=true;
    },
    UserPostSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    UserPostFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearMessage:(state)=>{
        state.message=null;
    },
    clearError:(state)=>{
        state.error=null
    }
})

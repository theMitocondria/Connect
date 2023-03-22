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
    }
})
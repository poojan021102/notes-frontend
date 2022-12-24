import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name:'userDetails',
    initialState:{
        user_name:null,
        password:null,
        first_name:null,
        last_name:null,
        email:null
    },
    reducers:{
        login:(state,action)=>{
            // get the login details of the user
            state.user_name = action.payload.user_name;
            state.password = action.payload.password;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.email = action.payload.email;
        },
        logout:(state)=>{
            state.user_name = null;
            state.password = null;
            state.first_name = null;
            state.last_name = null;
            state.email = null;
        },
        update:(state,action)=>{
            // update the details of user
            state.user_name = action.payload.user_name;
            state.password = action.payload.password;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.email = action.payload.email;
        }
    }
});
export const { update, logout, login } = UserSlice.actions

export default UserSlice.reducer
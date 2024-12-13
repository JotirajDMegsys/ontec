

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { forgotPassword } from '../../helpers/fakebackend_helper'

//*Action
export const userForgotPassword = createAsyncThunk("userForgotPassword", async (data) => {
    //  console.log(data,".....85943850");
 
    try {
        const response = await forgotPassword(data);
        console.log(response,"....rsponse.");
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})
export const resetforgetPassword = createAsyncThunk("resetforgetPassword", async () => {
return {};
})

const forgetPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: {
        forgetPasswordIsLoading: false,
        forgetPasswordData:{},

        // forgetPasswordDataCount: 0,
        forgetPasswordIsSuccess: false,
        forgetPasswordIsError: false,
    },
    reducers:{
        clearStateForForgetPassword:(state)=>{
            state.forgetPasswordData={}
            state.forgetPasswordIsLoading= false
            
    
            // forgetPasswordDataCount: 0,
            state.forgetPasswordIsSuccess= false
            state.forgetPasswordIsError= false
        }
    },
    extraReducers: (builder) => {

        builder.addCase(userForgotPassword.pending, (state, action) => {
            state.forgetPasswordIsLoading = true;
            state.forgetPasswordIsSuccess = false;
        });

        builder.addCase(userForgotPassword.fulfilled, (state, action) => {
            console.log(action.payload,"jofjeojojojjo");
            state.forgetPasswordIsLoading = false;
            state.forgetPasswordData = action.payload;
            state.forgetPasswordIsSuccess = true;
            state.forgetPasswordIsError = false;
        });

        builder.addCase(userForgotPassword.rejected, (state, action) => {
            state.forgetPasswordIsError = true;
            state.forgetPasswordIsSuccess = false;
            state.forgetPasswordData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;

        });
        builder.addCase(resetforgetPassword.fulfilled, () => {
            // state.forgetPasswordIsLoading = false;
            // state.forgetPasswordData = action.payload;
            // state.forgetPasswordIsSuccess = true;
            // state.forgetPasswordIsError = false;
            state.forgetPasswordIsLoading=false,
            state.forgetPasswordData={},
    
            // forgetPasswordDataCount: 0,
            state.forgetPasswordIsSuccess= false,
            state.forgetPasswordIsError= false

        });
    

    }
});


export const {clearStateForForgetPassword} = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;



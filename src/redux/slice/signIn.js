import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signIn } from '../../helpers/fakebackend_helper'
import { useState } from 'react'

//*Action
export const userSignIn = createAsyncThunk("userSignIn", async (user) => {
    console.log(user,'000000');
    try {
        console.log('====================================');
        console.log(user);
        console.log('====================================');
        const response = await signIn(user);
        console.log('get response',response);
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(new Error(JSON.stringify(error)))
    }

})

export const resetLoginDetails = createAsyncThunk("resetLoginDetails", async () => {
    // console.log('ppppppppppppppp');
    console.log("--------------------------------------------------------------------------------------");

    return {};
});

const signInSlice = createSlice({
    name: 'signIn',
    initialState: {
        isLoading: false,
        data: {},
        isSuccess: false,
        isError: false,
        // error
    },
    reducers:{
        clearStates:(state)=>{
            state.data = {}
            state.isLoading= false,
            state.isSuccess= false,
            state.isError=false

            
        }
    },
    extraReducers: (builder) => {

        builder.addCase(userSignIn.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
        });

        builder.addCase(userSignIn.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isSuccess = true;
            state.isError = false;
        });

        builder.addCase(userSignIn.rejected, (state, action) => {
            console.log("==========rejected", action);
            state.isError = true;
            state.data = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
            state.isSuccess = false;

        });

        builder.addCase(resetLoginDetails.fulfilled, () => {
            return {
                isLoading: false,
                data: {},
                isSuccess: false,
                isError: false,
            };
        });

    }
});


export const {clearStates} =signInSlice.actions

export default signInSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { forgotPassword } from '../../helpers/fakebackend_helper'

// //*Action
// export const verifyOtp = createAsyncThunk("verifyOtp", async (data) => {
//      console.log(data,".....85943850");
//     const response = await resetPassword(data);
//     console.log(response,"....response.");
//     return response;
// })
// // export const resetforgetPassword = createAsyncThunk("resetforgetPassword", async () => {
// //     return {};
// // });

// const forgetPasswordSlice = createSlice({
//     name: 'verifyPassword',
//     initialState: {
//         forgetPasswordIsLoading: false,
//         forgetPasswordData:[],

//         // forgetPasswordDataCount: 0,
//         forgetPasswordIsSuccess: false,
//         forgetPasswordIsError: false,
//     },
//     extraReducers: (builder) => {

//         builder.addCase(verifyOtp.pending, (state, action) => {
//             state.forgetPasswordIsLoading = true;
//             state.forgetPasswordIsSuccess = false;
//         });

//         builder.addCase(verifyOtp.fulfilled, (state, action) => {
//             state.forgetPasswordIsLoading = false;
//             state.forgetPasswordData = action.payload;
//             state.forgetPasswordIsSuccess = true;
//             state.forgetPasswordIsError = false;
//         });

//         builder.addCase(verifyOtp.rejected, (state, action) => {
//             state.forgetPasswordIsError = true;
//             state.forgetPasswordIsSuccess = false;

//         });

//     }
// });



// export default forgetPasswordSlice.reducer;



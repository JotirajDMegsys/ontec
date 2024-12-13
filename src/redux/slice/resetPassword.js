
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { passwordReset } from '../../helpers/fakebackend_helper'

// //*Action
// export const resetPassword = createAsyncThunk("resetPassword", async (data) => {
//     //  console.log(d/=ata,".....85943850");
//     const response = await passwordReset(data);
//     // console.log(response,"....response.");
//     return response;
// })
// export const resetpassword = createAsyncThunk("resetforgetPassword", async () => {
//     return '';
// });

// const resetPasswordSlice = createSlice({
//     name: 'resetpassword',
//     initialState: {
//         resetPasswordIsLoading: false,
//         resetPasswordData:'',

//         // forgetPasswordDataCount: 0,
//         resetPasswordIsSuccess: false,
//         resetPasswordIsError: false,
//     },
//     extraReducers: (builder) => {

//         builder.addCase(resetPassword.pending, (state, action) => {
//             state.resetPasswordIsLoading = true;
//             state.resetPasswordIsSuccess = false;
//         });

//         builder.addCase(resetPassword.fulfilled, (state, action) => {
//             state.resetPasswordIsLoading = false;
//             state.resetPasswordData = action.payload;
//             state.resetPasswordIsSuccess = true;
//             state.resetPasswordIsError = false;
//         });

//         builder.addCase(resetPassword.rejected, (state, action) => {
//             state.resetPasswordIsError = true;
//             state.resetPasswordIsSuccess = false;

//         });

//     }
// });



// export default resetPasswordSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { changePassworddApi, passwordReset } from '../../helpers/fakebackend_helper'

//*Action
export const resetPassword = createAsyncThunk("resetPassword", async (data) => {

    try {
        const response = await passwordReset(data);
        return response;
    
    } catch (error) {
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})



//change password
export const changePassword = createAsyncThunk("changePassword", async (data) => {
    console.log(data,".....85943850")

   try {
       const response = await changePassworddApi(data);
       console.log('get response');
       console.log(response,"0000000000000000000");
       return response;
   
   } catch (error) {
       return Promise.reject(new Error(JSON.stringify(error)))
   }
})



export const resetforgetPassword = createAsyncThunk("resetforgetPassword", async () => {
    console.log("0000000000000000000000");
    return {};
});
export const resetChangePassword = createAsyncThunk("resetChangePassword", async () => {
    console.log("kokokooko");
    return {};
});





const resetPasswordSlice = createSlice({
    name: 'resetpassword',
    initialState: {
        resetPasswordIsLoading: false,
        resetPasswordData:{},
        // forgetPasswordDataCount: 0,
        resetPasswordIsSuccess: false,
        resetPasswordIsError: false,
        changePasswordData:{},
        changePasswordIsLoading:false,
        changePasswordIsSuccess:false,
        changePasswordIsError:false

    },
    reducers:{
        clearStates:(state)=>{
            state.resetPasswordData = {}
            state.resetPasswordIsLoading= false,
            state.resetPasswordData={},
            // forgetPasswordDataCount: 0,
            state.resetPasswordIsSuccess=false,
            state.resetPasswordIsError=false,
            state.changePasswordData={},
            state.changePasswordIsLoading=false,
            state.changePasswordIsSuccess=false,
            state.changePasswordIsError=false
        }
    },
    extraReducers: (builder) => {

        builder.addCase(resetPassword.pending, (state, action) => {
            state.resetPasswordIsLoading = true;
            state.resetPasswordIsSuccess = false;
        });

        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.resetPasswordIsLoading = false;
            state.resetPasswordData = action.payload;
            state.resetPasswordIsSuccess = true;
            state.resetPasswordIsError = false;
        });

        builder.addCase(resetPassword.rejected, (state, action) => {
            console.log(action.error.message,"rgjkprjgpprjgjprtgpjp");
            state.resetPasswordIsError = true;
            state.resetPasswordIsSuccess = false;
            state.resetPasswordData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;

            // state.resetPasswordData = JSON.parse(action.error.Password) ? JSON.parse(action.error.Password) : null;
            state.resetPasswordIsLoading = false;
        });
        builder.addCase(resetforgetPassword.fulfilled, (state) => {
            state.resetPasswordIsLoading = false;
            state.resetPasswordData = {};
            state.resetPasswordIsSuccess = false;
            state.resetPasswordIsError = false;
        });
         
        builder.addCase(changePassword.pending, (state, action) => {
            state.changePasswordIsLoading = true;
            state.changePasswordIsSuccess = false;

    
        });

        builder.addCase(changePassword.fulfilled, (state, action) => {
console.log("opppppp",action.payload);
           
            state.changePasswordIsLoading = false;
            state.changePasswordData = action.payload;
            state.changePasswordIsSuccess = true;
            state.changePasswordIsError = false;
        });

        builder.addCase(changePassword.rejected, (state, action) => {
            console.log(action.error.message,"rgjkprjgpprjgjprtgpjp");
            state.changePasswordIsError = true;
            state.changePasswordIsSuccess = false;
            state.changePasswordData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
            state.changePasswordIsLoading = false;
        });
        builder.addCase(resetChangePassword.fulfilled, (state) => {
            console.log("0-0-0-0-0-0-0-0-0-0-");
            return {
                changePasswordData:{},
                changePasswordIsLoading:false,
                changePasswordIsSuccess:false,
                changePasswordIsError:false
           
            }


        });
  
    }
});


export const {clearStates} =resetPasswordSlice.actions
export default resetPasswordSlice.reducer;




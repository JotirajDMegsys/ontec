import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signUp, getSignUpOtp } from '../../helpers/fakebackend_helper'

//*Action
export const userSignUp = createAsyncThunk("userSignUp", async (data) => {

    try {
        const response = await signUp(data);
        console.log('get response',response);
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})


export const SignUpOtpResetData = createAsyncThunk("SignUpOtpResetData", async () => {
    console.log("jiewfjpjepfiiii");
    return {}
});

export const getUserSignUpOtp = createAsyncThunk("getUserSignUpOtp", async (data) => {
    console.log(data,"0000000000000000");

    try {
        const response = await getSignUpOtp(data);
        // console.log('get response');
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})

const signUpSlice = createSlice({
    name: 'signUp',
    initialState: {
        isLoading: false,
        data: null,
        isSuccess: false,
        isError: false,
        getSignUpOtpData: [],
        getSignUpOtpSuccess: false,
        getSignUpOtpError: false,
    },
    extraReducers: (builder) => {

        //*signup
        builder.addCase(userSignUp.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
        });

        builder.addCase(userSignUp.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isSuccess = true;
        });

        builder.addCase(userSignUp.rejected, (state, action) => {
            // console.log("error--222-059705687085608---", action);
            state.isError = true;
            state.data = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
            state.isSuccess = false;
        });

        //*signup otp
        builder.addCase(getUserSignUpOtp.pending, (state, action) => {
            // console.log("error------", action.payload);
            state.isLoading = true;
            state.getSignUpOtpSuccess = false;
            state.getSignUpOtpError = false;
        });

        builder.addCase(getUserSignUpOtp.fulfilled, (state, action) => {
            // console.log("response------", action.payload);
            state.isLoading = false;
            state.getSignUpOtpData = action.payload;
            state.getSignUpOtpSuccess = true;
            state.getSignUpOtpError = false;
        });

        builder.addCase(getUserSignUpOtp.rejected, (state, action) => {
            // console.log("error--222----", JSON.parse(action.error.message).errors); 
            state.isLoading = false;
            state.getSignUpOtpData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
            state.getSignUpOtpSuccess = false;
            state.getSignUpOtpError = true;
        });

        builder.addCase(SignUpOtpResetData.fulfilled, () => {
            return {
                getSignUpOtpData: [],
        getSignUpOtpSuccess: false,
        getSignUpOtpError: false,
        isLoading: false,
        data: null,
        isSuccess: false,
        isError: false,
            };
        });

    }
});

export default signUpSlice.reducer;


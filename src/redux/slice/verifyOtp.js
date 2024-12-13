import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { verifyOtp } from '../../helpers/fakebackend_helper'

//*Action
export const userVerifyOtp = createAsyncThunk("userVerifyOtp", async () => {

    const response = await verifyOtp();
    return response;
})

const verifyOtpSlice = createSlice({
    name: 'verifyOtp',
    initialState: {
        isLoading: false,
        data: null,
        isSuccess: false,
        isError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(userVerifyOtp.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
        });

        builder.addCase(userVerifyOtp.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isSuccess = true;
        });

        builder.addCase(userVerifyOtp.rejected, (state, action) => {
            // console.log("error", action.payload);
            state.isError = true;
            state.isSuccess = false;
        });

    }
});

export default verifyOtpSlice.reducer;


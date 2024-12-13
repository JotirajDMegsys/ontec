import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { updateUser } from '../../helpers/fakebackend_helper'


//*Action

export const addProfile = createAsyncThunk("addProfile", async(data) => {
    //   console.log(data)
    const response = await updateUser(data);
    // console.log("response",response)
    return response;
})


export const resetAddprofile = createAsyncThunk("resetAddprofile", async () => {
    return {};
});

const addProfileSlice = createSlice({
    name: 'addProfile',
    initialState: {
        isLoading: false,
        data: {},
        isSuccess: false,
        isError: false,
        // error
    },
    extraReducers: (builder) => {

        builder.addCase(addProfile.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
        });

        builder.addCase(addProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isSuccess = true;
            state.isError = false;
        });

        builder.addCase(addProfile.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;

        });

        builder.addCase(resetAddprofile.fulfilled, (state, action) => {
            return {
                isLoading: false,
                data: {},
                isSuccess: false,
                isError: false,
            };
        });

    }
});



export default addProfileSlice.reducer;

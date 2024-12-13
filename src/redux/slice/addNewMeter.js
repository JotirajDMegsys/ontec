import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addupdateMeter } from '../../helpers/fakebackend_helper'


//*Action
export const addMeter = createAsyncThunk("addNewMeter", async (data) => {
    //   console.log(data);
    const response = await addupdateMeter(data);
    // console.log('RESPONSE',response);
// console.log("response");
    return response;
    
})

export const resetaddMeterState = createAsyncThunk("resetaddMeterState", async () => {
    return {};
});

const addMeterSlice = createSlice({
    name: 'addMeter',
    initialState: {
        isLoading: false,
        data: {},
        isSuccess: false,
        isError: false,
        // error
    },
    extraReducers: (builder) => {

        builder.addCase(addMeter.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
        });

        builder.addCase(addMeter.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isSuccess = true;
            state.isError = false;
        });

        builder.addCase(addMeter.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;

        });

        builder.addCase(resetaddMeterState.fulfilled, (state, action) => {
            return {
                isLoading: false,
                data: {},
                isSuccess: false,
                isError: false,
            };
        });

    }
});



export default addMeterSlice.reducer;


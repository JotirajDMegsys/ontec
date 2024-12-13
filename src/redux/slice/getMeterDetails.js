

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { meterValue } from '../../helpers/fakebackend_helper'

//*Action
export const getMeterDetails = createAsyncThunk("getMeterDetails", async (data) => {
    //  console.log(data,"come to slice");
    const response = await meterValue(data);
    // console.log("response............../.............",response,"response........................................");
    return response;
});

export const resetMeterDetails = createAsyncThunk("resetMeterDetails", async () => {
    console.log("popopopopytpiptpypitypu");
    return {};
});

const getMeterByOwnerIdSlice = createSlice({
    name: 'meter',
    initialState: {
        getMeterDetailsIsLoading: false,
        getMeterDetailsData: [],

        getMeterDetailsIsSuccess: false,
        getMeterDetailsIsError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(getMeterDetails.pending, (state, action) => {
            state.getMeterDetailsIsLoading = true;
            state.getMeterDetailsIsSuccess = false;
        });

        builder.addCase(getMeterDetails.fulfilled, (state, action) => {
            state.getMeterDetailsIsLoading = false;
            state.getMeterDetailsData = action.payload;
            state.getMeterDetailsIsSuccess = true;
            state.getMeterDetailsIsError = false;
        });

        builder.addCase(getMeterDetails.rejected, (state, action) => {
            state.isError = true;
            state.getMeterDetailsIsSuccess = false;

        });
        builder.addCase(resetMeterDetails.fulfilled, () => {
            return {
                getMeterDetailsIsLoading: false,
                getMeterDetailsData: [],
        
                getMeterDetailsIsSuccess: false,
                getMeterDetailsIsError: false,
            };
        });
    }
});



export default getMeterByOwnerIdSlice.reducer;


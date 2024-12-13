import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { verifyMeterById } from '../../helpers/fakebackend_helper'

//*Action
export const verifyMeter = createAsyncThunk("verifyMeter", async (data) => {
    try {
        const response = await verifyMeterById(data);
        console.log('get response',response);
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})
export const resetverifyMeter = createAsyncThunk("resetverifyMeter", async () => {
    return {};
});

const verifyMeterSlice = createSlice({
    name: 'meterVerify',
    initialState: {
        verifyMeterIsLoading: false,
        verifyMeterData:null,

        // verifyMeterDataCount: 0,
        verifyMeterIsSuccess: false,
        verifyMeterIsError: false,
    },
    reducers:{
        clearStates:(state)=>{
            state.verifyMeterData = null
            state.verifyMeterIsLoading= false,
            state.verifyMeterIsSuccess= false,
            state.verifyMeterIsError=false

            
        }
    },
    extraReducers: (builder) => {

        builder.addCase(verifyMeter.pending, (state, action) => {
            state.verifyMeterIsLoading = true;
            state.verifyMeterIsSuccess = false;
        });

        builder.addCase(verifyMeter.fulfilled, (state, action) => {
            state.verifyMeterIsLoading = false;
            state.verifyMeterData = action.payload;
            // state.getPropertiesList = action.payload.propertiesList;
            state.verifyMeterIsSuccess = true;
            state.verifyMeterIsError = false;
        });

        builder.addCase(verifyMeter.rejected, (state, action) => {
            state.verifyMeterIsError = true;
            state.verifyMeterIsSuccess = false;
            state.verifyMeterIsLoading = false;
            state.verifyMeterData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
        });

    }
});


export const {clearStates} =verifyMeterSlice.actions

export default verifyMeterSlice.reducer;


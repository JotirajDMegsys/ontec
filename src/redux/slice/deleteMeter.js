import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDeleteMeter } from '../../helpers/fakebackend_helper'

//*Action
export const deleteMeter = createAsyncThunk("deleteMeter", async (data) => {
    // console.log("update",data);
    const response = await getDeleteMeter(data);
    // console.log(response,"jefopgjprfvpjprfp");
    return response;
})

export const resetGetDeleteMeter = createAsyncThunk("resetGetDeleteMeter", async () => {
    return {};
});


const deleteMeterSlice = createSlice({
    name: 'deleteMeters',
    initialState: {
      deleteMeterLoding: false,
      deleteMeterData:"",
      deleteMeterIsSuccess: false,
      deleteMeterIsError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(deleteMeter.pending, (state, action) => {
            state.deleteMeterLoding = true;
            state.deleteMeterIsSuccess = false;
        });

        builder.addCase(deleteMeter.fulfilled, (state, action) => {
            // console.log(action.payload,"oergo[per[go[gi[");
            state.deleteMeterLoding = false;
            state.deleteMeterData = action.payload;
            state.deleteMeterIsSuccess = true;
            state.deleteMeterIsError = false;
        });

        builder.addCase(deleteMeter.rejected, (state, action) => {
            state.deleteMeterIsError = true;
            state.deleteMeterIsSuccess = false;

        });

        builder.addCase(resetGetDeleteMeter.fulfilled, () => {
            return {
              deleteMeterLoding: false,
              deleteMeterData:"",
              deleteMeterIsSuccess: true,
              deleteMeterIsError: false,
            };
        });
    }
});



export default deleteMeterSlice.reducer;


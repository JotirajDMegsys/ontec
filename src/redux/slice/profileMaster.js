import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { profileData } from '../../helpers/fakebackend_helper'

//*Action
export const getMasterdata = createAsyncThunk("getMasterdata", async (data) => {
    //  console.log(data);
    const response = await profileData(data);
    // console.log(response);
    return response;
})

const getDetailProfileSlice = createSlice({
    name: 'masterListForProfile',
    initialState: {
        getMasterdataIsLoading: false,
        getMasterdataData: [],
        // getRoleMasterList: {},

        // getMasterdataDataCount: 0,
        getMasterdataIsSuccess: false,
        getMasterdataIsError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(getMasterdata.pending, (state, action) => {
            state.getMasterdataIsLoading = true;
            state.getMasterdataIsSuccess = false;
        });

        builder.addCase(getMasterdata.fulfilled, (state, action) => {
            state.getMasterdataIsLoading = false;
            // state.getMasterdataData = action.payload.statusList;
            state.getMasterdataData = action.payload;
            // state.getRoleMasterList = action.payload.roleMasterList;
            state.getMasterdataIsSuccess = true;
            state.getMasterdataIsError = false;
        });

        builder.addCase(getMasterdata.rejected, (state, action) => {
            state.getMasterdataIsError = true;
            state.getMasterdataIsSuccess = false;

        });

    }
});



export default getDetailProfileSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAccountHistory } from '../../helpers/fakebackend_helper'

  export const getAccHistory = createAsyncThunk("getAccHistory", async (data) => {

    try {
        console.log('get response---------99-', data);
      const response = await getAccountHistory(data);
        console.log('get response', response);
        return response;
  
    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(error);
    }
  })

const getDashboardAnalyticSlice = createSlice({
    name: 'accountData',
    initialState: {
        accLoading: false,
        accData: [],
        accSuccess: false,
        accError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(getAccHistory.pending, (state, action) => {
            state.accLoading = true;
            state.accSuccess = false;
        });

        builder.addCase(getAccHistory.fulfilled, (state, action) => {
            // console.log("fullfilleddddddddddddddddddddddddd", action);
            state.accLoading = false;
            state.accData = action.payload;
            state.accSuccess = true;
            state.accError = false;
        });

        builder.addCase(getAccHistory.rejected, (state, action) => {
            state.accError = true;
            state.accSuccess = false;

        });
    }
});



export default getDashboardAnalyticSlice.reducer;


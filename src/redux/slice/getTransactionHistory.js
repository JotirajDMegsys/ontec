import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAlltransationListList, deletetransationListList } from '../../helpers/fakebackend_helper'

//*Action
export const getTransactionList = createAsyncThunk("getTransactionList", async (data) => {
    try {
        const response = await getAlltransationListList(data);
        return response;
    } catch (error) {
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})


const getTransactionListIdSlice = createSlice({
    name: 'transationList',
    initialState: {
        transationListIsLoading: false,
        transationListData: [],
        transationListIsSuccess: false,
        transationListIsError: false,

    },
    extraReducers: (builder) => {

        builder.addCase(getTransactionList.pending, (state, action) => {
            state.transationListIsLoading = true;
            state.transationListIsSuccess = false;
        });

        builder.addCase(getTransactionList.fulfilled, (state, action) => {
            state.transationListIsLoading = false;
            state.transationListData = action.payload;
            state.transationListIsSuccess = true;
            state.transationListIsError = false;
        });

        builder.addCase(getTransactionList.rejected, (state, action) => {
            state.transationListIsError = true;
            state.transationListIsSuccess = false;

        });


    }
});



export default getTransactionListIdSlice.reducer;


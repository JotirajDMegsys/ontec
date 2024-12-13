import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTransacitionMasters, getTransactionData } from '../../helpers/fakebackend_helper'

//*Action
export const transacitionMasters = createAsyncThunk("transacitionMasters", async (data) => {
    try {
        const response = await getTransacitionMasters(data);
        console.log('get response');
        return response;

    } catch (error) {
        // console.log("error123-----", error)
        return Promise.reject(error);
    }
});

export const transactionSummary = createAsyncThunk("transactionSummary", async (data) => {

    try {
        const response = await getTransactionData(data);
        console.log('get response');
        return response;

    } catch (error) {
        // console.log("error123-----", error)
        return Promise.reject(error);
    }
})

const getransacitionMastersIdSlice = createSlice({
    name: 'transacitionMasters',
    initialState: {
        masterTransacitionIsLoading: false,
        masterTransacitionData: [],
        // masterTransacitionPeriod:[],
        masterTransacitionSuccess: false,
        masterTransacitionIsError: false,

        transactionIsLoading: false,
        transactionData: [],
        transactionSuccess: false,
        transactionIsError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(transacitionMasters.pending, (state, action) => {
            state.masterTransacitionIsLoading = true;
            state.masterTransacitionSuccess = false;
        });

        builder.addCase(transacitionMasters.fulfilled, (state, action) => {
            state.masterTransacitionIsLoading = false;
            state.masterTransacitionData = action.payload;
            // state.masterTransacitionPeriod = action.payload.transactionPeriod;
            state.masterTransacitionSuccess = true;
            state.masterTransacitionIsError = false;
        });

        builder.addCase(transacitionMasters.rejected, (state, action) => {
            state.masterTransacitionIsError = true;
            state.masterTransacitionSuccess = false;

        });

        builder.addCase(transactionSummary.pending, (state, action) => {
            state.transactionIsLoading = true;
            state.transactionSuccess = false;
        });

        builder.addCase(transactionSummary.fulfilled, (state, action) => {
            state.transactionIsLoading = false;
            state.transactionData = action.payload;
            state.transactionSuccess = true;
            state.transactionIsError = false;
        });

        builder.addCase(transactionSummary.rejected, (state, action) => {
            state.transactionIsError = true;
            state.transactionSuccess = false;

        });

    }
});



export default getransacitionMastersIdSlice.reducer;


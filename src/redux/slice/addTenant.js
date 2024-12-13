
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AddNewTenant } from '../../helpers/fakebackend_helper'


//*Action

export const addTenant = createAsyncThunk("addTenant", async(data) => {
    try {
        const response = await AddNewTenant(data);
        console.log("response",response)
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})


export const resetaddTenantState = createAsyncThunk("resetaddTenantState", async () => {
    console.log("jforjef");
    return {};
});

const addTenantSlice = createSlice({
    name: 'addTenant',
    initialState: {
        isLoading: false,
        getTendantList: {},
        isSuccess: false,
        isError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(addTenant.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
        });

        builder.addCase(addTenant.fulfilled, (state, action) => {
            state.isLoading = false;
            state.getTendantList = action.payload;
            state.isSuccess = true;
            state.isError = false;
        });

        builder.addCase(addTenant.rejected, (state, action) => {
            state.isError = true;
            state.getTendantList = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;

            state.isSuccess = false;

        });

        builder.addCase(resetaddTenantState.fulfilled, () => {
            return {
                isLoading: false,
                getTendantList: {},
                isSuccess: false,
                isError: false,
            };
        });

    }
});



export default addTenantSlice.reducer;

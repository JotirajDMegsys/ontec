import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPropertyDetails } from '../../helpers/fakebackend_helper'

//*Action
export const getPropertiesDetails = createAsyncThunk("getPropertiesDetails", async (data) => {
    const response = await getPropertyDetails(data);
    return response;
})

export const resetGetPropertiesDetails = createAsyncThunk("resetGetPropertiesDetails", async () => {
    return {};
});


const getPropertyDetailsSlice = createSlice({
    name: 'getPropertyDetails',
    initialState: {
        getPropertiesDetailsIsLoading: false,
        getPropertiesDetailsData: {},
        getPropertiesDetailsIsSuccess: false,
        getPropertiesDetailsIsError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(getPropertiesDetails.pending, (state, action) => {
            state.getPropertiesDetailsIsLoading = true;
            state.getPropertiesDetailsIsSuccess = false;
        });

        builder.addCase(getPropertiesDetails.fulfilled, (state, action) => {
            state.getPropertiesDetailsIsLoading = false;
            state.getPropertiesDetailsData = action.payload;
            state.getPropertiesDetailsIsSuccess = true;
            state.getPropertiesDetailsIsError = false;
        });

        builder.addCase(getPropertiesDetails.rejected, (state, action) => {
            state.isError = true;
            state.getPropertiesDetailsIsSuccess = false;

        });

        builder.addCase(resetGetPropertiesDetails.fulfilled, (state, action) => {
            return {
                getPropertiesDetailsIsLoading: false,
                getPropertiesDetailsData: {},
                getPropertiesDetailsIsSuccess: false,
                getPropertiesDetailsIsError: false,
            };
        });
    }
});



export default getPropertyDetailsSlice.reducer;


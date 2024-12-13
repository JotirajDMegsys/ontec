import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllPropertyList } from '../../helpers/fakebackend_helper'

//*Action
export const getAllProperty = createAsyncThunk("getAddProperty", async (data) => {

    const response = await getAllPropertyList(data);
    // console.log("++++++++++");
    // console.log("response",response);
    // console.log(response.ownerPropertyList);
    // console.log("++++++++++");
    return response;
})

const getAllPropertySlice = createSlice({
    name: 'getProperties',
    initialState: {
        getPropertiesIsLoading: false,
        getPropertiesData: [],
        getPropertiesDataCount: 0,
        getPropertiesIsSuccess: false,
        getPropertiesIsError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(getAllProperty.pending, (state, action) => {
            state.getPropertiesIsLoading = true;
            state.getPropertiesIsSuccess = false;
        });

        builder.addCase(getAllProperty.fulfilled, (state, action) => {
            state.getPropertiesIsLoading = false;
            state.getPropertiesData = action.payload;
            state.getPropertiesDataCount = action.payload.length;
            state.getPropertiesIsSuccess = true;
            state.getPropertiesIsError = false;
        });

        builder.addCase(getAllProperty.rejected, (state, action) => {
            state.isError = true;
            state.getPropertiesIsSuccess = false;

        });

    }
});



export default getAllPropertySlice.reducer;


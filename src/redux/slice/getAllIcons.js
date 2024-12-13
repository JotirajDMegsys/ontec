import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { allIcons } from '../../helpers/fakebackend_helper'

//*Action
export const getAllIcons = createAsyncThunk("getAllIcons", async (data) => {
    //  console.log(data);
    const response = await allIcons(data);
    // console.log(response);
    return response;
})

const getIconsByOwnerIdSlice = createSlice({
    name: 'icons',
    initialState: {
        getAllIconsIsLoading: false,
        getAllIconsData: [],
        getPropertiesList: [],

        // getAllIconsDataCount: 0,
        getAllIconsIsSuccess: false,
        getAllIconsIsError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(getAllIcons.pending, (state, action) => {
            state.getAllIconsIsLoading = true;
            state.getAllIconsIsSuccess = false;
        });

        builder.addCase(getAllIcons.fulfilled, (state, action) => {
            state.getAllIconsIsLoading = false;
            state.getAllIconsData = action.payload.meterTypeList;
            state.getPropertiesList = action.payload.propertiesList;
            state.getAllIconsIsSuccess = true;
            state.getAllIconsIsError = false;
        });

        builder.addCase(getAllIcons.rejected, (state, action) => {
            state.isError = true;
            state.getAllIconsIsSuccess = false;

        });

    }
});



export default getIconsByOwnerIdSlice.reducer;


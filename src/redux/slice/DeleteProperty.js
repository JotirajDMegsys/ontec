import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDeleteProperty } from '../../helpers/fakebackend_helper'

//*Action
export const deleteProperty = createAsyncThunk("deleteProperty", async (data) => {
    // console.log("update",data);
    const response = await getDeleteProperty(data);
    // console.log(response);
    return response;
})

export const resetGetDeleteProperty = createAsyncThunk("resetGetDeleteProperty", async () => {
    return {};
});


const deletePropertySlice = createSlice({
    name: 'deleteProperty',
    initialState: {
      deletePropertyLoding: false,
      deletePropertyData: {},
      deletePropertyIsSuccess: false,
      deletePropertyIsError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(deleteProperty.pending, (state, action) => {
            state.deletePropertyLoding = true;
            state.deletePropertyIsSuccess = false;
        });

        builder.addCase(deleteProperty.fulfilled, (state, action) => {
            state.deletePropertyLoding = false;
            state.deletePropertyData = action.payload;
            state.deletePropertyIsSuccess = true;
            state.deletePropertyIsError = false;
        });

        builder.addCase(deleteProperty.rejected, (state, action) => {
            state.deletePropertyIsError = true;
            state.deletePropertyIsSuccess = false;

        });

        builder.addCase(resetGetDeleteProperty.fulfilled, (state, action) => {
            return {
              deletePropertyLoding: false,
              deletePropertyData: {},
              deletePropertyIsSuccess: false,
              deletePropertyIsError: false,
            };
        });
    }
});



export default deletePropertySlice.reducer;


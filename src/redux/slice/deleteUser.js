import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDeleteUser } from '../../helpers/fakebackend_helper'

//*Action
export const deleteUser = createAsyncThunk("deleteUser", async (data) => {
    // console.log("update.....",data);
    const response = await getDeleteUser(data);
    // console.log(response,"===========================================================================================");
    return response;
})

export const resetGetdeleteUser = createAsyncThunk("resetGetdeleteUser", async () => {
    return {};
});


const deleteUserSlice = createSlice({
    name: 'deleteUser',
    initialState: {
      deleteUserLoding: false,
      deleteUserData:  {},
      deleteUserIsSuccess: false,
      deleteUserIsError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(deleteUser.pending, (state, action) => {
            state.deleteUserLoding = true;
            state.deleteUserIsSuccess = false;
        });

        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.deleteUserLoding = false;
            state.deleteUserData = action.payload;
            state.deleteUserIsSuccess = true;
            state.deleteUserIsError = false;
        });

        builder.addCase(deleteUser.rejected, (state, action) => {
            state.deleteUserIsError = true;
            state.deleteUserIsSuccess = false;

        });

        builder.addCase(resetGetdeleteUser.fulfilled, (state, action) => {
            return {
              deleteUserLoding: false,
              deleteUserData: {},
              deleteUserIsSuccess: false,
              deleteUserIsError: false,
            };
        });
    }
});



export default deleteUserSlice.reducer;


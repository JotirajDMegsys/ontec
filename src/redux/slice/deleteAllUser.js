import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getdeleteAllUser } from '../../helpers/fakebackend_helper'

//*Action
export const deleteAllUser = createAsyncThunk("deleteAllUser", async (data) => {
    // console.log("update....",data);
    const response = await getdeleteAllUser(data);
    // console.log(response);
    return response;
})

export const resetGetdeleteAllUser = createAsyncThunk("resetGetdeleteAllUser", async () => {
    return {};
});


const deleteAllUserSlice = createSlice({
    name: 'deleteAllUser',
    initialState: {
      deleteAllUserLoding: false,
      deleteAllUserData: {},
      deleteAllUserIsSuccess: false,
      deleteAllUserIsError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(deleteAllUser.pending, (state, action) => {
            state.deleteAllUserLoding = true;
            state.deleteAllUserIsSuccess = false;
        });

        builder.addCase(deleteAllUser.fulfilled, (state, action) => {
            state.deleteAllUserLoding = false;
            state.deleteAllUserData = action.payload;
            state.deleteAllUserIsSuccess = true;
            state.deleteAllUserIsError = false;
        });

        builder.addCase(deleteAllUser.rejected, (state, action) => {
            state.deleteAllUserIsError = true;
            state.deleteAllUserIsSuccess = false;

        });

        builder.addCase(resetGetdeleteAllUser.fulfilled, (state, action) => {
            return {
              deleteAllUserLoding: false,
              deleteAllUserData: {},
              deleteAllUserIsSuccess: false,
              deleteAllUserIsError: false,
            };
        });
    }
});



export default deleteAllUserSlice.reducer;


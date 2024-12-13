import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getdeleteAccount } from '../../helpers/fakebackend_helper'

//*Action
export const deleteAccount = createAsyncThunk("deleteAccount", async (data) => {
    // console.log("update",data);
    const response = await getdeleteAccount(data);
    // console.log(response);
    return response;
})

export const resetGetdeleteAccount = createAsyncThunk("resetGetDeleteProperty", async () => {
    return {};
});


const deleteAccountSlice = createSlice({
    name: 'deleteAccount',
    initialState: {
      deleteAccountLoding: false,
      deleteAccountData: {},
      deleteAccountIsSuccess: false,
      deleteAccountIsError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(deleteAccount.pending, (state, action) => {
            state.deleteAccountLoding = true;
            state.deleteAccountIsSuccess = false;
        });

        builder.addCase(deleteAccount.fulfilled, (state, action) => {
            state.deleteAccountLoding = false;
            state.deleteAccountData = action.payload;
            state.deleteAccountIsSuccess = true;
            state.deleteAccountIsError = false;
        });

        builder.addCase(deleteAccount.rejected, (state, action) => {
            state.deleteAccountIsError = true;
            state.deleteAccountIsSuccess = false;

        });

        builder.addCase(resetGetdeleteAccount.fulfilled, (state, action) => {
            return {
              deleteAccountLoding: false,
              deleteAccountData: {},
              deleteAccountIsSuccess: false,
              deleteAccountIsError: false,
            };
        });
    }
});



export default deleteAccountSlice.reducer;


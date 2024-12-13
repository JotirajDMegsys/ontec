import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {forgetUser} from '../../helpers/fakebackend_helper';

//*Action
export const userForget = createAsyncThunk('userForget', async data => {
    try {
        const response = await forgetUser(data);
        console.log('get responfrse');
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(new Error(JSON.stringify(error)))
    }
});
export const resetUserForget = createAsyncThunk('resetUserForget', async () => {
  return {};
});

const forgetPasswordSlice = createSlice({
  name: 'forgetuser',
  initialState: {
    userForgetIsLoading: false,
    userForgetData: {},

    // forgetPasswordDataCount: 0,
    userForgetIsSuccess: false,
    userForgetIsError: false,
  },
  extraReducers: builder => {
    builder.addCase(userForget.pending, (state, action) => {
      state.userForgetIsLoading = true;
      state.userForgetIsSuccess = false;
    });

    builder.addCase(userForget.fulfilled, (state, action) => {
      state.userForgetIsLoading = false;
      state.userForgetData = action.payload;
      state.userForgetIsSuccess = true;
      state.userForgetIsError = false;
    });

    builder.addCase(userForget.rejected, (state, action) => {
        console.log("JSON.parse(action.error.message)",JSON.parse(action.error.message));
        state.userForgetIsLoading = false;
      state.userForgetIsError = true;
      state.userForgetIsSuccess = false;
      state.userForgetData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;

    });
    builder.addCase(resetUserForget.fulfilled,() => {
      return {
        userForgetIsLoading: false,
        userForgetData: {},
        userForgetIsSuccess: false,
        userForgetIsError: false,
      };
    });
  },
});

export default forgetPasswordSlice.reducer;

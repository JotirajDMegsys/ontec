import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getStsMeterlist} from '../../helpers/fakebackend_helper';

export const getStsMeterList = createAsyncThunk(
  'stsMeter/getStsMeterList',
  async (data, {rejectWithValue}) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    try {
      const response = await getStsMeterlist(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

const getStsMeterSlice = createSlice({
  name: 'stsMeter',
  initialState: {
    stsMeterIsLoading: false,
    stsMeterData: {},
    stsMeterIsSuccess: false,
    stsMeterIsError: false,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getStsMeterList.pending, state => {
        state.stsMeterIsLoading = true;
        state.stsMeterIsSuccess = false;
        state.stsMeterIsError = false;
        state.errorMessage = null;
      })
      .addCase(getStsMeterList.fulfilled, (state, action) => {
        state.stsMeterIsLoading = false;
        state.stsMeterData = action.payload;
        state.stsMeterIsSuccess = true;
        state.stsMeterIsError = false;
      })
      .addCase(getStsMeterList.rejected, (state, action) => {
        state.stsMeterIsLoading = false;
        state.stsMeterIsError = true;
        state.stsMeterIsSuccess = false;
        state.errorMessage = action.payload || 'Something went wrong';
      });
  },
});

export default getStsMeterSlice.reducer;

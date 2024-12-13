import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getCompanyDetalis} from '../../helpers/fakebackend_helper';

//*Action
export const getCompanyDetalisByCompanyId = createAsyncThunk(
  'getCompanyDetalis',
  async data => {
    const response = await getCompanyDetalis(data);
    console.log(response, 'rrrrrrr');
    return response;
  },
);
const getCompanyDetalisByCompanyIdSlice = createSlice({
  name: 'companyDetalis',
  initialState: {
    getCompanyDetalisIsLoading: false,
    getCompanyDetalisData: [],
    getCompanyDetalisIsError: false,
    getCompanyDetalisIsSuccess: false,
  },
  extraReducers: builder => {
    builder.addCase(getCompanyDetalisByCompanyId.pending, (state, action) => {
      state.getCompanyDetalisIsLoading = true;
      state.getCompanyDetalisIsSuccess = false;
    });

    builder.addCase(getCompanyDetalisByCompanyId.fulfilled, (state, action) => {
      console.log(action.payload);
      state.getCompanyDetalisIsLoading = false;
      state.getCompanyDetalisData = action.payload;
      state.getCompanyDetalisIsSuccess = true;
      state.getCompanyDetalisIsError = false;
    });

    builder.addCase(getCompanyDetalisByCompanyId.rejected, (state, action) => {
      state.getCompanyDetalisIsError = true;
      state.getCompanyDetalisIsSuccess = false;
    });
  },
});
export default getCompanyDetalisByCompanyIdSlice.reducer;

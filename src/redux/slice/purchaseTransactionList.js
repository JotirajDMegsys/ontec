import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getStsTransactionList} from '../../helpers/fakebackend_helper';

//* Async Action (Thunk)
export const getTransactionList = createAsyncThunk(
  'transactionPurchase/getTransactionList',
  async (data, {rejectWithValue}) => {
    console.log('call PAI');

    try {
      const response = await getStsTransactionList(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);
const getTransactionListSlice = createSlice({
  name: 'transactionPurchase',
  initialState: {
    purchaseTransactionIsLoading: false,
    purchaseTransactionIsData: null,
    purchaseTransactionIsSuccess: false,
    purchaseTransactionIsError: false,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTransactionList.pending, state => {
        state.purchaseTransactionIsLoading = true;
        state.purchaseTransactionIsSuccess = false;
        state.purchaseTransactionIsError = false;
        state.errorMessage = null;
      })
      .addCase(getTransactionList.fulfilled, (state, action) => {
        console.log(action);
        state.purchaseTransactionIsLoading = false;
        state.purchaseTransactionIsData = action.payload;
        state.purchaseTransactionIsSuccess = true;
        state.purchaseTransactionIsError = false;
      })
      .addCase(getTransactionList.rejected, (state, action) => {
        state.purchaseTransactionIsLoading = false;
        state.purchaseTransactionIsError = true;
        state.purchaseTransactionIsSuccess = false;
        state.errorMessage = action.payload || 'Something went wrong';
      });
  },
});

export default getTransactionListSlice.reducer;

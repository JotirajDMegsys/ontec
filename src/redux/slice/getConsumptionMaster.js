import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getConsumptionMaster, getConsumptionDashboardData } from '../../helpers/fakebackend_helper'

//*Action
export const getConsumptionMasters = createAsyncThunk("getConsumptionMasterData", async (data) => {

    try {
        // console.log('get response---------99-', data);
      const response = await getConsumptionMaster(data);
        console.log('get response', response);
        return response;
  
    } catch (error) {
        // console.log("error123-----", error)
        return Promise.reject(error);
    }
  })

  export const getConsumptionData = createAsyncThunk("getConsumptionDashboardData", async (data) => {

    try {
        const response = await getConsumptionDashboardData(data);
        console.log('get response');
        return response;

    } catch (error) {
        // console.log("error123-----", error)
        return Promise.reject(error);
    }
})

const getConsumptionMasterSlice = createSlice({
    name: 'consumptionData',
    initialState: {
        getConsumptionMasterIsLoading: false,
        getConsumptionMasterData: [],
        // getConsumptionMasterDataCount: 0,
        getConsumptionMasterIsSuccess: false,
        getConsumptionMasterIsError: false,

        getConsumptionDashboardIsLoading: false,
        getConsumptionDashboardData: [],
        getConsumptionDashboardIsSuccess: false,
        getConsumptionDashboardIsError: false,
        getConsumptionLineXData:[],
        getConsumptionLineYData:[],
        consumptionProgressData:[],
        consumptionHourlyData:[],
    },
    extraReducers: (builder) => {

        builder.addCase(getConsumptionMasters.pending, (state, action) => {
            state.getConsumptionMasterIsLoading = true;
            state.getConsumptionMasterIsSuccess = false;
        });

        builder.addCase(getConsumptionMasters.fulfilled, (state, action) => {
            state.getConsumptionMasterIsLoading = false;
            state.getConsumptionMasterData = action.payload;
            state.getConsumptionMasterIsSuccess = true;
            state.getConsumptionMasterIsError = false;
        });

        builder.addCase(getConsumptionMasters.rejected, (state, action) => {
            state.getConsumptionMasterIsError = true;
            state.getConsumptionMasterIsSuccess = false;

        });

        builder.addCase(getConsumptionData.pending, (state, action) => {
            state.getConsumptionDashboardIsLoading = true;
            state.getConsumptionDashboardIsSuccess = false;
        });

        builder.addCase(getConsumptionData.fulfilled, (state, action) => {
            state.getConsumptionDashboardIsLoading = false;
            state.getConsumptionDashboardData = action.payload;
            state.getConsumptionLineXData = action.payload.lineChartDto.xAxisdata;
            state.getConsumptionLineYData = action.payload.lineChartDto.seriesLineData;
            state.consumptionProgressData = action.payload.guageChartDto;
            state.consumptionHourlyData = action.payload.hourlyData;
            state.getConsumptionDashboardIsSuccess = true;
            state.getConsumptionDashboardIsError = false;
        });

        builder.addCase(getConsumptionData.rejected, (state, action) => {
            state.getConsumptionDashboardIsError = true;
            state.getConsumptionDashboardIsSuccess = false;
        });

    }
});



export default getConsumptionMasterSlice.reducer;


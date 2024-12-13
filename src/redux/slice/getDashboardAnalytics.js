import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDashboardMaster, getDashboardAccountBalance, getDashboardPropertyStats, getDashboardConsumptionData } from '../../helpers/fakebackend_helper'

//*Action
export const getDashboardMasters = createAsyncThunk("getDashboardMasterData", async (data) => {

    try {
        console.log('get response---------99-', data);
      const response = await getDashboardMaster(data);
        // console.log('get response', response);
        return response;
  
    } catch (error) {
        return Promise.reject(error);
    }
  })

  export const getDashboardAccBalance = createAsyncThunk("getDashboardAccBalance", async (data) => {

    try {
      const response = await getDashboardAccountBalance(data);
        return response;
  
    } catch (error) {
        // console.log("error123-----", error)
        return Promise.reject(error);
    }
  })

  export const getDashboardConsumption = createAsyncThunk("getDashboardConsumption", async (data) => {

    try {
        // console.log('get response---------99-', data);
      const response = await getDashboardConsumptionData(data);
        // console.log('get response', response);
        return response;
  
    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(error);
    }
  })

  export const getPropertyStats = createAsyncThunk("getPropertyStats", async (data) => {
    console.log(data,'hrgiooerhogoherohghohor');

    try {
        console.log('get response---------99-', data);
      const response = await getDashboardPropertyStats(data);
        console.log('get response', response);
        return response;
  
    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(error);
    }
  })

//   export const getConsumptionData = createAsyncThunk("getConsumptionDashboardData", async (data) => {

//     try {
//         const response = await getConsumptionDashboardData(data);
//         console.log('get response');
//         return response;

//     } catch (error) {
//         console.log("error123-----", error)
//         return Promise.reject(error);
//     }
// })

const getDashboardAnalyticSlice = createSlice({
    name: 'dashboardData',
    initialState: {
        masterLoading: false,
        masterData: [],
        masterSuccess: false,
        masterError: false,

        balanceLoading: false,
        balanceData: [],
        balanceSuccess: false,
        balanceError: false,

        propStatLoading: false,
        propStatData: [],
        propStatSuccess: false,
        propStatError: false,

        consumptionLoading: false,
        consumptionData: [],
        consumptionSuccess: false,
        consumptionError: false,

        // getConsumptionDashboardIsLoading: false,
        // getConsumptionDashboardData: [],
        // getConsumptionDashboardIsSuccess: false,
        // getConsumptionDashboardIsError: false,
        // getConsumptionLineXData:[],
        // getConsumptionLineYData:[],
        // consumptionProgressData:[]
    },
    extraReducers: (builder) => {

        builder.addCase(getDashboardMasters.pending, (state, action) => {
            state.masterLoading = true;
            state.masterSuccess = false;
        });

        builder.addCase(getDashboardMasters.fulfilled, (state, action) => {
            // console.log("fullfilleddddddddddddddddddddddddd", action);
            state.masterLoading = false;
            state.masterData = action.payload;
            state.masterSuccess = true;
            state.masterError = false;
        });

        builder.addCase(getDashboardMasters.rejected, (state, action) => {
            state.masterError = true;
            state.masterSuccess = false;

        });

        builder.addCase(getDashboardAccBalance.pending, (state, action) => {
            state.balanceLoading = true;
            state.balanceSuccess = false;
        });

        builder.addCase(getDashboardAccBalance.fulfilled, (state, action) => {
            // console.log("fullfilleddddddddddddddddddddddddd", action);
            state.balanceLoading = false;
            state.balanceData = action.payload;
            state.balanceSuccess = true;
            state.balanceError = false;
        });

        builder.addCase(getDashboardAccBalance.rejected, (state, action) => {
            state.balanceError = true;
            state.balanceSuccess = false;

        });

        builder.addCase(getDashboardConsumption.pending, (state, action) => {
            state.consumptionLoading = true;
            state.consumptionSuccess = false;
        });

        builder.addCase(getDashboardConsumption.fulfilled, (state, action) => {
            // console.log("fullfilleddddddddddddddddddddddddd", action);
            state.consumptionLoading = false;
            state.consumptionData = action.payload;
            state.consumptionSuccess = true;
            state.consumptionError = false;
        });

        builder.addCase(getDashboardConsumption.rejected, (state, action) => {
            state.consumptionError = true;
            state.consumptionSuccess = false;

        });

        builder.addCase(getPropertyStats.pending, (state, action) => {
            state.propStatLoading = true;
            state.propStatSuccess = false;
        });

        builder.addCase(getPropertyStats.fulfilled, (state, action) => {
            console.log("fullfilleddddddddddddddddddddddddd--------------", action);
            state.propStatLoading = false;
            state.propStatData = action.payload;
            state.propStatSuccess = true;
            state.propStatError = false;
        });

        builder.addCase(getPropertyStats.rejected, (state, action) => {
            state.propStatError = true;
            state.propStatSuccess = false;

        });

        // builder.addCase(getConsumptionData.pending, (state, action) => {
        //     state.getConsumptionDashboardIsLoading = true;
        //     state.getConsumptionDashboardIsSuccess = false;
        // });

        // builder.addCase(getConsumptionData.fulfilled, (state, action) => {
        //     state.getConsumptionDashboardIsLoading = false;
        //     state.getConsumptionDashboardData = action.payload;
        //     state.getConsumptionLineXData = action.payload.lineChartDto.xAxisdata;
        //     state.getConsumptionLineYData = action.payload.lineChartDto.seriesLineData;
        //     state.consumptionProgressData = action.payload.guageChartDto;

        //     state.getConsumptionDashboardIsSuccess = true;
        //     state.getConsumptionDashboardIsError = false;
        // });

        // builder.addCase(getConsumptionData.rejected, (state, action) => {
        //     state.getConsumptionDashboardIsError = true;
        //     state.getConsumptionDashboardIsSuccess = false;
        // });

    }
});



export default getDashboardAnalyticSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllMeterList, getMetersFromMasters, uploadMetersFromMasters } from '../../helpers/fakebackend_helper'

//*Action
export const getMetersByPropertyId = createAsyncThunk("getMetersByPropertyId", async (data) => {
    //  console.log(data);
    const response = await getAllMeterList(data);
    // console.log(response);
    return response;
})

export const getmetersFromMasterData = createAsyncThunk("getmetersFromMasterData", async (data) => {
    console.log(data);
    try {
        const response = await getMetersFromMasters(data);
        // console.log(response,"response yJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBjaGV0YW4uMTk5MkBnbWFpbC5jb20iLCJjb21wYW55IjoiMSIsImV4cCI6MTcxODYzMTU2NSwiaXNzIjoiaHR0cDovL09udGVjLmNvbS8iLCJhdWQiOiJodHRwOi8vT250ZWMuY29tLyJ9.jeux_jgtabx_MYsb1U3p3jmMitd34cwvUUdjyq-M118uuuu");
        return response;
    } catch (error) {
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})

export const resetgetmetersFromMasterData= createAsyncThunk("resetgetmetersFromMasterData", async () => {
    return {};
});
export const resetUploadMetersFromMasterData= createAsyncThunk("resetUploadMetersFromMasterData", async () => {
    return {};
});
export const uploadMetersFromMasterData = createAsyncThunk("uploadMetersFromMasterData", async (data) => {
    try {
        const response = await uploadMetersFromMasters(data);
        return response;
    } catch (error) {
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})

const getMetersByPropertyIdSlice = createSlice({
    name: 'getMeters',
    initialState: {
        getMeterIsLoading: false,
        getMeterData: [],
        isOwner:{},
        getMeterDataCount: 0,
        getMeterIsSuccess: false,
        getMeterIsError: false,
        fetchMeterIsLoading: false,
        fetchMeterData: [],
        fetchMeterIsSuccess: false,
        fetchMeterIsError: false,
        importMeterIsLoading: false,
        importMeterData: [],
        importMeterIsSuccess: false,
        importMeterIsError: false
    },
    reducers:{
    clearStatesForImportmeter:(state)=>{
       
        state.importMeterIsLoading= false,
        state.importMeterData=[],
        state.importMeterIsSuccess=false,
        state.importMeterIsError=false
    }
},
    extraReducers: (builder) => {

        builder.addCase(getMetersByPropertyId.pending, (state, action) => {
            state.getMeterIsLoading = true;
            state.getMeterIsSuccess = false;
        });

        builder.addCase(getMetersByPropertyId.fulfilled, (state, action) => {
            state.getMeterIsLoading = false;
            state.getMeterData = action.payload.meters;
            state.getMeterDataCount = action.payload.totalMeter;
            state.isOwner = action.payload.isOwner;
            
            state.getMeterIsSuccess = true;
            state.getMeterIsError = false;
        });

        builder.addCase(getMetersByPropertyId.rejected, (state, action) => {
            state.isError = true;
            state.getMeterIsSuccess = false;

        });

        builder.addCase(getmetersFromMasterData.pending, (state, action) => {
            state.fetchMeterIsLoading = true;
            state.fetchMeterIsSuccess = false;
        });

        builder.addCase(getmetersFromMasterData.fulfilled, (state, action) => {
            state.fetchMeterIsLoading = false;
            state.fetchMeterData = action.payload;
            state.fetchMeterIsSuccess = true;
        });

        builder.addCase(getmetersFromMasterData.rejected, (state, action) => {
            state.fetchMeterIsLoading = false;
            state.fetchMeterIsError = true;
            state.fetchMeterData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
            state.fetchMeterIsSuccess = false;
        });
        builder.addCase(resetgetmetersFromMasterData.fulfilled, () => {
            return {
                fetchMeterIsLoading : false,
                fetchMeterIsError : false,
                fetchMeterData : [],
                fetchMeterIsSuccess :false,
            };
        });

        builder.addCase(uploadMetersFromMasterData.pending, (state, action) => {
            state.importMeterIsLoading = true;
            state.importMeterIsSuccess = false;
        });

        builder.addCase(uploadMetersFromMasterData.fulfilled, (state, action) => {
            // console.log("action",action.payload);
            state.importMeterIsLoading = false;
            state.importMeterData = action.payload;
            state.importMeterIsSuccess = true;
        });
        
        builder.addCase(resetUploadMetersFromMasterData.fulfilled, () => {
            return(
                importMeterIsLoading= false,
                importMeterData=[],
                importMeterIsSuccess= false,
                importMeterIsError= false
            )
            
        });
        

        builder.addCase(uploadMetersFromMasterData.rejected, (state, action) => {
            state.importMeterIsLoading = false;
            state.importMeterIsError = true;
            state.importMeterData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
            state.importMeterIsSuccess = false;
        });

    }
});


export const {clearStatesForImportmeter} =getMetersByPropertyIdSlice.actions

export default getMetersByPropertyIdSlice.reducer;


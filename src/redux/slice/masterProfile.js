import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { profileData } from '../../helpers/fakebackend_helper'


//*Action
export const getMasterProfile = createAsyncThunk("getMasterProfile", async (data) => {
    // console.log("kooooooooooooooo");
    const response = await profileData(data);
    // console.log("response:",response);
   return response;
})


export const getMasterProfileReset = createAsyncThunk("getMasterProfileReset", async () => {
    console.log("jiewfjpjepfiiii");
    return {}
});



const getMasterProfileIdSlice = createSlice({
    name: 'masterProflie',
    initialState: {
        getMasterProfileIsLoading: false,
        communicationTypeList: [],
        proofDocumentTypeList: [],
        roleMasterList: [],
        statusList: [],
        titleList: [],
        getMasterProfileIsSuccess: false,
        getMasterProfileIsError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(getMasterProfile.pending, (state, action) => {
            state.getMasterProfileIsLoading = true;
            state.getMasterProfileIsSuccess = false;
        });

        builder.addCase(getMasterProfile.fulfilled, (state, action) => {
            console.log("action",action.payload.communicationTypeList);
            state.getMasterProfileIsLoading = false;
            state.communicationTypeList = action.payload.communicationTypeList;
            state.proofDocumentTypeList = action.payload.proofDocumentTypeList;
            state.roleMasterList = action.payload.roleMasterList;
            state.statusList = action.payload.statusList;
            state.titleList = action.payload.titleList;
            state.getMasterProfileIsSuccess = true;
            state.getMasterProfileIsError = false;
        });

        builder.addCase(getMasterProfile.rejected, (state, action) => {
            state.isError = true;
            state.getMasterProfileIsSuccess = false;

        });

        builder.addCase(getMasterProfileReset.fulfilled, () => {
            return {
                getMasterProfileIsLoading: false,
        communicationTypeList: [],
        proofDocumentTypeList: [],
        roleMasterList: [],
        statusList: [],
        titleList: [],
        getMasterProfileIsSuccess: false,
        getMasterProfileIsError: false,
            };
        });

    }
});



export default getMasterProfileIdSlice.reducer;


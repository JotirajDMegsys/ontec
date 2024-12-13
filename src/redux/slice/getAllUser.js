import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get_propertyUser_by_ownerid } from '../../helpers/fakebackend_helper'

//*Action
export const getUserByOwnerId = createAsyncThunk("getUserByOwnerId", async (data) => {
    //  console.log("++++++++++++");
    const response = await get_propertyUser_by_ownerid(data);
    // console.log('ijofjejfojo')
    // console.log("responsefrom owner",response);
    return response;
})

export const resetTitle = createAsyncThunk("resetTitle", async () => {
    return{}
})

const getUserByOwnerIdSlice = createSlice({
    name: 'getPropertyUser',
    initialState: {
        getUserIsLoading: false,
        getUserData: [],
    ggetUserTypeList:[],
       getUserTitleList:[],
        // getUserDataCount: 0,
        getUserIsSuccess: false,
        getUserIsError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(getUserByOwnerId.pending, (state, action) => {
            state.getUserIsLoading = true;
            state.getUserIsSuccess = false;
        });

        builder.addCase(getUserByOwnerId.fulfilled, (state, action) => {
            state.getUserIsLoading = false;
            state.getUserData = action.payload.propertiesList;
            state.getUserTypeList=action.payload.userTypeList;
            state.getUserTitleList = action.payload.titleList;
            state.getUserIsSuccess = true;
            state.getUserIsError = false;
        });

        builder.addCase(getUserByOwnerId.rejected, (state, action) => {
            state.isError = true;
            state.getUserIsSuccess = false;

        });
      
        builder.addCase(resetTitle.fulfilled, () => {
            state.getUserIsLoading = false;
            state.getUserData = [];
            state.ggetUserTypeList = [];
            state.getUserTitleList = [];
            // state.getUserDataCount = 0;
            state.getUserIsSuccess = false;
            state.getUserIsError = false;
          });


    }
});



export default getUserByOwnerIdSlice.reducer;


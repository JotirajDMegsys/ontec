import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get_tenant_list } from '../../helpers/fakebackend_helper'

//*Action
export const getAllTenantList = createAsyncThunk("getAllTenant", async (data) => {
    //  console.log(data);
    const response = await get_tenant_list(data);
    
    // console.log("gettenantlist",response);
    return response;
});

const getTenantByOwnerIdSlice = createSlice({
    name: 'getTenant',
    initialState: {
        getTenantIsLoading: false,
        getRole:"",
        getTenantData: [],
        getOwner:[],
        getAssociates:[],
        // getTenantDataCount: 0,
        getTenantIsSuccess: false,
        getTenantIsError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(getAllTenantList.pending, (state, action) => {
            state.getTenantIsLoading = true;
            state.getTenantIsSuccess = false;
        });

        builder.addCase(getAllTenantList.fulfilled, (state, action) => {
        
            state.getTenantIsLoading = false;
            state.getRole = action.payload.roleForProperty;

            state.getTenantData =  action.payload.tenant;
            state.getOwner = action.payload.owner;
            state.getAssociates = action.payload.associates;
            state.getTenantIsSuccess = true;
            state.getTenantIsError = false;
        });

        builder.addCase(getAllTenantList.rejected, (state, action) => {
            state.isError = true;
            state.getTenantIsSuccess = false;
            state.getTenantIsLoading = false;
        });

    }
});



export default getTenantByOwnerIdSlice.reducer;


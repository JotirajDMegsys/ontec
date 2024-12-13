import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {  getAssetvalue } from '../../helpers/fakebackend_helper'

//*Action
export const getAssetSettings = createAsyncThunk("getAssetSettings", async (data) => {
    console.log("data-----------------------------------------------------------------------",data);
    try {
        const response = await getAssetvalue(data);
        // console.log(response,'PPPPPPPPPPPPPPPPPPPP');
        return response;
    } catch (error) {
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})

export const restAssetSettings = createAsyncThunk("restAssetSettings", async () => {
    // console.log('hfihreofhor');
    return {};
});



const getAssetSettingsSlice = createSlice({
    name: 'getAssetSetting',
    initialState: {
        loading: false,
        data: [],
        success: false,
        error: false,
    },
    extraReducers: (builder) => {

        builder.addCase(getAssetSettings.pending, (state, action) => {
            state.loading = true;
            state.success = false;
            state.error = false;

        });

        builder.addCase(getAssetSettings.fulfilled, (state, action) => {
            console.log("action------------",action.payload);
            state.loading = false;
            state.data = action.payload;
            state.success = true;
            state.error = false;
        });

        builder.addCase(getAssetSettings.rejected, (state, action) => {
            state.error = true;
            state.data =  JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
            state.loading = false;
            state.success = false;

        });
        builder.addCase(restAssetSettings.fulfilled, (state, action) => {
           
            return {
            loading: false,
            data: [],
            success: false,
            error: false,
            }
        });


    }
});



export default getAssetSettingsSlice.reducer;


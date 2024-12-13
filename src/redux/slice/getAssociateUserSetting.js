// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { getTopupSettingValue } from '../../helpers/fakebackend_helper'

// //*Action
// export const topupSetting = createAsyncThunk("topupSetting", async (data) => {
//     //  console.log(data," topsettttttttttttttttttttttttttttttttttttt=======================================================================");
//     // const response = await getTopupSettingValue(data);
//     // // console.log(response);
//     // return response;
//     try {
//         const response = await getTopupSettingValue(data);
//         console.log('get response');
//         return response;

//     } catch (error) {
//         console.log("error123-----", error)
//         return Promise.reject(new Error(JSON.stringify(error)))
//     }
// })

// export const resettopupSetting = createAsyncThunk("resettopupSetting", async () => {
//     return {};
// });

// const gettopupSettingIdSlice = createSlice({
//     name: 'topup',
//     initialState: {
//         topupSettingValueIsLoading: false,
//         topupSettingValueData: [],
//         topupSettingValueSuccess: false,
//         topupSettingValueIsError: false,
//     },
//     extraReducers: (builder) => {

//         builder.addCase(topupSetting.pending, (state, action) => {
//             state.topupSettingValueIsLoading = true;
//             state.topupSettingValueSuccess = false;
//         });

//         builder.addCase(topupSetting.fulfilled, (state, action) => {
//             state.topupSettingValueIsLoading = false;
//             state.topupSettingValueData = action.payload;
//             state.topupSettingValueSuccess = true;
//             state.topupSettingValueIsError = false;
//         });

//         builder.addCase(topupSetting.rejected, (state, action) => {
//             state.topupSettingValueIsError = true;
//             state.topupSettingValueSuccess = false;
//             state.topupSettingValueData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;

//         });
//         builder.addCase(resettopupSetting.fulfilled, (state, action) => {
//             return {
//                 topupSettingValueIsLoading: false,
//         topupSettingValueData: [],
//         topupSettingValueSuccess: false,
//         topupSettingValueIsError: false,
//             };
//         });

//     }
// });



// export default gettopupSettingIdSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTopupSettingValue } from '../../helpers/fakebackend_helper'

//*Action
export const topupSetting = createAsyncThunk("topupSetting", async (data) => {
    //  console.log(data," topsettttttttttttttttttttttttttttttttttttt=======================================================================");
    // const response = await getTopupSettingValue(data);
    // // console.log(response);
    // return response;
    try {
        const response = await getTopupSettingValue(data);
        console.log('get response');
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})

export const resettopupSetting = createAsyncThunk("resettopupSetting", async () => {
    return {};
});

const gettopupSettingIdSlice = createSlice({
    name: 'topup',
    initialState: {
        topupSettingValueIsLoading: false,
        topupSettingValueData: [],
        topupSettingValueSuccess: false,
        topupSettingValueIsError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(topupSetting.pending, (state, action) => {
            state.topupSettingValueIsLoading = true;
            state.topupSettingValueSuccess = false;
        });

        builder.addCase(topupSetting.fulfilled, (state, action) => {
            state.topupSettingValueIsLoading = false;
            state.topupSettingValueData = action.payload;
            state.topupSettingValueSuccess = true;
            state.topupSettingValueIsError = false;
        });

        builder.addCase(topupSetting.rejected, (state, action) => {
            state.topupSettingValueIsError = true;
            state.topupSettingValueSuccess = false;
            state.topupSettingValueData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;

        });
        builder.addCase(resettopupSetting.fulfilled, (state, action) => {
            return {
                topupSettingValueIsLoading: false,
        topupSettingValueData: [],
        topupSettingValueSuccess: false,
        topupSettingValueIsError: false,
            };
        });

    }
});



export default gettopupSettingIdSlice.reducer;



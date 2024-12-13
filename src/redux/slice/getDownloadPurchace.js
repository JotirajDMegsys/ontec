// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { getDownloadPurchaceStatement } from '../../helpers/fakebackend_helper'

// //*Action
// export const getDownloadPurchace = createAsyncThunk("getDownloadPurchace", async (data) => {
//     console.log(data);
//     try {
//         const response = await getDownloadPurchaceStatement(data);
//         console.log('get response',response);
//         return response;

//     } catch (error) {
//         console.log("error123-----", error)
//         return Promise.reject(error);
//     }
// });

// export const resetGetDownloadPurchace = createAsyncThunk("resetGetDownloadPurchace", async () => {
//     log('call tothe reset')
//     return {};
// });


// const getDownloadPurchaceIdSlice = createSlice({
//     name: 'downloadPurchace',
//     initialState: {
//         loading: false,
//         purchaceData: [],
//         success: false,
//         error: false,
//     },
//     extraReducers: (builder) => {

//         builder.addCase(getDownloadPurchace.pending, (state, action) => {
//             state.loading = true;
//             state.success = false;
//         });

//         builder.addCase(getDownloadPurchace.fulfilled, (state, action) => {
//             console.log(action,"jjjjjj");
//             state.loading = false;
//             state.purchaceData = action.payload.purchaceReceiptUrl;
//         state.success = true;
//             state.error = false;
//         });

//         builder.addCase(getDownloadPurchace.rejected, (state, action) => {
//             state.loading = false;
//             state.success = false;
//             state.error = true;

//         });
       

//         builder.addCase(resetGetDownloadPurchace.fulfilled, (state, action) => {
//             return {
//                 loading: false,
//                 purchaceData: [],
//                 success: false,
//                 error: false,
//             };
//         });

     

//     }
// });



// export default getDownloadPurchaceIdSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDownloadPurchaceStatement } from '../../helpers/fakebackend_helper'

//*Action
export const getDownloadPurchace = createAsyncThunk("getDownloadPurchace", async (data) => {
    console.log(data);
    try {
        const response = await getDownloadPurchaceStatement(data);
        console.log('get response',response);
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(error);
    }
});

export const resetGetDownloadPurchace = createAsyncThunk("resetGetDownloadPurchace", async () => {
    // log('call tothe reset')
    console.log("jjjjjj");

    return {};
});


const getDownloadPurchaceIdSlice = createSlice({
    name: 'downloadPurchace',
    initialState: {
        loading: false,
        purchaceData: "",
        success: false,
        error: false,

   
        
    },
    extraReducers: (builder) => {

        builder.addCase(getDownloadPurchace.pending, (state, action) => {
            state.loading = true;
            state.success = false;
        });

        builder.addCase(getDownloadPurchace.fulfilled, (state, action) => {
            console.log(action,"jjjjjj");
            state.loading = false;
            state.purchaceData = action.payload.purchaceReceiptUrl;
            state.success = true;
            state.error = false;
        });

        builder.addCase(getDownloadPurchace.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;

        });
       

        builder.addCase(resetGetDownloadPurchace.fulfilled,() => {
            return {
                loading: false,
                purchaceData: "",
                success: false,
                error: false,
            };
        });

     

    }
});



export default getDownloadPurchaceIdSlice.reducer;


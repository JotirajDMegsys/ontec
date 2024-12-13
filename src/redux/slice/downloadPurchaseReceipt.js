import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getdownloadPurchaseReceipt, getdownloadTransactionStatement } from '../../helpers/fakebackend_helper'

//*Action
export const downloadPurchaseReceipt = createAsyncThunk("downloadPurchaseReceipt", async (data) => {
    try {
        console.log('=================data===================');
        console.log(data);
        console.log('====================================');
        const response = await getdownloadPurchaseReceipt(data);
        console.log('====================================');
        console.log(response);
        console.log('====================================');
        return response;
 
        // const response = await getdownloadTransactionStatement(data);
        // // console.log('get response',response);
        // return response;
    } catch (error) {
        console.error("Error in downloadPurchaseReceipt:", error);
        return Promise.reject(purchaseError);
    }
});



// const getdownloadPurchaseReceiptIdSlice = createSlice({
//     name: 'downloadReceipt',
//     initialState: {
//         purchaseloading: false,
//         purchaseDownloaddata: "",
//         downloaddataMessage: "",
//         purchaseSuccess: false,
//         purchaseError: false,
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(downloadPurchaseReceipt.pending, (state) => {
//                 state.purchaseloading = true;
//                 state.purchaseSuccess = false;
//             })
//             .addCase(downloadPurchaseReceipt.fulfilled, (state, action) => {
//                 console.log('====================================');
//                 console.log(action.payload);
//                 console.log('====================================');
//                 state.purchaseloading = false;
//                 state.purchaseDownloaddata = action.payload;
//                 // state.downloaddataMessage = action.payload;
//                 state.purchaseSuccess = true;
//                 state.purchaseError = false;
//             })
//             .addCase(downloadPurchaseReceipt.rejected, (state) => {
//                 state.purchaseloading = false;
//                 state.purchaseSuccess = false;
//                 state.purchaseError = true;
//             })
//             .addCase(resetDownloadPurchaseReceipt.fulfilled, () => ({
//                 purchaseloading: false,
//                 purchaseDownloaddata: "",
//                 downloaddataMessage: "",
//                 purchaseSuccess: false,
//                 purchaseError: false,
//             }));
//     }
// });

// export default getdownloadPurchaseReceiptIdSlice.reducer;



const getdownloadPurchaseReceiptIdSlice = createSlice({
    name: 'downloadReceipt',
    initialState: {
        purchaseloading: false,
        purchaseDownloaddata: "",
        downloaddataMessage: "",
        purchaseSuccess: false,
        purchaseError: false,
    },
    reducers: {
        resetDownloadState: (state) => {
            state.purchaseloading = false;
            state.purchaseDownloaddata = "";
            state.purchaseSuccess = false;
            state.purchaseError = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(downloadPurchaseReceipt.pending, (state) => {
                state.purchaseloading = true;
                state.purchaseSuccess = false;
                state.purchaseError = false; 
            })
            .addCase(downloadPurchaseReceipt.fulfilled, (state, action) => {
                console.log('====================================');
                console.log(action.payload);
                console.log('====================================');
                state.purchaseloading = false; 
                state.purchaseDownloaddata = action.payload;
                state.purchaseSuccess = true;
                state.purchaseError = false; 
            })
            .addCase(downloadPurchaseReceipt.rejected, (state) => {
                state.purchaseloading = false; 
                state.purchaseSuccess = false; 
                state.purchaseError = true; 
            })
        
    },
});

export default getdownloadPurchaseReceiptIdSlice.reducer;

export const { resetDownloadState } = getdownloadPurchaseReceiptIdSlice.actions;

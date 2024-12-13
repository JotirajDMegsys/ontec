// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { getdownloadTransactionStatement, getTransactionData } from '../../helpers/fakebackend_helper'

// //*Action
// export const downloadTransactionStatement = createAsyncThunk("downloadTransactionStatement", async (data) => {
//     try {
//         const response = await getdownloadTransactionStatement(data);
//         console.log('get response',response);
//         return response;

//     } catch (error) {
//         console.log("error123-----", error)
//         return Promise.reject(error);
//     }
// });

// export const resetDownloadTransactionStatement = createAsyncThunk("resetAddPropertyState", async () => {
//     return {};
// });


// const gedownloadTransactionStatementIdSlice = createSlice({
//     name: 'downloadStatement',
//     initialState: {
//         loading: false,
//         downloaddata: "",
//         success: false,
//         error: false,

   
        
//     },
//     extraReducers: (builder) => {

//         builder.addCase(downloadTransactionStatement.pending, (state, action) => {
//             state.loading = true;
//             state.success = false;
//         });

//         builder.addCase(downloadTransactionStatement.fulfilled, (state, action) => {
//             console.log(action,"jjjjjj");
//             state.loading = false;
//             state.downloaddata = action.payload;
//             state.success = true;
//             state.error = false;
//         });

//         builder.addCase(downloadTransactionStatement.rejected, (state, action) => {
//             state.loading = false;
//             state.success = false;
//             state.error = true;

//         });
       

//         builder.addCase(resetDownloadTransactionStatement.fulfilled, (state, action) => {
//             return {
//                 loading: false,
//                 downloaddata: "",
//                 success: false,
//                 error: false,
//             };
//         });

     

//     }
// });



// export default gedownloadTransactionStatementIdSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getdownloadTransactionStatement, getTransactionData } from '../../helpers/fakebackend_helper'

//*Action
export const downloadTransactionStatement = createAsyncThunk("downloadTransactionStatement", async (data) => {
    console.log(data);
    try {
        const response = await getdownloadTransactionStatement(data);
        // console.log('get response',response);
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(error);
    }
});


export const resetDownloadTransactionStatement = createAsyncThunk("resetDownloadTransactionStatement", async () => {
    return {}
});


const gedownloadTransactionStatementIdSlice = createSlice({
    name: 'downloadStatement',
    initialState: {
        loading: false,
        downloaddata: "",
        downloaddataMessage:"",
        success: false,
        error: false,

   
        
    },
    extraReducers: (builder) => {

        builder.addCase(downloadTransactionStatement.pending, (state, action) => {
            state.loading = true;
            state.success = false;
        });

        builder.addCase(downloadTransactionStatement.fulfilled, (state, action) => {
            console.log(action,"jjjjjj");
            state.loading = false;
            state.downloaddata = action.payload.documentUrl;
            state.downloaddataMessage = action.payload.responseMsg;

            state.success = true;
            state.error = false;
        });

        builder.addCase(downloadTransactionStatement.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;

        });
       

        builder.addCase(resetDownloadTransactionStatement.fulfilled, () => {
            return {
                loading: false,
                downloaddata: "",
                downloaddataMessage:"",
                success: false,
                error: false,
            };
        });

     

    }
});



export default gedownloadTransactionStatementIdSlice.reducer;


// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// // import { createTopupRequestAPI, getPaymentmethodsAPI, getBankAccountsAPI, getTopupDetailsAPI } from '../../helpers/fakebackend_helper'
// // import { useState } from 'react'

// // //*Action
// // export const createTopupRequest = createAsyncThunk("createTopupRequest", async (user) => {
// //     try {
// //         const response = await createTopupRequestAPI(user);
// //         console.log('get response', response);
// //         return response;

// //     } catch (error) {
// //         console.log("error123-----", error)
// //         return Promise.reject(new Error(JSON.stringify(error)))
// //     }
// // })

// // export const getPaymentmethods = createAsyncThunk("getPaymentmethods", async (user) => {
// //     try {
// //         const response = await getPaymentmethodsAPI(user);
// //         console.log('get response', response);
// //         return response;

// //     } catch (error) {
// //         console.log("error123-----", error)
// //         return Promise.reject(new Error(JSON.stringify(error)))
// //     }
// // })

// // export const getBankAccounts = createAsyncThunk("getBankAccounts", async (user) => {
// //     try {
// //         const response = await getBankAccountsAPI(user);
// //         console.log('get response', response);
// //         return response;

// //     } catch (error) {
// //         console.log("error123-----", error)
// //         return Promise.reject(new Error(JSON.stringify(error)))
// //     }
// // })

// // export const getTopupDetails = createAsyncThunk("getTopupDetails", async (user) => {
// //     try {
// //         const response = await getTopupDetailsAPI(user);
// //         console.log('get response', response);
// //         return response;

// //     } catch (error) {
// //         console.log("error123-----", error)
// //         return Promise.reject(new Error(JSON.stringify(error)))
// //     }
// // })

// // export const resetToupRequest = createAsyncThunk("resetToupRequest", async () => {
// //     return {};
// // });

// // export const resetToupDetails = createAsyncThunk("resetToupDetails", async () => {
// //     return {};
// // });

// // const topupSlice = createSlice({
// //     name: 'topupRequest',
// //     initialState: {
// //         isLoading: false,
// //         data: {},
// //         isSuccess: false,
// //         isError: false,
// //         payMethodsIsLoading: false,
// //         payMethodsData: {},
// //         payMethodsIsSuccess: false,
// //         payMethodsIsError: false,
// //         banksIsLoading: false,
// //         banksData: {},
// //         banksIsSuccess: false,
// //         banksIsError: false,
// //         topupIsLoading: false,
// //         topupData: [],
// //         topupIsSuccess: false,
// //         topupIsError: false,
// //         // error
// //     },
// //     extraReducers: (builder) => {

// //         builder.addCase(createTopupRequest.pending, (state, action) => {
// //             state.isLoading = true;
// //             state.isSuccess = false;
// //         });

// //         builder.addCase(createTopupRequest.fulfilled, (state, action) => {
// //             console.log("==========fullfilled", action.payload);
// //             state.isLoading = false;
// //             state.data = action.payload;
// //             state.isSuccess = true;
// //             state.isError = false;
// //         });

// //         builder.addCase(createTopupRequest.rejected, (state, action) => {
// //             state.isError = true;
// //             state.data = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
// //             state.isSuccess = false;

// //         });

// //         builder.addCase(getPaymentmethods.pending, (state, action) => {
// //             state.payMethodsIsLoading = true;
// //             state.payMethodsIsSuccess = false;
// //         });

// //         builder.addCase(getPaymentmethods.fulfilled, (state, action) => {
// //             console.log("==========fullfilled", action.payload);
// //             state.payMethodsIsLoading = false;
// //             state.payMethodsData = action.payload;
// //             state.payMethodsIsSuccess = true;
// //             state.payMethodsIsError = false;
// //         });

// //         builder.addCase(getPaymentmethods.rejected, (state, action) => {
// //             state.payMethodsIsError = true;
// //             state.payMethodsData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
// //             state.payMethodsIsSuccess = false;

// //         });

// //         builder.addCase(getBankAccounts.pending, (state, action) => {
// //             state.banksIsLoading = true;
// //             state.banksIsSuccess = false;
// //         });

// //         builder.addCase(getBankAccounts.fulfilled, (state, action) => {
// //             console.log("==========fullfilled", action.payload);
// //             state.banksIsLoading = false;
// //             state.banksData = action.payload;
// //             state.banksIsSuccess = true;
// //             state.banksIsError = false;
// //         });

// //         builder.addCase(getBankAccounts.rejected, (state, action) => {
// //             state.banksIsError = true;
// //             state.banksData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
// //             state.banksIsSuccess = false;

// //         });

// //         builder.addCase(getTopupDetails.pending, (state, action) => {
// //             state.topupIsLoading = true;
// //             state.topupIsSuccess = false;
// //         });

// //         builder.addCase(getTopupDetails.fulfilled, (state, action) => {
// //             console.log("==========fullfilled", action.payload);
// //             state.topupIsLoading = false;
// //             state.topupData = action.payload;
// //             state.topupIsSuccess = true;
// //             state.topupIsError = false;
// //         });

// //         builder.addCase(getTopupDetails.rejected, (state, action) => {
// //             state.topupIsError = true;
// //             state.topupData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
// //             state.topupIsSuccess = false;

// //         });

// //         builder.addCase(resetToupRequest.fulfilled, () => {
// //             return {
// //                 isLoading: false,
// //                 data: {},
// //                 isSuccess: false,
// //                 isError: false
// //             };
// //         });

// //         builder.addCase(resetToupDetails.fulfilled, () => {
// //             return {
// //                 topupIsLoading: false,
// //                 topupData: [],
// //                 topupIsSuccess: false,
// //                 topupIsError: false,
// //             };
// //         });

// //     }
// // });

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { createTopupRequestAPI, getPaymentmethodsAPI, getBankAccountsAPI, getTopupDetailsAPI, cancelTransactions } from '../../helpers/fakebackend_helper'
// import { useState } from 'react'

// //*Action
// export const createTopupRequest = createAsyncThunk("createTopupRequest", async (user) => {
//     try {
//         const response = await createTopupRequestAPI(user);
//         console.log('get response', response);
//         return response;

//     } catch (error) {
//         console.log("error123-----", error)
//         return Promise.reject(new Error(JSON.stringify(error)))
//     }
// })

// export const getPaymentmethods = createAsyncThunk("getPaymentmethods", async (user) => {
//     try {
//         const response = await getPaymentmethodsAPI(user);
//         console.log('get response', response);
//         return response;

//     } catch (error) {
//         console.log("error123-----", error)
//         return Promise.reject(new Error(JSON.stringify(error)))
//     }
// })

// export const getBankAccounts = createAsyncThunk("getBankAccounts", async (user) => {
//     try {
//         const response = await getBankAccountsAPI(user);
//         console.log('get response', response);
//         return response;

//     } catch (error) {
//         console.log("error123-----", error)
//         return Promise.reject(new Error(JSON.stringify(error)))
//     }
// })

// export const getTopupDetails = createAsyncThunk("getTopupDetails", async (user) => {
//     try {
//         const response = await getTopupDetailsAPI(user);
//         console.log('get response', response);
//         return response;

//     } catch (error) {
//         console.log("error123-----", error)
//         return Promise.reject(new Error(JSON.stringify(error)))
//     }
// })

// export const transactionCancel = createAsyncThunk("transactionCancel", async (data) => {
//     try {
//         const response = await cancelTransactions(data);
        
//         console.log(response,'PPPPPPPPPPPPPPPPPPPP');
//         return response;
//     } catch (error) {
//         return Promise.reject(new Error(JSON.stringify(error)))
//     }
// })

// export const resetTransactionCancel  = createAsyncThunk("resetTransactionCancel", async () => {
//     console.log('hfihreofhor');
//     return {};
// });





// export const resetToupRequest = createAsyncThunk("resetToupRequest", async () => {
//     return {};
// });

// export const resetToupDetails = createAsyncThunk("resetToupDetails", async () => {
//     return {};
// });

// const topupSlice = createSlice({
//     name: 'topupRequest',
//     initialState: {
//         isLoading: false,
//         data: {},
//         isSuccess: false,
//         isError: false,
//         payMethodsIsLoading: false,
//         payMethodsData: {},
//         payMethodsIsSuccess: false,
//         payMethodsIsError: false,
//         banksIsLoading: false,
//         banksData: {},
//         banksIsSuccess: false,
//         banksIsError: false,
//         topupIsLoading: false,
//         topupData: [],
//         topupIsSuccess: false,
//         topupIsError: false,
//         cancelTransactionData:'',
//         cancelTransactionLoading:false,
//         cancelTransactionSuccess:false,
//         cancelTransactionError:false,

//         // error

//     },
//     extraReducers: (builder) => {

//         builder.addCase(createTopupRequest.pending, (state, action) => {
//             state.isLoading = true;
//             state.isSuccess = false;
//         });

//         builder.addCase(createTopupRequest.fulfilled, (state, action) => {
//             console.log("==========fullfilled", action.payload);
//             state.isLoading = false;
//             state.data = action.payload;
//             state.isSuccess = true;
//             state.isError = false;
//         });

//         builder.addCase(createTopupRequest.rejected, (state, action) => {
//             state.isError = true;
//             state.data = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
//             state.isSuccess = false;

//         });

//         builder.addCase(getPaymentmethods.pending, (state, action) => {
//             state.payMethodsIsLoading = true;
//             state.payMethodsIsSuccess = false;
//         });

//         builder.addCase(getPaymentmethods.fulfilled, (state, action) => {
//             console.log("==========fullfilled", action.payload);
//             state.payMethodsIsLoading = false;
//             state.payMethodsData = action.payload;
//             state.payMethodsIsSuccess = true;
//             state.payMethodsIsError = false;
//         });

//         builder.addCase(getPaymentmethods.rejected, (state, action) => {
//             state.payMethodsIsError = true;
//             state.payMethodsData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
//             state.payMethodsIsSuccess = false;

//         });

//         builder.addCase(getBankAccounts.pending, (state, action) => {
//             state.banksIsLoading = true;
//             state.banksIsSuccess = false;
//         });

//         builder.addCase(getBankAccounts.fulfilled, (state, action) => {
//             console.log("==========fullfilled", action.payload);
//             state.banksIsLoading = false;
//             state.banksData = action.payload;
//             state.banksIsSuccess = true;
//             state.banksIsError = false;
//         });

//         builder.addCase(getBankAccounts.rejected, (state, action) => {
//             state.banksIsError = true;
//             state.banksData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
//             state.banksIsSuccess = false;

//         });

//         builder.addCase(getTopupDetails.pending, (state, action) => {
//             state.topupIsLoading = true;
//             state.topupIsSuccess = false;
//         });

//         builder.addCase(getTopupDetails.fulfilled, (state, action) => {
//             console.log("==========fullfilled", action.payload);
//             state.topupIsLoading = false;
//             state.topupData = action.payload;
//             state.topupIsSuccess = true;
//             state.topupIsError = false;
//         });

//         builder.addCase(getTopupDetails.rejected, (state, action) => {
//             state.topupIsError = true;
//             state.topupData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
//             state.topupIsSuccess = false;

//         });

//         builder.addCase(resetToupRequest.fulfilled, () => {
//             return {
//                 isLoading: false,
//                 data: {},
//                 isSuccess: false,
//                 isError: false
//             };
//         });

//         builder.addCase(resetToupDetails.fulfilled, () => {
//             return {
//                 topupIsLoading: false,
//                 topupData: [],
//                 topupIsSuccess: false,
//                 topupIsError: false,
//             };
//         });



//         builder.addCase(transactionCancel.pending, (state, action) => {
//             state.cancelTransactionLoading = true;
//             state.cancelTransactionSuccess = false;
//         });

//         builder.addCase(transactionCancel.fulfilled, (state, action) => {
//             console.log("==========fullfilled", action.payload);
//             state.cancelTransactionLoading = false;
//             state.cancelTransactionData = action.payload;
//             state.cancelTransactionSuccess = true;
//             state.cancelTransactionError = false;
//         });

//         builder.addCase(transactionCancel.rejected, (state, action) => {
//             state.cancelTransactionError = true;
//             state.cancelTransactionData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
//             state.cancelTransactionSuccess = false;

//         });

//         builder.addCase(resetTransactionCancel.fulfilled, () => {
//             return {
//                 cancelTransactionData:'',
//                 cancelTransactionLoading:false,
//                 cancelTransactionSuccess:false,
//                 cancelTransactionError:false,
//             };
//         });





//     }
// });



// export default topupSlice.reducer;




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createTopupRequestAPI, getPaymentmethodsAPI, getBankAccountsAPI, getTopupDetailsAPI, cancelTransactions } from '../../helpers/fakebackend_helper'
import { useState } from 'react'

//*Action
export const createTopupRequest = createAsyncThunk("createTopupRequest", async (user) => {
    try {
        const response = await createTopupRequestAPI(user);
        console.log('get response', response);
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})

export const getPaymentmethods = createAsyncThunk("getPaymentmethods", async (user) => {
    try {
        const response = await getPaymentmethodsAPI(user);
        console.log('get response', response);
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})

export const getBankAccounts = createAsyncThunk("getBankAccounts", async (user) => {
    try {
        const response = await getBankAccountsAPI(user);
        console.log('get response', response);
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})

export const getTopupDetails = createAsyncThunk("getTopupDetails", async (user) => {
    try {
        const response = await getTopupDetailsAPI(user);
        console.log('get response', response);
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})

export const transactionCancel = createAsyncThunk("transactionCancel", async (data) => {
    try {
        const response = await cancelTransactions(data);
        
        console.log(response,'PPPPPPPPPPPPPPPPPPPP');
        return response;
    } catch (error) {
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})

export const resetTransactionCancel  = createAsyncThunk("resetTransactionCancel", async () => {
    console.log('hfihreofhor');
    return {};
});





export const resetToupRequest = createAsyncThunk("resetToupRequest", async () => {
    return {};
});

export const resetToupDetails = createAsyncThunk("resetToupDetails", async () => {
    return {};
});

const topupSlice = createSlice({
    name: 'topupRequest',
    initialState: {
        isLoading: false,
        data: {},
        isSuccess: false,
        isError: false,
        payMethodsIsLoading: false,
        payMethodsData: {},
        payMethodsIsSuccess: false,
        payMethodsIsError: false,
        banksIsLoading: false,
        banksData: {},
        banksIsSuccess: false,
        banksIsError: false,
        topupIsLoading: false,
        topupData: [],
        topupIsSuccess: false,
        topupIsError: false,
        cancelTransactionData:'',
        cancelTransactionLoading:false,
        cancelTransactionSuccess:false,
        cancelTransactionError:false,

        // error

    },
    extraReducers: (builder) => {

        builder.addCase(createTopupRequest.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
        });

        builder.addCase(createTopupRequest.fulfilled, (state, action) => {
            console.log("==========fullfilled", action.payload);
            state.isLoading = false;
            state.data = action.payload;
            state.isSuccess = true;
            state.isError = false;
        });

        builder.addCase(createTopupRequest.rejected, (state, action) => {
            state.isError = true;
            state.data = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
            state.isSuccess = false;

        });

        builder.addCase(getPaymentmethods.pending, (state, action) => {
            state.payMethodsIsLoading = true;
            state.payMethodsIsSuccess = false;
        });

        builder.addCase(getPaymentmethods.fulfilled, (state, action) => {
            console.log("==========fullfilled", action.payload);
            state.payMethodsIsLoading = false;
            state.payMethodsData = action.payload;
            state.payMethodsIsSuccess = true;
            state.payMethodsIsError = false;
        });

        builder.addCase(getPaymentmethods.rejected, (state, action) => {
            state.payMethodsIsError = true;
            state.payMethodsData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
            state.payMethodsIsSuccess = false;

        });

        builder.addCase(getBankAccounts.pending, (state, action) => {
            state.banksIsLoading = true;
            state.banksIsSuccess = false;
        });

        builder.addCase(getBankAccounts.fulfilled, (state, action) => {
            console.log("==========fullfilled", action.payload);
            state.banksIsLoading = false;
            state.banksData = action.payload;
            state.banksIsSuccess = true;
            state.banksIsError = false;
        });

        builder.addCase(getBankAccounts.rejected, (state, action) => {
            state.banksIsError = true;
            state.banksData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
            state.banksIsSuccess = false;

        });

        builder.addCase(getTopupDetails.pending, (state, action) => {
            state.topupIsLoading = true;
            state.topupIsSuccess = false;
        });

        builder.addCase(getTopupDetails.fulfilled, (state, action) => {
            console.log("==========fullfilled", action.payload);
            state.topupIsLoading = false;
            state.topupData = action.payload;
            state.topupIsSuccess = true;
            state.topupIsError = false;
        });

        builder.addCase(getTopupDetails.rejected, (state, action) => {
            state.topupIsError = true;
            state.topupData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
            state.topupIsSuccess = false;

        });

        builder.addCase(resetToupRequest.fulfilled, () => {
            return {
                isLoading: false,
                data: {},
                isSuccess: false,
                isError: false
            };
        });

        builder.addCase(resetToupDetails.fulfilled, () => {
            return {
                topupIsLoading: false,
                topupData: [],
                topupIsSuccess: false,
                topupIsError: false,
            };
        });



        builder.addCase(transactionCancel.pending, (state, action) => {
            state.cancelTransactionLoading = true;
            state.cancelTransactionSuccess = false;
        });

        builder.addCase(transactionCancel.fulfilled, (state, action) => {
            console.log("==========fullfilled", action.payload);
            state.cancelTransactionLoading = false;
            state.cancelTransactionData = action.payload;
            state.cancelTransactionSuccess = true;
            state.cancelTransactionError = false;
        });

        builder.addCase(transactionCancel.rejected, (state, action) => {
            state.cancelTransactionError = true;
            state.cancelTransactionData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
            state.cancelTransactionSuccess = false;

        });

        builder.addCase(resetTransactionCancel.fulfilled, () => {
            return {
                cancelTransactionData:'',
                cancelTransactionLoading:false,
                cancelTransactionSuccess:false,
                cancelTransactionError:false,
            };
        });





    }
});



export default topupSlice.reducer;

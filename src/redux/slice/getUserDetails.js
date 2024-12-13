import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRefershToken, getRefreshToken, getUserDetails, getWalletDetails, setSignalRConnection } from '../../helpers/fakebackend_helper'
 

//*Action
export const getUserDetailsApiCall = createAsyncThunk("getUserDetailsApiCall", async (data) => {
    try {
        console.log("pppppppppppppppppppp===========================================",data);
        const response = await getUserDetails(data);
        // console.log('get response=========', response);
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(new Error(JSON.stringify(error)))
    }
    //   console.log(data);
    // const response = await getUserDetails(data);
    // console.log("response",response);
    // return response;
})
export const refreshToken = createAsyncThunk("refreshToken", async (data) => {
    try {
        const response = await getRefreshToken(data);
        return response;
    } catch (error) {
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})

export const resetGetUserDetailsApiCall = createAsyncThunk("resetGetUserDetailsApiCall", async () => {
    // console.log("--------------------------------------------------------------------------------------");
    return {};
});
export const setSignalRConnectionID = createAsyncThunk("setSignalRConnectionID", async (data) => {
    try {
        const response = await setSignalRConnection(data);
        // console.log('get response=signalr========', response);
        return response;

    } catch (error) {
        // console.log("error123-----", error)
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})

export const getWalletData = createAsyncThunk("getWalletData", async (data) => {
    try {
        const response = await getWalletDetails(data);
        // console.log('get response=========', response);
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})

const getUserDetailsSlice = createSlice({
    name: 'userDetails',
    initialState: {
        userDetailsIsLoading: false,
        userDetailsData: {},
        userDataNotifications:[],
        userDetailsIsSuccess: false,
        userDetailsIsError: false,

        walletIsLoading: false,
        walletData: {},
        walletIsSuccess: false,
        walletIsError: false,

        notificationIsLoading: false,
        notificationData: {},
        notificationIsSuccess: false,
        notificationIsError: false,
         loading:false,
         token:{},
         success:false,
         error:false

        
    },
    extraReducers: (builder) => {

        builder.addCase(getUserDetailsApiCall.pending, (state, action) => {
            state.userDetailsIsLoading = true;
            state.userDetailsIsSuccess = false;
        });

        builder.addCase(getUserDetailsApiCall.fulfilled, (state, action) => {
            state.userDetailsIsLoading = false;
            state.userDetailsData = action.payload;
            state.userDataNotifications = action.payload.communicationTypes;

            state.userDetailsIsSuccess = true;
            state.userDetailsIsError = false;
        });

        builder.addCase(getUserDetailsApiCall.rejected, (state, action) => {
            console.log(action.payload,"0ewt80r8t0");
            state.userDetailsIsError = true;
            state.userDetailsIsSuccess = false;
            state.userDetailsData = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
        });

        builder.addCase(getWalletData.pending, (state, action) => {
            state.walletIsLoading = true;
            state.walletIsSuccess = false;
        });

        builder.addCase(getWalletData.fulfilled, (state, action) => {
            state.walletIsLoading = false;
            state.walletData = action.payload;
            state.walletIsSuccess = true;
            state.walletIsError = false;
        });

        builder.addCase(getWalletData.rejected, (state, action) => {
            state.walletIsError = true;
            state.walletIsSuccess = false;
        });

        builder.addCase(setSignalRConnectionID.pending, (state, action) => {
            state.notificationIsLoading = true;
            state.notificationIsSuccess = false;
        });

        builder.addCase(setSignalRConnectionID.fulfilled, (state, action) => {
            state.notificationIsLoading = false;
            state.notificationData = action.payload;
            state.notificationIsSuccess = true;
            state.notificationIsError = false;
        });

        builder.addCase(setSignalRConnectionID.rejected, (state, action) => {
            state.notificationIsError = true;
            state.notificationIsSuccess = false;
        });

        builder.addCase(resetGetUserDetailsApiCall.fulfilled, () => {
            // console.log("---------------------------------------------------------------");
            return {
                userDetailsIsLoading: false,
                userDetailsData: {},
                userDataNotifications:[],
                userDetailsIsSuccess: false,
                userDetailsIsError: false,
            };
        });
     
        //refresh Token Action

      
        builder.addCase(refreshToken.pending, (state, action) => {
            state.loading = true;
            state.success = false;
        });

        builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload;
            state.success = true;
            state.error = false;
        });

        builder.addCase(refreshToken.rejected, (state, action) => {
            console.log(action.payload,"");
            state.loading = false;
            state.error = true;
            state.success = false;
            state.token = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;
        });
    }
});

export default getUserDetailsSlice.reducer;


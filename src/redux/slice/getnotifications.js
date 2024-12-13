import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllNotificationList, deleteNotificationList } from '../../helpers/fakebackend_helper'

//*Action
export const getNotifications = createAsyncThunk("getNotifications", async (data) => {
    // console.log("---------------------------------------------------------------------------------------------");
    try {
        const response = await getAllNotificationList(data);
        // console.log(response,"poooooooooooooooooooooooooooooooooooooooooooooooooooooo");

        return response;
    } catch (error) {
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})
export const deleteNotification = createAsyncThunk("deleteNotification", async (data) => {
    console.log(data,"datadatadata");
    try {
        const response = await deleteNotificationList(data);
        console.log(response,'--------------------------------------------------');
        return response;
    } catch (error) {
        console.log(error,'oooooooo',JSON.stringify(error));
        return Promise.reject(new Error(JSON.stringify(error)))
    }
});

export const resetdeleteNotificationData = createAsyncThunk("resetdeleteNotificationData", async () => {
    console.log("jiiiii");
    return {}
});

const getNotificationsIdSlice = createSlice({
    name: 'notificationList',
    initialState: {
        notificationIsLoading: false,
        notificationData: [],
        notificationIsSuccess: false,
        notificationIsError: false,
notificationCount:'',
        deleteNotificationIsLoading: false,
        deleteNotificationData: "",
        deleteNotificationIsSuccess: false,
        deleteNotificationIsError: false,
    },
    extraReducers: (builder) => {

        builder.addCase(getNotifications.pending, (state, action) => {
            state.notificationIsLoading = true;
            state.notificationIsSuccess = false;
        });

        builder.addCase(getNotifications.fulfilled, (state, action) => {
            console.log(" action.payload.count", action.payload.count);
            state.notificationIsLoading = false;
            state.notificationData = action.payload.notification ;
            state.notificationCount = action.payload.count;
            state.notificationIsSuccess = true;
            state.notificationIsError = false;
        });

        builder.addCase(getNotifications.rejected, (state, action) => {
            state.notificationIsError = true;
            state.notificationIsSuccess = false;

        });

        builder.addCase(deleteNotification.pending, (state, action) => {
            state.deleteNotificationIsLoading = true;
            state.deleteNotificationIsSuccess = false;
        });

        builder.addCase(deleteNotification.fulfilled, (state, action) => {
            console.log(action.payload);
            state.deleteNotificationIsLoading = false;
            state.deleteNotificationData = action.payload;
            state.deleteNotificationIsSuccess = true;
            state.deleteNotificationIsError = false;
        });

        builder.addCase(deleteNotification.rejected, (state, action) => {
            state.deleteNotificationIsError = true;
            state.deleteNotificationIsSuccess = false;
        });
        
        builder.addCase(resetdeleteNotificationData.fulfilled, () => {
            return {
                deleteNotificationIsLoading: false,
              deleteNotificationData :"",
               deleteNotificationIsSuccess : true,
             deleteNotificationIsError :false,
              
            };
        });

    }
});



export default getNotificationsIdSlice.reducer;


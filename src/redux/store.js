import {configureStore} from '@reduxjs/toolkit';

//*auth
import signInReducer from './slice/signIn';
import signUpReducer from './slice/signUp';
import forgotPasswordReducer from './slice/forgotPassword';
import verifyOtpReducer from './slice/verifyOtp';

import userForgetReducer from './slice/userForget';
import resetPasswordReducer from './slice/resetPassword';
//*common
import userDetailsReducer from './slice/getUserDetails';

//*Meter
import meterListReducer from './slice/getMeterList';
import addMeterSliceReducer from './slice/addNewMeter';
import getMeterByOwnerReducer from './slice/getMeterDetails';
import deleteMeterReducer from './slice/deleteMeter';
//ADminUSer
import addProfileReducer from './slice/Addprofile';
import masterProfileReducer from './slice/profileMaster';
import deleteAccountProfileReducer from './slice/deleteAccount';
// import userList from './slice/getAllUser';
import tenantList from './slice/getAllTenant';
import masterList from './slice/getAllUser';
import addTenantList from './slice/addTenant';
//*Property
import addPropertyReducer from './slice/addProperty';
import getAllPropertiesReducer from './slice/getAllProperty';
import deletePropertyReducer from './slice/DeleteProperty';
import deleteUserReducer from './slice/deleteUser';
import getPropertyDetailsReducer from './slice/propertyDetails';
import getCompanyDetalisByCompanyIdSlice from './slice/getCompanyDetalis';
import getIconsByOwnerReducer from './slice/getAllIcons';
// import UpdatePropertyReducer from './slice/UpdateProperty';
import profilemasterReducer from './slice/masterProfile';
import getConsumptionMasterSliceReducer from './slice/getConsumptionMaster';
import deleteAllUserReducer from './slice/deleteAllUser';
import getDashboardMasterSliceReducer from './slice/getDashboardAnalytics';
import getNotificationsSliceReducer from './slice/getnotifications';
import getTransactionListSliceReducer from './slice/getTransactionHistory';
import topupSettingSliceReducer from './slice/getAssociateUserSetting';
import getAccountsSliceReducer from './slice/getAccountDetails';
import getAssetSettingsSlice from './slice/getAssetSetting';

//icons
//verify meter
import verifyMeterReducer from './slice/verifyMeter';
import masterTransaction from './slice/transacitionMasters';
import downloadTransactionSliceReducer from './slice/downloadTransactionStatement';
import downloadPurchaceSliceReducer from './slice/getDownloadPurchace';
import topupReducer from './slice/topupAPI';
import gedownloadPurchaseReceiptIdSlice from './slice/downloadPurchaseReceipt';
import stsMeterListSlice from './slice/getStsMeterList';
import ststransactionListSlice from './slice/purchaseTransactionList';
// import getIconsByOwnerReducer from '../redux/slice/getAllIcons'
export const store = configureStore({
  reducer: {
    //*auth
    signIn: signInReducer,
    signUp: signUpReducer,
    forgotPassword: forgotPasswordReducer,
    verifyOtp: verifyOtpReducer,

    forgetuser: userForgetReducer,
    passwordReset: resetPasswordReducer,

    //common
    userDetails: userDetailsReducer,

    addprofile: addProfileReducer,
    // masterListForProfile:masterProfileReducer,

    //*Meter
    getMeters: meterListReducer,
    addMeter: addMeterSliceReducer,
    // getMeter:updateMeterSliceReducer,
    meter: getMeterByOwnerReducer,
    deleteMeters: deleteMeterReducer,
    //*Property
    addProperty: addPropertyReducer,
    getProperties: getAllPropertiesReducer,
    getPropertyDetails: getPropertyDetailsReducer,
    deleteProperty: deletePropertyReducer,
    // updateProperty:UpdatePropertyReducer,

    //user
    getPropertyUser: masterList,
    addTenant: addTenantList,
    getAllTenant: tenantList,
    deleteUser: deleteUserReducer,
    deleteAllUser: deleteAllUserReducer,

    //profile
    deleteProfile: deleteAccountProfileReducer,
    //verifymeter
    meterVerify: verifyMeterReducer,

    // getUser: userList,

    //icons
    icons: getIconsByOwnerReducer,
    //userMasterAPI
    profileMaster: profilemasterReducer,

    //Consumption
    consumptionData: getConsumptionMasterSliceReducer,
    dashboardData: getDashboardMasterSliceReducer,

    //accounts
    accountData: getAccountsSliceReducer,

    //notifications
    notificationList: getNotificationsSliceReducer,
    //Topup
    topup: topupSettingSliceReducer,
    transacitionMasters: masterTransaction,
    downloadStatement: downloadTransactionSliceReducer,
    // downloadStatement : downloadTransactionSliceReducer,

    downloadPurchace: downloadPurchaceSliceReducer,
    topupRequest: topupReducer,
    transationList: getTransactionListSliceReducer,
    companyDetalis: getCompanyDetalisByCompanyIdSlice,
    getAssetSetting: getAssetSettingsSlice,
    downloadReceipt: gedownloadPurchaseReceiptIdSlice,
    stsMeter: stsMeterListSlice,
    transactionList: ststransactionListSlice,
  },
});

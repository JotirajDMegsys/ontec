import {APIClient} from '../helpers/api_helper';
import * as url from '../helpers/url_helper';

const api = new APIClient();

//*auth
// export const signIn = (data) => api.create(url.SIGN_IN, data);
export const signIn = data => {
  console.log('SignIn Data:', data);
  return api.create(url.SIGN_IN, data);
};
// console.log(signIn());
export const signUp = data => api.create(url.SIGN_UP, data);
export const getSignUpOtp = data => api.create(url.GET_REGISTER_OTP, data);
export const forgotPassword = data => api.create(url.FORGOT_PASSWORD, data);
export const forgetUser = data => api.create(url.FORGET_USER, data);
export const passwordReset = data => api.create(url.PASSWORD_RESET, data);
//chnage password
export const changePassworddApi = data =>
  api.create(url.CHANGE_PASSWORD_API, data);

export const verifyOtp = () => api.create(url.VERIFY_OTP);

//*commonprofile
// export const getUserDetails = (data) => {
//     return api.get(
//         url.GET_USER_DETAILS(
//             data.userId,
//             data.sessionkey
//         ),
//     );
// };
export const getUserDetails = data => api.create(url.GET_USER_DETAILS, data);
export const getRefreshToken = data => api.create(url.GET_REFRESH_TOKEN, data);
export const setSignalRConnection = data =>
  api.create(url.SET_CONNECTION_ID, data);
export const getWalletDetails = data =>
  api.create(url.GET_WALLET_BY_USER_ID, data);
export const updateUser = data => api.create(url.UPDATE_USER, data);

//*Meter
export const getAllMeterList = data => {
  return api.get(url.GET_METER_BY_PROPERTY_ID(data.propertyId));
};

// export const getMetersFromMasters = (data) => {
//     console.log(data);
//     return api.get(
//         url.GET_METERS_FROM_MASTERS(
//             data.meterNumber,
//             data.propertyId
//         ),
//     );
// };

export const getMetersFromMasters = data =>
  api.create(url.GET_METERS_FROM_MASTERS, data);

export const uploadMetersFromMasters = data =>
  api.create(url.UPLOAD_METERS_FROM_MASTERS, data);

export const addupdateMeter = data => api.create(url.EDIT_METER, data);

export const meterValue = data => {
  return api.get(url.UPDATE_METER(data.id));
};

export const getDeleteMeter = async data => {
  return api.get(url.DELETE_METER(data.id));
};

//*Property
// export const addUpdateProperty = async(data) =>{

//      api.create(url.EDIT_PROPERTY, data)

//     }

export const addUpdateProperty = data => api.create(url.EDIT_PROPERTY, data);

export const getDeleteProperty = async data => {
  return api.get(url.DELETE_PROPERTY(data.propertyId));
};

export const getAllPropertyList = data =>
  api.create(url.GET_PROPERTY_BY_OWNER_ID, data);

export const getPropertyDetails = data => {
  return api.get(url.GET_PROPERTY_DETAILS(data.propertyId, data.companyId));
};

// masterAPITenant
export const get_propertyUser_by_ownerid = data => {
  return api.get(url.TENANT_USER(data.ownerId));
};

//Get all tenantlsit
export const get_tenant_list = data => {
  return api.get(url.TENANT_LIST(data.id));
};

export const getDeleteUser = async data => {
  return api.get(url.DELETE_USER(data.id));
};

export const getdeleteAllUser = async data => {
  // console.log("koooooooo");
  // console.log("data.propertyId", data.propertyId,);

  return api.delete(url.DELETE_ALL_USER(data.propertyId));
};

export const AddNewTenant = async data => api.create(url.ADD_TENANT, data);

//Admin user
export const getUser = data => {
  return api.get(url.ADMIN_USER(data.propertyId));
};

// icons
export const allIcons = data => {
  return api.get(url.GET_METER_BY_OWNER_ID(data.ownerId));
};

// approved meter
// export const  verifyMeterById = (data) => {
//     return api.get(

//         url.VERIFY_METER(
//             data.ownerId
//         ),

//     );
// };
// export const verifyMeterById = (data) => api.create(url.VERIFY_METER, data);
export const verifyMeterById = data => {
  // console.log("Data to be sent:", data);
  // console.log('VERIFY_METER');  // Log the data
  return api.create(url.VERIFY_METER, data);
};

//masterApi for profile

// export const profileData = () => {

//     return api.get(
//         url.ç()
//     );
//     // var response= api.get(
//     //     url.GET_DATA_FROM_MASTER_API()
//     // );
//     // console.log("api.get: ",response);
//     // return response;
// };

export const profileData = async data => {
  const {accessToken} = data;
  try {
    console.log('Making API call to:', url.GET_DATA_FROM_MASTER_API);
    console.log('With headers:', {
      Authorization: accessToken,
    });
    const response = await api.get(url.GET_DATA_FROM_MASTER_API, {
      headers: {
        Authorization: accessToken,
      },
    });
    console.log('Full response:', response);
    return response;
  } catch (error) {
    console.error(
      'Error fetching master profile data:',
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

// export const profileData = async (data) => {
//     const { accessToken } = data;
//     try {
//         const response = await api.get(url.GET_DATA_FROM_MASTER_API, {
//             headers: {
//                 Authorization: accessToken
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching master profile data:", error);
//         throw error;
//     }
// };

export const getConsumptionMaster = data => {
  return api.create(url.GET_CONSUMPTION_MASTER_BY_OWNER_ID, data);
};

export const getConsumptionDashboardData = data => {
  return api.create(url.GET_CONSUMPTION_DASHBOARD, data);
};

// delete User
export const getdeleteAccount = async data => {
  return api.delete(url.DELETE_ACCOUNT(data.id));
};
export const getDashboardMaster = data => {
  return api.get(url.GET_DASHBOARD_MASTER_BY_OWNER_ID(data.ownerId));
};

export const getDashboardAccountBalance = data => {
  return api.get(
    url.GET_ACCOUNT_HISTORY(data.propertyId),
    // url.GET_DASHBOARD_ACCOUNT_BALANCE(
    //     data.propertyId
    // ),
  );
};

export const getAccountHistory = data => {
  return api.get(url.GET_ACCOUNT_HISTORY(data.propertyId));
};

export const getDashboardConsumptionData = data => {
  return api.get(url.GET_DASHBOARD_CUNSUMPTION(data.propertyId));
};

export const getDashboardPropertyStats = data => {
  return api.get(url.GET_DASHBOARD_PROPERTY_STATS(data.id));
};
//notifications
// export const getAllNotificationList = (data) => {
//     return api.get(
//         url.GET_METER_BY_PROPERTY_ID(
//             data.propertyId,
//         ),
//     );
// };

export const getAllNotificationList = data => {
  return api.create(url.GET_USER_NOTIFICATIONS, data);
};
export const getAssetvalue = data => {
  return api.create(url.GET_ASSETS_SETTING, data);
};

export const deleteNotificationList = data => {
  return api.create(url.DELETE_NOTIFICATIONS, data);
};

// TopupAssociateSetting
export const getTopupSettingValue = data => {
  return api.create(url.ASSOCIATE_TOPUP_SETTING, data);
};

//masterexport
export const getTransacitionMasters = data => {
  return api.create(url.MASTER_TRANSACTION, data);
};

export const getTransactionData = data => {
  return api.create(url.TRANSACTION_SUMMARY, data);
};

export const getdownloadTransactionStatement = data => {
  return api.create(url.DOWNLOADTRANSACTIONSTATEMENT, data);
};
export const getdownloadPurchaseReceipt = data => {
  return api.create(url.GETDOWNLOADPURCHASERECEIPT, data);
};
export const getDownloadPurchaceStatement = data => {
  return api.create(url.DOWNLOADPURCHACE, data);
};

export const createTopupRequestAPI = data =>
  api.create(url.ADD_TOPUP_TRANSACTION, data);
export const getPaymentmethodsAPI = data =>
  api.create(url.GET_PAYMENT_METHODS, data);
export const getBankAccountsAPI = data =>
  api.create(url.GET_BANK_ACCOUNTS, data);
export const getTopupDetailsAPI = data =>
  api.create(url.GET_TOPUP_DETAILS, data);
export const cancelTransactions = data => api.create(url.GET_BACK_TOPUP, data);

//transationList

export const getAlltransationListList = data => {
  return api.create(url.TRANSACTION_HISTORY, data);
};
//contact Detalis

export const getCompanyDetalis = data => {
  console.log(data);
  return api.get(url.GET_COMPANY_DETALIS(data.companyId));
};

//STS meterList

export const getStsMeterlist = data => api.create(url.GET_STS_METERLIST, data);
export const getStsTransactionList = data =>
  api.create(url.GET_STS_TRANSACTION, data);

//refreshToken

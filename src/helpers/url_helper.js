// import { API_VERSION } from "./enum";

// //*auth
// export const SIGN_IN = `api/login/login?api-version=${API_VERSION}`;
// export const SIGN_UP = `api/login/register`;
// export const GET_REGISTER_OTP = `api/login/get_register_otp?api-version=${API_VERSION}`;
// export const FORGOT_PASSWORD = `api/login/get_forgotpass_otp?api-version=${API_VERSION}`;
// export const FORGET_USER = `api/login/verify_forgotpass_otp?api-version=${API_VERSION}`;
// export const PASSWORD_RESET = `api/login/reset_password?api-version=${API_VERSION}`;

// export const VERIFY_OTP = `/todos`;

// //*common User
// export const GET_USER_DETAILS = (
//     userId,
// ) => {
//     let apiUrl = `api/user/${userId}?api-version=${API_VERSION}`;
//     return apiUrl;
// };

// export const GET_WALLET_BY_USER_ID =`api/wallet/get_wallet_by_user_id?api-version=${API_VERSION}`;
// export const SET_CONNECTION_ID =`api/notification/set-connection-by-user-id?api-version=${API_VERSION}`;

// //ProfileUser
// // export const UPDATE_USER = `/api/user/update-user?api-version=${API_VERSION}`;

// export const UPDATE_USER = (
//     data,
// ) => {
//     let apiUrl = `api/user/update-user?api-version=${API_VERSION}`;
//     return apiUrl;
// };

//  //*Meter
// export const GET_METER_BY_PROPERTY_ID = (
//     propertyId,
// ) => {
//     let apiUrl =`api/meter/get-meterby-propertyid/${propertyId}?api-version=1.0`
//     return apiUrl;
// };

// // export const GET_METERS_FROM_MASTERS = (
// //     meterNumber,
// // ) => {
// //     let apiUrl =`api/meter/get_meters_from_master/${meterNumber}?api-version=1.0`
// //     return apiUrl;
// // };

// export const GET_METERS_FROM_MASTERS =`api/meter/get_meters_from_master?api-version=1.0`;

// export const UPLOAD_METERS_FROM_MASTERS =`api/meter/add_meters_from_list?api-version=${API_VERSION}`;

// export const EDIT_METER =`api/meter/edit?api-version=${API_VERSION}`;
// export const GET_CONSUMPTION_MASTER_BY_OWNER_ID = `api/consumption/get_consumption_masters_by_ownerid?api-version=${API_VERSION}`;
// export const GET_CONSUMPTION_DASHBOARD = `api/consumption/get_consumption_dashboard?api-version=${API_VERSION}`;

// export const GET_DASHBOARD_MASTER_BY_OWNER_ID = (
//     ownerId
//     ) => {
//         let apiUrl =`api/dashboard/get_dashboard_masters_by_ownerid/${ownerId}?api-version=${API_VERSION}`;
//         return apiUrl;
//     };

//     export const GET_ACCOUNT_HISTORY = (
//         propertyId
//         ) => {
//             let apiUrl =`api/account/get_account_history/${propertyId}?api-version=${API_VERSION}`;
//             return apiUrl;
//         };

//     export const GET_DASHBOARD_ACCOUNT_BALANCE = (
//         propertyId
//         ) => {
//             let apiUrl =`api/dashboard/get_account_balance/${propertyId}?api-version=${API_VERSION}`;
//             return apiUrl;
//         };

//         export const GET_DASHBOARD_CUNSUMPTION = (
//             propertyId
//             ) => {
//                 let apiUrl =`api/dashboard/get_meter_consumption/${propertyId}?api-version=${API_VERSION}`;
//                 return apiUrl;
//             };

//         export const GET_DASHBOARD_PROPERTY_STATS = (
//             userId
//             ) => {
//                 let apiUrl =`api/dashboard/get_property_details_by_ownerid/${userId}?api-version=${API_VERSION}`;
//                 return apiUrl;
//             };

// export const UPDATE_METER = (
//     id
//     ) => {
//         let apiUrl =`api/meter/${id}?api-version=1.0`
//         return apiUrl;
//     };

// //*Property
// export const GET_PROPERTY_BY_OWNER_ID = `api/property/get_property_by_ownerid?api-version=${API_VERSION}`;

// export const EDIT_PROPERTY = `api/property/edit?api-version=${API_VERSION}`;

// export const DELETE_PROPERTY = (
//     propertyId,
// ) => {
//     let apiUrl = `api/property/delete-property/${propertyId}?api-version=${API_VERSION}`;
//     return apiUrl;
// };
// export const DELETE_USER = (
//     id,

// ) => {
//     let apiUrl = `api/propertyuser/delete-property-user/${id}?api-version=${API_VERSION}`;
//     return apiUrl;

// };

// export const DELETE_ALL_USER = (
//     propertyId
// ) => {
//     let apiUrl = `api/propertyuser/delete-associates-by-propertyid/${propertyId}?api-version=${API_VERSION}`;
//     return apiUrl;
// };
// export const DELETE_METER = (
//     id,
// ) => {
//     let apiUrl =  `api/meter/delete-meter/${id}?api-version=${API_VERSION}`;
//     return apiUrl;
// };

// export const GET_PROPERTY_DETAILS = (
//     propertyId,
//     companyId,
// ) => {
//     let apiUrl = `api/property/${propertyId}?companyId=${companyId}&api-version=1.0`;
//     return apiUrl;
// };

// //*USER
// export const GET_USER = `api/user/get`;
// // export const UPDATE_USER = `/api/user/update-user?api-version=${API_VERSION}`;

// // <-------User component----->

// //getTenanatBy propertyuser

// export const TENANT_USER=(
//     ownerId,
// )=>{
//     // let apiUrl =`/api/propertyuser/${ownerId}`
//    let apiUrl= `api/propertyuser/get-property-user-masters/${ownerId}?api-version=1.0
//     `

//     return apiUrl;
// }

// //for GET tenantList  TENANT_LIST
// export const TENANT_LIST=(
//       id,
// )=>{
//    let apiUrl= `api/propertyuser/get_property_userlist/${id}?api-version=1.0`
//     return apiUrl;
// }

// //for Add tenant
// export const ADD_TENANT = `api/propertyuser/add-update?api-version=${API_VERSION}`;

// //for user

// export const DELETE_ACCOUNT = (
//     userId,
// ) => {
//     let apiUrl =  `api/user/delete-user-by-id/${userId}?api-version=${API_VERSION}`;
//     return apiUrl;
// };

// //AdminUser

// export const ADMIN_USER = (
//     propertyId,
// ) => {
//     let apiUrl = `api/meter/${propertyId}?api-version=${API_VERSION}`;
//     // let apiUrl =`/api/user/${3}?api-version=1.0`
//     return apiUrl;
// };

// //icons

// export const GET_METER_BY_OWNER_ID = (
// ownerId
// ) => {
//     let apiUrl =`api/meter/get-meter-masters/${ownerId}?api-version=${API_VERSION}`;
//     return apiUrl;
// };

// // export const VERIFY_METER  = (
// //     ownerId
// //     ) => {
// //         let apiUrl =`api/meter/meter-approve-reject-by-id?api-version=1.`

// //         // `api/meter/get-meter-masters/${ownerId}?api-version=${API_VERSION}`;
// //         return apiUrl;
// //     };

//     export const VERIFY_METER = `api/meter/verify-meter?api-version=${API_VERSION}`;

// // master api
//  export const GET_DATA_FROM_MASTER_API= `api/user/user_masters?api-version=${API_VERSION}`;

//  //notifications
//  export const GET_USER_NOTIFICATIONS= `api/notification/get-notifications-by-user-id?api-version=${API_VERSION}`;
//  export const DELETE_NOTIFICATIONS= `/api/notification/delete-notification?api-version=${API_VERSION}`;
//  // TopupSetting
//  export const ASSOCIATE_TOPUP_SETTING= `api/propertyuser/associtae-user_settings?api-version=${API_VERSION}`;
//  export const MASTER_TRANSACTION= `api/transaction/get_transacition_masters?api-version=${API_VERSION}`;
//  export const TRANSACTION_SUMMARY= `api/transaction/get_transacition_summary?api-version=${API_VERSION}`;
//  export const TRANSACTION_HISTORY= `api/wallet/get_wallet_transactions?api-version=${API_VERSION}`;
//  export const DOWNLOADTRANSACTIONSTATEMENT= `api/transaction/download-statement?api-version=${API_VERSION}`;

//  export const DOWNLOADPURCHACE = `api/topup/download-purchace-receipt?api-version=${API_VERSION}`;

//  export const ADD_TOPUP_TRANSACTION = `api/topup/add_topup_transaction?api-version=${API_VERSION}`;
//  export const GET_PAYMENT_METHODS = `api/topup/get_payment_methods?api-version=${API_VERSION}`;
//  export const GET_BANK_ACCOUNTS = `api/topup/get_bank_accounts?api-version=${API_VERSION}`;
//     export const GET_TOPUP_DETAILS = `api/topup/get_top_up_transactions?api-version=${API_VERSION}`;
//  //for company

//  export const GET_COMPANY_DETALIS = (
//     companyId,
// ) => {
//     let apiUrl = `api/company/get_company_details/${companyId}?api-version=${API_VERSION}`
//         return apiUrl;
// };

import {API_VERSION} from './enum';

//*auth
export const SIGN_IN = `api/login/login?api-version=${API_VERSION}`;
export const SIGN_UP = `api/login/register`;
export const GET_REGISTER_OTP = `api/login/get_register_otp?api-version=${API_VERSION}`;
export const FORGOT_PASSWORD = `api/login/get_forgotpass_otp?api-version=${API_VERSION}`;
export const FORGET_USER = `api/login/verify_forgotpass_otp?api-version=${API_VERSION}`;
export const PASSWORD_RESET = `api/login/reset_password?api-version=${API_VERSION}`;
export const CHANGE_PASSWORD_API = `api/user/change_password?api-version=${API_VERSION}`;

// changePassowrdApi
export const VERIFY_OTP = `/todos`;

//*common User
// export const GET_USER_DETAILS = (
//     userId,
// ) => {
//     let apiUrl = `api/user/${userId}?api-version=${API_VERSION}`;
//     return apiUrl;
// };

export const GET_USER_DETAILS = `api/user/get_user_by_id?api-version=${API_VERSION}`;
export const GET_REFRESH_TOKEN = `api/login/refersh-token?api-version=${API_VERSION}`;

export const GET_WALLET_BY_USER_ID = `api/wallet/get_wallet_by_user_id?api-version=${API_VERSION}`;
export const SET_CONNECTION_ID = `api/notification/set-connection-by-user-id?api-version=${API_VERSION}`;

//ProfileUser
// export const UPDATE_USER = `/api/user/update-user?api-version=${API_VERSION}`;

export const UPDATE_USER = data => {
  let apiUrl = `api/user/update-user?api-version=${API_VERSION}`;
  return apiUrl;
};

//*Meter
export const GET_METER_BY_PROPERTY_ID = propertyId => {
  let apiUrl = `api/meter/get-meterby-propertyid/${propertyId}?api-version=1.0`;
  return apiUrl;
};

// export const GET_METERS_FROM_MASTERS = (
//     meterNumber,
// ) => {
//     let apiUrl =`api/meter/get_meters_from_master/${meterNumber}?api-version=1.0`
//     return apiUrl;
// };

export const GET_METERS_FROM_MASTERS = `api/meter/get_meters_from_master?api-version=1.0`;

export const UPLOAD_METERS_FROM_MASTERS = `api/meter/add_meters_from_list?api-version=${API_VERSION}`;

export const EDIT_METER = `api/meter/edit?api-version=${API_VERSION}`;
export const GET_CONSUMPTION_MASTER_BY_OWNER_ID = `api/consumption/get_consumption_masters_by_ownerid?api-version=${API_VERSION}`;
export const GET_CONSUMPTION_DASHBOARD = `api/consumption/get_consumption_dashboard?api-version=${API_VERSION}`;

export const GET_DASHBOARD_MASTER_BY_OWNER_ID = ownerId => {
  let apiUrl = `api/dashboard/get_dashboard_masters_by_ownerid/${ownerId}?api-version=${API_VERSION}`;
  return apiUrl;
};

export const GET_ACCOUNT_HISTORY = propertyId => {
  let apiUrl = `api/account/get_account_history/${propertyId}?api-version=${API_VERSION}`;
  return apiUrl;
};

export const GET_DASHBOARD_ACCOUNT_BALANCE = propertyId => {
  let apiUrl = `api/dashboard/get_account_balance/${propertyId}?api-version=${API_VERSION}`;
  return apiUrl;
};

export const GET_DASHBOARD_CUNSUMPTION = propertyId => {
  let apiUrl = `api/dashboard/get_meter_consumption/${propertyId}?api-version=${API_VERSION}`;
  return apiUrl;
};

export const GET_DASHBOARD_PROPERTY_STATS = id => {
  let apiUrl = `api/dashboard/get_property_details_by_ownerid/${id}?api-version=${API_VERSION}`;
  return apiUrl;
};

export const UPDATE_METER = id => {
  let apiUrl = `api/meter/${id}?api-version=1.0`;
  return apiUrl;
};

//*Property
export const GET_PROPERTY_BY_OWNER_ID = `api/property/get_property_by_ownerid?api-version=${API_VERSION}`;

export const EDIT_PROPERTY = `api/property/edit?api-version=${API_VERSION}`;

export const DELETE_PROPERTY = propertyId => {
  let apiUrl = `api/property/delete-property/${propertyId}?api-version=${API_VERSION}`;
  return apiUrl;
};
export const DELETE_USER = id => {
  let apiUrl = `api/propertyuser/delete-property-user/${id}?api-version=${API_VERSION}`;
  return apiUrl;
};

export const DELETE_ALL_USER = propertyId => {
  let apiUrl = `api/propertyuser/delete-associates-by-propertyid/${propertyId}?api-version=${API_VERSION}`;
  return apiUrl;
};
export const DELETE_METER = id => {
  let apiUrl = `api/meter/delete-meter/${id}?api-version=${API_VERSION}`;
  return apiUrl;
};

export const GET_PROPERTY_DETAILS = (propertyId, companyId) => {
  let apiUrl = `api/property/${propertyId}?companyId=${companyId}&api-version=1.0`;
  return apiUrl;
};

//*USER
export const GET_USER = `api/user/get`;
// export const UPDATE_USER = `/api/user/update-user?api-version=${API_VERSION}`;

// <-------User component----->

//getTenanatBy propertyuser

export const TENANT_USER = ownerId => {
  // let apiUrl =`/api/propertyuser/${ownerId}`
  let apiUrl = `api/propertyuser/get-property-user-masters/${ownerId}?api-version=1.0
    `;

  return apiUrl;
};

//for GET tenantList  TENANT_LIST
export const TENANT_LIST = id => {
  let apiUrl = `api/propertyuser/get_property_userlist/${id}?api-version=1.0`;
  return apiUrl;
};

//for Add tenant
export const ADD_TENANT = `api/propertyuser/add-update?api-version=${API_VERSION}`;

//for user

export const DELETE_ACCOUNT = id => {
  let apiUrl = `api/user/delete-user-by-id/${id}?api-version=${API_VERSION}`;
  return apiUrl;
};

//AdminUser

export const ADMIN_USER = propertyId => {
  let apiUrl = `api/meter/${propertyId}?api-version=${API_VERSION}`;
  // let apiUrl =`/api/user/${3}?api-version=1.0`
  return apiUrl;
};

//icons

export const GET_METER_BY_OWNER_ID = ownerId => {
  let apiUrl = `api/meter/get-meter-masters/${ownerId}?api-version=${API_VERSION}`;
  return apiUrl;
};

// export const VERIFY_METER  = (
//     ownerId
//     ) => {
//         let apiUrl =`api/meter/meter-approve-reject-by-id?api-version=1.`

//         // `api/meter/get-meter-masters/${ownerId}?api-version=${API_VERSION}`;
//         return apiUrl;
//     };

export const VERIFY_METER = `api/meter/verify-meter?api-version=${API_VERSION}`;

// master api
export const GET_DATA_FROM_MASTER_API = `api/user/user_masters?api-version=${API_VERSION}`;

//notifications
export const GET_USER_NOTIFICATIONS = `api/notification/get-notifications-by-user-id?api-version=${API_VERSION}`;
export const DELETE_NOTIFICATIONS = `api/notification/delete-notification?api-version=${API_VERSION}`;
// /api/notification/delete-notification?api-version=1.0'
// TopupSetting
export const ASSOCIATE_TOPUP_SETTING = `api/propertyuser/associtae-user_settings?api-version=${API_VERSION}`;
export const MASTER_TRANSACTION = `api/transaction/get_transacition_masters?api-version=${API_VERSION}`;
export const TRANSACTION_SUMMARY = `api/transaction/get_transacition_summary?api-version=${API_VERSION}`;
export const TRANSACTION_HISTORY = `api/wallet/get_wallet_transactions?api-version=${API_VERSION}`;
export const DOWNLOADTRANSACTIONSTATEMENT = `api/transaction/download-statement?api-version=${API_VERSION}`;
export const GETDOWNLOADPURCHASERECEIPT = `api/topup/download-purchace-receipt?api-version=${API_VERSION}`;

export const DOWNLOADPURCHACE = `api/topup/download-purchace-receipt?api-version=${API_VERSION}`;

export const ADD_TOPUP_TRANSACTION = `api/topup/add_topup_transaction?api-version=${API_VERSION}`;
export const GET_PAYMENT_METHODS = `api/topup/get_payment_methods?api-version=${API_VERSION}`;
export const GET_BANK_ACCOUNTS = `api/topup/get_bank_accounts?api-version=${API_VERSION}`;
export const GET_TOPUP_DETAILS = `api/topup/get_top_up_transactions?api-version=${API_VERSION}`;
//for company

export const GET_COMPANY_DETALIS = companyId => {
  let apiUrl = `api/company/get_company_details/${companyId}?api-version=${API_VERSION}`;
  return apiUrl;
};

// assetSetting
export const GET_ASSETS_SETTING = `api/user/save-user-settings?api-version=${API_VERSION}`;
export const GET_BACK_TOPUP = `api/topup/cancel_top_up_transaction?api-version=${API_VERSION}`;
export const GET_STS_METERLIST = `api/purchase/get_sts_meters_by_owner_id?api-version=${API_VERSION}`;
export const GET_STS_TRANSACTION = `api/purchase/get_sts_transactions?api-version=${API_VERSION}`;

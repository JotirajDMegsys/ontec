// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Pressable,
//   Alert,
// } from "react-native";
// import VectorIcon from 'react-native-vector-icons/Ionicons';
// import { TextInput } from "react-native-paper";
// import { CommonModal, PopupButton } from "../../components/common";
// import otpIcon from "../../assets/verifyIcon.png";
// import { OtpBox } from "../../components/common";
// import { useNavigation } from "@react-navigation/native";
// import { Image } from "@rneui/base";
// import PopupIcon from "../../assets/popupCheck.png";
// import { Button, Icon } from "@rneui/themed";
// import { BackgroundColor } from "../../helpers/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { userSignUp } from "../../redux/slice/signUp";
// import { useToast } from "react-native-toast-notifications";
// import Spinner from "react-native-loading-spinner-overlay";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// //*Images
// import LeftArrow from "../../assets/Leftarrow26.png";
// import backgroundImage from "../../assets/loginBackgroundImage.png";
// import { SignInTopImage } from "../../components/common";
// import { userForget, resetUserForget } from "../../redux/slice/userForget";
// import {
//   resetPassword,
//   resetforgetPassword,
//   resetpassword,
// } from "../../redux/slice/resetPassword";
// import { VerifyButton } from "../../components/common";
// import { COMPANY_ID, COUNTRY_CODE } from "../../helpers/enum";
// import { COLOR_LIST } from "../../helpers/colorlist";
// const OtpSubmit = ({ route }) => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const toast = useToast();

//   const receivedData = route.params?.screenName;
//   const apiStateData = route.params?.stateValues;
//   console.log("apistate", apiStateData);

//   const { isLoading, data, isError, isSuccess } = useSelector((state) => ({
//     isLoading: state.signUp.isLoading,
//     data: state.signUp.data,
//     isError: state.signUp.isError,
//     isSuccess: state.signUp.isSuccess,
//   }));

//   console.log("otp====",data);

//   // const auth=data;
//   // console.log(auth);

//   //resetPassword passwordReset

//   const {
//     resetPasswordIsLoading,
//     resetPasswordData,
//     resetPasswordIsError,
//     resetPasswordIsSuccess,
//   } = useSelector((state) => ({
//     resetPasswordIsLoading: state.passwordReset.resetPasswordIsLoading,
//     resetPasswordData: state.passwordReset.resetPasswordData,
//     resetPasswordIsError: state.passwordReset.resetPasswordIsError,
//     resetPasswordIsSuccess: state.passwordReset.resetPasswordIsSuccess,
//   }));
//   console.log(
//     "resetPasswordData ..resetPasswordData.............",
//     resetPasswordData
//   );
//   const [serverErrors, setServerErrors] = useState({});
//   const [serverErrorsForOtp, setServerErrorForOtp] = useState({});

//   console.log(serverErrorsForOtp,"ppppppppppppppp");
//   console.log(serverErrors, "ewpfjrepgjfperjpgjrpjgjrpgpj");

//   useEffect(() => {
//     if (
//       resetPasswordData &&
//       resetPasswordIsSuccess == true &&
//       resetPasswordIsError === false &&
//       resetPasswordIsLoading == false &&
//       receivedData === "forgotPassword"
//     ) {
//       // setmessage(userForgetData

//       setIsResetPassword(false);
//       setModalVisible(true);
//       setOtpValue(otpValue);

//       // clearState();
//       dispatch(resetforgetPassword());


//       // resetpassword();
//       //  console.log('====================================');

//       //  console.log('====================================');
//       //  console.log(apiStateData.emailMobile,'apiStateData.emailMobile,');
//     } else if (
//       resetPasswordIsSuccess === false &&
//       resetPasswordIsError === true &&
//       resetPasswordData
//     ) {
//       setSpinner(false);
//       setServerErrors(resetPasswordData.errors);
//       // dispatch(resetgetmetersFromMasterData());
//       dispatch(resetforgetPassword());
//     }
//   }, [resetPasswordData, resetPasswordIsSuccess]);

//   const {
//     userForgetIsLoading,
//     userForgetData,
//     userForgetIsSuccess,
//     userForgetIsError,
//   } = useSelector((state) => ({
//     userForgetIsLoading: state.forgetuser.userForgetIsLoading,
//     userForgetData: state.forgetuser.userForgetData,
//     userForgetIsError: state.forgetuser.userForgetIsError,
//     userForgetIsSuccess: state.forgetuser.userForgetIsSuccess,
//   }));

//   console.log("userForgetData-------", userForgetData);

//   useEffect(() => {
//     if (
//       userForgetData &&
//       userForgetIsSuccess == true &&
//       userForgetIsLoading == false &&
//       userForgetIsError==false&&
//       receivedData === "forgotPassword"
//     ) {

//       toast.show(userForgetData, {
//         type: "success",
//         placement: "top",
//         duration: 3000,
//         offset: 30,
//         animationType: "zoom-in",
//       });
//       console.log('efoerjfjorejfjrofjrjofj');

//       dispatch(resetUserForget());
//       setIsResetPassword(true);
//       setServerErrorForOtp({})

//     }else if (
//       userForgetIsSuccess === false &&
//       userForgetIsError===true&&
//       userForgetData &&receivedData === "forgotPassword"

//       ) {
//         setSpinner(false);
//         console.log("jefojojojojojojojojo");
//         setServerErrorForOtp(userForgetData.errors);

//         // dispatch(resetgetmetersFromMasterData());
//         dispatch(resetUserForget());
//       }

//       // console.log('====================================');

//       // console.log('====================================');
//       // console.log(apiStateData.emailMobile, 'apiStateData.emailMobile,');
    
//   }, [userForgetData, userForgetIsSuccess,userForgetIsError]);
//   // const[message ,setmessage]= useState('');

//   //*state

//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isResetPassword, setIsResetPassword] = useState(false);
//   const [isUserVerify, setIsUserVerify] = useState(false);
//   const [otpValue, setOtpValue] = useState(false);
//   const [spinner, setSpinner] = useState(false);

//   //*reset password state ___________________________

//   //*state
//   const [showPassword, setShowPassword] = useState(false);
//   const [confirmPassword, setConfirmPassword] = useState(false);

//   //*initial state
//   const resetPasswordValues = {
//     password: "",
//     confirmPassword: "",
//   };

//   const resetPasswordSchema = Yup.object().shape({
//     password: Yup.string()
//       .required("Password is required")
//       .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .matches(/[0-9]/, "Password must contain at least one number")
//       .matches(/[\W_]/, "Password must contain at least one special character")
//       .matches(/^\S*$/, "Password must not contain spaces")
//       .min(8, "Password must be at least 8 characters long")

//       .max(15, "Password must be at most 15 characters long"),

//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password")], "Password not matched")
//       .required("Confirm password is required.")
//       .required("Password is required")
//       .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .matches(/[0-9]/, "Password must contain at least one number")
//       .matches(/[\W_]/, "Password must contain at least one special character")
//       .matches(/^\S*$/, "Password must not contain spaces")
//       .min(8, "Password must be at least 8 characters long")
//       .max(15, "Password must be at most 15 characters long"),
//   });
//   const {
//     values,
//     errors,
//     touched,
//     handleBlur,
//     handleChange,
//     handleSubmit,
//     isSubmitting,
//     resetForm,
//     setFieldValue,
//   } = useFormik({
//     initialValues: resetPasswordValues,
//     validationSchema: resetPasswordSchema,
//     onSubmit: (values) => {
//       onClickSetPassword();
//     },
//   });

//   //*reset password state ___________________________
//   useEffect(() => {
//     setErrorStr("");
//     if (data && data.accessToken && receivedData != "forgotPassword") {
//       setIsUserVerify(true);
//     } else if (data && data.message) {
//       setErrorStr(data.message);
//     } else if (isError && !isSuccess && data) {
//       setErrorStr(data.errors?.Otp.toString());
//     }
//     setSpinner(false);
//     console.log("Errorrr", data);
//   }, [isSuccess, data]);
//   console.log("afterdata", data);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//     setTimeout(() => {
//       navigation.navigate("signIn");
//     }, 3000);
//   };

//   useEffect(() => {
//     // console.log('receivedData----', JSON.stringify(receivedData));
//     // console.log('apiStateData----', JSON.stringify(apiStateData));
//   }, []);

//   const onClickBackNavigation = () => {
//     console.log("ejfojreofjjfrojo");
//     if (receivedData === "forgotPassword") {

//       navigation.navigate("forgotPassword");
//     } else {
//       navigation.navigate("signUp");
//     }
//   };

//   const onClickVerifyOtp = () => {
//     setErrorStr("");
//     if (receivedData === "forgotPassword") {
//       // onClickVerifyOtpApi();
//       onClickVerifyForPassword();
//       //  setIsResetPassword(true);
//     } else {
//       onClickVerifyOtpApi();
//       // setIsUserVerify(true);
//     }
//   };

//   const onClickCloseResetPassword = () => {
//     setIsResetPassword(false);
//     setServerErrors({});
//     setOtpValue(false)

//     dispatch(resetforgetPassword());
//     navigation.navigate("signIn");

//   };

//   const onClickSetPassword = () => {
//     let dataObj = {
//       companyId: COMPANY_ID,
//       countryCode: COUNTRY_CODE,
//       emailMobile: apiStateData.emailMobile,
//       password: values.password,
//       confirmPassword: values.confirmPassword,
//       lastOtp: otpValue,
//     };
//     console.log("dataObj", dataObj);
//     console.log("setOtpValue", otpValue);

//     // setSpinner(true);
//     // setFieldValue("spinner", !values.spinner);
//     // setOtpValue(false);
//     setServerErrorForOtp({})

//     dispatch(resetPassword(dataObj));
//     console.log(dataObj);
//   };

//   const onClickBackToLogin = () => {
//     setModalVisible(false);
//     setIsResetPassword(false);
//     setServerErrors({});
//     setOtpValue(false)

//     dispatch(resetforgetPassword());
//     navigation.navigate("signIn");
//     // navigation.navigate("signIn");


//  };
//   const clearState = async () => {
//     setFieldValue("password", "");
//     setFieldValue("confirmPassword", "");
//   };

//   const onClickProfilePopup = async () => {
//     if (data.accessToken && data.userId) {
//       await AsyncStorage.setItem("accessToken", data.accessToken);
//       await AsyncStorage.setItem("refreshToken", data.refreshToken);
//       await AsyncStorage.setItem("userId", data.userId.toString());
//       await AsyncStorage.setItem("role", data.role || "Consumer");
//       await AsyncStorage.setItem("emailId", data.emailId);
//       await AsyncStorage.setItem("mobile", data.mobile);
//       await AsyncStorage.setItem(
//         "isProfileComplete",
//         data.isProfileComplete.toString()
//       );
//       setIsUserVerify(false);
//       navigation.navigate("profile", {
//         mobile: apiStateData.mobileNumber,
//         emailId: apiStateData.emailId,
//       });
//     } else {
//       toast.show("Something went wrong, Please retry!", {
//         type: "danger",
//         placement: "top",
//         duration: 3000,
//         offset: 30,
//         animationType: "zoom-in",
//       });
//       navigation.navigate("signIn");
//     }
//   };

//   // const handleOtpChange = (otpValue) => {
//   //   setOtpValue(otpValue);
//   // };

//   //*onClick Verify otp
//   // const onClickVerifyOtpApi = () => {
//   //   let dataObj = {
//   //     "countryCode": "91",
//   //     "countryCodeId": 1,
//   //     "mobileNumber": apiStateData.mobileNumber,
//   //     "emailId": apiStateData.emailId,
//   //     "password": apiStateData.password,
//   //     "companyId": 1,
//   //     "otp": otpValue,
//   //     "otpType": "string"
//   //   }
//   //   setSpinner(!spinner)
//   //   // console.log("usersignup",dataObj);
//   //   dispatch(userSignUp(dataObj));
//   // }
//   // const onClickVerifyOtpApi = () => {
//   //   if (otpValue.length === 6) {
//   //     let dataObj = {
//   //       "countryCode": "91",
//   //       "countryCodeId": 1,
//   //       "mobileNumber": apiStateData.mobileNumber,
//   //       "emailId": apiStateData.emailId,
//   //       "password": apiStateData.password,
//   //       "companyId": 1,
//   //       "otp": otpValue,
//   //       "otpType": "string"
//   //     };
//   //     setSpinner(true); // Show spinner
//   //     dispatch(userSignUp(dataObj));
//   //   } else {
//   //     // Handle case when OTP length is not equal to 6
//   //     console.log("OTP should be exactly 6 characters long.");
//   //   }
//   // };

//   // const [otpValue, setOtpValue] = useState('');
//   const [error, setError] = useState(false);
//   const [errorStr, setErrorStr] = useState("");

//   const handleOtpChange = (otpValue) => {
//     setErrorStr("");
//     setServerErrorForOtp({})

//     setOtpValue(otpValue);
//     // setError(otpValue.length === 0 || otpValue.length < 6);
//     if (otpValue.length === 0 || otpValue.length < 6) {
//       setServerErrorForOtp({})

      
//       setError("string");
//     } else {
//       setServerErrorForOtp({})

//       setError("");
//     }
//   };
//   console.log(error, "");

//   const onClickVerifyForPassword = () => {

//     if (otpValue.length === 6) {
//       setSpinner(true);

//       // setErrorStr('');

//       let dataObj = {
//         // "countryCode": COUNTRY_CODE,
//         countryCodeId: 1,
//         emailMobile: apiStateData.emailMobile,
//         // "emailId": apiStateData.emailId,
//         // "password": apiStateData.password,
//         companyId: 1,
//         otp: otpValue,
//         otpType: "string",
//         //             "otp": "string",
//         // "emailMobile": "string",
//         // "companyId": 0
//       };

//       setSpinner(true)
//       // Show spinner
//       dispatch(userForget(dataObj));
//       console.log(dataObj, "dataObj.....");


//       console.log("OTP Verified:", otpValue);
//     } else {

//       setErrorStr("Please enter valid 6 digit OTP");
//     }
//   };

//   const onClickVerifyOtpApi = () => {
//     if (otpValue.length === 6) {
//       setSpinner(true);
//       setErrorStr("");

//       let dataObj = {
//         countryCode: COUNTRY_CODE,
//         countryCodeId: 1,
//         mobileNumber: apiStateData.mobileNumber,
//         emailId: apiStateData.emailId,
//         password: apiStateData.password,
//         companyId: 1,
//         otp: otpValue,
//         otpType: "string",
//       };
//       // Show spinner

//       dispatch(userSignUp(dataObj));

//       console.log("OTP Verified:", otpValue);
//     } else {
//       setErrorStr("Please enter valid 6 digit OTP");
//     }
//   };
//   //*onClick Clear state
//   const onClickClearState = () => {
//     setSpinner(false);
//   };
//   const {
//     getCompanyDetalisIsLoading,
//     getCompanyDetalisData,
//     getCompanyDetalisIsError,
//     getCompanyDetalisIsSuccess
//   } = useSelector((state) => ({
//     getCompanyDetalisIsLoading: state.companyDetalis.getCompanyDetalisIsLoading,
//     getCompanyDetalisData: state.companyDetalis.getCompanyDetalisData,
//     getCompanyDetalisIsError: state.companyDetalis.getCompanyDetalisIsError,
//     getCompanyDetalisIsSuccess: state.companyDetalis.getCompanyDetalisIsSuccess,
//   }));

// console.log(getCompanyDetalisData);

// //modal password


// const [forPasswordSuggestion, setForPasswordSuggestion] = useState(false);
// const passwordCriteria = [
//   'Be at least 8 characters long',
//   'Must contain at least one uppercase letter, one number, and one special character'
// ];

// const toggleModalForPasswordSuggestion = () => {
// setForPasswordSuggestion(!forPasswordSuggestion);
// };
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: BackgroundColor }}>
//       <Spinner
//         visible={spinner}
//         textContent={"Loading..."}
//         textStyle={styles.spinnerTextStyle}
//       />

//       <View style={{ flex: 0.08, justifyContent: "center" }}>
//         <View style={{ flexDirection: "row", alignItems: "center" }}>
//           <Pressable
//             onPress={() => {
//               onClickBackNavigation();
//             }}
//           >
//             <Image
//               style={{ height: 20, width: 20, marginRight: 5, marginLeft: 5 }}
//               source={LeftArrow}
//             ></Image>
//           </Pressable>

//           <Pressable
//             onPress={(onPressFunction) => {
//               onClickBackNavigation();
//             }}
//           >
//             <Text style={{ fontSize: 20, color: "#171A1F", fontWeight: "600" }}>
//               Verify OTP
//             </Text>
//           </Pressable>
//         </View>
//       </View>

//       <View style={{ flex: 1 }}>
//         <View style={{ flex: 0.4 }}>
//           {/* <View style={{ flex: 1 }}>
//             <Image
//               style={{ height: '100%', width: "100%" }}
//               source={backgroundImage}
//               resizeMode="stretch"
//             />
//           </View> */}
//           {/* <SignInTopImage viewFlex={0.9} /> */}
//           <SignInTopImage viewFlex={0.9}   companyLogo={  getCompanyDetalisData?.companyLogoUrl}
//                 backgroundImage={getCompanyDetalisData?.backGroundImageUrl}/>
//         </View>
//         <View style={{ flex: 0.5 }}>
//           <View style={{ flex: 0.6, justifyContent: "space-evenly" }}>
//             <View style={{ flex: 0.3 }}>
//               <Text
//                 style={{
//                   fontFamily: "Catamaran-Regualr",
//                   textAlign: "center",
//                   fontSize: 24,

//                   lineHeight: 36,
//                   color: "#171A1FFF",
//                 }}
//               >
//                 Verify Your Account
//               </Text>
//             </View>

//             <View style={{ flex: 0.6, alignSelf: "center" }}>
//               <Text
//                 style={{
//                   textAlign: "center",
//                   width: 314,
//                   fontFamily: COLOR_LIST.FONT_REGULAR /* Body */,
//                   fontSize: 14,
//                   fontWeight: "400",
//                   lineHeight: 22,
//                   color: "#9095A1FF",
//                 }}
//               >
//                 Please enter the verification code
//                 <Text
//                   style={{
//                     fontFamily: "Catamaran-Bold",
//                     color: "black",
//                     fontFamily: "Catamaran-semiBold",
//                     fontSize: 14,
//                     fontWeight: "400",
//                     lineHeight: 22,
//                   }}
//                 >
//                   {" "}
//                   we sent to your email and mobile{" "}
//                 </Text>
//                 {receivedData === "forgotPassword"
//                   ? "to complete the verification process."
//                   : "to complete the registration process."}
//               </Text>
//             </View>
//           </View>

//           <View style={{ flex: 0.5 }}>
//             <View style={{ flex: 0.8, marginHorizontal: 28, paddingTop: 20 }}>
//               <OtpBox onOtpChange={handleOtpChange} />
//             </View>
//             {serverErrorsForOtp.OTP && serverErrorsForOtp.OTP && (
//                 <Text style={[styles.errorInputText,{  marginTop: 30,
//                   color: "red",
//                   fontSize: 16,
//                   alignSelf: "center",}]}>
//                   {serverErrorsForOtp.OTP}
//                 </Text>
//               )}
//             <Text
//               style={{
//                 paddingTop: 30,
//                 color: "red",
//                 fontSize: 16,
//                 alignSelf: "center",
//               }}
//             >
//               {errorStr}
//             </Text>
            

//             <View
//               style={{
//                 marginTop: 10,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               {/* <Button
//                 title={"VERIFY"}
//                 // loading={true}
//                 // loadingProps={{
//                 //   size: 'small',
//                 //   color: 'rgba(111, 202, 186, 1)',
//                 // }}
//                 // icon={<Icon name={props.iconName} />}
//                 buttonStyle={{
//                   backgroundColor: '#EC3237',
//                   borderRadius: 26,
//                 }}
//                 containerStyle={{
//                   marginHorizontal: 20
//                 }}
//                 titleStyle={{
//                   fontWeight: 400,
//                   fontSize: 18,
//                 }}
//                 onPress={() => {
//                   onClickVerifyOtp();
//                 }}
//               /> */}
//               <VerifyButton
//                 titleName="VERIFY"
//                 iconName={otpIcon}
//                 onClick={onClickVerifyOtp}
//               />
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Reset Password successFully Popup */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isModalVisible}
//         onRequestClose={toggleModal}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Image
//               source={PopupIcon}
//               style={{
//                 width: 86,
//                 height: 86,
//                 marginTop: 14,
//                 marginHorizontal: 5,
//               }}
//             />
//             <Text
//               style={{
//                 marginTop: 22,
//                 fontFamily: "Catamaran-semiBold" /* Body */,
//                 fontSize: 22,
//                 fontWeight: "500",
//                 lineHeight: 34,
//                 color: "#1DD75BFF",
//                 textAlign: "center",
//               }}
//             >
//               Password reset successfully!
//             </Text>
//             <Text
//               style={{
//                 marginTop: 6,
//                 width: 308,
//                 height: 49,
//                 fontFamily: "Catamaran-Thick" /* Body */,
//                 fontSize: 14,
//                 fontWeight: "400",
//                 lineHeight: 22,
//                 color: "#9095A1FF",
//                 textAlign: "center",
//               }}
//             >
//               Please redirect back to login page and login with your new
//               password
//             </Text>
//             <PopupButton
//               title="BACK TO LOGIN"
//               imageIcon={PopupIcon}
//               onClick={() => {
//                 onClickBackToLogin();
//               }}
//             />
//           </View>
//         </View>
//       </Modal>

//       {/* Reset Password  Popup */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isResetPassword}
//         onRequestClose={onClickCloseResetPassword}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text
//               style={{
//                 fontSize: 24,
//                 color: "#171A1F",
//                 marginTop: 20,
//                 fontWeight: 600,
//                 height: 36,
//               }}
//             >
//               Enter New Password
//             </Text>
//             <View style={styles.inputView}>
//               <TextInput
//                 // label="Password"
//                 label={
//                   <Text>
//                     <Text>New Password</Text>
//                     <Text style={{ color: "red" }}>*</Text>
//                   </Text>
//                 }
//                 mode="outlined"
//                 style={[styles.input]}
//                 onChangeText={handleChange("password")}
//                 onBlur={handleBlur("password")}
//                 maxLength={15}
//                 value={values.password}
//                 placeholder=" New Password"
//                 secureTextEntry={!showPassword}
//                 right={
//                   <TextInput.Icon
//                     icon={showPassword ? "eye" : "eye-off"}
//                     onPress={() => setShowPassword(!showPassword)}
//                   />
//                 }
//               />
//               {/* <TextInput
//                 label="Password"
//                 keyboardType="email-address"
//                 mode="outlined"
//                 style={[styles.input]}
//                 onChangeText={handleChange('password')}
//                 onBlur={handleBlur('password')}
//                 value={values.password}
//                 placeholder="Password"
//                 autoCapitalize="none"
//                 maxLength={15}
//                 secureTextEntry={!showPassword}
//                 right={
//                   // <TextInput.Icon
//                   //   icon={showPassword ? 'eye' : 'eye-off'}
//                   //   onPress={() => setShowPassword(showPassword)}
//                   // />
//                   <TextInput.Icon
//                   icon={showPassword ? 'eye' : 'eye-off'}
//                   onPress={() => setShowPassword(!showPassword)}
//               />
//                 }
//               /> */}
              
//               {touched.password && errors.password && (
//                 <Text style={styles.errorInputText}>{errors.password}</Text>
//               )}
//             </View>
//             <View style={styles.inputView}>
//               <TextInput
//                 // label="Password"
//                 label={
//                   <Text>
//                     <Text>Confirm Password</Text>
//                     <Text style={{ color: "red" }}>*</Text>
//                   </Text>
//                 }
//                 mode="outlined"
//                 style={[styles.input]}
//                 onChangeText={handleChange("confirmPassword")}
//                 onBlur={handleBlur("confirmPassword")}
//                 maxLength={15}
//                 value={values.confirmPassword}
//                 placeholder="confirm Password"
//                 secureTextEntry={!confirmPassword}
//                 right={
//                   <TextInput.Icon
//                     icon={confirmPassword ? "eye" : "eye-off"}
//                     onPress={() => setConfirmPassword(!confirmPassword)}
//                   />
//                 }
//               />
//               {/* <TextInput
//                 label="Confirm Password"
//                 keyboardType="email-address"
//                 mode="outlined"
//                 style={[styles.input]}
//                 onChangeText={handleChange('confirmPassword')}
//                 onBlur={handleBlur('confirmPassword')}
//                 value={values.confirmPassword}
//                 placeholder="Confirm Password"
//                 autoCapitalize="none"
//                 maxLength={15}
//                 secureTextEntry={!confirmPassword}
//                 right={
//                   <TextInput.Icon
//                     icon={confirmPassword ? 'eye' : 'eye-off'}
//                     onPress={() => setConfirmPassword(!confirmPassword)}
//                   />
//                 }
//               /> */}
          
//               {touched.confirmPassword && errors.confirmPassword && (
//                 <Text style={styles.errorInputText}>
//                   {errors.confirmPassword}
//                 </Text>
//               )}
//               {serverErrors.Password && serverErrors.Password && (
//                 <Text style={styles.errorInputText}>
//                   {serverErrors.Password}
//                 </Text>
//               )}
//                    <View style={{marginTop:5}}>
//  <TouchableOpacity onPress={toggleModalForPasswordSuggestion} style={styles.iconButton}>
//         <VectorIcon name="information-circle" size={24} color="black" />
      
//       </TouchableOpacity></View>
//             </View>

//             <Button
//               title={"SET NEW PASSWORD"}
//               buttonStyle={{
//                 backgroundColor: "#EC3237",
//                 borderRadius: 26,
//               }}
//               containerStyle={{
//                 width: 250,
//                 marginVertical: 10,
//                 marginTop: 50,
//               }}
//               titleStyle={{
//                 fontWeight: 400,
//                 fontSize: 16,
//               }}
//               onPress={handleSubmit}
//             />
//           </View>
//         </View>
//       </Modal>

//       {/* User verification Popup */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isUserVerify}
//         onRequestClose={() => {
//           setIsUserVerify(false);
//         }}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Image
//               source={PopupIcon}
//               style={{ width: 86, height: 86, marginTop: 14 }}
//             />
//             <Text
//               style={{
//                 marginTop: 22,
//                 fontFamily: "Catamaran-semiBold" /* Body */,
//                 fontSize: 22,
//                 fontWeight: "500",
//                 lineHeight: 34,
//                 color: "#1DD75BFF",
//               }}
//             >
//               Congrats! You're almost done
//             </Text>
//             <Text
//               style={{
//                 marginTop: 6,
//                 width: 308,
//                 height: 49,
//                 fontFamily: "Catamaran-Thick" /* Body */,
//                 fontSize: 14,
//                 fontWeight: "400",
//                 lineHeight: 22,
//                 color: "#9095A1FF",
//                 textAlign: "center",
//               }}
//             >
//               Please complete your profile to start property registration
//               process
//             </Text>
//             <PopupButton
//               title="COMPLETE PROFILE"
//               imageIcon={PopupIcon}
//               iconStyle={{
//                 tintColor: "white",
//                 width: 30,
//                 height: 30,
//                 marginTop: 10,
//                 marginRight: -10,
//               }}
//               onClick={() => {
//                 onClickProfilePopup();
//               }}
//             />
//           </View>
//         </View>
//       </Modal>
//       <CommonModal 
// isVisible={forPasswordSuggestion} 
// toggleModal={toggleModalForPasswordSuggestion} 
// title="Password must:" 
// content={passwordCriteria} 
// marginTop={300}
// />

//     </SafeAreaView>
//   );
// };
// export default OtpSubmit;

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     backgroundColor: BackgroundColor,
//     padding: 20,
//     borderRadius: 10,
//     alignItems: "center",
//     width: 350,
//   },
//   inputView: {
//     width: 300,
//     marginTop: 15,
//   },
//   input: {
//     marginTop: 5,
//   },
//   spinnerTextStyle: {
//     color: "#FFF",
//   },
//   errorInputText: {
//     color: "red",
//     // marginHorizontal: 12,
//   },
// });



import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Alert,
  Image,
  Button
} from "react-native";
import VectorIcon from 'react-native-vector-icons/Ionicons';

import { TextInput } from "react-native-paper";
import { CommonModal, PopupButton } from "../../components/common";
import otpIcon from "../../assets/verifyIcon.png";
import { OtpBox } from "../../components/common";
import { useNavigation } from "@react-navigation/native";
// import { Image } from "@rneui/base";
import PopupIcon from "../../assets/popupCheck.png";
// import { Button, Icon } from "@rneui/themed";
import { BackgroundColor } from "../../helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { userSignUp } from "../../redux/slice/signUp";
import { useToast } from "react-native-toast-notifications";
import Spinner from "react-native-loading-spinner-overlay";
import { useFormik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
//*Images
import LeftArrow from "../../assets/Leftarrow26.png";
import backgroundImage from "../../assets/loginBackgroundImage.png";
import { SignInTopImage } from "../../components/common";
import { userForget, resetUserForget } from "../../redux/slice/userForget";
import { clearStates } from "../../redux/slice/resetPassword";
import {
  resetPassword,
  resetforgetPassword,
  resetpassword,
} from "../../redux/slice/resetPassword";
import { VerifyButton } from "../../components/common";
import { COMPANY_ID, COUNTRY_CODE } from "../../helpers/enum";
import { COLOR_LIST } from "../../helpers/colorlist";
import { clearStateForForgetPassword, userForgotPassword } from "../../redux/slice/forgotPassword";
import InternetAlert from "../../components/InternetAlert";
const OtpSubmit = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  const receivedData = route.params?.screenName;
  const apiStateData = route.params?.stateValues;

  const { isLoading, data, isError, isSuccess } = useSelector((state) => ({
    isLoading: state.signUp.isLoading,
    data: state.signUp.data,
    isError: state.signUp.isError,
    isSuccess: state.signUp.isSuccess,
  }));


  // const auth=data;
  // console.log(auth);


  const {
    getCompanyDetalisIsLoading,
    getCompanyDetalisData,
    getCompanyDetalisIsError,
    getCompanyDetalisIsSuccess
  } = useSelector((state) => ({
    getCompanyDetalisIsLoading: state.companyDetalis.getCompanyDetalisIsLoading,
    getCompanyDetalisData: state.companyDetalis.getCompanyDetalisData,
    getCompanyDetalisIsError: state.companyDetalis.getCompanyDetalisIsError,
    getCompanyDetalisIsSuccess: state.companyDetalis.getCompanyDetalisIsSuccess,
  }));

  //resetPassword passwordReset

  const {
    resetPasswordIsLoading,
    resetPasswordData,
    resetPasswordIsError,
    resetPasswordIsSuccess,
  } = useSelector((state) => ({
    resetPasswordIsLoading: state.passwordReset.resetPasswordIsLoading,
    resetPasswordData: state.passwordReset.resetPasswordData,
    resetPasswordIsError: state.passwordReset.resetPasswordIsError,
    resetPasswordIsSuccess: state.passwordReset.resetPasswordIsSuccess,
  }));
  
  const [serverErrors, setServerErrors] = useState({});
  const [serverErrorsForOtp, setServerErrorForOtp] = useState({});

  useEffect(() => {
    if (
      resetPasswordData &&
      resetPasswordIsSuccess == true &&
      resetPasswordIsError === false &&
      resetPasswordIsLoading == false &&
      receivedData === "forgotPassword"
    ) {
      // setmessage(userForgetData

      setIsResetPassword(false);
      setModalVisible(true);
      setOtpValue(otpValue);

      // clearState();
      dispatch(resetforgetPassword());


      // resetpassword();
      //  console.log('====================================');

      //  console.log('====================================');
      //  console.log(apiStateData.emailMobile,'apiStateData.emailMobile,');
    } else if (
      resetPasswordIsSuccess === false &&
      resetPasswordIsError === true &&
      resetPasswordData
    ) {
      setSpinner(false);
      setServerErrors(resetPasswordData.errors);
      // dispatch(resetgetmetersFromMasterData());
      dispatch(resetforgetPassword());
    }
  }, [resetPasswordData, resetPasswordIsSuccess]);

  const {
    userForgetIsLoading,
    userForgetData,
    userForgetIsSuccess,
    userForgetIsError,
  } = useSelector((state) => ({
    userForgetIsLoading: state.forgetuser.userForgetIsLoading,
    userForgetData: state.forgetuser.userForgetData,
    userForgetIsError: state.forgetuser.userForgetIsError,
    userForgetIsSuccess: state.forgetuser.userForgetIsSuccess,
  }));

  const { forgetPasswordIsLoading, forgetPasswordData, forgetPasswordIsError, forgetPasswordIsSuccess } = useSelector((state) =>({
     
    forgetPasswordIsLoading: state.forgotPassword.forgetPasswordIsLoading,
    forgetPasswordData: state.forgotPassword.forgetPasswordData,
    forgetPasswordIsError: state.forgotPassword.forgetPasswordIsError,
    forgetPasswordIsSuccess: state.forgotPassword.forgetPasswordIsSuccess,
 }));
 useEffect(() => {
    // setFieldValue("spinner", false);
    // setServerErrors({});
    if (forgetPasswordData && forgetPasswordIsSuccess === true && forgetPasswordIsLoading === false && forgetPasswordIsError === false) {
        // setFieldValue("spinner", !values.spinner);
        // toast.show("OTP sent successfully", {
        //     type: "success",
        //     placement: "top",
        //     duration: 3000,
        //     offset: 30,
        //     animationType: "slide-in",
        // });
        
          //  navigation.navigate('otpSubmit', { "screenName": "forgotPassword","stateValues": forgetDetail });

        // navigation.navigate('otpSubmit', { "screenName": "signUpScreen", });
        // clearState(); 
        // resetforgetPassword();
        dispatch( resetforgetPassword());


    }

      else if (forgetPasswordIsSuccess === false && forgetPasswordIsError === true && forgetPasswordIsLoading===true) {
        // setFieldValue("spinner", false);
       // clearState();
       // dispatch(resetLoginDetails());
       dispatch( resetforgetPassword());

        toast.show(forgetPasswordData.errors?.EmailMobile , {
            type: "danger",
            placement: "top",
            duration:3000,
            offset: 30,
            animationType: "slide-in",
        });
    }
}, []);


  useEffect(() => {
    if (
      userForgetData &&
      userForgetIsSuccess == true &&
      userForgetIsLoading == false &&
      userForgetIsError==false&&
      receivedData === "forgotPassword"
    ) {

      toast.show(userForgetData, {
        type: "success",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "zoom-in",
      });
      console.log('efoerjfjorejfjrofjrjofj');

      dispatch(resetUserForget());
      setIsResetPassword(true);
      setServerErrorForOtp({})

    }else if (
      userForgetIsSuccess === false &&
      userForgetIsError===true&&
      userForgetData &&receivedData === "forgotPassword"

      ) {
        setSpinner(false);
        console.log("jefojojojojojojojojo");
        setServerErrorForOtp(userForgetData.errors);

        // dispatch(resetgetmetersFromMasterData());
        dispatch(resetUserForget());
      }

      // console.log('====================================');

      // console.log('====================================');
      // console.log(apiStateData.emailMobile, 'apiStateData.emailMobile,');
    
  }, [userForgetData, userForgetIsSuccess,userForgetIsError]);
  // const[message ,setmessage]= useState('');

  //*state

  const [isModalVisible, setModalVisible] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isUserVerify, setIsUserVerify] = useState(false);
  const [otpValue, setOtpValue] = useState(false);
  const [spinner, setSpinner] = useState(false);

  //*reset password state ___________________________

  //*state
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  //*initial state
  const resetPasswordValues = {
    password: "",
    confirmPassword: "",
  };

console.log(data,"---------------------------------------------");
  const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[\W_]/, "Password must contain at least one special character")
      .matches(/^\S*$/, "Password must not contain spaces")
      .min(8, "Password must be at least 8 characters long")

      .max(15, "Password must be at most 15 characters long"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Confirm password is required.")
      .required("Password is required")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[\W_]/, "Password must contain at least one special character")
      .matches(/^\S*$/, "Password must not contain spaces")
      .min(8, "Password must be at least 8 characters long")
      .max(15, "Password must be at most 15 characters long"),
  });
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: resetPasswordValues,
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      onClickSetPassword();
    },
  });

  //*reset password state ___________________________
  useEffect(() => {
    setErrorStr("");
    if (data && data.accessToken && receivedData != "forgotPassword") {
      setIsUserVerify(true);
    } else if (data && data.message) {
      setErrorStr(data.message);
    } else if (isError && !isSuccess && data) {
      setErrorStr(data.errors?.Otp.toString());
    }
    setSpinner(false);
    console.log("Errorrr", data);
  }, [isSuccess, data]);

  const toggleModal = () => {
    // setModalVisible(!isModalVisible);
    setModalVisible(false);

    setTimeout(() => {
      navigation.navigate("signIn");
    }, 3000);
  };

  useEffect(() => {
    // console.log('receivedData----', JSON.stringify(receivedData));
    // console.log('apiStateData----', JSON.stringify(apiStateData));
  }, []);

  const onClickBackNavigation = () => {
    if (receivedData === "forgotPassword") {

      navigation.navigate("forgotPassword");
    } else {
      navigation.navigate("signUp");
    }
  };

  const onClickVerifyOtp = () => {
    setErrorStr("");
    if (receivedData === "forgotPassword") {
      // onClickVerifyOtpApi();
      onClickVerifyForPassword();
      //  setIsResetPassword(true);
    } else {
      onClickVerifyOtpApi();
      // setIsUserVerify(true);
    }
  };

  const onClickCloseResetPassword = () => {
    setIsResetPassword(false);
    setServerErrors({});
    setOtpValue(false)

    dispatch(resetforgetPassword());
    navigation.navigate("signIn");

  };

  const onClickSetPassword = () => {
    let dataObj = {
      companyId: COMPANY_ID,
      countryCode: COUNTRY_CODE,
      emailMobile: apiStateData.emailMobile,
      password: values.password,
      confirmPassword: values.confirmPassword,
      lastOtp: otpValue,
    };
  

    // setSpinner(true);
    // setFieldValue("spinner", !values.spinner);
    // setOtpValue(false);
    setServerErrorForOtp({})

    dispatch(resetPassword(dataObj));
  };

  const onClickBackToLogin = () => {
    // setIsResetPassword(false);
    setModalVisible(false);
    dispatch(clearStates());
    dispatch(clearStateForForgetPassword());


    
  //  dispatch(resetforgetPassword());
   
    setServerErrors({});
    
    setOtpValue(false)


    

    // dispatch(resetforgetPassword());
    navigation.navigate("signIn");
    // navigation.navigate("signIn");


 };
  const clearState = async () => {
    setFieldValue("password", "");
    setFieldValue("confirmPassword", "");
  };

  const onClickProfilePopup = async () => {
    if (data.accessToken && data.userId) {
      await AsyncStorage.setItem("accessToken", data.accessToken);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);
      await AsyncStorage.setItem("userId", data.userId.toString());
      await AsyncStorage.setItem("role", data.role || "Consumer");
      await AsyncStorage.setItem("emailId", data.emailId);
      await AsyncStorage.setItem("mobile", data.mobile);
      await AsyncStorage.setItem(
        "isProfileComplete",
        data.isProfileComplete.toString()
      );
      await AsyncStorage.setItem("sessionKey", data.sessionKey);
      

      setIsUserVerify(false);
      navigation.navigate("profile", {
        mobile: apiStateData.mobileNumber,
        emailId: apiStateData.emailId,
      });
    } else {
      toast.show("Something went wrong, Please retry!", {
        type: "danger",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "zoom-in",
      });
      navigation.navigate("signIn");
    }
  };

  const [timer, setTimer] = useState(60);
  const [isResendVisible, setIsResendVisible] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendVisible(true);
    }
  }, [timer]);





  const onClickForgotPassword=()=>{
    // let userId = await AsyncStorage.getItem('userId');
    let dataObj = {
     
            "countryCode": "27",
            "emailMobile": apiStateData.emailMobile,
           "companyId": COMPANY_ID
      
    };
    setTimer(60); 

    setIsResendVisible(false); 

    dispatch(userForgotPassword(dataObj));
  }



  

  // const handleResendOtp = () => {

   
  //   toast.show("OTP send successfully", {
  //     type: "success",
  //     placement: "top",
  //     duration: 3000,
  //     offset: 30,
  //     animationType: "zoom-in",
  //   });
  // };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // const handleOtpChange = (otpValue) => {
  //   setOtpValue(otpValue);
  // };

  //*onClick Verify otp
  // const onClickVerifyOtpApi = () => {
  //   let dataObj = {
  //     "countryCode": "91",
  //     "countryCodeId": 1,
  //     "mobileNumber": apiStateData.mobileNumber,
  //     "emailId": apiStateData.emailId,
  //     "password": apiStateData.password,
  //     "companyId": 1,
  //     "otp": otpValue,
  //     "otpType": "string"
  //   }
  //   setSpinner(!spinner)
  //   // console.log("usersignup",dataObj);
  //   dispatch(userSignUp(dataObj));
  // }
  // const onClickVerifyOtpApi = () => {
  //   if (otpValue.length === 6) {
  //     let dataObj = {
  //       "countryCode": "91",
  //       "countryCodeId": 1,
  //       "mobileNumber": apiStateData.mobileNumber,
  //       "emailId": apiStateData.emailId,
  //       "password": apiStateData.password,
  //       "companyId": 1,
  //       "otp": otpValue,
  //       "otpType": "string"
  //     };
  //     setSpinner(true); // Show spinner
  //     dispatch(userSignUp(dataObj));
  //   } else {
  //     // Handle case when OTP length is not equal to 6
  //     console.log("OTP should be exactly 6 characters long.");
  //   }
  // };

  // const [otpValue, setOtpValue] = useState('');
  const [error, setError] = useState(false);
  const [errorStr, setErrorStr] = useState("");

  const handleOtpChange = (otpValue) => {
    setErrorStr("");
    setServerErrorForOtp({})

    setOtpValue(otpValue);
    // setError(otpValue.length === 0 || otpValue.length < 6);
    if (otpValue.length === 0 || otpValue.length < 6) {
      setServerErrorForOtp({})

      
      setError("string");
    } else {
      setServerErrorForOtp({})

      setError("");
    }
  };

  const onClickVerifyForPassword = () => {

    if (otpValue.length === 6) {
      setSpinner(true);

      // setErrorStr('');

      let dataObj = {
        // "countryCode": COUNTRY_CODE,
        countryCodeId: 1,
        emailMobile: apiStateData.emailMobile,
        // "emailId": apiStateData.emailId,
        // "password": apiStateData.password,
        companyId: 1,
        otp: otpValue,
        otpType: "string",
        //             "otp": "string",
        // "emailMobile": "string",
        // "companyId": 0
      };

      setSpinner(true)
      // Show spinner
      dispatch(userForget(dataObj));

    } else {

      setErrorStr("Please enter valid 6 digit OTP");
    }
  };
  const passwordCriteria = [
      ' be at least 8 characters long  with a maximum length of 15 characters.',
       "contain both upper-case and lower-case letters,at least one number and one special character."
  ];

  const onClickVerifyOtpApi = () => {
    if (otpValue.length === 6) {
      setSpinner(true);
      setErrorStr("");

      let dataObj = {
        countryCode: COUNTRY_CODE,
        countryCodeId: 1,
        mobileNumber: apiStateData.mobileNumber,
        emailId: apiStateData.emailId,
        password: apiStateData.password,
        companyId: 1,
        otp: otpValue,
        otpType: "string",
      };
      // Show spinner

      dispatch(userSignUp(dataObj));

      console.log("OTP Verified:", otpValue);
    } else {
      setErrorStr("Please enter valid 6 digit OTP");
    }
  };
  //*onClick Clear state
  const onClickClearState = () => {
    setSpinner(false);
  };
  const [forPasswordSuggestion, setForPasswordSuggestion] = useState(false);

  const toggleModalForPasswordSuggestion = () => {
    setForPasswordSuggestion(!forPasswordSuggestion);
    };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BackgroundColor }}>
                        <InternetAlert />

      <Spinner
        visible={spinner}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />

      <View style={{ flex: 0.08, justifyContent: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable
            onPress={() => {
              onClickBackNavigation();
            }}
          >
            <Image
              style={{ height: 20, width: 20, marginRight: 5, marginLeft: 5 }}
              source={LeftArrow}
            ></Image>
          </Pressable>

          <Pressable
            onPress={(onPressFunction) => {
              onClickBackNavigation();
            }}
          >
            <Text style={{ fontSize: 20, color: "#171A1F", fontWeight: "600" }}>
              Verify OTP
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.4 }}>
          {/* <View style={{ flex: 1 }}>
            <Image
              style={{ height: '100%', width: "100%" }}
              source={backgroundImage}
              resizeMode="stretch"
            />
          </View> */}
          <SignInTopImage viewFlex={0.9}   companyLogo={  getCompanyDetalisData?.companyLogoUrl}
                backgroundImage={getCompanyDetalisData?.backGroundImageUrl}/>
        </View>
        <View style={{ flex: 0.5 }}>
          <View style={{ flex: 0.6, justifyContent: "space-evenly" }}>
            <View style={{ flex: 0.3 }}>
              <Text
                style={{
                  fontFamily: "Catamaran-Regualr",
                  textAlign: "center",
                  fontSize: 24,

                  lineHeight: 36,
                  color: "#171A1FFF",
                }}
              >
                Verify Your Account
              </Text>
            </View>

            <View style={{ flex: 0.6, alignSelf: "center" }}>
              <Text
                style={{
                  textAlign: "center",
                  width: 314,
                  fontFamily: COLOR_LIST.FONT_REGULAR /* Body */,
                  fontSize: 14,
                  fontWeight: "400",
                  lineHeight: 22,
                  color: "#9095A1FF",
                }}
              >
                Please enter the verification code
                <Text
                  style={{
                    fontFamily: "Catamaran-Bold",
                    color: "black",
                    fontFamily: "Catamaran-semiBold",
                    fontSize: 14,
                    fontWeight: "400",
                    lineHeight: 22,
                  }}
                >
                  {" "}
                  we sent to your email and mobile{" "}
                </Text>
                {receivedData === "forgotPassword"
                  ? "to complete the verification process."
                  : "to complete the registration process."}
              </Text>
            </View>
          </View>

          <View style={{ flex: 0.5,}}>
            <View style={{ flex: 0.3, marginHorizontal: 28, paddingTop: 10 }}>
              <OtpBox onOtpChange={handleOtpChange} />
            </View>
            
            
            

            {serverErrorsForOtp.OTP && (
                <Text style={[styles.errorInputText,{ paddingTop:20,
                  color: "red",
                  fontSize: 16,
                  alignSelf: "center",}]}>
                  {serverErrorsForOtp.OTP}
                </Text>
              )}
              { serverErrorsForOtp.Otp && (

                <Text style={[styles.errorInputText,{ paddingTop:20,
                  color: "red",
                  fontSize: 16,
                  alignSelf: "center",}]}>
                  {serverErrorsForOtp.Otp}
                </Text>
              )}
            <Text
              style={{
                paddingTop:15,
                color: "red",
                fontSize: 16,
                alignSelf: "center",
              }}
            >
              {errorStr}
            </Text>

            <View
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Button
                title={"VERIFY"}
                // loading={true}
                // loadingProps={{
                //   size: 'small',
                //   color: 'rgba(111, 202, 186, 1)',
                // }}
                // icon={<Icon name={props.iconName} />}
                buttonStyle={{
                  backgroundColor: '#EC3237',
                  borderRadius: 26,
                }}
                containerStyle={{
                  marginHorizontal: 20
                }}
                titleStyle={{
                  fontWeight: 400,
                  fontSize: 18,
                }}
                onPress={() => {
                  onClickVerifyOtp();
                }}
              /> */}
              <VerifyButton
                titleName="VERIFY"
                iconName={otpIcon}
                onClick={onClickVerifyOtp}
              />
            </View>

            <View style={{ marginTop: 10, alignItems: 'center' }}>
        {isResendVisible ? (
          <TouchableOpacity onPress={onClickForgotPassword}>
            <Text style={{ color: 'red' }}>Resend OTP</Text>
          </TouchableOpacity>
        ) : (
          <Text style={{ color: 'black', textAlign: 'center' }}>{` Didn't received OTP? Please wait  ${formatTime(timer)}`}</Text>
        )}
      </View>
          </View>

        </View>
      </View>

      {/* Reset Password successFully Popup */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={PopupIcon}
              style={{
                width: 86,
                height: 86,
                marginTop: 14,
                marginHorizontal: 5,
              }}
            />
            <Text
              style={{
                marginTop: 22,
                fontFamily: "Catamaran-semiBold" /* Body */,
                fontSize: 22,
                fontWeight: "500",
                lineHeight: 34,
                color: "#1DD75BFF",
                textAlign: "center",
              }}
            >
              Password reset successfully!
            </Text>
            <Text
              style={{
                marginTop: 6,
                width: 308,
                height: 49,
                fontFamily: "Catamaran-Thick" /* Body */,
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 22,
                color: "#9095A1FF",
                textAlign: "center",
              }}
            >
              Please redirect back to login page and login with your new
              password
            </Text>
            <PopupButton
              title="BACK TO LOGIN"
              imageIcon={PopupIcon}
              onClick={() => {
                onClickBackToLogin();
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Reset Password  Popup */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isResetPassword}
        onRequestClose={onClickCloseResetPassword}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{
                fontSize: 24,
                color: "#171A1F",
                marginTop: 20,
                fontWeight: 600,
                height: 36,
              }}
            >
              Reset Your Password
            </Text>
            <View style={styles.inputView}>
              <TextInput
                // label="Password"
                label={
                  <Text>
                    <Text>Enter New Password</Text>
                    <Text style={{ color: "red" }}>*</Text>
                  </Text>
                }
                mode="outlined"
                style={[styles.input]}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                maxLength={15}
                value={values.password}
                placeholder="Enter New Password"
                secureTextEntry={!showPassword}
                right={
                  // <TextInput.Icon
                  //   icon={showPassword ? "eye" : "eye-off"}
                  //   onPress={() => setShowPassword(!showPassword)}
                  // />
                  <TextInput.Icon
                  icon={() => (
                    <VectorIcon
                      name={showPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color="black"
                      onPress={() => setShowPassword(!showPassword)}
  
                    // Toggle visibility
                    />
                  )}
                />
                }
              />
              {/* <TextInput
                label="Password"
                keyboardType="email-address"
                mode="outlined"
                style={[styles.input]}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Password"
                autoCapitalize="none"
                maxLength={15}
                secureTextEntry={!showPassword}
                right={
                  // <TextInput.Icon
                  //   icon={showPassword ? 'eye' : 'eye-off'}
                  //   onPress={() => setShowPassword(showPassword)}
                  // />
                  <TextInput.Icon
                  icon={showPassword ? 'eye' : 'eye-off'}
                  onPress={() => setShowPassword(!showPassword)}
              />
                }
              /> */}
              {touched.password && errors.password && (
                <Text style={styles.errorInputText}>{errors.password}</Text>
              )}
            </View>
            <View style={styles.inputView}>
              <TextInput
                // label="Password"
                label={
                  <Text>
                    <Text>Confirm Password</Text>
                    <Text style={{ color: "red" }}>*</Text>
                  </Text>
                }
                mode="outlined"
                style={[styles.input]}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                maxLength={15}
                value={values.confirmPassword}
                placeholder="confirm Password"
                secureTextEntry={!confirmPassword}
                right={
                  <TextInput.Icon
                    icon={confirmPassword ? "eye" : "eye-off"}
                    onPress={() => setConfirmPassword(!confirmPassword)}
                  />
                }
              />


              {/* <TextInput
                label="Confirm Password"
                keyboardType="email-address"
                mode="outlined"
                style={[styles.input]}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                placeholder="Confirm Password"
                autoCapitalize="none"
                maxLength={15}
                secureTextEntry={!confirmPassword}
                right={
                  <TextInput.Icon
                    icon={confirmPassword ? 'eye' : 'eye-off'}
                    onPress={() => setConfirmPassword(!confirmPassword)}
                  />
                }
              /> */}
              {touched?.confirmPassword && errors?.confirmPassword && (
                <Text style={styles.errorInputText}>
                  {errors?.confirmPassword}
                </Text>
              )}
              {serverErrors?.Password && serverErrors?.Password && (
                <Text style={styles.errorInputText}>
                  {serverErrors?.Password}
                </Text>
              )}
               <View style={{marginTop:5}}>
 <TouchableOpacity onPress={toggleModalForPasswordSuggestion} style={styles.iconButton}>
        <VectorIcon name="information-circle" size={24} color="black" />
      
      </TouchableOpacity></View>
            </View>



            <Button
              title={"SET NEW PASSWORD"}
              buttonStyle={{
                backgroundColor: "#EC3237",
                borderRadius: 26,
              }}
              containerStyle={{
                width: 250,
                marginVertical: 10,
                marginTop: 20,
              }}
              titleStyle={{
                fontWeight: 400,
                fontSize: 16,
              }}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </Modal>

      {/* User verification Popup */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isUserVerify}
        onRequestClose={() => {
          setIsUserVerify(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={PopupIcon}
              style={{ width: 86, height: 86, marginTop: 14 }}
            />
            <Text
              style={{
                marginTop: 22,
                fontFamily: "Catamaran-semiBold" /* Body */,
                fontSize: 22,
                fontWeight: "500",
                lineHeight: 34,
                color: "#1DD75BFF",
              }}
            >
              Congrats! You're almost done
            </Text>
            <Text
              style={{
                marginTop: 6,
                width: 308,
                height: 49,
                fontFamily: "Catamaran-Thick" /* Body */,
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 22,
                color: "#9095A1FF",
                textAlign: "center",
              }}
            >
              Please complete your profile to start property registration
              process
            </Text>
            <PopupButton
              title="COMPLETE PROFILE"
              imageIcon={PopupIcon}
              iconStyle={{
                tintColor: "white",
                width: 30,
                height: 30,
                marginTop: 10,
                marginRight: -10,
              }}
              onClick={() => {
                onClickProfilePopup();
              }}
            />
          </View>
        </View>
      </Modal>


      <CommonModal 
        isVisible={forPasswordSuggestion} 
        toggleModal={toggleModalForPasswordSuggestion} 
        title="Password Must:" 
        content={passwordCriteria} 
        marginTop={320}
      />
   

    </SafeAreaView>
  );
};
export default OtpSubmit;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: BackgroundColor,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: 350,
  },
  inputView: {
    width: 300,
    marginTop: 15,
  },
  input: {
    marginTop: 5,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  errorInputText: {
    color: "red",
    // marginHorizontal: 12,
  },

  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal:2
  },
});

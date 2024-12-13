
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { TextInput } from 'react-native-paper';
import { signInBackgroundColor, BackgroundColor, NormalLinkText, RedLinkText } from '../../helpers/constants'
import { SignInButton, SignInTopImage, PopupButton } from '../../components/common'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { COMPANY_ID } from '../../helpers/enum';
import { ValidateMobileNo } from '../../helpers/commonFunction'
import { useNavigation } from '@react-navigation/native';
import {userForgotPassword,resetforgetPassword} from '../../redux/slice/forgotPassword'
//*images
import otpIcon from '../../assets/otpIcon.png'
import { useDispatch,useSelector } from 'react-redux';
import PopupIcon from '../../assets/popupCheck.png';
import Spinner from 'react-native-loading-spinner-overlay';
import { useToast } from "react-native-toast-notifications";
import { clearStateForForgetPassword } from '../../redux/slice/forgotPassword';
import InternetAlert from '../../components/InternetAlert';

const ForgotPassword = (props) => {
    const toast = useToast();

    const navigation = useNavigation();
    const dispatch = useDispatch();
    //*initial state
    const initialValues = {
        isEmail: "1",

        emailOrMobileNumber: "",
        spinner: false,

    }
    const phoneRegex = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
    const [forgetDetail, setForgetDetail] = useState({
        "emailOrMobileNumber": '',
      
    })
   


    const { forgetPasswordIsLoading, forgetPasswordData, forgetPasswordIsError, forgetPasswordIsSuccess } = useSelector((state) =>({
     
        forgetPasswordIsLoading: state.forgotPassword.forgetPasswordIsLoading,
        forgetPasswordData: state.forgotPassword.forgetPasswordData,
        forgetPasswordIsError: state.forgotPassword.forgetPasswordIsError,
        forgetPasswordIsSuccess: state.forgotPassword.forgetPasswordIsSuccess,
     }));

     console.log('====================================');
     console.log("forgetPasswordData",forgetPasswordData);
     console.log('====================================');

    //  useEffect(() => {
    //     setFieldValue("spinner", false);
    //     setServerErrors({});
    //     if (forgetPasswordData && forgetPasswordIsSuccess === true && forgetPasswordIsLoading === false ) {
    //         setFieldValue("spinner", !values.spinner);
    //         toast.show(forgetPasswordData.mobileResponse, {
    //             type: "success",
    //             placement: "top",
    //             duration: 3000,
    //             offset: 30,
    //             animationType: "slide-in",
    //         });
            
    //         // navigation.navigate('otpSubmit', { "screenName": "signUpScreen", "stateValues": otpApiState });
    //         clearState();
    //    }

  
  
    //*form validation
    // const forgotPasswordSchema = Yup.object().shape({
    //     emailOrMobileNumber: Yup.string().email("Invalid Email").required("Email is required."),
    // });
    const forgotPasswordSchema = Yup.object().shape({
        // emailOrMobileNumber: Yup.string()
        // emailOrMobileNumber: Yup.string()
        // .when("isEmail", {
        //     is: '1',
        //     then: () =>
        //         Yup.string()
        //             .required("Please enter valid username")
        //             .matches(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.-)+[a-zA-Z]{2,7}$/, 'Invalid email address'),
        //     otherwise: () =>
        //         Yup.string()
        //             .required("Username is required")
        //             .max(10, "Please enter valid Number"),
        // }),

        emailOrMobileNumber: Yup.string().
        when("isEmail", {
            is: '1',
            then: () =>
                Yup.string()
                    
                    .required("Please enter valid username")
                    .matches(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email address'),

                    // .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid usernae'),
                //   .required('Email is required'),

            otherwise: () =>
                Yup.string()
                    .required("Username is required")
                    .min(10, "Please enter valid username"),
                    
        })
        //     when("isEmail", {
        //         is: '1',
        //         then: () =>
        //             Yup.string()
                        
        //                 .required("Please enter valid username")
        //                 .matches(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.-)+[a-zA-Z]{2,7}$/, 'Invalid email address'),
        //             //   .required('Email is required'),

        //         otherwise: () =>
        //             Yup.string()
        //                 .required("Username is required")
        //                 .max(10, "Please enter valid Number"),
                        
        //     }),
        //   .when([], {
        //     is: (value) => {
        //         Yup.string()   
        //       // Check if the value looks like a valid email address
        //       const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
        //       return emailRegex.test(value);
        //     },
        //     then: Yup.string().email('Invalid Email').required('Email is required.'),
        //     otherwise: Yup.string().matches(/^[0-9]+$/, 'Invalid mobile number').required('Mobile number is required.'),
        //   }),
    //     .email('Invalid email format')
    // .required('Email is required'),
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
        initialValues: initialValues,
        validationSchema: forgotPasswordSchema,
        onSubmit: (values) => {
            onClickForgotPassword();
        },
    })

    // const onClickForgotPassword = async () => {
    //     navigation.navigate('otpSubmit', { "screenName": "forgotPassword" });

    // }
    useEffect(() => {
        // setFieldValue("spinner", false);
        // setServerErrors({});
        if (forgetPasswordData && forgetPasswordIsSuccess === true && forgetPasswordIsLoading === false && forgetPasswordIsError === false) {
            setFieldValue("spinner", false);
            toast.show("OTP sent successfully", {
                type: "success",
                placement: "top",
                duration: 3000,
                offset: 30,
                animationType: "slide-in",
            });

               navigation.navigate('otpSubmit', { "screenName": "forgotPassword","stateValues": forgetDetail });
               dispatch(clearStateForForgetPassword());

            // navigation.navigate('otpSubmit', { "screenName": "signUpScreen", });
            // clearState(); 
            // resetforgetPassword();


        }
    
          else if (forgetPasswordIsSuccess === false && forgetPasswordIsError === true && forgetPasswordIsLoading===true) {
            setFieldValue("spinner", false);
           // clearState();
           // dispatch(resetLoginDetails());

            toast.show(forgetPasswordData.errors?.EmailMobile , {
                type: "danger",
                placement: "top",
                duration:3000,
                offset: 30,
                animationType: "slide-in",
            });
            dispatch( clearStateForForgetPassword());

        }
        console.log(forgetPasswordData);
    }, [forgetPasswordIsSuccess, forgetPasswordData]);

    const onClickForgotPassword=()=>{
            // let userId = await AsyncStorage.getItem('userId');
            let dataObj = {
             
                    "countryCode": "27",
                    "emailMobile": values.emailOrMobileNumber,
                   "companyId": COMPANY_ID
              
            };
            console.log("dataObj.....",dataObj);
            // setSpinner(true);
            setFieldValue("spinner", !values.spinner);

            dispatch(userForgotPassword(dataObj));
            setForgetDetail((prevForgetDetail) => ({
                ...prevForgetDetail,
                emailMobile: values.emailOrMobileNumber,
                // emailId: values.email,
                // password: values.password,
            }));
          
    }

    const clearState = async () => {
        setFieldValue("emailOrMobileNumber", "");
        // setFieldValue("mobileNo", "");
        // setFieldValue("password", "");
        setFieldValue("spinner", false);
    }

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
    
    console.log(getCompanyDetalisData);
    return (
        <View style={styles.container}>
                              <InternetAlert />

            <Spinner
                visible={values.spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
             <SignInTopImage
                viewFlex={1}
                companyLogo={  getCompanyDetalisData?.companyLogoUrl}
                backgroundImage={getCompanyDetalisData?.backGroundImageUrl}

            />
            <View style={{ backgroundColor: signInBackgroundColor, flex: 1, alignItems: 'center', justifyContent: 'flex-start', }}>
                <Text style={{ fontSize: 24, color: '#171A1F', marginTop: 20, fontWeight: 600, height: 36 }}>Forgot Password</Text>
                <View style={styles.inputView}>
                    {/* <Text style={styles.inputText}>Email / Mobile</Text> */}
                    {/* <TextInput
                        label="Email / Mobile"
                        mode="outlined"
                        style={[styles.input]}
                        // onChangeText={(e) => {
                        //     handleChange("emailOrMobileNumber")(e);
                        //     let checkPhoneNumber = /^[0-9]+$/.test(e);
                        //     handleChange("isEmail")(checkPhoneNumber ? '0' : '1');
                        //   }}
                        // onChangeText={(e) => {
                        //     handleChange("emailOrMobileNumber")(e)
                        //     let checkPhoneNumber = phoneRegex.test(e);
                        //     if (checkPhoneNumber) {
                        //         handleChange("isEmail")('0')
                        //     } else {
                        //         handleChange("isEmail")('1')
                        //     }
                        // }}
                        // onBlur={handleBlur('email')}
                        // value={values.email}
                        // placeholder="Enter email or mobile"
                        // autoCapitalize="none"
                        onChangeText={async (e) => {
                            setFieldValue("emailOrMobileNumber", e);
                        }}
                        onBlur={handleBlur('emailOrMobileNumber')}
                        value={values.emailOrMobileNumber}
                        placeholder="Enter email or mobile"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    /> */}

<TextInput
                            label={
                                <Text>
                                  <Text>Username</Text>
                                  <Text style={{ color: 'red' }}>*</Text>
                                </Text>
                              }
                            keyboardType="email-address"
                            mode="outlined"
                            style={[styles.input]}
                            // onChangeText={handleChange('email')}
                            onChangeText={(e) => {
                                handleChange("emailOrMobileNumber")(e)
                                let checkPhoneNumber = phoneRegex.test(e);
                                if (checkPhoneNumber) {
                                    handleChange("isEmail")('0')
                                } else {
                                    handleChange("isEmail")('1')
                                }
                            }}
                            onBlur={handleBlur('emailOrMobileNumber')}
                            value={values.emailOrMobileNumber}
                            placeholder="Enter email or mobile"
                            autoCapitalize="none"
                        />
                    {touched.emailOrMobileNumber && errors.emailOrMobileNumber && <Text style={styles.errorInputText}>{errors.emailOrMobileNumber}</Text>}
                </View>
                <View style={{ width: "100%", marginTop: 5 }}>
                    <View style={{ marginHorizontal: 12, flexDirection: 'row', justifyContent: 'center', }}>
                        <Text style={{ fontSize: 12, color: NormalLinkText, fontWeight: 400, height: 20 }}>We will send OTP to your registered email / mobile</Text>
                    </View>
                </View>

                <SignInButton
                    titleName="SEND OTP"
                    iconName={otpIcon}
                    onClick={handleSubmit}
                />

                <View style={{ width: "100%", marginTop: 2 }}>
                    <View style={{ marginHorizontal: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, color: NormalLinkText, fontWeight: 400, height: 20, }}>Remember Password?</Text>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('signIn');
                        }}>
                            <Text style={{ fontSize: 14, color: RedLinkText, marginLeft: 5, fontWeight: 500, height: 22 }}>Back to Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BackgroundColor,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },

    inputView: {
        width: "100%",
        marginTop: 20
    },

    inputText: {
        fontSize: 18,
        color: '#424856',
        marginHorizontal: 12,
        height: 28
    },

    input: {
        marginTop: 5,
        marginHorizontal: 12,
    },
    errorInputText: {
        color: 'red',
        marginHorizontal: 12,
    },
});

export default ForgotPassword;
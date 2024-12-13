
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { TextInput } from 'react-native-paper';
// import { signInBackgroundColor, BackgroundColor, NormalLinkText, RedLinkText } from '../../helpers/constants'
// import { CommonModal, SignInButton, SignInTopImage } from '../../components/common'
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux'
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { getUserSignUpOtp } from '../../redux/slice/signUp'
// import { useToast } from "react-native-toast-notifications";
// import Spinner from 'react-native-loading-spinner-overlay';
// import { COMPANY_ID } from "../../helpers/enum";
// import { COUNTRY_CODE } from '../../helpers/enum';

// //Images
// import signUpIcon from '../../assets/signUpIcon.png';

 
// const SignUp = (props) => {
    
//     const navigation = useNavigation();
//     const dispatch = useDispatch();
//     const toast = useToast();

//     //*state
//     const [otpApiState, setOtpApiState] = useState({
//         "mobileNumber": '',
//         "emailId": "",
//         "password": "",
//     })
    
//     const [showPassword, setShowPassword] = useState(false);
//     const [serverErrors, setServerErrors] = useState({});

//     const {
//         isLoading,
//         data,
//         isError,
//         isSuccess,
//         getSignUpOtpData,
//         getSignUpOtpSuccess,
//         getSignUpOtpError
//     } = useSelector((state) => ({
//         isLoading: state.signUp.isLoading,
//         data: state.signUp.data,
//         isError: state.signUp.isError,
//         isSuccess: state.signUp.isSuccess,
//         getSignUpOtpData: state.signUp.getSignUpOtpData,
//         getSignUpOtpSuccess: state.signUp.getSignUpOtpSuccess,
//         getSignUpOtpError: state.signUp.getSignUpOtpError,
//     }));
//     console.log("signupotpdata",getSignUpOtpData);
//   const emailRegx =/^[\w+-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z+]{2,7}$/;
//     //*initial state
//     const initialValues = {
//         isEmail: "1",
//         email: "",
//         mobileNo: "",
//         password: "",
//         spinner: false,
//     }

//     //*form validation
//     const signUpSchema = Yup.object().shape({
       

//         email: Yup.string().
//             when("isEmail", {
//                 is: '1',
//                 then: () =>
//                  Yup.string()
//     // .matches(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email address')
//     // .required('Email is required'),
//     // .matches(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email address')
//     .matches(/^[\w+-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z+]{2,7}$/, 'Invalid username')

//     .required('Please enter valid email'),
                   
//                 otherwise: () =>
//                     Yup.string()
//                         .required("Enter valid email")
//                         // .min(10, 'Phone number must be at least 10 char')
//             }),
//         mobileNo: Yup.string()
//         .matches(/^[0-9]{10}$/, 'Please enter valid 10 digit mobile number')

//         .required('Mobile number is required')
//         .matches(/^\d+$/, 'Please enter a valid phone number') // Allow only digits

//         .min(10, 'Phone number must be at least 10 char'),
//         // .matches(/^\S*$/, 'Spaces are not allowed in the mobile number'),
//          password: Yup.string()
//             // .required('Password is required')
//             // .min(8, "Password must be at least 8 characters long")
//             // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//             // .matches(/[0-9]/, "Password must contain at least one number")
//             // .matches(/[\W_]/, "Password must contain at least one special character")
//             // .matches(/^\S*$/, 'Password must not contain spaces'),
//             .required("Password is required")
//             .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//             .matches(/[0-9]/, "Password must contain at least one number")
//             .matches(/[!@#$%^&*()\-_+=~\\|\[\]{};:/?\.>]/, "Use at least one special character")
//             .matches(/^\S*$/, "Password must not contain spaces")
//             .min(8, "Password must be at least 8 characters long")
//             .max(15, "Password must be at most 15 characters long")
            
//     });
  
//     const {
//         values,
//         errors,
//         touched,
//         handleBlur,
//         handleChange,
//         handleSubmit,
//         isSubmitting,
//         isValid,
//         resetForm,
//         setFieldValue,
//     } = useFormik({
//         initialValues: initialValues,
        
//         validationSchema: signUpSchema,
//         onSubmit: (values) => {
        
//             onClickSignUp();
//         },
    


//     })
//     // console.log(initialValues);
   

// useEffect(() => {
//     setFieldValue("spinner", false);
//     setServerErrors({});
//     if (getSignUpOtpData && getSignUpOtpSuccess === true && isLoading === false && values.email != '' && values.mobileNumber != '') {
//         setFieldValue("spinner", !values.spinner);
//         toast.show("OTP sent successfully!", {
//             type: "success",
//             placement: "top",
//             duration: 3000,
//             offset: 30,
//             animationType: "slide-in",
//         });
        
//         navigation.navigate('otpSubmit', { "screenName": "signUpScreen", "stateValues": otpApiState });
//         clearState(); 
//     }else if(getSignUpOtpSuccess === false && getSignUpOtpError === true && getSignUpOtpData){
//         setServerErrors(getSignUpOtpData.errors)
//         // toast.show(getSignUpOtpData.title, {
//         //     type: "danger",
//         //     placement: "top",
//         //     duration: 3000,
//         //     offset: 30,
//         //     animationType: "slide-in",
//         // });
//     }
//     console.log(getSignUpOtpData);
// }, [getSignUpOtpSuccess, getSignUpOtpData]); // Include getSignUpOtpData as a dependency


//     //*onclick sign up
//     const onClickSignUp = async () => {
//         console.log("In onclickSignUp");
//         setServerErrors({});
//         let dataObj = {
//             "countryCode": COUNTRY_CODE,
//             "mobileNumber": values.mobileNo,
//             "email": values.email,
//             "companyId": COMPANY_ID,
//             "password":values.password
//         }
//         console.log(dataObj);
//         // console.log('go to otp')

//         setFieldValue("spinner", !values.spinner);
//         dispatch(getUserSignUpOtp(dataObj));
//         setOtpApiState((prevOtpApiState) => ({
//             ...prevOtpApiState,
//             mobileNumber: values.mobileNo,
//             emailId: values.email,
//             password: values.password,
//         }));
//     }

//     //*clear state
//     const clearState = async () => {
//         setFieldValue("email", "");
//         setFieldValue("mobileNo", "");
//         setFieldValue("password", "");
//         setFieldValue("spinner", false);
//     }

//     const [isModalVisible, setIsModalVisible] = useState(false);

//     const toggleModal = () => {
//         setIsModalVisible(!isModalVisible);
//       };


//  const passwordCriteria = [
    
//         'Be at least 8 characters long',
//         'Must contain at least one uppercase letter, one number, and one special character'
//       ];
//     return (
//         <View style={styles.container}>
//             <Spinner
//                 visible={values.spinner}
//                 textContent={'Loading...'}
//                 textStyle={styles.spinnerTextStyle}
//             />
//             <SignInTopImage
//                 viewFlex={0.7}
//             />
//             <ScrollView style={{flex:1}}>
//             <View style={{ backgroundColor: signInBackgroundColor, flex: 1, alignItems: 'center', justifyContent: 'flex-start', }}>
//                 <Text style={{ fontSize: 24, color: '#171A1F', marginTop: 20, fontWeight: 600, height: 36 }}>Sign Up</Text>
//                 <View style={styles.inputView}>
//                     {/* <Text style={styles.inputText}>Email</Text> */}
//                     <TextInput
//                      label={
//                         <Text>
//                           <Text>Email</Text>
//                           <Text style={{ color: 'red' }}>*</Text>
//                         </Text>
//                       }
//                         // label="Email"
//                         keyboardType="email-address"
//                         mode="outlined"
//                         style={[styles.input]}
//                         onChangeText={(e) => {
//                             handleChange("email")(e)
//                             let checkPhoneNumber = emailRegx.test(e);
//                             if (checkPhoneNumber) {
//                                 handleChange("isEmail")('0')
//                             } else {
//                                 handleChange("isEmail")('1')
//                             }
//                         }}
                       
//                         onBlur={handleBlur('email')}
//                         value={values.email}
//                         autoCapitalize="none"
//                         placeholder="Enter Email or Mobile"
//                     />
//                     {touched.email && errors.email && <Text style={styles.errorInputText}>{errors.email}</Text>}
//                     {serverErrors && serverErrors.Email && <Text style={styles.errorInputText}>{serverErrors.Email}</Text>}
                    
//                 </View>
//                 <View style={[styles.inputView, { marginTop: 10 }]}>
//                     {/* <Text style={styles.inputText}>Mobile</Text> */}
//                     <TextInput
//                         // label="Mobile Number"
//                         label={
//                             <Text>
//                               <Text>Mobile Number </Text>
//                               <Text style={{ color: 'red' }}>*</Text>
//                             </Text>
//                           }
//                         mode="outlined"
//                         style={[styles.input]}
//                         maxLength={10}
//                         onChangeText={handleChange('mobileNo')}
//                         onBlur={handleBlur('mobileNo')}
//                         value={values.mobileNo}
//                         keyboardType='numeric'
//                         placeholder="Mobile Number"
//                     />
//                     {touched.mobileNo && errors.mobileNo && <Text style={styles.errorInputText}>{errors.mobileNo}</Text>}
//                     {serverErrors && serverErrors.MobileNumber && <Text style={styles.errorInputText}>{serverErrors.MobileNumber}</Text>}

//                 </View>
//                 <View style={[styles.inputView, { marginTop: 10 }]}>
//                     {/* <Text style={styles.inputText}>Password</Text> */}
//                     <TextInput
//                         label={
//                             <Text>
//                               <Text>Password </Text>
//                               <Text style={{ color: 'red' }}>*</Text>
//                             </Text>
//                           }
//                         mode="outlined"
//                         style={[styles.input]}
//                         onChangeText={handleChange('password')}
//                         onBlur={handleBlur('password')}
//                         maxLength={15}
//                         value={values.password}
//                         placeholder="Password"
//                         secureTextEntry={!showPassword}
//                         right={
//                             <TextInput.Icon
//                                 icon={showPassword ? 'eye' : 'eye-off'}
//                                 onPress={() => setShowPassword(!showPassword)}
//                             />
//                         }
//                     />
//                     {touched.password && errors.password && <Text style={styles.errorInputText}>{errors.password}</Text>}
//                 </View>

//                 <SignInButton
//                     titleName="SIGN UP"
//                     onClick={handleSubmit}
//                     iconName={signUpIcon}
//                 />

//                 <View style={{ width: "100%", marginTop: 5 }}>
//                     <View style={{ marginHorizontal: 12, flexDirection: 'row', justifyContent: 'center', }}>
//                         <Text style={{ fontSize: 14, color: NormalLinkText, fontWeight: 500, height: 22 }}>Already on Ontec?</Text>
//                         <TouchableOpacity onPress={() => {
//                             navigation.navigate('signIn');
//                         }}>
//                             <Text style={{ fontSize: 14, color: RedLinkText, marginLeft: 5, fontWeight: 500, height: 22 }}>Sign in</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//             <CommonModal 
//         isVisible={isModalVisible} 
//         toggleModal={toggleModal} 
//         title="Password should:" 
//         content={passwordCriteria} 
//         marginTop={450}
//       />
//             </ScrollView>
            
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: BackgroundColor,
//     },

//     spinnerTextStyle: {
//         color: '#FFF'
//     },

//     inputView: {
//         width: "100%",
//         marginTop: 15
//     },

//     inputText: {
//         fontSize: 18,
//         color: '#424856',
//         marginHorizontal: 12,
//         height: 28
//     },

//     errorInputText: {
//         color: 'red',
//         marginHorizontal: 12,
//     },

//     input: {
//         marginTop: 5,
//         marginHorizontal: 12,
//     },
// });

// export default SignUp;



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { signInBackgroundColor, BackgroundColor, NormalLinkText, RedLinkText } from '../../helpers/constants'
import { CommonModal, SignInButton, SignInTopImage } from '../../components/common'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getUserSignUpOtp } from '../../redux/slice/signUp'
import { useToast } from "react-native-toast-notifications";
import Spinner from 'react-native-loading-spinner-overlay';
import { COMPANY_ID } from "../../helpers/enum";
import { COUNTRY_CODE } from '../../helpers/enum';
import VectorIcon from 'react-native-vector-icons/Ionicons';

//Images
import signUpIcon from '../../assets/signUpIcon.png';
import { getCompanyDetalisByCompanyId } from '../../redux/slice/getCompanyDetalis';
import { Modal } from 'react-native';
import { Button } from 'react-native';
import InternetAlert from '../../components/InternetAlert';

 
const SignUp = (props) => {
    
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const toast = useToast();

    //*state
    const [otpApiState, setOtpApiState] = useState({
        "mobileNumber": '',
        "emailId": "",
        "password": "",
    })
    
    const [showPassword, setShowPassword] = useState(false);
    const [serverErrors, setServerErrors] = useState({});

    const {
        isLoading,
        data,
        isError,
        isSuccess,
        getSignUpOtpData,
        getSignUpOtpSuccess,
        getSignUpOtpError
    } = useSelector((state) => ({
        isLoading: state.signUp.isLoading,
        data: state.signUp.data,
        isError: state.signUp.isError,
        isSuccess: state.signUp.isSuccess,
        getSignUpOtpData: state.signUp.getSignUpOtpData,
        getSignUpOtpSuccess: state.signUp.getSignUpOtpSuccess,
        getSignUpOtpError: state.signUp.getSignUpOtpError,
    }));

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
    

    useEffect(() => {
        let dataObj = {
          companyId: COMPANY_ID,
        };
        
        dispatch(getCompanyDetalisByCompanyId(dataObj));
      }, []);

  const emailRegx =/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
    //*initial state
    const initialValues = {
        isEmail: "1",
        email: "",
        mobileNo: "",
        password: "",
        spinner: false,
    }
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
      };

      const passwordCriteria = [
        // 'Be at least 8 characters long',
        // 'Must contain at least one uppercase letter, one number, and one special character'
        ' be at least 8 characters long  with a maximum length of 15 characters.',
       "contain both upper-case and lower-case letters,at least one number and one special character."




      ];
    //*form validation
    const signUpSchema = Yup.object().shape({
       

        email: Yup.string().
            when("isEmail", {
                is: '1',
                then: () =>
                 Yup.string()
    // .matches(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email address')
    // .required('Email is required'),
    // .matches(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email address')
    .matches(/^[\w+.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/, 'Invalid email address')

    .required('Please enter valid email'),
                   
                otherwise: () =>
                    Yup.string()
                        .required("Enter valid email")
                        // .min(10, 'Phone number must be at least 10 char')
            }),
        mobileNo: Yup.string()
        .matches(/^[0-9]{10}$/, 'Please enter valid 10 digit mobile number')

        .required('Mobile number is required')
        .matches(/^\d+$/, 'Please enter a valid phone number') // Allow only digits

        .min(10, 'Phone number must be at least 10 char'),
        // .matches(/^\S*$/, 'Spaces are not allowed in the mobile number'),
         password: Yup.string()
            // .required('Password is required')
            // .min(8, "Password must be at least 8 characters long")
            // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            // .matches(/[0-9]/, "Password must contain at least one number")
            // .matches(/[\W_]/, "Password must contain at least one special character")
            // .matches(/^\S*$/, 'Password must not contain spaces'),
           
            // .required("Password is required")
            // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            // .matches(/[0-9]/, "Password must contain at least one number")
            // .matches(/[$@!%*?&#^&()]/, "Password must contain at least one special character")
            // .matches(/^\S*$/, "Password must not contain spaces")
            // .min(8, "Password must be at least 8 characters long")
            // .max(15, "Password must be at most 15 characters long"),
            .required('Password is required')
            .min(8, "Password must be at least 8 characters long")
            .max(15, "Password must be at most 15 characters long")
            .matches(/^[a-zA-Z0-9!@#$%^&*()\-_+=~\\|\[\]{};:/?\.>]*$/, "Invalid Password")
    });
  
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        isValid,
        resetForm,
        setFieldValue,
    } = useFormik({
        initialValues: initialValues,
        
        validationSchema: signUpSchema,
        onSubmit: (values) => {
        
            onClickSignUp();
        },
    


    })
    // console.log(initialValues);
   

useEffect(() => {
    setFieldValue("spinner", false);
    setServerErrors({});
    if (getSignUpOtpData && getSignUpOtpSuccess === true && isLoading === false && values.email != '' && values.mobileNumber != '') {
        setFieldValue("spinner", !values.spinner);
        toast.show("OTP sent successfully!", {
            type: "success",
            placement: "top",
            duration: 3000,
            offset: 30,
            animationType: "slide-in",
        });
        
        navigation.navigate('otpSubmit', { "screenName": "signUpScreen", "stateValues": otpApiState });
        clearState(); 
    }else if(getSignUpOtpSuccess === false && getSignUpOtpError === true && getSignUpOtpData){
        setServerErrors(getSignUpOtpData.errors)
        // toast.show(getSignUpOtpData.title, {
        //     type: "danger",
        //     placement: "top",
        //     duration: 3000,
        //     offset: 30,
        //     animationType: "slide-in",
        // });
    }
}, [getSignUpOtpSuccess, getSignUpOtpData,getSignUpOtpError]); // Include getSignUpOtpData as a dependency


    //*onclick sign up
    const onClickSignUp = async () => {
        setServerErrors({});
        let dataObj = {
            "countryCode": COUNTRY_CODE,
            "mobileNumber": values.mobileNo,
            "email": values.email,
            "companyId": COMPANY_ID,
            "password":  values.password


        }


        setFieldValue("spinner", !values.spinner);
        dispatch(getUserSignUpOtp(dataObj));
        setOtpApiState((prevOtpApiState) => ({
            ...prevOtpApiState,
            mobileNumber: values.mobileNo,
            emailId: values.email,
            password: values.password,
        }));
    }

    //*clear state
    const clearState = async () => {
        setFieldValue("email", "");
        setFieldValue("mobileNo", "");
        setFieldValue("password", "");
        setFieldValue("spinner", false);
    }

    return (
        <View style={styles.container}>
             <InternetAlert />

            <Spinner
                visible={values.spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <SignInTopImage
                viewFlex={0.7}
                companyLogo={  getCompanyDetalisData?.companyLogoUrl}
                backgroundImage={getCompanyDetalisData?.backGroundImageUrl}
            />
            <ScrollView style={{flex:1}}>
            <View style={{ backgroundColor: signInBackgroundColor, flex: 1, alignItems: 'center', justifyContent: 'flex-start', }}>
                <Text style={{ fontSize: 24, color: '#171A1F', marginTop: 20, fontWeight: 600, height: 36 }}>Sign Up</Text>
                <View style={styles.inputView}>
                    {/* <Text style={styles.inputText}>Email</Text> */}
                    <TextInput
                     label={
                        <Text>
                          <Text>Email </Text>
                          <Text style={{ color: 'red' }}>*</Text>
                        </Text>
                      }
                        // label="Email"
                        keyboardType="email-address"
                        mode="outlined"
                        style={[styles.input]}
                        onChangeText={(e) => {
                            handleChange("email")(e)
                            let checkPhoneNumber = emailRegx.test(e);
                            if (checkPhoneNumber) {
                                handleChange("isEmail")('0')
                            } else {
                                handleChange("isEmail")('1')
                            }
                        }}
                       
                        onBlur={handleBlur('email')}
                        value={values.email}
                        autoCapitalize="none"
                        placeholder="Email"
                    />
                    {touched.email && errors.email && <Text style={styles.errorInputText}>{errors.email}</Text>}
                    {serverErrors && serverErrors.Email && <Text style={styles.errorInputText}>{serverErrors.Email}</Text>}
                    
                </View>
                <View style={[styles.inputView, { marginTop: 10 }]}>
                    {/* <Text style={styles.inputText}>Mobile</Text> */}
                    <TextInput
                        // label="Mobile Number"
                        label={
                            <Text>
                              <Text>Mobile Number </Text>
                              <Text style={{ color: 'red' }}>*</Text>
                            </Text>
                          }
                        mode="outlined"
                        style={[styles.input]}
                        maxLength={10}
                        onChangeText={handleChange('mobileNo')}
                        onBlur={handleBlur('mobileNo')}
                        value={values.mobileNo}
                        keyboardType='numeric'
                        placeholder="Mobile Number"
                    />
                    {touched.mobileNo && errors.mobileNo && <Text style={styles.errorInputText}>{errors.mobileNo}</Text>}
                    {serverErrors && serverErrors.MobileNumber && <Text style={styles.errorInputText}>{serverErrors.MobileNumber}</Text>}

                </View>
                <View style={[styles.inputView, { marginTop: 10 }]}>
                    {/* <Text style={styles.inputText}>Password</Text> */}
                    <TextInput
                        label={
                            <Text>
                              <Text>Password </Text>
                              <Text style={{ color: 'red' }}>*</Text>
                            </Text>
                          }
                        mode="outlined"
                        style={[styles.input]}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        maxLength={15}
                        value={values.password}
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        right={
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
                    {touched.password && errors.password && <Text style={styles.errorInputText}>{errors.password}</Text>}
                    {/* {serverErrors && serverErrors.Password && <Text style={styles.errorInputText}>{serverErrors.Password}</Text>} */}

                </View>
                <View style={[styles.inputView, { marginTop: 10 }]}>

                <TouchableOpacity onPress={toggleModal} style={styles.iconButton}>
        <VectorIcon name="information-circle" size={24} color="black" />
      </TouchableOpacity>
      </View>

                <SignInButton
                    titleName="SIGN UP"
                    onClick={handleSubmit}
                    iconName={signUpIcon}
                />

                <View style={{ width: "100%", marginTop: 5 }}>
                    <View style={{ marginHorizontal: 12, flexDirection: 'row', justifyContent: 'center', }}>
                        <Text style={{ fontSize: 14, color: NormalLinkText, fontWeight: 500, height: 22 }}>Already on Ontec?</Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('signIn');
                        }}>
                            <Text style={{ fontSize: 14, color: RedLinkText, marginLeft: 5, fontWeight: 500, height: 22 }}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <CommonModal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        title="Password Must:"
        content={passwordCriteria}
        marginTop={300}
      />
            </ScrollView>
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
        marginTop: 15
    },

    inputText: {
        fontSize: 18,
        color: '#424856',
        marginHorizontal: 12,
        height: 28
    },

    errorInputText: {
        color: 'red',
        marginHorizontal: 12,
    },

    input: {
        marginTop: 5,
        marginHorizontal: 12,
    },
    iconButton: {
        alignItems:'flex-start',
        // alignItems: 'center',
        marginHorizontal:12
      },
      modalBackground: {
        flex: 1,
        justifyContent: 'space-around',
        marginTop:400,
        marginHorizontal:20
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
       width:200,height:180

      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'black'
      },
      modalText: {
        marginBottom: 10,
        fontSize:12,
        textAlign: 'left',
        color:'black'

      },
});

export default SignUp;
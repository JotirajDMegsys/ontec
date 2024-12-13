import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {TextInput, Icon} from 'react-native-paper';
import {
  signInBackgroundColor,
  BackgroundColor,
  NormalLinkText,
  RedLinkText,
} from '../../helpers/constants';
import {SignInButton, SignInTopImage} from '../../components/common';
import {useDispatch, useSelector} from 'react-redux';
import {
  userSignIn,
  resetLoginDetails,
  clearStates,
} from '../../redux/slice/signIn';
import {useFormik} from 'formik';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import {useToast} from 'react-native-toast-notifications';
import {COMPANY_ID, ERROR_MSG} from '../../helpers/enum';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import VectorIcon from 'react-native-vector-icons/Ionicons';
import {CommonModal} from '../../components/common';

//*images
import signInIcon from '../../assets/signIn.png';
import {getCompanyDetalisByCompanyId} from '../../redux/slice/getCompanyDetalis';
import InternetAlert from '../../components/InternetAlert';
// import addressIcon from '../../assets/address.png';
const SignIn = props => {
  const navigation = useNavigation();
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const {isLoading, data, isError, isSuccess} = useSelector(state => {
    // console.log(state);
    return {
      isLoading: state.signIn.isLoading,
      data: state.signIn.data,
      isError: state.signIn.isError,
      isSuccess: state.signIn.isSuccess,
    };
  });

  console.log('userDetail.......', data);

  // const phoneRegex = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const phoneRegex =
    /^(?:\+?\d{0,4})?\s?-?\s?(?:\(\d{3}\)|\d{3})\s?-?\s?(?:\d{3})\s?-?\s?(?:\d{4})?$|^[\w-]+(?:\.[\w-]+)*@(?:(?:\+[\w-]+\.?[\w-]+)|(?:[\w-]+\.)+)[a-zA-Z]{2,7}$/;
  //*initial state
  const initialValues = {
    isEmail: '1',
    email: '',
    password: '',
    spinner: false,
  };

  //*form validation
  const signInSchema = Yup.object().shape({
    email: Yup.string().when('isEmail', {
      is: '1',
      then: () =>
        Yup.string()

          .required('Please enter valid username')
          .matches(
            /^[\w+-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z+]{2,7}$/,
            'Invalid username',
          ),
      //   .required('Email is required'),

      otherwise: () =>
        Yup.string()
          .required('Username is required')
          .min(10, 'Please enter valid username'),
    }),
    password: Yup.string()

      .required('Password is required')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(
        /[!@#$%^&*()\-_+=~\\|\[\]{};:/?\.>]/,
        'Use at least one special character',
      )
      .matches(
        /[\W_]/,
        'Password must contain at least one special character (excluding spaces)',
      )
      .matches(/^\S*$/, 'Password must not contain spaces')
      .min(8, 'Password must be at least 8 characters long')
      .max(15, 'Password must be at most 15 characters long'),
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
    validationSchema: signInSchema,
    onSubmit: values => {
      onClickSignIn();
    },
  });

  useEffect(() => {
    if (
      data &&
      isSuccess === true &&
      isLoading === false &&
      data.isUserValid &&
      isError == false
    ) {
      console.log('==============', data);
      onClickLoginSuccess();
      setFieldValue('spinner', false);
    } else if (isSuccess === false && isError === true && data) {
      setFieldValue('spinner', false);
      // clearState();
      // dispatch(resetLoginDetails());
      toast.show(data.errors?.Email || data.errors?.Password.join('\n'), {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
      setFieldValue('spinner', false);
      dispatch(clearStates());
      dispatch(resetLoginDetails());
    }
  }, [isSuccess, data]);
  //     const [incorrectAttemptCount, setIncorrectAttemptCount] = useState(0);
  //     const [showPopup, setShowPopup] = useState(false);
  //   const [countdown, setCountdown] = useState(30);
  // //     console.log("count",incorrectAttemptCount);
  //     useEffect(() => {
  //         if (data && isSuccess === true && isLoading === false && data.message !== ERROR_MSG.INCORRECT_EMAIL_PASSWORD) {
  //           onClickLoginSuccess();
  //           setIncorrectAttemptCount(0); // Reset the attempt count
  //         } else if (data.message === ERROR_MSG.INCORRECT_EMAIL_PASSWORD) {
  //           setFieldValue("spinner", !values.spinner);
  //           clearState();
  //           dispatch(resetLoginDetails());
  //           toast.show(ERROR_MSG.INCORRECT_EMAIL_PASSWORD, {
  //             type: "danger",
  //             placement: "top",
  //             duration: 1000,
  //             offset: 30,
  //             animationType: "slide-in",
  //           });
  //           setIncorrectAttemptCount(prevCount => prevCount + 1);
  //         }
  //       }, [isSuccess, data]);

  //   useEffect(() => {
  //     if (incorrectAttemptCount >= 1) {
  //       setShowPopup(true);
  //       // Start countdown
  //       const interval = setInterval(() => {
  //         setCountdown(prevCount => prevCount - 1);
  //       }, 1000);
  //       setTimeout(() => {
  //         clearInterval(interval);
  //         setShowPopup(false);
  //         setIncorrectAttemptCount(0);
  //         setCountdown(30);
  //       }, 30000);
  //     }
  //   }, [incorrectAttemptCount]);

  //*SignIn success
  const onClickLoginSuccess = async () => {
    if (data.emailId && data.accessToken && data.mobile && data.userId) {
      console.log(data, 'dadatatdatadtd');
      await AsyncStorage.clear();
      await AsyncStorage.setItem('emailId', data.emailId);
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
      await AsyncStorage.setItem('sessionKey', data.sessionKey);

      // await AsyncStorage.setItem('isUserValid', data.isUserValid);

      await AsyncStorage.setItem('userId', data.userId.toString());
      await AsyncStorage.setItem('role', data.role);
      await AsyncStorage.setItem('mobile', data.mobile);
      await AsyncStorage.setItem(
        'isProfileComplete',
        data.isProfileComplete.toString(),
      );

      if (!data.isProfileComplete) {
        setFieldValue('spinner', false);
        navigation.navigate('profile', {
          mobile: data.mobile,
          emailId: data.emailId,
        });
        clearState();
        toast.show('Please complete your profile.', {
          type: 'warning',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else {
        setFieldValue('spinner', false);
        toast.show('Welcome to Ontec Home!', {
          type: 'success',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });

        navigation.navigate('dashBoard', {redirected: true});
        clearState();
      }
    } else {
      setFieldValue('spinner', false);
      // navigation.navigate('dashBoard')
      clearState();
      toast.show('Invalid access! please try again or contact support.', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  // useEffect(() => {
  //     if (countdown === 5) {
  //       Alert.alert(
  //         'Alert',
  //         `Countdown reached 5 seconds! Current value: ${countdown}`,
  //         [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
  //       );
  //     }
  //   }, [countdown]);

  // *onClick SignIn
  const [deviceToken, setDeviceToken] = useState('');
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('deviceToken');
      if (token) {
        setDeviceToken(token);
      }
    };

    getToken();
  }, []);
  const onClickSignIn = async () => {
    let dataObj = {
      email: values.email,
      password: values.password,
      companyId: COMPANY_ID,
      devicetoken: deviceToken,
    };
    console.log(dataObj);
    setFieldValue('spinner', !values.spinner);
    dispatch(userSignIn(dataObj));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      resetForm();
    });

    return unsubscribe;
  }, [navigation, resetForm]);

  //*clear state
  const clearState = async () => {
    resetForm();
    setFieldValue('email', '');
    setFieldValue('password', '');
  };

  useFocusEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  });

  console.log(getCompanyDetalisData?.companyLogoUrl);
  const {
    getCompanyDetalisIsLoading,
    getCompanyDetalisData,
    getCompanyDetalisIsError,
    getCompanyDetalisIsSuccess,
  } = useSelector(state => ({
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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const passwordCriteria = [
    ' be at least 8 characters long  with a maximum length of 15 characters.',
    'contain both upper-case and lower-case letters,at least one number and one special character.',
  ];
  return (
    <SafeAreaProvider>
      <InternetAlert />

      <View style={styles.container}>
        <Spinner
          visible={values.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        {/* <SignInTopImage
                    viewFlex={0.7}
                /> */}
        <SignInTopImage
          companyLogo={getCompanyDetalisData?.companyLogoUrl}
          backgroundImage={getCompanyDetalisData?.backGroundImageUrl}
          viewFlex={0.7}
        />
        {/* {showPopup && <Text>Countdown: {countdown}</Text>} */}

        <View
          style={{
            backgroundColor: signInBackgroundColor,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 24,
              color: '#171A1F',
              marginTop: 20,
              fontWeight: 600,
              height: 36,
            }}>
            Sign In
          </Text>
          <View style={styles.inputView}>
            {/* <Text style={styles.inputText}>Email / Mobile</Text> */}

            <TextInput
              label={
                <Text>
                  <Text>Username</Text>
                  <Text style={{color: 'red'}}>*</Text>
                </Text>
              }
              keyboardType="email-address"
              mode="outlined"
              style={[styles.input]}
              // onChangeText={handleChange('email')}
              onChangeText={e => {
                handleChange('email')(e);
                let checkPhoneNumber = phoneRegex.test(e);
                if (checkPhoneNumber) {
                  handleChange('isEmail')('0');
                } else {
                  handleChange('isEmail')('1');
                }
              }}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Enter Email or Mobile"
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorInputText}>{errors.email}</Text>
            )}
          </View>
          <View style={[styles.inputView, {marginTop: 10}]}>
            {/* <Text style={styles.inputText}>Password</Text> */}
            <TextInput
              // label="Password"
              label={
                <Text>
                  <Text>Password</Text>
                  <Text style={{color: 'red'}}>*</Text>
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
                      onPress={() => setShowPassword(!showPassword)} // Toggle visibility
                    />
                  )}
                />
              }
            />
            {touched.password && errors.password && (
              <Text style={styles.errorInputText}>{errors.password}</Text>
            )}
          </View>
          {/* <View style={{ width: "100%", marginTop: 5 }}>
                        <View style={{ marginHorizontal: 12, flexDirection: 'row', justifyContent: 'flex-end', }}>

                            <Text style={{ fontSize: 14, color: NormalLinkText, fontWeight: 500, height: 22 }}>Forgot Password?</Text>

                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate('forgotPassword');
                            }}>
                                <Text style={{ fontSize: 14, color: RedLinkText, marginLeft: 5, fontWeight: 500, height: 22 }}>Click Here</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}

          <View style={{width: '100%', marginTop: 5}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 15,
              }}>
              <TouchableOpacity onPress={toggleModal} style={styles.iconButton}>
                <VectorIcon name="information-circle" size={24} color="black" />
              </TouchableOpacity>
              <View
                style={{
                  marginHorizontal: 12,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: NormalLinkText,
                    fontWeight: 500,
                    height: 22,
                  }}>
                  Forgot Password?
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('forgotPassword');
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: RedLinkText,
                      marginLeft: 5,
                      fontWeight: 500,
                      height: 22,
                    }}>
                    Click Here
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <View style={{alignSelf:'flex-start',marginHorizontal:30}}> */}
            </View>
            {/* </View> */}
          </View>
          <SignInButton
            titleName="SIGN IN"
            iconName={signInIcon}
            onClick={handleSubmit}
          />

          <View style={{width: '100%', marginTop: 2}}>
            <View
              style={{
                marginHorizontal: 12,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: NormalLinkText,
                  fontWeight: 500,
                  height: 22,
                }}>
                Not yet on Ontec?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('signUp');
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: RedLinkText,
                    marginLeft: 5,
                    fontWeight: 500,
                    height: 22,
                  }}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <CommonModal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        title="Password Must:"
        content={passwordCriteria}
        marginTop={450}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },

  inputView: {
    width: '100%',
    marginTop: 15,
  },

  inputText: {
    fontSize: 18,
    color: '#424856',
    marginHorizontal: 12,
    height: 28,
  },

  errorInputText: {
    color: 'red',
    marginHorizontal: 12,
  },

  input: {
    marginTop: 5,
    marginHorizontal: 12,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default SignIn;

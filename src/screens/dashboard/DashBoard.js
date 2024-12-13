import React, {useState, useEffect, useRef} from 'react';
import Header from '../../utils/Header';
import {
  View,
  ScrollView,
  Animated,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Dimensions,
  RefreshControl,
  BackHandler,
} from 'react-native';
import Bottom from '../../components/Bottom';
import {Alert, Platform, Linking} from 'react-native';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

// import CircularProgress from '../../utils/CircularProgress';
import {Image} from '@rneui/base';
import uniDirectionalIcon from '../../assets/headerIcon/uniDirectionalIcon.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SandtoneHome} from '../../utils/SandtoneHome';
//  import ProgressCircle from 'react-native-progress-circle';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import arrowCircleDown from '../../assets/accounts/ArrowCircleDownRight.png';
import {
  getUserDetailsApiCall,
  setSignalRConnectionID,
  getWalletData,
  resetGetUserDetailsApiCall,
} from '../../redux/slice/getUserDetails';
import {
  getDashboardMasters,
  getDashboardAccBalance,
  getPropertyStats,
  getDashboardConsumption,
} from '../../redux/slice/getDashboardAnalytics';
//*icons
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Svg, Circle} from 'react-native-svg';
import leftArrow from '../../assets/dashbordLeftArrow.png';
import rightArrow from '../../assets/dashbordRightArrow.png';
import dashRight from '../../assets/dashProRight.png';
import dashLeft from '../../assets/dashProLeft.png';
import Home from '../../assets/FillHomeImage.png';
import tenantsIcon from '../../assets/tenants.png';
import meetsIcon from '../../assets/meets.png';
import HomeDash from '../../assets/HomeDash.png';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import noProperty from '../../assets/dashboard/noProperty.png';
import {UTILITY} from '../../helpers/meterData';
import {COLOR_LIST} from '../../helpers/colorlist';
import {
  getColorByConsumption,
  getFontSize,
  truncateString,
} from '../../helpers/commonFunction';
import LowBalancePrompt from '../../components/lowBalancePopup';
import moment from 'moment';
import {getNotifications} from '../../redux/slice/getnotifications';
import {resetLoginDetails} from '../../redux/slice/signIn';
import {refershTokenMethod} from '../../screens/auth/refershTokenMethod';
const DashBoard = ({route}) => {
  const {refreshToken} = refershTokenMethod();
  // Get the screen dimensions
  const {screenHeight, screenWidth} = Dimensions.get('window');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const swiperRef = React.createRef();
  // const swiperRefPro = React.createRef();
  //*state
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState();
  const [image, setImage] = useState();
  const [noMasterDataFound, setNoMasterDataFound] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // const requestNotificationPermission = async () => {
  //   if (Platform.OS === 'android') {

  //     if (Platform.Version >= 33) {
  //       const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  //       handlePermissionResult(result, 'Notifications');
  //     } else {
  //       Alert.alert('Notifications Permission Granted (default on older versions)');
  //     }
  //   } else if (Platform.OS === 'ios') {
  //     const result = await request(PERMISSIONS.IOS.NOTIFICATIONS);
  //     handlePermissionResult(result, 'Notifications');
  //   }
  // };
  // const requestOverlayPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     const result = await check(PERMISSIONS.ANDROID.SYSTEM_ALERT_WINDOW);
  //     if (result === RESULTS.GRANTED) {
  //       Alert.alert('Overlay Permission Granted');
  //     } else {
  //       Alert.alert('Overlay Permission is not granted, opening settings...');
  //       Linking.openSettings();
  //     }
  //   } else if (Platform.OS === 'ios') {
  //     const result = await request(PERMISSIONS.IOS.LOCAL_NETWORK);
  //     handlePermissionResult(result, 'Local Network');
  //   }
  // };
  // const handlePermissionResult = (result, permissionName) => {
  //   switch (result) {
  //     case RESULTS.GRANTED:
  //       Alert.alert(`${permissionName} Permission Granted`);
  //       break;
  //     case RESULTS.DENIED:
  //       Alert.alert(`${permissionName} Permission Denied`);
  //       break;
  //     case RESULTS.BLOCKED:
  //       Alert.alert(`${permissionName} Permission Blocked`);
  //       Linking.openSettings();
  //       break;
  //     default:
  //       Alert.alert(`${permissionName} Permission Not Available`);
  //       break;
  //   }
  // };
  // useEffect(() => {
  //   requestNotificationPermission();
  //   requestOverlayPermission();
  // }, []);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1, true);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(-1, true);
    }
  };

  // //redux
  const {
    userDetailsIsLoading,
    userDetailsData,
    userDetailsIsSuccess,
    userDetailsIsError,
    walletIsLoading,
    walletData,
    walletIsSuccess,
    walletIsError,
    masterLoading,
    masterData,
    masterSuccess,
    masterError,
    balanceLoading,
    balanceData,
    balanceSuccess,
    balanceError,
    propStatLoading,
    propStatData,
    propStatSuccess,
    propStatError,
    consumptionLoading,
    consumptionData,
    consumptionSuccess,
    consumptionError,
    notificationCount,
  } = useSelector(state => ({
    userDetailsIsLoading: state.userDetails.userDetailsIsLoading,
    userDetailsData: state.userDetails.userDetailsData,
    userDetailsIsSuccess: state.userDetails.userDetailsIsSuccess,
    userDetailsIsError: state.userDetails.userDetailsIsError,
    walletIsLoading: state.userDetails.walletIsLoading,
    walletData: state.userDetails.walletData,
    walletIsSuccess: state.userDetails.walletIsSuccess,
    walletIsError: state.userDetails.walletIsError,
    masterLoading: state.dashboardData.masterLoading,
    masterData: state.dashboardData.masterData,
    masterSuccess: state.dashboardData.masterSuccess,
    masterError: state.dashboardData.masterError,
    balanceLoading: state.dashboardData.balanceLoading,
    balanceData: state.dashboardData.balanceData,
    balanceSuccess: state.dashboardData.balanceSuccess,
    balanceError: state.dashboardData.balanceError,
    propStatLoading: state.dashboardData.propStatLoading,
    propStatData: state.dashboardData.propStatData,
    propStatSuccess: state.dashboardData.propStatSuccess,
    propStatError: state.dashboardData.propStatError,
    consumptionLoading: state.dashboardData.consumptionLoading,
    consumptionData: state.dashboardData.consumptionData,
    stsTopUpTransactionsData:
      state.dashboardData.consumptionData?.stsTopUpTransactions,

    consumptionSuccess: state.dashboardData.consumptionSuccess,
    consumptionError: state.dashboardData.consumptionError,
    notificationCount: state.notificationList.notificationCount,
  }));
  console.log(consumptionData, 'consumptionData');
  //*state
  const [spinner, setSpinner] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [userWalletBalance, setUserWalletBalance] = useState(null);

  const getAllNotifications = async () => {
    let userId = await AsyncStorage.getItem('userId');
    let connectionId = await AsyncStorage.getItem('connectionId');

    // console.log(userId);
    let dataObj = {
      userId: userId,
      connectionId: connectionId,
      isShortView: false,
    };
    // console.log("dataobj.....================.",dataObj);
    dispatch(getNotifications(dataObj));
  };
  const stsTopUpTransactions = consumptionData.map(
    item => item.stsTopUpTransactions,
  );

  console.log(consumptionData[0]?.stsTopUpTransactions, 'data');
  useEffect(() => {
    if (masterLoading === true) {
      setNoMasterDataFound(false);
    } else if (
      masterData.length == 0 &&
      masterSuccess === true &&
      masterLoading === false
    ) {
      setNoMasterDataFound(true);
    } else if (masterData.length > 0) {
      getdashboardData(masterData[0].propertyId);
      const initialPropertyId = masterData[0].propertyId;
      const initialPropertyName = masterData[0].propertyName;
      setSelectedProperty(initialPropertyId);
      setSelectedPropertyName(initialPropertyName);
      setNoMasterDataFound(false);
    } else {
      setNoMasterDataFound(false);
    }
  }, [masterData, masterError, masterSuccess, propStatData]);
  useEffect(() => {
    if (userDetailsIsSuccess && userDetailsData) {
      setSpinner(false);
      setUserName(truncateString(userDetailsData.userName, 10));
      setMobile(userDetailsData.mobile);
      setEmail(userDetailsData.email);
      setImage(userDetailsData.profileUrl);
    }
    if (
      userDetailsIsError == true &&
      userDetailsData === 'You are not authorized' &&
      userDetailsIsSuccess == false &&
      userDetailsIsLoading == true
    ) {
      // console.log("eotprieptipreptirppip");
      refreshToken();
    }
    // if(userDetailsIsSuccess== true && userDetailsData?.status === null && userDetailsIsLoading ==false ){
    //   handleLogout();
    // }

    // else{
    //   setUserName('');
    // }
    if (walletData && walletIsSuccess === true) {
      setUserWalletBalance(walletData?.balance);
    }
  }, [
    userDetailsIsSuccess,
    userDetailsData,
    walletData,
    walletIsSuccess,
    userDetailsIsError,
  ]);
  // console.log(walletData);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('emailId');
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      // await AsyncStorage.removeItem('isUserValid');
      await AsyncStorage.removeItem('isProfileCompleted');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('role');
      await AsyncStorage.removeItem('mobile');
      await AsyncStorage.removeItem('sessionKey');

      // console.log('Token cleared successfully');
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing token:', error);
    }

    dispatch(resetLoginDetails());
    dispatch(resetGetUserDetailsApiCall());
    // setModalVisible(false);
    Toast.show('Your session expired, Please login again!', {
      type: 'success',
      placement: 'top',
      duration: 3000,
      offset: 30,
      animationType: 'slide-in',
    });
    setTimeout(async () => {
      // props.closeModal();
      navigation.navigate('signIn');
    }, 1000);
  };

  // console.log(userDetailsData.userName);
  // console.log("WalletData*",walletData?.balance,"********************************", walletData);
  // console.log(

  //   userName,
  //   mobile,
  //   email,
  //   image

  // );

  useEffect(() => {
    setUserName('');
    setNoMasterDataFound(true);
    // console.log('connectionconnectionconnectionconnection');
    onCLickUserDetails();
    setSignalRConnection();
  }, [route]);
  useEffect(() => {
    getAllNotifications();
  }, []);
  const onRefresh = () => {
    setNoMasterDataFound(false);
    setRefreshing(true);
    onCLickUserDetails();
    // getMasters();
    // Simulate a refresh action (e.g., fetch new data)
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a 2-second refresh process
  };
  const setSignalRConnection = async () => {
    const connection = await AsyncStorage.getItem('connectionId');
    // console.log("connectionconnectionconnectionconnection", connection);
    if (connection != null && connection != '' && connection != undefined) {
      const userId = await AsyncStorage.getItem('userId');
      let dataObj = {
        newConnectionId: connection,
        oldConnectionId: '',
        userId: userId,
      };
      dispatch(setSignalRConnectionID(dataObj));
    }
  };
  const onCLickUserDetails = async () => {
    let userId = await AsyncStorage.getItem('userId');
    let email = await AsyncStorage.getItem('emailId');
    let mobileNo = await AsyncStorage.getItem('mobile');
    let sessionKey = await AsyncStorage.getItem('sessionKey');

    // console.log('==============sessionKey=============', sessionKey);

    let dataObj = {id: userId, sessionKey: sessionKey};
    // console.log(dataObj, '----------------------------------------------');
    dispatch(getUserDetailsApiCall(dataObj));
    dispatch(getWalletData({userId: userId}));

    let masterObj = {ownerId: userId};
    setSpinner(!spinner);
    dispatch(getDashboardMasters(masterObj));
    let dataObjj = {id: userId};
    dispatch(getPropertyStats(dataObjj));
    setSignalRConnection();

    //  console.log(masterObj);
  };

  const getdashboardData = async propertyId => {
    dispatch(getDashboardConsumption({propertyId: propertyId}));
    dispatch(getDashboardAccBalance({propertyId: propertyId}));
  };
  // const handleNextPro = () => {
  //   if (swiperRefPro.current) {
  //     swiperRefPro.current.scrollBy(1, true);
  //   }
  // };

  // const handlePrevPro = () => {
  //   if (swiperRefPro.current) {
  //     swiperRefPro.current.scrollBy(-1, true);
  //   }
  // };
  const handleNextPro = () => {
    // console.log("=======currentIndex======", swiperRefPro.current.state.index);
    if (
      swiperRefPro.current.state.index < masterData.length - 1 &&
      swiperRefPro.current
    ) {
      swiperRefPro.current.scrollBy(1, true);
    }
  };

  const handlePrevPro = () => {
    // console.log("=======currentIndex======", swiperRefPro.current.state.index);
    if (swiperRefPro.current.state.index > 0 && swiperRefPro.current) {
      swiperRefPro.current.scrollBy(-1, true);
    }
  };

  const handlePress = () => {
    navigation.navigate('accounts');
  };
  const topUp = () => {
    navigation.navigate('topUp', {
      value: selectedProperty,
      name: selectedPropertyName,
    });

    // navigation.navigate('topUp');
  };

  const [index, setIndex] = useState(0);
  const radius = 55;
  const strokeWidth = 20;
  const size = radius * 2 + strokeWidth;
  const center = size / 2;
  const segments = [
    {percentage: 40, color: '#439ce6'},
    {percentage: 40, color: '#c9c8c5'},
    {percentage: 20, color: '#e6202a'},
  ];
  let startAngle = 0;

  const [indexOne, setIndexOne] = useState(0);

  const scrollToNext = () => {
    setIndexOne(indexOne + 1);
  };

  const scrollToPrevious = () => {
    setIndexOne(indexOne - 1);
  };

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPropertyName, setSelectedPropertyName] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRefPro = useRef(null);
  const handlePropertyChanged = index => {
    if (index >= 0 && index < masterData.length) {
      getdashboardData(masterData[index].propertyId);
      setCurrentIndex(currentIndex);
      setSelectedProperty(masterData[index].propertyId);
      setSelectedPropertyName(masterData[index].propertyName);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Confirm Exit',
          'Are you sure you want to exit the app?',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Exit',
              onPress: () => BackHandler.exitApp(),
            },
          ],
          {cancelable: false},
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  // const [isDashboardScreen, setIsDashboardScreen] = useState(true);

  // useEffect(() => {
  //   const backAction = () => {
  //     if (isDashboardScreen) {
  //       // Display confirmation dialog only on the dashboard screen
  //       Alert.alert(
  //         'Confirm Exit',
  //         'Are you sure you want to exit the app?',
  //         [
  //           {
  //             text: 'Cancel',
  //             onPress: () => null, // Do nothing if the user cancels
  //             style: 'cancel',
  //           },
  //           {
  //             text: 'Exit',
  //             onPress: () => BackHandler.exitApp(), // Close the app if the user confirms
  //           },
  //         ],
  //         { cancelable: false } // Prevent closing the dialog by tapping outside
  //       );
  //       return true; // Prevent default behavior (e.g., navigate back)
  //     } else {
  //       return false; // Allow default behavior on other screens
  //     }
  //   };

  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

  //   return () => backHandler.remove(); // Cleanup event listener when component unmounts
  // }, [isDashboardScreen]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLOR_LIST.SCREEN_BG}}>
      <View style={{flex: 1}}>
        {/* { walletData?.balance <= 0 && masterData?.length > 0 ? (<LowBalancePrompt />) : null} */}

        {/* Header */}
        <View style={{flex: 0.1}}>
          <Header
            userName={userName}
            mobile={mobile}
            image={image}
            email={email}
            notificationCount={notificationCount}
            propertyValueForTopup={selectedProperty}
            propertyNameForTopup={selectedPropertyName}
            walletBalance={walletData?.balance || 0}
          />
        </View>
        <View
          style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
          {masterSuccess && masterData?.length > 0 ? (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#007BFF']} // Customize the loading spinner color
                  tintColor="#007BFF" // Customize the loading spinner color (Android)
                />
              }>
              {/* _______________ ProgressCircle View_______________ */}

              <View
                style={{
                  height: 219,
                  marginTop: 15,
                  backgroundColor: '#252D3F',
                  borderRadius: 25,
                  marginHorizontal: 2,
                }}>
                {consumptionData && !consumptionLoading ? (
                  <View style={{flexDirection: 'row', flex: 1}}>
                    {consumptionData.length > 3 ? (
                      <View
                        style={{
                          flex: 0.1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{width: 24, height: 24}}
                          source={leftArrow}
                          onPress={() => {
                            scrollToPrevious();
                          }}
                        />
                      </View>
                    ) : null}

                    {consumptionData.length > 0 ? (
                      <View style={{flex: 1}}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {/* <Animated.View
        style={{
          ...styles.box,
          opacity: fadeAnim
        }}
      > */}

                          <FlatList
                            data={consumptionData}
                            // style={{borderColor:'red', borderWidth:2}}
                            showsHorizontalScrollIndicator={false} // Hides horizontal scroll indicator
                            horizontal
                            renderItem={({item}) => {
                              return (
                                <Pressable
                                  onPress={() =>
                                    navigation.navigate('consumption', {
                                      meterId: item.meterNumber,
                                      propertyId: {selectedProperty},
                                      propertyName: {selectedPropertyName},
                                    })
                                  }>
                                  <View
                                    key={indexOne}
                                    style={{
                                      flex: 1,
                                      justifyContent: 'flex-end',
                                      alignItems: 'center',
                                      marginHorizontal: 15,
                                    }}>
                                    {/* <ProgressCircle
                              percent={item.guageChartDto?.actualValue / item.guageChartDto?.targetValue * 100}
                              radius={50}
                              styles={{marginHorizontal:5}}
                              borderWidth={15}
                              color={UTILITY[item.meterType].primeColor}
                              shadowColor={UTILITY[item.meterType].secondaryColor}
                              bgColor="#252D3F"
                            >
                              <Image
                                style={{ width: 28, height: 28 }}
                                source={UTILITY[item.meterType].icon}
                              />
                            </ProgressCircle> */}
                                    <AnimatedCircularProgress
                                      size={100}
                                      width={15}
                                      fill={
                                        (item.guageChartDto?.actualValue /
                                          item.guageChartDto?.targetValue) *
                                        100
                                      }
                                      tintColor={
                                        UTILITY[item.meterType].primeColor
                                      }
                                      backgroundColor={
                                        UTILITY[item.meterType].secondaryColor
                                      }
                                      lineCap="round"
                                      arcSweepAngle={360}
                                      duration={2000}
                                      rotation={0}
                                      onAnimationComplete={() =>
                                        console.log('onAnimationComplete')
                                      }>
                                      {/* Center the icon within the circular progress */}
                                      {() => (
                                        <Image
                                          style={{width: 28, height: 28}}
                                          source={UTILITY[item.meterType].icon}
                                        />
                                      )}
                                    </AnimatedCircularProgress>
                                    <Text
                                      style={{
                                        fontSize: getFontSize(
                                          item.consumption
                                            ? `${item.consumption} ${
                                                item.unitOfMeasure
                                              } (${(
                                                (item.guageChartDto
                                                  ?.actualValue /
                                                  item.guageChartDto
                                                    ?.targetValue) *
                                                100
                                              ).toFixed(2)} %)`
                                            : 'No data',
                                          10,
                                          20,
                                        ),
                                        fontWeight: 500,
                                        color: getColorByConsumption(
                                          (
                                            (item.guageChartDto?.actualValue /
                                              item.guageChartDto?.targetValue) *
                                            100
                                          ).toFixed(2),
                                        ),
                                        marginTop: 5,
                                      }}>
                                      {item.consumption
                                        ? `${item.consumption} ${
                                            item.unitOfMeasure
                                          } (${(
                                            (item.guageChartDto?.actualValue /
                                              item.guageChartDto?.targetValue) *
                                            100
                                          ).toFixed(2)} %)`
                                        : 'No data'}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: getFontSize(
                                          item.meterNumber,
                                          12,
                                          20,
                                        ),
                                        fontWeight: 500,
                                        color: '#FFF',
                                        marginTop: 5,
                                      }}>{`#${item.meterNumber}`}</Text>
                                  </View>
                                </Pressable>
                              );
                            }}
                            keyExtractor={item => item.toString()}
                            initialScrollIndex={indexOne}
                            scrollToIndex={params => {
                              scrollToNext(params.index);
                            }}
                          />
                          {/* </Animated.View> */}
                        </View>
                        <View
                          style={{
                            flex: 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Catamaran-Regular',
                              fontSize: 10,
                              fontWeight: '400',
                              lineHeight: 16,
                              color: '#FFFFFFFF',
                            }}>
                            Click on the icon to check detailed consumption
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View style={{flex: 1}}>
                        <View
                          style={{
                            flex: 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Catamaran-Regular',
                              fontSize: 10,
                              fontWeight: '400',
                              lineHeight: 16,
                              color: '#FFFFFFFF',
                            }}>
                            No meters registered for this property. Kindly
                            register to proceed!
                          </Text>
                        </View>
                      </View>
                    )}

                    {consumptionData.length > 3 ? (
                      <View
                        style={{
                          flex: 0.1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{width: 24, height: 24}}
                          source={rightArrow}
                          onPress={() => {
                            scrollToNext();
                          }}
                        />
                      </View>
                    ) : null}
                  </View>
                ) : (
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <View style={{flex: 1}}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          paddingTop: 25,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Catamaran-Bold',
                            fontSize: 24,
                            color: '#1DD75BFF',
                          }}>
                          Loading...
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Catamaran-Regular',
                            fontSize: 14,
                            fontWeight: '400',
                            color: '#FFFFFFFF',
                          }}>
                          Please wait
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                <View
                  style={{
                    flex: 0.03,
                    justifyContent: 'flex-end',
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    backgroundColor: '#EC3237',
                    marginHorizontal: 12,
                  }}></View>
              </View>

              {!consumptionLoading &&
                consumptionData.map((item, index) => {
                  const {stsTopUpTransactions, meterNumber} = item;
                  console.log(
                    stsTopUpTransactions?.stsTopUpTransaction,
                    'hasvalid',
                  );
                  const hasValidData =
                    stsTopUpTransactions?.stsTopUpTransaction?.some(
                      transaction => transaction?.stdUnits,
                    );

                  if (hasValidData) {
                    const getRandomColor = () => {
                      const letters = '0123456789ABCDEF';
                      let color = '#';
                      for (let i = 0; i < 3; i++) {
                        color += letters[Math.floor(Math.random() * 16)];
                      }
                      return color;
                    };
                    // const getColorBasedOnValue = value => {
                    //   if (value < 100) {
                    //     return '#FFEB3B';
                    //   } else if (value >= 100 && value < 500) {
                    //     return '#FF9800';
                    //   } else if (value >= 500 && value < 1000) {
                    //     return '#F44336'; // Red for values between 500 and 1000
                    //   } else {
                    //     return 'blue'; // Green for values 1000 and above
                    //   }
                    // };

                    // const segments =
                    //   stsTopUpTransactions.stsTopUpTransaction?.map(
                    //     transaction => ({
                    //       console.log(transaction);
                    //       percentage: transaction.stdAmt,
                    //       color:
                    //         transaction.stdUnits === 1 ? 'red' : getRandomColor(), // Use red for 1, otherwise blue
                    //     }),
                    //   );
                    const segments =
                      stsTopUpTransactions.stsTopUpTransaction?.map(
                        transaction => {
                          console.log(transaction);

                          return {
                            percentage: transaction?.stdAmt / 130,
                            color:
                              transaction.stdUnits === 1
                                ? 'red'
                                : getRandomColor(),
                          };
                        },
                      );
                    // const segments =
                    //   stsTopUpTransactions.stsTopUpTransaction?.map(
                    //     (transaction, index) => ({
                    //       percentage: transaction.stdUnits,
                    //       color:
                    //         stsTopUpTransactions.stsTopUpTransaction?.length === 1
                    //           ? 'red'
                    //           : getRandomColor(), // Red if only one object, otherwise random color
                    //     }),
                    //   );
                    // const segments =
                    //   stsTopUpTransactions.stsTopUpTransaction?.map(
                    //     (transaction, index) => ({
                    //       percentage: transaction.stdUnits, // Assuming `stdUnits` represents transaction value
                    //       color: getColorBasedOnValue(transaction.stdAmt), // Assign color based on value
                    //     }),
                    //   );
                    console.log(segments);
                    if (segments.length === 1) {
                      segments[0].percentage = 100;
                    } else if (segments.length === 2) {
                      segments[0].percentage = 50;
                      segments[1].percentage = 50;
                    } else if (segments.length === 3) {
                      segments[0].percentage = 33.33;
                      segments[1].percentage = 33.33;
                      segments[2].percentage = 33.33;
                    }

                    let startAngle = 0;

                    return (
                      <View
                        style={{
                          marginTop: 15,
                          marginHorizontal: 20,
                          height: 200,
                          backgroundColor: '#252D3FFF',
                          borderRadius: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderBottomWidth: 5,
                          borderBottomColor: '#EC3237',
                        }}>
                        <View style={{alignItems: 'center', marginVertical: 0}}>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: 'bold',
                              color: '#fff',
                              marginVertical: 10,
                            }}>
                            STS Meter #{meterNumber}{' '}
                          </Text>

                          <Pressable
                            onPress={() => {
                              navigation.navigate('PurchaseHistory');
                            }}
                            style={{
                              position: 'relative',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            {/* Circular Chart */}
                            {/* <Svg height={size} width={size}>
                            {segments?.map((segment, index) => {
                              const strokeDasharray = 2 * Math.PI * radius;
                              const strokeDashoffset =
                                strokeDasharray *
                                ((100 - segment.percentage) / 100);
                              const rotation = 270;
                              console.log(segment);
                              startAngle += (segment.percentage / 100) * 360;

                              return (
                                <Circle
                                  key={index}
                                  cx={center}
                                  cy={center}
                                  r={radius}
                                  stroke={segment?.color}
                                  strokeWidth={strokeWidth}
                                  strokeDasharray={strokeDasharray}
                                  strokeDashoffset={strokeDashoffset}
                                  fill="none"
                                  strokeLinecap="butt"
                                  rotation={rotation}
                                  origin={`${center}, ${center}`}
                                />
                              );
                            })}
                          </Svg> */}
                            {/* <Svg height={size} width={size}>
                            {
                              segments?.reduce(
                                (acc, segment, index) => {
                                  const strokeDasharray = 2 * Math.PI * radius;
                                  const strokeDashoffset =
                                    strokeDasharray *
                                    ((100 - segment.percentage) / 100);
                                  const rotation = acc.startAngle;
                                  acc.startAngle +=
                                    (segment.percentage / 100000) * 360;
                                  console.log(acc.startAngle);
                                  acc.elements.push(
                                    <Circle
                                      key={index}
                                      cx={center}
                                      cy={center}
                                      r={radius}
                                      stroke={segment.color}
                                      strokeWidth={strokeWidth}
                                      strokeDasharray={strokeDasharray}
                                      strokeDashoffset={strokeDashoffset}
                                      fill="none"
                                      strokeLinecap="butt"
                                      rotation={rotation}
                                      origin={`${center}, ${center}`}
                                    />,
                                  );

                                  return acc;
                                },
                                {elements: [], startAngle: 0},
                              ).elements
                            }
                          </Svg> */}

                            <Svg height={size} width={size}>
                              {segments.map((segment, index) => {
                                const strokeDasharray = 2 * Math.PI * radius; // Calculate the full circumference of the circle
                                const segmentAngle =
                                  (segment.percentage / 100) * 360; // Calculate the angle for the segment
                                const strokeDashoffset =
                                  strokeDasharray *
                                  ((100 - segment.percentage) / 100); // Calculate the offset
                                const rotation =
                                  index === 0
                                    ? 0
                                    : segments
                                        .slice(0, index)
                                        .reduce(
                                          (acc, seg) =>
                                            acc + (seg.percentage / 100) * 360,
                                          0,
                                        );

                                return (
                                  <Circle
                                    key={index}
                                    cx={center}
                                    cy={center}
                                    r={radius}
                                    stroke={segment.color}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                    fill="none"
                                    strokeLinecap="butt"
                                    rotation={rotation}
                                    origin={`${center}, ${center}`}
                                  />
                                );
                              })}

                              {/* Display the total percentage inside the center */}
                              {/* <Text
                              style={{
                                position: 'absolute',
                                top: center - 10, // Adjust top position
                                left: center + radius / 2 - 10, // Adjust left position
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                              {segments.reduce(
                                (acc, segment) => acc + segment.percentage,
                                0,
                              )}{' '}
                              / 100
                            </Text> */}
                            </Svg>

                            {/* Image and Text Overlay */}
                            <View
                              style={{
                                position: 'absolute',
                                alignItems: 'center',
                                justifyContent: 'center',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                              }}>
                              <Image
                                source={UTILITY[item.meterType].icon}
                                style={{
                                  width: 20,
                                  height: 20,
                                  marginBottom: 10,
                                }}
                                resizeMode="contain"
                              />
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontWeight: 'bold',
                                  color: 'white',
                                }}>
                                Total Units
                              </Text>
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontWeight: 'bold',
                                  color: '#fff',
                                }}>
                                {stsTopUpTransactions?.stsTopUpTransaction
                                  ?.reduce(
                                    (acc, transaction) =>
                                      acc + transaction.stdUnits,
                                    0,
                                  )
                                  .toFixed(2)}{' '}
                                kWh
                              </Text>
                            </View>
                          </Pressable>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              // alignItems: 'center',
                              marginBottom: 10,
                              // height: 20,
                              flexWrap: 'wrap',
                            }}>
                            {segments.map((segment, index) => (
                              <View
                                key={index}
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginHorizontal: 5,
                                }}>
                                <View
                                  style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    backgroundColor: segment.color,
                                    marginRight: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    marginVertical: 5,
                                  }}>
                                  {index + 1} Block
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 0.03,
                            justifyContent: 'flex-end',
                            borderBottomLeftRadius: 30,
                            borderBottomRightRadius: 30,
                            backgroundColor: '#EC3237',
                            marginHorizontal: 12,
                          }}
                        />
                      </View>
                    );
                  }

                  return null;
                })}
              {/* _______________ ProgressCircle View_______________ */}

              {/* _______________ Account Balance View_______________ */}
              {balanceData && !balanceLoading ? (
                <View
                  style={{
                    marginTop: 15,
                    marginHorizontal: 20,
                    height: 150,
                    backgroundColor: '#252D3FFF',
                    borderRadius: 20,
                  }}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingLeft: 25,
                      }}>
                      <View style={{}}>
                        <Text
                          style={{
                            fontFamily: 'Catamaran-Bold',
                            fontSize: 15,
                            fontWeight: '400',
                            lineHeight: 20,
                            color: '#FFFFFFFF',
                          }}>
                          Account Balance:
                        </Text>
                        <Text
                          style={{
                            fontWeight: 700,
                            fontSize: getFontSize(
                              balanceData?.accountBalance
                                ?.toFixed(2)
                                .toString(),
                              40,
                              0.6,
                            ),
                            lineHeight: 56,
                            color:
                              balanceData.accountBalance > 0
                                ? COLOR_LIST.WALLET_POSITIVE
                                : COLOR_LIST.WALLET_NEGATIVE,
                          }}>
                          R {balanceData?.accountBalance?.toFixed(2)}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Catamaran-Bold',
                            fontSize: 15,
                            fontWeight: '500',
                            lineHeight: 22,
                            color: '#FFFFFFFF',
                          }}>
                          {balanceData.lastTopUp
                            ? balanceData.lastTopUp
                            : balanceData.accountBalance > 0
                            ? 'Top up your account'
                            : 'Running out of balance!'}
                        </Text>
                      </View>
                    </View>

                    <View style={{flex: 0.7, justifyContent: 'space-between'}}>
                      <TouchableHighlight
                        onPress={() => handlePress()}
                        underlayColor="transparent">
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{
                              width: 22,
                              height: 22,
                              marginRight: 12,
                              marginTop: 9,
                            }}
                            source={uniDirectionalIcon}
                          />
                        </View>
                      </TouchableHighlight>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          marginBottom: 20,
                        }}>
                        <Pressable onPress={topUp}>
                          <View
                            style={{
                              width: 85,
                              marginRight: 16,
                              borderColor: '#FFFFFFFF',
                              borderWidth: 2,
                              height: 36,
                              borderRadius: 5,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                textAlign: 'center',
                                fontWeight: '400',
                                lineHeight: 30,
                                color: '#FFFFFFFF',
                              }}>
                              TOPUP
                            </Text>
                          </View>
                        </Pressable>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 0.03,
                      justifyContent: 'flex-end',
                      borderBottomLeftRadius: 30,
                      borderBottomRightRadius: 30,
                      backgroundColor: '#EC3237',
                      marginHorizontal: 12,
                    }}></View>
                </View>
              ) : (
                <View
                  style={{
                    marginTop: 15,
                    marginHorizontal: 20,
                    height: 150,
                    backgroundColor: '#252D3FFF',
                    borderRadius: 20,
                  }}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingLeft: 25,
                      }}>
                      <View style={{}}>
                        <Text
                          style={{
                            fontFamily: 'Catamaran-Bold',
                            fontSize: 15,
                            fontWeight: '400',
                            lineHeight: 20,
                            color: '#FFFFFFFF',
                          }}>
                          Account Balance:
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Catamaran-Bold',
                            fontSize: 30,
                            lineHeight: 56,
                            color: '#1DD75BFF',
                          }}>
                          Loading...
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Catamaran-Bold',
                            fontSize: 15,
                            fontWeight: '500',
                            lineHeight: 22,
                            color: '#FFFFFFFF',
                          }}>
                          Please wait
                        </Text>
                      </View>
                    </View>

                    <View style={{flex: 0.7, justifyContent: 'space-between'}}>
                      <TouchableHighlight
                        onPress={() => handlePress()}
                        underlayColor="transparent">
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{
                              width: 22,
                              height: 22,
                              marginRight: 12,
                              marginTop: 9,
                            }}
                            source={uniDirectionalIcon}
                          />
                        </View>
                      </TouchableHighlight>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          marginBottom: 20,
                        }}>
                        <Pressable onPress={topUp}>
                          <View
                            style={{
                              width: 107,
                              marginRight: 16,
                              borderColor: '#FFFFFFFF',
                              borderWidth: 2,
                              height: 36,
                              borderRadius: 5,
                            }}>
                            <Text
                              style={{
                                fontSize: 20,
                                textAlign: 'center',
                                fontWeight: '400',
                                lineHeight: 30,
                                color: '#FFFFFFFF',
                              }}>
                              TOPUP
                            </Text>
                          </View>
                        </Pressable>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 0.03,
                      justifyContent: 'flex-end',
                      borderBottomLeftRadius: 30,
                      borderBottomRightRadius: 30,
                      backgroundColor: '#EC3237',
                      marginHorizontal: 12,
                    }}></View>
                </View>
              )}

              {/* _______________ Account Balance View_______________ */}
              {/* _______________ Property Selection View_______________ */}
              {/* <View style={{marginHorizontal:20,flexDirection:'row',marginVertical:20}}>
        <View style={{marginHorizontal:20,marginTop:40}}>

                                         <AnimatedCircularProgress
        size={100}
        width={15}
        fill={10} 
        tintColor={"blue"}
        backgroundColor={'red'}
        lineCap="round"
        arcSweepAngle={360}
        duration={2000}
        rotation={0}
        onAnimationComplete={() => console.log('onAnimationComplete')}
      >
        {() => (
          <>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>10%</Text>
            <Text style={{ fontSize: 12, color:'black' }}>Speed</Text>
          </>
        )}
      </AnimatedCircularProgress>
                          </View>
                          <View style={{flexDirection:'column'}}>
                            <Text style={{fontSize:24,fontWeight:"600",marginVertical:5}}>Solar Grid Data</Text>
                            <View style={{flexDirection:'row'}}>
                            <View style={{flexDirection:"column"}} >
                                   <Text style={{fontFamily: 'Catamaran-SemiThick',marginHorizontal:5,fontSize:14,color: '#171A1FFF',fontWeight: '400',}}>This Month</Text>

                                   <View style={{flexDirection:'row'}}>
                                   <Text                       style={{fontWeight:"bold", fontSize: 34,  color:  COLOR_LIST.WALLET_POSITIVE,fontFamily: 'Catamaran-SemiThick'}}>25.6</Text>
                                   <Text style={{fontFamily: 'Catamaran-SemiThick',marginHorizontal:5,fontSize:14,marginTop:18, color: '#171A1FFF',fontWeight: '400',}}>Kwh</Text>

                                   </View>
                                  
                             
                                  
                              </View>
                              <View style={{flexDirection:"column",marginLeft:20}} >
                                   <Text style={{fontFamily: 'Catamaran-SemiThick',marginHorizontal:5,fontSize:14,color: '#171A1FFF',fontWeight: '400',}}>This Month</Text>

                                   <View style={{flexDirection:'row'}}>
                                   <Text                       style={{fontWeight:"bold", fontSize: 34,  color:  COLOR_LIST.WALLET_POSITIVE,fontFamily: 'Catamaran-SemiThick'}}>153.6</Text>
                                   <Text style={{fontFamily: 'Catamaran-SemiThick',marginHorizontal:5,fontSize:14,marginTop:18, color: '#171A1FFF',fontWeight: '400',}}>Kwh</Text>

                                   </View>
                                  
                                   
                                  
                              </View>
                            </View>
                               <View style={{ marginTop:7}}>
        <Text                       style={{textAlign:'left',fontWeight:"bold", fontSize: 14,  color:"#4a7544",fontFamily: 'Catamaran-SemiThick'}}>Balance Units: 81.2 kwh</Text></View>
                          </View>
        </View> 
      */}
              {consumptionData.map((data, index) =>
                data.isSolar ? ( // Check if isSolar is true
                  <View
                    style={{
                      marginHorizontal: 20,
                      flexDirection: 'row',
                      marginVertical: 20,
                    }}>
                    <View
                      key={index}
                      style={{marginHorizontal: 20, marginTop: 40}}>
                      <AnimatedCircularProgress
                        size={100}
                        width={15}
                        fill={
                          (data.guageChartDto.actualValue /
                            data.guageChartDto.targetValue) *
                          100
                        } // Example fill calculation
                        // tintColor={"blue"}
                        // backgroundColor={'red'}
                        tintColor={UTILITY[data.meterType].primeColor}
                        backgroundColor={UTILITY[data.meterType].secondaryColor}
                        lineCap="round"
                        arcSweepAngle={360}
                        duration={2000}
                        rotation={0}
                        onAnimationComplete={() => console.log('')}>
                        {() => (
                          <>
                            <Text style={{fontSize: 12, color: 'black'}}>
                              Today
                            </Text>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: 'black',
                              }}>
                              {data?.solarData?.todayPercentage}%
                            </Text>
                          </>
                        )}
                      </AnimatedCircularProgress>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: '600',
                          marginVertical: 5,
                        }}>
                        Solar Grid Data
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'column'}}>
                          <Text
                            style={{
                              fontFamily: 'Catamaran-SemiThick',
                              marginHorizontal: 5,
                              fontSize: 14,
                              color: '#171A1FFF',
                              fontWeight: '400',
                            }}>
                            Installed Capacity
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 34,
                                color: COLOR_LIST.WALLET_POSITIVE,
                                fontFamily: 'Catamaran-SemiThick',
                              }}>
                              {data?.solarData?.installedCapacity}
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Catamaran-SemiThick',
                                marginHorizontal: 5,
                                fontSize: 14,
                                marginTop: 18,
                                color: '#171A1FFF',
                                fontWeight: '400',
                              }}>
                              Kwh
                            </Text>
                          </View>
                        </View>
                        <View style={{flexDirection: 'column', marginLeft: 20}}>
                          <Text
                            style={{
                              fontFamily: 'Catamaran-SemiThick',
                              marginHorizontal: 5,
                              fontSize: 14,
                              color: '#171A1FFF',
                              fontWeight: '400',
                            }}>
                            Exported Today
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 34,
                                color: COLOR_LIST.WALLET_POSITIVE,
                                fontFamily: 'Catamaran-SemiThick',
                              }}>
                              {data?.solarData?.exportedToday}
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Catamaran-SemiThick',
                                marginHorizontal: 5,
                                fontSize: 14,
                                marginTop: 18,
                                color: '#171A1FFF',
                                fontWeight: '400',
                              }}>
                              Kwh
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{marginTop: 7}}>
                        <Text
                          style={{
                            textAlign: 'left',
                            fontWeight: 'bold',
                            fontSize: 14,
                            color: '#4a7544',
                            fontFamily: 'Catamaran-SemiThick',
                          }}>
                          Exported for the month:{' '}
                          {data.solarData.exportedForMonth.toFixed(2)}%
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : null,
              )}

              <View
                key={index}
                style={{
                  marginTop: 5,
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={handlePrevPro} style={{}}>
                  <Image style={{width: 30, height: 30}} source={dashLeft} />
                </TouchableOpacity>
                <Swiper
                  style={{height: 110}}
                  ref={swiperRefPro}
                  loop={false}
                  showsPagination={false}
                  onIndexChanged={handlePropertyChanged}
                  //
                >
                  {masterData.map((item, index) => {
                    return (
                      <View style={{flex: 1}} key={index}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 10,
                            marginVertical: 15,
                            flexDirection: 'row',
                            height: 70,
                            borderRadius: 35,
                            backgroundColor: '#FFFFFFFF',
                            flex: 1,
                            ...Platform.select({
                              ios: {
                                shadowColor: '#171a1f',
                                shadowOffset: {width: 0, height: 4},
                                shadowOpacity: 0.2,
                                shadowRadius: 9,
                              },
                              android: {
                                elevation: 5,
                              },
                            }),
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              flex: 1,
                            }}>
                            <View style={{flex: 0.17}}>
                              <Image
                                source={Home}
                                style={{width: 28, height: 32}}
                              />
                            </View>
                            <View style={{marginVertical: 3, flex: 0.7}}>
                              <Text
                                numberOfLines={1}
                                style={{
                                  fontFamily: 'Catamaran-SemiThick',
                                  fontSize: 16,
                                  fontWeight: '400',
                                  color: '#171A1FFF',
                                }}>
                                {item.propertyName}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontWeight: '400',
                                  color: '#171A1FFF',
                                  marginTop: 5,
                                }}>
                                Unit No: {item.unitNumber}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </Swiper>

                <TouchableOpacity onPress={handleNextPro} style={{}}>
                  <Image style={{width: 30, height: 30}} source={dashRight} />
                </TouchableOpacity>
              </View>

              <View style={{marginHorizontal: 20, flexDirection: 'row'}}>
                <View
                  style={{
                    justifyContent: 'center',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('properties');
                    }}>
                    <Image style={{width: 54, height: 54}} source={HomeDash} />
                    <Text
                      style={{
                        fontFamily: 'Catamaran-SemiThick',
                        fontSize: 12,
                        fontWeight: '400',
                        color: '#171A1FFF',
                        marginTop: 5,
                        position: 'absolute',
                        right: 5,
                      }}>
                      {propStatData?.totalPropertycount}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Catamaran-SemiThick',
                        fontSize: 12,
                        fontWeight: '400',
                        marginLeft: 4,
                        color: '#171A1FFF',
                        marginTop: 5,
                      }}>
                      Properties
                    </Text>
                  </Pressable>
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('properties');
                    }}>
                    <Image style={{width: 54, height: 54}} source={meetsIcon} />
                    <Text
                      style={{
                        fontFamily: 'Catamaran-SemiThick',
                        fontSize: 12,
                        fontWeight: '400',
                        color: '#171A1FFF',
                        marginTop: 5,
                        position: 'absolute',
                        right: 5,
                      }}>
                      {propStatData.totalMeterInstalledCount}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Catamaran-SemiThick',
                        fontSize: 12,
                        fontWeight: '400',
                        color: '#171A1FFF',
                        marginTop: 5,
                        marginLeft: 10,
                      }}>
                      Meters
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('properties');
                    }}>
                    <Image
                      style={{width: 54, height: 54}}
                      source={tenantsIcon}
                    />
                    <Text
                      style={{
                        fontFamily: 'Catamaran-SemiThick',
                        fontSize: 12,
                        fontWeight: '400',
                        color: '#171A1FFF',
                        marginTop: 5,
                        position: 'absolute',
                        right: 5,
                      }}>
                      {propStatData.totalTenantAssociateCount}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Catamaran-SemiThick',
                        fontSize: 12,
                        fontWeight: '400',
                        color: '#171A1FFF',
                        marginTop: 5,
                        marginLeft: 14,
                      }}>
                      Users
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  alignItems: 'center',
                  // justifyContent: 'space-between',
                  justifyContent: 'center',
                }}>
                {balanceData?.rececntTransactions?.length > 0 ? (
                  <Text
                    style={[
                      styles.text,
                      {
                        color: '#171A1FFF',
                        lineHeight: 60,
                        fontSize: 20,
                        fontWeight: '600',
                      },
                    ]}>
                    Recent Transactions
                  </Text>
                ) : null}
              </View>
              {balanceData?.rececntTransactions?.map((item, index) => (
                <View
                  style={{
                    backgroundColor: '#FFFFFFFF',
                    borderRadius: 4,
                    marginVertical: 7,
                    borderWidth: 1,
                    borderColor: '#DEE1E6FF',
                    borderStyle: 'solid',
                    height: 74,
                  }}>
                  <View
                    style={{
                      marginHorizontal: 16,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 16,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={arrowCircleDown}
                        style={{width: 24, height: 24}}
                      />
                      <View style={{marginHorizontal: 10}}>
                        <Text
                          style={[
                            styles.text,
                            {color: '#171A1FFF', lineHeight: 22, fontSize: 14},
                          ]}>
                          {item.transactionId}
                        </Text>

                        <Text
                          style={[
                            styles.text,
                            {color: '#9095A1', fontWeight: '400'},
                          ]}>
                          {item.transactionType}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.text,
                          {
                            color: 'black',
                            lineHeight: 22,
                            fontSize: 14,
                            backgroundColor: 'lightgray',
                            borderRadius: 6,
                            paddingHorizontal: 10,
                          },
                        ]}>
                        R {parseFloat(item.amount).toFixed(2)}
                        {/* R {item.amount} */}
                      </Text>
                      <Text
                        style={[
                          styles.text,
                          {
                            color: '#9095A1',
                            fontSize: 10,
                            fontWeight: '400',
                            textAlign: 'right',
                          },
                        ]}>
                        {moment(item.transactionDate).fromNow()}
                      </Text>
                    </View>
                    {/* <View>
                <Text
                  style={[
                    styles.text,
                    { color: '#17A948FF', lineHeight: 22, fontSize: 14 },
                  ]}>
                  R {item.amount}
                </Text>
                <Text
                  style={[
                    styles.text,
                    { color: '#9095A1', fontSize:10, fontWeight: '400', textAlign: 'right' },
                  ]}>
                  {moment(item.transactionDate).fromNow()}
                </Text>
              </View> */}
                  </View>
                </View>
              ))}
            </ScrollView>
          ) : noMasterDataFound === true ? (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#007BFF']} // Customize the loading spinner color
                  tintColor="#007BFF" // Customize the loading spinner color (Android)
                />
              }>
              <View style={styles.container}>
                <View
                  style={{
                    flex: 1,
                    paddingTop: '40%',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginHorizontal: 28,
                  }}>
                  <Text style={{fontSize: 18, color: 'black'}}>
                    {'Welcome to Ontec Home'}
                  </Text>
                  <Image
                    source={noProperty}
                    style={{
                      width: 350,
                      height: 180,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{fontSize: 32, color: 'black', marginBottom: 20}}>
                    {screenWidth}
                    {'No properties found.'}
                  </Text>
                  <Text style={{fontSize: 12, color: 'black'}}>
                    {'Get started by '}
                  </Text>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('addProperties', {isUpdate: false});
                    }}>
                    <Text style={{fontSize: 18, color: 'red', marginTop: 10}}>
                      Adding New Property +
                    </Text>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          ) : (
            <ScrollView
              style={styles.container}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#007BFF']} // Customize the loading spinner color
                  tintColor="#007BFF" // Customize the loading spinner color (Android)
                />
              }>
              <View style={{marginTop: '50%'}}>
                <Text
                  style={{
                    fontSize: 28,
                    alignSelf: 'center',
                    color: 'red',
                    justifyContent: 'center',
                  }}>
                  Please wait!
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    alignSelf: 'center',
                    color: 'black',
                    justifyContent: 'center',
                  }}>
                  Loading Your Data...
                </Text>
              </View>
            </ScrollView>
          )}
        </View>

        {/* Bottom*/}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            ...Platform.select({
              ios: {
                // shadowColor: 'black',
                // shadowOffset: { width: 0, height: -2 },
                // shadowOpacity: 0.2,
                // shadowRadius: 2,
              },
              android: {
                elevation: 2,
              },
            }),
          }}></View>
      </View>
      <Bottom currentPage={'Dashboard'} />
    </SafeAreaView>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  iosShadow: {
    shadowColor: '#171a1f',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.9,
    shadowRadius: 9,
  },
  androidShadow: {
    elevation: 5,
  },
});

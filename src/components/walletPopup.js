
// import { Image } from '@rneui/base';
// import React, { useState, useEffect,useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   Pressable,
//   Animated, Easing} from 'react-native';
//   import Remove from '../assets/remove.png';
// import Delete from '../assets/delete.png';
// import Check from '../assets/check.png';

// import { useNavigation } from '@react-navigation/native';
// import { useDispatch,useSelector } from 'react-redux'
// import { resetLoginDetails } from '../redux/slice/signIn'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getUserDetailsApiCall } from '../redux/slice/getUserDetails';
// import walletIcon from '../assets/dashboard/walletIcon.png'
// // ../../redux/slice/getUserDetails
// //icons
// import {PopupButton } from '../components/common';

// import userIcon from '../assets/headerIcon/userIcon.png';
// import Profile from '../assets/Modal/profile.png';
// import Card from '../assets/Modal/card.png';
// import Help from '../assets/Modal/help.png';
// import History from '../assets/topup/history.png'
// import Setting from '../assets/Modal/setting.png';
// import LogOut from '../assets/Modal/logout.png';
// import { COLOR_LIST } from '../helpers/colorlist';
// import { getFontSize } from '../helpers/commonFunction';

// const WalletPopup = (props) => {

//   const navigation = useNavigation();
//   const dispatch = useDispatch();

  
//   // const {
//   //   userDetailsIsLoading,
//   //   userDetailsData,
//   //   userDetailsIsSuccess,
//   //   userDetailsIsError
//   // } = useSelector((state) => ({
//   //   userDetailsIsLoading: state.userDetails.userDetailsIsLoading,
//   //   userDetailsData: state.userDetails.userDetailsData,
//   //   userDetailsIsSuccess: state.userDetails.userDetailsIsSuccess,
//   //   userDetailsIsError: state.userDetails.userDetailsIsError,
//   // }));
//   // console.log('====================================');
//   // console.log("userdetails",userDetailsData);
//   // console.log('====================================');
  

//   // //*state
//   // const [spinner, setSpinner] = useState(false);
//   // const [profilePic, setProfilePic] = useState(null)

//   // // useEffect(() => {
//   // //   onCLickUserDetails();
//   // // }, []);

//   // // useEffect(() => {
//   // //   if (userDetailsIsSuccess && userDetailsData) {
//   // //     setSpinner(!spinner);
//   // //   }
//   // // }, [userDetailsIsSuccess, userDetailsData]);

//   // // const onCLickUserDetails = async () => {
//   // //   let userId = await AsyncStorage.getItem('userId');
//   // //   let email = await AsyncStorage.getItem('emailId');
//   // //   let mobileNo = await AsyncStorage.getItem('mobile');

//   // //   let dataObj = { "userId": userId }
//   // //   setSpinner(!spinner);
//   // //   dispatch(getUserDetailsApiCall(dataObj));
//   // //   // console.log(dataObj);
//   // // }


//   //*state
//   // const [userName, setUserName] = useState("");
//   // const [userEmail, setUserEmail] = useState("");
//   // const [userMobileNo, setUserMobileNo] = useState("");
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState();
//   const [mobile, setMobile] = useState('');
//   const [image, setImage] = useState('');


//     // //redux
//     const {
//       userDetailsIsLoading,
//       userDetailsData,
//       userDetailsIsSuccess,
//       userDetailsIsError
//     } = useSelector((state) => ({
//       userDetailsIsLoading: state.userDetails.userDetailsIsLoading,
//       userDetailsData: state.userDetails.userDetailsData,
//       userDetailsIsSuccess: state.userDetails.userDetailsIsSuccess,
//       userDetailsIsError: state.userDetails.userDetailsIsError,
//     }));
//     // console.log('====================================');
//     // console.log("userdetails dashboard",userDetailsData);
//     // console.log('====================================');
    
  
//     //*state
//     const [spinner, setSpinner] = useState(false);
//     const [profilePic, setProfilePic] = useState(null)
  
//     useEffect(() => {
//       onCLickUserDetails();
//     }, []);
  
//     useEffect(() => {
//       if (userDetailsIsSuccess && userDetailsData) {
//         setSpinner(!spinner);
//         setUserName(userDetailsData.userName);
//         setMobile(userDetailsData.mobile);
//         setEmail(userDetailsData.email);
//         setImage(userDetailsData.profileUrl);
//       }
//     }, [userDetailsIsSuccess, userDetailsData]);

//     // console.log(userDetailsData.usserName);
//   // console.log(
  
//   //   userName,
//   //   mobile,
//   //   email,
//   //   image
  
//   // );
//   const onCLickUserDetails = async () => {
//     let userId = await AsyncStorage.getItem('userId');
//     //  console.log(userId)


//     let dataObj = { "userId": userId }
//     setSpinner(!spinner);
//     dispatch(getUserDetailsApiCall(dataObj));
//     // console.log(dataObj);
//   }
       
//   // useEffect(() => {
//   //   setUserData();
//   // }, []);

//   // //* Set user data
//   // const setUserData = async () => {
//   //   let firstName = await AsyncStorage.getItem('firstName');
//   //   let lastName = await AsyncStorage.getItem('lastName');
//   //   let email = await AsyncStorage.getItem('emailId');
//   //   let mobileNo = await AsyncStorage.getItem('mobile');
    
//   //   // let mobileNo = await AsyncStorage.getItem('propertyId');

//   //   let fullName = firstName + " " + lastName;
//   //   setUserName(fullName);
//   //   setUserEmail(email);
//   //   setUserMobileNo(mobileNo)
//   // };

//   //*logout


//   //*logout
//   const handleLogout = async () => {
    

//     try {
//       await AsyncStorage.removeItem('emailId');
//       await AsyncStorage.removeItem('accessToken');
//       await AsyncStorage.removeItem('refreshToken');
//       // await AsyncStorage.removeItem('isUserValid');
//       await AsyncStorage.removeItem('userId');
//       await AsyncStorage.removeItem('role');
//       await AsyncStorage.removeItem('mobile');
//       console.log('Token cleared successfully');
//     } catch (error) {
//       console.error('Error clearing token:', error);
//     }
//     dispatch(resetLoginDetails());
//     setModalVisible(false);
//     props.closeModal();
//     navigation.navigate('signIn');
//     toast.show("You are Logged out!", {
//         type: "success",
//         placement: "top",
//         duration: 3000,
//         offset: 30,
//         animationType: "slide-in",
//     });
//   }

//   const [modalVisible, setModalVisible] = useState(false);



//   const handleCancel = () => {
//     // Logic to handle cancel action
//     setModalVisible(false);
//   };
//   return (

//     <Modal
    
//       // animationType="slide"
//       transparent={true}
//       visible={props.Visible}
//       onRequestClose={props.closeModal}
//       onBackdropPress={() => props.closeModal()}
//     >
//       <Pressable style={{ flex: 1 }}
//         onPress={() => {
//           props.closeModal();
//         }}
//       >
//         <View />
//         <View style={styles.modalContainer}>

//           <View style={styles.modalContent}>

//             <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginBottom: 10 }}>
              
//               <View style={{ marginLeft: 12 }}>
//               <Text
//                   style={{
//                     width: 150,
//                     fontFamily: 'Catamaran-Regular',
//                     fontSize: 12,
//                     fontWeight: '400',
//                     color: '#9095A1FF',
//                   }}>
//                   {/* {props.mobile} */}
//                   Wallet Balance
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: getFontSize(props.walletBalance?.toString(), 32, 0.5),
//                     fontWeight: 700,
//                     color: '#171A1FFF',
//                   }}>
//                     R {props.walletBalance}
//                   {/* {userDetailsData.firstName} {userDetailsData.lastName} */}
//       {/* {props.userName} */}
//                 </Text>
//               </View>
//               <Image source={walletIcon} style={{tintColor:COLOR_LIST.WALLET_BG,height: 51, width: 51}} />
//             </View>

//             <View style={{ backgroundColor: '#DEE1E6', height: 1 }}></View>

//             <View style={{ marginVertical: 10 }}>
//               <Pressable
//                 onPress={() => {
//                   navigation.navigate('wallet_transaction');
//                   props.closeModal();
//                 }}>
//                 <View
//                   style={styles.modalListView}>
//                   <Image source={History} style={styles.mainitems} />
//                   <Text
//                     style={{
//                       marginLeft: 10,
//                       fontFamily: 'Catamaran-Medium',
//                       fontSize: 14,
//                       fontWeight: '400',
//                       lineHeight: 22,
//                       opacity: 1,
//                       color: COLOR_LIST.TEXT,
//                     }}>
//                     History
//                   </Text>
//                 </View>
//               </Pressable>

//               <Pressable onPress={() => {
//                 navigation.navigate('topUp');
//                 props.closeModal();
//               }}>
//                 <View
//                   style={styles.modalListView}>
//                   <Image source={Help} style={styles.mainitems} />
//                   <Text
//                     style={{
//                       marginLeft: 10,
//                       fontFamily: 'Catamaran-Medium',
//                       fontSize: 14,
//                       fontWeight: '400',
//                       lineHeight: 22,
//                       opacity: 1,
//                       color: COLOR_LIST.TEXT,
//                     }}>
//                     Topup Now
//                   </Text>
//                 </View>
//               </Pressable>
//             </View>

//           </View>
//         </View>
//       </Pressable>

//     </Modal>
//   )
// }

// const styles = StyleSheet.create({
//   modalContainer: {
//   flex: 1,
//   marginTop: 60,
//   alignItems: 'flex-start', // Align to the right side
//   marginLeft: 70,
//   position: 'absolute'
// },
// overlay: {},
// modalContent: {
//   width: 256,
//   height: 325,
//   backgroundColor: '#FFFFFF', // white
//   borderRadius: 2,
//   shadowColor: '#171a1f',
//   shadowOffset: { width: 0, height: 4 },
//   shadowOpacity: 0.9,
//   shadowRadius: 9,
//   elevation: 2,
//   paddingVertical: 10,
//   borderRadius: 5,
//   marginTop: 10,
//   marginRight: 10,
//   alignSelf: 'flex-end', // Align to the right side
// },
// mainitems: {
//   height: 24, width: 24
// },
// modalListView: {
//   flexDirection: 'row',
//   marginHorizontal: 15,
//   marginVertical: 4,
//   alignItems: "center",
//   height: 35,
// },
// modalContainer1: {
//   flex:1,
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: 'rgba(0, 0, 0, 0.5)',
// },
// modalContent: {
//   backgroundColor: '#fff',
//   padding:10,
//   borderRadius: 10,
//   elevation: 5,
//   // borderWidth:2,borderColor:'red'
// },
// modalTitle: {
//   fontSize: 18,
//   fontWeight: 'bold',
//   marginBottom: 10,
//   textAlign: 'center',
// },
// modalText: {
//   fontSize: 16,
//   marginBottom: 20,
//   color: COLOR_LIST.TEXT,
//   textAlign: 'center',
// },
// modalButtons: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
// },
// modalButton: {
//   backgroundColor: '#DDDDDD',
//   paddingVertical: 10,
//   paddingHorizontal: 20,
//   borderRadius: 5,
// },
// buttonText: {
//   fontSize: 16,
// },
// view:{

//     flex: 1,
//     // borderColor:'red',
//     width:'100%',
//     alignSelf:'center',
//     // borderWidth:2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', 
// },
// centeredView: {
//   flex: 1,
//   // borderColor:'red',
//   width:'50%',
//   alignSelf:'center',
//   // borderWidth:2,
//   justifyContent: 'center',
//   alignItems: 'center',
// },
// modalView: {
//   backgroundColor: 'white',
//   borderRadius: 10,
//   padding: 20,
//   alignSelf: 'center',
//   elevation: 5,
// },
// buttonContainer: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   width: '100%',
// },
// button: {
//   borderRadius: 5,
//   paddingVertical: 10,
//   paddingHorizontal: 20,
//   marginHorizontal: 10,
// },
// logoutButton: {
//   backgroundColor: '#FF6347', // Red color for logout
// },
// cancelButton: {
//   backgroundColor: '#007bff', // Blue color for cancel
// },
// buttonText: {
//   color: 'white',
//   fontWeight: 'bold',
//   textAlign: 'center',
// },

// });


// export default WalletPopup;






// // < --- old one ---->

// // import { Image } from '@rneui/base';
// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Modal,
// //   Pressable,
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { useDispatch } from 'react-redux'
// // import { resetLoginDetails } from '../redux/slice/signIn'
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // //icons
// // import userIcon from '../assets/headerIcon/userIcon.png';
// // import Profile from '../assets/Modal/profile.png';
// // import Card from '../assets/Modal/card.png';
// // import Help from '../assets/Modal/help.png';
// // import Setting from '../assets/Modal/setting.png';
// // import LogOut from '../assets/Modal/logout.png';


// // const WalletPopup = (props) => {

// //   const navigation = useNavigation();
// //   const dispatch = useDispatch();

// //   //*state
// //   const [userName, setUserName] = useState("");
// //   const [userEmail, setUserEmail] = useState("");
// //   const [userMobileNo, setUserMobileNo] = useState("");

// //   useEffect(() => {
// //     setUserData();
// //   }, []);

// //   //* Set user data
// //   const setUserData = async () => {
// //     let firstName = await AsyncStorage.getItem('firstName');
// //     let lastName = await AsyncStorage.getItem('lastName');
// //     let email = await AsyncStorage.getItem('emailId');
// //     let mobileNo = await AsyncStorage.getItem('mobile');
// //     // let mobileNo = await AsyncStorage.getItem('propertyId');

// //     let fullName = firstName + " " + lastName;
// //     setUserName(fullName);
// //     setUserEmail(email);
// //     setUserMobileNo(mobileNo)
// //   };

// //   //*logout
// //   const onClickSignOut = async () => {
// //     await AsyncStorage.removeItem('emailId');
// //     await AsyncStorage.removeItem('accessToken');
// //     await AsyncStorage.removeItem('refreshToken');
// //     await AsyncStorage.removeItem('isUserValid');
// //     await AsyncStorage.removeItem('userId');
// //     await AsyncStorage.removeItem('role');
// //     await AsyncStorage.removeItem('mobile');
// //     await AsyncStorage.removeItem('firstName');
// //     await AsyncStorage.removeItem('lastName');
// //     dispatch(resetLoginDetails());
// //     props.closeModal();
// //     navigation.navigate('signIn');
// //   }

// //   return (

// //     <Modal
// //       // animationType="slide"
// //       transparent={true}
// //       visible={props.Visible}
// //       onRequestClose={props.closeModal}
// //       onBackdropPress={() => props.closeModal()}
// //     >
// //       <Pressable style={{ flex: 1 }}
// //         onPress={() => {
// //           props.closeModal();
// //         }}
// //       >
// //         <View />
// //         <View style={styles.modalContainer}>

// //           <View style={styles.modalContent}>

// //             <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, marginBottom: 10 }}>
// //               <Image source={userIcon} style={{ height: 51, width: 51 }} />
// //               <View style={{ marginLeft: 12 }}>
// //                 <Text
// //                   style={{
// //                     width: 163,
// //                     fontFamily: 'Catamaran-Bold',
// //                     fontSize: 14,
// //                     fontWeight: '700',
// //                     color: '#171A1FFF',
// //                   }}>
// //                   {userName}
// //                 </Text>
// //                 <Text
// //                   style={{
// //                     width: 163,
// //                     fontFamily: 'Catamaran-Regular',
// //                     fontSize: 12,
// //                     fontWeight: '400',
// //                     color: '#9095A1FF',
// //                   }}>
// //                   {userMobileNo}
// //                 </Text>
// //                 <Text
// //                   style={{
// //                     width: 163,

// //                     fontFamily: 'Catamaran-Regular',
// //                     fontSize: 12,
// //                     fontWeight: '400',
// //                     lineHeight: 20,
// //                     color: '#171A1FFF',
// //                   }}>
// //                   {userEmail}
// //                 </Text>
// //               </View>
// //             </View>

// //             <View style={{ backgroundColor: '#DEE1E6', height: 1 }}></View>

// //             <View style={{ marginVertical: 10 }}>
// //               <Pressable
// //                 onPress={() => {
// //                   navigation.navigate('myProfile');
// //                   props.closeModal();
// //                 }}>
// //                 <View
// //                   style={styles.modalListView}>
// //                   <Image source={Profile} style={styles.mainitems} />
// //                   <Text
// //                     style={{
// //                       marginLeft: 10,
// //                       fontFamily: 'Catamaran-Medium',
// //                       fontSize: 14,
// //                       fontWeight: '400',
// //                       lineHeight: 22,
// //                       opacity: 1,
// //                       color: COLOR_LIST.TEXT,
// //                     }}>
// //                     My Profile
// //                   </Text>
// //                 </View>
// //               </Pressable>

// //               <Pressable
// //                 onPress={() => {
// //                   navigation.navigate('accountSetting');
// //                   props.closeModal();
// //                 }}>
// //                 <View
// //                   style={styles.modalListView}>
// //                   <Image source={Setting} style={styles.mainitems} />
// //                   <Text
// //                     style={{
// //                       marginLeft: 10,
// //                       fontFamily: 'Catamaran-Medium',
// //                       fontSize: 14,
// //                       fontWeight: '400',
// //                       lineHeight: 22,
// //                       opacity: 1,
// //                       color: COLOR_LIST.TEXT,
// //                     }}>
// //                     Settings
// //                   </Text>
// //                 </View>
// //               </Pressable>

// //               <Pressable onPress={() => {
// //                 navigation.navigate('contactUs');
// //                 props.closeModal();
// //               }}>
// //                 <View
// //                   style={styles.modalListView}>
// //                   <Image source={Help} style={styles.mainitems} />
// //                   <Text
// //                     style={{
// //                       marginLeft: 10,
// //                       fontFamily: 'Catamaran-Medium',
// //                       fontSize: 14,
// //                       fontWeight: '400',
// //                       lineHeight: 22,
// //                       opacity: 1,
// //                       color: COLOR_LIST.TEXT,
// //                     }}>
// //                     Help / Contact Us
// //                   </Text>
// //                 </View>
// //               </Pressable>
// //             </View>

// //             <View style={{ backgroundColor: '#DEE1E6', height: 1 }}></View>

// //             <TouchableOpacity onPress={() => {
// //               onClickSignOut();
// //             }}>
// //               <View
// //                 style={styles.modalListView}>
// //                 <Image source={LogOut} style={styles.mainitems} />
// //                 <Text
// //                   style={{
// //                     marginLeft: 10,
// //                     fontFamily: 'Catamaran-Medium',
// //                     fontSize: 14,
// //                     fontWeight: '400',
// //                     lineHeight: 22,
// //                     opacity: 1,
// //                     color: COLOR_LIST.TEXT,
// //                   }}>
// //                   Sign out
// //                 </Text>
// //               </View>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </Pressable>

// //     </Modal>
// //   )
// // }

// // const styles = StyleSheet.create({
// //   modalContainer: {
// //     flex: 1,
// //     marginTop: 40,
// //     alignItems: 'flex-start', // Align to the right side
// //     marginLeft: 115,
// //     position: 'absolute'
// //   },
// //   overlay: {},
// //   modalContent: {
// //     width: 256,
// //     height: 325,
// //     backgroundColor: '#FFFFFF', // white
// //     borderRadius: 2,
// //     shadowColor: '#171a1f',
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.9,
// //     shadowRadius: 9,
// //     elevation: 2,
// //     paddingVertical: 10,
// //     borderRadius: 5,
// //     marginTop: 10,
// //     marginRight: 10,
// //     alignSelf: 'flex-end', // Align to the right side
// //   },
// //   mainitems: {
// //     height: 24, width: 24
// //   },
// //   modalListView: {
// //     flexDirection: 'row',
// //     marginHorizontal: 15,
// //     marginVertical: 4,
// //     alignItems: "center",
// //     height: 35,
// //   }
// // });


// // export default WalletPopup;





import { Image } from '@rneui/base';
import React, { useState, useEffect,useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Animated, Easing} from 'react-native';
  import Remove from '../assets/remove.png';
import Delete from '../assets/delete.png';
import Check from '../assets/check.png';

import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux'
import { resetLoginDetails } from '../redux/slice/signIn'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserDetailsApiCall } from '../redux/slice/getUserDetails';
import walletIcon from '../assets/dashboard/walletIcon.png'
// ../../redux/slice/getUserDetails
//icons
import {PopupButton } from '../components/common';

import userIcon from '../assets/headerIcon/userIcon.png';
import Profile from '../assets/Modal/profile.png';
import Card from '../assets/Modal/card.png';
import Help from '../assets/Modal/help.png';
import History from '../assets/topup/history.png'
import Setting from '../assets/Modal/setting.png';
import LogOut from '../assets/Modal/logout.png';
import { COLOR_LIST } from '../helpers/colorlist';
import { getFontSize, truncateString } from '../helpers/commonFunction';

const WalletPopup = (props) => {
  console.log(props.propertyNameForTopup,"walletpipup",props.propertyValueForTopup);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState('');
  const [image, setImage] = useState('');


    // //redux
    const {
      userDetailsIsLoading,
      userDetailsData,
      userDetailsIsSuccess,
      userDetailsIsError
    } = useSelector((state) => ({
      userDetailsIsLoading: state.userDetails.userDetailsIsLoading,
      userDetailsData: state.userDetails.userDetailsData,
      userDetailsIsSuccess: state.userDetails.userDetailsIsSuccess,
      userDetailsIsError: state.userDetails.userDetailsIsError,
    }));

    const [spinner, setSpinner] = useState(false);
    const [profilePic, setProfilePic] = useState(null)
  
    useEffect(() => {
      onCLickUserDetails();
    }, []);
  
    useEffect(() => {
      if (userDetailsIsSuccess && userDetailsData) {
        setSpinner(!spinner);
        setUserName(truncateString(userDetailsData?.userName, 10));
        setMobile(userDetailsData.mobile);
        setEmail(userDetailsData.email);
        setImage(userDetailsData.profileUrl);
      }
    }, [userDetailsIsSuccess, userDetailsData]);

    // console.log(userDetailsData.usserName);
  // console.log(
  
  //   userName,
  //   mobile,
  //   email,
  //   image
  
  // );
  const onCLickUserDetails = async () => {
    let userId = await AsyncStorage.getItem('userId');
    //  console.log(userId)


    let sessionKey = await AsyncStorage.getItem('sessionKey');

  let dataObj = { "id": userId, "sessionKey": sessionKey}
    setSpinner(!spinner);
    dispatch(getUserDetailsApiCall(dataObj));
    // console.log(dataObj);
  }
       
  // useEffect(() => {
  //   setUserData();
  // }, []);

  // //* Set user data
  // const setUserData = async () => {
  //   let firstName = await AsyncStorage.getItem('firstName');
  //   let lastName = await AsyncStorage.getItem('lastName');
  //   let email = await AsyncStorage.getItem('emailId');
  //   let mobileNo = await AsyncStorage.getItem('mobile');
    
  //   // let mobileNo = await AsyncStorage.getItem('propertyId');

  //   let fullName = firstName + " " + lastName;
  //   setUserName(fullName);
  //   setUserEmail(email);
  //   setUserMobileNo(mobileNo)
  // };

  //*logout


  //*logout
  const handleLogout = async () => {
    

    try {
      await AsyncStorage.removeItem('emailId');
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      // await AsyncStorage.removeItem('isUserValid');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('role');
      await AsyncStorage.removeItem('mobile');
     await AsyncStorage.removeItem('sessionKey');

      // console.log('Token cleared successfully');
    } catch (error) {
      console.error('Error clearing token:', error);
    }
    dispatch(resetLoginDetails());
    setModalVisible(false);
    props.closeModal();
    navigation.navigate('signIn');
    toast.show("You are Logged out!", {
        type: "success",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "slide-in",
    });
  }

  const [modalVisible, setModalVisible] = useState(false);



  const handleCancel = () => {
    // Logic to handle cancel action
    setModalVisible(false);
  };
  return (

    <Modal
    
      // animationType="slide"
      transparent={true}
      visible={props.Visible}
      onRequestClose={props.closeModal}
      onBackdropPress={() => props.closeModal()}
    >
      <Pressable style={{ flex: 1 }}
        onPress={() => {
          props.closeModal();
        }}
      >
        <View />
        <View style={styles.modalContainer}>

          <View style={styles.modalContent}>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginBottom: 10 }}>
              
              <View style={{ marginLeft: 12 }}>
              <Text
                  style={{
                    width: 150,
                    fontFamily: 'Catamaran-Regular',
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#9095A1FF',
                  }}>
                  {/* {props.mobile} */}
                  Wallet Balance
                </Text>
                <Text
                  style={{
                    fontSize: getFontSize(props.walletBalance?.toString(), 32, 0.5),
                    fontWeight: 700,
                    color: '#171A1FFF',
                  }}>
                    R {props.walletBalance}
                    
                  {/* {userDetailsData.firstName} {userDetailsData.lastName} */}
      {/* {props.userName} */}
                </Text>
              </View>
              <Image source={walletIcon} style={{tintColor:COLOR_LIST.WALLET_BG,height: 51, width: 51}} />
            </View>

            <View style={{ backgroundColor: '#DEE1E6', height: 1 }}></View>

            <View style={{ marginVertical: 10 }}>
              <Pressable
                onPress={() => {
                  navigation.navigate('wallet_transaction');
                  props.closeModal();
                }}>
                <View
                  style={styles.modalListView}>
                  <Image source={History} style={styles.mainitems} />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: 'Catamaran-Medium',
                      fontSize: 14,
                      fontWeight: '400',
                      lineHeight: 22,
                      opacity: 1,
                      color: COLOR_LIST.TEXT,
                    }}>
                    History
                  </Text>
                </View>
              </Pressable>
          
              <Pressable   onPress={() => {
           navigation.navigate('topUp', {
            value: props.propertyValueForTopup,
            name:props.propertyNameForTopup // Ensure this is correctly passed
          });
          props.closeModal();
            }}>
                <View
                  style={styles.modalListView}>
                  <Image source={walletIcon} style={[{tintColor:'black'},styles.mainitems]} />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: 'Catamaran-Medium',
                      fontSize: 14,
                      fontWeight: '400',
                      lineHeight: 22,
                      opacity: 1,
                      marginTop:3,
                      color: COLOR_LIST.TEXT,
                    }}>
                    Topup Now
                  </Text>
                </View>
              </Pressable>
            </View>

          </View>
        </View>
      </Pressable>

    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
  flex: 1,
  marginTop: 60,
  alignItems: 'flex-start', // Align to the right side
  marginLeft: 70,
  position: 'absolute'
},
overlay: {},
modalContent: {
  width: 256,
  height: 325,
  backgroundColor: '#FFFFFF', // white
  borderRadius: 2,
  shadowColor: '#171a1f',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.9,
  shadowRadius: 9,
  elevation: 2,
  paddingVertical: 10,
  borderRadius: 5,
  marginTop: 10,
  marginRight: 10,
  alignSelf: 'flex-end', // Align to the right side
},
mainitems: {
  height: 24, width: 24
},
modalListView: {
  flexDirection: 'row',
  marginHorizontal: 15,
  marginVertical: 4,
  alignItems: "center",
  height: 35,
},
modalContainer1: {
  flex:1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  backgroundColor: '#fff',
  padding:10,
  borderRadius: 10,
  elevation: 5,
  // borderWidth:2,borderColor:'red'
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
},
modalText: {
  fontSize: 16,
  marginBottom: 20,
  color: COLOR_LIST.TEXT,
  textAlign: 'center',
},
modalButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
modalButton: {
  backgroundColor: '#DDDDDD',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
},
buttonText: {
  fontSize: 16,
},
view:{

    flex: 1,
    // borderColor:'red',
    width:'100%',
    alignSelf:'center',
    // borderWidth:2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
},
centeredView: {
  flex: 1,
  // borderColor:'red',
  width:'50%',
  alignSelf:'center',
  // borderWidth:2,
  justifyContent: 'center',
  alignItems: 'center',
},
modalView: {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  alignSelf: 'center',
  elevation: 5,
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
button: {
  borderRadius: 5,
  paddingVertical: 10,
  paddingHorizontal: 20,
  marginHorizontal: 10,
},
logoutButton: {
  backgroundColor: '#FF6347', // Red color for logout
},
cancelButton: {
  backgroundColor: '#007bff', // Blue color for cancel
},
buttonText: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},

});


export default WalletPopup;






// < --- old one ---->

// import { Image } from '@rneui/base';
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   Pressable,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux'
// import { resetLoginDetails } from '../redux/slice/signIn'
// import AsyncStorage from '@react-native-async-storage/async-storage';

// //icons
// import userIcon from '../assets/headerIcon/userIcon.png';
// import Profile from '../assets/Modal/profile.png';
// import Card from '../assets/Modal/card.png';
// import Help from '../assets/Modal/help.png';
// import Setting from '../assets/Modal/setting.png';
// import LogOut from '../assets/Modal/logout.png';


// const WalletPopup = (props) => {

//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   //*state
//   const [userName, setUserName] = useState("");
//   const [userEmail, setUserEmail] = useState("");
//   const [userMobileNo, setUserMobileNo] = useState("");

//   useEffect(() => {
//     setUserData();
//   }, []);

//   //* Set user data
//   const setUserData = async () => {
//     let firstName = await AsyncStorage.getItem('firstName');
//     let lastName = await AsyncStorage.getItem('lastName');
//     let email = await AsyncStorage.getItem('emailId');
//     let mobileNo = await AsyncStorage.getItem('mobile');
//     // let mobileNo = await AsyncStorage.getItem('propertyId');

//     let fullName = firstName + " " + lastName;
//     setUserName(fullName);
//     setUserEmail(email);
//     setUserMobileNo(mobileNo)
//   };

//   //*logout
//   const onClickSignOut = async () => {
//     await AsyncStorage.removeItem('emailId');
//     await AsyncStorage.removeItem('accessToken');
//     await AsyncStorage.removeItem('refreshToken');
//     await AsyncStorage.removeItem('isUserValid');
//     await AsyncStorage.removeItem('userId');
//     await AsyncStorage.removeItem('role');
//     await AsyncStorage.removeItem('mobile');
//     await AsyncStorage.removeItem('firstName');
//     await AsyncStorage.removeItem('lastName');
//     dispatch(resetLoginDetails());
//     props.closeModal();
//     navigation.navigate('signIn');
//   }

//   return (

//     <Modal
//       // animationType="slide"
//       transparent={true}
//       visible={props.Visible}
//       onRequestClose={props.closeModal}
//       onBackdropPress={() => props.closeModal()}
//     >
//       <Pressable style={{ flex: 1 }}
//         onPress={() => {
//           props.closeModal();
//         }}
//       >
//         <View />
//         <View style={styles.modalContainer}>

//           <View style={styles.modalContent}>

//             <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, marginBottom: 10 }}>
//               <Image source={userIcon} style={{ height: 51, width: 51 }} />
//               <View style={{ marginLeft: 12 }}>
//                 <Text
//                   style={{
//                     width: 163,
//                     fontFamily: 'Catamaran-Bold',
//                     fontSize: 14,
//                     fontWeight: '700',
//                     color: '#171A1FFF',
//                   }}>
//                   {userName}
//                 </Text>
//                 <Text
//                   style={{
//                     width: 163,
//                     fontFamily: 'Catamaran-Regular',
//                     fontSize: 12,
//                     fontWeight: '400',
//                     color: '#9095A1FF',
//                   }}>
//                   {userMobileNo}
//                 </Text>
//                 <Text
//                   style={{
//                     width: 163,

//                     fontFamily: 'Catamaran-Regular',
//                     fontSize: 12,
//                     fontWeight: '400',
//                     lineHeight: 20,
//                     color: '#171A1FFF',
//                   }}>
//                   {userEmail}
//                 </Text>
//               </View>
//             </View>

//             <View style={{ backgroundColor: '#DEE1E6', height: 1 }}></View>

//             <View style={{ marginVertical: 10 }}>
//               <Pressable
//                 onPress={() => {
//                   navigation.navigate('myProfile');
//                   props.closeModal();
//                 }}>
//                 <View
//                   style={styles.modalListView}>
//                   <Image source={Profile} style={styles.mainitems} />
//                   <Text
//                     style={{
//                       marginLeft: 10,
//                       fontFamily: 'Catamaran-Medium',
//                       fontSize: 14,
//                       fontWeight: '400',
//                       lineHeight: 22,
//                       opacity: 1,
//                       color: COLOR_LIST.TEXT,
//                     }}>
//                     My Profile
//                   </Text>
//                 </View>
//               </Pressable>

//               <Pressable
//                 onPress={() => {
//                   navigation.navigate('accountSetting');
//                   props.closeModal();
//                 }}>
//                 <View
//                   style={styles.modalListView}>
//                   <Image source={Setting} style={styles.mainitems} />
//                   <Text
//                     style={{
//                       marginLeft: 10,
//                       fontFamily: 'Catamaran-Medium',
//                       fontSize: 14,
//                       fontWeight: '400',
//                       lineHeight: 22,
//                       opacity: 1,
//                       color: COLOR_LIST.TEXT,
//                     }}>
//                     Settings
//                   </Text>
//                 </View>
//               </Pressable>

//               <Pressable onPress={() => {
//                 navigation.navigate('contactUs');
//                 props.closeModal();
//               }}>
//                 <View
//                   style={styles.modalListView}>
//                   <Image source={Help} style={styles.mainitems} />
//                   <Text
//                     style={{
//                       marginLeft: 10,
//                       fontFamily: 'Catamaran-Medium',
//                       fontSize: 14,
//                       fontWeight: '400',
//                       lineHeight: 22,
//                       opacity: 1,
//                       color: COLOR_LIST.TEXT,
//                     }}>
//                     Help / Contact Us
//                   </Text>
//                 </View>
//               </Pressable>
//             </View>

//             <View style={{ backgroundColor: '#DEE1E6', height: 1 }}></View>

//             <TouchableOpacity onPress={() => {
//               onClickSignOut();
//             }}>
//               <View
//                 style={styles.modalListView}>
//                 <Image source={LogOut} style={styles.mainitems} />
//                 <Text
//                   style={{
//                     marginLeft: 10,
//                     fontFamily: 'Catamaran-Medium',
//                     fontSize: 14,
//                     fontWeight: '400',
//                     lineHeight: 22,
//                     opacity: 1,
//                     color: COLOR_LIST.TEXT,
//                   }}>
//                   Sign out
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Pressable>

//     </Modal>
//   )
// }

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     marginTop: 40,
//     alignItems: 'flex-start', // Align to the right side
//     marginLeft: 115,
//     position: 'absolute'
//   },
//   overlay: {},
//   modalContent: {
//     width: 256,
//     height: 325,
//     backgroundColor: '#FFFFFF', // white
//     borderRadius: 2,
//     shadowColor: '#171a1f',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.9,
//     shadowRadius: 9,
//     elevation: 2,
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginTop: 10,
//     marginRight: 10,
//     alignSelf: 'flex-end', // Align to the right side
//   },
//   mainitems: {
//     height: 24, width: 24
//   },
//   modalListView: {
//     flexDirection: 'row',
//     marginHorizontal: 15,
//     marginVertical: 4,
//     alignItems: "center",
//     height: 35,
//   }
// });


// export default WalletPopup;
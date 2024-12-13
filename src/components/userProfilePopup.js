import {Image} from '@rneui/base';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import Remove from '../assets/remove.png';
import Delete from '../assets/delete.png';
import Check from '../assets/check.png';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {resetLoginDetails} from '../redux/slice/signIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getUserDetailsApiCall,
  resetGetUserDetailsApiCall,
} from '../redux/slice/getUserDetails';
// ../../redux/slice/getUserDetails
//icons
import {PopupButton} from '../components/common';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import userIcon from '../assets/headerIcon/userIcon.png';
import Profile from '../assets/Modal/profile.png';
import Card from '../assets/Modal/card.png';
import Help from '../assets/Modal/help.png';
import changPassword from '../assets/Modal/changePassword.png';

import Setting from '../assets/Modal/setting.png';
import LogOut from '../assets/Modal/logout.png';
import {COLOR_LIST} from '../helpers/colorlist';
import {Toast} from 'react-native-toast-notifications';
import {truncateString} from '../helpers/commonFunction';

const UserProfilePopup = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const {
  //   userDetailsIsLoading,
  //   userDetailsData,
  //   userDetailsIsSuccess,
  //   userDetailsIsError
  // } = useSelector((state) => ({
  //   userDetailsIsLoading: state.userDetails.userDetailsIsLoading,
  //   userDetailsData: state.userDetails.userDetailsData,
  //   userDetailsIsSuccess: state.userDetails.userDetailsIsSuccess,
  //   userDetailsIsError: state.userDetails.userDetailsIsError,
  // }));
  // console.log('====================================');
  // console.log("userdetails",userDetailsData);
  // console.log('====================================');

  // //*state
  // const [spinner, setSpinner] = useState(false);
  // const [profilePic, setProfilePic] = useState(null)

  // // useEffect(() => {
  // //   onCLickUserDetails();
  // // }, []);

  // // useEffect(() => {
  // //   if (userDetailsIsSuccess && userDetailsData) {
  // //     setSpinner(!spinner);
  // //   }
  // // }, [userDetailsIsSuccess, userDetailsData]);

  // // const onCLickUserDetails = async () => {
  // //   let userId = await AsyncStorage.getItem('userId');
  // //   let email = await AsyncStorage.getItem('emailId');
  // //   let mobileNo = await AsyncStorage.getItem('mobile');

  // //   let dataObj = { "userId": userId }
  // //   setSpinner(!spinner);
  // //   dispatch(getUserDetailsApiCall(dataObj));
  // //   // console.log(dataObj);
  // // }

  //*state
  // const [userName, setUserName] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  // const [userMobileNo, setUserMobileNo] = useState("");
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState('');
  const [image, setImage] = useState('');

  // //redux
  const {
    userDetailsIsLoading,
    userDetailsData,
    userDataNotifications,
    userDetailsIsSuccess,
    userDetailsIsError,
  } = useSelector(state => ({
    userDetailsIsLoading: state.userDetails.userDetailsIsLoading,
    userDetailsData: state.userDetails.userDetailsData,
    userDataNotifications: state.userDetails.userDataNotifications,

    userDetailsIsSuccess: state.userDetails.userDetailsIsSuccess,
    userDetailsIsError: state.userDetails.userDetailsIsError,
  }));
  // console.log("userDetailsData==============================================",userDetailsIsSuccess,userDetailsIsError,userDetailsIsLoading);

  //*state
  const [spinner, setSpinner] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    onCLickUserDetails();
  }, []);

  useEffect(() => {
    if (userDetailsIsSuccess == true && userDetailsData) {
      setSpinner(!spinner);
      setUserName(truncateString(userDetailsData.userName, 10));
      setMobile(userDetailsData.mobile);
      setEmail(userDetailsData.email);
      setImage(userDetailsData.profileUrl);
    }
    // if(userDetailsIsSuccess== true && userDetailsData?.status === null && userDetailsIsLoading ==false ){

    //   handleLogout();

    // }
  }, [userDetailsIsSuccess, userDetailsData, userDetailsIsError]);
  // console.log(userDetailsData);
  // console.log(

  //   userName,
  //   mobile,
  //   email,
  //   image

  // );
  const onCLickUserDetails = async () => {
    let isProfileComplete = await AsyncStorage.getItem('isProfileComplete');

    if (isProfileComplete != 'true') {
      let emailId = await AsyncStorage.getItem('emailId');
      let mobileNo = await AsyncStorage.getItem('mobile');
      navigation.navigate('profile', {mobile: mobileNo, emailId: emailId});
      Toast.show('Please complete your profile.', {
        type: 'warning',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else {
      let userId = await AsyncStorage.getItem('userId');
      let sessionKey = await AsyncStorage.getItem('sessionKey');

      let dataObj = {id: userId, sessionKey: sessionKey};
      setSpinner(!spinner);
      dispatch(getUserDetailsApiCall(dataObj));
      // console.log(dataObj);
    }
  };

  //*logout
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
      console.log('Token cleared successfully');
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing token:', error);
    }
    setModalVisible(false);
    setTimeout(async () => {
      props.closeModal();
      navigation.push('signIn');
    }, 1000);
    // dispatch(resetGetUserDetailsApiCall())
    dispatch(resetLoginDetails());

    Toast.show('You are signed out', {
      type: 'success',
      placement: 'top',
      duration: 5000,
      offset: 30,
      animationType: 'slide-in',
    });
  };

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
      onBackdropPress={() => props.closeModal()}>
      <Pressable
        style={{flex: 1}}
        onPress={() => {
          props.closeModal();
        }}>
        <View />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 15,
                marginBottom: 10,
              }}>
              <Image
                source={
                  image !== null ? {uri: `${image}?${Date.now()}`} : userIcon
                }
                style={{height: 51, width: 51}}
              />
              <View style={{marginLeft: 12}}>
                <Text
                  style={{
                    width: 163,
                    fontFamily: 'Catamaran-Bold',
                    fontSize: 14,
                    fontWeight: '700',
                    color: '#171A1FFF',
                  }}>
                  {userName}
                  {/* {userDetailsData.firstName} {userDetailsData.lastName} */}
                  {/* {props.userName} */}
                </Text>
                <Text
                  style={{
                    width: 163,
                    fontFamily: 'Catamaran-Regular',
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#9095A1FF',
                  }}>
                  {/* {props.mobile} */}
                  {mobile}
                </Text>
                <Text
                  style={{
                    width: 163,

                    fontFamily: 'Catamaran-Regular',
                    fontSize: 12,
                    fontWeight: '400',
                    lineHeight: 20,
                    color: '#171A1FFF',
                  }}>
                  {/* {props.email} */}
                  {email}
                </Text>
              </View>
            </View>

            <View style={{backgroundColor: '#DEE1E6', height: 1}}></View>

            <View style={{marginVertical: 10}}>
              <Pressable
                onPress={() => {
                  navigation.navigate('myProfile');
                  props.closeModal();
                }}>
                <View style={styles.modalListView}>
                  <Image source={Profile} style={styles.mainitems} />
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
                    My Profile
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  navigation.navigate('accountSetting');
                  props.closeModal();
                }}>
                <View style={styles.modalListView}>
                  <Image source={Setting} style={styles.mainitems} />
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
                    Settings
                  </Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate('changePassword');
                  props.closeModal();
                }}>
                <View style={styles.modalListView}>
                  <Image source={changPassword} style={styles.mainitems} />
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
                    Change Password
                  </Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate('contactUs');
                  props.closeModal();
                }}>
                <View style={styles.modalListView}>
                  <Image source={Help} style={styles.mainitems} />
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
                    Help / Contact Us
                  </Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate('privacyPolicy');
                  props.closeModal();
                }}>
                <View style={styles.modalListView}>
                  <FontAwesome
                    name="lock"
                    size={22}
                    color={COLOR_LIST.TEXT}
                    style={{marginHorizontal: 3}}
                  />
                  <Text
                    style={{
                      marginLeft: 12,
                      fontFamily: 'Catamaran-Medium',
                      fontSize: 14,
                      fontWeight: '400',
                      lineHeight: 22,
                      opacity: 1,
                      color: COLOR_LIST.TEXT,
                    }}>
                    Privacy & Policy
                  </Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate('TermsAndConditions');
                  props.closeModal();
                }}>
                <View style={styles.modalListView}>
                  <MaterialIcons
                    name="description"
                    size={22}
                    color={COLOR_LIST.TEXT}
                    style={{marginHorizontal: 0}}
                  />
                  <Text
                    style={{
                      marginLeft: 9,
                      fontFamily: 'Catamaran-Medium',
                      fontSize: 14,
                      fontWeight: '400',

                      lineHeight: 22,
                      opacity: 1,
                      color: COLOR_LIST.TEXT,
                    }}>
                    Terms & Condition
                  </Text>
                </View>
              </Pressable>
            </View>

            <View style={{backgroundColor: '#DEE1E6', height: 1}}></View>

            {/* <TouchableOpacity onPress={() => {
             setPopup(true);
            }}> */}
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.modalListView}>
                <Image source={LogOut} style={styles.mainitems} />
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
                  Sign out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.view}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.modalText, {marginBottom: 5}]}>
                Are you sure to
              </Text>
              <Text style={styles.modalText}> Sign out?</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.logoutButton]}
                  onPress={handleLogout}>
                  <Text style={styles.buttonText}>YES</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={handleCancel}>
                  <Text style={styles.buttonText}>NO</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: 60,
    alignItems: 'flex-start', // Align to the right side
    marginLeft: 115,
    position: 'absolute',
  },
  overlay: {},
  modalContent: {
    width: 256,
    height: 325,
    backgroundColor: '#FFFFFF', // white
    borderRadius: 2,
    shadowColor: '#171a1f',
    shadowOffset: {width: 0, height: 4},
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
    height: 24,
    width: 24,
  },
  modalListView: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 4,
    alignItems: 'center',
    height: 35,
  },
  modalContainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 10,
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
  view: {
    flex: 1,
    // borderColor:'red',
    width: '100%',
    alignSelf: 'center',
    // borderWidth:2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centeredView: {
    flex: 1,
    // borderColor:'red',
    width: '50%',
    alignSelf: 'center',
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
    backgroundColor: '#FF6347',
  },
  cancelButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserProfilePopup;

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

// const UserProfilePopup = (props) => {

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

// export default UserProfilePopup;

// import { Image } from '@rneui/base';
// import React, { useState, useEffect } from 'react';
// import { useFocusEffect } from '@react-navigation/native';
// import ToggleSwitch from 'toggle-switch-react-native';
// import { View, Text, StyleSheet, FlatList, Modal, Pressable } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import userIcon from '../assets/headerIcon/userIcon.png';
// import { ScrollView, TouchableOpacity } from 'react-native';
// import Bottom from '../components/Bottom'; // images
// import plus from '../assets/Plus.png';
// import setting from '../assets/Modal/SettingsBlueC.png';
// import arrow from '../assets/RightArrow.png';
// import moment from 'moment';
// import deleteIcon from '../assets/tenantIcon/delete.png';
// import { useNavigation } from '@react-navigation/native';
// import BackNavigation from '../components/backNavigation';
// import { TouchableHighlight } from 'react-native-gesture-handler';
// import { getAllTenantList } from '../redux/slice/getAllTenant';
// import Spinner from 'react-native-loading-spinner-overlay';
// import Delete from '../assets/delete.png';
// import { useToast } from 'react-native-toast-notifications';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteUser, resetGetdeleteUser } from '../redux/slice/deleteUser';
// import { COLOR_LIST } from '../helpers/colorlist';
// import { RefreshControl } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   deleteAllUser,
//   resetGetdeleteAllUser,
// } from '../redux/slice/deleteAllUser';

// import { topupSetting, resettopupSetting } from '../redux/slice/getAssociateUserSetting';
// export const SandtoneUsers = ({ route }) => {
//   const propertyId = route.params?.propertyId;
//   const title = route.params?.title;
//   const toast = useToast();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const [refreshing, setRefreshing] = useState(true);
//   const [serverErrors, setServerErrors] = useState({});
//   const [reloadPage, setReloadPage] = useState(false);
//   const [deleteReload, setDeleteReload] = useState(false);
//   const [tenantList, setTenantList] = useState([]);
//   const [associates, setAssociates] = useState([]);
//   const [spinner, setSpinner] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [settingPopup, setSettingPopup] = useState(false);
//   const [modalVisibles, setModalVisibles] = useState(false);
//   const [associatesId, setAssociatesId] = useState(null);
//   const [isSwitchOn, setIsSwitchOn] = useState(null);
//   const toggleSize = 40;
//   const {
//     getTenantIsLoading,
//     getRole,
//     getTenantData,
//     getOwner,
//     getAssociates,
//     getTenantIsSuccess,
//     getTenantIsError,
//   } = useSelector(state => ({
//     getTenantIsLoading: state.getAllTenant.getTenantIsLoading,
//     getRole: state.getAllTenant.getRole,
//     getTenantData: state.getAllTenant.getTenantData,
//     getOwner: state.getAllTenant.getOwner,
//     getAssociates: state.getAllTenant.getAssociates,
//     getTenantIsSuccess: state.getAllTenant.getTenantIsSuccess,
//     getTenantIsError: state.getAllTenant.getTenantIsError,
//   }));

//   const {
//     deleteUserLoding,
//     deleteUserData,
//     deleteUserIsSuccess,
//     deleteUserIsError,
//   } = useSelector(state => ({
//     deleteUserLoding: state.deleteUser.deleteUserLoding,
//     deleteUserData: state.deleteUser.deleteUserData,
//     deleteUserIsError: state.deleteUser.deleteUserIsError,
//     deleteUserIsSuccess: state.deleteUser.deleteUserIsSuccess,
//   }));


//   const {
//     deleteAllUserLoding,
//     deleteAllUserData,
//     deleteAllUserIsSuccess,
//     deleteAllUserIsError,
//   } = useSelector(state => ({
//     deleteAllUserLoding: state.deleteUser.deleteAllUserLoding,
//     deleteAllUserData: state.deleteUser.deleteAllUserData,
//     deleteAllUserIsError: state.deleteUser.deleteAllUserIsError,
//     deleteAllUserIsSuccess: state.deleteUser.deleteAllUserIsSuccess,
//   }));

//   const {
//     topupSettingValueIsLoading,
//     topupSettingValueData,
//     topupSettingValueSuccess,
//     topupSettingValueIsError,
//   } = useSelector(state => ({
//     topupSettingValueIsLoading: state.topup.topupSettingValueIsLoading,
//     topupSettingValueData: state.topup.topupSettingValueData,
//     topupSettingValueIsError: state.topup.topupSettingValueIsError,
//     topupSettingValueSuccess: state.topup.topupSettingValueSuccess,
//   }));
//   useEffect(() => {
//     if (
//       getAssociates &&
//       getTenantData &&
//       getTenantIsSuccess &&
//       getTenantIsLoading === false
//     ) {
//       if (getAssociates.length > 0 && getTenantData.length > 0) {
//         setSpinner(false);
//         setTenantList(getTenantData);
//         setAssociates(getAssociates);
//         setSpinner(false);
//       }
//     }
//     if (getTenantIsLoading === true) {
//       setSpinner(true);
//     } else {
//       setSpinner(false);
//     }
//   }, [getTenantData, getOwner, getAssociates, getTenantIsSuccess]);
//   useEffect(() => {
//     if (topupSettingValueData && topupSettingValueSuccess == true && topupSettingValueIsError === false) {
//       setSpinner(false)
//       toast.show(topupSettingValueData.message, {
//         type: "success",
//         placement: "top",
//         duration: 3000,
//         offset: 30,
//         animationType: "slide-in",
//       });
//       setSettingPopup(false);
//       getUser();
//       dispatch(resettopupSetting());
//     } else if (topupSettingValueSuccess === false && topupSettingValueIsError === true && topupSettingValueData) {
//       toast.show(topupSettingValueData.message, {
//         type: "danger",
//         placement: "top",
//         duration: 3000,
//         offset: 30,
//         animationType: "slide-in",
//       });
//     }
//   }, [topupSettingValueSuccess, topupSettingValueData, topupSettingValueIsError]);
//   useEffect(() => {
//     setSpinner(true);
//     getUser();
//   }, [reloadPage, deleteReload, deleteUserData]);
//   const getUser = async () => {
//     setSpinner(true);
//     let dataObj = {
//       id: propertyId,
//     };
//     setSpinner(true);
//     dispatch(getAllTenantList(dataObj));
//   };

//   const addUser = async () => {
//     navigation.navigate('addUser', { propertyId: propertyId, title: title });
//   };
//   const [deleteId, setDeleteId] = useState(null);
//   const deletePopup = id => {
//     setDeleteId(id);
//     setModalVisibles(true);
//   };
//   const handleDelete = () => {
//     if (deleteId > 0) {
//       setModalVisibles(false);
//       let dataObj = {
//         id: deleteId,
//       };
//       setSpinner(true);
//       dispatch(deleteUser(dataObj));
//       toast.show('User deleted successfully!', {
//         type: 'success',
//         placement: 'top',
//         duration: 3000,
//         offset: 30,
//         animationType: 'zoom-in',
//       });
//       dispatch(resetGetdeleteUser());
//       getUser();
//     }
//   };
//   const handleCancel = () => {
//     setModalVisible(false);
//   };
//   const cancelDeletePopup = () => {
//     setModalVisibles(false);
//   };
//   const DeleteAllUser = () => {
//     if (propertyId > 0) {
//       let dataObj = {
//         propertyId: propertyId,
//       };
//       setSpinner(true);

//       // Dispatch deleteAllUser action

//       dispatch(deleteAllUser(dataObj));

//       // Close the modal (assuming you have modalVisible state)
//       setModalVisible(false);
//       setReloadPage(true);

//       toast.show('User deleted successfully!', {
//         type: 'success',
//         placement: 'top',
//         duration: 3000,
//         offset: 30,
//         animationType: 'zoom-in',
//       });

//       // Reset delete user state
//       dispatch(resetGetdeleteAllUser());

//       getUser();
//     }
//   };

//   const data = () => {
//     if (getAssociates.length == 0 && getTenantData === null) {
//       navigation.navigate('addTenant', { propertyId: propertyId, title: title });
//     } else {
//       setModalVisible(true);
//     }
//   };
  

//   const settingButton = (id) => {
//     setSettingPopup(true);
//     setAssociatesId(id);
//     const associate = getAssociates.find(associate => associate.id === id);
//     if (associate) {
//       setIsSwitchOn(associate?.topUpAllow);
//     }
//   };
//   const handleToggle = () => {
//     const newValue = !isSwitchOn;
//     setIsSwitchOn(newValue);
//     let dataObj = {
//       id: 0,
//       propertyUserId: associatesId,
//       propertyId: propertyId,
//       isAllowTopUp: newValue

//     };
//     dispatch(topupSetting(dataObj));
//   };
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: COLOR_LIST.SCREEN_BG }}>
//       <BackNavigation
//         title={`Users: ${route.params?.title}`}
//         screenName={'properties'}
//         isRightIcon={true}
//       />
//       <ScrollView
//         style={{ flex: 1 }}
//       >
//         <View>
//           <View style={{ flex: 1, marginTop: 10 }}>
//             <View
//               style={{
//                 flex: 0.2,
//                 marginHorizontal: 20,
//                 marginVertical: 5,
//               }}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: '600',
//                   lineHeight: 22,
//                   color: '#323743FF',
//                   marginHorizontal: 10,
//                 }}>
//                 Owner
//               </Text>
//             </View>
//             <Spinner
//               visible={spinner}
//               textContent={'Loading...'}
//               textStyle={styles.spinnerTextStyle}
//             />
//             <TouchableHighlight underlayColor="transparent">
//               <View
//                 style={{
//                   marginVertical: 10,
//                   marginHorizontal: 27,
//                   backgroundColor: '#252D3FFF',
//                   borderRadius: 26,
//                 }}>
//                 <View style={{ flexDirection: 'row' }}>
//                   <Image
//                     // source={userIcon}
//                     source={
//                       getOwner.profileUrl != '' && getOwner.profileUrl != null
//                         ? { uri: getOwner.profileUrl }
//                         : userIcon
//                     }
//                     style={{
//                       height: 36,
//                       width: 36,
//                       marginHorizontal: 11,
//                       borderRadius: 18,
//                       marginVertical: 14,
//                     }}
//                   />
//                   <View style={{ marginTop: 5 }}>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 20,
//                           fontWeight: '400',
//                           lineHeight: 30,
//                           marginHorizontal: 5,
//                           color: '#FFFFFFFF',
//                         }}>
//                         {getOwner.userName}
//                       </Text>
//                     </View>
//                     <View style={{ flexDirection: 'row' }}>
//                       <Text style={[styles.boxText]}>
//                         {getOwner.email} | {getOwner.mobile}{' '}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//                 <Text
//                   style={{
//                     // width: 335,
//                     height: 0,
//                     marginHorizontal: 10,
//                     borderColor: '#EC3237FF',
//                     borderStyle: 'solid',
//                     borderBottomWidth: 6,
//                     borderBottomRightRadius: 20,
//                     borderBottomLeftRadius: 20,
//                   }}></Text>
//               </View>
//             </TouchableHighlight>
//             <View
//               style={{
//                 flex: 0.22,
//                 marginTop: 30,
//                 marginHorizontal: 15,
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}>
//               <View>
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     fontWeight: '600',
//                     lineHeight: 22,
//                     color: '#323743FF',
//                     marginHorizontal: 10,
//                   }}>
//                   Tenant
//                 </Text>
//               </View>

//               <View>
//                 {getTenantData ? null : getRole === 'Owner' ? (
//                   <Pressable
//                     onPress={() => data()} 
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       marginHorizontal: 20,
//                     }}>
//                     <Text
//                       style={{
//                         fontSize: 14,
//                         fontWeight: '400',
//                         lineHeight: 20,
//                         color: '#EC3237FF',
//                         backgroundColor: '#00000000',
//                       }}>
//                       Add New Tenant +
//                     </Text>
//                   </Pressable>
//                 ) : null}
//               </View>
//             </View>
//             <View>
//               {getTenantData === null ? (
//                 <View style={{ marginVertical: 20 }}>
//                   <Text style={{ textAlign: 'center', color: COLOR_LIST.TEXT }}>
//                     No tenant found
//                   </Text>
//                 </View>
//               ) : (
//                 <View
//                   style={{
                    
//                     marginTop: 19,
//                     marginHorizontal: 27,
//                     backgroundColor: '#252D3FFF',
//                     borderRadius: 26,
//                   }}>
//                   <View
//                     style={{
//                       backgroundColor: '#252D3FFF',
//                       borderRadius: 26,
//                     }}>
//                     <View style={{ flexDirection: 'row', height: 90 }}>
//                       <Image
//                         source={userIcon}
//                         style={{
//                           height: 40,
//                           width: 40,
//                           marginHorizontal: 11,
//                           borderRadius: 18,
//                           marginTop: 15,
//                           alignItems: 'center',
//                         }}
//                       />
//                       <View
//                         style={{ marginTop: 5, flex: 1, marginHorizontal: 5 }}>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                           }}>
//                           <View style={{ flex: 0.8 }}>
//                             <Text
//                               style={{
//                                 fontSize: 20,

//                                 fontWeight: '400',
//                                 lineHeight: 30,
//                                 color: '#FFFFFFFF',
//                               }}>
//                               {getTenantData.userName}{' '}
//                             </Text>
//                           </View>
//                           <View style={{ flex: 0.2, marginTop: 5 }}>
//                             {getRole === 'Owner' ? (
//                               <Pressable
//                                 onPress={() => deletePopup(getTenantData.id)}>
//                                 <Image
//                                   source={deleteIcon}
//                                   style={{
//                                     width: 28,
//                                     height: 28,
//                                     marginHorizontal: 10,
//                                   }}
//                                 />
//                               </Pressable>
//                             ) : null}
//                           </View>
//                         </View>

//                         <View style={{ flexDirection: 'row' }}>
//                           <Text style={styles.boxText}>
//                             {getTenantData.email} | {getTenantData.mobile}{' '}
//                           </Text>
//                         </View>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                             marginRight: 4,
//                           }}>
//                           {getTenantData.createdOn ? (<Text
//                             style={{
//                               fontFamily: 'Catamaran-Regular',
//                               fontSize: 12,
//                               fontWeight: '400',
//                               lineHeight: 20,
//                               color: '#DEE1E6FF',
//                             }}>

//                             Added on : {moment(getTenantData.createdOn, 'MM/DD/YYYY HH:mm:ss').format('DD/MM/YYYY')}
//                           </Text>) : null}

//                         </View>
//                       </View>
//                     </View>
//                   </View>
//                   <Text
//                     style={{
//                       // width: 329,
//                       height: 0,
//                       marginHorizontal: 12,
//                       borderColor: '#EC3237FF',
//                       borderStyle: 'solid',
//                       borderBottomWidth: 6,
//                       borderBottomRightRadius: 20,
//                       borderBottomLeftRadius: 20,
//                     }}></Text>
//                 </View>
//               )}
//             </View>

//             <View
//               style={{
//                 flex: 0.2,
//                 marginTop: 50,
//                 marginHorizontal: 15,
//                 marginVertical: 5,
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: '600',
//                   lineHeight: 22,
//                   color: '#323743FF',
//                   marginHorizontal: 10,
//                 }}>
//                 Associate(s){' '}
//               </Text>
//               <View>


//                 {getTenantData == null && getRole === 'Owner' ? (
//                   <Pressable
//                     onPress={() => addUser()} // Make sure 'data' function is defined
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       marginHorizontal: 20,
//                     }}>
//                     <Text
//                       style={{
//                         fontSize: 14,
//                         fontWeight: '400',
//                         lineHeight: 20,
//                         color: '#EC3237FF',
//                         backgroundColor: '#00000000',
//                       }}>
//                       Add New Associate +
//                     </Text>
//                     {/* <Image
//         source={plus} // Update with your image path
//         style={{ height: 12, width: 12, marginLeft: 4 }}
//       /> */}
//                   </Pressable>
//                 ) : getRole === 'Tenant' ? (
//                   <Pressable
//                     onPress={() => addUser()} 
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       marginHorizontal: 20,
//                     }}>
//                     <Text
//                       style={{
//                         fontSize: 14,
//                         fontWeight: '400',
//                         lineHeight: 20,
//                         color: '#EC3237FF',
//                         backgroundColor: '#00000000',
//                       }}>
//                       Add New Associate +
//                     </Text>
//                   </Pressable>
//                 ) : null}

//               </View>
//             </View>

//             <View style={{ marginHorizontal: 27, marginVertical: 20 }}>
//               {getAssociates.length == 0 ? (
//                 <View style={{ height: 50 }}>
//                   <Text style={{ textAlign: 'center', color: COLOR_LIST.TEXT }}>
//                     No associates found
//                   </Text>
//                 </View>
//               ) : (
//                 getAssociates.map((getAssociates, index) => (
//                   <View
//                     style={{
//                       marginVertical: 10,
//                       backgroundColor: '#252D3FFF',
//                       borderRadius: 26,
//                     }}>
//                     <View
//                       style={{
//                         marginVertical: 10,
//                         backgroundColor: '#252D3FFF',
//                         borderRadius: 26,
//                       }}>
//                       <View style={{ flexDirection: 'row', height: 80 }}>
//                         <Image
//                           source={userIcon}
//                           style={{
//                             height: 36,
//                             width: 36,
//                             marginHorizontal: 11,
//                             borderRadius: 18,
//                             marginVertical: 25,
//                             alignItems: 'center',
//                           }}
//                         />
//                         <View style={{ marginTop: 5, flex: 1 }}>
//                           <View
//                             style={{
//                               flexDirection: 'row',
//                               justifyContent: 'space-between',
//                               marginRight: 4,
//                             }}>
//                             <Text
//                               style={{
//                                 fontSize: 20,

//                                 fontWeight: '400',
//                                 lineHeight: 30,
//                                 color: '#FFFFFFFF',
//                               }}>
//                               {getAssociates.userName}
//                             </Text>
//                             {getTenantData == null && getRole === 'Owner' ?
//                               (<Pressable
//                                 onPress={() => deletePopup(getAssociates.id)}>
//                                 <Image
//                                   source={deleteIcon}
//                                   style={{
//                                     width: 24,
//                                     height: 24,
//                                     marginHorizontal: 10,
//                                   }}
//                                 />
//                               </Pressable>) : getRole === 'Tenant' ?
//                                 (<Pressable
//                                   onPress={() => deletePopup(getAssociates.id)}>
//                                   <Image
//                                     source={deleteIcon}
//                                     style={{
//                                       width: 24,
//                                       height: 24,
//                                       marginHorizontal: 10,
//                                     }}
//                                   />
//                                 </Pressable>) : null}
//                           </View>
//                           <View style={{ flexDirection: 'row' }}>
//                             <Text style={styles.boxText}>
//                               {getAssociates.email} | {getAssociates.mobile}
//                             </Text>
//                           </View>
//                           <View
//                             style={{
//                               flexDirection: 'row',
//                               justifyContent: 'space-between',
//                               marginRight: 4,
//                             }}>
//                             <Text
//                               style={{
//                                 fontFamily: 'Catamaran-Regular',
//                                 fontSize: 12,
//                                 fontWeight: '400',
//                                 lineHeight: 20,
//                                 color: '#DEE1E6FF',
//                               }}>
//                               Added on : {moment(getAssociates?.createdOn, 'MM/DD/YYYY HH:mm:ss').format('DD/MM/YYYY')}</Text>
//                             {getTenantData == null && getRole === 'Owner' ?
//                               (<Pressable onPress={() => settingButton(getAssociates.id)}>
//                                 <Image
//                                   source={setting}
//                                   style={{
//                                     width: 24,
//                                     height: 24,
//                                     marginHorizontal: 10,
//                                   }}
//                                 />
//                               </Pressable>) : getRole === 'Tenant' ?
//                                 (<Pressable onPress={() => settingButton(getAssociates.id)}>
//                                   <Image
//                                     source={setting}
//                                     style={{
//                                       width: 24,
//                                       height: 24,
//                                       marginHorizontal: 10,
//                                     }}
//                                   />
//                                 </Pressable>) : null}
//                           </View>
//                         </View>
//                       </View>
//                     </View>
//                     <Text
//                       style={{
//                         height: 0,
//                         marginHorizontal: 12,
//                         borderColor: '#EC3237FF',
//                         borderStyle: 'solid',
//                         borderBottomWidth: 6,
//                         borderBottomRightRadius: 20,
//                         borderBottomLeftRadius: 20,
//                       }}></Text>
//                   </View>
//                 ))
//               )}
//             </View>
//           </View>
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={() => setModalVisible(false)}>
//             <View style={styles.view}>
//               <View style={styles.centeredView}>
//                 <View style={styles.modalView}>
//                   <Text style={styles.modalText}>
//                     To add tenant to this property you need to remove all your associates.
//                   </Text>
//                   <View style={styles.buttonContainer}>
//                     <TouchableOpacity
//                       style={[styles.button, styles.logoutButton]}
//                       onPress={DeleteAllUser}>
//                       <Text style={styles.buttonText}>Delete All</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={[styles.button, styles.cancelButton]}
//                       onPress={handleCancel}>
//                       <Text style={styles.buttonText}>Cancel</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </Modal>

//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisibles}
//             onRequestClose={() => setModalVisibles(false)}>
//             <View style={styles.view}>
//               <View style={styles.centeredView}>
//                 <View style={styles.modalView}>
//                   <Text style={styles.modalText}>Are you sure; You want to remove?</Text>
//                   <View style={styles.buttonContainer}>
//                     <TouchableOpacity
//                       style={[styles.button, styles.logoutButton]}
//                       onPress={handleDelete}>
//                       <Text style={styles.buttonText}>YES</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={[styles.button, styles.cancelButton]}
//                       onPress={cancelDeletePopup}>
//                       <Text style={styles.buttonText}>NO</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </Modal>
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={settingPopup}
//             onRequestClose={() => {
//               setSettingPopup(false);
//             }}>
//             <View
//               style={{
//                 flex: 1,
//                 width: '100%',
//                 alignSelf: 'center',
//                 borderWidth: 2,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
//               }}>
//               <View style={[styles.centeredView]}>
//                 <View style={[styles.modalView, { flex: 0.11 }]}>
//                   <Text
//                     style={{ color: 'black', fontSize: 20, paddingBottom: 5 }}>
//                     Setting
//                   </Text>
//                   <TouchableOpacity
//                     style={styles.closeButton}
//                     onPress={() => {
//                       setSettingPopup(false);
//                       // setIsSwitchOn(null);
//                       // handleTenantData();
//                     }}>
//                     <Text style={styles.closeButtonText}>X</Text>
//                   </TouchableOpacity>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       marginTop: 40,
//                     }}>
//                     <Text
//                       style={[
//                         styles.textStyle,
//                         {
//                           fontFamily: 'Catamaran-Regular',
//                           fontWeight: '400',
//                           color: 'black',
//                           marginRight: 3,
//                         },
//                       ]}>
//                       Allow Topup ?{' '}
//                     </Text>
//                     <ToggleSwitch
//                       isOn={isSwitchOn}
//                       onColor="red"
//                       offColor="grey"
//                       size={toggleSize}
//                       onToggle={handleToggle}
//                     />
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </Modal>
//         </View>
//       </ScrollView>
//       <View style={{ bottom: 0, width: '100%' }}>
//         <Bottom />
//       </View>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   boxText: {
//     fontSize: 12,
//     fontWeight: '400',
//     lineHeight: 20,
//     color: '#FFFFFFFF',
//     marginHorizontal: 2,
//   },
//   view: {
//     flex: 1,
//     width: '100%',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   centeredView: {
//     flex: 1,
//     width: '50%',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalView: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     alignSelf: 'center',
//     elevation: 5,
//     position: 'relative',
//   },
//   modalText: {
//     textAlign: 'center',
//     color: 'black',
//     lineHeight: 20
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   button: {
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginHorizontal: 10,
//   },
//   logoutButton: {
//     backgroundColor: '#FF6347', 
//   },
//   cancelButton: {
//     backgroundColor: '#007bff',
//     },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   closeButton: {
//     position: 'absolute',
//     right: 10,
//     padding: 10,
//     top: 10,
//   },
//   closeButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//   },
// });



import { Image } from '@rneui/base';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import { View, Text, StyleSheet, FlatList, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import userIcon from '../assets/headerIcon/userIcon.png';
import { ScrollView, TouchableOpacity } from 'react-native';
import Bottom from '../components/Bottom'; // images
import plus from '../assets/Plus.png';
import setting from '../assets/Modal/SettingsBlueC.png';
import arrow from '../assets/RightArrow.png';
import moment from 'moment';
import deleteIcon from '../assets/tenantIcon/delete.png';
import { useNavigation } from '@react-navigation/native';
import BackNavigation from '../components/backNavigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { getAllTenantList } from '../redux/slice/getAllTenant';
import Spinner from 'react-native-loading-spinner-overlay';
import Delete from '../assets/delete.png';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, resetGetdeleteUser } from '../redux/slice/deleteUser';
import { COLOR_LIST } from '../helpers/colorlist';
import { RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  deleteAllUser,
  resetGetdeleteAllUser,
} from '../redux/slice/deleteAllUser';

import { topupSetting, resettopupSetting } from '../redux/slice/getAssociateUserSetting';
export const SandtoneUsers = ({ route }) => {
  const propertyId = route.params?.propertyId;
  const title = route.params?.title;
  // const refreshValue=route.params?.refresh;
  console.log(propertyId,"00000");
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [forRemoveTitle, setForRemoveTitle] = useState('');
  const [serverErrors, setServerErrors] = useState({});
  const [reloadPage, setReloadPage] = useState(false);
  const [deleteReload, setDeleteReload] = useState(false);
  const [tenantList, setTenantList] = useState([]);
  const [associates, setAssociates] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [settingPopup, setSettingPopup] = useState(false);
  const [modalVisibles, setModalVisibles] = useState(false);
  const [associatesId, setAssociatesId] = useState(null);
  const [isSwitchOn, setIsSwitchOn] = useState(null);
  const toggleSize = 40;
  const {
    getTenantIsLoading,
    getRole,
    getTenantData,
    getOwner,
    getAssociates,
    getTenantIsSuccess,
    getTenantIsError,
  } = useSelector(state => ({
    getTenantIsLoading: state.getAllTenant.getTenantIsLoading,
    getRole: state.getAllTenant.getRole,
    getTenantData: state.getAllTenant.getTenantData,
    getOwner: state.getAllTenant.getOwner,
    getAssociates: state.getAllTenant.getAssociates,
    getTenantIsSuccess: state.getAllTenant.getTenantIsSuccess,
    getTenantIsError: state.getAllTenant.getTenantIsError,
  }));

  const {
    deleteUserLoding,
    deleteUserData,
    deleteUserIsSuccess,
    deleteUserIsError,
  } = useSelector(state => ({
    deleteUserLoding: state.deleteUser.deleteUserLoding,
    deleteUserData: state.deleteUser.deleteUserData,
    deleteUserIsError: state.deleteUser.deleteUserIsError,
    deleteUserIsSuccess: state.deleteUser.deleteUserIsSuccess,
  }));


  const {
    deleteAllUserLoding,
    deleteAllUserData,
    deleteAllUserIsSuccess,
    deleteAllUserIsError,
  } = useSelector(state => ({
    deleteAllUserLoding: state.deleteUser.deleteAllUserLoding,
    deleteAllUserData: state.deleteUser.deleteAllUserData,
    deleteAllUserIsError: state.deleteUser.deleteAllUserIsError,
    deleteAllUserIsSuccess: state.deleteUser.deleteAllUserIsSuccess,
  }));

  const {
    topupSettingValueIsLoading,
    topupSettingValueData,
    topupSettingValueSuccess,
    topupSettingValueIsError,
  } = useSelector(state => ({
    topupSettingValueIsLoading: state.topup.topupSettingValueIsLoading,
    topupSettingValueData: state.topup.topupSettingValueData,
    topupSettingValueIsError: state.topup.topupSettingValueIsError,
    topupSettingValueSuccess: state.topup.topupSettingValueSuccess,
  }));
  useEffect(() => {
    if (
      getAssociates &&
      getTenantData &&
      getTenantIsSuccess &&
      getTenantIsLoading === false
    ) {
      if (getAssociates.length > 0 && getTenantData.length > 0) {
        setSpinner(false);
        setTenantList(getTenantData);
        setAssociates(getAssociates);
        setSpinner(false);
      }
    }
    if (getTenantIsLoading === true) {
      setSpinner(true);
    } else {
      setSpinner(false);
    }
  }, [getTenantData, getOwner, getAssociates, getTenantIsSuccess]);
  useEffect(() => {
    if (topupSettingValueData && topupSettingValueSuccess == true && topupSettingValueIsError === false) {
      setSpinner(false)
      toast.show(topupSettingValueData.message, {
        type: "success",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "slide-in",
      });
      setSettingPopup(false);
      getUser();
      dispatch(resettopupSetting());
    } else if (topupSettingValueSuccess === false && topupSettingValueIsError === true && topupSettingValueData) {
      toast.show(topupSettingValueData.message, {
        type: "danger",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "slide-in",
      });
    }
  }, [topupSettingValueSuccess, topupSettingValueData, topupSettingValueIsError]);
  useEffect(() => {
    setSpinner(true);
    getUser();
  }, [reloadPage, deleteReload, deleteUserData,route,propertyId,title]);
  const getUser = async () => {
    setSpinner(true);
    let dataObj = {
      id: propertyId,
    };
    setSpinner(true);
    dispatch(getAllTenantList(dataObj));
  };

  const addUser =  () => {
    navigation.navigate('addUser', { propertyId: propertyId, title: title });
  };
  const [deleteId, setDeleteId] = useState(null);
  const deletePopup = (id,value) => {
    setForRemoveTitle(value)
    setDeleteId(id);
    setModalVisibles(true);
  };
  const handleDelete = () => {

    if (deleteId > 0) {
      setModalVisibles(false);
      let dataObj = {
        id: deleteId,
      };
      setSpinner(true);
      dispatch(deleteUser(dataObj));
      toast.show(`${forRemoveTitle} deleted successfully!`, {
        type: 'success',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'zoom-in',
      });
      setForRemoveTitle('')

      dispatch(resetGetdeleteUser());
      getUser();
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const cancelDeletePopup = () => {
    setModalVisibles(false);
  };
  const DeleteAllUser = () => {
    if (propertyId > 0) {
      let dataObj = {
        propertyId: propertyId,
      };
      setSpinner(true);
      // Dispatch deleteAllUser action

      dispatch(deleteAllUser(dataObj));

      // Close the modal (assuming you have modalVisible state)
      setModalVisible(false);
      setReloadPage(true);

      toast.show(' All Associate deleted successfully!', {
        type: 'success',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'zoom-in',
      });

      // Reset delete user state
      dispatch(resetGetdeleteAllUser());

      getUser();
    }
  };

  const data = () => {
    if (getAssociates.length == 0 && getTenantData === null) {
      navigation.push('addTenant', { propertyId: propertyId, title: title });
    } else {
      setModalVisible(true);
    }
  };
  

  const settingButton = (id) => {
    setSettingPopup(true);
    setAssociatesId(id);
    const associate = getAssociates.find(associate => associate.id === id);
    if (associate) {
      setIsSwitchOn(associate?.topUpAllow);
    }
  };
  const handleToggle = () => {
    const newValue = !isSwitchOn;
    setIsSwitchOn(newValue);
    let dataObj = {
      id: 0,
      propertyUserId: associatesId,
      propertyId: propertyId,
      isAllowTopUp: newValue

    };
    dispatch(topupSetting(dataObj));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR_LIST.SCREEN_BG }}>
      <BackNavigation
             title={`Users: ${route.params.title.length > 20 ? `${route.params.title.slice(0, 20)}...` : route.params.title}`}

        // title={`Users: ${route.params?.title}`}
        screenName={'properties'}
        isRightIcon={true}
      />
      <ScrollView
        style={{ flex: 1 }}
      >
        <View>
          <View style={{ flex: 1, marginTop: 10 }}>
            <View
              style={{
                flex: 0.2,
                marginHorizontal: 20,
                marginVertical: 5,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  lineHeight: 22,
                  color: '#323743FF',
                  marginHorizontal: 10,
                }}>
                Owner
              </Text>
            </View>
            <Spinner
              visible={spinner}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
            <TouchableHighlight underlayColor="transparent">
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 15,
                  backgroundColor: '#252D3FFF',
                  borderRadius: 26,
                  borderBottomColor:'#EC3237FF',
                  borderBottomWidth:6,

                  // height: 10,
                  // marginHorizontal: 10,
                  // borderColor: '#EC3237FF',
                  borderStyle: 'solid',
                  // borderBottomWidth: 6,
                  borderBottomRightRadius: 20,
                  borderBottomLeftRadius: 20,
                }}>
                <View style={{ flexDirection: 'row',flex:1 }}>
                  <Image
                    // source={userIcon}
                    source={
                      getOwner.profileUrl != '' && getOwner.profileUrl != null
                        ? { uri: getOwner.profileUrl }
                        : userIcon
                    }
                    style={{
                      height: 36,
                      width: 36,
                      marginHorizontal: 11,
                      borderRadius: 18,
                      marginVertical: 14,
                    }}
                  />
                  <View style={{ marginTop: 5,flex:0.89,}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flex:1
                      }}>
                      <Text
                      numberOfLines={2}
                        style={{
                          fontSize: 18,
                          // fontWeight: '400',
                          // lineHeight: 30,
                          marginHorizontal: 5,
                          color: '#FFFFFFFF',
                        }}>
                        {getOwner.userName}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[styles.boxText]}>
                        {getOwner.email?.slice(0,24)} | {getOwner.mobile}{' '}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text
                  style={{
                    // width: 335,
                    height: 10,
                    marginHorizontal: 10,
                    borderColor: '#EC3237FF',
                    borderStyle: 'solid',
                    borderBottomWidth: 6,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                  }}></Text>
              </View>
            </TouchableHighlight>
            <View
              style={{
                flex: 0.22,
                marginTop: 30,
                marginHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    lineHeight: 22,
                    color: '#323743FF',
                    marginHorizontal: 10,
                  }}>
                  Tenant
                </Text>
              </View>

              <View>
                {getTenantData ? null : getRole === 'Owner' ? (
                  <Pressable
                    onPress={() => data()} 
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        lineHeight: 20,
                        color: '#EC3237FF',
                        backgroundColor: '#00000000',
                      }}>
                      Add New Tenant +
                    </Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
            <View>
              {getTenantData === null ? (
                <View style={{ marginVertical: 20 }}>
                  <Text style={{ textAlign: 'center', color: COLOR_LIST.TEXT }}>
                    No tenant found
                  </Text>
                </View>
              ) : (
                
                <View
                  style={{
                    
                    marginTop: 19,
                    marginHorizontal: 15,
                    backgroundColor: '#252D3FFF',
                    borderRadius: 26,
                    borderBottomColor:'#EC3237FF',
                    borderBottomWidth:6,
  
                    // height: 10,
                    // marginHorizontal: 10,
                    // borderColor: '#EC3237FF',
                    borderStyle: 'solid',
                    // borderBottomWidth: 6,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#252D3FFF',
                      borderRadius: 26,
                   
                    }}>
                    <View style={{ flexDirection: 'row', height: 90 }}>
                      <Image
                        source={userIcon}
                        style={{
                          height: 40,
                          width: 40,
                          marginHorizontal: 11,
                          borderRadius: 18,
                          marginTop: 15,
                          alignItems: 'center',
                        }}
                      />
                      <View
                        style={{ marginTop: 5, flex: 1, marginHorizontal: 5 }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{ flex: 0.8 }}>
                            <Text
                            numberOfLines={2}
                              style={{
                                fontSize: 18,

                                // fontWeight: '400',
                                // lineHeight: 30,
                                color: '#FFFFFFFF',
                              }}>
                              {getTenantData.userName}
                            </Text>
                          </View>
                          <View style={{ flex: 0.2, marginTop: 5 }}>
                            {getRole === 'Owner' ? (
                              <Pressable
                              onPress={() => deletePopup(getTenantData.id, "Tenant")}>

                                {/* onPress={() => deletePopup(getTenantData.id)}> */}
                                <Image
                                  source={deleteIcon}
                                  style={{
                                    width: 28,
                                    height: 28,
                                    marginHorizontal: 10,
                                  }}
                                />
                              </Pressable>
                            ) : null}
                          </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.boxText}>
                            {getTenantData?.email?.slice(0,25)} | {getTenantData.mobile}{' '}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginRight: 4,
                          }}>
                          {getTenantData.createdOn ? (<Text
                            style={{
                              fontFamily: 'Catamaran-Regular',
                              fontSize: 12,
                              fontWeight: '400',
                              lineHeight: 20,
                              color: '#DEE1E6FF',
                            }}>

                            Added on : {moment(getTenantData.createdOn, 'MM/DD/YYYY HH:mm:ss').format('DD/MM/YYYY')}
                          </Text>) : null}

                        </View>
                      </View>
                    </View>
                  </View>
                  {/* <Text
                    style={{
                      // width: 329,
                      height: 0,
                      marginHorizontal: 12,
                      borderColor: '#EC3237FF',
                      borderStyle: 'solid',
                      borderBottomWidth: 6,
                      borderBottomRightRadius: 20,
                      borderBottomLeftRadius: 20,
                    }}></Text> */}
                </View>








              )}
            </View>

            <View
              style={{
                flex: 0.2,
                marginTop: 50,
                marginHorizontal: 15,
                marginVertical: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  lineHeight: 22,
                  color: '#323743FF',
                  marginHorizontal: 10,
                }}>
                Associate(s){' '}
              </Text>
              <View>


                {getTenantData == null && getRole === 'Owner' ? (
                  <Pressable
                    onPress={() => addUser()} // Make sure 'data' function is defined
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        lineHeight: 20,
                        color: '#EC3237FF',
                        backgroundColor: '#00000000',
                      }}>
                      Add New Associate +
                    </Text>
                    {/* <Image
        source={plus} // Update with your image path
        style={{ height: 12, width: 12, marginLeft: 4 }}
      /> */}
                  </Pressable>
                ) : getRole === 'Tenant' ? (
                  <Pressable
                    onPress={() => addUser()} 
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        lineHeight: 20,
                        color: '#EC3237FF',
                        backgroundColor: '#00000000',
                      }}>
                      Add New Associate +
                    </Text>
                  </Pressable>
                ) : null}

              </View>
            </View>

            <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
              {getAssociates.length == 0 ? (
                <View style={{ height: 50 }}>
                  <Text style={{ textAlign: 'center', color: COLOR_LIST.TEXT }}>
                    No associates found
                  </Text>
                </View>
              ) : (
                getAssociates.map((getAssociates, index) => (
                  <View
                    style={{
                      marginVertical: 10,
                      backgroundColor: '#252D3FFF',
                      borderRadius: 26,
                      borderBottomColor:'#EC3237FF',
                      borderBottomWidth:6,
    
                      // height: 10,
                      // marginHorizontal: 10,
                      // borderColor: '#EC3237FF',
                      borderStyle: 'solid',
                      // borderBottomWidth: 6,
                      borderBottomRightRadius: 20,
                      borderBottomLeftRadius: 20,
                    }}>
                    <View
                      style={{
                        marginVertical: 10,
                        backgroundColor: '#252D3FFF',
                        borderRadius: 26
                   
                      }}>
                      <View style={{ flexDirection: 'row', height: 85,flex:1}}>
                        <Image
                          source={userIcon}
                          style={{
                            flex:0.2,
                            height: 36,
                            width: 36,
                            marginHorizontal: 11,
                            borderRadius: 18,
                            marginVertical: 25,
                            alignItems: 'center',
                          }}
                        />
                        <View style={{ marginTop: 5, flex: 1,}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              // marginRight: 4,
                            }}>
                            <Text
                            // numberOfLines={2}
                            
                              style={{
                                fontSize: 20,
                                // fontWeight: '400',
                                // lineHeight: 30,
                                color: '#FFFFFFFF',
                              }}>
                                {getAssociates.userName}
                            </Text>
                          
                          </View>
                          <View style={{}}>
                            <Text style={styles.boxText}>
                                                         {/* {( "nizaam.simons23@ontec.co.za") .slice(0,20)}|{getAssociates.mobile} */}

                              {getAssociates?.email?.slice(0,25)} | {getAssociates.mobile}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginRight: 4,
                              
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Catamaran-Regular',
                                fontSize: 12,
                                fontWeight: '400',
                                // lineHeight: 20,
                                color: '#DEE1E6FF',
                              }}>
                              Added on : {moment(getAssociates?.createdOn, 'MM/DD/YYYY HH:mm:ss').format('DD/MM/YYYY')}</Text>
                          
                          </View>
                        </View>
                        <View  style={{justifyContent:'space-between'}}>
<View>

                            {getTenantData == null && getRole === 'Owner' ?
                              (<Pressable
                                onPress={() => deletePopup(getAssociates.id, "Asscoiate")}>

                                {/* // onPress={() => deletePopup(getAssociates.id)}> */}
                                <Image
                                  source={deleteIcon}
                                  style={{
                                    width: 24,
                                    height: 24,
                                    marginHorizontal: 10,
                                  }}
                                />
                              </Pressable>) : getRole === 'Tenant' ?
                                (<Pressable
                                  onPress={() => deletePopup(getAssociates.id)}>
                                  <Image
                                    source={deleteIcon}
                                    style={{
                                      width: 24,
                                      height: 24,
                                      marginHorizontal: 10,
                                    }}
                                  />
                                </Pressable>) : null}
 </View>
 <View style={{}}>
                           {getTenantData == null && getRole === 'Owner' ?
                              (<Pressable onPress={() => settingButton(getAssociates.id)}>
                                <Image
                                  source={setting}
                                  style={{
                                    width: 24,
                                    height: 24,
                                    marginHorizontal: 10,
                                  }}
                                />
                              </Pressable>) : getRole === 'Tenant' ?
                                (<Pressable onPress={() => settingButton(getAssociates.id)}>
                                  <Image
                                    source={setting}
                                    style={{
                                      width: 24,
                                      height: 24,
                                      marginHorizontal: 10,
                                    }}
                                  />
                                </Pressable>) : null}
                                </View>
                                </View>
                      </View>
                    </View>
                    {/* <Text
                      style={{
                        height: 0,
                        marginHorizontal: 12,
                        borderColor: '#EC3237FF',
                        borderStyle: 'solid',
                        borderBottomWidth: 6,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                      }}></Text> */}
                  </View>
                ))
              )}
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.view}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    To add tenant to this property you need to remove all your associates.
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.logoutButton]}
                      onPress={DeleteAllUser}>
                      <Text style={styles.buttonText}>Delete All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.cancelButton]}
                      onPress={handleCancel}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibles}
            onRequestClose={() => setModalVisibles(false)}>
            <View style={styles.view}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Are you sure; You want to remove?</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.logoutButton]}
                      onPress={handleDelete}>
                      <Text style={styles.buttonText}>YES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.cancelButton]}
                      onPress={cancelDeletePopup}>
                      <Text style={styles.buttonText}>NO</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={settingPopup}
            onRequestClose={() => {
              setSettingPopup(false);
            }}>
            <View
              style={{
                flex: 1,
                width: '100%',
                alignSelf: 'center',
                borderWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
              <View style={[styles.centeredView]}>
                <View style={[styles.modalView, { flex: 0.11 }]}>
                  <Text
                    style={{ color: 'black', fontSize: 20, paddingBottom: 5 }}>
                    Setting
                  </Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      setSettingPopup(false);
                      // setIsSwitchOn(null);
                      // handleTenantData();
                    }}>
                    <Text style={styles.closeButtonText}>X</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 40,
                    }}>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          fontFamily: 'Catamaran-Regular',
                          fontWeight: '400',
                          color: 'black',
                          marginRight: 3,
                        },
                      ]}>
                      Allow Topup ?{' '}
                    </Text>
                    <ToggleSwitch
                      isOn={isSwitchOn}
                      onColor="red"
                      offColor="grey"
                      size={toggleSize}
                      onToggle={handleToggle}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <View style={{ bottom: 0, width: '100%' }}>
        <Bottom />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  boxText: {
    fontSize: 12,
    // fontWeight: '400',
    lineHeight: 20,
    color: '#FFFFFFFF',
    marginHorizontal: 2,
  },
  view: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centeredView: {
    flex: 1,
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignSelf: 'center',
    elevation: 5,
    position: 'relative',
  },
  modalText: {
    textAlign: 'center',
    color: 'black',
    lineHeight: 20
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
  closeButton: {
    position: 'absolute',
    right: 10,
    padding: 10,
    top: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

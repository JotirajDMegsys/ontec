// import React, {useState, useEffect} from 'react';
// import {BackgroundColor} from '../../helpers/constants';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   SafeAreaView,
//   FlatList,
//   Pressable,
//   RefreshControl,
//   ScrollView,
//   Modal,
//   ActivityIndicator,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import BackNavigation from '../../components/backNavigation';
// import {
//   getMetersByPropertyId,
//   getmetersFromMasterData,
//   uploadMetersFromMasterData,
// } from '../../redux/slice/getMeterList';
// import {useDispatch, useSelector} from 'react-redux';
// import {Toast} from 'react-native-toast-notifications';

// //Images
// import Bottom from '../../components/Bottom';
// import RightArrow from '../../assets/RightArrow.png';
// import Circle from '../../assets/Circle.png';
// import electricityCircle from '../../assets/electricity/circle.png';
// import gascircle from '../../assets/gas/circle.png';
// import Spinner from 'react-native-loading-spinner-overlay';
// import Shimmer from '../../utils/Shimmer';
// import {useFocusEffect} from '@react-navigation/native';
// import {COLOR_LIST} from '../../helpers/colorlist';
// import {UTILITY} from '../../helpers/meterData';
// import {Dimensions} from 'react-native';
// import {TouchableOpacity} from 'react-native';
// import {TextInput} from 'react-native-paper';
// // import { TextInput } from 'react-native-paper';

// export const MeterList = ({route}) => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const propertyId = route.params?.propertyId;
//   const title = route.params?.title;

//   const [refreshing, setRefreshing] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [metersFetched, setMetersFetched] = useState(false);

//   const onRefresh = () => {
//     setRefreshing(true);
//     setNoDataFound(false);
//     getMeter();
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000); // Simulating a 2-second refresh process
//   };
//   const {
//     getMeterIsLoading,
//     getMeterData,
//     getMeterDataCount,
//     isOwner,
//     getMeterIsSuccess,
//     getMeterIsError,
//     fetchMeterIsLoading,
//     fetchMeterData,
//     fetchMeterIsSuccess,
//     fetchMeterIsError,
//     importMeterIsLoading,
//     importMeterData,
//     importMeterIsSuccess,
//     importMeterIsError,
//   } = useSelector(state => ({
//     getMeterIsLoading: state.getMeters.getMeterIsLoading,
//     getMeterData: state.getMeters.getMeterData,
//     getMeterDataCount: state.getMeters.getMeterDataCount,
//     isOwner: state.getMeters.isOwner,
//     getMeterIsSuccess: state.getMeters.getMeterIsSuccess,
//     getMeterIsError: state.getMeters.getMeterIsError,
//     fetchMeterIsLoading: state.getMeters.fetchMeterIsLoading,
//     fetchMeterData: state.getMeters.fetchMeterData,
//     fetchMeterIsSuccess: state.getMeters.fetchMeterIsSuccess,
//     fetchMeterIsError: state.getMeters.fetchMeterIsError,
//     importMeterIsLoading: state.getMeters.importMeterIsLoading,
//     importMeterData: state.getMeters.importMeterData,
//     importMeterIsSuccess: state.getMeters.importMeterIsSuccess,
//     importMeterIsError: state.getMeters.importMeterIsError,
//   }));
//   //console.log('isOwner', isOwner);

//   const [noDataFound, setNoDataFound] = useState(false);
//   const [meterList, setMeterList] = useState([]);
//   const [fetchedMeterList, setfetchedMeterList] = useState([]);
//   const [spinner, setSpinner] = useState(false);
//   const [meterNumber, setMeterNumber] = useState('');
//   const [targets, setTargets] = useState([]);

//   const [meterAdded, setMeterAdded] = useState(false); // State to track if a new property has been added

//   useFocusEffect(
//     React.useCallback(() => {
//       if (meterAdded) {
//         // If a new property is added, fetch properties again
//         getMeter();
//         setMeterAdded(false);
//       } else {
//         getMeter();
//       }
//     }, [meterAdded]),
//   );

//   useEffect(() => {
//     setNoDataFound(false);
//     if (getMeterData && getMeterIsSuccess) {
//       if (getMeterData.length > 0) {
//         setSpinner(false);
//         setMeterList(getMeterData);
//         setNoDataFound(false);
//       } else {
//         setSpinner(false);
//         setMeterList([]);
//         setNoDataFound(true);
//       }
//     }
//   }, [getMeterData, getMeterIsSuccess]);
//   // //console.log("====");
//   //console.log(getMeterData, '....');
//   ////console.log(getMeterDataCount);
//   const getMeter = async () => {
//     setSpinner(true);
//     let dataObj = {
//       propertyId: propertyId,
//     };
//     //console.log(dataObj);

//     dispatch(getMetersByPropertyId(dataObj));
//   };

//   const handlePress = screenName => {
//     navigation.navigate(screenName, {propertyId: propertyId, title: title});
//   };

//   const handleTargetChange = (index, newValue) => {
//     setTargets(prevTargets => {
//       const updatedTargets = [...prevTargets];
//       updatedTargets[index] = newValue;
//       return updatedTargets;
//     });
//   };

//   useEffect(() => {
//     setMetersFetched(false);
//     //console.log(
//       'fetchMeterIsSuccessfetchMeterIsSuccess',
//       fetchMeterIsSuccess,
//       fetchMeterData,
//     );
//     if (fetchMeterData && fetchMeterIsSuccess) {
//       if (fetchMeterData.length > 0) {
//         setfetchedMeterList(fetchMeterData);
//         setMetersFetched(true);
//       } else {
//         setfetchedMeterList([]);
//         setMetersFetched(false);
//       }
//     }
//   }, [fetchMeterData, fetchMeterIsSuccess]);

//   useEffect(() => {
//     //console.log(
//       'fetchMeterIsSuccessfetchMeterIsSuccess',
//       importMeterIsSuccess,
//       importMeterData,
//     );
//     if (importMeterData && importMeterIsSuccess) {
//       Toast.show(
//         'Meters imported to your account. You can now update information.',
//         {
//           type: 'warning',
//           placement: 'top',
//           duration: 3000,
//           offset: 30,
//           animationType: 'zoom-in',
//         },
//       );
//       handleCancel();
//     }
//   }, [importMeterData, importMeterIsSuccess]);

//   const redirectToMeterEdit = item => {
//     if (isOwner) {
//       if (item.status === 'Pending') {
//         Toast.show(
//           'Your meter is pending for admin approval;\n Please retry later.',
//           {
//             type: 'warning',
//             placement: 'top',
//             duration: 3000,
//             offset: 30,
//             animationType: 'zoom-in',
//           },
//         );
//         return;
//       }
//       navigation.navigate('addmeterList', {
//         meterid: item?.id,
//         isUpdate: true,
//         propertyId: propertyId,
//         title: title,
//       });
//       setMeterAdded(true);
//     }
//   };

//   const handleCancel = () => {
//     // Logic to handle cancel action
//     setMetersFetched(false);
//     setModalVisible(false);
//   };

//   const proceedMeterFetch = async () => {
//     var dataObj = {
//       meterNumber: meterNumber,
//     };
//     dispatch(getmetersFromMasterData(dataObj));
//   };

//   const proceedMeterImport = async () => {
//     if (targets.length != fetchedMeterList.length) {
//       Toast.show('Please update target consumption for all meters', {
//         type: 'danger',
//         placement: 'top',
//         duration: 3000,
//         offset: 30,
//         animationType: 'zoom-in',
//       });
//       return;
//     }
//     if (fetchedMeterList.length > 0) {
//       var dataObj = {
//         propertyId: propertyId,
//         meter: fetchedMeterList.map((meter, index) => ({
//           meterNumber: meter.meterNumbers,
//           meterTypeId: meter.meterTypeId,
//           targetConsumption: targets[index],
//         })),
//       };
//       dispatch(uploadMetersFromMasterData(dataObj));
//     } else {
//       Toast.show('No meters found! Please try again', {
//         type: 'danger',
//         placement: 'top',
//         duration: 3000,
//         offset: 30,
//         animationType: 'zoom-in',
//       });
//     }
//   };

//   const meterCard = (item, index) => {
//     return (
//       <View style={{marginVertical: 10}}>
//         <Pressable
//           onPress={() => {
//             redirectToMeterEdit(item);
//           }}>
//           <View style={styles.box}>
//             <View style={{}}>
//               <View
//                 style={{
//                   alignItems: 'center',
//                   borderTopLeftRadius: 19,
//                   borderBottomRightRadius: 15,
//                   overflow: 'hidden',
//                   backgroundColor: '#424856FF',
//                 }}>
//                 <Text
//                   style={{
//                     fontSize: 11,
//                     fontWeight: '400',
//                     color: '#FFFFFFFF',
//                     lineHeight: 18,
//                     padding: 1,
//                     marginLeft: 8,
//                   }}>
//                   {item.meterNumber}
//                 </Text>
//               </View>
//               <Image
//                 source={UTILITY[item.meterType].icon}
//                 style={{
//                   position: 'relative',
//                   marginTop: 8,
//                   marginHorizontal: 20,
//                   width: 60,
//                   height: 60,
//                 }}
//               />
//             </View>
//             <View style={{marginVertical: 7, flex: 0.8, marginTop: 10}}>
//               <Text
//                 style={{
//                   fontFamily: 'Catamaran-Regular',
//                   fontSize: 18,
//                   fontStyle: 'normal',
//                   fontWeight: '400',
//                   lineHeight: 28,
//                   color: '#FFFFFFFF',
//                 }}
//                 numberOfLines={1}
//                 ellipsizeMode="tail">
//                 {item.meterAlias}
//               </Text>

//               <Text
//                 style={{
//                   fontSize: 12,
//                   fontWeight: '400',
//                   marginTop: 2,
//                   lineHeight: 16,
//                   color: '#DEE1E6FF',
//                 }}>
//                 {'Expiry' +
//                   ': ' +
//                   (item.contractEndDate != null
//                     ? item.contractEndDate
//                     : 'Not updated')}
//               </Text>
//               <View
//                 style={{flexDirection: 'row', marginRight: 10, marginTop: 10}}>
//                 <Image
//                   source={
//                     item.meterType === 'Water'
//                       ? Circle
//                       : item.meterType === 'Electricity'
//                       ? electricityCircle
//                       : gascircle
//                   }
//                 />
//                 <Text
//                   style={{
//                     marginHorizontal: 3,
//                     fontStyle: 'normal',
//                     fontWeight: 700,
//                     lineHeight: 20,
//                     color:
//                       item.meterType === 'Water'
//                         ? '#71B2FF'
//                         : item.meterType === 'Electricity'
//                         ? '#EFB034'
//                         : '#1DD75B',
//                   }}>
//                   {'Target: ' + item.target + item.unitOfMeasure}
//                 </Text>
//               </View>
//             </View>
//             <View
//               style={{
//                 marginHorizontal: 10,
//                 marginTop: 3,
//                 flexDirection: 'column',
//                 // justifyContent: 'space-around',
//               }}>
//               <Text
//                 style={{
//                   fontFamily: 'Catamaran-Regualr' /* Body */,
//                   fontSize: 11,
//                   fontWeight: '700',
//                   lineHeight: 18,
//                   marginRight: 10,
//                   marginTop: 5,
//                   color:
//                     COLOR_LIST.METER_STATUS_TEXT[item.status] ||
//                     COLOR_LIST.METER_STATUS_TEXT['Other'],
//                 }}>
//                 {item.status}
//               </Text>
//               <Image
//                 source={RightArrow}
//                 style={{
//                   marginTop: 50,
//                   marginHorizontal: 5,
//                   right: 10,
//                   alignSelf: 'flex-end',
//                 }}
//               />
//             </View>
//           </View>
//           <View style={{marginHorizontal: 30, marginTop: -4}}>
//             <Text
//               style={{
//                 // width: 335,
//                 height: 0,
//                 borderColor: COLOR_LIST.PRIMARY,
//                 borderStyle: 'solid',
//                 borderBottomWidth: 6,
//                 borderBottomRightRadius: 20,
//                 borderBottomLeftRadius: 20,
//               }}></Text>
//           </View>
//         </Pressable>
//         {item.comments != null && item.comments != '' ? (
//           <View style={{marginHorizontal: 30, marginTop: -5}}>
//             <Text
//               style={{
//                 borderColor: COLOR_LIST.PRIMARY,
//                 color: COLOR_LIST.BRIGHT_TEXT,
//                 backgroundColor: COLOR_LIST.PRIMARY,
//                 borderColor: COLOR_LIST.PRIMARY,
//                 borderStyle: 'solid',
//                 borderWidth: 1,
//                 padding: 5,
//                 textAlign: 'center',
//                 fontSize: 10,
//                 borderBottomRightRadius: 20,
//                 borderBottomLeftRadius: 20,
//               }}>
//               {item.comments}
//             </Text>
//           </View>
//         ) : (
//           ''
//         )}
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: COLOR_LIST.SCREEN_BG}}>
//       <BackNavigation
//         title={`Meters: ${route.params.title}`}
//         // title={"meter"}
//         screenName={'properties'}
//         isRightIcon={true}
//         backgroundColor={'#F8F9FA00'}
//       />
//       <Spinner
//         visible={spinner}
//         textContent={'Loading...'}
//         textStyle={styles.spinnerTextStyle}
//         customIndicator={<View style={{}} />}
//         overlayColor="rgba(0, 0, 0, 0.6)"
//         animation="fade"
//         // size="small"
//       />

//       <View style={styles.container}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginHorizontal: 30,
//             marginVertical: 15,
//           }}>
//           <Text
//             style={{
//               color: '#323743',
//               fontFamily: 'Catamaran-Bold',
//               fontSize: 14,
//               fontStyle: 'normal',
//               fontWeight: '600',
//               lineHeight: 22,
//             }}>
//             {'Total ' + getMeterDataCount + ' Meters'}
//           </Text>
//           {isOwner ? (
//             <View style={{flexDirection: 'row'}}>
//               <Text
//                 onPress={() => {
//                   handlePress('addmeterList', {
//                     isUpdate: false,
//                     propertyId: propertyId,
//                     title: title,
//                   });
//                   setMeterAdded(true);
//                 }}
//                 style={{
//                   fontSize: 14,
//                   fontWeight: '400',
//                   lineHeight: 22,
//                   color: '#EC3237FF',
//                   backgroundColor: '#00000000',
//                 }}>
//                 Add Meter Manually +
//               </Text>
//             </View>
//           ) : null}
//         </View>
//         {meterList && meterList.length > 0 ? (
//           <ScrollView
//             style={styles.container}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 colors={['#007BFF']} // Customize the loading spinner color
//                 tintColor="#007BFF" // Customize the loading spinner color (Android)
//               />
//             }>
//             <FlatList
//               data={meterList}
//               renderItem={({item, index}) => {
//                 return (
//                   <>
//                     <View style={{}}>
//                       {meterCard(item, index)}
//                       {/* <Text>{item.meterAlias}</Text>       */}
//                     </View>
//                   </>
//                 );
//               }}
//               keyExtractor={item => item.id}
//             />
//             <View
//               style={{
//                 flex: 1,
//                 paddingTop: '40%',
//                 alignItems: 'center',
//                 justifyContent: 'flex-end',
//                 marginHorizontal: 28,
//               }}>
//               <Text style={{fontSize: 12, color: 'black'}}>
//                 {'You can fetch your meters automatically'}
//               </Text>
//               <Pressable
//                 onPress={() => {
//                   setMetersFetched(false);
//                   setfetchedMeterList([]);
//                   setModalVisible(true);
//                 }}>
//                 <Text style={{fontSize: 18, color: 'red', marginTop: 10}}>
//                   Fetch Meters Data
//                 </Text>
//               </Pressable>
//             </View>
//           </ScrollView>
//         ) : noDataFound ? (
//           <ScrollView
//             style={styles.container}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 colors={['#007BFF']} // Customize the loading spinner color
//                 tintColor="#007BFF" // Customize the loading spinner color (Android)
//               />
//             }>
//             <View style={styles.container}>
//               <View
//                 style={{
//                   flex: 1,
//                   paddingTop: '40%',
//                   alignItems: 'center',
//                   justifyContent: 'flex-end',
//                   marginHorizontal: 28,
//                 }}>
//                 <Text style={{fontSize: 18, color: 'black'}}>
//                   {'No meters added'}
//                 </Text>
//                 <Text style={{fontSize: 12, color: 'black'}}>
//                   {'You can fetch your meters automatically'}
//                 </Text>
//                 <Pressable
//                   onPress={() => {
//                     setMetersFetched(false);
//                     setfetchedMeterList([]);
//                     setModalVisible(true);
//                   }}>
//                   <Text style={{fontSize: 18, color: 'red', marginTop: 10}}>
//                     Fetch Meters Data
//                   </Text>
//                 </Pressable>
//               </View>
//             </View>
//           </ScrollView>
//         ) : (
//           <ScrollView
//             style={styles.container}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 colors={['#007BFF']} // Customize the loading spinner color
//                 tintColor="#007BFF" // Customize the loading spinner color (Android)
//               />
//             }>
//             <View style={styles.shimmerCard}>
//               <Shimmer />
//             </View>
//             <View style={styles.shimmerCard}>
//               <Shimmer />
//             </View>
//           </ScrollView>
//         )}
//       </View>
//       <Modal
//         visible={modalVisible}
//         onRequestClose={handleCancel}
//         animationType="fade"
//         transparent={true}>
//         <View style={styles.modalContainer}>
//           <View style={styles.alertBox}>
//             {metersFetched ? (
//               fetchedMeterList.length > 0 ? (
//                 <View
//                   style={{
//                     marginVertical: 0,
//                     borderWidth: 1,
//                     borderColor: '#DEE1E6',
//                     width: '100%',
//                     borderTopRightRadius: 10,
//                     borderTopLeftRadius: 10,
//                   }}>
//                   <View
//                     style={{
//                       backgroundColor: '#DEE1E6',
//                       borderTopRightRadius: 10,
//                       borderTopLeftRadius: 10,
//                     }}>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         marginHorizontal: 16,
//                         marginVertical: 9,
//                         justifyContent: 'center',
//                       }}>
//                       <Text
//                         style={{
//                           fontFamily: 'Catamaran-Regular' /* Body */,
//                           fontSize: 16,
//                           fontWeight: '700',
//                           lineHeight: 22,
//                           color: '#171A1FFF',
//                         }}>
//                         We found below meter data
//                       </Text>
//                     </View>
//                   </View>
//                   <View
//                     style={{
//                       marginHorizontal: 16,
//                       marginVertical: 9,
//                       justifyContent: 'center',
//                     }}>
//                     <Text
//                       style={{
//                         color: COLOR_LIST.TEXT,
//                         marginVertical: 15,
//                         alignSelf: 'center',
//                       }}>
//                       Please confirm to import below meters to current property.
//                     </Text>
//                     <View
//                       style={{
//                         marginVertical: 0,
//                         borderWidth: 1,
//                         borderColor: '#DEE1E6',
//                         width: '100%',
//                       }}>
//                       <View style={{backgroundColor: '#DEE1E6'}}>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             marginHorizontal: 16,
//                             marginVertical: 9,
//                             justifyContent: 'space-between',
//                           }}>
//                           <View>
//                             <Text
//                               style={{
//                                 fontFamily: 'Catamaran-Regular' /* Body */,
//                                 fontSize: 14,
//                                 fontWeight: '700',
//                                 lineHeight: 22,
//                                 color: '#171A1F',
//                               }}>
//                               Meter Number
//                             </Text>
//                           </View>

//                           <Text
//                             style={{
//                               fontSize: 14,
//                               fontWeight: '400',
//                               lineHeight: 22,
//                               color: '#171A1FFF',
//                             }}>
//                             Target Consumption
//                           </Text>
//                         </View>
//                       </View>
//                       {fetchedMeterList?.map((item, index) => {
//                         return (
//                           <View style={{backgroundColor: '#FFFFFF'}}>
//                             <View
//                               style={{
//                                 flexDirection: 'row',
//                                 marginHorizontal: 16,
//                                 marginVertical: 9,
//                                 justifyContent: 'space-between',
//                               }}>
//                               <Text
//                                 style={{
//                                   fontFamily: 'Catamaran-Regular' /* Body */,
//                                   fontSize: 14,
//                                   fontWeight: '700',
//                                   lineHeight: 30,
//                                   textAlignVertical: 'center',
//                                   color: '#171A1FFF',
//                                 }}>
//                                 <Image
//                                   source={UTILITY[item.meterUtility].icon}
//                                   style={{
//                                     position: 'relative',
//                                     marginTop: 8,
//                                     marginHorizontal: 20,
//                                     width: 20,
//                                     height: 20,
//                                   }}
//                                 />
//                                 {' ' + item.meterNumbers}
//                               </Text>

//                               <Text
//                                 style={{
//                                   fontSize: 12,
//                                   fontWeight: '400',
//                                   lineHeight: 30,
//                                   color: '#171A1F',
//                                   textAlignVertical: 'center',
//                                   paddingTop: 0,
//                                 }}>
//                                 <TextInput
//                                   mode="outlined"
//                                   placeholder={
//                                     item.minDailyTarget +
//                                     ' - ' +
//                                     item.maxDailyTarget
//                                   }
//                                   style={{
//                                     alignSelf: 'center',
//                                     height: 30,
//                                     fontSize: 12,
//                                     marginTop: 10,
//                                     padding: 0,
//                                   }}
//                                   onChangeText={text => {
//                                     handleTargetChange(index, text);
//                                   }}
//                                   value={targets[index] || ''}
//                                 />
//                                 {' ' + item.unitOfMeasure}
//                               </Text>
//                             </View>
//                           </View>
//                         );
//                       })}
//                     </View>
//                     <Text
//                       style={{
//                         color: COLOR_LIST.TEXT,
//                         marginVertical: 15,
//                         alignSelf: 'center',
//                         fontSize: 12,
//                       }}>
//                       Note: Meters already added to property will be skipped.
//                     </Text>
//                   </View>
//                 </View>
//               ) : (
//                 <View
//                   style={{
//                     marginVertical: 0,
//                     borderWidth: 1,
//                     borderColor: '#DEE1E6',
//                     width: '100%',
//                     borderTopRightRadius: 10,
//                     borderTopLeftRadius: 10,
//                   }}>
//                   <View
//                     style={{
//                       backgroundColor: '#DEE1E6',
//                       borderTopRightRadius: 10,
//                       borderTopLeftRadius: 10,
//                     }}>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         marginHorizontal: 16,
//                         marginVertical: 9,
//                         justifyContent: 'center',
//                       }}>
//                       <Text
//                         style={{
//                           fontFamily: 'Catamaran-Regular' /* Body */,
//                           fontSize: 16,
//                           fontWeight: '700',
//                           lineHeight: 22,
//                           color: '#171A1FFF',
//                         }}>
//                         Oop! something went wrong.
//                       </Text>
//                     </View>
//                   </View>
//                   <View
//                     style={{
//                       marginHorizontal: 16,
//                       marginVertical: 9,
//                       justifyContent: 'center',
//                     }}>
//                     <Text
//                       style={{
//                         color: COLOR_LIST.TEXT,
//                         marginVertical: 15,
//                         alignSelf: 'center',
//                       }}>
//                       We are not able to fetch your meters. Kindly check meter
//                       number and try again
//                     </Text>
//                   </View>
//                 </View>
//               )
//             ) : (
//               <View
//                 style={{
//                   marginVertical: 0,
//                   borderWidth: 1,
//                   borderColor: '#DEE1E6',
//                   width: '100%',
//                   borderTopRightRadius: 10,
//                   borderTopLeftRadius: 10,
//                 }}>
//                 <View
//                   style={{
//                     backgroundColor: '#DEE1E6',
//                     borderTopRightRadius: 10,
//                     borderTopLeftRadius: 10,
//                   }}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       marginHorizontal: 16,
//                       marginVertical: 9,
//                       justifyContent: 'center',
//                     }}>
//                     <Text
//                       style={{
//                         fontFamily: 'Catamaran-Regular' /* Body */,
//                         fontSize: 12,
//                         fontWeight: '700',
//                         lineHeight: 22,
//                         color: '#171A1FFF',
//                       }}>
//                       Fetch meters automatically
//                     </Text>
//                   </View>
//                 </View>
//                 <View
//                   style={{
//                     marginHorizontal: 16,
//                     marginVertical: 9,
//                     justifyContent: 'center',
//                   }}>
//                   <Text
//                     style={{
//                       color: COLOR_LIST.TEXT,
//                       marginVertical: 15,
//                       alignSelf: 'center',
//                     }}>
//                     Enter any one of the meter number
//                   </Text>
//                   <TextInput
//                     label={
//                       <Text>
//                         <Text>Meter Number</Text>
//                         <Text style={{color: 'red'}}> *</Text>
//                       </Text>
//                     }
//                     mode="outlined"
//                     placeholder="Enter Meter Number"
//                     style={{width: '75%', alignSelf: 'center'}}
//                     onChangeText={setMeterNumber}
//                     value={meterNumber}
//                   />
//                 </View>
//               </View>
//             )}
//             {/* Your modal content */}
//             {/* Display detailed records for the selected transaction */}
//             {metersFetched ? (
//               fetchedMeterList.length > 0 ? (
//                 <TouchableOpacity
//                   style={[styles.button, styles.confirmButton]}
//                   onPress={proceedMeterImport}>
//                   <Text style={styles.buttonText}>IMPORT METERS</Text>
//                 </TouchableOpacity>
//               ) : (
//                 <TouchableOpacity
//                   style={[styles.button, styles.confirmButton]}
//                   onPress={() => {
//                     setMetersFetched();
//                     setfetchedMeterList([]);
//                   }}>
//                   <Text style={styles.buttonText}>RETRY</Text>
//                 </TouchableOpacity>
//               )
//             ) : fetchMeterIsLoading === true ? (
//               <>
//                 <Text style={styles.alertText}>Fetching your meters..</Text>
//                 <ActivityIndicator
//                   size="large"
//                   color="#000"
//                   style={styles.loader}
//                 />
//               </>
//             ) : (
//               <TouchableOpacity
//                 style={[styles.button, styles.confirmButton]}
//                 onPress={proceedMeterFetch}>
//                 <Text style={styles.buttonText}>PROCEED</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//       </Modal>

//       <View style={{width: '100%'}}>
//         <Bottom />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   shimmerCard: {
//     width: '90%',
//     alignSelf: 'center',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: BackgroundColor,
//   },
//   box: {
//     marginHorizontal: 20,
//     height: 110,
//     backgroundColor: '#252D3FFF',
//     borderRadius: 19,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   alertText: {
//     fontSize: 18,
//     marginBottom: 20,
//     color: 'black',
//   },
//   alertBox: {
//     backgroundColor: 'white',
//     paddingBottom: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     width: '90%',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   buttonText: {
//     color: COLOR_LIST.BRIGHT_TEXT,
//   },
//   button: {
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginHorizontal: 10,
//   },
//   confirmButton: {
//     marginTop: 25,
//     backgroundColor: '#FF6347', // Red color for logout
//   },
// });





import React, {useState, useEffect} from 'react';
import {BackgroundColor} from '../../helpers/constants';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackNavigation from '../../components/backNavigation';
import {
  clearStatesForImportmeter,
  getMetersByPropertyId,
  getmetersFromMasterData,
  resetUploadMetersFromMasterData,
  resetgetmetersFromMasterData,
  uploadMetersFromMasterData,
} from '../../redux/slice/getMeterList';
import {useDispatch, useSelector} from 'react-redux';
import { Toast, useToast} from 'react-native-toast-notifications';

//Images
import Bottom from '../../components/Bottom';
import RightArrow from '../../assets/RightArrow.png';
import Circle from '../../assets/Circle.png';
import electricityCircle from '../../assets/electricity/circle.png';
import gascircle from '../../assets/gas/circle.png';
import Spinner from 'react-native-loading-spinner-overlay';
import Shimmer from '../../utils/Shimmer';
import {useFocusEffect} from '@react-navigation/native';
import {COLOR_LIST} from '../../helpers/colorlist';
import {UTILITY} from '../../helpers/meterData';
import {Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import { resetAddPropertyState } from '../../redux/slice/addProperty';
// import { TextInput } from 'react-native-paper';
import { BackHandler } from 'react-native';
import { clearStates } from '../../redux/slice/verifyMeter';

export const MeterList = ({route}) => {
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const propertyId = route.params?.propertyId;
  console.log(propertyId);
  const title = route.params?.title;

  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [metersFetched, setMetersFetched] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setNoDataFound(false);
    getMeter();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a 2-second refresh process
  };
  const {
    getMeterIsLoading,
    getMeterData,
    getMeterDataCount,
    isOwner,
    getMeterIsSuccess,
    getMeterIsError,
    fetchMeterIsLoading,
    fetchMeterData,
    fetchMeterIsSuccess,
    fetchMeterIsError,
    importMeterIsLoading,
    importMeterData,
    importMeterIsSuccess,
    importMeterIsError,
  } = useSelector(state => ({
    getMeterIsLoading: state.getMeters.getMeterIsLoading,
    getMeterData: state.getMeters.getMeterData,
    getMeterDataCount: state.getMeters.getMeterDataCount,
    isOwner: state.getMeters.isOwner,
    getMeterIsSuccess: state.getMeters.getMeterIsSuccess,
    getMeterIsError: state.getMeters.getMeterIsError,
    fetchMeterIsLoading: state.getMeters.fetchMeterIsLoading,
    fetchMeterData: state.getMeters.fetchMeterData,
    fetchMeterIsSuccess: state.getMeters.fetchMeterIsSuccess,
    fetchMeterIsError: state.getMeters.fetchMeterIsError,
    importMeterIsLoading: state.getMeters.importMeterIsLoading,
    importMeterData: state.getMeters.importMeterData,
    importMeterIsSuccess: state.getMeters.importMeterIsSuccess,
    importMeterIsError: state.getMeters.importMeterIsError,
  }));
  console.log('isOwner',fetchMeterData);

  

  const [noDataFound, setNoDataFound] = useState(false);
  const [meterList, setMeterList] = useState([]);
  const [fetchedMeterList, setfetchedMeterList] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [meterNumber, setMeterNumber] = useState('');
  const [targets, setTargets] = useState([]);
  const [error, setError] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);



  const [meterAdded, setMeterAdded] = useState(false); // State to track if a new property has been added

  useFocusEffect(
    React.useCallback(() => {
      if (meterAdded) {
        // If a new property is added, fetch properties again
        getMeter();
        setMeterAdded(false);
      } else {
        getMeter();
      }
    }, [meterAdded]),
  );

  useEffect(() => {
    if (!modalVisible) {
      setMeterNumber(''); 
      setServerErrors({});
      handleMeterData();


    }
  }, [modalVisible]);

  const handleMeterData = () => {
    setNoDataFound(false);
    if (getMeterData && getMeterIsSuccess) {
      if (getMeterData.length > 0) {
        setSpinner(false);
        setMeterList(getMeterData);
        //console.log(getMeterData, "getmetereretet");
        setNoDataFound(false);
        if (getMeterData.length === 1) {
          //console.log(getMeterData[0].meterNumber);
          setMeterNumber(getMeterData[0].meterNumber);
          setServerErrors({});
        }
      } else {
        setSpinner(false);
        setMeterList([]);
        setNoDataFound(true);
      }
    }
  };


  useEffect(() => {
    handleMeterData();
  }, [getMeterData, getMeterIsSuccess]);






  // useEffect(() => {
  //   setNoDataFound(false);
  //   if (getMeterData && getMeterIsSuccess) {
  //     if (getMeterData.length > 0) {
  //       setSpinner(false);
  //       setMeterList(getMeterData);
  //       //console.log(getMeterData,"getmetereretet");
  //       setNoDataFound(false);
  //       if (getMeterData.length === 1) {
  //        //console.log(getMeterData[0].meterNumber);
  //         setMeterNumber(getMeterData[0].meterNumber); 
  //         setServerErrors({});
  //         // Assuming getMeterData objects have a meterNumber property
  //       }
        
  //     } 
      
  //     else {
  //       setSpinner(false);
  //       setMeterList([]);
  //       setNoDataFound(true);
  //     }
  //   }
  // }, [getMeterData, getMeterIsSuccess]);


  //console.log(meterList,"meterListnhhh");
  // //console.log("====");
  //console.log(getMeterData, '....');
  ////console.log(getMeterDataCount);
  const getMeter = async () => {
    setSpinner(true);
    let dataObj = {
      propertyId: propertyId,
    };
    //console.log(dataObj);

    dispatch(getMetersByPropertyId(dataObj));
  };

  const handlePress = screenName => {
    navigation.push(screenName, {propertyId: propertyId, title: title});
  };
//  useEffect(() => {
//     const backAction = () => {
//       navigation.navigate('properties');
//       return true; 
//     };

//     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

//     return () => backHandler.remove();
//   }, [propertyId]);
const handleTargetChange = (index, newValue) => {
  setimportMeterError([]);

  setTargets(prevTargets => {
    const updatedTargets = [...prevTargets];
    updatedTargets[index] = newValue;
    return updatedTargets;
  });

 
};

  const [serverErrors, setServerErrors] = useState({});

  console.log(importMeterData,"importMeterDataimportMeterDataimportMeterDataimportMeterData");

  useEffect(() => {
    setMetersFetched(false);
    setServerErrors({});
    //console.log(
    //   'fetchMeterIsSuccessfetchMeterIsSuccess',
    //   fetchMeterIsSuccess,
    //   fetchMeterData,
    // );
    if (fetchMeterData && fetchMeterIsSuccess === true && fetchMeterIsError === false) {
      if (fetchMeterData.length > 0) {
        setfetchedMeterList(fetchMeterData);
        setMetersFetched(true);
      } else {
       
        Toast.show(
          'No data Found',
          {
            type: 'danger',
            placement: 'top',
            duration: 3000,
            offset: 30,
            animationType: 'zoom-in',
          },
        );

        setfetchedMeterList([]);
        setMetersFetched(false);
        dispatch(resetgetmetersFromMasterData());
    
        
      }
    }
    else if(fetchMeterIsSuccess === false && fetchMeterIsError === true && fetchMeterData){
      setSpinner(false)
      setServerErrors(fetchMeterData.errors);
      // dispatch(resetgetmetersFromMasterData());

       
    }
  }, [fetchMeterData, fetchMeterIsSuccess,fetchMeterIsError]);

  // const handleMeterNumberChange = (text) => {
  //   setMeterNumber(text);
  //   setServerErrors({});
  // };
  const handleMeterNumberChange = (text) => {
    
    setMeterNumber(text);
    setIsEmpty(false); 
    setServerErrors({});
    dispatch(resetgetmetersFromMasterData());

  };



  const handleCancel = () => {
    // Logic to handle cancel action
    setIsEmpty(false); 
    setMetersFetched(false);
     setMeterNumber('');
  getMeter();
  setimportMeterError([]);
  setTargets([]);


    
    console.log("kooooooooooo");
    dispatch(resetgetmetersFromMasterData());
    setMetersFetched(false);
    setModalVisible(false);
    dispatch(resetAddPropertyState());
  };
  console.log(serverErrors,"ooooooo");

  const[ importMeterError,setimportMeterError] = useState([]);
  console.log(importMeterError,"importMeterError");


//console.log(serverErrors,"serverError");
  console.log(importMeterError?.errors?.DailyTargetConsumption?.[0],"ooppppfirgfikkkkkkop0e0e00rbkrvbkbfkvfbkn",importMeterIsSuccess,importMeterIsError);

  useEffect(() => {
    if (importMeterData !="" && importMeterIsSuccess && !importMeterIsError) {
      console.log("---------------------------------------------------------------------------");
      // Toast.show({
      //   type: 'success',
      //   position: 'top',
      //   text1: 'Meters imported to your account.',
      //   text2: 'You can now update information.',
      //   visibilityTime: 3000,
      //   autoHide: true,
      //   topOffset: 30,
      //   bottomOffset: 40,
      //   animationType: 'zoom-in',
      // });
      toast.show("Meters imported to your account", {
        type: 'success',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'zoom-in',
      });
      setModalVisible(false);

      // Handle successful import
      // Reset state or perform additional actions
      setTargets([]);
      handleCancel();
      dispatch(clearStatesForImportmeter());
      getMeter();
    } else if (importMeterIsError && !importMeterIsSuccess) {
      // Extract the errors from the importMeterData
      const errors = importMeterData?.errors || {};
      const formattedErrors = Object.values(errors).flat();
      setimportMeterError(formattedErrors);

      // const errors = importMeterData?.errors || {};
      // setimportMeterError(errors);
      console.log('Errors:', errors);
    }
  }, [importMeterData, importMeterIsSuccess, importMeterIsError, dispatch]);

  // Log the errors for debugging
  console.log('importMeterError:', importMeterError);

  // useEffect(() => {
  //       console.log(
  //         'fetchMeterIsSuccessfetchMeterIsSuccess',
  //         importMeterIsSuccess,
  //         importMeterData,
  //       );
  //       if (importMeterData?.length>0  && importMeterIsSuccess==true && importMeterIsError===false) {

  //         // if (importMeterData === 'Meters already Exists!') {
  //         //   setimportmetererror(importMeterData);
  //         // } else {
  //           Toast.show("Meters imported to your account. You can now update information.",
  //             {
  //               type: 'warning',
  //               placement: 'top',
  //               duration: 3000,
  //               offset: 30,
  //               animationType: 'zoom-in',
  //             },
  //           );
  //           setTargets([]);
  //           handleCancel();
  //           dispatch(clearStatesForImportmeter());
  //           getMeter();
  //         }
      
        
       
    
        
  //       else if (importMeterData  && importMeterIsSuccess ===false && importMeterIsError===true){
  //         setimportmetererror([importMeterData?.errors])
  //         console.log(importMeterData?.errors);
  //       }
  //     }, [importMeterData, importMeterIsSuccess,importMeterIsError]);
  //     console.log(importMeterData,"importMeterDataimportMeterDataimportMeterDataimportMeterDataimportMeterData");
    
  const redirectToMeterEdit = item => {
    if (isOwner) {
      if (item.status === 'Pending') {
        Toast.show(
          'Your meter is pending for admin approval;\n Please retry later.',
          {
            type: 'warning',
            placement: 'top',
            duration: 3000,
            offset: 30,
            animationType: 'zoom-in',
          },
        );
        return;
      }
      navigation.navigate('addmeterList', {
        meterid: item?.id,
        isUpdate: true,
        propertyId: propertyId,
        title: title,
      });
      setMeterAdded(true);
    }
  };

  // const handleCancel = () => {
  //   // Logic to handle cancel action
  //   setMetersFetched(false);
  //   setModalVisible(false);
  //   dispatch(resetAddPropertyState());


  // };

  const proceedMeterFetch =  (meterNo) => {
    console.log("hhhhhhhhhhhhh");
    
console.log(propertyId);


if (meterNo.trim() === '') {
  setIsEmpty(true);
  return; // Don't proceed if meter number is empty
}
// if (!meterNo) {
//       Toast.show('Meter number is required', {
//         type: 'danger',
//         placement: 'top',
//         duration: 3000,
//         offset: 30,
//         animationType: 'zoom-in',
//       });
//       return false;
//     }

   

    const dataObj = {
      meterNumber:meterNo,
      propertyId:propertyId
      
    };
    console.log(dataObj);
    dispatch(getmetersFromMasterData(dataObj));
    
    // setMeterNumber('');
  };

  const proceedMeterImport = async () => {
    if (targets.length != fetchedMeterList.length) {
      Toast.show('Please update target consumption for all meters', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'zoom-in',
      });
      return;
    }
    const hasDecimal = targets.some((target) => target % 1 !== 0);
    if (hasDecimal) {
      Toast.show('Please enter a number without commas or decimal points.', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'zoom-in',
      });
      return;
    }
    if (fetchedMeterList.length > 0) {
            var dataObj = {
              propertyId: propertyId,
              meter: fetchedMeterList.map((meter, index) => ({
                meterNumber: meter.meterNumbers,
                meterTypeId: meter.meterTypeId,
                targetConsumption: targets[index],
              })),
            };
            dispatch(uploadMetersFromMasterData(dataObj));
          } else {
            Toast.show('No meters found! Please try again', {
              type: 'danger',
              placement: 'top',
              duration: 3000,
              offset: 30,
              animationType: 'zoom-in',
            });
          }




    // if (fetchedMeterList.length > 0) {
    //   var dataObj = {
    //     propertyId: propertyId,
    //     meter: fetchedMeterList.map((meter, index) => ({
    //       meterNumber: meter.meterNumbers,
    //       meterTypeId: meter.meterTypeId,
    //       targetConsumption: targets[index],
    //     })),
    //   };


    //   // //console.log(dataObj);
    //   dispatch(uploadMetersFromMasterData(dataObj));
    //   setTimeout(()=>{
    //     Toast.show(
    //       'Meters imported to your account. You can now update information.',
    //       {
    //         type: 'warning',
    //         placement: 'top',
    //         duration: 3000,
    //         offset: 30,
    //         animationType: 'zoom-in',
    //       },
    //     );
    //    },5000)
    // } else {
    //   Toast.show('No meters found! Please try again', {
    //     type: 'danger',
    //     placement: 'top',
    //     duration: 3000,
    //     offset: 30,
    //     animationType: 'zoom-in',
    //   });
    // }
  };

  const meterCard = (item, index) => {
    return (
      <View style={{marginVertical: 10}}>
        <Pressable
          onPress={() => {
            redirectToMeterEdit(item);
          }}>
          <View style={styles.box}>
            <View style={{}}>
              <View
                style={{
                  alignItems: 'center',
                  borderTopLeftRadius: 19,
                  borderBottomRightRadius: 15,
                  overflow: 'hidden',
                  backgroundColor: '#424856FF',
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '400',
                    color: '#FFFFFFFF',
                    lineHeight: 18,
                    padding: 1,
                    marginLeft: 8,
                  }}>
                  {item.meterNumber}
                </Text>
              </View>
              <Image
                source={UTILITY[item.meterType].icon}
                style={{
                  position: 'relative',
                  marginTop: 8,
                  marginHorizontal: 20,
                  width: 60,
                  height: 60,
                }}
              />
            </View>
            <View style={{marginVertical: 7, flex: 0.8, marginTop: 10}}>
              <Text
                style={{
                  fontFamily: 'Catamaran-Regular',
                  fontSize: 18,
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 28,
                  color: '#FFFFFFFF',
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.meterAlias}
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  marginTop: 2,
                  lineHeight: 16,
                  color: '#DEE1E6FF',
                }}>
                {'Expiry' +
                  ': ' +
                  (item.contractEndDate != null
                    ? item.contractEndDate
                    : 'Not updated')}
              </Text>
              <View
                style={{flexDirection: 'row', marginRight: 10, marginTop: 10}}>
                <Image
                  source={
                    item.meterType === 'Water'
                      ? Circle
                      : item.meterType === 'Electricity'
                      ? electricityCircle
                      : gascircle
                  }
                />
                <Text
                  style={{
                    marginHorizontal: 3,
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 20,
                    color:
                      item.meterType === 'Water'
                        ? '#71B2FF'
                        : item.meterType === 'Electricity'
                        ? '#EFB034'
                        : '#1DD75B',
                  }}>
                  {'Target: ' + item.target + item.unitOfMeasure}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 3,
                flexDirection: 'column',
                // justifyContent: 'space-around',
              }}>
              <Text
                style={{
                  fontFamily: 'Catamaran-Regualr' /* Body */,
                  fontSize: 11,
                  fontWeight: '700',
                  lineHeight: 18,
                  marginRight: 10,
                  marginTop: 5,
                  color:
                    COLOR_LIST.METER_STATUS_TEXT[item.status] ||
                    COLOR_LIST.METER_STATUS_TEXT['Other'],
                }}>
                {item.status}
              </Text>
              <Image
                source={RightArrow}
                style={{
                  marginTop: 50,
                  marginHorizontal: 5,
                  right: 10,
                  alignSelf: 'flex-end',
                }}
              />
            </View>
          </View>
          <View style={{marginHorizontal: 30, marginTop: -4}}>
            <Text
              style={{
                // width: 335,
                height: 0,
                borderColor: COLOR_LIST.PRIMARY,
                borderStyle: 'solid',
                borderBottomWidth: 6,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
              }}></Text>
          </View>
        </Pressable>
        {item.comments != null && item.comments != '' ? (
          <View style={{marginHorizontal: 30, marginTop: -5}}>
            <Text
              style={{
                borderColor: COLOR_LIST.PRIMARY,
                color: COLOR_LIST.BRIGHT_TEXT,
                backgroundColor: COLOR_LIST.PRIMARY,
                borderColor: COLOR_LIST.PRIMARY,
                borderStyle: 'solid',
                borderWidth: 1,
                padding: 5,
                textAlign: 'center',
                fontSize: 10,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
              }}>
              {item.comments}
            </Text>
          </View>
        ) : (
          ''
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLOR_LIST.SCREEN_BG}}>
      <BackNavigation
        title={`Meters: ${route.params.title.length > 20 ? `${route.params.title.slice(0, 20)}...` : route.params.title}`}
        // title={`Meters: ${route.params.title}`}
        screenName={'properties'}
        isRightIcon={true}
        backgroundColor={'#F8F9FA00'}
      />
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
        customIndicator={<View style={{}} />}
        overlayColor="rgba(0, 0, 0, 0.6)"
        animation="fade"
        // size="small"
      />

      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 30,
            marginVertical: 15,
          }}>
          <Text
            style={{
              color: '#323743',
              fontFamily: 'Catamaran-Bold',
              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 22,
            }}>
            {'Total ' + getMeterDataCount + ' Meters'}
          </Text>
          {isOwner ? (
            <View style={{flexDirection: 'row'}}>
              <Text
                onPress={() => {
                  handlePress('addmeterList', {
                    isUpdate: false,
                    propertyId: propertyId,
                    title: title,
                  });
                  dispatch(clearStates());

                  setMeterAdded(true);
                }}
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  lineHeight: 22,
                  color: '#EC3237FF',
                  backgroundColor: '#00000000',
                }}>
                Add Meter Manually +
              </Text>
            </View>
          ) : null}
        </View>
        {meterList && meterList.length > 0 ? (
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
            <FlatList
              data={meterList}
              renderItem={({item, index}) => {
                return (
                  <>
                    <View style={{}}>
                      {meterCard(item, index)}
                      {/* <Text>{item.meterAlias}</Text>       */}
                    </View>
                  </>
                );
              }}
              keyExtractor={item => item.id}
            />
            <View
              style={{
                flex: 1,
                paddingTop: '40%',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginHorizontal: 28,
              }}>
              <Text style={{fontSize: 12, color: 'black'}}>
                {'You can fetch your meters automatically'}
              </Text>
              <Pressable
                onPress={() => {
                  setMetersFetched(false);
                  setfetchedMeterList([]);
                  setModalVisible(true);
                }}>
                <Text style={{fontSize: 18, color: 'red', marginTop: 10}}>
                  Fetch Meters Data
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        ) : noDataFound ? (
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
                  {'No meters added'}
                </Text>
                <Text style={{fontSize: 12, color: 'black'}}>
                  {'You can fetch your meters automatically'}
                </Text>
                <Pressable
                  onPress={() => {
                    setMetersFetched(false);
                    setfetchedMeterList([]);
                    setModalVisible(true);
                  }}>
                  <Text style={{fontSize: 18, color: 'red', marginTop: 10}}>
                    Fetch Meters Data
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
            <View style={styles.shimmerCard}>
              <Shimmer />
            </View>
            <View style={styles.shimmerCard}>
              <Shimmer />
            </View>
          </ScrollView>
        )}
      </View>
      <Modal
        visible={modalVisible}
        onRequestClose={handleCancel}
        animationType="fade"

        transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.alertBox}>
            {metersFetched ? (
              fetchedMeterList.length > 0 ? (
                <View
                  style={{
                    marginVertical: 0,
                    borderWidth: 1,
                    borderColor: '#DEE1E6',
                    width: '100%',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#DEE1E6',
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 16,
                        marginVertical: 9,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Catamaran-Regular' /* Body */,
                          fontSize: 16,
                          fontWeight: '700',
                          lineHeight: 22,
                          color: '#171A1FFF',
                        }}>
                        We found below meter data
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginHorizontal: 16,
                      marginVertical: 9,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: COLOR_LIST.TEXT,
                        marginVertical: 15,
                        alignSelf: 'center',
                      }}>
                      Please confirm to import below meters to current property.
                    </Text>
                    <View
                      style={{
                        marginVertical: 0,
                        borderWidth: 1,
                        borderColor: '#DEE1E6',
                        width: '100%',
                      }}>
                      <View style={{backgroundColor: '#DEE1E6'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: 16,
                            marginVertical: 9,
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text
                              style={{
                                fontFamily: 'Catamaran-Regular' /* Body */,
                                fontSize: 14,
                                fontWeight: '700',
                                lineHeight: 22,
                                color: '#171A1F',
                              }}>
                              Meter Number
                            </Text>
                          </View>

                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#171A1FFF',
                            }}>
                            Target Consumption
                          </Text>
                        </View>
                      </View>
                      {fetchedMeterList?.map((item, index) => {
                        //console.log(item);
                        return (
                          <View style={{backgroundColor: '#FFFFFF'}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginHorizontal: 10,
                                marginVertical: 9,
                                justifyContent: 'space-between',
                                // borderColor:'red',borderWidth:2

                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Catamaran-Regular' /* Body */,
                                  fontSize: 14,
                                  fontWeight: '700',
                                  lineHeight: 30,
                                  textAlignVertical: 'center',
                                  color: '#171A1FFF',

                                }}>
                                <Image
                                  source={UTILITY[item.meterUtility].icon}
                                  style={{
                                    position: 'relative',
                                    marginTop: 8,
                                    marginHorizontal: 20,
                                    width: 30,
                                    height: 20,
                                    // borderColor:'red',
                                    // borderWidth:2
                                  }}
                                />
                                {' ' + item.meterNumbers}
                              </Text>

                              <View
                                style={{
                                  fontSize: 12,
                                 
                                  fontWeight: '400',
                                  // lineHeight: 20,
                                  color: '#171A1F',
                                  textAlignVertical: 'center',
                                  paddingTop: 0,

                                  flexDirection:'row',
                                  // borderColor:'red',borderWidth:2

                                }}>
                                <TextInput
                                  mode="outlined"
                                  placeholder={
                                    item.minDailyTarget +  ' - ' +item.maxDailyTarget
                                  } 
                                  keyboardType='numeric'
                                  style={{
                                    alignSelf: 'center',
                                    height:30,
                                    fontSize: 12,
                                    // marginTop: 10,
                                    width:100,
                                    // borderColor:'red',borderWidth:2    
                                  
                                  }}
                                  onChangeText={text => {
                                    handleTargetChange(index, text);
                                  }}
                                  value={targets[index] || ''}
                                />
                             <Text style={{ 
                                  fontWeight: '400',
                                  paddingTop:5,
                                  // borderColor:'red',borderWidth:2,

                                  color: '#171A1F',}}> {item.unitOfMeasure}</Text>  
                              </View> 
                            </View>
                          </View>
                        );
                      })}
                    </View>
                    <Text
                      style={{
                        color: COLOR_LIST.TEXT,
                        marginVertical: 15,
                        alignSelf: 'center',
                        fontSize: 12,
                      }}>
                      Note: Meters already added to property will be skipped.
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    marginVertical: 0,
                    borderWidth: 1,
                    borderColor: '#DEE1E6',
                    width: '100%',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#DEE1E6',
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 16,
                        marginVertical: 9,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Catamaran-Regular' /* Body */,
                          fontSize: 16,
                          fontWeight: '700',
                          lineHeight: 22,
                          color: '#171A1FFF',
                        }}>
                        Oop! something went wrong.
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginHorizontal: 16,
                      marginVertical: 9,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: COLOR_LIST.TEXT,
                        marginVertical: 15,
                        alignSelf: 'center',
                      }}>
                      We are not able to fetch your meters. Kindly check meter
                      number and try again
                    </Text>
                  </View>
                </View>
              )
            ) : (
              <View
                style={{
                  marginVertical: 0,
                  borderWidth: 1,
                  borderColor: '#DEE1E6',
                  width: '100%',
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}>
                <View
                  style={{
                    backgroundColor: '#DEE1E6',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 16,
                      marginVertical: 9,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Catamaran-Regular' /* Body */,
                        fontSize: 12,
                        fontWeight: '700',
                        lineHeight: 22,
                        color: '#171A1FFF',
                      }}>
                      Fetch meters automatically
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginHorizontal: 16,
                    marginVertical: 9,
                    justifyContent: 'center',
                  }}>



                  <Text
                    style={{
                      color: COLOR_LIST.TEXT,
                      marginVertical: 15,
                      alignSelf: 'center',
                    }}>
                    Enter any one of the meter number
                  </Text>
                  <TextInput


                    label={
                      <Text>
                        <Text>Meter Number</Text>
                        <Text style={{color: 'red'}}> *</Text>
                      </Text>
                    }
                    // keyboardType = 'numeric'

                    mode="outlined"
                    placeholder="Enter Meter Number"
                    style={{width: '100%', alignSelf: 'center'}}
                    onChangeText={handleMeterNumberChange}
                    
                  
                    value={meterNumber}
                  />
                {isEmpty && <Text style={{ color: 'red' }}>Enter meter number</Text>}
                {serverErrors && (
  <>
    {serverErrors.MeterNumber && serverErrors.MeterNumber[0] && (
      <Text style={styles.errorInputText}>{serverErrors.MeterNumber[0]}</Text>
    )}
    {serverErrors.PropertyId && serverErrors.PropertyId[0] && (
      <Text style={[styles.errorInputText,{width: 200,}]}>{serverErrors.PropertyId[0]}</Text>
    )}
  </>
)}
                </View>
              </View>
            )}
            {/* Your modal content */}
            {/* Display detailed records for the selected transaction */}
            {metersFetched ? (
              fetchedMeterList.length > 0 ? (
              <>
                {importMeterError &&  (
                        <Text style={[styles.errorInputText,{paddingHorizontal:5}]}>{importMeterError}</Text>
                      )}
                        {/* {importMeterError && importMeterError?.errors?.DailyTargetConsumption?.[0] (
                        <Text style={[styles.errorInputText,{}]}>{importMeterError?.errors?.DailyTargetConsumption?.[0]}</Text>
                      )} */}
              
              <TouchableOpacity
                  style={[styles.button, styles.confirmButton]}
                  onPress={proceedMeterImport}>
                  <Text style={styles.buttonText}>IMPORT METERS</Text>
                </TouchableOpacity>
                    


                </>  
              ) : (
                <TouchableOpacity
                  style={[styles.button, styles.confirmButton]}
                  onPress={() => {
                    setMetersFetched();
                    setfetchedMeterList([]);
                  }}>
                  <Text style={styles.buttonText}>RETRY</Text>
                </TouchableOpacity>
              )
            ) : fetchMeterIsLoading === true ? (
              <>
                <Text style={styles.alertText}>Fetching your meters..</Text>
                <ActivityIndicator
                  size="large"
                  color="#000"
                  style={styles.loader}
                />
              </>
            ) : (
              <TouchableOpacity
  style={[styles.button, styles.confirmButton]}
  onPress={() => proceedMeterFetch(meterNumber)}>
  <Text style={styles.buttonText}>PROCEED</Text>
</TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      <View style={{width: '100%'}}>
        <Bottom />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shimmerCard: {
    width: '90%',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
  box: {
    marginHorizontal: 20,
    height: 110,
    backgroundColor: '#252D3FFF',
    borderRadius: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alertText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  alertBox: {
    backgroundColor: 'white',
    paddingBottom: 20,
    borderRadius: 10,
    alignItems: 'center',


  },
  modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      buttonText: {
        color: COLOR_LIST.BRIGHT_TEXT,
      },
      button: {
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
      },
      confirmButton: {
        marginTop: 25,
        backgroundColor: '#FF6347', // Red color for logout
      },
      errorInputText: {
        color: 'red',
        marginHorizontal: 12,
      },
});


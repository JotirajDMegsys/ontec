// import React, {useEffect, useRef, useState} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   TouchableHighlight,
//   View,
//   Modal,
//   Pressable,
//   FlatList,
//   Button,
//   Alert,
//   Linking,
// } from 'react-native';
// import {Dropdown} from 'react-native-element-dropdown';
// import CalendarPicker from 'react-native-calendar-picker';
// import moment from 'moment';
// import ViewShot from 'react-native-view-shot';
// import RNFS from 'react-native-fs';
// import {BackgroundColor} from '../../helpers/constants';
// import BackNavigation from '../../components/backNavigation';
// import {Image} from '@rneui/base';
// import {SelectCountry} from 'react-native-element-dropdown';
// import editIcon from '../../assets/Edit.png';
// import {useNavigation} from '@react-navigation/native';
// import noProperty from '../../assets/dashboard/noProperty.png';
// import Bottom from '../../components/Bottom';
// import {
//   transacitionMasters,
//   transactionSummary,
// } from '../../redux/slice/transacitionMasters';
// //*Images
// import Remove from '../../assets/remove.png';
// import mail from '../../assets/outgoingMail.png';
// import Check from '../../assets/check.png';
// import download from '../../assets/downloadIcon.png';
// import {COMPANY_ID} from '../../helpers/enum';
// import {useDispatch, useSelector} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {COLOR_LIST} from '../../helpers/colorlist';
// import {Toast, useToast} from 'react-native-toast-notifications';

// import {Dimensions} from 'react-native';
// import {getWidthByScreenSize} from '../../helpers/commonFunction';
// import {
//   downloadTransactionStatement,
//   resetDownloadTransactionStatement,
// } from '../../redux/slice/downloadTransactionStatement';
// import RNFetchBlob from 'rn-fetch-blob';
// import {
//   downloadPurchaseReceipt,
//   resetDownloadState,
// } from '../../redux/slice/downloadPurchaseReceipt';
// import {SendToEmailBtn} from '../../components/common';
// import {BarChart, LineChart, StackedBarChart} from 'react-native-chart-kit';
// import WebView from 'react-native-webview';
// import {Platform} from 'react-native';
// import {getStsMeterList} from '../../redux/slice/getStsMeterList';
// import {getTransactionList} from '../../redux/slice/purchaseTransactionList';
// const Purchase_History = () => {
//   const [selectedView, setSelectedView] = useState(null);
//   const [dataLoaded, setDataLoaded] = useState(false);
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const [noMasterDataFound, setNoMasterDataFound] = useState(false);
//   //   const {screenHeight, screenWidth} = Dimensions.get('window');
//   const [buttonTitle, setButtonTitle] = useState('DOWNLOAD');
//   const [buttonTitleForEmail, setButtonTitleForEmail] =
//     useState('SEND TO EMAIL');

//   const toast = useToast();

//   // const {
//   //   masterTransacitionIsLoading,
//   //   masterTransacitionData,
//   //   masterTransacitionSuccess,
//   //   masterTransacitionIsError,
//   //   transactionIsLoading,
//   //   transactionData,
//   //   transactionSuccess,
//   //   transactionIsError,
//   //   masterLoading,
//   //   masterData,
//   //   masterSuccess,
//   //   masterError,
//   //   loading,
//   //   downloaddata,
//   //   downloaddataMessage,
//   //   success,
//   //   error,
//   // } = useSelector(state => ({
//   //   masterTransacitionIsLoading:
//   //     state.transacitionMasters.masterTransacitionIsLoading,
//   //   masterTransacitionData: state.transacitionMasters.masterTransacitionData,
//   //   masterTransacitionIsError:
//   //     state.transacitionMasters.masterTransacitionIsError,
//   //   masterTransacitionSuccess:
//   //     state.transacitionMasters.masterTransacitionSuccess,
//   //   transactionIsLoading: state.transacitionMasters.transactionIsLoading,
//   //   transactionData: state.transacitionMasters.transactionData,
//   //   transactionIsError: state.transacitionMasters.transactionIsError,
//   //   transactionSuccess: state.transacitionMasters.transactionSuccess,
//   //   masterLoading: state.dashboardData.masterLoading,
//   //   masterData: state.dashboardData.masterData,
//   //   masterSuccess: state.dashboardData.masterSuccess,
//   //   masterError: state.dashboardData.masterError,
//   //   loading: state.downloadStatement.loading,
//   //   downloaddata: state.downloadStatement.downloaddata,
//   //   downloaddataMessage: state.downloadStatement.downloaddataMessage,
//   //   success: state.downloadStatement.success,
//   //   error: state.downloadStatement.error,
//   // }));

//   const {stsMeterIsLoading, stsMeterData, stsMeterIsError, errorMessage} =
//     useSelector(state => state.stsMeter);
//   const {
//     purchaseTransactionIsLoading,
//     purchaseTransactionIsData,
//     purchaseTransactionIsSuccess,
//     purchaseTransactionIsError,
//   } = useSelector(state => state.transactionList);
//   const [selectedValue, setSelectedValue] = useState(null);

//   console.log('==========tsts==========================');
//   console.log(purchaseTransactionIsData, '');
//   const [purchaseList, setPurchaseList] = useState(selectedValue == null && []);

// //   console.log('====================================');
//   useEffect(() => {
//     if (
//       purchaseTransactionIsData.length > 0 &&
//       purchaseTransactionIsSuccess == true
//     ) {
//       setPurchaseList(purchaseTransactionIsData);
//     } else {
//       setPurchaseList([]);
//     }
//   }, [
//     purchaseTransactionIsData,
//     purchaseTransactionIsSuccess,
//     purchaseTransactionIsLoading,
//     selectedValue,
//   ]);
//   console.log('opopop', purchaseList);
//   const [isDownloading, setIsDownloading] = useState(false);

//   const {
//     purchaseloading,
//     purchaseDownloaddata,
//     purchaseSuccess,
//     purchaseError,
//   } = useSelector(state => state.downloadReceipt);

//   const [isDownload, setIsDownload] = useState(false);
//   const [reciptTitle, setReciptTitle] = useState('RECEIPT');
//   const [tooltip, setTooltip] = useState(null);

//   useEffect(() => {
//     if (purchaseSuccess && purchaseDownloaddata && !purchaseError) {
//       const downloadFile = async () => {
//         const fileUrl = purchaseDownloaddata?.purchaceReceiptUrl;

//         try {
//           const response = await RNFetchBlob.config({
//             fileCache: true,
//             addAndroidDownloads: {
//               useDownloadManager: true,
//               notification: true,
//               path: `${RNFetchBlob.fs.dirs.DownloadDir}/${fileUrl.substring(
//                 fileUrl.lastIndexOf('/') + 1,
//               )}`,
//               description: 'File downloaded by download manager.',
//             },
//           }).fetch('GET', fileUrl);

//           // Display success message
//           toast.show('Purchase statement downloaded successfully!', {
//             type: 'success',
//             placement: 'top',
//             duration: 3000,
//             offset: 30,
//             animationType: 'zoom-in',
//           });
//           setIsModalVisible(false);
//         } catch (error) {
//           toast.show('Failed to download the file.', {
//             type: 'danger',
//             placement: 'top',
//             duration: 3000,
//             offset: 30,
//             animationType: 'zoom-in',
//           });

//           console.error('File download error:', error);
//         } finally {
//           setIsDownload(false);
//           setReciptTitle('RECEIPT');
//           dispatch(resetDownloadState());
//         }
//       };

//       downloadFile();
//     }
//   }, [purchaseSuccess, purchaseError, purchaseDownloaddata]);

//   const handleViewClick = view => {
//     setSelectedView(view);
//   };

//   const getViewBackgroundColor = view => {
//     return selectedView === view ? 'red' : 'white';
//   };
//   const getViewTextColor = view => {
//     return selectedView === view ? 'white' : 'black';
//   };

//   const [meterList, setMeterList] = useState([]);
//   const [transationPeroid, setTransationPeroid] = useState([
//     {id: 1, name: 'Last Month', otherText: null},
//     {id: 2, name: 'This Month', otherText: null},
//     {id: 3, name: 'Custom', otherText: null},
//   ]);
//   // const [transactionlist, setTransactionlist] = useState(null);

//   const [transactionList, setTransactionList] = useState([]);

//   // useEffect(() => {
//   //   if (
//   //     masterTransacitionData.propertyList &&
//   //     masterTransacitionData.transactionPeriod &&
//   //     masterTransacitionSuccess === true &&
//   //     masterTransacitionIsError === false &&
//   //     masterTransacitionIsLoading === false
//   //   ) {
//   //     setMeterList(masterTransacitionData.propertyList);
//   //     //   setTransationPeroid(masterTransacitionData.transactionPeriod);
//   //   } else {
//   //     setMeterList([]);
//   //     //   setTransationPeroid([]);
//   //   }
//   //   if (masterTransacitionData.propertyList?.length > 0) {
//   //     setNoMasterDataFound(false);
//   //   } else if (masterTransacitionData.propertyList?.length === 0) {
//   //     setNoMasterDataFound(true);
//   //   } else {
//   //     setNoMasterDataFound(true);
//   //   }
//   // }, [masterTransacitionData]);

//   // useEffect(() => {
//   //   setDataLoaded(true);

//   //   setTransactionList(transactionData?.transaction);
//   // }, [transactionData, transactionSuccess]);

//   // useEffect(() => {
//   //   setDataLoaded(false);
//   //   masterTransactionData();
//   // }, []);

//   const masterTransactionData = async () => {
//     let userId = await AsyncStorage.getItem('userId');
//     let id = parseInt(userId);
//     let dataObj = {
//       ownerId: id,
//       companyId: COMPANY_ID,
//     };
//     dispatch(getStsMeterList(dataObj));
//   };
//   //  datePick logic

//   // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   // const [selectedDate, setSelectedDate] = useState('YYYY/MM/DD');
//   const [selectedDate, setSelectedDate] = useState('DD/MM/YYYY');
//   const [modalVisibleCalender, setModalVisibleCalender] = useState(false);
//   const [selectedToDate, setSelectedToDate] = useState('DD/MM/YYYY');
//   const [modalVisibleToCalender, setModalVisibleToCalender] = useState(false);
//   const [isFocus, setIsFocus] = useState(false);

//   const onClickSelectDate = async date => {
//     let selectedDate = moment(date).format('DD/MM/YYYY');
//     setSelectedDate(selectedDate);
//     setModalVisibleCalender(false);
//   };
//   const onClickSelectToDate = async date => {
//     let selectedToDate = moment(date).format('DD/MM/YYYY');
//     setSelectedToDate(selectedToDate);
//     setModalVisibleToCalender(false);
//   };

//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const [errorObj, setErrorObj] = useState({
//     meterNumber: '',
//     TransactionPeriod: '',
//     periodDate: '',
//   }); // Initialize with null or any initial value you prefer
//   const onClickHandleSubmit = async () => {
//     if (
//       !selectedValue ||
//       !selectedView ||
//       ((selectedView.name === 'Custom' || selectedView.name === 3) &&
//         (selectedDate === 'DD/MM/YYYY' || selectedToDate === 'DD/MM/YYYY'))
//     ) {
//       Toast.show('Please select filters to get transaction summary!', {
//         type: 'danger',
//         placement: 'top',
//         duration: 3000,
//         offset: 30,
//         animationType: 'slide-in',
//       });
//       return;
//     }

//     let fromDate, toDate;

//     if (selectedView.name === 'Custom' || selectedView.name === 3) {
//       fromDate =
//         selectedDate === 'DD/MM/YYYY'
//           ? moment()
//           : moment(selectedDate, 'DD/MM/YYYY');
//       toDate =
//         selectedToDate === 'DD/MM/YYYY'
//           ? moment()
//           : moment(selectedToDate, 'DD/MM/YYYY');

//       if (fromDate.isAfter(moment()) || toDate.isAfter(moment())) {
//         Toast.show('Dates should not be future dates.', {
//           type: 'danger',
//           placement: 'top',
//           duration: 3000,
//           offset: 30,
//           animationType: 'slide-in',
//         });
//         return;
//       }

//       if (fromDate.isAfter(toDate)) {
//         Toast.show('"From date" should be less than "To date".', {
//           type: 'danger',
//           placement: 'top',
//           duration: 3000,
//           offset: 30,
//           animationType: 'slide-in',
//         });
//         return;
//       }

//       if (fromDate.isBefore(moment().subtract(90, 'days'))) {
//         Toast.show('From date should not be more than 90 days ago.', {
//           type: 'danger',
//           placement: 'top',
//           duration: 3000,
//           offset: 30,
//           animationType: 'slide-in',
//         });
//         return;
//       }

//       let diffInDays = toDate.diff(fromDate, 'days');
//       if (diffInDays > 90) {
//         Toast.show('Statement period should not be more than 90 days.', {
//           type: 'danger',
//           placement: 'top',
//           duration: 3000,
//           offset: 30,
//           animationType: 'slide-in',
//         });
//         return;
//       }
//     } else if (selectedView.name === 'Last Month') {
//       fromDate = moment().subtract(90, 'days');
//       toDate = moment();
//     } else if (selectedView.name === 'This Month') {
//       fromDate = moment().startOf('month');
//       toDate = moment();
//     }

//     let dataObj = {
//       meter: selectedValue,

//       // transactionCycleId: selectedView.id,
//       fromDate: fromDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
//       toDate: toDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
//     };

//     console.log('====================================');
//     console.log(dataObj);
//     dispatch(getTransactionList(dataObj));
//   };

//   const labelData = [
//     {label: 'Amount', color: '#e0453d'},
//     {label: 'Unit', color: '#51a9ed'},
//   ];

//   const transaction = [
//     {date: '01-01-2024', amount: 50, unit: 30, amount: 50, unit: 30},
//     {date: '02-01-2024', amount: 50, unit: 35},
//     {date: '03-01-2024', amount: 45, unit: 20},
//     {date: '04-01-2024', amount: 30, unit: 30},
//     {date: '05-01-2024', amount: 67, unit: 40},
//     {date: '06-01-2024', amount: 40, unit: 50},
//     {date: '07-01-2024', amount: 30, unit: 90},
//   ];

//   const generateChartData = transactions => {
//     const labels = [
//       'Jan 1',
//       'Jan 2',
//       'Jan 3',
//       'Jan 4',
//       'Jan 5',
//       'Jan 6',
//       'Jan 7',
//     ];

//     const data = transactions.map(t => [t.amount, t.unit]);
//     const barColors = ['#e0453d', '#51a9ed'];

//     return {
//       labels,
//       data,
//       barColors,
//     };
//   };
//   const viewShotRef = useRef();
//   const [isCapturing, setIsCapturing] = useState(false);

//   // Function to capture chart and save as PDF, PNG, or JPEG
//   const captureAndSave = async format => {
//     if (isCapturing) return;
//     setIsCapturing(true);

//     try {
//       const uri = await viewShotRef.current.capture(); // Capture chart as image

//       const fileName = uri.substring(uri.lastIndexOf('/') + 1);
//       let downloadPath;

//       // Save as JPEG
//       if (format === 'jpeg') {
//         downloadPath = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName.replace(
//           '.png',
//           '.jpeg',
//         )}`;
//         await saveAsJPEG(uri, downloadPath);
//         Toast.show('Image saved in  Download folder', {
//           type: 'success',
//           placement: 'top',
//           duration: 3000,
//           offset: 30,
//           animationType: 'slide-in',
//         }); // Assume saveAsJPEG is implemented correctly
//         // Alert.alert('Success', 'Image saved as JPEG!');
//       }

//       // Save as PNG
//       else if (format === 'png') {
//         downloadPath = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`;
//         await saveAsPNG(uri, downloadPath);
//         Toast.show('Image saved in download folder ', {
//           type: 'success',
//           placement: 'top',
//           duration: 3000,
//           offset: 30,
//           animationType: 'slide-in',
//         }); // Assume saveAsPNG is implemented correctly
//         // Alert.alert('Success', 'Image saved as PNG!');
//       }

//       // Save as PDF
//       else if (format === 'pdf') {
//         await generatePDF(uri, pdfFilePath); // Generate PDF with captured image
//         Alert.alert('Success', 'PDF generated successfully!');
//       }
//     } catch (error) {
//       console.error('Failed to capture the chart:', error);
//       Alert.alert('Error', 'Failed to capture the chart. Please try again.');
//     } finally {
//       setIsCapturing(false);
//     }
//   };

//   // Capture chart and save in the selected format
//   // const captureAndSave = async format => {
//   //   if (isCapturing) return;
//   //   setIsCapturing(true);

//   //   try {
//   //     const uri = await viewShotRef.current.capture(); // Capture the chart as an image
//   //     console.log('Captured Image URI:', uri);

//   //     const fileName = uri.substring(uri.lastIndexOf('/') + 1);

//   //     // Define paths for different formats
//   //     let downloadPath;
//   //     if (format === 'jpeg') {
//   //       downloadPath = `${RNFS.DownloadDirectoryPath}/${fileName.replace(
//   //         '.png',
//   //         '.jpeg',
//   //       )}`;
//   //       await saveAsJPEG(uri, downloadPath);
//   //       console.log('Image saved as JPEG to:', downloadPath);
//   //       Alert.alert('Success', 'Image saved as JPEG!');
//   //     } else if (format === 'png') {
//   //       downloadPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
//   //       await saveAsPNG(uri, downloadPath);
//   //       console.log('Image saved as PNG to:', downloadPath);
//   //       Alert.alert('Success', 'Image saved as PNG!');
//   //     } else if (format === 'pdf') {
//   //       // await generatePDF(uri);
//   //       const pdfFilePath = `${RNFetchBlob.fs.dirs.DownloadDir}/chart.pdf`;

//   //       // Generate PDF with the captured image
//   //       await generatePDF(uri, pdfFilePath);

//   //       Alert.alert('Success', 'PDF generated successfully!');
//   //     }
//   //   } catch (error) {
//   //     console.error('Failed to capture the chart:', error);
//   //     Alert.alert('Error', 'Failed to capture the chart. Please try again.');
//   //   } finally {
//   //     setIsCapturing(false);
//   //   }
//   // };

//   // Function to save captured image as JPEG
//   const saveAsJPEG = async (uri, downloadPath) => {
//     const response = await RNFetchBlob.fs.readFile(uri, 'base64'); // Read image as base64
//     await RNFetchBlob.fs.writeFile(downloadPath, response, 'base64'); // Write image as JPEG to Download folder
//   };

//   // Function to save captured image as PNG
//   const saveAsPNG = async (uri, downloadPath) => {
//     const response = await RNFetchBlob.fs.readFile(uri, 'base64'); // Read image as base64
//     await RNFetchBlob.fs.writeFile(downloadPath, response, 'base64'); // Write image as PNG to Download folder
//   };

//   const openPDF = async () => {
//     try {
//       const uri = await viewShotRef.current.capture();

//       console.log('Captured URI:', uri);

//       const {fs} = RNFetchBlob;
//       const fileName = uri.substring(uri.lastIndexOf('/') + 1);

//       const downloadDir =
//         Platform.OS === 'android' ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;
//       const path = `${downloadDir}/${fileName}`;

//       const data = await fs.readFile(uri, 'base64');

//       await fs.writeFile(path, data, 'base64');

//       console.log('File written to:', path);
//       Toast.show('Please complete your profile.', {
//         type: 'warning',
//         placement: 'top',
//         duration: 3000,
//         offset: 30,
//         animationType: 'slide-in',
//       });
//       Alert.alert(
//         'Success',
//         'File saved successfully to the Downloads folder.',
//       );
//     } catch (error) {
//       Alert.alert('Error', 'Failed to move the file. Please try again.');
//       console.error('Download error:', error);
//     }
//   };

//   const chartData = generateChartData(transaction);
//   const handleBarPress = data => {
//     // Show the tooltip when a bar is pressed
//     setTooltip({
//       label: chartData.labels[data.index],
//       amount: data.value[0],
//       unit: data.value[1],
//     });
//   };
//   const renderTransaction = ({item}) => (
//     <TouchableOpacity
//       style={{
//         backgroundColor: 'white',
//         borderRadius: 4,
//         marginVertical: 7,
//         borderWidth: 1,
//         borderColor: '#DEE1E6',
//         minHeight: 74,
//         marginHorizontal: 20,
//       }}>
//       <View
//         style={{
//           marginHorizontal: 16,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           marginVertical: 9,
//         }}>
//         <View style={{flexDirection: 'row'}}>
//           <View style={{justifyContent: 'center'}}>
//             <Text
//               style={{
//                 color: '#171A1FFF',
//                 lineHeight: 18,
//                 fontSize: 14,
//                 fontWeight: '600',
//                 fontFamily: 'Catamaran-Bold',
//               }}>
//               Meter No. #{item.meterNumber}
//             </Text>
//             <Text
//               style={{
//                 color: '#4CAF50', // Assuming COLOR_LIST.WALLET_POSITIVE is green
//                 fontWeight: '800',
//                 marginTop: 10,
//                 fontFamily: 'Catamaran-Bold',
//                 textAlign: 'left',
//               }}>
//               {item.createdAt.split(' ')[0]}
//             </Text>
//           </View>
//         </View>

//         <View style={{marginVertical: 10}}>
//           <Text
//             style={{
//               color: '#000',
//               lineHeight: 22,
//               fontSize: 14,
//               fontFamily: 'Catamaran-Bold',
//               textAlign: 'right',
//             }}>
//             R {item.stdAmt}
//           </Text>
//           <View style={{marginTop: 10}}>
//             <Text
//               style={{
//                 color: '#9095A1FF',
//                 fontWeight: '400',
//                 textAlign: 'right',
//                 fontFamily: 'Catamaran-Regular',
//               }}>
//               {item.createdAt.split(' ')[1]}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: COLOR_LIST.SCREEN_BG,
//       }}
//       horizontal={false}>
//       <BackNavigation
//         title={'My Purchase'}
//         screenName={'dashBoard'}
//         isRightIcon={true}
//       />
//       <ScrollView style={{flex: 1}} horizontal={false}>
//         <View style={{flex: 1, marginVertical: 10}}>
//           <View
//             style={{
//               flex: 0.9,
//               backgroundColor: '#252D3FFF',
//               borderRadius: 20,
//               marginHorizontal: 20,
//             }}>
//             <View style={{height: 60, marginTop: 20}}>
//               <Dropdown
//                 style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
//                 textStyle={styles.selectedTextStyle}
//                 itemTextStyle={styles.selectedTextStyle}
//                 placeholderStyle={[
//                   styles.selectedTextStyle,
//                   {marginHorizontal: 20},
//                 ]}
//                 selectedTextStyle={[
//                   styles.selectedTextStyle,
//                   {marginHorizontal: 0},
//                 ]}
//                 // labelField={styles.selectedTextStyle}
//                 iconStyle={styles.iconStyle}
//                 data={stsMeterData}
//                 maxHeight={200}
//                 labelField="name"
//                 valueField="name"
//                 placeholder={'Select Meter '}
//                 value={selectedValue}
//                 onFocus={() => setIsFocus(true)}
//                 onChange={item => {
//                   // Update the selected value

//                   setSelectedValue(item.name);
//                   setErrorObj({meterNumber: ''});
//                 }}
//               />
//               {errorObj.meterNumber != '' && (
//                 <Text>{errorObj.meterNumber}</Text>
//               )}
//             </View>
//             <View
//               style={{
//                 flex: 1,
//                 marginTop: 16,
//                 marginHorizontal: 20,
//                 backgroundColor: 'white',
//                 borderRadius: 26,
//               }}>
//               <View style={{flex: 1}}>
//                 <FlatList
//                   data={transationPeroid}
//                   horizontal
//                   scrollEnabled={false}
//                   contentContainerStyle={{
//                     justifyContent: 'space-between',
//                     flexDirection: 'row',
//                     width: '100%',
//                   }}
//                   renderItem={({item}) => (
//                     <TouchableOpacity onPress={() => handleViewClick(item)}>
//                       <View
//                         style={{
//                           height: 39,
//                           backgroundColor: 'white',
//                           borderRadius: 28,
//                           backgroundColor:
//                             selectedView?.name === item.name
//                               ? COLOR_LIST.PRIMARY
//                               : COLOR_LIST.BRIGHT_BG,
//                           justifyContent: 'center',
//                           paddingHorizontal: 10,
//                           marginHorizontal: 0,
//                         }}>
//                         <Text
//                           style={{
//                             fontSize: 14,
//                             textAlign: 'center',
//                             color:
//                               selectedView?.name === item.name
//                                 ? COLOR_LIST.BRIGHT_BG
//                                 : COLOR_LIST.TEXT,
//                           }}>
//                           {item.name}
//                         </Text>
//                       </View>
//                     </TouchableOpacity>
//                   )}
//                   keyExtractor={item => item.id}
//                 />
//               </View>

//               {/* Render content based on the selected view */}

//               {selectedView?.name === 'Custom' && (
//                 <View style={{marginVertical: 10}}>
//                   <View style={{flexDirection: 'row'}}>
//                     <View style={{flex: 0.5, marginHorizontal: 10}}>
//                       <Text style={{color: 'black'}}>From</Text>
//                       <TouchableOpacity
//                         style={{backgroundColor: 'white'}}
//                         onPress={() => setModalVisibleCalender(true)}>
//                         <View
//                           style={{
//                             flex: 1,
//                             backgroundColor: 'white',
//                             height: 45,
//                             borderRadius: 6,
//                             justifyContent: 'center',
//                             alignContent: 'center',
//                           }}>
//                           <Text
//                             style={{
//                               paddingHorizontal: 5,
//                               fontSize: 14,
//                               color: 'black',
//                             }}>
//                             {selectedDate}
//                           </Text>
//                         </View>
//                       </TouchableOpacity>
//                     </View>
//                     <View style={{flex: 0.5, marginHorizontal: 10}}>
//                       <Text style={{color: 'black'}}>To</Text>
//                       <TouchableOpacity
//                         style={{backgroundColor: 'white'}}
//                         onPress={() => setModalVisibleToCalender(true)}>
//                         <View
//                           style={{
//                             flex: 1,
//                             marginVertical: 2,
//                             height: 45,
//                             borderRadius: 6,
//                             justifyContent: 'center',
//                             alignContent: 'center',
//                           }}>
//                           <Text
//                             style={{
//                               fontSize: 14,
//                               paddingHorizontal: 5,
//                               color: 'black',
//                             }}>
//                             {selectedToDate}
//                           </Text>
//                         </View>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </View>
//               )}
//             </View>

//             <TouchableHighlight
//               onPress={() => onClickHandleSubmit()}
//               underlayColor="transparent"
//               style={{marginTop: 10, alignItems: 'center'}}>
//               <View
//                 style={{
//                   width: 164,
//                   height: 50,
//                   marginVertical: 10,
//                   // paddingHorizontal: 10,
//                   borderRadius: 25,
//                   backgroundColor: '#EC3237FF',
//                   flexDirection: 'row',
//                   //  marginHorizontal:30,
//                   // justifyContent:'center',
//                   alignItems: 'center',
//                 }}>
//                 <Image
//                   style={{width: 24, height: 24, marginLeft: 40}}
//                   source={Check}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     color: '#ffff',
//                     fontSize: 18,
//                     fontWeight: '400',
//                     textAlign: 'center',
//                     paddingLeft: 5,
//                   }}>
//                   SUBMIT{' '}
//                 </Text>
//               </View>
//             </TouchableHighlight>
//             <View
//               style={{
//                 // flex: 0.03,
//                 justifyContent: 'flex-end',
//                 borderBottomLeftRadius: 30,
//                 borderBottomRightRadius: 30,
//                 borderColor: '#EC3237FF',
//                 marginHorizontal: 6,
//                 borderWidth: 4,
//               }}></View>
//           </View>

//           <View
//             style={{
//               marginTop: 20,
//               marginHorizontal: 20,
//               height: 100,
//               backgroundColor: '#252D3FFF',
//               borderRadius: 20,
//             }}>
//             <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 10}}>
//               <View
//                 style={{
//                   flex: 0.55,
//                   //   justifyContent: 'center',
//                   alignItems: 'flex-start',
//                   //   paddingLeft: 25,
//                   marginHorizontal: 10,
//                   marginVertical: 15,
//                 }}>
//                 <Text
//                   style={{
//                     fontFamily: 'Catamaran-Bold',
//                     fontSize: 20,
//                     fontWeight: '600',
//                     // lineHeight: 20,

//                     color: '#FFFFFFFF',
//                   }}>
//                   Total Purchase
//                 </Text>
//                 <Text
//                   style={{
//                     fontWeight: 700,
//                     fontSize: 30,
//                     marginTop: 10,
//                     // lineHeight: 56,
//                     color: 'white',
//                     // balanceData.accountBalance > 0
//                     //   ? COLOR_LIST.WALLET_POSITIVE
//                     //   : COLOR_LIST.WALLET_NEGATIVE,
//                   }}>
//                   300 kWh
//                 </Text>
//               </View>

//               <View
//                 style={{
//                   flex: 0.45,
//                   //   justifyContent: 'space-between',
//                   //   alignContent: 'flex-end',
//                 }}>
//                 <View
//                   style={{
//                     flexDirection: 'column',
//                     // justifyContent: 'flex-end',
//                     alignItems: 'flex-end',
//                     marginTop: 10,
//                   }}>
//                   <Text
//                     style={{
//                       fontFamily: 'Catamaran-Bold',
//                       fontSize: 12,
//                       fontWeight: '400',
//                       //   lineHeight: 25,
//                       color: '#FFFFFFFF',
//                       //   marginTop: 20,
//                       //   textAlign: 'right',
//                     }}>
//                     Last Purchase : R 100
//                   </Text>
//                   <Text
//                     style={{
//                       fontFamily: 'Catamaran-Bold',
//                       fontSize: 12,
//                       fontWeight: '400',
//                       //   lineHeight: 25,
//                       color: '#FFFFFFFF',
//                     }}>
//                     On 20 sep 2023
//                   </Text>
//                   <Pressable
//                     onPress={{}}
//                     style={{
//                       width: '100%',
//                       marginTop: 10,
//                       //   marginRight: 16,
//                       backgroundColor: '#ffff',
//                       borderColor: '#FFFFFFFF',
//                       borderWidth: 2,
//                       height: 36,
//                       borderRadius: 5,
//                       justifyContent: 'flex-end',
//                     }}>
//                     <Text
//                       style={{
//                         fontSize: 16,
//                         textAlign: 'center',
//                         fontWeight: '400',
//                         lineHeight: 30,
//                         color: 'black',
//                       }}>
//                       Purchase Now
//                     </Text>
//                   </Pressable>
//                 </View>
//               </View>
//             </View>

//             <View
//               style={{
//                 flex: 0.03,
//                 justifyContent: 'flex-end',
//                 borderBottomLeftRadius: 30,
//                 borderBottomRightRadius: 30,
//                 backgroundColor: '#EC3237',
//                 marginHorizontal: 12,
//               }}></View>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'center',
//               marginTop: 20,
//             }}>
//             {labelData.map((item, index) => (
//               <View
//                 key={index}
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginHorizontal: 10,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}>
//                 <View
//                   style={{
//                     width: 12,
//                     height: 12,
//                     backgroundColor: item.color,
//                     marginRight: 5,
//                   }}
//                 />
//                 <Text style={styles.exportext}>{item.label}</Text>
//               </View>
//             ))}
//           </View>

//           {/* <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginHorizontal: 25,
//             }}> */}
//           <ViewShot
//             ref={viewShotRef}
//             options={{format: 'png', quality: 0.9}}
//             style={styles.chartContainer}>
//             <StackedBarChart
//               data={chartData}
//               width={Dimensions.get('window').width - 25} // Smaller width (less padding)
//               height={350} // Smaller height
//               chartConfig={{
//                 backgroundColor: COLOR_LIST.SCREEN_BG,
//                 backgroundGradientFrom: COLOR_LIST.SCREEN_BG,
//                 backgroundGradientTo: COLOR_LIST.SCREEN_BG,
//                 decimalPlaces: 0,
//                 color: (opacity = 1) => `rgba(72, 133, 237, ${opacity})`,
//                 labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                 barPercentage: 0.7,
//                 propsForBackgroundLines: {
//                   strokeWidth: 1,
//                   stroke: '#ccc',
//                   // strokeDasharray: '3 3',
//                 },
//               }}
//               style={{
//                 borderRadius: 16,
//                 // marginHorizontal: 10,
//                 shadowColor: '#000',
//                 shadowOffset: {width: 0, height: 2},
//                 shadowOpacity: 0.1,
//                 shadowRadius: 5,
//                 elevation: 5,
//               }}
//             />
//           </ViewShot>
//           <View style={styles.buttonContainer}>
//             <TouchableHighlight
//               style={styles.exportTextContainer}
//               onPress={() => captureAndSave('png')}>
//               <Text style={styles.exportext}>Export as PNG</Text>
//             </TouchableHighlight>
//             <TouchableHighlight
//               style={styles.exportTextContainer}
//               onPress={() => captureAndSave('jpeg')}>
//               <Text style={styles.exportext}>Export as JPEG</Text>
//             </TouchableHighlight>
//             {/* <TouchableHighlight
//               style={styles.exportTextContainer}
//               onPress={() => captureAndSave('pdf')}>
//               <Text style={styles.exportext}>Export as PDF</Text>
//             </TouchableHighlight> */}
//             {/* <Button title="Export Chart" onPress={captureChart} /> */}
//           </View>
//           {/* {fileUri && (
//             <WebView
//               source={{uri: `file://${fileUri}`}} // Make sure file path is correct
//               style={{flex: 1}}
//               startInLoadingState={true}
//               onError={e => console.log('WebView error: ', e.nativeEvent)}
//             />
//           )} */}
//           <FlatList
//             data={purchaseList}
//             renderItem={renderTransaction}
//             keyExtractor={(item, index) => item.meterId || index.toString()}
//             ListEmptyComponent={() => (
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   marginTop: 50,
//                 }}>
//                 <Text>No Transaction Found</Text>
//               </View>
//             )}
//           />
//         </View>
//       </ScrollView>

//       <Bottom currentPage={'Dashboard'} />
//       <Modal
//         animationType="none"
//         transparent={true}
//         visible={modalVisibleCalender}
//         onRequestClose={() => {
//           setModalVisibleCalender(false);
//         }}
//         onDismiss={() => {
//           setModalVisibleCalender(false);
//         }}>
//         <Pressable
//           style={styles.modalContainer}
//           onPress={() => {
//             setModalVisibleCalender(false);
//           }}>
//           <View>
//             <View style={styles.modalContent}>
//               <CalendarPicker
//                 maxDate={Date()}
//                 startFromMonday={true}
//                 scrollable={true}
//                 todayBackgroundColor="#f2e6ff"
//                 selectedDayColor={COLOR_LIST.PRIMARY}
//                 selectedDayTextColor="#FFFFFF"
//                 onDateChange={date => {
//                   onClickSelectDate(date);
//                 }}
//               />
//             </View>
//           </View>
//         </Pressable>
//       </Modal>

//       <Modal
//         animationType="none"
//         transparent={true}
//         visible={modalVisibleToCalender}
//         onRequestClose={() => {
//           setModalVisibleToCalender(false);
//         }}
//         onDismiss={() => {
//           setModalVisibleToCalender(false);
//         }}>
//         <Pressable
//           style={styles.modalContainer}
//           onPress={() => {
//             setModalVisibleToCalender(false);
//           }}>
//           <View>
//             <View style={styles.modalContent}>
//               <CalendarPicker
//                 startFromMonday={true}
//                 scrollable={true}
//                 todayBackgroundColor="#f2e6ff"
//                 selectedDayColor="#7300e6"
//                 selectedDayTextColor="#FFFFFF"
//                 onDateChange={date => {
//                   onClickSelectToDate(date);
//                 }}
//               />
//             </View>
//           </View>
//         </Pressable>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   dropdown: {
//     marginHorizontal: 16,
//     marginTop: 10,
//     height: 53,
//     borderBottomColor: 'gray',
//     borderBottomWidth: 0.5,
//     backgroundColor: 'white',
//     borderRadius: 26,
//   },
//   chartContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',

//     alignItems: 'center',
//     marginHorizontal: 50,
//     // paddingHorizontal: 10,
//   },
//   imageStyle: {
//     width: 32,
//     height: 32,
//     marginHorizontal: 16,
//   },
//   placeholderStyle: {
//     fontSize: 10,
//   },
//   selectedTextStyle: {
//     color: COLOR_LIST.TEXT,
//     fontFamily: COLOR_LIST.FONT_REGULAR,
//     fontSize: 16,
//     fontStyle: 'normal',
//     fontWeight: '400',
//     // marginHorizontal:2,
//     // marginHorizontal: 10,
//     paddingHorizontal: 5,
//     // lineHeight: 50,
//     alignItems: 'center',
//   },
//   itemTextStyle: {
//     color: COLOR_LIST.TEXT,
//     fontFamily: COLOR_LIST.FONT_REGULAR,
//     fontSize: 16,
//     fontStyle: 'normal',
//     fontWeight: '400',
//     // marginHorizontal:10,
//     paddingHorizontal: 5,
//     // lineHeight: 20,
//   },
//   iconStyle: {
//     width: 24,
//     height: 24,
//     marginHorizontal: 10,
//   },
//   inputSearchStyle: {
//     height: 22,
//     fontSize: 20,
//   },
//   itemMainView: {
//     flex: 1,
//     flexDirection: 'row',
//     marginVertical: 10,
//   },
//   mainView: {
//     // flex: 0.1,
//     // marginHorizontal: 18,
//     // justifyContent: 'center',
//   },
//   exportext: {
//     color: 'black',
//   },
//   text: {
//     fontSize: 12,
//     fontWeight: '600',
//     lineHeight: 20,
//     color: '#FFFFFFFF',
//     fontFamily: 'Catamaran-Bold',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: BackgroundColor,
//     padding: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//     width: 380,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   alertBox: {
//     backgroundColor: 'white',
//     paddingBottom: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     width: '90%',
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
//   exportTextContainer: {
//     fontSize: 10,
//     backgroundColor: 'white',
//     borderColor: 'black',
//     borderRadius: 20,
//     // height: 20,
//     borderWidth: 2,
//     padding: 3,
//     paddingHorizontal: 10,
//   },
// });

// export default Purchase_History;

import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  View,
  Modal,
  Pressable,
  FlatList,
  Button,
  Alert,
  Linking,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {BackgroundColor} from '../../helpers/constants';
import BackNavigation from '../../components/backNavigation';
import {Image} from '@rneui/base';
import {SelectCountry} from 'react-native-element-dropdown';
import editIcon from '../../assets/Edit.png';
import {useNavigation} from '@react-navigation/native';
import noProperty from '../../assets/dashboard/noProperty.png';
import Bottom from '../../components/Bottom';
import {
  transacitionMasters,
  transactionSummary,
} from '../../redux/slice/transacitionMasters';
//*Images
import Remove from '../../assets/remove.png';
import mail from '../../assets/outgoingMail.png';
import Check from '../../assets/check.png';
import download from '../../assets/downloadIcon.png';
import {COMPANY_ID} from '../../helpers/enum';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLOR_LIST} from '../../helpers/colorlist';
import {Toast, useToast} from 'react-native-toast-notifications';

import {Dimensions} from 'react-native';
import {getWidthByScreenSize} from '../../helpers/commonFunction';
import {
  downloadTransactionStatement,
  resetDownloadTransactionStatement,
} from '../../redux/slice/downloadTransactionStatement';
import RNFetchBlob from 'rn-fetch-blob';
import {
  downloadPurchaseReceipt,
  resetDownloadState,
} from '../../redux/slice/downloadPurchaseReceipt';
import {SendToEmailBtn} from '../../components/common';
import {BarChart, LineChart, StackedBarChart} from 'react-native-chart-kit';
import WebView from 'react-native-webview';
import {Platform} from 'react-native';
import {getStsMeterList} from '../../redux/slice/getStsMeterList';
import {getTransactionList} from '../../redux/slice/purchaseTransactionList';
import {ActivityIndicator} from 'react-native';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
const Purchase_History = () => {
  const [selectedView, setSelectedView] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [noMasterDataFound, setNoMasterDataFound] = useState(false);
  //   const {screenHeight, screenWidth} = Dimensions.get('window');
  const [buttonTitle, setButtonTitle] = useState('DOWNLOAD');
  const [buttonTitleForEmail, setButtonTitleForEmail] =
    useState('SEND TO EMAIL');

  const toast = useToast();

  const {
    stsMeterIsLoading,
    stsMeterData,
    stsMeterIsSuccess,
    stsMeterIsError,
    errorMessage,
  } = useSelector(state => state.stsMeter);
  const [meterList, setMeterList] = useState([]);
  useEffect(() => {
    if (stsMeterData && stsMeterIsSuccess == true) {
      setMeterList(stsMeterData);
    }
  }, [stsMeterData, stsMeterIsSuccess]);

  // console.log(stsMeterData, 'stsMeterData');
  const {
    purchaseTransactionIsLoading,
    purchaseTransactionIsData,
    purchaseTransactionIsSuccess,
    purchaseTransactionIsError,
  } = useSelector(state => state.transactionList);

  const [selectedValue, setSelectedValue] = useState(null);

  // console.log('==========tsts==========================');
  const [purchaseList, setPurchaseList] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');
  useEffect(() => {
    if (
      purchaseTransactionIsData != null &&
      selectedValue != null &&
      purchaseTransactionIsSuccess == true
    ) {
      setPurchaseList(purchaseTransactionIsData?.stsTopUpTransaction);
      setTotalAmount(purchaseTransactionIsData?.totalPurchase);
      setIsLoading(false);
    }
  }, [
    purchaseTransactionIsData,
    purchaseTransactionIsSuccess,
    purchaseTransactionIsLoading,
    purchaseList,
  ]);
  console.log(purchaseTransactionIsData, 'purchaseTransactionIsData');
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    purchaseloading,
    purchaseDownloaddata,
    purchaseSuccess,
    purchaseError,
  } = useSelector(state => state.downloadReceipt);

  const [isDownload, setIsDownload] = useState(false);
  const [reciptTitle, setReciptTitle] = useState('RECEIPT');
  const [tooltip, setTooltip] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Assuming you are fetching data here
  // useEffect(() => {
  //   if (purchaseSuccess && purchaseDownloaddata && !purchaseError) {
  //     const downloadFile = async () => {
  //       const fileUrl = purchaseDownloaddata?.purchaceReceiptUrl;

  //       try {
  //         const response = await RNFetchBlob.config({
  //           fileCache: true,
  //           addAndroidDownloads: {
  //             useDownloadManager: true,
  //             notification: true,
  //             path: `${RNFetchBlob.fs.dirs.DownloadDir}/${fileUrl.substring(
  //               fileUrl.lastIndexOf('/') + 1,
  //             )}`,
  //             description: 'File downloaded by download manager.',
  //           },
  //         }).fetch('GET', fileUrl);

  //         // Display success message
  //         toast.show('Purchase statement downloaded successfully!', {
  //           type: 'success',
  //           placement: 'top',
  //           duration: 3000,
  //           offset: 30,
  //           animationType: 'zoom-in',
  //         });
  //         setIsModalVisible(false);
  //       } catch (error) {
  //         toast.show('Failed to download the file.', {
  //           type: 'danger',
  //           placement: 'top',
  //           duration: 3000,
  //           offset: 30,
  //           animationType: 'zoom-in',
  //         });

  //         console.error('File download error:', error);
  //       } finally {
  //         setIsDownload(false);
  //         setReciptTitle('RECEIPT');
  //         dispatch(resetDownloadState());
  //       }
  //     };

  //     downloadFile();
  //   }
  // }, [purchaseSuccess, purchaseError, purchaseDownloaddata]);

  const handleViewClick = view => {
    setSelectedView(view);
  };

  // const getViewBackgroundColor = view => {
  //   return selectedView === view ? 'red' : 'white';
  // };
  // const getViewTextColor = view => {
  //   return selectedView === view ? 'white' : 'black';
  // };

  const [transationPeroid, setTransationPeroid] = useState([
    {id: 1, name: 'Last Month', otherText: null},
    {id: 2, name: 'This Month', otherText: null},
    {id: 3, name: 'Custom', otherText: null},
  ]);
  // // const [transactionlist, setTransactionlist] = useState(null);

  // const [transactionList, setTransactionList] = useState([]);

  // useEffect(() => {
  //   if (
  //     masterTransacitionData.propertyList &&
  //     masterTransacitionData.transactionPeriod &&
  //     masterTransacitionSuccess === true &&
  //     masterTransacitionIsError === false &&
  //     masterTransacitionIsLoading === false
  //   ) {
  //     setMeterList(masterTransacitionData.propertyList);
  //     //   setTransationPeroid(masterTransacitionData.transactionPeriod);
  //   } else {
  //     setMeterList([]);
  //     //   setTransationPeroid([]);
  //   }
  //   if (masterTransacitionData.propertyList?.length > 0) {
  //     setNoMasterDataFound(false);
  //   } else if (masterTransacitionData.propertyList?.length === 0) {
  //     setNoMasterDataFound(true);
  //   } else {
  //     setNoMasterDataFound(true);
  //   }
  // }, [masterTransacitionData]);

  // useEffect(() => {
  //   setDataLoaded(true);

  //   setTransactionList(transactionData?.transaction);
  // }, [transactionData, transactionSuccess]);

  useEffect(() => {
    // setDataLoaded(false);
    masterTransactionData();
  }, []);
  const formattedDateFor = str => {
    const datePart = str?.split(' ')[1];
    const [year, month, day] = datePart?.split('-');
    return `${parseInt(day)}-${parseInt(month)}-${year}`;
  };

  const masterTransactionData = async () => {
    let userId = await AsyncStorage.getItem('userId');
    let id = parseInt(userId);
    let dataObj = {
      ownerId: id,
      companyId: COMPANY_ID,
    };
    dispatch(getStsMeterList(dataObj));
  };
  // //  datePick logic

  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('YYYY/MM/DD');
  // const [selectedDate, setSelectedDate] = useState('DD/MM/YYYY');
  const [modalVisibleCalender, setModalVisibleCalender] = useState(false);
  const [selectedToDate, setSelectedToDate] = useState('DD/MM/YYYY');
  const [modalVisibleToCalender, setModalVisibleToCalender] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const onClickSelectDate = async date => {
    let selectedDate = moment(date).format('DD/MM/YYYY');
    setSelectedDate(selectedDate);
    setModalVisibleCalender(false);
  };
  const onClickSelectToDate = async date => {
    let selectedToDate = moment(date).format('DD/MM/YYYY');
    setSelectedToDate(selectedToDate);
    setModalVisibleToCalender(false);
  };

  // const [selectedTransaction, setSelectedTransaction] = useState(null);
  // const [isModalVisible, setIsModalVisible] = useState(false);

  const [errorObj, setErrorObj] = useState({
    meterNumber: '',
    TransactionPeriod: '',
    periodDate: '',
  }); // Initialize with null or any initial value you prefer
  const onClickHandleSubmit = async () => {
    if (
      !selectedValue ||
      !selectedView ||
      ((selectedView.name === 'Custom' || selectedView.name === 3) &&
        (selectedDate === 'DD/MM/YYYY' || selectedToDate === 'DD/MM/YYYY'))
    ) {
      Toast.show('Please select filters to get transaction summary!', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
      return;
    }

    let fromDate, toDate;

    if (selectedView.name === 'Custom' || selectedView.name === 3) {
      fromDate =
        selectedDate === 'DD/MM/YYYY'
          ? moment()
          : moment(selectedDate, 'DD/MM/YYYY');
      toDate =
        selectedToDate === 'DD/MM/YYYY'
          ? moment()
          : moment(selectedToDate, 'DD/MM/YYYY');

      if (fromDate.isAfter(moment()) || toDate.isAfter(moment())) {
        Toast.show('Dates should not be future dates.', {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
        return;
      }

      if (fromDate.isAfter(toDate)) {
        Toast.show('"From date" should be less than "To date".', {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
        return;
      }

      if (fromDate.isBefore(moment().subtract(90, 'days'))) {
        Toast.show('From date should not be more than 90 days ago.', {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
        return;
      }

      let diffInDays = toDate.diff(fromDate, 'days');
      if (diffInDays > 90) {
        Toast.show('Statement period should not be more than 90 days.', {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
        return;
      }
    } else if (selectedView.name === 'Last Month') {
      fromDate = moment().subtract(30, 'days');
      toDate = moment();
    } else if (selectedView.name === 'This Month') {
      fromDate = moment().startOf('month');
      toDate = moment();
    }

    let dataObj = {
      meter: selectedValue,
      StsTransactionPeriod: selectedView.id,
      fromDate: fromDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      toDate: toDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    };
    setIsLoading(true);
    console.log(dataObj, 'dataObj');
    dispatch(getTransactionList(dataObj));
  };

  const generateChartData = transactions => {
    // const labels = transactions.map(t => t.date);
    const labels = transactions.map(t => {
      const [day, month, year] = t.date.split('-');
      const date = new Date(year, month - 1, day);
      const formattedDate = `${parseInt(day)} ${date.toLocaleString('en-GB', {
        month: 'short',
      })}`;

      return formattedDate;
    });

    console.log(labels, 'labels');

    const data = transactions.map(t => [t.amount1, t.unit1]);

    const barColors = ['#e0453d', '#51a9ed'];

    return {
      labels,
      data,
      barColors,
    };
  };
  const transactionss = purchaseList?.map(entry => {
    const dateParts = entry.createdAt.split(' ')[1].split('-');
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

    return {
      date: formattedDate,
      amount1: Math.round(parseFloat(entry.stdAmt)),
      unit1: Math.round(parseFloat(entry.stdUnits)),
    };
  });

  const chartData = generateChartData(transactionss);
  // console.log(chartData);

  const labelData = [
    {label: 'Amount', color: '#e0453d'},
    {label: 'Unit', color: '#51a9ed'},
  ];

  // const transaction = [
  //   {date: '01-01-2024', amount: 50, unit: 30, amount: 50, unit: 30},
  //   // {date: '02-01-2024', amount: 50, unit: 35},
  //   // {date: '03-01-2024', amount: 45, unit: 20},
  //   // {date: '04-01-2024', amount: 30, unit: 30},
  //   // {date: '05-01-2024', amount: 67, unit: 40},
  //   // {date: '06-01-2024', amount: 40, unit: 50},
  //   // {date: '07-01-2024', amount: 30, unit: 90},
  // ];

  // const generateChartData = transactions => {
  //   const labels = [
  //     'Jan 1',
  //     'Jan 2',
  //     'Jan 3',
  //     'Jan 4',
  //     'Jan 5',
  //     'Jan 6',
  //     'Jan 7',
  //   ];

  //   const data = transactions.map(t => [t.amount, t.unit]);
  //   const barColors = ['#e0453d', '#51a9ed'];

  //   return {
  //     labels,
  //     data,
  //     barColors,
  //   };
  // };
  const viewShotRef = useRef();
  const [isCapturing, setIsCapturing] = useState(false);

  // Function to capture chart and save as PDF, PNG, or JPEG
  const captureAndSave = async format => {
    if (isCapturing) return;
    setIsCapturing(true);

    try {
      const uri = await viewShotRef.current.capture(); // Capture chart as image

      const fileName = uri.substring(uri.lastIndexOf('/') + 1);
      let downloadPath;

      // Save as JPEG
      if (format === 'jpeg') {
        downloadPath = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName.replace(
          '.png',
          '.jpeg',
        )}`;
        await saveAsJPEG(uri, downloadPath);
        Toast.show('Image saved in  Download folder', {
          type: 'success',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        }); // Assume saveAsJPEG is implemented correctly
        // Alert.alert('Success', 'Image saved as JPEG!');
      }

      // Save as PNG
      else if (format === 'png') {
        downloadPath = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`;
        await saveAsPNG(uri, downloadPath);
        Toast.show('Image saved in download folder ', {
          type: 'success',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        }); // Assume saveAsPNG is implemented correctly
        // Alert.alert('Success', 'Image saved as PNG!');
      }

      // Save as PDF
      else if (format === 'pdf') {
        await generatePDF(uri, pdfFilePath); // Generate PDF with captured image
        Alert.alert('Success', 'PDF generated successfully!');
      }
    } catch (error) {
      console.error('Failed to capture the chart:', error);
      Alert.alert('Error', 'Failed to capture the chart. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  };

  // Capture chart and save in the selected format
  // const captureAndSave = async format => {
  //   if (isCapturing) return;
  //   setIsCapturing(true);

  //   try {
  //     const uri = await viewShotRef.current.capture(); // Capture the chart as an image
  //     console.log('Captured Image URI:', uri);

  //     const fileName = uri.substring(uri.lastIndexOf('/') + 1);

  //     // Define paths for different formats
  //     let downloadPath;
  //     if (format === 'jpeg') {
  //       downloadPath = `${RNFS.DownloadDirectoryPath}/${fileName.replace(
  //         '.png',
  //         '.jpeg',
  //       )}`;
  //       await saveAsJPEG(uri, downloadPath);
  //       console.log('Image saved as JPEG to:', downloadPath);
  //       Alert.alert('Success', 'Image saved as JPEG!');
  //     } else if (format === 'png') {
  //       downloadPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
  //       await saveAsPNG(uri, downloadPath);
  //       console.log('Image saved as PNG to:', downloadPath);
  //       Alert.alert('Success', 'Image saved as PNG!');
  //     } else if (format === 'pdf') {
  //       // await generatePDF(uri);
  //       const pdfFilePath = `${RNFetchBlob.fs.dirs.DownloadDir}/chart.pdf`;

  //       // Generate PDF with the captured image
  //       await generatePDF(uri, pdfFilePath);

  //       Alert.alert('Success', 'PDF generated successfully!');
  //     }
  //   } catch (error) {
  //     console.error('Failed to capture the chart:', error);
  //     Alert.alert('Error', 'Failed to capture the chart. Please try again.');
  //   } finally {
  //     setIsCapturing(false);
  //   }
  // };

  // Function to save captured image as JPEG
  const saveAsJPEG = async (uri, downloadPath) => {
    const response = await RNFetchBlob.fs.readFile(uri, 'base64'); // Read image as base64
    await RNFetchBlob.fs.writeFile(downloadPath, response, 'base64'); // Write image as JPEG to Download folder
  };

  // Function to save captured image as PNG
  const saveAsPNG = async (uri, downloadPath) => {
    const response = await RNFetchBlob.fs.readFile(uri, 'base64'); // Read image as base64
    await RNFetchBlob.fs.writeFile(downloadPath, response, 'base64'); // Write image as PNG to Download folder
  };

  const openPDF = async () => {
    try {
      const uri = await viewShotRef.current.capture();

      console.log('Captured URI:', uri);

      const {fs} = RNFetchBlob;
      const fileName = uri.substring(uri.lastIndexOf('/') + 1);

      const downloadDir =
        Platform.OS === 'android' ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;
      const path = `${downloadDir}/${fileName}`;

      const data = await fs.readFile(uri, 'base64');

      await fs.writeFile(path, data, 'base64');

      Toast.show('Please complete your profile.', {
        type: 'warning',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
      Alert.alert(
        'Success',
        'File saved successfully to the Downloads folder.',
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to move the file. Please try again.');
      console.error('Download error:', error);
    }
  };

  const handleBarPress = data => {
    setTooltip({
      label: chartData.labels[data.index],
      amount: data.value[0],
      unit: data.value[1],
    });
  };
  const renderTransaction = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 4,
          marginVertical: 7,
          borderWidth: 1,
          borderColor: '#DEE1E6',
          minHeight: 74,
          marginHorizontal: 20,
        }}>
        <View
          style={{
            marginHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 9,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  color: '#171A1FFF',
                  lineHeight: 18,
                  fontSize: 14,
                  fontWeight: '600',
                  fontFamily: 'Catamaran-Bold',
                }}>
                Meter No. #{item.meterNumber}
              </Text>
              <Text
                style={{
                  color: '#4CAF50',
                  fontWeight: '800',
                  marginTop: 10,
                  fontFamily: 'Catamaran-Bold',
                  textAlign: 'left',
                }}>
                {item.createdAt.split(' ')[0]}
              </Text>
            </View>
          </View>

          <View style={{marginVertical: 10}}>
            <Text
              style={{
                color: '#000',
                lineHeight: 22,
                fontSize: 14,
                fontFamily: 'Catamaran-Bold',
                textAlign: 'right',
              }}>
              R {item.stdAmt}
            </Text>
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  color: '#9095A1FF',
                  fontWeight: '400',
                  textAlign: 'right',
                  fontFamily: 'Catamaran-Regular',
                }}>
                {item.createdAt.split(' ')[1]}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLOR_LIST.SCREEN_BG,
      }}
      horizontal={false}>
      <BackNavigation
        title={'My Purchase'}
        screenName={'dashBoard'}
        isRightIcon={true}
      />
      <ScrollView style={{flex: 1}} horizontal={false}>
        <View style={{flex: 1, marginVertical: 10}}>
          <View
            style={{
              flex: 0.9,
              backgroundColor: '#252D3FFF',
              borderRadius: 20,
              marginHorizontal: 20,
            }}>
            <View style={{height: 60, marginTop: 20}}>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                textStyle={styles.selectedTextStyle}
                itemTextStyle={styles.selectedTextStyle}
                placeholderStyle={[
                  styles.selectedTextStyle,
                  {marginHorizontal: 20},
                ]}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  {marginHorizontal: 0},
                ]}
                iconStyle={styles.iconStyle}
                data={meterList}
                maxHeight={200}
                labelField="name"
                valueField="name"
                placeholder={'Select Meter '}
                value={selectedValue}
                onFocus={() => setIsFocus(true)}
                onChange={item => {
                  // Update the selected value

                  setSelectedValue(item.name);
                  setErrorObj({meterNumber: ''});
                }}
              />
              {errorObj.meterNumber != '' && (
                <Text>{errorObj.meterNumber}</Text>
              )}
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 16,
                marginHorizontal: 20,
                backgroundColor: 'white',
                borderRadius: 26,
              }}>
              <View style={{flex: 1}}>
                <FlatList
                  data={transationPeroid}
                  horizontal
                  scrollEnabled={false}
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '100%',
                  }}
                  renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleViewClick(item)}>
                      <View
                        style={{
                          height: 39,
                          backgroundColor: 'white',
                          borderRadius: 28,
                          backgroundColor:
                            selectedView?.name === item.name
                              ? COLOR_LIST.PRIMARY
                              : COLOR_LIST.BRIGHT_BG,
                          justifyContent: 'center',
                          paddingHorizontal: 10,
                          marginHorizontal: 0,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            textAlign: 'center',
                            color:
                              selectedView?.name === item.name
                                ? COLOR_LIST.BRIGHT_BG
                                : COLOR_LIST.TEXT,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id}
                />
              </View>

              {/* Render content based on the selected view */}

              {selectedView?.name === 'Custom' && (
                <View style={{marginVertical: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.5, marginHorizontal: 10}}>
                      <Text style={{color: 'black'}}>From</Text>
                      <TouchableOpacity
                        style={{backgroundColor: 'white'}}
                        onPress={() => setModalVisibleCalender(true)}>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: 'white',
                            height: 45,
                            borderRadius: 6,
                            justifyContent: 'center',
                            alignContent: 'center',
                          }}>
                          <Text
                            style={{
                              paddingHorizontal: 5,
                              fontSize: 14,
                              color: 'black',
                            }}>
                            {selectedDate}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 0.5, marginHorizontal: 10}}>
                      <Text style={{color: 'black'}}>To</Text>
                      <TouchableOpacity
                        style={{backgroundColor: 'white'}}
                        onPress={() => setModalVisibleToCalender(true)}>
                        <View
                          style={{
                            flex: 1,
                            marginVertical: 2,
                            height: 45,
                            borderRadius: 6,
                            justifyContent: 'center',
                            alignContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              paddingHorizontal: 5,
                              color: 'black',
                            }}>
                            {selectedToDate}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>

            <TouchableHighlight
              onPress={() => onClickHandleSubmit()}
              underlayColor="transparent"
              style={{marginTop: 10, alignItems: 'center'}}>
              <View
                style={{
                  width: 164,
                  height: 50,
                  marginVertical: 10,
                  // paddingHorizontal: 10,
                  borderRadius: 25,
                  backgroundColor: '#EC3237FF',
                  flexDirection: 'row',
                  //  marginHorizontal:30,
                  // justifyContent:'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 24, height: 24, marginLeft: 40}}
                  source={Check}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: '#ffff',
                    fontSize: 18,
                    fontWeight: '400',
                    textAlign: 'center',
                    paddingLeft: 5,
                  }}>
                  SUBMIT{' '}
                </Text>
              </View>
            </TouchableHighlight>
            <View
              style={{
                // flex: 0.03,
                justifyContent: 'flex-end',
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                borderColor: '#EC3237FF',
                marginHorizontal: 6,
                borderWidth: 4,
              }}></View>
          </View>

          {isLoading ? (
            // Loader component - This will be shown when data is loading
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 90,
              }}>
              <ActivityIndicator size="large" color="black" />
              <Text style={{color: 'black', marginTop: 10}}>Loading...</Text>
            </View>
          ) : purchaseTransactionIsData != null &&
            purchaseList.length > 0 &&
            purchaseTransactionIsSuccess == true ? (
            <>
              <View
                style={{
                  marginTop: 20,
                  marginHorizontal: 20,
                  height: 100,
                  backgroundColor: '#252D3FFF',
                  borderRadius: 20,
                }}>
                <View
                  style={{flex: 1, flexDirection: 'row', marginHorizontal: 10}}>
                  <View
                    style={{
                      flex: 0.55,
                      //   justifyContent: 'center',
                      alignItems: 'flex-start',
                      //   paddingLeft: 25,
                      marginHorizontal: 10,
                      marginVertical: 15,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Catamaran-Bold',
                        fontSize: 20,
                        fontWeight: '600',
                        // lineHeight: 20,

                        color: '#FFFFFFFF',
                      }}>
                      Total Purchase
                    </Text>
                    <Text
                      style={{
                        fontWeight: 700,
                        fontSize: 30,
                        marginTop: 10,
                        // lineHeight: 56,
                        color: 'white',
                        // balanceData.accountBalance > 0
                        //   ? COLOR_LIST.WALLET_POSITIVE
                        //   : COLOR_LIST.WALLET_NEGATIVE,
                      }}>
                      {totalAmount} kWh
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 0.45,
                      //   justifyContent: 'space-between',
                      //   alignContent: 'flex-end',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        // justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Catamaran-Bold',
                          fontSize: 12,
                          fontWeight: '400',
                          //   lineHeight: 25,
                          color: '#FFFFFFFF',
                          //   marginTop: 20,
                          //   textAlign: 'right',
                        }}>
                        Last Purchase : {purchaseList[0]?.stdAmt}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Catamaran-Bold',
                          fontSize: 12,
                          fontWeight: '400',
                          //   lineHeight: 25,
                          color: '#FFFFFFFF',
                        }}>
                        On {formattedDateFor(purchaseList[0]?.createdAt)}
                      </Text>
                      <Pressable
                        onPress={() =>
                          navigation.navigate('topUp', {
                            // value: selectedValue,
                            // name: selectedValue,
                          })
                        }
                        style={{
                          width: '100%',
                          marginTop: 10,
                          //   marginRight: 16,
                          backgroundColor: '#ffff',
                          borderColor: '#FFFFFFFF',
                          borderWidth: 2,
                          height: 36,
                          borderRadius: 5,
                          justifyContent: 'flex-end',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: 'center',
                            fontWeight: '400',
                            lineHeight: 30,
                            color: 'black',
                          }}>
                          Purchase Now
                        </Text>
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

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                {labelData.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: item.color,
                        marginRight: 5,
                      }}
                    />
                    <Text style={styles.exportext}>{item.label}</Text>
                  </View>
                ))}
              </View>
              <ViewShot
                ref={viewShotRef}
                options={{format: 'png', quality: 0.9}}
                style={styles.chartContainer}>
                <StackedBarChart
                  data={chartData}
                  width={Dimensions.get('window').width - 30}
                  height={360}
                  chartConfig={{
                    backgroundColor: COLOR_LIST.SCREEN_BG,
                    backgroundGradientFrom: COLOR_LIST.SCREEN_BG,
                    backgroundGradientTo: COLOR_LIST.SCREEN_BG,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(72, 133, 237, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    barPercentage: 0.7,
                    propsForBackgroundLines: {
                      strokeWidth: 1,
                      stroke: '#ccc',
                    },
                    tooltip: false,
                    yAxisLabel: '',
                    yAxisSuffix: '',
                  }}
                  style={{
                    borderRadius: 16,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 5,
                  }}
                />
              </ViewShot>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.exportTextContainer}
                  onPress={() => captureAndSave('png')}>
                  <Text style={styles.exportext}>Export as PNG</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.exportTextContainer}
                  onPress={() => captureAndSave('jpeg')}>
                  <Text style={styles.exportext}>Export as JPEG</Text>
                </TouchableOpacity>
                {/* <TouchableHighlight
             style={styles.exportTextContainer}
             onPress={() => captureAndSave('pdf')}>
             <Text style={styles.exportext}>Export as PDF</Text>
           </TouchableHighlight> */}
                {/* <Button title="Export Chart" onPress={captureChart} /> */}
              </View>

              <FlatList
                // data={}
                data={purchaseList}
                renderItem={renderTransaction}
                keyExtractor={(item, index) => item.meterId || index.toString()}
                // ListEmptyComponent={() => (
                //   <View
                //     style={{
                //       flex: 1,
                //       justifyContent: 'center',
                //       alignItems: 'center',
                //       marginTop: 90,
                //     }}>
                //     <Text style={{color: 'black'}}>No Transaction Found</Text>
                //   </View>
                // )}
              />
            </>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 90,
              }}>
              <Text style={{color: 'black'}}>No Transaction Found</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Bottom currentPage={'Dashboard'} />
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisibleCalender}
        onRequestClose={() => {
          setModalVisibleCalender(false);
        }}
        onDismiss={() => {
          setModalVisibleCalender(false);
        }}>
        <Pressable
          style={styles.modalContainer}
          onPress={() => {
            setModalVisibleCalender(false);
          }}>
          <View>
            <View style={styles.modalContent}>
              <CalendarPicker
                maxDate={Date()}
                startFromMonday={true}
                scrollable={true}
                todayBackgroundColor="#f2e6ff"
                selectedDayColor={COLOR_LIST.PRIMARY}
                selectedDayTextColor="#FFFFFF"
                onDateChange={date => {
                  onClickSelectDate(date);
                }}
              />
            </View>
          </View>
        </Pressable>
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisibleToCalender}
        onRequestClose={() => {
          setModalVisibleToCalender(false);
        }}
        onDismiss={() => {
          setModalVisibleToCalender(false);
        }}>
        <Pressable
          style={styles.modalContainer}
          onPress={() => {
            setModalVisibleToCalender(false);
          }}>
          <View>
            <View style={styles.modalContent}>
              <CalendarPicker
                startFromMonday={true}
                scrollable={true}
                todayBackgroundColor="#f2e6ff"
                selectedDayColor="#7300e6"
                selectedDayTextColor="#FFFFFF"
                onDateChange={date => {
                  onClickSelectToDate(date);
                }}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginHorizontal: 16,
    marginTop: 10,
    height: 53,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor: 'white',
    borderRadius: 26,
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
    marginHorizontal: 50,
    // paddingHorizontal: 10,
  },
  imageStyle: {
    width: 32,
    height: 32,
    marginHorizontal: 16,
  },
  placeholderStyle: {
    fontSize: 10,
  },
  selectedTextStyle: {
    color: COLOR_LIST.TEXT,
    fontFamily: COLOR_LIST.FONT_REGULAR,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    // marginHorizontal:2,
    // marginHorizontal: 10,
    paddingHorizontal: 5,
    // lineHeight: 50,
    alignItems: 'center',
  },
  itemTextStyle: {
    color: COLOR_LIST.TEXT,
    fontFamily: COLOR_LIST.FONT_REGULAR,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    // marginHorizontal:10,
    paddingHorizontal: 5,
    // lineHeight: 20,
  },
  iconStyle: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  inputSearchStyle: {
    height: 22,
    fontSize: 20,
  },
  itemMainView: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
  },
  mainView: {
    // flex: 0.1,
    // marginHorizontal: 18,
    // justifyContent: 'center',
  },
  exportext: {
    color: 'black',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 20,
    color: '#FFFFFFFF',
    fontFamily: 'Catamaran-Bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: BackgroundColor,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 380,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    backgroundColor: 'white',
    paddingBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
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
  exportTextContainer: {
    fontSize: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 20,
    // height: 20,
    borderWidth: 2,
    padding: 3,
    paddingHorizontal: 10,
  },
});

export default Purchase_History;

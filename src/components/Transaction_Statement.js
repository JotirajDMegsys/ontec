import React, {useEffect, useState} from 'react';
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
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {BackgroundColor} from '../helpers/constants';
import {SendToEmailBtn} from './common';
import BackNavigation from '../components/backNavigation';
import {Image} from '@rneui/base';
import {SelectCountry} from 'react-native-element-dropdown';
import editIcon from '../assets/Edit.png';
import {useNavigation} from '@react-navigation/native';
import noProperty from '../assets/dashboard/noProperty.png';
import Bottom from '../components/Bottom';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  transacitionMasters,
  transactionSummary,
} from '../redux/slice/transacitionMasters';
//*Images
import Remove from '../assets/remove.png';
import mail from '../assets/outgoingMail.png';
import Check from '../assets/check.png';
import download from '../assets/downloadIcon.png';
import {COMPANY_ID} from '../helpers/enum';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLOR_LIST} from '../helpers/colorlist';
import {Toast, useToast} from 'react-native-toast-notifications';

import {Dimensions} from 'react-native';
import {getWidthByScreenSize} from '../helpers/commonFunction';
import {
  downloadTransactionStatement,
  resetDownloadTransactionStatement,
} from '../redux/slice/downloadTransactionStatement';
import RNFetchBlob from 'rn-fetch-blob';
import {err} from 'react-native-svg';
import {
  downloadPurchaseReceipt,
  resetDownloadState,
} from '../redux/slice/downloadPurchaseReceipt';

const Transaction_Statement = () => {
  const [selectedView, setSelectedView] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [noMasterDataFound, setNoMasterDataFound] = useState(false);
  const {screenHeight, screenWidth} = Dimensions.get('window');
  const [buttonTitle, setButtonTitle] = useState('DOWNLOAD');
  const [buttonTitleForEmail, setButtonTitleForEmail] =
    useState('SEND TO EMAIL');

  const toast = useToast();

  const {
    masterTransacitionIsLoading,
    masterTransacitionData,
    masterTransacitionSuccess,
    masterTransacitionIsError,
    transactionIsLoading,
    transactionData,
    transactionSuccess,
    transactionIsError,
    masterLoading,
    masterData,
    masterSuccess,
    masterError,
    loading,
    downloaddata,
    downloaddataMessage,
    success,
    error,
  } = useSelector(state => ({
    masterTransacitionIsLoading:
      state.transacitionMasters.masterTransacitionIsLoading,
    masterTransacitionData: state.transacitionMasters.masterTransacitionData,
    masterTransacitionIsError:
      state.transacitionMasters.masterTransacitionIsError,
    masterTransacitionSuccess:
      state.transacitionMasters.masterTransacitionSuccess,
    transactionIsLoading: state.transacitionMasters.transactionIsLoading,
    transactionData: state.transacitionMasters.transactionData,
    transactionIsError: state.transacitionMasters.transactionIsError,
    transactionSuccess: state.transacitionMasters.transactionSuccess,
    masterLoading: state.dashboardData.masterLoading,
    masterData: state.dashboardData.masterData,
    masterSuccess: state.dashboardData.masterSuccess,
    masterError: state.dashboardData.masterError,
    loading: state.downloadStatement.loading,
    downloaddata: state.downloadStatement.downloaddata,
    downloaddataMessage: state.downloadStatement.downloaddataMessage,
    success: state.downloadStatement.success,
    error: state.downloadStatement.error,
  }));

  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (
      downloaddata === null &&
      downloaddataMessage &&
      success === true &&
      error === false
    ) {
      setButtonTitleForEmail('PROCESSING...');

      Toast.show('Statement sent on your registered email successfully', {
        type: 'success',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
      dispatch(resetDownloadTransactionStatement());
      setButtonTitleForEmail('SEND TO EMAIL');

      return;
    } else if (downloaddata != null && success === true && error === false) {
      const downloadFile = async () => {
        setIsDownloading(true);
        setButtonTitle('PROCESSING...');

        const fileUrl = downloaddata;

        try {
          const response = await RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              path:
                RNFetchBlob.fs.dirs.DownloadDir +
                '/' +
                fileUrl.substring(fileUrl.lastIndexOf('/') + 1),
              description: 'File downloaded by download manager.',
            },
          }).fetch('GET', fileUrl);

          toast.show('Transaction statement downloaded successfully!', {
            type: 'success',
            placement: 'top',
            duration: 3000,
            offset: 30,
            animationType: 'zoom-in',
          });
          setButtonTitle('DOWNLOAD');
        } catch (error) {
          toast.show('Failed to download the file.', {
            type: 'danger',
            placement: 'top',
            duration: 3000,
            offset: 30,
            animationType: 'zoom-in',
          });
          setButtonTitle('DOWNLOAD');
          console.error(error);
        } finally {
          setIsDownloading(false);
          dispatch(resetDownloadTransactionStatement());
          setButtonTitle('DOWNLOAD');
          setButtonTitleForEmail('SEND TO EMAIL');
        }
      };

      downloadFile();
    }
  }, [downloaddata, success, error]);

  // const sendToEmail = () => {
  //   // navigation.navigate('myProfile');
  //   callToDownloadApi('email');
  // };
  const sendToEmail = () => {
    callToDownloadApi('email');
  };
  const handleSubmit = () => {
    // navigation.navigate('myProfile');
    // downloadFile(fileUrl);

    callToDownloadApi('download');
  };
  const callToDownloadApi = type => {
    let fromDate =
      selectedDate === 'DD/MM/YYYY'
        ? moment()
        : moment(selectedDate, 'DD/MM/YYYY');
    let toDate =
      selectedToDate === 'DD/MM/YYYY'
        ? moment()
        : moment(selectedToDate, 'DD/MM/YYYY');
    if (selectedView.name === 'Custom' || selectedView.name === 4) {
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
        Toast.show('From date should be less than to date.', {
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
    }

    // navigation.navigate('myProfile');

    let dataObj = {
      propertyId: selectedValue,
      // propertyId: "602",
      transactionCycleId: selectedView.id,
      fromDate: fromDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      toDate: toDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      type: type,
    };
    if (type === 'download') {
      setButtonTitle('PROCESSING...');
    } else {
      setButtonTitleForEmail('PROCESSING...');
    }

    // downloadFile(fileUrl);
    dispatch(downloadTransactionStatement(dataObj));
  };
  const {
    purchaseloading,
    purchaseDownloaddata,
    purchaseSuccess,
    purchaseError,
  } = useSelector(state => state.downloadReceipt);

  console.log('====================================');
  console.log(purchaseDownloaddata);
  console.log('====================================');
  const [isDownload, setIsDownload] = useState(false);
  const [reciptTitle, setReciptTitle] = useState('RECEIPT');

  useEffect(() => {
    if (purchaseSuccess && purchaseDownloaddata && !purchaseError) {
      console.log('Download successful:', purchaseDownloaddata);

      const downloadFile = async () => {
        const fileUrl = purchaseDownloaddata?.purchaceReceiptUrl;

        try {
          const response = await RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              path: `${RNFetchBlob.fs.dirs.DownloadDir}/${fileUrl.substring(
                fileUrl.lastIndexOf('/') + 1,
              )}`,
              description: 'File downloaded by download manager.',
            },
          }).fetch('GET', fileUrl);

          // Display success message
          toast.show('Purchase statement downloaded successfully!', {
            type: 'success',
            placement: 'top',
            duration: 3000,
            offset: 30,
            animationType: 'zoom-in',
          });
          setIsModalVisible(false);
        } catch (error) {
          toast.show('Failed to download the file.', {
            type: 'danger',
            placement: 'top',
            duration: 3000,
            offset: 30,
            animationType: 'zoom-in',
          });

          console.error('File download error:', error);
        } finally {
          setIsDownload(false);
          setReciptTitle('RECEIPT');
          dispatch(resetDownloadState());
        }
      };

      downloadFile();
    }
  }, [purchaseSuccess, purchaseError, purchaseDownloaddata]);

  const handleDownloadReceipt = transactionId => {
    if (isDownload) return;
    setIsDownload(true);
    setReciptTitle('DOWNLOADING...');
    const data = {
      transactionId: transactionId,
    };
    dispatch(downloadPurchaseReceipt(data));
  };

  const handleViewClick = view => {
    setSelectedView(view);
  };

  const getViewBackgroundColor = view => {
    return selectedView === view ? 'red' : 'white';
  };
  const getViewTextColor = view => {
    return selectedView === view ? 'white' : 'black';
  };

  const [meterList, setMeterList] = useState([]);
  const [transationPeroid, setTransationPeroid] = useState([]);
  const [transactionList, setTransactionList] = useState([]);

  useEffect(() => {
    if (
      masterTransacitionData.propertyList &&
      masterTransacitionData.transactionPeriod &&
      masterTransacitionSuccess === true &&
      masterTransacitionIsError === false &&
      masterTransacitionIsLoading === false
    ) {
      setMeterList(masterTransacitionData.propertyList);
      setTransationPeroid(masterTransacitionData.transactionPeriod);
    } else {
      setMeterList([]);
      setTransationPeroid([]);
    }
    if (masterTransacitionData.propertyList?.length > 0) {
      setNoMasterDataFound(false);
    } else if (masterTransacitionData.propertyList?.length === 0) {
      setNoMasterDataFound(true);
    } else {
      setNoMasterDataFound(true);
    }
  }, [masterTransacitionData]);

  useEffect(() => {
    setDataLoaded(true);

    setTransactionList(transactionData?.transaction);
  }, [transactionData, transactionSuccess]);

  useEffect(() => {
    setDataLoaded(false);
    masterTransactionData();
  }, []);

  const masterTransactionData = async () => {
    // console.log("dataObj================================================       come to function");

    let userId = await AsyncStorage.getItem('userId');
    let id = parseInt(userId);
    let dataObj = {
      userId: id,
      companyId: COMPANY_ID,
    };
    dispatch(transacitionMasters(dataObj));
  };
  //  datePick logic

  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [selectedDate, setSelectedDate] = useState('YYYY/MM/DD');
  const [selectedDate, setSelectedDate] = useState('DD/MM/YYYY');
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

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTransactionClick = (index, item) => {
    setSelectedTransaction(transactionList[index]);
    {
      item.accountTransType != 'ADJUSTMENT'
        ? setIsModalVisible(true)
        : setIsModalVisible(false);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
  };
  const [selectedValue, setSelectedValue] = useState(null);
  console.log(selectedValue, 'selectedValuellllll');
  const [errorObj, setErrorObj] = useState({
    meterNumber: '',
    TransactionPeriod: '',
    periodDate: '',
  }); // Initialize with null or any initial value you prefer
  const onClickHandleSubmit = async () => {
    if (
      !selectedValue ||
      !selectedView ||
      ((selectedView.name === 'Custom' || selectedView.name === 4) &&
        (selectedDate == 'DD/MM/YYYY' || selectedToDate == 'DD/MM/YYYY'))
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

    let fromDate =
      selectedDate === 'DD/MM/YYYY'
        ? moment()
        : moment(selectedDate, 'DD/MM/YYYY');
    let toDate =
      selectedToDate === 'DD/MM/YYYY'
        ? moment()
        : moment(selectedToDate, 'DD/MM/YYYY');
    if (selectedView.name === 'Custom' || selectedView.name === 4) {
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
    }
    let dataObj = {
      propertyId: selectedValue,
      transactionCycleId: selectedView.id,
      fromDate: fromDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      toDate: toDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    };

    //  console.log("setErrorObjsetErrorObjsetErrorObj", dataObj.todate - dataObj.fromDate);
    //  return;
    closeModal();
    dispatch(transactionSummary(dataObj));
  };
  const [ascending, setAscending] = useState(true);
  // const sortTransactions = () => {
  //   const sortedTransactions = [...transactionList].sort((a, b) => {
  //     const dateA = new Date(a.date.split('-').reverse().join('-'));
  //     const dateB = new Date(b.date.split('-').reverse().join('-'));
  //     return ascending ? dateA - dateB : dateB - dateA;
  //   });
  //   console.log(transactionList,"sortedTransactionssortedTransactionssortedTransactionssortedTransactions");
  //   setTransactionList(sortedTransactions);
  //   setAscending(!ascending);
  // };
  const sortTransactions = () => {
    const sortedTransactions = [...transactionList].sort((a, b) => {
      // Parse dates and times assuming DD-MM-YYYY HH:MM format
      const parseDateTime = dateTimeStr => {
        const [datePart, timePart] = dateTimeStr.split(' ');
        const [day, month, year] = datePart.split('-').map(Number);
        const [hours, minutes] = timePart.split(':').map(Number);

        return new Date(year, month - 1, day, hours, minutes);
      };

      const dateA = parseDateTime(a.date);
      const dateB = parseDateTime(b.date);

      return ascending ? dateA - dateB : dateB - dateA;
    });

    setTransactionList(sortedTransactions);
    setAscending(!ascending);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLOR_LIST.SCREEN_BG,
      }}
      horizontal={false}>
      <BackNavigation
        title={'Transaction History'}
        screenName={'accounts'}
        isRightIcon={true}
      />
      {masterTransacitionData?.propertyList?.length > 0 &&
      noMasterDataFound === false ? (
        <ScrollView style={{flex: 1}} horizontal={false}>
          <View style={{flex: 1, marginHorizontal: 16, marginVertical: 10}}>
            <View
              style={{
                flex: 0.9,
                backgroundColor: '#252D3FFF',
                borderRadius: 20,
              }}>
              <View style={{height: 60, marginTop: 20}}>
                <Dropdown
                  style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                  textStyle={styles.selectedTextStyle}
                  itemTextStyle={styles.selectedTextStyle}
                  placeholderStyle={[
                    styles.selectedTextStyle,
                    {marginHorizontal: 0},
                  ]}
                  selectedTextStyle={[
                    styles.selectedTextStyle,
                    {marginHorizontal: 0},
                  ]}
                  // labelField={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={masterData}
                  maxHeight={200}
                  labelField="propertyName"
                  valueField="propertyId"
                  placeholder={'Select Property '}
                  value={selectedValue}
                  onFocus={() => setIsFocus(true)}
                  onChange={item => {
                    // Update the selected value

                    setSelectedValue(item.propertyId);
                    setErrorObj({meterNumber: ''});
                  }}
                />
                {errorObj.meterNumber != '' && (
                  <Text>{errorObj.meterNumber}</Text>
                )}
              </View>

              {/* convert to component */}

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
                            marginHorizontal: 0, // Add some horizontal margin between items if needed
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

            {/* <View>
            <Text
              style={{
                height: 0,
                marginHorizontal: 15,
                borderColor: '#EC3237FF',
                borderStyle: 'solid',
                borderBottomWidth: 6,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
              }}></Text>
          </View> */}

            {transactionData &&
            transactionIsLoading === false &&
            dataLoaded === true &&
            transactionSuccess === true ? (
              <View
                style={{
                  flex: 1,
                  marginVertical: 20,
                  borderWidth: 1,
                  borderColor: '#DEE1E6',
                }}>
                <View style={{flex: 1}}>
                  <View style={{flex: 0.2, backgroundColor: '#DEE1E6'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 16,
                        marginVertical: 9,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Catamaran-Regular' /* Body */,
                          fontSize: 14,
                          fontWeight: '400',
                          lineHeight: 22,
                          color: '#171A1F',
                        }}>
                        Summary
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Catamaran-Regular' /* Body */,
                          fontSize: 14,
                          fontWeight: '400',
                          lineHeight: 22,
                          color: '#171A1FFF',
                        }}>
                        Amount
                      </Text>
                    </View>
                  </View>
                  <View style={{flex: 0.2, backgroundColor: '#FFFFFF'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 16,
                        marginVertical: 9,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Catamaran-Regular' /* Body */,
                          fontSize: 14,
                          fontWeight: '700',
                          lineHeight: 22,

                          color: '#171A1FFF',
                        }}>
                        Opening Balance
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Catamaran-Regular' /* Body */,
                          fontSize: 14,
                          fontWeight: '400',
                          lineHeight: 22,
                          color: '#171A1F',
                        }}>
                        {transactionData?.openingBalance >= 0 ||
                        transactionData?.openingBalance < 0
                          ? `R ${parseFloat(
                              transactionData?.openingBalance,
                            ).toFixed(2)}`
                          : 'Loading...'}
                      </Text>
                    </View>
                  </View>
                  <View style={{flex: 0.2, backgroundColor: '#DEE1E6'}}>
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
                          Total Billing Calculations
                        </Text>
                      </View>

                      <Text
                        style={{
                          fontFamily: 'Catamaran-Regular' /* Body */,
                          fontSize: 14,
                          fontWeight: '400',
                          lineHeight: 22,
                          color: '#171A1FFF',
                        }}>
                        {transactionData?.totalBillingcalculations >= 0 ||
                        transactionData?.totalBillingcalculations < 0
                          ? `R ${parseFloat(
                              transactionData?.totalBillingcalculations,
                            ).toFixed(2)}`
                          : 'Loading...'}
                      </Text>
                    </View>
                  </View>
                  <View style={{flex: 0.2, backgroundColor: '#FFFFFF'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 16,
                        marginVertical: 9,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Catamaran-Regular' /* Body */,
                          fontSize: 14,
                          fontWeight: '400',
                          lineHeight: 22,
                          color: '#171A1F',
                        }}>
                        Total Deposit
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Catamaran-Regular' /* Body */,
                          fontSize: 14,
                          fontWeight: '400',
                          lineHeight: 22,
                          color: '#171A1FFF',
                        }}>
                        {transactionData?.totalDeposit >= 0 ||
                        transactionData?.totalDeposit < 0
                          ? `R ${parseFloat(
                              transactionData?.totalDeposit,
                            ).toFixed(2)}`
                          : 'Loading...'}
                      </Text>
                    </View>
                  </View>
                  <View style={{flex: 0.2, backgroundColor: '#DEE1E6'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 16,
                        marginVertical: 9,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Catamaran-Regular' /* Body */,
                          fontSize: 14,
                          fontWeight: '400',
                          lineHeight: 22,
                          color: '#171A1F',
                        }}>
                        Total Adjustments
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Catamaran-Regular' /* Body */,
                          fontSize: 14,
                          fontWeight: '400',
                          lineHeight: 22,
                          color: '#171A1FFF',
                        }}>
                        {transactionData?.totalAdjustments >= 0 ||
                        transactionData?.totalAdjustments < 0
                          ? `R ${parseFloat(
                              transactionData?.totalAdjustments,
                            ).toFixed(2)}`
                          : 'Loading...'}
                      </Text>
                    </View>
                  </View>
                  <View style={{flex: 0.2, backgroundColor: '#FFFFFF'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 16,
                        marginVertical: 9,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Catamaran-Regular' /* Body */,
                          fontSize: 14,
                          fontWeight: '700',
                          lineHeight: 22,
                          color: '#171A1F',
                        }}>
                        Closing Balance
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Catamaran-Regular' /* Body */,
                          fontSize: 14,
                          fontWeight: '400',
                          lineHeight: 22,
                          color: '#171A1FFF',
                        }}>
                        {transactionData?.closingBalance >= 0 ||
                        transactionData?.closingBalance < 0
                          ? `R ${parseFloat(
                              transactionData?.closingBalance,
                            ).toFixed(2)}`
                          : 'Loading...'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : dataLoaded === true ? (
              <View
                style={{
                  flex: 1,
                  marginVertical: 20,
                  borderWidth: 1,
                  borderColor: '#DEE1E6',
                }}>
                <View style={{flex: 1}}>
                  <View style={{flex: 0.2, backgroundColor: '#DEE1E6'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 16,
                        marginVertical: 9,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Catamaran-Regular' /* Body */,
                          fontSize: 14,
                          fontWeight: '400',
                          lineHeight: 22,
                          color: '#171A1F',
                        }}>
                        Loading Your Data... Please wait!
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  marginVertical: 20,
                  borderWidth: 1,
                  borderColor: '#DEE1E6',
                }}>
                <View style={{flex: 1}}>
                  <View style={{flex: 0.2, backgroundColor: '#DEE1E6'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 16,
                        marginVertical: 9,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Catamaran-Regular' /* Body */,
                          fontSize: 14,
                          fontWeight: '400',
                          lineHeight: 22,
                          color: '#171A1F',
                        }}>
                        Please select date to get transaction summary
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            {transactionData &&
            transactionIsLoading === false &&
            dataLoaded === true &&
            transactionSuccess === true &&
            transactionIsLoading === false &&
            transactionList?.length > 0 ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginVertical: 6,
                  }}>
                  <SendToEmailBtn
                    title={buttonTitleForEmail}
                    onClick={sendToEmail}
                    imageIcon={mail}
                  />
                  <SendToEmailBtn
                    // title="DOWNLOAD"
                    title={buttonTitle}
                    onClick={handleSubmit}
                    imageIcon={download}
                  />
                </View>
                <View
                  style={{marginVertical: 10, flex: 1, flexDirection: 'row'}}>
                  <View style={{width: '70%', alignItems: 'flex-start'}}>
                    <Text
                      style={[
                        styles.text,
                        {color: '#171A1FFF', lineHeight: 30, fontSize: 20},
                      ]}>
                      Transaction History
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        {
                          color: '#9095A1',
                          fontWeight: '400',
                          marginTop: 3,
                          fontFamily: 'Catamaran-Bold',
                        },
                      ]}>
                      (Click on any transaction to view details)
                    </Text>
                  </View>
                  <View
                    style={{
                      marginVertical: 10,
                      width: '30%',
                      alignItems: 'flex-end',
                    }}>
                    <TouchableOpacity onPress={sortTransactions}>
                      <Text
                        style={{
                          color: COLOR_LIST.LABEL_TEXT,
                          fontSize: 12,
                          textDecorationLine: 'underline',
                          flexDirection: 'row',
                        }}>
                        Sort by Date {ascending ? '🔼' : '🔽'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {transactionSuccess === true &&
                transactionIsLoading === false &&
                transactionList?.length > 0 ? (
                  <View>
                    {transactionList?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleTransactionClick(index, item)}
                          // onPress={() => handleTransactionClick(index)}
                          style={{
                            backgroundColor:
                              selectedTransaction === index
                                ? '#EFEFEF'
                                : '#FFFFFF',
                            borderRadius: 4,
                            marginVertical: 7,
                            borderWidth: 1,
                            borderColor: '#DEE1E6',
                            borderStyle: 'solid',
                            minHeight: 74,
                          }}>
                          {/* Your transaction row content */}
                          <View
                            style={{
                              marginHorizontal: 16,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginVertical: 9,
                            }}>
                            <View style={{flexDirection: 'row'}}>
                              <View style={{marginHorizontal: 10}}>
                                <Text
                                  style={[
                                    styles.text,
                                    {
                                      color: '#171A1FFF',
                                      lineHeight: 18,
                                      fontSize: 14,
                                      fontWeight: '600',
                                      fontFamily: 'Catamaran-Bold',
                                    },
                                  ]}>
                                  {/* Billing calculations */}
                                  {item.accountTransType
                                    ? item.accountTransType
                                        .split('(')
                                        .join('  (')
                                    : ''}
                                </Text>
                                <Text
                                  style={[
                                    styles.text,
                                    {
                                      color: '#171A1FFF',
                                      lineHeight: 18,
                                      fontSize: 14,
                                      fontWeight: '600',
                                      fontFamily: 'Catamaran-Bold',
                                    },
                                  ]}>
                                  {item.meter}
                                </Text>

                                <Text
                                  style={[
                                    styles.text,
                                    {
                                      color: '#9095A1',
                                      fontWeight: '400',
                                      marginTop: 3,
                                      fontFamily: 'Catamaran-Bold',
                                    },
                                  ]}>
                                  Unit: {item.unit} | {item.date}
                                </Text>
                              </View>
                            </View>

                            <View style={{marginVertical: 10}}>
                              <Text
                                style={[
                                  styles.text,
                                  {
                                    color: '#000',
                                    lineHeight: 22,
                                    fontSize: 14,
                                    fontFamily: 'Catamaran-Bold',
                                    textAlign: 'right',
                                  },
                                ]}>
                                R {parseFloat(item.totalAmount).toFixed(2)}
                              </Text>
                              <View style={{marginTop: 10}}>
                                <Text
                                  style={[
                                    styles.text,
                                    {
                                      color: '#9095A1FF',
                                      fontWeight: '400',
                                      textAlign: 'right',
                                      fontFamily: 'Catamaran-Regular',
                                      // borderColor:'red',borderWidth:2
                                    },
                                  ]}>
                                  {/* Balance: R {item.resultantBalance ? parseFloat(item.resultantBalance).toFixed(2) : "0.00"} */}
                                  Balance: R{' '}
                                  {parseFloat(item.resultantBalance).toFixed(2)}
                                  {/* Balance: R {item.resultantBalance || "NA"} */}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                    {/* Modal for displaying detailed records */}

                    <Modal
                      visible={isModalVisible}
                      onRequestClose={closeModal}
                      animationType="fade"
                      transparent={true}>
                      <View style={styles.container}>
                        <View style={styles.alertBox}>
                          {selectedTransaction != null && (
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
                                    justifyContent: 'space-between',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: 'Catamaran-Regular',
                                      fontSize: 12,
                                      fontWeight: '700',
                                      lineHeight: 22,
                                      color: '#171A1FFF',
                                    }}>
                                    Type
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      fontWeight: '400',
                                      lineHeight: 22,
                                      color: '#171A1F',
                                    }}>
                                    Description
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      fontWeight: '400',
                                      lineHeight: 22,
                                      color: '#171A1F',
                                    }}>
                                    Amount Incl Tax
                                  </Text>
                                </View>
                              </View>

                              {selectedTransaction.details?.length > 0 ? (
                                selectedTransaction.details.map(
                                  (detailRow, detailRowIndex) => (
                                    <View
                                      key={detailRowIndex}
                                      style={{backgroundColor: '#FFFFFF'}}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          marginVertical: 9,
                                          justifyContent: 'space-between',
                                        }}>
                                        <Text
                                          numberOfLines={3}
                                          style={{
                                            fontFamily: 'Catamaran-Regular',
                                            fontSize: 10,
                                            fontWeight: '700',
                                            lineHeight: 15,
                                            width: getWidthByScreenSize(25),
                                            paddingHorizontal: 10,
                                            color: '#171A1FFF',
                                          }}>
                                          {detailRow.type}
                                        </Text>

                                        <View style={{flexDirection: 'column'}}>
                                          <Text
                                            numberOfLines={3}
                                            style={{
                                              fontSize: 10,
                                              fontWeight: '400',
                                              lineHeight: 15,
                                              color: '#171A1F',
                                              textAlign: 'left',
                                              paddingHorizontal: 10,
                                              width: getWidthByScreenSize(45),
                                            }}>
                                            {detailRow.description}
                                          </Text>
                                          <View style={{flexDirection: 'row'}}>
                                            <Text
                                              style={{
                                                fontSize: 10,
                                                fontWeight: '400',
                                                lineHeight: 15,
                                                color: '#171A1F',
                                                textAlign: 'left',
                                                paddingHorizontal: 10,
                                              }}>
                                              Tax Amount: R{' '}
                                              {parseFloat(
                                                detailRow.vat,
                                              ).toFixed(2)}
                                            </Text>
                                            <Text
                                              style={{
                                                fontSize: 10,
                                                fontWeight: '400',
                                                lineHeight: 15,
                                                color: '#171A1F',
                                                textAlign: 'left',
                                              }}>
                                              Unit: {detailRow.units}
                                            </Text>
                                          </View>
                                        </View>

                                        <Text
                                          numberOfLines={2}
                                          style={{
                                            fontSize: 10,
                                            fontWeight: '400',
                                            lineHeight: 15,
                                            color: '#171A1F',
                                            paddingHorizontal: 5,
                                            width: getWidthByScreenSize(20),
                                          }}>
                                          R{' '}
                                          {parseFloat(detailRow.amount).toFixed(
                                            2,
                                          )}
                                        </Text>
                                      </View>
                                    </View>
                                  ),
                                )
                              ) : (
                                <Text
                                  style={{
                                    color: COLOR_LIST.TEXT,
                                    alignSelf: 'center',
                                  }}>
                                  No Data Found
                                </Text>
                              )}

                              {/* Additional Row for Tendered Amount */}
                              {selectedTransaction.transactionId && (
                                <View style={{backgroundColor: '#FFFFFF'}}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      marginVertical: 9,
                                      justifyContent: 'space-between',
                                    }}>
                                    <Text
                                      numberOfLines={3}
                                      style={{
                                        fontFamily: 'Catamaran-Regular',
                                        fontSize: 10,
                                        fontWeight: '700',
                                        lineHeight: 15,
                                        width: getWidthByScreenSize(25),
                                        paddingHorizontal: 10,
                                        color: '#171A1FFF',
                                      }}>
                                      Utility
                                    </Text>

                                    <View style={{flexDirection: 'column'}}>
                                      <Text
                                        numberOfLines={3}
                                        style={{
                                          fontSize: 10,
                                          fontWeight: '400',
                                          lineHeight: 15,
                                          color: '#171A1F',
                                          textAlign: 'left',
                                          paddingHorizontal: 10,
                                          width: getWidthByScreenSize(45),
                                        }}>
                                        Transaction Fee
                                      </Text>
                                      <View style={{flexDirection: 'row'}}>
                                        <Text
                                          style={{
                                            fontSize: 10,
                                            fontWeight: '400',
                                            lineHeight: 15,
                                            color: '#171A1F',
                                            textAlign: 'left',
                                            paddingHorizontal: 10,
                                          }}>
                                          Tax Amount: R 0.00
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: 10,
                                            fontWeight: '400',
                                            lineHeight: 15,
                                            color: '#171A1F',
                                            textAlign: 'left',
                                          }}>
                                          Unit: 0
                                        </Text>
                                      </View>
                                    </View>

                                    <Text
                                      numberOfLines={2}
                                      style={{
                                        fontSize: 10,
                                        fontWeight: '400',
                                        lineHeight: 15,
                                        color: '#171A1F',
                                        paddingHorizontal: 5,
                                        width: getWidthByScreenSize(20),
                                      }}>
                                      R
                                      {parseFloat(
                                        selectedTransaction.transactionFee,
                                      ).toFixed(2)}
                                    </Text>
                                  </View>
                                </View>
                              )}
                            </View>
                          )}

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            {selectedTransaction?.transactionId && (
                              <TouchableOpacity
                                style={[styles.button, styles.confirmButton]}
                                onPress={() =>
                                  handleDownloadReceipt(
                                    selectedTransaction.transactionId,
                                  )
                                }>
                                <Text style={styles.buttonText}>
                                  {reciptTitle}
                                </Text>
                              </TouchableOpacity>
                            )}
                            <TouchableOpacity
                              style={[styles.button, styles.confirmButton]}
                              onPress={closeModal}>
                              <Text style={styles.buttonText}>BACK</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </Modal>
                  </View>
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      flex: 0.2,
                      marginVertical: 50,
                    }}>
                    <Text style={styles.textStyle}>
                      Loading transactions...
                    </Text>
                  </View>
                )}
              </>
            ) : null}
          </View>
        </ScrollView>
      ) : noMasterDataFound === true ? (
        <ScrollView style={{flex: 1}}>
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
              <Text style={{fontSize: 32, color: 'black', marginBottom: 20}}>
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
        <ScrollView>
          <View style={[styles.container, {marginTop: '50%'}]}>
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

      <Bottom currentPage={'Transaction'} />
      {/* Date picker modal */}
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
    lineHeight: 50,
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
});

export default Transaction_Statement;

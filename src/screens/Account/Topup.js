import React, {useState, useEffect} from 'react';
import {BackgroundColor} from '../../helpers/constants';
import {
  SafeAreaView,
  Pressable,
  ScrollView,
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import BackNavigation from '../../components/backNavigation';
import Bottom from '../../components/Bottom';
import {Dropdown} from 'react-native-element-dropdown';
import {TextInput, RadioButton} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StatementButton} from '../../components/common';
import check from '../../assets/check.png';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import walletIcon from '../../assets/dashboard/walletIcon.png';
import bankTransferIcon from '../../assets/topup/bank-transfer-icon.png';
import cardPaymentIcon from '../../assets/topup/card-payment-icon.png';
import {COLOR_LIST} from '../../helpers/colorlist';
import {useSelector, useDispatch} from 'react-redux';
import {getFontSize, getWidthByScreenSize} from '../../helpers/commonFunction';
import {Toast} from 'react-native-toast-notifications';

import {
  createTopupRequest,
  getPaymentmethods,
  getBankAccounts,
  transactionCancel,
  resetTransactionCancel,
} from '../../redux/slice/topupAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL, API_VERSION, PAYFAST_DATA} from '../../helpers/enum';
import {transacitionMasters} from '../../redux/slice/transacitionMasters';
import Property from '../properties/Property';
const Topup = ({route}) => {
  const {value, name} = route.params || {};
  const initialPropertyValue = value || '';
  const initialPropertyName = name || '';
  console.log(
    value,
    'propertyValueForTopup topup page  Topuop',
    initialPropertyName,
  );
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);
  const [selectedView, setSelectedView] = useState('payfast');
  const [proceedTitle, setProceedTitle] = useState('PROCEED TO PAYMENT');

  const dispatch = useDispatch();

  const {
    masterLoading,
    masterData,
    masterSuccess,
    masterError,
    isLoading,
    data,
    isSuccess,
    isError,
    walletIsLoading,
    walletData,
    walletIsSuccess,
    walletIsError,
    userDetailsIsLoading,
    userDetailsData,
    userDetailsIsSuccess,
    userDetailsIsError,
    payMethodsIsLoading,
    payMethodsData,
    payMethodsIsSuccess,
    payMethodsIsError,
    banksIsLoading,
    banksData,
    banksIsSuccess,
    banksIsError,
    masterTransacitionIsLoading,
    masterTransacitionData,
    masterTransacitionSuccess,
    masterTransacitionIsError,
  } = useSelector(state => ({
    masterTransacitionIsLoading:
      state.transacitionMasters.masterTransacitionIsLoading,
    masterTransacitionData: state.transacitionMasters.masterTransacitionData,
    masterTransacitionIsError:
      state.transacitionMasters.masterTransacitionIsError,
    masterTransacitionSuccess:
      state.transacitionMasters.masterTransacitionSuccess,
    walletIsLoading: state.userDetails.walletIsLoading,
    walletData: state.userDetails.walletData,
    walletIsSuccess: state.userDetails.walletIsSuccess,
    walletIsError: state.userDetails.walletIsError,
    masterLoading: state.dashboardData.masterLoading,
    masterData: state.dashboardData.masterData,
    masterSuccess: state.dashboardData.masterSuccess,
    masterError: state.dashboardData.masterError,
    isLoading: state.topupRequest.isLoading,
    data: state.topupRequest.data,
    isSuccess: state.topupRequest.isSuccess,
    isError: state.topupRequest.isError,
    userDetailsIsLoading: state.userDetails.userDetailsIsLoading,
    userDetailsData: state.userDetails.userDetailsData,
    userDetailsIsSuccess: state.userDetails.userDetailsIsSuccess,
    userDetailsIsError: state.userDetails.userDetailsIsError,
    payMethodsIsLoading: state.topupRequest.payMethodsIsLoading,
    payMethodsData: state.topupRequest.payMethodsData,
    payMethodsIsSuccess: state.topupRequest.payMethodsIsSuccess,
    payMethodsIsError: state.topupRequest.payMethodsIsError,
    banksIsLoading: state.topupRequest.banksIsLoading,
    banksData: state.topupRequest.banksData,
    banksIsSuccess: state.topupRequest.banksIsSuccess,
    banksIsError: state.topupRequest.banksIsError,
  }));
  // console.log(masterTransacitionData);
  const calculateFee = () => {
    setFeeCalculated(false);
    setCalculationError(false);

    if (
      payFastAmt >= PAYFAST_DATA.MIN_AMT &&
      payFastAmt <= PAYFAST_DATA.MAX_AMT
    ) {
      if (!selectedProperty) {
        Toast.show('Please select a valid Property', {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
        return;
      }
      if (!selectedMeter) {
        Toast.show('Please select a valid meter', {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
        return;
      }
      // createTopupReq();
      // console.log(payFastAmt);
      if (toggleCheckBox) {
        if (walletData?.balance < payFastAmt && !(selectedPaymentMethod > 0)) {
          Toast.show('Please select valid payment method', {
            type: 'danger',
            placement: 'top',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
          return;
        }
      } else {
        if (!(selectedPaymentMethod > 0)) {
          Toast.show('Please select valid payment method', {
            type: 'danger',
            placement: 'top',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
          return;
        }
      }
      createTopupReq();
    } else {
      Toast.show(
        'Topup amount must be in between ' +
          PAYFAST_DATA.MIN_AMT +
          ' to ' +
          PAYFAST_DATA.MAX_AMT,
        {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        },
      );
    }
  };
  const callToCancelTransaction = id => {
    const dataObj = {
      transactionId: id,
    };
    // console.log('dataobj.....================.', dataObj);
    dispatch(transactionCancel(dataObj));
    // setTimeout(() => {
    //   dispatch(resetTransactionCancel())
    // }, 3000);
  };

  const createTopupReq = async () => {
    let userId = await AsyncStorage.getItem('userId');
    // console.log(payFastAmt);
    let dataObj = {
      amount: payFastAmt,
      userId: userId,
      useWallet: toggleCheckBox,
      // meterId: selectedValue?.meterId,
      meterId: selectedMeter,
      paymentMethodId: selectedPaymentMethod,
    };
    console.log(dataObj, 'createTopupReq');

    // console.log('dataObjdataObj', dataObj);
    dispatch(createTopupRequest(dataObj));
    setVerifyToup(true);
  };

  // console.log('data', data?.transactionFee);
  const callnotify = async () => {
    try {
      const formData = new FormData();
      formData.append('m_payment_id', data.transactionID);
      formData.append('pf_payment_id', '');
      formData.append('payment_status', 'COMPLETE');
      formData.append('merchant_id', '');
      formData.append('signature', '');
      formData.append('IsWalletRecharge', data?.useWallet);
      // console.log(formData);

      const accessToken = await AsyncStorage.getItem('accessToken');

      const response = await fetch(
        `${API_BASE_URL}api/topup/update_notified_topup_transaction?api-version=${API_VERSION}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + accessToken,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        setVerifyToup(false);
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      // console.log(responseData);
      if (responseData.statusCode === 200) {
        setProceedTitle('PROCEED TO PAYMENT');

        setVerifyToup(false);

        navigation.navigate('payment', {
          topup_id: data.transactionID,
          transaction_id: data.transactionID,
          amount: payFastAmt,

          username: userDetailsData.userName,
          // "payment_id": data.transactionID,
          payment_method: selectedPaymentMethodSlug,
          transactionFee: data?.transactionFee,
          // meterNumber: selectedValue?.meterNumber,
          meterNumber: selectedMeterNumber,
          date: data.createdAt,
        });
      }
    } catch (error) {
      console.error('Error:', error.message);
      setProceedTitle('PROCEED TO PAYMENT');
    }
  };
  const goToPayment = () => {
    setProceedTitle('Proceesing...');

    //     console.log(walletData.balance,"balance");
    // console.log(payFastAmt,"payFastAmt");
    if (data?.useWallet) {
      if (walletData.balance >= payFastAmt) {
        //notify
        callnotify();
      } else {
        setVerifyToup(false);
        setProceedTitle('PROCEED TO PAYMENT');

        navigation.navigate('payfast', {
          // amt: payFastAmt - data?.walletAmountUsed,
          // username: userDetailsData.userName,
          // payment_id: data.transactionID,
          // payment_method: selectedPaymentMethodSlug,
          amt: payFastAmt - data?.walletAmountUsed,
          username: userDetailsData.userName,
          payment_id: data.transactionID,
          payment_method: selectedPaymentMethodSlug,
          transactionFee: data.transactionFee,
          meterNumber: selectedMeterNumber,

          // meterNumber: selectedValue?.meterNumber,
          date: data.createdAt,
        });
      }
    } else {
      setVerifyToup(false);
      setProceedTitle('PROCEED TO PAYMENT');

      navigation.navigate('payfast', {
        amt: payFastAmt,
        username: userDetailsData.userName,
        payment_id: data.transactionID,
        payment_method: selectedPaymentMethodSlug,
        transactionFee: data.transactionFee,
        meterNumber: selectedMeterNumber,

        // meterNumber: selectedValue?.meterNumber,
        date: data.createdAt,
      });
    }
  };
  const [payFastAmt, setPayFastAmt] = useState('');
  const [selectedPaymentMethodSlug, setSelectedPaymentMethodSlug] =
    useState('');
  const [verifyToup, setVerifyToup] = useState(false);
  const [feeCalculated, setFeeCalculated] = useState(false);

  const handlePayFastAmt = amount => {
    setPayFastAmt(amount.toString());
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

  const [selectedValue, setSelectedValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [calculationError, setCalculationError] = useState(false);

  useEffect(() => {
    if (data?.trailVendResponse?.statusCode === 200) {
      setCalculationError(false);
      setFeeCalculated(true);
    } else if (isLoading === false && isSuccess === true) {
      setCalculationError(true);
    }
  }, [data]);
  // console.log(data);
  useEffect(() => {
    let dataObj = {
      statusId: 1,
    };
    dispatch(getPaymentmethods(dataObj));
    dispatch(getBankAccounts({}));

    var dataObj2 = {
      userId: userDetailsData.id,
      companyId: 1,
    };
    dispatch(transacitionMasters(dataObj2));
  }, []);

  const [processedMasterData, setProcessedMasterData] = useState([]);
  const uniqueByPropName = data => {
    const seen = new Set();
    return data.filter(item => {
      const duplicate = seen.has(item.propName);
      seen.add(item.propName);
      return !duplicate;
    });
  };

  const uniqueMasterData = uniqueByPropName(processedMasterData);
  console.log(uniqueMasterData);
  // console.log(processedMasterData, 'ccccccccc');
  useEffect(() => {
    if (masterTransacitionData?.propertyList?.length > 0) {
      const prefixedData = masterTransacitionData.propertyList.map(item => ({
        ...item,
        meterNumber: `${item.meterNumber}`,
      }));
      setProcessedMasterData(prefixedData);
    }
  }, [masterTransacitionData]);
  useEffect(() => {
    if (initialPropertyName && processedMasterData) {
      filterMeters(initialPropertyName);
    }
  }, [initialPropertyName, masterTransacitionData, processedMasterData]);
  const [selectedProperty, setSelectedProperty] =
    useState(initialPropertyValue);
  const [selectedPropertyName, setSelectedPropertyName] =
    useState(initialPropertyName);

  const [meterNumbers, setMeterNumbers] = useState([]);

  const [selectedMeterNumber, setSelectedMeterNumber] = useState(null);

  const [selectedMeter, setSelectedMeter] = useState(null);
  const filterMeters = value => {
    const filteredMeters = processedMasterData
      .filter(item => item.propName === value)
      .map(item => ({
        label: item.meterNumber,
        value: item.meterId,
      }));
    setSelectedMeterNumber(meterNumbers[0]?.label);
    setSelectedMeter(meterNumbers[0]?.value);

    setMeterNumbers(filteredMeters);
  };

  const onPropertyChange = value => {
    setSelectedProperty(value);
    setSelectedPropertyName(value);
    filterMeters(value);
  };
  console.log(meterNumbers);
  console.log(selectedMeter, 'opopopop', selectedMeterNumber);
  console.log(selectedProperty);
  return (
    <SafeAreaView style={{flex: 1}}>
      <BackNavigation
        title={'Top up'}
        isRightIcon={true}
        screenName={'accounts'}
        backgroundColor={'#F8F9FA00'}
      />
      <View
        style={{marginVertical: 50, marginHorizontal: 16, borderRadius: 26}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => handleViewClick('bank')}>
            <View
              style={{
                paddingHorizontal: 10,
                height: 39,
                backgroundColor: 'white',
                borderBottomLeftRadius: 28,
                borderTopLeftRadius: 28,
                backgroundColor: getViewBackgroundColor('bank'),
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
              <Image
                source={bankTransferIcon}
                style={{height: 28, width: 28, marginHorizontal: 5}}
              />
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  color: getViewTextColor('bank'),
                }}>
                Bank Transfer
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleViewClick('payfast')}>
            <View
              style={{
                paddingHorizontal: 10,
                height: 39,
                borderBottomRightRadius: 28,
                borderTopRightRadius: 28,
                backgroundColor: 'white',
                justifyContent: 'center',
                backgroundColor: getViewBackgroundColor('payfast'),
                flexWrap: 'wrap',
              }}>
              <Image
                source={cardPaymentIcon}
                style={{height: 28, width: 28, marginHorizontal: 5}}
              />
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  color: getViewTextColor('payfast'),
                }}>
                Online Payment
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {selectedView === 'bank' ? (
        <ScrollView style={{flex: 1}}>
          <View style={{flex: 1, paddingBottom: 25}}>
            <View style={{flex: 0.1, marginHorizontal: 20}}>
              <Text style={[styles.textStyle, {textAlign: 'center'}]}>
                SELECT METER NUMBER{' '}
              </Text>

              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus && {borderColor: 'blue', backgroundColor: 'white'},
                ]}
                textStyle={styles.selectedTextStyle}
                itemTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.selectedTextStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={processedMasterData}
                maxHeight={200}
                labelField="meterNumber"
                valueField="propertyId"
                placeholder={'Select Meter'}
                value={selectedValue ? selectedValue.propertyId : null}
                onFocus={() => setIsFocus(true)}
                onChange={item => {
                  setSelectedValue(item);
                }}
              />

              {selectedValue && (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    flex: 0.2,
                    marginVertical: 5,
                  }}>
                  <Text style={styles.textStyle}>
                    Property Name: {selectedValue.propName}
                  </Text>
                  <Text style={styles.textStyle}>
                    EFT No: {selectedValue.eftNo}
                  </Text>
                  <Text style={[styles.noteStyle, {marginTop: 25}]}>
                    Note: You can make a bank transfer in any of the bank
                    account listed below. Kindly mention your EFT No while
                    transfer.
                  </Text>
                </View>
              )}
            </View>
            {banksIsSuccess === true && banksData?.length > 0 ? (
              banksData?.map((item, index) => {
                return (
                  <View style={{flexDirection: 'row', marginVertical: 20}}>
                    <View
                      style={{
                        backgroundColor: COLOR_LIST.BRIGHT_BG,
                        borderRadius: 25,
                        padding: 10,
                        width: '80%',
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
                        alignSelf: 'center',
                        alignItems: 'flex-start',
                        marginHorizontal: '10%',
                      }}>
                      <View style={{paddingHorizontal: 12, width: '100%'}}>
                        <Text style={styles.bankAccountTitle}>
                          {item.bankName}
                        </Text>
                        <Text style={styles.bankAccountText}>
                          {/* {props.mobile} */}
                          Account Holder: {item.accountName}
                        </Text>
                        <Text style={styles.bankAccountText}>
                          {/* {props.mobile} */}
                          Account Number: {item.accountNumber}
                        </Text>
                        <Text style={styles.bankAccountText}>
                          {/* {props.mobile} */}
                          Branch Code: {item.branchCode}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  flex: 0.2,
                  marginVertical: 50,
                }}>
                <Text style={styles.textStyle}>Loading Bank Accounts...</Text>
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={{flex: 1}}>
          <View
            style={{flex: 1, backgroundColor: 'white', paddingVertical: 30}}>
            <View style={{flex: 0.1}}>
              <Text style={[styles.textStyle, {textAlign: 'center'}]}>
                SELECT PROPERTY{' '}
              </Text>

              {/* <Dropdown
        style={styles.dropdown}
        data={processedMasterData?.map(item => ({
          label: item.propName,
          value: item.propName,
        }))}
        labelField="label"
        valueField="value"
        placeholder={selectedPropertyName}

        // placeholder="Select a property"
        value={selectedProperty}
        onChange={item => onPropertyChange(item.value)}
      /> */}

              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus && {borderColor: 'blue', backgroundColor: 'white'},
                  {textAlign: 'center'},
                ]}
                textStyle={styles.placeholderstyle}
                itemTextStyle={styles.placeholderstyle}
                placeholderStyle={styles.placeholderstyle}
                selectedTextStyle={styles.placeholderstyle}
                iconStyle={styles.iconStyle}
                maxHeight={300}
                data={uniqueMasterData?.map(item => ({
                  label: item.propName,
                  value: item.propName,
                }))}
                labelField="label"
                valueField="value"
                placeholder={
                  selectedPropertyName
                    ? selectedPropertyName
                    : 'Select Property'
                }
                // placeholder="Select a property fhriohgiohrtsgio ceo iuxcrihiohespi iw rei fghioerhsh"
                value={selectedProperty}
                onChange={item => onPropertyChange(item.value)}
              />

              <Text
                style={[
                  styles.textStyle,
                  {textAlign: 'center', marginTop: 15},
                ]}>
                SELECT METER NUMBER{' '}
              </Text>

              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus && {borderColor: 'blue', backgroundColor: 'white'},
                  {textAlign: 'center'},
                ]}
                textStyle={styles.selectedTextStyle}
                itemTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.selectedTextStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                maxHeight={200}
                data={meterNumbers}
                labelField="label"
                valueField="value"
                placeholder={
                  meterNumbers.length > 0
                    ? meterNumbers[0].label
                    : 'Select Meter '
                }
                // placeholder="Select Meter"
                // placeholder="Select a property fhriohgiohrtsgio ceo iuxcrihiohespi iw rei fghioerhsh"

                value={selectedMeter}
                onChange={item => {
                  setSelectedMeterNumber(item.label);
                  setSelectedMeter(item.value);
                  setIsFocus(false);
                }}
                disable={meterNumbers?.length === 0}
                onFocus={() => setIsFocus(true)}
              />
              {/* <Text style={styles.label}>Select Meter Number:</Text>
      <Dropdown
        style={styles.dropdown}
        data={meterNumbers}
        labelField="label"
        valueField="value"
        placeholder="Select a meter number"
        value={selectedMeter}
        onChange={item => setSelectedMeter(item.value)}
        disable={meterNumbers.length === 0} // Disable if no meters available
      /> */}
              {/* <Dropdown
                style={[
                  styles.dropdown,
                  isFocus && {borderColor: 'blue', backgroundColor: 'white'},
                  {textAlign: 'center'},
                ]}
                textStyle={styles.selectedTextStyle}
                itemTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.selectedTextStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={processedMasterData}
                maxHeight={200}
                // data={meterNumbers}
                // labelField="label"
                // valueField="value"
                // placeholder="Select Meter number"
                // value={selectedMeter}
                // onChange={item => setSelectedMeter(item.value)}
                // disable={meterNumbers.length === 0} 
                labelField="meterNumber" // Use 'propertyName' as the label field
                valueField="propertyId" // Use 'meterId' as the value field
                placeholder={'Select Meter'}
                value={selectedValue ? selectedValue.propertyId : null} // Set the selected value here
                onFocus={() => setIsFocus(true)}
                onChange={item => {
                  setSelectedValue(item);
                }}
              /> */}

              {selectedPropertyName && (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    flex: 0.2,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={[
                      styles.textStyle,
                      {marginTop: 10, marginHorizontal: 15},
                    ]}>
                    {/* Property Name: {selectedValue.propName}
                     */}
                    Property Name: {selectedPropertyName}
                  </Text>
                  {/* <Text style={styles.textStyle}>EFT No: {selectedValue.eftNumber}</Text> */}
                </View>
              )}
            </View>
            <View style={{flex: 0.1}}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  flex: 0.2,
                  marginTop: 15,
                  marginBottom: 15,
                }}>
                <Text style={styles.textStyle}>ENTER TOPUP AMOUNT</Text>
                <View style={{flexDirection: 'row', alignContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: 32,
                      marginTop: 7,
                      fontFamily: 'Catamaran-Bold',
                      color: COLOR_LIST.DARK_CARD_BG,
                    }}>
                    R
                  </Text>
                  <TextInput
                    value={payFastAmt}
                    placeholder=""
                    keyboardType="numeric"
                    onChangeText={text => {
                      // Remove leading zeros
                      const trimmedValue = text.replace(/^0+/, '');

                      // Remove any non-numeric characters except one decimal point
                      const numericValue = trimmedValue.replace(/[^0-9.]/g, '');

                      // Ensure that the value is a valid float or empty string
                      if (
                        numericValue === '' || // Empty string is allowed
                        (/^\d*\.?\d*$/.test(numericValue) && // Valid float pattern
                          /^[1-9]\d*\.?\d*|0$/.test(numericValue)) // No leading zeros except for zero itself
                      ) {
                        setPayFastAmt(numericValue);
                      }
                    }}
                    style={{
                      fontSize: 32,
                      backgroundColor: 'transparent',
                      fontFamily: 'Catamaran-Bold',
                      fontWeight: '400',
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={{height: 50, backgroundColor: '#FFFFFF'}}>
              <View
                style={{
                  marginHorizontal: 60,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 5,
                }}>
                <TouchableHighlight
                  style={styles.suggestionButton}
                  onPress={() => handlePayFastAmt(100)}
                  underlayColor="#FDD">
                  <Text style={styles.suggestionTextStyle}>R 100</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.suggestionButton}
                  onPress={() => handlePayFastAmt(500)}
                  underlayColor="#FDD">
                  <Text style={styles.suggestionTextStyle}>R 500</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.suggestionButton}
                  onPress={() => handlePayFastAmt(1000)}
                  underlayColor="#FDD">
                  <Text style={styles.suggestionTextStyle}>R 1000</Text>
                </TouchableHighlight>
              </View>
            </View>
            {walletData?.balance > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  marginHorizontal: getWidthByScreenSize(12),
                }}>
                <View
                  style={{
                    backgroundColor: COLOR_LIST.BRIGHT_BG,
                    borderRadius: 10,
                    padding: 10,
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
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    disabled={false}
                    boxType="square"
                    style={{height: 50, width: 50, borderColor: 'black'}}
                    tintColors={{
                      true: COLOR_LIST.PRIMARY,
                      false: COLOR_LIST.DISABLED,
                    }}
                    value={toggleCheckBox}
                    onValueChange={newValue => setToggleCheckBox(newValue)}
                  />
                  <View style={{marginLeft: 12}}>
                    <Text
                      style={{
                        width: 150,
                        fontFamily: COLOR_LIST.FONT_REGULAR,
                        fontSize: 12,
                        fontWeight: '400',
                        color: '#9095A1FF',
                      }}>
                      {/* {props.mobile} */}
                      Use Wallet Balance
                    </Text>
                    <Text
                      style={{
                        fontSize: getFontSize(
                          walletData?.balance?.toString(),
                          32,
                          0.5,
                        ),
                        fontWeight: 700,
                        color: '#171A1FFF',
                      }}>
                      R {walletData?.balance || 0}
                      {/* {userDetailsData.firstName} {userDetailsData.lastName} */}
                      {/* {props.userName} */}
                    </Text>
                  </View>
                  <Image
                    source={walletIcon}
                    style={{
                      tintColor: COLOR_LIST.WALLET_BG,
                      height: 40,
                      width: 40,
                    }}
                  />
                </View>
              </View>
            ) : null}
            {payMethodsData?.length > 0
              ? payMethodsData?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{flexDirection: 'row', marginTop: 20}}>
                      <View
                        style={{
                          backgroundColor: COLOR_LIST.BRIGHT_BG,
                          borderRadius: 10,
                          padding: 10,
                          flexDirection: 'row',
                          alignSelf: 'center',
                          alignItems: 'center',
                          marginHorizontal: '10%',
                          width: '80%',
                          borderWidth: 1,
                          borderColor: COLOR_LIST.LABEL_TEXT,
                        }}>
                        {/* Use RadioButton instead of CheckBox */}
                        {/* <RadioButton.Android
                          value={item.id} // Value can be anything unique
                          status={
                            selectedPaymentMethod === item.id
                              ? 'checked'
                              : 'unchecked'
                          } // Check the selected payment method
                          onPress={() => setSelectedPaymentMethod(item.id)} // Set the selected payment method
                        /> */}
                        <RadioButton.Android
                          value={item.id} // Value can be anything unique
                          status={
                            selectedPaymentMethod === item.id
                              ? 'checked'
                              : 'unchecked'
                          } // Check the selected payment method
                          onPress={() => {
                            setSelectedPaymentMethod(item.id),
                              setSelectedPaymentMethodSlug(item.slug);
                          }} // Set the selected payment method
                        />
                        <View style={{marginLeft: 12}}>
                          <Text
                            style={{
                              fontSize: getFontSize(
                                walletData?.balance?.toString(),
                                18,
                                0.5,
                              ),
                              fontWeight: '700',
                              color: '#171A1FFF',
                            }}>
                            {/* Payment method balance */}
                            {item.displayName}
                          </Text>
                          <Text
                            style={{
                              fontFamily: COLOR_LIST.FONT_REGULAR,
                              fontSize: 12,
                              fontWeight: '400',
                              color: COLOR_LIST.PRIMARY,
                            }}>
                            {/* Payment method label */}
                            {item.name}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })
              : null}

            <View style={{alignItems: 'center', marginVertical: 20}}>
              <StatementButton
                title="PAY NOW"
                onClick={calculateFee}
                imageIcon={check}
              />
            </View>
          </View>
          {/* <Modal
            animationType="fade"
            transparent={true}
            visible={verifyToup}
            onRequestClose={() => setVerifyToup(false)}>
            <View style={styles.container}>
              <View style={styles.alertBox}>
                {feeCalculated ? (
                  <>
                    <Text style={styles.alertText}>Fee Calculations</Text>
                    <View
                      style={{
                        marginVertical: 0,
                        borderWidth: 1,
                        borderColor: '#DEE1E6',
                        width: '100%',
                      }}>
                      <View style={{backgroundColor: '#FFFFFF'}}>
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
                              fontSize: 14,
                              fontWeight: '700',
                              lineHeight: 22,

                              color: '#171A1FFF',
                            }}>
                            Topup Amount
                          </Text>

                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#171A1F',
                            }}>
                            {data?.amount >= 0
                              ? `R ${parseFloat(data?.amount).toFixed(2)}`
                              : 'Loading...'}
                          </Text>
                        </View>
                      </View>
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
                                fontFamily: 'Catamaran-Regular' ,
                                fontSize: 14,
                                fontWeight: '700',
                                lineHeight: 22,
                                color: '#171A1F',
                              }}>
                              Transaction Fee
                            </Text>
                          </View>

                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#171A1FFF',
                            }}>
                            {data?.transactionFee >= 0
                              ? `R ${parseFloat(data?.transactionFee).toFixed(
                                  2,
                                )}`
                              : 'Loading...'}
                          </Text>
                        </View>
                      </View>
                      <View style={{backgroundColor: '#FFFFFF'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: 16,
                            marginVertical: 9,
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Catamaran-Regular' ,
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#171A1F',
                            }}>
                            Recharge Amount
                          </Text>

                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#171A1FFF',
                            }}>
                            {data?.rechargeAmount >= 0
                              ? `R ${parseFloat(data?.rechargeAmount).toFixed(
                                  2,
                                )}`
                              : 'Loading...'}
                          </Text>
                        </View>
                      </View>
                      <View style={{backgroundColor: '#DEE1E6'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: 16,
                            marginVertical: 9,
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#171A1F',
                              fontFamily: 'Catamaran-Regular' ,
                            }}>
                            Meter Number
                          </Text>

                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#171A1FFF',
                            }}>
                            {data?.meterId >= 0
                              ? selectedValue?.meterNumber
                              : 'Loading...'}
                            
                          </Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={[styles.button, styles.confirmButton]}
                      onPress={goToPayment}>
                      <Text style={styles.buttonText}>PROCEED TO PAYMENT</Text>
                    </TouchableOpacity>
                  </>
                ) : calculationError === true ? (
                  <>
                    <Text style={styles.alertText}>
                      Calculating topup Error
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        lineHeight: 22,
                        color: '#171A1F',
                        fontFamily: 'Catamaran-Regular' ,
                      }}>
                      {data?.trailVendResponse?.response}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.alertText}>
                      Calculating topup fee..
                    </Text>
                    <ActivityIndicator
                      size="large"
                      color="#000"
                      style={styles.loader}
                    />
                  </>
                )}
              </View>
            </View>
          </Modal> */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={verifyToup}
            onRequestClose={() => {
              setVerifyToup(false);
              callToCancelTransaction(data.transactionID);
            }}
            // onRequestClose={() => setVerifyToup(false)}
          >
            <View style={styles.container}>
              <View style={styles.alertBox}>
                {feeCalculated ? (
                  <>
                    <Text style={styles.alertText}>Fee Calculations</Text>
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
                          <Text
                            style={{
                              fontFamily: 'Catamaran-Regular',
                              fontSize: 14,
                              fontWeight: '700',
                              lineHeight: 22,

                              color: '#171A1FFF',
                            }}>
                            Meter No.
                          </Text>

                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#171A1FFF',
                            }}>
                            {data?.meterId >= 0
                              ? selectedMeterNumber
                              : //  selectedValue?.meterNumber
                                'Loading...'}
                            {/* {data?.meterId 
      ? selectedValue?.meterNumber?.match(/\d+/)?.[0] || 'Loading...' 
      : 'Loading...'} */}
                          </Text>
                        </View>
                      </View>
                      <View style={{backgroundColor: '#FFFFFF'}}>
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
                              fontSize: 14,
                              fontWeight: '700',
                              lineHeight: 22,

                              color: '#171A1FFF',
                            }}>
                            Topup Amount
                          </Text>

                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#171A1F',
                            }}>
                            {data?.amount >= 0
                              ? `R ${parseFloat(data?.amount).toFixed(2)}`
                              : 'Loading...'}
                          </Text>
                        </View>
                      </View>
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
                                fontFamily: 'Catamaran-Regular',
                                fontSize: 14,
                                fontWeight: '700',
                                lineHeight: 22,
                                color: '#171A1F',
                              }}>
                              Transaction Fee
                            </Text>
                          </View>

                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#171A1FFF',
                            }}>
                            {data?.transactionFee !== undefined &&
                            data?.transactionFee !== null
                              ? `R ${parseFloat(data.transactionFee).toFixed(
                                  2,
                                )}`
                              : `R 0.00`}
                          </Text>
                        </View>
                      </View>

                      {/* {data?.trailVendResponse?.debtDescription && (
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
                                fontFamily: 'Catamaran-Regular',
                                fontSize: 14,
                                fontWeight: '700',
                                lineHeight: 22,
                                color: '#171A1F',
                              }}>
                              Debt
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#171A1FFF',
                            }}>
                            - R {data?.trailVendResponse.debt}.00
                          </Text>
                        </View>
                      )} */}

                      {/* {data?.trailVendResponse?.debtDescription && (
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
                              fontSize: 14,
                              fontWeight: '700',
                              lineHeight: 22,
                              color: '#171A1F',
                            }}>
                            Description:
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#171A1FFF',
                            }}>
                            {data?.trailVendResponse?.debtDescription?.slice(
                              0,
                              9,
                            )}
                          </Text>
                        </View>
                      )} */}

                      {/* <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: 16,
                            marginVertical: 9,
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text
                              style={{
                                fontFamily: 'Catamaran-Regular',
                                fontSize: 14,
                                fontWeight: '700',
                                lineHeight: 22,
                                color: '#171A1F',
                              
                              }}>
                              Debt 


                            </Text>
                          </View>

                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#171A1FFF',
                            }}>
                              - R {data.trailVendResponse.debt}
                          </Text>
                        </View>
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
                                fontSize: 14,
                                fontWeight: '700',
                                lineHeight: 22,
                                color: '#171A1F',
                            }}>
                              Description :  
                          </Text>

                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#171A1FFF',
                            }}>
                             {data.trailVendResponse.debtDescription }
{/* {data.trailVendResponse.debtDescription.length > 12 ? data.trailVendResponse.debtDescription.slice(0, 11) + "..." : data.trailVendResponse.debtDescription
} */}
                      {/* </Text>
                        </View> */}

                      <View style={{backgroundColor: '#DEE1E6'}}></View>
                      <View style={{backgroundColor: '#FFFFFF'}}>
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
                              fontSize: 14,
                              fontWeight: '700',
                              lineHeight: 22,

                              color: '#171A1FFF',
                            }}>
                            Recharge Amount
                          </Text>

                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#171A1FFF',
                            }}>
                            {data?.rechargeAmount >= 0
                              ? `R ${parseFloat(data?.rechargeAmount).toFixed(
                                  2,
                                )}`
                              : 'Loading...'}
                          </Text>
                        </View>
                      </View>

                      {data?.useWallet === true ? (
                        <View style={{backgroundColor: '#DEE1E6'}}>
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
                                fontSize: 14,
                                fontWeight: '700',
                                lineHeight: 22,

                                color: '#171A1FFF',
                              }}>
                              Wallet Amount Used
                            </Text>

                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: '400',
                                lineHeight: 22,
                                color: '#171A1FFF',
                              }}>
                              {data?.walletAmountUsed >= 0
                                ? `R ${parseFloat(
                                    data?.walletAmountUsed,
                                  ).toFixed(2)}`
                                : 'Loading...'}
                            </Text>
                          </View>
                        </View>
                      ) : null}

                      <View style={{backgroundColor: COLOR_LIST.DARK_CARD_BG}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: 16,
                            marginVertical: 9,
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#FFF',
                              fontFamily: 'Catamaran-Regular',
                            }}>
                            You have to pay
                          </Text>

                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              lineHeight: 22,
                              color: '#FFF',
                            }}>
                            {data?.amount >= 0
                              ? 'R ' +
                                (data?.amount - data?.walletAmountUsed).toFixed(
                                  2,
                                )
                              : 'Loading...'}
                            {/* {data?.meterId 
      ? selectedValue?.meterNumber?.match(/\d+/)?.[0] || 'Loading...' 
      : 'Loading...'} */}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={[styles.button, styles.confirmButton]}
                      onPress={goToPayment}>
                      <Text style={styles.buttonText}>{proceedTitle}</Text>
                    </TouchableOpacity>
                  </>
                ) : calculationError === true ? (
                  <>
                    <Text style={styles.alertText}>
                      Calculating topup Error
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        lineHeight: 22,
                        color: '#171A1F',
                        fontFamily: 'Catamaran-Regular',
                      }}>
                      {data?.trailVendResponse?.response}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.alertText}>
                      Calculating topup fee..
                    </Text>
                    <ActivityIndicator
                      size="large"
                      color="#000"
                      style={styles.loader}
                    />
                  </>
                )}
              </View>
            </View>
          </Modal>
        </ScrollView>
      )}
      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Bottom />
      </View>
    </SafeAreaView>
  );
};
export default Topup;
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Catamaran-SemiBold' /* Body */,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: '#171A1F',
    marginBottom: 10,
  },
  noteStyle: {
    fontFamily: 'Catamaran-SemiBold' /* Body */,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 22,
    color: COLOR_LIST.PRIMARY,
  },
  imageStyle: {
    width: 36,
    height: 36,
    marginHorizontal: 16,
    paddingRight: 30,
  },
  // placeholderStyle: {
  //   fontSize: 10,

  // },
  placeholderstyle: {
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
  selectedTextStyle: {
    // color: COLOR_LIST.TEXT,
    // fontSize: 14,
    // fontStyle: 'normal',

    // fontWeight: 600,
    // paddingLeft: 20,
    // lineHeight: 22,
    // borderColor:'red',borderWidth:2,
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
  iconStyle: {
    width: 24,
    height: 24,
    marginHorizontal: 16,
  },
  itemMainView: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    marginHorizontal: 28,
  },

  inputText: {
    fontSize: 18,
    color: '#424856',
    marginHorizontal: 12,
    height: 28,
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
  bankAccountText: {
    fontFamily: 'Catamaran-Bold',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 10,
    color: COLOR_LIST.TEXT,
  },
  bankAccountTitle: {
    fontFamily: 'Catamaran-Bold',
    fontSize: 20,
    fontWeight: '400',
    color: COLOR_LIST.BRIGHT_TEXT,
    backgroundColor: COLOR_LIST.DARK_CARD_BG,
    borderRadius: 10,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '70%',
  },
  alertText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  alertSubText: {
    fontSize: 14,
    marginBottom: 20,
    color: COLOR_LIST.TEXT,
  },
  confirmButton: {
    marginTop: 25,
    backgroundColor: '#FF6347', // Red color for logout
  },
  cancelButton: {
    backgroundColor: '#007bff', // Blue color for cancel
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
  loader: {
    marginTop: 10,
  },
  dropdown: {
    marginHorizontal: 70,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor: 'white',
    borderRadius: 26,
  },

  suggestionButton: {
    height: 36,
    width: 100,
    backgroundColor: '#FEF1F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 8,
  },
  suggestionTextStyle: {
    textAlign: 'center',
    color: '#EC3237',
  },
});

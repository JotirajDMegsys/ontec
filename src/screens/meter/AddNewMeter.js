import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
  Pressable,
} from 'react-native';

import {BackgroundColor} from '../../helpers/constants';
import {ScrollView} from 'react-native-gesture-handler';
import Scan from '../../assets/meterIcon/Scan.png';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import {TextInput} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Calender from '../../assets/Calendar.png';
import Upload from '../../assets/upload.png';
//updateButton
import {UpdateButton, DeleteButton} from '../../components/common';
import Check from '../../assets/check.png';
import Remove from '../../assets/remove.png';
import Delete from '../../assets/delete.png';
import Bottom from '../../components/Bottom';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
//icons
import {getAllIcons} from '../../redux/slice/getAllIcons';
import {getMeterDetails, resetMeterDetails} from '../../redux/slice/getMeterDetails';
import {deleteMeter, resetGetDeleteMeter} from '../../redux/slice/deleteMeter';
import {clearStates, verifyMeter} from '../../redux/slice/verifyMeter';
import {COLOR_LIST} from '../../helpers/colorlist';
import {API_VERSION, API_BASE_URL} from '../../helpers/enum';
import {getWidthByScreenSize} from '../../helpers/commonFunction';
import {UTILITY} from '../../helpers/meterData';
const AddNewMeter = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  const meterid = route.params?.meterid;
  const isUpdate = route.params?.isUpdate;
  const propertyId = route.params?.propertyId;
  // console.log("route.params?.propertyId",route.params?.propertyId);
  // console.log(propertyId);
  const title = route.params?.title;
  const [open, setOpen] = useState(false);

  const {
    getMeterDetailsIsLoading,
    getMeterDetailsData,
    getMeterDetailsIsSuccess,
    getMeterDetailsIsError,
  } = useSelector(state => ({
    getMeterDetailsIsLoading: state.meter.getMeterDetailsIsLoading,
    getMeterDetailsData: state.meter.getMeterDetailsData,
    getMeterDetailsIsSuccess: state.meter.getMeterDetailsIsSuccess,
    getMeterDetailsIsError: state.meter.getMeterDetailsIsError,
  }));

  // console.log('getMeterDetailsData', getMeterDetailsData);
  useEffect(() => {
    if (isUpdate === true) {
      let dataObj = {
        id: meterid,
      };
      // console.log(dataObj,"ooooooooooooo");
      dispatch(getMeterDetails(dataObj));
      
    }
  }, []);

  const {
    verifyMeterIsLoading,
    verifyMeterData,
    verifyMeterIsError,
    verifyMeterIsSuccess,
  } = useSelector(state => ({
    verifyMeterIsLoading: state.meterVerify.verifyMeterIsLoading,
    verifyMeterData: state.meterVerify.verifyMeterData,
    verifyMeterIsError: state.meterVerify.verifyMeterIsError,
    verifyMeterIsSuccess: state.meterVerify.verifyMeterIsSuccess,
  }));

  const [verified, setVerified] = useState('');
  useEffect(() => {
    if (verifyMeterIsSuccess && verifyMeterData){
      setSelectedItem(verifyMeterData?.utilityType);
      setmeterId(verifyMeterData?.utilityId);
       setVerified(verifyMeterData?.message);
     } else if(verifyMeterData && verifyMeterIsError) {
      setVerified(verifyMeterData?.errors?.MeterNumber[0]);
      setIsButtonDisabled(false)

    }
  }, [verifyMeterData]);


  console.log(verified,"getMeterDetailsData?.meterAliasmmmmm");
  useEffect(() => {
    if (getMeterDetailsIsLoading === true) {
      setSpinner(true);
      setMeterNumber('');
    } else if (getMeterDetailsIsSuccess && getMeterDetailsData && isUpdate) {
      setSpinner(false);
      setMeterNumber(getMeterDetailsData?.meterNumber);
      setMeterAlias(getMeterDetailsData?.meterAlias !== null ? getMeterDetailsData.meterAlias : '');
      setDailyTargetConsumption(getMeterDetailsData?.dailyTargetConsumption.toString());
      // if(getMeterDetailsData?.meterDocument){
      //   setContractProof(getMeterDetailsData?.meterDocument);
      //   setContractType(getMeterDetailsData?.meterDocument);
        
      // }
      if (getMeterDetailsData?.meterDocument) {
        const contractProof = getMeterDetailsData.meterDocument;
        
        const displayContractProof = contractProof.length > 25
          ? `...${contractProof.substring(contractProof.length - 25)}` 
          : contractProof;
      
          setContractType(displayContractProof);
          setContractProof(getMeterDetailsData.meterDocument);
      }
      if(getMeterDetailsData?.contractEndDate){
        setSelectedDate(
          moment(getMeterDetailsData?.contractEndDate).format('DD/MM/YYYY'),
        );
        setSelectedDateForBackend(
          moment(getMeterDetailsData?.contractEndDate).format('YYYY-MM-DD'),
        );
      }
      setSelectedItem(getMeterDetailsData?.meterType);
      setmeterId(getMeterDetailsData?.meterTypeId);
      setId(getMeterDetailsData.id);
      setPropertyid(getMeterDetailsData.propertyId);
      // console.log(getMeterDetailsData.propertyId,"getMeterDetailsData.propertyIdgetMeterDetailsData.propertyId");
    }
  }, [getMeterDetailsData]);


  const [id, setId] = useState(0);
  const [propertyid, setPropertyid] = useState(propertyId);

  const [meterNumber, setMeterNumber] = useState('');
  const [meterAlias, setMeterAlias] = useState('');
  const [dailyTargetConsumption, setDailyTargetConsumption] = useState('');
  const [contractProof, setContractProof] = useState('');
  const [contractType, setContractType] = useState('Select Document');
  const [selectedDate, setSelectedDate] = useState('Contract End Date');
  const [selectedDateForBackend, setSelectedDateForBackend] =
    useState('YYYY-MM-DD');
  const [selectedItem, setSelectedItem] = useState('');
  const [meterId, setmeterId] = useState(null);
  const [iconList, setIconList] = useState([]);
  const [dropdown, setDropDown] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [modalVisibleCalender, setModalVisibleCalender] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [country, setCountry] = useState('1');
  const [deleteTitle, setDeleteTitle] = useState('Remove');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);




  // for icons
  //Api part
  const {
    getAllIconsIsLoading,
    getAllIconsData,
    getPropertiesList,
    getAllIconsIsSuccess,
    getAllIconsIsError,
  } = useSelector(state => ({
    getAllIconsIsLoading: state.icons.getAllIconsIsLoading,
    getAllIconsData: state.icons.getAllIconsData,
    getPropertiesList: state.icons.getPropertiesList,
    getAllIconsIsSuccess: state.icons.getAllIconsIsSuccess,
    getAllIconsIsError: state.icons.getAllIconsIsError,
  }));

  const {
    deleteMeterLoding,
    deleteMeterData,
    deleteMeterIsSuccess,
    deleteMeterIsError,
  } = useSelector(state => ({
    deleteMeterLoding: state.deleteMeters.deleteMeterLoding,
    deleteMeterData: state.deleteMeters.deleteMeterData,
    deleteMeterIsError: state.deleteMeters.deleteMeterIsError,
    deleteMeterIsSuccess: state.deleteMeters.deleteMeterIsSuccess,
  }));
  // console.log("deleteMeterDatadeleteMeterData",deleteMeterData,"deleteMeterDatadeleteMeterData");

  // useEffect(() => {
  //   if (deleteMeterData != "" && deleteMeterIsSuccess===true && deleteMeterIsError===false) {
  //     setModalVisible(false);
  //     setDeleteTitle("Delete")


  //     toast.show(deleteMeterData, {
  //       type: 'success',
  //       placement: 'top',
  //       duration: 3000,
  //       offset: 30,
  //       animationType: 'zoom-in',
  //     });
  //     navigation.push('meterList', {propertyId: propertyId, title: title});
  //     setVerified('');

  //     dispatch(resetGetDeleteMeter());
  //   }
  // }, [deleteMeterData]);


  useEffect(() => {
    if (deleteMeterData !== "" && deleteMeterIsSuccess === true && deleteMeterIsError === false) {
      setModalVisible(false);
      setDeleteTitle("Remove");
  
      toast.show("Meter removed successfully", {
        type: 'success',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'zoom-in',
      });

      navigation.push('meterList', { propertyId: propertyId, title: title });
      setVerified('');
      setDeleteButtonDisabled(false);

  
      dispatch(resetGetDeleteMeter());
    }
  }, [deleteMeterData, deleteMeterIsSuccess, deleteMeterIsError]);
  
  // console.log(contractType,"contracttype");

  

  useEffect(() => {
    getIcons();
  }, []);

  useEffect(() => {
    if (getAllIconsData && getPropertiesList && getAllIconsIsSuccess) {
      setSpinner(false);
      if (getAllIconsData.length > 0 && getPropertiesList.length) {
        setIconList(getAllIconsData);
        setDropDown(getPropertiesList);
        if (!isUpdate) setOpen(true);
      } else {
        setIconList([]);
        setDropDown([]);
      }
    }
    setSpinner(false);
  }, [getAllIconsData, getPropertiesList, getAllIconsIsSuccess]);

  const getIcons = async () => {
    let userId = await AsyncStorage.getItem('userId');
    let dataObj = {
      ownerId: userId,
    };
    setSpinner(true);
    dispatch(getAllIcons(dataObj));
  };


  
  const [serverErrors,setServerErrors] = useState([]);
  // console.log(serverErrors,"serverEroors");


 
  const validationSchema = Yup.object().shape({
    meterNumber: Yup.string()
      .matches(/^[A-Z0-9]+$/, 'Meter number must be uppercase alphanumeric')
      .required('Meter number is required'),
    dailyTargetConsumption: Yup.string()
      .required('Daily target consumption is required')
      // .integer('Daily target consumption must be an integer')
      // .typeError('Daily target consumption must be a number')
  });
  
  const updateValidationSchema = Yup.object().shape({
    meterNumber: Yup.string()
      .matches(/^[A-Z0-9]+$/, 'Meter number must be uppercase alphanumeric')
      .required('Meter number is required'),
    dailyTargetConsumption: Yup.string()
      .required('Daily target consumption is required')
      // .integer('Daily target consumption must be an integer')
      // .typeError('Daily target consumption must be a number')
  });
  
  const onClickAddMeter = async () => {
    console.log('submit');
    setSpinner(true);
  
  //   try {
  //     setSpinner(true);
  //     const schema = isUpdate ? updateValidationSchema : validationSchema;
      
  //     await schema.validate(
  //       {
  //         meterNumber,
  //         dailyTargetConsumption: dailyTargetConsumption,
  //       },
  //       { abortEarly: false }
  //     );
  //    if( verified ==="")  setIsButtonDisabled(true)
    
  //     console.log('submit 2');
  //     const formData = new FormData();
  //     formData.append('Id', id);
  //     formData.append('PropertyId', propertyid);
  //     formData.append('MeterNumber', meterNumber);
  //     formData.append('MeterAlias', meterAlias);
  //     formData.append('DailyTargetConsumption', parseInt(dailyTargetConsumption));
  //     formData.append('ContractProofDocument', contractProof);
      
  //     formData.append('ContractEndDate', selectedDateForBackend === 'YYYY-MM-DD' ? '' : selectedDateForBackend);
  //     formData.append('ContractProofDocumentTypeId', "null");
  //     formData.append('ContractProofDocumentId', "null");
  //     formData.append('StatusId', 1);
  //     formData.append('MeterTypeId', meterId);
  
  //     const accessToken = await AsyncStorage.getItem('accessToken');
  //     console.log('formatat..... ..', formData);
  //     // setIsButtonDisabled(true)
  //     const response = await fetch(
  //       `${API_BASE_URL}api/meter/edit?api-version=${API_VERSION}`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //           Authorization: 'Bearer ' + accessToken,
  //         },
  //         body: formData,
  //       }
  //     );
  //     // console.log(response, "response");
  
  //     if (response.status === 200) {
  //       setIsButtonDisabled(false)

  //       let toastMessage = isUpdate
  //       ? 'Meter updated successfully!'
  //       : 'Meter added successfully!';
  //     toast.show(toastMessage, {
  //       type: 'success',
  //       placement: 'top',
  //       duration: 3000,
  //       offset: 30,
  //       animationType: 'zoom-in',
  //     });
  //     setServerErrors({});
  //     setId('');
  //     setPropertyid('')
  // setMeterNumber('');setMeterAlias('')
  // setDailyTargetConsumption('');
  // setContractProof('');
  // setContractType('');
  // setSelectedDate('');
  // setSelectedDateForBackend('');
  // setSelectedItem('');
  // setmeterId('');      setVerified('');

  // dispatch(resetMeterDetails());
  //       navigation.navigate('meterList', {
  //         propertyId: propertyId,
  //         title: title,
  //       });
       
  
  //     } else {
  //       if (response.status === 400) {
  //         setIsButtonDisabled(false)

  //         const data = await response.json();
  //         // console.log(data?.errors?.DailyTargetConsumption, 'hfiheofoeroforofo');
  //         setServerErrors(data?.errors);
  //       }
  //     }
  //   } 
  try {
    setSpinner(true);
    const schema = isUpdate ? updateValidationSchema : validationSchema;
  
    // Validate the schema
    await schema.validate(
      {
        meterNumber,
        dailyTargetConsumption: dailyTargetConsumption,
      },
      { abortEarly: false }
    );

  if (isUpdate   || verified === "Meter verified successfully!") {
    setIsButtonDisabled(true);

    console.log('submit 2');

    const formData = new FormData();
    formData.append('Id', id);
    formData.append('PropertyId', propertyid);
    formData.append('MeterNumber', meterNumber);
    formData.append('MeterAlias', meterAlias);
    formData.append('DailyTargetConsumption', parseInt(dailyTargetConsumption));
    formData.append('ContractProofDocument', contractProof);
    formData.append('ContractEndDate', selectedDateForBackend === 'YYYY-MM-DD' ? '' : selectedDateForBackend);
    formData.append('ContractProofDocumentTypeId', "null");
    formData.append('ContractProofDocumentId', "null");
    formData.append('StatusId', 1);
    formData.append('MeterTypeId', meterId);

    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log('formatat..... ..', formData);
    const response = await fetch(
            `${API_BASE_URL}api/meter/edit?api-version=${API_VERSION}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + accessToken,
              },
              body: formData,
            }
          );
          console.log(response, "response");
      
          if (response.status === 200) {
            setIsButtonDisabled(false)
    
            let toastMessage = isUpdate
            ? 'Meter updated successfully!'
            : 'Meter added successfully!';
          toast.show(toastMessage, {
            type: 'success',
            placement: 'top',
            duration: 3000,
            offset: 30,
            animationType: 'zoom-in',
          });
          setServerErrors({});
          setId('');
          setPropertyid('')
      setMeterNumber('');setMeterAlias('')
      setDailyTargetConsumption('');
      setContractProof('');
      setContractType('');
      setSelectedDate('');
      setSelectedDateForBackend('');
      setSelectedItem('');
      setmeterId('');      setVerified('');
    
      dispatch(resetMeterDetails());
            navigation.navigate('meterList', {
              propertyId: propertyId,
              title: title,
            });
          }    
    
    else if (response.status === 400) {
      setIsButtonDisabled(false);
      const data = await response.json();
  
      console.error('Validation errors from server:', data);
      setServerErrors(data?.errors);
    }
  } else {
    // Handle case when meter is not verified
    console.log('Meter verification failed. API call not made.');
  }
}
  catch (error) {
      if (error.inner) {
        const validationErrors = {};
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Error submitting form:', error);
      }
    } finally {
      setSpinner(false);
    }
  };
  // const validationSchema = Yup.object().shape({
  //   meterNumber: Yup.string()
  //     .matches(/^[A-Z0-9]+$/, 'Meter number must be uppercase alphanumeric')
  //     .required('Meter number is required'),
  //   // meterAlias: Yup.string(),
  //   dailyTargetConsumption: Yup.number()
  //     .required('Daily target consumption is required')
  //     .integer('Daily target consumption must be an integer')
  //     .typeError('Daily target consumption is required')
  // });

  // const updateValidationSchema = Yup.object().shape({
  //   meterNumber: Yup.string()
  //     .matches(/^[A-Z0-9]+$/, 'Meter number must be uppercase alphanumeric')
  //     .required('Meter number is required'),

  //   // meterAlias: Yup.string(),
  //   dailyTargetConsumption: Yup.number()
  //   .required('Daily target consumption is required')
  //   .integer('Daily target consumption must be an integer')
  //   .typeError('Daily target consumption is required')
  // });

  // const onClickAddMeter = async () => {
  //   console.log('submit ');
  //   try {
  //     setSpinner(true);
  //     if (isUpdate) {
  //       await updateValidationSchema.validate(
  //         {
  //           meterNumber,
  //           // meterAlias,
  //           dailyTargetConsumption,
  //         },
  //         {abortEarly: false},
  //       );
  //     } else {
  //       await validationSchema.validate(
  //         {
  //           meterNumber,
  //           // meterAlias,
  //           dailyTargetConsumption,
  //         },
  //         {abortEarly: false},
  //       );
  //     }
  //     console.log('submit 2');
  //     const formData = new FormData();
  //     // console.log(contractEndDate);
  //     formData.append('Id', id);
  //     formData.append('PropertyId', propertyid);
  //     formData.append('MeterNumber', meterNumber);
  //     formData.append('MeterAlias', meterAlias);
  //     formData.append(
  //       'DailyTargetConsumption',
  //       parseInt(dailyTargetConsumption),
  //     );
  //     formData.append('ContractProofDocument', contractProof);
  //     formData.append('ContractEndDate', selectedDateForBackend || '');
  //     formData.append('ContractProofDocumentTypeId',"null" );
  //     formData.append('ContractProofDocumentId', "null");
  //     formData.append('StatusId', 1);
  //     formData.append('MeterTypeId', meterId);
  //     const accessToken = await AsyncStorage.getItem('accessToken');
  //     console.log('formatat..... ..', formData);
  //     try {
  //       const response = await fetch(
  //         `${API_BASE_URL}api/meter/edit?api-version=${API_VERSION}`,

  //         {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //             Authorization: 'Bearer ' + accessToken,
  //           },
  //           body: formData,
  //         },
  //       );
  //       if (!response.ok) {
  //         // setServe
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       let toastMessage = isUpdate
  //         ? 'Meter updated successfully!'
  //         : 'Meter added successfully!';
  //       toast.show(toastMessage, {
  //         type: 'success',
  //         placement: 'top',
  //         duration: 3000,
  //         offset: 30,
  //         animationType: 'zoom-in',
  //       });
  //       navigation.navigate('meterList', {
  //         propertyId: propertyId,
  //         title: title,
  //       });
  //     } catch (error) {
  //       console.error('Error:', error.message);
  //     }
  //   } catch (error) {
  //     // Validation failed, set errors
  //     const validationErrors = {};
  //     error.inner.forEach(err => {
  //       validationErrors[err.path] = err.message;
  //     });
  //     setErrors(validationErrors);
  //   }
  //   setVerified('');
  //   setSpinner(false);
  // };
  const handleItemClick = (item, id) => {
    setSelectedItem(item);
    setmeterId(id);
    return;
  };
  const renderMeterTypeFields = () => {
    let meterId, meterName;

    const selectedItemInfo = iconList.find(item => item.name === selectedItem);

    if (selectedItemInfo) {
      meterId = selectedItemInfo.id;
      meterName = selectedItemInfo.name;
      unit = selectedItemInfo.otherText;
    } else {
      meterId = 0;
      meterName = '';
      unit = '';
    }

    // redux
    return (
      <View>
        <TextInput
          label={
            <Text>
              <Text>{"Daily Target Consumption "}</Text>

              {/* <Text>{`Daily Target Consumption ${meterName} ${unit}`}</Text> */}
              <Text style={{color: 'red'}}> *</Text>
            </Text>
          }
          keyboardType="numeric"
          mode="outlined"
            placeholder={"Enter Daily Target "}

          // placeholder={`Enter Daily Target for ${meterName} ${unit}`}
          style={{}}
          onChangeText={setDailyTargetConsumption}
          value={dailyTargetConsumption}
        />

        {errors.dailyTargetConsumption && (
          <Text style={{color: 'red'}}>{errors.dailyTargetConsumption}</Text>
        )}
         {serverErrors.DailyTargetConsumption && (
                    <Text style={{color: 'red'}}>{serverErrors.DailyTargetConsumption}</Text>
                  )}
      </View>
    );
  };

  //for Calendar

  const onClickSelectDate = async date => {
    let selectedDateFormatted = moment(date).format('DD/MM/YYYY');
    let selectedDateForBackend = moment(date).format('YYYY-MM-DD');
    const currentDate = moment();
    const selectedDateMoment = moment(date);
    if (selectedDateMoment.isSameOrAfter(currentDate, 'day')) {
      setSelectedDate(selectedDateFormatted);
      setSelectedDateForBackend(selectedDateForBackend);
      setModalVisibleCalender(false);
    } else {
      alert("Please select today's date or a future date.");
    }
  };
  const [sizeError, setSizeError] = useState('');
  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });

      if (doc) {
        // Check if file size is less than or equal to 5KB
        if (doc.size <= 5000 * 1024) {
          // Convert KB to Bytes (1KB = 1024 Bytes)
          setContractProof(doc);
          setContractType(doc.type);
          setSizeError('');
        } else {
          // console.log('File size exceeds 50KB');
          setSizeError('File size exceeds 5Mb');
          // You can add an error state or display an error message to the user here
        }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the upload', err);
      } else {
        console.log(err);
      }
    }
  };

  // const processCancel = () => {
  //   navigation.push('meterList', {propertyId: propertyId, title: title});
  // };
  const processCancel = () => {
    dispatch(clearStates());
    
    setId('');
    setPropertyid('')
setMeterNumber('');setMeterAlias('')
setDailyTargetConsumption('');
setContractProof('');
setContractType('');
setSelectedDate('');
setSelectedDateForBackend('');
setSelectedItem('');
setmeterId('');
setVerified('');

dispatch(resetMeterDetails());
// console.log("opopopopopppopppppopopopopo");
//
    navigation.navigate('meterList', {propertyId: propertyId, title: title});
  };
  
   console.log(verified);

  const [errors, setErrors] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const popupOn = () => setModalVisible(true);

  const handleCancel = () => {
    console.log('opopopp');

    setModalVisible(false);
  };
  const handleDelete = () => {
    setDeleteButtonDisabled(true)
    setDeleteTitle("Processing..")


    // console.log('come to function');
    let dataObj = {
      id: meterid,
    };
    // console.log(dataObj,"DATATATATA");
    dispatch(deleteMeter(dataObj));
          dispatch(resetMeterDetails());
          

    // navigation.navigate('meterList', {propertyId: propertyId, title: title});
  };

  const handleBlur = () => {
    setVerified('Verifying meter number...');
    meterVerification(meterNumber);
  };
  const meterVerification = inputText => {
    let dataObj = {
      propertyId: propertyId,
      meterNumber: meterNumber,
    };
    // dispatch()
    dispatch(verifyMeter(dataObj));
  };

  const currentDate = new Date();

  const contractEDate = new Date(getMeterDetailsData.contractEndDate);

  const isDateValid = contractEDate <= currentDate;

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#F8F9FA'}}>
        <ScrollView style={{flex: 0.8}}>
          <Spinner
            visible={spinner}
            textContent={'Loading...'}
            // textStyle={styles.spinnerTextStyle}
            customIndicator={<View style={{}} />}
            overlayColor="rgba(0, 0, 0, 0.6)"
            animation="fade"
          />
          <View style={{marginVertical: 60}}>
            <View
              style={{
                flex: 0.2,

                marginHorizontal: 22,
              }}>
              <Text
                style={{
                  marginHorizontal: 30,
                  // width: 349,
                  fontFamily: 'Catamaran-Regular' /* Body */,
                  fontSize: 30,
                  fontWeight: '700',
                  lineHeight: 46,
                  color: '#171A1FFF',
                  textAlign: 'center',
                }}>
                {/* Add New Meter */}
                {isUpdate === true ? 'Update Meter' : 'Add New Meter'}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: 10,
                  // marginRight:15,
                  width: '100%',
                  paddingHorizontal: 20,
                  justifyContent: 'space-between',

                  //  alignContent:'flex-start',
                }}>
                {isUpdate
                  ? null
                  : iconList.map((item, index) => (
                      <TouchableOpacity
                        key={item.id}
                        // onPress={() => handleItemClick(item.name, item.id)}
                        style={{justifyContent: 'space-evenly'}}>
                        <Image
                          source={
                            selectedItem === item.name
                              ? UTILITY[item.name].icon
                              : UTILITY[item.name].greyIcon
                          }
                          style={{
                            height: selectedItem === item.name ? 34 : 34,
                            width: selectedItem === item.name ? 34 : 34,

                            resizeMode: 'center',
                            alignSelf: 'center',
                            // alignContent:'center'
                          }}
                        />
                        <Text
                          style={{
                            marginTop: 5,
                            fontStyle: 'normal',
                            // marginRight: 15,/
                            fontWeight: '800',
                            lineHeight: 16,
                            textAlign: 'center',
                            fontSize: 10,
                            color: 'black',
                          }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
              </View>
            </View>
            <View style={styles.itemMainView}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                {/* {touched.property && errors.property && (
                  <Text style={styles.errorInputText}>{errors.property}</Text>
                )} */}
                <Dropdown
                  style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                  inputSearchStyle={{fontSize: 16, color: '#171A1FFF'}}
                  placeholderStyle={{
                    fontSize: 16,
                    color: '#171A1FFF',
                    marginHorizontal: 3,
                  }}
                  selectedTextStyle={{
                    fontSize: 16,
                    color: '#171A1FFF',
                    marginHorizontal: 2,
                  }}
                  iconStyle={{marginHorizontal: 2}}
                  data={dropdown}
                  // search
                  disable={true}
                  maxHeight={400}
                  labelField="name"
                  valueField="id"
                  placeholder={route.params.title}
                  searchPlaceholder="Search Properties"
                  value={country}
                  onFocus={() => setIsFocus(true)}
                  // onChange={selectedItem => {
                  //   // console.log(selectedItem);
                  // }}
                />
              </View>
            </View>

            {isUpdate ? (
              <View style={styles.itemMainView}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <TextInput
                    label={
                      <Text>
                        <Text>Meter Number</Text>
                        <Text style={{color: 'red'}}> *</Text>
                      </Text>
                    }
                    mode="outlined"
                    placeholder="Enter Meter Number"
                    style={{}}
                    disabled={true}
                    onChangeText={setMeterNumber}
                    // onFocus={() => setVerified('')} // Clear the verified state when TextInput is clicked

                    // onBlur={handleBlur}
                    value={meterNumber}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.itemMainView}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <TextInput
                    label={
                      <Text>
                        <Text>Meter Number</Text>
                        <Text style={{color: 'red'}}> *</Text>
                      </Text>
                    }
                    mode="outlined"
                    placeholder="Enter Meter Number"
                    style={{}}
                    onChangeText={setMeterNumber}
                    onFocus={() => setVerified('')} // Clear the verified state when TextInput is clicked
                    onBlur={handleBlur}
                    value={meterNumber}
                  />
                  {verified && (
                    <Text
                      style={{
                        color: verifyMeterIsLoading
                          ? COLOR_LIST.SUCCESS
                          : verifyMeterIsSuccess
                          ? COLOR_LIST.SUCCESS
                          : COLOR_LIST.ERROR,
                      }}>
                      {verified}
                    </Text>
                  )}
                  {errors.meterNumber && (
                    <Text style={{color: 'red'}}>{errors.meterNumber}</Text>
                  )}
                     {serverErrors.MeterNumber && (
                    <Text style={{color: 'red'}}>{serverErrors.MeterNumber}</Text>
                  )}
                    
                </View>
              </View>
            )}

            <View style={styles.itemMainView}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TextInput
                  label={
                    <Text>
                      <Text>Meter Alias</Text>
                      {/* <Text style={{ color: 'red' }}> *</Text> */}
                    </Text>
                  }
                  keyboardType="default"
                  mode="outlined"
                  placeholder="Enter Meter Alias"
                  style={{}}
                  onChangeText={setMeterAlias}
                  value={meterAlias}
                />
                {errors.meterAlias && (
                  <Text style={{color: 'red'}}>{errors.meterAlias}</Text>
                )}
              </View>
            </View>
            <View style={styles.itemMainView}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                {renderMeterTypeFields()}
              </View>
            </View>

            {/* select Doc */}
            {isUpdate === true ? (
              <View>
                <View style={styles.itemMainView}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <TouchableOpacity
                      onPress={
                        isDateValid === true ||
                        getMeterDetailsData?.status === 'Rejected'
                          ? selectDoc
                          : null
                      }
                      disabled={
                        isDateValid === true ||
                        getMeterDetailsData?.status === 'Rejected'
                          ? false
                          : true
                      }>
                      <TextInput
                        style={{backgroundColor: 'white'}}
                        // value={`... ${contractProof?.substring(
                        //   contractProof.length - 25,
                        // )}`}
                        value={contractProof}
                        disabled={true}
                        placeholder={contractType}
                        autoCapitalize="none"
                      />
                      {errors.contractProof && (
                        <Text style={{color: 'red'}}>
                          {errors.contractProof}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 0.2, justifyContent: 'center'}}>
                    <TouchableOpacity
                       onPress={
                        isDateValid === true ||
                        getMeterDetailsData?.status === 'Rejected' || !contractProof
                          ? selectDoc
                          : null
                      }
                      disabled={
                        isDateValid === true ||
                        getMeterDetailsData?.status === 'Rejected' || !contractProof
                          ? false
                          : true
                      }>
                      <Image
                        source={Upload}
                        style={{
                          alignSelf: 'center',
                          justifyContent: 'center',
                          height: 36,
                          width: 36,
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <View style={styles.itemMainView}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <TouchableOpacity
                      onPress={selectDoc}
                      // disabled={isUpdate}
                    >
                      <TextInput
                        style={{backgroundColor: 'white'}}
                        value={contractProof}
                        disabled={true}
                        // disabled={isUpdate === true ? true : false}

                        placeholder={contractType}
                        autoCapitalize="none"
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 0.2, justifyContent: 'center'}}>
                    <TouchableOpacity
                      onPress={isUpdate ? null : selectDoc}
                      disabled={isUpdate}>
                      <Image
                        source={Upload}
                        style={{
                          alignSelf: 'center',
                          justifyContent: 'center',
                          height: 36,
                          width: 36,
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{marginHorizontal: 28, marginVertical: 5}}>
                  <Text style={{color: '#565D6D'}}>
                    Allowed Type: pdf; size: 5 MB
                  </Text>
                  <Text style={{color: 'red'}}>{sizeError}</Text>
                </View>
              </View>
            )}

            {isUpdate ? (
              <>
              <View style={styles.itemMainView}>
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: '#FFFFFFFF',
                  height: 50,
                  justifyContent: 'center',
                  alignContent: 'center',
                  borderRadius: 3,
                  borderWidth: 0.2,
                }}
                onPress={
                  isDateValid === true ||
                  getMeterDetailsData?.status === 'Rejected'
                    ? () => setModalVisibleCalender(true)
                    : null
                }
                disabled={
                  isDateValid === true ||
                  getMeterDetailsData?.status === 'Rejected'
                    ? false
                    : true
                }>
                <View>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 16,
                      color: '#565D6D',
                    }}>
                    {selectedDate}
                  </Text>
                </View>
              </Pressable>

              <View style={{flex: 0.2, justifyContent: 'center'}}>
                <View
                  style={{
                    backgroundColor: '#EC3237',
                    width: 36,
                    height: 36,
                    marginHorizontal: 10,
                    borderRadius: 26,
                  }}>
                  <TouchableOpacity
                    onPress={
                      isDateValid === true ||
                      getMeterDetailsData?.status === 'Rejected'
                        ? () => setModalVisibleCalender(true)
                        : null
                    }
                    disabled={false}>
                    <Image
                      source={Calender}
                      style={{
                        marginVertical: 6,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        height: 24,
                        width: 24,
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {serverErrors.ContractEndDate && (
                <Text style={{color: 'red',flexWrap:'wrap', marginHorizontal: 18}}>{serverErrors.ContractEndDate}</Text>
              )}
            </>
            ) : (
              <View style={styles.itemMainView}>
                <Pressable
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFFFF',
                    height: 50,
                    justifyContent: 'center',
                    alignContent: 'center',
                    borderRadius: 3,
                    borderWidth: 0.2,
                  }}
                  onPress={() => {
                    setModalVisibleCalender(true);
                  }}>
                  <View>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        fontSize: 16,
                        color: '#565D6D',
                      }}>
                      {selectedDate}
                    </Text>
                  </View>
                </Pressable>

                <View style={{flex: 0.2, justifyContent: 'center'}}>
                  <View
                    style={{
                      backgroundColor: '#EC3237',
                      width: 36,
                      height: 36,
                      marginHorizontal: 10,
                      borderRadius: 26,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisibleCalender(true);
                      }}>
                      <Image
                        source={Calender}
                        style={{
                          marginVertical: 6,
                          alignSelf: 'center',
                          justifyContent: 'center',
                          height: 24,

                          width: 24,
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 20,
              }}>
              <UpdateButton
                title="CANCEL"
                onClick={ isButtonDisabled ? null : processCancel}
                imageIcon={Remove}
              />
              <UpdateButton
                title={isUpdate === true ? 'UPDATE' : 'SAVE'}
                onClick={ isButtonDisabled ? null : onClickAddMeter}
                imageIcon={Check}
              />
            </View>

            {isUpdate === true ? (
              <View style={{marginVertical: 5, alignItems: 'center'}}>
                <DeleteButton
                  title="REMOVE METER"
                  imageIcon={Delete}
                  onClick={popupOn}
                />
              </View>
            ) : null}
          </View>
        </ScrollView>

        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <Bottom />
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
                  Are you sure to remove this meter?
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.logoutButton]}
                    onPress={ deleteButtonDisabled ? null : handleDelete}>
                    <Text style={styles.buttonText}>{deleteTitle}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={ deleteButtonDisabled ? null : handleCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
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
                  startFromMonday={true}
                  scrollable={true}
                  todayBackgroundColor="#f2e6ff"
                  selectedDayColor="#7300e6"
                  selectedDayTextColor="#FFFFFF"
                  onDateChange={date => {
                    onClickSelectDate(date);
                  }}
                />
              </View>
            </View>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </>
  );
};
export default AddNewMeter;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Catamaran-Bold',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFFFF',
    borderWidth: 1,
    padding: 10,
    width: 333,
    height: 44,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 5,
  },
  inputText: {
    marginTop: 7,
    height: 43,
    backgroundColor: '#FFFFFFFF',
    fontFamily: 'Catamaran-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 26,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 6,
    borderColor: '#9095A1',
  },

  input: {
    marginTop: 5,
    marginHorizontal: 12,
  },
  itemMainView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 18,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFFFF',
  },
  input: {
    marginTop: 5,
    marginHorizontal: 12,
  },
  errorInputText: {
    color: 'red',
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
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: COLOR_LIST.TEXT,
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

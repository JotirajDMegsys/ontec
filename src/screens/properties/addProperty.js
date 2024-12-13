import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, Modal, TouchableOpacity, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FastField, useFormik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useToast } from 'react-native-toast-notifications';
import { deleteProperty, resetGetDeleteProperty } from '../../redux/slice/DeleteProperty';
import { addProperty, clearStates, resetAddPropertyState } from '../../redux/slice/addProperty';
import { getPropertiesDetails } from '../../redux/slice/propertyDetails';
import Bottom from '../../components/Bottom';
import { DeleteButton, UpdateButton, PopupButton } from '../../components/common';
import { COMPANY_ID, GOOGLE_PLACES_API_KEY } from '../../helpers/enum';
import { COLOR_LIST } from '../../helpers/colorlist';
import Remove from '../../assets/remove.png';
import Delete from '../../assets/delete.png';
import Check from '../../assets/check.png';
import Autocomplete, { Auto, Autoupdate } from '../../components/Autocomplete';
// import MapIcon from '../../assets/meterIcon/MapPin.png';
// import Scan from '../../assets/meterIcon/Scan.png';

const AddProperty = ({route}) => {
  const [disabled, setDisabled] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const { propertyId, isUpdate } = route.params;
  console.log(isUpdate);

  const {
    getPropertiesDetailsIsLoading,
    getPropertiesDetailsData,
    getPropertiesDetailsIsError,
    getPropertiesDetailsIsSuccess
  } = useSelector((state) => ({
    getPropertiesDetailsIsLoading: state.getPropertyDetails.getPropertiesDetailsIsLoading,
    getPropertiesDetailsData: state.getPropertyDetails.getPropertiesDetailsData,
    getPropertiesDetailsIsError: state.getPropertyDetails.getPropertiesDetailsIsError,
    getPropertiesDetailsIsSuccess: state.getPropertyDetails.getPropertiesDetailsIsSuccess,
  })
  );

  const { isLoading, data, isError, isSuccess } = useSelector((state) => ({
    isLoading: state.addProperty.isLoading,
    data: state.addProperty.data,
    isError: state.addProperty.isError,
    isSuccess: state.addProperty.isSuccess,
  })
  );
 
  const {

    deletePropertyLoding,
    deletePropertyData,
    deletePropertyIsError,
    deletePropertyIsSuccess
  } = useSelector((state) => ({
    deletePropertyLoding: state.deleteProperty.deletePropertyLoding,
    deletePropertyData: state.deleteProperty.deletePropertyData,
    getPropertiesDetailsIsError: state.deleteProperty.getPropertiesDetailsIsError,
    deletePropertyIsSuccess: state.deleteProperty.deletePropertyIsSuccess,
  })
  );

  const [spinner, setSpinner] = useState(false);

  //*initial state
  const initialValues = {
    propertyName: "",
    unitNumber: "",
    address: "",
  }

  const [serverErrors, setServerErrors] = useState({});
  console.log(serverErrors,'serverErrorsserverErrorsserverErrorsserverErrors');
  const addPropertySchema = Yup.object().shape({
  propertyName: Yup.string()
    .required('Property name is required.'),
  unitNumber: Yup.string()
    .required('Unit number is required.')
    .matches(/^[a-zA-Z0-9]+$/, 'Unit number must alphanumeric only.'),
  address: Yup.string().required('Address is required.'),
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
    validationSchema: addPropertySchema,
    onSubmit: (values) => {
      onClickHandleSubmit();
    },
  })


  useEffect(() => {
    if (isUpdate === true) {
      let dataObj = {
        "propertyId": propertyId,
        "companyId": COMPANY_ID,
      }
      dispatch(getPropertiesDetails(dataObj));
    }
  }, [isUpdate]);
  const [addressApi,setAddressApi]=useState('');
  useEffect(() => {
    if (isUpdate === true) {
      setSpinner(true);

      if (getPropertiesDetailsData && getPropertiesDetailsIsSuccess===true) {
        setSpinner(false);
        setAddressApi(getPropertiesDetailsData?.addressLine1)

        setFieldValue("propertyName", getPropertiesDetailsData?.name);
        setFieldValue("unitNumber", getPropertiesDetailsData?.unitNumber);
        setFieldValue("address", getPropertiesDetailsData?.addressLine1);
        setFieldValue("propertyId", getPropertiesDetailsData?.id);
        setFieldValue("ownerId", getPropertiesDetailsData?.ownerId);
      }
    }
  }, [getPropertiesDetailsData, getPropertiesDetailsIsSuccess]);


// console.log(getPropertiesDetailsData,"getPropertiesDetailsData");


  useEffect(() => {
    setServerErrors({});
    if (data && isSuccess==true &&isError === false ) {
      setDisabled(false)
       setSpinner(false)
    //  {isupdate? ( toast.show("Property updated successfully!", {
    //   type: "success",
    //   placement: "top",
    //   duration: 3000,
    //   offset: 30,
    //   animationType: "slide-in",
    // })):( toast.show("Property added successfully!", {
    //   type: "success",
    //   placement: "top",
    //   duration: 3000,
    //   offset: 30,
    //   animationType: "slide-in",
    // }))}

    let toastMessage = isUpdate
          ? 'Property updated successfully!'
          : 'Property added successfully!';
    toast.show(toastMessage, {
        type: "success",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "slide-in",
      })
      dispatch(resetAddPropertyState());
      dispatch(clearStates());

      navigation.navigate('properties');
      onClickClearState();
      // console.log(address);


    }else if(isSuccess === false && isError === true && data){
      setDisabled(false)
      setSpinner(false)
      setServerErrors(data.errors)
        toast.show(data.title, {
            type: "danger",
            placement: "top",
            duration: 3000,
            offset: 30,
            animationType: "slide-in",
        });
    }
    
  }, [isSuccess, data]);
   
  const processCancel = () => {
    navigation.navigate('properties');
    console.log('ieitperiptpipip');
  };
  

  const onClickHandleSubmit = async() => {
    setDisabled(true);
    console.log("-0wet=340t0=04=3t");
   
    setServerErrors({});
    setSpinner(true);
    let ownerId = await AsyncStorage.getItem('userId');
   console.log("propertyid",propertyId);
    let dataObj = {
      "id": isUpdate ? propertyId : 0, // Conditionally set id based on isUpdate
      "name": values.propertyName,
      "unitNumber": values.unitNumber,
      "ownerId":ownerId,
      "companyId": COMPANY_ID,
      "statusId": 1,
      "addressLine1": values.address,
      "addressLine2": "",
      "city": "",
      "state": "",
      "country": "",
    }
    console.log(dataObj,"dataobjdataobjdataobjdataobjdataobj");
    dispatch(addProperty(dataObj));

  };
 
  useEffect(() => {
    if (deletePropertyData && deletePropertyIsSuccess===true) {
      setSpinner(false)
      toast.show("Property Delete successfully!", {
        type: "success",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "slide-in",
      });
      dispatch(resetGetDeleteProperty());
      navigation.push('properties');
    }
  }, [deletePropertyIsSuccess, deletePropertyData]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
   const popupOn =()=> setModalVisible(true);

const handleCancel = () => {
  setModalVisible(false);
};


useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    resetForm();  // Reset the form values and errors
  });

  // Clean up
  return unsubscribe;
}, [navigation, resetForm]);
  const handleDelete = () => {
    setModalVisible(false);
setSpinner(true)
    console.log("come to function");
    let dataObj = {
      "propertyId": propertyId,
    }
    dispatch(deleteProperty(dataObj)); 
    navigation.navigate('properties');

  };

  const onClickClearState = () => {
    resetForm();
    console.log("come to clear.....");

    setFieldValue("propertyName", "");
    setFieldValue("unitNumber", "");
    setFieldValue("address", "");
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FAFF' }}>
  
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      <View
        style={{
          marginHorizontal: 28,
          flex: 0.24,
          marginTop: 15,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Catamaran-Regular' /* Body */,
            fontSize: 30,
            fontWeight: '700',
            lineHeight: 46,
            color: '#171A1FFF',
          }}>
          {isUpdate === true ? "Update Property" : "Add New Property"}
        </Text>
      </View>
      <ScrollView style={{ flex: 1, marginTop: 0 }}>

        <View style={styles.itemMainView}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput
              label={
                <Text>
                  <Text>Property Name</Text>
                  <Text style={{ color: 'red' }}> *</Text>
                </Text>
              }
              keyboardType="ascii-capable"
              mode="outlined"
              placeholder="Enter Property Name"
              maxLength={55}
              style={{}}
              onChangeText={handleChange('propertyName')}
              onBlur={handleBlur('propertyName')}
              value={values.propertyName}
            />
            {touched.propertyName && errors.propertyName && <Text style={styles.errorInputText}>{errors.propertyName}</Text>}
            {serverErrors && serverErrors.propertyName && <Text style={styles.errorInputText}>{serverErrors.propertyName}</Text>}
          </View>
        </View>

        <View style={styles.itemMainView}>
          <View style={{ flex: 1, justifyContent: 'center', }}>
            <TextInput
              label={
                <Text>
                  <Text>Unit Number</Text>
                  <Text style={{ color: 'red' }}> *</Text>
                </Text>
              }
              keyboardType="default"
              mode="outlined"
              style={{}}
              disabled={isUpdate === true ? true : false}
              // disabled="true"
              onChangeText={handleChange('unitNumber')}
              onBlur={handleBlur('unitNumber')}
              value={values.unitNumber}
              placeholder="Enter Unit Number"
              autoCapitalize="none"
            />
            {touched.unitNumber && errors.unitNumber && <Text style={styles.errorInputText}>{errors.unitNumber}</Text>}
            {serverErrors && serverErrors.UnitNumber && <Text style={styles.errorInputText}>{serverErrors.UnitNumber}</Text>}

          </View>
        </View>
        
        {/* <View style={styles.itemMainView}>
          <View style={{ flex: 1, justifyContent: 'center' }}> */}
        {isUpdate === true ?         <Auto isupdate={true}   apiKey={GOOGLE_PLACES_API_KEY} currentAddress = {values.address}  onSelect={handleChange('address')} />
// : (        <Autoupdate  value={"hiiii"}isupdate={false}  apiKey={GOOGLE_PLACES_API_KEY}  currentAddress = {values.address} onSelect={handleChange('address')} />
: (        <Autoupdate  isupdate={false}  apiKey={GOOGLE_PLACES_API_KEY}  currentAddress = {values.address} onSelect={handleChange('address')} />

)}

       {touched.address && errors.address && <Text style={[styles.errorInputText,{flex: 1,
   
    marginHorizontal: 28, }]}>{errors.address}</Text>}
    

{/* <Autocomplete  isupdate={true}   apiKey={GOOGLE_PLACES_API_KEY} value={getPropertiesDetailsData?.addressLine1} currentAddress = {values.address} onSelect={handleChange('address')} /> */}

        {/* </View>
        </View> */}
        {/* <View style={styles.itemMainView}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput
              label={
                <Text>
                  <Text>Address</Text>
                  <Text style={{ color: 'red' }}> *</Text>
                </Text>
              }
              keyboardType="default"
              mode="outlined"
              maxLength={250}
              style={{}}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              placeholder="Enter Address"
              autoCapitalize="none"
            />
            {touched.address && errors.address && <Text style={styles.errorInputText}>{errors.address}</Text>}
            {serverErrors && serverErrors.address && <Text style={styles.errorInputText}>{serverErrors.address}</Text>}

          </View>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
          }}>
          <UpdateButton title="CANCEL" onClick={disabled ?null: processCancel } imageIcon={Remove} />
         <UpdateButton title={isUpdate === true ? "UPDATE" : "SAVE"} onClick={!disabled ? handleSubmit : null}

         
         
         imageIcon={Check} />
        </View>

        {isUpdate === true ? (
  <View style={{ marginVertical: 5, alignItems: 'center' }}>
<DeleteButton title="DELETE PROPERTY" imageIcon={Delete} onClick ={popupOn}  /></View>
) : null}

   
<Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.view}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Are you sure to delete this property?</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.logoutButton]}
                    onPress={handleDelete}>
                    <Text style={styles.buttonText}>Delete</Text>
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
      </ScrollView>
      <View style={{ width: '100%' }}>
        <Bottom />
      </View>
    </SafeAreaView>
  );
};

export default AddProperty;

const styles = StyleSheet.create({
  input: {
    marginTop: 5,
    marginHorizontal: 12,
  },
  itemMainView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
  },
  errorInputText: {
    color: 'red',
    // marginHorizontal: 12,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
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
    textAlign: 'center',
    color:COLOR_LIST.TEXT
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
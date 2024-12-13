import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, Modal, Pressable } from 'react-native';
import DropIcon from '../../assets/addMeterIcon/Drop.png';
import Electricity from '../../assets/addMeterIcon/Electricity.png';
import Lightning from '../../assets/addMeterIcon/Lightning.png';
import { BackgroundColor } from '../../helpers/constants';
import { ScrollView, } from 'react-native-gesture-handler';
import Scan from '../../assets/meterIcon/Scan.png';
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment'

//AgreeButton
import CheckBox from '@react-native-community/checkbox';
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Upload from '../../assets/upload.png';
import Calender from '../../assets/Calendar.png';
import address from '../../assets/address.png';


//updateButton

import { UpdateButton, DeleteButton } from '../../components/common';
import Check from '../../assets/check.png';
import Remove from '../../assets/remove.png';
import Delete from '../../assets/delete.png';
import Bottom from '../../components/Bottom';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import DocumentPicker from 'react-native-document-picker';
import addNewMeter from '../../redux/slice/addNewMeter';
import { Dispatch } from 'redux';
const UpdateMeter = () => {
  const propertyId = route.params?.propertyId;
  // const  title= route.params?.title;

  //*initial state
  const initialValues = {
    property: null,
    materNumber: "",
    materAlias: "",
    dailyTargetConsumption: "",
    taxNumber: "",
    contactProof: 0,
    contractEndDate: null,
    address: ''
  }

  const initialValue={
    propertyId:''
  }

  //*form validation
  const AddMeterSchema = Yup.object().shape({
    property: Yup.object().required("Please select Property"),
    materNumber: Yup.number().required("Meter Name is required.").min(0),
    materAlias: Yup.string().required('Meter Alias is required.'),
    dailyTargetConsumption: Yup.number().required("Daily Target Consumption is required.").min(0),
    taxNumber: Yup.number().required("Tax Number is required.").min(0),
    contactProof: Yup.number()
      .test('atLeastOneDoc', 'Please select at least one document', function (value) {
        // Check if the docList array is not empty
        return value > 0;
      }),
    contractEndDate: Yup.string().default(() => new Date()).required('Contract End Date is required.'),
    address: Yup.string().required('Mater Alias is required.'),
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
    validationSchema: AddMeterSchema,
    onSubmit: (values) => {
      onClickAddMeter();
    },
  })

  const [selectedDate, setSelectedDate] = useState('YYYY/MM/DD');
  const [modalVisibleCalender, setModalVisibleCalender] = useState(false);
  const [country, setCountry] = useState('1');

  const onClickSelectDate = async (date) => {
    let selectedDate = moment(date).format('YYYY/MM/DD');
    setSelectedDate(selectedDate);
    setModalVisibleCalender(false);
  }

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pickSingle
        ({
          type: [DocumentPicker.types.pdf, DocumentPicker.types.images]
        })
      // console.log(doc)
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log("User cancelled the upload", err);
      else
        console.log(err)
    }
  }

  const navigation = useNavigation();


  const processCancel = () => {
    navigation.navigate('meterList');
  };


  const {
    value,
    submit,
  
  } = useFormik({
    // initialValues: initialValue,
    // validationSchema: AddMeterSchema,
    onSubmit: (values) => {
      onclickDeleteMeter();
    },
  })
  

  // const handlePress = (screenName) => {

  // };
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const onClickAddMeter = () => {
    navigation.navigate('meterList');
    // const dataObj={
    // // "property": null,
    // "materNumber": "",
    // "materAlias": values.materAlias,
    // "dailyTargetConsumption": values.dailyTargetConsumption,
    // "taxNumber": values.taxNumber,
    // "contactProof": values.contactProof,
    // "contractEndDate": null,
    // "address": values.address,
    
    // }

    //  dispatch(addMeter(dataObj));
     

  };


const onclickDeleteMeter =()=>{
    dataObject = {
       id:propertyId
    }
    // dispatch(deleteMeter(dataObj));
    console.log(dataObj);

  
}


  const [isFocus, setIsFocus] = useState(false);




  const titleData = [
    { label: 'Sandtone Home', value: '1' },
    { label: 'Sandtone HOme2', value: '2' },
  ];
  // const [value, setValue] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>

        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginVertical: 60 }}>
            <View
              style={{
                flex: 0.2,

                marginHorizontal: 22
              }}>
              <Text
                style={{
                  marginHorizontal: 36,
                  // width: 349,
                  fontFamily: 'Catamaran-Regular' /* Body */,
                  fontSize: 30,
                  fontWeight: '700',
                  lineHeight: 46,
                  color: '#171A1FFF',
                  textAlign: 'center',
                }}>
                Update Meter
              </Text>
              {/* <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 112,
                  marginTop: 10,
                  justifyContent: 'space-evenly',
                }}>
                <View style={{ marginLeft: 10 }}>
                  <Image
                    source={DropIcon}
                    style={{
                      height: 24,
                      width: 24,
                      backgroundColor: BackgroundColor,
                      resizeMode: 'center',
                      marginLeft: 4,
                    }}
                  />
                  <Text
                    style={{
                      marginTop: 5,
                      fontStyle: 'normal',
                      marginRight: 15,
                      fontWeight: '400',
                      lineHeight: 16,
                      fontSize: 10,
                      color: 'black'
                    }}>
                    Water
                  </Text>
                </View>
                <View >
                  <Image
                    source={Lightning}
                    style={{
                      height: 24,
                      width: 24,
                      backgroundColor: BackgroundColor,
                      resizeMode: 'center',
                      marginLeft: 15,
                    }}
                  />
                  <Text
                    style={{
                      marginTop: 5,
                      fontStyle: 'normal',
                      marginRight: 15,
                      fontWeight: '400',
                      lineHeight: 16,
                      fontSize: 10,
                      marginLeft: 5,
                      color: 'black'


                    }}>
                    Electricity
                  </Text>
                </View>
                <View>
                  <Image
                    source={Electricity}
                    style={{
                      height: 24,
                      width: 24,
                      backgroundColor: BackgroundColor,
                      resizeMode: 'center',



                    }}
                  />
                  <Text
                    style={{
                      marginTop: 5,
                      fontStyle: 'normal',
                      marginRight: 12,
                      fontWeight: '400',
                      lineHeight: 16,
                      fontSize: 10,
                      marginLeft: 5,
                      color: 'black'


                    }}>
                    Gas
                  </Text>
                </View>
              </View> */}
               <View style={{ flexDirection: 'row', marginHorizontal: 100, marginTop: 10, justifyContent: 'space-evenly' }}>
      <TouchableOpacity onPress={() => handleItemClick('Water')} style={{ marginLeft: 10 }}>
        <Image 
          source={selectedItem === 'Water' ? require('../../assets/addMeterIcon/Drop.png') : require('../../assets/addMeterIcon/Electricity.png')}
          style={{ height: 24, width: 24, backgroundColor: BackgroundColor, resizeMode: 'center', marginLeft: 4 }}
        />
        <Text style={{ marginTop: 5, fontStyle: 'normal', marginRight: 15, fontWeight: '400', lineHeight: 16, fontSize: 10, color: 'black' }}>
          Water
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleItemClick('Electricity')}>
        <Image
          source={selectedItem === 'Electricity' ? require('../../assets/addMeterIcon/Drop.png') : require('../../assets/addMeterIcon/Lightning.png')}
         

          style={{ height: 24, width: 24, backgroundColor: BackgroundColor, resizeMode: 'center', marginLeft: 15 }}
        />
        <Text
          style={{
            marginTop: 5,
            fontStyle: 'normal',
            marginRight: 15,
            fontWeight: '400',
            lineHeight: 16,
            fontSize: 10,
            marginLeft: 5,
            color: 'black'
          }}>
          Electricity
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleItemClick('Gas')}>
        <Image
          source={selectedItem === 'Gas' ? require('../../assets/addMeterIcon/Drop.png') : require('../../assets/addMeterIcon/Lightning.png')}
          style={{ height: 24, width: 24, backgroundColor: BackgroundColor, resizeMode: 'center' }}
        />
        <Text
          style={{
            marginTop: 5,
            fontStyle: 'normal',
            marginRight: 12,
            fontWeight: '400',
            lineHeight: 16,
            fontSize: 10,
            marginLeft: 5,
            color: 'black'
          }}>
          Gas
        </Text>
      </TouchableOpacity>
    </View>
            </View>

            <View style={styles.itemMainView}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Dropdown
  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
  inputSearchStyle={{ fontSize: 16, color: '#171A1FFF' }}
  placeholderStyle={{ fontSize: 16, color: '#171A1FFF', marginHorizontal: 3 }}
  selectedTextStyle={{ fontSize: 16, color: '#171A1FFF', marginHorizontal: 2 }}
  iconStyle={{ marginHorizontal: 2 }}
  data={titleData}
  // value={country}
  search
  maxHeight={400}
  labelField="label"
  valueField="value"
  placeholder={!isFocus ? 'Select Property' : '...'}
  searchPlaceholder="Sandtone Home"
  // onChangeText={handleChange('property')}
  // onBlur={handleBlur('property')}
  value={country}
  onFocus={() => setIsFocus(true)}
  onChange={e => {
    setCountry(e.value);
  }}
/>

                {touched.property && errors.property && <Text style={styles.errorInputText}>{errors.property}</Text>}
              </View>
            </View>
            <View style={styles.itemMainView}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <TextInput
                  label="Meter Number"
                  keyboardType="numeric"
                  mode="outlined"
                  placeholder="Enter Meter Number"
                  style={{}}
                  onChangeText={handleChange('materNumber')}
                  onBlur={handleBlur('materNumber')}
                  value={values.materNumber}
                />
                {touched.materNumber && errors.materNumber && <Text style={styles.errorInputText}>{errors.materNumber}</Text>}
              </View>
            </View>
            <View style={styles.itemMainView}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <TextInput
                  label="Meter Alias"
                  keyboardType="default"
                  mode="outlined"
                  placeholder="Enter Meter Alias"
                  style={{}}
                  onChangeText={handleChange('materAlias')}
                  onBlur={handleBlur('materAlias')}
                  value={values.materAlias}
                />
                {touched.materAlias && errors.materAlias && <Text style={styles.errorInputText}>{errors.materAlias}</Text>}
              </View>
            </View>
            <View style={styles.itemMainView}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <TextInput
                  label="Daily Target Consumption (KWh)"
                  keyboardType="numeric"
                  mode="outlined"
                  placeholder="Enter Daily Target"
                  style={{}}
                  onChangeText={handleChange('dailyTargetConsumption')}
                  onBlur={handleBlur('dailyTargetConsumption')}
                  value={values.dailyTargetConsumption}
                />
                {touched.dailyTargetConsumption && errors.dailyTargetConsumption && <Text style={styles.errorInputText}>{errors.dailyTargetConsumption}</Text>}
              </View>
            </View>
            <View style={styles.itemMainView}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <TextInput
                  label="Tax Number"
                  keyboardType="numeric"
                  mode="outlined"
                  placeholder="Enter Tax Number"
                  style={{}}
                  onChangeText={handleChange('taxNumber')}
                  onBlur={handleBlur('taxNumber')}
                  value={values.taxNumber}
                />
                {touched.taxNumber && errors.taxNumber && <Text style={styles.errorInputText}>{errors.taxNumber}</Text>}
              </View>
            </View>
            {/* <View style={styles.itemMainView}>
              <View style={{ flex: 1, justifyContent: 'center' }}>

                <TextInput
                  label="Contract Proof"
                  keyboardType="email-address"
                  mode="outlined"
                  style={{}}
                  onChangeText={handleChange('contactProof')}
                  onBlur={handleBlur('contactProof')}
                  value={values.contactProof}
                  disabled={true}
                  placeholder="Upload Contract Proof"
                  autoCapitalize="none"
                />
                {touched.contactProof && errors.contactProof && <Text style={styles.errorInputText}>{errors.contactProof}</Text>}
              </View>
              <View style={{ flex: 0.2, justifyContent: 'center' }}>
                <Image
                  onPress={selectDoc}
                  source={Upload}
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    height: 36,
                    width: 36,
                  }}
                  resizeMode="contain"
                />
              </View>
            </View> */}

            <View style={styles.itemMainView}>
              <Pressable style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FFFFFFFF', height: 50, justifyContent: 'center', alignContent: 'center', borderRadius: 3, borderWidth: 0.2 }}
                onPress={() => {
                  setModalVisibleCalender(true);
                }}>
                <View >
                  <Text style={{ paddingHorizontal: 10, fontSize: 16, }}>{selectedDate}</Text>
                  {/* <Text>{selectedDate}</Text> */}
                  {touched.contractEndDate && errors.contractEndDate && <Text style={styles.errorInputText}>{errors.contractEndDate}</Text>}
                </View>
              </Pressable>

              <View style={{ flex: 0.2, justifyContent: 'center', }}>
                <View style={{ backgroundColor: '#EC3237', width: 36, height: 36, marginHorizontal: 10, borderRadius: 26 }}>
                  <TouchableOpacity onPress={() => {
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

            <View style={styles.itemMainView}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <TextInput
                  label="Address"
                  keyboardType="default"
                  mode="outlined"
                  style={{}}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                  placeholder="Enter Address"
                  autoCapitalize="none"
                />
                {touched.address && errors.address && <Text style={styles.errorInputText}>{errors.address}</Text>}
              </View>
              <View style={{ flex: 0.2, justifyContent: 'center', }}>
                <Image
                  source={address}
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    height: 36,
                    width: 36,
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={[styles.itemMainView, { marginTop: 20 }]}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox

                    boxType="square"
                    style={{ height: 50, width: 20, borderColor: 'black', borderWidth: 8 }}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                  />
                  <Text style={{ color: '#565D6D', marginLeft: 10 }}>Agree</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 20,


              }}>

              <UpdateButton title="CANCEL" onClick={processCancel} imageIcon={Remove} />
              <UpdateButton title="Submit" onClick={handleSubmit} imageIcon={Check} />
            </View>
            <View style={{ alignItems: 'center' }}>
              <DeleteButton title="DELETE PROPERTY" imageIcon={Delete} onClick={submit} />
            </View>

          </View>

        </ScrollView>
        {/* </View> */}
        <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <Bottom />
        </View>

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
          }}
        >
          <Pressable style={styles.modalContainer} onPress={() => {
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
                  onDateChange={(date) => {
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

export default UpdateMeter;
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
    fontFamily: 'Catamaran-Regular' /* Body */,
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
    backgroundColor: '#FFFFFFFF'
  },
  input: {
    marginTop: 5,
    marginHorizontal: 12,
  },
  errorInputText: {
    color: 'red',
    // marginHorizontal: 12,
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

});







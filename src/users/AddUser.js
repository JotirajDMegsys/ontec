import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {View,Text, SafeAreaView,StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-paper';
import { UpdateButton } from '../components/common';
import Bottom from '../components/Bottom';
//images
import Check from '../assets/check.png';
import Remove from '../assets/remove.png';
//yup
import { useToast } from "react-native-toast-notifications";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { COMPANY_ID } from '../helpers/enum';
import {getUserByOwnerId, resetTitle} from '../redux/slice/getAllUser';
import {addTenant,resetaddTenantState} from '../redux/slice/addTenant';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'

export const AddUser = ({route}) => {

  const navigation =useNavigation();
  const dispatch = useDispatch();
  const propertyId = route.params?.propertyId;
  const propertyName= route.params?.title;

   const toast = useToast(); 

  const [user, setUser] = useState([]);
  const [title,setTitle]=useState([]);
  const [dropdown, setDropDown] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [isFocus, setIsFocus] = useState(false);

  const [serverErrors, setServerErrors] = useState({});

  // const companyId = route.params?.companyId;

  //fetch data from masterAPI

  const {
    getPropertyUserIsLoading,
    getPropertyUserData,
    getPropertiesList,
    getUserTitleList,
    getPropertyUserIsSuccess,
    getPropertyUserIsError,
  } = useSelector(state => ({
    getPropertyUserIsLoading: state.getPropertyUser.getPropertyUserIsLoading,
    getPropertyUserData:state.getPropertyUser.getUserData,
    getPropertiesList: state.getPropertyUser.getUserTypeList,
    getUserTitleList: state.getPropertyUser.getUserTitleList,
    getPropertyUserIsSuccess: state.getPropertyUser.getPropertyUserIsSuccess,
    getPropertyUserIsError: state.getPropertyUser.getPropertyUserIsError,
  })); 
  console.log(getUserTitleList,'getUserTitleList',);


  const getMasters = async () => {
    let userId = await AsyncStorage.getItem('userId');
    setSpinner(true);
    console.log(userId,"userId");
    let dataObj = {
      ownerId:userId,
    };
    setSpinner(false);
    console.log("getMasters......",dataObj);
    dispatch(getUserByOwnerId(dataObj));
  };

  useEffect(() => {
    if ( getUserTitleList && getPropertiesList) {
      if ( getUserTitleList.length > 0  && getPropertiesList) {
        // setSpi/nner(false);
        setUser(getUserTitleList);
        setTitle(getPropertiesList)
        // setDropDown(getPropertyUserData);
        setDropDown([]); 
        // console.log(getPropertyUserData);
        console.log(getUserTitleList);

      } else {
        // setSpinne/r(false);
        
        setUser([]);
        setTitle([]);
        setDropDown([]);
      }
    }
  },[]);


  


  // redux
  const { isLoading, getTendantList, isError, isSuccess } = useSelector(state => ({
    isLoading: state.addTenant.isLoading,
    getTendantList: state.addTenant.getTendantList,
    isError: state.addTenant.isError,
    isSuccess: state.addTenant.isSuccess,
  })
  ); 
  console.log("getTendantList------9999-----",getTendantList);

  useEffect(() => {
  
    setServerErrors({});
  console.log("getTendantList-----------",getTendantList);
    if (getTendantList.message !='' && isSuccess===true && isLoading===false && isError===false) {

      setFieldValue("spinner", false);
      toast.show( getTendantList.message, {
        type: "success",
        placement: "top",
        duration:3000,
        offset: 30,
        animationType: "slide-in",
      });
      dispatch(resetaddTenantState());
      // dispatch(resetAddPropertyState());
      
      onClickClearState();
      dispatch(resetTitle());
      // navigation.push('SandtoneUser');
      navigation.navigate("SandtoneUser", { "propertyId":propertyId, "title": propertyName });

    }else if(isSuccess === false && isError === true && getTendantList){
      setFieldValue("spinner", false);
      setServerErrors(getTendantList.errors)

      toast.show(getTendantList.title, {
          type: "danger",
          placement: "top",
          duration: 3000,
          offset: 30,
          animationType: "slide-in",
      });
    }

  }, [isSuccess, getTendantList,isLoading]);
  //*initial state
  const initialValues = {
    firstName : "",
    lastName: "",
    mobile: "",
    email: "",
    title:"",
    titleId:"",
    propertyId:route.params?.propertyId,
    selectedValue: "", 
    selectedProperty:"",
    spinner: false,

  }
  
    //*form validation
    const addTenantScheme = Yup.object().shape({

      selectedValue: Yup.object()
      .required('Please Select Title'),
     
      email: Yup.string()
      .matches(/^[\w+.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/, 'Invalid email address')
      
      .required('Email is required'),
      mobile: Yup.string()
     .matches(/^[0-9]{10}$/, 'Please enter valid 10 digit mobile number')

  .required('Mobile number is required')
  .matches(/^\d+$/, 'Please enter a valid phone number') // Allow only digits

  .min(10, 'Phone number must be at least 10 char'),
  firstName: Yup.string()
  .matches(/^[a-zA-Z '-]+$/, 'Fisrt name should be alphabet')

  .required('First name is required')
      .min(2, 'Need at list 2 characters'),
    // .min(3, 'First Name must be at least 3 characters')
    // .required('Please enter a valid name'),
  lastName: Yup.string()
    // .min(3, 'Last Name must be at least 3 characters')
    // .required('Last Name is required.'),
    .matches(/^[a-zA-Z '-]+$/, 'Last name should be alphabet')

    // .matches(/^[A-Za-z]+(?: [A-Za-z]+)?$/,'Last name should be alphabet')
  .required('Last name is required')
      .min(2, 'Need at list 2 characters'),
    });



  // useEffect(() => {
  

  //   if (getTendantList.message!='' && isSuccess===true && isLoading===false) {
  //     // setFieldValue("spinner", !values.spinner);
  //     toast.show(getTendantList.message, {
  //       type: "success",
  //       placement: "top",
  //       duration:5000,
  //       offset: 30,
  //       animationType: "slide-in",
  //     });
  //     dispatch(resetaddTenantState());
  //     // dispatch(resetAddPropertyState());
  //     onClickClearState();
  //     // navigation.push('SandtoneUser');
  //     navigation.push("SandtoneUser", { "propertyId":propertyId, "title": propertyName });

  //   }
  // }, [isSuccess, getTendantList,isLoading]);
  useEffect(() => {
    console.log("getIcon_UserEffect_1");
    getMasters();
    console.log("getIcon_UserEffect_2");
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      resetForm();  // Reset the form values and errors
    });
  
    // Clean up
    return unsubscribe;
  }, [navigation, resetForm]);
 
  const processCancel = () => {
    // navigation.navigate('SandtoneUser');
    navigation.navigate("SandtoneUser", { "propertyId":propertyId, "title": propertyName,"value":true });

  };


  


  // console.log("gettend",getTendantList,isError);

  
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
    validationSchema: addTenantScheme,
    onSubmit: (values) => {
      onClickHandleSubmit();
    },
  })
 

  const onClickHandleSubmit = async() => {
    setFieldValue("spinner", true);
console.log("onClickHandleSubmit...AddUser");
  let ownerId = await AsyncStorage.getItem('userId');
  ownerId = parseInt(ownerId);
  // propertyid = parseInt(propertyid);
 
     console.log("ownerd.......",ownerId);
    let dataObj = {
       "id":0,
      "title":values.selectedValue.name,
      "titleId": values.selectedValue.id,
      "currentUserId": ownerId,
      
      "firstName":values.firstName,
      "lastName": values.lastName,
      "mobile": values.mobile,
      "email": values.email,
      "propertyId":route.params?.propertyId,
      // "propertyId":values.selectedProperty.id,
      // "property": "Home2",
      // "property":values.selectedProperty.name,
      "propertyUserTypeId": 2,
      "propertyUserType": "Associate",
      "statusId": 0,
      "status": "",
      "companyId": COMPANY_ID
    }

    console.log( "dataobj .....",dataObj);
    console.log('====================================');
      
    dispatch(addTenant(dataObj));
    console.log("AfterHandle___Submit.........");
    
    // navigation.navigate('SandtoneUser', {
    //   propertyId: propertyId,
    //   title: propertyName,
    // });

  };

  // const onClickClearState = () => {
  //   setFieldValue("firstName", "");
  //   setFieldValue("lastName", "");
  //   setFieldValue("email", "");
  //   setFieldValue("title", "");
  //   setFieldValue("titleId", "");
  //   setFieldValue("titleId", "");
  //    setFieldValue("propertyId", "");
  //   setFieldValue("selectedValue", "");
  //   setFieldValue("email", "");
  // };

  const onClickClearState = () => {
    resetForm();
    setFieldValue("firstName", "");
    setFieldValue("lastName", "");
    setFieldValue("email", "");
    // setFieldValue("title", "");
    setFieldValue("mobile", "");
    // setFieldValue("titleId", "");
     setFieldValue("propertyId", "");
    setFieldValue("selectedValue", "");
    setFieldValue("selectedProperty", "");
  };

  return (
    <>
  <SafeAreaView  style={{flex:1,backgroundColor:'#F8F9FAFF'}}>
  <ScrollView VerticalScrollIndicator={true}>
        <View>
        <Spinner
                           visible={values.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
      <View style={{alignItems:'center'}}>

        <Text style={{fontFamily:'Catamaran-Regular', /* Body */
  fontSize: 30, 
  fontWeight:'700', 
  lineHeight: 46, marginVertical:20,
  color:'#171A1FFF'}}>Add New Associate</Text>
    </View>
    <View style={styles.itemMainView}>
            <View style={{ flex: 0.5,borderColor:'pink'}}>
            

<Dropdown
  style={[styles.dropdown, isFocus && { color: 'black', fontSize: 16 }]}
  inputSearchStyle={{ fontSize: 16, color: 'black' }}
  placeholderStyle={{ fontSize: 16, color: 'black', marginHorizontal: 3 }}
  selectedTextStyle={{ fontSize: 16, color: 'black', marginHorizontal: 2 }}
  iconStyle={{ marginHorizontal: 2 }}
  itemTextStyle={{color:'black'}}

  data={getUserTitleList}
  maxHeight={400}
  labelField="name" 
  valueField="id" 
  placeholder="Title" 
  onFocus={() => setIsFocus(true)}

  value={values.selectedValue} 
  onChange={(selectedItem) => setFieldValue('selectedValue', selectedItem)} 
/>



            </View>
            {touched.selectedValue && errors.selectedValue && <Text style={[styles.errorInputText,{marginTop:20}]}>{errors.selectedValue}</Text>}

           
          </View>
          <View style={styles.itemMainView}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TextInput
                label={
                  <Text>
                    <Text>First Name</Text>
                    <Text style={{ color: 'red' }}> *</Text>
                  </Text>
                }
                mode="outlined"
                maxLength={15}
                style={{ marginRight: 10 }}
                
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                
                
              />
              {touched.firstName && errors.firstName && <Text style={styles.errorInputText}>{errors.firstName}</Text>}
              {serverErrors && serverErrors.FirstName && <Text style={styles.errorInputText}>{serverErrors.FirstName}</Text>}

            </View>
            
          
          </View>
          <View style={styles.itemMainView}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TextInput
                label={
                  <Text>
                    <Text>Last Name</Text>
                    <Text style={{ color: 'red' }}> *</Text>
                  </Text>
                }
                mode="outlined"
                style={{ marginRight: 10 }}
                maxLength={15}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
              />
            {touched.lastName && errors.lastName && <Text style={styles.errorInputText}>{errors.lastName}</Text>}
            {serverErrors && serverErrors.LastName && <Text style={styles.errorInputText}>{serverErrors.LastName}</Text>}

            </View>
          
          </View>
          <View style={styles.itemMainView}>
            <View style={{ flex: 1,justifyContent: 'center'}}>
              <TextInput
                label={
                  <Text>
                    <Text>Mobile</Text>
                    <Text style={{ color: 'red' }}> *</Text>
                  </Text>
                }
                keyboardType="numeric"
                mode="outlined"
                style={{ marginRight: 10 }}
                maxLength={10}
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                value={values.mobile}                
              />
             {touched.mobile && errors.mobile && <Text style={styles.errorInputText}>{errors.mobile}</Text>}
             {serverErrors && serverErrors.Mobile && <Text style={styles.errorInputText}>{serverErrors.Mobile}</Text>}

            </View>
          
          </View>
          <View style={styles.itemMainView}>
            <View style={{ flex:1,justifyContent:'center'}}>
              <TextInput
                // label="Email"
                label={
                  <Text>
                    <Text>Email</Text>
                    <Text style={{ color: 'red' }}> *</Text>
                  </Text>
                }
                keyboardType="email-address"
                mode="outlined"
                style={{ marginRight: 10 }}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            {touched.email && errors.email && <Text style={styles.errorInputText}>{errors.email}</Text>}
            {serverErrors && serverErrors.Email && <Text style={styles.errorInputText}>{serverErrors.Email}</Text>}

            </View>
          
          </View>

          

          <View style={[styles.itemMainView]}>
            <View style={{ flex: 0.98,justifyContent:'center'}}>
              <Dropdown
              key={dropdown.id} 
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
               search
               maxHeight={400}
              labelField="name" 
              valueField="id" 
               disable={true}
                placeholder={route.params?.title} 
 
              // value={values.propertyId} 
              // onChange={(selectedItem) =>{
              //    setFieldValue('selectedProperty', selectedItem);
              //   //  setFieldValue('selectedProperty', route.params?.title);
              //   //  setFieldValue('selectedProperty', route.params?.propertyId);
                
              // }}  
              />
               {touched.selectedProperty && errors.selectedProperty && <Text style={styles.errorInputText}>{errors.selectedProperty}</Text>}
            </View>
          </View>

          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',   
            marginTop:25
          }}>
         
        <UpdateButton title="CANCEL" onClick={processCancel}  imageIcon={Remove}/>
        <UpdateButton title="SAVE" onClick={handleSubmit}  imageIcon={Check}/>
        </View>
          
    </View>
   

  </ScrollView>
      <View style={{ bottom: 0, width: '100%'}}>
        <Bottom />
      </View>
  </SafeAreaView>
      
</>
    
  )
}

const styles = StyleSheet.create({
  
 
  itemMainView: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginVertical:15,
    marginHorizontal: 30
  },

  inputText: {
    fontSize: 18,
    color: '#424856',
    marginHorizontal: 12,
    height:20
  },

  errorInputText: {
    color: 'red',
    marginHorizontal: 5,
  },

  input: {
    marginTop: 5,
    marginHorizontal: 12,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical:5,
    backgroundColor: 'white'
  },
  spinnerTextStyle: {
    color: '#FFF'
},

});

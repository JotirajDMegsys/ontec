import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import {BackgroundColor} from '../../helpers/constants';
// import BackNavigation from '../../components/backNavigation';
import {Dropdown} from 'react-native-element-dropdown';
import {TextInput} from 'react-native-paper';
import {Button} from '@rneui/themed';
import CheckBox from '@react-native-community/checkbox';
import {SignInButton} from '../../components/common';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
import {DeleteButton, UpdateButton} from '../../components/common';
import Check from '../../assets/check.png';
import Remove from '../../assets/remove.png';
import Delete from '../../assets/delete.png';
import {getUserDetailsApiCall} from '../../redux/slice/getUserDetails';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  deleteAccount,
  resetGetdeleteAccount,
} from '../../redux/slice/deleteAccount';
//image
import addressIcon from '../../assets/address.png';
import {TouchableOpacity} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {getMasterProfile} from '../../redux/slice/masterProfile';
import {
  API_BASE_URL,
  API_VERSION,
  COUNTRY_CODE,
  GOOGLE_PLACES_API_KEY,
} from '../../helpers/enum';
import {COLOR_LIST} from '../../helpers/colorlist';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Autocomplete from '../../components/Autocomplete';
import { resetLoginDetails } from '../../redux/slice/signIn';
const UpdateProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  const [selectedItem, setSelectedItem] = useState(null);

  const {
    userDetailsIsLoading,
    userDetailsData,
    userDetailsIsSuccess,
    userDetailsIsError,
  } = useSelector(state => ({
    userDetailsIsLoading: state.userDetails.userDetailsIsLoading,
    userDetailsData: state.userDetails.userDetailsData,
    userDetailsIsSuccess: state.userDetails.userDetailsIsSuccess,
    userDetailsIsError: state.userDetails.userDetailsIsError,
  }));

  const {
    deleteAccountLoding,
    deleteAccountData,
    deleteAccountIsSuccess,
    deleteAccountIsError,
  } = useSelector(state => ({
    deleteAccountLoding: state.deleteProfile.deleteAccountLoding,
    deleteAccountData: state.deleteProfile.deleteAccountData,
    deleteAccountIsError: state.deleteProfile.deleteAccountIsError,
    deleteAccountIsSuccess: state.deleteProfile.deleteAccountIsSuccess,
  }));

  useEffect(() => {
    if (deleteAccountData && deleteAccountIsSuccess) {
      // getUser();

      toast.show('Account deleted successfully!', {
        type: 'success',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'zoom-in',
      });
      dispatch(resetGetdeleteAccount());
      dispatch(resetLoginDetails());
      setTimeout(async() => {
        // props.closeModal();
      navigation.push('signIn');
    }, 1000)
      // navigation.push('signIn');
    }
  }, [deleteAccountData, deleteAccountIsSuccess]);

  const [isFocus, setIsFocus] = useState(false);
  const [mobile, setMobile] = useState(userDetailsData?.mobile);
  const [email, setEmail] = useState(userDetailsData?.email);

  const [title, setTitle] = useState(userDetailsData?.title);
  const [titleId, setTitleId] = useState(userDetailsData?.titleId);
  // const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState(userDetailsData?.firstName);
  const [lastName, setLastName] = useState(userDetailsData?.lastName);
  const [countryCode, setCountryCode] = useState(COUNTRY_CODE);
  // const [mobile, setMobile] = useState(null);
  // const [role, setRole] = useState('Customer');
  const [roleId, setRoleId] = useState(1);
  const [companyId, setCompanyId] = useState(1);
  const [addressLatitude, setAddressLatitude] = useState('');
  const [addressLongitude, setAddressLongitude] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [statusId, setStatusId] = useState(4);
  const [selectedCommunicationType, setSelectedCommunicationType] = useState(
    [],
  );

  const [proofDocumentTypeId, setProofDocumentTypeId] = useState(null);
  const [proofDocument, setProofDocument] = useState('');

  const [selectProofType, setSelectProofType] = useState('');
  const [address, setAddress] = useState(userDetailsData?.addressLine1);
  const [taxNumber, setTaxNumber] = useState(
    userDetailsData?.taxNumber !== null ? '' : userDetailsData?.taxNumber,
  );

  const [confirm, setConfirm] = useState('');
  const [password, setPasssword] = useState('');

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useEffect(() => {
    const getMaster = async () => {
      try {
        let accessToken = await AsyncStorage.getItem('accessToken');
        console.log('accesstoken...', `Bearer ${accessToken}`);

        let dataObj = {
          accessToken: `Bearer ${accessToken}`,
        };

        dispatch(getMasterProfile(dataObj));
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    getMaster();
  }, [dispatch]);
  console.log('====================================');
  console.log('getMasterdataData');
  console.log('====================================');

  const {
    getMasterProfileIsLoading,
    communicationTypeList,
    proofDocumentTypeList,
    roleMasterList,
    statusList,
    titleList,
    getMasterProfileIsSuccess,
    getMasterProfileIsError,
  } = useSelector(state => ({
    getMasterProfileIsLoading: state.profileMaster.getMasterProfileIsLoading,
    communicationTypeList: state.profileMaster.communicationTypeList,
    proofDocumentTypeList: state.profileMaster.proofDocumentTypeList,
    roleMasterList: state.profileMaster.roleMasterList,
    statusList: state.profileMaster.statusList,
    titleList: state.profileMaster.titleList,
    getMasterProfileIsSuccess: state.profileMaster.getMasterProfileIsSuccess,
    getMasterProfileIsError: state.profileMaster.getMasterProfileIsError,
  }));

  console.log(titleList);

  const [serverErrors, setServerErrors] = useState([]);

  console.log(serverErrors, 'serverEroors');
  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];

  const titleData = [
    {label: 'Mr', value: '2'},
    {label: 'Mrs', value: '3'},
    {label: 'Ms', value: '4'},
  ];
  const cancelProfile = async () => {
    setServerErrors('');

    navigation.navigate('myProfile');
    // console.log("i want to update my profile")
  };
  const updateProfile = () => {
    navigation.navigate('myProfile');
  };

  //new addition
  const handleChangeFirstName = text => {
    setFirstName(text);
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[a-zA-Z '-]+$/, 'First name should be alphabet')

      // .matches(/^[A-Za-z]+(?: [A-Za-z]+)?$/, 'First name should be alphanumeric')
      .required('First Name is required')
      .min(2, 'First Name is required'),

    lastName: Yup.string()
      .matches(/^[a-zA-Z '-]+$/, 'Last name should be alphabet')

      // .matches(/^[A-Za-z]+(?: [A-Za-z]+)?$/, 'First name should be alphanumeric')
      .required('Last Name is required')
      .min(2, 'Last Name is required'),

    address: Yup.string().required('Address is required'),
    // checkbox: Yup.boolean().oneOf([true], 'please accept terms and conditions before procced'),
    // checkBox: Yup.boolean().oneOf([true], 'please accept terms and conditions before procced'),

    // checkBox: Yup.string().required('Please accept terms and conditions before proceed'),
  });
  // const[profile,setUpProfile]=useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    try {
      // return;
      await validationSchema.validate(
        {
          firstName,
          lastName,
          address,
        },
        {abortEarly: false},
      );

      const formData = new FormData();
      // if (!toggleCheckBox) {
      //   toast.show('Please agree to the terms.', { type: 'error' });
      //   return;
      // }
      // let accessToken  = await AsyncStorage.getItem('accessToken');
      // let id = await AsyncStorage.getItem('id');
      let accessToken = await AsyncStorage.getItem('accessToken');
      console.log(accessToken);
      // user = parseInt(id);
      console.log(userDetailsData?.id);

      formData.append('Id', userDetailsData?.id);
      console.log('id', userDetailsData?.id);
      //
      formData.append('TitleId', titleId);
      // formData.append('UserName', userName);
      formData.append('FirstName', firstName);
      formData.append('LastName', lastName);
      formData.append('CountryCode', countryCode);
      formData.append('Mobile', userDetailsData?.mobile);
      formData.append('taxNumber', taxNumber);

      // formData.append('Role', role);
      formData.append('RoleId', roleId);
      formData.append('Email', userDetailsData?.email);
      formData.append('CompanyId', companyId);
      formData.append('AddressLatitude', addressLatitude);
      formData.append('AddressLongitude', addressLongitude);

      formData.append('AddressLine1', address);
      formData.append('AddressLine2', '');
      formData.append('City', '');
      formData.append('State', '');
      formData.append('Country', '');
      // formData.append('Status', status);
      formData.append('StatusId', statusId);
      formData.append('CommunicationTypesIds', 1);
      // formData.append('ProofDocumentId', proofDocumentId);
      formData.append('ProofDocumentTypeId', 2);
      formData.append('ProofDocument', proofDocument);
      // formData.append('ProfilePicture', profilePicture);
      // formData.append('ProfileUrl', profileUrl);

      console.log('formData  ....', formData);

      const response = await fetch(
        `${API_BASE_URL}api/user/update-user?api-version=${API_VERSION}`,

        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            // Authorization: "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZ2VzaGkxMkBnbWFpbC5jb20iLCJjb21wYW55IjoiMSIsImV4cCI6MTcwOTg5MjcxNiwiaXNzIjoiaHR0cDovL09udGVjLmNvbS8iLCJhdWQiOiJodHRwOi8vT250ZWMuY29tLyJ9.uH7RT1fozDmBND9hk23SCOFU_GCOoz9hjoYyFpYB3wI",
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        },
      );

      const data = await response.json();
      // after data i get user id and message
      console.log('Response data:========11', response);

      if (data.status === 200 || data.status === 'Active') {
        navigation.push('myProfile');
        setServerErrors('');
        toast.show('Profile updated successfully!', {
          type: 'success',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else if (data.status === 400) {
        console.log(data?.errors, 'hfiheofoeroforofo');
        setServerErrors(data?.errors);
      } else if (data.status === 500) {
        console.log(data, 'hfiheofoeroforofo');
      }
    } catch (error) {
      // Validation failed, set errors
      const validationErrors = {};
      error.inner.forEach(err => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  //*state
  const [spinner, setSpinner] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    onCLickUserDetails();
    getMaster();
    console.log('use effect: ');
  }, []);

  useEffect(() => {
    if (userDetailsIsSuccess && userDetailsData) {
      setSpinner(!spinner);
    }
  }, [userDetailsIsSuccess, userDetailsData]);

  const onCLickUserDetails = async () => {
    let sessionKey = await AsyncStorage.getItem('sessionKey');

    let dataObj = {id: userDetailsData?.id, sessionKey: sessionKey};
    console.log(dataObj, 'dataobj');
    setSpinner(!spinner);
    dispatch(getUserDetailsApiCall(dataObj));
    console.log(dataObj);
  };

  // <---modal work--->
  const [modalVisible, setModalVisible] = useState(false);
  //  const popupOn =()=> setModalVisible(true);
  const handleCancel = () => {
    setModalVisible(false);
  };

  //this function for deleteAlluser
  const deleteProfile = async () => {
    // let sessionKey = await AsyncStorage.getItem('sessionKey');

    let dataObj = {id: userDetailsData?.id};
    // let dataObj = {userId: userDetailsData?.id ,sessionkey:}
    console.log('dataObj', dataObj);
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('sessionKey');

    dispatch(deleteAccount(dataObj));
    // navigation.navigate('properties');
    setModalVisible(false);
  };
  //this function for checking
  const popupOn = () => {
    setModalVisible(true);
  };

  // redux
  const {
    getMasterdataIsLoading,
    getMasterdataData,
    // getRoleMasterList,
    getMasterdataIsSuccess,
    getMasterdataIsError,
  } = useSelector(state => ({
    getMasterdataIsLoading: state.profileMaster.getMasterdataIsLoading,
    getMasterdataData: state.profileMaster.getMasterdataData,
    // getRoleMasterList: state.masterListForProfile.getRoleMasterList,
    getMasterdataIsSuccess: state.profileMaster.getMasterdataIsSuccess,
    getMasterdataIsError: state.profileMaster.getMasterdataIsError,
  }));
  // console.log("getMasterdataData:", getMasterdataData);

  const getMaster = async () => {
    let accessToken = await AsyncStorage.getItem('accessToken');
    console.log('accesstoken...', `Bearer ${accessToken}`);

    let dataObj = {
      accessToken: `Bearer ${accessToken}`,
    };

    dispatch(getMasterProfile());
  };

  const handleSelect = prediction => {
    console.log('Selected prediction:', prediction.description);
    setAddress(prediction.description);
    // Do something with the selected prediction
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BackgroundColor}}>
      {/* <BackNavigation
        title={"Complete Your Profile"}
        screenName={"otpSubmit"}
      /> */}
      <ScrollView style={{flex: 1}}>
        <View style={{margintop: 28}}>
          <Text
            style={{
              marginHorizontal: 21,
              width: 349,
              marginVertical: 15,
              fontFamily: 'Catamaran-Regular',
              fontSize: 30,
              fontWeight: '700',
              lineHeight: 46,
              color: '#171A1FFF',
              textAlign: 'center',
            }}>
            Update Your Profile
          </Text>
        </View>
        <View style={[styles.itemMainView, {marginBottom: 10}]}>
          <View
            style={{
              flex: 0.3,
              marginTop: 5,
            }}>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              inputSearchStyle={{fontSize: 16, color: '#171A1FFF'}}
              placeholderStyle={{
                fontSize: 16,
                color: '#171A1FFF',
                marginHorizontal: 5,
                paddingHorizontal: 7,
              }}
              itemTextStyle={{color: 'black'}}
              selectedTextStyle={{
                fontSize: 16,
                color: '#171A1FFF',
                marginHorizontal: 5,
              }}
              iconStyle={{marginHorizontal: 4}}
              data={titleList}
              // search
              maxHeight={300}
              labelField="name"
              valueField="id"
              placeholder={title}
              value={titleId}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setTitleId(item.id);
                setTitle(item.name);
                setIsFocus(false);
              }}
            />
          </View>
        </View>
        <View style={styles.itemMainView}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextInput
              label="First Name"
              mode="outlined"
              style={{marginRight: 10}}
              onChangeText={setFirstName}
              value={firstName}
            />
            {serverErrors.FirstName && (
              <Text style={{color: 'red'}}>{serverErrors.FirstName}</Text>
            )}
          </View>

          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextInput
              label="Last Name"
              mode="outlined"
              onChangeText={setLastName}
              value={lastName}
              style={{marginLeft: 10}}
            />
            {serverErrors.LastName && (
              <Text style={{color: 'red', marginHorizontal: 5}}>
                {serverErrors.LastName}
              </Text>
            )}
          </View>
        </View>

        <View style={[styles.errorView, {marginTop: 0}]}>
          <View
            style={{flex: 1, justifyContent: 'center', marginHorizontal: 10}}>
            {errors.firstName && (
              <Text style={{color: 'red'}}>{errors.firstName}</Text>
            )}
          </View>

          <View style={{flex: 1, justifyContent: 'center'}}>
            {errors.lastName && (
              <Text style={{color: 'red'}}>{errors.lastName}</Text>
            )}
          </View>
        </View>
        {/* <View style={[styles.itemMainView, { marginTop: 30 }]}>
          <View style={{ flex: 1, justifyContent: 'center' }}> */}
        <Autocomplete
          apiKey={GOOGLE_PLACES_API_KEY}
          currentAddress={address}
          onSelect={handleSelect}
        />

        {/* </View>
        </View> */}
        <View style={[styles.itemMainView, {marginTop: 40}]}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextInput
              // label="Mobile"
              disabled={true}
              keyboardType="email-address"
              mode="outlined"
              style={{marginRight: 10}}
              //
              // onChangeText={setMobile}
              // value={mobile}
              placeholder={mobile}
              autoCapitalize="none"
            />
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextInput
              // label="Email"
              disabled={true}
              keyboardType="email-address"
              mode="outlined"
              style={{marginLeft: 10}}
              // onChangeText={setEmail}
              // value={email}
              placeholder={email}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={[styles.itemMainView, {marginTop: 40}]}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextInput
              label="Tax Number"
              // disabled={true}
              keyboardType="email-address"
              mode="outlined"
              onChangeText={setTaxNumber}
              value={taxNumber}
              style={{marginRight: 10}}
              placeholder="Enter Tax Number"
              autoCapitalize="none"
            />
          </View>
        </View>
        {/* <View style={[styles.itemMainView, { marginTop: 30 }]}> */}

        {/* <View style={{ flex: 1, justifyContent: 'center'}}>
  <TextInput
      label="Password"
      keyboardType="email-address"
      mode="outlined"
      style={{ marginRight: 10 }}
      // style={{}}
      onChangeText={setPasssword}
        value={password}
    />
  </View>
  <View style={{ flex: 1, justifyContent: 'center', }}>
  <TextInput
      label="Confirm Password"
      keyboardType="email-address"
      mode="outlined"
      style={{ marginLeft: 10 }}
      onChangeText={setConfirm}
      value={confirm}

    />
  </View> */}
        {/* </View> */}
        {/* <View style={[styles.itemMainView, { marginTop: 30 }]}>
          <View style={{ flex: 1, justifyContent: 'center' }}> */}

        {/* <View style={[styles.itemMainView, { marginTop: 30 }]}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput
              label="Address"
              mode="outlined"
              style={{}}
              // onChangeText={handleChange('address')}
              // onBlur={handleBlur('address')}
              // value={values.address}
              onChangeText={setAddress}
              value={address}
              placeholder="Address"
              autoCapitalize="none"
            />
            {errors.address && (
              <Text style={{ color: 'red' }}>{errors.address}</Text>
            )}

            
          </View>
        </View> */}

        {/* <View style={[styles.itemMainView, { marginVertical: 20, flexDirection: 'column' }]}>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              // disabled={false}
              boxType="square"
              style={{ height: 20, width: 20, borderColor: 'black' }}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />

            <Text
              style={{
                marginLeft: 13,
                color: '#171A1F',

                fontFamily: 'Catamaran-Regular',
                fontSize: 14,
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: 22,
              }}>
              Agree
            </Text>
          </View>
          {errors.checkBox && (
            <Text style={{ color: 'red' }}>{errors.checkBox}</Text>
          )} 
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginHorizontal: 10,
            marginTop: 40,
          }}>
          <UpdateButton
            title="CANCEL"
            onClick={cancelProfile}
            imageIcon={Remove}
          />
          <UpdateButton
            title="UPDATE"
            // onClick={updateProfile}
            onClick={handleSubmit}
            imageIcon={Check}
          />
        </View>

        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <DeleteButton
              title="DELETE ACCOUNT"
              imageIcon={Delete}
              onClick={popupOn}
            />
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
                  Are you sure to delete account?
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.logoutButton]}
                    onPress={deleteProfile}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },

  inputView: {
    width: '100%',
    marginTop: 15,
  },

  itemMainView: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    marginHorizontal: 18,
  },
  errorView: {
    flex: 1,
    flexDirection: 'row',
    // height: 50,
    marginTop: 20,
    marginHorizontal: 18,
  },

  inputText: {
    fontSize: 18,
    color: '#424856',
    marginHorizontal: 12,
    height: 28,
  },

  errorInputText: {
    color: 'red',
    marginHorizontal: 12,
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
    // paddingHorizontal: 8,
    backgroundColor: 'white',
  },

  // <-- modal ---->

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
    color: COLOR_LIST.TEXT,
    textAlign: 'center',
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

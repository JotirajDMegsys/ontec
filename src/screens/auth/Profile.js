// import React, {useState, useEffect, useRef} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   SafeAreaView,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import {BackgroundColor} from '../../helpers/constants';
// import BackNavigation from '../../components/backNavigation';
// import {Dropdown} from 'react-native-element-dropdown';
// import {TextInput} from 'react-native-paper';
// import {Button} from '@rneui/themed';
// import CheckBox from '@react-native-community/checkbox';
// import {SignInButton} from '../../components/common';
// import {useNavigation} from '@react-navigation/native';
// import {FastField, useFormik} from 'formik';
// import {getMasterdata} from '../../redux/slice/profileMaster';
// import {getMasterProfile, getMasterProfileReset} from '../../redux/slice/masterProfile';
// import * as Yup from 'yup';
// import {useDispatch, useSelector} from 'react-redux';
// import {useToast} from 'react-native-toast-notifications';
// import DocumentPicker from 'react-native-document-picker';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

// //*Images
// import check from '../../assets/check.png';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   API_BASE_URL,
//   API_VERSION,
//   COUNTRY_CODE,
//   GOOGLE_PLACES_API_KEY,
// } from '../../helpers/enum';
// import {COLOR_LIST} from '../../helpers/colorlist';
// import {CONTENT} from '../../helpers/content';
// import Autocomplete from '../../components/Autocomplete';
// import { SignUpOtpResetData } from '../../redux/slice/signUp';

// export const Profile = ({route}) => {
//   const toast = useToast();
//   const mobile = route.params?.mobile;
//   const email = route.params?.emailId;

//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const [isFocus, setIsFocus] = useState(false);
//   const [locationName, setLocationName] = useState('');
//   const [toggleCheckBox, setToggleCheckBox] = useState(false);

//   const handleCheckBoxToggle = (newValue, communicationTypeId) => {
//     if (newValue) {
//       setSelectedCommunicationType([
//         ...selectedCommunicationType,
//         communicationTypeId,
//       ]);
//     } else {
//       setSelectedCommunicationType(
//         selectedCommunicationType.filter(id => id !== communicationTypeId),
//       );
//     }
//   };

//   const DocumentTypeData = [
//     {
//       id: 3,
//       name: 'Driving License',
//     },
//     {
//       id: 4,
//       name: 'Passport',
//     },
//     {
//       id: 5,
//       name: 'South Africa ID',
//     },
//   ];

//   const [selectedItem, setSelectedItem] = useState(null);
//   const [selectedDocumentItem, setSelectedDocItem] = useState(null);

//   // const titleList = [
//   //   // This needs to change dynamically
//   //   {
//   //     id: 2,
//   //     name: 'Mr',
//   //   },
//   //   {
//   //     id: 3,
//   //     name: 'Mrs',
//   //   },
//   //   {
//   //     id: 4,
//   //     name: 'Ms',
//   //   },
//   // ];
  

//   // const communicationTypeList = [
//   //   // this needs to change dynamic
//   //   {
//   //     id: 1,
//   //     name: 'Mobile',
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Email',
//   //   },
//   // ];


//   const [titleId, setTitleId] = useState(null);
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [countryCode, setCountryCode] = useState(COUNTRY_CODE);
//   const [roleId, setRoleId] = useState(1);
//   const [companyId, setCompanyId] = useState(1);
//   const [addressLatitude, setAddressLatitude] = useState('0.0');
//   const [addressLongitude, setAddressLongitude] = useState('0.0');
//   const [addressLine1, setAddressLine1] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [country, setCountry] = useState('');
//   const [statusId, setStatusId] = useState(1);
//   const [selectedCommunicationType, setSelectedCommunicationType] = useState(
//     [],
//   );
//   const [proofDocumentTypeId, setProofDocumentTypeId] = useState(null);
//   const [proofDocument, setProofDocument] = useState('');

//   const [selectProofType, setSelectProofType] = useState(
//     'Select file (jpg/png/pdf)',
//   );
//   const [address, setAddress] = useState('');
//   // const [country, setCountry] = useState('1');
//   const [iconList, setIconList] = useState([]);
//   const [dropdown, setDropDown] = useState([]);

//   // useEffect(() => {
//   //   getMaster();
//   // }, []);
//   // const getMaster = async () => {
//   //   let accessToken = await AsyncStorage.getItem('accessToken');
//   //   console.log('accesstoken...', `Bearer ${accessToken}`);

//   //   let dataObj = {
//   //     accessToken: `Bearer ${accessToken}`,
//   //   };

//   //   dispatch(getMasterProfile(dataObj));
//   // };


// //   useEffect(() => {
// //     const getMaster = async () => {
// //         // let accessToken = await AsyncStorage.getItem('accessToken');
// //         // console.log('accesstoken...', `Bearer ${accessToken}`);

// //         // let dataObj = {
// //         //     accessToken: `Bearer ${accessToken}`,
// //         // };

// //         dispatch(getMasterProfile());
// //     };

// //     getMaster();
// // }, []);

// useEffect(() => {
//   const getMaster = async () => {
//       try {
//           let accessToken = await AsyncStorage.getItem('accessToken');
//           console.log('accesstoken...', `Bearer ${accessToken}`);

//           let dataObj = {
//               accessToken: `Bearer ${accessToken}`,
//           };

//           dispatch(getMasterProfile(dataObj));
//       } catch (error) {
//           console.error("Error fetching access token:", error);
//       }
//   };

//   getMaster();
// }, [dispatch]);
//   console.log('====================================');
//   console.log('getMasterdataData');
//   console.log('====================================');



//   // const {
//   //   getMasterProfileIsLoading,
//   //   getMasterProfileData,
//   //   // getRoleMasterList,
//   //   getMasterProfileIsSuccess,
//   //   getMasterProfileIsError,
//   // } = useSelector(state => ({
//   //   getMasterProfileIsLoading: state.masterProflie.getMasterProfileIsLoading,
//   //   getMasterProfileData: state.masterProflie.getMasterProfileData,
//   //   // getRoleMasterList: state.masterListForProfile.getRoleMasterList,
//   //   getMasterProfileIsSuccess: state.masterProflie.getMasterProfileIsSuccess,
//   //   getMasterProfileIsError: state.masterProflie.getMasterProfileIsError,
//   // }));

//   const {
//     getMasterProfileIsLoading,
//     communicationTypeList,
//     proofDocumentTypeList,
//     roleMasterList,
//     statusList,
//     titleList,
//     getMasterProfileIsSuccess,
//     getMasterProfileIsError,
//   } = useSelector(state => ({
//     getMasterProfileIsLoading: state.profileMaster.getMasterProfileIsLoading,
//     communicationTypeList: state.profileMaster.communicationTypeList,
//     proofDocumentTypeList: state.profileMaster.proofDocumentTypeList,
//     roleMasterList: state.profileMaster.roleMasterList,
//     statusList: state.profileMaster.statusList,
//     titleList: state.profileMaster.titleList,
//     getMasterProfileIsSuccess: state.profileMaster.getMasterProfileIsSuccess,
//     getMasterProfileIsError: state.profileMaster.getMasterProfileIsError,
//   }));


 
//   console.log(iconList);
//   console.log(dropdown);
//   // const selectDoc = async () => {
//   //   try {
//   //     const doc = await DocumentPicker.pickSingle({
//   //       type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
//   //     });
//   //     if (doc) {
//   //       setProofDocument(doc);
//   //       console.log(doc);
//   //       setSelectProofType(doc.name);
//   //     }
//   //   } catch (err) {
//   //     if (DocumentPicker.isCancel(err)) {
//   //       console.log('User cancelled the upload', err);
//   //     } else {
//   //       console.log(err);
//   //     }
//   //   }
//   // };

//   const selectDoc = async () => {
//     try {
//       const doc = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
//       });
//       if (doc) {
//         // Check file size here
//         const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
//         if (doc.size > maxSizeInBytes) {
//           alert('Selected file exceeds 5MB limit. Please select a smaller file.');
//           return; // Exit function without setting state
//         }
        
//         // File size is within limit, proceed to set state
//         setProofDocument(doc);
//         console.log(doc);
//         setSelectProofType(doc.name);
//       }
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User cancelled the upload', err);
//       } else {
//         console.log(err);
//       }
//     }
//   };
  
//   const validationSchema = Yup.object().shape({
//     firstName: Yup.string()
//       .min(2, 'Need at least 2 characters')
//       .required('First name is required'),
//     lastName: Yup.string()
//       .min(2, 'Need at least 2 characters')
//       .required('Last name is required'),
//     titleId: Yup.number().required('Please select title'),
//     proofDocumentTypeId: Yup.number().required('Please select proof type'),
//     proofDocument: Yup.mixed().test('fileRequired', 'Please select proof document', value => {
//       return value; // Check if a file is selected
//     }),
//     address: Yup.string().required('Address is required'),
//     checkbox: !toggleCheckBox
//       ? Yup.array().required('You need to accept terms and conditions')
//       : null,
//     checkbox1:
//       selectedCommunicationType.length === 0
//         ? Yup.array().required('Please select at least one communication type')
//             .min(1, 'Please select at least one communication type')
//         : Yup.array(),
//     // Add validation for other fields as needed
//   });
  
//   const handleSubmit = async () => {
//     console.log('come to handleSubmit', toggleCheckBox);
  
//     try {

//       await validationSchema.validate(
//         {
//           firstName,
//           lastName,
//           address,
//           titleId,
//           proofDocumentTypeId,
//           proofDocument,
//           // Add other form fields here
//         },
//         { abortEarly: false },
//       );
//       console.log("email",email);
//       console.log(mobile,"movbirl");

//       const formData = new FormData();
//       let id = await AsyncStorage.getItem('userId');
//       let accessToken = await AsyncStorage.getItem('accessToken');
//       console.log(accessToken);
//       user = parseInt(id);
  
//       formData.append('Id', user);
//       formData.append('TitleId', titleId);
//       formData.append('FirstName', firstName);
//       formData.append('LastName', lastName);
//       formData.append('CountryCode', countryCode);
//       formData.append('Mobile', mobile);
//       formData.append('RoleId', roleId);
//       formData.append('Email', email);
//       formData.append('CompanyId', companyId);
//       formData.append('AddressLatitude', addressLatitude);
//       formData.append('AddressLongitude', addressLongitude);
//       formData.append('AddressLine1', address);
//       formData.append('AddressLine2', address);
//       formData.append('City', city);
//       formData.append('State', state);
//       formData.append('Country', country);
//       formData.append('StatusId', statusId);
//       formData.append('CommunicationTypesIds', 1);
//       formData.append('ProofDocumentTypeId', proofDocumentTypeId);
//       formData.append('ProofDocument', proofDocument);
  
//       console.log('formData:', formData);
//       const response = await fetch(
//         `${API_BASE_URL}api/user/update-user?api-version=${API_VERSION}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: 'Bearer ' + accessToken,
//           },
//           body: formData,
//         }
//       );

//       const data = await response.json();
//       console.log(data,"kfprpfpeprfperkpf");
//     if (data.status === 500) {
//         console.error('Server error: ', data.message);
//         toast.show('Server error! Please try again later.', {
//           type: 'error',
//           placement: 'top',
//           duration: 3000,
//           offset: 30,
//           animationType: 'slide-in',
//         });
//       } else if (response.ok) {
//         dispatch(getMasterProfileReset())

//         toast.show('Profile Complete successfully!', {
//           type: 'success',
//           placement: 'top',
//           duration: 1000,
//           offset: 30,
//           animationType: 'slide-in',
//         });
  
//         await AsyncStorage.setItem('firstName', firstName);
//         await AsyncStorage.setItem('lastName', lastName);
//         await AsyncStorage.setItem('emailId', email);
//         await AsyncStorage.setItem('mobile', mobile);
//         await AsyncStorage.setItem('isProfileComplete', 'true');
  
//         if (data.status === "Pending") {
//           try {
//             await AsyncStorage.multiRemove(['accessToken', 'firstName', 'lastName', 'emailId', 'isProfileCompleted']);     

//             navigation.navigate('signIn');
          
//             setTimeout(() => {
//               toast.show('Your registration request has been sent for admin approval!', {
//                 type: 'warning',
//                 placement: 'top',
//                 duration: 3000,
//                 offset: 30,
//                 animationType: 'slide-in',
//               });
//             }, 3000);
//             dispatch(SignUpOtpResetData())

//             dispatch(getMasterProfileReset())
//           } catch (error) {
//             console.error('Error clearing specific storage items:', error);
//           }
//         } else {
//           navigation.navigate('dashBoard');
//         }
//       } else {
//         toast.show('Something went wrong! Please try again.', {
//           type: 'error',
//           placement: 'top',
//           duration: 3000,
//           offset: 30,
//           animationType: 'slide-in',
//         });
//       }
//       // if (data.statusCode === 200) {
//       //   toast.show('Profile Complete successfully!', {
//       //     type: 'success',
//       //     placement: 'top',
//       //     duration: 3000,
//       //     offset: 30,
//       //     animationType: 'slide-in',
//       //   });
  
//       //   await AsyncStorage.setItem('firstName', firstName);
//       //   await AsyncStorage.setItem('lastName', lastName);
//       //   await AsyncStorage.setItem('emailId', email);
//       //   await AsyncStorage.setItem('mobile', mobile);
//       //   await AsyncStorage.setItem('isProfileComplete', 'true');
  
//       //   if (data.status === "Pending") {
//       //     try {
//       //       await AsyncStorage.multiRemove(['accessToken', 'firstName', 'lastName', 'emailId', 'isProfileCompleted']);
//       //       navigation.navigate('signIn');
//       //     } catch (error) {
//       //       console.error('Error clearing specific storage items:', error);
//       //     }
//       //   } else {
//       //     navigation.navigate('dashBoard');
//       //   }
//       // } else if (data.statusCode === 500) {
//       //   console.error('Server error: ', data.message);
//       //   toast.show('Server error! Please try again later.', {
//       //     type: 'error',
//       //     placement: 'top',
//       //     duration: 3000,
//       //     offset: 30,
//       //     animationType: 'slide-in',
//       //   });
//       // } else {
//       //   toast.show('Something went wrong! Please try again.', {
//       //     type: 'error',
//       //     placement: 'top',
//       //     duration: 3000,
//       //     offset: 30,
//       //     animationType: 'slide-in',
//       //   });
//       // }
//     } catch (error) {
//       if (error.inner) {
//         const validationErrors = {};
//         error.inner.forEach(err => {
//           validationErrors[err.path] = err.message;
//         });
//         setErrors(validationErrors);
//       } else {
//         console.error('Error submitting form:', error);
//         toast.show('An error occurred. Please check your data and try again.', {
//           type: 'error',
//           placement: 'top',
//           duration: 3000,
//           offset: 30,
//           animationType: 'slide-in',
//         });
//       }
//     }
//   };
  

//   // const validationSchema = Yup.object().shape({
//   //   firstName: Yup.string()
//   //     .min(2, 'Need at least 2 characters')
//   //     .required('First name is required'),
//   //   lastName: Yup.string()
//   //     .min(2, 'Need at least 2 characters')
//   //     .required('Last name is required'),
//   //   titleId: Yup.number().required('Please select title'),
//   //   proofDocumentTypeId: Yup.number().required('Please select proof type'),
//   //   proofDocument: Yup.mixed().test('fileRequired', 'Please select proof document', value => {
//   //     return value; // Check if a file is selected
//   //   }),
//   //   address: Yup.string().required('Address is required'),
//   //   checkbox: !toggleCheckBox
//   //     ? Yup.array().required('You need to accept terms and conditions')
//   //     : null,
//   //   checkbox1:
//   //     selectedCommunicationType.length === 0
//   //       ? Yup.array().required('Please select at least one communication type')
//   //           .min(1, 'Please select at least one communication type')
//   //       : Yup.array(),
//   //   // Add validation for other fields as needed
//   // });
  
//   // const handleSubmit = async () => {
//   //   console.log('come to handleSubmit', toggleCheckBox);
  
//   //   try {
//   //     await validationSchema.validate(
//   //       {
//   //         firstName,
//   //         lastName,
//   //         address,
//   //         titleId,
//   //         proofDocumentTypeId,
//   //         proofDocument,
//   //         // Add other form fields here
//   //       },
//   //       {abortEarly: false},
//   //     );
  
//   //     const formData = new FormData();
//   //     let id = await AsyncStorage.getItem('userId');
//   //     let accessToken = await AsyncStorage.getItem('accessToken');
//   //     console.log(accessToken);
//   //     user = parseInt(id);
  
//   //     formData.append('Id', user);
//   //     formData.append('TitleId', titleId);
//   //     formData.append('FirstName', firstName);
//   //     formData.append('LastName', lastName);
//   //     formData.append('CountryCode', countryCode);
//   //     formData.append('Mobile', mobile);
//   //     formData.append('RoleId', roleId);
//   //     formData.append('Email', email);
//   //     formData.append('CompanyId', companyId);
//   //     formData.append('AddressLatitude', addressLatitude);
//   //     formData.append('AddressLongitude', addressLongitude);
//   //     formData.append('AddressLine1', address);
//   //     formData.append('AddressLine2', address);
//   //     formData.append('City', city);
//   //     formData.append('State', state);
//   //     formData.append('Country', country);
//   //     formData.append('StatusId', statusId);
//   //     formData.append('CommunicationTypesIds', 1);
//   //     formData.append('ProofDocumentTypeId', proofDocumentTypeId);
//   //     formData.append('ProofDocument', proofDocument);
  
//   //     console.log('formData:', formData);
//   //     const response = await fetch(
//   //       `${API_BASE_URL}api/user/update-user?api-version=${API_VERSION}`,
//   //       {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'multipart/form-data',
//   //           Authorization: 'Bearer ' + accessToken,
//   //         },
//   //         body: formData,
//   //       }
//   //     );
//   //        const data = await response.json();

//   //     console.log(data);
//   //         await AsyncStorage.setItem('firstName', firstName);
//   //       await AsyncStorage.setItem('lastName', lastName);
//   //       await AsyncStorage.setItem('emailId', email);
//   //       await AsyncStorage.setItem('mobile', mobile);
//   //       await AsyncStorage.setItem('isProfileComplete', 'true');
//   //       toast.show('Profile Complete successfully!', {
//   //         type: 'success',
//   //         placement: 'top',
//   //         duration: 3000,
//   //         offset: 30,
//   //         animationType: 'slide-in',
//   //       });

//   //       // if (data.status === "Pending") {
//   //       //       try {
//   //       //         await AsyncStorage.multiRemove(['accessToken', 'firstName', 'lastName', 'emailId', 'isProfileCompleted']);
//   //       //         navigation.navigate('signIn');
//   //       //       } catch (error) {
//   //       //         console.error('Error clearing specific storage items:', error);
//   //       //       }
//   //       //     } else {
//   //       //       navigation.navigate('dashBoard');
//   //       // }
            
//   //     // try {
//   //     //   const response = await fetch(
//   //     //     `${API_BASE_URL}api/user/update-user?api-version=${API_VERSION}`,
//   //     //     {
//   //     //       method: 'POST',
//   //     //       headers: {
//   //     //         'Content-Type': 'multipart/form-data',
//   //     //         Authorization: `Bearer ${accessToken}`,
//   //     //       },
//   //     //       body: formData,
//   //     //     },
//   //     //   );
  
//   //     //   if (!response.ok) {
//   //     //     if (response.status === 500) {
//   //     //       throw new Error('Server facing issue while processing! Please try later.');
//   //     //     } else {
//   //     //       throw new Error('Something went wrong! Please try later.');
//   //     //     }
//   //     //   }
  
//   //     //   const data = await response.json();
//   //     //   console.log('Response data:', data);
  
//   //     //   await AsyncStorage.setItem('firstName', firstName);
//   //     //   await AsyncStorage.setItem('lastName', lastName);
//   //     //   await AsyncStorage.setItem('emailId', email);
//   //     //   await AsyncStorage.setItem('mobile', mobile);
//   //     //   await AsyncStorage.setItem('isProfileComplete', 'true');
  
//   //     //   toast.show('Profile Complete successfully!', {
//   //     //     type: 'success',
//   //     //     placement: 'top',
//   //     //     duration: 3000,
//   //     //     offset: 30,
//   //     //     animationType: 'slide-in',
//   //     //   });
  
//   //     //   if (data.status === "Pending") {
//   //     //     try {
//   //     //       await AsyncStorage.multiRemove(['accessToken', 'firstName', 'lastName', 'emailId', 'isProfileCompleted']);
//   //     //       navigation.navigate('signIn');
//   //     //     } catch (error) {
//   //     //       console.error('Error clearing specific storage items:', error);
//   //     //     }
//   //     //   } else {
//   //     //     navigation.navigate('dashBoard');
//   //     //   }
//   //     // } catch (error) {
//   //     //   console.error('Error:', error);
//   //     //   toast.show('An error occurred. Please check your data and try again.', {
//   //     //     type: 'error',
//   //     //   });
//   //     // }
//   //   } 
    
    
//   //   catch (error) {

//   //     if (error.inner) {
//   //       const validationErrors = {};
//   //       error.inner.forEach(err => {
//   //         validationErrors[err.path] = err.message;
//   //       });
//   //       setErrors(validationErrors);
//   //     } else {
//   //       console.error('Error submitting form:', error);
//   //     }
//   //     // const validationErrors = {};
//   //     // error.inner.forEach(err => {
//   //     //   validationErrors[err.path] = err.message;
//   //     // });
//   //     // setErrors(validationErrors);
//   //   }
//   // };
  


//   // const validationSchema = Yup.object().shape({
//   //   firstName: Yup.string()
//   //     .matches(
//   //       /^[A-Za-z]+(?: [A-Za-z]+)?$/,
//   //       'First name should be alphanumeric',
//   //     )
//   //     .min(2, 'Need at list 2 characters')
//   //     .required('First name is required'),

//   //   lastName: Yup.string()
//   //     .matches(
//   //       /^[A-Za-z]+(?: [A-Za-z]+)?$/,
//   //       'First name should be alphanumeric',
//   //     )
//   //     .min(2, 'Need at list 2 characters')
//   //     .required('Last name is required'),
//   //     titleId: Yup.number()
//   //     .required('Please select title'),
//   //     proofDocumentTypeId: Yup.number()
//   //     .required('Please select proof type'),
//   //     proofDocument: Yup.mixed()
//   //     .test('fileRequired', 'Please select proof document', (value) => {
//   //       // Check if a file is selected
//   //       return value;
//   //     }),

//   //   address: Yup.string().required('Address is required'),
//   //   // checkBox: Yup.boolean().oneOf([true], 'please accept terms and conditions before procced'),

//   //   // CheckBox: Yup.string().
//   //   //  required('Please select T&cd.. are required'),
//   //   checkbox: !toggleCheckBox
//   //     ? Yup.array().required('You need to accept terms and conditions')
//   //     : null,
//   //   checkbox1:
//   //     selectedCommunicationType.length === 0
//   //       ? Yup.array()
//   //           .required('Please select at least one communicationt ype ')
//   //           .min(1, 'Please select at least one communication type')
//   //       : Yup.array(),
//   //   //  checkbox1: Yup.array()
//   //   //  .required('Please select at least one checkbox')
//   //   //  .min(2, 'Please select at least one checkbox'),
//   //   // Add validation for other fields here
//   //   // Example:
//   //   // email: Yup.string().email('Invalid email').required('Email is required'),
//   //   // mobile: Yup.string().required('Mobile is required'),
//   //   // address: Yup.string().required('Address is required'),
//   //   // Add validation for other fields as needed
//   // });

//   // <----masterApi ----->
//   const [errors, setErrors] = useState({});

//   // const handleSubmit = async () => {
//   //   console.log('come to handlesubit', toggleCheckBox);

//   //   try {
//   //     await validationSchema.validate(
//   //       {
//   //         firstName,
//   //         lastName,
//   //         address,
//   //         titleId,
//   //         proofDocumentTypeId,
//   //         proofDocument
//   //         // Add other form fields here
//   //       },
//   //       {abortEarly: false},
//   //     );
//   //     // console.log(accessToken,firstName,titleId,user,proofDocumentTypeId);

//   //     const formData = new FormData();
//   //     let id = await AsyncStorage.getItem('userId');
//   //     let accessToken = await AsyncStorage.getItem('accessToken');
//   //     console.log(accessToken);
//   //     user = parseInt(id);

//   //     formData.append('Id', user);
//   //     //
//   //     formData.append('TitleId', titleId);
//   //     // formData.append('UserName', userName);
//   //     formData.append('FirstName', firstName);
//   //     formData.append('LastName', lastName);
//   //     formData.append('CountryCode', countryCode);
//   //     formData.append('Mobile', mobile);
//   //     // formData.append('Role', role);
//   //     formData.append('RoleId', roleId);
//   //     formData.append('Email', email);
//   //     formData.append('CompanyId', companyId);
//   //     formData.append('AddressLatitude', addressLatitude);
//   //     formData.append('AddressLongitude', addressLongitude);
//   //     formData.append('AddressLine1', address);
//   //     formData.append('AddressLine2', address);
//   //     formData.append('City', city);
//   //     formData.append('State', state);
//   //     formData.append('Country', country);
//   //     // formData.append('Status', status);
//   //     formData.append('StatusId', statusId);
//   //     formData.append('CommunicationTypesIds', 1);
//   //     // formData.append('ProofDocumentId', proofDocumentId);
//   //     formData.append('ProofDocumentTypeId', proofDocumentTypeId);
//   //     formData.append('ProofDocument', proofDocument);
//   //     // formData.append('ProfilePicture', profilePicture);
//   //     // formData.append('ProfileUrl', profileUrl);

//   //     console.log('formData.....00000000000000', formData);
//   //     try {
//   //       const response = await fetch(
//   //         `${API_BASE_URL}api/user/update-user?api-version=${API_VERSION}`,

//   //         {
//   //           method: 'POST',
//   //           headers: {
//   //             'Content-Type': 'multipart/form-data',
//   //             // Authorization: "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZ2VzaGkxMkBnbWFpbC5jb20iLCJjb21wYW55IjoiMSIsImV4cCI6MTcwOTg5MjcxNiwiaXNzIjoiaHR0cDovL09udGVjLmNvbS8iLCJhdWQiOiJodHRwOi8vT250ZWMuY29tLyJ9.uH7RT1fozDmBND9hk23SCOFU_GCOoz9hjoYyFpYB3wI",
//   //             Authorization: `Bearer ${accessToken}`,
//   //           },
//   //           body: formData,
//   //         },
//   //       );
//   //       if (!response.ok) {
//   //         if (response.status == 500) {
//   //           throw new Error(
//   //             'Server facing issue while processing! Please try later.',
//   //           );
//   //         } else {
//   //           throw new Error('Something went wrong! Please try later.');
//   //         }
//   //         return;
//   //       }
        
//   //       const data = await response.json();
//   //       // after data i get user id and message
//   //       console.log('Response data:========', data);
//   //       await AsyncStorage.setItem('firstName', firstName);
//   //       await AsyncStorage.setItem('lastName', lastName);
//   //       await AsyncStorage.setItem('emailId', email);
//   //       await AsyncStorage.setItem('mobile', mobile);
//   //       await AsyncStorage.setItem('isProfileComplete', 'true');

//   //       toast.show('Profile Complete successfully!', {
//   //         type: 'success',
//   //         placement: 'top',
//   //         duration: 3000,
//   //         offset: 30,
//   //         animationType: 'slide-in',
//   //       });
//   //       console.log(data.status);

//   //     if (data.status === "Pending") {
//   //       try {
//   //         await AsyncStorage.multiRemove(['accessToken', 'firstName', 'lastName','emailId','isProfileCompleted']);
//   //         navigation.navigate('signIn');
//   //       } catch (error) {
//   //         console.error('Error clearing specific storage items:', error);
//   //       }
//   //     } else {
//   //       navigation.navigate('dashBoard');
//   //     }
//   //     } catch (error) {
//   //       // console.error('Error:', error);
//   //       toast.show('An error occurred. Please check your data and try again.', {
//   //         type: 'error',
//   //       });
//   //     }
//   //   } catch (error) {
//   //     // Validation failed, set errors
//   //     const validationErrors = {};
//   //     error.inner.forEach(err => {
//   //       validationErrors[err.path] = err.message;
//   //     });
//   //     setErrors(validationErrors);
//   //   }
//   // };
//   const handleSelect = prediction => {
//     console.log('Selected prediction:', prediction.description);
//     setAddress(prediction.description);
//     // Do something with the selected prediction
//   };
//   const [userData, setUserData] = useState([]);
//   console.log('userdata', userData);

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
//       <ScrollView style={{flex: 1, backgroundColor: BackgroundColor}}>
//         <View style={{margintop: 28, alignSelf: 'center'}}>
//           <Text
//             style={{
//               marginHorizontal: 21,
//               width: 349,
//               marginTop: 10,
//               fontFamily: 'Catamaran-Regular',
//               fontSize: 30,
//               fontWeight: '700',
//               lineHeight: 46,
//               color: '#171A1FFF',
//               textAlign: 'center',
//             }}>
//             Complete Your Profile
//           </Text>
//         </View>
//         <View style={{flex: 1, backgroundColor: BackgroundColor}}>
//           <View
//             style={[
//               styles.itemMainView,
//               {marginTop: 30, marginBottom:10, alignSelf: 'flex-start'},
//             ]}>
//             <View style={{flex: 0.4}}>
//               <Dropdown
//                 style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
//                 textStyle={styles.selectedTextStyle}
//                 itemTextStyle={styles.selectedTextStyle}
//                 placeholderStyle={styles.selectedTextStyle}
//                 selectedTextStyle={styles.selectedTextStyle}
//                 iconStyle={styles.iconStyle}
//                 data={titleList}
//                 maxHeight={300}
//                 labelField="name" // Use 'name' as the label field
//                 valueField="id" // Use 'id' as the value field
//                 placeholder={'Select Title'}
//                 onFocus={() => setIsFocus(true)}
//                 value={titleId}
//                 onChange={item => {
//                   // Update the selected proof document type
//                   setTitleId(item.id);
//                 }}
//               />
//               {errors.titleId && (
//                   <Text style={{color: 'red'}}>{errors.titleId}</Text>
//                 )}
//             </View>
//           </View>
//           <View style={styles.itemMainView}>
//             <View style={{flex: 1, justifyContent: 'center'}}>
//               <TextInput
//                 label={
//                   <Text>
//                     <Text>First Name</Text>
//                     <Text style={{color: 'red'}}>*</Text>
//                   </Text>
//                 }
//                 keyboardType="default"
//                 mode="outlined"
//                 style={{marginRight: 10}}
//                 onChangeText={setFirstName}
//                 value={firstName}
//               />
//             </View>

//             <View style={{flex: 1, justifyContent: 'center'}}>
//               <TextInput
//                 label={
//                   <Text>
//                     <Text>Last Name</Text>
//                     <Text style={{color: 'red'}}>*</Text>
//                   </Text>
//                 }
//                 keyboardType="email-address"
//                 mode="outlined"
//                 onChangeText={setLastName}
//                 value={lastName}
//                 style={{marginLeft: 10}}
//               />
//               {/* {errors.lastName && (
//       <Text style={{color: 'red'}}>{errors.lastName}</Text>
//     )} */}
//             </View>
//           </View>

//           <View style={[styles.errorView, {marginTop: 0}]}>
//             <View
//               style={{flex: 1, justifyContent: 'center'}}>
//               {errors.firstName && (
//                 <Text style={{color: 'red'}}>{errors.firstName}</Text>
//               )}
//             </View>

//             <View style={{flex: 1, justifyContent: 'center', marginLeft:20}}>
//               {errors.lastName && (
//                 <Text style={{color: 'red'}}>{errors.lastName}</Text>
//               )}
//             </View>
//           </View>

//           <View style={[styles.itemMainView, {marginTop: 20}]}>
//             <View style={{flex: 1, justifyContent: 'center'}}>
//               <TextInput
//                 // label="Mobile"
//                 disabled={true}
//                 keyboardType="email-address"
//                 mode="outlined"
//                 style={{marginRight: 10}}
//                 //

//                 placeholder={mobile}
//                 autoCapitalize="none"
//               />
//             </View>
//             <View style={{flex: 1, justifyContent: 'center'}}>
//               <TextInput
//                 // label="Email"
//                 disabled={true}
//                 keyboardType="email-address"
//                 mode="outlined"
//                 style={{marginLeft: 10}}
//                 placeholder={email}
//                 autoCapitalize="none"
//               />
//             </View>
//           </View>

//           {
//             // <View style={[styles.itemMainView, {marginTop: 20}]}>
//             //   <View style={{flex: 1, justifyContent: 'center'}}>
//             //     {/* <GooglePlacesAutocomplete
//             //   ref={locationName}
//             //   placeholder='Search'
//             //   onPress={(data, details = null) => {
//             //     // 'details' is provided when fetchDetails = true
//             //     setAddressText(data);
//             //     console.log(data, details);
//             //   }}
//             //   query={{
//             //     key: GOOGLE_PLACES_API_KEY,
//             //     language: 'en',
//             //   }}
//             //   styles={{
//             //     container: {
//             //       // Customize container styles if needed
//             //       flex: 1,
//             //     },
//             //     row: {
//             //       backgroundColor: '#FFFFFF',
//             //       padding: 13,
//             //       height: 44,
//             //       flexDirection: 'row',
//             //     },
//             //     textInput: {
//             //       // Customize text input styles if needed
//             //       color:'black'
//             //     },
//             //     listView: {
//             //       backgroundColor: 'lightgrey'
//             //       // Customize list view styles if needed
//             //     },
//             //   }}
              
//             // /> */}
//             //     {/* <GooglePlacesAutocomplete
//             //   placeholder='Search'
//             //   defaultValue = ''
//             //   onPress={(data, details = null) => {
//             //     setLocationName(data)
//             //     setAddressText('jashjahsj')
//             //   }}
//             //   onChangeText={(text) => setLocationName(text)}
//             //   placeholderTextColor='gray'
//             //   renderRow={(rowData, index) => (
//             //     <Text style={{color:'black'}} onClick={() => {
//             //       console.log("========================");;
//             //     }}>{rowData.description}</Text>
//             //   )}
//             //   query={{
//             //     key: GOOGLE_PLACES_API_KEY,
//             //     language: 'en', // language of the results
//             //     types: 'address', // restricts the results to a specific type
//             //   }}
//             //   styles={{
//             //     container: {
//             //       // Customize container styles if needed
//             //       flex: 1,
//             //     },
//             //     row: {
//             //       backgroundColor: '#FFFFFF',
//             //       padding: 13,
//             //       height: 44,
//             //       flexDirection: 'row',
//             //     },
//             //     textInput: {
//             //       // Customize text input styles if needed
//             //       color:'black'
//             //     },
//             //     listView: {
//             //       backgroundColor: 'lightgrey'
//             //       // Customize list view styles if needed
//             //     },
//             //   }}
//             // /> */}
//             //     <TextInput
//             //       label={
//             //         <Text>
//             //           <Text>Address</Text>
//             //           <Text style={{color: 'red'}}>*</Text>
//             //         </Text>
//             //       }
//             //       // maxLength={250}
//             //       keyboardType="email-address"
//             //       mode="outlined"
//             //       style={{}}
//             //       // onChangeText={handleChange('address')}
//             //       // onBlur={handleBlur('address')}
//             //       // value={values.address}
//             //       onChangeText={setAddress}
//             //       value={address}
//             //       placeholder="Address"
//             //       autoCapitalize="none"
//             //     />
//             //     {errors.address && (
//             //       <Text style={{color: 'red'}}>{errors.address}</Text>
//             //     )}
//             //   </View>
//             // </View>
//           }
//                   <Autocomplete apiKey={GOOGLE_PLACES_API_KEY} currentAddress = {address} onSelect={handleSelect} />


//           <View
//             style={{
//               flex: 1,
//               flexDirection: 'row',
//               marginTop: 20,
//               marginHorizontal: 18,
//             }}>
//             <Text style={{color: COLOR_LIST.LABEL_TEXT}}>
//               Upload Document :
//             </Text>
//           </View>
//           <View style={[styles.itemMainView, {marginTop: 20}]}>
//             <View style={{flex: 1, justifyContent: 'center'}}>
//               <Dropdown
//                 style={[styles.dropdown, isFocus && {borderColor: 'black'}]}
//                 placeholderStyle={styles.selectedTextStyle}
//                 textStyle={styles.selectedTextStyle}
//                 itemTextStyle={styles.selectedTextStyle}
//                 selectedTextStyle={styles.selectedTextStyle}
//                 inputSearchStyle={styles.inputSearchStyle}
//                 iconStyle={styles.iconStyle}
//                 data={proofDocumentTypeList}
//                 placeholder="Select proof type"
//                 maxHeight={300}
//                 labelField="name"
//                 valueField="id"
//                 // placeholder={!isFocus ? 'Select Proof Type' : 'Select Proof Type'}
//                 onFocus={() => setIsFocus(true)}
//                 value={proofDocumentTypeId}
//                 onChange={item => {
//                   // Update the selected proof type
//                   setProofDocumentTypeId(item.id);
//                 }}
//               />
//               {errors.proofDocumentTypeId && (
//                   <Text style={{color: 'red'}}>{errors.proofDocumentTypeId}</Text>
//                 )}
//             </View>
//           </View>

//           <View
//             style={[
//               styles.itemMainView,
//               {marginTop: 20, alignItems: 'center'},
//             ]}>
//             <View style={{flex: 1, justifyContent: 'center'}}>
//               <TextInput
//                 disabled={true}
//                 mode="outlined"
//                 style={{width: '100%'}}
//                 onChangeText={() => {}}
//                 placeholder={selectProofType} // Document file placeholder
//                 autoCapitalize="none"
//               />

//               {/* {touched.selectedDocProofLength && errors.selectedDocProofLength && <Text style={styles.errorInputText}>{errors.selectedDocProofLength}</Text>} */}
//             </View>
//             <View style={{flex: 0.5, justifyContent: 'center'}}>
//               <Button
//                 title={'Browse'}
//                 buttonStyle={{
//                   backgroundColor: '#EC3237',
//                   borderRadius: 5,
//                   padding: 13,
//                 }}
//                 containerStyle={{
//                   marginHorizontal: 10,
//                 }}
//                 titleStyle={{
//                   fontWeight: 400,
//                   fontSize: 18,
//                 }}
//                 onPress={selectDoc}
//               />
              
//             </View>
//           </View>
//           {errors.proofDocument && (
//                   <Text style={{color: 'red', marginLeft:20}}>{errors.proofDocument}</Text>
//                 )}
//           <View
//             style={{
//               flex: 1,
//               flexDirection: 'row',
//               marginTop: 20,
//               marginHorizontal: 18,
//             }}>
//             <Text style={{color: COLOR_LIST.LABEL_TEXT}}>
//               Set communication options :
//             </Text>
//           </View>

//           <View style={[styles.itemMainView, {marginTop: 0, marginTop: 20}]}>
//             <View style={{flexDirection: 'column'}}>
//               <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                 {communicationTypeList.map(communicationType => (
//                   <View
//                     key={communicationType.id}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       marginRight: 20,
//                     }}>
//                     <CheckBox
//                       tintColors={{
//                         true: COLOR_LIST.PRIMARY,
//                         false: COLOR_LIST.DISABLED,
//                       }}
//                       boxType="square"
//                       style={{
//                         height: 30,
//                         width: 30,
//                         color: 'grey',
//                         borderColor: 'grey',
//                       }}
//                       value={selectedCommunicationType.includes(
//                         communicationType.id,
//                       )}
//                       onValueChange={newValue =>
//                         handleCheckBoxToggle(newValue, communicationType.id)
//                       }
//                     />
//                     <Text
//                       style={{color: COLOR_LIST.LABEL_TEXT, marginLeft: 10}}>
//                       {communicationType.name}
//                     </Text>
//                   </View>
//                 ))}
//               </View>
//               {errors.checkbox1 && (
//                 <Text style={{color: 'red'}}>{errors.checkbox1}</Text>
//               )}
//             </View>

//             <View style={{flex: 1}}></View>
//           </View>

//           <View style={[styles.itemMainView, {marginTop: 20}]}>
//             <View style={{flex: 1, justifyContent: 'center'}}>
//               <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                 <CheckBox
//                   tintColors={{true: 'red', false: 'grey'}}
//                   boxType="square"
//                   style={{
//                     height: 30,
//                     width: 30,
//                     color: 'black',
//                     borderColor: 'black',
//                   }}
//                   value={toggleCheckBox}
//                   onValueChange={newValue => setToggleCheckBox(newValue)}
//                 />
//                 <Text style={{color: COLOR_LIST.LABEL_TEXT, marginLeft: 10}}>
//                   {CONTENT.PROFILE_AGREE_TEXT}
//                 </Text>
//               </View>
//               {errors.checkbox && (
//                 <Text style={{color: 'red'}}>{errors.checkbox}</Text>
//               )}
//             </View>
//           </View>

//           <View style={{justifyContent: 'center', alignItems: 'center'}}>
//             <SignInButton
//               titleName="UPDATE"
//               iconName={check}
//               onClick={handleSubmit}
//             />
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: BackgroundColor,
//   },

//   inputView: {
//     width: '100%',
//     marginTop: 15,
//   },

//   itemMainView: {
//     flexDirection: 'row',
//     marginHorizontal: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   inputText: {
//     fontSize: 18,
//     color: '#424856',
//     marginHorizontal: 12,
//     height: 28,
//   },

//   errorInputText: {
//     color: 'red',
//     marginHorizontal: 12,
//   },
//   errorInputTextTitle: {
//     color: 'red',
//     marginHorizontal: 5,
//   },

//   input: {
//     marginTop: 5,
//     marginHorizontal: 12,
//   },
//   dropdown: {
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     backgroundColor: 'white',
//     color: 'black',
//   },
//   selectedTextStyle: {
//     color: 'black',
//   },
//   errorView: {
//     flex: 1,
//     flexDirection: 'row',
//     // height: 50,
//     marginTop: 20,
//     marginHorizontal: 18,
//   },
//   errorInputText: {
//     color: 'red',
//     // marginHorizontal: 12,
//   },
// });


import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import {BackgroundColor} from '../../helpers/constants';
import BackNavigation from '../../components/backNavigation';
import {Dropdown} from 'react-native-element-dropdown';
import {TextInput} from 'react-native-paper';
import {Button} from '@rneui/themed';
import CheckBox from '@react-native-community/checkbox';
import {SignInButton} from '../../components/common';
import {useNavigation} from '@react-navigation/native';
import {FastField, useFormik} from 'formik';
import {getMasterdata} from '../../redux/slice/profileMaster';
import {getMasterProfile, getMasterProfileReset} from '../../redux/slice/masterProfile';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import DocumentPicker from 'react-native-document-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

//*Images
import check from '../../assets/check.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  API_BASE_URL,
  API_VERSION,
  COUNTRY_CODE,
  GOOGLE_PLACES_API_KEY,
} from '../../helpers/enum';
import {COLOR_LIST} from '../../helpers/colorlist';
import {CONTENT} from '../../helpers/content';
import Autocomplete from '../../components/Autocomplete';
import { SignUpOtpResetData } from '../../redux/slice/signUp';
import InternetAlert from '../../components/InternetAlert';

export const Profile = ({route}) => {
  const toast = useToast();
  const mobile = route.params?.mobile;
  const email = route.params?.emailId;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const handleCheckBoxToggle = (newValue, communicationTypeId) => {
    if (newValue) {
      setSelectedCommunicationType([
        ...selectedCommunicationType,
        communicationTypeId,
      ]);
    } else {
      setSelectedCommunicationType(
        selectedCommunicationType.filter(id => id !== communicationTypeId),
      );
    }
  };

  const DocumentTypeData = [
    {
      id: 3,
      name: 'Driving License',
    },
    {
      id: 4,
      name: 'Passport',
    },
    {
      id: 5,
      name: 'South Africa ID',
    },
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDocumentItem, setSelectedDocItem] = useState(null);

  // const titleList = [
  //   // This needs to change dynamically
  //   {
  //     id: 2,
  //     name: 'Mr',
  //   },
  //   {
  //     id: 3,
  //     name: 'Mrs',
  //   },
  //   {
  //     id: 4,
  //     name: 'Ms',
  //   },
  // ];
  

  // const communicationTypeList = [
  //   // this needs to change dynamic
  //   {
  //     id: 1,
  //     name: 'Mobile',
  //   },
  //   {
  //     id: 2,
  //     name: 'Email',
  //   },
  // ];


  const [titleId, setTitleId] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countryCode, setCountryCode] = useState(COUNTRY_CODE);
  const [roleId, setRoleId] = useState(1);
  const [companyId, setCompanyId] = useState(1);
  const [addressLatitude, setAddressLatitude] = useState('0.0');
  const [addressLongitude, setAddressLongitude] = useState('0.0');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [statusId, setStatusId] = useState(1);
  const [selectedCommunicationType, setSelectedCommunicationType] = useState(
    [],
  );
  const [proofDocumentTypeId, setProofDocumentTypeId] = useState(null);
  const [proofDocument, setProofDocument] = useState('');

  const [selectProofType, setSelectProofType] = useState(
    'Select file (jpg/png/pdf)',
  );
  const [address, setAddress] = useState('');
  // const [country, setCountry] = useState('1');
  const [iconList, setIconList] = useState([]);
  const [dropdown, setDropDown] = useState([]);
 
  // useEffect(() => {
  //   getMaster();
  // }, []);
  // const getMaster = async () => {
  //   let accessToken = await AsyncStorage.getItem('accessToken');
  //   console.log('accesstoken...', `Bearer ${accessToken}`);

  //   let dataObj = {
  //     accessToken: `Bearer ${accessToken}`,
  //   };

  //   dispatch(getMasterProfile(dataObj));
  // };


//   useEffect(() => {
//     const getMaster = async () => {
//         // let accessToken = await AsyncStorage.getItem('accessToken');
//         // console.log('accesstoken...', `Bearer ${accessToken}`);

//         // let dataObj = {
//         //     accessToken: `Bearer ${accessToken}`,
//         // };

//         dispatch(getMasterProfile());
//     };

//     getMaster();
// }, []);

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
          console.error("Error fetching access token:", error);
      }
  };

  getMaster();
}, [dispatch]);
  console.log('====================================');
  console.log('getMasterdataData');
  console.log('====================================');



  // const {
  //   getMasterProfileIsLoading,
  //   getMasterProfileData,
  //   // getRoleMasterList,
  //   getMasterProfileIsSuccess,
  //   getMasterProfileIsError,
  // } = useSelector(state => ({
  //   getMasterProfileIsLoading: state.masterProflie.getMasterProfileIsLoading,
  //   getMasterProfileData: state.masterProflie.getMasterProfileData,
  //   // getRoleMasterList: state.masterListForProfile.getRoleMasterList,
  //   getMasterProfileIsSuccess: state.masterProflie.getMasterProfileIsSuccess,
  //   getMasterProfileIsError: state.masterProflie.getMasterProfileIsError,
  // }));

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


 
  console.log(iconList);
  console.log(dropdown);
  const [serverErrors,setServerErrors] = useState([]); 
  // const selectDoc = async () => {
  //   try {
  //     const doc = await DocumentPicker.pickSingle({
  //       type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
  //     });
  //     if (doc) {
  //       setProofDocument(doc);
  //       console.log(doc);
  //       setSelectProofType(doc.name);
  //     }
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log('User cancelled the upload', err);
  //     } else {
  //       console.log(err);
  //     }
  //   }
  // };
console.log(selectedCommunicationType,"selectedCommunicationType");
  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      if (doc) {
        // Check file size here
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
        if (doc.size > maxSizeInBytes) {
          alert('Selected file exceeds 5MB limit. Please select a smaller file.');
          return; // Exit function without setting state
        }
        
        // File size is within limit, proceed to set state
        setProofDocument(doc);
        console.log(doc);
        setSelectProofType(doc.name);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the upload', err);
      } else {
        console.log(err);
      }
    }
  };
  
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
    .matches(/^[a-zA-Z '-]+$/, 'First name should be alphabet')
    

      .min(2, 'Need at least 2 characters')
      // .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed')
      .required('First name is required'),
    lastName: Yup.string()
    .matches(/^[a-zA-Z '-]+$/, 'Last name should be alphabet')

      .min(2, 'Need at least 2 characters')
      // .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed')
      .required('Last name is required'),
    titleId: Yup.number().required('Please select title'),
    // proofDocumentTypeId: Yup.number().required('Please select proof type'),
    // proofDocument: Yup.mixed().test('fileRequired', 'Please select proof document', value => {
    //   return value; // Check if a file is selected
    // }),
    // address: Yup.string().required('Address is required'),
    checkbox: !toggleCheckBox
      ? Yup.array().required('You need to accept terms and conditions')
      : null,
    checkbox1:
      selectedCommunicationType.length === 0
        ? Yup.array().required('Please select at least one communication type')
            .min(1, 'Please select at least one communication type')
        : Yup.array(),
    // Add validation for other fields as needed
  });
  
  const handleSubmit = async () => {
    console.log('come to handleSubmit', selectedCommunicationType);
  
    try {

      await validationSchema.validate(
        {
          firstName,
          lastName,
          // address,
          titleId,
          // proofDocumentTypeId,
          // proofDocument,
          // Add other form fields here
        },
        { abortEarly: false },
      );

      const formData = new FormData();
      let id = await AsyncStorage.getItem('userId');
      let accessToken = await AsyncStorage.getItem('accessToken');
      // console.log(accessToken);
      user = parseInt(id);
      formData.append('Id', user);
      formData.append('TitleId', titleId);
      formData.append('FirstName', firstName);
      formData.append('LastName', lastName);
      formData.append('CountryCode', countryCode);
      formData.append('Mobile', mobile);
      formData.append('RoleId', roleId);
      formData.append('Email', email);
      formData.append('CompanyId', companyId);
      formData.append('AddressLatitude', addressLatitude);
      formData.append('AddressLongitude', addressLongitude);
      formData.append('AddressLine1', address);
      formData.append('AddressLine2', address);
      formData.append('City', city);
      formData.append('State', state);
      formData.append('Country', country);
      formData.append('StatusId', statusId);
      selectedCommunicationType.forEach(id => {
        formData.append('CommunicationTypesIds', id);
    });
    
      // formData.append('CommunicationTypesIds', 1);
      // formData.append('CommunicationTypesIds', 2);

      formData.append('ProofDocumentTypeId', proofDocumentTypeId);
      formData.append('ProofDocument', proofDocument);
  
      console.log('formData:', formData);
      const response = await fetch(
        `${API_BASE_URL}api/user/update-user?api-version=${API_VERSION}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + accessToken,
          },
          body: formData,
        }
      );

      
      console.log(response,"kfprpfpeprfperkpf");
   
      if (response.status === 200) {
        const data = await response.json();
        console.log(data,'ppppppppppppp');

        toast.show('Profile Complete successfully!', {
          type: 'success',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
  
        await AsyncStorage.setItem('firstName', firstName);
        await AsyncStorage.setItem('lastName', lastName);
        await AsyncStorage.setItem('emailId', email); 
        await AsyncStorage.setItem('mobile', mobile);
        await AsyncStorage.setItem('isProfileComplete', 'true');


        if (data.status === "Pending") {
          try {
            setServerErrors('');

            await AsyncStorage.multiRemove(['accessToken', 'firstName', 'lastName', 'emailId', 'isProfileCompleted','sessionKey']);
            setTitleId(null);
            setFirstName('');
            setLastName('');
            setAddress('');
            setCity('');
            setCountry('');
            setStatusId('');
            setSelectedCommunicationType([]);
            setProofDocumentTypeId(null);
            setProofDocument('');
            setSelectProofType('');
            setIconList([]);
            setDropDown([]);
            setState('');
            dispatch(SignUpOtpResetData())
                      dispatch(getMasterProfileReset())
                          navigation.push('signIn');
            setTimeout(() => {
              toast.show("Your registration request has sent for admin approval", {
                type: "warning",
                placement: "top",
                duration: 2000,
                offset: 30,
                animationType: "slide-in",
            });
            }, 2000);
          } catch (error) {

            console.error('Error clearing specific storage items:', error);
          }
        } else {
          setServerErrors('');

          navigation.push('dashBoard');
        }
      }
      else if(response.status === 400) {
        const data = await response.json();
        console.log(data?.errors, 'hfiheofoeroforofo');
        setServerErrors(data?.errors);
  }
      else if (response.status === 500) {
        const data = await response.json();
        setServerErrors('');
        console.error('Server error: ', data.message);
        toast.show('Server error! Please try again later.', {
          type: 'error',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (error) {
      if (error.inner) {
        const validationErrors = {};
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Error submitting form:', error);
        // toast.show('An error occurred. Please check your data and try again.', {
        //   type: 'error',
        //   placement: 'top',
        //   duration: 3000,
        //   offset: 30,
        //   animationType: 'slide-in',
        // });
      }
    }
  };
  

  // const validationSchema = Yup.object().shape({
  //   firstName: Yup.string()
  //     .min(2, 'Need at least 2 characters')
  //     .required('First name is required'),
  //   lastName: Yup.string()
  //     .min(2, 'Need at least 2 characters')
  //     .required('Last name is required'),
  //   titleId: Yup.number().required('Please select title'),
  //   proofDocumentTypeId: Yup.number().required('Please select proof type'),
  //   proofDocument: Yup.mixed().test('fileRequired', 'Please select proof document', value => {
  //     return value; // Check if a file is selected
  //   }),
  //   address: Yup.string().required('Address is required'),
  //   checkbox: !toggleCheckBox
  //     ? Yup.array().required('You need to accept terms and conditions')
  //     : null,
  //   checkbox1:
  //     selectedCommunicationType.length === 0
  //       ? Yup.array().required('Please select at least one communication type')
  //           .min(1, 'Please select at least one communication type')
  //       : Yup.array(),
  //   // Add validation for other fields as needed
  // });
  
  // const handleSubmit = async () => {
  //   console.log('come to handleSubmit', toggleCheckBox);
  
  //   try {
  //     await validationSchema.validate(
  //       {
  //         firstName,
  //         lastName,
  //         address,
  //         titleId,
  //         proofDocumentTypeId,
  //         proofDocument,
  //         // Add other form fields here
  //       },
  //       {abortEarly: false},
  //     );
  
  //     const formData = new FormData();
  //     let id = await AsyncStorage.getItem('userId');
  //     let accessToken = await AsyncStorage.getItem('accessToken');
  //     console.log(accessToken);
  //     user = parseInt(id);
  
  //     formData.append('Id', user);
  //     formData.append('TitleId', titleId);
  //     formData.append('FirstName', firstName);
  //     formData.append('LastName', lastName);
  //     formData.append('CountryCode', countryCode);
  //     formData.append('Mobile', mobile);
  //     formData.append('RoleId', roleId);
  //     formData.append('Email', email);
  //     formData.append('CompanyId', companyId);
  //     formData.append('AddressLatitude', addressLatitude);
  //     formData.append('AddressLongitude', addressLongitude);
  //     formData.append('AddressLine1', address);
  //     formData.append('AddressLine2', address);
  //     formData.append('City', city);
  //     formData.append('State', state);
  //     formData.append('Country', country);
  //     formData.append('StatusId', statusId);
  //     formData.append('CommunicationTypesIds', 1);
  //     formData.append('ProofDocumentTypeId', proofDocumentTypeId);
  //     formData.append('ProofDocument', proofDocument);
  
  //     console.log('formData:', formData);
  //     const response = await fetch(
  //       `${API_BASE_URL}api/user/update-user?api-version=${API_VERSION}`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //           Authorization: 'Bearer ' + accessToken,
  //         },
  //         body: formData,
  //       }
  //     );
  //        const data = await response.json();

  //     console.log(data);
  //         await AsyncStorage.setItem('firstName', firstName);
  //       await AsyncStorage.setItem('lastName', lastName);
  //       await AsyncStorage.setItem('emailId', email);
  //       await AsyncStorage.setItem('mobile', mobile);
  //       await AsyncStorage.setItem('isProfileComplete', 'true');
  //       toast.show('Profile Complete successfully!', {
  //         type: 'success',
  //         placement: 'top',
  //         duration: 3000,
  //         offset: 30,
  //         animationType: 'slide-in',
  //       });

  //       // if (data.status === "Pending") {
  //       //       try {
  //       //         await AsyncStorage.multiRemove(['accessToken', 'firstName', 'lastName', 'emailId', 'isProfileCompleted']);
  //       //         navigation.navigate('signIn');
  //       //       } catch (error) {
  //       //         console.error('Error clearing specific storage items:', error);
  //       //       }
  //       //     } else {
  //       //       navigation.navigate('dashBoard');
  //       // }
            
  //     // try {
  //     //   const response = await fetch(
  //     //     `${API_BASE_URL}api/user/update-user?api-version=${API_VERSION}`,
  //     //     {
  //     //       method: 'POST',
  //     //       headers: {
  //     //         'Content-Type': 'multipart/form-data',
  //     //         Authorization: `Bearer ${accessToken}`,
  //     //       },
  //     //       body: formData,
  //     //     },
  //     //   );
  
  //     //   if (!response.ok) {
  //     //     if (response.status === 500) {
  //     //       throw new Error('Server facing issue while processing! Please try later.');
  //     //     } else {
  //     //       throw new Error('Something went wrong! Please try later.');
  //     //     }
  //     //   }
  
  //     //   const data = await response.json();
  //     //   console.log('Response data:', data);
  
  //     //   await AsyncStorage.setItem('firstName', firstName);
  //     //   await AsyncStorage.setItem('lastName', lastName);
  //     //   await AsyncStorage.setItem('emailId', email);
  //     //   await AsyncStorage.setItem('mobile', mobile);
  //     //   await AsyncStorage.setItem('isProfileComplete', 'true');
  
  //     //   toast.show('Profile Complete successfully!', {
  //     //     type: 'success',
  //     //     placement: 'top',
  //     //     duration: 3000,
  //     //     offset: 30,
  //     //     animationType: 'slide-in',
  //     //   });
  
  //     //   if (data.status === "Pending") {
  //     //     try {
  //     //       await AsyncStorage.multiRemove(['accessToken', 'firstName', 'lastName', 'emailId', 'isProfileCompleted']);
  //     //       navigation.navigate('signIn');
  //     //     } catch (error) {
  //     //       console.error('Error clearing specific storage items:', error);
  //     //     }
  //     //   } else {
  //     //     navigation.navigate('dashBoard');
  //     //   }
  //     // } catch (error) {
  //     //   console.error('Error:', error);
  //     //   toast.show('An error occurred. Please check your data and try again.', {
  //     //     type: 'error',
  //     //   });
  //     // }
  //   } 
    
    
  //   catch (error) {

  //     if (error.inner) {
  //       const validationErrors = {};
  //       error.inner.forEach(err => {
  //         validationErrors[err.path] = err.message;
  //       });
  //       setErrors(validationErrors);
  //     } else {
  //       console.error('Error submitting form:', error);
  //     }
  //     // const validationErrors = {};
  //     // error.inner.forEach(err => {
  //     //   validationErrors[err.path] = err.message;
  //     // });
  //     // setErrors(validationErrors);
  //   }
  // };
  


  // const validationSchema = Yup.object().shape({
  //   firstName: Yup.string()
  //     .matches(
  //       /^[A-Za-z]+(?: [A-Za-z]+)?$/,
  //       'First name should be alphanumeric',
  //     )
  //     .min(2, 'Need at list 2 characters')
  //     .required('First name is required'),

  //   lastName: Yup.string()
  //     .matches(
  //       /^[A-Za-z]+(?: [A-Za-z]+)?$/,
  //       'First name should be alphanumeric',
  //     )
  //     .min(2, 'Need at list 2 characters')
  //     .required('Last name is required'),
  //     titleId: Yup.number()
  //     .required('Please select title'),
  //     proofDocumentTypeId: Yup.number()
  //     .required('Please select proof type'),
  //     proofDocument: Yup.mixed()
  //     .test('fileRequired', 'Please select proof document', (value) => {
  //       // Check if a file is selected
  //       return value;
  //     }),

  //   address: Yup.string().required('Address is required'),
  //   // checkBox: Yup.boolean().oneOf([true], 'please accept terms and conditions before procced'),

  //   // CheckBox: Yup.string().
  //   //  required('Please select T&cd.. are required'),
  //   checkbox: !toggleCheckBox
  //     ? Yup.array().required('You need to accept terms and conditions')
  //     : null,
  //   checkbox1:
  //     selectedCommunicationType.length === 0
  //       ? Yup.array()
  //           .required('Please select at least one communicationt ype ')
  //           .min(1, 'Please select at least one communication type')
  //       : Yup.array(),
  //   //  checkbox1: Yup.array()
  //   //  .required('Please select at least one checkbox')
  //   //  .min(2, 'Please select at least one checkbox'),
  //   // Add validation for other fields here
  //   // Example:
  //   // email: Yup.string().email('Invalid email').required('Email is required'),
  //   // mobile: Yup.string().required('Mobile is required'),
  //   // address: Yup.string().required('Address is required'),
  //   // Add validation for other fields as needed
  // });

  // <----masterApi ----->
  const [errors, setErrors] = useState({});

  // const handleSubmit = async () => {
  //   console.log('come to handlesubit', toggleCheckBox);

  //   try {
  //     await validationSchema.validate(
  //       {
  //         firstName,
  //         lastName,
  //         address,
  //         titleId,
  //         proofDocumentTypeId,
  //         proofDocument
  //         // Add other form fields here
  //       },
  //       {abortEarly: false},
  //     );
  //     // console.log(accessToken,firstName,titleId,user,proofDocumentTypeId);

  //     const formData = new FormData();
  //     let id = await AsyncStorage.getItem('userId');
  //     let accessToken = await AsyncStorage.getItem('accessToken');
  //     console.log(accessToken);
  //     user = parseInt(id);

  //     formData.append('Id', user);
  //     //
  //     formData.append('TitleId', titleId);
  //     // formData.append('UserName', userName);
  //     formData.append('FirstName', firstName);
  //     formData.append('LastName', lastName);
  //     formData.append('CountryCode', countryCode);
  //     formData.append('Mobile', mobile);
  //     // formData.append('Role', role);
  //     formData.append('RoleId', roleId);
  //     formData.append('Email', email);
  //     formData.append('CompanyId', companyId);
  //     formData.append('AddressLatitude', addressLatitude);
  //     formData.append('AddressLongitude', addressLongitude);
  //     formData.append('AddressLine1', address);
  //     formData.append('AddressLine2', address);
  //     formData.append('City', city);
  //     formData.append('State', state);
  //     formData.append('Country', country);
  //     // formData.append('Status', status);
  //     formData.append('StatusId', statusId);
  //     formData.append('CommunicationTypesIds', 1);
  //     // formData.append('ProofDocumentId', proofDocumentId);
  //     formData.append('ProofDocumentTypeId', proofDocumentTypeId);
  //     formData.append('ProofDocument', proofDocument);
  //     // formData.append('ProfilePicture', profilePicture);
  //     // formData.append('ProfileUrl', profileUrl);

  //     console.log('formData.....00000000000000', formData);
  //     try {
  //       const response = await fetch(
  //         `${API_BASE_URL}api/user/update-user?api-version=${API_VERSION}`,

  //         {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //             // Authorization: "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZ2VzaGkxMkBnbWFpbC5jb20iLCJjb21wYW55IjoiMSIsImV4cCI6MTcwOTg5MjcxNiwiaXNzIjoiaHR0cDovL09udGVjLmNvbS8iLCJhdWQiOiJodHRwOi8vT250ZWMuY29tLyJ9.uH7RT1fozDmBND9hk23SCOFU_GCOoz9hjoYyFpYB3wI",
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //           body: formData,
  //         },
  //       );
  //       if (!response.ok) {
  //         if (response.status == 500) {
  //           throw new Error(
  //             'Server facing issue while processing! Please try later.',
  //           );
  //         } else {
  //           throw new Error('Something went wrong! Please try later.');
  //         }
  //         return;
  //       }
        
  //       const data = await response.json();
  //       // after data i get user id and message
  //       console.log('Response data:========', data);
  //       await AsyncStorage.setItem('firstName', firstName);
  //       await AsyncStorage.setItem('lastName', lastName);
  //       await AsyncStorage.setItem('emailId', email);
  //       await AsyncStorage.setItem('mobile', mobile);
  //       await AsyncStorage.setItem('isProfileComplete', 'true');

  //       toast.show('Profile Complete successfully!', {
  //         type: 'success',
  //         placement: 'top',
  //         duration: 3000,
  //         offset: 30,
  //         animationType: 'slide-in',
  //       });
  //       console.log(data.status);

  //     if (data.status === "Pending") {
  //       try {
  //         await AsyncStorage.multiRemove(['accessToken', 'firstName', 'lastName','emailId','isProfileCompleted']);
  //         navigation.navigate('signIn');
  //       } catch (error) {
  //         console.error('Error clearing specific storage items:', error);
  //       }
  //     } else {
  //       navigation.navigate('dashBoard');
  //     }
  //     } catch (error) {
  //       // console.error('Error:', error);
  //       toast.show('An error occurred. Please check your data and try again.', {
  //         type: 'error',
  //       });
  //     }
  //   } catch (error) {
  //     // Validation failed, set errors
  //     const validationErrors = {};
  //     error.inner.forEach(err => {
  //       validationErrors[err.path] = err.message;
  //     });
  //     setErrors(validationErrors);
  //   }
  // };
  const handleSelect = prediction => {
    console.log('Selected prediction:', prediction.description);
    setAddress(prediction.description);
    // Do something with the selected prediction
  };
  const [userData, setUserData] = useState([]);
  console.log('userdata', userData);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
                        <InternetAlert />

      <ScrollView style={{flex: 1, backgroundColor: BackgroundColor}}>
        <View style={{margintop: 28, alignSelf: 'center'}}>
          <Text
            style={{
              marginHorizontal: 21,
              width: 349,
              marginTop: 10,
              fontFamily: 'Catamaran-Regular',
              fontSize: 30,
              fontWeight: '700',
              lineHeight: 46,
              color: '#171A1FFF',
              textAlign: 'center',
            }}>
            Complete Your Profile
          </Text>
        </View>
        <View style={{flex: 1, backgroundColor: BackgroundColor}}>
          <View
            style={[
              styles.itemMainView,
              {marginTop: 30, marginBottom:10, alignSelf: 'flex-start'},
            ]}>
            <View style={{flex: 0.4}}>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                textStyle={styles.selectedTextStyle}
                itemTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.selectedTextStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={titleList}
                maxHeight={300}
                labelField="name" // Use 'name' as the label field
                valueField="id" // Use 'id' as the value field
                placeholder={'Select Title'}
                onFocus={() => setIsFocus(true)}
                value={titleId}
                onChange={item => {
                  // Update the selected proof document type
                  setTitleId(item.id);
                }}
              />
              {errors.titleId && (
                  <Text style={{color: 'red'}}>{errors.titleId}</Text>
                )}
            </View>
          </View>
          <View style={styles.itemMainView}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TextInput
                label={
                  <Text>
                    <Text>First Name</Text>
                    <Text style={{color: 'red'}}>*</Text>
                  </Text>
                }
                keyboardType="default"
                mode="outlined"
                style={{marginRight: 10}}
                onChangeText={setFirstName}
                value={firstName}
              />
            </View>

            <View style={{flex: 1, justifyContent: 'center'}}>
              <TextInput
                label={
                  <Text>
                    <Text>Last Name</Text>
                    <Text style={{color: 'red'}}>*</Text>
                  </Text>
                }
                keyboardType="email-address"
                mode="outlined"
                onChangeText={setLastName}
                value={lastName}
                style={{marginLeft: 10}}
              />
              {/* {errors.lastName && (
      <Text style={{color: 'red'}}>{errors.lastName}</Text>
    )} */}
            </View>
          </View>

          <View style={[styles.errorView, {marginTop: 0}]}>
            <View
              style={{flex: 1, justifyContent: 'center'}}>
              {errors.firstName && (
                <Text style={{color: 'red'}}>{errors.firstName}</Text>
              )}
               {serverErrors.FirstName && (
                <Text style={{color: 'red'}}>{serverErrors.FirstName}</Text>
              )}
              
            </View>

            <View style={{flex: 1, justifyContent: 'center', marginLeft:20}}>
              {errors.lastName && (
                <Text style={{color: 'red'}}>{errors.lastName}</Text>
              )}
                {serverErrors.LastName && (
                <Text style={{color: 'red'}}>{serverErrors.LastName}</Text>
              )}
            </View>
          </View>

          <View style={[styles.itemMainView, {marginTop: 20}]}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TextInput
                // label="Mobile"
                disabled={true}
                keyboardType="email-address"
                mode="outlined"
                style={{marginRight: 10}}
                //

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
                placeholder={email}
                autoCapitalize="none"
              />
            </View>
          </View>

          {
            // <View style={[styles.itemMainView, {marginTop: 20}]}>
            //   <View style={{flex: 1, justifyContent: 'center'}}>
            //     {/* <GooglePlacesAutocomplete
            //   ref={locationName}
            //   placeholder='Search'
            //   onPress={(data, details = null) => {
            //     // 'details' is provided when fetchDetails = true
            //     setAddressText(data);
            //     console.log(data, details);
            //   }}
            //   query={{
            //     key: GOOGLE_PLACES_API_KEY,
            //     language: 'en',
            //   }}
            //   styles={{
            //     container: {
            //       // Customize container styles if needed
            //       flex: 1,
            //     },
            //     row: {
            //       backgroundColor: '#FFFFFF',
            //       padding: 13,
            //       height: 44,
            //       flexDirection: 'row',
            //     },
            //     textInput: {
            //       // Customize text input styles if needed
            //       color:'black'
            //     },
            //     listView: {
            //       backgroundColor: 'lightgrey'
            //       // Customize list view styles if needed
            //     },
            //   }}
              
            // /> */}
            //     {/* <GooglePlacesAutocomplete
            //   placeholder='Search'
            //   defaultValue = ''
            //   onPress={(data, details = null) => {
            //     setLocationName(data)
            //     setAddressText('jashjahsj')
            //   }}
            //   onChangeText={(text) => setLocationName(text)}
            //   placeholderTextColor='gray'
            //   renderRow={(rowData, index) => (
            //     <Text style={{color:'black'}} onClick={() => {
            //       console.log("========================");;
            //     }}>{rowData.description}</Text>
            //   )}
            //   query={{
            //     key: GOOGLE_PLACES_API_KEY,
            //     language: 'en', // language of the results
            //     types: 'address', // restricts the results to a specific type
            //   }}
            //   styles={{
            //     container: {
            //       // Customize container styles if needed
            //       flex: 1,
            //     },
            //     row: {
            //       backgroundColor: '#FFFFFF',
            //       padding: 13,
            //       height: 44,
            //       flexDirection: 'row',
            //     },
            //     textInput: {
            //       // Customize text input styles if needed
            //       color:'black'
            //     },
            //     listView: {
            //       backgroundColor: 'lightgrey'
            //       // Customize list view styles if needed
            //     },
            //   }}
            // /> */}
            //     <TextInput
            //       label={
            //         <Text>
            //           <Text>Address</Text>
            //           <Text style={{color: 'red'}}>*</Text>
            //         </Text>
            //       }
            //       // maxLength={250}
            //       keyboardType="email-address"
            //       mode="outlined"
            //       style={{}}
            //       // onChangeText={handleChange('address')}
            //       // onBlur={handleBlur('address')}
            //       // value={values.address}
            //       onChangeText={setAddress}
            //       value={address}
            //       placeholder="Address"
            //       autoCapitalize="none"
            //     />
            //     {errors.address && (
            //       <Text style={{color: 'red'}}>{errors.address}</Text>
            //     )}
            //   </View>
            // </View>
          }
                  <Autocomplete apiKey={GOOGLE_PLACES_API_KEY} currentAddress = {address} onSelect={handleSelect} />


          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 20,
              marginHorizontal: 18,
            }}>
            <Text style={{color: COLOR_LIST.LABEL_TEXT}}>
              Upload Document :
            </Text>
          </View>
          <View style={[styles.itemMainView, {marginTop: 20}]}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'black'}]}
                placeholderStyle={styles.selectedTextStyle}
                textStyle={styles.selectedTextStyle}
                itemTextStyle={styles.selectedTextStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={proofDocumentTypeList}
                placeholder="Select proof type"
                maxHeight={300}
                labelField="name"
                valueField="id"
                // placeholder={!isFocus ? 'Select Proof Type' : 'Select Proof Type'}
                onFocus={() => setIsFocus(true)}
                value={proofDocumentTypeId}
                onChange={item => {
                  // Update the selected proof type
                  setProofDocumentTypeId(item.id);
                }}
              />
              {errors.proofDocumentTypeId && (
                  <Text style={{color: 'red'}}>{errors.proofDocumentTypeId}</Text>
                )}
            </View>
          </View>

          <View
            style={[
              styles.itemMainView,
              {marginTop: 20, alignItems: 'center'},
            ]}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TextInput
                disabled={true}
                mode="outlined"
                style={{width: '100%'}}
                onChangeText={() => {}}
                placeholder={selectProofType} // Document file placeholder
                autoCapitalize="none"
              />

              {/* {touched.selectedDocProofLength && errors.selectedDocProofLength && <Text style={styles.errorInputText}>{errors.selectedDocProofLength}</Text>} */}
            </View>
            <View style={{flex: 0.5, justifyContent: 'center'}}>
              <Button
                title={'Browse'}
                buttonStyle={{
                  backgroundColor: '#EC3237',
                  borderRadius: 5,
                  padding: 13,
                }}
                containerStyle={{
                  marginHorizontal: 10,
                }}
                titleStyle={{
                  fontWeight: 400,
                  fontSize: 18,
                }}
                onPress={selectDoc}
              />
              
            </View>
          </View>
          {errors.proofDocument && (
                  <Text style={{color: 'red', marginLeft:20}}>{errors.proofDocument}</Text>
                )}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 20,
              marginHorizontal: 18,
            }}>
            <Text style={{color: COLOR_LIST.LABEL_TEXT}}>
              Set communication options :
            </Text>
          </View>

          <View style={[styles.itemMainView, {marginTop: 0, marginTop: 20}]}>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {communicationTypeList.map(communicationType => (
                  <View
                    key={communicationType.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 20,
                    }}>
                    <CheckBox
                      tintColors={{
                        true: COLOR_LIST.PRIMARY,
                        false: COLOR_LIST.DISABLED,
                      }}
                      boxType="square"
                      style={{
                        height: 30,
                        width: 30,
                        color: 'grey',
                        borderColor: 'grey',
                      }}
                      value={selectedCommunicationType.includes(
                        communicationType.id,
                      )}
                      onValueChange={newValue =>
                        handleCheckBoxToggle(newValue, communicationType.id)
                      }
                    />
                    <Text
                      style={{color: COLOR_LIST.LABEL_TEXT, marginLeft: 10}}>
                      {communicationType.name}
                    </Text>
                  </View>
                ))}
              </View>
              {errors.checkbox1 && (
                <Text style={{color: 'red'}}>{errors.checkbox1}</Text>
              )}
            </View>

            <View style={{flex: 1}}></View>
          </View>

          <View style={[styles.itemMainView, {marginTop: 20}]}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  tintColors={{true: 'red', false: 'grey'}}
                  boxType="square"
                  style={{
                    height: 30,
                    width: 30,
                    color: 'black',
                    borderColor: 'black',
                  }}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
                <Text style={{color: COLOR_LIST.LABEL_TEXT, marginLeft: 10}}>
                  {CONTENT.PROFILE_AGREE_TEXT}
                </Text>
              </View>
              {errors.checkbox && (
                <Text style={{color: 'red'}}>{errors.checkbox}</Text>
              )}
            </View>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <SignInButton
              titleName="UPDATE"
              iconName={check}
              onClick={handleSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    flexDirection: 'row',
    marginHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
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
  errorInputTextTitle: {
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
    backgroundColor: 'white',
    color: 'black',
  },
  selectedTextStyle: {
    color: 'black',
  },
  errorView: {
    flex: 1,
    flexDirection: 'row',
    // height: 50,
    marginTop: 20,
    marginHorizontal: 18,
  },
  errorInputText: {
    color: 'red',
    // marginHorizontal: 12,
  },
});

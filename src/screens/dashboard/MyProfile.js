import React, {useState, useEffect} from 'react';
import {Image} from '@rneui/base';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import BackNavigation from '../../components/backNavigation';
import DocumentPicker from 'react-native-document-picker';
import Bottom from '../../components/Bottom';
import {getUserDetailsApiCall} from '../../redux/slice/getUserDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';

//*Images
import userIcon from '../../assets/headerIcon/userIcon.png';
import plus from '../../assets/headerIcon/userPlusIcon.png';
import editIcon from '../../assets/Edit.png';
import Upload from '../../assets/upload.png';
import Download from '../../assets/download.png';
import {COLOR_LIST} from '../../helpers/colorlist';
import {API_BASE_URL, API_VERSION} from '../../helpers/enum';

const MyProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  //  console.log(userDetailsData,"....");

  //*state
  const [spinner, setSpinner] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const [profile, setProfile] = useState('');

  useEffect(() => {
    onCLickUserDetails();
  }, []);

  useEffect(() => {
    if (userDetailsIsSuccess && userDetailsData) {
      setSpinner(!spinner);
      setProfilePic(userDetailsData.profileUrl);
    }
  }, [userDetailsIsSuccess, userDetailsData]);

  const onCLickUserDetails = async () => {
    // let userId = await AsyncStorage.getItem('userId');
    let email = await AsyncStorage.getItem('emailId');
    let mobileNo = await AsyncStorage.getItem('mobile');

    let sessionKey = await AsyncStorage.getItem('sessionKey');

    let dataObj = {id: userDetailsData.id, sessionKey: sessionKey};
    console.log(dataObj);
    setSpinner(!spinner);
    dispatch(getUserDetailsApiCall(dataObj));
    // console.log(dataObj);
  };

  const pickPicture = async () => {
    Alert.alert(
      'Choose an option',
      'Select how you want to pick a picture',
      [
        {
          text: 'Gallery',
          onPress: () => openImagePicker(),
        },
        {
          text: 'Camera',
          onPress: () => openCamera(),
        },
      ],
      {cancelable: true},
    );
  };

  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      // console.log('image----', image)
      setProfile(image);
      console.log('====================================');
      console.log(image, 'psthdkcn');
      console.log('image----', image);

      sendToBackend(image);
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setProfile(image);
      sendToBackend(image);
    });
  };

  const selectDoc = async () => {
    try {
      // const doc = await DocumentPicker.pick({
      //   type: [DocumentPicker.types.pdf],
      //   allowMultiSelection: true
      // });
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      // console.log(doc)
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
    }
  };

  const sendToBackend = async image => {
    try {
      console.log('Sending profile pic to API', image);
      const formData = new FormData();
      formData.append('Id', userDetailsData.id),
        formData.append('ProfilePicture', {
          uri: image.path,
          type: image.mime, // Adjust the type according to your image format
          name: `${userDetailsData.id}.jpg`, // Adjust the name of the image file
        });

      const accessToken = await AsyncStorage.getItem('accessToken');

      // console.log('===================formData=================');
      console.log({
        profile: image,
        uri: image.path,
        type: image.mime, // Adjust the type according to your image format
        name: `${userDetailsData.id}.jpg`, // Adjust the name of the image file
      });
      // console.log('====================================');

      const response = await fetch(
        `${API_BASE_URL}api/user/update-profile_pic?api-version=${API_VERSION}`,
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + accessToken,
            // Add any additional headers if required
          },
        },
      );
      console.log('=======response=============================');
      console.log('====================================');
      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to upload image');
      }

      setProfilePic(image.path);
      console.log('response', response);

      // Handle successful response
      console.log('Image uploaded successfully');
      // onCLickUserDetails();
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  //for download document  proofDocumentUrl
  // const fileUrl = `${userDetailsData?.proofDocumentUrl}`

  // const checkPermission = async () => {

  //   console.log("download .......");

  //   // Function to check the platform
  //   // If Platform is Android then check for permissions.

  //   if (Platform.OS === 'ios') {
  //     downloadFile();
  //   } else {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'Storage Permission Required',
  //           message:
  //             'Application needs access to your storage to download File',
  //         }
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         // Start downloading
  //         downloadFile();
  //         console.log('Storage Permission Granted.');
  //       } else {
  //         // If permission denied then show alert
  //         Alert.alert('Error','Storage Permission Not Granted');
  //       }
  //     } catch (err) {
  //       // To handle permission related exception
  //       console.log("++++"+err);
  //     }
  //   }
  // };

  // const checkPermission = async () => {

  //   console.log("download .......");

  //   // Function to check the platform
  //   // If Platform is Android then check for permissions.

  //   if (Platform.OS === 'ios') {
  //     downloadFile();
  //   } else {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'Storage Permission Required',
  //           message:
  //             'Application needs access to your storage to download File',
  //         }
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         // Start downloading
  //         downloadFile();
  //         console.log('Storage Permission Granted.');
  //       } else {
  //         // If permission denied then show alert
  //         Alert.alert(
  //           'Error',
  //           'Storage Permission Not Granted',
  //           [
  //             {
  //               text: 'Try Again',
  //               onPress: () => checkPermission(),
  //             },
  //             {
  //               text: 'Cancel',
  //               style: 'cancel',
  //             },
  //           ],
  //           { cancelable: false }
  //         );
  //       }
  //     } catch (err) {
  //       // To handle permission related exception
  //       console.log("++++" + err);
  //     }
  //   }
  // };
  // const checkPermission = async () => {

  //   console.log("download .......");

  //   // Function to check the platform
  //   // If Platform is Android then check for permissions.

  //   if (Platform.OS === 'ios') {
  //     downloadFile();
  //   } else {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'Storage Permission Required',
  //           message:
  //             'Application needs access to your storage to download File',
  //         }
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         // Start downloading
  //         downloadFile();
  //         console.log('Storage Permission Granted.');
  //       } else {
  //         // If permission denied then show alert
  //         Alert.alert(
  //           'Error',
  //           'Storage Permission Not Granted',
  //           [
  //             {
  //               text: 'Try Again',
  //               onPress: () => checkPermission(),
  //             },
  //             {
  //               text: 'Open Settings',
  //               onPress: () => openSettings(),
  //             },
  //             {
  //               text: 'Cancel',
  //               style: 'cancel',
  //             },
  //           ],
  //           { cancelable: false }
  //         );
  //       }
  //     } catch (err) {
  //       // To handle permission related exception
  //       console.log("++++" + err);
  //     }
  //   }
  // };

  const openSettings = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
    }
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = async fileUrl => {
    if (isDownloading || !fileUrl) return;

    setIsDownloading(true);

    try {
      const {config, fs} = RNFetchBlob;
      const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
      const path = fs.dirs.DownloadDir + '/' + fileName;

      const response = await config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: path,
          description: 'Downloading file...',
        },
      }).fetch('GET', fileUrl);

      // Check if the file is successfully downloaded
      if (response.info().status === 200) {
        Alert.alert('Downloaded', `${fileName} downloaded successfully`);
      } else {
        Alert.alert('Error', 'Failed to download the file. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to download the file. Please try again.');
      console.error('Download error:', error); // Detailed error logging
    } finally {
      setIsDownloading(false);
    }
  };
  // const downloadFile = async (fileUrl) => {
  //   if (isDownloading || !userDetailsData?.proofDocumentUrl) return; // Prevent multiple downloads
  //   setIsDownloading(true);

  //   try {
  //     const response = await RNFetchBlob.config({
  //       fileCache: true,
  //       addAndroidDownloads: {
  //         useDownloadManager: true,
  //         notification: true,
  //         path: RNFetchBlob.fs.dirs.DownloadDir + '/' + fileUrl.substring(fileUrl.lastIndexOf('/') + 1),
  //       },
  //     }).fetch('GET', fileUrl);

  //     Alert.alert('Downloaded', `${userDetailsData?.proofDocumentType} downloaded successfully`);
  //   } catch (error) {
  //     Alert.alert('Error', 'Failed to download the file. Please try again.');
  //     console.error(error);
  //   } finally {
  //     setIsDownloading(false);
  //   }
  // };

  // const downloadFile = async (fileUrl) => {
  //   try {
  //     const response = await RNFetchBlob.config({
  //       fileCache: true,
  //       addAndroidDownloads: {
  //         useDownloadManager: true,
  //         notification: true,
  //         path: RNFetchBlob.fs.dirs.DownloadDir + '/' + fileUrl.substring(fileUrl.lastIndexOf('/') + 1),
  //       },
  //     }).fetch('GET', fileUrl);

  //     Alert.alert('Downloaded', `${userDetailsData?.proofDocumentType} downloaded successfully`);
  //   } catch (error) {
  //     Alert.alert('Error', 'Failed to download the file. Please try again.');
  //     console.error(error);
  //   }
  // };

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLOR_LIST.SCREEN_BG}}>
      {/* 
      <Spinner

        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      /> */}

      <BackNavigation
        title={'My Profile'}
        screenName={'dashBoard'}
        isRightIcon={true}
      />
      <View style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <View style={{height: 150, width: 120, alignItems: 'center'}}>
                <View>
                  <View
                    style={{
                      borderRadius: 50,
                      overflow: 'hidden',
                      backgroundColor: 'lightgray',
                    }}>
                    <Image
                      source={
                        profilePic !== ''
                          ? {uri: `${profilePic}?${Date.now()}`}
                          : userIcon
                      }
                      style={[styles.img]}
                    />
                    {/* <Image
  source={profilePic && profilePic.uri ? { uri: profilePic } : userIcon}
  style={styles.img}
/> */}
                    {/* <Image source={profilePic != '' ? { uri: profilePic } : userIcon} style={[styles.img]} /> */}
                  </View>
                  <View
                    style={{
                      marginTop: 75,
                      position: 'absolute',
                      marginLeft: 68,
                    }}>
                    <Image
                      source={plus}
                      onPress={pickPicture}
                      style={{height: 28, width: 28, borderRadius: 50}}
                    />
                  </View>
                </View>

                <View style={{marginTop: 14}}>
                  <Text
                    style={{
                      // marginleft: 151,
                      fontFamily: 'Catamaran-Regular' /* Body */,
                      fontSize: 10,

                      textAlign: 'center',
                      fontWeight: '600',
                      lineHeight: 16,
                      color: '#171A1FFF',
                    }}>
                    Joined Since : {userDetailsData?.addedOn}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 0.1,
                  marginHorizontal: 18,
                }}>
                <Text
                  style={{
                    fontFamily: 'Catamaran-Regular' /* Body */,
                    fontSize: 16,
                    fontWeight: '800',
                    lineHeight: 20,

                    color: '#171A1FFF',
                  }}>
                  Profile Information
                </Text>
              </View>

              <View style={styles.mainView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 1, justifyContent: 'flex-start'}}>
                    <Text
                      style={{
                        fontFamily: 'Catamaran-Regular' /* Body */,
                        fontSize: 14,
                        fontWeight: '400',
                        lineHeight: 22,
                        color: '#171A1FFF',
                      }}>
                      Name
                    </Text>
                  </View>

                  <View style={{flex: 1, justifyContent: 'flex-start'}}>
                    <Text
                      style={{
                        fontFamily: 'Catamaran-Regular' /* Body */,
                        fontSize: 14,
                        fontWeight: '700',
                        lineHeight: 22,
                        color: '#171A1FFF',
                      }}>
                      {userDetailsData?.title +
                        ' ' +
                        userDetailsData?.firstName +
                        ' ' +
                        userDetailsData?.lastName}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.borderView}></View>

              <View style={styles.mainView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 1, justifyContent: 'flex-start'}}>
                    <Text
                      style={{
                        fontFamily: 'Catamaran-Regular' /* Body */,
                        fontSize: 14,
                        fontWeight: '400',
                        lineHeight: 22,
                        color: '#171A1FFF',
                      }}>
                      Mobile
                    </Text>
                  </View>

                  <View style={{flex: 1, justifyContent: 'flex-start'}}>
                    <Text
                      style={{
                        fontFamily: 'Catamaran-Regular' /* Body */,
                        fontSize: 14,
                        fontWeight: '700',
                        lineHeight: 22,
                        color: '#171A1FFF',
                      }}>
                      {`(+27)`}{' '}
                      {userDetailsData?.mobile?.replace(
                        /(\d{3})(\d{3})(\d{4})/,
                        '$1 $2 $3',
                      )}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.borderView}></View>

              <View style={styles.mainView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 1, justifyContent: 'flex-start'}}>
                    <Text
                      style={{
                        fontFamily: 'Catamaran-Regular' /* Body */,
                        fontSize: 14,
                        fontWeight: '400',
                        lineHeight: 22,
                        color: '#171A1FFF',
                      }}>
                      Email
                    </Text>
                  </View>

                  <View style={{flex: 1, justifyContent: 'flex-start'}}>
                    <Text
                      style={{
                        fontFamily: 'Catamaran-Regular' /* Body */,
                        fontSize: 14,
                        fontWeight: '700',
                        lineHeight: 22,
                        color: '#171A1FFF',
                      }}>
                      {userDetailsData?.email}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.borderView}></View>

              <View
                style={{
                  flex: 0.1,
                  marginHorizontal: 18,
                  marginTop: 18,
                }}>
                <Text
                  style={{
                    fontFamily: 'Catamaran-Regular' /* Body */,
                    fontSize: 16,
                    fontWeight: '800',
                    lineHeight: 20,

                    color: '#171A1FFF',
                  }}>
                  Document Uploaded
                </Text>
              </View>

              <View
                style={{
                  flex: 0.2,
                  flexDirection: 'row',
                  marginTop: 12,
                  marginHorizontal: 18,
                  alignItems: 'center',
                }}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      lineHeight: 22,
                      color: '#171A1FFF',
                    }}>
                    {userDetailsData?.proofDocumentType}
                  </Text>
                </View>
                {/* <View style={{ flex: 0.2, alignItems: 'center' }}>
                  <Image
                    source={Download}
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                      height: 36,
                      width: 36,
                    }}
                    resizeMode="contain"
                  />
                </View> */}
                <TouchableOpacity
                  onPress={() => {
                    downloadFile(userDetailsData?.proofDocumentUrl);
                  }}>
                  <View style={{flex: 0.2, alignItems: 'center'}}>
                    <Image
                      source={Download}
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        height: 36,
                        width: 36,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              </View>

              {/* <View style={styles.borderView}></View> */}

              {/* <View
                style={{
                  flexDirection: 'row',
                  marginTop: 23,
                  marginHorizontal: 18,
                }}>
                <View style={{ flex: 1, }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 22,
                    color: '#171A1FFF'
                  }}>Upload new document</Text>
                </View>
                <View style={{ flex: 0.2, alignItems: 'center' }}>
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
            </View>

            <TouchableHighlight
              onPress={() => navigation.navigate('updateProfile')}
              underlayColor="transparent"
              style={{alignItems: 'center'}}>
              <View
                style={{
                  underlayColor: 'transparent',
                  width: 164,
                  height: 52,
                  marginVertical: 25,
                  paddingHorizontal: 10,
                  borderRadius: 25,
                  backgroundColor: '#EC3237FF',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignContent: 'center',
                }}>
                <Image
                  style={{width: 24, height: 24, marginTop: 14}}
                  source={editIcon}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: '#ffff',
                    fontSize: 18,
                    fontWeight: '400',
                    textAlign: 'center',
                    marginTop: 14,
                    // paddingTop: 15,
                    // paddingLeft: 10,
                  }}>
                  EDIT PROFILE
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>

      <View style={{width: '100%', flex: 0.1, justifyContent: 'flex-end'}}>
        <Bottom currentPage={'My Profile'} />
      </View>
    </SafeAreaView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
  },
  mainView: {
    flex: 0.1,
    marginHorizontal: 18,
    justifyContent: 'center',
    marginTop: 20,
  },
  borderView: {
    marginHorizontal: 15,
    height: 0,
    borderWidth: 1,
    marginTop: 20,
    borderColor: '#DEE1E6FF' /* neutral-300 */,
    borderStyle: 'solid',
    transform: [{rotate: '0deg'}],
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

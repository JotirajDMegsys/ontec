import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import UserProfilePopup from './userProfilePopup';

//*icon
import LeftArrow from '../assets/Leftarrow26.png'
import bellIcon from '../assets/bell.png'
import dotsIcon from '../assets/dots.png'
import { useSelector,useDispatch } from 'react-redux';
import { COLOR_LIST } from '../helpers/colorlist';
import { getUserDetailsApiCall, resetGetUserDetailsApiCall } from '../redux/slice/getUserDetails';
import { resetLoginDetails } from '../redux/slice/signIn';
import { refershTokenMethod } from '../screens/auth/refershTokenMethod';
import { resetChangePassword } from '../redux/slice/resetPassword';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { truncateString } from '../helpers/commonFunction';
const BackNavigation = (props) => {
  const dispatch = useDispatch();
  const { refreshToken } = refershTokenMethod(); 

  //*state
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [image, setImage] = useState();

//  redux setup
const {
  userDetailsIsLoading,
  userDetailsData,
  userDetailsIsSuccess,
  userDetailsIsError,
  notificationCount
} = useSelector((state) => ({
  userDetailsIsLoading: state.userDetails.userDetailsIsLoading,
  userDetailsData: state.userDetails.userDetailsData,
  userDetailsIsSuccess: state.userDetails.userDetailsIsSuccess,
  userDetailsIsError: state.userDetails.userDetailsIsError,
  notificationCount:state.notificationList.notificationCount,

}));
// console.log('====================================');
// console.log("userdetails dashboard",userDetailsData);
// console.log('====================================');

const [spinner, setSpinner] = useState(false);
const [profilePic, setProfilePic] = useState(null)

useEffect(() => {
  onCLickUserDetails();
}, []);

useEffect(() => {
  if (userDetailsIsSuccess===true && userDetailsData && userDetailsIsError===false ) {
    setSpinner(!spinner);
    setUserName(truncateString(userDetailsData.userName, 10));
    setMobile(userDetailsData.mobile);
    setEmail(userDetailsData.email);
    setImage(userDetailsData.profileUrl);
  }
  if (userDetailsIsSuccess===false && userDetailsData?.status === null &&  userDetailsData?.name !='' && userDetailsData ){
    // console.log(userDetailsData.errors,"preioypitreupeppurptieypipierpiyptipei");
  

    handleLogout();

  }
  
  if (userDetailsIsError==true && userDetailsData==="You are not authorized" && userDetailsIsSuccess== false  && userDetailsIsLoading ==true ){
    // console.log("eotpriept÷ipreptirppip");
    refreshToken()
  }

}, [userDetailsIsSuccess, userDetailsData,userDetailsIsError]);


const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('emailId');
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    // await AsyncStorage.removeItem('isUserValid');
    await AsyncStorage.removeItem('isProfileCompleted');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('role');
    await AsyncStorage.removeItem('mobile');
    await AsyncStorage.removeItem('sessionKey');

    dispatch(resetGetUserDetailsApiCall())
    dispatch(resetLoginDetails());
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing token:', error);
  }

  setModalVisible(false);
  setTimeout(async() => {
    props.closeModal();
  navigation.navigate('signIn');
}, 500)

}

const onCLickUserDetails = async () => {
  let userId = await AsyncStorage.getItem('userId');
  //  console.log(userId)
  let email = await AsyncStorage.getItem('emailId');
  let mobileNo = await AsyncStorage.getItem('mobile');
  let sessionKey = await AsyncStorage.getItem('sessionKey');

  let dataObj = { "id": userId, "sessionKey": sessionKey}
  setSpinner(!spinner);
  dispatch(getUserDetailsApiCall(dataObj));
  // console.log(dataObj);
}


  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    setTitle(props.title)
  }, []);

  useEffect(() => {
    setBackgroundColor(props.backgroundColor ? props.backgroundColor : '#FFFFFFFF')
  }, []);

  const onClickBackNavigation = () => {

    console.log(props.screenName);
    if(props.value ==='reset'){
      dispatch(resetChangePassword());

    }


    navigation.navigate(props.screenName)
  }

  const onClickNotification = (props) => {
    navigation.navigate('notification')
  }


  return (
    <View style={{  
      flex: 0.08, justifyContent: 'space-between', backgroundColor: COLOR_LIST.NAVIGATION_BG, flexDirection: 'row', alignItems:'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        shadowColor: '#000',
    shadowOffset: { width: 1, height: 30 },
    shadowOpacity:  0.4,
    shadowRadius: 10,
    elevation: 25,
      },
    }), }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft: 5, }}>
        <Pressable onPress={() => {
          onClickBackNavigation();
        }}>
          <Image
            style={{ height: 20, width: 20, marginRight: 5, marginLeft: 5 }}
            source={LeftArrow}></Image>
        </Pressable>

        <Pressable onPress={(onPressFunction) => {
          onClickBackNavigation();
        }}>
          <Text numberOfLines={2} style={{ fontSize: 18, color: '#171A1F', fontWeight: 600, marginLeft: 10 }}>{title}</Text>
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15, }}>
        {
          props.isRightIcon === true &&
          <>
            <Pressable onPress={() => {
              onClickNotification();
            }}>
              <View >
                <Image
                  style={{ height: 24, width: 24, marginRight: 20, marginLeft: 5, }}
                  source={bellIcon}></Image>
              { notificationCount ? ( <Text style={{color:'white',position:'absolute',fontSize:10,marginLeft:17,fontWeight:'800',backgroundColor:'red',paddingHorizontal:5,borderRadius:10}}>{notificationCount>99 ? `99+` :notificationCount }</Text>):null}
              </View>
            </Pressable>
            <Pressable onPress={openModal}>
              <View >
                <Image
                  style={{ height: 20, width: 20, marginRight: 5, marginLeft: 5 }}
                  source={dotsIcon}></Image>
              </View>
            </Pressable>

            {/* user profile popup */}
            <UserProfilePopup
              Visible={modalVisible}
              closeModal={closeModal}
            />
    </>
        }
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: 40,
    alignItems: 'flex-start', // Align to the right side
    marginLeft: 115,
    position: 'absolute'
  },
  overlay: {},
  modalContent: {
    width: 256,
    height: 292,
    backgroundColor: '#FFFFFF', // white
    borderRadius: 2,
    shadowColor: '#171a1f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 9,
    elevation: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10,
    alignSelf: 'flex-end', // Align to the right side
  },
  mainitems: {
    height: 24, width: 24
  }
});
export default BackNavigation;
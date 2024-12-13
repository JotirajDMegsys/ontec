import { Image } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable
} from 'react-native';
import Bell from '../assets/headerIcon/Bell.png';
import ThreeDot from '../assets/headerIcon/Dots.png';
import { useNavigation } from '@react-navigation/native';
import UserProfilePopup from '../components/userProfilePopup';
import WalletPopup from '../components/walletPopup';
import { refershTokenMethod } from '../screens/auth/refershTokenMethod';
import bellIcon from '../assets/bell.png'
import dotsIcon from '../assets/dots.png'
import walletIcon from '../assets/dashboard/walletIcon.png'
import BackNavigation from '../components/backNavigation';
import { COLOR_LIST } from '../helpers/colorlist';
 import InternetAlert from '../components/InternetAlert';
import { getFontSize } from '../helpers/commonFunction';
import { useSelector } from 'react-redux';
import { getNotifications } from '../redux/slice/getnotifications';
import { resetLoginDetails } from '../redux/slice/signIn';
import { getUserDetailsApiCall, resetGetUserDetailsApiCall } from '../redux/slice/getUserDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Header = ({userName,mobile,image,email, walletBalance,notificationCount,propertyValueForTopup,propertyNameForTopup}) => {
const { refreshToken } = refershTokenMethod(); 

    console.log('====================================');
    console.log(propertyValueForTopup,"image......",propertyNameForTopup);
    console.log('====================================');
  const navigation = useNavigation();
  const {
    userDetailsIsLoading,
    userDetailsData,
    userDetailsIsSuccess,
    userDetailsIsError,
  } = useSelector((state) => ({
    userDetailsIsLoading: state.userDetails.userDetailsIsLoading,
    userDetailsData: state.userDetails.userDetailsData,
    userDetailsIsSuccess: state.userDetails.userDetailsIsSuccess,
    userDetailsIsError: state.userDetails.userDetailsIsError,
  
  }));

  const [name, setName] = useState('');
  // console.log(userDetailsData,"00000000=================================================");
  // const [email, setEmail] = useState();
  // const [mobile, setMobile] = useState('');
  // const [image, setImage] = useState('');
  useEffect(() => {
    console.log("---------------------------------------");
    if(userDetailsIsSuccess== true ) 
    if (userDetailsIsSuccess== true && userDetailsData ) {
      // setSpinner(!spinner);
      setName(userDetailsData.userName);
      // setMobile(userDetailsData.mobile);
      // setEmail(userDetailsData.email);
      // setImage(userDetailsData.profileUrl);
    }
    if (userDetailsIsError==true && userDetailsData==="You are not authorized" && userDetailsIsSuccess== false  && userDetailsIsLoading ==true ){
      console.log("eotprieptipreptirppip");
      refreshToken()
    }
    if(userDetailsIsSuccess== true && userDetailsData?.status === null && userDetailsIsLoading ==false ){
         console.log("9999");
         handleLogout();
    
    }
  
    // else if (userDetailsIsError==true && userDetailsIsSuccess== false  && userDetailsIsLoading ==false ){
      
    //   refreshToken()
    // }
  
  }, [userDetailsIsSuccess, userDetailsData,userDetailsIsError]);

  useEffect(() => {
    
    onCLickUserDetails();
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     await AsyncStorage.removeItem('emailId');
  //     await AsyncStorage.removeItem('accessToken');
  //     await AsyncStorage.removeItem('refreshToken');
  //     // await AsyncStorage.removeItem('isUserValid');
  //     await AsyncStorage.removeItem('isProfileCompleted');
  //     await AsyncStorage.removeItem('userId');
  //     await AsyncStorage.removeItem('role');
  //     await AsyncStorage.removeItem('mobile');
  //     await AsyncStorage.removeItem('sessionKey');
  //     console.log('Token cleared successfully');
  //     await AsyncStorage.clear();
  //   } catch (error) {
  //     console.error('Error clearing token:', error);
  //   }

 
  //   // setModalVisible(false);
  //   setTimeout(async() => {
  //     console.log("==================================================");
  //     Toast.show("You are signed out", {
  //       type: "success",
  //       placement: "top",
  //       duration: 2000,
  //       offset: 30,
  //       animationType: "slide-in",
  //   }); 
  //     // props.closeModal();
  //   navigation.push('signIn');
  // }, 400)
  // dispatch(resetLoginDetails());
  // }

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
      // console.log('Token cleared successfully');
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing token:', error);
    }
    
    dispatch(resetLoginDetails());
    // setModalVisible(false);
    setTimeout(async () => {
      // props.closeModal();
    navigation.navigate('signIn');
  }, 3000)
  Toast.show("Your session expired, Please login again!", {
    type: "success",
    placement: "top",
    duration: 3000,
    offset: 30,
    animationType: "slide-in",
}); 
  }

  const onCLickUserDetails = async () => {
    let isProfileComplete = await AsyncStorage.getItem('isProfileComplete');
    
      if(isProfileComplete != 'true'){
        let emailId = await AsyncStorage.getItem('emailId');
      let mobileNo = await AsyncStorage.getItem('mobile');
        navigation.navigate('profile',{'mobile': mobileNo,"emailId": emailId});
        Toast.show("Please complete your profile.", {
            type: "warning",
            placement: "top",
            duration: 3000,
            offset: 30,
            animationType: "slide-in",
        });
    }else{
    let userId = await AsyncStorage.getItem('userId');
    //  console.log(userId)


    let sessionKey = await AsyncStorage.getItem('sessionKey');

  let dataObj = { "id": userId, "sessionKey": sessionKey}
    setSpinner(!spinner);
    dispatch(getUserDetailsApiCall(dataObj));
    // console.log(dataObj);
  }
  }


  const [modalVisible, setModalVisible] = useState(false);
  const [walletModalVisible, setWalletModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const openWalletModal = () => {
    setWalletModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const closeWalletModal = () => {
    setWalletModalVisible(false);
  };

  const onClickNotification = (props) => {
    navigation.navigate('notification')
  }

  return (
    <>
    <View>
      {/* Your content here */}
      <InternetAlert />
    </View>
      <View style={{ marginHorizontal: 20, justifyContent: 'center', marginTop: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'Catamaran-Regular', fontSize: 12, lineHeight: 20, color: '#323743FF' }}>
              Welcome 👋{' '}
            </Text>
            <Text style={{
              margintop: 38,
              fontFamily: 'Catamaran-Regular',
              fontSize: 18,
              lineHeight: 28,
              color: '#323743FF',
            }}>
              {userName}
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
          <View style={styles.walletWrapper}>
            <TouchableOpacity onPress={openWalletModal} style={styles.container}>
              <Image
                source={walletIcon}
                style={styles.icon}
              />
              <Text style={[styles.walletText, {fontSize: getFontSize(walletBalance?.toString(), 12, 0.2)}]}>R {walletBalance}</Text>
            </TouchableOpacity>
          </View>
            <View >
            <Pressable onPress={() => {
              onClickNotification();
            }}>
            <View >
                <Image
                  style={{ height: 24, width: 24, marginRight: 20, marginLeft: 5, }}
                  source={bellIcon}></Image>
                 {notificationCount ? (  <Text style={{color:'white',position:'absolute',fontSize:10,marginLeft:17,fontWeight:'800',backgroundColor:'red',paddingHorizontal:5,borderRadius:10}}>{notificationCount>99 ? `99+` :notificationCount }</Text> ):null}
              </View>
              </Pressable>
              {/* <Image onPress={() => navigation.navigate('notification')} source={bellIcon} style={styles.mainitems} /> */}
            </View>
            <View>
              <TouchableOpacity onPress={openModal}>
                <Image
                  source={dotsIcon}
                  style={{ width: 24, height: 24, marginLeft: 12 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <WalletPopup
          propertyValueForTopup={propertyValueForTopup}
          propertyNameForTopup={propertyNameForTopup}
            //  info={{userName,email,mobile,image}}
            //  userName={userName}
            //  mobile={mobile}
            //  image={image}
            //  email={email}
            Visible={walletModalVisible}
            walletBalance={walletBalance}
            closeModal={closeWalletModal}
          />
          <UserProfilePopup
            //  info={{userName,email,mobile,image}}
            //  userName={userName}
            //  mobile={mobile}
            //  image={image}
            //  email={email}
            Visible={modalVisible}
            closeModal={closeModal}
          />
          {/* <BackNavigation /> */}
          
        </View>
      </View>
    </>
  );
};

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
    height: 325,
    backgroundColor: '#FFFFFF', // white
    borderRadius: 2,
    shadowColor: '#171a1f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 9,
    elevation: 2,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10,
    alignSelf: 'flex-end', // Align to the right side
  },
  mainitems: {
    height: 24, width: 24
  },
  modalListView: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 4,
    alignItems: "center",
    height: 35,
  },
  walletWrapper: {
    backgroundColor: 'green',
    borderRadius: 25,
    marginTop:-3,
    marginRight:20
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  walletText:{
    fontFamily: 'Catamaran-Bold',
    fontWeight: '400',
    color:'#fff'
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
});

export default Header;

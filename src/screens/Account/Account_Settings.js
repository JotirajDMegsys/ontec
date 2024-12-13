import React, {useState,useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import BackNavigation from '../../components/backNavigation';
import ToggleSwitch from 'toggle-switch-react-native';
import Bottom from '../../components/Bottom';
import { COLOR_LIST } from '../../helpers/colorlist';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNotifications } from '../../redux/slice/getnotifications';
import {getAssetSettings, restAssetSettings} from '../../redux/slice/getAssetSetting';
import { Toast } from 'react-native-toast-notifications';
import { getUserDetailsApiCall } from '../../redux/slice/getUserDetails';

const Account_Settings = () => {
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
// console.log("userDetailsData99999999",userDetailsData);
  const {
   
    loading,
    data,
    success,
    error,
  } = useSelector(state => ({
    loading: state.getAssetSetting.loading,
    data: state.getAssetSetting.data,
    success: state.getAssetSetting.success,
    error: state.getAssetSetting.error,
  }));
// console.log(success,"pppppppppppppp");
const getUserDetails = async () => {
  // console.log("oppopppopppopp");
  let userId = await AsyncStorage.getItem('userId');
  // console.log("iiiiiiiiiiiiiiiiiii");

  let sessionKey = await AsyncStorage.getItem('sessionKey');

  let dataObj = { "id": userId, "sessionKey": sessionKey}

  dispatch(getUserDetailsApiCall(dataObj));

};


  useEffect(() => {
  if (data && Object.keys(data).length > 0) {
    if (success && !error) {
      Toast.show(data.title || 'User settings updated successfully!', {
        type: "success",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "slide-in",
      });
      getUserDetails();
      

    } else if (error && !success) {
      const errorMessage = data?.errors?.CurrentUserId || 'Network error! Please try later.';
      Toast.show(errorMessage, {
        type: "danger",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "slide-in",
      });
      getUserDetails();

    }
    dispatch(restAssetSettings());
  }
}, [data, success, error]);

console.log(userDetailsData,"pppppppppppppppppppppp");
  const [isMobileSwitchOn, setIsMobileSwitchOn] = useState(false);
  const [isEmailSwitchOn, setIsEmailSwitchOn] = useState(false);
  useEffect(() => {
    try {
      if (userDetailsData && userDetailsData.communicationTypes) {
        const initialEmailSwitchState = userDetailsData.communicationTypes.some(
          type => type.name === "Email" && type.isActive
        );
  
        const initialMobileSwitchState = userDetailsData.communicationTypes.some(
          type => type.name === "Mobile" && type.isActive
        );
  
        setIsEmailSwitchOn(initialEmailSwitchState);
        setIsMobileSwitchOn(initialMobileSwitchState);
      }
    } catch (error) {
      console.error('Error in useEffect:', error);
    }
  }, [userDetailsData]);
  

  const toggleSize = 40; 

  const handleToggle = (value) => {
    if(value==false && isMobileSwitchOn ==false){
      Toast.show("Atleast one communication type is required", {
        type: "warning",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "slide-in",
      });
      setIsEmailSwitchOn(!value);

    }else{
      setIsEmailSwitchOn(value);
      getuserSetting(value, isMobileSwitchOn);

    }
  };
  
  const handleMobileToggle = (value) => {
    if(isEmailSwitchOn==false && value ==false){
      Toast.show("Atleast one communication type is required", {
        type: "warning",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "slide-in",
      });
      setIsMobileSwitchOn(!value);

    }else{
      setIsMobileSwitchOn(value);
      getuserSetting(isEmailSwitchOn,value);

    }
    // console.log('====', value);
    
  
  };
  console.log(isEmailSwitchOn,isMobileSwitchOn);

  const getuserSetting = async (emailValue, mobileValue) => {
    let userId = await AsyncStorage.getItem('userId');
  
    const dataObj = {
  userId: userId,
  isEmailEnabled: emailValue,
  isMobileEnabled: mobileValue
    };
    console.log("dataobj.....================.",dataObj);
 
      dispatch(getAssetSettings(dataObj));

    
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLOR_LIST.SCREEN_BG,
      }}>
      <BackNavigation title={'Account Settings'}  isRightIcon={true} screenName={"dashBoard"}/>
      <View style={{flex: 1,}}>
        <View
          style={{
            flex: 0.3,
            marginTop: 15,
            backgroundColor: '#FFFFFF',
          }}>
          <View style={{marginHorizontal: 20,marginVertical: 16}}>
            <Text style={styles.textStyle}>General</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 20,
              }}>
              <Text
                style={[
                  styles.textStyle,
                  {fontFamily: 'Catamaran-Regular', fontWeight: '400'},
                ]}>
                Enable Email Notification
              </Text>
              <ToggleSwitch
                isOn={isEmailSwitchOn}
                onColor="red"
                offColor="grey"
                size={toggleSize}
                onToggle={handleToggle}
                
              />
            </View>
            <View
              style={{
                borderWidth: 1, 
                borderColor: '#DEE1E6',
              }}></View>
              <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 20,
              }}>
              <Text
                style={[
                  styles.textStyle,
                  {fontFamily: 'Catamaran-Regular', fontWeight: '400',color:'#171A1F'},
                ]}>
                Enable Mobile Notification
              </Text>
              <ToggleSwitch
                isOn={isMobileSwitchOn}
                onColor="red"
                offColor="grey"
                size={toggleSize}
                onToggle={handleMobileToggle}
              />
            </View>
          </View>
         
        
        </View>
        <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <Bottom />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Catamaran-SemiBold' /* Body */,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 26,
    color: '#565D6D',
  },
});

export default Account_Settings;

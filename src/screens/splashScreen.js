
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BackgroundColor, TextColor } from '../helpers/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

//*images
import topImage from '../assets/ontecSplashImg.png'
import bottomImage from '../assets/splashScreen.png'
import { COMPANY_ID } from '../helpers/enum';
import {useDispatch, useSelector} from 'react-redux';

import { getCompanyDetalisByCompanyId } from '../redux/slice/getCompanyDetalis';
const SplashScreen = (props) => {

  const {
    getCompanyDetalisIsLoading,
    getCompanyDetalisData,
    getCompanyDetalisIsError,
    getCompanyDetalisIsSuccess
  } = useSelector((state) => ({
    getCompanyDetalisIsLoading: state.companyDetalis.getCompanyDetalisIsLoading,
    getCompanyDetalisData: state.companyDetalis.getCompanyDetalisData,
    getCompanyDetalisIsError: state.companyDetalis.getCompanyDetalisIsError,
    getCompanyDetalisIsSuccess: state.companyDetalis.getCompanyDetalisIsSuccess,
  }));
// console.log(getCompanyDetalisData);

  const dispatch = useDispatch();

  useEffect(() => {
    let dataObj = {
      companyId: COMPANY_ID,
    };
    dispatch(getCompanyDetalisByCompanyId(dataObj));
  }, []);

    useEffect(() => {
        onClickAuth();
    }, []);

    const onClickAuth = () => {
        setTimeout(async () => {
            // let getAccessToken = await AsyncStorage.getItem('accessToken');
            // let userId = await AsyncStorage.getItem('userId');
            // if (getAccessToken !== null && userId ) {
            //     props.navigation.navigate('dashBoard');
            // } else {
            //     props.navigation.navigate('signIn');
            // }
                props.navigation.navigate('signIn');

        }, 100)
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'flex-end' }}>
                <Image
                    source={{ uri: getCompanyDetalisData?.companyLogoUrl }}
                    style={{ width: 281, height: 185, alignSelf: 'center', justifyContent: 'center', marginBottom: -10 }}
                    resizeMode="contain"
                />
                <Text style={{ fontSize: 18, color: TextColor }}>{"One app for all utilities..."}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', }}>
                <Image
                    source={bottomImage}
                    style={{ width: 312, height: 350, alignSelf: 'center', justifyContent: 'center' }}
                    resizeMode="contain"
                />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BackgroundColor,
    },
});

export default SplashScreen;
// import {refershToken} from '../../redux/slice/getUserDetails';


// export const refershTokenMethod = async () => {
//   const {
//     userDetailsIsLoading,
//     userDetailsData,
//     userDetailsIsSuccess,
//     userDetailsIsError,
//   } = useSelector((state) => ({
//     userDetailsIsLoading: state.userDetails.userDetailsIsLoading,
//     userDetailsData: state.userDetails.userDetailsData,
//     userDetailsIsSuccess: state.userDetails.userDetailsIsSuccess,
//     userDetailsIsError: state.userDetails.userDetailsIsError,
  
//   }));
//   let refreshToken = await AsyncStorage.getItem('refreshToken');
//   let accessToken = await AsyncStorage.getItem('accessToken');
//   let dataObj = {accessToken: accessToken, refreshToken: refreshToken};
//   dispatch(refershToken(dataObj));
// };
// //

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken as refreshTokenAction } from '../../redux/slice/getUserDetails';

export const refershTokenMethod = () => {
  const dispatch = useDispatch();
  const {
    loading,
    token,
    success,
    error,
  } = useSelector((state) => ({
    loading: state.userDetails.loading,
    token: state.userDetails.token,
    success: state.userDetails.success,
    error: state.userDetails.error,
  }));

 

  useEffect(() => {
    const updateTokens = async () => {
      if (token && token.accessToken && token.refreshToken) {
        await AsyncStorage.setItem('accessToken', token.accessToken);
        await AsyncStorage.setItem('refreshToken', token.refreshToken);
      }
    };

    updateTokens();
  }, [token]);

  const refreshToken = async () => {
    console.log("0t8054t08450t808504y8t058");
    const refresh = await AsyncStorage.getItem('refreshToken');
    const accessToken = await AsyncStorage.getItem('accessToken');
    const dataObj = { accessToken: accessToken, refreshToken: refresh };

    dispatch(refreshTokenAction(dataObj));
  };

  return { refreshToken };
};

// // import { SafeAreaView,View,Text,StyleSheet, Image, ActivityIndicator,BackHandler } from 'react-native'
// // import { DownloadPurchaseButton, SignInButton, UpdateButton } from '../../components/common'
// // // import { useNavigation } from '@react-navigation/native';
// // import { useNavigation, useFocusEffect } from '@react-navigation/native';

// // import dashboardIcon from '../../assets/dashboardIcon.png';
// // import AllTask from '../../assets/completeTask.png';
// // import {useSelector, useDispatch} from 'react-redux';
// // import React, {useState, useEffect} from 'react';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import PopupIcon from '../../assets/popupCheck.png';
// // import {
// //   getTopupDetails
// // } from '../../redux/slice/topupAPI';
// // import { COLOR_LIST } from '../../helpers/colorlist';
// // import { getDownloadPurchace, resetGetDownloadPurchace } from '../../redux/slice/getDownloadPurchace';
// // import RNFetchBlob from 'rn-fetch-blob';
// // import { Toast } from 'react-native-toast-notifications';
// // import { TouchableOpacity } from 'react-native';
// // import Clipboard from '@react-native-clipboard/clipboard';
// //  const Payment = ({route}) => {
// //     const navigation =useNavigation();

// //     const {
// //       topupIsLoading,
// //       topupData,
// //       topupIsSuccess,
// //       topupIsError,
// //       loading,
// //       purchaceData,
// //       success,
// //       error,

// //     } = useSelector(state => ({
// //       topupIsLoading: state.topupRequest.topupIsLoading,
// //       topupData: state.topupRequest.topupData,
// //       topupIsSuccess: state.topupRequest.topupIsSuccess,
// //       topupIsError: state.topupRequest.topupIsError,
// //       loading:state.downloadPurchace.loading,
// //       purchaceData:state.downloadPurchace.purchaceData,
// //     success:state.downloadPurchace.success,
// //     error:state.downloadPurchace.error
// //     }));

// //     console.log(purchaceData,"llllll",success,error);
// //  //for copied clipboard
   

// //     const copyToClipboard = async () => {
// //       try {
// //           if (stsToken) {
// //               // Attempt to copy the token to the clipboard
// //               await Clipboard.setString(stsToken);
// //              console.log(stsToken);
// //               Toast.show('Token copied to clipboard:', {
// //                 type: 'success', 
// //                 placement: 'top', 
// //                 duration: 3000, 
// //                 textStyle: { color: 'black' }, 
// //                 backgroundColor: 'rgba(255, 255, 255, 0.8)', 
// //                 offset: 30, 
// //                 animationType: 'zoom-in', 
// //             });
  
// //           } else {
// //               console.warn('stsToken is not available.');
// //           }
// //       } catch (error) {
// //           console.error('Error copying token to clipboard:', error);
// //       }
// //   };
  


// //     const [isDownloading, setIsDownloading] = useState(false);
// //     const [isDownloaded, setIsDownloaded] = useState(false); 
// //     const [stsToken, setStsToken] = useState("");
// //     const [downloadReceipt, setDownloadReceipt] = useState("DOWNLOAD RECEIPT");


// // console.log(purchaceData,'hidho',topupData,topupData[0].transactionFee);

// //     useEffect(() => {
// //       if (purchaceData && success === true && error===false ) {
// //         console.log(purchaceData,'hidho');
// //         const downloadFile = async () => {
// //           setIsDownloading(true);
// //           setDownloadReceipt("Downloading...");

// //           const fileUrl = purchaceData; 
    
// //           try {
// //             const response = await RNFetchBlob.config({
// //               fileCache: true,
// //               addAndroidDownloads: {
// //                 useDownloadManager: true,
// //                 notification: true,
// //                 path: RNFetchBlob.fs.dirs.DownloadDir + '/' + fileUrl.substring(fileUrl.lastIndexOf('/') + 1),
// //                 description: 'File downloaded by download manager.',
// //               },
// //             }).fetch('GET', fileUrl);
// //             // setIsDownloaded(true); 
    
// //                console.log("Hioooo");
    
// //             Toast.show("Purchase receipt sent successfully!", {
// //               type: 'success',
// //               placement: 'top',
// //               duration: 3000,
// //               offset: 30,
// //               animationType: 'zoom-in',
// //             });
           
    
            
// //           } catch (error) {
// //             Toast.show('Failed to download the file.', {
// //               type: 'danger',
// //               placement: 'top',
// //               duration: 3000,
// //               offset: 30,
// //               animationType: 'zoom-in',
// //             });
// //             // Alert.alert('Error', 'Failed to download the file. Please try again.');
// //             console.error(error);
// //           } finally {
// //             setIsDownloading(false);
// //             dispatch(resetGetDownloadPurchace());
// //             setDownloadReceipt("DOWNLOAD RECEIPT");

// //           }
// //         };
    
// //         downloadFile();
// //       }
// //     }, [purchaceData, success,error]);
    
// //     const dispatch = useDispatch();
// //     const [topupFlag, setTopupFlag] = useState('loading');

// //     useEffect(() => {
// //       // getTopupStatus();
// //       if(topupData?.length > 0){
// //         if(topupData[0].topupStatus === "VendSuccess"){
// //           setTopupFlag("success");
// //           if(topupData[0]?.stdToken){
// //             setStsToken(topupData[0]?.stdToken);
// //             console.log(topupData[0]?.stdToken,"topupData[0]?.stdToken)topupData[0]?.stdToken)topupData[0]?.stdToken)topupData[0]?.stdToken)");
// //           }
// //           return;
// //         }else{
// //           getTopupStatus();
// //         }
// //       }
// //       else{
// //         getTopupStatus();
// //       }
// //     }, [topupData]);

// //     const getTopupStatus =async ()=>{
      
// //       let userId = await AsyncStorage.getItem('userId');
// //       let dataObj = {
// //         transactionId: route.params.topup_id,
// //         userId: userId
// //       };
// //       console.log("====================KKKK=");
// //       console.log(dataObj);
// //       dispatch(getTopupDetails(dataObj));
// //   }
// //   useEffect(() => {
// //     const onBackPress = () => {
// //       navigation.navigate('dashBoard');
// //       return true; 
// //     };

// //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

// //     return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
// //   }, [navigation]);


    
// //   const BackToDashboard =()=>{
// //         navigation.navigate('dashBoard');

// //     }
// //     const DownloadPurchaseStatement =()=>{
// //       // if (!isDownloading) {
// //         // setIsDownloaded(false); // Reset the download state if needed
// //         // You can add any additional logic you want to run when the button is pressed
     
// //       console.log("HIIIIII");
// //       let dataObj = {
// //         transactionId: route.params.topup_id,
// //         // userId: userId
// //       };
// //       console.log("====================KKKK=");
// //       setDownloadReceipt("Downloading...");

// //       console.log(dataObj);
// //       dispatch(getDownloadPurchace(dataObj));
    
// //   }
// //   return (
// //     <SafeAreaView
// //     style={{
// //       flex: 1,
// //       backgroundColor: '#FFFFFFFF',
// //     }}>
// //         <View style={{flex:1}}>
// //             <View style={{flex:0.3,backgroundColor:'#1DD75B',alignItems:'center',justifyContent:'center'}}>
// //                 <Image source={AllTask}  height={40} width={40} />
// //                 <Text style={styles.topText}>Payment Successful</Text>
// //             </View>
// //             <View style={{alignItems:'center',flex:0.08,marginTop:15,alignContent:'center'}}>
// //                 <Text style={styles.noteTextStyle}>Your payment has been done sccessfully.</Text>
// //                 <Text style={styles.textStyle}> Please check details below.</Text>                
// //          </View> 
// //          <View style={{flex:0.47,marginHorizontal:24,marginTop:5}}>  
// //          <View style={{marginHorizontal:16}}>  
// //          <View style={styles.mainText}>
// //                   <Text
// //                     style={[styles.textStyle,{color:'#9095A1'}]}>
// //                      Meter Number :
// //                   </Text>

// //                   <Text
// //                     style={styles.textStyle}>{topupData[0].meterNumber}</Text>
// //                 </View> 
             
                
// //                 <View
// //                 style={styles.mainText}>
// //                   <Text
// //                     style={[styles.textStyle,{color:'#9095A1'}]}>
// //                     Time :
// //                   </Text>

// //                   <Text
// //                     style={styles.textStyle}>
// //                     {topupData[0].modifiedAt}
// //                   </Text>
// //                 </View>
// //                 <View
// //                   style={styles.mainText}>
// //                   <Text
// //                     style={[styles.textStyle,{color:'#9095A1'}]}>
// //                     Transaction ID :
// //                   </Text>

// //                   <Text
// //                     style={styles.textStyle}>
// //                     {route.params.topup_id}
// //                   </Text>
// //                 </View>
// //                 <View style={styles.mainText}>
// //                   <Text
// //                     style={[styles.textStyle,{color:'#9095A1'}]}>
// //                     Amount :
// //                   </Text>

// //                   <Text
// //                     style={styles.textStyle}>
// //                     R {route.params.amount}
// //                   </Text>
// //                 </View>
// //                 <View style={styles.mainText}>
// //                   <Text
// //                     style={[styles.textStyle,{color:'#9095A1'}]}>
// //                     Transaction Fee :
// //                   </Text>

// //                   <Text
// //                     style={styles.textStyle}>R {topupData[0].transactionFee}</Text>
// //                 </View>
// //                 <View style={styles.mainText}>
// //                   <Text
// //                     style={[styles.textStyle,{color:'#9095A1'}]}>
// //                     Recharge Amount :
// //                   </Text>

// //                   <Text
// //                     style={styles.textStyle}>R {topupData[0].rechargeAmount}</Text>
// //                 </View>
              
// //                 <View
// //               style={{
// //                 borderWidth: 1, 
// //                 borderColor: '#DEE1E6',
// //                 marginVertical:7
// //               }}></View>
// //               {
// //                 topupFlag === 'loading' ? 
// //                 (<View style={styles.container}>
// //                   {/* Loader taking 20% width */}
// //                   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '20%' }}>
// //                     <ActivityIndicator size="large" color="#000" style={styles.loader} />
// //                   </View>
                  
// //                   {/* Text views taking rest of the width */}
// //                   <View style={{ flex: 4 }}>
// //                     <Text style={[styles.topText, { color: '#9095A1' }]}>Please wait...</Text>
// //                     <Text style={styles.noteTextStyle}>We are processing your recharge.</Text>
// //                     <Text style={styles.textStyle}>(We will notify you once recharge is done!)</Text>
// //                   </View>
// //                 </View>) : 
// //                 topupFlag === 'success'  ? 
// //                 (
// //                 <>
// //                 <View style={styles.container}>
// //                   {/* Loader taking 20% width */}
// //                   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', width: '25%',marginRight:10 }}>
// //                   <Image
// //                       source={PopupIcon}
// //                       style={{width: '100%', height: 50}}
// //                     />
// //                   </View>
                  
// //                   {/* Text views taking rest of the width */}
// //                   <View style={{ flex: 5, }}>
// //                     <Text style={[styles.topText, { color: COLOR_LIST.SUCCESS }]}>Ta-da!</Text>
// //                     <Text style={styles.noteTextStyle}>Recharge Completed Successfully.</Text>
// //                     <Text style={styles.textStyle}>Your account balance has been updated.</Text>
// //                   </View>
// //                 </View>
               
            
// //               {
// //                 stsToken ? (
// // <View>
// //   <Text style={[, { color: COLOR_LIST.SUCCESS, textAlign: 'center', marginTop:10, fontSize: 14, 
// //         fontWeight:'600', 
// //         lineHeight:14,  }]}>Credit Token</Text>

// //                   <View style={{ flexDirection: 'row', alignSelf: 'center',marginLeft:10 }}>
                 
// //                   <Text style={[styles.topText, { color: COLOR_LIST.SUCCESS, fontSize: 18,textAlign:'center',marginLeft:20,  marginTop:10, lineHeight:22, }]}>
                 
// //                   {stsToken.match(/.{1,4}/g).join(' ')}
// //                   </Text>
                  
// //                   <TouchableOpacity style={{marginTop:0}} onPress={copyToClipboard}>
// //                     <Image
// //                       source={require('../../assets/topup/copyImage.png')}
// //                       style={{ width:36, height:36,  }}
// //                     />
// //                   </TouchableOpacity>
// //                 </View>
// //                 </View>
// //                 ) : null
// //               } 
// //               </>
// //                 ) 
                
// //                 : (<View style={styles.container}>
// //                   {/* Loader taking 20% width */}
// //                   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '20%' }}>
// //                     <ActivityIndicator size="large" color="#000" style={styles.loader} />
// //                   </View>
                  
// //                   {/* Text views taking rest of the width */}
// //                   <View style={{ flex: 4 }}>
// //                     <Text style={[styles.topText, { color: '#9095A1' }]}>Oop!</Text>
// //                     <Text style={styles.noteTextStyle}>Unable to process your recharge.</Text>
// //                     <Text style={styles.textStyle}>(You paid amount is parked in your wallet!)</Text>
// //                   </View>
// //                 </View>)
// //  }
// //         </View>   

// //          </View>
      
// //          <View style={{flex:0.1, alignItems: 'center',marginTop:150}}>
// //          { topupFlag === 'success' ?(
// //          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
// //       <TouchableOpacity onPress={DownloadPurchaseStatement}>
// //         <Text style={{ fontSize: 12, color: 'blue', textDecorationLine: 'underline' }}>
// //         {downloadReceipt}
// //         </Text>
// //       </TouchableOpacity>
    
// //           </View>
// //         ):null}
// //               <DownloadPurchaseButton
// //               titleName="BACK TO DASHBOARD"
// //               iconName={dashboardIcon}
// //               onClick={BackToDashboard}
// //             />
            
             
// //           </View>

// //         </View>
       
// //     {/* <BackNavigation title={'Account Settings'} isRightIcon={true} /> */}
// //     </SafeAreaView>

// //   )
// // }
// // export default Payment

// // const styles = StyleSheet.create({
// //   container: {
// //     flexDirection: 'row', // Arrange items horizontally
// //     alignItems: 'center', // Center items vertically
// //     // paddingHorizontal: 5,
// //      // Add horizontal padding
// //   },
// //   noteTextStyle: {
// //     fontFamily: 'Catamaran-SemiBold' /* Body */,
// //     fontSize: 14,
// //     fontWeight: '400',
// //     lineHeight:22, 
// //    color: '#171A1F',
// //   },  
// //   textStyle: {
// //       fontSize: 12,
// //       fontWeight: '400',
// //       lineHeight:22, 
// //      color: '#171A1F',
// //     },
// //     mainText:{
    
// //             flexDirection: 'row',
// //              marginVertical: 9,
// //             justifyContent: 'space-between',
        
// //     },
// //     topText:{
// //         fontFamily:'Catamaran-Bold',
// //         fontSize: 24, 
// //         fontWeight:'400', 
// //         lineHeight: 36, 
// //         color: 'rgba(255,255,255,1)',
// //         marginTop:20
// //     }
// //   });
  



// import { SafeAreaView,View,Text,StyleSheet, Image, ActivityIndicator,BackHandler } from 'react-native'
// import { DownloadPurchaseButton, SignInButton, UpdateButton } from '../../components/common'
// // import { useNavigation } from '@react-navigation/native';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';

// import dashboardIcon from '../../assets/dashboardIcon.png';
// import AllTask from '../../assets/completeTask.png';
// import {useSelector, useDispatch} from 'react-redux';
// import React, {useState, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import PopupIcon from '../../assets/popupCheck.png';
// import {
//   getTopupDetails,
//   resetToupDetails,
//   resetToupRequest
// } from '../../redux/slice/topupAPI';
// import { COLOR_LIST } from '../../helpers/colorlist';
// import { getDownloadPurchace, resetGetDownloadPurchace } from '../../redux/slice/getDownloadPurchace';
// import RNFetchBlob from 'rn-fetch-blob';
// import { Toast } from 'react-native-toast-notifications';
// import { TouchableOpacity } from 'react-native';
// import Clipboard from '@react-native-clipboard/clipboard';
// import { getWalletData } from '../../redux/slice/getUserDetails';
//  const Payment = ({route}) => {
//     const navigation =useNavigation();

//     const {
//       topupIsLoading,
//       topupData,
//       topupIsSuccess,
//       topupIsError,
//       loading,
//       purchaceData,
//       success,
//       error,

//     } = useSelector(state => ({
//       topupIsLoading: state.topupRequest.topupIsLoading,
//       topupData: state.topupRequest.topupData,
//       topupIsSuccess: state.topupRequest.topupIsSuccess,
//       topupIsError: state.topupRequest.topupIsError,
//       loading:state.downloadPurchace.loading,
//       purchaceData:state.downloadPurchace.purchaceData,
//     success:state.downloadPurchace.success,
//     error:state.downloadPurchace.error
//     }));

//     console.log(purchaceData,"llllll",success,error);
//  //for copied clipboard
   

//     const copyToClipboard = async () => {
//       try {
//           if (stsToken) {
//               // Attempt to copy the token to the clipboard
//               await Clipboard.setString(stsToken);
//              console.log(stsToken);
//               Toast.show('Token copied to clipboard:', {
//                 type: 'success', 
//                 placement: 'top', 
//                 duration: 3000, 
//                 textStyle: { color: 'black' }, 
//                 backgroundColor: 'rgba(255, 255, 255, 0.8)', 
//                 offset: 30, 
//                 animationType: 'zoom-in', 
//             });
  
//           } else {
//               console.warn('stsToken is not available.');
//           }
//       } catch (error) {
//           console.error('Error copying token to clipboard:', error);
//       }
//   };
  


//     const [isDownloading, setIsDownloading] = useState(false);
//     const [isDownloaded, setIsDownloaded] = useState(false); 
//     const [stsToken, setStsToken] = useState("");
//     const [downloadReceipt, setDownloadReceipt] = useState("DOWNLOAD RECEIPT");


// // console.log(purchaceData,'hidho',topupData,topupData[0].transactionFee);

//     useEffect(() => {
//       if (purchaceData && success === true && error===false ) {
//         console.log(purchaceData,'hidho');
//         const downloadFile = async () => {
//           setIsDownloading(true);
//           setDownloadReceipt("Downloading...");

//           const fileUrl = purchaceData; 
    
//           try {
//             const response = await RNFetchBlob.config({
//               fileCache: true,
//               addAndroidDownloads: {
//                 useDownloadManager: true,
//                 notification: true,
//                 path: RNFetchBlob.fs.dirs.DownloadDir + '/' + fileUrl.substring(fileUrl.lastIndexOf('/') + 1),
//                 description: 'File downloaded by download manager.',
//               },
//             }).fetch('GET', fileUrl);
//             // setIsDownloaded(true); 
    
//                console.log("Hioooo");
    
//             Toast.show("Purchase receipt sent successfully!", {
//               type: 'success',
//               placement: 'top',
//               duration: 3000,
//               offset: 30,
//               animationType: 'zoom-in',
//             });
           
    
            
//           } catch (error) {
//             Toast.show('Failed to download the file.', {
//               type: 'danger',
//               placement: 'top',
//               duration: 3000,
//               offset: 30,
//               animationType: 'zoom-in',
//             });
//             // Alert.alert('Error', 'Failed to download the file. Please try again.');
//             console.error(error);
//           } finally {
//             setIsDownloading(false);
//             dispatch(resetGetDownloadPurchace());
//             setDownloadReceipt("DOWNLOAD RECEIPT");

//           }
//         };
    
//         downloadFile();
//       }
//     }, [purchaceData, success,error]);
    
//     const dispatch = useDispatch();
//     const [topupFlag, setTopupFlag] = useState('loading');


// console.log(topupData,"topupData");


//     // useFocusEffect(() => {
//     //   dispatch(resetToupRequest());
//     // }, []);
//     useEffect(() => {
//       setStsToken('');
//       setTopupFlag("loading");
//       // getTopupStatus();
//       if(topupData?.length > 0){
//         if(topupData[0].topupStatus === "VendSuccess"){
//           setTopupFlag("success");
//           if(topupData[0]?.stdToken && topupData?.stdToken !=''){
//             setStsToken(topupData[0]?.stdToken);
//             console.log(topupData[0]?.stdToken,"topupData[0]?.stdToken)topupData[0]?.stdToken)topupData[0]?.stdToken)topupData[0]?.stdToken)");
//           }
//           // dispatch(resetToupRequest());
          
//           return;
//         }else{
//           setTopupFlag("failed");
//         }
//       }
//       else{
//         getTopupStatus();
//         // dispatch(resetToupRequest());

//       }
//     }, [topupData]);
//     // useEffect(() => {
//     //   // getTopupStatus();
//     //   console.log(topupData);
//     //   if(topupData?.length > 0){
//     //     if(topupData[0].topupStatus === "VendSuccess"){
//     //       setTopupFlag("success");
//     //       if(topupData[0]?.stdToken){
//     //         setStsToken(topupData[0]?.stdToken);
//     //         console.log(topupData[0]?.stdToken,"topupData[0]?.stdToken)topupData[0]?.stdToken)topupData[0]?.stdToken)topupData[0]?.stdToken)");
//     //       }
//     //       return;
//     //     }else{
//     //       getTopupStatus();
//     //     }
//     //   }
//     //   else{
//     //     getTopupStatus();
//     //   }
//     // }, [topupData]);
    

//     const getTopupStatus =async ()=>{
//       setStsToken("");
//       let userId = await AsyncStorage.getItem('userId');
//       let dataObj = {
//         transactionId: route.params.topup_id,
//         userId: userId
//       };
//       console.log("====================KKKK=");
//       console.log(dataObj);
      
//       dispatch(getTopupDetails(dataObj));
//   }

//   useEffect(() => {
//     dispatch(resetToupDetails());
//     getWalletDetails();
//   }, [dispatch]);

//   const getWalletDetails = async () => {
//     let userId = await AsyncStorage.getItem('userId');
//     let dataObj = { "userId": userId }
//     dispatch(getWalletData(dataObj));
//   }

//   useEffect(() => {
//     const onBackPress = () => {
//       navigation.navigate('dashBoard');
//       return true; // Prevent default behavior (exit the app)
//     };

//     BackHandler.addEventListener('hardwareBackPress', onBackPress);

//     return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//   }, [navigation]);


    
//   const BackToDashboard =()=>{
//     dispatch(resetToupDetails());

//         navigation.navigate('dashBoard');

//     }
//     const DownloadPurchaseStatement =()=>{
//       // if (!isDownloading) {
//         // setIsDownloaded(false); // Reset the download state if needed
//         // You can add any additional logic you want to run when the button is pressed
     
//       console.log("HIIIIII");
//       let dataObj = {
//         transactionId: route.params.topup_id,
//         // userId: userId
//       };
//       console.log("====================KKKK=");
//       setDownloadReceipt("Downloading...");

//       console.log(dataObj);
//       dispatch(getDownloadPurchace(dataObj));
    
//   }
//   return (
//     <SafeAreaView
//     style={{
//       flex: 1,
//       backgroundColor: '#FFFFFFFF',
//     }}>
//         <View style={{flex:1}}>
//             <View style={{flex:0.3,backgroundColor:'#1DD75B',alignItems:'center',justifyContent:'center'}}>
//                 <Image source={AllTask}  height={40} width={40} />
//                 <Text style={styles.topText}>Payment Successful</Text>
//             </View>
//             <View style={{alignItems:'center',flex:0.08,marginTop:15,alignContent:'center'}}>
//                 <Text style={styles.noteTextStyle}>Your payment has been done sccessfully.</Text>
//                 <Text style={styles.textStyle}> Please check details below.</Text>                
//          </View> 
//          <View style={{flex:0.47,marginHorizontal:24,marginTop:5}}>  
//          <View style={{marginHorizontal:16}}>  
//          <View style={styles.mainText}>
//                   <Text
//                     style={[styles.textStyle,{color:'#9095A1'}]}>
//                      Meter Number :
//                   </Text>

//                   <Text
//                     style={styles.textStyle}>{route.params.meterNumber}</Text>
//                 </View> 
             
                
//                 <View
//                 style={styles.mainText}>
//                   <Text
//                     style={[styles.textStyle,{color:'#9095A1'}]}>
//                     Time :
//                   </Text>

//                   <Text
//                     style={styles.textStyle}>
//                     {route.params.date}
                   
//                   </Text>
//                 </View>
//                 <View
//                   style={styles.mainText}>
//                   <Text
//                     style={[styles.textStyle,{color:'#9095A1'}]}>
//                     Transaction ID :
//                   </Text>

//                   <Text
//                     style={styles.textStyle}>
//                     {route.params.topup_id}
//                   </Text>
//                 </View>
//                 <View style={styles.mainText}>
//                   <Text
//                     style={[styles.textStyle,{color:'#9095A1'}]}>
//                     Amount :
//                   </Text>

//                   <Text
//                     style={styles.textStyle}>
//                     R {route.params.amount}
//                   </Text>
//                 </View>
//                 <View style={styles.mainText}>
//                   <Text
//                     style={[styles.textStyle,{color:'#9095A1'}]}>
//                     Transaction Fee :
//                   </Text>

//                   <Text
//                     style={styles.textStyle}>R {route.params.transactionFee}</Text>
//                 </View>
//                  {/* {
//                 //   // <View style={styles.mainText}>
//                 // //   <Text
//                 // //     style={[styles.textStyle,{color:'#9095A1'}]}> Recharge Amount :
//                 // //   </Text>

//                 // //   <Text
//                 // //     style={styles.textStyle}>R {topupData[0].rechargeAmount}</Text>
//                 // // </View>
//                 // } */}
              
//                 <View
//               style={{
//                 borderWidth: 1, 
//                 borderColor: '#DEE1E6',
//                 marginVertical:7
//               }}></View>
//               {
//                 topupFlag === 'loading' ? 
//                 (<View style={styles.container}>
//                   {/* Loader taking 20% width */}
//                   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '20%' }}>
//                     <ActivityIndicator size="large" color="#000" style={styles.loader} />
//                   </View>
                  
//                   {/* Text views taking rest of the width */}
//                   <View style={{ flex: 4 }}>
//                     <Text style={[styles.topText, { color: '#9095A1' }]}>Please wait...</Text>
//                     <Text style={styles.noteTextStyle}>We are processing your recharge.</Text>
//                     <Text style={styles.textStyle}>(We will notify you once recharge is done!)</Text>
//                   </View>
//                 </View>) : 
//                 topupFlag === 'success'  ? 
//                 (
//                 <>
//                 <View style={styles.container}>
//                   {/* Loader taking 20% width */}
//                   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', width: '25%',marginRight:10 }}>
//                   <Image
//                       source={PopupIcon}
//                       style={{width: '100%', height: 50}}
//                     />
//                   </View>
                  
//                   {/* Text views taking rest of the width */}
//                   <View style={{ flex: 5, }}>
//                     <Text style={[styles.topText, { color: COLOR_LIST.SUCCESS }]}>Ta-da!</Text>
//                     <Text style={styles.noteTextStyle}>Recharge Completed Successfully.</Text>
//                     <Text style={styles.textStyle}>Your account balance has been updated.</Text>
//                   </View>
//                 </View>
               
            
//               {
//                 stsToken ? (
// <View>
//   <Text style={[, { color: COLOR_LIST.SUCCESS, textAlign: 'center', marginTop:10, fontSize: 14, 
//         fontWeight:'600', 
//         lineHeight:14,  }]}>Credit Token</Text>

//                   <View style={{ flexDirection: 'row', alignSelf: 'center',marginLeft:10 }}>
                 
//                   <Text style={[styles.topText, { color: COLOR_LIST.SUCCESS, fontSize: 18,textAlign:'center',marginLeft:20,  marginTop:10, lineHeight:22, }]}>
                 
//                   {stsToken.match(/.{1,4}/g).join(' ')}
//                   </Text>
                  
//                   <TouchableOpacity style={{marginTop:0}} onPress={copyToClipboard}>
//                     <Image
//                       source={require('../../assets/topup/copyImage.png')}
//                       style={{ width:36, height:36,  }}
//                     />
//                   </TouchableOpacity>
//                 </View>
//                 </View>
//                 ) : null
//               } 
//               </>
//                 ) 
                
//                 : (<View style={styles.container}>
//                   {/* Loader taking 20% width */}
//                   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '20%' }}>
//                     <ActivityIndicator size="large" color="#000" style={styles.loader} />
//                   </View>
                  
//                   {/* Text views taking rest of the width */}
//                   <View style={{ flex: 4 }}>
//                     <Text style={[styles.topText, { color: '#9095A1' }]}>Oop!</Text>
//                     <Text style={styles.noteTextStyle}>Unable to process your recharge.</Text>
//                     <Text style={styles.textStyle}>(You paid amount is parked in your wallet!)</Text>
//                   </View>
//                 </View>)
//  }
//         </View>   

//          </View>
      
//          <View style={{flex:0.1, alignItems: 'center',marginTop:150}}>
//          { topupFlag === 'success' ?(
//          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
//       <TouchableOpacity onPress={DownloadPurchaseStatement}>
//         <Text style={{ fontSize: 12, color: 'blue', textDecorationLine: 'underline' }}>
//         {downloadReceipt}
//         </Text>
//       </TouchableOpacity>
    
//           </View>
//         ):null}
//               <DownloadPurchaseButton
//               titleName="BACK TO DASHBOARD"
//               iconName={dashboardIcon}
//               onClick={BackToDashboard}
//             />
            
             
//           </View>

//         </View>
       
//     {/* <BackNavigation title={'Account Settings'} isRightIcon={true} /> */}
//     </SafeAreaView>

//   )
// }
// export default Payment

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row', // Arrange items horizontally
//     alignItems: 'center', // Center items vertically
//     // paddingHorizontal: 5,
//      // Add horizontal padding
//   },
//   noteTextStyle: {
//     fontFamily: 'Catamaran-SemiBold' /* Body */,
//     fontSize: 14,
//     fontWeight: '400',
//     lineHeight:22, 
//    color: '#171A1F',
//   },  
//   textStyle: {
//       fontSize: 12,
//       fontWeight: '400',
//       lineHeight:22, 
//      color: '#171A1F',
//     },
//     mainText:{
    
//             flexDirection: 'row',
//              marginVertical: 9,
//             justifyContent: 'space-between',
        
//     },
//     topText:{
//         fontFamily:'Catamaran-Bold',
//         fontSize: 24, 
//         fontWeight:'400', 
//         lineHeight: 36, 
//         color: 'rgba(255,255,255,1)',
//         marginTop:20
//     }
//   });
  




import { SafeAreaView,View,Text,StyleSheet, Image, ActivityIndicator,BackHandler, ScrollView } from 'react-native'
import { DownloadPurchaseButton, SignInButton, UpdateButton } from '../../components/common'
// import { useNavigation } from '@react-navigation/native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import dashboardIcon from '../../assets/dashboardIcon.png';
import AllTask from '../../assets/completeTask.png';
import {useSelector, useDispatch} from 'react-redux';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopupIcon from '../../assets/popupCheck.png';
import announcement from '../../assets/announcement.png';
import tag from '../../assets/shopping.png';


import {
  getTopupDetails,
  resetToupDetails,
  resetToupRequest
} from '../../redux/slice/topupAPI';
import { COLOR_LIST } from '../../helpers/colorlist';
import { getDownloadPurchace, resetGetDownloadPurchace } from '../../redux/slice/getDownloadPurchace';
import RNFetchBlob from 'rn-fetch-blob';
import { Toast } from 'react-native-toast-notifications';
import { TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { getWalletData } from '../../redux/slice/getUserDetails';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
 const Payment = ({route}) => {
    const navigation =useNavigation();

    const {
      topupIsLoading,
      topupData,
      topupIsSuccess,
      topupIsError,
      loading,
      purchaceData,
      success,
      error,

    } = useSelector(state => ({
      topupIsLoading: state.topupRequest.topupIsLoading,
      topupData: state.topupRequest.topupData,
      topupIsSuccess: state.topupRequest.topupIsSuccess,
      topupIsError: state.topupRequest.topupIsError,
      loading:state.downloadPurchace.loading,
      purchaceData:state.downloadPurchace.purchaceData,
    success:state.downloadPurchace.success,
    error:state.downloadPurchace.error
    }));

    // console.log(purchaceData,"llllll",success,error);
 //for copied clipboard
   

    const copyToClipboard = async(token) => {
      try {
              // Attempt to copy the token to the clipboard
              await Clipboard.setString(token);
             console.log(token,"oprrpgprpgp");
              Toast.show('Token copied to clipboard:', {
                type: 'success', 
                placement: 'top', 
                duration: 1000, 
                textStyle: { color: 'black' }, 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                offset: 30, 
                animationType: 'zoom-in', 
            });
  
        
      } catch (error) {
          console.error('Error copying token to clipboard:', error);
      }
  };
  


    const [isDownloading, setIsDownloading] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false); 
    const [stsToken, setStsToken] = useState("");
    const [keyChangeToken, setKeyChangeToken] = useState("");
    const [BssToken, setBssToken] = useState("");

    const [downloadReceipt, setDownloadReceipt] = useState("DOWNLOAD RECEIPT");


// console.log(purchaceData,'hidho',topupData,topupData[0].transactionFee);

    useEffect(() => {
      if (purchaceData && success === true && error===false ) {
        // console.log(purchaceData,'hidho');
        const downloadFile = async () => {
          setIsDownloading(true);
          setDownloadReceipt("Downloading...");

          const fileUrl = purchaceData; 
    
          try {
            const response = await RNFetchBlob.config({
              fileCache: true,
              addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: RNFetchBlob.fs.dirs.DownloadDir + '/' + fileUrl.substring(fileUrl.lastIndexOf('/') + 1),
                description: 'File downloaded by download manager.',
              },
            }).fetch('GET', fileUrl);
            // setIsDownloaded(true); 
    
              //  console.log("Hioooo");
    
            Toast.show("Purchase receipt sent successfully!", {
              type: 'success',
              placement: 'top',
              duration: 3000,
              offset: 30,
              animationType: 'zoom-in',
            });
           
    
            
          } catch (error) {
            Toast.show('Failed to download the file.', {
              type: 'danger',
              placement: 'top',
              duration: 3000,
              offset: 30,
              animationType: 'zoom-in',
            });
            // Alert.alert('Error', 'Failed to download the file. Please try again.');
            console.error(error);
          } finally {
            setIsDownloading(false);
            dispatch(resetGetDownloadPurchace());
            setDownloadReceipt("DOWNLOAD RECEIPT");

          }
        };
    
        downloadFile();
      }
    }, [purchaceData, success,error]);
    
    const dispatch = useDispatch();
    const [topupFlag, setTopupFlag] = useState('loading');
    const [customerMsg, setcustomerMsg] = useState('');
    const [mrktMsg, setmrktMsg] = useState('');


// console.log(topupData,"topupData");


    // useFocusEffect(() => {
    //   dispatch(resetToupRequest());
    // }, []);
    useEffect(() => {
      setStsToken('');
      setKeyChangeToken('');
    setBssToken('');
    setcustomerMsg('');
        setmrktMsg("")

      getTopupStatus();
      if(topupData?.length > 0){
        if(topupData[0].topupStatus === "VendSuccess"){
          setTopupFlag("success");
          // setStsToken("1235678901123456");
          // setKeyChangeToken("820812080247032")
          // setBssToken('12343553636373733')
          if(topupData[0]?.stdToken && topupData?.stdToken !=''){
            setStsToken(topupData[0]?.stdToken);
            setcustomerMsg(topupData[0]?.customerMsg);
            setmrktMsg(topupData[0]?.mrktMsg)
  // setcustomerMsg('IEGPERIPI');
  //           setmrktMsg("EOGOUEROGU")
            setKeyChangeToken(topupData[0]?.keyChangeToken)
            setBssToken(topupData[0]?.bsstToken)

            //  setStsToken("1235678901123456");
            // setKeyChangeToken( "12345678901234567890,12345678901234567899")
            // setBssToken('12343553636373733')
            
    

            // console.log(topupData[0]?.stdToken,"topupData[0]?.stdToken)topupData[0]?.stdToken)topupData[0]?.stdToken)topupData[0]?.stdToken)");
          }
          // dispatch(resetToupRequest());
          
          return;
        }else{
          Toast.show("Your topup has been failed", {
            type: "danger",
            placement: "top",
            duration: 3000,
            offset: 30,
            animationType: "slide-in",
          });
          // dispatch(resetToupRequest());

        }
      }
      else{
        getTopupStatus();
        // dispatch(resetToupRequest());

      }
    }, [topupData]);
    // useEffect(() => {
    //   // getTopupStatus();
    //   console.log(topupData);
    //   if(topupData?.length > 0){
    //     if(topupData[0].topupStatus === "VendSuccess"){
    //       setTopupFlag("success");
    //       if(topupData[0]?.stdToken){
    //         setStsToken(topupData[0]?.stdToken);
    //         console.log(topupData[0]?.stdToken,"topupData[0]?.stdToken)topupData[0]?.stdToken)topupData[0]?.stdToken)topupData[0]?.stdToken)");
    //       }
    //       return;
    //     }else{
    //       getTopupStatus();
    //     }
    //   }
    //   else{
    //     getTopupStatus();
    //   }
    // }, [topupData]);
    

    const getTopupStatus =async ()=>{
      setKeyChangeToken("")
      setBssToken("")
      setStsToken("");
      let userId = await AsyncStorage.getItem('userId');
      let dataObj = {
        transactionId: route.params.topup_id,
        userId: userId
      };
      // console.log("====================KKKK=");
      // console.log(dataObj);
      
      dispatch(getTopupDetails(dataObj));
  }

  useEffect(() => {
    dispatch(resetToupDetails());
    getWalletDetails();
  }, [dispatch]);

  const getWalletDetails = async () => {
    let userId = await AsyncStorage.getItem('userId');
    let dataObj = { "userId": userId }
    dispatch(getWalletData(dataObj));
  }

  useEffect(() => {
    const onBackPress = () => {
      navigation.navigate('dashBoard');
      return true; // Prevent default behavior (exit the app)
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [navigation]);


    
  const BackToDashboard =()=>{
    dispatch(resetToupDetails());

        navigation.navigate('dashBoard');

    }
    const DownloadPurchaseStatement =()=>{
      // if (!isDownloading) {
        // setIsDownloaded(false); // Reset the download state if needed
        // You can add any additional logic you want to run when the button is pressed
     
      // console.log("HIIIIII");
      let dataObj = {
        transactionId: route.params.topup_id,
        // userId: userId
      };
      // console.log("====================KKKK=");
      setDownloadReceipt("Downloading...");

      // console.log(dataObj);
      dispatch(getDownloadPurchace(dataObj));
    
  }
  return (
    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: '#FFFFFFFF',
    }}>
        <View style={{flex:1}}>
            <View style={{flex:0.4,backgroundColor:'#1DD75B',alignItems:'center',justifyContent:'center'}}>
                <Image source={AllTask}  height={40} width={40} />
                <Text style={styles.topText}>Payment Successful</Text>
            </View>
           <ScrollView style={{flex:1}}>
           <View style={{alignItems:'center',flex:0.08,marginTop:15,alignContent:'center'}}>
                <Text style={styles.noteTextStyle}>Your payment has been done sccessfully.</Text>
                <Text style={styles.textStyle}> Please check details below.</Text>                
         </View> 
         <View style={{flex:0.47,marginHorizontal:10}}>  
         <View style={{marginHorizontal:16,marginTop:10}}>  
         <View style={styles.mainText}>
                  <Text
                    style={[styles.textStyle,{color:'#9095A1'}]}>
                     Meter Number :
                  </Text>

                  <Text
                    style={styles.textStyle}>{route.params.meterNumber}</Text>
                </View> 
             
                
                <View
                style={styles.mainText}>
                  <Text
                    style={[styles.textStyle,{color:'#9095A1'}]}>
                    Time :
                  </Text>

                  <Text
                    style={styles.textStyle}>
                    {route.params.date}
                   
                  </Text>
                </View>
                <View
                  style={styles.mainText}>
                  <Text
                    style={[styles.textStyle,{color:'#9095A1'}]}>
                    Transaction ID :
                  </Text>

                  <Text
                    style={styles.textStyle}>
                    {route.params.topup_id}
                  </Text>
                </View>
                <View style={styles.mainText}>
                  <Text
                    style={[styles.textStyle,{color:'#9095A1'}]}>
                    Amount :
                  </Text>

                  <Text
                    style={styles.textStyle}>
                      R {parseFloat(route.params.amount).toFixed(2)}
                    {/* R {route.params.amount}.toFixed(2) */}
                  </Text>
                </View>
                <View style={styles.mainText}>
                  <Text
                    style={[styles.textStyle,{color:'#9095A1'}]}>
                    Transaction Fee :
                  </Text>

                  <Text
                    style={styles.textStyle}>
                      R {parseFloat(route.params.transactionFee).toFixed(2)}

                      {/* R {route.params.transactionFee}.toFixed(2) */}
                      </Text>
                </View>
                 {/* {
                //   // <View style={styles.mainText}>
                // //   <Text
                // //     style={[styles.textStyle,{color:'#9095A1'}]}> Recharge Amount :
                // //   </Text>

                // //   <Text
                // //     style={styles.textStyle}>R {topupData[0].rechargeAmount}</Text>
                // // </View>
                // } */}
              
                <View
              style={{
                borderWidth: 1, 
                borderColor: '#DEE1E6',
                marginVertical:7
              }}></View>
              {
                topupFlag === 'loading' ? 
                (<View style={styles.container}>
                  {/* Loader taking 20% width */}
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                    <ActivityIndicator size="large" color="#000" style={styles.loader} />
                  </View>
                  
                  {/* Text views taking rest of the width */}
                  <View style={{ flex: 4 }}>
                    <Text style={[styles.topText, { color: '#9095A1' }]}>Please wait...</Text>
                    <Text style={styles.noteTextStyle}>We are processing your recharge.</Text>
                    <Text style={styles.textStyle}>(We will notify you once recharge is done!)</Text>
                  </View>
                </View>) : 
                topupFlag === 'success'  ? 
                (
                <>
           
                <View style={styles.container}>
                   {/* Loader taking 20% width */}
                   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', width: '25%',marginRight:10 }}>
                  <Image
                      source={PopupIcon}
                      style={{width: '100%', height: 50}}
                    />
                  </View>
                  
                  {/* Text views taking rest of the width */}
                  <View style={{ flex: 5, }}>
                    <Text style={[styles.topText, { color: COLOR_LIST.SUCCESS }]}>Ta-da!</Text>
                    <Text style={styles.noteTextStyle}>Recharge Completed Successfully.</Text>
                    <Text style={styles.textStyle}>Your account balance has been updated.</Text>
                  </View>
                </View>
               
                {
                keyChangeToken ? (
<View style={{paddingHorizontal:5,marginTop:5 
    }}>
          <View
              style={{
                borderWidth: 1, 
                borderColor: '#DEE1E6',
                marginVertical:7
              }}></View>
  <Text style={[styles.noteTextStyle, { color: COLOR_LIST.ERROR_TEXT, fontSize: 14, textAlign: 'center',
        fontWeight:'600', 
         }]}>Note for Key Change</Text>
     <View>
      
        {/* <Text style={styles.textStyle}>Your account balance has been updated.Your account balance has been updated.Your account balance has been updated.Your account balance has been updated.</Text> */}
<Text style={styles.textStyle}> Your resource token is below, but your meter requires a key change before you enter it.
   To change your meter's key, enter the token listed below </Text>
        </View>
        <Text style={[, { color: COLOR_LIST.SUCCESS, textAlign: 'center', fontSize: 14, 
        fontWeight:'600', 
        lineHeight:14,marginTop:2  }]}>Key Change Token</Text>

                  {/* <View style={{ flexDirection: 'row', alignSelf: 'center',marginLeft:10 }}>
                 
                  <Text style={[styles.topText, { color: COLOR_LIST.DARKGRAY, fontSize: 18,textAlign:'center',marginLeft:20,  marginTop:10, lineHeight:22, }]}>
                 
                  {keyChangeToken.match(/.{1,4}/g).join(' ')}
                  </Text>
                  
                  <TouchableOpacity style={{marginTop:0}} onPress={() => copyToClipboard(keyChangeToken)}>
                    <Image
                      source={require('../../assets/topup/copyImage.png')}
                      style={{ width:36, height:36,  }}
                    />
                  </TouchableOpacity>
                </View> */}
                  <View style={{ flexDirection: 'column', alignSelf: 'center',marginLeft:10 }}>
                 
                  {keyChangeToken?.split(',').map((token, index) => (
    <View  style={{ flexDirection: 'row', alignSelf: 'center',marginLeft:10 }} key={index}>
      <Text style={[styles.topText, { color: COLOR_LIST.DARKGRAY, fontSize: 18, textAlign: 'center', marginLeft: 20, marginTop: index > 0 ? 0 : 10, lineHeight: 22 }]}>
      {token.trim().match(/.{1,4}/g).join(' ')}
      </Text>

      <TouchableOpacity style={{ marginTop: 0 }} onPress={() => copyToClipboard(token.trim())}>
        <Image
          source={require('../../assets/topup/copyImage.png')}
          style={{ width: 36, height: 36 }}
        />
      </TouchableOpacity>
    </View>
  ))}
                </View>
               
                </View>
                
                ) : null
              } 
              {
                BssToken ? (
<View>
<View
              style={{
                borderWidth: 1, 
                borderColor: '#DEE1E6',
                marginVertical:7
              }}></View>
  <Text style={[, { color: COLOR_LIST.SUCCESS, textAlign: 'center', fontSize: 14, 
        fontWeight:'600', 
        lineHeight:14, marginTop:5 }]}>Free Token</Text>

                  <View style={{ flexDirection: 'row', alignSelf: 'center',marginLeft:10 }}>
                 
                  <Text style={[styles.topText, { color: COLOR_LIST.SUCCESS, fontSize: 18,textAlign:'center',marginLeft:20,  marginTop:10, lineHeight:22, }]}>
                 
                  {BssToken.match(/.{1,4}/g).join(' ')}
                  </Text>
                  
                  <TouchableOpacity style={{marginTop:0}} onPress={() => copyToClipboard(BssToken)}>
                    <Image
                      source={require('../../assets/topup/copyImage.png')}
                      style={{ width:36, height:36,  }}
                    />
                  </TouchableOpacity>
                </View>
                <View
              style={{
                borderWidth: 1, 
                borderColor: '#DEE1E6',
                marginVertical:3
              }}></View>
                </View>
                ) : null
              } 
                {
                stsToken ? (
<View>
  <Text style={[, { color: COLOR_LIST.SUCCESS, textAlign: 'center', fontSize: 14, 
        fontWeight:'600', 
        lineHeight:14, marginTop:5 }]}>Credit Token</Text>

                  <View style={{ flexDirection: 'row', alignSelf: 'center',marginLeft:10 }}>
                 
                  <Text style={[styles.topText, { color: COLOR_LIST.SUCCESS, fontSize: 18,textAlign:'center',marginLeft:20,  marginTop:10, lineHeight:22, }]}>
                 
                  {stsToken.match(/.{1,4}/g).join(' ')}
                  </Text>
                  
                  <TouchableOpacity style={{marginTop:0}}  onPress={() => copyToClipboard(stsToken)}>
                    <Image
                      source={require('../../assets/topup/copyImage.png')}
                      style={{ width:36, height:36,  }}
                    />
                  </TouchableOpacity>
                </View>
                </View>
                ) : null
              }
              {
                
                customerMsg ?(<View style={[styles.container,{backgroundColor:'#FFB3AD',borderRadius:6,marginTop:10}]}>
                   {/* Loader taking 20% width */}
                   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', width: '25%',marginRight:10 }}>
                  <Image
                      source={announcement}
                      style={{width: '100%', height: 40}}
                    />

                  </View>
                  
                  {/* Text views taking rest of the width */}
                  <View style={{ flex: 5, }}>
                    {/* <Text style={[styles.topText, { color: COLOR_LIST.SUCCESS }]}>Ta-da!</Text> */}
                    <Text style={styles.noteTextStyle}>{customerMsg}</Text>
                    {/* <Text style={styles.textStyle}>Your account balance has been updated.</Text> */}
                  </View>
                </View>):null
               
              } 
              
               {
                
                mrktMsg ?(<View style={[styles.container,{backgroundColor:'#DADAFA',borderRadius:6,marginTop:10}]}>
                   {/* Loader taking 20% width */}
                   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', width: '25%',marginRight:0}}>
                  <Image
                      source={tag}
                      style={{width: '60%', height: 40}}
                    />
                        {/* <EntypoIcon name="tag" size={30} color="#000" /> */}
        

                  </View>
                  
                  {/* Text views taking rest of the width */}
                  <View style={{ flex: 5, }}>
                    {/* <Text style={[styles.topText, { color: COLOR_LIST.SUCCESS }]}>Ta-da!</Text> */}
                    <Text style={styles.noteTextStyle}>{mrktMsg}</Text>
                    {/* <Text style={styles.textStyle}>Your account balance has been updated.</Text> */}
                  </View>
                </View>):null
               
              }
            
            
              </>
                ) 
                
                : (<View style={styles.container}>
                  {/* Loader taking 20% width */}
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                    <ActivityIndicator size="large" color="#000" style={styles.loader} />
                  </View>
                  
                  {/* Text views taking rest of the width */}
                  <View style={{ flex: 4 }}>
                    <Text style={[styles.topText, { color: '#9095A1' }]}>Oop!</Text>
                    <Text style={styles.noteTextStyle}>Unable to process your recharge.</Text>
                    <Text style={styles.textStyle}>(You paid amount is parked in your wallet!)</Text>
                  </View>
                </View>)
 }
        </View>   

         </View>
           </ScrollView>
      
         <View style={{flex:0.2, alignItems: 'center',marginTop:5}}>
         { topupFlag === 'success' ?(
         <View style={{ }}>
      <TouchableOpacity onPress={DownloadPurchaseStatement}>
        <Text style={{ fontSize: 12, color: 'blue', textDecorationLine: 'underline' }}>
        {downloadReceipt}
        </Text>
      </TouchableOpacity>
    
          </View>
        ):null}
              <DownloadPurchaseButton
              titleName="BACK TO DASHBOARD"
              iconName={dashboardIcon}
              onClick={BackToDashboard}
            />
            
             
          </View>

        </View>
       
    {/* <BackNavigation title={'Account Settings'} isRightIcon={true} /> */}
    </SafeAreaView>

  )
}
export default Payment

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Arrange items horizontally
    // alignItems: 'center', // Center items vertically
    paddingHorizontal: 5,
    paddingVertical:5
   
     // Add horizontal padding
  },
  noteTextStyle: {
    fontFamily: 'Catamaran-SemiBold' /* Body */,
    fontSize: 14,
    fontWeight: '400',
    lineHeight:22, 
   color: '#171A1F',
  },  
  textStyle: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight:22, 
     color: '#171A1F',
    },
    mainText:{
    
            flexDirection: 'row',
             marginVertical: 3,
            justifyContent: 'space-between',
        
    },
    topText:{
        fontFamily:'Catamaran-Bold',
        fontSize: 24, 
        fontWeight:'400', 
        lineHeight: 36, 
        color: 'rgba(255,255,255,1)',
        marginTop:10
    }
  });
  
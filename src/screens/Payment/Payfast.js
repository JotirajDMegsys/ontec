// import React, {useState} from 'react'
// import { SafeAreaView,View,Text,StyleSheet, Image } from 'react-native'
// import { SignInButton } from '../../components/common'
// import { useNavigation } from '@react-navigation/native';
// import dashboardIcon from '../../assets/dashboardIcon.png';
// import PayFast from 'react-native-payfast-plugin';
// import AllTask from '../../assets/completeTask.png';
// import { Toast } from 'react-native-toast-notifications';
// import { API_BASE_URL, API_VERSION, PAYFAST_DATA } from '../../helpers/enum';
//  const Payfast = ({route}) => {
//     const navigation =useNavigation();
//     const BackToDashboard =()=>{
//         navigation.navigate('dashBoard')
//     } 
//     const [toastShown, setToastShown] = useState(false);
//   return (
//     <SafeAreaView
//     style={{
//       flex: 1,
//       backgroundColor: '#FFFFFFFF',
//     }}>
//          <View style={{flex:1,marginHorizontal:24,marginTop:40}}>  
//          <PayFast
//     data={{
//         merchantDetails: {
//             merchant_id: PAYFAST_DATA.MERCHANT_ID,
//             merchant_key: PAYFAST_DATA.MERCHANT_KEY,
//             notify_url: `${API_BASE_URL}api/topup/update_notified_topup_transaction?api-version=${API_VERSION}`,
//         },
//         customerDetails: {
//             name_first: route.params.username,
//             name_last: "",
//             email_address: route.params.email,
//             cell_number: route.params.mobile,
//         },
//         transactionDetails: {
//             m_payment_id: route.params.payment_id,
//             amount: route.params.amt,
//             item_name: PAYFAST_DATA.ITEM_NAME,
//             item_description: PAYFAST_DATA.ITEM_DESC,
//         },
//         transactionOptions: {
//             email_confirmation: 0,
//             confirmation_address: "chetan@mindworx.in",
//         },
        
//     }}
//     paymentMethod={route.params.payment_method}
//     sandbox={true}
//     passphrase = {PAYFAST_DATA.PASSPHRASE}

//     onCancel={(data) => {
//         if(toastShown){
//             Toast.show('Transaction cancelled! Please try again.', {
//                 type: "danger",
//                 placement: "top",
//                 duration:3000,
//                 offset: 30,
//                 animationType: "slide-in",
//             });
//         }else{
//             setToastShown(true);
//         }
//         navigation.navigate('topUp');
//         console.log("Payment cancelled: ", data);
//     }}

//     onMessage={(message) => {
//         console.log(message);
//     }}

//     onSuccess={({ data, transaction_id }) => {
//         navigation.navigate('payment', {'topup_id':route.params.payment_id, 'transaction_id':transaction_id, 'amount':route.params.amt})
//         // console.log(transaction_id);
//     }}

//     onClose={() => {
//         console.log("Payment closed");
//     }}
// />

//          </View>
//          <View>
//          </View>
        
       
//     {/* <BackNavigation title={'Account Settings'} isRightIcon={true} /> */}
//     </SafeAreaView>

//   )
// }
// export default Payfast

// const styles = StyleSheet.create({
//     textStyle: {
//       fontFamily: 'Catamaran-SemiBold' /* Body */,
//       fontSize: 14,
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
  


import React, {useState} from 'react'
import { SafeAreaView,View,Text,StyleSheet, Image } from 'react-native'
import { SignInButton } from '../../components/common'
import { useNavigation } from '@react-navigation/native';
import dashboardIcon from '../../assets/dashboardIcon.png';
import PayFast from 'react-native-payfast-plugin';
import AllTask from '../../assets/completeTask.png';
import { Toast } from 'react-native-toast-notifications';
import { API_BASE_URL, API_VERSION, PAYFAST_DATA } from '../../helpers/enum';
 const Payfast = ({route}) => {
    const navigation =useNavigation();
    const BackToDashboard =()=>{
        navigation.navigate('dashBoard')
    } 
    const [toastShown, setToastShown] = useState(false);
  return (
    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: '#FFFFFFFF',
    }}>
         <View style={{flex:1,marginHorizontal:24,marginTop:40}}>  
         <PayFast
    data={{
        merchantDetails: {
            merchant_id: PAYFAST_DATA.MERCHANT_ID,
            merchant_key: PAYFAST_DATA.MERCHANT_KEY,
            signature:'',
            notify_url: `${API_BASE_URL}api/topup/update_notified_topup_transaction?api-version=${API_VERSION}`,
        },
        customerDetails: {
            name_first: "",
            name_last: "",
            email_address: route.params.email,
            cell_number: route.params.mobile,
        },
        transactionDetails: {
            m_payment_id: route.params.payment_id,
            amount: route.params.amt,
            item_name: PAYFAST_DATA.ITEM_NAME,
            item_description: PAYFAST_DATA.ITEM_DESC,
        },
        transactionOptions: {
            email_confirmation: 0,
            confirmation_address: "chetan@mindworx.in",
        },
        
    }}
    paymentMethod={PAYFAST_DATA.PAYMENT_METHOD}
    sandbox={true}
    passphrase = {PAYFAST_DATA.PASSPHRASE}

    onCancel={(data) => {
        if(toastShown){
            Toast.show('Transaction cancelled! Please try again.', {
                type: "danger",
                placement: "top",
                duration:3000,
                offset: 30,
                animationType: "slide-in",
            });
        }else{
            setToastShown(true);
        }
        navigation.navigate('topUp');
        console.log("Payment cancelled: ", data);
    }}

    onMessage={(message) => {
        console.log(message);
    }}

    onSuccess={({ data, transaction_id }) => {
        // username: userDetailsData.userName,
        // payment_id: data.transactionID,
        // payment_method: selectedPaymentMethodSlug,
        // transactionFee:data.transactionFee,
        // meterNumber:data.meterId,
        // date:data.createdAt
        navigation.navigate('payment', {'topup_id':route.params.payment_id, 'transaction_id':transaction_id, 'amount':route.params.amt,
        "transactionFee":route.params.transactionFee,"meterNumber":route.params.meterNumber,"date":route.params.date
    
    })
        // console.log(transaction_id);
    }}

    onClose={() => {
        console.log("Payment closed");
    }}
/>

         </View>
         <View>
         </View>
        
       
    {/* <BackNavigation title={'Account Settings'} isRightIcon={true} /> */}
    </SafeAreaView>

  )
}
export default Payfast

const styles = StyleSheet.create({
    textStyle: {
      fontFamily: 'Catamaran-SemiBold' /* Body */,
      fontSize: 14,
      fontWeight: '400',
      lineHeight:22, 
     color: '#171A1F',
    },
    mainText:{
    
            flexDirection: 'row',
             marginVertical: 9,
            justifyContent: 'space-between',
        
    },
    topText:{
        fontFamily:'Catamaran-Bold',
        fontSize: 24, 
        fontWeight:'400', 
        lineHeight: 36, 
        color: 'rgba(255,255,255,1)',
        marginTop:20
    }
  });
  
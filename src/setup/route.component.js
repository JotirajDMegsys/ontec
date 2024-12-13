import React, { Profiler } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

//*screens
import SplashScreen from '../screens/splashScreen';
import SignIn from '../screens/auth/signIn';
import ResetPassword from '../screens/auth/resetPassword';
import OtpSubmit from '../screens/auth/otpSubmit';
import ForgotPassword from '../screens/auth/forgotPassword';
// import SignUp from '../screens/auth/signUp';
// import UploadDocument from '../utils/DocumentUpload';
// //*auth screens
// import SignIn from '../screens/auth/signIn';
import SignUp from '../screens/auth/signUp';

// // import VerifyOtp from '../screens/auth/otpVerify';

// profile
import { Profile } from '../screens/auth/Profile';
 import UpdateProfile from '../screens/auth/UpdateProfile';

//*properties
import Property from '../screens/properties/Property';
import AddProperty from '../screens/properties/addProperty';
 import PropertyDetails from '../screens/properties/propertyDetails';
// import UpdateProperty from '../screens/properties/UpdateProperty';
// meter
import { MeterList } from '../screens/meter/MeterList';
import AddNewMeter from '../screens/meter/AddNewMeter';
import UpdateMeter from '../screens/meter/UpdateMeter';
// //dashboard
import DashBoard from '../screens/dashboard/DashBoard';
import Bottom from '../components/Bottom';
 import MyProfile from '../screens/dashboard/MyProfile';
import Accounts from '../screens/dashboard/Accounts';
 import Wallet_transaction from '../screens/dashboard/Wallet_transaction';

 import Transaction_Statement from '../components/Transaction_Statement';
 import Notification from '../screens/Notification/Notification';

import { SandtoneUsers } from '../users/SandtoneUsers';
import { AddTenant } from '../users/AddTenant';
import { Consumption } from '../screens/Consumption/Consumption';
import Account_Settings from '../screens/Account/Account_Settings';
 import ContactUs from '../screens/ContactUs';
 import Payment from '../screens/Payment/Payment';
 import Payfast from '../screens/Payment/Payfast';
 import Topup from '../screens/Account/Topup';
//  import { UpdateTenant } from '../users/UpdateTenant';
 import { AddUser } from '../users/AddUser';
// import { UpdateUser } from '../users/UpdateUser';
import changePassowrd from '../screens/changePassword';
 import PrivacyPolicy from '../screens/PrivacyPolicy';
  import TermsAndConditions from '../screens/TermsAndConditions';
import Purchase_History from '../screens/Consumption/purchaseHistory';
export default function RouteComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'splashScreen'}>
    
        
        <Stack.Screen
          options={{ headerShown: false }}
          name="splashScreen"
          component={SplashScreen}
        />
        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="document"
          component={UploadDocument}
        /> */}
         
         {/* Document */}
         {/* <Stack.Screen
          options={{ headerShown: false }}
          name="upload"
          component={UploadDocument}
        /> */}

        {/* auth */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="signIn"
          component={SignIn}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="signUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="resetPassword"
          component={ResetPassword}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="otpSubmit"
          component={OtpSubmit}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="forgotPassword"
          component={ForgotPassword}
        />

        {/* Profile */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="profile"
          component={Profile}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="updateProfile"
          component={UpdateProfile}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="meterList"
          component={MeterList}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="addmeterList"
          component={AddNewMeter}
        />
        
        <Stack.Screen
          options={{ headerShown: false }}
          name="updateMeter"
          component={UpdateMeter}
        />  

        {/* Dashboard */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="dashBoard"
          component={DashBoard}
        />
        {/* <Stack.Screen name="bottom" component={Bottom} /> */}

        {/* accounts */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="accounts"
          component={Accounts}
        />

        {/* transaction */}
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="transaction"
          component={Transaction_Statement}
        />

        {/* transaction */}
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="wallet_transaction"
          component={Wallet_transaction}
        />

        {/* myprofile */}
        <Stack.Screen options={{ headerShown: false }} name="myProfile" component={MyProfile} />
        {/* properties */}
        <Stack.Screen options={{ headerShown: false }} name="properties" component={Property} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="addProperties"
          component={AddProperty}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="propertyDetails"
          component={PropertyDetails}
        />
         {/* <Stack.Screen
          options={{ headerShown: false }}
          name="updateProperty"
          component={UpdateProperty}
        />
         */}

        {/* Notification */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="notification"
          component={Notification}
        />
        {/* users */}
        <Stack.Screen

          options={{ headerShown: false }}
          name="SandtoneUser"
          component={SandtoneUsers}
        />
        {/* add */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="addTenant"
          component={AddTenant}
        />
        {/* update */}
        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="updateTenant"
          component={UpdateTenant}
        /> */}
        {/* addUser */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="addUser"
          component={AddUser}
        />
       {/* updateUser */}
       {/* <Stack.Screen
          options={{ headerShown: false }}
          name="updateUser"
          component={UpdateUser}
        /> */}

        {/* consumption */}
        <Stack.Screen
        
          options={{ headerShown: false }}
          name="consumption"
          component={Consumption}
        />

        {/* account Seeting */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="accountSetting"
          component={Account_Settings}
        />
        {/* contactUs */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="contactUs"
          component={ContactUs}
        />
          <Stack.Screen
          options={{ headerShown: false }}
          name="changePassword"
          component={changePassowrd}
        />
          <Stack.Screen
          options={{ headerShown: false }}
          name="privacyPolicy"
          component={PrivacyPolicy}
        />
          <Stack.Screen
          options={{ headerShown: false }}
          name="TermsAndConditions"
          component={TermsAndConditions}
        />
        {/* Payment */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="payment"
          component={Payment}
        />
        {/* Payfast */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="payfast"
          component={Payfast}
        />
        {/* Topup */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="topUp"
          component={Topup}
        />

<Stack.Screen
          options={{ headerShown: false }}
          name="PurchaseHistory"
          component={Purchase_History}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

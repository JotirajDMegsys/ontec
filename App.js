/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Text, View} from 'react-native';
import RouteComponent from './src/setup/route.component';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <RouteComponent />
      </ToastProvider>
    </Provider>
    // <View style={{marginTop:40,flex:1}}>
    //   <Text style={{marginTop:20}}>Hiii</Text>
    // </View>
  );
}

export default App;

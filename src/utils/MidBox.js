import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';


const MidBox = () => {
  // const number=300;
  return (
    <>
     <View>
       <Text style={{
            
             
              top: 26,
              left: 22, 
              fontFamily: 'Catamaran-Bold', /* Body */
              fontSize: 15, 
              fontWeight: '400', 
              lineHeight: 20, 
              color: '#FFFFFFFF' /* white */
           
          }}>
            Account Balance:
          </Text>
          <Text
            style={{
              top: 30,
              left: 20,
              fontFamily: 'Catamaran-Bold' /* Body */,
              fontSize: 40,
              lineHeight: 56,
              color: '#1DD75BFF',
            }}>
            R 300.00
          </Text>
          <Text style={{
 
  top:26,
  left: 24, 
  fontFamily: 'Catamaran-Bold', /* Body */
  fontSize: 15,
  fontWeight: '500', 
  lineHeight: 22, 
  color: '#FFFFFFFF', /* white */
}}>Running out of credit</Text>
     </View>
    </>
  );
};

export default MidBox;

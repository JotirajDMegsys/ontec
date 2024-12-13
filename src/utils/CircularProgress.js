// import React from 'react';
// import { FlatList, View, Text, Image } from 'react-native';
// import { AnimatedCircularProgress } from 'react-native-circular-progress';

// const CircularProgress = () => {
//   const images = [
//     {
//       id: '1',
//       size: 100,
//       fill: 90,
//       text: '108liter',
//       source: { uri: 'https://reactjs.org/logo-og.png' },
//     },
//     {
//       id: '2',
//       size: 100,
//       fill: 100,
//       text: '17kWh',
//       source: { uri: 'https://reactjs.org/logo-og.png' },
//     },
//     // Add more images as needed
//   ];

//   const renderItem = ({ item }) => (
//     <View style={{flex:1, alignItems: 'center', marginVertical: 20 }}>
//       <View>
//         <AnimatedCircularProgress
//           size={item.size}
//           width={3}
//           fill={item.fill}
//           tintColor="#00e0ff"
//           backgroundColor="#3d5875"
//         >
//           {(fillValue) => (
//             <Text style={{ textAlign: 'center', color: 'white' }}>
//               {`${fillValue}%`}
//             </Text>
//           )}
//         </AnimatedCircularProgress>
//         <Image
//           source={item.source}
//           style={{
//             position: 'absolute',

//             top: '75%',
//             left: '75%',
//             transform: [{ translateX: -item.size / 2 }, { translateY: -item.size / 2 }],
//            width:50,

//            height:50,
//             borderRadius: item.size / 2,
//           }}
//         />
//       </View>
//       <Text style={{ marginTop: 10 }}>{item.text}</Text>
//     </View>
//   );

//   return (
//     <FlatList
//     style={{display:"flex",flexDirection:'row'}}
//       data={images}
//       keyExtractor={(item) => item.id}
//       renderItem={renderItem}
//     />
//   );
// };

// export default CircularProgress

import React from 'react';
import {View, Text} from 'react-native';
const CircularProgress = () => {
  return (
    <>
    <View
      style={{
        width: '100%',
        height: 219,
        marginTop: 27,
        backgroundColor: '#252D3FFF',
        borderRadius: 25,
      }}>
      <View style={{marginHorizontal: 7, width: 374, height: 149}}></View>
      <View>
        <Text
          style={{
            marginTop: 22,
            marginLeft: 99,
            fontFamily: 'Catamaran-Regular',
            fontSize: 10,
            fontWeight: '400',
            lineHeight: 16,
            color: '#FFFFFFFF',
          }}>
          Click on the icon to check detailed consumption
        </Text>
      </View>
      <View style={{
        marginTop:22,
  width: 391,
  marginLeft:8,
  borderWidth:5,
  borderBottomRightRadius:11,
  borderBottomLeftRadius:11,
  height:4,
  borderColor:'#EC3237FF', /* primary-500 */
//   borderStyle:'solid', 
//   transform: [{ rotate: '0deg' }]

  }}>
    </View>
      
    </View>
    
    </>
  );
};
export default CircularProgress;

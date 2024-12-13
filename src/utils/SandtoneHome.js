//images
import { Image } from '@rneui/base';
// import LeftSideIcon from '../assets/headerIcon/LeftSide.png';
// import RightSideIcon from '../assets/headerIcon/RightSide.png';
import React from 'react';
import { View, Text } from 'react-native';
// import Home from '../assets/FillHomeImage.png';
import arrow from '../assets/headerIcon/RIghtSide.png';
import leftArrow from '../assets/headerIcon/LeftSide.png';


// for Account page

export const SandtoneHome = () => {
  return (

    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 25 }}>
      <Image style={{
        width: 24,
        height: 24
      }} source={leftArrow} />
      <View style={{
        marginHorizontal: 11,
        width:264,
        height: 70, borderRadius: 35,
        backgroundColor: '#FFFFFFFF', paddingHorizontal: 10,
        ...Platform.select({
          ios: {
            shadowColor: '#171a1f',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.9,
            shadowRadius: 9,
          },
          android: {
            elevation: 5,
          },
        }),
      }}>
        <View style={{ flexDirection: 'row', marginHorizontal: 16, }}>
          <Image source={Home} style={{ width: 28, height: 32, marginVertical: 15 }} />
          <View style={{ marginHorizontal: 20, marginVertical: 3 }}>
            <Text style={{
              fontFamily: 'Catamaran-Regular', /* Body */
              fontSize: 12,
              fontWeight: '400',
              // lineHeight: 20,
              color: '#171A1FFF'
            }}>Account No: 11112345678</Text>
            <Text style={{
              fontFamily: 'Catamaran-SemiThick',

              fontSize: 16,
              fontWeight: '400',
              color: '#171A1FFF'
            }}>Sandtone Home</Text>
            <Text style={{
              fontFamily: 'Catamaran-Regular', /* Body */
              fontSize: 12,
              fontWeight: '400',
              // lineHeight: 20, 
              color: '#171A1FFF'
            }}>Sandtone Home</Text>
          </View>

        </View>


      </View>
      <Image style={{
        width: 24,
        height: 24
      }} source={arrow} />
    </View>

  )
}


// for Dashboard
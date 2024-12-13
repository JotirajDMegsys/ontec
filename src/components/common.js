import React, { useState } from 'react';
import { Button } from '@rneui/themed';
// import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,Modal
} from 'react-native';

const SignInButton = (props) => {

  return (
    <Button
      title={props.titleName}
      icon={() => (
        <Image
          source={props.iconName}
          style={{ width: 20, height: 20 }}
        />
      )}
      buttonStyle={{
        backgroundColor: '#EC3237',
        borderRadius: 26,
      }}
      containerStyle={{
        width: 342,
        marginVertical: 10,
        marginTop: 30,

      }}
      titleStyle={{
        fontWeight: 400,
        fontSize: 18,
        paddingLeft: 5
      }}
      onPress={props.onClick}
    />
  );
};
const DownloadPurchaseButton = (props) => {

  return (
    <Button
      title={props.titleName}
      icon={() => (
        <Image
          source={props.iconName}
          style={{ width: 20, height: 20 }}
        />
      )}
      buttonStyle={{
        backgroundColor: '#EC3237',
        borderRadius: 26,
      }}
      containerStyle={{
        width: 342,
       marginTop:20

      }}
      titleStyle={{
        fontWeight: 400,
        fontSize: 18,
        paddingLeft: 5
      }}
      onPress={props.onClick}
    />
  );
};

const VerifyButton = (props) => {

  return (
    <Button
      title={props.titleName}
      icon={() => (
        <Image
          source={props.iconName}
          style={{ width: 20, height: 20 }}
        />
      )}
      buttonStyle={{
        backgroundColor: '#EC3237',
        borderRadius: 26,
      }}
      containerStyle={{
        width: 342,
        marginVertical: 10,
        // marginTop: 30,

      }}
      titleStyle={{
        fontWeight: 400,
        fontSize: 18,
        paddingLeft: 5
      }}
      onPress={props.onClick}
    />
  );
};


//*images
import backgroundImage from '../assets/loginBackgroundImage.png';
import appName from '../assets/AppName.png';
import check from '../assets/check.png';
// const SignInTopImage = props => {
//   console.log(props.viewFlex);
//   console.log(props.backgroundImage,'props.backgroundImage');
//   console.log(props.companyLogo);
//   return (
//     // <View
//     //   style={{
//     //     flex: props.viewFlex,
//     //     alignItems: 'center',
//     //     justifyContent: 'flex-end',
      
        
//     //   }}>
//     //   <Image
//     //        source={{ uri: props.backgroundImage }}
//     //                 style={{flex:1, alignSelf: 'center', justifyContent: 'center',width:'100%',borderColor:'red',borderWidth:2,    opacity: 0.5, // Adjust the opacity value as needed (0 to 1)
//     //               }}
//     //     resizeMode="cover"
//     //   />
//     //   <Image
//     //     // source={appName}
//     //     source={{ uri: "http://104.251.223.167:7500/assets/images/1.jpg" }}

//     //     style={{
//     //       borderColor:"red",borderWidth:2,
//     //       position: 'absolute',
//     //       alignSelf: 'center',
//     //       top: '50%',
//     //     flex:0.3,
          
//     //       transform: [{ translateY: -114 / 2 }],
//     //     }}
//     //     resizeMode="contain"
//     //   />
//     // </View>
//     <View
//   style={{
//     flex: props.viewFlex, // Set flex to 0.7
//     alignItems: 'center',
//     justifyContent: 'flex-end',
    
//   }}
// >
//   <Image
//     source={{ uri: props.backgroundImage }}
//     style={{
//       flex: 1,
//       alignSelf: 'center',
//       justifyContent: 'center',
//       width: '100%',
//       // borderColor: 'red',
//       // borderWidth: 2,
//       // opacity: 0.5, // Adjust the opacity value as needed (0 to 1)
//     }}
//     resizeMode="cover"
//   />


//   <Image
//     source={{uri: props.companyLogo}}
//     style={{
//       position: 'absolute',
//       alignSelf: 'center',
//       height:"50%",
//       // marginVertical:10,
//       width: '80%', // Adjust the width as needed
//       aspectRatio: 1, // Maintain aspect ratio
//       transform: [{ translateY: -70 / 2 }],
//     }}
//     resizeMode="contain"
//   />
// </View>

//   );
// };
const SignInTopImage = (props) => {
  return (
    <View style={[styless.container, { flex: props.viewFlex }]}>
      <Image
        source={{ uri: props.backgroundImage }}
        style={styless.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Semi-transparent overlay */}
      <View style={styless.overlay} />

      {/* Decorative elements */}
      <View style={styless.decorativeElementTop} />
      <View style={styless.decorativeElementBottom} />

      <Image
        source={{ uri: props.companyLogo }}
        style={styless.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styless = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  decorativeElementTop: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: "100%",
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
  },
  decorativeElementBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
   
  },
  logo: {
    position: 'absolute',
    alignSelf: 'center',
    height: '50%',
    width: '80%',
    aspectRatio: 1,
    transform: [{ translateY: -35 }],
  },
});
// const SignInTopImage = props => {
//   return (
//     <View
//       style={{
//         flex: props.viewFlex,
//         alignItems: 'center',
//         justifyContent: 'flex-end',
      
        
//       }}>
//       <Image
//         source={backgroundImage}
//         style={{ alignSelf: 'center', justifyContent: 'center',width:'100%'}}
//         resizeMode="cover"
//       />
//       <Image
//         source={appName}
//         style={{
//           position: 'absolute',
//           alignSelf: 'center',
//           top: '50%',
          
//           transform: [{ translateY: -114 / 2 }],
//         }}
//         resizeMode="contain"
//       />
//     </View>
//   );
// };

//  updateButton
const UpdateButton = props => {
  return (
    <TouchableHighlight onPress={props.onClick} underlayColor="transparent">
      <View
        style={{
          underlayColor: 'transparent',
          width: 150,
          height: 52,
          borderRadius: 25,
          backgroundColor: '#EC3237FF',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'space-between',
          borderWidth:2,
          borderColor:'red'
        }}>
        <Image
          style={{ width: 24, height: 24, marginTop: 14 }}
          source={props.imageIcon}
        />
        <Text
          style={{
            fontSize: 12,
            color: '#ffff',
            fontSize: 18,
            fontWeight: '400',
            textAlign: 'center',
            marginTop: 14,
            // paddingTop: 15,
            paddingLeft: 10,
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};


// DeleteButton
const DeleteButton = props => {
  return (
    <TouchableHighlight underlayColor="transparent" onPress={props.onClick}>
      <View
        style={{
          marginTop: 13,
          marginVertical: 10,
          width: 334,
          height: 52,
          backgroundColor: '#00000000',
          borderRadius: 26,
          borderWidth: 1,
          borderColor: '#EC3237FF' /* primary-500 */,
          borderStyle: 'solid',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'space-between',
          gap: 11,
        }}>
        <Image
          style={{ width: 24, height: 24, marginTop: 14 }}
          source={props.imageIcon}
        />
        <Text
          style={{
            paddingTop: 14,
            textAlign: 'center',
            fontFamily: 'Catamaran-SemiBold' /* Body */,
            fontSize: 18,
            fontWeight: '400',
            color: '#EC3237FF',
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const SendToEmailBtn = props => {
  return (
    <TouchableHighlight onPress={props.onClick} underlayColor="transparent">
      <View
        style={{
          underlayColor: 'transparent',
          height: 44,
          paddingHorizontal:20,
          borderRadius: 25,
          backgroundColor: '#EC3237FF',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'space-between',

        }}>
        <Image
          style={{ width: 20, height: 20, marginTop: 12 }}
          source={props.imageIcon}
        />
        <Text
          style={{
            fontSize: 12,
            color: '#ffff',
            fontSize: 16,
            fontWeight: '400',
            textAlign: 'center',
            marginTop: 10,
            // paddingTop: 12,
            paddingLeft: 3,
            fontFamily: 'Catamaran-Regular',
            lineHeight: 26,
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};


import OtpInputs from 'react-native-otp-inputs';
import Icon from 'react-native-vector-icons/Ionicons';
const OtpBox = ({ onOtpChange }) => {
  const [otp, setOtp] = useState(Array(6).fill(''));

  const handleChange = (code, index) => {
    const newOtp = [...otp];
    newOtp[index] = code;
    setOtp(newOtp);
    onOtpChange(code);
  };
  return (
    // <OtpInputs
    //   handleChange={(code) => console.log("hii")}
    //   numberOfInputs={6}
    // />
    <OtpInputs
      handleChange={(code, index) => handleChange(code, index)}
      numberOfInputs={6}
      inputStyles={{
        OpaqueColorValue:'red',
        borderColor: 'black',
        borderWidth: 1,
        color: 'black',
        borderRadius: 5,
        inputTextErrorColor:"red",
        inputTextNormalColor:"black",
        textAlign: 'center',
        flex: 0.8
      }}
      keyboardType="numeric"
      inputContainerStyles={{ width: 40, height: 40 }}
    />
  );
};

const PopupButton = props => {
  return (
    <TouchableHighlight underlayColor="transparent" onPress={props.onClick}>
      <View
        style={{
          marginTop: 30,
          width: 250,         height: 52,
          backgroundColor: '#EC3237FF',
          borderRadius: 26,
          borderWidth: 1,
          borderColor: '#EC3237FF' /* primary-500 */,
          borderStyle: 'solid',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'space-between',
          gap: 11,
        }}>
        <Image
          style={[{ width: 24, height: 24, marginTop: 12 }, props.iconStyle]}
          source={props.imageIcon}
        />
        <Text
          style={{
            paddingLeft: 5,
            paddingTop: 10,
            textAlign: 'center',
            fontFamily: 'Catamaran-SemiBold' /* Body */,
            fontSize: 18,
            fontWeight: '400',
            color: '#FFFFFFFF',
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const SubmitButton = props => {
  return (
    <TouchableHighlight underlayColor="transparent" onPress={props.onClick}>
      <View
        style={{
          marginTop: 23,
          width: 334,
          height: 60,
          backgroundColor: '#EC3237FF',
          borderRadius: 26,
          borderWidth: 1,
          borderColor: '#EC3237FF' /* primary-500 */,
          borderStyle: 'solid',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'space-between',
          gap: 11,
        }}>
        <Image
          style={{ width: 24, height: 24, marginTop: 14 }}
          source={props.imageIcon}
        />
        <Text
          style={{
            paddingTop: 14,
            textAlign: 'center',
            fontFamily: 'Catamaran-SemiBold' /* Body */,
            fontSize: 18,
            fontWeight: '400',
            color: '#FFFFFFFF',
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};
const StatementButton = props => {
  return (
    <TouchableHighlight underlayColor="transparent" onPress={props.onClick}>
      <View
        style={{
          width: 250,
          marginTop: 10,
          height: 52,
          backgroundColor: '#EC3237FF',
          borderRadius: 26,
          borderWidth: 1,
          borderColor: '#EC3237FF' /* primary-500 */,
          borderStyle: 'solid',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'space-between',
          gap: 11,
        }}><Image
          style={{ width: 24, height: 24, marginTop: 15 }}
          source={props.imageIcon}
        />
        <Text
          style={{
            paddingTop: 13,
            textAlign: 'center',
            fontFamily: 'Catamaran-SemiBold' /* Body */,
            fontSize: 18,
            fontWeight: '400',
            color: '#FFFFFFFF',
          }}>
          {props.title}
        </Text></View>
    </TouchableHighlight>
  )
}

export const CommonModal = ({ isVisible, toggleModal, title, content,marginTop }) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
      onRequestClose={toggleModal}
    >
      
      <TouchableOpacity style={[styles.modalBackground, { marginTop }]} onPress={toggleModal}>
        <View style={styles.modalContent}>
        <View style={styles.mainContainer} >
        <Text style={styles.modalTitle}>{title}</Text>
          {/* <Icon name="close" size={20} color="black"  onPress={toggleModal}/> */}

        </View>
          {content.map((item, index) => (
            <Text key={index} style={styles.modalText}>{item}</Text>
          ))}
         
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
 
   mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',

       
      },
      modalBackground: {
        flex: 1,
        justifyContent: 'space-around',
        // marginTop:400,
        marginHorizontal:20
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        padding: 10,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
       width:180,height:155

      },
      modalTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'black'
      },
      modalText: {
        marginBottom: 10,
        fontSize:12,
        textAlign: 'left',
        color:'black'

      },

});

export {
  SignInButton,
  SignInTopImage,
  UpdateButton,
  DeleteButton,
  // AgreeButton,
  DownloadPurchaseButton,
  OtpBox,
  PopupButton,
  SubmitButton,
  StatementButton,
  SendToEmailBtn,
  VerifyButton

};

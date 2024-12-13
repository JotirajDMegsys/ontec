import React,{useState,useEffect, useRef} from 'react';
// import { View, Text, } from 'react-native';

import { View, Text, Pressable,TouchableOpacity, Animated, Easing,Modal ,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux'
import { resetGetPropertiesDetails } from '../redux/slice/propertyDetails'


//image
import controlPanel from '../assets/MypropertiesIcon/Controlpanel.png';
import cottage from '../assets/MypropertiesIcon/Cottage.png';
import familyRoof from '../assets/MypropertiesIcon/FamilyRoof.png';
import familyRoofRed from '../assets/MypropertiesIcon/FamilyRoofRed.png';
import MeterIcon from '../assets/MypropertiesIcon/Speed.png';
import GasIcon from '../assets/MypropertiesIcon/Fire.png';
import ElectricityIcon from '../assets/MypropertiesIcon/Lighting.png';
import WaterIcon from '../assets/MypropertiesIcon/Drop.png';
import { Image } from '@rneui/base';
import { COMPANY_ID } from '../helpers/enum';
import { COLOR_LIST } from '../helpers/colorlist';
import { UTILITY } from '../helpers/meterData';

const Card = (props) => {
  // const companyId=COMPANY_ID
  const propertyId= props.itemData?.id;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const onClickCard = () => {
  //   dispatch(resetGetPropertiesDetails());
  //   // navigation.navigate("addProperties",{'id':propertyId});
  //   navigation.navigate('updateProperty', { "propertyId": propertyId,});

  // };
  const onClickCard = async () => {
    if(props.itemData?.roleName === 'Owner'){
      dispatch(resetGetPropertiesDetails());
    // await AsyncStorage.setItem('isUpdateProperty', true);
    //*11/03/2024
    console.log('====================================');
    console.log("jofgjeopgjpjp");
    console.log('====================================');
    navigation.push("addProperties", { "propertyId": props.itemData?.id, "isUpdate": true, });
    }
  };
// for tenant navigation

const [meterNumber, setMeterNumber] = useState(props.itemData?.meterTypeList.length  || 0);
  // const [showPopup, setShowPopup] = useState(false);
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (meterNumber === 0 && showPopup) {
      animatePopup(true);
    }
  }, [meterNumber, showPopup]);

  const animatePopup = (show) => {
    Animated.timing(scaleAnimation, {
      toValue: show ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };


  const [modalVisible, setModalVisible] = useState(false);

  const handleNavigation = () => {
    if (meterNumber >= 1) {
      navigation.navigate("SandtoneUser", { "propertyId": props.itemData?.id, "title": props.itemData?.name });
    } else {
      setModalVisible(true);
    }
  };





  const renderMeterIcons = () => {
    // const meterIcons = [];

    const meterIcons = props.itemData?.meterTypeList
    .filter((meter, index, self) => self.findIndex(m => m === meter) === index)
    .map(meter => <Image key={meter} source={UTILITY[meter].icon} style={{ height: 12, width: 12 }} />);
    return meterIcons;
  };
  const [showFullText, setShowFullText] = useState(false);

  const handleTextPress = () => {
    setShowFullText(!showFullText);
  };

  return (

    <Pressable
      onPress={() => {
        onClickCard();
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#252D3FFF',
          borderRadius: 15,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginHorizontal: 20,
          }}>
          <View>
         
            <View style={{ height: 60, width: 50, backgroundColor: '#565D6D', borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
            <Text
                    style={{
                      fontFamily: 'Catamaran-SemiBold',
                      fontSize: 8,
                    position:'absolute',paddingHorizontal:1,alignSelf:'center',
                      color: '#DEE1E6FF',
                    }}>
                    {props.itemData?.roleName}</Text>
              <Image source={cottage} style={{ width: 30, height: 26, marginTop: 20, marginHorizontal: 11 }} />
            </View>
            <Text
              style={{
                fontFamily: 'Catamaran-Bold' /* Body */,
                fontSize: 11,
                fontWeight: '600',
                lineHeight: 18,
                color: '#FFFFFFFF',
              }}>
              Unit No
            </Text>
            <TouchableOpacity onPress={handleTextPress}>

          <Text
              style={{
                fontSize:16,
                fontWeight: '400',
                // lineHeight: 30,
                color: '#FFFFFFFF',
              }}>  
                      {showFullText ? props.itemData?.unitNumber : `${props.itemData?.unitNumber.slice(0, 4)}..`}

                {/* {`${props.itemData?.unitNumber.slice(0, 4)}..`} */}
            </Text></TouchableOpacity>
          </View>
          <View style={{
            marginHorizontal: 20, flexDirection: 'row', 
          }}>
            <View >
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginTop: 15 }}>
                  <Text
                    style={{
                      fontFamily: 'Catamaran-SemiBold',
                      fontSize: 18,
                      fontWeight: '400',
                      lineHeight: 34,
                      color: '#DEE1E6FF',
                    }}>
                      {props.itemData?.name.length > 18 ?
  `${props.itemData?.name.substring(0, 18)}...` :
  props.itemData?.name
}
                    
                    </Text></View>
              </View>
              <View style={{ margintop: 5 }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Catamaran-Medium',
                    fontWeight: '400',
                    lineHeight: 20,
                    color: '#DEE1E6FF',
                  }}>
                  {/* {props.itemData?.address.substring(0, 25)} */}
                  {props.itemData?.address.length > 25 ?
  `${props.itemData?.address.substring(0, 25)}...` :
  props.itemData?.address
}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    fontFamily: 'Catamaran-Regular',

                    marginVertical: 5,
                  }}>
                  <View style={{ flexDirection: 'row', marginRight: 10 }}>
                    <Image source={controlPanel} style={{ width: 20, height: 20 }} />

                    <View style={{ marginHorizontal: 3 }}>
                      <Text style={{
                        color: '#DEE1E6FF', fontSize: 12,
                        fontWeight: '700',
                        lineHeight: 20,
                        fontFamily: 'Catamaran-Regular',

                      }}>
                        {/* {props.itemData?.meterTypeList.length + " Meters"} */}
                        {props.itemData?.meterCount + " Meters"}

                        {/* "meterCount":  */}
                      </Text>
                    </View>
                  </View>
                
                  <View style={{ flexDirection: 'row', }}>
                    <Image source={familyRoof} style={{ width: 20, height: 20 }} />

                    <View style={{ marginHorizontal: 3 }}>
                      <Text style={{
                        color: '#DEE1E6FF', fontSize: 12,
                        fontFamily: 'Catamaran-Regular',

                        fontWeight: '700',
                        lineHeight: 20,
                      }}>
                        {props.itemData?.tenentCount + " Users"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>



          </View>
          <View style={{ flexDirection:"row",flex:1, marginTop:10,position:'relative', justifyContent: 'flex-end'}}>
            {renderMeterIcons()}

          </View>
          
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            height: 40,
            marginTop: 20,

          }}>
          <Pressable onPress={() => {
            navigation.navigate("meterList", { "propertyId": props.itemData?.id, "title":props.itemData?.name});
          }}>
            <View
              style={{
                width: 140,
                height: 30,
                paddingVertical: 5,
                borderRadius: 25,
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: '#EC3237FF',
              }}>
              <View style={{ marginRight: 4 }}>
                <Image source={MeterIcon} style={{ width: 20, height: 20 }} />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: '#ffffff',
                  fontWeight: '400',
                  lineHeight: 20,
                  textAlign: 'center',
                }}>
                MANAGE METERS
              </Text>
            </View>
          </Pressable>
          <View>
      <TouchableOpacity onPress={handleNavigation}>
        <View style={{
          width: 140,
          height: 30,
          paddingVertical: 5,
          borderRadius: 25,
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: '#EC3237FF',
        }}>
          <View style={{ marginRight: 4 }}>
            <Image source={familyRoofRed} style={{ width: 20, height: 20 }} />
          </View>
          <Text style={{
            fontSize: 12,
            color: '#ffffff',
            fontWeight: '400',
            lineHeight: 20,
            textAlign: 'center',
          }}>MANAGE USERS</Text>
        </View>
      </TouchableOpacity>
      {modalVisible && (
        // <Animated.View
        //   style={{
        //     // position: 'absolute',
        //     bottom: 20,
        //     backgroundColor: 'white',
        //     borderRadius: 10,
        //     padding: 20,
        //     marginTop:10,
        //     transform: [{ scale: scaleAnimation }],
        //   }}>
        //   <Text style={{ fontSize: 18 }}>Add Meter</Text>
        //   <Text style={{ marginTop: 10 }}>You need to add a meter first before navigating.</Text>
        //   <TouchableOpacity onPress={() => setShowPopup(false)} style={{ marginTop: 20 }}>
        //     <Text style={{ color: 'blue' }}>OK</Text>
        //   </TouchableOpacity>
        // </Animated.View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.view}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>You need to add a meter before adding users.</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>OKAY</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.buttonText}>NO</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
        </View>
      </Modal>
        //   <Modal
      //   visible={showPopup}
      //   transparent={true}
      //   animationType="fade"
      //   onRequestClose={() => setShowPopup(false)}
      // >
      //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //     <View
      //       style={{
      //         backgroundColor: 'white',
      //         borderRadius: 10,
      //         marginHorizontal:40,
      //         justifyContent: 'center',
      //         // height:180,
      //         alignItems: 'center',
      //         elevation: 1, // Add elevation for shadow effect (Android)
      //         shadowColor: '#000', // Add shadow color (iOS)
      //         shadowOffset: { width: 0, height: 2 },
      //         shadowOpacity: 0.25,
      //         shadowRadius: 3.84,
      //       }}
      //     >
      //       {/* <Image source={MeterIcon} style={{height:100,width:100}}/> */}
      //       <View style={{ marginTop: 10, alignItems: 'center' }}>
      //       <Text style={{ color: 'black', marginHorizontal: 10 ,textAlign:'center'}}>
      //         You need to add a meter before adding users.
      //       </Text>
      //     </View>

      //       {/* <Text style={{ marginTop: 10, color:'black',marginHorizontal:10}}>You need to add a meter first before navigating.</Text> */}
      //       <TouchableOpacity onPress={() => setShowPopup(false)} style={{ marginVertical: 20,backgroundColor:COLOR_LIST.PRIMARY,height:40,width:80, borderRadius:25}}>
      //         <Text style={{ color: COLOR_LIST.BRIGHT_TEXT,fontWeight:'800',textAlign:'center',marginVertical:10}}>OK</Text>
      //       </TouchableOpacity>

      //     </View>
      //   </View>
      // </Modal>

      )}
    </View>
          {/* <TouchableOpacity 
          onPress={handleNavigation}
          // onPress={()=>{ navigation.navigate("SandtoneUser", { "propertyId": props.itemData?.id, "title":props.itemData?.name});
          //   }}
            >


            <View
              style={{
                width: 140,
                height: 30,
                paddingVertical: 5,
                borderRadius: 25,
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: '#EC3237FF',
              }}>
              <View style={{ marginRight: 4 }}>
                <Image source={familyRoofRed} style={{ width: 20, height: 20 }} />

              </View>

              <Text
                style={{
                  // textAlign:'center',
                  fontSize: 12,
                  color: '#ffffff',
                  fontWeight: '400',
                  lineHeight: 20,
                  textAlign: 'center',
                }}>
                MANAGE TENANTS
              </Text>
            </View>
          </TouchableOpacity>
          {showPopup && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            transform: [{ scale: scaleAnimation }],
          }}>
          <Text style={{ fontSize: 18 }}>Add Meter</Text>
          <Text style={{ marginTop: 10 }}>You need to add a meter first before navigating.</Text>
          <TouchableOpacity onPress={() => setShowPopup(false)} style={{ marginTop: 20 }}>
            <Text style={{ color: 'blue' }}>OK</Text>
          </TouchableOpacity>
        </Animated.View>
      )} */}
        </View>
        <View>
          <Text
            style={{
              // width: 335,

              height: 0,
              marginHorizontal: 6,
              borderColor: '#EC3237FF',
              borderStyle: 'solid',
              borderBottomWidth: 6,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}></Text>
        </View>
      </View>
      
    </Pressable>
  );
};
export default Card;
const styles = StyleSheet.create({


view:{

  flex: 1,
  // borderColor:'red',
  width:'100%',
  alignSelf:'center',
  // borderWidth:2,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
},
centeredView: {
flex: 1,
// borderColor:'red',
width:'75%',
alignSelf:'center',
// borderWidth:2,
justifyContent: 'center',
alignItems: 'center',
},
modalView: {
backgroundColor: 'white',
borderRadius: 10,
padding: 20,
alignSelf: 'center',
elevation: 5,
},
modalText: {
  fontSize: 16,
  marginBottom: 0,
  color: COLOR_LIST.TEXT,
  textAlign: 'center',
},
buttonContainer: {
// flexDirection: 'row',
marginHorizontal:50,

justifyContent:'center',
alignItems:"center",
// justifyContent: 'space-between',
width: '100%',
marginTop:20
},
button: {
borderRadius: 5,
paddingVertical: 10,
paddingHorizontal: 20,
marginHorizontal: 10,
},
logoutButton: {
backgroundColor: '#FF6347', 
  marginHorizontal:35// Red color for logout
},
cancelButton: {
backgroundColor: '#007bff', // Blue color for cancel
},
buttonText: {
color: 'white',
fontWeight: 'bold',
textAlign: 'center',
},

});

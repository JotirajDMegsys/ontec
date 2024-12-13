import React, { useState, useEffect } from 'react';
import Header from '../utils/Header';
import { View, ScrollView, Text, SafeAreaView, Pressable, StyleSheet, FlatList,TouchableHighlight} from 'react-native';
import Bottom from '../../components/Bottom';
// import CircularProgress from '../../utils/CircularProgress';
import { Image } from '@rneui/base';
import uniDirectionalIcon from '../../assets/headerIcon/uniDirectionalIcon.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SandtoneHome } from '../../utils/SandtoneHome';
import ProgressCircle from 'react-native-progress-circle'
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserDetailsApiCall } from '../redux/slice/getUserDetails'
// import { getUserDetailsApiCall } from '../redux/slice/getUserDetails';

//*icons
import leftArrow from "../../assets/dashbordLeftArrow.png"
import rightArrow from "../../assets/dashbordRightArrow.png"
import lightArrow from "../../assets/lighticon.png"
import airArrow from "../../assets/airicon.png"
import waterArrow from "../../assets/watericon.png"
import dashRight from "../../assets/dashProRight.png"
import dashLeft from "../../assets/dashProLeft.png"
import Home from '../../assets/FillHomeImage.png';
import tenantsIcon from '../../assets/tenants.png';
import saveCardIcon from '../../assets/saveCard.png';
import propertiesIcon from '../../assets/properties.png';
import meetsIcon from '../../assets/meets.png';
import HomeDash from '../../assets/HomeDash.png';
import { useNavigation } from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import { months } from 'moment';

const DashBoard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const swiperRef = React.createRef();
  const swiperRefPro = React.createRef();

  //*state
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [image, setImage] = useState();


  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1, true);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(-1, true);
    }
  };

  // //redux
  const {
    userDetailsIsLoading,
    userDetailsData,
    userDetailsIsSuccess,
    userDetailsIsError
  } = useSelector((state) => ({
    userDetailsIsLoading: state.userDetails.userDetailsIsLoading,
    userDetailsData: state.userDetails.userDetailsData,
    userDetailsIsSuccess: state.userDetails.userDetailsIsSuccess,
    userDetailsIsError: state.userDetails.userDetailsIsError,
  }));

  

  //*state
  const [spinner, setSpinner] = useState(false);
  const [profilePic, setProfilePic] = useState(null)


  useEffect(() => {
    onCLickUserDetails();

    const onCLickUserDetails =  async() => {
      
      
      
        let userId = await AsyncStorage.getItem('userId');
        let sessionKey = await AsyncStorage.getItem('sessionKey');
          let dataObj = { "id": userId, "sessionKey": sessionKey}
          console.log("Data Object:", dataObj);
          setSpinner(true);
          dispatch(getUserDetailsApiCall(dataObj));
          setSpinner(false);
        // } else {
        //   console.log("UserId or sessionKey is missing");
        // }

    };
    
  }, [dispatch]);
  // useEffect(() => {
  //   console.log("ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp");
   
       
  // const onCLickUserDetails = async () => {
  //   console.log("----------------------------------------------------------------------------------------------------");
  //   let userId = await AsyncStorage.getItem('userId');
  //   //  console.log(userId)
  //   let email = await AsyncStorage.getItem('emailId');
  //   let mobileNo = await AsyncStorage.getItem('mobile');
  //   let sessionkey = await AsyncStorage.getItem('sessionkey');
  //   console.log("userId", userId ,"sessionKey",sessionkey);

  //   let dataObj = { "userId": userId ,"sessionKey":sessionkey}
  //   console.log(dataObj);
  //   setSpinner(!spinner);
  //   dispatch(getUserDetailsApiCall(dataObj));
  //   // console.log(dataObj);
  // }
  //   onCLickUserDetails();
  // }, []);

  useEffect(() => {
    if (userDetailsIsSuccess && userDetailsData) {
      setSpinner(!spinner);
      setUserName(userDetailsData.userName);
      setMobile(userDetailsData.mobile);
      setEmail(userDetailsData.email);
      setImage(userDetailsData.profileUrl);
    }
  }, [userDetailsIsSuccess, userDetailsData]);
  // console.log(userDetailsData.userName);
console.log(

  userName,
  mobile,
  email,
  image

);
     
  // const onCLickUserDetails = async () => {
  //   console.log("----------------------------------------------------------------------------------------------------");
  //   let userId = await AsyncStorage.getItem('userId');
  //   //  console.log(userId)
  //   let email = await AsyncStorage.getItem('emailId');
  //   let mobileNo = await AsyncStorage.getItem('mobile');
  //   let sessionkey = await AsyncStorage.getItem('sessionkey');
  //   console.log("userId", userId ,"sessionKey",sessionkey);

  //   let dataObj = { "id": userId ,"sessionKey":sessionkey}
  //   console.log(dataObj);
  //   setSpinner(!spinner);
  //   dispatch(getUserDetailsApiCall(dataObj));
  //   // console.log(dataObj);
  // }
  // const handleNextPro = () => {
  //   if (swiperRefPro.current) {
  //     swiperRefPro.current.scrollBy(1, true);
  //   }
  // };

  // const handlePrevPro = () => {
  //   if (swiperRefPro.current) {
  //     swiperRefPro.current.scrollBy(-1, true);
  //   }
  // };
  const handleNextPro = () => {
    if (swiperRefPro.current) {
      swiperRefPro.current.scrollBy(1, true); 
    }
  };
  
  const handlePrevPro = () => {
    if (swiperRefPro.current) {
      swiperRefPro.current.scrollBy(-1, true); 
    }
  };
   
  const handlePress = () => {
    navigation.navigate('accounts');
  };
  const topUp = () => {
    navigation.navigate('topUp');

  };

  const [index, setIndex] = useState(0);

  const data = [
    {
      id: 1,
      title: 'Item 1',
    },
    {
      id: 2,
      title: 'Item 2',
    },
    {
      id: 3,
      title: 'Item 3',
    },
    {
      id: 4,
      title: 'Item 4',
    },
    {
      id: 5,
      title: 'Item 5',
    },
  ];

  const [indexOne, setIndexOne] = useState(0);


  const scrollToNext = () => {
    setIndexOne(indexOne + 1);
  };

  const scrollToPrevious = () => {
    setIndexOne(indexOne - 1);
  };

  // useEffect(() => {
  //   getUserData();
  // }, []);

  // const getUserData = async () => {
  //   let firstName = await AsyncStorage.getItem('firstName');
  //   let lastName = await AsyncStorage.getItem('lastName');
  //   let fullName = firstName + " " + lastName
  //   setUserName(fullName);
  // }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1, }}>
        {/* Header */}
        <View style={{ flex: 0.1, }}>
          <Header 
          userName={userName}
          mobile={mobile}
          image={image}
          email={email}/>
        </View>
        <View
          style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <ScrollView>

            {/* _______________ ProgressCircle View_______________ */}

            <View
              style={{
                height: 219,
                marginTop: 15,
                backgroundColor: '#252D3F',
                borderRadius: 25,
                marginHorizontal: 2,
              }}>
              <View style={{ flexDirection: 'row', flex: 1 }}>

                <View style={{ flex: 0.10, justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={leftArrow}
                    onPress={() => {
                      scrollToPrevious();
                    }}
                  />
                </View>

                <View style={{ flex: 1, }}>
                  <View style={{ flex: 0.8, flexDirection: 'row', }}>

                    <FlatList
                      data={data}
                      horizontal
                      renderItem={({ item }) => {
                        return (
                          <View key={indexOne} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center',marginHorizontal:5}}>
                            <ProgressCircle
                              percent={60}
                              radius={50}
                              styles={{marginHorizontal:5}}
                              borderWidth={15}
                              color="#f0b434"
                              shadowColor="#665020"
                              bgColor="#252D3F"
                            >
                              <Image
                                style={{ width: 28, height: 28 }}
                                source={lightArrow}
                              />
                            </ProgressCircle>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: '#FFF', marginTop: 5 }}>{item.title}</Text>
                          </View>
                        )
                      }}
                      keyExtractor={(item) => item.toString()}
                      initialScrollIndex={indexOne}
                      scrollToIndex={(params) => {
                        scrollToNext(params.index);
                      }}
                    />


                    {/* {

                      data.slice(currentIndex, currentIndex + 3).map((item, index) => {
                        return (
                          <View key={index} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                            <ProgressCircle
                              percent={60}
                              radius={56}
                              borderWidth={15}
                              color="#f0b434"
                              shadowColor="#665020"
                              bgColor="#252D3F"
                            >
                              <Image
                                style={{ width: 28, height: 28 }}
                                source={lightArrow}
                              />
                            </ProgressCircle>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: '#FFF', marginTop: 5 }}>{'17 kWh'}</Text>
                          </View>
                        );
                      })
                    } */}

                  </View>
                  <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ fontFamily: 'Catamaran-Regular', fontSize: 10, fontWeight: '400', lineHeight: 16, color: '#FFFFFFFF', }}>
                      Click on the icon to check detailed consumption
                    </Text>
                  </View>

                </View>

                <View style={{ flex: 0.10, justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={rightArrow}
                    onPress={() => {
                      scrollToNext();
                    }}
                  />
                </View>

              </View>

              <View style={{
                flex: 0.03,
                justifyContent: 'flex-end',
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                backgroundColor: '#EC3237',
                marginHorizontal: 12
              }}>
              </View>

            </View>

    
            {/* _______________ ProgressCircle View_______________ */}

            {/* _______________ Account Balance View_______________ */}
            <View style={{ marginTop:15, marginHorizontal: 20, height: 150, backgroundColor: '#252D3FFF', borderRadius: 20, }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{}}>
                    <Text style={{ fontFamily: 'Catamaran-Bold', fontSize: 15, fontWeight: '400', lineHeight: 20, color: '#FFFFFFFF' }}>
                      Account Balance:
                    </Text>
                    <Text
                      style={{ fontFamily: 'Catamaran-Bold', fontSize: 40, lineHeight: 56, color: '#1DD75BFF' }}>
                      R 300.00
                    </Text>
                    <Text style={{ fontFamily: 'Catamaran-Bold', fontSize: 15, fontWeight: '500', lineHeight: 22, color: '#FFFFFFFF' }}>
                      Running out of credit
                    </Text>
                  </View>
                </View>

                <View style={{ flex: 0.7, justifyContent: 'space-between' }}>
                <TouchableHighlight onPress={() => handlePress()} underlayColor="transparent">
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Image style={{ width: 22, height: 22, marginRight: 12, marginTop: 9 }}
                      source={uniDirectionalIcon}
                    />
                  </View>
                  </TouchableHighlight>

                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20, }}>
                    <Pressable onPress={topUp}>
                      <View style={{ width: 107, marginRight: 16, borderColor: '#FFFFFFFF', borderWidth: 2, height: 36, borderRadius: 5, }}>
                        <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '400', lineHeight: 30, color: '#FFFFFFFF' }}>
                          TOPUP
                        </Text>
                      </View>
                    </Pressable>
                  </View>

                </View>
              </View>

              <View style={{ flex: 0.03, justifyContent: 'flex-end', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, backgroundColor: '#EC3237', marginHorizontal: 12 }}></View>
            </View>
            {/* _______________ Account Balance View_______________ */}

            {/* sandtone Home */}
        
                  <View key={index} style={{ marginTop: 10, flexDirection: 'row', marginHorizontal: 20, alignItems: 'center' }}>

             <TouchableOpacity onPress={handlePrevPro} style={{}}>
          <Image style={{ width: 30, height: 30 }} source={dashLeft} />
        </TouchableOpacity>
            <Swiper
  style={{ height: 110 }}
  ref={swiperRefPro}
  loop={false}
  showsPagination={false}
>
  {data.map((item, index) => {
    return (
       

        <View style={{ flex: 1 }}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
            marginVertical: 10,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#FFFFFFFF',
            ...Platform.select({
              ios: {
                shadowColor: '#171a1f',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 9,
              },
              android: {
                elevation: 5,
              },
            }),
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <View>
                <Image source={Home} style={{ width: 28, height: 32 }} />
              </View>
              <View style={{ marginHorizontal: 20, marginVertical: 3 }}>
                <Text style={{ fontFamily: 'Catamaran-SemiThick', fontSize: 16, fontWeight: '400', color: '#171A1FFF' }}>Sandstone Home</Text>
                <Text style={{ fontFamily: 'Catamaran-Regular', fontSize: 12, fontWeight: '400', color: '#171A1FFF', marginTop: 5 }}>Account No: 12345678</Text>
              </View>
            </View>
          </View>
        </View>

    );
  })}
</Swiper>

<TouchableOpacity onPress={handleNextPro} style={{}}>
          <Image style={{ width: 30, height: 30 }} source={dashRight} />
        </TouchableOpacity>
      </View>

            {/* sandtone Home */}

            <View style={{ marginHorizontal: 20, flexDirection: 'row' }}>
              <View style={{ justifyContent: 'center', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('properties');
                  }}>
                  <Image
                    style={{ width: 54, height: 54, }}
                    source={HomeDash}
                  />
                  <Text style={{ fontFamily: 'Catamaran-SemiThick', fontSize: 12, fontWeight: '400', color: '#171A1FFF', marginTop: 5 }}>Properties</Text>
                </Pressable>
              </View >

              <View style={{ justifyContent: 'center', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('meterList');
                  }}>
                  <Image
                    style={{ width: 54, height: 54, }}
                    source={meetsIcon}
                  />
                  <Text style={{ fontFamily: 'Catamaran-SemiThick', fontSize: 12, fontWeight: '400', color: '#171A1FFF', marginTop: 5 }}>Meters</Text>
                </Pressable>
              </View>
              <View style={{ justifyContent: 'center', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('SandtoneUser');
                  }}>
                  <Image
                    style={{ width: 54, height: 54, }}
                    source={tenantsIcon}
                  />
                  <Text style={{ fontFamily: 'Catamaran-SemiThick', fontSize: 12, fontWeight: '400', color: '#171A1FFF', marginTop: 5 }}>Tenants</Text>
                </Pressable>
              </View>
            </View>

          </ScrollView>
        </View>

        
        </View>
        {/* Bottom*/}
        <Bottom currentPage={'Dashboard'}/>
        </SafeAreaView>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  iosShadow: {
    shadowColor: '#171a1f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 9,
  },
  androidShadow: {
    elevation: 5,
  },
});


import React,{useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Image,
  Dimensions,
  Pressable
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import arrow from '../../assets/headerIcon/RIghtSide.png';
import leftArrow from '../../assets/headerIcon/LeftSide.png';
import { useNavigation } from '@react-navigation/native';
import BackNavigation from '../../components/backNavigation';
import Swiper from 'react-native-swiper';
import {getAccHistory} from '../../redux/slice/getAccountDetails'
import { SandtoneHome } from '../../utils/SandtoneHome';
import Bottom from '../../components/Bottom';
import dashRight from "../../assets/dashProRight.png"
import dashLeft from "../../assets/dashProLeft.png";
import {useDispatch, useSelector} from 'react-redux';
import walletIcon from '../../assets/dashboard/walletIcon.png'
import noProperty from '../../assets/dashboard/noProperty.png'

//images
import BankStatement from '../../assets/accounts/BankStatement.png';
import rightArrow from '../../assets/RightArrow.png';
import { StatementButton } from '../../components/common';
import arrowCircleDown from '../../assets/accounts/ArrowCircleDownRight.png';
import Home from '../../assets/FillHomeImage.png';
import { COLOR_LIST } from '../../helpers/colorlist';
import { getFontSize, getWidthByScreenSize } from '../../helpers/commonFunction';
import moment from 'moment';

const Accounts = () => {
  const swiperRefPro = useRef(null);

  const { screenHeight, screenWidth } = Dimensions.get('window');
  const {
    // userDetailsIsLoading,
    // userDetailsData,
    // userDetailsIsSuccess,
    // userDetailsIsError,
    masterLoading,
    masterData,
    masterSuccess,
    masterError,
    accLoading,
    accData,
    accSuccess,
    accError,
    walletIsLoading,
    walletData,
    walletIsSuccess,
    walletIsError,
    // propStatLoading,
    // propStatData,
    // propStatSuccess,
    // propStatError,
    // consumptionLoading,
    // consumptionData,
    // consumptionSuccess,
    // consumptionError
  } = useSelector((state) => ({
    // userDetailsIsLoading: state.userDetails.userDetailsIsLoading,
    // userDetailsData: state.userDetails.userDetailsData,
    // userDetailsIsSuccess: state.userDetails.userDetailsIsSuccess,
    // userDetailsIsError: state.userDetails.userDetailsIsError,
    masterLoading: state.dashboardData.masterLoading,
    masterData: state.dashboardData.masterData,
    masterSuccess: state.dashboardData.masterSuccess,
    masterError: state.dashboardData.masterError,
    accLoading: state.accountData.accLoading,
    accData: state.accountData.accData,
    accSuccess: state.accountData.accSuccess,
    accError: state.accountData.accError,
    walletIsLoading: state.userDetails.walletIsLoading,
    walletData: state.userDetails.walletData,
    walletIsSuccess: state.userDetails.walletIsSuccess,
    walletIsError: state.userDetails.walletIsError,
    // propStatLoading: state.dashboardData.propStatLoading,
    // propStatData: state.dashboardData.propStatData,
    // propStatSuccess: state.dashboardData.propStatSuccess,
    // propStatError: state.dashboardData.propStatError,
    // consumptionLoading: state.dashboardData.consumptionLoading,
    // consumptionData: state.dashboardData.consumptionData,
    // consumptionSuccess: state.dashboardData.consumptionSuccess,
    // consumptionError: state.dashboardData.consumptionError,
  }));

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPropertyName, setSelectedPropertyName] = useState(null);

  

  const onpress = () => {
    navigation.navigate('topUp', {value: selectedProperty,name:selectedPropertyName });

    // return console.log('topup page');
          // navigation.navigate('topUp');

  };
  const processCancel = () => {
    // navigation.navigate('properties');
  navigation.navigate('transaction')
  };
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const swiperRef = React.createRef();
  // const swiperRefPro = React.createRef();
  const [noMasterDataFound, setNoMasterDataFound] = useState(false);

  const handleNextPro = () => {
    if (swiperRefPro.current.state.index < (masterData.length-1) && swiperRefPro.current) {
      swiperRefPro.current.scrollBy(1, true); 
    }
  };
  
  const handlePrevPro = () => {
    if (swiperRefPro.current.state.index > 0 && swiperRefPro.current) {
      swiperRefPro.current.scrollBy(-1, true); 
    }
  };
  console.log(accData?.rececntTransactions);

  useEffect(() => {
    if(masterData.length == 0 && masterLoading === false){
      setNoMasterDataFound(true);
    }else if(masterData.length > 0){
      getMasterData(masterData[0].propertyId);
      // console.log(masterData[0].propertyId,"masterData[0].propertyId");
      const initialPropertyId = masterData[0]?.propertyId;
      const initialPropertyName = masterData[0]?.propertyName;
   
      setSelectedProperty(initialPropertyId);
      setSelectedPropertyName(initialPropertyName)
      setNoMasterDataFound(false);
    }else {
      setNoMasterDataFound(false);
    }
    
  }, [masterData, masterError, masterSuccess]);
  console.log(selectedProperty,"=============Account========================",selectedPropertyName);

  const [currentIndex, setCurrentIndex] = useState(0);

    const handlePropertyChanged = (index) => {

      if(index >= 0 && index < masterData.length){
        setSelectedProperty(masterData[index].propertyId);
        setSelectedPropertyName(masterData[index].propertyName)
        getMasterData(masterData[index].propertyId);
        setCurrentIndex(currentIndex);
      }
  };
  const getMasterData = async (propertyId) => {
    console.log(currentIndex, "===============================prop id=", masterData[index].propertyId);
    dispatch(getAccHistory({ "propertyId": propertyId }));
    console.log(currentIndex, "===============================accData=", accData);
  }
console.log( accData?.accountHistory?.seriesLineData," accData?.accountHistory?.seriesLineData");
  // Assuming accData is your data object containing account history data
// Make sure to replace accData?.accountHistory?.xAxisdata and accData?.accountHistory?.seriesLineData with actual data sources

const formatYLabel = (value) => {
  return `R ${Math.round(value)}`; // Format label with a dollar sign
  // Example: Converts 2000 to "$2000"
};

const LineChartData = {
  labels: accData?.accountHistory?.xAxisdata || [],
  datasets: [
    {
      data: accData?.accountHistory?.seriesLineData.map(value => Math.round(value / 1000)) || [],
      color: (opacity = 1) => `rgba(0,0,0,${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
};



  const chartConfig = {
    backgroundGradientFrom: '#333867', // Black
    backgroundGradientFromOpacity: 1, // 50% opacity
    backgroundGradientTo: '#17193b', // Light grayish-blue
    backgroundGradientToOpacity: 0.8, // 50% opacity
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for text with full opacity
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for labels with full opacity
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLOR_LIST.SCREEN_BG,

      }}>
      <BackNavigation
        title={'My Accounts'}
        screenName={'dashBoard'}
        isRightIcon={true}
      />
   { masterData.length > 0 && noMasterDataFound === false ? 
    (
      <ScrollView style={{ flex: 1, }}>
      <View style={{ flexDirection: 'row', marginTop:20 }}>
      <View style={{backgroundColor:COLOR_LIST.BRIGHT_BG, padding:10,
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
           flexDirection: 'row', alignSelf: 'center',alignItems:'center', marginHorizontal:70}}>
              
              <View style={{ marginLeft: 12 }}>
              <Text
                  style={{
                    width: 150,
                    fontFamily: 'Catamaran-Regular', 
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#9095A1FF',
                  }}>
                  {/* {props.mobile} */}
                  Wallet Balance
                </Text>
                <Text
                  style={{
                    fontSize: getFontSize(walletData?.balance?.toString(), 32, 0.5),
                    fontWeight: 700,
                    color: '#171A1FFF',
                  }}>
                    R {walletData?.balance || 0}
                  {/* {userDetailsData.firstName} {userDetailsData.lastName} */}
      {/* {props.userName} */}
                </Text>
              </View>
              <Image source={walletIcon} style={{tintColor:COLOR_LIST.WALLET_BG,height: 40, width: 40}} />
            </View>
            </View>
        <View style={{ marginVertical: 22, marginHorizontal: 27}}>



          <View style={{ marginTop:15, backgroundColor: COLOR_LIST.DARK_CARD_BG, flex:1,  borderRadius: 20 }}>
              <View style={{justifyContent:'space-around',flexDirection:'row',paddingHorizontal:20}}>
            <View style={{ marginVertical: 12, flex:1,flexDirection:'column' }}>
            <Text style={{ fontFamily: 'Catamaran-Bold', fontSize: 15, fontWeight: '400', lineHeight: 20, color: '#FFFFFFFF' }}>
              Account Balance:
            </Text>
              {
                accData && !accLoading ? (
                  <Text
                      style={{fontWeight:700, fontSize: getFontSize(accData?.accountBalance?.toFixed(2).toString(), 25, 0.7), color: accData.accountBalance > 0 ? COLOR_LIST.WALLET_POSITIVE : COLOR_LIST.WALLET_NEGATIVE, alignContent:'flex-start', marginTop:10}}>
                      R {accData.accountBalance?.toFixed(2)}
                      {/* R {(9999999).toFixed(2)} */}

                      
</Text>
                ):(
                  <Text
                      style={{ fontFamily: 'Catamaran-Bold', fontSize: 30, color: '#1DD75BFF', marginTop:20 }}>
                Loading...
              </Text>
                )
              }
            </View>
            <View style={{ alignItems: 'flex-end', marginVertical: 12 }}>
            {accData?.rececntTransactions?.length > 0 ? (
   <View>
   <Text style={styles.text}>Last Topup: R {accData?.rececntTransactions?.[0].amount}</Text>
   <Text style={styles.text}>on: {new Date(accData.rececntTransactions[0].transactionDate).toLocaleDateString()}</Text>
 </View>
) : (
 null
)}

              <TouchableOpacity onPress={onpress}>
                <View
                  style={{
                    width: 114,
                    borderColor: '#FFFFFFFF',
                    borderWidth: 2,
                    marginVertical: 7,
                    backgroundColor: '#FFFFFFFF',
                    borderRadius:10,
                    height: 36,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: 'center',
                      
                      fontWeight: '400',
                      lineHeight: 30,
                      color: '#323743FF',
                    }}>
                    TOPUP
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            </View>
            <View style={{ flex: 0.03, justifyContent: 'flex-end', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, borderColor: COLOR_LIST.PRIMARY,borderWidth:3, marginHorizontal:6,backgroundColor:COLOR_LIST.PRIMARY }}></View>

          </View>
          

          {/* <View>
            <Text
              style={{
                height: 0,
                marginHorizontal: 15,
                borderColor: '#EC3237FF',
                borderStyle: 'solid',
                borderBottomWidth: 6,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
              }}></Text>
          </View> */}
          {/* <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
            }}>
            <SandtoneHome />
          </View> */}
          {/* _______________ Property Selection View_______________ */}
          <View key={index} style={{ marginTop: 10, flexDirection: 'row', marginHorizontal: 20, alignItems: 'center' }}>

<TouchableOpacity onPress={handlePrevPro} style={{}}>
<Image style={{ width: 30, height: 30 }} source={dashLeft} />
</TouchableOpacity>
<Swiper
style={{ height: 110 }}
ref={swiperRefPro}
loop={false}
showsPagination={false}
onIndexChanged={handlePropertyChanged}
>
{masterData.map((item, index) => {
return (

<View style={{ flex: 1 }} key={item.unitNumber}>
<View style={{
justifyContent: 'center',
alignItems: 'center',
marginHorizontal: 10,
marginVertical: 15,
height: 70,
borderRadius: 35,
flex:1,
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
<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',flex:1 }}>
<View style={{flex:0.15}}>
  <Image source={Home} style={{ width: 28, height: 32 }} />
</View>
<View style={{ flex:0.7,marginVertical: 3 }}>
  <Text numberOfLines={1} style={{ fontFamily: 'Catamaran-SemiThick', fontSize: 16, fontWeight: '400', color: '#171A1FFF' }}>{item.propertyName}</Text>
  <Text style={{ fontSize: 12, fontWeight: '400', color: '#171A1FFF', marginTop: 5 }}>Unit No: {item.unitNumber}</Text>
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
{/* _______________ Property Selection View_______________ */}
          {accData?.accountHistory?.xAxisdata &&  accData?.rececntTransactions && accSuccess === true && accLoading === false ? (<LineChart
            data={LineChartData}
            style={{marginVertical: 16,borderRadius:16, alignSelf:'center'}}
            width={getWidthByScreenSize(80)}
            height={220}
            chartConfig={chartConfig}
            // fromZero = {true}
            formatYLabel={formatYLabel} 
            yAxisSuffix='k   '
            yLabelsOffset={1}
          />) : null}

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <StatementButton title='GET STATEMENT' onClick={processCancel} imageIcon={BankStatement} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical:10,
              alignItems: 'center',
              // justifyContent: 'space-between',
              justifyContent:'center'
            }}>
              {accData?.rececntTransactions?.length > 0 ? (
                <Text
                style={[
                  styles.text,
                  { color: '#171A1FFF', lineHeight: 30, fontSize: 20,  fontWeight: '600'},
                ]}>
                Recent Topups
              </Text>
              ):(
                <Text
                style={[
                  styles.text,
                  { color: '#171A1FFF', lineHeight: 30, fontSize: 20,  fontWeight: '600'},
                ]}>
                No transaction data found
              </Text>
              )}
          
          </View>
          { accData?.accountHistory?.seriesLineData && accData?.rececntTransactions?.map((item, index) =>
          
          (
          <View
            style={{
              backgroundColor: '#FFFFFFFF',
              borderRadius: 4,
              marginVertical: 7,
              borderWidth: 1,
              borderColor: '#DEE1E6FF',
              borderStyle: 'solid',
              height: 74,
            }}>
            <View
              style={{
                marginHorizontal: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 16,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={arrowCircleDown}
                  style={{ width: 24, height: 24 }}
                />
                <View style={{ marginHorizontal: 10 }}>
                  <Text
                    style={[
                      styles.text,
                      { color: '#171A1FFF', lineHeight: 22, fontSize: 14 },
                    ]}>
                    {item.transactionId}
                  </Text>

                  <Text
                    style={[
                      styles.text,
                      { color: '#9095A1', fontWeight: '400' },
                    ]}>
                    {item.transactionType}
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={[
                    styles.text,
                    { 
                      color: 'black', 
                      lineHeight: 22, 
                      fontSize: 14, 
                      backgroundColor: 'lightgray',
                      borderRadius:6,paddingHorizontal:10 // Changed to light gray
                    },
                  ]}>
                  R {item.amount.toFixed(2)}
                </Text>
                <Text
                  style={[
                    styles.text,
                    { color: '#9095A1', fontSize:10, fontWeight: '400', textAlign: 'right' },
                  ]}>
                  {/* {moment(item.transactionDate).fromNow()}
                  {item.transactionDate} */}
                  {moment(item.transactionDate).fromNow()}

                </Text>
              </View>
             
            </View>
          </View>
          ))}
        </View>
      </ScrollView>
      ) : noMasterDataFound === true ? (<ScrollView style={{ flex: 1, }}>
              <View style={styles.container}>
              <View style={{ flex: 1, paddingTop:'40%', alignItems: 'center', justifyContent: 'flex-end', marginHorizontal:28}}>
              <Text style={{ fontSize: 18, color: 'black' }}>{"Welcome to Ontec Home"}</Text>
                <Image
                    source={noProperty}
                    style={{ width: 350, height: 180, alignSelf: 'center', justifyContent: 'center' }}
                    resizeMode="contain"
                />
                <Text style={{ fontSize: 32, color: 'black', marginBottom:20 }}>{screenWidth}{"No properties found."}</Text>
                <Text style={{ fontSize: 12, color: 'black' }}>{"Get started by "}
                </Text>
                <Pressable
                onPress={() => {
                  navigation.navigate('addProperties', {isUpdate: false});
                }}>
                <Text style={{ fontSize: 18, color: 'red', marginTop:10 }}>
                Adding New Property +
                </Text>
              </Pressable>
              
            </View>
        </View>
          </ScrollView>) : (<ScrollView
          style={styles.container}>
          <View style={{marginTop:'50%'}}>
          <Text style={{fontSize:28, alignSelf:'center', color:'red', justifyContent:'center'}}>Please wait!</Text>
            <Text style={{fontSize:12, alignSelf:'center', color:'black', justifyContent:'center'}}>Loading Your Data...</Text>
          </View>
        </ScrollView>)}
        <Bottom currentPage={'Accounts'}/>
    </SafeAreaView>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 20,
    color: '#FFFFFFFF',
    fontFamily: 'Catamaran-Bold',
  },
  textStyle: {
    fontFamily: 'Catamaran-Regular',
    fontWeight: '700',
    color: '#FFFFFFFF',
  },
});

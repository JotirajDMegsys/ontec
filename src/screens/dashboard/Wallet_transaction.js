import React,{useState, useEffect} from 'react';
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
import { useNavigation } from '@react-navigation/native';
import BackNavigation from '../../components/backNavigation';
import {getAccHistory} from '../../redux/slice/getAccountDetails'
import Bottom from '../../components/Bottom';
import { BarChart } from 'react-native-chart-kit';

import {useDispatch, useSelector} from 'react-redux';
import walletIcon from '../../assets/dashboard/walletIcon.png'
import noProperty from '../../assets/dashboard/noProperty.png';
// import FusionCharts from 'react-native-fusioncharts';


import arrowCircleDown from '../../assets/accounts/ArrowCircleDownRight.png';
import { COLOR_LIST } from '../../helpers/colorlist';
import { getFontSize, getWidthByScreenSize } from '../../helpers/commonFunction';
import moment from 'moment';
import { getTransactionList } from '../../redux/slice/getTransactionHistory';

const Wallet_transaction = () => {
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
    userDetailsData,
    transationListIsLoading,
  transationListData,
  transationListIsSuccess,
  transationListIsError,

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
    userDetailsData: state.userDetails.userDetailsData,

    accData: state.accountData.accData,
    accSuccess: state.accountData.accSuccess,
    accError: state.accountData.accError,
    walletIsLoading: state.userDetails.walletIsLoading,
    walletData: state.userDetails.walletData,
    walletIsSuccess: state.userDetails.walletIsSuccess,
    walletIsError: state.userDetails.walletIsError,
    transationListIsLoading: state.transationList.transationListIsLoading,
    transationListData: state.transationList.transationListData,
    transationListIsSuccess: state.transationList.transationListIsSuccess,
    transationListIsError: state.transationList.transationListIsError,
    // propStatLoading: state.dashboardData.propStatLoading,
    // propStatData: state.dashboardData.propStatData,
    // propStatSuccess: state.dashboardData.propStatSuccess,
    // propStatError: state.dashboardData.propStatError,
    // consumptionLoading: state.dashboardData.consumptionLoading,
    // consumptionData: state.dashboardData.consumptionData,
    // consumptionSuccess: state.dashboardData.consumptionSuccess,
    // consumptionError: state.dashboardData.consumptionError,
  }));
console.log("walldata",    userDetailsData,
);


// const {
//   transationListIsLoading,
//   transationListData,
//   transationListIsSuccess,
//   transationListIsError,
// } = useSelector(state => ({
//   transationListIsLoading: state.transationListList.transationListIsLoading,
//   transationListData: state.transationListList.transationListData,
//   transationListIsSuccess: state.transationListList.transationListIsSuccess,
//   transationListIsError: state.transationListList.transationListIsError,
// }));


// const [data, setData] = useState({
//   labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
//   datasets: [
//     {
//       data: [80, 45, 28, 80, 99, 43],
//     },
//   ],
// });



// const handleBarPress = index => {
//   console.log(index-1);
//   let i = index;
  
//   if (i === 0) {
//     i = 0;
//   } else {
//     i = index - 1;
//   }
  
  
//   const newDatasets = [...data.datasets];
//   const newDataArray = [...newDatasets[0].data];
//   newDataArray[i] = Math.random() * 100; 

//   newDatasets[0].data = newDataArray;

  
//   setData({
//     ...data,
//     datasets: newDatasets,
//   });
// };


// console.log(data);

   




  console.log(transationListData);

  const onpress = () => {
    // return console.log('topup page');
          navigation.navigate('topUp');

  };
  const processCancel = () => {
    // navigation.navigate('properties');
  navigation.navigate('transaction')
  };
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const swiperRef = React.createRef();
  const swiperRefPro = React.createRef();
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

  useEffect(() => {
    if(masterData.length == 0 && masterLoading === false){
      setNoMasterDataFound(true);
    }else if(masterData.length > 0){
      getMasterData(masterData[0].propertyId);
      setNoMasterDataFound(false);
    }else {
      setNoMasterDataFound(false);
    }
    
  }, [masterData, masterError, masterSuccess]);

  const [currentIndex, setCurrentIndex] = useState(0);

    const handlePropertyChanged = (index) => {
      if(index >= 0 && index < masterData.length){
        getMasterData(masterData[index].propertyId);
        setCurrentIndex(currentIndex);
      }
  };
  const getMasterData = async (propertyId) => {
    console.log(currentIndex, "===============================prop id=", masterData[index].propertyId);
    dispatch(getAccHistory({ "propertyId": propertyId }));
    console.log(currentIndex, "===============================accData=", accData);
  }




  useEffect(() => {
    onCLickUserDetails();
    
    console.log("use effect: ");
  }, []);

  const onCLickUserDetails = async () => {
    let dataObj = { userId: userDetailsData?.id };
    console.log(dataObj, "dataobj");
  
    dispatch(getTransactionList(dataObj));
    console.log(dataObj);
  };


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLOR_LIST.SCREEN_BG,

      }}>
      <BackNavigation
        title={'Wallet History'}
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
        flexDirection: 'row', alignSelf: 'center',alignItems:'center', marginHorizontal: '20%'}}>
              
              <View style={{ marginLeft: 12 }}>
              <Text
                  style={{
                    width: 150,
                    fontFamily: 'Catamaran-Regular',
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#9095A1FF',
                  }}>
                  Wallet Balance
                </Text>
                <Text
                  style={{
                    fontSize: getFontSize(walletData?.balance?.toString(), 32, 0.5),
                    fontWeight: 700,
                    color: '#171A1FFF',
                  }}>
                    R {walletData?.balance || 0}
                
                </Text>
              </View>
              <Image source={walletIcon} style={{tintColor:COLOR_LIST.WALLET_BG,height: 40, width: 40}} />
            </View>
            </View>
        <View style={{ marginVertical: 22, marginHorizontal: 27 }}>
         
      

{transationListIsSuccess === true &&
 transationListIsLoading === false ? (
  transationListData?.length > 0 ? (
    <View>
      {transationListData?.slice().reverse().map((item, index) => {
        console.log(item);
        return (
          <TouchableOpacity
            key={index}
            // onPress={() => handleTransactionClick(index)}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 4,
              marginVertical: 7,
              borderWidth: 1,
              borderColor: '#DEE1E6',
              borderStyle: 'solid',
              minHeight: 74,
            }}
          >
            <View
              style={{
                marginHorizontal: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{flexDirection: 'column', marginVertical: 20}}>
                <View style={{marginHorizontal: 2, flexDirection: 'row'}}>
                  <Text
                    style={[
                      styles.text,
                      {
                        color: '#171A1FFF',
                        lineHeight: 18,
                        fontSize: 14,
                        fontWeight: '600',
                        fontFamily: 'Catamaran-Bold',
                      },
                    ]}
                  >
                   Type :
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        lineHeight: 18,
                        fontSize: 14,
                        paddingLeft: 2,
                        fontWeight: '600',
                        fontFamily: 'Catamaran-SemiBold',
                        color: '#171A1FFF',
                      },
                    ]}
                  >
                    {item.transactionType}
                  </Text>
                </View>
                <View style={{marginHorizontal: 2, flexDirection: 'row', marginVertical:5}}>
                  <Text
                    style={[
                      styles.text,
                      {
                        color: '#171A1FFF',
                        lineHeight: 18,
                        fontSize: 14,
                        fontWeight: '600',
                        fontFamily: 'Catamaran-Bold',
                      },
                    ]}
                  >
                 Amount :
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        lineHeight: 18,
                        fontSize: 14,
                        paddingLeft: 2,
                        fontWeight: '600',
                        fontFamily: 'Catamaran-semiBold',
                        color: '#171A1FFF',
                      },
                    ]}
                  >
                    R {item.transactionAmount}
                  </Text>
                </View>
              </View>
              <View style={{marginVertical: 10}}>
                <Text
                  style={[
                    styles.text,
                    {
                      color: '#000',
                      lineHeight: 22,
                      fontSize: 14,
                      fontFamily: 'Catamaran-Bold',
                      textAlign: 'right',
                      marginTop: 2,
                    },
                  ]}
                >
                  {item.transactionDate}
                </Text>
                {/* <View style={{marginTop: 5}}>
                  <Text
                    style={[
                      styles.text,
                      {
                        color: '#9095A1FF',
                        fontWeight: '400',
                        textAlign: 'right',
                        fontFamily: '#171A1FFF',
                        alignSelf: 'flex-start',
                      },
                    ]}
                  >
                    Remark:
                  </Text>
                </View> */}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  ) : (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 0.2,
        marginVertical: 50,
      }}
    >
      <Text style={styles.textStyle}>
        No Wallet History
      </Text>
    </View>
  )
) : (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      flex: 0.2,
      marginVertical: 50,
    }}
  >
    <Text style={styles.textStyle}>
      Loading transactions...
    </Text>
  </View>
)}

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
                <Text style={{ fontSize: 32, color: 'black', marginBottom:20 }}>{}{"No properties found."}</Text>
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

export default Wallet_transaction;

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
    color: 'black',
  },

  container: {
    flex: 1,
    padding: 10
},
header: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10
},
chartContainer: {
    height: 400,
    borderColor: '#000',
    borderWidth: 1
}
});
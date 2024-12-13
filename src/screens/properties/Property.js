import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  RefreshControl,
  ScrollView
} from 'react-native';
import Card from '../../utils/Card';
import Shimmer from '../../utils/Shimmer';
import Bottom from '../../components/Bottom';
import BackNavigation from '../../components/backNavigation';
import {resetAddPropertyState} from '../../redux/slice/addProperty';
import {getAllProperty} from '../../redux/slice/getAllProperty';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COMPANY_ID} from '../../helpers/enum';
import Spinner from 'react-native-loading-spinner-overlay';
import {useFocusEffect} from '@react-navigation/native';
import nodata from '../../assets/noData.png';
import { COLOR_LIST } from '../../helpers/colorlist';
const Property = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    getPropertiesIsLoading,
    getPropertiesData,
    getPropertiesIsSuccess,
    getPropertiesIsError,
    getPropertiesDataCount,
  } = useSelector(state => ({
    getPropertiesIsLoading: state.getProperties.getPropertiesIsLoading,
    getPropertiesData: state.getProperties.getPropertiesData,
    getPropertiesIsSuccess: state.getProperties.getPropertiesIsSuccess,
    getPropertiesIsError: state.getProperties.getPropertiesIsError,
    getPropertiesDataCount: state.getProperties.getPropertiesDataCount,
  }));

  //('getPropertiesDataCount', getPropertiesData);

  //('property', getPropertiesData);
  //*state
  const [propertyList, setPropertyList] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [noDataFound, setNoDataFound] = useState(false);
  const [propertyAdded, setPropertyAdded] = useState(false); // State to track if a new property has been added
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setNoDataFound(false);
    setRefreshing(true);
    // Simulate a refresh action (e.g., fetch new data)
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a 2-second refresh process
  };
  useFocusEffect(
    React.useCallback(() => {
      if (propertyAdded) {
        getProperties();
        setPropertyAdded(false);
      } else {
        getProperties();
      }
    }, [propertyAdded]),
  );
  // useEffect(() => {
  //   getProperties();
  // }, [getProperties]);

  useEffect(() => {
    setNoDataFound(false);
    if (getPropertiesData && getPropertiesIsSuccess) {
      if (getPropertiesData.length > 0) {
        setSpinner(false);
        setPropertyList(getPropertiesData);
        setNoDataFound(false);
      } else {
        setSpinner(false);
        setPropertyList([]);
        setNoDataFound(true);
      }
      setSpinner(false);
    }
  }, [getPropertiesData, getPropertiesIsSuccess]);

  const getProperties = async () => {
    setPropertyList([]);
    setSpinner(true);
    let userId = await AsyncStorage.getItem('userId');

    // //(userId);
    let dataObj = {
      userId: userId,
      companyId: COMPANY_ID,
    };
    
    //(dataObj);
    dispatch(getAllProperty(dataObj));
  };

  //(propertyList,"propertyLidtss");
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLOR_LIST.SCREEN_BG}}>
      <BackNavigation
        title={'My Properties'}
        screenName={'dashBoard'}
        isRightIcon={true}
        backgroundColor={'#F8F9FA00'}
      />

      <View style={{flex: 1, marginHorizontal: 22}}>
        {/* <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          customIndicator={<View style={{}} />}
          animation="fade"
        /> */}
        <Spinner
                           visible={spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 18,
          }}>
          {/* <Spinner
            visible={spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
            style={{}}
          /> */}

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: 'Catamaran-Bold',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: '700',
                  lineHeight: 26,
                  color: '#171A1FFF',
                }}>
                {getPropertiesDataCount ? getPropertiesDataCount : 0}
                {' Properties'}
              </Text>
            </View>
            <View
              style={{
                marginright: 20,
                height: 36,
                paddingLeft: 12,
                paddingRight: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Pressable
                onPress={() => {
                  dispatch(resetAddPropertyState());
                  //*-------- 11/03/2024----------*//
                  navigation.navigate('addProperties', {isUpdate: false});
                  //*-------- 11/03/2024----------*//
                  // dispatch(resetAddPropertyState());
                  setPropertyAdded(true);

                  // navigation.navigate('addProperties')
                }}>
                <Text
                  style={{
                    color: '#EC3237FF',
                    fontFamily: 'Catamaran-Regular',
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 22,
                  }}>
                  Add New Property +
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        {propertyList && propertyList.length > 0 ? (
          <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#007BFF']} // Customize the loading spinner color
              tintColor="#007BFF" // Customize the loading spinner color (Android)
            />
          }
        >
          <FlatList
            data={propertyList}
            renderItem={({item}) => (
              <View style={{marginVertical: 10}}>
                <Card itemData={item} />
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </ScrollView>
          
        ) : noDataFound ? (
          <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#007BFF']} // Customize the loading spinner color
              tintColor="#007BFF" // Customize the loading spinner color (Android)
            />
          }
        >
          <View style={{marginTop:20}}>
            <Text style={{fontSize:20, alignSelf:'center', color:'red', justifyContent:'center'}}>No property found!</Text>
          </View>
        </ScrollView>
          
        ) : (
          <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#007BFF']} // Customize the loading spinner color
              tintColor="#007BFF" // Customize the loading spinner color (Android)
            />
          }
        >
          <View style={styles.component}>
          <Shimmer />
        </View>
        <View style={styles.component}>
        <Shimmer />
      </View>
      </ScrollView>
        )}
        {/* <FlatList
          data={propertyList}
          
          renderItem={({ item }) => {
            return (
              <View style={{ marginVertical: 10, }} >
                <Card
                  itemData={item}
                />
              </View>
            )
          }}
          keyExtractor={item => item.id}
        /> */}
      </View>
      <View style={{marginBottom: 0}}>
        <Bottom currentPage={'Properties'}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default Property;

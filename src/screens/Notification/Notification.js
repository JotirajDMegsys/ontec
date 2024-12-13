import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import Bottom from '../../components/Bottom';
import BackNavigation from '../../components/backNavigation';
import { useDispatch,useSelector } from 'react-redux';
import { getNotifications, deleteNotification, resetdeleteNotificationData } from '../../redux/slice/getnotifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast, useToast} from 'react-native-toast-notifications';

const Notification = () => {
  const dispatch = useDispatch();
  const initialLinesToShow = 2;
  const [expandedItems, setExpandedItems] = useState([]); 
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a 2-second refresh process
  };
  
  //Initialize the state


  // notifiocationIsLoading: false,
  // notifiocationData: [],
  // notifiocationIsSuccess: false,
  // notifiocationIsError: false,
  const {
    notificationIsLoading,
    notificationData,
    notificationCount,
    notificationIsSuccess,
    notificationIsError,
    deleteNotificationIsLoading,
    deleteNotificationData,
    deleteNotificationIsSuccess,
    deleteNotificationIsError
  }=useSelector(state=>({
    notificationIsLoading: state.notificationList.notificationIsLoading,
    notificationData:state.notificationList.notificationData,
    notificationCount:state.notificationList.notificationCount,
    notificationIsSuccess: state.notificationList.notificationIsSuccess,
    notificationIsError: state.notificationList.notificationIsError,
    deleteNotificationIsLoading: state.notificationList.deleteNotificationIsLoading,
    deleteNotificationData:state.notificationList.deleteNotificationData,
    deleteNotificationIsSuccess: state.notificationList.deleteNotificationIsSuccess,
    deleteNotificationIsError: state.notificationList.deleteNotificationIsError,
  }))

console.log("peiperiwptpieprpi---------------------------p",notificationData);
  // useEffect(() => {
  //       getAllNotifications();
  //     }, []);

      // useEffect(() => {
      //   if(deleteNotificationData){
      //     //getAllNotifications();
      //   }
      //   console.log("notificationDatanotificationData", notificationData);
      // }, [notificationData, deleteNotificationData]);

      useEffect(() => {
        if (deleteNotificationData && deleteNotificationIsSuccess === true && deleteNotificationIsError===false )
        
           Toast.show(deleteNotificationData, {
      type: 'success',
      placement: 'top',
      duration: 3000,
      offset: 30,
      animationType: 'slide-in',
  });
    dispatch(resetdeleteNotificationData());
    getAllNotifications();

    return;
      }, [deleteNotificationData, deleteNotificationData,deleteNotificationIsError]);
    
const getAllNotifications = async () => {
  let userId = await AsyncStorage.getItem('userId');
  let connectionId = await AsyncStorage.getItem('connectionId');

  let dataObj = {
    userId:userId,
    connectionId:connectionId,
    isShortView:false
  };
  dispatch(getNotifications(dataObj));
};

  const [data, setData] = useState([
      {
      id: 1,
      title: 'Top done!',
      min: '2 min',
      message: 'Your account has been debited with R20 against electricity utinization from sandtone home property. Your account has been debited with R20 against electricity utinization from sandtone home property.',
    },
    {
      id: 2,
      title: 'Top done!',
      min: '2 min',
      message: 'Your account has been debited with R20 against electricity utinization from sandtone home property. Your account has been debited with R20 against electricity utinization from sandtone home property.',
    },

    {
          id:3,
          title:'hasih done!',
          min:'2 min',
          message:'Your account has been debited with R20 against electricity utinization from sandtone home  '
      },
      {
        id:4,
        title:'Top done!',
        min:'2 min',
        message:'Your account has been debited with R20 agains '
    },
    {
        id:5,
        title:'Top done!',
        min:'2 min',
        message:'Your account has been debited with R20 against property. '
    },
    {
        id:6,
        title:'hasih done!',
        min:'2 min',
        message:'Your account has been deroperty. '
    },

  ]);

  const toggleExpand = (itemId) => {
    setExpandedItems((prevExpandedItems) => {
      if (prevExpandedItems.includes(itemId)) {
        return prevExpandedItems.filter((id) => id !== itemId);
      } else {
        return [...prevExpandedItems, itemId];
      }
    });lo
  };

  

 

  const renderRightActions = (progress, dragX, itemId) => {
    const handleDelete = () => {
  
      let dataObj = {
        ids:[itemId]
      };
      dispatch(deleteNotification(dataObj));
      // getAllNotifications();
      // const updatedData = notificationData.filter((item) => item.id !== itemId);
      // setData(updatedData);
    };

    return (
      <TouchableOpacity onPress={handleDelete}>
        <View style={styles.deleteButton}>
          <Text style={{ color: 'black', paddingVertical: 25, paddingHorizontal:25 }}>Delete</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedItems.includes(item.id);
    const showButton = item.description.length > 100;
    const totalLines = item.description.split('\n').length; // Assuming lines are separated by newline character
  
    // Conditionally enable swipe only if item.isRead is false
    return item.isRead === false ? (
      <Swipeable
        renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}
      >
        <View style={styles.container} key={item.id}>
          <View style={styles.textBox}>
            <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 18, color: '#323743FF' }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 11, fontWeight: '400', lineHeight: 18, color: '#6F7787FF' }}>
              {item.timeAgo}
            </Text>
          </View>
          <Text
            style={{
              textAlign: 'left',
              marginHorizontal: 20,
              marginTop: 7,
              color: '#6F7787',
              fontFamily: 'Catamaran-Regular',
            }}
            numberOfLines={isExpanded ? undefined : initialLinesToShow}
          >
            {item.description}
          </Text>
          {showButton && totalLines > initialLinesToShow ? (
            <TouchableOpacity onPress={() => toggleExpand(item.id)}>
              <Text style={{ fontFamily: 'Catamaran-SemiBold', marginHorizontal: 20, color: 'black' }}>
                {isExpanded ? 'Show Less' : 'Show More'}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </Swipeable>
    ) : (
      <View style={styles.container} key={item.id}>
        <View style={styles.textBox}>
          <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 18, color: '#323743FF' }}>
            {item.title}
          </Text>
          <Text style={{ fontSize: 11, fontWeight: '400', lineHeight: 18, color: '#6F7787FF' }}>
            {item.timeAgo}
          </Text>
        </View>
        <Text
          style={{
            textAlign: 'left',
            marginHorizontal: 20,
            marginTop: 7,
            color: '#6F7787',
            fontFamily: 'Catamaran-Regular',
          }}
          numberOfLines={isExpanded ? undefined : initialLinesToShow}
        >
          {item.description}
        </Text>
        {showButton && totalLines > initialLinesToShow ? (
          <TouchableOpacity onPress={() => toggleExpand(item.id)}>
            <Text style={{ fontFamily: 'Catamaran-SemiBold', marginHorizontal: 20, color: 'black' }}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  

  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFFFF', flex: 1 }}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={['#007BFF']} // Customize the loading spinner color
        tintColor="#007BFF" // Customize the loading spinner color (Android)
      />
    }
    >
      <BackNavigation title={'Notification'} screenName={'dashBoard'} isRightIcon={true} />
      
      {notificationData?.length > 0 ? (
        <View style={{ flex: 1, marginHorizontal: 20,marginTop:20 }}>
          <FlatList
            data={notificationData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={{ marginBottom: 30 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (

        
        <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: 'center' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={{ flex: 1, }}>
                
        {notificationData?.length >= 0 ?

                
              (<View style={{ flex: 1, justifyContent: 'center', paddingTop:25, alignItems: 'center', }}>
              <Text
                  style={{ fontFamily: 'Catamaran-Bold', fontSize: 24, color: 'black' }}>
                  No Data Found
                </Text>
                
              </View>):           (<View style={{ flex: 1, justifyContent: 'center', paddingTop:25, alignItems: 'center', }}>
                <Text
                    style={{ fontFamily: 'Catamaran-Bold', fontSize: 24, color: 'black' }}>
                    Loading...
                  </Text>
                  <Text style={{ fontFamily: 'Catamaran-Regular', fontSize: 14, fontWeight: '400', color: 'black', }}>
                    Please wait
                  </Text>
                </View>
                
              )}

              </View>
          </ScrollView>
      )}
      
      <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Bottom />
      </View>
      
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: '#FAFAFBFF',
    marginBottom: 16,
    paddingVertical: 17,
  },
  textBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  deleteButton: {
    backgroundColor:'red',
    flex:0.8
  },
 
});
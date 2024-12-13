import { Image } from '@rneui/base';
// import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import PropertyIcon from '../assets/bottomIcons/House.png';
import PropertyIconActive from '../assets/bottomIcons/PropertyActive.png';
import AccoutsIcon from '../assets/bottomIcons/Payments.png';
import AccoutsIconActive from '../assets/bottomIcons/PaymentsActive.png';
import TransactionIcon from '../assets/bottomIcons/Transaction.png';
import TransactionIconActive from '../assets/bottomIcons/TransactionActive.png';
import ProfileIcon from '../assets/bottomIcons/UserCircle.png';
import ProfileIconActive from '../assets/bottomIcons/ProfileActive.png';
import DashbordIcon from '../assets/bottomIcons/Dashboard.png';
import DashbordIconActive from '../assets/bottomIcons/Squares.png';
import React, { useState } from 'react';
import { COLOR_LIST } from '../helpers/colorlist';

const Bottom = ({currentPage}) => {
  
  const navigation = useNavigation(); 
  const [activePage] = useState(currentPage);
  const handlePress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View
      style={{ 
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        alignItems:'center',
        ...Platform.select({
          ios: {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
          },
          android: {
            shadowColor: '#000',
        shadowOffset: { width: 1, height: 20 },
        shadowOpacity:  0.4,
        shadowRadius: 10,
        elevation: 25,
          },
        }),
        // marginVertical:10
      }}>
    
      <TouchableHighlight onPress={() => handlePress('dashBoard')} underlayColor="transparent">
        <View style={styles.itemMainView}>
          <Image style={styles.iconStyle} source={activePage === 'Dashboard' ? DashbordIconActive: DashbordIcon} />
          <Text
            style={[styles.menuItem, activePage === 'Dashboard' && styles.activeMenuItem]}>
            Dashboard
          </Text>
        </View>
      </TouchableHighlight>

    
      <TouchableHighlight onPress={() => handlePress('accounts')} underlayColor="transparent">
        <View style={styles.itemMainView}>
          <Image style={styles.iconStyle} source={activePage === 'Accounts' ? AccoutsIconActive : AccoutsIcon} />
          <Text
            style={[styles.menuItem, activePage === 'Accounts' && styles.activeMenuItem]}>
            Accounts
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => handlePress('properties')} underlayColor="transparent">
        <View style={styles.itemMainView}>
          <Image style={styles.iconStyle} source={activePage === 'Properties' ? PropertyIconActive : PropertyIcon} />
          <Text
            style={[styles.menuItem, activePage === 'Properties' && styles.activeMenuItem]}>
            Properties
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => handlePress('transaction')} underlayColor="transparent">
        <View style={styles.itemMainView}>
          <Image style={styles.iconStyle} source={activePage === 'Transaction' ? TransactionIconActive : TransactionIcon} />
          <Text
            style={[styles.menuItem, activePage === 'Transaction' && styles.activeMenuItem]}>
            Transactions
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => handlePress('myProfile')} underlayColor="transparent">
        <View style={styles.itemMainView}>
          <Image style={styles.iconStyle} source={activePage === 'My Profile' ? ProfileIconActive : ProfileIcon} />
          <Text
            style={[styles.menuItem, activePage === 'My Profile' && styles.activeMenuItem]}>
            My Profile
          </Text>
        </View>
      </TouchableHighlight>
      

    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    width: "100%",
    marginTop: 20,
   
  },
  menuItem:{
    fontFamily: COLOR_LIST.FONT_REGULAR,
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 16,
    color:'#565D6D'

  },
  activeMenuItem: {
    color:'red'
  },
  itemMainView: {
    justifyContent : 'center',
    alignItems : 'center',
  },
  iconStyle: {
    width: 22, 
    height: 22
  },

});

export default Bottom;



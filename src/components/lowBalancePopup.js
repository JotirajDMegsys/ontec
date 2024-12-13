import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import {COLOR_LIST} from '../helpers/colorlist';
import {PopupButton} from './common';
import walletIcon from '../assets/dashboard/walletIcon.png';
import PopupIcon from '../assets/popupCheck.png';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LowBalancePrompt = ({visible, onPressTopUp}) => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(visible);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible(false);
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable
            onPress={() => setIsVisible(false)}
            style={{alignSelf: 'flex-end'}}>
            <Ionicons name="close" size={24} color="red" />
          </Pressable>
          <Image
            source={walletIcon}
            style={{
              width: 86,
              height: 86,
              marginTop: 5,
              tintColor: COLOR_LIST.PRIMARY,
            }}
          />
          <Text
            style={{
              marginTop: 10,
              fontFamily: 'Catamaran-semiBold' /* Body */,
              fontSize: 24,
              fontWeight: '500',
              lineHeight: 34,
              color: COLOR_LIST.PRIMARY,
            }}>
            You are out of balance!
          </Text>
          <Text
            style={{
              marginTop: 6,
              width: 308,
              height: 50,
              fontFamily: 'Catamaran-Thick' /* Body */,
              fontSize: 14,
              fontWeight: '400',
              lineHeight: 22,
              color: '#9095A1FF',
              textAlign: 'center',
            }}>
            Your account is out of balance. Please topup to continue
            uninterrupted service.
          </Text>
          <PopupButton
            title="TOPUP NOW"
            imageIcon={PopupIcon}
            iconStyle={{
              tintColor: 'white',
              width: 30,
              height: 30,
              marginTop: 10,
              marginRight: -10,
            }}
            onClick={() => {
              setIsVisible(false);
              navigation.navigate('topUp');
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLOR_LIST.BRIGHT_TEXT,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 350,
    // borderColor:'red',borderWidth:2
  },
  inputView: {
    width: 300,
    marginTop: 15,
  },
  input: {
    marginTop: 5,
  },
});

export default LowBalancePrompt;

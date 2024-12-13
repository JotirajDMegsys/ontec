import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BackNavigation from '../components/backNavigation';
import Check from '../assets/check.png';
import Remove from '../assets/remove.png';
import Bottom from '../components/Bottom';
import {TextInput} from 'react-native-paper';
import {CommonModal, UpdateButton} from '../components/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  changePassword,
  resetChangePassword,
  resetforgetPassword,
} from '../redux/slice/resetPassword';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import VectorIcon from 'react-native-vector-icons/Ionicons';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibles, setIsModalVisibles] = useState(false);
  const [isModalVisiblesForPass, setIsModalVisiblesForPass] = useState(false);


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleModalNewPssword = () => {
    setIsModalVisibles(!isModalVisibles);
  };
  const toggleModalForOldPass = () => {
    setIsModalVisiblesForPass(!isModalVisiblesForPass);
  };
  

  const passwordCriteria = [
    ' be at least 8 characters long  with a maximum length of 15 characters.',
    'contain both upper-case and lower-case letters,at least one number and one special character.',
  ];
  const dispatch = useDispatch();
  const toast = useToast();

  const navigation = useNavigation();

  const {
    changePasswordIsLoading,
    changePasswordIsSuccess,
    changePasswordIsError,
    changePasswordData,
  } = useSelector(state => ({
    changePasswordIsLoading: state.passwordReset.changePasswordIsLoading,
    changePasswordIsSuccess: state.passwordReset.changePasswordIsSuccess,
    changePasswordData: state.passwordReset.changePasswordData,
    changePasswordIsError: state.passwordReset.changePasswordIsError,
  }));

  useEffect(() => {
    validatePasswords();

    if (changePasswordIsError && changePasswordData?.errors) {
      const newPasswordErrors = changePasswordData.errors.NewPassword || [];
      const specificError = newPasswordErrors.find(
        error => error === 'The old and new password must be different.',
      );
      setNewPasswordError(specificError || '');

      setOldPasswordError(
        changePasswordData.errors.OldPassword
          ? changePasswordData.errors.OldPassword.join(', ')
          : '',
      );
      setConfirmPasswordError(
        changePasswordData.errors.ConfirmPassword
          ? changePasswordData.errors.ConfirmPassword.join(', ')
          : '',
      );
    } else {
      setOldPasswordError('');
      setNewPasswordError('');
      setConfirmPasswordError('');
    }
  }, [
    oldPassword,
    newPassword,
    confirmPassword,
    changePasswordData,
    changePasswordIsError,
  ]);

  useEffect(() => {
    if (changePasswordIsSuccess) {
      toast.show('Password Changed Successfully!', {
        type: 'success',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
      navigation.goBack();
      console.log('-=-=-=-=-=-=-=-=-');
    }
  }, [changePasswordIsSuccess, navigation]);

  useEffect(() => {
    return () => {
      setOldPasswordError('');
      setNewPasswordError('');
      setConfirmPasswordError('');
      dispatch(resetChangePassword());
    };
  }, []);

  const validatePasswords = () => {
    let valid = true;

    setOldPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');

    if (!oldPassword) {
      setOldPasswordError('Old password is required');
      valid = false;
    }
    if (!newPassword) {
      setNewPasswordError('New password is required');
      valid = false;
    } else {
      if (newPassword.length < 8) {
        setNewPasswordError('Password must be at least 8 characters long');
        valid = false;
      } else if (newPassword.length > 15) {
        setNewPasswordError('Password must be at most 15 characters long');
        valid = false;
      } else if (!/[A-Z]/.test(newPassword)) {
        setNewPasswordError(
          'Password must contain at least one uppercase letter',
        );
        valid = false;
      } else if (!/[0-9]/.test(newPassword)) {
        setNewPasswordError('Password must contain at least one number');
        valid = false;
      } else if (!/[!@#$%^&*()\-_+=~\\|\[\]{};:/?\.>]/.test(newPassword)) {
        setNewPasswordError(
          'Password must contain at least one special character (excluding spaces)',
        );
        valid = false;
      } else if (/\s/.test(newPassword)) {
        setNewPasswordError('Password must not contain spaces');
        valid = false;
      }
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm password is required');
      valid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    return valid;
  };

  const submitChangePassword = async () => {
    if (validatePasswords()) {
      let userId = await AsyncStorage.getItem('userId');
      let sessionKey = await AsyncStorage.getItem('sessionKey');
      let dataObj = {
        userId: userId,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
        sessionKey: sessionKey,
      };
      dispatch(changePassword(dataObj));
    }
  };

  const cancelProfile = () => {
    dispatch(resetChangePassword());

    setOldPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <BackNavigation
        value={'reset'}
        title={'Change Password'}
        isRightIcon={true}
        screenName={'dashBoard'}
      />
      <View style={{flex: 1}}>
        <ScrollView style={[styles.itemMainView]}>
          <View style={{flexDirection: 'column', marginVertical: 20}}>
            <TextInput
              label={
                <Text>
                  <Text>Old Password</Text>
                  <Text style={{color: 'red'}}>*</Text>
                </Text>
              }
              mode="outlined"
              onChangeText={setOldPassword}
              value={oldPassword}
              style={{marginRight: 10}}
              placeholder="Enter Old Password"
              secureTextEntry={!showOldPassword}
              right={
                // <TextInput.Icon
                //   icon={showOldPassword ? 'eye' : 'eye-off'}
                //   onPress={() => setShowOldPassword(!showOldPassword)}
                // />

                <TextInput.Icon
                icon={() => (
                  <VectorIcon
                    name={showOldPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="black"
                    onPress={() => setShowOldPassword(!showOldPassword)}

                  // Toggle visibility
                  />
                )}
              />
              }
            />
             <TouchableOpacity onPress={toggleModalForOldPass} style={styles.iconButton}>
        <VectorIcon name="information-circle" size={24} color="black" />
      
      </TouchableOpacity>
        
            {oldPasswordError ? (
              <Text style={styles.errorText}>{oldPasswordError}</Text>
            ) : null}
          </View>
          <View style={{flexDirection: 'column', marginVertical: 20}}>
            <TextInput
              label={
                <Text>
                  <Text>New Password</Text>
                  <Text style={{color: 'red'}}>*</Text>
                </Text>
              }
              mode="outlined"
              onChangeText={setNewPassword}
              value={newPassword}
              style={{marginRight: 10}}
              placeholder="Enter New Password"
              secureTextEntry={!showNewPassword}
              right={
                
                // <TextInput.Icon
                //   icon={showNewPassword ? 'eye' : 'eye-off'}
                //   onPress={() => setShowNewPassword(!showNewPassword)}
                // />
                <TextInput.Icon
                icon={() => (
                  <VectorIcon
                    name={showNewPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="black"
                    onPress={() => setShowNewPassword(!showNewPassword)}

                  // Toggle visibility
                  />
                )}
              />
              }
            />
             <TouchableOpacity onPress={toggleModalNewPssword} style={styles.iconButton}>
        <VectorIcon name="information-circle" size={24} color="black" />
      
      </TouchableOpacity>
        
            {newPasswordError ? (
              <Text style={styles.errorText}>{newPasswordError}</Text>
            ) : null}
          </View>
         
        

          <View style={{flexDirection: 'column', marginVertical: 20}}>
            <TextInput
              label={
                <Text>
                  <Text>Confirm Password</Text>
                  <Text style={{color: 'red'}}>*</Text>
                </Text>
              }
              mode="outlined"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              style={{marginRight: 10}}
              placeholder="Enter Confirm Password"
              secureTextEntry={!showConfirmPassword}
              right={
                // <TextInput.Icon
                //   icon={showConfirmPassword ? 'eye' : 'eye-off'}
                //   onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                // />
                <TextInput.Icon
                icon={() => (
                  <VectorIcon
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="black"
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}

                  // Toggle visibility
                  />
                )}
              />
              }
            />
               <TouchableOpacity onPress={toggleModal} style={styles.iconButton}>
        <VectorIcon name="information-circle" size={24} color="black" />
      
      </TouchableOpacity>
            {confirmPasswordError ? (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            ) : null}
          </View>
       
          <View style={styles.buttonContainer}>
            <UpdateButton
              title="CANCEL"
              onClick={cancelProfile}
              imageIcon={Remove}
            />
            <UpdateButton
              title="CHANGE"
              onClick={submitChangePassword}
              imageIcon={Check}
            />
          </View>
        </ScrollView>
        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <Bottom />
        </View>

      </View>
      <CommonModal
            isVisible={isModalVisible}
            toggleModal={toggleModal}
            title="Password Must:"
            content={passwordCriteria}
            marginTop={200}
          />
            <CommonModal
            isVisible={isModalVisibles}
            toggleModal={toggleModalNewPssword}
            title="Password Must:"
            content={passwordCriteria}
            marginTop={-70}
          />
             <CommonModal
            isVisible={isModalVisiblesForPass}
            toggleModal={toggleModalForOldPass}
            title="Password Must:"
            content={passwordCriteria}
            marginTop={-270}
          />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemMainView: {
    flex: 0.,
    flexDirection: 'column',
    marginTop: 100,
    marginHorizontal: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 40,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginLeft: 5,
  },
});

export default ChangePassword;

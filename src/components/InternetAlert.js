// InternetAlert.js
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const InternetAlert = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showAlert}
      onRequestClose={() => setShowAlert(false)}
    >
      <View style={styles.container}>
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>No Internet Connection</Text>
          <ActivityIndicator size="large" color="#000" style={styles.loader} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  alertText: {
    fontSize: 18,
    marginBottom: 20,
    color:'black'
  },
  loader: {
    marginTop: 10,
  },
});

export default InternetAlert;

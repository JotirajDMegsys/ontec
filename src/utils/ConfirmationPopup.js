import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ConfirmationPopup = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null; 
  
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ backgroundColor: 'gray', padding: 20, borderRadius: 10 }}>
        <Text style={{ marginBottom: 10 }}>Are you sure you want to delete?</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={onConfirm} style={{ padding: 10, backgroundColor: 'red', borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancel} style={{ padding: 10, backgroundColor: 'grey', borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ConfirmationPopup;

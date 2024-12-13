import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { ProfileInput } from '../../utils/ProfileInput';
import { AgreeButton, SubmitButton } from '../../components/common';
import Check from '../../assets/check.png'
import { BackgroundColor } from '../../helpers/constants'
import BackNavigation from '../../components/backNavigation';
import { Dropdown } from 'react-native-element-dropdown';



export const Profile = () => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BackgroundColor, borderColor: "red", borderWidth: 2 }}>
      <BackNavigation
        title={"Complete Your Profile"}
        screenName={"otpSubmit"}
      />
      <ScrollView style={{ flex: 1, }}>
        <View style={{ flex: 1, borderColor: "blue", borderWidth: 2 }}>
          <View style={{ flex: 1, borderColor: "blue", borderWidth: 2 }}>

          </View>

        <ProfileInput title="Complete Your Profile" />
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

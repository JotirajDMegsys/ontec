import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { DeleteButton, UpdateButton } from '../../components/common';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getPropertiesDetails } from '../../redux/slice/propertyDetails'
import BackNavigation from '../../components/backNavigation';
import Bottom from '../../components/Bottom';
import { COMPANY_ID } from "../../helpers/enum"

const PropertyDetails = ({ route }) => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const propertyId = route.params?.propertyId

  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const {
    getPropertiesDetailsIsLoading,
    getPropertiesDetailsData,
    getPropertiesDetailsIsError,
    getPropertiesDetailsIsSuccess
  } = useSelector((state) => ({
    getPropertiesDetailsIsLoading: state.getPropertyDetails.getPropertiesDetailsIsLoading,
    getPropertiesDetailsData: state.getPropertyDetails.getPropertiesDetailsData,
    getPropertiesDetailsIsError: state.getPropertyDetails.getPropertiesDetailsIsError,
    getPropertiesDetailsIsSuccess: state.getPropertyDetails.getPropertiesDetailsIsSuccess,
  })
  );



  useEffect(() => {
    let dataObj = {
      "propertyId": propertyId,
      "companyId": COMPANY_ID,
    }
    // console.log(dataObj);
    dispatch(getPropertiesDetails(dataObj));
  }, []);

  useEffect(() => {
    console.log('getPropertiesDetailsData----', JSON.stringify(getPropertiesDetailsData))
  }, [getPropertiesDetailsData, getPropertiesDetailsIsSuccess]);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FAFF' }}>

      <BackNavigation
        title={"Property Details"}
        screenName={"properties"}
        isRightIcon={true}
        backgroundColor={"#FFFFF"}
      />
      <View style={{ flex: 1 }}>


      </View>

      <View style={{ width: '100%', justifyContent: 'flex-end' }}>
        <Bottom />
      </View>
    </SafeAreaView>
  );
};

export default PropertyDetails;

const styles = StyleSheet.create({
  input: {
    marginTop: 5,
    marginHorizontal: 12,
  },
  itemMainView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 28,
  },
  errorInputText: {
    color: 'red',
    // marginHorizontal: 12,
  },
});

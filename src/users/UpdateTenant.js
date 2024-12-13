import React,{useState} from 'react';
import {View,Text, SafeAreaView,StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { UpdateButton,DeleteButton } from '../components/common';
import Bottom from '../components/Bottom';
//images
import Check from '../assets/check.png';
import Remove from '../assets/remove.png';
import Delete from '../assets/delete.png';
import { useNavigation } from '@react-navigation/native';
export const UpdateTenant = () => {
  const navigation =useNavigation();
  // const processDelete = () => {
  //   // return console.log('Delete');
  //   navigation.navigate('meterList');
  // };
  const processCancel = () => {
    navigation.navigate('SandtoneUser');
  };

  const handleSubmit = () => {
  
      
    navigation.navigate('SandtoneUser');

  };
  const deleteButton =()=>{
    navigation.navigate('SandtoneUser');

  }
  

  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const titleData = [
    { label: 'Mr.', value: '1' },
    { label: 'Ms.', value: '2' },
  ];

  return (
    <>
  <SafeAreaView  style={{flex:1,backgroundColor:'#F8F9FAFF'}}>
  <ScrollView VerticalScrollIndicator={true}>
        <View>
      <View style={{alignItems:'center'}}>
        <Text style={{fontFamily:'Catamaran-Regular', /* Body */
  fontSize: 30, 
  fontWeight:'700', 
  lineHeight: 46, 
  color:'#171A1FFF',
  
  marginVertical:20,}}>Update Tenant</Text>
    </View>
    <View style={styles.itemMainView}>
            <View style={{ flex: 0.5,borderColor:'pink'}}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={titleData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Title' : 'Mrs'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
           
          </View>
          <View style={styles.itemMainView}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TextInput
                label="First Name"
                keyboardType="email-address"
                mode="outlined"
                style={{ marginRight: 10 }}
                onChangeText={() => { }}
                // onBlur={handleBlur('email')}
                // value={values.email}
                // placeholder="Password"
                
              />
            </View>
          
          </View>
          <View style={styles.itemMainView}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TextInput
                label="Last Name"
                keyboardType="email-address"
                mode="outlined"
                style={{ marginRight: 10 }}
                onChangeText={() => { }}
                // onBlur={handleBlur('email')}
                // value={values.email}
                // placeholder="Password"
                
              />
            </View>
          
          </View>
          <View style={styles.itemMainView}>
            <View style={{ flex: 1,}}>
              <TextInput
                label="Mobile"
                keyboardType="email-address"
                mode="outlined"
                style={{ marginRight: 10 }}
                onChangeText={() => { }}
                // onBlur={handleBlur('email')}
                // value={values.email}
                // placeholder="Password"
                
              />
            </View>
          
          </View>
          <View style={styles.itemMainView}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TextInput
                label="Email"
                keyboardType="email-address"
                mode="outlined"
                style={{ marginRight: 10 }}
                onChangeText={() => { }}
                // onBlur={handleBlur('email')}
                // value={values.email}
                // placeholder="Password"
                
              />
            </View>
          
          </View>

          

          <View style={[styles.itemMainView]}>
            <View style={{ flex: 0.98, justifyContent: 'center'}}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Proof Type' : 'Sandtone Home'}
                searchPlaceholder="Select Proof Type"
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
          </View>

        

       

          <View style={[styles.itemMainView, { marginVertical:22 }]}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  // disabled={false}
                  boxType="square"
                  style={{ height: 20, width: 20,borderColor:'black' }}
                  value={toggleCheckBox}
                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Text style={{ color: '#565D6D', marginLeft: 10 }}>Agree</Text>
              </View>
            </View>
          </View>
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            
            
          }}>
         
        <UpdateButton title="CANCEL" onClick={processCancel}  imageIcon={Remove}/>
        <UpdateButton title="SUBMIT" onClick={handleSubmit}  imageIcon={Check}/>
        </View>
         <View style={{marginVertical:5,alignItems:'center'}}>
         <DeleteButton title="DELETE PROPERTY"  imageIcon={Delete} onClick={deleteButton}/>   
               </View>
          
    </View>
   

      </ScrollView>
      <View style={{ bottom: 0, width: '100%'}}>
        <Bottom />
      </View>
  </SafeAreaView>
      
</>
    
  )
}

const styles = StyleSheet.create({
  
 
  itemMainView: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    marginHorizontal: 30
  },

  inputText: {
    fontSize: 18,
    color: '#424856',
    marginHorizontal: 12,
    height:20
  },

  errorInputText: {
    color: 'red',
    marginHorizontal: 12,
  },

  input: {
    marginTop: 5,
    marginHorizontal: 12,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white'
  },

});

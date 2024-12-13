

import React, { useState } from 'react';


import { View, Text, TextInput, StyleSheet, Button, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { DocumentPicker } from 'react-native-document-picker';
import { TouchableHighlight } from 'react-native-gesture-handler';
import MapIcon from '../assets/meterIcon/MapPin.png';
import { SubmitButton } from '../components/common';
// import { Image } from '@rneui/base';

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
const title = [
  { label: 'Mr', value: '1' },
  { label: 'Mrs', value: '2' },
  { label: 'Miss', value: '3' },

];

export const ProfileInput = (props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // console.log(result);

      // Handle the selected document here
      // Example: Display the document name
      alert(`Selected document: ${result.name}`);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the document picker
        // console.log('Document picker cancelled');
      } else {
        // Handle other errors
        console.error(`Error picking document: ${err}`);
      }
    }
  };
  const [address, setAddress] = useState('');

  const handleAddInputChange = text => {
    setAddress(text);
  };

  let email = AsyncStorage.getItem('emailId');
    let mobileNo = AsyncStorage.getItem('mobile');

  return (
    <View style={{ flex: 1, borderColor:'blue',borderWidth:2 }}>
      <View style={{ margintop: 28, }}>
        <Text style={{
          marginHorizontal: 21,
          width: 349,
          fontFamily: 'Catamaran-Regular',
          fontSize: 30,
          fontWeight: '700',
          lineHeight: 46,
          color: '#171A1FFF',
          textAlign: 'center'
        }}>{props.title}</Text>
      </View>
      <View style={{ marginHorizontal: 27, marginTop: 44, }}>
        <View style={{ flexDirection: 'row' }}>
          <View >
            <Text style={styles.inputTitle}>Title</Text>
           
            <View style={styles.containerTop}>
              <Dropdown
                style={[styles = {
                  width: 79,
                  height: 44, borderColor: 'gray',
                  borderWidth: 0.5,
                  borderRadius: 8,
                  paddingHorizontal: 8
                }, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={{ fontSize: 16 }}
                selectedTextStyle={{ fontSize: 16 }}
                // inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={title}

                maxHeight={100}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Mr.' : 'Mr.'}

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
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.inputTitle}>First Name</Text>
            <TextInput placeholder='First Name' style={[styles.inputText, {
              width: 117,
              height: 44,
            }]} />

          </View>
          <View style={{ marginLeft: 25 }}>
            <Text style={styles.inputTitle}>Last Name</Text>
            <TextInput placeholder='Last Name' style={[styles.inputText, {
              width: 117,
              height: 44,
            }]} />

          </View>
        </View>
        <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'space-between' }} >

          <View>
            <Text style={styles.inputTitle}>Mobile</Text>
            <TextInput placeholder={mobileNo} style={[styles.inputText, {
              width: 155,
              height: 44
            }]} />
          </View>
          <View>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput placeholder={email} style={[styles.inputText, {
              width: 155,
              height: 44,
            }]} />
          </View>

        </View>
        <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'space-between' }} >

          <View>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput placeholder='Enter Password' style={[styles.inputText, {
              width: 155,
              height: 44
            }]} />
          </View>
          <View>
            <Text style={styles.inputTitle}>Confirm Password</Text>
            <TextInput placeholder='Confirm password' style={[styles.inputText, {
              width: 155,
              height: 44
            }]} />
          </View>

        </View>
        {/* Dropdown component */}
        <View style={{ marginTop: 12 }}>
          <Text style={styles.inputTitle}>Select Proof Type</Text>
          <View style={styles.container}>
            {/* {renderLabel()} */}

            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Driving Licence' : 'Proof List'}
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
        {/* document picker component */}
        <View style={{ flexDirection: 'row', marginTop: 25 }}>
          <Text style={styles.documentPickerText}>Document Picker Example</Text>
          {/* <TouchableHighlight title="Pick Document"  style={styles.documentPickerButton}onPress={pickDocument} />
       */}
          <TouchableHighlight
            style={styles.documentPickerButton}
            underlayColor="red"
            onPress={pickDocument}
          >
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableHighlight>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 14 }}>
          <View style={[styles.formGroup]}>
            <Text style={{ fontFamily: 'Catamaran-Bold' }}>
              Address
            </Text>
            <TextInput
              style={styles.inputText}
              placeholder="Enter your Address"
              value={address}
              onChangeText={handleAddInputChange}
            />
          </View>
          <View style={{ marginTop: 25, width: 36, height: 36, backgroundColor: '#EC3237', marginLeft: 20, borderRadius: 80 }}>

            <Image style={{ width: 22, height: 22, marginHorizontal: 7, marginTop: 8 }} source={MapIcon} />
          </View>
        </View>



      </View>

    </View>

  )
}

const styles = StyleSheet.create({

  inputText: {

    paddingLeft: 16,
    paddingRight: 16,
    fontFamily: 'Catamaran-SemiBold', /* Body */
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 26,
    backgroundColor: '#FFFFFFFF', /* white */
    borderRadius: 4, /* border-xl */
    borderWidth: 1,
    borderColor: '#9095A1FF', /* neutral-500 */

  },

  inputTitle: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 20,
    fontFamily: 'Catamaran-Bold', /* Body */

  },
  containerTop: {
    backgroundColor: 'white'
  },
  container: {
    // marginHorizontal:21,
    marginTop: 12,
    backgroundColor: 'white'


  },
  dropdown: {
    height: 44,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,

    // backgroundColor:'#F8F9FAFF'
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  documentPickerText: {
    width: 260,
    height: 44,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    fontFamily: 'Catamaran', /* Body */
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 26,
    backgroundColor: '#FFFFFFFF', /* white */
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4, /* border-tl-xl border-bl-xl */
    borderWidth: 1,
    borderColor: '#9095A1FF', /* neutral-500 */

  },
  documentPickerButton: {
    width: 93,
    height: 44,

    // padding: 12, 
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#EC3237FF', /* primary-500 */
    opacity: 1
  },
  buttonText: {
    fontFamily: 'Catamaran-Medium', /* Body */
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFFFF', /* white */

    lineHeight: 22,
  },


  // address Css
  formGroup: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFFFF',
    borderWidth: 1,
    padding: 10,
    width: 333,
    height: 44,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 5,
  },
  inputText: {
    width: 288,
    borderColor: 'gray',
    backgroundColor: '#FFFFFFFF',
    borderWidth: 1,
    padding: 10,
    height: 44,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 5,
  },

})
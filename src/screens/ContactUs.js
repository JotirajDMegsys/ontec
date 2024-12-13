import React from 'react';
import {View,Text, SafeAreaView,Image,StyleSheet, Linking } from 'react-native';
import BackNavigation from '../components/backNavigation';
import topImage from '../assets/ontecSplashImg.png'
import { StatementButton } from '../components/common';
import callsymbol from '../assets/callSymbol.png';
import Bottom from '../components/Bottom';
const ContactUs = () => {
    const gotoCall = () => {
      Linking.openURL('tel:0213456789');
      };
  return (     
    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: '#FFFFFFFF',
    }}>
    <BackNavigation title={'Contact Us'} isRightIcon={true} screenName={"dashBoard"}/>
    <View style={{flex:1}}>
        <View style={{flex:0.3}}>
           
          <Image  source={topImage}  style={{ width: 248, height:96, marginHorizontal:50,marginTop:10}}  resizeMode="contain"
                /> 
            <View style={{alignItems:'center',marginTop:23}}>
                <Text style={styles.textStyle}>Company master information can be</Text>
                <Text  style={styles.textStyle}> displayed here</Text>                
                </View> 
            
         </View>
       <View style={{flex:0.3,justifyContent:'center',marginHorizontal:46}}>
        <View style={{marginVertical:10}}>
          <Text style={[styles.textStyle,{  fontWeight:'400',lineHeight:30,fontSize:20,textAlign:'left'}]}>Help Line</Text>
          <Text style={[styles.textStyle,{  fontFamily: 'Catamaran-Bold',fontWeight:'700',lineHeight:30,fontSize:20, }]}>021 345 6789</Text>
        </View>
        <View style={{marginVertical:10}}>
          <Text style={[styles.textStyle,{  fontWeight:'400',lineHeight:30,fontSize:20,}]}>Email</Text>
          <Text style={[styles.textStyle,{  fontFamily: 'Catamaran-Bold',fontWeight:'700',lineHeight:30,fontSize:20, }]}>help@ontecenergy.com</Text>
        </View>



       </View>

       <View style={{justifyContent:'center',alignItems:'center',flex:0.2}}>            
              <StatementButton title='CALL TO SUPPORT TEAM' onClick={gotoCall} imageIcon={callsymbol} />
</View>
<View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <Bottom />
        </View>
    </View>
  </SafeAreaView>
    )
}


export default ContactUs;

const styles = StyleSheet.create({
    textStyle: {
      fontFamily: 'Catamaran-Regular' /* Body */,
      fontSize: 14,
      fontWeight: '400',
      lineHeight:20,
   
      color: '#171A1F',
    },
    
  });
  
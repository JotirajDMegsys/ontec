import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import BackNavigation from '../components/backNavigation';
import Bottom from '../components/Bottom';
import { Text } from 'react-native';

const TermsAndConditions = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <BackNavigation title={'Terms & Conditions'} isRightIcon={true} screenName={"dashBoard"} />
      <View style={styles.container}>
        <WebView
          source={{ uri: 'http://104.251.223.167:3000/terms' }} 
          style={styles.webview}
          startInLoadingState={true}
          renderLoading={() => <View style={styles.loadingContainer}><Text>Loading...</Text></View>}
          renderError={() => <View style={styles.errorContainer}><Text>Error loading page</Text></View>}
        />
        <View style={styles.bottomContainer}>
          <Bottom />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFFFF',
  },
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

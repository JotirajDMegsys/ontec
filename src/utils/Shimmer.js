import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const Shimmer = (containerStyle) => {
  const [shimmerAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    startAnimation();
  }, []);


  const startAnimation = () => {
    shimmerAnimation.setValue(0);
    Animated.loop(
      Animated.timing(shimmerAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 400],
  });

  return (
    <View style={[containerStyle.containerStyle, styles.defaultContainer]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0', // Background color of the container
    borderRadius: 8, // Rounded corners for the container
    overflow: 'hidden', // Ensure shimmer does not overflow the container
  },
  defaultContainer: {
    backgroundColor: '#E0E0E0', // Background color of the container
    overflow: 'hidden', // Ensure shimmer does not overflow the container
  },
  shimmer: {
    backgroundColor: '#E4E4E4', // Background color of the shimmer
    height: '100%', // Full height of the container
    position: 'absolute', // Position absolute to overlap with container
    left: -400, // Initially position off-screen to the left
    right: 0, // Take full width of the container
  },
});

export default Shimmer;


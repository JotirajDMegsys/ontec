
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BackgroundColor, TextColor } from '../../helpers/constants'


const ResetPassword = () => {

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'flex-end' }}>
                <Image
                    source={""}
                    style={{ width: 281, height: 185, alignSelf: 'center', justifyContent: 'center', marginBottom: -10 }}
                    resizeMode="contain"
                />
                <Text style={{ fontSize: 18, color: TextColor }}>{"One app for all utilities..."}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', }}>
                <Image
                    source={""}
                    style={{ width: 312, height: 350, alignSelf: 'center', justifyContent: 'center' }}
                    resizeMode="contain"
                />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BackgroundColor,
    },
});

export default ResetPassword;
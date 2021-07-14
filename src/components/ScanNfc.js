import React, { Component } from 'react';
import {
    View, StyleSheet, Image,
    ImageBackground, SafeAreaView, AsyncStorage, Text,
    BackHandler, Alert, ToastAndroid, TouchableOpacity, StatusBar
} from 'react-native';

import FastImage from 'react-native-fast-image'
import { colors } from '../styles/styles';
import { AppHeader } from '../utility/AppHeader'



class ScanNfc extends Component {


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <AppHeader navigation={this.props.navigation} title="Scan NFC" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FastImage source={require('../assets/images/nfc1.png')} style={{ width: 150, height: 150 }} resizeMode="contain" />
                    <Text style={{ color: colors.denim, fontSize: 12, top: 7 }}>Detecting NFC Tag</Text>
                </View>
            </SafeAreaView>
        )
    }
}


export default ScanNfc;
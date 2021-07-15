import React, { Component } from 'react';
import {
    View, StyleSheet, Image,
    ImageBackground, SafeAreaView, AsyncStorage, Text,
    BackHandler, Alert, ToastAndroid, TouchableOpacity
} from 'react-native';
import { colors } from '../styles/styles';
import FastImage from 'react-native-fast-image'


class About extends Component {
    render() {
        return (
            <SafeAreaView>
                <View style={{ backgroundColor: colors.darkish_blue, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 14 }}>About</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <FastImage source={require('../assets/images/logo.png')} style={{ width: 155, height: '50%' }} resizeMode="contain" />
                    <Text style={{ color: colors.denim, fontSize: 12 , bottom:18}}>Scan NFC, QR, Barcodes</Text>
                </View>

                <View style={{  bottom:30, marginHorizontal:20, }}>
                    <Text style={{color: colors.denim, textAlign:'center'}}>Lorem ipsum dolor set amet Lorem ipsum dolor set ametLorem ipsum dolor set ametLorem ipsum dolor set ametLorem ipsum dolor set ametLorem ipsum dolor set ametLorem ipsum dolor set amet.</Text>
                </View>
            </SafeAreaView>
        )
    }
}

export default About;
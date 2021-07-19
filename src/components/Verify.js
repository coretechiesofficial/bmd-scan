import React, { Component } from 'react';
import {
    View,
    SafeAreaView, Text,
    TouchableOpacity, StatusBar, FlatList
} from 'react-native';

import FastImage from 'react-native-fast-image'
import { colors } from '../styles/styles';
import { AppHeader } from '../utility/AppHeader';




class Verify extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <AppHeader navigation={this.props.navigation} title="Verify" />

                <View style={{ marginHorizontal: 10, marginVertical: 10, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, paddingVertical: 7, flexDirection: 'row', alignItems: 'center' }}>
                    <FastImage source={require('../assets/images/qr_code_1.png')} style={{ width: 25, height: 25, left: 10 }} resizeMode="contain" />
                    <View style={{ width: '50%', justifyContent: 'center', marginLeft: 20 }}>
                        <Text numberOfLines={1} style={{ fontSize: 12, color: colors.darkish_blue }}>15645874684142</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                        <Text style={{ fontSize: 10, color: '#525252', right:5 }}>July 04, 2021</Text>
                    </View>
                </View>

                <View style={{ flex: 1,  justifyContent: 'center', alignItems: 'center', bottom:10 }}>
                    <FastImage source={require('../assets/images/nfc1.png')} style={{ width: 120, height: 120, }} resizeMode="contain" />
                    <Text style={{ color: colors.denim , top:5}}>Scan NFC Tag</Text>
                </View>

                {/* <View style={{ flex: 1,  justifyContent: 'center', alignItems: 'center', bottom:10 }}>
                    <FastImage source={require('../assets/images/copy.png')} style={{ width: 120, height: 120, }} resizeMode="contain" />
                    <Text style={{ color: colors.denim , top:15}}>Verifying Data</Text>
                </View> */}

                {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <FastImage source={require('../assets/images/check_4.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                    <Text style={{ color: colors.darkish_blue, top: 8, fontWeight: 'bold' }}>Verification Done</Text>
                    <Text style={{ color: colors.denim, top: 12, fontSize: 12 }}>All the data match found</Text>
                    <TouchableOpacity activeOpacity={0.8} style={{ justifyContent: 'center', alignItems: 'center', width: 110, height: 30, backgroundColor: colors.darkish_blue, marginTop: 40, borderRadius: 3 }}>
                        <Text style={{ color: 'white' }}>Done</Text>
                    </TouchableOpacity>
                </View> */}

            </SafeAreaView>
        )
    }
}

export default Verify;
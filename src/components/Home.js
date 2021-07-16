import React, { Component } from 'react';
import {
    View, StyleSheet, Image,
    ImageBackground, SafeAreaView, AsyncStorage, Text,
    BackHandler, Alert, ToastAndroid, TouchableOpacity
} from 'react-native';

import FastImage from 'react-native-fast-image'
import { colors } from '../styles/styles';



class Home extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <FastImage source={require('../assets/images/logo.png')} style={{ width: 125, height: '30%' }} resizeMode="contain" />
                    <Text style={{ color: colors.denim, fontSize: 12 }}>Scan NFC, QR, Barcodes</Text>
                </View>

                <View style={{ marginTop: 30, marginHorizontal: 25, flexDirection: 'row', }}>

                    {/* ------------------Scan Code View start here----------------------- */}
                    <TouchableOpacity
                     activeOpacity={0.9}
                     onPress={()=> this.props.navigation.navigate('Scancode')}
                        style={{
                            backgroundColor: colors.duck_egg_blue,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '50%',
                            height: 120,
                            borderRadius: 5,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                        }}>
                        <FastImage source={require('../assets/images/qr_code.png')} style={{ width: 60, height: 60 }} resizeMode="contain" />
                        <Text style={{ color: colors.denim, fontSize: 12, top: 5 }}>Scan Code</Text>
                    </TouchableOpacity>
                    {/* ------------------Scan Code View end here----------------------- */}

                    {/* ------------------Scan Tag View start here----------------------- */}
                    <TouchableOpacity 
                    activeOpacity={0.9}
                    onPress={()=> this.props.navigation.navigate('ScanNfc')}
                    style={{
                        backgroundColor: colors.duck_egg_blue,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%',
                        height: 120,
                        borderRadius: 5,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        marginLeft: 6,
                        elevation: 3,
                    }}>
                        <FastImage source={require('../assets/images/nfc.png')} style={{ width: 60, height: 60 }} resizeMode="contain" />
                        <Text style={{ color: colors.denim, fontSize: 12, top: 5 }}>Scan Tag</Text>
                    </TouchableOpacity>
                    {/* ------------------Scan Tag View end here----------------------- */}

                </View>

                <View style={{ marginTop: 5, marginHorizontal: 25, flexDirection: 'row', }}>

                    {/* ------------------Verify View start here----------------------- */}
                    <View
                        style={{
                            backgroundColor: colors.duck_egg_blue,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '50%',
                            height: 120,
                            borderRadius: 5,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                        }}>
                        <FastImage source={require('../assets/images//search.png')} style={{ width: 60, height: 60 }} resizeMode="contain" />
                        <Text style={{ color: colors.denim, fontSize: 12, top: 5 }}>Verify</Text>
                    </View>
                    {/* ------------------Verify View end here----------------------- */}

                    {/* ------------------Scan Tag View start here----------------------- */}
                    <TouchableOpacity 
                     activeOpacity={0.9}
                     onPress={()=> this.props.navigation.navigate('History')}
                    style={{
                        backgroundColor: colors.duck_egg_blue,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%',
                        height: 120,
                        borderRadius: 5,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        marginLeft: 6,
                        elevation: 3,
                    }}>
                        <FastImage source={require('../assets/images/file.png')} style={{ width: 60, height: 60 }} resizeMode="contain" />
                        <Text style={{ color: colors.denim, fontSize: 12, top: 5 }}>History</Text>
                    </TouchableOpacity>
                    {/* ------------------Scan Tag View end here----------------------- */}

                </View>
            </SafeAreaView>
        )
    }
}

export default Home;
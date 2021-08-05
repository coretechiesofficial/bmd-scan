import React, { Component } from 'react';
import {
    View, StyleSheet, Image,
    ImageBackground, SafeAreaView, Text,
    BackHandler, Alert, ToastAndroid, TouchableOpacity
} from 'react-native';

import FastImage from 'react-native-fast-image'
import { colors } from '../styles/styles';
import NfcManager, { NfcEvents, Ndef , NfcTech} from 'react-native-nfc-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Home extends Component {


    state = {
        doubleBackToExitPressedOnce: false,
        is_support : undefined,
        data : []
    }

    handleBackButton = () => {
        if (this.props.navigation.isFocused()) {
            if (this.state.doubleBackToExitPressedOnce == true) {
                BackHandler.exitApp();
                return true;
            }
            ToastAndroid.show('Press again for exit app', ToastAndroid.SHORT)
            this.setState({
                doubleBackToExitPressedOnce: true,
            })
            setTimeout(() => {
                this.setState({
                    doubleBackToExitPressedOnce: false,
                })
            }, 2000);
            return true;
        }

    };

    async componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            let result = await AsyncStorage.getItem('hisdata')
            this.setState({data : result ? JSON.parse(result) : []})
          });
        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        let is_supported = await NfcManager.isSupported()
        this.setState({is_support : is_supported})
        console.log('Supported--->', this.state.is_support)
    }

    componentWillUnmount() {
        this._unsubscribe()
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


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
                        onPress={() => this.props.navigation.navigate('Scancode')}
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
                        disabled={this.state.is_support == 'false' ? true : false}
                        onPress={() => this.props.navigation.navigate('ScanNfc')}
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
                            {
                                !this.state.is_support
                                ?
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <FastImage source={require('../assets/images/exclamation_mark.png')} style={{ width: 20, bottom:5, height: 20 }} resizeMode="contain" />    
                                    <Text style={{ fontSize: 10, color: '#fa6450', left: 10, bottom: 5 }}>NFC not available</Text>
                                </View>
                                :
                                null
                            }
                           
                       
                        <FastImage source={require('../assets/images/nfc.png')} style={{ width: 60, height: 60 }} resizeMode="contain" />
                        <Text style={{ color: colors.denim, fontSize: 12, top: 5 }}>Scan Tag</Text>
                    </TouchableOpacity>
                    {/* ------------------Scan Tag View end here----------------------- */}

                </View>

                <View style={{ marginTop: 5, marginHorizontal: 25, flexDirection: 'row', }}>

                    {/* ------------------Verify View start here----------------------- */}
                    <TouchableOpacity
                        disabled={this.state.data.length > 0 ? false : true}
                        activeOpacity={0.9}
                        onPress={() => this.props.navigation.navigate('Scancode', { nav: 'verfy' })}
                        style={{
                            backgroundColor: this.state.data.length > 0 ? colors.duck_egg_blue: 'rgba(0,0,0,0.1)',
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

                            elevation: this.state.data.length > 0 ? 3: 0,
                        }}>
                        <FastImage source={require('../assets/images//search.png')} style={{ width: 60, height: 60 }} resizeMode="contain" />
                        <Text style={{ color: colors.denim, fontSize: 12, top: 5 }}>Verify</Text>
                    </TouchableOpacity>
                    {/* ------------------Verify View end here----------------------- */}

                    {/* ------------------Scan Tag View start here----------------------- */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.props.navigation.navigate('History')}
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
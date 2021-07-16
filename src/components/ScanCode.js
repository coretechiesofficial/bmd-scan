import React, { Component } from 'react';
import {
    View, Image,
    SafeAreaView, Text,
    TouchableOpacity, ScrollView, Modal, Dimensions, Linking, AppState, Alert
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { colors } from '../styles/styles';
import { AppHeader } from '../utility/AppHeader'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher';
import { request, PERMISSIONS } from 'react-native-permissions';
import { ServiceConstant } from '../constants/ServiceConstant'


const openAppSettings = () => {
    if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:')
    } else {
        IntentLauncher.startActivity({
            action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
            data: 'package:com.bmd'
        })
    }
}

class Scancode extends Component {

    state = {
        appState: AppState.currentState,
    }

    componentDidMount() {
        this.requestPermision()
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    onSuccess = e => {
        // console.log('ee--', e)
        let id = 1
        ServiceConstant.set_historydata({ tit: e.data, type: e.type , id: id})
        this.props.navigation.navigate('History')
    };

    marker = () => {
        return (
            <View style={{ width: Dimensions.get('screen').width / 1.8, height: 200, }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <View style={{ width: 70, height: 70, borderTopColor: 'white', borderTopWidth: 2, borderLeftWidth: 2, borderLeftColor: 'white', borderTopLeftRadius: 6 }}>

                    </View>

                    <View style={{ width: 70, height: 70, borderTopColor: 'white', borderTopWidth: 2, borderRightWidth: 2, borderRightColor: 'white', borderTopRightRadius: 6 }}>

                    </View>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: 70, height: 70, borderBottomColor: 'white', borderBottomWidth: 2, borderLeftWidth: 2, borderLeftColor: 'white', borderBottomLeftRadius: 6 }}>

                    </View>

                    <View style={{ width: 70, height: 70, borderBottomColor: 'white', borderBottomWidth: 2, borderRightWidth: 2, borderRightColor: 'white', borderBottomRightRadius: 6 }}>

                    </View>

                </View>
            </View>
        )
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!');
            this.requestPermision()
            //console.log('hhh', this.state.appState)
        }
        console.log('nextAppState', nextAppState)
        this.setState({ appState: nextAppState });

    };

    requestPermision = () => {
        request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
            console.log('resss', result)
            if (result == 'granted') {
                console.log('granted success')
            }
            else if (result == 'denied') {
                this.requestPermision()
            }
            else {
                Alert.alert(
                    "BMD App",
                    "BMD App Needs Camera Permission.",
                    [{ text: 'Cancel' },
                    {
                        text: 'App Settings',
                        onPress: () => openAppSettings()
                    }
                    ],
                    { cancelable: false }
                );
            }
        });
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <AppHeader navigation={this.props.navigation} title="Scan QR" />
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(0, 0, 0,0.1)' }}>
                    <QRCodeScanner
                        onRead={this.onSuccess}
                        //flashMode={RNCamera.Constants.FlashMode.torch}
                        reactivate={true}
                        reactivateTimeout={5}
                        cameraStyle={{ height: '100%', }}
                        showMarker={true}
                        customMarker={() => this.marker()}
                    />
                </View>
            </SafeAreaView>
        )
    }
}


export default Scancode;
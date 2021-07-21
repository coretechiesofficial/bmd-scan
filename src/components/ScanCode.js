import React, { Component } from 'react';
import {
    View, Image,
    SafeAreaView, Text,
    TouchableOpacity, ScrollView, Modal, Dimensions, Linking, AppState, Alert
} from 'react-native';

import { AppHeader } from '../utility/AppHeader'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher';
import { request, PERMISSIONS } from 'react-native-permissions';
import { ServiceConstant } from '../constants/ServiceConstant'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        scan_data: [],
        date: new Date(),
        visible : false
    }

    componentDidMount() {
        this.requestPermision()
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    onSuccess = async (e) => {
        //console.log('ee--', e)

        let obj = {};
        obj['type'] = e.type
        obj['data'] = e.data
        obj['id'] = e.target
        obj['date'] = this.state.date
        obj['selected'] = false

        AsyncStorage.getItem('hisdata', (err, resp) => {       // Getting data from AsyncStorage
            let responseData = JSON.parse(resp)
            this.state.scan_data = responseData || []
            this.state.scan_data.push(obj)
            AsyncStorage.setItem('hisdata', JSON.stringify(this.state.scan_data))  // Setting Your Data in AsyncStorage
                .then(res => console.log('success!'))
                .catch(error => console.log('error!'))

        })
        setTimeout(() => {
            this.props.navigation.navigate('Data', { data: e.data, from: 'scan', })
        }, 300)
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
                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0,0.1)' }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=> this.setState({visible: !this.state.visible})} style={{position:'absolute', zIndex:1, backgroundColor:'white', paddingHorizontal:5, paddingVertical:2, borderRadius:5, right:10, margin:20}}>
                        <Image source={require('../assets/images/torch.png')} style={{width:25, height:25}} resizeMode="contain"/>
                    </TouchableOpacity>

                    <QRCodeScanner
                        onRead={this.onSuccess}
                        flashMode={this.state.visible ? RNCamera.Constants.FlashMode.torch: RNCamera.Constants.FlashMode.off}
                        containerStyle={{ flex: 1 }}
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
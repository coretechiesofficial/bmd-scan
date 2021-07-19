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
        // console.log('ee--', e.data)
        let str = e.data
        let data = str.split(":")
        //console.log('data', data)
        let name = data[4].split(" ")
        let mod_name = name.toString()
        let final_name = mod_name.replace("TITLE", " ")
        console.log('name', final_name)

        let title = data[5].split(" ")
        let mod_title = title.toString()
        let final_title = mod_title.replace("ORG", " ")
        console.log('finalposition', final_title)

        let org = data[6].split(" ")
        let mod_org = org.toString()
        let final_org = mod_org.replace("URL", " ")
        console.log('final org', final_org)

        let website_url = data[7].split(" ")
        let mod_websiteurl = website_url.toString()
        let final_websiteurl = mod_websiteurl.replace("EMAIL;TYPE=INTERNET", " ")
        console.log('final_websiteurl', final_websiteurl)

        let email = data[8].split(" ")
        let mod_email = email.toString()
        let final_email = mod_email.replace("TEL;TYPE=voice,work,pref", " ")
        console.log('final_email', final_email)

        let work_pno = data[9].split(" ")
        let mod_workpno = work_pno.toString()
        let final_workpno = mod_workpno.replace("TEL;TYPE=voice,home,pref", " ")
        console.log('final_workpno', final_workpno)

        let mobile_no = data[11].split(" ")
        let mod_mobile_no = mobile_no.toString()
        let final_mobile_no = mod_mobile_no.replace("TEL;TYPE=fax,work,pref", " ")
        console.log('final_mobile_no', final_mobile_no)

        let fax = data[12].split(" ")
        let mod_fax = fax.toString()
        let final_fax = mod_fax.replace("ADR", " ")
        console.log('final_fax', final_fax)

        let address = data[13].split(';')
        console.log('address', address)
        let street = address[2]
        console.log('street', street)
        let city = address[3]
        console.log('city', city)
        let state = address[4]
        console.log('state', state)
        let zipcode = address[5]
        console.log('zipcode', zipcode)
        let country = address[6].split(" ")
        let mod_country = country.toString()
        let final_country = mod_country.replace("END", " ")
        console.log('final_country', final_country)

        let obj = {}
        obj['name'] = final_name
        obj['title'] = final_title
        obj['org'] = final_org
        obj['website'] = final_websiteurl
        obj['email'] = final_email
        obj['workpno'] = final_workpno
        obj['mobile_no'] = final_mobile_no
        obj['fax'] = final_fax
        obj['street'] = street
        obj['city'] = city
        obj['state'] = state
        obj['zipcode'] = zipcode
        obj['country'] = final_country
        setTimeout(() => {
            this.props.navigation.navigate('Data', { data: obj })
        }, 500)

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
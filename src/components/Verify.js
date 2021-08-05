import React, { Component } from 'react';
import {
    View,
    SafeAreaView, Text,
    TouchableOpacity, StatusBar, FlatList, ToastAndroid, Alert
} from 'react-native';

import FastImage from 'react-native-fast-image'
import { colors } from '../styles/styles';
import { AppHeader } from '../utility/AppHeader';
import NfcManager, { NfcEvents, Ndef , NfcTech,} from 'react-native-nfc-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Verify extends Component {

    state = {
        data : '',
        text : '',
        show : false,
        date : new Date().toLocaleDateString(),
        from : this.props.route.params ? this.props.route.params.by : '',
        visible_logo : true 
    }

    async componentDidMount() {

        if(this.state.from == 'ver') {
            this.setState({data : this.props.route.params.vdata})
        }
        else {
            this.setState({data : this.props.route.params.item})
        }
        let enable = await NfcManager.isEnabled() 
        
        if (!enable) {
            Alert.alert(
                "Alert",
                "Please turn on NFC on your Phone!",
                [{ text: 'Cancel' },
                {
                    text: 'Ok',
                    onPress: () => console.log('press')
                }
                ],
                { cancelable: false }
            );
        }

        this.timer = setInterval(async () => {
            let enable = await NfcManager.isEnabled()
            this.setState({ enable: enable })
            if (this.state.enable == true) {
            }
            else {
                Alert.alert(
                    "Alert",
                    "Please turn on NFC on your Phone!",
                    [{ text: 'Cancel' },
                    {
                        text: 'Ok',
                        onPress: () => console.log('press')
                    }
                    ],
                    { cancelable: false }
                );
            }
        }, 5000);

        let is_supported = await NfcManager.isSupported()        
        if (is_supported) {
          NfcManager.start();
          this.read()
          NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
           // console.log('Scan verify Screen =>', tag.ndefMessage);   
            const res =  Ndef.text.decodePayload(tag.ndefMessage[0].payload)
            console.log('Verify res-----', res)
            this.setState({text: res ? res : ''})
            this.onComparedata()
            NfcManager.unregisterTagEvent().catch(() => 0);
         
          });
        }

        else{
            alert('Nfc not supported on this device.')
        }

    
      }
    
    componentWillUnmount() {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
        clearInterval(this.timer);
    }

    read = async () => {
   
        try {
          await NfcManager.registerTagEvent();
        } catch (ex) {
          console.log('ex', ex);
          NfcManager.unregisterTagEvent().catch(() => 0);
        }
    }

    
    onComparedata = () => {
        if(this.state.data == this.state.text) {
            this.setState({show: true, visible_logo: false})
            console.log('match')
        }
        else {
            this.setState({show: false, visible_logo:false})
            console.log('Not match')
           
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <AppHeader navigation={this.props.navigation} title="Verify" />

                
                {/* <View style={{ flex: 1,  justifyContent: 'center', alignItems: 'center', bottom:10 }}>
                    <FastImage source={require('../assets/images/copy.png')} style={{ width: 120, height: 120, }} resizeMode="contain" />
                    <Text style={{ color: colors.denim , top:15}}>Verifying Data</Text>
                </View> */}
                 <View style={{ marginHorizontal: 10, marginVertical: 10, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, paddingVertical: 7, flexDirection: 'row', alignItems: 'center' }}>
                    <FastImage source={require('../assets/images/qr_code_1.png')} style={{ width: 25, height: 25, left: 10 }} resizeMode="contain" />
                    <View style={{ width: '60%', justifyContent: 'center', marginLeft: 20 }}>
                        <Text numberOfLines={1} style={{ fontSize: 12, color: colors.darkish_blue }}>{this.state.data}</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                        <Text style={{ fontSize: 10, color: '#525252', right:5 }}>{this.state.date}</Text>
                    </View>
                </View>

                {
                    this.state.text
                    ?
                        <View style={{ marginHorizontal: 10, marginVertical: 10, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, paddingVertical: 7, flexDirection: 'row', alignItems: 'center' }}>
                            <FastImage source={require('../assets/images/nfc1.png')} style={{ width: 25, height: 25, left: 10 }} resizeMode="contain" />
                            <View style={{ width: '60%', justifyContent: 'center', marginLeft: 20 }}>
                                <Text numberOfLines={1} style={{ fontSize: 12, color: colors.darkish_blue }}>{this.state.text}</Text>
                            </View>
                            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                <Text style={{ fontSize: 10, color: '#525252', right: 5 }}>{this.state.date}</Text>
                            </View>
                        </View>
                :
                        null
                }
               

                {
                    this.state.show
                    ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        
                                        <FastImage source={require('../assets/images/check_4.png')} style={{ width: 30, height: 30 }} resizeMode="contain" />
                                        <Text style={{ color: colors.darkish_blue, top: 8, fontWeight: 'bold', fontSize: 16 }}>Verification Done</Text>
                                        <Text style={{ color: colors.denim, top: 12, fontSize: 12 }}>NFC and QR data matched!</Text>
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('AppTabs')} style={{ justifyContent: 'center', alignItems: 'center', width: 110, height: 30, backgroundColor: colors.darkish_blue, marginTop: 40, borderRadius: 3 }}>
                                            <Text style={{ color: 'white' }}>Done</Text>
                                        </TouchableOpacity>

                            
                        </View>
                    :
                    
                        this.state.visible_logo
                            ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', bottom: 10 }}>
                                <FastImage source={require('../assets/images/nfc1.png')} style={{ width: 120, height: 120, }} resizeMode="contain" />
                                <Text style={{ color: colors.denim, top: 5 }}>Scan NFC Tag</Text>
                            </View>
                            :
                          
                    
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>

                            <FastImage source={require('../assets/images/remove.png')} style={{ width: 30, height: 30 }} resizeMode="contain" />
                            <Text style={{ color: colors.darkish_blue, top: 8, fontWeight: 'bold', fontSize: 16 }}>Verification Done</Text>
                            <Text style={{ color: colors.denim, top: 12, fontSize: 12 }}>NFC and QR data didn't match!</Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('AppTabs')} style={{ justifyContent: 'center', alignItems: 'center', width: 110, height: 30, backgroundColor: colors.darkish_blue, marginTop: 40, borderRadius: 3 }}>
                                <Text style={{ color: 'white' }}>Done</Text>
                            </TouchableOpacity>


                        </View> 
                    
                }
                
               
                
                
            </SafeAreaView>
        )
    }
}

export default Verify;
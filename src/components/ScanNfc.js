import React, { Component } from 'react';
import {
    View, StyleSheet, Image,
    ImageBackground, SafeAreaView, Text,
    BackHandler, Alert, ToastAndroid, TouchableOpacity, StatusBar
} from 'react-native';

import FastImage from 'react-native-fast-image'
import { colors } from '../styles/styles';
import { AppHeader } from '../utility/AppHeader'
import NfcManager, { NfcEvents, Ndef , NfcTech, } from 'react-native-nfc-manager';
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher';



class ScanNfc extends Component {

    state = {
      enable : undefined,
      text : '',
      date : new Date().toLocaleDateString(),
    }

  async componentDidMount() {
    
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
      this.read();
      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
        console.log('Scan tag Screen =>', tag.ndefMessage);
        const res = Ndef.text.decodePayload(tag.ndefMessage[0].payload)
        console.log('Verify res-----', res)
        this.setState({ text: res ? res : '' })
        NfcManager.unregisterTagEvent().catch(() => 0);

      });


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

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <AppHeader navigation={this.props.navigation} title="Scan NFC" />
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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FastImage source={require('../assets/images/nfc1.png')} style={{ width: 150, height: 150 }} resizeMode="contain" />
                    <Text style={{ color: colors.denim, fontSize: 12, top: 7 }}>Detecting NFC Tag</Text>
                </View>
            </SafeAreaView>
        )
    }
}


export default ScanNfc;
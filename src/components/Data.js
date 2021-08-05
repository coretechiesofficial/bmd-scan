import React, { Component } from 'react';
import {
    View, Image,
    SafeAreaView, Text,
    TouchableOpacity, 
    ScrollView, Modal, 
    Dimensions, Alert
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { colors } from '../styles/styles';
import { AppHeader } from '../utility/AppHeader'
import { ParseMonth } from '../constants/helper method/CommanMethod'
import NfcManager, { NfcEvents, Ndef , NfcTech} from 'react-native-nfc-manager';


function buildUrlPayload(valueToWrite) {
    return Ndef.encodeMessage([
        Ndef.textRecord(valueToWrite),
    ]);
  }

class Data extends Component {

    state = {
        show: false,
        title: '',
        from: this.props.route.params ? this.props.route.params.from : '',
        date : new Date().toLocaleDateString()
    }

  async  componentDidMount() {
        NfcManager.start();
        //console.log('props value', this.props.route.params.item)
        if (this.state.from == 'history') {
            this.setState({ title: this.props.route.params.item,  })
        }
        else {
            this.setState({ title: this.props.route.params.data , })
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
    }
    
    componentWillUnmount() {
        NfcManager.cancelTechnologyRequest().catch(() => 0);
        NfcManager.clearBackgroundTag().catch(() => 0);
        clearInterval(this.timer);
    }

    rendorModal = () => {
        return (
            <Modal visible={this.state.show} transparent={true} animationType='fade'>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    <View style={{ width: Dimensions.get('screen').width / 1.2, height: 170, backgroundColor: 'white', borderRadius: 2 }}>
                        <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <FastImage source={require('../assets/images/check_4.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                            <Text style={{ color: colors.darkish_blue, fontSize: 14, top: 10 }}>Data Written</Text>
                            <Text style={{ color: colors.denim, fontSize: 11, top: 15, textAlign: 'center' }}>The data have been written sucessfully into{'\n'} NFC Tag.</Text>
                        </View>
                        <View style={{ marginVertical: 42, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => this.onLaterPress() } style={{ width: '50%', height: 30, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#888888' }}>Later</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.8} onPress={() => this.onVerifyPress()} style={{ width: '50%', height: 30, backgroundColor: colors.darkish_blue, borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>Verify</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
        )
    }

    onLaterPress = () => {
        this.setState({ show: false })
        this.props.navigation.navigate('AppTabs')

    }

    onVerifyPress = () => {
        this.setState({ show: false })
        this.props.navigation.navigate('Verify',{item : this.state.title})
    }

    writeTag =  async () => {
        try {
            let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
              alertMessage: 'Ready to write some NFC tags!'
            });
            console.log('res',resp);
            let bytes = buildUrlPayload(this.state.title);
            await NfcManager.writeNdefMessage(bytes);
            await NfcManager.cancelTechnologyRequest().catch(() => 0);
            this.setState({ show: true })
            console.log('successfully write ndef');   
          } catch (ex) {
            console.warn('ex', ex);
            await NfcManager.cancelTechnologyRequest().catch(() => 0);
            this.setState({ show: false })
            alert('Hold the device near tag.')
          }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3fcff' }}>
                <AppHeader navigation={this.props.navigation} title="Data" />

                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} bounces={false}>
                    <View style={{
                        backgroundColor: 'white', height: 45, flexDirection: 'row', justifyContent: 'space-between', shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                    }}>

                        <TouchableOpacity activeOpacity={0.7} style={{ width: '35%', alignItems: 'center', flexDirection: 'row' }}>
                            <FastImage source={require('../assets/images/qr_code_1.png')} style={{ width: 20, height: 20, marginHorizontal: 10, }} resizeMode="contain" />
                            <Text style={{ color: colors.darkish_blue, fontSize: 14 }}>QR Code</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.7} style={{ width: '35%', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ color: '#898c8f', fontSize: 12 }}>{this.state.date}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* ------------------Name view start here---------------- */}
                    {/* <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/account_1.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', justifyContent: 'center', height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>NAME</Text>
                            <Text style={{ fontSize: 12 }}>-</Text>
                        </View>
                    </View> */}
                    {/* ------------------Name view end here---------------- */}

                    {/* ------------------COMPANY view start here---------------- */}
                    {/* <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/office_building.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical: 5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>COMPANY</Text>
                            <Text style={{ fontSize: 12, }}>-</Text>
                        </View>
                    </View> */}
                    {/* ------------------COMPANY view end here---------------- */}

                    {/* ------------------TITLE view start here---------------- */}
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 5, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 55, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/card_account_details.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical: 4, height: 55, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>TEXT</Text>
                            <Text numberOfLines={2} style={{ fontSize: 11 }}>{this.state.title}</Text>
                        </View>
                    </View>
                    {/* ------------------TITLE view end here---------------- */}

                    {/* ------------------PHONE view start here---------------- */}
                    {/* <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/phone.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical: 5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>PHONE</Text>
                            <Text style={{ fontSize: 12 }}>-</Text>
                        </View>
                    </View> */}
                    {/* ------------------PHONE view end here---------------- */}

                    {/* ------------------EMAIL view start here---------------- */}
                    {/* <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/email.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical: 5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>EMAIL</Text>
                            <Text style={{ fontSize: 12 }}>-</Text>
                        </View>
                    </View> */}
                    {/* ------------------EMAIL view end here---------------- */}

                    {/* ------------------STREET view start here---------------- */}
                    {/* <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/road_variant.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical: 5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>STREET</Text>
                            <Text style={{ fontSize: 12 }}>-</Text>
                        </View>
                    </View> */}
                    {/* ------------------STREET view end here---------------- */}

                    {/* ------------------CITY view start here---------------- */}
                    {/* <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/city_variant.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical: 5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>CITY</Text>
                            <Text style={{ fontSize: 12 }}>-</Text>
                        </View>
                    </View> */}
                    {/* ------------------CITY view end here---------------- */}

                    {/* ------------------STATE view start here---------------- */}
                    {/* <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/map_marker.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical: 5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>STATE</Text>
                            <Text style={{ fontSize: 12 }}>-</Text>
                        </View>
                    </View> */}
                    {/* ------------------STATE view end here---------------- */}


                    {/* ------------------ZIP CODE view start here---------------- */}
                    {/* <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/postage_stamp.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical: 5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>ZIP CODE</Text>
                            <Text style={{ fontSize: 12 }}>-</Text>
                        </View>
                    </View> */}
                    {/* ------------------ZIP CODE view end here---------------- */}

                    {/* ------------------WEBSITE view start here---------------- */}
                    {/* <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/web.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical: 5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>WEBSITE</Text>
                            <Text style={{ fontSize: 12 }}>-</Text>
                        </View>
                    </View> */}
                    {/* ------------------WEBSITE view end here---------------- */}

                    {/* ------------------FAX view start here---------------- */}
                    {/* <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/fax.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical: 5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>FAX</Text>
                            <Text style={{ fontSize: 12 }}>-</Text>
                        </View>
                    </View> */}
                    {/* ------------------FAX view end here---------------- */}

                    {/* ------------------BIRTHDAY view start here---------------- */}
                    {/* <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/cake_variant.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', justifyContent: 'center', height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>BIRTHDAY</Text>
                            <Text style={{ fontSize: 12 }}>01-07-1990</Text>
                        </View>
                    </View> */}
                    {/* ------------------BIRTHDAY view end here---------------- */}

                    {/* ------------------NOTE view start here---------------- */}
                    {/* <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/note_edit.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', justifyContent: 'center', height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>NOTE</Text>
                            <Text style={{ fontSize: 11 }}>Lorem ipsum dolor set amet that can define it well  content.</Text>
                        </View>
                    </View> */}
                    {/* ------------------NOTE view end here---------------- */}

                    <View style={{ height: 80 }}></View>
                </ScrollView>
                {
                    this.state.show
                        ?
                        this.rendorModal()
                        :
                        null
                }
                
                <TouchableOpacity activeOpacity={0.9} onPress={() => this.writeTag()} style={{ height: 40, backgroundColor: colors.darkish_blue, width: '50%', position: 'absolute', bottom: 0, zIndex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <FastImage source={require('../assets/images/writing.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                    <Text style={{ color: 'white', fontSize: 12, left: 10 }}>Write NFC Tag</Text>
                    
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.onVerifyPress()} style={{ height: 40, borderLeftColor:'#cccbc8', borderLeftWidth:1, backgroundColor: colors.darkish_blue, width: '50%', position: 'absolute', bottom: 0, zIndex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', right:0 }}>
                    <Text style={{ color: 'white' }}>Verify</Text>
                </TouchableOpacity>
                
            </SafeAreaView>
        )
    }
}

export default Data;
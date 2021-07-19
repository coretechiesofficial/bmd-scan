import React, { Component } from 'react';
import {
    View, Image,
    SafeAreaView, Text,
    TouchableOpacity, ScrollView, Modal, Dimensions
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { colors } from '../styles/styles';
import { AppHeader } from '../utility/AppHeader'



class Data extends Component {

    state = {
        show: false,
        city : this.props.route.params ? this.props.route.params.data.city : '',
        country : this.props.route.params ? this.props.route.params.data.country : '',
        email : this.props.route.params ? this.props.route.params.data.email : '',
        fax : this.props.route.params ? this.props.route.params.data.fax : '',
        mobile_no : this.props.route.params ? this.props.route.params.data.mobile_no : '',
        name : this.props.route.params ? this.props.route.params.data.name : '',
        org : this.props.route.params ? this.props.route.params.data.org : '',
        state : this.props.route.params ? this.props.route.params.data.state : '',
        street : this.props.route.params ? this.props.route.params.data.street : '',
        title : this.props.route.params ? this.props.route.params.data.title : '',
        website : this.props.route.params ? this.props.route.params.data.website : '',
        workpno : this.props.route.params ? this.props.route.params.data.workpno : '',
        zipcode : this.props.route.params ? this.props.route.params.data.zipcode : '',
    
    }

    componentDidMount() {
        console.log('props value', this.props.route.params.data)
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
                            <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({ show: false })} style={{ width: '50%', height: 30, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#888888' }}>Later</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Verify')} style={{ width: '50%', height: 30, backgroundColor: colors.darkish_blue, borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>Verify</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
        )
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
                            <Text style={{ color: '#898c8f', fontSize: 12 }}>July 01, 2021</Text>
                        </TouchableOpacity>
                    </View>

                    {/* ------------------Name view start here---------------- */}
                    <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/account_1.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', justifyContent: 'center', height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>NAME</Text>
                            <Text style={{ fontSize: 12 }}>{this.state.name}</Text>
                        </View>
                    </View>
                    {/* ------------------Name view end here---------------- */}

                    {/* ------------------COMPANY view start here---------------- */}
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/office_building.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical:5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>COMPANY</Text>
                            <Text style={{ fontSize: 12 , }}>{this.state.org}</Text>
                        </View>
                    </View>
                    {/* ------------------COMPANY view end here---------------- */}

                    {/* ------------------TITLE view start here---------------- */}
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/card_account_details.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%',  paddingVertical:5, height:50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>TITLE</Text>
                            <Text style={{ fontSize: 12 }}>{this.state.title}</Text>
                        </View>
                    </View>
                    {/* ------------------TITLE view end here---------------- */}

                    {/* ------------------PHONE view start here---------------- */}
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/phone.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical:5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>PHONE</Text>
                            <Text style={{ fontSize: 12 }}>+ {this.state.workpno ? this.state.workpno : this.state.mobile_no}</Text>
                        </View>
                    </View>
                    {/* ------------------PHONE view end here---------------- */}

                    {/* ------------------EMAIL view start here---------------- */}
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/email.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%',paddingVertical:5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>EMAIL</Text>
                            <Text style={{ fontSize: 12 }}>{this.state.email}</Text>
                        </View>
                    </View>
                    {/* ------------------EMAIL view end here---------------- */}

                    {/* ------------------STREET view start here---------------- */}
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/road_variant.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical:5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>STREET</Text>
                            <Text style={{ fontSize: 12 }}>{this.state.street}</Text>
                        </View>
                    </View>
                    {/* ------------------STREET view end here---------------- */}

                    {/* ------------------CITY view start here---------------- */}
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/city_variant.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical:5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>CITY</Text>
                            <Text style={{ fontSize: 12 }}>{this.state.city}</Text>
                        </View>
                    </View>
                    {/* ------------------CITY view end here---------------- */}

                    {/* ------------------STATE view start here---------------- */}
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/map_marker.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical:5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>STATE</Text>
                            <Text style={{ fontSize: 12 }}>{this.state.state}</Text>
                        </View>
                    </View>
                    {/* ------------------STATE view end here---------------- */}


                    {/* ------------------ZIP CODE view start here---------------- */}
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/postage_stamp.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical:5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>ZIP CODE</Text>
                            <Text style={{ fontSize: 12 }}>{this.state.zipcode}</Text>
                        </View>
                    </View>
                    {/* ------------------ZIP CODE view end here---------------- */}

                    {/* ------------------WEBSITE view start here---------------- */}
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/web.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical:5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>WEBSITE</Text>
                            <Text style={{ fontSize: 12 }}>{this.state.website}</Text>
                        </View>
                    </View>
                    {/* ------------------WEBSITE view end here---------------- */}

                    {/* ------------------FAX view start here---------------- */}
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/fax.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', paddingVertical:5, height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>FAX</Text>
                            <Text style={{ fontSize: 12 }}>+ {this.state.fax}</Text>
                        </View>
                    </View>
                    {/* ------------------FAX view end here---------------- */}

                    {/* ------------------BIRTHDAY view start here---------------- */}
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/cake_variant.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', justifyContent: 'center', height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>BIRTHDAY</Text>
                            <Text style={{ fontSize: 12 }}>01-07-1990</Text>
                        </View>
                    </View>
                    {/* ------------------BIRTHDAY view end here---------------- */}

                    {/* ------------------NOTE view start here---------------- */}
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, borderRightColor: '#bbbbbb', borderRightWidth: 1 }}>
                            <FastImage source={require('../assets/images/note_edit.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <View style={{ paddingLeft: 10, width: '80%', justifyContent: 'center', height: 50, borderBottomColor: '#bbbbbb', borderBottomWidth: 1, }}>
                            <Text style={{ color: colors.denim, fontSize: 14 }}>NOTE</Text>
                            <Text style={{ fontSize: 11 }}>Lorem ipsum dolor set amet that can define it well  content.</Text>
                        </View>
                    </View>
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
                <TouchableOpacity activeOpacity={0.9} onPress={() => this.setState({ show: true })} style={{ height: 40, backgroundColor: colors.darkish_blue, width: '100%', position: 'absolute', bottom: 0, zIndex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <FastImage source={require('../assets/images/writing.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                    <Text style={{ color: 'white', fontSize: 12, left: 10 }}>Write NFC Tag</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

export default Data;
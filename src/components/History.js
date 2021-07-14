import React, { Component } from 'react';
import {
    View, StyleSheet, Image,
    ImageBackground, SafeAreaView, AsyncStorage, Text,
    BackHandler, Alert, ToastAndroid, TouchableOpacity, StatusBar, FlatList
} from 'react-native';

import FastImage from 'react-native-fast-image'
import { colors } from '../styles/styles';
import { AppHeader } from '../utility/AppHeader'



const data = [
    {
        name: '15645874684142',
        date: 'July 01, 2021',
        img: require('../assets/images/qr_code_1.png'),
        selected: true
    },

    {
        name: '34564745663454',
        date: 'July 05, 2021',
        img: require('../assets/images/qr_code_1.png'),
        selected: false
    },

    {
        name: '34564745663454',
        date: 'July 04, 2021',
        img: require('../assets/images/nfc1.png'),
        selected: false
    }
]

class History extends Component {


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3fcff' }}>
                <AppHeader navigation={this.props.navigation} title="History" />
                <View style={{
                    backgroundColor: 'white', height: 45, flexDirection: 'row', shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                }}>

                    <TouchableOpacity activeOpacity={0.7}  style={{ width: '35%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.darkish_blue, fontSize: 14 }}>All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={{ width: '35%', justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: colors.darkish_blue, fontSize: 14 }}>Qr</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={{ width: '30%', justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: colors.darkish_blue, fontSize: 14 }}>Nfc</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    marginTop: 7,
                    backgroundColor: 'white',
                    //paddingVertical: 5,
                    marginHorizontal: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3
                }}>
                    <FlatList
                        data={data}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: 'row', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, paddingVertical: 10, marginVertical: 2, alignItems: 'center' }}>
                                {
                                    item.selected == true
                                        ?
                                        <FastImage source={require('../assets/images/checkedbox.png')} style={{ width: 18, height: 18, left: 20 }} resizeMode="contain" />
                                        :
                                        <FastImage source={require('../assets/images/uncheck.png')} style={{ width: 18, height: 18, left: 20 }} resizeMode="contain" />
                                }

                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '40%', marginLeft: 40 }}>
                                    <FastImage source={item.img} style={{ width: 30, height: 30, }} resizeMode="contain" />
                                    <Text numberOfLines={1} style={{ color: colors.denim, fontSize: 12, left: 12 }}>{item.name}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '30%', marginLeft: 40 }}>
                                    <Text numberOfLines={1} style={{ color: '#898c8f', fontSize: 12, left: 12 }}>{item.date}</Text>
                                </View>
                            </View>
                        )}
                    />
                    <View style={{ marginVertical: 10, justifyContent: 'flex-end', alignItems: 'flex-end', marginHorizontal:10 }}>
                        <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: colors.darkish_blue, width: 100, height: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize:13 }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}


export default History;
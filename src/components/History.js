import React, { Component } from 'react';
import {
    View, StyleSheet, Image,
    ImageBackground, SafeAreaView, Text,
    BackHandler, Alert, ToastAndroid, TouchableOpacity, StatusBar, FlatList
} from 'react-native';

import FastImage from 'react-native-fast-image'
import { colors } from '../styles/styles';
import { AppHeader } from '../utility/AppHeader'
import { ServiceConstant } from '../constants/ServiceConstant'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParseMonth } from '../constants/helper method/CommanMethod'


class History extends Component {

    state = {
        data: [],
        qr_data: [],
        iall_selected: true,
        isqr_selected: false,
        isnfc_selected: false,
        backup_arr: [],
        backup_arr1: []
    }

    async componentDidMount() {
        let result = await AsyncStorage.getItem('hisdata')
        console.log('result', result)
        this.setState({ data: JSON.parse(result) })

    }


    showDate = (date) => {
        let new_date = date.slice(0, 10)
        let mod_date = new_date.split("-")
        let month = ParseMonth(mod_date[1])
        return month + " " + mod_date[2] + ", " + mod_date[0]
    }

    showQrData = async () => {
        this.setState({ isqr_selected: true, iall_selected: false, isnfc_selected: false })
        let arr = [...this.state.data]
        // console.log('arr', arr)
        let res = arr.filter((item, index) => item.type == 'QR_CODE')
        //console.log('res', res)
        this.setState({ qr_data: res })
    }

    onSelect = (indx) => {
        //console.log('id', indx)
        let arr = [...this.state.data]
        arr.map((item, index) => {
            if (index == indx) {
                item['selected'] = !item['selected']
            }
        })
        // console.log('arrr', arr)
        this.setState({ data: arr, backup_arr: arr })
    }

    onSelectQR = (indx) => {
        // console.log('id', indx)
        let arr = [...this.state.qr_data]
        arr.map((item, index) => {

            if (index == indx) {
                item['selected'] = !item['selected']
            }
        })
        //console.log('arrr', arr)
        this.setState({ qr_data: arr, backup_arr1: arr })
    }

    onRemove = async () => {
        let demo = this.state.backup_arr.filter(item => item.selected == false).map(itm => itm)
       // console.log('demo', demo);
        await this.setState({ data: demo })
        console.log('state', this.state.data)
        await AsyncStorage.setItem('hisdata', JSON.stringify(this.state.data))

    }

    onRemoveQR = async () => {
        console.log('backup arr1', this.state.backup_arr1)
        let demo = this.state.backup_arr1.filter(item => item.selected == false).map(itm => itm)
        await this.setState({ qr_data: demo,  data: demo})
        await AsyncStorage.setItem('hisdata', JSON.stringify(this.state.data))
    }


    handleData = async () => {
        this.setState({ iall_selected: true, isnfc_selected: false, isqr_selected: false })
    }

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

                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.handleData()} style={{ width: '35%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: this.state.iall_selected ? colors.darkish_blue : colors.denim, fontSize: 14, fontWeight: this.state.iall_selected ? 'bold' : '' }}>All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.showQrData()} style={{ width: '35%', justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: this.state.isqr_selected ? colors.darkish_blue : colors.denim, fontSize: 14, fontWeight: this.state.isqr_selected ? 'bold' : '' }}>Qr</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.setState({ isnfc_selected: true, isqr_selected: false, iall_selected: false })} style={{ width: '30%', justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: this.state.isnfc_selected ? colors.darkish_blue : colors.denim, fontSize: 14, fontWeight: this.state.isnfc_selected ? 'bold' : '' }}>Nfc</Text>
                    </TouchableOpacity>
                </View>

                {
                    this.state.iall_selected
                        ?
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
                            {
                                this.state.data && this.state.data.length > 0
                                    ?
                                    <>
                                        <FlatList
                                            data={this.state.data}
                                            showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={({ item, index }) => (

                                                <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('Data', { from: 'history', item: item.data })} style={{ flexDirection: 'row', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, paddingVertical: 10, marginVertical: 2, alignItems: 'center', }}>
                                                    {
                                                        item.selected == true
                                                            ?
                                                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.onSelect(index)} style={{ width: '10%', marginLeft: 10, }}>
                                                                <FastImage source={require('../assets/images/checkedbox.png')} style={{ width: 18, height: 18, }} resizeMode="contain" />
                                                            </TouchableOpacity>
                                                            :
                                                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.onSelect(index)} style={{ width: '10%', marginLeft: 10 }}>
                                                                <FastImage source={require('../assets/images/uncheck.png')} style={{ width: 18, height: 18, }} resizeMode="contain" />
                                                            </TouchableOpacity>
                                                    }

                                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '45%', }}>
                                                        <FastImage source={require('../assets/images/qr_code_1.png')} style={{ width: 30, height: 30, }} resizeMode="contain" />
                                                        <Text numberOfLines={1} style={{ color: colors.denim, fontSize: 12, left: 12 }}>{item.data}</Text>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '30%', marginLeft: 40 }}>
                                                        <Text numberOfLines={1} style={{ color: '#898c8f', fontSize: 12, left: 12 }}>{this.showDate(item.date)}</Text>
                                                    </View>

                                                </TouchableOpacity>
                                            )}
                                        />
                                        <View style={{ marginVertical: 10, justifyContent: 'flex-end', alignItems: 'flex-end', marginHorizontal: 10 }}>
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => this.onRemove()} style={{ backgroundColor: colors.darkish_blue, width: 100, height: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: 'white', fontSize: 13 }}>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>


                                    :


                                    <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>No records found.</Text>
                                    </View>
                            }

                        </View>
                        :
                        null
                }

                {
                    this.state.isqr_selected
                        ?
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
                            {
                                this.state.qr_data && this.state.qr_data.length > 0
                                    ?
                                    <>
                                        <FlatList
                                            data={this.state.qr_data}
                                            showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={({ item, index }) => (

                                                <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('Data', { from: 'history', item: item.data })} style={{ flexDirection: 'row', borderBottomColor: '#bbbbbb', borderBottomWidth: 1, paddingVertical: 10, marginVertical: 2, alignItems: 'center', }}>
                                                    {
                                                        item.selected == true
                                                            ?
                                                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.onSelectQR(index)} style={{ width: '10%', marginLeft: 10, }}>
                                                                <FastImage source={require('../assets/images/checkedbox.png')} style={{ width: 18, height: 18, }} resizeMode="contain" />
                                                            </TouchableOpacity>
                                                            :
                                                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.onSelectQR(index)} style={{ width: '10%', marginLeft: 10 }}>
                                                                <FastImage source={require('../assets/images/uncheck.png')} style={{ width: 18, height: 18, }} resizeMode="contain" />
                                                            </TouchableOpacity>
                                                    }

                                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '45%', }}>
                                                        <FastImage source={require('../assets/images/qr_code_1.png')} style={{ width: 30, height: 30, }} resizeMode="contain" />
                                                        <Text numberOfLines={1} style={{ color: colors.denim, fontSize: 12, left: 12 }}>{item.data}</Text>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '30%', marginLeft: 40 }}>
                                                        <Text numberOfLines={1} style={{ color: '#898c8f', fontSize: 12, left: 12 }}>{this.showDate(item.date)}</Text>
                                                    </View>

                                                </TouchableOpacity>
                                            )}
                                        />
                                        <View style={{ marginVertical: 10, justifyContent: 'flex-end', alignItems: 'flex-end', marginHorizontal: 10 }}>
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => this.onRemoveQR()} style={{ backgroundColor: colors.darkish_blue, width: 100, height: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: 'white', fontSize: 13 }}>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>


                                    :


                                    <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>No records found.</Text>
                                    </View>
                            }

                        </View>
                        :
                        null
                }


            </SafeAreaView>
        )
    }
}


export default History;
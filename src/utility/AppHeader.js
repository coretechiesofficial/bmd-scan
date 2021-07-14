import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard, KeyboardEvent, LayoutAnimation, UIManager, Dimensions, SafeAreaView, StatusBar, TouchableOpacity, ImageBackground, TextInput, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors } from '../styles/styles';



export function AppHeader({ title, navigation, onPress}) {
    return (
        <SafeAreaView>
            <StatusBar barStyle='default'   backgroundColor={colors.darkish_blue}/>
            <View style={{backgroundColor: colors.darkish_blue, height:50, flexDirection:'row'}}>
                
                <TouchableOpacity activeOpacity={0.7} onPress={()=> navigation.goBack()} style={{width:'20%',  justifyContent:'center'}}>
                    <FastImage source={require('../assets/images/down_arrow.png')} style={{width:16, height:16, left:20}} resizeMode="contain"/>
                </TouchableOpacity>

                <View  style={{ width:'60%',  justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'white', fontSize:14}}>{title}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
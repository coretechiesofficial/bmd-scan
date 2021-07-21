import React, { Component } from 'react';
import {
    View, StyleSheet, Image,
    ImageBackground, SafeAreaView, AsyncStorage, Text,
    BackHandler, Alert, ToastAndroid, TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image';
import { colors } from '../styles/styles'


import Home from '../components/Home';
import About from '../components/About'

const Tab = createBottomTabNavigator();


export const AppTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeBackgroundColor: colors.darkish_blue,
                inactiveBackgroundColor: colors.darkish_blue,
                activeTintColor: 'white',
                inactiveTintColor: '#11619d',
                tabStyle: {
                    justifyContent: 'center',
                },
                labelStyle: {
                    fontSize: 13
                }
            }}

        >

            <Tab.Screen
                name="Home"
                component={Home}

                options={{
                    tabBarLabel: 'Home',

                }}
            />

            <Tab.Screen
                name="About"
                component={About}
                options={{
                    tabBarLabel: 'About',
                }}
            />




        </Tab.Navigator>
    )
}
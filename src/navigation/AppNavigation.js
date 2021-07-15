import React, { Component } from "react";
import { View, Text , StatusBar} from "react-native";
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {AppTabs} from './TabNavigation'

import Splash from '../splash/Splash'
import ScanNfc from '../components/ScanNfc';
import History from '../components/History';
import Data from '../components/Data'



const Stack = createStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
            }}>
               
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="ScanNfc" component={ScanNfc} options={{ headerShown: false }} />
                <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
                <Stack.Screen name="Data" component={Data} options={{ headerShown: false }} />
                
                <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;
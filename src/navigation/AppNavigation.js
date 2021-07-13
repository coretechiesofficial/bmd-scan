import React, { Component } from "react";
import { View, Text , StatusBar} from "react-native";
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Splash from '../splash/Splash'






const Stack = createStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
            }}>
               
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                     
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;
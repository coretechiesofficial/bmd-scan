
import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

class Splash extends Component {

    componentDidMount() {
       
        setTimeout(() => {
            SplashScreen.hide()
            StatusBar.setHidden(false)
           
        }, 1800) 
        this.props.navigation.navigate('AppTabs')
    }

    render() {
        return (
            <SafeAreaView >

            </SafeAreaView>
        )
    }
}

export default Splash;


import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

class Splash extends Component {

    componentDidMount() {
        
        setTimeout(() => {
            SplashScreen.hide()
            
           
        }, 1200) 
        this.props.navigation.navigate('AppTabs',{move : 'splash'})
    }

    render() {
        return (
            <SafeAreaView >

            </SafeAreaView>
        )
    }
}

export default Splash;

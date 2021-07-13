
import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation'
import { Provider } from 'react-redux';
import { store } from './src/store/index'

class App extends Component {


  render() {
    return (

      <Provider store={store}>
        <AppNavigation />
      </Provider>


    )
  }
}

export default App;

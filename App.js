import React from 'react';
import {
    AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import codePush from "react-native-code-push";

export default ChirpApp = StackNavigator({
    Home: { screen: Home },
    Login: { screen: Login },
    Register: { screen: Register },
});

const codePushOptions = { 
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, 
    installMode: codePush.InstallMode.ON_NEXT_RESUME 
  }
ChirpApp =  codePush(codePushOptions)(ChirpApp);
AppRegistry.registerComponent('Chirp', () => ChirpApp);
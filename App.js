import React from 'react';
import {
    AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const ChirpApp = StackNavigator({
    Home: { screen: Home },
    Login: { screen: Login },
    Register: { screen: Register },
});
AppRegistry.registerComponent('Chirp', () => ChirpApp);
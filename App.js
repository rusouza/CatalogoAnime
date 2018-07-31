import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Platform, Image } from 'react-native'
import { Container, Content, Picker, Button, Text } from "native-base";
import { SwitchNavigator } from 'react-navigation';
import Home from "./src/componentes/HomeComponent.js";
import Loading from './src/paginas/Loading'
import SignUp from './src/paginas/SignUp'
import Login from './src/paginas/Login'
import Main from './src/paginas/Main'

const App = SwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
)

export default App;

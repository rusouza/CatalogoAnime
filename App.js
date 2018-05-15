import React from 'react';
import { View } from 'react-native';
import { Container, Content, Picker, Button, Text } from "native-base";
import Home from "./src/componentes/HomeComponent.js";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    this.setState({ isReady: true });
  }
  render() {
    if(this.state.isReady) {
      return <Home />;
    }
  }
}

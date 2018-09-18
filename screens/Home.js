import React from 'react';
import { View, Text } from 'react-native';
//import SocketIOClient from 'socket.io-client';
import { Button } from 'react-native-elements';

import socket from '../helpers/socketHelper';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Smoke',
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: 'Test',
      alert: false,
      hasCameraPermission: null,
    };

    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.sendResponse = this.sendResponse.bind(this);

    socket.on('alert', this.onReceivedMessage);
  }

  onReceivedMessage(messages) {
    console.log(messages);
    this.setState({ alert: true });
  }

  sendResponse() {
    console.log('OK');
     socket.emit('alertresponse', this.state.messages);
  }

  renderResponseButton() {
    if (this.state.alert) {
      return (
        <View>
          <Button
            title="Verdadero"
            onPress={() => this.sendResponse()}
          />
          <Button
            title="Falso"
            onPress={() => this.sendResponse()}
          />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Este es un contador de socket.io</Text>
        <Text>{this.state.messages}</Text>
        <Button
          title="Ir a scanner QR"
          onPress={() => this.props.navigation.navigate('ScannerQR')}
        />
        { this.renderResponseButton() }
      </View>
    );
  }
}

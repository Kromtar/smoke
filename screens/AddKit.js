import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

import socket from '../helpers/socketHelper';

export default class AddKit extends React.Component {

  static navigationOptions = {
    title: 'Scanner QR',
  };

  constructor(props) {
    super(props);
    this.state = {
      qr: 'Test',
      messages: 'Test',
      alert: false,
      hasCameraPermission: null,
    };

    this.onReceivedMessage = this.onReceivedMessage.bind(this);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    socket.on('test', this.onReceivedMessage);
  }

  onReceivedMessage(messages) {
    this.setState({ messages: messages.msg });
  }

  handleBarCodeRead = ({ type, data }) => {
    console.log(type, data);
    this.setState({ qr: data });
    socket.emit('qr', data);
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeRead={this.handleBarCodeRead}
            style={{ height: 200, width: 200 }}
          />
          <Text>{this.state.qr}</Text>
          <Text>{this.state.messages}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  }
});

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

import socket from '../helpers/socketHelper';
import kit from '../components/kit';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { NAVIGATIONback } from '../actions/navigation';
import { getToken } from '../helpers/pushNotification';
//TODO: ESTA VENTANA ES UN EJEMPLO, NO ES CODIGO DEPURADO

class AddKit extends React.Component {
  
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
    this.setState({ qr: data });
    const kitID = data.split(',')[0];
    console.log(`Type ${type}`)
    if (kitID.split(':')[0] === 'kitID'){
      console.log(`Pass security, data: ${kitID.split(':')[1]}`);
      getToken().then((token)=>{
        this.props.EMITaddkit({ kitID: kitID.split(':')[1],
        phoneId: Constants.installationId,
        phonePushToken: token
        });//socket.emit('qr', kitID.split(':')[1]);  
        this.props.navigation.dispatch(NAVIGATIONback);});
    }
    
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeRead={this.handleBarCodeRead}
          style={{ height: 600, width: 400 }}
        />
        <Text>{this.state.qr}</Text>
        <Text>{this.state.messages}</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    allKitStatus: state.allKitStatus //Tiene la lista de kits y sensores
  };
}

export default connect(mapStateToProps, actions)(AddKit);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  }
});

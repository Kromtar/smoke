import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import Modal from "react-native-modal";

import socket from '../helpers/socketHelper';

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
      isModalVisible: false,
      lock: true,
      token: '',
      kitId: '',
      number: ''
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
  _toggleModal = () => {
    if (this.state.lock){
      this.setState({ isModalVisible: !this.state.isModalVisible });
      this.setState({ lock: !this.state.lock });
    }
  }
  _tokenAdder = ({ kitIdData, tokenData }) => {
    this.setState({ token: tokenData });
    this.setState({ kitId: kitIdData });
  }

  _pusher = () => {
    this.props.EMITaddkit({ kitId: this.state.kitId,
        phoneId: Constants.installationId,
        phonePushToken: this.state.token,
        phoneNumber: this.state.number
        });
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.setState({ lock: !this.state.lock });
    this.props.navigation.dispatch(NAVIGATIONback);
  }
  
  _handleInfo
  handleBarCodeRead = ({ type, data }) => {
    this.setState({ qr: data });
    const kitId = data.split(',')[0];
    console.log(`Type ${type}`);
    if (kitId.split(':')[0] === 'kitID'){
      const kitIdData = kitId.split(':')[1];
      console.log(`Pass security, data: ${kitIdData}`);
      getToken().then(( tokenData )=>{
        this._tokenAdder({ kitIdData, tokenData });
      });
      this._toggleModal();
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
        <Modal isVisible={this.state.isModalVisible}>
          <TextInput
            style={styles.input}
            value={this.state.phone}
            onChangeText={number => this.setState({ number })}
            placeholder="Número de teléfono"
            keyboardType="phone-pad"
            onSubmitEditing={()=> this._pusher()}
            underlineColorAndroid="#f5f5f5"
            placeholderTextColor="#f5f5f5"
            selectionColor="#f5f5f5"
          />
        </Modal>
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
    zindex: 1,
  },
  input: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
    zindex: 2,
  },
});

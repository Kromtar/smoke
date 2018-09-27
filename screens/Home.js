import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';

import socket from '../helpers/socketHelper';
import KitsList from '../components/KitsList';
import KitViewer from '../components/KitViewer';

import * as actions from '../actions';

import { alertFaker } from '../helpers/fakeSocket';

//TODO: En caso que llegue una alerta, se cambia a ventana del kit
// mover alerta on al helper de socket ??

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Smoke',
  };

  constructor(props) {
    super(props);
    this.initOnEvents = this.initOnEvents.bind(this);
    this.alertHandler = this.alertHandler.bind(this);
  }

  //Luego que se monta el componente (no se activa por cambio de props)
  //Comprobamos que el socket este activo.
  componentDidMount() {
    if (this.props.conectionState) {
      this.initOnEvents();
    }
  }

  //Cuando el componente recibe nuevas props.
  //Comprobamos que el socket este activo.
  componentWillReceiveProps(newProps) {
    if (newProps.conectionState) {
      this.initOnEvents();
    }
  }

  initOnEvents() {
    socket.on('alert', this.alertHandler);
  }

  alertHandler(data) {
    //console.log('Alert data: ', data);
    this.props.incomeAlert(data);
  }

  renderContent() {
    if (this.props.alert.kitStatus === 'bien') {
      return (
        <View style={{ flex: 1 }}>
          <KitsList />
          <View style={styles.ButtonView}>
            <TouchableOpacity
              style={styles.AddkitButton}
              onPress={() => this.props.navigation.navigate('AddKit')}
            >
               <Icon
                 name={'add'}
                 size={30}
                 color="white"
               />
             </TouchableOpacity>
          </View>

          <View style={styles.TESTBUTTONVIEw}>
            <TouchableOpacity
              style={styles.TESTBUTTOn}
              onPress={() => this.props.incomeAlert(alertFaker)}
            >
               <Icon
                 name={'toc'}
                 size={30}
                 color="red"
               />
             </TouchableOpacity>
          </View>

        </View>
      );
    }
    return (
      //TODO: Cambiar por una ventana en el navigator
      <KitViewer
        name={this.props.alert.kitName}
        state={this.props.alert.kitStatus}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderContent()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    conectionState: state.conectionStateReducer,
    alert: state.alertReducer
  };
}

export default connect(mapStateToProps, actions)(HomeScreen);

const styles = StyleSheet.create({
  AddkitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: 'green',
    borderRadius: 70,
  },
  ButtonView: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  TESTBUTTONVIEw: {
    position: 'absolute',
    bottom: 100,
    right: 10
  },
  TESTBUTTOn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: 'black',
    borderRadius: 70,
  },
});

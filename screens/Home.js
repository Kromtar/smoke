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
    console.log('Alert data: ', data);
  }

  render() {
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

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    conectionState: state.app
  };
}

export default connect(mapStateToProps, {})(HomeScreen);

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
  }
});

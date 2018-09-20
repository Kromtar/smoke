import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Constants } from 'expo';

import socket from '../helpers/socketHelper';
import Kit from './kit';
import { allKitsStatusUpdaterFaker } from '../helpers/fakeSocket';

class KitsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      kits: {},
    };

    this.allKitsStatusUpdater = this.allKitsStatusUpdater.bind(this);
    this.allkitsStatusHandler = this.allkitsStatusHandler.bind(this);
  }

  //Luego que se monta el componente (no se activa por cambio de props)
  //Comprobamos que el socket este activo.
  componentDidMount() {
    if (this.props.conectionState || process.env.FAKESOCKETIO) {
      this.allKitsStatusUpdater();
    }
  }

  //Cuando el componente recibe nuevas props.
  //Comprobamos que el socket este activo.
  componentWillReceiveProps(newProps) {
    if (newProps.conectionState) {
      this.allKitsStatusUpdater();
    }
  }

  allKitsStatusUpdater() {
    if (!process.env.FAKESOCKETIO) {
      socket.emit('checkallstatus', { phoneID: Constants.installationId }, () => {
        socket.on('allkitsstatus', this.allkitsStatusHandler);
      });
    } else {
      this.allkitsStatusHandler(allKitsStatusUpdaterFaker);
    }
  }

  allkitsStatusHandler(data) {
    this.setState({
      kits: data
    });
  }

  renderContent() {
    if (_.size(this.state.kits) > 0) {
      if (this.state.kits.elements) {
        //En caso que existan kits
        return (
          <ScrollView >
            <Kit name='Galpon' />
            <Kit color='red' />
          </ScrollView>
        );
      }
      return (
        //En caso qe no existan kits
        <Text>
          No hay elementos
        </Text>
      );
    }
    return (
      //En caso de estar esperando la respuesta aun
      <ActivityIndicator size="large" color="#0000ff" />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        {this.renderContent()}

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

export default connect(mapStateToProps, {})(KitsList);

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

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Constants } from 'expo';

import socket from '../helpers/socketHelper';
import Kit from './kit';
import { allKitsStatusUpdaterFaker } from '../helpers/fakeSocket';
import KitViewer from './KitViewer';

//TODO: En caso que por allkitsstatus llegue hay una alerta, se cambia a ventana de kit
//se pueden tener todos los on en el socket helper y los emit en las actions y ejecutar desde aca

class KitsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      kits: {},
    };

    this.allKitsStatusUpdater = this.allKitsStatusUpdater.bind(this);
    this.allkitsStatusHandler = this.allkitsStatusHandler.bind(this);
    this.openKitReviewHandler = this.openKitReviewHandler.bind(this);
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

  openKitReviewHandler(key) {
    console.log('Click en kit: ', key);
  }

  renderKits() {
    //TODO: pasar estados de kit a un reducer global
    return _.map(this.state.kits.kitsList, (val, key) => {
      return (
        <TouchableOpacity key={key} onPress={() => this.openKitReviewHandler(key)}>
          <Kit
            key={key}
            name={val.kitName}
            state={val.kitStatus}
          />
        </TouchableOpacity>
    );
    });
  }

  renderContent() {
    if (_.size(this.state.kits) > 0) {
      if (this.state.kits.elements) {
        //En caso que existan kits
        return (
          <ScrollView >
            {this.renderKits()}
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
      <View>
        {this.renderContent()}
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

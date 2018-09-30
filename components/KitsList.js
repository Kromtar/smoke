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

import * as actions from '../actions';
import Kit from './kit';

//TODO: Dejar de ocupar el paramtro "elements" del objeto "allKitStatus"
//para verificar si existen kits. Reemplazar por un size del objeto.

class KitsList extends React.Component {

  constructor(props) {
    super(props);
    this.allKitsStatusUpdater = this.allKitsStatusUpdater.bind(this);
  }

  //Luego que se monta el componente:
  //Comprobamos que el socket este conectado.
  //process.env.FAKESOCKETIO ---> para poder cargar el faker independiente del socket
  componentDidMount() {
    if (this.props.conectionState) {
      this.allKitsStatusUpdater();
    }
    //Para cargar los datos falsos
    if (process.env.FAKESOCKETIO) {
      this.props.FAKERallkitsstatus();
    }
  }

  //Cuando el componente recibe nuevas props.
  //Comprobamos si el socket paso de estar desconectado a conectado.
  //Lo anterior para manejar casos de desconeccion
  componentWillReceiveProps(newProps) {
    if (this.props.conectionState === false && newProps.conectionState === true) {
      this.allKitsStatusUpdater();
    }
  }

  allKitsStatusUpdater() {
    this.props.EMITcheckallstatus(Constants.installationId);
  }

  renderKits() {
    return _.map(this.props.allKitStatus.kitsList, (val, key) => {
      return (
        <TouchableOpacity key={key} onPress={() => this.props.onClickInKit(key)}>
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
    if (_.size(this.props.allKitStatus) > 0) {
      if (this.props.allKitStatus.elements) {
        //En caso que existan kits en el reducer
        return (
          <ScrollView >
            {this.renderKits()}
          </ScrollView>
        );
      }
      return (
        //En caso qe no existan kits reducer
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
    conectionState: state.app,       //Tiene el estado de la conexión
    allKitStatus: state.allKitStatus //Tiene la lista de kits y sensores
  };
}

export default connect(mapStateToProps, actions)(KitsList);

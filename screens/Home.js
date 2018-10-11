import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as actions from '../actions';
import KitsList from '../components/KitsList';

//TODO: Dejar de ocupar el paramtro "elements" del objeto "allKitStatus"
//para verificar si existen kits. Reemplazar por un size del objeto.
//TODO: Integrar pushNotifications

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Smoke',
  };

  constructor(props) {
    super(props);
    this.onClickInKitHandler = this.onClickInKitHandler.bind(this);
  }

  componentWillReceiveProps(newProps) {
    //Cada vez que los kits son actualizados, esta pantalla los revisa.
    //En caso de que alguno tenga un status "mal", se despliega la ventana
    //correspondiente de dicho kit.
    if (newProps.allKitStatus.elements) {
      Object.keys(newProps.allKitStatus.kitsList).forEach((key) => {
        if (newProps.allKitStatus.kitsList[key].kitStatus === 'mal') {
          this.props.navigation.navigate('KitViewer', { kitKey: key });
        }
      });
    }
  }

  onClickInKitHandler(key) {
    this.props.navigation.navigate('KitViewer', { kitKey: key });
  }

  render() {
    //TODO: Quitar boton para ejecutar la aler faker.
    return (
      <View style={{ flex: 1 }}>
        <KitsList
          onClickInKit={(key) => this.onClickInKitHandler(key)}
        />
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
    allKitStatus: state.allKitStatus
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

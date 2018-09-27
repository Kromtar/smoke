import React from 'react';
import {
  View,
  Text,
} from 'react-native';

class KitViewer extends React.Component {

  static navigationOptions = {
    title: 'Smoke',
  };

  render() {
    const key = this.props.navigation.getParam('key', 'nada');

    return (
      <View>
        <Text>El sensor {key} esta: {this.props.state}</Text>
      </View>
    );
  }
}

export default KitViewer;

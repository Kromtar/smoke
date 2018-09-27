import React from 'react';
import {
  View,
  Text,
} from 'react-native';

class KitViewer extends React.Component {

  render() {
    return (
      <View>
        <Text>El sensor {this.props.name} esta: {this.props.state}</Text>
      </View>
    );
  }
}

export default KitViewer;

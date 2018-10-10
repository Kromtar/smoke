import React from 'react';
import { View } from 'react-native';
import KitDetail from '../components/KitDetail';

class KitViewer extends React.Component {

  static navigationOptions = {
    title: 'Smoke',
  };

  render() {
    const kitKey = this.props.navigation.getParam('kitKey', 'nada');

    return (
      <View>
        <KitDetail kitKey={kitKey} />
      </View>
    );
  }
}

export default KitViewer;
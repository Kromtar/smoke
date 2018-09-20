import React from 'react';
import KitsList from '../components/KitsList';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Smoke',
  };

  render() {
    return (
      <KitsList navigation={this.props.navigation} />
    );
  }
}

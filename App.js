import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/Home';
import ScannerQR from './screens/ScannerQR';

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    ScannerQR: ScannerQR,
  },
  {
    initialRouteName: 'Home',
  }
);

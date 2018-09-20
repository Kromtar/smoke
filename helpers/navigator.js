import { createStackNavigator } from 'react-navigation';
import Home from '../screens/Home';
import AddKit from '../screens/AddKit';

const RootStack = createStackNavigator(
  {
    Home,
    AddKit,
  },
  {
    initialRouteName: 'Home',
  }
);

export default RootStack;

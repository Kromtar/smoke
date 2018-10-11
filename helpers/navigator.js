import { createStackNavigator } from 'react-navigation';
import Home from '../screens/Home';
import AddKit from '../screens/AddKit';
import KitViewer from '../screens/KitViewer';

const RootStack = createStackNavigator(
  {
    Home,
    AddKit,
    KitViewer
  },
  {
    initialRouteName: 'Home',
  }
);

export default RootStack;

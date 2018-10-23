import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import RootStack from './helpers/navigator';

export const store = createStore(reducers, {},
  compose(applyMiddleware(reduxThunk))
);
/*async function getToken() {
  // Remote notifications do not work in simulators, only on device
  let { status } = await Expo.Permissions.askAsync(
    Expo.Permissions.NOTIFICATIONS,
  );
  if (status !== 'granted') {
    return;
  }
  let value = await Expo.Notifications.getExpoPushTokenAsync();
  console.log('Our token', value);
  /// Send this to a server
  //EMITpushtoken;
}*/

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

import Expo from 'expo';
import { store } from '../App';
import { ALERT } from '../actions/types';

async function getToken() {
    // Remote notifications do not work in simulators, only on device
    let { status } = await Expo.Permissions.askAsync(
      Expo.Permissions.NOTIFICATIONS,
    );
    if (status !== 'granted') {
      return;
    }
    let value = await Expo.Notifications.getExpoPushTokenAsync();
    console.log('Our token', value);
    return value;
  }
function handleNotification ({origin,data}) {
    //var dataPayload = JSON.parse(data);
    
    //var actionPayload = dataPayload;
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)} 
      And typeof data: ${typeof data}`
    );
  }

module.exports= {
    getToken,
    handleNotification
};

import Expo from 'expo';
import { store } from '../App';
import {ALERT} from '../actions/types';

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
    //const dataPayload = JSON.stringify(data.data);
    var datapayload = JSON.stringify(eval('('+data+')'));
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
    if(data.origin == 'received' && typeof datapayload === 'object' ){
        store.dispatch({ type: ALERT, payload: { datapayload } });
    }
    else{
        console.log("Did not dispatch");
    }
  };

module.exports= {
    getToken,
    handleNotification
};

//"\"{\"kitsList\":{\"k1000\":{\"kitName\": \"Nombre kit 1\", \"kitStatus\": \"mal\",\"sensor\":{\"k1000s1\":{\"nombre\": \"Sensor 1 del kit 1\", \"status\": \"mal\"}}}}\""
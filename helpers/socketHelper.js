import io from 'socket.io-client';
import { store } from '../App';
import Expo from 'expo';

import {
  CONECTIONSTATE,
  ALLKITSATUS,
  ALERT,
  KITSTATUS
} from '../actions/types';  

import { handleNotification } from './pushNotification';

const socket = io(process.env.SERVERURL);

//Conecta al socket

socket.on('connect', () => {
  console.log('Connection OK socket.io');
  socket.emit('applogin', { phoneid: Expo.Constants.installationId });
  store.dispatch({ type: CONECTIONSTATE, payload: { conectionState: true } });
    // change to Expo.Constants.installationId
  //--  Lista de eventos ON --//
  Expo.Notifications.addListener(handleNotification);
  socket.emit('checkallstatus', { phoneId: Expo.Constants.installationId });
  socket.on('allkitsstatus', allkitsStatusHandler);
  socket.on('alert', alertHandler);
  socket.on('alertresponseconfirm', alertresponseconfirmHandler);
});

//Cuando el server envia la lista de kits
function allkitsStatusHandler(data) {
  console.log('Kitstatus: ', data);
  store.dispatch({ type: ALLKITSATUS, payload: { data } });
}

//Cuando el server envia una alerta normal
function alertHandler(data) {
  console.log('Alert: ', data);
  store.dispatch({ type: ALERT, payload: { data } });
}

//Cuando el server actualiza la info luego de responder a una alerta
function alertresponseconfirmHandler(data) {
  console.log(data);
  store.dispatch({ type: KITSTATUS, payload: { data } });
}

socket.on('connect_failed', () => {
    console.log('Connection Failed socket.io');
});

socket.on('disconnect', () => {
  console.log('Disconnected socket.io');
});

export default socket;

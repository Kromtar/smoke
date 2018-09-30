import io from 'socket.io-client';
import { store } from '../App';

import {
  CONECTIONSTATE,
  ALLKITSATUS,
  ALERT
} from '../actions/types';


const socket = io(process.env.SERVERURL);

//Conecta al socket
socket.on('connect', () => {
  console.log('Connection OK socket.io');
  store.dispatch({ type: CONECTIONSTATE, payload: { conectionState: true } });


  //--  Lista de eventos ON --//
  socket.on('allkitsstatus', allkitsStatusHandler);
  socket.on('alert', alertHandler);
});

//Cuando el server envia la lista de kits
function allkitsStatusHandler(data) {
  console.log(data);
  store.dispatch({ type: ALLKITSATUS, payload: { data } });
}

//Cuando el server envia una alerta normal
function alertHandler(data) {
  console.log(data);
  store.dispatch({ type: ALERT, payload: { data } });
}

socket.on('connect_failed', () => {
    console.log('Connection Failed socket.io');
});

socket.on('disconnect', () => {
  console.log('Disconnected socket.io');
});

export default socket;

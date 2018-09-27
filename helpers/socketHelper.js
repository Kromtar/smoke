import io from 'socket.io-client';
import { store } from '../App';

import {
  CONECTIONSTATE
} from '../actions/types';


const socket = io(process.env.SERVERURL);

socket.on('connect', () => {
  console.log('Connection OK socket.io');
  store.dispatch({ type: CONECTIONSTATE, payload: { conectionState: true } });
  //TODO: dejar aqui el on de alert ??
  socket.on('allkitsstatus', allkitsStatusHandler);
});

function allkitsStatusHandler(data) {
  console.log(data);
}

socket.on('connect_failed', () => {
    console.log('Connection Failed socket.io');
});

socket.on('disconnect', () => {
  console.log('Disconnected socket.io');
});

export default socket;

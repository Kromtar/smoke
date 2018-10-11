import update from 'immutability-helper';

import {
  ALLKITSATUS,
  ALERT,
  KITSTATUS
 } from '../actions/types';

//Memoria con todos los kits y sensores
export default function (state = {}, action) {
  switch (action.type) {
    case ALLKITSATUS:
      return action.payload.data;
    //En caso de una alerta acutalizamos solo el kit que en peligro.
    case ALERT:
      return update(state, { kitsList: { $merge: action.payload.data } });
    case KITSTATUS:
      return update(state, { kitsList: { $merge: action.payload.data } });
    default:
      return state;
  }
}

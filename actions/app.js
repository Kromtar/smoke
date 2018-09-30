/*
  Acciones para manejar parametros generales de la aplicacion
*/
import {
  CONECTIONSTATE
} from './types';

//Action sin uso en la app actualmente
export const socketConection = (conectionState) => dispatch => {
  dispatch({ type: CONECTIONSTATE, payload: { conectionState } });
};

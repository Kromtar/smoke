/*
  Acciones para manejar parametros generales de la aplicacion
*/
import {
  CONECTIONSTATE,
  ALERT
} from './types';

export const socketConection = (conectionState) => dispatch => {
  dispatch({ type: CONECTIONSTATE, payload: { conectionState } });
};


export const incomeAlert = (data) => dispatch => {
  dispatch({ type: ALERT, payload: { data } });
};

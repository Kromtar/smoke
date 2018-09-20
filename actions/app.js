/*
  Acciones para manejar parametros generales de la aplicacion
*/

import {
  CONECTIONSTATE
} from './types';

export const socketConection = (conectionState) => dispatch => {
  dispatch({ type: CONECTIONSTATE, payload: { conectionState } });
};

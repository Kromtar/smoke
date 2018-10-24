/*
  Acciones para manejar EMITS de socket
*/
import socket from '../helpers/socketHelper';

//TODO: quitar dispatch, no se ocupa (pero si no se pone hay error de syntaxis)
export const EMITcheckallstatus = (phoneID) => async dispatch => {
  socket.emit('checkallstatus', { phoneID });
};

export const EMITalertresponse = (response) => async dispatch => {
  console.log(response);
  socket.emit('alertresponse', response);
};

export const EMITaddkit = (data) => async dispatch => {
  socket.emit('qr', { kitID: data });
};

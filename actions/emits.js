import socket from '../helpers/socketHelper';

export const EMITcheckallstatus = (phoneID) => {
  socket.emit('checkallstatus', { phoneID });
};

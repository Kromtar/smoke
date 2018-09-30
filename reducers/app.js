import {
  CONECTIONSTATE
} from '../actions/types';

export default function (state = false, action) {
  switch (action.type) {
    //Para que los componentes puedan saber el estado de socket.
    case CONECTIONSTATE:
      return action.payload.conectionState;
    default:
      return state;
  }
}

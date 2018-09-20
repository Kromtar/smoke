import { CONECTIONSTATE } from '../actions/types';

export default function (state = false, action) {
  switch (action.type) {
    case CONECTIONSTATE:
      return action.payload.conectionState;
    default:
      return state;
  }
}

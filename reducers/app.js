import {
  CONECTIONSTATE,
  ALERT
} from '../actions/types';

const conectionStateReducer = (state = false, action) => {
  switch (action.type) {
    case CONECTIONSTATE:
      return action.payload.conectionState;
    default:
      return state;
  }
};

const alertReducer = (state = { kitStatus: 'bien' }, action) => {
  switch (action.type) {
    case ALERT:
      return action.payload.data;
    default:
      return state;
  }
};

module.exports = {
    conectionStateReducer,
    alertReducer
};

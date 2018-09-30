import { combineReducers } from 'redux';

import conectionStateReducer from './app';
import allKitStatus from './allKitStatus';

export default combineReducers({
  conectionStateReducer,
  allKitStatus
});

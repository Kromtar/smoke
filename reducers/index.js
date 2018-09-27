import { combineReducers } from 'redux';

import test from './test';
import {
  conectionStateReducer,
  alertReducer
} from './app';
import allKitStatus from './allKitStatus';

export default combineReducers({
  test,
  conectionStateReducer,
  alertReducer,
  allKitStatus
});

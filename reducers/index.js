import { combineReducers } from 'redux';

import test from './test';
import {
  conectionStateReducer,
  alertReducer
} from './app';

export default combineReducers({
  test,
  conectionStateReducer,
  alertReducer
});

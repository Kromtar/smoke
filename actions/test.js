/*
  Acciones test
*/

import {
  TEST
} from './types';

export const test = () => dispatch => {
  dispatch({ type: TEST, payload: {} });
};

/*
Acciones para manejar eventos FAKER de la app. Quitar en production
*/
import {
  ALLKITSATUS,
  ALERT
} from './types';

export const NOTIFICATIONalert = (dataPayload) => dispatch => {
    dispatch({ type: ALERT, payload: { dataPayload } });
  };

export const FAKERallkitsstatus = (dataPayload) => dispatch => {
    dispatch({ type: ALLKITSATUS, payload: { dataPayload } });
  };  

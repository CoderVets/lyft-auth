import {
  // GET_LOC,
  ETA_ACC_TOKEN,
  FETCHING,
  CANCEL_FETCHING,
  ADD_ERROR,
  CLEAR_ERROR,
} from '../Actions/User';
import { combineReducers } from 'redux'
//import { ReducersMapObject } from 'redux';

/* export const userLocation = (state = {}, action) => {
    (action.type === GET_LOC) ?
      action.payload :
        state,
}; */

export const getEtaAccToken = (state = null, action) =>
  (action.type === ETA_ACC_TOKEN) ?
    action.payload :
    state;

export const errors = (state=[], action) => {
  switch(action.type) {
    case ADD_ERROR :
      return [
        ...state,
        action.payload
      ]
    case CLEAR_ERROR :
      return state.filter((message, i) => i !== action.payload)
    default :
      return state
  }
};

export const fetching = (state = false, action) => {
  switch (action.type) {
    case FETCHING:
      return true;
    case CANCEL_FETCHING:
      return false;
    default:
      return state;
  }
};

export default combineReducers(
  getEtaAccToken,
  errors,
  fetching,
)
import {
  // GET_LOC,
  ETA_ACC_TOKEN,
  FETCHING,
  CANCEL_FETCHING,
  ADD_ERROR,
  CLEAR_ERROR,
  GET_USER,
  RECIEVE_USER,
  ETA,
} from '../Actions/User';
import { combineReducers } from 'redux'
//import { ReducersMapObject } from 'redux';

/* export const userLocation = (state = {}, action) => {
    (action.type === GET_LOC) ?
      action.payload :
        state,
}; */

const getEtaAccToken = (state = null, action) =>
  (action.type === ETA_ACC_TOKEN) ?
    action.payload :
    state;

const getLyftETA = (state = null, action) =>
(action.type === ETA) ?
  action.payload :
  state;

const errors = (state=[], action) => {
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

const fetching = (state = false, action) => {
  switch (action.type) {
    case FETCHING:
      return true;
    case CANCEL_FETCHING:
      return false;
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_USER:
      newState = action.user;
      return newState;
    case RECIEVE_USER:
      console.log('THIS IS THE REDUCER FIRING WE HAVE A REDUX STORE');
      newState = {
        access_token: action.user.data.access_token,
        expires_in: action.user.data.refresh_token,
        refresh_token: action.user.data.token_type,
        token_type: action.user.data.expires_in,
        scope: action.user.data.scope,
      };
      console.log('THIS IS THE NEW USER STATE');
      console.log(newState);
      return newState;
    default:
      return state;
  }
};

export default combineReducers({
  getEtaAccToken,
  getLyftETA,
  errors,
  fetching,
  user,
  }
)
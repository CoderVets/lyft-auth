import {
  // GET_LOC,
  ETA_ACC_TOKEN,
  FETCHING,
  CANCEL_FETCHING,
} from '../Actions/User';

/* export const userLocation = (state = {}, action) => {
    (action.type === GET_LOC) ?
      action.payload :
        state,
}; */

export const getEtaAccToken = (state = null, action) =>
  (action.type === ETA_ACC_TOKEN ?
    action.payload :
    state
  );


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

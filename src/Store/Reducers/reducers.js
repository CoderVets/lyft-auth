import {
  GET_LOC,
} from '../Actions/User';

export const userLocation = (state = {}, action) => {
    (action.type === GET_LOC) ?
    action.payload :
    state,
};

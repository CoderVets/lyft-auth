import {
  GET_USER,
  RECIEVE_USER,
} from '../Actions/User';

export default (state = {}, action) => {
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

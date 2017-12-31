export const GET_USER = 'GET_USER';
export const RECIEVE_USER = 'RECEIVE_USER';

export function getUser() {
  return {
    type: GET_USER,
  };
}

export function recieveUser(user) {
  return {
    type: RECIEVE_USER,
    user,
  };
}

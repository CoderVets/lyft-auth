export const GET_USER = 'GET_USER';
export const RECIEVE_USER = 'RECEIVE_USER';
export const GET_LOC = 'GET_LOC';

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

export function getLoc(latitude, longitude, error) {
  return {
    type: GET_LOC,
    payload: {
      watchId = navigator.geolocation.watchPosition(
        (position) => ({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          }),
        
        /* (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
        */
      )
    },
  };
}

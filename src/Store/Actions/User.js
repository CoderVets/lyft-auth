import base64 from '../../../node_modules/base-64/base64'

export const GET_USER = 'GET_USER';
export const RECIEVE_USER = 'RECEIVE_USER';
export const FETCHING = 'FETCHING';
export const ETA_ACC_TOKEN = 'ETA_ACC_TOKEN';
export const CANCEL_FETCHING = 'CANCEL_FETCHING'
export const ADD_ERROR = 'ADD_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

//export const GET_LOC = 'GET_LOC';

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

/* export function getLoc(latitude, longitude, error) {
  return {
    type: GET_LOC,
    payload: {
      watchId = navigator.geolocation.watchPosition(
        (position) => ({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          }),
        
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
        
      )
    },
  };
} */

export const addError = (message) => ({
  type: ADD_ERROR,
  payload: message,
})

export const clearError = index => ({
  type: CLEAR_ERROR,
  payload: index
})

export const etaAccesToken = (ClientID, ClientSecret) => dispatch => {

	dispatch({
		type: FETCHING
	})

  fetch('https://api.lyft.com/oauth/token',{
    method: 'Post',
    headers: {
        'Content-Type':'application/json',
        "Authorization":"Basic "+ base64.encode(ClientID + ":" + ClientSecret)
    },
    body:JSON.stringify ({
        "grant_type":"client_credentials",
        "scope":"public"
    })
  })
  .then(response => response.json())
  .then(respJson => {

    dispatch({
      type: ETA_ACC_TOKEN,
      payload: respJson.access_token
    })

  })
  .catch(error => {

    dispatch(
      addError(error.message)
    )

    dispatch({
      type: CANCEL_FETCHING
    })

  })
  
}
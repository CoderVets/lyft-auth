import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import rootReducer from './Reducers/reducers';
import thunk from 'redux-thunk'

/* export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
  );
} */

const logger = store => next => action => {
  let result
  console.group(action.type)
  console.info('dispaching', action)
  result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

export default (initialState={}) => {
	return applyMiddleware(thunk,logger)(createStore)(rootReducer, initialState)
}
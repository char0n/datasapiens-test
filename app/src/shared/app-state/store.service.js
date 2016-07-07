import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import {logging} from './redux-middleware.service';
import {rootReducer} from './reducers.service';
import {emitter as eventEmitter, STORE_DISPATCH} from '~/shared/event-emitter';

/**
 * This is the shape of our state.
 * @type Object
 */
const initialState = {
  stateLoaded: null,
  currentUserId: null,
  result: {
    users: [],
    categories: []
  },
  entities: {
    users: {},
    categories: {},
    entries: {}
  }
};

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    reduxThunk,
    logging
  )
);

store.subscribe(() => {
  eventEmitter.emit(STORE_DISPATCH);
});

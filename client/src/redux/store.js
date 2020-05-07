import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {noteReducer, userReducer} from './reducers';

const reducers = combineReducers({
  noteReducer,
  userReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));

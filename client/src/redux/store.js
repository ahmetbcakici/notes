import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {userReducer} from './reducers';

const reducers = combineReducers({
  userReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));

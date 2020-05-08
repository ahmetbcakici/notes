import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {noteReducer, selectedNoteReducer, userReducer} from './reducers';

const reducers = combineReducers({
  noteReducer,
  selectedNoteReducer,
  userReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));

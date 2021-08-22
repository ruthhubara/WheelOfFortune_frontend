import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './Reducers/User'
import weatherReducer from './Reducers/Weather'

const reducer = combineReducers({ userReducer, weatherReducer });

const store = createStore(reducer);
window.store = store;
export default store;

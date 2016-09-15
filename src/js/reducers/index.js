import { combineReducers } from 'redux';
import apiData from './apiData';
import glassware from './glassware';

const rootReducer = combineReducers({
  apiData,
  glassware
});

export default rootReducer;

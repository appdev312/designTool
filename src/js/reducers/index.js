import { combineReducers } from 'redux';
import apiData from './apiData';
import glassware from './glassware';
import wanderlust from './wanderlust';

const rootReducer = combineReducers({
  apiData,
  glassware,
  wanderlust
});

export default rootReducer;

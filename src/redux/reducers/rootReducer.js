import userReducer from './userReducer';
import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer
});
export default rootReducer;

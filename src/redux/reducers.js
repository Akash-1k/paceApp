import storage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import loadingReducer from '../common/CLoader/reducer';

import loginReducer from '../modules/Login/reducer';
import signupReducer from '../modules/Signup/reducer';
import profileReducer from '../modules/Profile/reducer';
import blogReducer from '../modules/Blog/reducer';
import shopReducer from '../modules/Shop/reducer';
import workoutReducer from '../modules/Workout/reducer';
import homeReducer from '../modules/Home/reducer';
import progressReducer from '../modules/Progress/reducer';

const appReducer = combineReducers({
  loadingReducer,
  loginReducer,
  signupReducer,
  profileReducer,
  blogReducer,
  shopReducer,
  workoutReducer,
  homeReducer,
  progressReducer,
});

const initialState = appReducer({}, {});
const rootReducer = (state, action) => {
  // if (action.type != 'HIT_STEPS') {
  //   console.error('Main reducer action :::::', action.type);
  // }
  // console.error('redux reducers.js', action.type);
  // if (action.type === 'LOGIN_SUCCESS') {
  if (action.type === 'LOGOUT_SUCCESS') {
    Object.keys(state).forEach(key => {
      // console.warn('4. key :::::::::', key);
      storage.removeItem(`persist:${key}`);
    });
    state = Object.assign({}, initialState);
  }

  return appReducer(state, action);
};

export default rootReducer;

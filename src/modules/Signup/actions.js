import {SIGNUP_FAIL, SIGNUP_REQUESTED, SIGNUP_SUCCESS} from './types';

export const signupRequest = (data, navigation) => ({
  type: SIGNUP_REQUESTED,
  data,
  navigation,
});

export const signupSuccess = data => ({
  type: SIGNUP_SUCCESS,
  data,
});

export const signupFail = () => ({
  type: SIGNUP_FAIL,
});

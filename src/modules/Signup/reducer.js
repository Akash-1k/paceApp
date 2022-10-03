import {SIGNUP_FAIL, SIGNUP_REQUESTED, SIGNUP_SUCCESS} from './types';

const INITIAL_STATE = {
  signupSucessData: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_REQUESTED:
      return {
        ...state,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupSucessData: action.data,
      };

    case SIGNUP_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};

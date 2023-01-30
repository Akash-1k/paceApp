import {
  CONTACT_SUPPORT_FAIL,
  CONTACT_SUPPORT_REQUESTED,
  CONTACT_SUPPORT_SUCCESS,
  FORGOT_PASS_FAIL,
  FORGOT_PASS_REQUESTED,
  FORGOT_PASS_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_REQUESTED,
  LOGOUT_SUCCESS,
  OTP_VERIFICATION_FAIL,
  OTP_VERIFICATION_REQUESTED,
  OTP_VERIFICATION_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUESTED,
  RESET_PASSWORD_SUCCESS,
  DEVICE_TOKEN_FAIL,
  DEVICE_TOKEN_REQUESTED,
  DEVICE_TOKEN_SUCCESS,
} from './types';

const INITIAL_STATE = {
  loginData: [],
  forgotPassData: null,
  otpVerificationData: [],
  resetPassData: null,
  contactSupportData: null,
  deviceToken: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
      };

    case LOGIN_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        loginData: action.data,
      };

    case LOGIN_FAIL:
      return {
        ...state,
      };

    // MY CODE
    case LOGOUT_REQUESTED:
      return {
        ...state,
      };

    case LOGOUT_SUCCESS:
      return {
        ...INITIAL_STATE,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
      };
    // MY CODE

    // Forgot Password
    case FORGOT_PASS_REQUESTED:
      return {
        ...state,
      };

    case FORGOT_PASS_SUCCESS:
      return {
        ...state,
        forgotPassData: action.data,
      };

    case FORGOT_PASS_FAIL:
      return {
        ...state,
      };

    case OTP_VERIFICATION_REQUESTED:
      return {
        ...state,
      };

    case OTP_VERIFICATION_SUCCESS:
      return {
        ...state,
        otpVerificationData: action.data,
      };

    case OTP_VERIFICATION_FAIL:
      return {
        ...state,
      };

    // Reset password
    case RESET_PASSWORD_REQUESTED:
      return {
        ...state,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassData: action.data,
      };

    case RESET_PASSWORD_FAIL:
      return {
        ...state,
      };

    // Reset password
    case CONTACT_SUPPORT_REQUESTED:
      return {
        ...state,
      };

    case CONTACT_SUPPORT_SUCCESS:
      return {
        ...state,
        contactSupportData: action.data,
      };

    case CONTACT_SUPPORT_FAIL:
      return {
        ...state,
      };

    // Device Token
    case DEVICE_TOKEN_REQUESTED:
      return {
        ...state,
      };

    case DEVICE_TOKEN_SUCCESS:
      return {
        ...state,
        deviceToken: action.data,
      };

    case DEVICE_TOKEN_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};
